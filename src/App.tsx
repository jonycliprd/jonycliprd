import React, { useState, useEffect } from 'react';
import {
  Home,
  Zap,
  Crown,
  Star,
  HelpCircle,
  User,
  Rocket,
  Link2,
  Wand2,
  ArrowRight,
  Lock,
  Film,
  Subtitles,
  Smartphone,
  CloudDownload,
  Brain,
  Clapperboard,
  Upload,
  Play,
  Pause,
  X,
  CheckCircle2,
  Sparkles,
  Download,
  Volume2,
  VolumeX,
  Check,
  AlertCircle,
  Menu,
  CreditCard,
  Building2,
  Copy,
  MessageCircle,
  LogOut,
  Sliders,
  Type,
  Palette,
  Clock,
  ShieldCheck,
  Trash2,
  FileVideo,
  FolderUp,
  Sparkle
} from 'lucide-react';

// --- CUSTOM BRAND & SOCIAL SVG ICONS ---

const BrandLogoIcon = ({ size = 'md' }) => {
  const dimensions = size === 'lg' ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-10 h-10';
  const crownSize = size === 'lg' ? 'w-9 h-9 -top-5 -left-2' : 'w-5 h-5 -top-3 -left-1';

  return (
    <div className={`relative inline-flex items-center justify-center ${dimensions} select-none shrink-0`}>
      <svg
        viewBox="0 0 64 48"
        className={`absolute ${crownSize} -rotate-12 drop-shadow-[0_0_10px_rgba(250,204,21,0.85)] z-20`}
        fill="none"
      >
        <defs>
          <linearGradient id="crownGrad" x1="0" y1="0" x2="64" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>
        <path
          d="M6 38L12 14L25 25L32 8L39 25L52 14L58 38H6Z"
          fill="url(#crownGrad)"
          stroke="#FEF08A"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <rect x="6" y="40" width="52" height="5" rx="2.5" fill="url(#crownGrad)" />
        <circle cx="12" cy="11" r="3" fill="#FEF08A" />
        <circle cx="32" cy="5" r="3.5" fill="#FEF08A" />
        <circle cx="52" cy="11" r="3" fill="#FEF08A" />
      </svg>

      <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-[0_0_16px_rgba(168,85,247,0.75)]">
        <defs>
          <linearGradient id="playBorderGrad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#D946EF" />
          </linearGradient>
          <linearGradient id="playInnerGrad" x1="15" y1="15" x2="65" y2="65" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.45" />
          </linearGradient>
        </defs>
        <path
          d="M16 12C16 8.5 19.8 6.3 22.8 8.1L68.8 36.1C71.7 37.9 71.7 42.1 68.8 43.9L22.8 71.9C19.8 73.7 16 71.5 16 68V12Z"
          fill="url(#playInnerGrad)"
          stroke="url(#playBorderGrad)"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <path
          d="M27 24L54 40L27 56V24Z"
          fill="none"
          stroke="#E0F2FE"
          strokeWidth="2.5"
          strokeLinejoin="round"
          opacity="0.85"
        />
      </svg>
    </div>
  );
};

const YouTubeBadge = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect x="2" y="4" width="20" height="16" rx="4.5" fill="#FF0000" />
    <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="white" />
  </svg>
);

const TwitchBadge = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <path d="M4 3H21V14L16 19H12L9 22V19H4V3Z" fill="#9146FF" />
    <path d="M6 5V16H10V18.5L12.5 16H16.5L19 13.5V5H6Z" fill="white" />
    <rect x="14" y="7.5" width="2" height="5" fill="#9146FF" />
    <rect x="10" y="7.5" width="2" height="5" fill="#9146FF" />
  </svg>
);

const KickBadge = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect x="2" y="2" width="20" height="20" rx="5" fill="#0B0E0F" stroke="#53FC18" strokeWidth="1.4" />
    <path
      d="M6.5 5.5H10.5V9.5H12.2V7.5H14.2V5.5H18V9.5H16V11.2H14.2V12.8H16V14.5H18V18.5H14.2V16.5H12.2V14.5H10.5V18.5H6.5V5.5Z"
      fill="#53FC18"
    />
  </svg>
);

const TikTokBadge = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect x="2" y="2" width="20" height="20" rx="5" fill="#09090B" stroke="#27272A" strokeWidth="1" />
    <path
      d="M16.5 8.2C15.4 7.5 14.7 6.3 14.6 5H12.3V14.2C12.3 15.4 11.3 16.4 10.1 16.4C8.9 16.4 7.9 15.4 7.9 14.2C7.9 13 8.9 12 10.1 12C10.4 12 10.6 12.1 10.8 12.1V9.7C10.6 9.7 10.3 9.6 10.1 9.6C7.6 9.6 5.5 11.7 5.5 14.2C5.5 16.7 7.6 18.8 10.1 18.8C12.6 18.8 14.7 16.7 14.7 14.2V9.5C15.6 10.2 16.7 10.6 17.9 10.6V8.3C17.4 8.3 16.9 8.3 16.5 8.2Z"
      fill="#25F4EE"
      transform="translate(-0.7, -0.5)"
    />
    <path
      d="M16.5 8.2C15.4 7.5 14.7 6.3 14.6 5H12.3V14.2C12.3 15.4 11.3 16.4 10.1 16.4C8.9 16.4 7.9 15.4 7.9 14.2C7.9 13 8.9 12 10.1 12C10.4 12 10.6 12.1 10.8 12.1V9.7C10.6 9.7 10.3 9.6 10.1 9.6C7.6 9.6 5.5 11.7 5.5 14.2C5.5 16.7 7.6 18.8 10.1 18.8C12.6 18.8 14.7 16.7 14.7 14.2V9.5C15.6 10.2 16.7 10.6 17.9 10.6V8.3C17.4 8.3 16.9 8.3 16.5 8.2Z"
      fill="#FE2C55"
      transform="translate(0.7, 0.5)"
    />
    <path
      d="M16.5 8.2C15.4 7.5 14.7 6.3 14.6 5H12.3V14.2C12.3 15.4 11.3 16.4 10.1 16.4C8.9 16.4 7.9 15.4 7.9 14.2C7.9 13 8.9 12 10.1 12C10.4 12 10.6 12.1 10.8 12.1V9.7C10.6 9.7 10.3 9.6 10.1 9.6C7.6 9.6 5.5 11.7 5.5 14.2C5.5 16.7 7.6 18.8 10.1 18.8C12.6 18.8 14.7 16.7 14.7 14.2V9.5C15.6 10.2 16.7 10.6 17.9 10.6V8.3C17.4 8.3 16.9 8.3 16.5 8.2Z"
      fill="white"
    />
  </svg>
);

const FacebookBadge = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <circle cx="12" cy="12" r="10" fill="#1877F2" />
    <path
      d="M13.5 19V12.8H15.6L15.9 10.4H13.5V8.9C13.5 8.2 13.7 7.7 14.7 7.7H16V5.6C15.8 5.6 15 5.5 14.1 5.5C12.2 5.5 10.9 6.6 10.9 8.7V10.4H8.8V12.8H10.9V19H13.5Z"
      fill="white"
    />
  </svg>
);

const VideoUploadBadge = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <rect x="2" y="3" width="20" height="18" rx="5" fill="#7C3AED" />
    <path d="M9.5 8.5L15.5 12L9.5 15.5V8.5Z" fill="white" />
  </svg>
);

const PRICING_PLANS = [
  {
    id: 'prepago',
    name: 'Paquete Prepago',
    badge: 'Pago Único',
    usdPrice: 5,
    dopPrice: 300,
    periodLabel: 'pago único',
    minutes: 60,
    desc: 'Quita la marca de agua y procesa hasta 60 minutos sin suscripción.',
    features: [
      'SIN marca de agua "JONY CLIP RD"',
      '60 minutos de directos o videos subidos',
      'Exportación Full HD 1080p vertical 9:16',
      'Subtítulos automáticos dinámicos en español'
    ],
    highlighted: false
  },
  {
    id: 'creador',
    name: 'Plan Creador',
    badge: 'Más Popular',
    usdPrice: 10,
    dopPrice: 600,
    periodLabel: '/mes',
    minutes: 180,
    desc: 'Para streamers activos en Kick, Twitch, YouTube y TikTok.',
    features: [
      'SIN marca de agua en todos tus clips',
      '180 minutos de directos o videos al mes',
      'Editor integrado de texto y colores neón',
      'Exportación 1080p 60fps lista para viralizar'
    ],
    highlighted: true
  },
  {
    id: 'streamer-pro',
    name: 'Plan Streamer Pro',
    badge: 'Potencia Máxima',
    usdPrice: 25,
    dopPrice: 1500,
    periodLabel: '/mes',
    minutes: 600,
    desc: 'Para canales diarios, podcasts largos y equipos de contenido.',
    features: [
      'SIN marca de agua + Kit de marca propio',
      '600 minutos de directos o videos al mes',
      'Prioridad máxima en servidores GPU',
      'Soporte VIP directo por WhatsApp'
    ],
    highlighted: false
  }
];

const SAMPLE_CLIPS = [
  {
    id: 'sample-1',
    title: '¡NO PUEDE SER ESA JUGADA EN EL ÚLTIMO SEGUNDO! 🔥',
    creator: '@ElKingGamerRD',
    platform: 'youtube',
    duration: '0:28',
    viralityScore: 98,
    accent: 'from-blue-600 via-indigo-900 to-slate-950',
    avatarEmoji: '🎧',
    sceneTag: 'CLUTCH ÉPICO EN DIRECTO',
    highlightColor: '#FDE047',
    fontStyle: 'impact',
    hasBrandWatermark: false,
    captions: [
      { text: '¡AGUANTA QUE QUEDAN 3 SEGUNDOS!', highlight: '3 SEGUNDOS!' },
      { text: '¿CÓMO LE DIO ESE TIRO DESDE AHÍ?', highlight: 'ESE TIRO' },
      { text: '¡KLK MI GENTE, ROMPIMOS EL SERVIDOR! 🔥', highlight: 'ROMPIMOS EL SERVIDOR!' }
    ]
  },
  {
    id: 'sample-2',
    title: 'Locura total en Kick cuando cae el raid de 1,500 viewers 💚⚡',
    creator: '@JonyStreamRD',
    platform: 'kick',
    duration: '0:32',
    viralityScore: 99,
    accent: 'from-emerald-600 via-teal-950 to-slate-950',
    avatarEmoji: '💚',
    sceneTag: 'KICK LIVE • MOMENTO VIRAL',
    highlightColor: '#53FC18',
    fontStyle: 'impact',
    hasBrandWatermark: false,
    captions: [
      { text: '¡ESPEREN! ¿QUIÉN MANDÓ ESE RAID EN KICK?', highlight: 'RAID EN KICK?' },
      { text: '¡1,500 PERSONAS EN VIVO AHORA MISMO! 🤯', highlight: '1,500 PERSONAS' },
      { text: '¡REPÚBLICA DOMINICANA EN LA CASA! 🇩🇴🔥', highlight: 'EN LA CASA!' }
    ]
  },
  {
    id: 'sample-3',
    title: 'El consejo más real para crecer haciendo directos hoy 🎙️',
    creator: '@LaCabinaPodcastRD',
    platform: 'twitch',
    duration: '0:30',
    viralityScore: 95,
    accent: 'from-violet-700 via-slate-900 to-black',
    avatarEmoji: '🎙️',
    sceneTag: 'PODCAST • MOMENTO ORO',
    highlightColor: '#E879F9',
    fontStyle: 'modern',
    hasBrandWatermark: false,
    captions: [
      { text: 'La gente cree que necesita una PC de 5 mil dólares...', highlight: '5 mil dólares...' },
      { text: '¡MENTIRA! Lo que necesitas es constancia y buenos clips.', highlight: 'buenos clips.' },
      { text: 'De un solo directo sacas contenido pa’ toda la semana.', highlight: 'toda la semana.' }
    ]
  },
  {
    id: 'sample-4',
    title: 'Su reacción al ver la donación en pleno TikTok LIVE 😱💜',
    creator: '@ValeriaStreams',
    platform: 'tiktok',
    duration: '0:25',
    viralityScore: 96,
    accent: 'from-fuchsia-700 via-purple-900 to-slate-950',
    avatarEmoji: '😱',
    sceneTag: 'TIKTOK LIVE • 96% SCORE',
    highlightColor: '#38BDF8',
    fontStyle: 'impact',
    hasBrandWatermark: false,
    captions: [
      { text: 'Esperen... ¿quién acaba de mandar eso al chat?', highlight: 'mandar eso' },
      { text: '¡NOOO! ¡QUÉ LOCURA DE REGALO! 😭💜', highlight: 'QUÉ LOCURA' },
      { text: '¡Ustedes están pasados, gracias mi gente!', highlight: 'gracias mi gente!' }
    ]
  }
];

const detectPlatformFromUrl = (url: string) => {
  const lower = url.toLowerCase();
  if (lower.includes('kick.com')) return 'kick';
  if (lower.includes('twitch.tv')) return 'twitch';
  if (lower.includes('tiktok.com')) return 'tiktok';
  if (lower.includes('facebook.com') || lower.includes('fb.watch')) return 'facebook';
  return 'youtube';
};

const getPlatformLabel = (platform: string) => {
  switch (platform) {
    case 'upload':
      return 'Video Subido';
    case 'kick':
      return 'Kick';
    case 'twitch':
      return 'Twitch';
    case 'tiktok':
      return 'TikTok LIVE';
    case 'facebook':
      return 'Facebook Live';
    default:
      return 'YouTube';
  }
};

const formatFileSize = (bytes: number) => {
  if (!bytes) return '0 MB';
  const mb = bytes / (1024 * 1024);
  return mb >= 1024 ? `${(mb / 1024).toFixed(2)} GB` : `${mb.toFixed(1)} MB`;
};

const formatSecondsToDuration = (sec: number) => {
  if (!sec || Number.isNaN(sec)) return '00:30';
  const mins = Math.floor(sec / 60);
  const rem = Math.floor(sec % 60);
  return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
};

export default function App() {
  const API_BASE_URL = (
    import.meta.env.VITE_API_URL || 'https://jonycliprd-backend-production.up.railway.app'
  ).replace(/\/$/, '');

  const [activeNav, setActiveNav] = useState('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [inputMode, setInputMode] = useState('url');
  const [streamUrl, setStreamUrl] = useState('');
  const [urlError, setUrlError] = useState('');

  const [clipDurationSec, setClipDurationSec] = useState(30);
  const [desiredClipCount, setDesiredClipCount] = useState(3);

  const [isOwnerMode, setIsOwnerMode] = useState(() => {
    try {
      return localStorage.getItem('jonyclip_owner') === 'true';
    } catch {
      return false;
    }
  });
  const [ownerModalOpen, setOwnerModalOpen] = useState(false);
  const [ownerPinInput, setOwnerPinInput] = useState('');

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState('');
  const [uploadedVideoDuration, setUploadedVideoDuration] = useState(0);
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [user, setUser] = useState<any>(() => {
    try {
      const saved = localStorage.getItem('jonyclip_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [freeCutsRemaining, setFreeCutsRemaining] = useState(() => {
    try {
      const saved = localStorage.getItem('jonyclip_freecuts');
      return saved !== null ? Number(saved) : 10;
    } catch {
      return 10;
    }
  });

  const [isPaidPro, setIsPaidPro] = useState(() => {
    try {
      return localStorage.getItem('jonyclip_ispaid') === 'true';
    } catch {
      return false;
    }
  });

  const [minutesBalance, setMinutesBalance] = useState(() => {
    try {
      const saved = localStorage.getItem('jonyclip_minutes');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [activePlanName, setActivePlanName] = useState(() => {
    try {
      return localStorage.getItem('jonyclip_plan') || 'Prueba Gratis (10 Cortes)';
    } catch {
      return 'Prueba Gratis (10 Cortes)';
    }
  });

  const [myClips, setMyClips] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('jonyclip_myclips');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem('jonyclip_user', JSON.stringify(user));
      else localStorage.removeItem('jonyclip_user');
    } catch {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('jonyclip_freecuts', String(freeCutsRemaining));
    } catch {}
  }, [freeCutsRemaining]);

  useEffect(() => {
    try {
      localStorage.setItem('jonyclip_ispaid', String(isPaidPro));
    } catch {}
  }, [isPaidPro]);

  useEffect(() => {
    try {
      localStorage.setItem('jonyclip_owner', String(isOwnerMode));
    } catch {}
  }, [isOwnerMode]);

  useEffect(() => {
    try {
      localStorage.setItem('jonyclip_minutes', String(minutesBalance));
    } catch {}
  }, [minutesBalance]);

  useEffect(() => {
    try {
      localStorage.setItem('jonyclip_plan', activePlanName);
    } catch {}
  }, [activePlanName]);

  useEffect(() => {
    try {
      const serializable = myClips.map(({ localVideoUrl, ...rest }) => rest);
      localStorage.setItem('jonyclip_myclips', JSON.stringify(serializable));
    } catch {}
  }, [myClips]);

  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | null>(null);
  const [plansModalOpen, setPlansModalOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState(PRICING_PLANS[1]);
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [bankReferenceCode, setBankReferenceCode] = useState('JCRD-8492');
  const [copiedBankField, setCopiedBankField] = useState('');

  const [isAnalyzingModalOpen, setIsAnalyzingModalOpen] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [latestGeneratedClips, setLatestGeneratedClips] = useState<any[]>([]);

  const [editingClip, setEditingClip] = useState<any>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(true);
  const [captionTick, setCaptionTick] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const editorVideoRef = React.useRef<HTMLVideoElement | null>(null);

  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  const maxClipsAllowed = React.useMemo(() => {
    if (inputMode === 'upload' && uploadedVideoDuration > 0) {
      const possible = Math.floor(uploadedVideoDuration / Math.max(5, Math.floor(clipDurationSec * 0.5)));
      return Math.min(100, Math.max(1, possible));
    }
    return 100;
  }, [inputMode, uploadedVideoDuration, clipDurationSec]);

  useEffect(() => {
    if (!editingClip || !isPlayingPreview) return;
    const interval = setInterval(() => {
      setCaptionTick((prev) => (prev + 1) % editingClip.captions.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [editingClip, isPlayingPreview]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4200);
  };

  const handleSelectVideoFile = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      setUrlError('Por favor selecciona un archivo de video válido (MP4, MOV, MKV, WebM).');
      return;
    }
    setUrlError('');
    setUploadedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setUploadedVideoUrl(objectUrl);

    const tempVideo = document.createElement('video');
    tempVideo.preload = 'metadata';
    tempVideo.src = objectUrl;
    tempVideo.onloadedmetadata = () => {
      const dur = Math.max(10, Math.floor(tempVideo.duration || 60));
      setUploadedVideoDuration(dur);
      const possible = Math.min(100, Math.max(1, Math.floor(dur / Math.max(5, Math.floor(clipDurationSec * 0.5)))));
      setDesiredClipCount((prev) => Math.min(prev, possible));
    };
  };

  const handleAnalyzeContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setUrlError('');

    if (inputMode === 'url' && !streamUrl.trim()) {
      setUrlError('Por favor pega un enlace válido de YouTube, Kick, Twitch, TikTok o Facebook.');
      return;
    }
    if (inputMode === 'upload' && !uploadedFile) {
      setUrlError('Por favor selecciona o arrastra un archivo de video primero.');
      return;
    }

    const effectiveCount = Math.min(desiredClipCount, maxClipsAllowed);

    if (!isOwnerMode && !isPaidPro && freeCutsRemaining <= 0) {
      setPlansModalOpen(true);
      triggerToast('Agotaste tus 10 cortes de prueba gratis. Activa un plan para seguir y quitar la marca de agua.');
      return;
    }

    if (!isOwnerMode && isPaidPro && minutesBalance <= 0) {
      setPlansModalOpen(true);
      triggerToast('Tu saldo de minutos PRO llegó a 0. Recarga tu plan para continuar.');
      return;
    }

    const clipsToCreate = isOwnerMode
      ? effectiveCount
      : !isPaidPro
      ? Math.min(effectiveCount, freeCutsRemaining)
      : effectiveCount;

    setIsAnalyzingModalOpen(true);
    setAnalysisStep(0);

    const stepTimer1 = setTimeout(() => setAnalysisStep(1), 2500);
    const stepTimer2 = setTimeout(() => setAnalysisStep(2), 6500);
    const stepTimer3 = setTimeout(() => setAnalysisStep(3), 11000);

    try {
      const formData = new FormData();
      formData.append('duration', String(clipDurationSec));
      formData.append('count', String(clipsToCreate));

      if (inputMode === 'upload' && uploadedFile) {
        formData.append('video', uploadedFile);
      } else {
        formData.append('url', streamUrl.trim());
      }

      const response = await fetch(`${API_BASE_URL}/api/process`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);

      if (!response.ok || !data.success || !Array.isArray(data.clips)) {
        throw new Error(data.details || data.error || 'No se pudo procesar el video en el servidor.');
      }

      const platform = inputMode === 'upload' ? 'upload' : detectPlatformFromUrl(streamUrl);
      const accents = [
        'from-fuchsia-700 via-purple-900 to-slate-950',
        'from-sky-600 via-indigo-900 to-slate-950',
        'from-emerald-600 via-teal-950 to-slate-950',
        'from-violet-700 via-slate-900 to-black'
      ];

      const generated = data.clips.map((srvClip: any, idx: number) => {
        const durSec = Number(srvClip.duration) || clipDurationSec;
        const score = Math.max(88, 99 - (idx % 10));
        const fileName = srvClip.downloadUrl?.split('/clips/')[1];
        const safeVideoUrl = fileName
          ? `${API_BASE_URL}/clips/${fileName}`
          : srvClip.downloadUrl?.replace(/^http:\/\//i, 'https://') || '';

        return {
          id: `clip-${Date.now()}-${idx}`,
          title: srvClip.title || `Clip Viral #${idx + 1}`,
          creator: user?.name ? `@${user.name.replace(/\s+/g, '')}` : '@JonyClipRD',
          platform,
          duration: formatSecondsToDuration(durSec),
          durationSec: durSec,
          startSec: 0,
          endSec: durSec,
          timestamp: `00:00 - ${formatSecondsToDuration(durSec)}`,
          viralityScore: score,
          hookScore: Math.min(99, score + 1),
          emotionScore: Math.max(86, score - 1),
          retentionScore: Math.max(87, score - 1),
          hookReason: 'Recorte vertical 1080x1920 con subtítulos quemados por IA + FFmpeg.',
          accent: accents[idx % accents.length],
          avatarEmoji: ['🔥', '⚡', '👑', '🎙️', '🤯'][idx % 5],
          sceneTag: `${getPlatformLabel(platform).toUpperCase()} • TOP #${idx + 1}`,
          highlightColor: idx % 2 === 0 ? '#53FC18' : '#FDE047',
          fontStyle: 'impact',
          hasBrandWatermark: !isPaidPro && !isOwnerMode,
          localVideoUrl: safeVideoUrl,
          remoteVideoUrl: safeVideoUrl,
          captions: [
            { text: srvClip.title || '¡MOMENTO VIRAL DETECTADO POR IA! 🔥', highlight: 'VIRAL' },
            { text: '¡FORMATO VERTICAL 9:16 LISTO PARA REDES! ⚡', highlight: '9:16' },
            { text: '¡JONY CLIP RD EN LA CASA! 🇩🇴', highlight: 'JONY CLIP RD' }
          ]
        };
      });

      setLatestGeneratedClips(generated);
      setMyClips((prev: any[]) => [...generated, ...prev]);

      if (!isOwnerMode) {
        if (!isPaidPro) {
          setFreeCutsRemaining((prev) => Math.max(0, prev - generated.length));
        } else {
          const usedMinutes = Math.max(1, Math.ceil((generated.length * clipDurationSec) / 60));
          setMinutesBalance((prev) => Math.max(0, prev - usedMinutes));
        }
      }

      setAnalysisStep(4);
    } catch (err: any) {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      setIsAnalyzingModalOpen(false);
      setUrlError(`Error del servidor: ${err.message || 'Verifica el enlace e intenta de nuevo.'}`);
      triggerToast(`❌ Error procesando el video: ${err.message || 'Intenta con otro enlace o archivo MP4'}`);
    }
  };

  const handleCompletePurchase = (methodLabel: string) => {
    setIsPaidPro(true);
    setMinutesBalance((prev) => prev + selectedPlanForCheckout.minutes);
    setActivePlanName(selectedPlanForCheckout.name);
    setMyClips((prev) => prev.map((clip) => ({ ...clip, hasBrandWatermark: false })));
    setPlansModalOpen(false);
    triggerToast(
      `✅ ¡Pago confirmado vía ${methodLabel}! ${selectedPlanForCheckout.name} activo (${selectedPlanForCheckout.minutes} min) y marca de agua eliminada.`
    );
  };

  const handleDownloadClip = async (clip: any) => {
    const cleanFileName = `${
      clip.title
        .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s-]/g, '')
        .trim()
        .replace(/\s+/g, '_')
        .slice(0, 35) || 'Clip_Viral'
    }_JONYCLIPRD_9x16.mp4`;

    const videoUrl = clip.remoteVideoUrl || clip.localVideoUrl;

    if (!videoUrl) {
      triggerToast('⚠️ Este clip de ejemplo no tiene archivo MP4 generado. Analiza un video o enlace real primero.');
      return;
    }

    try {
      triggerToast(`⏳ Descargando "${cleanFileName}" (MP4 9:16)...`);
      const response = await fetch(videoUrl);
      if (!response.ok) throw new Error('El archivo MP4 ya no está disponible en el servidor.');

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = cleanFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);

      triggerToast(
        isOwnerMode || isPaidPro
          ? `✅ "${cleanFileName}" descargado en MP4 (1080x1920) SIN marca de agua.`
          : `✅ "${cleanFileName}" descargado en MP4.`
      );
    } catch {
      window.open(videoUrl, '_blank', 'noopener,noreferrer');
      triggerToast('⬇️ Abriendo el video MP4 directo para guardarlo.');
    }
  };

  const handleCopyText = (text: string, fieldKey: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedBankField(fieldKey);
    triggerToast(`Copiado: ${text}`);
    setTimeout(() => setCopiedBankField(''), 2000);
  };

  const openClipEditor = (clip: any) => {
    setEditingClip({ ...clip, hasBrandWatermark: !isPaidPro && !isOwnerMode });
    setCaptionTick(0);
    setIsPlayingPreview(true);
  };

  const handleSaveEditedClip = () => {
    if (!editingClip) return;
    setMyClips((prev) => {
      const exists = prev.some((c) => c.id === editingClip.id);
      if (exists) {
        return prev.map((c) => (c.id === editingClip.id ? editingClip : c));
      }
      return [editingClip, ...prev];
    });
    triggerToast('💾 Cambios del editor guardados en "Mis Clips".');
  };

  const handleDeleteClip = (clipId: string) => {
    setMyClips((prev) => prev.filter((c) => c.id !== clipId));
    triggerToast('Clip eliminado de Mis Clips.');
  };

  const renderPlatformBadge = (platform: string, size = 'w-5 h-5') => {
    switch (platform) {
      case 'upload':
        return <VideoUploadBadge className={size} />;
      case 'kick':
        return <KickBadge className={size} />;
      case 'twitch':
        return <TwitchBadge className={size} />;
      case 'tiktok':
        return <TikTokBadge className={size} />;
      case 'facebook':
        return <FacebookBadge className={size} />;
      default:
        return <YouTubeBadge className={size} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#06040f] text-white font-sans selection:bg-fuchsia-500 selection:text-white overflow-x-hidden relative">
      {/* AMBIENT CYBERPUNK BACKGROUND GLOWS */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-blue-600/20 blur-[130px]" />
        <div className="absolute -top-24 right-0 w-[620px] h-[560px] rounded-full bg-purple-600/25 blur-[140px]" />
        <div className="absolute top-[42%] left-1/2 -translate-x-1/2 w-[750px] h-[320px] rounded-full bg-fuchsia-600/10 blur-[130px]" />
        <div className="absolute bottom-0 right-10 w-[480px] h-[380px] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #a855f7 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      {/* FLOATING TOAST */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md flex items-center gap-3 bg-[#130d29]/95 border border-fuchsia-500/60 text-white px-5 py-3.5 rounded-2xl shadow-[0_0_30px_rgba(217,70,239,0.5)] backdrop-blur-xl">
          <Sparkles className="w-5 h-5 text-fuchsia-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold leading-snug">{toastMessage}</span>
        </div>
      )}

      {/* TOP NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#070514]/85 border-b border-purple-500/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2">
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              setActiveNav('inicio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group shrink-0"
          >
            <BrandLogoIcon size="sm" />
            <div className="flex flex-col leading-none">
              <span className="text-xl sm:text-2xl font-black italic tracking-wider bg-gradient-to-r from-sky-300 via-white to-purple-300 bg-clip-text text-transparent">
                JONY
              </span>
              <div className="flex items-center gap-1 -mt-0.5">
                <span className="text-lg sm:text-xl font-black italic tracking-wider text-white">CLIP</span>
                <span className="text-lg sm:text-xl font-black italic tracking-wider bg-gradient-to-r from-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
                  RD
                </span>
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1.5">
            {[
              { id: 'inicio', label: 'Inicio', icon: Home, action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
              {
                id: 'crear',
                label: 'Crear Clips',
                icon: Zap,
                action: () => document.getElementById('url-analyzer-box')?.scrollIntoView({ behavior: 'smooth' })
              },
              {
                id: 'mis-clips',
                label: 'Mis Clips',
                icon: Crown,
                badge: myClips.length,
                action: () => document.getElementById('mis-clips-section')?.scrollIntoView({ behavior: 'smooth' })
              },
              { id: 'planes', label: 'Planes', icon: Star, action: () => setPlansModalOpen(true) },
              { id: 'ayuda', label: 'Ayuda', icon: HelpCircle, action: () => setHelpModalOpen(true) }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id);
                    item.action();
                  }}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white bg-purple-600/25 border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-fuchsia-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {typeof item.badge === 'number' && item.badge > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-fuchsia-600 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => {
                if (isOwnerMode) {
                  setIsOwnerMode(false);
                  triggerToast('🔒 Modo Dueño desactivado (vista de cliente normal).');
                } else {
                  setOwnerModalOpen(true);
                }
              }}
              title="Acceso personal exclusivo del creador (Jony)"
              className={`px-3 py-2 rounded-xl text-xs font-extrabold border flex items-center gap-1.5 transition-all cursor-pointer ${
                isOwnerMode
                  ? 'bg-sky-500/20 border-sky-400 text-sky-200 shadow-[0_0_18px_rgba(56,189,248,0.4)]'
                  : 'bg-white/5 border-white/15 text-slate-400 hover:text-white hover:border-purple-400/50'
              }`}
            >
              <Crown className={`w-3.5 h-3.5 ${isOwnerMode ? 'text-sky-300 fill-sky-300' : 'text-slate-400'}`} />
              <span>{isOwnerMode ? 'Dueño VIP • Ilimitado' : 'Dueño'}</span>
            </button>

            <button
              onClick={() => setPlansModalOpen(true)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border flex items-center gap-2 transition-all cursor-pointer ${
                isOwnerMode || isPaidPro
                  ? 'bg-emerald-500/15 border-emerald-400/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                  : 'bg-amber-500/15 border-amber-400/50 text-amber-200 hover:bg-amber-500/25'
              }`}
            >
              {isOwnerMode ? (
                <>
                  <Crown className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span>GRATIS ILIMITADO</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/25 text-[10px] uppercase">Sin Marca</span>
                </>
              ) : isPaidPro ? (
                <>
                  <Crown className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span>PRO • {minutesBalance} min</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/25 text-[10px] uppercase">Sin Marca</span>
                </>
              ) : (
                <>
                  <Sparkle className="w-3.5 h-3.5 text-amber-300" />
                  <span>Prueba Gratis: {freeCutsRemaining}/10 cortes</span>
                  <span className="px-1.5 py-0.5 rounded bg-fuchsia-600 text-white text-[10px] uppercase">
                    Quitar Marca
                  </span>
                </>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-xl bg-[#140e2b] border border-purple-500/40">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center text-xs font-black">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left leading-tight pr-1">
                  <p className="text-xs font-bold text-white truncate max-w-[95px]">{user.name}</p>
                  <p className="text-[10px] text-fuchsia-300 font-semibold">{activePlanName}</p>
                </div>
                <button
                  onClick={() => {
                    setUser(null);
                    triggerToast('Sesión cerrada.');
                  }}
                  title="Cerrar sesión"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setAuthModalMode('login')}
                  className="px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-[#120d26]/90 border border-purple-500/40 hover:border-purple-400 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
                >
                  <User className="w-4 h-4 text-purple-400" />
                  <span>Iniciar Sesión</span>
                </button>

                <button
                  onClick={() => setAuthModalMode('register')}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 hover:from-violet-500 hover:via-fuchsia-500 hover:to-purple-500 shadow-[0_0_24px_rgba(192,38,211,0.55)] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Registrarse</span>
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-purple-950/50 border border-purple-500/30 text-white"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0b071d]/95 border-b border-purple-500/30 px-4 pt-3 pb-6 space-y-2 backdrop-blur-xl">
            <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 mb-2">
              <div className="flex items-center gap-2 text-xs font-bold">
                <Clock className="w-4 h-4 text-fuchsia-400" />
                <span>
                  {isPaidPro
                    ? `Plan PRO: ${minutesBalance} min (Sin marca)`
                    : `Prueba Gratis: ${freeCutsRemaining}/10 cortes`}
                </span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setPlansModalOpen(true);
                }}
                className="px-3 py-1 rounded-lg bg-fuchsia-600 text-xs font-extrabold"
              >
                {isPaidPro ? 'Recargar' : 'Quitar Marca'}
              </button>
            </div>

            {[
              { id: 'inicio', label: 'Inicio', icon: Home, action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
              {
                id: 'crear',
                label: 'Crear Clips',
                icon: Zap,
                action: () => document.getElementById('url-analyzer-box')?.scrollIntoView({ behavior: 'smooth' })
              },
              {
                id: 'mis-clips',
                label: `Mis Clips (${myClips.length})`,
                icon: Crown,
                action: () => document.getElementById('mis-clips-section')?.scrollIntoView({ behavior: 'smooth' })
              },
              { id: 'planes', label: 'Planes', icon: Star, action: () => setPlansModalOpen(true) },
              { id: 'ayuda', label: 'Ayuda', icon: HelpCircle, action: () => setHelpModalOpen(true) }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id);
                    setMobileMenuOpen(false);
                    item.action();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-semibold text-slate-200 hover:bg-purple-600/20"
                >
                  <Icon className="w-5 h-5 text-fuchsia-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-10">
        {/* MAIN INPUT BOX */}
        <section
          id="url-analyzer-box"
          className="relative rounded-3xl p-[1.5px] bg-gradient-to-r from-sky-500/70 via-purple-500/80 to-fuchsia-500/70 shadow-[0_0_50px_rgba(147,51,234,0.3)]"
        >
          <div className="rounded-[22.5px] bg-[#0c0820]/90 backdrop-blur-2xl px-5 py-6 sm:px-8 sm:py-7 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-purple-500/25">
              <div className="inline-flex p-1 rounded-2xl bg-[#161033] border border-purple-500/35">
                <button
                  type="button"
                  onClick={() => {
                    setInputMode('url');
                    setUrlError('');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                    inputMode === 'url'
                      ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-[0_0_18px_rgba(217,70,239,0.5)]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Link2 className="w-4 h-4" />
                  <span>Pegar Enlace de Directo</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setInputMode('upload');
                    setUrlError('');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                    inputMode === 'upload'
                      ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-[0_0_18px_rgba(217,70,239,0.5)]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <FolderUp className="w-4 h-4" />
                  <span>Subir Video (MP4 / MOV)</span>
                </button>
              </div>

              {isOwnerMode ? (
                <div className="flex items-center gap-1.5 text-xs bg-sky-500/15 border border-sky-400/40 px-3.5 py-1.5 rounded-xl text-sky-200 font-bold">
                  <Crown className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>Modo Personal Dueño (Jony): Uso 100% gratis ilimitado y SIN marca de agua</span>
                </div>
              ) : !isPaidPro ? (
                <div className="flex items-center gap-2 text-xs bg-amber-500/10 border border-amber-400/35 px-3.5 py-1.5 rounded-xl text-amber-200">
                  <span>
                    🎁 Tienes <strong>{freeCutsRemaining} cortes gratis</strong> (incluyen marca de agua{' '}
                    <strong>JONY CLIP RD</strong>).
                  </span>
                  <button
                    type="button"
                    onClick={() => setPlansModalOpen(true)}
                    className="text-fuchsia-300 font-extrabold underline hover:text-white cursor-pointer shrink-0"
                  >
                    Quitar marca
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs bg-emerald-500/15 border border-emerald-400/40 px-3.5 py-1.5 rounded-xl text-emerald-300 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Modo PRO Activo: Exportación limpia SIN marca de agua</span>
                </div>
              )}
            </div>

            {/* CLIP CONFIGURATION BAR */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#130d2e]/85 border border-purple-500/30">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-200 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-sky-400" />
                    <span>Duración de cada clip</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-sky-500/20 border border-sky-400/40 text-xs font-black text-sky-300">
                    ~{clipDurationSec} segundos
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-1.5">
                  {[
                    { sec: 15, label: '15s' },
                    { sec: 30, label: '30s' },
                    { sec: 45, label: '45s' },
                    { sec: 60, label: '60s' },
                    { sec: 90, label: '90s' }
                  ].map((opt) => {
                    const active = clipDurationSec === opt.sec;
                    return (
                      <button
                        key={opt.sec}
                        type="button"
                        onClick={() => {
                          setClipDurationSec(opt.sec);
                          if (inputMode === 'upload' && uploadedVideoDuration > 0) {
                            const newMax = Math.min(
                              100,
                              Math.max(1, Math.floor(uploadedVideoDuration / Math.max(5, Math.floor(opt.sec * 0.5))))
                            );
                            setDesiredClipCount((prev) => Math.min(prev, newMax));
                          }
                        }}
                        className={`py-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                          active
                            ? 'bg-gradient-to-r from-sky-500 to-indigo-600 border-sky-300 text-white shadow-[0_0_15px_rgba(56,189,248,0.45)]'
                            : 'bg-black/40 border-purple-500/25 text-slate-300 hover:border-purple-400 hover:text-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-slate-200 flex items-center gap-1.5">
                    <Clapperboard className="w-4 h-4 text-fuchsia-400" />
                    <span>Cantidad de clips (máx. {maxClipsAllowed} según duración)</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-fuchsia-500/20 border border-fuchsia-400/40 text-xs font-black text-fuchsia-300 shrink-0">
                    {Math.min(desiredClipCount, maxClipsAllowed)}{' '}
                    {Math.min(desiredClipCount, maxClipsAllowed) === 1 ? 'clip' : 'clips'}
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <input
                    type="range"
                    min={1}
                    max={maxClipsAllowed}
                    value={Math.min(desiredClipCount, maxClipsAllowed)}
                    onChange={(e) => setDesiredClipCount(Number(e.target.value))}
                    className="w-full h-2 rounded-lg bg-purple-950 accent-fuchsia-500 cursor-pointer"
                  />
                  <div className="flex items-center gap-1 shrink-0">
                    {[3, 5, 10, 25].map((num) => {
                      const disabled = num > maxClipsAllowed;
                      return (
                        <button
                          key={num}
                          type="button"
                          disabled={disabled}
                          onClick={() => setDesiredClipCount(Math.min(num, maxClipsAllowed))}
                          className={`px-2 h-7 rounded-lg text-[11px] font-black border transition-all ${
                            disabled
                              ? 'opacity-35 cursor-not-allowed bg-black/30 border-white/10 text-slate-500'
                              : Math.min(desiredClipCount, maxClipsAllowed) === num
                              ? 'bg-fuchsia-600 border-fuchsia-300 text-white shadow-[0_0_12px_rgba(217,70,239,0.5)] cursor-pointer'
                              : 'bg-black/40 border-purple-500/30 text-slate-300 hover:text-white cursor-pointer'
                          }`}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {inputMode === 'url' ? (
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2.5 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500/25 to-purple-600/25 border border-fuchsia-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.4)]">
                      <Link2 className="w-5 h-5 text-fuchsia-400 -rotate-45" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                        Pega el enlace del directo
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-300">
                        Copia y pega el link de cualquier video o transmisión de:
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 pt-1 pl-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                      <YouTubeBadge className="w-4 h-4" />
                      <span>YouTube</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                      <TwitchBadge className="w-4 h-4" />
                      <span>Twitch</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#53FC18]">
                      <KickBadge className="w-4 h-4" />
                      <span>Kick</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                      <TikTokBadge className="w-4 h-4" />
                      <span>TikTok LIVE</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                      <FacebookBadge className="w-4 h-4" />
                      <span>Facebook Live</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleAnalyzeContent} className="flex-1 max-w-2xl">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="relative flex-1">
                      <Link2 className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={streamUrl}
                        onChange={(e) => {
                          setStreamUrl(e.target.value);
                          if (urlError) setUrlError('');
                        }}
                        placeholder="https://www.youtube.com/watch?v=... o https://kick.com/..."
                        className="w-full h-13 pl-11 pr-4 rounded-2xl bg-[#161130]/90 border border-purple-500/40 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/30 outline-none text-sm sm:text-base text-white placeholder:text-slate-400 transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto h-13 px-6 sm:px-7 rounded-2xl font-extrabold text-sm sm:text-base text-white bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 hover:from-violet-500 hover:via-fuchsia-500 hover:to-purple-500 shadow-[0_0_28px_rgba(192,38,211,0.65)] hover:shadow-[0_0_38px_rgba(192,38,211,0.9)] transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-95 shrink-0"
                    >
                      <Wand2 className="w-5 h-5" />
                      <span>Analizar Directo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {urlError ? (
                    <p className="mt-2 text-xs text-rose-400 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{urlError}</span>
                    </p>
                  ) : (
                    <div className="mt-2.5 flex flex-wrap items-center justify-center sm:justify-start sm:pl-12 gap-2 text-xs text-slate-400 font-medium">
                      <Lock className="w-3.5 h-3.5 text-purple-400" />
                      <span>Motor IA + FFmpeg Activo</span>
                      <span>•</span>
                      <span className="text-fuchsia-300 font-semibold">Recorte 9:16 + Subtítulos MP4</span>
                    </div>
                  )}
                </form>
              </div>
            ) : (
              <form onSubmit={handleAnalyzeContent} className="space-y-4">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingFile(true);
                  }}
                  onDragLeave={() => setIsDraggingFile(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggingFile(false);
                    const dropped = e.dataTransfer.files?.[0];
                    if (dropped) handleSelectVideoFile(dropped);
                  }}
                  className={`relative rounded-2xl border-2 border-dashed p-6 sm:p-7 transition-all flex flex-col lg:flex-row items-center justify-between gap-6 ${
                    isDraggingFile
                      ? 'border-fuchsia-400 bg-fuchsia-500/15'
                      : uploadedFile
                      ? 'border-emerald-400/60 bg-emerald-950/20'
                      : 'border-purple-500/45 bg-[#150f30]/70 hover:border-fuchsia-400/70'
                  }`}
                >
                  {!uploadedFile ? (
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 border border-fuchsia-400/40 flex items-center justify-center shrink-0">
                        <FileVideo className="w-7 h-7 text-fuchsia-300" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-extrabold text-white">
                          Arrastra tu video aquí o selecciónalo desde tu dispositivo
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                          Formatos compatibles: <strong>MP4, MOV, MKV, WebM</strong> • La IA detectará los mejores
                          momentos, los recortará en 9:16 y pondrá subtítulos automáticos.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                      <div className="w-28 h-20 rounded-xl overflow-hidden bg-black border border-fuchsia-400/50 shrink-0 relative">
                        <video src={uploadedVideoUrl} className="w-full h-full object-cover" muted playsInline />
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold text-white">
                          {formatSecondsToDuration(uploadedVideoDuration)}
                        </span>
                      </div>

                      <div className="text-center sm:text-left">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-extrabold mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Video listo para recortar con IA</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-extrabold text-white break-all">{uploadedFile.name}</h4>
                        <p className="text-xs text-slate-300">
                          Tamaño: <strong>{formatFileSize(uploadedFile.size)}</strong> • Duración:{' '}
                          <strong>{formatSecondsToDuration(uploadedVideoDuration)}</strong>
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                    <label className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-purple-400/40 text-xs sm:text-sm font-bold text-white flex items-center gap-2 cursor-pointer transition-all">
                      <FolderUp className="w-4 h-4 text-sky-300" />
                      <span>{uploadedFile ? 'Cambiar Video' : 'Seleccionar Archivo'}</span>
                      <input
                        type="file"
                        accept="video/mp4,video/quicktime,video/x-matroska,video/webm,video/*"
                        className="hidden"
                        onChange={(e) => handleSelectVideoFile(e.target.files?.[0])}
                      />
                    </label>

                    <button
                      type="submit"
                      className="px-6 py-3 rounded-2xl font-extrabold text-xs sm:text-sm text-white bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 hover:from-violet-500 hover:via-fuchsia-500 hover:to-purple-500 shadow-[0_0_26px_rgba(192,38,211,0.65)] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                    >
                      <Wand2 className="w-4 h-4" />
                      <span>Recortar Video con IA</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {urlError && (
                  <p className="text-xs text-rose-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{urlError}</span>
                  </p>
                )}
              </form>
            )}
          </div>
        </section>

        {/* FEATURE PILLS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {[
            { icon: Zap, title: 'Clips Automáticos', subtitle: 'con Inteligencia Artificial', iconBg: 'bg-purple-500/20 text-purple-400 border-purple-500/40' },
            { icon: Film, title: 'Editor Integrado', subtitle: 'Recorta, edita y personaliza', iconBg: 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/40' },
            { icon: Subtitles, title: 'Subtítulos Automáticos', subtitle: 'en varios idiomas', iconBg: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40' },
            { icon: Smartphone, title: 'Formato Vertical', subtitle: '9:16 para TikTok y Reels', iconBg: 'bg-pink-500/20 text-pink-400 border-pink-500/40' },
            { icon: CloudDownload, title: 'Descarga MP4 Real', subtitle: 'en un solo clic', iconBg: 'bg-violet-500/20 text-violet-400 border-violet-500/40' }
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 px-4 py-3.5 rounded-2xl bg-[#0e0a24]/85 border border-purple-500/25 hover:border-fuchsia-500/50 hover:bg-[#150f33] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${feat.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <h3 className="text-sm font-bold text-white">{feat.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{feat.subtitle}</p>
                </div>
              </div>
            );
          })}
        </section>

        {/* ¿CÓMO FUNCIONA? */}
        <section className="pt-2 space-y-6">
          <div className="flex items-center justify-center gap-3">
            <Rocket className="w-7 h-7 text-sky-400 drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
            <h2 className="text-2xl sm:text-3xl font-black italic tracking-tight text-white">
              ¿Cómo{' '}
              <span className="bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                Funciona?
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-4 items-stretch relative pt-3">
            {[
              { num: '1', icon: Link2, iconColor: 'text-slate-200', title: 'Pega el Enlace', desc: 'Introduce el link de tu video o directo (YouTube, Kick, Twitch, TikTok o FB).' },
              { num: '2', icon: Brain, iconColor: 'text-pink-300', title: 'Deja que la IA Trabaje', desc: 'Transcribimos el audio y detectamos los mejores momentos virales.' },
              { num: '3', icon: Clapperboard, iconColor: 'text-fuchsia-400', title: 'Obtén tus Clips 9:16', desc: 'FFmpeg recorta cada clip en formato vertical 1080x1920 con subtítulos.' },
              { num: '4', icon: Upload, iconColor: 'text-sky-300', title: 'Descarga y Publica', desc: 'Baja tus videos MP4 listos para TikTok, Reels y Shorts.' }
            ].map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={step.num} className="relative flex items-center">
                  <div className="w-full h-full relative rounded-2xl bg-[#0c0820]/90 border border-purple-500/35 hover:border-fuchsia-400/70 px-5 pt-8 pb-6 text-center flex flex-col items-center transition-all shadow-[0_0_25px_rgba(88,28,135,0.2)]">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-b from-fuchsia-500 to-purple-700 border border-fuchsia-300/60 flex items-center justify-center text-sm font-black text-white shadow-[0_0_16px_rgba(217,70,239,0.85)]">
                      {step.num}
                    </div>
                    <div className="mb-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <StepIcon className={`w-7 h-7 ${step.iconColor}`} />
                    </div>
                    <h3 className="text-base font-extrabold text-white">{step.title}</h3>
                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-purple-500/60 to-transparent my-2.5" />
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{step.desc}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:flex items-center justify-center -mr-3 ml-1 z-20 text-purple-400">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* MIS CLIPS GENERADOS */}
        {myClips.length > 0 && (
          <section id="mis-clips-section" className="space-y-4 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Crown className="w-6 h-6 text-fuchsia-400" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  Mis Clips Generados con IA ({myClips.length})
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {myClips.map((clip) => (
                <div
                  key={clip.id}
                  className="group relative aspect-[9/16] rounded-2xl overflow-hidden border border-fuchsia-500/45 bg-slate-900 shadow-[0_8px_25px_rgba(0,0,0,0.65)]"
                >
                  <button onClick={() => openClipEditor(clip)} className="w-full h-full text-left cursor-pointer">
                    {clip.localVideoUrl ? (
                      <video
                        src={clip.localVideoUrl}
                        className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                        muted
                        playsInline
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-b ${clip.accent} opacity-90`} />
                    )}

                    <div className="absolute top-2.5 left-2.5 z-10 p-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15">
                      {renderPlatformBadge(clip.platform)}
                    </div>
                    <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-md bg-emerald-500/25 border border-emerald-400/50 backdrop-blur-md text-[10px] font-black text-emerald-300">
                      {clip.viralityScore}% IA
                    </div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                      <div className="w-11 h-11 rounded-full bg-white/90 group-hover:bg-fuchsia-500 text-slate-950 group-hover:text-white flex items-center justify-center shadow-lg transition-all">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/95 via-black/75 to-transparent">
                      <p className="text-[11px] font-extrabold text-white line-clamp-2 leading-snug mb-1.5">
                        {clip.title}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-fuchsia-300 font-bold">Ver / Descargar MP4</span>
                        <span className="px-1.5 py-0.5 rounded bg-black/80 border border-white/15 text-[10px] font-bold text-white">
                          {clip.duration}
                        </span>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleDeleteClip(clip.id)}
                    title="Eliminar clip"
                    className="absolute bottom-9 right-2 z-20 p-1.5 rounded-lg bg-black/70 hover:bg-rose-600 text-slate-300 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EJEMPLOS DE CLIPS + CTA */}
        <section id="ejemplos-section" className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch pt-2">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">Ejemplos de Clips</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {SAMPLE_CLIPS.map((clip) => (
                <button
                  key={clip.id}
                  onClick={() => openClipEditor(clip)}
                  className="group relative aspect-[9/16] rounded-2xl overflow-hidden border border-purple-500/40 hover:border-fuchsia-400 bg-slate-900 shadow-[0_8px_25px_rgba(0,0,0,0.65)] transition-all text-left cursor-pointer"
                >
                  <div className={`absolute inset-0 bg-gradient-to-b ${clip.accent} opacity-90 group-hover:scale-105 transition-transform duration-500`} />
                  <div className="absolute top-2.5 left-2.5 z-10 p-1 rounded-lg bg-black/55 backdrop-blur-md border border-white/15">
                    {renderPlatformBadge(clip.platform)}
                  </div>
                  <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-md bg-emerald-500/25 border border-emerald-400/50 backdrop-blur-md text-[10px] font-black text-emerald-300">
                    {clip.viralityScore}% IA
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                    <span className="text-4xl sm:text-5xl mb-2 select-none">{clip.avatarEmoji}</span>
                    <div className="w-11 h-11 rounded-full bg-white/90 group-hover:bg-fuchsia-500 text-slate-950 group-hover:text-white flex items-center justify-center shadow-lg transition-all">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
                    <p className="text-[11px] font-extrabold text-white line-clamp-2 leading-snug mb-1.5">{clip.title}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-purple-300 font-semibold truncate max-w-[65%]">{clip.creator}</span>
                      <span className="px-1.5 py-0.5 rounded bg-black/80 border border-white/15 text-[10px] font-bold text-white">
                        {clip.duration}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-purple-500/45 bg-gradient-to-br from-[#1b0d3b] via-[#110826] to-[#260d47] p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-[0_0_45px_rgba(147,51,234,0.3)]">
            <div className="w-14 h-14 rounded-2xl bg-sky-500/15 border border-sky-400/40 flex items-center justify-center mb-4 -rotate-12">
              <Rocket className="w-8 h-8 text-sky-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black italic text-white leading-tight max-w-sm">
              ¡Únete a la{' '}
              <span className="bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                revolución
              </span>{' '}
              de los{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">clips!</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xs leading-relaxed">
              Con <span className="font-extrabold text-white">JONY CLIP RD</span>, convierte cualquier video o directo en
              clips MP4 virales.
            </p>
            <button
              onClick={() => {
                if (!isPaidPro) {
                  setPlansModalOpen(true);
                } else {
                  document.getElementById('url-analyzer-box')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="mt-6 relative z-10 px-8 py-4 rounded-full font-extrabold text-base sm:text-lg text-white bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 shadow-[0_0_30px_rgba(217,70,239,0.7)] transition-all flex items-center gap-3 cursor-pointer active:scale-95"
            >
              <Crown className="w-5 h-5 text-amber-300 fill-amber-300" />
              <span>{isPaidPro ? 'Crear Clips PRO' : 'Quitar Marca y Activar PRO'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>

      {/* MODAL 1: PLANS & CHECKOUT */}
      {plansModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-5xl rounded-3xl bg-[#0d0822] border border-fuchsia-500/50 p-5 sm:p-8 shadow-[0_0_70px_rgba(192,38,211,0.45)] max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setPlansModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40">
                <Crown className="w-3.5 h-3.5 text-amber-300" />
                JONY CLIP RD PRO
              </span>
              <h3 className="mt-2.5 text-2xl sm:text-3xl font-black text-white">
                Activa tu plan y exporta clips limpios sin marca de agua
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
              {PRICING_PLANS.map((plan) => {
                const isSelected = selectedPlanForCheckout.id === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanForCheckout(plan)}
                    className={`rounded-2xl p-5 flex flex-col justify-between border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#231252] to-[#12092e] border-fuchsia-400 shadow-[0_0_30px_rgba(217,70,239,0.4)]'
                        : 'bg-[#130d2e]/80 border-purple-500/30 hover:border-purple-400/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-extrabold text-base sm:text-lg text-white">{plan.name}</h4>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-fuchsia-500 text-white">
                          {plan.badge}
                        </span>
                      </div>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-3xl font-black text-white">${plan.usdPrice} USD</span>
                        <span className="text-xs font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 px-2 py-0.5 rounded-md">
                          RD${plan.dopPrice.toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-slate-300">{plan.desc}</p>
                      <ul className="mt-4 space-y-2">
                        {plan.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-200">
                            <Check className="w-4 h-4 text-[#53FC18] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-2xl bg-[#130d2e] border border-purple-500/40 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-purple-500/25">
                <div>
                  <h4 className="font-extrabold text-base text-white">
                    Método de Pago — {selectedPlanForCheckout.name}
                  </h4>
                  <p className="text-xs text-slate-300">
                    Total: <span className="font-black text-white">${selectedPlanForCheckout.usdPrice} USD</span> o{' '}
                    <span className="font-black text-emerald-300">
                      RD${selectedPlanForCheckout.dopPrice.toLocaleString()} DOP
                    </span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border cursor-pointer ${
                      paymentMethod === 'paypal' ? 'bg-sky-600/30 border-sky-400 text-white' : 'bg-black/30 border-white/10 text-slate-300'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-sky-400" />
                    <span>PayPal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border cursor-pointer ${
                      paymentMethod === 'bank' ? 'bg-emerald-600/25 border-emerald-400 text-white' : 'bg-black/30 border-white/10 text-slate-300'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    <span>Transferencia RD$</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border cursor-pointer ${
                      paymentMethod === 'card' ? 'bg-purple-600/35 border-fuchsia-400 text-white' : 'bg-black/30 border-white/10 text-slate-300'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-fuchsia-400" />
                    <span>Tarjeta</span>
                  </button>
                </div>
              </div>

              {paymentMethod === 'paypal' && (
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-black/35 p-4 rounded-2xl border border-sky-500/35">
                  <p className="text-xs sm:text-sm text-slate-200">
                    Envía pago por PayPal.me a <strong>Jonatan Ramírez Felix</strong> (@JonatanRamirez01).
                  </p>
                  <div className="flex gap-2">
                    <a
                      href={`https://www.paypal.me/JonatanRamirez01/${selectedPlanForCheckout.usdPrice}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-3 rounded-xl font-extrabold text-xs bg-[#0070BA] text-white"
                    >
                      Pagar ${selectedPlanForCheckout.usdPrice} USD
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCompletePurchase('PayPal')}
                      className="px-4 py-3 rounded-xl font-extrabold text-xs bg-emerald-600 text-white cursor-pointer"
                    >
                      Ya pagué • Activar
                    </button>
                  </div>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="mt-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-black/45 border border-sky-500/35">
                      <span className="text-[11px] font-black text-sky-400">Banreservas (Ahorros)</span>
                      <p className="text-base font-mono font-black text-white">9607786673</p>
                      <button
                        type="button"
                        onClick={() => handleCopyText('9607786673', 'banreservas')}
                        className="mt-1 text-[11px] text-sky-300 underline cursor-pointer"
                      >
                        {copiedBankField === 'banreservas' ? 'Copiado' : 'Copiar cuenta'}
                      </button>
                    </div>
                    <div className="p-3.5 rounded-xl bg-black/45 border border-emerald-500/35">
                      <span className="text-[11px] font-black text-emerald-400">Banco BHD (Ahorros)</span>
                      <p className="text-base font-mono font-black text-white">41510620018</p>
                      <button
                        type="button"
                        onClick={() => handleCopyText('41510620018', 'bhd')}
                        className="mt-1 text-[11px] text-emerald-300 underline cursor-pointer"
                      >
                        {copiedBankField === 'bhd' ? 'Copiado' : 'Copiar cuenta'}
                      </button>
                    </div>
                    <div className="p-3.5 rounded-xl bg-black/45 border border-blue-500/35">
                      <span className="text-[11px] font-black text-blue-400">Popular (Corriente)</span>
                      <p className="text-base font-mono font-black text-white">846910875</p>
                      <button
                        type="button"
                        onClick={() => handleCopyText('846910875', 'popular')}
                        className="mt-1 text-[11px] text-blue-300 underline cursor-pointer"
                      >
                        {copiedBankField === 'popular' ? 'Copiado' : 'Copiar cuenta'}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/35">
                    <span className="text-xs text-slate-300">
                      Titular: <strong>Jonatan Ramírez Felix</strong> • Ref: <strong>{bankReferenceCode}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCompletePurchase('Transferencia RD$')}
                      className="px-4 py-2 rounded-xl bg-fuchsia-600 text-white font-extrabold text-xs cursor-pointer"
                    >
                      Validar y Activar Ahora
                    </button>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCompletePurchase('Tarjeta');
                  }}
                  className="mt-4 flex justify-end"
                >
                  <button
                    type="submit"
                    className="py-2.5 px-6 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 cursor-pointer"
                  >
                    Pagar ${selectedPlanForCheckout.usdPrice} USD
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: AI STREAM & VIDEO PROCESSOR */}
      {isAnalyzingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#0e0924] border border-fuchsia-500/50 shadow-[0_0_60px_rgba(192,38,211,0.45)] overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-purple-500/25 flex items-center justify-between bg-[#130d30]">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-fuchsia-400" />
                <h3 className="font-extrabold text-base sm:text-lg text-white">Motor IA + FFmpeg 9:16</h3>
              </div>
              <button
                onClick={() => setIsAnalyzingModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {analysisStep < 4 ? (
                <div className="py-6 space-y-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-[0_0_30px_rgba(217,70,239,0.7)] animate-pulse mb-4">
                      <Brain className="w-9 h-9 text-white" />
                    </div>
                    <h4 className="text-xl font-extrabold text-white">
                      Procesando video real en Railway con IA + FFmpeg...
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Esto tarda entre 15 y 45 segundos según el largo del video. No cierres esta ventana.
                    </p>
                  </div>

                  <div className="max-w-md mx-auto space-y-2.5">
                    {[
                      { step: 0, label: 'Descargando video y extrayendo pista de audio...' },
                      { step: 1, label: 'Transcribiendo audio con Whisper IA...' },
                      { step: 2, label: 'Detectando momentos virales con GPT...' },
                      { step: 3, label: 'Renderizando clips MP4 en 1080x1920 con subtítulos...' }
                    ].map((item) => {
                      const isDone = analysisStep > item.step;
                      const isCurrent = analysisStep === item.step;
                      return (
                        <div
                          key={item.step}
                          className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                            isDone
                              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                              : isCurrent
                              ? 'bg-fuchsia-500/15 border-fuchsia-400 text-white'
                              : 'bg-white/5 border-white/10 text-slate-500'
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          ) : (
                            <div
                              className={`w-5 h-5 rounded-full border-2 shrink-0 ${
                                isCurrent ? 'border-fuchsia-400 border-t-transparent animate-spin' : 'border-slate-600'
                              }`}
                            />
                          )}
                          <span className="text-xs sm:text-sm font-semibold">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h4 className="text-lg font-extrabold text-white">
                    ¡{latestGeneratedClips.length} Clips Verticales MP4 9:16 Listos!
                  </h4>

                  <div className="space-y-3">
                    {latestGeneratedClips.map((clip, idx) => (
                      <div
                        key={clip.id}
                        className="p-4 rounded-2xl bg-[#150f30] border border-purple-500/35 hover:border-fuchsia-400/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                      >
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-md bg-gradient-to-r from-amber-500 to-fuchsia-600 text-white text-xs font-black">
                              🏆 Top #{idx + 1} • {clip.viralityScore}/100 Viral Score
                            </span>
                            <span className="text-xs font-bold text-sky-300">({clip.duration} MP4)</span>
                          </div>
                          <h5 className="font-bold text-white text-sm sm:text-base">{clip.title}</h5>
                          <p className="text-xs text-slate-300">{clip.hookReason}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => {
                              setIsAnalyzingModalOpen(false);
                              openClipEditor(clip);
                            }}
                            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                          >
                            <Sliders className="w-3.5 h-3.5 text-fuchsia-400" />
                            <span>Ver MP4 9:16</span>
                          </button>

                          <button
                            onClick={() => handleDownloadClip(clip)}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-[0_0_16px_rgba(192,38,211,0.5)] cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Descargar MP4</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: 9:16 VERTICAL PLAYER & EDITOR */}
      {editingClip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-4xl rounded-3xl bg-[#0c0820] border border-fuchsia-500/60 shadow-[0_0_65px_rgba(217,70,239,0.5)] overflow-hidden max-h-[92vh] flex flex-col">
            <div className="px-5 py-3.5 flex items-center justify-between bg-[#130d30] border-b border-purple-500/25">
              <div className="flex items-center gap-2.5">
                {renderPlatformBadge(editingClip.platform)}
                <span className="text-sm font-extrabold text-white">Reproductor 9:16 MP4</span>
              </div>
              <button
                onClick={() => setEditingClip(null)}
                className="p-1.5 rounded-xl bg-white/10 text-slate-200 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 flex flex-col items-center">
                <div
                  className={`relative w-full max-w-[270px] aspect-[9/16] rounded-3xl overflow-hidden border-2 border-fuchsia-400/70 bg-gradient-to-b ${editingClip.accent} flex flex-col items-center justify-between p-4 shadow-[0_0_40px_rgba(168,85,247,0.5)]`}
                >
                  {editingClip.localVideoUrl && (
                    <video
                      ref={editorVideoRef}
                      src={editingClip.localVideoUrl}
                      autoPlay={isPlayingPreview}
                      loop
                      muted={isMuted}
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                  )}
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const vid = editorVideoRef.current;
                      if (vid) {
                        if (isPlayingPreview) vid.pause();
                        else vid.play();
                      }
                      setIsPlayingPreview(!isPlayingPreview);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    {isPlayingPreview ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlayingPreview ? 'Pausar' : 'Reproducir'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="md:col-span-7 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Título del Clip</label>
                  <input
                    type="text"
                    value={editingClip.title}
                    onChange={(e) => setEditingClip({ ...editingClip, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161033] border border-purple-500/40 text-sm text-white outline-none focus:border-fuchsia-400"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={handleSaveEditedClip}
                    className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold cursor-pointer"
                  >
                    Guardar Cambios
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleDownloadClip(editingClip);
                      setEditingClip(null);
                    }}
                    className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(192,38,211,0.55)] cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar MP4 Vertical 9:16</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-purple-500/25 bg-[#05030d]/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} <span className="text-slate-200 font-bold">JONY CLIP RD</span> • Jonatan Ramírez Felix 🇩🇴
          </p>
          <a
            href="https://wa.me/18494475348"
            target="_blank"
            rel="noreferrer"
            className="text-emerald-400 font-bold hover:underline"
          >
            Soporte WhatsApp: +1 849-447-5348
          </a>
        </div>
      </footer>

      {/* MODAL 4: AUTH */}
      {authModalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-md rounded-3xl bg-[#0e0924] border border-purple-500/50 p-6 sm:p-8">
            <button
              onClick={() => setAuthModalMode(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-black text-white text-center mb-4">
              {authModalMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const nameVal = formData.get('creatorName') || 'Creador RD';
                const emailVal = formData.get('email') || 'creador@jonycliprd.com';
                setUser({ name: String(nameVal), email: String(emailVal) });
                setAuthModalMode(null);
                triggerToast(`¡Bienvenido, ${nameVal}!`);
              }}
              className="space-y-4"
            >
              {authModalMode === 'register' && (
                <input
                  name="creatorName"
                  type="text"
                  required
                  placeholder="Nombre de Creador"
                  className="w-full px-4 py-3 rounded-xl bg-[#161033] border border-purple-500/40 text-sm text-white"
                />
              )}
              <input
                name="email"
                type="email"
                required
                placeholder="Correo Electrónico"
                className="w-full px-4 py-3 rounded-xl bg-[#161033] border border-purple-500/40 text-sm text-white"
              />
              <input
                name="password"
                type="password"
                required
                placeholder="Contraseña"
                className="w-full px-4 py-3 rounded-xl bg-[#161033] border border-purple-500/40 text-sm text-white"
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 cursor-pointer"
              >
                Continuar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: AYUDA */}
      {helpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0e0924] border border-purple-500/50 p-6">
            <button
              onClick={() => setHelpModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black text-white mb-3">Ayuda — JONY CLIP RD</h3>
            <p className="text-sm text-slate-300">
              Pega un enlace de video (YouTube, Kick, Twitch, TikTok o Facebook) o sube un archivo MP4/MOV. Nuestro
              servidor en Railway transcribirá el audio, elegirá los mejores momentos y te entregará los clips MP4 en
              vertical 9:16 listos para descargar.
            </p>
          </div>
        </div>
      )}

      {/* MODAL 6: OWNER VIP */}
      {ownerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-sm rounded-3xl bg-[#0e0924] border border-sky-400/50 p-6">
            <button
              onClick={() => setOwnerModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black text-white text-center mb-3">Acceso Personal Dueño</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (ownerPinInput.trim().toUpperCase() === 'JONYRD2026') {
                  setIsOwnerMode(true);
                  setUser({ name: 'Jony (Dueño)', email: 'admin@jonycliprd.com' });
                  setOwnerPinInput('');
                  setOwnerModalOpen(false);
                  triggerToast('👑 ¡Bienvenido Jony! Acceso Dueño VIP activado.');
                } else {
                  triggerToast('❌ Clave incorrecta.');
                }
              }}
              className="space-y-4"
            >
              <input
                type="password"
                required
                value={ownerPinInput}
                onChange={(e) => setOwnerPinInput(e.target.value)}
                placeholder="Clave (JONYRD2026)"
                className="w-full px-4 py-3 rounded-xl bg-[#161033] border border-sky-400/40 text-sm text-white text-center font-mono"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-extrabold text-sm text-slate-950 bg-gradient-to-r from-sky-400 to-emerald-400 cursor-pointer"
              >
                Activar Cuenta Gratis Ilimitada
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 7: TERMS */}
      {termsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0e0924] border border-purple-500/50 p-6">
            <button
              onClick={() => setTermsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black text-white mb-3">Términos y Privacidad</h3>
            <p className="text-sm text-slate-300">
              JONY CLIP RD procesa tus videos y enlaces exclusivamente para generar tus clips verticales 9:16.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
