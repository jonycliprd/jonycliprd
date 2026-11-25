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
  Share2,
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
  Palette,
  ThumbsUp,
  ThumbsDown,
  Scissors,
  MoreVertical,
  Send,
  Globe2
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

const SOCIAL_NETWORKS = [
  { id: 'instagram', name: 'Instagram', format: 'Reels', icon: Clapperboard, color: 'text-pink-300', site: 'https://www.instagram.com/' },
  { id: 'tiktok', name: 'TikTok', format: 'Videos', icon: Globe2, color: 'text-cyan-300', site: 'https://www.tiktok.com/' },
  { id: 'facebook', name: 'Facebook', format: 'Reels', icon: Film, color: 'text-blue-300', site: 'https://www.facebook.com/' },
  { id: 'youtube', name: 'YouTube', format: 'Shorts', icon: Play, color: 'text-red-300', site: 'https://www.youtube.com/' }
] as const;

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
  const [activeTab, setActiveTab] = useState<'create' | 'studio' | 'folders' | 'plans' | 'social'>('create');
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
  const [editTrimStart, setEditTrimStart] = useState(0);
  const [editTrimEnd, setEditTrimEnd] = useState(0);
  const [editVolume, setEditVolume] = useState(100);
  const [editorTool, setEditorTool] = useState<'recortar' | 'texto' | 'subtitulos' | 'estilo' | 'audio'>('subtitulos');
  const [editEnableEmojis, setEditEnableEmojis] = useState<boolean>(true);
  const [selectedWordTarget, setSelectedWordTarget] = useState<{ lineIdx: number; wordIdx: number } | null>(null);
  const [currentPreviewTime, setCurrentPreviewTime] = useState<number>(0);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState<boolean>(true);
  const [isRenderingEdit, setIsRenderingEdit] = useState<boolean>(false);
  const [renderSuccessNotice, setRenderSuccessNotice] = useState<string>('');
  const [publishClipDraft, setPublishClipDraft] = useState<ClipItem | null>(null);
  const [publishTitle, setPublishTitle] = useState('');
  const [publishDescription, setPublishDescription] = useState('');
  const [publishHashtags, setPublishHashtags] = useState('');
  const [publishNetworks, setPublishNetworks] = useState<string[]>([]);

  const [downloadHelpUrl, setDownloadHelpUrl] = useState<string | null>(null);
  const [showSocialConnections, setShowSocialConnections] = useState(false);
  // The server, not this browser, decides whether Google OAuth is ready.
  const [youtubeConnection, setYoutubeConnection] = useState<{
    ready: boolean; connected: boolean; loading: boolean; email?: string; channelTitle?: string;
  }>({ ready: false, connected: false, loading: true });
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const checkYoutubeConnection = async () => {
      try {
        const response = await fetch('/api/connections/providers', {
          signal: controller.signal, cache: 'no-store'
        });
        if (!response.ok) throw new Error('Provider status unavailable');
        const providers = await response.json();
        const ready = providers?.providers?.youtube?.connectEnabled === true;
        if (!ready) {
          setYoutubeConnection({ ready: false, connected: false, loading: false });
          return;
        }
        const meResponse = await fetch('/api/auth/youtube/me', {
          credentials: 'include', signal: controller.signal, cache: 'no-store'
        });
        if (!meResponse.ok) throw new Error('Session status unavailable');
        const me = await meResponse.json();
        setYoutubeConnection({
          ready: true, connected: me.connected === true, loading: false,
          email: typeof me.user?.email === 'string' ? me.user.email : undefined,
          channelTitle: typeof me.user?.channel?.title === 'string' ? me.user.channel.title : undefined
        });
      } catch {
        // Fail closed on network errors and timeouts; only ignore unmount cleanup.
        setYoutubeConnection({ ready: false, connected: false, loading: false });
      } finally {
        clearTimeout(timeout);
      }
    };
    void checkYoutubeConnection();
    return () => { clearTimeout(timeout); controller.abort(); };
  }, []);
  const youtubeConnectionLabel = youtubeConnection.connected
    ? 'YouTube conectado' : youtubeConnection.ready ? 'Conectar con Google'
      : youtubeConnection.loading ? 'Comprobando conexión…' : 'Conectar cuenta · Próximamente';
  const beginYoutubeConnection = () => {
    if (youtubeConnection.ready && !youtubeConnection.connected) {
      window.location.assign('/api/auth/youtube/start');
    }
  };
  const [youtubeDisconnectBusy, setYoutubeDisconnectBusy] = useState(false);
  const [youtubeDisconnectError, setYoutubeDisconnectError] = useState('');
  const disconnectYoutube = async () => {
    if (!youtubeConnection.ready || !youtubeConnection.connected || youtubeDisconnectBusy) return;
    if (!window.confirm('¿Desconectar tu canal de YouTube? Tendrás que autorizarlo de nuevo para volver a conectarlo.')) return;
    setYoutubeDisconnectError('');
    setYoutubeDisconnectBusy(true);
    try {
      const response = await fetch('/api/auth/youtube/disconnect', {
        method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' },
        body: '{}'
      });
      if (!response.ok) throw new Error('No se pudo desconectar el canal. Inténtalo nuevamente.');
      const status = await response.json();
      if (status.ok !== true || status.connected !== false) throw new Error('No se confirmó la desconexión.');
      setYoutubeConnection({ ready: true, connected: false, loading: false });
    } catch (err) {
      setYoutubeDisconnectError(err instanceof Error ? err.message : 'Error desconectando YouTube.');
    } finally {
      setYoutubeDisconnectBusy(false);
    }
  };

  const [clipFeedback, setClipFeedback] = useState<Record<string, 'like' | 'dislike'>>(() => {
    try { return JSON.parse(localStorage.getItem('jonycliprd_clip_feedback_v1') || '{}'); } catch { return {}; }
  });
  const [clipActionMenu, setClipActionMenu] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editorVideoRef = useRef<HTMLVideoElement | null>(null);
  const editorPropertiesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(projects));
    } catch {}
  }, [projects]);

  useEffect(() => {
    try { localStorage.setItem('jonycliprd_clip_feedback_v1', JSON.stringify(clipFeedback)); } catch {}
  }, [clipFeedback]);

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
    setEditTrimStart(0);
    setEditTrimEnd(0);
    setEditVolume(100);
    setEditorTool('subtitulos');
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

  // Convert the editable lines (and per-word colors/emojis) into the
  // actual timed word payload consumed by the backend ASS subtitle renderer.
  const seekInEditor = (seconds: number) => {
    const player = editorVideoRef.current;
    if (!player) return;
    const position = Math.max(editTrimStart, Math.min(editingClip?.duration || 0, seconds));
    player.currentTime = position;
    setCurrentPreviewTime(position);
  };

  const makeRenderWords = () => {
    return editSubtitles.flatMap((line) => {
      const textWords = line.text.trim().split(/\s+/).filter(Boolean);
      if (!textWords.length || line.end <= line.start) return [];
      const step = (line.end - line.start) / textWords.length;
      return textWords.map((word, idx) => ({
        word,
        start: Number(Math.max(0, line.start + step * idx - editTrimStart).toFixed(3)),
        end: Number(Math.min((editingClip?.duration || 0) - editTrimStart - editTrimEnd, line.start + step * (idx + 1) - editTrimStart).toFixed(3)),
        colorAss: line.wordOverrides?.[idx]?.colorAss || editColorAss,
        emoji: editEnableEmojis ? (line.wordOverrides?.[idx]?.emoji ?? line.emoji ?? '') : ''
      }));
    }).filter((w) => w.end > w.start && w.word);
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
          start: editingClip.start + editTrimStart,
          end: editingClip.end - editTrimEnd,
          hookTitle: editingClip.hookTitle || editingClip.title,
          rawVideoUrl: editingClip.rawVideoUrl || editingClip.downloadUrl,
          subtitles: editSubtitles,
          customWords: makeRenderWords(),
          subtitleStyle: editStyleId,
          activeColorAss: editColorAss,
          enableEmojis: editEnableEmojis,
          audioVolume: editVolume / 100,
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
        start: editingClip.start + editTrimStart,
        end: editingClip.end - editTrimEnd,
        duration: editingClip.duration - editTrimStart - editTrimEnd,
        subtitles: editSubtitles.filter((line) => line.end > editTrimStart && line.start < editingClip.duration - editTrimEnd).map((line) => ({
          ...line,
          start: Math.max(0, line.start - editTrimStart),
          end: Math.min(editingClip.duration - editTrimStart - editTrimEnd, line.end - editTrimStart)
        })),
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
      setRenderSuccessNotice('¡El MP4 actualizado se generó con tus cambios!');

      if (shouldDownloadAfter) {
        triggerDirectDownload(cacheBustedUrl, `${updatedClip.title}.mp4`);
      }
    } catch (err: any) {
      alert(`No se pudo aplicar el estilo: ${err.message}`);
    } finally {
      setIsRenderingEdit(false);
    }
  };

  // Preview URLs use /clips/; downloading uses the server-side attachment endpoint.
  // Chrome on iPhone handles Content-Disposition: attachment without a video-preview tab.
  const triggerDirectDownload = (url: string, _filename: string) => {
    if (!url) {
      alert('El clip todavía no tiene un enlace de descarga.');
      return;
    }

    try {
      const clipUrl = new URL(url, window.location.href);
      if (!/^\/clips\/[^/]+\.mp4$/i.test(clipUrl.pathname)) {
        alert('La dirección del clip no es válida para descargar.');
        return;
      }
      clipUrl.pathname = clipUrl.pathname.replace(/^\/clips\//, '/api/download/');
      // Navigate straight to the attachment URL. Cross-origin <a download>
      // and programmatic blob downloads can fail on iOS Chrome.
      window.location.assign(clipUrl.toString());
    } catch {
      alert('No se pudo preparar la descarga. Inténtalo nuevamente.');
    }
  };

  // Native share sheet uses the phone's installed apps. It does not connect
  // social accounts or publish on behalf of the user.
  const shareClip = async (url: string, title: string) => {
    if (!url) {
      alert('Este clip todavía no tiene un video disponible para compartir.');
      return;
    }
    if (!navigator.share) {
      alert('Tu navegador no admite compartir directamente. Pulsa MP4 para guardar el video y compártelo desde tu teléfono.');
      return;
    }
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Video no disponible');
      const blob = await response.blob();
      const file = new File([blob], 'JonyClipRD.mp4', { type: 'video/mp4' });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: title || 'JONY CLIP RD' });
        return;
      }
    } catch (error: any) {
      if (error?.name === 'AbortError') return;
    }
    // Share URLs only if the browser supports it; never claim the file was posted.
    try {
      await navigator.share({ title: title || 'JONY CLIP RD', url });
    } catch (error: any) {
      if (error?.name !== 'AbortError') {
        alert('No se pudo compartir. Descarga el MP4 y usa la aplicación de tu red social para publicarlo.');
      }
    }
  };

  const reactToClip = (clipId: string, feedback: 'like' | 'dislike') => {
    setClipFeedback((prev) => {
      const next = { ...prev };
      if (next[clipId] === feedback) delete next[clipId];
      else next[clipId] = feedback;
      return next;
    });
  };

  // Prepare the post with a real title, description and hashtags. Publishing
  // requires each creator to authorize their accounts via official OAuth APIs.
  const prepareSocialPost = (clip: ClipItem) => {
    const candidateTitle = (clip.hookTitle || clip.title || 'Clip Viral').trim();
    const cleanTitle = candidateTitle.replace(/\s+/g, ' ').slice(0, 100);
    const topicTags = cleanTitle
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().split(/[^a-z0-9]+/)
      .filter((word) => word.length >= 4 && !['viral', 'clip'].includes(word))
      .slice(0, 2)
      .map((word) => '#' + word);
    setPublishTitle(cleanTitle);
    setPublishDescription(cleanTitle + '\n\n¿Qué opinas? 👇');
    setPublishHashtags(['#JonyClipRD', '#Shorts', '#Reels', '#Viral', ...topicTags].join(' '));
    setPublishNetworks([]);
    setPublishClipDraft(clip);
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

      {downloadHelpUrl && (
        <div className="fixed inset-0 z-[100] bg-black/75 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Guardar MP4">
          <div className="max-w-md w-full rounded-2xl bg-[#19112d] border border-fuchsia-400/40 p-5 space-y-4">
            <h2 className="font-black text-lg">Guardar el MP4 en tu teléfono</h2>
            <p className="text-sm text-slate-200">Si no aparece en Descargas, toca «Abrir video». En el reproductor usa Compartir → Guardar video o Guardar en Archivos. El navegador puede mostrar el video antes de guardarlo.</p>
            <a href={downloadHelpUrl} className="block text-center rounded-xl bg-fuchsia-600 px-4 py-3 font-bold" target="_blank" rel="noopener noreferrer">Abrir video para guardar</a>
            <button className="w-full rounded-xl bg-white/10 px-4 py-3" onClick={() => setDownloadHelpUrl(null)}>Cerrar</button>
          </div>
        </div>
      )}
      {showSocialConnections && (
        <div className="fixed inset-0 z-[110] bg-black/85 flex items-center justify-center p-3" role="dialog" aria-modal="true" aria-label="Mis redes sociales">
          <div className="max-w-lg w-full max-h-[90dvh] overflow-y-auto rounded-2xl bg-[#19112d] border border-fuchsia-400/40 p-5 space-y-4">
            <h2 className="font-black text-lg flex items-center gap-2"><Share2 className="w-5 h-5 text-fuchsia-300" /> Mis redes sociales</h2>
            <p className="text-sm text-slate-300">Aquí podrás vincular tus cuentas para publicar en varios destinos con una sola confirmación.</p>
            <div className="space-y-2">
              {SOCIAL_NETWORKS.map((network) => {
                const Icon = network.icon;
                return (
                  <div key={network.id} className="flex items-center justify-between gap-3 bg-black/35 border border-white/10 rounded-xl px-3 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={`w-6 h-6 shrink-0 ${network.color}`} />
                      <div className="min-w-0">
                        <p className="text-sm font-bold">{network.name}</p>
                        <p className="text-[11px] text-amber-200">{network.id === 'youtube' && youtubeConnection.connected
                          ? `${youtubeConnection.channelTitle || 'Canal de YouTube'} · Publicación pendiente` : 'Sin vincular · OAuth pendiente'}</p>
                      </div>
                    </div>
                    <a href={network.site} target="_blank" rel="noopener noreferrer"
                       className="shrink-0 px-2.5 py-2 text-xs rounded-lg bg-white/10 border border-white/15 text-slate-100">
                      Abrir web ↗
                    </a>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-amber-200 bg-amber-400/10 border border-amber-400/25 rounded-xl p-3">
              Abrir una red no vincula tu cuenta. La vinculación segura necesita permisos y autorización oficial de cada plataforma. No te pediremos contraseñas.
            </p>
            <button className="w-full rounded-xl bg-white/10 px-4 py-3 font-bold" onClick={() => setShowSocialConnections(false)}>Cerrar</button>
          </div>
        </div>
      )}
      {publishClipDraft && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-3" role="dialog" aria-modal="true" aria-label="Preparar publicación">
          <div className="max-w-lg w-full max-h-[90dvh] overflow-y-auto rounded-2xl bg-[#19112d] border border-fuchsia-400/40 p-5 space-y-4">
            <h2 className="font-black text-lg">Preparar publicación en mis redes</h2>
            <p className="text-xs text-slate-300">
              Video vertical con sus subtítulos incluidos. Revisa el título, la descripción y los hashtags antes de publicar.
            </p>
            <div className="space-y-1">
              <label htmlFor="publish-title" className="block text-sm font-semibold">Título del video</label>
              <input id="publish-title" type="text" value={publishTitle} maxLength={100}
                onChange={(e) => setPublishTitle(e.target.value)}
                className="w-full bg-black/35 border border-white/20 rounded-xl px-3 py-2.5 text-white" />
            </div>
            <div className="space-y-1">
              <label htmlFor="publish-description" className="block text-sm font-semibold">Descripción</label>
              <textarea id="publish-description" rows={3} value={publishDescription}
                onChange={(e) => setPublishDescription(e.target.value)}
                className="w-full bg-black/35 border border-white/20 rounded-xl px-3 py-2.5 text-white" />
            </div>
            <div className="space-y-1">
              <label htmlFor="publish-hashtags" className="block text-sm font-semibold">Hashtags</label>
              <textarea id="publish-hashtags" rows={2} value={publishHashtags}
                onChange={(e) => setPublishHashtags(e.target.value)}
                className="w-full bg-black/35 border border-white/20 rounded-xl px-3 py-2.5 text-white" />
            </div>
            <button type="button" onClick={() => { setPublishClipDraft(null); setActiveTab('social'); }} className="text-sm font-bold text-cyan-200 underline underline-offset-2">Administrar mis redes sociales</button>
            <fieldset className="space-y-2">
              <legend className="text-sm font-semibold">¿Dónde quieres publicar?</legend>
              <div className="grid grid-cols-2 gap-2">
                {SOCIAL_NETWORKS.map((item) => {
                  const network = item.name + ' ' + item.format;
                  const Icon = item.icon;
                  return (
                  <label key={network} className="text-xs rounded-lg bg-white/5 border border-white/15 px-3 py-2.5 flex items-center gap-2">
                    <input type="checkbox" className="accent-fuchsia-500"
                      checked={publishNetworks.includes(network)}
                      onChange={(e) => setPublishNetworks((prev) => e.target.checked ? [...prev, network] : prev.filter((n) => n !== network))} />
                    <Icon className={`w-4 h-4 ${item.color}`} /> {network}
                  </label>
                )})}
              </div>
            </fieldset>
            <p className="text-xs text-amber-200 border border-amber-400/30 rounded-lg bg-amber-400/10 p-3">
              Publicación automática todavía no disponible: faltan autorizaciones OAuth oficiales para cada cuenta. Seleccionar una red aquí NO publica el video.
            </p>
            <button type="button" disabled className="w-full rounded-xl bg-fuchsia-600/40 px-4 py-3 font-bold opacity-60 cursor-not-allowed">
              Publicar automáticamente (pendiente de conectar cuentas)
            </button>
            <button type="button" className="w-full rounded-xl bg-cyan-600/30 border border-cyan-500/50 px-4 py-3 font-bold"
              onClick={() => {
                const clip = publishClipDraft;
                const caption = [publishTitle.trim(), publishDescription.trim(), publishHashtags.trim()].filter(Boolean).join('\n\n');
                void navigator.clipboard?.writeText(caption).catch(() => {});
                setPublishClipDraft(null);
                void shareClip(clip.downloadUrl, publishTitle || clip.title);
              }}>
              Copiar texto y compartir desde el teléfono
            </button>
            <button type="button" className="w-full rounded-xl bg-white/10 px-4 py-3" onClick={() => setPublishClipDraft(null)}>Cerrar</button>
          </div>
        </div>
      )}
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
              onClick={() => setActiveTab('social')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${activeTab === 'social'
                ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
              >
              <Share2 className="w-4 h-4" /> Mis Redes
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
        <button
          onClick={() => setActiveTab('social')}
          className={`px-3 py-1.5 rounded-lg font-semibold ${activeTab === 'social' ? 'bg-fuchsia-600 text-white' : 'text-slate-400'}`}
        >
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

              <p className="text-xs text-amber-200 bg-amber-500/10 border border-amber-400/30 rounded-xl px-4 py-3">
                ⏳ Los videos MP4 se eliminan automáticamente 48 horas después de generarse para ahorrar almacenamiento. Descárgalos antes de que expiren. Las carpetas pueden permanecer visibles aunque el video haya caducado.
              </p>

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

                    <div className="px-4 pt-4 pb-4 flex-1 flex flex-col gap-3 bg-[#0a0814]">
                      <div>
                        <h3 className="font-extrabold text-[19px] leading-snug text-white line-clamp-2">
                          {clip.hookTitle?.trim() || clip.title}
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-1.5">
                          <span className="text-fuchsia-300 font-semibold uppercase">{clip.subtitleStyle}</span>
                          {' · '}{clip.subtitles?.length || 0} líneas de subtítulos
                        </p>
                      </div>
                      <div className="flex items-center justify-between border-y border-white/10 py-2 gap-2">
                        <div className="flex items-center gap-1.5">
                          <button type="button" title="Me gusta" aria-label="Me gusta" aria-pressed={clipFeedback[String(clip.id)] === 'like'}
                            onClick={() => reactToClip(String(clip.id), 'like')}
                            className={`p-2.5 rounded-xl border ${clipFeedback[String(clip.id)] === 'like' ? 'bg-fuchsia-500/25 text-fuchsia-200 border-fuchsia-400/50' : 'text-slate-200 bg-white/5 border-white/10'}`}>
                            <ThumbsUp className="w-5 h-5" />
                          </button>
                          <button type="button" title="No me gusta" aria-label="No me gusta" aria-pressed={clipFeedback[String(clip.id)] === 'dislike'}
                            onClick={() => reactToClip(String(clip.id), 'dislike')}
                            className={`p-2.5 rounded-xl border ${clipFeedback[String(clip.id)] === 'dislike' ? 'bg-rose-500/20 text-rose-200 border-rose-400/50' : 'text-slate-200 bg-white/5 border-white/10'}`}>
                            <ThumbsDown className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button type="button" title="Editar clip" aria-label="Editar clip"
                            onClick={() => openCapCutEditor(clip)} className="p-2.5 rounded-xl text-slate-200 bg-white/5 border border-white/10">
                            <Scissors className="w-5 h-5" />
                          </button>
                          <button type="button" title="Más acciones" aria-label="Más acciones"
                            aria-expanded={clipActionMenu === String(clip.id)}
                            onClick={() => setClipActionMenu((prev) => prev === String(clip.id) ? null : String(clip.id))}
                            className="p-2.5 rounded-xl text-slate-200 bg-white/5 border border-white/10">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      {clipActionMenu === String(clip.id) && (
                        <div className="flex flex-wrap gap-2 p-2 rounded-xl bg-white/5 border border-white/10">
                          <button type="button" onClick={() => { setClipActionMenu(null); triggerDirectDownload(clip.downloadUrl, `${clip.title}.mp4`); }}
                            className="px-3 py-2 text-xs font-bold rounded-lg bg-purple-600/25 border border-purple-400/30 flex items-center gap-1.5">
                            <Download className="w-4 h-4" /> Descargar MP4
                          </button>
                          <button type="button" onClick={() => { setClipActionMenu(null); void shareClip(clip.downloadUrl, clip.title); }}
                            className="px-3 py-2 text-xs font-bold rounded-lg bg-cyan-600/15 border border-cyan-400/30 flex items-center gap-1.5">
                            <Share2 className="w-4 h-4" /> Compartir
                          </button>
                        </div>
                      )}
                      <div className="grid grid-cols-[54px_minmax(0,1fr)] gap-2.5 mt-auto">
                        <button type="button" aria-label="Descargar MP4" title="Descargar MP4"
                          onClick={() => triggerDirectDownload(clip.downloadUrl, `${clip.title}.mp4`)}
                          className="rounded-2xl border border-white/20 bg-white/5 flex items-center justify-center text-slate-100 min-h-[54px]">
                          <Download className="w-6 h-6" />
                        </button>
                        <button type="button" onClick={() => prepareSocialPost(clip)}
                          className="rounded-2xl bg-[#938cff] hover:bg-[#aaa4ff] text-[#101024] font-extrabold text-base flex items-center justify-center gap-3 min-h-[54px]">
                          <Send className="w-6 h-6" /> Publicar
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


      {activeTab === 'social' && (
        <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#1b1339] via-[#110e26] to-[#0d1725] p-5 sm:p-8">
            <div className="flex gap-3 items-center mb-4">
              <span className="p-3 rounded-2xl bg-fuchsia-500/20"><Share2 className="w-6 h-6 text-fuchsia-200" /></span>
              <div>
                <p className="text-[11px] font-black tracking-[0.16em] text-fuchsia-300 uppercase">Jony Clip RD Studio</p>
                <h1 className="text-2xl sm:text-3xl font-black">Mis redes sociales</h1>
              </div>
            </div>
            <p className="text-sm text-slate-300 max-w-2xl">
              Aquí podrás administrar las cuentas que autorices para publicar clips con título, subtítulos y hashtags.
              Las conexiones automáticas todavía están en preparación; ninguna red está vinculada en esta versión.
            </p>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              {SOCIAL_NETWORKS.map((network) => {
                const Icon = network.icon;
                return (
                  <div key={network.id} className="rounded-2xl bg-black/30 border border-white/10 p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10"><Icon className={`h-6 w-6 ${network.color}`} /></div>
                      <div>
                        <h2 className="font-extrabold text-white">{network.name}</h2>
                        <p className="text-xs text-slate-400">{network.format} · {network.id === 'youtube' && youtubeConnection.connected ? 'Google autorizado' : 'Sin vincular'}</p>
                      </div>
                    </div>
                    <p className="text-xs text-amber-200">{network.id === 'youtube' && youtubeConnection.connected
                      ? `Canal: ${youtubeConnection.channelTitle || 'YouTube'}. Publicar Shorts todavía no está disponible.`
                      : network.id === 'youtube' && youtubeConnection.ready
                        ? 'La autorización de Google está disponible; revisa los permisos antes de continuar.'
                        : 'Pendiente de OAuth y autorización de la plataforma.'}</p>
                    <div className="flex gap-2 mt-auto">
                      <button type="button"
                        disabled={network.id !== 'youtube' || !youtubeConnection.ready || youtubeConnection.connected}
                        onClick={network.id === 'youtube' ? beginYoutubeConnection : undefined}
                        title={network.id === 'youtube' ? 'Autorización oficial de Google cuando esté habilitada' : 'Conexión segura pendiente de configurar'}
                        className={`flex-1 rounded-xl border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-2.5 text-xs font-bold text-fuchsia-200 ${network.id !== 'youtube' || !youtubeConnection.ready || youtubeConnection.connected ? 'opacity-60 cursor-not-allowed' : 'hover:bg-fuchsia-500/20'}`}>
                        {network.id === 'youtube' ? youtubeConnectionLabel : 'Conectar cuenta · Próximamente'}
                      </button>
                      {network.id === 'youtube' && youtubeConnection.connected && (
                        <button type="button" onClick={disconnectYoutube} disabled={youtubeDisconnectBusy}
                          className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-3 py-2.5 text-xs font-bold text-rose-200 disabled:opacity-50">
                          {youtubeDisconnectBusy ? 'Desconectando…' : 'Desconectar'}
                        </button>
                      )}
                      <a href={network.site} target="_blank" rel="noopener noreferrer"
                        className="rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-xs font-bold text-slate-200">
                        Abrir <ExternalLink className="inline h-3.5 w-3.5" />
                      </a>
                    </div>
                    {network.id === 'youtube' && youtubeDisconnectError && (
                      <p role="alert" className="text-xs text-rose-300">{youtubeDisconnectError}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#14101f] p-5 space-y-3">
            <h2 className="font-bold text-lg">Cómo funcionará publicar automáticamente</h2>
            <p className="text-sm text-slate-300">Cada usuario iniciará sesión con el proveedor oficial, elegirá qué cuenta autorizar y podrá revocarla. Al tocar «Publicar», el sistema enviará únicamente a las redes que seleccione y mostrará el resultado por separado.</p>
            <p className="text-xs text-amber-200">Importante: abrir la web de una red no vincula la cuenta. Nunca introduzcas contraseñas de redes sociales directamente en JONY CLIP RD.</p>
            <button type="button" onClick={() => setActiveTab('studio')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white font-bold text-sm">
              Volver a mis clips
            </button>
          </div>
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
        <div className="fixed inset-0 z-50 bg-[#05050b]/95 backdrop-blur-xl flex items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true" aria-label="Editor de video JONY CLIP RD">
          <div className="w-full max-w-7xl h-[100dvh] sm:h-auto sm:max-h-[96dvh] rounded-none sm:rounded-[28px] border-0 sm:border border-white/15 bg-[#0b0c16] overflow-hidden flex flex-col shadow-[0_30px_100px_rgba(0,0,0,0.75)]">
            <div className="shrink-0 px-4 sm:px-6 py-3.5 border-b border-white/10 flex items-center justify-between gap-3 bg-gradient-to-r from-[#151226] via-[#0f1020] to-[#101625]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-fuchsia-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-fuchsia-600/20">
                  <Clapperboard className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black tracking-[0.2em] uppercase text-fuchsia-300">JONY CLIP RD · VIDEO STUDIO</p>
                  <h2 className="font-extrabold text-sm sm:text-base text-white truncate">{editingClip.title}</h2>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 text-[11px] font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Editor 9:16
                </span>
                <button type="button" aria-label="Cerrar editor" title="Cerrar editor"
                  onClick={() => setEditingClip(null)}
                  className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/15 text-slate-200">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="shrink-0 order-2 lg:order-1 border-y border-white/10 bg-[#10111e] p-3 sm:p-5 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-black tracking-[0.14em] text-slate-200 uppercase flex items-center gap-2"><Film className="h-4 w-4 text-fuchsia-400" /> Línea de tiempo <span className="hidden sm:inline text-slate-500">· Video y subtítulos</span></span>
                <span className="text-xs font-mono tabular-nums text-cyan-200 px-2.5 py-1 rounded-lg bg-black/40 border border-white/10">{formatMMSS(currentPreviewTime)} <span className="text-slate-500">/</span> {formatMMSS(editingClip.duration)}</span>
              </div>
              <div className="relative rounded-2xl border border-white/15 overflow-hidden bg-[#090b14] shadow-inner shadow-black/40">
                <div className="flex h-12">
                  {Array.from({ length: Math.max(4, Math.min(12, Math.ceil(editingClip.duration / 4))) }, (_, i) => (
                    <button type="button" key={i} onClick={() => seekInEditor(((i + 0.5) / Math.max(4, Math.min(12, Math.ceil(editingClip.duration / 4)))) * editingClip.duration)}
                      className="flex-1 min-w-0 border-r border-black/40 bg-gradient-to-b from-slate-500/30 via-violet-700/40 to-indigo-900/60 hover:brightness-125 transition"
                      aria-label={`Ir al segundo ${Math.round(((i + 0.5) / Math.max(4, Math.min(12, Math.ceil(editingClip.duration / 4)))) * editingClip.duration)}`}>
                      <Film className="w-4 h-4 mx-auto text-fuchsia-200/70" />
                    </button>
                  ))}
                </div>
                <div className="relative h-9 bg-[#181420] border-t border-white/10">
                  {editSubtitles.map((line, i) => (
                    <button key={line.id} type="button" title={line.text}
                      onClick={() => { seekInEditor(line.start); setEditorTool('subtitulos'); }}
                      style={{ left: `${Math.max(0, line.start / Math.max(1, editingClip.duration) * 100)}%`,
                        width: `${Math.max(1.5, (line.end - line.start) / Math.max(1, editingClip.duration) * 100)}%` }}
                      className="absolute top-1.5 h-6 rounded-md bg-amber-400/90 border border-amber-200/70 text-[9px] text-black font-extrabold truncate px-1.5 shadow-sm">
                      {line.text || `Texto ${i + 1}`}
                    </button>
                  ))}
                </div>
                <div className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none"
                  style={{ left: `${Math.min(100, currentPreviewTime / Math.max(1, editingClip.duration) * 100)}%` }} />
                <div className="absolute top-0 bottom-0 bg-black/50 pointer-events-none" style={{ left: 0, width: `${editTrimStart / Math.max(1, editingClip.duration) * 100}%` }} />
                <div className="absolute top-0 bottom-0 bg-black/50 pointer-events-none" style={{ right: 0, width: `${editTrimEnd / Math.max(1, editingClip.duration) * 100}%` }} />
              </div>
              <input type="range" min={editTrimStart} max={Math.max(editTrimStart + 0.1, editingClip.duration - editTrimEnd)} step={0.1}
                value={Math.max(editTrimStart, Math.min(currentPreviewTime, editingClip.duration - editTrimEnd))}
                onChange={(e) => seekInEditor(Number(e.target.value))}
                aria-label="Mover cabezal de reproducción" className="w-full accent-fuchsia-400 cursor-pointer" />
              <div className="flex gap-2 overflow-x-auto pb-1 snap-x">
                {([
                  ['recortar', '✂ Recortar'],
                  ['texto', 'T Texto'],
                  ['subtitulos', '▤ Subtítulos'],
                  ['estilo', '✦ Estilos'],
                  ['audio', '♫ Audio']
                ] as const).map(([tool, label]) => (
                  <button key={tool} type="button" onClick={() => {
                      setEditorTool(tool);
                      editorPropertiesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }}
                    className={`shrink-0 snap-start px-3.5 py-2.5 rounded-xl text-xs font-bold border transition ${editorTool === tool ? 'bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white border-fuchsia-400 shadow-lg shadow-purple-500/15' : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'}`}>
                    {label}
                  </button>
                ))}
              </div>

            </div>

            <div className="order-1 lg:order-2 flex-1 min-h-0 overflow-y-auto grid lg:grid-cols-12 gap-4 sm:gap-5 p-3 sm:p-5 bg-[#0a0b15]">
              <div className="lg:col-span-4 flex flex-col items-center justify-start bg-[#101322] rounded-2xl p-3 sm:p-5 border border-white/10 shadow-inner shadow-black/30"><div className="w-full flex items-center justify-between gap-2 mb-3"><span className="text-xs font-black tracking-wide text-slate-200 flex items-center gap-2"><Play className="w-4 h-4 text-fuchsia-400" /> VISTA PREVIA</span><span className="text-[10px] font-bold px-2 py-1 bg-emerald-400/10 text-emerald-300 border border-emerald-400/20 rounded-md">9:16 · VERTICAL</span></div>
                <div className="relative w-full max-w-[230px] lg:max-w-[290px] aspect-[9/16] rounded-xl overflow-hidden bg-black border border-white/20 ring-4 ring-black/40 shadow-2xl">
                  <video
                    key={editingClip.downloadUrl}
                    ref={editorVideoRef}
                    src={editingClip.downloadUrl}
                    autoPlay
                    loop
                    playsInline
                    onTimeUpdate={(e) => {
                      const t = e.currentTarget.currentTime;
                      if (t >= editingClip.duration - editTrimEnd && !e.currentTarget.paused) {
                        e.currentTarget.currentTime = editTrimStart;
                        setCurrentPreviewTime(editTrimStart);
                        return;
                      }
                      setCurrentPreviewTime(t);
                    }}
                    onLoadedMetadata={(e) => { e.currentTarget.volume = Math.min(1, editVolume / 100); }}
                    muted={editVolume === 0}
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

              <div ref={editorPropertiesRef} className="lg:col-span-8 space-y-4 rounded-2xl border border-white/10 bg-[#111320] p-3 sm:p-5"><div className="flex items-center justify-between pb-3 border-b border-white/10"><div><p className="text-[10px] font-black uppercase tracking-[0.14em] text-fuchsia-300">Propiedades</p><h3 className="font-extrabold text-sm text-white">{ editorTool === 'recortar' ? 'Recortar el video' : editorTool === 'texto' ? 'Editar texto y palabras' : editorTool === 'subtitulos' ? 'Editar subtítulos y tiempos' : editorTool === 'estilo' ? 'Estilos y colores' : 'Editar audio' }</h3></div><span className="text-xs font-mono text-slate-400">{editSubtitles.length} líneas</span></div>
                <p className="text-[11px] text-slate-400">Los cambios se aplican al MP4 al pulsar «Aplicar y generar MP4».</p>
                              {editorTool === 'recortar' && (
                <div className="grid grid-cols-2 gap-3 text-xs rounded-xl bg-white/5 p-3">
                  <label>Recortar inicio: {editTrimStart.toFixed(1)} s
                    <input type="range" min={0} max={Math.max(0, editingClip.duration - editTrimEnd - 2)}
                      step={0.1} value={editTrimStart} onChange={(e) => { setEditTrimStart(Number(e.target.value)); seekInEditor(Number(e.target.value)); }}
                      className="block w-full accent-fuchsia-400 mt-2" />
                  </label>
                  <label>Recortar final: {editTrimEnd.toFixed(1)} s
                    <input type="range" min={0} max={Math.max(0, editingClip.duration - editTrimStart - 2)}
                      step={0.1} value={editTrimEnd} onChange={(e) => setEditTrimEnd(Number(e.target.value))}
                      className="block w-full accent-fuchsia-400 mt-2" />
                  </label>
                  <span className="col-span-2 text-slate-300">Duración final: {formatMMSS(editingClip.duration - editTrimStart - editTrimEnd)}. Pulsa «Guardar y Descargar MP4» para exportar el recorte.</span>
                </div>
              )}
              {editorTool === 'audio' && (
                <label className="block text-xs rounded-xl bg-white/5 p-3">
                  Volumen del audio original: {editVolume}%
                  <input type="range" min={0} max={200} step={5} value={editVolume}
                    onChange={(e) => {
                      const next = Number(e.target.value);
                      setEditVolume(next);
                      if (editorVideoRef.current) editorVideoRef.current.volume = Math.min(1, next / 100);
                    }}
                    className="block w-full accent-cyan-400 mt-2" />
                  <span className="block text-slate-400 mt-2">El volumen se aplicará al MP4 exportado.</span>
                </label>
              )}

                {editorTool === 'estilo' && (<>
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

                </>)}
                {(editorTool === 'texto' || editorTool === 'subtitulos') && (<>
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

                          <div className="flex items-center gap-3 text-xs text-slate-300">
                            <label className="flex items-center gap-1.5">
                              Inicio (s)
                              <input type="number" min={0} max={editingClip.duration} step={0.1}
                                value={line.start}
                                onChange={(e) => setEditSubtitles((prev) => prev.map((item, idx) => idx === index ? {
                                  ...item, start: Math.max(0, Math.min(Number(e.target.value) || 0, item.end - 0.1))
                                } : item))}
                                className="w-16 rounded-lg bg-white/10 px-1.5 py-1 text-white border border-white/10" />
                            </label>
                            <label className="flex items-center gap-1.5">
                              Fin (s)
                              <input type="number" min={0.1} max={editingClip.duration} step={0.1}
                                value={line.end}
                                onChange={(e) => setEditSubtitles((prev) => prev.map((item, idx) => idx === index ? {
                                  ...item, end: Math.max(item.start + 0.1, Math.min(editingClip.duration, Number(e.target.value) || item.end))
                                } : item))}
                                className="w-16 rounded-lg bg-white/10 px-1.5 py-1 text-white border border-white/10" />
                            </label>
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

                </>)}
                {renderSuccessNotice && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{renderSuccessNotice}</span>
                  </div>
                )}

                <div className="sticky bottom-0 z-10 -mx-3 sm:-mx-5 -mb-3 sm:-mb-5 px-3 sm:px-5 py-3 bg-[#141729]/95 backdrop-blur-xl border-t border-white/15 flex flex-wrap items-center justify-end gap-2.5">
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
                      {isRenderingEdit ? 'Renderizando MP4...' : 'Aplicar y generar MP4'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyCapCutChanges(true)}
                    disabled={isRenderingEdit}
                    className="px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 hover:brightness-110 disabled:opacity-50 text-xs sm:text-sm font-black flex items-center gap-2 shadow-xl shadow-fuchsia-600/30 cursor-pointer"
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
