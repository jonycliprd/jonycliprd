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
  Wand2
} from 'lucide-react';

interface SubtitleLine {
  id: string;
  start: number;
  end: number;
  text: string;
}

interface ClipItem {
  id: number;
  title: string;
  score: number;
  start: number;
  end: number;
  duration: number;
  subtitleStyle: string;
  subtitles: SubtitleLine[];
  thumbnailUrl?: string;
  rawVideoUrl?: string;
  downloadUrl: string;
}

interface ProjectFolder {
  id: string;
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
    previewText: '¡ESTO CAMBIA TODO!',
    previewClass: 'text-yellow-300 font-black tracking-wide drop-shadow-[0_3px_3px_rgba(0,0,0,1)] uppercase',
    defaultColorAss: '&H0000FFFF'
  },
  {
    id: 'mrbeast',
    name: 'MrBeast Impacto',
    badge: 'Alto Contraste',
    previewText: '¡NO LO VAS A CREER!',
    previewClass: 'text-white font-black tracking-wider drop-shadow-[0_4px_0_rgba(0,0,0,1)] uppercase',
    defaultColorAss: '&H00FFFFFF'
  },
  {
    id: 'neon',
    name: 'Neón Viral',
    badge: 'Gaming / Clips',
    previewText: '¡QUÉ LOCURA EN VIVO!',
    previewClass: 'text-cyan-300 font-black drop-shadow-[0_0_10px_rgba(236,72,153,0.95)] uppercase',
    defaultColorAss: '&H00FFF200'
  },
  {
    id: 'karaoke_box',
    name: 'Caja CapCut',
    badge: 'Lectura Clara',
    previewText: 'SUBTÍTULO CON FONDO',
    previewClass: 'bg-black/85 text-white px-2.5 py-1 rounded-md font-bold uppercase',
    defaultColorAss: '&H00FFFFFF'
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    badge: 'Podcast',
    previewText: 'Texto limpio y elegante',
    previewClass: 'text-white/95 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]',
    defaultColorAss: '&H00FFFFFF'
  },
  {
    id: 'none',
    name: 'Sin Subtítulos',
    badge: 'Video Limpio',
    previewText: 'Solo recorte vertical 9:16',
    previewClass: 'text-slate-400 italic text-xs',
    defaultColorAss: '&H00FFFFFF'
  }
];

const COLOR_SWATCHES = [
  { label: 'Amarillo Viral', hex: '#FACC15', ass: '&H0000FFFF' },
  { label: 'Blanco Puro', hex: '#FFFFFF', ass: '&H00FFFFFF' },
  { label: 'Cian Neón', hex: '#22D3EE', ass: '&H00FFF200' },
  { label: 'Verde Lima', hex: '#4ADE80', ass: '&H0055FF44' },
  { label: 'Rosa Intenso', hex: '#F472B6', ass: '&H00B469FF' },
  { label: 'Naranja Fuego', hex: '#FB923C', ass: '&H000088FF' }
];

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
  const [activeTab, setActiveTab] = useState<'create' | 'studio' | 'folders' | 'plans'>('create');
  const [inputMode, setInputMode] = useState<'link' | 'upload'>('link');
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [clipDuration, setClipDuration] = useState<number>(30);
  const [clipCount, setClipCount] = useState<number>(3);
  const [selectedPreset, setSelectedPreset] = useState<string>('hormozi');

  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState(0);
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
  const [editFontSize, setEditFontSize] = useState<number>(46);
  const [editColorAss, setEditColorAss] = useState<string>('&H0000FFFF');
  const [editMarginV, setEditMarginV] = useState<number>(190);
  const [currentPreviewTime, setCurrentPreviewTime] = useState<number>(0);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState<boolean>(true);
  const [isRenderingEdit, setIsRenderingEdit] = useState<boolean>(false);

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

    const stepTimer1 = setTimeout(() => setProcessStep(2), 4500);
    const stepTimer2 = setTimeout(() => setProcessStep(3), 11000);
    const stepTimer3 = setTimeout(() => setProcessStep(4), 19000);

    try {
      const formData = new FormData();
      formData.append('duration', String(clipDuration));
      formData.append('count', String(clipCount));
      formData.append('subtitleStyle', selectedPreset);

      if (inputMode === 'upload' && selectedFile) {
        formData.append('video', selectedFile);
      } else {
        formData.append('url', videoUrl.trim());
      }

      const response = await fetch(`${API_BASE.replace(/\/$/, '')}/api/process`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.details || data.error || 'No se pudo procesar el video en Railway.');
      }

      const newFolder: ProjectFolder = {
        id: data.project?.id || Date.now().toString(),
        title: data.project?.title || 'Proyecto Viral • JONY CLIP RD',
        channel: data.project?.channel || 'JONY CLIP RD Studio',
        sourceUrl: data.project?.sourceUrl || videoUrl.trim(),
        thumbnailUrl: data.project?.thumbnailUrl || data.clips?.[0]?.thumbnailUrl || '',
        totalDuration: data.project?.totalDuration || clipDuration * clipCount,
        createdAt: data.project?.createdAt || new Date().toISOString(),
        clips: data.clips || []
      };

      setProjects((prev) => [newFolder, ...prev]);
      setActiveProjectId(newFolder.id);

      if (!isOwner) {
        const nextUsed = trialUsed + (data.clips?.length || 1);
        setTrialUsed(nextUsed);
        localStorage.setItem(STORAGE_TRIAL_KEY, String(nextUsed));
      }

      setActiveTab('studio');
    } catch (err: any) {
      setErrorMsg(`Error del servidor: ${err.message || 'No se pudo conectar con Railway.'}`);
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      setIsProcessing(false);
      setProcessStep(0);
    }
  };

  const openCapCutEditor = (clip: ClipItem) => {
    setEditingClip(clip);
    setEditStyleId(clip.subtitleStyle || 'hormozi');
    const presetObj = SUBTITLE_PRESETS.find((p) => p.id === (clip.subtitleStyle || 'hormozi'));
    setEditColorAss(presetObj?.defaultColorAss || '&H0000FFFF');
    setEditFontSize(46);
    setEditMarginV(190);
    setCurrentPreviewTime(0);
    setIsPreviewPlaying(true);

    if (clip.subtitles && clip.subtitles.length > 0) {
      setEditSubtitles(clip.subtitles.map((s) => ({ ...s })));
    } else {
      setEditSubtitles([
        { id: '1', start: 0, end: Math.min(4, clip.duration), text: '¡MIRA LO QUE ACABA DE PASAR AQUÍ!' },
        {
          id: '2',
          start: Math.min(4, clip.duration),
          end: Math.min(8, clip.duration),
          text: 'EDITA ESTE TEXTO ESTILO CAPCUT'
        }
      ]);
    }
  };

  const handleSaveCapCutRender = async () => {
    if (!editingClip || !activeProject) return;
    setIsRenderingEdit(true);

    try {
      const response = await fetch(`${API_BASE.replace(/\/$/, '')}/api/render-clip`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawVideoUrl: editingClip.rawVideoUrl || editingClip.downloadUrl,
          subtitles: editSubtitles,
          subtitleStyle: editStyleId,
          customOptions: {
            fontSize: editFontSize,
            primaryColorAss: editColorAss,
            marginV: editMarginV
          }
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.details || data.error || 'Error renderizando subtítulos.');
      }

      const updatedClip: ClipItem = {
        ...editingClip,
        subtitleStyle: editStyleId,
        subtitles: editSubtitles,
        downloadUrl: data.downloadUrl
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
      triggerDirectDownload(data.downloadUrl, `${updatedClip.title}.mp4`);
    } catch (err: any) {
      alert(`No se pudo aplicar el estilo: ${err.message}`);
    } finally {
      setIsRenderingEdit(false);
    }
  };

  const triggerDirectDownload = (url: string, filename: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ _-]/g, '') || 'JonyClipRD_9x16.mp4';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
                    Duración de cada clip
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
                    ~{clipDuration} segundos
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[15, 30, 45, 60, 90].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => setClipDuration(sec)}
                      className={`py-2 rounded-xl text-xs font-black transition ${
                        clipDuration === sec
                          ? 'bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white shadow-md'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {sec}s
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
                    Cantidad de clips a generar
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {clipCount} clips
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={1}
                    max={15}
                    value={clipCount}
                    onChange={(e) => setClipCount(Number(e.target.value))}
                    className="w-full accent-fuchsia-500 cursor-pointer"
                  />
                  <div className="flex gap-1.5">
                    {[3, 5, 10].map((n) => (
                      <button
                        key={n}
                        onClick={() => setClipCount(n)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold ${
                          clipCount === n
                            ? 'bg-fuchsia-600 text-white'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-200 flex items-center gap-2">
                  <Type className="w-4 h-4 text-fuchsia-400" /> Estilo de Subtítulos Automáticos (Estilo CapCut)
                </span>
                <span className="text-[11px] text-slate-400">
                  Luego podrás editar texto, color y tamaño en el estudio
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {SUBTITLE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPreset(preset.id)}
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
                      <span className={`text-[11px] leading-tight block ${preset.previewClass}`}>
                        {preset.previewText}
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
                      <Lock className="w-3 h-3" /> Motor IA + FFmpeg Activo • Portadas Reales + Subtítulos CapCut
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
                  accept="video/mp4,video/quicktime,video/x-matroska"
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
