'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  personalInfo,
  experiences,
  projects,
  education,
  awards,
  skills,
} from '@/lib/resume-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faGraduationCap,
  faTrophy,
  faCode,
  faCompactDisc,
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

/* ── Animation presets ── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const tagItem = {
  hidden: { opacity: 0, scale: 0.85, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.4, ease: EASE },
  },
};

/* ── Stats data ── */
const totalHighlights = experiences.reduce(
  (sum, e) => sum + e.highlights.length,
  0
);

const stats = [
  {
    value: `${new Date().getFullYear() - 2023}+`,
    label: 'Years',
    sublabel: 'Experience',
  },
  {
    value: `${totalHighlights}+`,
    label: 'Features',
    sublabel: 'Shipped',
  },
  {
    value: `${projects.length + experiences.length}`,
    label: 'Projects &',
    sublabel: 'Roles',
  },
  {
    value: education[1]?.honors?.[0] ?? 'Honors',
    label: 'Graduated',
    sublabel: education[1]?.institution?.split(' ').slice(-1)[0] ?? '',
  },
];

/* ── Glass card style ── */
const glassCard: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  borderRadius: 20,
  boxShadow: `
    0 0 0 0.5px rgba(255, 255, 255, 0.03),
    0 2px 8px rgba(0, 0, 0, 0.25),
    0 8px 32px rgba(0, 0, 0, 0.15),
    inset 0 0.5px 0 rgba(255, 255, 255, 0.05)
  `,
};

/* ── Skill category colors ── */
const categoryColors: Record<string, string> = {
  'Front End': 'rgba(59, 130, 246, 0.15)',
  Platform: 'rgba(168, 85, 247, 0.15)',
  'Tools/Testing': 'rgba(34, 197, 94, 0.15)',
  Accessibility: 'rgba(251, 191, 36, 0.15)',
};
const categoryBorders: Record<string, string> = {
  'Front End': 'rgba(59, 130, 246, 0.25)',
  Platform: 'rgba(168, 85, 247, 0.25)',
  'Tools/Testing': 'rgba(34, 197, 94, 0.25)',
  Accessibility: 'rgba(251, 191, 36, 0.25)',
};

/* ═══════════════════════════════════════════════════
   AboutSection — scrollable artist profile
   ═══════════════════════════════════════════════════ */
export default function AboutSection({ isVisible }: { isVisible: boolean }) {
  const anim = isVisible ? 'show' : 'hidden';

  return (
    <div className="pb-24">
      {/* ══════════════════════════════════════
          Hero — Artist Profile Header
          ══════════════════════════════════════ */}
      <section className="pt-28 sm:pt-32 pb-8 flex flex-col items-center text-center px-4">
        {/* Avatar with glow */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          animate={
            isVisible
              ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
              : { opacity: 0, scale: 0.8, filter: 'blur(10px)' }
          }
          transition={{ duration: 0.8, ease: EASE }}
        >
          {/* Glow ring */}
          <div
            className="absolute -inset-3 rounded-full opacity-40 blur-xl"
            style={{
              background:
                'radial-gradient(circle, rgba(196,12,12,0.4), rgba(255,101,0,0.3), transparent 70%)',
            }}
          />
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full overflow-hidden ring-2 ring-white/10">
            <Image
              src="/images/ArtistImage.png"
              alt={personalInfo.name}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 208px, (min-width: 640px) 176px, 144px"
              priority
            />
          </div>
        </motion.div>

        {/* Name + Role */}
        <motion.h1
          className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
          custom={0.15}
          variants={fadeUp}
          initial="hidden"
          animate={anim}
        >
          {personalInfo.name}
        </motion.h1>

        <motion.p
          className="mt-2 text-base sm:text-lg text-white/40 font-medium"
          custom={0.25}
          variants={fadeUp}
          initial="hidden"
          animate={anim}
        >
          {personalInfo.role}
        </motion.p>

        <motion.div
          className="mt-3 flex items-center gap-2 text-white/25 text-sm"
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate={anim}
        >
          <FontAwesomeIcon icon={faLocationDot} className="text-xs" />
          <span>{personalInfo.location}</span>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="mt-5 flex items-center gap-3"
          custom={0.35}
          variants={fadeUp}
          initial="hidden"
          animate={anim}
        >
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-island w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} className="text-base" />
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-island w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} className="text-base" />
          </a>
        </motion.div>

        {/* Download Album (Resume) */}
        <motion.div
          className="mt-6"
          custom={0.42}
          variants={fadeUp}
          initial="hidden"
          animate={anim}
        >
          <a
            href="/Resume.pdf"
            download
            className="glass-island inline-flex items-center gap-2.5 px-6 py-2.5 text-sm font-medium text-white/80 hover:text-white transition-colors group"
          >
            <FontAwesomeIcon
              icon={faCompactDisc}
              className="text-sm text-white/50 group-hover:text-white/80 transition-colors animate-[spin_4s_linear_infinite]"
            />
            Download Album
          </a>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          Stats Row — "Streaming Numbers"
          ══════════════════════════════════════ */}
      <motion.section
        className="max-w-2xl mx-auto px-4 mt-4"
        custom={0.4}
        variants={fadeUp}
        initial="hidden"
        animate={anim}
      >
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-5 sm:p-6"
          style={glassCard}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={
                isVisible
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 12 }
              }
              transition={{ duration: 0.5, ease: EASE, delay: 0.5 + i * 0.08 }}
            >
              <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {stat.value}
              </p>
              <p className="text-[11px] sm:text-xs text-white/30 mt-0.5 leading-tight">
                {stat.label}
              </p>
              <p className="text-[11px] sm:text-xs text-white/30 leading-tight">
                {stat.sublabel}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ══════════════════════════════════════
          Skills — Genre Tags
          ══════════════════════════════════════ */}
      <motion.section
        className="max-w-2xl mx-auto px-4 mt-8"
        custom={0.55}
        variants={fadeUp}
        initial="hidden"
        animate={anim}
      >
        <div className="p-6 sm:p-8" style={glassCard}>
          <h2 className="text-lg font-semibold text-white/80 mb-5 flex items-center gap-2">
            <FontAwesomeIcon
              icon={faCode}
              className="text-sm text-white/30"
            />
            Skills
          </h2>

          <div className="space-y-5">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <p className="text-xs font-medium text-white/25 uppercase tracking-wider mb-2.5">
                  {category}
                </p>
                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-40px' }}
                >
                  {items.map((skill) => (
                    <motion.span
                      key={skill}
                      variants={tagItem}
                      className="px-3 py-1.5 rounded-full text-xs sm:text-[13px] font-medium text-white/70 cursor-default"
                      style={{
                        background:
                          categoryColors[category] ??
                          'rgba(255,255,255,0.06)',
                        border: `1px solid ${categoryBorders[category] ?? 'rgba(255,255,255,0.08)'}`,
                      }}
                      whileHover={{
                        scale: 1.06,
                        transition: {
                          type: 'spring',
                          stiffness: 400,
                          damping: 20,
                        },
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════
          Education
          ══════════════════════════════════════ */}
      <motion.section
        className="max-w-2xl mx-auto px-4 mt-8"
        custom={0.75}
        variants={fadeUp}
        initial="hidden"
        animate={anim}
      >
        <div className="p-6 sm:p-8" style={glassCard}>
          <h2 className="text-lg font-semibold text-white/80 mb-5 flex items-center gap-2">
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="text-sm text-white/30"
            />
            Education
          </h2>

          <div className="space-y-5">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                className="relative pl-5 border-l border-white/[0.06]"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  ease: EASE,
                  delay: i * 0.1,
                }}
                viewport={{ once: true, margin: '-40px' }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-white/20 -translate-x-[4.5px]" />

                <h3 className="text-sm sm:text-base font-semibold text-white/80">
                  {edu.institution}
                </h3>
                <p className="text-xs sm:text-sm text-white/40 mt-0.5">
                  {edu.degree}
                </p>
                <p className="text-xs text-white/20 mt-0.5">{edu.period}</p>
                {edu.honors && edu.honors.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {edu.honors.map((honor) => (
                      <span
                        key={honor}
                        className="px-2 py-0.5 rounded-full text-[11px] font-medium text-amber-300/70 bg-amber-500/10 border border-amber-500/15"
                      >
                        {honor}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════
          Awards
          ══════════════════════════════════════ */}
      {awards.length > 0 && (
        <motion.section
          className="max-w-2xl mx-auto px-4 mt-8"
          custom={0.85}
          variants={fadeUp}
          initial="hidden"
          animate={anim}
        >
          <div className="p-6 sm:p-8" style={glassCard}>
            <h2 className="text-lg font-semibold text-white/80 mb-5 flex items-center gap-2">
              <FontAwesomeIcon
                icon={faTrophy}
                className="text-sm text-white/30"
              />
              Awards
            </h2>

            <div className="space-y-4">
              {awards.map((award, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: EASE,
                    delay: i * 0.1,
                  }}
                  viewport={{ once: true, margin: '-40px' }}
                >
                  {/* Award icon */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faTrophy}
                      className="text-sm text-amber-400/60"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-white/80">
                      {award.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/35 mt-0.5">
                      {award.organization} &middot; {award.year}
                    </p>
                    {award.description && (
                      <p className="text-xs text-white/25 mt-1.5 leading-relaxed">
                        {award.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}
