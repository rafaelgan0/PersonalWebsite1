'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { PALETTE } from '@/lib/palette';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070305]"
          initial={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: 'blur(10px)',
            transition: { duration: 1.0, ease: [0.4, 0, 0.15, 1] },
          }}
        >
          {/* Orbiting dots */}
          <motion.div
            className="relative w-16 h-16"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            exit={{
              scale: 0.6,
              opacity: 0,
              transition: { duration: 0.5, ease: 'easeIn' },
            }}
          >
            {PALETTE.map((color, i) => {
              // Pre-compute the starting position so dots don't jump from center
              const startAngle = (i / PALETTE.length) * Math.PI * 2;
              const startX = Math.cos(startAngle) * 24;
              const startY = Math.sin(startAngle) * 24;

              return (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: color,
                    top: '50%',
                    left: '50%',
                    marginTop: -6,
                    marginLeft: -6,
                    boxShadow: `0 0 14px ${color}90`,
                  }}
                  initial={{
                    x: startX,
                    y: startY,
                    scale: 1,
                    opacity: 0.7,
                  }}
                  animate={{
                    x: [
                      startX,
                      Math.cos(startAngle + Math.PI) * 24,
                      Math.cos(startAngle + Math.PI * 2) * 24,
                    ],
                    y: [
                      startY,
                      Math.sin(startAngle + Math.PI) * 24,
                      Math.sin(startAngle + Math.PI * 2) * 24,
                    ],
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              );
            })}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
