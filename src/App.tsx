import React, { useState, useEffect, useRef } from 'react';
import {
  Zap,
  Crown,
  Star,
  Link2,
  ArrowRight,
  Lock,
  Film,
  Clapperboard,
  Upload,
  Play,
  Pause,
  X,
  CheckCircle2,
  Sparkles,
  Download,
  Check,
  AlertCircle,
  KeyRound,
  FileVideo,
  Trash2,
  FolderOpen,
  Folder,
  Type,
  Plus,
  ExternalLink,
  RefreshCw,
  ChevronLeft,
  Wand2,
  Smile,
  Palette
} from 'lucide-react';

interface WordOverride {
  colorAss?: string;
  hex?: string;
  emoji?: string;
}

interface SubtitleLine {
  id: string;
  start: number;
  end: number;
  text: string;
  emoji?: string;
  wordOverrides?: Record<number, WordOverride>;
}

interface ClipItem {
  id: string | number;
  jobId?: string;
  clipIndex?: number;
  title: string;
  hookTitle?: string;
  score: number;
  start: number;
  end: number;
  duration: number;
  subtitleStyle: string;
  activeColorAss?: string;
  enableEmojis?: boolean;
  subtitles: SubtitleLine[];
  thumbnailUrl?: string;
  rawVideoUrl?: string;
  downloadUrl: string;
}

interface ProjectFolder {
  id: string;
  jobId?: string;
  title: string;
  channel: string;
  sourceUrl?: string;
  thumbnailUrl?: string;
  totalDuration: number;
  createdAt: string;
  clips: ClipItem[];
}

const SUBTITLE_PRESETS = [
  {
    id: 'hormozi',
    name: 'Hormozi Pro',
    badge: 'Más Viral',
    words: ['¡ESTO', 'CAMBIA', 'TODO!'],
    activeIndex: 1,
    emoji: '🔥',
    baseClass: 'text-white font-black tracking-wide drop-shadow-[0_3px_3px_rgba(0,0,0,1)] uppercase',
    defaultColorAss: '&H0000FFFF',
    defaultHex: '#FACC15'
  },
  {
    id: 'mrbeast',
    name: 'MrBeast Impacto',
    badge: 'Alto Contraste',
    words: ['¡NO', 'LO', 'CREERÁS!'],
    activeIndex: 2,
    emoji: '😱',
    baseClass: 'text-white font-black tracking-wider drop-shadow-[0_4px_0_rgba(0,0,0,1)] uppercase',
    defaultColorAss: '&H0055FF44',
    defaultHex: '#4ADE80'
  },
  {
    id: 'neon',
    name: 'Neón Viral',
    badge: 'Gaming / Clips',
    words: ['¡QUÉ', 'LOCURA', 'VIVO!'],
    activeIndex: 1,
    emoji: '⚡',
    baseClass: 'text-white font-black drop-shadow-[0_0_10px_rgba(236,72,153,0.95)] uppercase',
    defaultColorAss: '&H00FFF200',
    defaultHex: '#22D3EE'
  },
  {
    id: 'capcut',
    name: 'Caja CapCut',
    badge: 'Lectura Clara',
    words: ['TEXTO', 'CON', 'FONDO'],
    activeIndex: 1,
    emoji: '🚀',
    baseClass: 'bg-black/85 text-white px-2 py-0.5 rounded-md font-bold uppercase',
    defaultColorAss: '&H0000FFFF',
    defaultHex: '#FACC15'
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    badge: 'Podcast',
    words: ['Texto', 'limpio', 'real'],
    activeIndex: 2,
    emoji: '✨',
    baseClass: 'text-white/95 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]',
    defaultColorAss: '&H00B469FF',
    defaultHex: '#F472B6'
  },
  {
    id: 'none',
    name: 'Sin Subtítulos',
    badge: 'Video Limpio',
    words: ['Solo', 'recorte', '9:16'],
    activeIndex: -1,
    emoji: '',
    baseClass: 'text-slate-400 italic text-xs',
    defaultColorAss: '&H00FFFFFF',
    defaultHex: '#FFFFFF'
  }
];

const COLOR_SWATCHES = [
  { label: 'Amarillo Viral', hex: '#FACC15', ass: '&H0000FFFF' },
  { label: 'Verde Lima', hex: '#4ADE80', ass: '&H0055FF44' },
  { label: 'Cian Neón', hex: '#22D3EE', ass: '&H00FFF200' },
  { label: 'Rosa Intenso', hex: '#F472B6', ass: '&H00B469FF' },
  { label: 'Naranja Fuego', hex: '#FB923C', ass: '&H000088FF' },
  { label: 'Rojo Impacto', hex: '#F87171', ass: '&H003333FF' },
  { label: 'Blanco Puro', hex: '#FFFFFF', ass: '&H00FFFFFF' }
];

const QUICK_EMOJIS = ['🔥', '💰', '🚀', '😱', '💯', '⚡', '😂', '👑', '🎯', '🤯', '❤️', '✨'];

const API_BASE =
  (import.meta as any).env?.VITE_API_URL ||
  'https://jonycliprd-backend-production.up.railway.app';

const STORAGE_PROJECTS_KEY = 'jonycliprd_projects_v2';
const STORAGE_OWNER_KEY = 'jonycliprd_owner_vip_v2';
const STORAGE_TRIAL_KEY = 'jonycliprd_trial_used_v2';
const OWNER_SECRET_CODE = 'JONYRD2026';

const formatMMSS = (sec: number) => {
  const s = Math.max(0, Math.floor(sec || 0));
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
};

export function App() {
  const [activeTab, setActiveTab] = useState<'create' | 'studio' | 'folders' | 'plans' | 'networks' | 'dramas'>('create');
  const [inputMode, setInputMode] = useState<'link' | 'upload'>('link');
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [clipDuration, setClipDuration] = useState<number>(30);
  const [clipCount, setClipCount] = useState<number>(3);
  const [selectedPreset, setSelectedPreset] = useState<string>('hormozi');
  const [selectedActiveColorAss, setSelectedActiveColorAss] = useState<string>('&H0000FFFF');
  const [enableAutoEmojis, setEnableAutoEmojis] = useState<boolean>(true);

  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState(0);
  const [processPercent, setProcessPercent] = useState<number>(0);
  const [processStageText, setProcessStageText] = useState<string>('Iniciando cola de procesamiento...');
  const [errorMsg, setErrorMsg] = useState('');

  const [projects, setProjects] = useState<ProjectFolder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PROJECTS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const [isOwner, setIsOwner] = useState<boolean>(() => localStorage.getItem(STORAGE_OWNER_KEY) === 'true');
  const [showOwnerModal, setShowOwnerModal] = useState(false);
  const [ownerPassInput, setOwnerPassInput] = useState('');
  const [ownerError, setOwnerError] = useState('');
  const [trialUsed, setTrialUsed] = useState<number>(() => Number(localStorage.getItem(STORAGE_TRIAL_KEY) || 0));

  const [editingClip, setEditingClip] = useState<ClipItem | null>(null);
  const [editSubtitles, setEditSubtitles] = useState<SubtitleLine[]>([]);
  const [editStyleId, setEditStyleId] = useState<string>('hormozi');
  const [editFontSize, setEditFontSize] = useState<number>(48);
  const [editColorAss, setEditColorAss] = useState<string>('&H0000FFFF');
  const [editMarginV, setEditMarginV] = useState<number>(210);
  const [editEnableEmojis, setEditEnableEmojis] = useState<boolean>(true);
  const [selectedWordTarget, setSelectedWordTarget] = useState<{ lineIdx: number; wordIdx: number } | null>(null);
  const [currentPreviewTime, setCurrentPreviewTime] = useState<number>(0);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState<boolean>(true);
  const [isRenderingEdit, setIsRenderingEdit] = useState<boolean>(false);
  const [renderSuccessNotice, setRenderSuccessNotice] = useState<string>('');

  const [dramaIdea, setDramaIdea] = useState('');
  const [dramaGenre, setDramaGenre] = useState('drama');
  const [dramaDuration, setDramaDuration] = useState(45);
  const [dramaEnabled, setDramaEnabled] = useState(false);
  const [dramaBusy, setDramaBusy] = useState(false);
  const [dramaError, setDramaError] = useState('');
  const [dramaResult, setDramaResult] = useState<null | {
    title: string; hook: string; durationSeconds: number;
    characters: { name: string; description: string }[];
    scenes: { number: number; durationSeconds: number; visual: string; dialogue: string; camera: string }[];
    ending: string;
  }>(null);

  useEffect(() => {
    const controller = new AbortController();
    const checkDrama = async () => {
      try {
        const response = await fetch('/api/dramas/status', { signal: controller.signal, cache: 'no-store' });
        if (!response.ok) return;
        const status = await response.json();
        if (!controller.signal.aborted) setDramaEnabled(status.enabled === true);
      } catch {}
    };
    void checkDrama();
    return () => controller.abort();
  }, []);

  const generateDrama = async () => {
    if (dramaBusy || !dramaEnabled || dramaIdea.trim().length < 12) return;
    setDramaBusy(true);
    setDramaResult(null);
    setDramaError('');
    try {
      const response = await fetch('/api/dramas/generate', {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: dramaIdea.trim(), genre: dramaGenre, durationSeconds: dramaDuration })
      });
      const json = await response.json();
      if (!response.ok || !json.ok || !json.drama?.scenes?.length) {
        throw new Error(json.error || 'No se pudo generar el guion.');
      }
      setDramaResult(json.drama);
    } catch (err) {
      setDramaError(err instanceof Error ? err.message : 'No se pudo generar el guion.');
    } finally { setDramaBusy(false); }
  };

  const downloadDramaScript = () => {
    if (!dramaResult) return;
    const lines = [dramaResult.title, '', 'GANCHO: ' + dramaResult.hook, '',
      'PERSONAJES:', ...dramaResult.characters.map(c => c.name + ': ' + c.description), '',
      ...dramaResult.scenes.flatMap(sc => [
        'ESCENA ' + sc.number + ' (' + sc.durationSeconds + ' segundos)',
        'Visual: ' + sc.visual, 'Cámara: ' + sc.camera, 'Diálogo: ' + sc.dialogue, ''
      ]), 'FINAL: ' + dramaResult.ending, '', 'Formato pensado para Shorts 9:16'];
    const blob = new Blob([lines.join('\n')], {type:'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'JONY_CLIP_RD_Drama_Original.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const [youtubeStatus, setYoutubeStatus] = useState<{
    loading: boolean; ready: boolean; connected: boolean; channel?: string;
  }>({ loading: true, ready: false, connected: false });
  const [youtubeError, setYoutubeError] = useState('');
  const [youtubePrivateUploadEnabled, setYoutubePrivateUploadEnabled] = useState(false);
  const [youtubeUploadTitle, setYoutubeUploadTitle] = useState('');
  const [youtubeUploadDescription, setYoutubeUploadDescription] = useState('');
  const [youtubeUploadMadeForKids, setYoutubeUploadMadeForKids] = useState<'yes' | 'no' | ''>('');
  const [youtubeUploadFile, setYoutubeUploadFile] = useState<File | null>(null);
  const [youtubeUploadBusy, setYoutubeUploadBusy] = useState(false);
  const [youtubeUploadResult, setYoutubeUploadResult] = useState<{title:string;url:string}|null>(null);
  const [youtubeUploadError, setYoutubeUploadError] = useState('');
  const uploadPrivateYouTube = async () => {
    if (!youtubeUploadFile || !youtubeUploadTitle.trim() || youtubeUploadMadeForKids === '' ||
        !youtubeStatus.connected || !youtubePrivateUploadEnabled || youtubeUploadBusy) return;
    if (!window.confirm('¿Enviar este MP4 a YouTube como video PRIVADO? Solo tú podrás verlo hasta que cambies su visibilidad en YouTube Studio.')) return;
    setYoutubeUploadBusy(true);
    setYoutubeUploadError('');
    setYoutubeUploadResult(null);
    try {
      const data = new FormData();
      data.append('video', youtubeUploadFile);
      data.append('title', youtubeUploadTitle.trim());
      data.append('description', youtubeUploadDescription.trim());
      data.append('madeForKids', youtubeUploadMadeForKids === 'yes' ? 'true' : 'false');
      data.append('confirmUpload', 'yes');
      const response = await fetch('/api/auth/youtube/upload-private', {
        method: 'POST', credentials: 'include', body: data
      });
      const json = await response.json();
      if (!response.ok || json?.ok !== true || json?.video?.privacyStatus !== 'private') {
        throw new Error(typeof json?.error === 'string' ? json.error : 'YouTube no confirmó la subida privada.');
      }
      setYoutubeUploadResult({title: json.video.title, url: json.video.url});
    } catch (err) {
      setYoutubeUploadError(err instanceof Error ? err.message : 'No se pudo verificar la subida.');
    } finally {
      setYoutubeUploadBusy(false);
    }
  };

  const [disconnectBusy, setDisconnectBusy] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);
    const check = async () => {
      try {
        const response = await fetch('/api/connections/providers', { cache: 'no-store', signal: controller.signal });
        if (!response.ok) throw new Error('Provider unavailable');
        const providers = await response.json();
        setYoutubePrivateUploadEnabled(providers?.providers?.youtube?.privateUploadEnabled === true);
        if (providers?.providers?.youtube?.connectEnabled !== true) {
          setYoutubeStatus({ loading: false, ready: false, connected: false });
          return;
        }
        const meResponse = await fetch('/api/auth/youtube/me', {
          credentials: 'include', cache: 'no-store', signal: controller.signal
        });
        if (!meResponse.ok) throw new Error('Session unavailable');
        const me = await meResponse.json();
        setYoutubeStatus({ loading: false, ready: me.enabled === true,
          connected: me.connected === true, channel: typeof me.user?.channel?.title === 'string'
            ? me.user.channel.title : undefined });
      } catch {
        if (!controller.signal.aborted) setYoutubeError('No se pudo consultar el estado de YouTube.');
        setYoutubeStatus({ loading: false, ready: false, connected: false });
      } finally { window.clearTimeout(timeout); }
    };
    void check();
    return () => { controller.abort(); window.clearTimeout(timeout); };
  }, []);
  const disconnectYoutube = async () => {
    if (!youtubeStatus.ready || !youtubeStatus.connected || disconnectBusy) return;
    if (!window.confirm('¿Desconectar el canal de YouTube?')) return;
    setDisconnectBusy(true);
    setYoutubeError('');
    try {
      const response = await fetch('/api/auth/youtube/disconnect', {
        method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' },
        body: '{}'
      });
      if (!response.ok) throw new Error('No se pudo desconectar el canal.');
      const data = await response.json();
      if (data.ok !== true || data.connected !== false) throw new Error('La desconexión no fue confirmada.');
      setYoutubeStatus({ loading: false, ready: true, connected: false });
    } catch (err) {
      setYoutubeError(err instanceof Error ? err.message : 'No se pudo desconectar el canal.');
    } finally { setDisconnectBusy(false); }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editorVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(projects));
    } catch {}
  }, [projects]);

  useEffect(() => {
    if (!activeProjectId && projects.length > 0) {
      setActiveProjectId(projects[0].id);
    }
  }, [projects, activeProjectId]);

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0] || null;
  const remainingFree = Math.max(0, 10 - trialUsed);
  const currentSelectedSwatch =
    COLOR_SWATCHES.find((s) => s.ass === selectedActiveColorAss) || COLOR_SWATCHES[0];

  const handleActivateOwner = (e: React.FormEvent) => {
    e.preventDefault();
    if (ownerPassInput.trim().toUpperCase() === OWNER_SECRET_CODE) {
      setIsOwner(true);
      localStorage.setItem(STORAGE_OWNER_KEY, 'true');
      setShowOwnerModal(false);
      setOwnerPassInput('');
      setOwnerError('');
    } else {
      setOwnerError('Clave incorrecta. Usa tu clave maestra de creador.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setErrorMsg('');
    }
  };

  const pollJobUntilDone = async (baseApi: string, jobId: string): Promise<any> => {
    const maxAttempts = 360;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 2500));

      const statusRes = await fetch(`${baseApi}/api/jobs/${encodeURIComponent(jobId)}`);
      const statusData = await statusRes.json();

      if (statusData.status === 'failed' || (!statusRes.ok && statusData.error)) {
        throw new Error(statusData.error || 'Error procesando el video en el servidor.');
      }

      const pct = Number(statusData.progress) || 5;
      setProcessPercent(pct);
      if (statusData.stage) {
        setProcessStageText(statusData.stage);
      }

      if (pct < 30) setProcessStep(1);
      else if (pct < 55) setProcessStep(2);
      else if (pct < 65) setProcessStep(3);
      else setProcessStep(4);

      if (statusData.status === 'completed') {
        setProcessPercent(100);
        setProcessStep(4);
        return statusData;
      }
    }
    throw new Error('El video tardó demasiado en procesarse. Intenta con un fragmento más corto.');
  };

  const handleGenerateClips = async () => {
    setErrorMsg('');

    if (!isOwner && remainingFree <= 0) {
      setErrorMsg('Agotaste tus 10 cortes de prueba. Activa tu clave de Dueño VIP o elige un plan.');
      return;
    }

    if (inputMode === 'link' && !videoUrl.trim()) {
      setErrorMsg('Pega un enlace válido de YouTube, Kick, Twitch, TikTok o Facebook.');
      return;
    }

    if (inputMode === 'upload' && !selectedFile) {
      setErrorMsg('Selecciona un archivo de video MP4 o MOV desde tu dispositivo.');
      return;
    }

    setIsProcessing(true);
    setProcessStep(1);
    setProcessPercent(5);
    setProcessStageText('Enviando video a la cola profesional BullMQ...');

    const baseApi = API_BASE.replace(/\/$/, '');

    try {
      const formData = new FormData();
      formData.append('clipDuration', String(clipDuration));
      formData.append('clipCount', String(clipCount));
      formData.append('subtitleStyle', selectedPreset);
      formData.append('activeColorAss', selectedActiveColorAss);
      formData.append('enableEmojis', String(enableAutoEmojis));
      formData.append('inputMode', inputMode);

      if (inputMode === 'upload' && selectedFile) {
        formData.append('video', selectedFile, selectedFile.name);
      } else {
        formData.append('url', videoUrl.trim());
      }

      const enqueueRes = await fetch(`${baseApi}/api/process`, {
        method: 'POST',
        body: formData
      });

      const enqueueData = await enqueueRes.json();
      if (!enqueueRes.ok || (!enqueueData.ok && !enqueueData.success)) {
        throw new Error(enqueueData.details || enqueueData.error || 'No se pudo iniciar el trabajo en Railway.');
      }

      const resolvedJobId = enqueueData.jobId || '';
      const data = resolvedJobId
        ? await pollJobUntilDone(baseApi, resolvedJobId)
        : enqueueData;

      const normalizedClips: ClipItem[] = (data.clips || []).map((c: any, idx: number) => ({
        id: c.id || `${Date.now()}_${idx + 1}`,
        jobId: c.jobId || resolvedJobId || data.project?.id || '',
        clipIndex: typeof c.clipIndex === 'number' ? c.clipIndex : idx + 1,
        title: c.title || `Clip Viral #${idx + 1}`,
        hookTitle: c.hookTitle || '',
        score: Number(c.score) || Math.max(85, 99 - idx),
        start: Number(c.start) || 0,
        end: Number(c.end) || clipDuration,
        duration: Number(c.duration) || clipDuration,
        subtitleStyle: c.subtitleStyle || selectedPreset,
        activeColorAss: c.activeColorAss || selectedActiveColorAss,
        enableEmojis: typeof c.enableEmojis === 'boolean' ? c.enableEmojis : enableAutoEmojis,
        subtitles: Array.isArray(c.subtitles)
          ? c.subtitles.map((s: any, sIdx: number) => ({
              id: s.id || `${idx}_${sIdx}`,
              start: Number(s.start) || 0,
              end: Number(s.end) || 2,
              text: s.text || '',
              emoji: s.emoji || '',
              wordOverrides: s.wordOverrides || {}
            }))
          : [],
        thumbnailUrl: c.thumbnailUrl || data.project?.thumbnail || '',
        rawVideoUrl: c.rawVideoUrl || c.videoUrl || c.downloadUrl || '',
        downloadUrl: c.videoUrl || c.downloadUrl || ''
      }));

      const newFolder: ProjectFolder = {
        id: data.project?.id || resolvedJobId || Date.now().toString(),
        jobId: resolvedJobId || data.project?.id || '',
        title:
          data.project?.title ||
          (inputMode === 'upload' && selectedFile
            ? selectedFile.name.replace(/\.[^/.]+$/, '')
            : 'Proyecto Viral • JONY CLIP RD'),
        channel: data.project?.channel || 'JONY CLIP RD Studio',
        sourceUrl: data.project?.sourceUrl || (inputMode === 'link' ? videoUrl.trim() : ''),
        thumbnailUrl:
          data.project?.thumbnail ||
          data.project?.thumbnailUrl ||
          normalizedClips[0]?.thumbnailUrl ||
          '',
        totalDuration:
          data.project?.totalDuration ||
          normalizedClips.reduce((acc, item) => acc + (item.duration || clipDuration), 0),
        createdAt: data.project?.createdAt || new Date().toISOString(),
        clips: normalizedClips
      };

      setProjects((prev) => [newFolder, ...prev]);
      setActiveProjectId(newFolder.id);

      if (!isOwner) {
        const nextUsed = trialUsed + (normalizedClips.length || 1);
        setTrialUsed(nextUsed);
        localStorage.setItem(STORAGE_TRIAL_KEY, String(nextUsed));
      }

      setActiveTab('studio');
    } catch (err: any) {
      setErrorMsg(`Error del servidor: ${err.message || 'No se pudo conectar con Railway.'}`);
    } finally {
      setIsProcessing(false);
      setProcessStep(0);
      setProcessPercent(0);
    }
  };

  const openCapCutEditor = (clip: ClipItem) => {
    setEditingClip(clip);
    setRenderSuccessNotice('');
    setSelectedWordTarget(null);
    setEditStyleId(clip.subtitleStyle || 'hormozi');
    const presetObj = SUBTITLE_PRESETS.find((p) => p.id === (clip.subtitleStyle || 'hormozi'));
    setEditColorAss(clip.activeColorAss || presetObj?.defaultColorAss || '&H0000FFFF');
    setEditEnableEmojis(clip.enableEmojis !== false);
    setEditFontSize(48);
    setEditMarginV(210);
    setCurrentPreviewTime(0);
    setIsPreviewPlaying(true);

    if (clip.subtitles && clip.subtitles.length > 0) {
      setEditSubtitles(
        clip.subtitles.map((s) => ({
          ...s,
          wordOverrides: s.wordOverrides ? { ...s.wordOverrides } : {}
        }))
      );
    } else {
      setEditSubtitles([
        {
          id: '1',
          start: 0,
          end: Math.min(4, clip.duration),
          text: clip.hookTitle || '¡MIRA LO QUE ACABA DE PASAR AQUÍ!',
          emoji: '🔥',
          wordOverrides: {}
        },
        {
          id: '2',
          start: Math.min(4, clip.duration),
          end: Math.min(8, clip.duration),
          text: 'EDITA CADA PALABRA Y COLOR AQUÍ',
          emoji: '🚀',
          wordOverrides: {}
        }
      ]);
    }
  };

  const updateWordOverride = (lineIdx: number, wordIdx: number, patch: WordOverride) => {
    setEditSubtitles((prev) =>
      prev.map((line, lIdx) => {
        if (lIdx !== lineIdx) return line;
        const currentOverrides = { ...(line.wordOverrides || {}) };
        currentOverrides[wordIdx] = {
          ...(currentOverrides[wordIdx] || {}),
          ...patch
        };
        return { ...line, wordOverrides: currentOverrides };
      })
    );
  };

  const handleApplyCapCutChanges = async (shouldDownloadAfter = false) => {
    if (!editingClip || !activeProject) return;
    setIsRenderingEdit(true);
    setRenderSuccessNotice('');

const baseApi = 'https://jonycliprd-backend-production.up.railway.app';
    try {
      const response = await fetch(`${baseApi}/api/re-render-clip`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: editingClip.jobId || activeProject.jobId || activeProject.id,
          clipIndex: editingClip.clipIndex || 1,
          start: editingClip.start,
          end: editingClip.end,
          hookTitle: editingClip.hookTitle || editingClip.title,
          rawVideoUrl: editingClip.rawVideoUrl || editingClip.downloadUrl,
          subtitles: editSubtitles,
          subtitleStyle: editStyleId,
          activeColorAss: editColorAss,
          enableEmojis: editEnableEmojis,
          customOptions: {
            fontSize: editFontSize,
            primaryColorAss: editColorAss,
            marginV: editMarginV
          }
        })
      });

      const data = await response.json();
      if (!response.ok || (!data.ok && !data.success)) {
        throw new Error(data.details || data.error || 'Error re-renderizando subtítulos.');
      }

      const rawFinalUrl = data.videoUrl || data.downloadUrl || editingClip.downloadUrl;
      const cacheBustedUrl = `${rawFinalUrl.split('?')[0]}?v=${Date.now()}`;

      const updatedClip: ClipItem = {
        ...editingClip,
        subtitleStyle: editStyleId,
        activeColorAss: editColorAss,
        enableEmojis: editEnableEmojis,
        subtitles: editSubtitles,
        downloadUrl: cacheBustedUrl
      };

      setProjects((prev) =>
        prev.map((proj) =>
          proj.id === activeProject.id
            ? {
                ...proj,
                clips: proj.clips.map((c) => (c.id === updatedClip.id ? updatedClip : c))
              }
            : proj
        )
      );
      setEditingClip(updatedClip);
      setRenderSuccessNotice('¡Subtítulos, colores y emojis aplicados al video en tiempo real!');

      if (shouldDownloadAfter) {
        triggerDirectDownload(cacheBustedUrl, `${updatedClip.title}.mp4`);
      }
    } catch (err: any) {
      alert(`No se pudo aplicar el estilo: ${err.message}`);
    } finally {
      setIsRenderingEdit(false);
    }
  };

  const triggerDirectDownload = (url: string, filename: string) => {
    try {
      const clipUrl = new URL(url, window.location.href);
      // Keep /clips/... URLs for preview. Use the dedicated attachment route for downloads.
      if (!/^\/clips\/[^/]+\.mp4$/.test(clipUrl.pathname)) {
        alert('No se encontró una URL MP4 válida para descargar.');
        return;
      }
      clipUrl.pathname = clipUrl.pathname.replace(/^\/clips\//, '/api/download/');
      const link = document.createElement('a');
      link.href = clipUrl.toString();
      link.download = filename.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ _-]/g, '') || 'JonyClipRD_9x16.mp4';
      // No target=_blank: on iPhone it opens a video tab instead of downloading.
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (_error) {
      alert('No se pudo iniciar la descarga del MP4.');
    }
  };

  const deleteProjectFolder = (folderId: string) => {
    setProjects((prev) => {
      const filtered = prev.filter((p) => p.id !== folderId);
      if (activeProjectId === folderId) {
        setActiveProjectId(filtered[0]?.id || null);
      }
      return filtered;
    });
  };

  const activeLiveSubtitle = editSubtitles.find(
    (s) => currentPreviewTime >= s.start && currentPreviewTime <= s.end
  );
  const activeSwatch = COLOR_SWATCHES.find((c) => c.ass === editColorAss) || COLOR_SWATCHES[0];

  const renderAnimatedPreviewWords = () => {
    if (!activeLiveSubtitle) return null;
    const words = activeLiveSubtitle.text.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return null;

    const lineDuration = Math.max(0.2, activeLiveSubtitle.end - activeLiveSubtitle.start);
    const progressInLine = Math.max(
      0,
      Math.min(0.999, (currentPreviewTime - activeLiveSubtitle.start) / lineDuration)
    );
    const activeWordIdx = Math.floor(progressInLine * words.length);

    return (
      <div className="inline-flex flex-wrap items-center justify-center gap-1.5">
        {words.map((word, wIdx) => {
          const override = activeLiveSubtitle.wordOverrides?.[wIdx];
          const isCurrent = wIdx === activeWordIdx;
          const wordHex = override?.hex || (isCurrent ? activeSwatch.hex : '#FFFFFF');
          const wordEmoji = editEnableEmojis ? override?.emoji || '' : '';

          return (
            <span
              key={wIdx}
              style={{
                color: wordHex,
                transform: isCurrent ? 'scale(1.14)' : 'scale(1)',
                transition: 'transform 0.1s ease, color 0.1s ease'
              }}
              className="inline-flex items-center gap-0.5"
            >
              <span>{word}</span>
              {wordEmoji && <span>{wordEmoji}</span>}
            </span>
          );
        })}
        {editEnableEmojis && activeLiveSubtitle.emoji && (
          <span className="ml-1">{activeLiveSubtitle.emoji}</span>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#070510] text-white font-sans selection:bg-fuchsia-500 selection:text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0818]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          <div
            onClick={() => setActiveTab('create')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-fuchsia-600/30 group-hover:scale-105 transition">
              <Play className="w-5 h-5 fill-white text-white ml-0.5" />
            </div>
            <div className="leading-tight">
              <span className="font-black text-lg tracking-wider bg-gradient-to-r from-white via-fuchsia-200 to-cyan-200 bg-clip-text text-transparent">
                JONY CLIP <span className="text-fuchsia-400">RD</span>
              </span>
              <p className="text-[10px] text-purple-300/70 tracking-widest uppercase">
                AI Clipper & CapCut Studio
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('create')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${
                activeTab === 'create'
                  ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-4 h-4" /> Crear Clips
            </button>

            <button
              onClick={() => setActiveTab('studio')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${
                activeTab === 'studio'
                  ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Clapperboard className="w-4 h-4" /> Estudio Activo
              {activeProject && (
                <span className="text-[11px] bg-black/40 px-1.5 py-0.5 rounded-md text-fuchsia-300">
                  {activeProject.clips.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('folders')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${
                activeTab === 'folders'
                  ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <FolderOpen className="w-4 h-4" /> Mis Carpetas
              <span className="text-[11px] bg-white/10 px-1.5 py-0.5 rounded-md">
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('dramas')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${activeTab === 'dramas' ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}>
              <Film className="w-4 h-4" /> Dramas IA
            </button>
            <button
              onClick={() => setActiveTab('networks')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${activeTab === 'networks' ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
            >
              <Link2 className="w-4 h-4" /> Mis Redes
            </button>

            <button
              onClick={() => setActiveTab('plans')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${
                activeTab === 'plans'
                  ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Star className="w-4 h-4" /> Planes
            </button>
          </nav>

          <div className="flex items-center gap-2">
            {isOwner ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-bold">
               <Crown className="w-4 h-4 text-amber-400" />
                <span>Dueño VIP • Ilimitado</span>
              </div>
            ) : (
              <>
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Gratis: {remainingFree}/10</span>
                </div>
                <button
                  onClick={() => setShowOwnerModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Crown className="w-3.5 h-3.5 text-amber-400" /> Dueño
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="md:hidden flex items-center justify-around border-b border-white/10 bg-[#0d0a1c] py-2 px-2 text-xs">
        <button
          onClick={() => setActiveTab('create')}
          className={`px-3 py-1.5 rounded-lg font-semibold ${activeTab === 'create' ? 'bg-fuchsia-600' : 'text-slate-400'}`}
        >
          Crear
        </button>
        <button
          onClick={() => setActiveTab('studio')}
          className={`px-3 py-1.5 rounded-lg font-semibold ${activeTab === 'studio' ? 'bg-fuchsia-600' : 'text-slate-400'}`}
        >
          Estudio ({activeProject?.clips.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('folders')}
          className={`px-3 py-1.5 rounded-lg font-semibold ${activeTab === 'folders' ? 'bg-fuchsia-600' : 'text-slate-400'}`}
        >
          Carpetas ({projects.length})
        </button>
        <button onClick={() => setActiveTab('dramas')}
          className={`px-3 py-1.5 rounded-lg font-semibold ${activeTab === 'dramas' ? 'bg-fuchsia-600' : 'text-slate-400'}`}>
          Dramas IA
        </button>
        <button onClick={() => setActiveTab('networks')}
          className={`px-3 py-1.5 rounded-lg font-semibold ${activeTab === 'networks' ? 'bg-fuchsia-600' : 'text-slate-400'}`}>
          Mis Redes
        </button>
      </div>

      {activeTab === 'create' && (
        <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
          <div className="rounded-3xl border border-fuchsia-500/30 bg-gradient-to-b from-[#140d2b] via-[#0e0920] to-[#0a0716] p-6 md:p-8 shadow-2xl shadow-fuchsia-950/30">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10">
                <button
                  onClick={() => setInputMode('link')}
                  className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
                    inputMode === 'link'
                      ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Link2 className="w-4 h-4" /> Pegar Enlace de Directo
                </button>
                <button
                  onClick={() => setInputMode('upload')}
                  className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
                    inputMode === 'upload'
                      ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Upload className="w-4 h-4" /> Subir Video (MP4 / MOV)
                </button>
              </div>

              {projects.length > 0 && (
                <button
                  onClick={() => setActiveTab('folders')}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-cyan-300 flex items-center gap-2 transition"
                >
                  <FolderOpen className="w-4 h-4" /> Ver Mis Carpetas ({projects.length})
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
                    Cantidad de clips a sacar
                  </span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={clipCount}
                      onChange={(e) => {
                        const val = Math.max(1, Math.min(100, Number(e.target.value) || 1));
                        setClipCount(val);
                      }}
                      className="w-16 text-center text-xs font-bold px-2 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-200 border border-fuchsia-400/40 focus:outline-none focus:border-fuchsia-400"
                    />
                    <span className="text-xs font-semibold text-purple-300">clips</span>
                  </div>
                </div>

                <input
                  type="range"
                  min={1}
                  max={100}
                  step={1}
                  value={Math.min(100, Math.max(1, clipCount))}
                  onChange={(e) => setClipCount(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-fuchsia-500 mb-3"
                />

                <div className="flex items-center justify-between gap-1.5">
                  {[1, 10, 25, 50, 100].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setClipCount(num)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                        clipCount === num
                          ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/25'
                          : 'bg-white/5 text-purple-200 hover:bg-white/10'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
                    Duración de cada clip
                  </span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min={0}
                      max={300}
                      value={clipDuration}
                      onChange={(e) => {
                        const val = Math.max(0, Math.min(300, Number(e.target.value) || 0));
                        setClipDuration(val);
                      }}
                      className="w-16 text-center text-xs font-bold px-2 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-200 border border-fuchsia-400/40 focus:outline-none focus:border-fuchsia-400"
                    />
                    <span className="text-xs font-semibold text-purple-300">
                      {clipDuration === 0
                        ? 'Auto IA'
                        : clipDuration >= 60
                        ? `s (${Math.floor(clipDuration / 60)}m ${clipDuration % 60 > 0 ? `${clipDuration % 60}s` : ''})`
                        : 'seg'}
                    </span>
                  </div>
                </div>

                <input
                  type="range"
                  min={0}
                  max={300}
                  step={5}
                  value={Math.min(300, Math.max(0, clipDuration))}
                  onChange={(e) => setClipDuration(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-fuchsia-500 mb-3"
                />

                <div className="flex items-center justify-between gap-1">
                  {[
                    { label: 'Auto', val: 0 },
                    { label: '15s', val: 15 },
                    { label: '30s', val: 30 },
                    { label: '60s', val: 60 },
                    { label: '90s', val: 90 },
                    { label: '2m', val: 120 },
                    { label: '3m', val: 180 }
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => setClipDuration(preset.val)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                        clipDuration === preset.val
                          ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/25'
                          : 'bg-white/5 text-purple-200 hover:bg-white/10'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 mb-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-200 flex items-center gap-2">
                  <Type className="w-4 h-4 text-fuchsia-400" /> Estilo de Subtítulos Dinámicos (Estilo CapCut)
                </span>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-xl border border-white/10">
                    <Palette className="w-3.5 h-3.5 text-fuchsia-300" />
                    <span className="text-[11px] text-slate-300 mr-1">Palabra activa:</span>
                    {COLOR_SWATCHES.map((sw) => (
                      <button
                        key={sw.ass}
                        type="button"
                        onClick={() => setSelectedActiveColorAss(sw.ass)}
                        style={{ backgroundColor: sw.hex }}
                        title={sw.label}
                        className={`w-4 h-4 rounded-full border transition ${
                          selectedActiveColorAss === sw.ass ? 'border-white scale-125' : 'border-black/50'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setEnableAutoEmojis((v) => !v)}
                    className={`px-3 py-1 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 transition ${
                      enableAutoEmojis
                        ? 'border-amber-400/50 bg-amber-500/15 text-amber-200'
                        : 'border-white/10 bg-black/30 text-slate-400'
                    }`}
                  >
                    <Smile className="w-3.5 h-3.5" />
                    <span>Emojis IA: {enableAutoEmojis ? 'ON 🔥' : 'OFF'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {SUBTITLE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      setSelectedPreset(preset.id);
                      setSelectedActiveColorAss(preset.defaultColorAss);
                    }}
                    className={`p-3 rounded-xl border text-left transition flex flex-col justify-between h-24 ${
                      selectedPreset === preset.id
                        ? 'border-fuchsia-400 bg-fuchsia-500/15 shadow-lg shadow-fuchsia-950/40'
                        : 'border-white/10 bg-black/30 hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-200">{preset.name}</span>
                      {selectedPreset === preset.id && <Check className="w-3.5 h-3.5 text-fuchsia-400" />}
                    </div>
                    <div className="text-center my-auto">
                      <span className={`text-[11px] leading-tight inline-flex flex-wrap justify-center gap-1 ${preset.baseClass}`}>
                        {preset.words.map((w, wIdx) => (
                          <span
                            key={wIdx}
                            style={
                              wIdx === preset.activeIndex
                                ? {
                                    color:
                                      selectedPreset === preset.id
                                        ? currentSelectedSwatch.hex
                                        : preset.defaultHex,
                                    transform: 'scale(1.12)'
                                  }
                                : undefined
                            }
                          >
                            {w}
                          </span>
                        ))}
                        {enableAutoEmojis && preset.emoji && <span>{preset.emoji}</span>}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {inputMode === 'link' ? (
              <div className="bg-black/40 border border-white/10 rounded-2xl p-5 flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 bg-[#120d26] border border-white/15 focus-within:border-fuchsia-500 rounded-xl px-4 py-3">
                    <Link2 className="w-5 h-5 text-fuchsia-400 shrink-0" />
                    <input
                      type="text"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="Pega aquí el enlace de YouTube, Kick, Twitch, TikTok o Facebook..."
                      className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 px-1">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Cola BullMQ + FFmpeg Activo • Subtítulos palabra por palabra
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleGenerateClips}
                  disabled={isProcessing}
                  className="px-7 py-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:brightness-110 disabled:opacity-50 font-black text-sm tracking-wide shadow-xl shadow-fuchsia-600/30 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Wand2 className="w-5 h-5" />
                  <span>Generar Clips con Cara y Subtítulos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="bg-black/40 border border-white/10 rounded-2xl p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4,video/quicktime,video/x-matroska,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 border-2 border-dashed border-fuchsia-500/40 hover:border-fuchsia-400 rounded-2xl p-4 flex items-center gap-4 cursor-pointer bg-fuchsia-500/5 transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-fuchsia-600/20 flex items-center justify-center text-fuchsia-300 shrink-0">
                    <FileVideo className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-white">
                      {selectedFile ? selectedFile.name : 'Haz clic aquí para elegir tu video MP4 o MOV'}
                    </p>
                    <p className="text-xs text-slate-400">
                      {selectedFile
                        ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB • Listo para crear carpeta de proyecto`
                        : 'Soporta videos hasta 500 MB • Guarda automáticamente en tu carpeta'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleGenerateClips}
                  disabled={isProcessing}
                  className="px-7 py-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:brightness-110 disabled:opacity-50 font-black text-sm tracking-wide shadow-xl shadow-fuchsia-600/30 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Wand2 className="w-5 h-5" />
                  <span>Crear Proyecto y Clips 9:16</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {errorMsg && (
              <div className="mt-4 p-4 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="break-words">{errorMsg}</span>
              </div>
            )}
          </div>

          {projects.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-fuchsia-400" /> Carpetas de Proyectos Recientes
                </h2>
                <button
                  onClick={() => setActiveTab('folders')}
                  className="text-xs font-bold text-fuchsia-300 hover:underline"
                >
                  Ver todas ({projects.length}) →
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.slice(0, 3).map((folder) => (
                  <div
                    key={folder.id}
                    onClick={() => {
                      setActiveProjectId(folder.id);
                      setActiveTab('studio');
                    }}
                    className="group rounded-2xl border border-white/10 bg-[#110c24] hover:border-fuchsia-500/50 overflow-hidden cursor-pointer transition shadow-lg"
                  >
                    <div className="relative h-36 bg-black">
                      {folder.thumbnailUrl ? (
                        <img
                          src={folder.thumbnailUrl}
                          alt={folder.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/40 to-black">
                          <Film className="w-10 h-10 text-fuchsia-400/60" />
                        </div>
                      )}
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur text-[11px] font-bold text-fuchsia-300 flex items-center gap-1">
                        <Folder className="w-3 h-3" /> {folder.clips.length} clips
                      </span>
                      <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-[11px] font-mono">
                        {formatMMSS(folder.totalDuration)}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm line-clamp-1 group-hover:text-fuchsia-300 transition">
                        {folder.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">{folder.channel}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      )}

      {activeTab === 'studio' && (
        <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          {!activeProject ? (
            <div className="text-center py-20 rounded-3xl border border-white/10 bg-[#100b22]">
              <FolderOpen className="w-12 h-12 text-fuchsia-400 mx-auto mb-3" />
              <h2 className="text-xl font-black">Aún no tienes un proyecto abierto</h2>
              <p className="text-sm text-slate-400 mt-1 mb-6">
                Pega un enlace o sube un video MP4 para crear tu primera carpeta de proyecto.
              </p>
              <button
                onClick={() => setActiveTab('create')}
                className="px-6 py-3 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 font-bold text-sm"
              >
                + Crear Nuevo Proyecto
              </button>
            </div>
          ) : (
            <>
              <div className="rounded-3xl border border-white/10 bg-[#110c24] p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    onClick={() => setActiveTab('folders')}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300"
                    title="Volver a Mis Carpetas"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="relative w-44 h-24 rounded-2xl overflow-hidden bg-black border border-white/15 shrink-0">
                    {activeProject.thumbnailUrl ? (
                      <img
                        src={activeProject.thumbnailUrl}
                        alt={activeProject.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-fuchsia-400">
                        <Film className="w-8 h-8" />
                      </div>
                    )}
                    <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/85 text-[11px] font-bold">
                      {formatMMSS(activeProject.totalDuration)}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-xs text-fuchsia-300 font-bold mb-1">
                      <Folder className="w-3.5 h-3.5" />
                      <span>Carpeta de Proyecto Guardada</span>
                    </div>
                    <h1 className="text-lg sm:text-xl font-black text-white line-clamp-1">
                      {activeProject.title}
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                      {activeProject.channel} • {activeProject.clips.length} clips verticales 9:16 listos
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      {activeProject.sourceUrl && (
                        <a
                          href={activeProject.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold flex items-center gap-1.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Abrir original
                        </a>
                      )}
                      <button
                        onClick={() => setActiveTab('create')}
                        className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Recrear clips
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="px-4 py-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>¡Tus {activeProject.clips.length} clips verticales están listos!</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {activeProject.clips.map((clip) => (
                  <div
                    key={clip.id}
                    className="group rounded-3xl border border-white/10 bg-[#110c24] hover:border-fuchsia-500/60 overflow-hidden flex flex-col shadow-xl transition"
                  >
                    <div className="relative aspect-[9/16] bg-black overflow-hidden">
                      <video
                        key={clip.downloadUrl}
                        src={clip.downloadUrl}
                        poster={clip.thumbnailUrl || activeProject.thumbnailUrl}
                        controls
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />

                      <div className="pointer-events-none absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-black flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {(clip.score / 10).toFixed(1)}/10
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-bold">
                          {formatMMSS(clip.duration)}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-sm text-white line-clamp-2">{clip.title}</h3>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Estilo: <span className="text-fuchsia-300 font-semibold uppercase">{clip.subtitleStyle}</span> •{' '}
                          {clip.subtitles?.length || 0} líneas
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => openCapCutEditor(clip)}
                          className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-fuchsia-600/30 border border-fuchsia-400/30 text-fuchsia-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          <Type className="w-3.5 h-3.5" /> Editar CapCut
                        </button>

                        <button
                          onClick={() => triggerDirectDownload(clip.downloadUrl, `${clip.title}.mp4`)}
                          className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:brightness-110 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-lg shadow-fuchsia-950/50 transition cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" /> MP4
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      )}

      {activeTab === 'folders' && (
        <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black flex items-center gap-2.5">
                <FolderOpen className="w-6 h-6 text-fuchsia-400" /> Mis Carpetas de Proyectos
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Cada video o enlace que analizas queda guardado en su propia carpeta con sus clips y subtítulos.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('create')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 font-bold text-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Nuevo Proyecto
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-20 rounded-3xl border border-white/10 bg-[#100b22]">
              <Folder className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <p className="text-sm text-slate-400">No hay carpetas guardadas todavía.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((folder) => (
                <div
                  key={folder.id}
                  className="rounded-3xl border border-white/10 bg-[#110c24] overflow-hidden flex flex-col justify-between shadow-xl"
                >
                  <div
                    onClick={() => {
                      setActiveProjectId(folder.id);
                      setActiveTab('studio');
                    }}
                    className="cursor-pointer group"
                  >
                    <div className="relative h-44 bg-black">
                      {folder.thumbnailUrl ? (
                        <img
                          src={folder.thumbnailUrl}
                          alt={folder.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-purple-950/30">
                          <Film className="w-12 h-12 text-fuchsia-400/50" />
                        </div>
                      )}
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 text-xs font-bold text-fuchsia-300 flex items-center gap-1.5">
                        <Folder className="w-3.5 h-3.5" /> {folder.clips.length} clips guardados
                      </span>
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-base text-white group-hover:text-fuchsia-300 transition line-clamp-1">
                        {folder.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        {folder.channel} • {new Date(folder.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 pb-4 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        setActiveProjectId(folder.id);
                        setActiveTab('studio');
                      }}
                      className="flex-1 py-2 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-xs font-bold text-center"
                    >
                      Abrir Carpeta
                    </button>
                    <button
                      onClick={() => deleteProjectFolder(folder.id)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300"
                      title="Eliminar carpeta"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {activeTab === 'dramas' && (
        <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
          <div className="rounded-3xl bg-gradient-to-br from-fuchsia-900/40 to-indigo-900/30 border border-fuchsia-400/20 p-6">
            <p className="text-xs font-black text-fuchsia-300 uppercase tracking-widest">JONY CLIP RD Studio</p>
            <h1 className="text-3xl font-black mt-2">Creador de dramas con IA</h1>
            <p className="text-sm text-slate-300 mt-2">Escribe una idea y crea una historia original con personajes, diálogos y escenas verticales para Shorts.</p>
            <p className="text-xs text-amber-200 mt-3">Primera etapa: genera el guion y el plan de escenas. Todavía no produce imágenes, voces ni un video MP4 automáticamente.</p>
          </div>
          <section className="rounded-3xl border border-white/10 bg-[#140d2b] p-5 md:p-7 space-y-4">
            <label className="block text-sm font-bold">¿De qué tratará tu drama?
              <textarea rows={4} maxLength={600} value={dramaIdea} onChange={e=>setDramaIdea(e.target.value)}
                placeholder="Ej.: Una joven vuelve a su pueblo después de 10 años y descubre una carta que cambia su vida…"
                className="block mt-2 w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm font-normal"/>
            </label>
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block text-sm font-bold">Género
                <select value={dramaGenre} onChange={e=>setDramaGenre(e.target.value)}
                  className="block mt-2 w-full rounded-xl border border-white/20 bg-[#211638] px-3 py-3">
                  <option value="drama">Drama</option><option value="misterio">Misterio</option>
                  <option value="romance">Romance</option><option value="suspenso">Suspenso</option>
                  <option value="fantasia">Fantasía</option><option value="superacion">Superación</option>
                </select>
              </label>
              <label className="block text-sm font-bold">Duración aproximada
                <select value={dramaDuration} onChange={e=>setDramaDuration(Number(e.target.value))}
                  className="block mt-2 w-full rounded-xl border border-white/20 bg-[#211638] px-3 py-3">
                  <option value={30}>30 segundos</option><option value={45}>45 segundos</option>
                  <option value={60}>60 segundos</option>
                </select>
              </label>
            </div>
            <button type="button" onClick={generateDrama}
              disabled={!dramaEnabled || dramaBusy || dramaIdea.trim().length < 12}
              className="w-full rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 px-5 py-3.5 font-bold disabled:opacity-50 disabled:cursor-not-allowed">
              {dramaBusy ? 'Creando historia…' : dramaEnabled ? 'Generar drama original con IA' : 'Generador de dramas · Próximamente'}
            </button>
            {!dramaEnabled && <p className="text-xs text-amber-200">La función está en preparación. Tu editor de clips sigue disponible mientras tanto.</p>}
            {dramaError && <p role="alert" className="text-rose-300 text-sm">{dramaError}</p>}
          </section>
          {dramaResult && (
            <section className="rounded-3xl border border-fuchsia-500/30 bg-[#140d2b] p-5 md:p-7 space-y-5">
              <div className="flex flex-wrap gap-3 justify-between items-start">
                <div><p className="text-xs text-fuchsia-300">GUION ORIGINAL · 9:16</p>
                  <h2 className="text-2xl font-black mt-1">{dramaResult.title}</h2>
                </div>
                <button type="button" onClick={downloadDramaScript}
                  className="rounded-xl bg-fuchsia-600 px-4 py-2 text-sm font-bold">Descargar guion TXT</button>
              </div>
              <p className="text-sm"><strong>Gancho:</strong> {dramaResult.hook}</p>
              <div><h3 className="font-bold mb-2">Personajes</h3>
                {dramaResult.characters.map((c,i)=><p key={i} className="text-sm text-slate-300">{c.name}: {c.description}</p>)}
              </div>
              <div className="space-y-3">{dramaResult.scenes.map(sc=>(
                <div key={sc.number} className="rounded-2xl bg-black/30 border border-white/10 p-4">
                  <h3 className="font-bold text-fuchsia-200">Escena {sc.number} · {sc.durationSeconds} s</h3>
                  <p className="text-sm mt-2"><strong>Visual:</strong> {sc.visual}</p>
                  <p className="text-sm mt-1"><strong>Cámara:</strong> {sc.camera}</p>
                  <p className="text-sm mt-1"><strong>Diálogo:</strong> {sc.dialogue}</p>
                </div>
              ))}</div>
              <p className="text-sm font-bold">Final: {dramaResult.ending}</p>
              <p className="text-xs text-amber-200">Este resultado es un guion, no un MP4. Las escenas deberán producirse con contenido propio o autorizado antes de publicarse.</p>
            </section>
          )}
        </main>
      )}

      {activeTab === 'networks' && (
        <main className="max-w-4xl mx-auto px-4 py-10 space-y-5">
          <h1 className="text-3xl font-black">Mis Redes Sociales</h1>
          <p className="text-sm text-slate-300">Conecta tu canal de YouTube mediante la autorización oficial de Google. Publicar Shorts todavía no está disponible.</p>
          <section className="rounded-3xl border border-fuchsia-500/30 bg-[#140d2b] p-6 space-y-4">
            <h2 className="text-xl font-bold">YouTube</h2>
            <p className="text-sm text-slate-300">{youtubeStatus.connected
              ? `Conectado: ${youtubeStatus.channel || 'Tu canal de YouTube'}`
              : youtubeStatus.loading ? 'Comprobando conexión…'
              : youtubeStatus.ready ? 'Puedes conectar tu canal con Google.'
              : 'Conexión de Google disponible próximamente.'}</p>
            {youtubeError && <p role="alert" className="text-sm text-rose-300">{youtubeError}</p>}
            {youtubeStatus.connected ? (
              <button type="button" onClick={disconnectYoutube} disabled={disconnectBusy}
                className="rounded-xl border border-rose-400/40 px-4 py-3 font-semibold text-rose-200 disabled:opacity-50">
                {disconnectBusy ? 'Desconectando…' : 'Desconectar YouTube'}
              </button>
            ) : (
              <button type="button"
                disabled={!youtubeStatus.ready}
                onClick={() => { if (youtubeStatus.ready) window.location.assign('/api/auth/youtube/start'); }}
                className="rounded-xl bg-fuchsia-600 px-4 py-3 font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed">
                {youtubeStatus.ready ? 'Conectar con Google' : 'Conectar cuenta · Próximamente'}
              </button>
            )}
            {youtubeStatus.connected && youtubePrivateUploadEnabled && (
              <div className="space-y-3 rounded-2xl border border-white/10 bg-black/25 p-4">
                <h3 className="font-bold">Subir Short privado de prueba</h3>
                <p className="text-xs text-amber-200">La subida será privada. YouTube determina si el video cumple el formato Shorts.</p>
                <label className="block text-sm">Archivo MP4 (máximo 40 MB)
                  <input type="file" accept="video/mp4,.mp4"
                    onChange={(e) => setYoutubeUploadFile(e.target.files?.[0] || null)}
                    className="block mt-1 w-full text-sm" />
                </label>
                <label className="block text-sm">Título
                  <input value={youtubeUploadTitle} onChange={(e) => setYoutubeUploadTitle(e.target.value)}
                    maxLength={100} placeholder="Título del Short"
                    className="block mt-1 w-full rounded-lg border border-white/20 bg-black/40 p-2" />
                </label>
                <label className="block text-sm">Descripción
                  <textarea value={youtubeUploadDescription} onChange={(e) => setYoutubeUploadDescription(e.target.value)}
                    maxLength={5000} placeholder="Descripción opcional"
                    className="block mt-1 w-full rounded-lg border border-white/20 bg-black/40 p-2" rows={3} />
                </label>
                <label className="block text-sm">¿Está dirigido a niños?
                  <select value={youtubeUploadMadeForKids}
                    onChange={(e) => setYoutubeUploadMadeForKids(e.target.value as 'yes' | 'no' | '')}
                    className="block mt-1 w-full rounded-lg border border-white/20 bg-[#140d2b] p-2">
                    <option value="">Selecciona una opción</option>
                    <option value="yes">Sí</option><option value="no">No</option>
                  </select>
                </label>
                <button type="button" onClick={uploadPrivateYouTube}
                  disabled={youtubeUploadBusy || !youtubeUploadFile || youtubeUploadFile.size > 40*1024*1024 || !youtubeUploadTitle.trim() || !youtubeUploadMadeForKids}
                  className="rounded-xl bg-fuchsia-600 px-4 py-2.5 text-sm font-semibold disabled:opacity-50">
                  {youtubeUploadBusy ? 'Subiendo…' : 'Confirmar subida PRIVADA a YouTube'}
                </button>
                {youtubeUploadError && <p role="alert" className="text-sm text-rose-300">{youtubeUploadError}</p>}
                {youtubeUploadResult && <p role="status" className="text-sm text-emerald-300">
                  YouTube confirmó el video privado: <a href={youtubeUploadResult.url} target="_blank" rel="noopener noreferrer" className="underline">{youtubeUploadResult.title}</a>
                </p>}
              </div>
            )}
            <p className="text-xs text-amber-200">Nunca escribas tu contraseña de Google dentro de JONY CLIP RD. Los permisos se autorizan únicamente en Google.</p>
          </section>
        </main>
      )}

      {activeTab === 'plans' && (
        <main className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black">Planes JONY CLIP RD Studio</h1>
            <p className="text-sm text-slate-400 mt-2">
              Recorte vertical 9:16 con IA, carpetas ilimitadas y editor de subtítulos estilo CapCut.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Prueba Gratis', price: '$0', desc: '10 cortes de prueba con subtítulos IA', btn: 'Activo' },
              { name: 'Creador Pro', price: '$15/mes', desc: 'Cortes ilimitados + todas las plantillas CapCut', btn: 'Elegir Pro' },
              { name: 'Dueño VIP', price: 'Acceso Maestro', desc: 'Control total sin límites ni marca de agua', btn: 'Activar Clave' }
            ].map((plan, idx) => (
              <div key={idx} className="rounded-3xl border border-white/10 bg-[#110c24] p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black text-fuchsia-300">{plan.name}</h3>
                  <p className="text-3xl font-black my-3">{plan.price}</p>
                  <p className="text-xs text-slate-400">{plan.desc}</p>
                </div>
                <button
                  onClick={() => idx === 2 && setShowOwnerModal(true)}
                  className="mt-6 w-full py-2.5 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-xs font-bold"
                >
                  {plan.btn}
                </button>
              </div>
            ))}
          </div>
        </main>
      )}

      {editingClip && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="w-full max-w-6xl max-h-[94vh] rounded-3xl border border-fuchsia-500/40 bg-[#0d091f] overflow-hidden flex flex-col shadow-2xl">
            <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between bg-[#140e2e]">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-lg bg-fuchsia-600 text-xs font-black">CAPCUT STUDIO PRO</span>
                <h2 className="font-bold text-sm sm:text-base line-clamp-1">{editingClip.title}</h2>
              </div>
              <button
                onClick={() => setEditingClip(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto grid lg:grid-cols-12 gap-6 p-5">
              <div className="lg:col-span-4 flex flex-col items-center justify-center bg-black/60 rounded-2xl p-4 border border-white/10">
                <div className="relative w-full max-w-[260px] aspect-[9/16] rounded-2xl overflow-hidden bg-black border-2 border-fuchsia-500/40 shadow-2xl">
                  <video
                    key={editingClip.downloadUrl}
                    ref={editorVideoRef}
                    src={editingClip.downloadUrl}
                    autoPlay
                    loop
                    playsInline
                    onTimeUpdate={(e) => setCurrentPreviewTime(e.currentTarget.currentTime)}
                    className="w-full h-full object-cover"
                  />

                  {editStyleId !== 'none' && activeLiveSubtitle && (
                    <div
                      style={{ bottom: `${Math.max(8, Math.min(75, Math.round((editMarginV / 1280) * 100)))}%` }}
                      className="pointer-events-none absolute left-3 right-3 text-center px-2"
                    >
                      <div
                        style={{
                          fontSize: `${Math.max(13, Math.round(editFontSize * 0.42))}px`
                        }}
                        className={`inline-block leading-tight uppercase font-black ${
                          editStyleId === 'capcut'
                            ? 'bg-black/85 px-2.5 py-1 rounded-md'
                            : 'drop-shadow-[0_3px_3px_rgba(0,0,0,1)]'
                        }`}
                      >
                        {renderAnimatedPreviewWords()}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => {
                      const v = editorVideoRef.current;
                      if (!v) return;
                      if (v.paused) {
                        v.play();
                        setIsPreviewPlaying(true);
                      } else {
                        v.pause();
                        setIsPreviewPlaying(false);
                      }
                    }}
                    className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1.5"
                  >
                    {isPreviewPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPreviewPlaying ? 'Pausar' : 'Reproducir'}</span>
                  </button>
                  <span className="text-xs font-mono text-slate-400">
                    {currentPreviewTime.toFixed(1)}s / {editingClip.duration}s
                  </span>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-black uppercase tracking-wider text-fuchsia-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> 1. Estilo Base y Emojis Automáticos
                    </label>
                    <button
                      type="button"
                      onClick={() => setEditEnableEmojis((v) => !v)}
                      className={`px-3 py-1 rounded-lg border text-xs font-bold flex items-center gap-1.5 ${
                        editEnableEmojis
                          ? 'border-amber-400/50 bg-amber-500/15 text-amber-200'
                          : 'border-white/10 bg-white/5 text-slate-400'
                      }`}
                    >
                      <Smile className="w-3.5 h-3.5" />
                      <span>Emojis: {editEnableEmojis ? 'Activados 🔥' : 'Desactivados'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SUBTITLE_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setEditStyleId(preset.id);
                          setEditColorAss(preset.defaultColorAss);
                        }}
                        className={`p-2.5 rounded-xl border text-left transition ${
                          editStyleId === preset.id
                            ? 'border-fuchsia-400 bg-fuchsia-500/20'
                            : 'border-white/10 bg-white/5 hover:border-white/25'
                        }`}
                      >
                        <div className="text-xs font-bold">{preset.name}</div>
                        <div className={`text-[10px] mt-1 truncate ${preset.baseClass}`}>
                          {preset.words.join(' ')} {preset.emoji}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 bg-white/[0.03] border border-white/10 rounded-2xl p-3">
                  <div>
                    <span className="text-[11px] font-bold text-slate-300 block mb-1.5">Color Palabra Activa</span>
                    <div className="flex flex-wrap gap-1.5">
                      {COLOR_SWATCHES.map((sw) => (
                        <button
                          key={sw.ass}
                          type="button"
                          onClick={() => setEditColorAss(sw.ass)}
                          style={{ backgroundColor: sw.hex }}
                          title={sw.label}
                          className={`w-5 h-5 rounded-full border-2 transition ${
                            editColorAss === sw.ass ? 'border-white scale-110' : 'border-black/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-slate-300 mb-1">
                      <span>Tamaño Letra</span>
                      <span className="text-fuchsia-300">{editFontSize}px</span>
                    </div>
                    <input
                      type="range"
                      min={28}
                      max={68}
                      value={editFontSize}
                      onChange={(e) => setEditFontSize(Number(e.target.value))}
                      className="w-full accent-fuchsia-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-slate-300 mb-1">
                      <span>Altura en Pantalla</span>
                      <span className="text-cyan-300">{Math.round((editMarginV / 1280) * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min={80}
                      max={680}
                      value={editMarginV}
                      onChange={(e) => setEditMarginV(Number(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>
                </div>

                {selectedWordTarget && editSubtitles[selectedWordTarget.lineIdx] && (
                  <div className="rounded-2xl border border-fuchsia-400/50 bg-fuchsia-500/10 p-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs font-bold text-fuchsia-200">
                      Editando palabra:{' '}
                      <span className="px-2 py-0.5 rounded bg-black/50 text-white uppercase">
                        {editSubtitles[selectedWordTarget.lineIdx].text
                          .trim()
                          .split(/\s+/)[selectedWordTarget.wordIdx] || ''}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg">
                        <span className="text-[10px] text-slate-300 mr-1">Color:</span>
                        {COLOR_SWATCHES.map((sw) => (
                          <button
                            key={sw.ass}
                            type="button"
                            onClick={() =>
                              updateWordOverride(selectedWordTarget.lineIdx, selectedWordTarget.wordIdx, {
                                colorAss: sw.ass,
                                hex: sw.hex
                              })
                            }
                            style={{ backgroundColor: sw.hex }}
                            className="w-4 h-4 rounded-full border border-white/40 hover:scale-125 transition"
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg">
                        <span className="text-[10px] text-slate-300 mr-1">Emoji:</span>
                        {QUICK_EMOJIS.slice(0, 8).map((em) => (
                          <button
                            key={em}
                            type="button"
                            onClick={() =>
                              updateWordOverride(selectedWordTarget.lineIdx, selectedWordTarget.wordIdx, {
                                emoji: em
                              })
                            }
                            className="text-xs hover:scale-125 transition"
                          >
                            {em}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() =>
                            updateWordOverride(selectedWordTarget.lineIdx, selectedWordTarget.wordIdx, {
                              emoji: ''
                            })
                          }
                          className="text-[10px] text-rose-300 px-1 hover:underline"
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-black uppercase tracking-wider text-cyan-300">
                      2. Edita el texto o haz clic en cualquier palabra para cambiar su color/emoji
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const lastEnd = editSubtitles[editSubtitles.length - 1]?.end || 0;
                        setEditSubtitles((prev) => [
                          ...prev,
                          {
                            id: String(Date.now()),
                            start: Number(lastEnd.toFixed(1)),
                            end: Number(Math.min(editingClip.duration, lastEnd + 3).toFixed(1)),
                            text: 'NUEVA LÍNEA DE TEXTO',
                            emoji: '🔥',
                            wordOverrides: {}
                          }
                        ]);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Añadir línea
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {editSubtitles.map((line, index) => {
                      const lineWords = line.text.trim().split(/\s+/).filter(Boolean);
                      return (
                        <div
                          key={line.id}
                          className="bg-black/40 border border-white/10 rounded-xl p-2.5 space-y-2"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-slate-400 px-1.5 shrink-0">
                              {line.start.toFixed(1)}s–{line.end.toFixed(1)}s
                            </span>
                            <input
                              type="text"
                              value={line.text}
                              onChange={(e) => {
                                const val = e.target.value;
                                setEditSubtitles((prev) =>
                                  prev.map((item, idx) => (idx === index ? { ...item, text: val } : item))
                                );
                              }}
                              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-fuchsia-400"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setEditSubtitles((prev) => prev.filter((_, idx) => idx !== index))
                              }
                              className="p-1.5 text-slate-400 hover:text-rose-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5 pl-1">
                            {lineWords.map((w, wIdx) => {
                              const ov = line.wordOverrides?.[wIdx];
                              const isSelected =
                                selectedWordTarget?.lineIdx === index &&
                                selectedWordTarget?.wordIdx === wIdx;
                              return (
                                <button
                                  key={wIdx}
                                  type="button"
                                  onClick={() => setSelectedWordTarget({ lineIdx: index, wordIdx: wIdx })}
                                  style={ov?.hex ? { color: ov.hex } : undefined}
                                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold border transition ${
                                    isSelected
                                      ? 'border-fuchsia-400 bg-fuchsia-500/25'
                                      : 'border-white/10 bg-white/5 hover:border-white/30'
                                  }`}
                                >
                                  {w} {ov?.emoji || ''}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {renderSuccessNotice && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{renderSuccessNotice}</span>
                  </div>
                )}

                <div className="pt-1 flex flex-wrap items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setEditingClip(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold"
                  >
                    Cerrar
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyCapCutChanges(false)}
                    disabled={isRenderingEdit}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-fuchsia-600/30 border border-fuchsia-400/40 text-fuchsia-200 hover:text-white disabled:opacity-50 text-xs font-black flex items-center gap-2 transition cursor-pointer"
                  >
                    <Wand2 className="w-4 h-4" />
                    <span>
                      {isRenderingEdit ? 'Aplicando en 3s...' : 'Aplicar Cambios en Vivo'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyCapCutChanges(true)}
                    disabled={isRenderingEdit}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:brightness-110 disabled:opacity-50 text-xs sm:text-sm font-black flex items-center gap-2 shadow-xl shadow-fuchsia-600/30 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>
                      {isRenderingEdit ? 'Renderizando MP4...' : 'Guardar y Descargar MP4'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isProcessing && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl border border-fuchsia-500/40 bg-[#120c29] p-7 text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-indigo-600 flex items-center justify-center mx-auto animate-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-black">Creando Carpeta y Clips Verticales 9:16</h3>
              <p className="text-xs text-fuchsia-300 font-semibold mt-1">
                {processStageText} ({processPercent}%)
              </p>
            </div>

            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div
                style={{ width: `${Math.max(5, Math.min(100, processPercent))}%` }}
                className="h-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 transition-all duration-500"
              />
            </div>

            <div className="space-y-2 text-left text-xs">
              {[
                '1. Descargando video y extrayendo miniatura real...',
                '2. Transcribiendo voz con Whisper IA...',
                '3. Detectando momentos más virales...',
                '4. Recortando en 9:16 y quemando subtítulos CapCut...'
              ].map((label, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border ${
                    processStep >= idx + 1
                      ? 'border-fuchsia-500/50 bg-fuchsia-500/15 text-white font-semibold'
                      : 'border-white/5 bg-white/[0.02] text-slate-500'
                  }`}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showOwnerModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleActivateOwner}
            className="w-full max-w-sm rounded-3xl border border-amber-400/40 bg-[#120c29] p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-black text-amber-300 flex items-center gap-2">
                <KeyRound className="w-5 h-5" /> Acceso Dueño VIP
              </h3>
              <button type="button" onClick={() => setShowOwnerModal(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <input
              type="password"
              value={ownerPassInput}
              onChange={(e) => setOwnerPassInput(e.target.value)}
              placeholder="Ingresa tu clave maestra..."
              className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm focus:outline-none focus:border-amber-400"
            />
            {ownerError && <p className="text-xs text-rose-400">{ownerError}</p>}
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black text-xs"
            >
              Activar Modo Ilimitado
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App; 
