'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExperiencePlayer from '@/components/ExperiencePlayer';
import AboutSection from '@/components/AboutSection';
import { useSectionNav } from '@/lib/section-context';
import { personalInfo } from '@/lib/resume-data';

const SPLASH_DURATION = 2.4; // seconds – matches SplashScreen timing
const FIRST_HOLD = 8000; // ms – extra hold on first appearance so user can read
const HOLD_TIME = 4500; // ms – pause between each cycling transition
const DOTS_HOLD = 8000; // ms – last dot fills at 12s, then 0s pause before cycling
const ANIM = 0.9; // seconds – transition animation duration
const VISUAL_PAD = 50; // px – default visible space between lines
const WEBSITES_PAD = 50; // px – gap for "Hi, I'm Rafael" ↔ "I build beautiful websites"
const DOTS_PAD = 15; // px – gap for "I build beautiful websites" ↔ "..."

const DOTS = '...';
const PHRASES = ["Hi, I'm Rafael", 'I build beautiful websites', DOTS];

/* ── Scroll-snap constants ── */
const TOTAL_SECTIONS = 4;
const SCROLL_TRANSITION_MS = 800; // CSS transition duration
const SCROLL_COOLDOWN_MS = 900; // lock-out after a section change
const TOUCH_THRESHOLD = 50; // px – minimum swipe distance to trigger

/* ── Sequentially-lit dots ──
   Each dot starts dim then lights up to full white one after another. */
function AnimatedDots() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={{ color: 'white' }}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 4,
            delay: i * 2,
            ease: 'linear',
          }}
        >
          .
        </motion.span>
      ))}
    </>
  );
}

export default function Home() {
  const [step, setStep] = useState(0);
  const mounted = useRef(false);
  const timerRef = useRef<NodeJS.Timeout>();

  /* ── Section navigation (shared via context so Navigation can read it) ── */
  const { currentSection, setCurrentSection } = useSectionNav();
  const isAnimating = useRef(false);
  const touchStartY = useRef(0);

  /* ── Ref for the About section scroll container ── */
  const aboutScrollRef = useRef<HTMLDivElement>(null);

  /* ── Measure actual rendered phrase heights ──
     Hidden duplicates of every phrase sit in the DOM so we always know
     the real pixel height (accounts for wrapping, font-size, etc.) */
  const measureRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const [heights, setHeights] = useState<number[]>(PHRASES.map(() => 80));

  useEffect(() => {
    function measure() {
      const h = measureRefs.current.map((el) => el?.offsetHeight ?? 80);
      setHeights((prev) =>
        h.every((v, i) => v === prev[i]) ? prev : h
      );
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  /* ── Phrase-cycling timing ── */
  useEffect(() => {
    if (step === 0 && !mounted.current) {
      mounted.current = true;
      const delay = SPLASH_DURATION * 1000 + FIRST_HOLD;
      timerRef.current = setTimeout(() => setStep(1), delay);
    } else if (step > 0) {
      const isDots = PHRASES[step % PHRASES.length] === DOTS;
      const hold = isDots ? DOTS_HOLD : HOLD_TIME;
      timerRef.current = setTimeout(() => setStep((s) => s + 1), hold);
    }
    return () => clearTimeout(timerRef.current);
  }, [step]);

  /* ═══════════════════════════════════════════════
     SCROLL-SNAP: section navigation
     ═══════════════════════════════════════════════ */

  const scrollToSection = useCallback(
    (index: number) => {
      if (index < 0 || index >= TOTAL_SECTIONS || isAnimating.current) return;
      isAnimating.current = true;
      setCurrentSection(index);
      setTimeout(() => {
        isAnimating.current = false;
      }, SCROLL_COOLDOWN_MS);
    },
    [setCurrentSection]
  );

  /* Reset About section scroll when navigating away (after transition finishes) */
  useEffect(() => {
    if (currentSection !== 1) {
      const timer = setTimeout(() => {
        if (aboutScrollRef.current) {
          aboutScrollRef.current.scrollTop = 0;
        }
      }, SCROLL_TRANSITION_MS);
      return () => clearTimeout(timer);
    }
  }, [currentSection]);

  /* ── Helper: check if About scroll container is at bounds ── */
  const aboutAtBounds = useCallback(
    (direction: 'up' | 'down') => {
      const el = aboutScrollRef.current;
      if (!el) return true; // no container → treat as at-bounds
      if (direction === 'up') return el.scrollTop <= 1;
      return el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
    },
    []
  );

  /* Lock body scroll while on homepage */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  /* Wheel → section change (respects About internal scroll) */
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }

      // About section: let internal scroll happen until at bounds
      if (currentSection === 1) {
        const goingDown = e.deltaY > 0;
        if (goingDown && !aboutAtBounds('down')) return;
        if (!goingDown && !aboutAtBounds('up')) return;
      }

      e.preventDefault();
      if (e.deltaY > 0) scrollToSection(currentSection + 1);
      else if (e.deltaY < 0) scrollToSection(currentSection - 1);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSection, scrollToSection, aboutAtBounds]);

  /* Touch → section change (respects About internal scroll) */
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // About section: allow internal scroll until at boundary
      if (currentSection === 1 && aboutScrollRef.current) {
        const currentY = e.touches[0].clientY;
        const goingDown = touchStartY.current - currentY > 0;
        const goingUp = touchStartY.current - currentY < 0;
        if (goingDown && !aboutAtBounds('down')) return;
        if (goingUp && !aboutAtBounds('up')) return;
      }
      // Prevent pull-to-refresh / rubber-band on iOS
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating.current) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;

      // About section: only change section when at scroll bounds
      if (currentSection === 1 && aboutScrollRef.current) {
        if (deltaY > TOUCH_THRESHOLD && aboutAtBounds('down')) {
          scrollToSection(currentSection + 1);
        } else if (deltaY < -TOUCH_THRESHOLD && aboutAtBounds('up')) {
          scrollToSection(currentSection - 1);
        }
        return;
      }

      if (Math.abs(deltaY) > TOUCH_THRESHOLD) {
        if (deltaY > 0) scrollToSection(currentSection + 1);
        else scrollToSection(currentSection - 1);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, scrollToSection, aboutAtBounds]);

  /* Keyboard → section change */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating.current) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        scrollToSection(currentSection + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToSection(currentSection - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, scrollToSection]);

  /* ── Derived layout values ── */
  const activeIdx = step % PHRASES.length;
  const nextIdx = (step + 1) % PHRASES.length;
  const activeH = heights[activeIdx];
  const nextH = heights[nextIdx];

  // Per-pair gap: websites↔dots is tighter, rafael↔websites uses its own, rest default
  function getPad(aIdx: number, nIdx: number) {
    // "I build beautiful websites" (1) ↔ "..." (2)
    if ((aIdx === 1 && nIdx === 2) || (aIdx === 2 && nIdx === 1)) return DOTS_PAD;
    // "Hi, I'm Rafael" (0) ↔ "I build beautiful websites" (1)
    if ((aIdx === 0 && nIdx === 1) || (aIdx === 1 && nIdx === 0)) return WEBSITES_PAD;
    return VISUAL_PAD;
  }

  const pad = getPad(activeIdx, nextIdx);
  const offset = activeH + pad; // active-top → next-top distance
  const pairH = activeH + pad + nextH;

  // Stable container: fits the tallest possible pair + headroom for enter/exit
  const maxPairH = Math.max(
    ...PHRASES.map((_, i) => {
      const nI = (i + 1) % PHRASES.length;
      return heights[i] + getPad(i, nI) + heights[nI];
    })
  );
  const containerH = maxPairH + 300;

  // Position from top:50% so the pair is vertically centred
  const activeY = -pairH / 2;
  const nextY = activeY + offset;

  const isFirst = step === 0;
  const activePhrase = PHRASES[activeIdx];
  const nextPhrase = PHRASES[nextIdx];

  return (
    <div className="h-screen overflow-hidden relative">
      {/* ── Sections wrapper — translates to show current section ── */}
      <div
        className="will-change-transform"
        style={{
          transform: `translateY(-${currentSection * 100}vh)`,
          transition: `transform ${SCROLL_TRANSITION_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        }}
      >
        {/* ══════════════════════════════════════════
            Section 1 — Hero
            ══════════════════════════════════════════ */}
        <section className="h-screen flex flex-col items-center justify-center relative">
          {/* ── Lyrics-style cycling text ── */}
          <div
            className="text-center relative w-full overflow-hidden"
            style={{ height: containerH }}
          >
            {/* Hidden measurement twins (invisible, same classes = same wrapping) */}
            <div
              className="absolute invisible pointer-events-none w-full left-0 top-0"
              aria-hidden="true"
            >
              {PHRASES.map((phrase, i) => (
                <h1
                  key={i}
                  ref={(el) => {
                    measureRefs.current[i] = el;
                  }}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
                >
                  {phrase}
                </h1>
              ))}
            </div>

            <AnimatePresence>
              {/* ── Active line — solid white ── */}
              <motion.h1
                key={step}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold absolute w-full left-0"
                style={{ top: '50%' }}
                initial={
                  isFirst
                    ? {
                        y: activeY + 30,
                        opacity: 0,
                        filter: 'blur(6px)',
                        color: 'rgba(255,255,255,0.2)',
                      }
                    : {
                        y: nextY,
                        color: 'rgba(255,255,255,0.2)',
                      }
                }
                animate={{
                  y: activeY,
                  opacity: 1,
                  filter: 'blur(0px)',
                  color: 'rgba(255,255,255,1)',
                  transition: {
                    duration: isFirst ? 0.8 : ANIM,
                    ease: [0.22, 1, 0.36, 1],
                    delay: isFirst ? SPLASH_DURATION : 0,
                  },
                }}
                exit={{
                  y: activeY - offset,
                  color: 'rgba(255,255,255,0.2)',
                  opacity: 0,
                  filter: 'blur(4px)',
                  transition: { duration: ANIM, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                {activePhrase === DOTS ? <AnimatedDots /> : activePhrase}
              </motion.h1>

              {/* ── Next line — dim white (low opacity) ── */}
              <motion.h1
                key={step + 1}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold absolute w-full left-0"
                style={{ top: '50%' }}
                initial={{
                  y: nextY + offset,
                  opacity: 0,
                  color: 'rgba(255,255,255,0.2)',
                }}
                animate={{
                  y: nextY,
                  opacity: 1,
                  color: 'rgba(255,255,255,0.2)',
                  transition: {
                    duration: isFirst ? 0.8 : ANIM,
                    ease: [0.22, 1, 0.36, 1],
                    delay: isFirst ? SPLASH_DURATION + 0.5 : 0.06,
                  },
                }}
              >
                {nextPhrase}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* ── Scroll chevron ── */}
          <motion.svg
            className="absolute bottom-10 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="20"
            viewBox="0 0 36 20"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 6, 0] }}
            transition={{
              opacity: { delay: SPLASH_DURATION + 0.8, duration: 0.7 },
              y: {
                delay: SPLASH_DURATION + 0.8,
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            onClick={() => scrollToSection(1)}
          >
            <path d="M2 2 L18 16 L34 2" />
          </motion.svg>
        </section>

        {/* ══════════════════════════════════════════
            Section 2 — About (scrollable)
            ══════════════════════════════════════════ */}
        <section className="h-screen relative">
          <div
            ref={aboutScrollRef}
            className="h-full overflow-y-auto scrollbar-hide"
          >
            <AboutSection isVisible={currentSection === 1} />
          </div>
        </section>

        {/* ══════════════════════════════════════════
            Section 3 — Explore My Work
            ══════════════════════════════════════════ */}
        <section className="h-screen flex flex-col items-center justify-center relative px-2 sm:px-6">
          <ExperiencePlayer isVisible={currentSection === 2} />
        </section>

        {/* ══════════════════════════════════════════
            Section 4 — Bio Footer (Spotify artist style)
            ══════════════════════════════════════════ */}
        <section className="h-screen flex items-center justify-center relative px-4 sm:px-6">
          <motion.div
            className="w-full max-w-3xl"
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={
              currentSection === 3
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 30, filter: 'blur(8px)' }
            }
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="p-8 sm:p-10 md:p-12 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: `
                  0 0 0 0.5px rgba(255, 255, 255, 0.03),
                  0 2px 8px rgba(0, 0, 0, 0.25),
                  0 8px 32px rgba(0, 0, 0, 0.15),
                  inset 0 0.5px 0 rgba(255, 255, 255, 0.05)
                `,
              }}
            >
              <div className="flex flex-col md:flex-row md:gap-12">
                {/* Left — Bio text */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                    About {personalInfo.name}
                  </h2>
                  <p className="text-sm sm:text-base text-white/50 leading-relaxed">
                    {personalInfo.bio}
                  </p>
                </div>

                {/* Right — Metadata */}
                <div className="flex-shrink-0 flex flex-row md:flex-col gap-8 md:gap-6 mt-8 md:mt-1 md:ml-4">
                  <div>
                    <p className="text-[11px] sm:text-xs font-medium text-white/30 uppercase tracking-wider">
                      Formed
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-white mt-0.5">
                      2002
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs font-medium text-white/30 uppercase tracking-wider">
                      Genre
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-white mt-0.5">
                      Geek
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* ── Section indicator dots ── */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
        {Array.from({ length: TOTAL_SECTIONS }).map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              currentSection === i
                ? 'bg-white scale-125'
                : 'bg-white/25 hover:bg-white/50'
            }`}
            onClick={() => scrollToSection(i)}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
