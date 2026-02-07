'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSectionNav } from '@/lib/section-context';

const SPLASH_DURATION = 2.4;

const navSections = [
  { label: 'Home', section: 0 },
  { label: 'About', section: 1 },
  { label: 'Work', section: 2 },
  { label: 'Bio', section: 3 },
];

const islandEntry = {
  hidden: { opacity: 0, y: -20, scale: 0.92, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: SPLASH_DURATION,
    },
  },
};

// Hamburger line variants for morphing into X
const topLine = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 6 },
};
const midLine = {
  closed: { opacity: 1 },
  open: { opacity: 0 },
};
const botLine = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -6 },
};

// Mobile menu animation
const menuOverlay = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    filter: 'blur(8px)',
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
  },
};

const menuItem = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  }),
  exit: { opacity: 0, x: -8, transition: { duration: 0.15 } },
};

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentSection, setCurrentSection } = useSectionNav();
  const [menuOpen, setMenuOpen] = useState(false);

  /** Navigate to a section — if not on `/`, push home first. */
  const handleNavClick = useCallback(
    (section: number) => {
      setMenuOpen(false);
      setCurrentSection(section);
      if (pathname !== '/') {
        router.push('/');
      }
    },
    [pathname, router, setCurrentSection]
  );

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 sm:px-8 py-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* ── Name Island ── */}
        <motion.div variants={islandEntry}>
          <button onClick={() => handleNavClick(0)} className="group">
            <div className="glass-island px-4 py-2.5 flex items-center">
              <span className="text-[15px] font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
                RG
              </span>
            </div>
          </button>
        </motion.div>

        {/* ── Desktop Nav Island ── */}
        <motion.div variants={islandEntry} className="hidden sm:block">
          <div className="glass-island px-2 py-1.5 flex items-center gap-0.5">
            {navSections.map((link) => {
              const isActive =
                pathname === '/' && currentSection === link.section;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.section)}
                >
                  <motion.div
                    className="relative px-4 py-1.5 rounded-full"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 25,
                    }}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.06]"
                        layoutId="activeNavPill"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span
                      className={`relative z-10 text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                        isActive
                          ? 'text-white'
                          : 'text-white/50 hover:text-white/80'
                      }`}
                    >
                      {link.label}
                    </span>
                  </motion.div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Mobile Hamburger Island ── */}
        <motion.div variants={islandEntry} className="sm:hidden">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="glass-island w-11 h-11 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <svg
              width="18"
              height="14"
              viewBox="0 0 18 14"
              className="overflow-visible"
            >
              <motion.line
                x1="0"
                y1="1"
                x2="18"
                y2="1"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                variants={topLine}
                animate={menuOpen ? 'open' : 'closed'}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                style={{ originX: '50%', originY: '50%' }}
              />
              <motion.line
                x1="0"
                y1="7"
                x2="18"
                y2="7"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                variants={midLine}
                animate={menuOpen ? 'open' : 'closed'}
                transition={{ duration: 0.15 }}
              />
              <motion.line
                x1="0"
                y1="13"
                x2="18"
                y2="13"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                variants={botLine}
                animate={menuOpen ? 'open' : 'closed'}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                style={{ originX: '50%', originY: '50%' }}
              />
            </svg>
          </button>
        </motion.div>
      </motion.nav>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex items-center justify-center sm:hidden"
            variants={menuOverlay}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-2xl"
              onClick={() => setMenuOpen(false)}
            />
            {/* Menu content */}
            <div
              className="relative z-10 glass-island px-8 py-6 flex flex-col items-center gap-1 min-w-[200px]"
              style={{ borderRadius: '28px' }}
            >
              {navSections.map((link, i) => {
                const isActive =
                  pathname === '/' && currentSection === link.section;
                return (
                  <motion.div
                    key={link.label}
                    custom={i}
                    variants={menuItem}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <button onClick={() => handleNavClick(link.section)}>
                      <motion.div
                        className="relative px-6 py-3 rounded-full"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.06]"
                            layoutId="activeNavPillMobile"
                          />
                        )}
                        <span
                          className={`relative z-10 text-base font-medium tracking-wide transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-white/50'
                          }`}
                        >
                          {link.label}
                        </span>
                      </motion.div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
