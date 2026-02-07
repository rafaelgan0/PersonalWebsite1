'use client';

import { useEffect, useRef } from 'react';
import { useBackgroundPalette } from '@/lib/background-palette-context';

// --- Types ---

interface RGB { r: number; g: number; b: number }

interface WaveLayer {
  amplitude: number;
  frequency: number;
  phase: number;
  speed: number;
}

interface Ribbon {
  // Spine goes from (x0,y0) to (x1,y1) — defines direction & tilt
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  // Stacked sine waves for complex undulation
  waves: WaveLayer[];
  // Width modulation
  baseWidth: number;
  widthWave: { amplitude: number; frequency: number; phase: number; speed: number };
  // Appearance
  color: string;
  currentRGB: RGB;
  targetRGB: RGB;
  opacity: number;
  // Noise seed for edge roughness
  noiseSeed: number;
  // Drift speed along perpendicular direction
  driftSpeed: number;
  driftPhase: number;
}

// --- Color helpers ---

function hexToRGB(hex: string): RGB {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function lerpRGB(a: RGB, b: RGB, t: number): RGB {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  };
}

/** Cap perceived luminance so colors never get bright enough to wash out white text. */
function clampLuminance(rgb: RGB, maxLuminance = 150): RGB {
  // Perceived luminance (Rec. 601)
  const lum = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
  if (lum <= maxLuminance) return rgb;
  const scale = maxLuminance / lum;
  return { r: rgb.r * scale, g: rgb.g * scale, b: rgb.b * scale };
}

// --- Noise helpers ---

function hash(x: number, y: number, seed: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed * 43.758) * 43758.5453;
  return n - Math.floor(n);
}

function smoothNoise(x: number, y: number, seed: number): number {
  const corners =
    (hash(x - 1, y - 1, seed) + hash(x + 1, y - 1, seed) +
     hash(x - 1, y + 1, seed) + hash(x + 1, y + 1, seed)) / 16;
  const sides =
    (hash(x - 1, y, seed) + hash(x + 1, y, seed) +
     hash(x, y - 1, seed) + hash(x, y + 1, seed)) / 8;
  return corners + sides + hash(x, y, seed) / 4;
}

function cosInterp(a: number, b: number, t: number): number {
  const f = (1 - Math.cos(t * Math.PI)) * 0.5;
  return a * (1 - f) + b * f;
}

function perlin(x: number, y: number, seed: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const v1 = smoothNoise(ix, iy, seed);
  const v2 = smoothNoise(ix + 1, iy, seed);
  const v3 = smoothNoise(ix, iy + 1, seed);
  const v4 = smoothNoise(ix + 1, iy + 1, seed);
  return cosInterp(cosInterp(v1, v2, fx), cosInterp(v3, v4, fx), fy);
}

function fbm(x: number, y: number, seed: number): number {
  let v = 0, a = 0.5, f = 1;
  for (let i = 0; i < 3; i++) {
    v += a * perlin(x * f, y * f, seed + i * 7.3);
    a *= 0.5;
    f *= 2;
  }
  return v;
}

import { PALETTE } from '@/lib/palette';

// --- Random helpers ---
function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createRibbon(W: number, H: number, index: number, total: number): Ribbon {
  // Each ribbon spans across the viewport from beyond one edge to beyond the opposite.
  // We vary the angle: some mostly horizontal, some diagonal, some steep.
  // The "spine" goes from a point off the left/top edge to a point off the right/bottom edge.

  const angleSpread = Math.PI * 0.55; // ribbons cover a range of angles
  const baseAngle = (index / total) * angleSpread + Math.PI * 0.12; // ~7° to ~38° from horizontal

  // Extend well beyond screen so ribbons fill corners
  const extend = Math.max(W, H) * 0.8;
  const cx = W / 2;
  const cy = H / 2;

  // Perpendicular offset so ribbons don't all pass through center
  const perpOffset = rand(-H * 0.6, H * 0.6);
  const perpAngle = baseAngle + Math.PI / 2;

  const startX = cx - Math.cos(baseAngle) * extend + Math.cos(perpAngle) * perpOffset;
  const startY = cy - Math.sin(baseAngle) * extend + Math.sin(perpAngle) * perpOffset;
  const endX = cx + Math.cos(baseAngle) * extend + Math.cos(perpAngle) * perpOffset;
  const endY = cy + Math.sin(baseAngle) * extend + Math.sin(perpAngle) * perpOffset;

  // 3-5 stacked sine waves per ribbon for complex undulation
  const waveCount = 3 + Math.floor(Math.random() * 3);
  const waves: WaveLayer[] = Array.from({ length: waveCount }, (_, j) => ({
    amplitude: rand(40, 200) / (1 + j * 0.5), // lower harmonics are bigger
    frequency: rand(0.5, 2.5) * (1 + j * 0.7), // higher harmonics are faster
    phase: rand(0, Math.PI * 2),
    speed: rand(0.15, 0.6) * (Math.random() > 0.5 ? 1 : -1), // some go opposite direction
  }));

  const hex = PALETTE[index % PALETTE.length];
  const rgb = hexToRGB(hex);
  return {
    x0: startX,
    y0: startY,
    x1: endX,
    y1: endY,
    waves,
    baseWidth: rand(250, 550),
    widthWave: {
      amplitude: rand(40, 120),
      frequency: rand(0.8, 2.5),
      phase: rand(0, Math.PI * 2),
      speed: rand(0.1, 0.4),
    },
    color: hex,
    currentRGB: { ...rgb },
    targetRGB: { ...rgb },
    opacity: rand(0.25, 0.48),
    noiseSeed: rand(0, 1000),
    driftSpeed: rand(0.08, 0.35),
    driftPhase: rand(0, Math.PI * 2),
  };
}

// --- Evaluate ribbon spine at parameter t (0..1) at time T ---
function ribbonSpine(
  ribbon: Ribbon,
  t: number,
  time: number
): { x: number; y: number; nx: number; ny: number } {
  // Linear spine
  const lx = ribbon.x0 + (ribbon.x1 - ribbon.x0) * t;
  const ly = ribbon.y0 + (ribbon.y1 - ribbon.y0) * t;

  // Direction vector & normal
  const dx = ribbon.x1 - ribbon.x0;
  const dy = ribbon.y1 - ribbon.y0;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = -dy / len; // perpendicular
  const ny = dx / len;

  // Sum of sine waves → displacement along normal
  let disp = 0;
  for (const w of ribbon.waves) {
    disp += w.amplitude * Math.sin(t * w.frequency * Math.PI * 2 + w.phase + time * w.speed);
  }

  // Slow global drift along normal
  disp += Math.sin(time * ribbon.driftSpeed + ribbon.driftPhase) * 60;

  // Small noise roughness
  const roughness = (fbm(t * 3, time * 0.3, ribbon.noiseSeed) - 0.5) * 50;
  disp += roughness;

  return {
    x: lx + nx * disp,
    y: ly + ny * disp,
    nx,
    ny,
  };
}

function ribbonWidth(ribbon: Ribbon, t: number, time: number): number {
  const ww = ribbon.widthWave;
  const mod = ww.amplitude * Math.sin(t * ww.frequency * Math.PI * 2 + ww.phase + time * ww.speed);
  return ribbon.baseWidth + mod;
}

// ========== Component ==========

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false, influence: 0 });
  const animationRef = useRef<number>(0);
  const ribbonsRef = useRef<Ribbon[]>([]);
  const targetPaletteRef = useRef<string[]>(PALETTE);

  // Subscribe to palette context — push new targets into ref for the draw loop
  const { palette } = useBackgroundPalette();

  useEffect(() => {
    targetPaletteRef.current = palette;
    // Update each ribbon's target color
    const ribbons = ribbonsRef.current;
    if (ribbons.length === 0) return;
    for (let i = 0; i < ribbons.length; i++) {
      const newHex = palette[i % palette.length];
      ribbons[i].targetRGB = hexToRGB(newHex);
    }
  }, [palette]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Generate ribbons ONCE for a large reference area so they cover any
    // viewport size. On resize we only update canvas dimensions — the
    // ribbons themselves never change.
    const RIBBON_COUNT = 11;
    const refW = Math.max(window.innerWidth, 2560);
    const refH = Math.max(window.innerHeight, 1440);
    ribbonsRef.current = Array.from({ length: RIBBON_COUNT }, (_, i) =>
      createRibbon(refW, refH, i, RIBBON_COUNT)
    );

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Mouse
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isActive = true;
    };
    const onMouseLeave = () => { mouseRef.current.isActive = false; };
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // --- Animation ---
    let time = 0;
    let frameCount = 0;
    const STEPS = 80; // high resolution for smooth curves

    const COLOR_LERP_SPEED = 0.015; // ~1-2 seconds for a full transition at 60fps

    const draw = () => {
      time += 0.006;
      frameCount++;

      // Fade the canvas in after the first couple of frames are painted
      // so the background is fully ready before it becomes visible
      if (frameCount === 3) {
        canvas.style.opacity = '1';
      }

      // Smoothly lerp ribbon colors toward their targets, clamping brightness
      for (const ribbon of ribbonsRef.current) {
        ribbon.currentRGB = lerpRGB(ribbon.currentRGB, ribbon.targetRGB, COLOR_LERP_SPEED);
        ribbon.color = rgbToHex(clampLuminance(ribbon.currentRGB));
      }

      const target = mouseRef.current.isActive ? 1 : 0;
      mouseRef.current.influence += (target - mouseRef.current.influence) * 0.04;

      const W = canvas.width;
      const H = canvas.height;
      const diag = Math.sqrt(W * W + H * H);

      // Translate so the ribbon-field centre always sits at the viewport
      // centre — resizing just reveals / hides edges.
      const offsetX = W / 2 - refW / 2;
      const offsetY = H / 2 - refH / 2;

      // --- Flat dark base ---
      ctx.fillStyle = '#070305';
      ctx.fillRect(0, 0, W, H);

      // --- Render ribbons (heavy blur, screen blend) ---
      ctx.save();
      ctx.translate(offsetX, offsetY);
      ctx.filter = 'blur(90px)';
      ctx.globalCompositeOperation = 'screen';

      for (const ribbon of ribbonsRef.current) {
        // Pre-compute spine points
        const spine: { x: number; y: number; nx: number; ny: number; w: number }[] = [];
        for (let i = 0; i <= STEPS; i++) {
          const t = i / STEPS;
          const pt = ribbonSpine(ribbon, t, time);
          const w = ribbonWidth(ribbon, t, time);
          spine.push({ ...pt, w });
        }

        // Mouse interaction: push the ribbon away from cursor
        // (map viewport mouse → ribbon-field coords)
        if (mouseRef.current.influence > 0.01) {
          const mx = mouseRef.current.x - offsetX;
          const my = mouseRef.current.y - offsetY;
          const inf = mouseRef.current.influence;
          for (const pt of spine) {
            const ddx = pt.x - mx;
            const ddy = pt.y - my;
            const dist = Math.sqrt(ddx * ddx + ddy * ddy);
            if (dist < 400) {
              const push = (1 - dist / 400) * 80 * inf;
              pt.x += (ddx / (dist + 1)) * push;
              pt.y += (ddy / (dist + 1)) * push;
            }
          }
        }

        // Draw filled ribbon shape
          ctx.beginPath();
          
        // Top edge (spine + half width along normal)
        for (let i = 0; i <= STEPS; i++) {
          const p = spine[i];
          const topEdgeNoise = (fbm(i * 0.08, time * 0.25, ribbon.noiseSeed) - 0.5) * 60;
          const fx = p.x + p.nx * (p.w * 0.5 + topEdgeNoise);
          const fy = p.y + p.ny * (p.w * 0.5 + topEdgeNoise);
          if (i === 0) ctx.moveTo(fx, fy);
          else ctx.lineTo(fx, fy);
        }

        // Bottom edge (spine - half width along normal), reversed
        for (let i = STEPS; i >= 0; i--) {
          const p = spine[i];
          const botEdgeNoise = (fbm(i * 0.08, time * 0.25, ribbon.noiseSeed + 99) - 0.5) * 60;
          const fx = p.x - p.nx * (p.w * 0.5 + botEdgeNoise);
          const fy = p.y - p.ny * (p.w * 0.5 + botEdgeNoise);
          ctx.lineTo(fx, fy);
          }
          
          ctx.closePath();
        ctx.globalAlpha = ribbon.opacity;
        ctx.fillStyle = ribbon.color;
          ctx.fill();
        }
        
        ctx.globalAlpha = 1;
      ctx.restore();

      // --- Second pass: lighter / overlay for tonal depth ---
      ctx.save();
      ctx.translate(offsetX, offsetY);
      ctx.filter = 'blur(130px)';
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = 0.05;

      for (const ribbon of ribbonsRef.current) {
        ctx.beginPath();
        for (let i = 0; i <= STEPS; i++) {
          const t = i / STEPS;
          const pt = ribbonSpine(ribbon, t, time);
          const w = ribbonWidth(ribbon, t, time) * 0.6;
          const fx = pt.x + pt.nx * w * 0.5;
          const fy = pt.y + pt.ny * w * 0.5;
          if (i === 0) ctx.moveTo(fx, fy);
          else ctx.lineTo(fx, fy);
        }
        for (let i = STEPS; i >= 0; i--) {
          const t = i / STEPS;
          const pt = ribbonSpine(ribbon, t, time);
          const w = ribbonWidth(ribbon, t, time) * 0.6;
          const fx = pt.x - pt.nx * w * 0.5;
          const fy = pt.y - pt.ny * w * 0.5;
          ctx.lineTo(fx, fy);
        }
        ctx.closePath();
        ctx.fillStyle = ribbon.color;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.restore();

      // --- Global brightness cap so no region gets too light ---
      ctx.save();
      ctx.globalCompositeOperation = 'multiply';
      ctx.fillStyle = 'rgb(190, 190, 190)';   // ~75% max brightness
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      // --- Subtle edge vignette (only darkens the outermost edges) ---
      ctx.save();
      ctx.globalCompositeOperation = 'multiply';
      const vig = ctx.createRadialGradient(
        W * 0.5, H * 0.5, diag * 0.35,
        W * 0.5, H * 0.5, diag * 0.72
      );
      vig.addColorStop(0, 'rgba(255,255,255,1)');   // fully transparent until far out
      vig.addColorStop(0.6, 'rgba(220,220,220,1)'); // very gentle dim
      vig.addColorStop(1, 'rgba(40,40,40,1)');       // darken only at edges
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full"
      style={{
        background: '#070305',
        opacity: 0,
        transition: 'opacity 0.7s ease-out',
      }}
    />
  );
}
