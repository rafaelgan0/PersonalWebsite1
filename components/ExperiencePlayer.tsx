'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';
import Image from 'next/image';
import { experiences, projects } from '@/lib/resume-data';
import { useBackgroundPalette } from '@/lib/background-palette-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faForwardStep, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

/* ═══════════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════════ */
const HIGHLIGHT_HOLD = 5000;
const ANIM = 0.9;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const IMG = '/images/CognizantTrizettoQNXTCover.png';

/* ═══════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════ */
interface Track {
  image: string;
  title: string;
  subtitle: string;
  period: string;
  highlights: string[];
  technologies: string[];
  kind: 'experience' | 'project';
  palette?: string[];
}

/* ═══════════════════════════════════════════════════
   Build tracks
   ═══════════════════════════════════════════════════ */
function buildTracks(): Track[] {
  const exp: Track[] = experiences.map((e) => ({
    image: IMG,
    title: e.role,
    subtitle: e.company,
    period: e.period,
    highlights: e.highlights,
    technologies: e.technologies,
    kind: 'experience',
    palette: e.palette,
  }));
  const proj: Track[] = projects.map((p) => ({
    image: IMG,
    title: p.title,
    subtitle: p.description,
    period: '',
    highlights: p.highlights,
    technologies: p.technologies,
    kind: 'project',
    palette: p.palette,
  }));
  return [...exp, ...proj];
}

/* ═══════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════ */
function renderHighlight(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-semibold text-white">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function fmt(s: number): string {
  const clamped = Math.max(0, Math.round(s));
  return `${Math.floor(clamped / 60)}:${String(clamped % 60).padStart(2, '0')}`;
}

/* ═══════════════════════════════════════════════════
   useDominantColor
   ═══════════════════════════════════════════════════ */
function useDominantColor(src: string) {
  const [color, setColor] = useState({ r: 140, g: 70, b: 40 });
  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      canvas.width = 64;
      canvas.height = 64;
      ctx.drawImage(img, 0, 0, 64, 64);
      try {
        const data = ctx.getImageData(0, 0, 64, 64).data;
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 16) {
          const pr = data[i], pg = data[i + 1], pb = data[i + 2];
          const lum = (pr + pg + pb) / 3;
          if (lum > 30 && lum < 230) { r += pr; g += pg; b += pb; count++; }
        }
        if (count > 0) setColor({ r: Math.round(r / count), g: Math.round(g / count), b: Math.round(b / count) });
      } catch { /* tainted */ }
    };
    img.src = src;
  }, [src]);
  return color;
}

/* ═══════════════════════════════════════════════════
   ExperiencePlayer
   ═══════════════════════════════════════════════════ */
export default function ExperiencePlayer({ isVisible }: { isVisible: boolean }) {
  const tracks = useMemo(buildTracks, []);
  const { setPalette, resetPalette } = useBackgroundPalette();

  const [trackIdx, setTrackIdx] = useState(0);
  const [highlightIdx, setHighlightIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lyricsScrollY, setLyricsScrollY] = useState(0);
  const [containerH, setContainerH] = useState(380);

  const track = tracks[trackIdx];
  const totalHL = track.highlights.length;
  const { r, g, b } = useDominantColor(track.image);

  /* ── Refs: separate for mobile and desktop lyrics ── */
  const mobileLyricsRef = useRef<HTMLDivElement>(null);
  const desktopLyricsRef = useRef<HTMLDivElement>(null);
  const mobileHLRefs = useRef<(HTMLDivElement | null)[]>([]);
  const desktopHLRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const animCtrl = useRef<ReturnType<typeof animate>>();
  const desktopTimeRef = useRef<HTMLSpanElement>(null);
  const mobileTimeRef = useRef<HTMLSpanElement>(null);

  const scrubberProgress = useMotionValue(0);
  const scrubberWidth = useTransform(scrubberProgress, (v: number) => `${Math.min(v, 1) * 100}%`);

  /* ── Push palette to AnimatedBackground when track or visibility changes ── */
  useEffect(() => {
    if (isVisible && track.palette && track.palette.length > 0) {
      setPalette(track.palette);
    } else if (!isVisible) {
      resetPalette();
    }
  }, [isVisible, trackIdx, track.palette, setPalette, resetPalette]);

  /** Determine which lyrics container is active (visible) */
  const getActiveLyrics = useCallback(() => {
    const desktop = desktopLyricsRef.current;
    const mobile = mobileLyricsRef.current;
    if (desktop && desktop.clientHeight > 0) {
      return { container: desktop, refs: desktopHLRefs.current };
    }
    if (mobile && mobile.clientHeight > 0) {
      return { container: mobile, refs: mobileHLRefs.current };
    }
    return null;
  }, []);

  useEffect(() => { if (isVisible) setIsPlaying(true); }, [isVisible]);

  /* ── Measure active lyrics container ── */
  useEffect(() => {
    const measure = () => {
      const active = getActiveLyrics();
      if (active) setContainerH(active.container.clientHeight);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [getActiveLyrics]);

  /* ── Scroll lyrics to center current highlight ── */
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const active = getActiveLyrics();
      if (!active) return;
      const el = active.refs[highlightIdx];
      if (!el) return;
      const cH = active.container.clientHeight;
      setLyricsScrollY(-(el.offsetTop - cH / 2 + el.clientHeight / 2));
    });
    return () => cancelAnimationFrame(id);
  }, [highlightIdx, trackIdx, getActiveLyrics]);

  /* ── Auto-advance highlights ── */
  useEffect(() => {
    if (!isPlaying || !isVisible) return;
    const currentVal = scrubberProgress.get();
    const startOfHL = highlightIdx / totalHL;
    const endOfHL = (highlightIdx + 1) / totalHL;
    const span = 1 / totalHL;
    const fraction = Math.max(0, Math.min(1, (currentVal - startOfHL) / span));
    const remainingMs = HIGHLIGHT_HOLD * (1 - fraction);

    animCtrl.current?.stop();
    animCtrl.current = animate(scrubberProgress, endOfHL, { duration: remainingMs / 1000, ease: 'linear' });

    timerRef.current = setTimeout(() => {
      if (highlightIdx < totalHL - 1) { setHighlightIdx((h) => h + 1); }
      else if (trackIdx < tracks.length - 1) { setTrackIdx((t) => t + 1); setHighlightIdx(0); scrubberProgress.set(0); }
      else { setTrackIdx(0); setHighlightIdx(0); scrubberProgress.set(0); }
    }, remainingMs);

    return () => { animCtrl.current?.stop(); clearTimeout(timerRef.current); };
  }, [highlightIdx, trackIdx, isPlaying, isVisible, totalHL, tracks.length, scrubberProgress]);

  /* ── Update time displays ── */
  useEffect(() => {
    const unsub = scrubberProgress.on('change', (v: number) => {
      const text = fmt(v * totalHL * (HIGHLIGHT_HOLD / 1000));
      if (desktopTimeRef.current) desktopTimeRef.current.textContent = text;
      if (mobileTimeRef.current) mobileTimeRef.current.textContent = text;
    });
    return unsub;
  }, [scrubberProgress, totalHL]);

  /* ── Navigation (loopable) ── */
  const goNext = useCallback(() => {
    setTrackIdx((t) => (t + 1) % tracks.length);
    setHighlightIdx(0); scrubberProgress.set(0); setIsPlaying(true);
  }, [tracks.length, scrubberProgress]);
  const goPrev = useCallback(() => {
    setTrackIdx((t) => (t - 1 + tracks.length) % tracks.length);
    setHighlightIdx(0); scrubberProgress.set(0); setIsPlaying(true);
  }, [tracks.length, scrubberProgress]);
  const togglePlay = useCallback(() => setIsPlaying((p) => !p), []);
  const jumpToHighlight = useCallback((idx: number) => {
    setHighlightIdx(idx); scrubberProgress.set(idx / totalHL); setIsPlaying(true);
  }, [totalHL, scrubberProgress]);

  /* ── Derived ── */
  const totalTimeStr = fmt(totalHL * (HIGHLIGHT_HOLD / 1000));
  const scrubberColor = 'rgba(255, 255, 255, 0.8)';

  /* ── Styles — desktop glass panel ── */
  const desktopGlassStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: 28,
    boxShadow: `
      0 0 0 0.5px rgba(255, 255, 255, 0.04),
      0 2px 8px rgba(0, 0, 0, 0.3),
      0 8px 32px rgba(0, 0, 0, 0.2),
      inset 0 0.5px 0 rgba(255, 255, 255, 0.06)
    `,
  };

  const maskStyle: React.CSSProperties = {
    maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
  };

  /* ── Shared lyrics renderer ── */
  const renderLyrics = (
    refs: React.MutableRefObject<(HTMLDivElement | null)[]>,
    textClass: string
  ) => (
    <motion.div
      key={trackIdx}
      className="space-y-4 md:space-y-6"
      style={{ paddingTop: containerH / 2 - 16, paddingBottom: containerH / 2 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: lyricsScrollY }}
      transition={{ opacity: { duration: 0.6, ease: EASE }, y: { duration: ANIM, ease: EASE } }}
    >
      {track.highlights.map((highlight, i) => {
        const isCurrent = i === highlightIdx;
        return (
          <motion.div
            key={`${trackIdx}-${i}`}
            ref={(el) => { refs.current[i] = el; }}
            className="cursor-pointer select-none"
            onClick={() => jumpToHighlight(i)}
            animate={{
              opacity: isCurrent ? 1 : 0.2,
              scale: isCurrent ? 1 : 0.97,
              filter: isCurrent ? 'blur(0px)' : 'blur(0.5px)',
            }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className={`${textClass} leading-relaxed transition-colors duration-700 ${isCurrent ? 'text-white font-medium' : 'text-white/50'}`}>
              {renderHighlight(highlight)}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );

  /* ═══════════════════════════════════════════════════
     Render
     ═══════════════════════════════════════════════════ */
  return (
    <motion.div
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative"
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
    >
      {/* Background glow */}
      <div className="absolute -inset-24 pointer-events-none transition-all duration-[1500ms]" />

      <div className="relative">
        {/* Section title */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-10"
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={isVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 20, filter: 'blur(6px)' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          Explore My Work
        </motion.h2>

        {/* ══════════════════════════════════════════════
            MOBILE LAYOUT — Apple Music lyrics view
            ══════════════════════════════════════════════ */}
        <div className="md:hidden flex flex-col" style={{ height: 'calc(100vh - 180px)' }}>
          {/* ── Top: album art + track info ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={trackIdx}
              className="flex-shrink-0 flex items-center gap-3.5 px-1"
              initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden relative flex-shrink-0"
                style={{ boxShadow: `0 6px 20px rgba(${r},${g},${b},0.3)` }}
              >
                <Image src={track.image} alt={track.title} fill className="object-cover" sizes="64px" priority />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-semibold text-white truncate leading-tight">{track.title}</h3>
                {track.period && (
                  <span className="text-xs text-white/35 leading-tight">{track.period}</span>
                )}
                <p className="text-xs text-white/30 truncate leading-tight mt-0.5">{track.subtitle}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Middle: lyrics (fills remaining space) ── */}
          <div
            ref={mobileLyricsRef}
            className="flex-1 overflow-hidden relative mt-4 min-h-0"
            style={maskStyle}
          >
            {renderLyrics(mobileHLRefs, 'text-[15px] sm:text-base')}
          </div>

          {/* ── Bottom: scrubber + controls ── */}
          <div className="flex-shrink-0 pt-3 pb-1 px-1">
            {/* Scrubber */}
            <div>
              <div className="relative h-[3px] bg-white/[0.08] rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ width: scrubberWidth, background: scrubberColor }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span ref={mobileTimeRef} className="text-[10px] text-white/20 tabular-nums font-mono">0:00</span>
                <span className="text-[10px] text-white/20 tabular-nums font-mono">{totalTimeStr}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-8 mt-1">
              <button
                onClick={goPrev}
                className="text-white hover:text-white/70 transition-colors"
                aria-label="Previous"
              >
                <FontAwesomeIcon icon={faBackwardStep} className="text-2xl" />
              </button>
              <button
                onClick={togglePlay}
                className="text-white hover:text-white/70 transition-colors active:scale-95"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="text-xl" />
              </button>
              <button
                onClick={goNext}
                className="text-white hover:text-white/70 transition-colors"
                aria-label="Next"
              >
                <FontAwesomeIcon icon={faForwardStep} className="text-2xl" />
              </button>
            </div>

            <p className="text-center text-[10px] text-white/[0.15] mt-1 tabular-nums">
              {trackIdx + 1} of {tracks.length}
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            DESKTOP LAYOUT — Side-by-side player
            ══════════════════════════════════════════════ */}
        <div className="hidden md:flex relative md:flex-row md:gap-12 lg:gap-16 md:p-8 lg:p-10">
          {/* Desktop glass backdrop */}
          <div
            className="absolute inset-0 pointer-events-none -z-[1]"
            style={desktopGlassStyle}
          />

          {/* ── Left column: album art + info + scrubber + controls ── */}
          <div className="flex-shrink-0 w-72 lg:w-80 xl:w-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={trackIdx}
                className="relative aspect-square rounded-2xl overflow-hidden"
                style={{ boxShadow: `0 24px 50px -12px rgba(${r},${g},${b},0.35)` }}
                initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
                transition={{ duration: ANIM, ease: EASE }}
              >
                <Image src={track.image} alt={track.title} fill className="object-cover" sizes="(min-width:1280px) 384px, (min-width:1024px) 320px, 288px" priority />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={trackIdx}
                className="mt-5"
                initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
              >
                <div className="flex items-baseline gap-2 flex-wrap">
                  <h3 className="text-lg lg:text-xl font-bold text-white leading-tight">{track.title}</h3>
                  {track.period && <span className="text-sm lg:text-base text-white/35 whitespace-nowrap">{track.period}</span>}
                </div>
                <p className="text-sm lg:text-base text-white/35 mt-1.5 line-clamp-2">{track.subtitle}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6">
              <div className="relative h-[3px] bg-white/[0.08] rounded-full overflow-hidden">
                <motion.div className="absolute inset-y-0 left-0 rounded-full" style={{ width: scrubberWidth, background: scrubberColor }} />
              </div>
              <div className="flex justify-between mt-1.5">
                <span ref={desktopTimeRef} className="text-[11px] text-white/20 tabular-nums font-mono">0:00</span>
                <span className="text-[11px] text-white/20 tabular-nums font-mono">{totalTimeStr}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-7 mt-1">
              <button onClick={goPrev} className="text-white hover:text-white/70 transition-colors" aria-label="Previous">
                <FontAwesomeIcon icon={faBackwardStep} className="text-lg" />
              </button>
              <button onClick={togglePlay} className="text-white hover:text-white/70 transition-colors active:scale-95" aria-label={isPlaying ? 'Pause' : 'Play'}>
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="text-lg" />
              </button>
              <button onClick={goNext} className="text-white hover:text-white/70 transition-colors" aria-label="Next">
                <FontAwesomeIcon icon={faForwardStep} className="text-lg" />
              </button>
            </div>

            <p className="text-center text-[11px] text-white/15 mt-2 tabular-nums">{trackIdx + 1} of {tracks.length}</p>
          </div>

          {/* ── Right column: lyrics ── */}
          <div
            ref={desktopLyricsRef}
            className="flex-1 overflow-hidden relative h-[440px] lg:h-[500px]"
            style={maskStyle}
          >
            {renderLyrics(desktopHLRefs, 'text-lg lg:text-xl xl:text-2xl')}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
