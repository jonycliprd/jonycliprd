// Server-only verification. Configure LIVE_TEST_TOKEN in Vercel Preview environment.
const UPSTREAM = 'https://tranquil-consideration-jonycliprd-live-test.up.railway.app';
const cache = new Map();
const hits = new Map();
function parseId(value) {
  const raw = String(value || '').trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(raw)) return raw;
  try {
    const u = new URL(raw);
    const host = u.hostname.toLowerCase();
    let id = '';
    if (host === 'youtu.be' || host === 'www.youtu.be') id = u.pathname.split('/')[1] || '';
    if (['youtube.com','www.youtube.com','m.youtube.com'].includes(host)) {
      id = u.pathname === '/watch' ? (u.searchParams.get('v') || '') : (u.pathname.match(/^\/(?:live|shorts|embed)\/([\w-]{11})$/) || [])[1] || '';
    }
    return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : '';
  } catch { return ''; }
}
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({error:'Método no permitido'});
  const id = parseId(req.query.url || req.query.id);
  if (!id) return res.status(400).json({error:'Enlace de YouTube no válido'});
  const token = process.env.LIVE_TEST_TOKEN;
  if (!token) return res.status(503).json({error:'Verificación en preparación: falta LIVE_TEST_TOKEN en Vercel Preview'});
  const now = Date.now();
  const prev = cache.get(id);
  if (prev && prev.expires > now) return res.status(200).json(prev.result);
  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  const count = hits.get(ip) || {start:now,count:0};
  if (now - count.start >= 60000) { count.start=now; count.count=0; }
  count.count++;
  hits.set(ip,count);
  if (count.count > 10) return res.status(429).json({error:'Demasiadas consultas. Intenta en un minuto'});
  if (hits.size > 2000) hits.clear();
  if (cache.size > 500) cache.clear();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 14000);
  try {
    const response = await fetch(UPSTREAM + '/api/youtube/check?id=' + encodeURIComponent(id), {
      headers: {Authorization: 'Bearer ' + token},
      signal: controller.signal
    });
    const result = await response.json();
    if (!response.ok) return res.status(response.status === 404 ? 404 : 502).json({error: result.error || 'Error consultando YouTube'});
    const publicResult = {
      id:result.id,found:!!result.found,title:result.title,channel:result.channel,
      isLive:!!result.isLive,liveStatus:result.liveStatus,actualStartTime:result.actualStartTime
    };
    cache.set(id,{result:publicResult,expires:now+30000});
    return res.status(200).json(publicResult);
  } catch {
    return res.status(502).json({error:'No se pudo comprobar el directo. Intenta más tarde'});
  } finally { clearTimeout(timeout); }
}
