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
  Share2,
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
      {/* Golden Crown */}
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

      {/* Neon Play Triangle */}
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

// --- PRICING PLANS DATA ---
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

// --- SAMPLE CLIPS DATA (INCLUDING KICK) ---
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

const detectPlatformFromUrl = (url) => {
  const lower = url.toLowerCase();
  if (lower.includes('kick.com')) return 'kick';
  if (lower.includes('twitch.tv')) return 'twitch';
  if (lower.includes('tiktok.com')) return 'tiktok';
  if (lower.includes('facebook.com') || lower.includes('fb.watch')) return 'facebook';
  return 'youtube';
};

const getPlatformLabel = (platform) => {
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

const formatFileSize = (bytes) => {
  if (!bytes) return '0 MB';
  const mb = bytes / (1024 * 1024);
  return mb >= 1024 ? `${(mb / 1024).toFixed(2)} GB` : `${mb.toFixed(1)} MB`;
};

const formatSecondsToDuration = (sec) => {
  if (!sec || Number.isNaN(sec)) return '00:45';
  const mins = Math.floor(sec / 60);
  const rem = Math.floor(sec % 60);
  return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
};

// --- REAL AUDIO PEAK / ENERGY ANALYZER FOR UPLOADED VIDEOS ---
const detectBestVideoSegments = async (file, clipLenSec, count) => {
  try {
    const arrayBuffer = await file.slice(0, 45 * 1024 * 1024).arrayBuffer();
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    const ctx = new AudioCtx();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    const channelData = audioBuffer.getChannelData(0);
    const totalDuration = Math.max(clipLenSec + 2, Math.floor(audioBuffer.duration));
    const sampleRate = audioBuffer.sampleRate;

    // Score each 1-second window by RMS energy + sudden excitement spikes
    const windowScores = [];
    for (let sec = 0; sec < totalDuration - Math.min(clipLenSec, totalDuration - 1); sec += 2) {
      const startSample = Math.floor(sec * sampleRate);
      const endSample = Math.min(channelData.length, Math.floor((sec + Math.min(clipLenSec, 15)) * sampleRate));
      let sumSq = 0;
      let peak = 0;
      const step = 40;
      let samplesCount = 0;
      for (let i = startSample; i < endSample; i += step) {
        const val = Math.abs(channelData[i]);
        sumSq += val * val;
        if (val > peak) peak = val;
        samplesCount++;
      }
      const rms = samplesCount > 0 ? Math.sqrt(sumSq / samplesCount) : 0;
      const energyScore = rms * 0.65 + peak * 0.35;
      windowScores.push({ startSec: sec, energyScore });
    }

    await ctx.close();

    // Sort by highest excitement/audio energy and pick non-overlapping best moments
    windowScores.sort((a, b) => b.energyScore - a.energyScore);
    const chosen = [];
    const minSpacing = Math.max(4, Math.floor(clipLenSec * 0.65));

    for (const candidate of windowScores) {
      if (chosen.length >= count) break;
      const overlaps = chosen.some((c) => Math.abs(c.startSec - candidate.startSec) < minSpacing);
      if (!overlaps) {
        chosen.push(candidate);
      }
    }

    // Fill remaining slots evenly if video was short
    while (chosen.length < count) {
      const fallbackStart = Math.min(
        chosen.length * 5,
        Math.max(0, totalDuration - clipLenSec)
      );
      chosen.push({ startSec: fallbackStart, energyScore: 0.5 });
    }

    const maxEnergy = Math.max(...chosen.map((c) => c.energyScore), 0.01);
    return chosen.map((item, idx) => {
      const normalized = Math.min(99, Math.max(87, Math.round(88 + (item.energyScore / maxEnergy) * 11 - idx)));
      return {
        startSec: item.startSec,
        viralityScore: normalized,
        hookScore: Math.min(99, normalized + 1),
        emotionScore: Math.min(99, Math.max(85, normalized - 1)),
        retentionScore: Math.min(98, Math.max(86, normalized - 2))
      };
    });
  } catch {
    return null;
  }
};

export default function App() {
  const [activeNav, setActiveNav] = useState('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Input Mode: 'url' (Paste Stream Link) | 'upload' (Upload Video File)
  const [inputMode, setInputMode] = useState('url');
  const [streamUrl, setStreamUrl] = useState('');
  const [urlError, setUrlError] = useState('');

  // Clip Generation Preferences: Target Duration (seconds) & Clip Count (up to 100)
  const [clipDurationSec, setClipDurationSec] = useState(30); // 15 | 30 | 45 | 60 | 90
  const [desiredClipCount, setDesiredClipCount] = useState(4); // 1 to 100 clips

  // Owner / Admin Personal Unlimited Free Access State
  const [isOwnerMode, setIsOwnerMode] = useState(() => {
    try {
      return localStorage.getItem('jonyclip_owner') === 'true';
    } catch {
      return false;
    }
  });
  const [ownerModalOpen, setOwnerModalOpen] = useState(false);
  const [ownerPinInput, setOwnerPinInput] = useState('');

  // Local Uploaded Video State
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState('');
  const [uploadedVideoDuration, setUploadedVideoDuration] = useState(0);
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  const [toastMessage, setToastMessage] = useState(null);

  // Persisted User, Free Trial (10 cuts) & Paid Status State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('jonyclip_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 10 Free Cuts Trial by default for new users
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

  const [myClips, setMyClips] = useState(() => {
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
      // Avoid persisting temporary blob: URLs across full reloads
      const serializable = myClips.map(({ localVideoUrl, ...rest }) => rest);
      localStorage.setItem('jonyclip_myclips', JSON.stringify(serializable));
    } catch {}
  }, [myClips]);

  // Modals State
  const [authModalMode, setAuthModalMode] = useState(null); // 'login' | 'register' | null
  const [plansModalOpen, setPlansModalOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState(PRICING_PLANS[1]);
  const [paymentMethod, setPaymentMethod] = useState('paypal'); // 'paypal' | 'bank' | 'card'
  const [bankReferenceCode, setBankReferenceCode] = useState('JCRD-8492');
  const [copiedBankField, setCopiedBankField] = useState('');

  const [isAnalyzingModalOpen, setIsAnalyzingModalOpen] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [latestGeneratedClips, setLatestGeneratedClips] = useState([]);

  // 9:16 Vertical Preview & Integrated Editor State
  const [editingClip, setEditingClip] = useState(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(true);
  const [captionTick, setCaptionTick] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const editorVideoRef = React.useRef(null);

  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  // Dynamic max clips up to 100 based on video duration & clip length
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

  useEffect(() => {
    const vid = editorVideoRef.current;
    if (!vid || !editingClip?.localVideoUrl) return;
    const start = editingClip.startSec || 0;
    const end = editingClip.endSec || start + (editingClip.durationSec || 30);
    vid.currentTime = start;
    const onTimeUpdate = () => {
      if (vid.currentTime >= end) {
        vid.currentTime = start;
      }
    };
    vid.addEventListener('timeupdate', onTimeUpdate);
    return () => vid.removeEventListener('timeupdate', onTimeUpdate);
  }, [editingClip]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4200);
  };

  const handleSelectVideoFile = (file) => {
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

  const handleAnalyzeContent = async (e) => {
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

    const detectedMoments =
      inputMode === 'upload' && uploadedFile
        ? await detectBestVideoSegments(uploadedFile, clipDurationSec, clipsToCreate)
        : null;

    const timer1 = setTimeout(() => setAnalysisStep(1), 750);
    const timer2 = setTimeout(() => setAnalysisStep(2), 1550);
    const timer3 = setTimeout(() => setAnalysisStep(3), 2350);
    const timer4 = setTimeout(() => {
      const platform = inputMode === 'upload' ? 'upload' : detectPlatformFromUrl(streamUrl);
      const baseTitle =
        inputMode === 'upload' && uploadedFile
          ? uploadedFile.name.replace(/\.[^/.]+$/, '')
          : `Directo ${getPlatformLabel(platform)}`;

      const hookTitles = [
        '¡NO PUEDE SER LO QUE PASÓ AQUÍ! 🔥😱',
        'EL MEJOR MOMENTO DE TODO EL DIRECTO ⚡👑',
        'REACCIÓN ÉPICA QUE ROMPIÓ EL CHAT 🤯💬',
        'ESTO TIENE QUE SER VIRAL EN TIKTOK 🚀🔥',
        '¡NADIE SE ESPERABA ESTE FINAL! 🎯💥'
      ];

      const accents = [
        'from-fuchsia-700 via-purple-900 to-slate-950',
        'from-sky-600 via-indigo-900 to-slate-950',
        'from-emerald-600 via-teal-950 to-slate-950',
        'from-violet-700 via-slate-900 to-black'
      ];

      const generated = Array.from({ length: clipsToCreate }).map((_, idx) => {
        const moment = detectedMoments?.[idx];
        const startSec = moment ? moment.startSec : idx * Math.max(15, clipDurationSec);
        const endSec = startSec + clipDurationSec;
        const score = moment ? moment.viralityScore : Math.max(88, 99 - (idx % 10));

        return {
          id: `clip-${Date.now()}-${idx}`,
          title: `${hookTitles[idx % hookTitles.length]} (${baseTitle.slice(0, 22)})`,
          creator: user?.name ? `@${user.name.replace(/\s+/g, '')}` : '@JonyClipRD',
          platform,
          duration: formatSecondsToDuration(clipDurationSec),
          durationSec: clipDurationSec,
          startSec,
          endSec,
          timestamp: `${formatSecondsToDuration(startSec)} - ${formatSecondsToDuration(endSec)}`,
          viralityScore: score,
          hookScore: moment?.hookScore || Math.min(99, score + 1),
          emotionScore: moment?.emotionScore || Math.max(86, score - 1),
          retentionScore: moment?.retentionScore || Math.max(87, score - 1),
          hookReason:
            inputMode === 'upload'
              ? 'Pico de energía de voz y emoción detectado automáticamente por la IA.'
              : 'Alto nivel de interacción, cambio de ritmo y gancho verbal en los primeros 3s.',
          accent: accents[idx % accents.length],
          avatarEmoji: ['🔥', '⚡', '👑', '🎙️', '🤯'][idx % 5],
          sceneTag: `${getPlatformLabel(platform).toUpperCase()} • TOP #${idx + 1}`,
          highlightColor: idx % 2 === 0 ? '#53FC18' : '#FDE047',
          fontStyle: 'impact',
          hasBrandWatermark: !isPaidPro && !isOwnerMode,
          localVideoUrl: inputMode === 'upload' ? uploadedVideoUrl : '',
          captions: [
            { text: '¡MIRA LO QUE ACABA DE PASAR AQUÍ! 🔥', highlight: 'ACABA DE PASAR' },
            { text: '¡TODO EL CHAT EXPLOTANDO EN VIVO! 🤯', highlight: 'EXPLOTANDO EN VIVO!' },
            { text: '¡REPÚBLICA DOMINICANA HACIENDO HISTORIA! 🇩🇴', highlight: 'HACIENDO HISTORIA!' }
          ]
        };
      });

      setLatestGeneratedClips(generated);
      setMyClips((prev) => [...generated, ...prev]);

      if (!isOwnerMode) {
        if (!isPaidPro) {
          setFreeCutsRemaining((prev) => Math.max(0, prev - clipsToCreate));
        } else {
          const usedMinutes = Math.max(1, Math.ceil((clipsToCreate * clipDurationSec) / 60));
          setMinutesBalance((prev) => Math.max(0, prev - usedMinutes));
        }
      }

      setAnalysisStep(4);
    }, 3100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  };

  const handleCompletePurchase = (methodLabel) => {
    setIsPaidPro(true);
    setMinutesBalance((prev) => prev + selectedPlanForCheckout.minutes);
    setActivePlanName(selectedPlanForCheckout.name);
    setMyClips((prev) => prev.map((clip) => ({ ...clip, hasBrandWatermark: false })));
    setPlansModalOpen(false);
    triggerToast(
      `✅ ¡Pago confirmado vía ${methodLabel}! ${selectedPlanForCheckout.name} activo (${selectedPlanForCheckout.minutes} min) y marca de agua eliminada.`
    );
  };

  // Real File Download Handler for Clips
  const handleDownloadClip = (clip) => {
    const cleanFileName = `${clip.title
      .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s-]/g, '')
      .trim()
      .replace(/\s+/g, '_')
      .slice(0, 35) || 'Clip_Viral'}_JONYCLIPRD_9x16.mp4`;

    if (clip.localVideoUrl) {
      const a = document.createElement('a');
      a.href = clip.localVideoUrl;
      a.download = cleanFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      triggerToast(
        isOwnerMode || isPaidPro
          ? `⬇️ Descargando "${cleanFileName}" (1080x1920) SIN marca de agua...`
          : `⬇️ Descargando "${cleanFileName}" (Prueba gratis con marca JONY CLIP RD)...`
      );
      return;
    }

    // Export clip summary + subtitles file when generated from external stream URL
    const subtitleExport = [
      `JONY CLIP RD - EXPORTACIÓN VERTICAL 9:16`,
      `Título: ${clip.title}`,
      `Plataforma: ${getPlatformLabel(clip.platform)}`,
      `Segmento: ${clip.timestamp || clip.duration}`,
      `Viralidad IA: ${clip.viralityScore}/100`,
      `Marca de agua: ${isOwnerMode || isPaidPro ? 'NO (Plan PRO)' : 'SÍ (JONY CLIP RD)'}`,
      ``,
      `SUBTÍTULOS DINÁMICOS:`,
      ...clip.captions.map((c, i) => `${i + 1}. ${c.text}`)
    ].join('\n');

    const blob = new Blob([subtitleExport], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = cleanFileName.replace('.mp4', '_Guion_y_Subtitulos.txt');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    triggerToast(
      isOwnerMode || isPaidPro
        ? '⬇️ Clip y subtítulos 9:16 descargados SIN marca de agua.'
        : '⬇️ Clip de prueba y subtítulos descargados (con marca de agua).'
    );
  };

  const handleCopyText = (text, fieldKey) => {
    navigator.clipboard?.writeText(text);
    setCopiedBankField(fieldKey);
    triggerToast(`Copiado: ${text}`);
    setTimeout(() => setCopiedBankField(''), 2000);
  };

  const openClipEditor = (clip) => {
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

  const handleDeleteClip = (clipId) => {
    setMyClips((prev) => prev.filter((c) => c.id !== clipId));
    triggerToast('Clip eliminado de Mis Clips.');
  };

  const renderPlatformBadge = (platform, size = 'w-5 h-5') => {
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
      {/* --- AMBIENT CYBERPUNK BACKGROUND GLOWS --- */}
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

      {/* --- FLOATING TOAST NOTIFICATION --- */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md flex items-center gap-3 bg-[#130d29]/95 border border-fuchsia-500/60 text-white px-5 py-3.5 rounded-2xl shadow-[0_0_30px_rgba(217,70,239,0.5)] backdrop-blur-xl">
          <Sparkles className="w-5 h-5 text-fuchsia-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold leading-snug">{toastMessage}</span>
        </div>
      )}

      {/* =====================================================================
          1. TOP NAVBAR
      ===================================================================== */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#070514]/85 border-b border-purple-500/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2">
          {/* Brand Logo */}
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
                <span className="text-lg sm:text-xl font-black italic tracking-wider text-white">
                  CLIP
                </span>
                <span className="text-lg sm:text-xl font-black italic tracking-wider bg-gradient-to-r from-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
                  RD
                </span>
              </div>
            </div>
          </a>

          {/* Center Navigation Tabs (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {[
              {
                id: 'inicio',
                label: 'Inicio',
                icon: Home,
                action: () => window.scrollTo({ top: 0, behavior: 'smooth' })
              },
              {
                id: 'crear',
                label: 'Crear Clips',
                icon: Zap,
                action: () =>
                  document.getElementById('url-analyzer-box')?.scrollIntoView({ behavior: 'smooth' })
              },
              {
                id: 'mis-clips',
                label: 'Mis Clips',
                icon: Crown,
                badge: myClips.length,
                action: () =>
                  document.getElementById('mis-clips-section')?.scrollIntoView({ behavior: 'smooth' })
              },
              {
                id: 'planes',
                label: 'Planes',
                icon: Star,
                action: () => setPlansModalOpen(true)
              },
              {
                id: 'ayuda',
                label: 'Ayuda',
                icon: HelpCircle,
                action: () => setHelpModalOpen(true)
              }
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

          {/* Right Account / Free Trial (10 Cuts) or Pro Status & Auth Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Personal Owner VIP Key Button */}
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

            {/* Trial / Pro Status Pill */}
            <button
              onClick={() => setPlansModalOpen(true)}
              title="Haz clic para quitar la marca de agua o recargar minutos"
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
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/25 text-[10px] uppercase">
                    Sin Marca
                  </span>
                </>
              ) : isPaidPro ? (
                <>
                  <Crown className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span>PRO • {minutesBalance} min</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/25 text-[10px] uppercase">
                    Sin Marca
                  </span>
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

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-purple-950/50 border border-purple-500/30 text-white"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer */}
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

            {!user ? (
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-purple-500/20">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthModalMode('login');
                  }}
                  className="py-2.5 px-3 rounded-xl text-sm font-semibold border border-purple-500/40 bg-[#140e2b] text-center"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthModalMode('register');
                  }}
                  className="py-2.5 px-3 rounded-xl text-sm font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-center"
                >
                  Registrarse
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setUser(null);
                  setMobileMenuOpen(false);
                  triggerToast('Sesión cerrada.');
                }}
                className="w-full py-2.5 rounded-xl text-sm font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30"
              >
                Cerrar Sesión ({user.name})
              </button>
            )}
          </div>
        )}
      </header>

      {/* =====================================================================
          MAIN CONTENT CONTAINER
      ===================================================================== */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-10">
        {/* ===================================================================
            3. MAIN INPUT BOX: PASTE LINK OR UPLOAD LOCAL VIDEO (DRAG & DROP)
        =================================================================== */}
        <section
          id="url-analyzer-box"
          className="relative rounded-3xl p-[1.5px] bg-gradient-to-r from-sky-500/70 via-purple-500/80 to-fuchsia-500/70 shadow-[0_0_50px_rgba(147,51,234,0.3)]"
        >
          <div className="rounded-[22.5px] bg-[#0c0820]/90 backdrop-blur-2xl px-5 py-6 sm:px-8 sm:py-7 space-y-5">
            {/* Mode Switcher Tabs + Free Trial Watermark Banner */}
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

              {/* Trial vs Paid Watermark Notice */}
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

            {/* CLIP CONFIGURATION BAR: TARGET DURATION & NUMBER OF CLIPS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#130d2e]/85 border border-purple-500/30">
              {/* 1. Target Duration Selector */}
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

              {/* 2. Number of Clips Slider & Quick Buttons (Up to 100 depending on video length) */}
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
                    {[5, 25, 50, 100].map((num) => {
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
              /* MODE A: PASTE STREAM URL */
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
                        Copia y pega el link de cualquier transmisión en vivo de:
                      </p>
                    </div>
                  </div>

                  {/* Supported Platforms Row */}
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

                {/* Right Input & Gradient CTA Button */}
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
                        placeholder="https://kick.com/... o https://www.youtube.com/watch?v=..."
                        className="w-full h-13 pl-11 pr-4 rounded-2xl bg-[#161130]/90 border border-purple-500/40 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500/30 outline-none text-sm sm:text-base text-white placeholder:text-slate-400 transition-all"
                      />
                    </div>

                    <div className="relative">
                      <button
                        type="submit"
                        className="w-full sm:w-auto h-13 px-6 sm:px-7 rounded-2xl font-extrabold text-sm sm:text-base text-white bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 hover:from-violet-500 hover:via-fuchsia-500 hover:to-purple-500 shadow-[0_0_28px_rgba(192,38,211,0.65)] hover:shadow-[0_0_38px_rgba(192,38,211,0.9)] transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-95 shrink-0"
                      >
                        <Wand2 className="w-5 h-5" />
                        <span>Analizar Directo</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {/* Decorative Curved Purple Arrow */}
                      <svg
                        viewBox="0 0 80 42"
                        className="hidden sm:block w-16 h-9 absolute -bottom-8 right-8 text-fuchsia-500 drop-shadow-[0_0_8px_rgba(217,70,239,0.8)] pointer-events-none"
                        fill="none"
                      >
                        <path
                          d="M6 34 C 34 36, 52 24, 58 6"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <path
                          d="M49 11 L58 5 L65 14"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {urlError ? (
                    <p className="mt-2 text-xs text-rose-400 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {urlError}
                    </p>
                  ) : (
                    <div className="mt-2.5 flex flex-wrap items-center justify-center sm:justify-start sm:pl-12 gap-2 text-xs text-slate-400 font-medium">
                      <Lock className="w-3.5 h-3.5 text-purple-400" />
                      <span>Seguro</span>
                      <span>•</span>
                      <span>Rápido</span>
                      <span>•</span>
                      <span className="text-fuchsia-300 font-semibold">
                        Recorte 9:16 + Subtítulos IA
                      </span>
                    </div>
                  )}
                </form>
              </div>
            ) : (
              /* MODE B: UPLOAD LOCAL VIDEO FILE (MP4, MOV, MKV, WEBM) */
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
                          Formatos compatibles: <strong>MP4, MOV, MKV, WebM</strong> • La IA detectará los
                          mejores momentos, los recortará en 9:16 y pondrá subtítulos automáticos.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                      {/* Mini Live Video Preview */}
                      <div className="w-28 h-20 rounded-xl overflow-hidden bg-black border border-fuchsia-400/50 shrink-0 relative">
                        <video
                          src={uploadedVideoUrl}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                        />
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold text-white">
                          {formatSecondsToDuration(uploadedVideoDuration)}
                        </span>
                      </div>

                      <div className="text-center sm:text-left">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-extrabold mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Video listo para recortar con IA</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-extrabold text-white break-all">
                          {uploadedFile.name}
                        </h4>
                        <p className="text-xs text-slate-300">
                          Tamaño: <strong>{formatFileSize(uploadedFile.size)}</strong> • Duración:{' '}
                          <strong>{formatSecondsToDuration(uploadedVideoDuration)}</strong>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* File Picker + Analyze Button */}
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
                    {urlError}
                  </p>
                )}
              </form>
            )}
          </div>
        </section>

        {/* ===================================================================
            4. 5 FEATURE PILLS ROW
        =================================================================== */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {[
            {
              icon: Zap,
              title: 'Clips Automáticos',
              subtitle: 'con Inteligencia Artificial',
              iconBg: 'bg-purple-500/20 text-purple-400 border-purple-500/40'
            },
            {
              icon: Film,
              title: 'Editor Integrado',
              subtitle: 'Recorta, edita y personaliza',
              iconBg: 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/40'
            },
            {
              icon: Subtitles,
              title: 'Subtítulos Automáticos',
              subtitle: 'en varios idiomas',
              iconBg: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40'
            },
            {
              icon: Smartphone,
              title: 'Formato Vertical',
              subtitle: '9:16 para TikTok y Reels',
              iconBg: 'bg-pink-500/20 text-pink-400 border-pink-500/40'
            },
            {
              icon: CloudDownload,
              title: 'Descarga Fácil',
              subtitle: 'en un solo clic',
              iconBg: 'bg-violet-500/20 text-violet-400 border-violet-500/40'
            }
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

        {/* ===================================================================
            5. "¿CÓMO FUNCIONA?" 4-STEP FLOW
        =================================================================== */}
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
              {
                num: '1',
                icon: Link2,
                iconColor: 'text-slate-200',
                title: 'Pega el Enlace',
                desc: 'Introduce el link de tu directo favorito (YouTube, Kick, Twitch, TikTok o FB).'
              },
              {
                num: '2',
                icon: Brain,
                iconColor: 'text-pink-300',
                title: 'Deja que la IA Trabaje',
                desc: 'Analizamos la transmisión para encontrar los mejores momentos.'
              },
              {
                num: '3',
                icon: Clapperboard,
                iconColor: 'text-fuchsia-400',
                title: 'Obtén tus Clips',
                desc: 'Recibe varios clips listos para editar y compartir.'
              },
              {
                num: '4',
                icon: Upload,
                iconColor: 'text-sky-300',
                title: 'Comparte y Disfruta',
                desc: 'Publica tus clips en todas tus redes.'
              }
            ].map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={step.num} className="relative flex items-center">
                  <div className="w-full h-full relative rounded-2xl bg-[#0c0820]/90 border border-purple-500/35 hover:border-fuchsia-400/70 px-5 pt-8 pb-6 text-center flex flex-col items-center transition-all shadow-[0_0_25px_rgba(88,28,135,0.2)] hover:shadow-[0_0_30px_rgba(192,38,211,0.35)]">
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
                    <div className="hidden md:flex items-center justify-center -mr-3 ml-1 z-20 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ===================================================================
            6. USER GENERATED "MIS CLIPS" SECTION (WHEN CLIPS EXIST)
        =================================================================== */}
        {myClips.length > 0 && (
          <section id="mis-clips-section" className="space-y-4 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Crown className="w-6 h-6 text-fuchsia-400" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  Mis Clips Generados con IA ({myClips.length})
                </h2>
              </div>

              {!isPaidPro ? (
                <button
                  onClick={() => setPlansModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-fuchsia-600 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-[0_0_20px_rgba(217,70,239,0.45)] cursor-pointer"
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>Quitar marca de agua de todos mis clips</span>
                </button>
              ) : (
                <span className="text-xs text-emerald-300 font-bold">
                  ✓ Todos tus clips están desbloqueados sin marca de agua
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {myClips.map((clip) => {
                const showWatermarkOnCard = !isOwnerMode && (!isPaidPro || clip.hasBrandWatermark);
                return (
                  <div
                    key={clip.id}
                    className="group relative aspect-[9/16] rounded-2xl overflow-hidden border border-fuchsia-500/45 bg-slate-900 shadow-[0_8px_25px_rgba(0,0,0,0.65)]"
                  >
                    <button
                      onClick={() => openClipEditor(clip)}
                      className="w-full h-full text-left cursor-pointer"
                    >
                      {clip.localVideoUrl ? (
                        <video
                          src={clip.localVideoUrl}
                          className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                          muted
                          playsInline
                        />
                      ) : (
                        <div
                          className={`absolute inset-0 bg-gradient-to-b ${clip.accent} opacity-90 group-hover:scale-105 transition-transform duration-500`}
                        />
                      )}

                      <div className="absolute top-2.5 left-2.5 z-10 p-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15">
                        {renderPlatformBadge(clip.platform)}
                      </div>
                      <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-md bg-emerald-500/25 border border-emerald-400/50 backdrop-blur-md text-[10px] font-black text-emerald-300">
                        {clip.viralityScore}% IA
                      </div>

                      {/* Visible Watermark Badge on Free Trial Clips */}
                      {showWatermarkOnCard && (
                        <div className="absolute top-11 left-1/2 -translate-x-1/2 z-10 px-2.5 py-1 rounded-lg bg-black/70 border border-fuchsia-400/60 backdrop-blur-md flex items-center gap-1 whitespace-nowrap shadow-lg">
                          <Crown className="w-3 h-3 text-amber-300 fill-amber-300" />
                          <span className="text-[9px] font-black italic tracking-wider text-white">
                            JONY CLIP RD
                          </span>
                        </div>
                      )}

                      <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                        {!clip.localVideoUrl && <span className="text-4xl mb-2">{clip.avatarEmoji}</span>}
                        <div className="w-11 h-11 rounded-full bg-white/90 group-hover:bg-fuchsia-500 text-slate-950 group-hover:text-white flex items-center justify-center shadow-lg transition-all">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/95 via-black/75 to-transparent">
                        <p className="text-[11px] font-extrabold text-white line-clamp-2 leading-snug mb-1.5">
                          {clip.title}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-fuchsia-300 font-bold">Editar 9:16</span>
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
                );
              })}
            </div>
          </section>
        )}

        {/* ===================================================================
            7. BOTTOM SPLIT SECTION (EJEMPLOS DE CLIPS + CTA CARD)
        =================================================================== */}
        <section id="ejemplos-section" className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch pt-2">
          {/* Left Column: Ejemplos de Clips (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Star className="w-6 h-6 text-amber-400 fill-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.7)]" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">Ejemplos de Clips</h2>
              </div>

              <button
                onClick={() => openClipEditor(SAMPLE_CLIPS[1])}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-purple-200 bg-[#140e2e] border border-purple-500/40 hover:border-fuchsia-400 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Ver más</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 4 Vertical 9:16 Video Preview Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {SAMPLE_CLIPS.map((clip) => (
                <button
                  key={clip.id}
                  onClick={() => openClipEditor(clip)}
                  className="group relative aspect-[9/16] rounded-2xl overflow-hidden border border-purple-500/40 hover:border-fuchsia-400 bg-slate-900 shadow-[0_8px_25px_rgba(0,0,0,0.65)] hover:shadow-[0_0_28px_rgba(217,70,239,0.5)] transition-all text-left cursor-pointer"
                >
                  <div className={`absolute inset-0 bg-gradient-to-b ${clip.accent} opacity-90 group-hover:scale-105 transition-transform duration-500`} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.16),transparent_65%)]" />

                  <div className="absolute top-2.5 left-2.5 z-10 p-1 rounded-lg bg-black/55 backdrop-blur-md border border-white/15">
                    {renderPlatformBadge(clip.platform)}
                  </div>

                  <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-md bg-emerald-500/25 border border-emerald-400/50 backdrop-blur-md text-[10px] font-black text-emerald-300">
                    {clip.viralityScore}% IA
                  </div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                    <span className="text-4xl sm:text-5xl mb-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] select-none">
                      {clip.avatarEmoji}
                    </span>

                    <div className="w-11 h-11 rounded-full bg-white/90 group-hover:bg-fuchsia-500 text-slate-950 group-hover:text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.65)] group-hover:scale-110 transition-all">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col justify-end">
                    <p className="text-[11px] font-extrabold text-white line-clamp-2 leading-snug mb-1.5 drop-shadow">
                      {clip.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-purple-300 font-semibold truncate max-w-[65%]">
                        {clip.creator}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-black/80 border border-white/15 text-[10px] font-bold text-white">
                        {clip.duration}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Join the Revolution CTA Card (5 Cols) */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-purple-500/45 bg-gradient-to-br from-[#1b0d3b] via-[#110826] to-[#260d47] p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-[0_0_45px_rgba(147,51,234,0.3)]">
            <div className="absolute -top-12 -left-12 w-44 h-44 rounded-full bg-sky-500/20 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-fuchsia-600/30 blur-2xl pointer-events-none" />

            <div className="w-14 h-14 rounded-2xl bg-sky-500/15 border border-sky-400/40 flex items-center justify-center mb-4 -rotate-12 shadow-[0_0_24px_rgba(56,189,248,0.45)]">
              <Rocket className="w-8 h-8 text-sky-400" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black italic text-white leading-tight max-w-sm">
              ¡Únete a la{' '}
              <span className="bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                revolución
              </span>{' '}
              de los{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                clips!
              </span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xs leading-relaxed">
              Con <span className="font-extrabold text-white">JONY CLIP RD</span>, convierte cualquier
              directo en contenido viral.
            </p>

            {/* Primary CTA Button -> Opens Plans & Checkout to remove watermark or scrolls to input */}
            <button
              onClick={() => {
                if (!isPaidPro) {
                  setPlansModalOpen(true);
                } else {
                  document.getElementById('url-analyzer-box')?.scrollIntoView({ behavior: 'smooth' });
                  triggerToast(`Tienes ${minutesBalance} min PRO listos sin marca de agua.`);
                }
              }}
              className="mt-6 relative z-10 px-8 py-4 rounded-full font-extrabold text-base sm:text-lg text-white bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 hover:from-violet-500 hover:via-fuchsia-500 hover:to-purple-500 shadow-[0_0_30px_rgba(217,70,239,0.7)] hover:shadow-[0_0_42px_rgba(217,70,239,0.95)] transition-all flex items-center gap-3 cursor-pointer active:scale-95"
            >
              <Crown className="w-5 h-5 text-amber-300 fill-amber-300" />
              <span>{isPaidPro ? 'Crear Clips PRO' : 'Quitar Marca y Activar PRO'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <Clapperboard className="w-16 h-16 text-purple-400/25 absolute bottom-3 right-4 rotate-12 pointer-events-none" />
          </div>
        </section>
      </main>

      {/* =====================================================================
          MODAL 1: PLANS & DOMINICAN REPUBLIC CHECKOUT (REMOVES WATERMARK)
      ===================================================================== */}
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
                ELIMINA LA MARCA DE AGUA • JONY CLIP RD PRO
              </span>
              <h3 className="mt-2.5 text-2xl sm:text-3xl font-black text-white">
                Activa tu plan y exporta clips limpios sin marca de agua
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-300">
                Al pagar cualquier plan se quita al instante la marca de agua de todos tus videos • USD y RD$
              </p>
            </div>

            {/* 3 Pricing Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
              {PRICING_PLANS.map((plan) => {
                const isSelected = selectedPlanForCheckout.id === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanForCheckout(plan)}
                    className={`rounded-2xl p-5 flex flex-col justify-between border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#231252] to-[#12092e] border-fuchsia-400 shadow-[0_0_30px_rgba(217,70,239,0.4)] scale-[1.01]'
                        : 'bg-[#130d2e]/80 border-purple-500/30 hover:border-purple-400/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-extrabold text-base sm:text-lg text-white">{plan.name}</h4>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                            plan.highlighted
                              ? 'bg-fuchsia-500 text-white'
                              : 'bg-purple-500/25 text-purple-200 border border-purple-400/30'
                          }`}
                        >
                          {plan.badge}
                        </span>
                      </div>

                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-3xl font-black text-white">${plan.usdPrice} USD</span>
                        <span className="text-xs font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 px-2 py-0.5 rounded-md">
                          RD${plan.dopPrice.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-400">{plan.periodLabel}</span>
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

                    <button
                      type="button"
                      onClick={() => setSelectedPlanForCheckout(plan)}
                      className={`mt-5 w-full py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-fuchsia-600 text-white shadow-[0_0_16px_rgba(217,70,239,0.6)]'
                          : 'bg-white/10 text-slate-200 hover:bg-white/20'
                      }`}
                    >
                      {isSelected ? '✓ Plan Seleccionado' : 'Seleccionar Plan'}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Checkout Payment Methods Box */}
            <div className="rounded-2xl bg-[#130d2e] border border-purple-500/40 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-purple-500/25">
                <div>
                  <h4 className="font-extrabold text-base text-white">
                    Método de Pago — {selectedPlanForCheckout.name}
                  </h4>
                  <p className="text-xs text-slate-300">
                    Total a pagar:{' '}
                    <span className="font-black text-white">${selectedPlanForCheckout.usdPrice} USD</span>{' '}
                    o{' '}
                    <span className="font-black text-emerald-300">
                      RD${selectedPlanForCheckout.dopPrice.toLocaleString()} DOP
                    </span>
                  </p>
                </div>

                {/* Payment Method Selector Tabs */}
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border cursor-pointer transition-all ${
                      paymentMethod === 'paypal'
                        ? 'bg-sky-600/30 border-sky-400 text-white'
                        : 'bg-black/30 border-white/10 text-slate-300 hover:text-white'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-sky-400" />
                    <span>PayPal (JonatanRamirez01)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border cursor-pointer transition-all ${
                      paymentMethod === 'bank'
                        ? 'bg-emerald-600/25 border-emerald-400 text-white'
                        : 'bg-black/30 border-white/10 text-slate-300 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    <span>Transferencia RD$ (Banreservas / BHD / Popular)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-purple-600/35 border-fuchsia-400 text-white'
                        : 'bg-black/30 border-white/10 text-slate-300 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-fuchsia-400" />
                    <span>Tarjeta</span>
                  </button>
                </div>
              </div>

              {/* Payment Method Details */}
              {paymentMethod === 'paypal' && (
                <div className="mt-4 space-y-3 bg-black/35 p-4 rounded-2xl border border-sky-500/35">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs sm:text-sm text-slate-200 space-y-1">
                      <p>
                        Envía tu pago directo por <span className="font-bold text-sky-400">PayPal.me</span> a{' '}
                        <span className="font-extrabold text-white">Jonatan Ramírez Felix</span> (
                        <span className="font-mono text-sky-300">@JonatanRamirez01</span>) por{' '}
                        <span className="font-black text-white">${selectedPlanForCheckout.usdPrice} USD</span>.
                      </p>
                      <p className="text-xs text-slate-400">
                        Al abrir PayPal con el botón azul se cargará el monto exacto de ${selectedPlanForCheckout.usdPrice} USD.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto shrink-0">
                      <a
                        href={`https://www.paypal.me/JonatanRamirez01/${selectedPlanForCheckout.usdPrice}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm bg-[#0070BA] hover:bg-[#005ea6] text-white shadow-[0_0_20px_rgba(0,112,186,0.5)] text-center"
                      >
                        Pagar ${selectedPlanForCheckout.usdPrice} USD en PayPal
                      </a>

                      <button
                        type="button"
                        onClick={() => handleCompletePurchase('PayPal (@JonatanRamirez01)')}
                        className="px-4 py-3 rounded-xl font-extrabold text-xs bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                      >
                        Ya pagué • Activar Plan
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="mt-4 space-y-4">
                  <div className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-slate-300">
                      Titular de todas las cuentas:{' '}
                      <strong className="text-white">Jonatan Ramírez Felix</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyText('Jonatan Ramírez Felix', 'titular')}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedBankField === 'titular' ? 'Nombre Copiado' : 'Copiar Nombre'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {/* Banreservas Card */}
                    <div className="p-4 rounded-2xl bg-black/45 border border-sky-500/35 space-y-1.5">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[11px] font-black uppercase tracking-wider text-sky-400">
                          🏦 Banreservas (Ahorros)
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyText('9607786673', 'banreservas')}
                          className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-bold flex items-center gap-1 cursor-pointer shrink-0"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedBankField === 'banreservas' ? 'Copiado' : 'Copiar'}</span>
                        </button>
                      </div>
                      <p className="text-base font-mono font-black text-white">9607786673</p>
                      <p className="text-[11px] text-slate-300">Jonatan Ramírez Felix</p>
                    </div>

                    {/* Banco BHD Card */}
                    <div className="p-4 rounded-2xl bg-black/45 border border-emerald-500/35 space-y-1.5">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400">
                          🏦 Banco BHD (Ahorros)
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyText('41510620018', 'bhd')}
                          className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-bold flex items-center gap-1 cursor-pointer shrink-0"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedBankField === 'bhd' ? 'Copiado' : 'Copiar'}</span>
                        </button>
                      </div>
                      <p className="text-base font-mono font-black text-white">41510620018</p>
                      <p className="text-[11px] text-slate-300">Jonatan Ramírez Felix</p>
                    </div>

                    {/* Banco Popular Card */}
                    <div className="p-4 rounded-2xl bg-black/45 border border-blue-500/35 space-y-1.5">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[11px] font-black uppercase tracking-wider text-blue-400">
                          🏦 Popular (Corriente)
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyText('846910875', 'popular')}
                          className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-bold flex items-center gap-1 cursor-pointer shrink-0"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedBankField === 'popular' ? 'Copiado' : 'Copiar'}</span>
                        </button>
                      </div>
                      <p className="text-base font-mono font-black text-white">846910875</p>
                      <p className="text-[11px] text-slate-300">Jonatan Ramírez Felix</p>
                    </div>
                  </div>

                  {/* Reference Code + WhatsApp Receipt & Instant Activation */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/35">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-300">Referencia:</span>
                      <input
                        type="text"
                        value={bankReferenceCode}
                        onChange={(e) => setBankReferenceCode(e.target.value)}
                        className="w-28 px-2.5 py-1 rounded-lg bg-black/60 border border-emerald-400/40 font-mono font-bold text-emerald-300 text-xs"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={`https://wa.me/18494475348?text=${encodeURIComponent(
                          `Hola Jonatan (JONY CLIP RD), acabo de transferir RD$${selectedPlanForCheckout.dopPrice} para el ${selectedPlanForCheckout.name}. Mi referencia es: ${bankReferenceCode}`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-xs flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Enviar Comprobante (+1 849-447-5348)</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleCompletePurchase('Transferencia Bancaria RD$')}
                        className="px-4 py-2 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-extrabold text-xs cursor-pointer"
                      >
                        Validar y Activar Ahora
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCompletePurchase('Tarjeta de Crédito/Débito');
                  }}
                  className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-3 items-end"
                >
                  <div className="sm:col-span-5">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Número de Tarjeta (Visa / Mastercard / Azul)
                    </label>
                    <input
                      type="text"
                      required
                      defaultValue="4532 •••• •••• 8841"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-purple-500/40 text-sm text-white outline-none focus:border-fuchsia-400"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">Expira</label>
                    <input
                      type="text"
                      required
                      defaultValue="09/29"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-purple-500/40 text-sm text-white outline-none focus:border-fuchsia-400"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">CVC</label>
                    <input
                      type="text"
                      required
                      defaultValue="742"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-purple-500/40 text-sm text-white outline-none focus:border-fuchsia-400"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm text-white bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.6)] cursor-pointer"
                    >
                      Pagar ${selectedPlanForCheckout.usdPrice} USD
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: MULTI-STEP AI STREAM & UPLOADED VIDEO ANALYZER
      ===================================================================== */}
      {isAnalyzingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#0e0924] border border-fuchsia-500/50 shadow-[0_0_60px_rgba(192,38,211,0.45)] overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-purple-500/25 flex items-center justify-between bg-[#130d30]">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-fuchsia-400" />
                <h3 className="font-extrabold text-base sm:text-lg text-white">
                  Motor IA de Recorte Vertical 9:16
                </h3>
              </div>
              <button
                onClick={() => setIsAnalyzingModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 flex items-center justify-between gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2 truncate">
                  {renderPlatformBadge(
                    inputMode === 'upload' ? 'upload' : detectPlatformFromUrl(streamUrl),
                    'w-4 h-4'
                  )}
                  <span className="truncate font-mono text-sky-300">
                    {inputMode === 'upload' && uploadedFile ? uploadedFile.name : streamUrl}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-600/30 text-purple-200 font-bold shrink-0">
                  {isOwnerMode
                    ? 'Dueño VIP Gratis'
                    : isPaidPro
                    ? 'PRO Sin Marca'
                    : 'Prueba Gratis (Con Marca)'}
                </span>
              </div>

              {analysisStep < 4 ? (
                <div className="py-6 space-y-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-[0_0_30px_rgba(217,70,239,0.7)] animate-pulse mb-4">
                      <Brain className="w-9 h-9 text-white" />
                    </div>
                    <h4 className="text-xl font-extrabold text-white">
                      {inputMode === 'upload'
                        ? 'Recortando tu video subido y generando subtítulos...'
                        : `Procesando transmisión de ${getPlatformLabel(detectPlatformFromUrl(streamUrl))}...`}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Detectando picos de emoción, encuadre vertical 9:16 y subtítulos dinámicos
                    </p>
                  </div>

                  <div className="max-w-md mx-auto space-y-2.5">
                    {[
                      {
                        step: 0,
                        label:
                          inputMode === 'upload'
                            ? 'Leyendo pistas de video y audio del archivo...'
                            : 'Extrayendo stream y pista de audio en HD...'
                      },
                      { step: 1, label: 'Transcribiendo audio en español con marcas de tiempo...' },
                      { step: 2, label: 'Detectando momentos virales y ganchos de retención...' },
                      { step: 3, label: 'Aplicando reencuadre vertical 9:16 y subtítulos neón...' }
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
                                isCurrent
                                  ? 'border-fuchsia-400 border-t-transparent animate-spin'
                                  : 'border-slate-600'
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
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h4 className="text-lg font-extrabold text-white">
                        ¡{latestGeneratedClips.length} Clips Verticales 9:16 Listos!
                      </h4>
                      <p className="text-xs text-slate-300">
                        {isOwnerMode ? (
                          <span className="text-sky-300 font-bold">
                            👑 Modo Personal Dueño: Gratis ilimitado y SIN marca de agua
                          </span>
                        ) : isPaidPro ? (
                          <span className="text-emerald-300 font-bold">
                            ✓ Exportación limpia SIN marca de agua ({minutesBalance} min restantes)
                          </span>
                        ) : (
                          <span>
                            Te quedan <strong className="text-amber-300">{freeCutsRemaining} cortes gratis</strong>{' '}
                            • Incluyen marca de agua <strong>JONY CLIP RD</strong>.{' '}
                            <button
                              onClick={() => {
                                setIsAnalyzingModalOpen(false);
                                setPlansModalOpen(true);
                              }}
                              className="text-fuchsia-300 underline font-bold cursor-pointer"
                            >
                              Pagar plan para quitarla
                            </button>
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

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
                            <span className="text-xs font-mono text-slate-400">{clip.timestamp}</span>
                            <span className="text-xs font-bold text-sky-300">({clip.duration})</span>
                            {!isPaidPro && !isOwnerMode && (
                              <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-[10px] font-bold text-amber-200">
                                Con marca de agua
                              </span>
                            )}
                          </div>
                          <h5 className="font-bold text-white text-sm sm:text-base">{clip.title}</h5>
                          <p className="text-xs text-slate-300 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>{clip.hookReason}</span>
                          </p>
                          {/* AI Virality Breakdown Pills */}
                          <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[11px] font-bold">
                            <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                              Gancho: {clip.hookScore || 96}%
                            </span>
                            <span className="px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30">
                              Emoción/Audio: {clip.emotionScore || 94}%
                            </span>
                            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-200 border border-purple-400/30">
                              Retención 9:16: {clip.retentionScore || 95}%
                            </span>
                          </div>
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
                            <span>Ver / Editar 9:16</span>
                          </button>

                          <button
                            onClick={() => handleDownloadClip(clip)}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-[0_0_16px_rgba(192,38,211,0.5)] cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Descargar</span>
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

      {/* =====================================================================
          MODAL 3: 9:16 VERTICAL PLAYER & INTEGRATED SUBTITLE EDITOR
      ===================================================================== */}
      {editingClip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-4xl rounded-3xl bg-[#0c0820] border border-fuchsia-500/60 shadow-[0_0_65px_rgba(217,70,239,0.5)] overflow-hidden max-h-[92vh] flex flex-col">
            {/* Top Bar */}
            <div className="px-5 py-3.5 flex items-center justify-between bg-[#130d30] border-b border-purple-500/25">
              <div className="flex items-center gap-2.5">
                {renderPlatformBadge(editingClip.platform)}
                <span className="text-sm font-extrabold text-white">
                  Reproductor 9:16 y Editor Integrado
                </span>
              </div>
              <button
                onClick={() => setEditingClip(null)}
                className="p-1.5 rounded-xl bg-white/10 text-slate-200 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split View: Left 9:16 Vertical Video Preview | Right Customization Controls */}
            <div className="p-5 sm:p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left 9:16 Vertical Preview */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div
                  className={`relative w-full max-w-[270px] aspect-[9/16] rounded-3xl overflow-hidden border-2 border-fuchsia-400/70 bg-gradient-to-b ${editingClip.accent} flex flex-col items-center justify-between p-4 shadow-[0_0_40px_rgba(168,85,247,0.5)]`}
                >
                  {/* Real Uploaded Video Cropped to 9:16 at the Exact Best Moment */}
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

                  {/* Top Overlays */}
                  <div className="w-full flex items-center justify-between z-10">
                    <span className="px-2 py-0.5 rounded-full bg-black/70 border border-white/15 text-[10px] font-bold text-white">
                      {editingClip.sceneTag}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-400/50 text-[10px] font-black text-emerald-300">
                      {editingClip.viralityScore}% IA
                    </span>
                  </div>

                  {/* MANDATORY BRAND WATERMARK WHILE ON FREE TRIAL (!isPaidPro && !isOwnerMode) */}
                  {!isPaidPro && !isOwnerMode && (
                    <div className="z-10 my-auto flex flex-col items-center gap-1.5">
                      <div className="px-3.5 py-1.5 rounded-xl bg-black/65 border border-fuchsia-400/70 backdrop-blur-md flex items-center gap-1.5 shadow-[0_0_25px_rgba(217,70,239,0.65)]">
                        <Crown className="w-4 h-4 text-amber-300 fill-amber-300" />
                        <span className="text-xs font-black italic tracking-wider text-white">
                          JONY CLIP RD
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingClip(null);
                          setPlansModalOpen(true);
                        }}
                        className="px-2.5 py-0.5 rounded-full bg-fuchsia-600/90 hover:bg-fuchsia-500 text-[10px] font-extrabold text-white shadow cursor-pointer"
                      >
                        Quitar marca de agua
                      </button>
                    </div>
                  )}

                  {/* Animated Streamer Avatar (Only shown when no uploaded video file) */}
                  {!editingClip.localVideoUrl && (isPaidPro || isOwnerMode) && (
                    <div className="flex flex-col items-center text-center my-auto z-10">
                      <div
                        className={`w-20 h-20 rounded-full bg-white/10 border-2 border-fuchsia-400/60 flex items-center justify-center text-5xl shadow-[0_0_30px_rgba(217,70,239,0.6)] ${
                          isPlayingPreview ? 'animate-bounce' : ''
                        }`}
                      >
                        {editingClip.avatarEmoji}
                      </div>
                      <span className="mt-2.5 text-[10px] uppercase tracking-widest text-purple-200/80 font-bold">
                        Smart Crop 9:16 Activo
                      </span>
                    </div>
                  )}

                  {/* Live Dynamic Subtitles Box */}
                  <div className="w-full z-10 mb-1 mt-auto">
                    <div className="px-3.5 py-2.5 rounded-2xl bg-black/80 border border-white/15 backdrop-blur-md text-center shadow-xl">
                      <p
                        className={`text-sm sm:text-base leading-snug text-white ${
                          editingClip.fontStyle === 'impact'
                            ? 'font-black uppercase tracking-wide'
                            : 'font-bold tracking-normal'
                        }`}
                      >
                        {editingClip.captions[captionTick]?.text.replace(
                          editingClip.captions[captionTick]?.highlight,
                          ''
                        )}
                        <span
                          style={{ color: editingClip.highlightColor || '#FDE047' }}
                          className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                        >
                          {editingClip.captions[captionTick]?.highlight}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Playback Controls under 9:16 frame */}
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPlayingPreview(!isPlayingPreview)}
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

              {/* Right Integrated Editor Controls */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Título del Clip (TikTok / Reels / Shorts)
                  </label>
                  <input
                    type="text"
                    value={editingClip.title}
                    onChange={(e) => setEditingClip({ ...editingClip, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161033] border border-purple-500/40 text-sm text-white outline-none focus:border-fuchsia-400"
                  />
                </div>

                {/* Subtitle Text Editor for current segment */}
                <div className="p-3.5 rounded-2xl bg-[#140e2e] border border-purple-500/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-fuchsia-300 flex items-center gap-1.5">
                      <Type className="w-3.5 h-3.5" />
                      Editar Subtítulo (Frase #{captionTick + 1})
                    </span>
                    <div className="flex gap-1">
                      {editingClip.captions.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCaptionTick(idx)}
                          className={`w-6 h-6 rounded-lg text-xs font-black cursor-pointer ${
                            captionTick === idx
                              ? 'bg-fuchsia-600 text-white'
                              : 'bg-white/10 text-slate-400'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  <input
                    type="text"
                    value={editingClip.captions[captionTick]?.text || ''}
                    onChange={(e) => {
                      const updated = [...editingClip.captions];
                      updated[captionTick] = { ...updated[captionTick], text: e.target.value };
                      setEditingClip({ ...editingClip, captions: updated });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-purple-500/35 text-xs sm:text-sm text-white outline-none focus:border-fuchsia-400"
                  />
                </div>

                {/* Highlight Color & Watermark Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-[#140e2e] border border-purple-500/30 space-y-2">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-sky-400" />
                      Color de Resaltado Neón
                    </span>
                    <div className="flex items-center gap-2">
                      {[
                        { name: 'Kick Green', hex: '#53FC18' },
                        { name: 'Magenta', hex: '#E879F9' },
                        { name: 'Amarillo', hex: '#FDE047' },
                        { name: 'Cyan', hex: '#38BDF8' }
                      ].map((c) => (
                        <button
                          key={c.hex}
                          type="button"
                          onClick={() => setEditingClip({ ...editingClip, highlightColor: c.hex })}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                          className={`w-7 h-7 rounded-full border-2 cursor-pointer transition-transform ${
                            editingClip.highlightColor === c.hex
                              ? 'border-white scale-110 shadow-lg'
                              : 'border-transparent opacity-80'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#140e2e] border border-purple-500/30 space-y-2">
                    <span className="text-xs font-bold text-slate-300">Fuente y Marca de Agua</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setEditingClip({
                            ...editingClip,
                            fontStyle: editingClip.fontStyle === 'impact' ? 'modern' : 'impact'
                          })
                        }
                        className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold cursor-pointer"
                      >
                        {editingClip.fontStyle === 'impact' ? 'Impacto' : 'Moderna'}
                      </button>

                      {!isPaidPro && !isOwnerMode ? (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingClip(null);
                            setPlansModalOpen(true);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 border border-amber-400/50 text-amber-200 text-xs font-extrabold cursor-pointer"
                        >
                          🔒 Quitar Marca
                        </button>
                      ) : (
                        <span className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                          ✓ Sin Marca
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Export / Save Actions */}
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
                    className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 hover:from-violet-500 hover:to-fuchsia-500 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(192,38,211,0.55)] cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>
                      {isOwnerMode || isPaidPro ? 'Descargar MP4 Sin Marca' : 'Descargar (Con Marca de Agua)'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          8. PROFESSIONAL FOOTER (JONY CLIP RD)
      ===================================================================== */}
      <footer className="relative z-10 border-t border-purple-500/25 bg-[#05030d]/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-purple-500/20">
            {/* Brand & Description (5 cols) */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <BrandLogoIcon size="sm" />
                <div className="flex flex-col leading-none">
                  <span className="text-xl font-black italic tracking-wider bg-gradient-to-r from-sky-300 via-white to-purple-300 bg-clip-text text-transparent">
                    JONY
                  </span>
                  <div className="flex items-center gap-1 -mt-0.5">
                    <span className="text-lg font-black italic tracking-wider text-white">CLIP</span>
                    <span className="text-lg font-black italic tracking-wider bg-gradient-to-r from-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
                      RD
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                La plataforma #1 de República Dominicana con Inteligencia Artificial para convertir directos de{' '}
                <span className="text-slate-200 font-semibold">Kick, YouTube, Twitch, TikTok y Facebook</span> en
                clips verticales 9:16 virales con subtítulos automáticos.
              </p>

              {/* Social Media Links */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <a
                  href="https://www.tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-fuchsia-600/25 border border-white/10 hover:border-fuchsia-400/50 transition-all"
                >
                  <TikTokBadge className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-rose-600/25 border border-white/10 hover:border-rose-400/50 transition-all"
                >
                  <YouTubeBadge className="w-5 h-5" />
                </a>
                <a
                  href="https://kick.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Kick"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-emerald-600/25 border border-white/10 hover:border-[#53FC18]/50 transition-all"
                >
                  <KickBadge className="w-5 h-5" />
                </a>
                <a
                  href="https://www.twitch.tv"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitch"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-purple-600/25 border border-white/10 hover:border-purple-400/50 transition-all"
                >
                  <TwitchBadge className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-600/25 border border-white/10 hover:border-blue-400/50 transition-all"
                >
                  <FacebookBadge className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Platform Navigation Links (3 cols) */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">Plataforma</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                <li>
                  <button
                    type="button"
                    onClick={() => document.getElementById('url-analyzer-box')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-fuchsia-300 transition-colors cursor-pointer"
                  >
                    Crear Clips con IA
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setPlansModalOpen(true)}
                    className="hover:text-fuchsia-300 transition-colors cursor-pointer"
                  >
                    Planes y Precios (USD / RD$)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => document.getElementById('ejemplos-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="hover:text-fuchsia-300 transition-colors cursor-pointer"
                  >
                    Ejemplos Virales 9:16
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setHelpModalOpen(true)}
                    className="hover:text-fuchsia-300 transition-colors cursor-pointer"
                  >
                    Preguntas Frecuentes
                  </button>
                </li>
              </ul>
            </div>

            {/* Direct WhatsApp Support & Legal (4 cols) */}
            <div className="md:col-span-4 space-y-3.5">
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-white">
                Soporte Directo y Pagos RD
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                ¿Pagaste por transferencia Banreservas, BHD o Popular, o necesitas ayuda con tu cuenta? Escríbenos directo:
              </p>

              <a
                href={`https://wa.me/18494475348?text=${encodeURIComponent(
                  'Hola Jonatan (JONY CLIP RD), necesito soporte con mi cuenta o activar mi plan.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-xs sm:text-sm shadow-[0_0_20px_rgba(37,211,102,0.35)] transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Soporte WhatsApp: +1 849-447-5348</span>
              </a>

              <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <button
                  type="button"
                  onClick={() => setTermsModalOpen(true)}
                  className="hover:text-white underline cursor-pointer"
                >
                  Términos del Servicio
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => setTermsModalOpen(true)}
                  className="hover:text-white underline cursor-pointer"
                >
                  Política de Privacidad
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Row */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>
              © {new Date().getFullYear()} <span className="text-slate-300 font-bold">JONY CLIP RD</span> • Todos los derechos reservados • Jonatan Ramírez Felix 🇩🇴
            </p>
            <p className="text-slate-400">
              Hecho para creadores y streamers en República Dominicana y Latinoamérica
            </p>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          MODAL 4: AUTH (LOGIN / REGISTER)
      ===================================================================== */}
      {authModalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-md rounded-3xl bg-[#0e0924] border border-purple-500/50 p-6 sm:p-8 shadow-[0_0_50px_rgba(168,85,247,0.45)]">
            <button
              onClick={() => setAuthModalMode(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center mb-6">
              <BrandLogoIcon size="sm" />
              <h3 className="mt-3 text-2xl font-black text-white">
                {authModalMode === 'login' ? 'Bienvenido de vuelta' : 'Crea tu cuenta en JONY CLIP RD'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {authModalMode === 'login'
                  ? 'Accede a tu saldo de minutos y clips guardados'
                  : 'Regístrate para activar tu plan y comenzar a generar clips virales'}
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const nameVal = formData.get('creatorName') || 'Creador RD';
                const emailVal = formData.get('email') || 'creador@jonycliprd.com';
                setUser({ name: String(nameVal), email: String(emailVal) });
                setAuthModalMode(null);
                if (minutesBalance <= 0) {
                  setPlansModalOpen(true);
                  triggerToast('¡Cuenta lista! Selecciona tu plan para activar tus minutos.');
                } else {
                  triggerToast(`¡Bienvenido, ${nameVal}!`);
                }
              }}
              className="space-y-4"
            >
              {authModalMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Nombre de Creador / Canal
                  </label>
                  <input
                    name="creatorName"
                    type="text"
                    required
                    placeholder="Ej. JonyGamerRD"
                    className="w-full px-4 py-3 rounded-xl bg-[#161033] border border-purple-500/40 text-sm text-white focus:border-fuchsia-400 outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Correo Electrónico
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="creador@jonycliprd.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#161033] border border-purple-500/40 text-sm text-white focus:border-fuchsia-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Contraseña</label>
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-[#161033] border border-purple-500/40 text-sm text-white focus:border-fuchsia-400 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-[0_0_24px_rgba(192,38,211,0.6)] cursor-pointer"
              >
                {authModalMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta y Elegir Plan'}
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-slate-400">
              {authModalMode === 'login' ? '¿Aún no tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
              <button
                onClick={() => setAuthModalMode(authModalMode === 'login' ? 'register' : 'login')}
                className="text-fuchsia-400 font-bold hover:underline cursor-pointer"
              >
                {authModalMode === 'login' ? 'Regístrate ahora' : 'Inicia sesión'}
              </button>
            </p>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 5: AYUDA / FAQ
      ===================================================================== */}
      {helpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0e0924] border border-purple-500/50 p-6 sm:p-7 shadow-[0_0_50px_rgba(168,85,247,0.45)] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setHelpModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-white flex items-center gap-2 mb-4">
              <HelpCircle className="w-6 h-6 text-fuchsia-400" />
              <span>Centro de Ayuda — JONY CLIP RD</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-[#150f33] border border-purple-500/30">
                <h4 className="font-bold text-white mb-1">¿Cómo funciona la prueba gratis de 10 cortes?</h4>
                <p className="text-slate-300">
                  Todos los usuarios nuevos reciben <strong>10 cortes de video gratis</strong> (ya sea
                  pegando un link o subiendo su propio video MP4/MOV). Durante la prueba gratis los clips
                  llevan la marca de agua <strong>JONY CLIP RD</strong>.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#150f33] border border-purple-500/30">
                <h4 className="font-bold text-white mb-1">¿Cómo quito la marca de agua?</h4>
                <p className="text-slate-300">
                  En cuanto activas cualquiera de nuestros planes de pago (Tarjeta, PayPal o{' '}
                  <strong>Transferencia Banreservas / Banco Popular</strong>), la marca de agua se
                  elimina automáticamente de todos tus clips existentes y futuros.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#150f33] border border-purple-500/30">
                <h4 className="font-bold text-white mb-1">¿Puedo subir mis propios videos grabados?</h4>
                <p className="text-slate-300">
                  Sí. En la caja principal selecciona la pestaña <strong>"Subir Video (MP4 / MOV)"</strong>,
                  arrastra tu archivo y la IA lo recortará en formato vertical 9:16 con subtítulos
                  dinámicos listos para TikTok, Reels y Shorts.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 6: PERSONAL OWNER VIP LOGIN (100% FREE UNLIMITED FOR JONY)
      ===================================================================== */}
      {ownerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-sm rounded-3xl bg-[#0e0924] border border-sky-400/50 p-6 shadow-[0_0_50px_rgba(56,189,248,0.4)]">
            <button
              onClick={() => setOwnerModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/50 flex items-center justify-center mx-auto mb-3">
                <Crown className="w-6 h-6 text-amber-300 fill-amber-300" />
              </div>
              <h3 className="text-xl font-black text-white">Acceso Personal Dueño</h3>
              <p className="text-xs text-slate-300 mt-1">
                Ingresa tu clave privada de dueño para usar <strong>JONY CLIP RD</strong> 100% gratis, sin límites y sin marca de agua.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (ownerPinInput.trim().toUpperCase() === 'JONYRD2026') {
                  setIsOwnerMode(true);
                  setUser({ name: 'Jony (Dueño)', email: 'admin@jonycliprd.com' });
                  setMyClips((prev) => prev.map((clip) => ({ ...clip, hasBrandWatermark: false })));
                  setOwnerPinInput('');
                  setOwnerModalOpen(false);
                  triggerToast('👑 ¡Bienvenido Jony! Acceso Dueño VIP activado: 100% gratis, hasta 100 clips y sin marca de agua.');
                } else {
                  triggerToast('❌ Clave incorrecta. Solo el dueño puede activar este modo.');
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Clave Secreta de Dueño (Usa: JONYRD2026)
                </label>
                <input
                  type="password"
                  required
                  value={ownerPinInput}
                  onChange={(e) => setOwnerPinInput(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-[#161033] border border-sky-400/40 text-sm text-white focus:border-sky-300 outline-none text-center font-mono tracking-widest"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-extrabold text-sm text-slate-950 bg-gradient-to-r from-sky-400 to-emerald-400 hover:from-sky-300 hover:to-emerald-300 shadow-[0_0_24px_rgba(56,189,248,0.5)] cursor-pointer"
              >
                Activar Mi Cuenta Gratis Ilimitada
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 7: TERMS OF SERVICE & PRIVACY POLICY
      ===================================================================== */}
      {termsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0e0924] border border-purple-500/50 p-6 sm:p-8 shadow-[0_0_50px_rgba(168,85,247,0.45)] max-h-[88vh] overflow-y-auto">
            <button
              onClick={() => setTermsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-white flex items-center gap-2 mb-4">
              <ShieldCheck className="w-6 h-6 text-fuchsia-400" />
              <span>Términos del Servicio y Privacidad — JONY CLIP RD</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                <strong className="text-white">1. Uso de la Plataforma:</strong> JONY CLIP RD ofrece
                herramientas de edición asistida por Inteligencia Artificial para recortar transmisiones y
                videos propios o autorizados en formato vertical 9:16. El usuario es responsable de contar
                con los derechos del contenido que procesa.
              </p>
              <p>
                <strong className="text-white">2. Prueba Gratuita y Planes de Pago:</strong> Cada usuario
                nuevo dispone de 10 cortes de prueba con marca de agua visible &quot;JONY CLIP RD&quot;. Al
                adquirir un paquete prepago o suscripción mensual (vía PayPal o transferencia bancaria a
                nombre de Jonatan Ramírez Felix), se desbloquean los minutos contratados y se elimina la
                marca de agua.
              </p>
              <p>
                <strong className="text-white">3. Privacidad de Archivos:</strong> Los videos subidos y
                enlaces analizados se procesan únicamente para generar tus clips y no se revenden ni
                comparten con terceros.
              </p>
              <p>
                <strong className="text-white">4. Contacto y Soporte:</strong> Para asistencia con pagos o
                soporte técnico puedes comunicarte vía WhatsApp al{' '}
                <span className="text-emerald-300 font-bold">+1 849-447-5348</span>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}