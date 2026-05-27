import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Concentric ring radii for the Arc Reactor background pattern
const REACTOR_RINGS = [18, 30, 42, 54];

// Outer reactor segments (dividing the circle into 10 parts)
const SEGMENTS = Array.from({ length: 10 }, (_, i) => {
  const angle = (i * 36 * Math.PI) / 180;
  return {
    x1: 50,
    y1: 50,
    x2: 50 + Math.cos(angle) * 44,
    y2: 50 + Math.sin(angle) * 44,
  };
});

function generateParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1.5,
    duration: Math.random() * 2.5 + 1.5,
    delay: Math.random() * 1.5,
    color: Math.random() > 0.5 ? '#00f0ff' : '#d4af37',
  }));
}

const particles = generateParticles(25);

export function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  const handleComplete = useCallback(() => {
    setTimeout(() => setShow(false), 400);
    setTimeout(onComplete, 1200);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          handleComplete();
          return 100;
        }
        return prev + 1;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [handleComplete]);

  // Rising mask calculation for the core reactor charging effect
  const fillY = 64 - (progress / 100) * 64;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, #3a080d 0%, #1c0205 40%, #0c0102 80%, #020000 100%)',
          }}
        >
          {/* ── Outer Tech Scanline ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            <div className="scan-line opacity-40" />
          </div>

          {/* ═══════ HOLOGRAPHIC TECH WEB BACKGROUND ═══════ */}
          <motion.svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full opacity-[0.06] z-0"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
          >
            {/* Concentric reactor tracks */}
            {REACTOR_RINGS.map((r, i) => (
              <motion.circle
                key={`ring-${i}`}
                cx="50"
                cy="50"
                r={r}
                fill="none"
                stroke="white"
                strokeWidth="0.15"
                strokeDasharray="3 3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 1.8,
                  delay: 0.2 + i * 0.2,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* Radial segments */}
            {SEGMENTS.map((seg, i) => (
              <motion.line
                key={`seg-${i}`}
                x1={seg.x1}
                y1={seg.y1}
                x2={seg.x2}
                y2={seg.y2}
                stroke="white"
                strokeWidth="0.12"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, delay: i * 0.08, ease: 'easeOut' }}
              />
            ))}
          </motion.svg>

          {/* ═══════ FLOATING NANOTECH GLOW PARTICLES ═══════ */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: `radial-gradient(circle, ${p.color} 0%, transparent 80%)`,
                boxShadow: `0 0 10px ${p.color}`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() > 0.5 ? 20 : -20, 0],
                opacity: [0, 0.7, 0],
                scale: [0, 1.4, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* ═══════ PULSING REACTOR CORE GLOW ═══════ */}
          <motion.div
            className="absolute w-80 h-80 rounded-full pointer-events-none z-10"
            style={{
              background:
                'radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* ═══════ GLOWING ARC REACTOR CORE INTERFACE ═══════ */}
          <motion.div
            className="relative z-20 flex flex-col items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 15,
              duration: 1,
            }}
          >
            {/* The Arc Reactor Outer Circular HUD */}
            <div className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                className="w-full h-full"
                style={{
                  filter: `drop-shadow(0 0 ${8 + progress * 0.25}px rgba(0, 240, 255, ${0.3 + progress * 0.007}))`,
                }}
              >
                <defs>
                  {/* Charging progress mask */}
                  <mask id="reactor-fill-mask">
                    <rect
                      x="0"
                      y={fillY}
                      width="64"
                      height="64"
                      fill="white"
                      style={{ transition: 'y 0.1s ease-out' }}
                    />
                  </mask>

                  {/* Core cyan charging gradient */}
                  <linearGradient id="cyan-gradient" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#0055ff" />
                    <stop offset="60%" stopColor="#00f0ff" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>

                {/* Background Silent Outlines */}
                <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                <circle cx="32" cy="32" r="22" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <circle cx="32" cy="32" r="14" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="2 2" />

                {/* Charging progress ring core */}
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  fill="none"
                  stroke="url(#cyan-gradient)"
                  strokeWidth="2.5"
                  mask="url(#reactor-fill-mask)"
                />

                {/* Inner active energy core */}
                <circle
                  cx="32"
                  cy="32"
                  r="10"
                  fill="url(#cyan-gradient)"
                  mask="url(#reactor-fill-mask)"
                />

                {/* 10 Triangular Ring Blades */}
                {Array.from({ length: 10 }).map((_, i) => {
                  const angle = (i * 36 - 90) * Math.PI / 180;
                  const x = 32 + Math.cos(angle) * 22;
                  const y = 32 + Math.sin(angle) * 22;
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="1.8"
                      fill={progress > (i * 10) ? '#00f0ff' : 'rgba(255,255,255,0.1)'}
                      stroke="rgba(0, 240, 255, 0.4)"
                      strokeWidth="0.4"
                      className="transition-all duration-300"
                    />
                  );
                })}

                {/* Clean HUD geometric lines */}
                <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(0,240,255,0.15)" strokeWidth="0.5" />
              </svg>

              {/* Central Text HUD readout */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="font-orbitron text-[10px] text-white/40 tracking-[0.2em] font-bold">SYSTEM</div>
                <div className="font-orbitron text-xl md:text-2xl font-black text-white text-shadow-cyan my-0.5">
                  {progress.toString().padStart(3, '0')}%
                </div>
                <div className="font-rajdhani text-[9px] text-stark-gold font-bold tracking-widest uppercase">CHARGING CORE</div>
              </div>
            </div>
          </motion.div>

          {/* ═══════ HOLOGRAPHIC HUD FRAME CORNERS ═══════ */}
          <motion.div
            className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-arc-cyan/20 rounded-tl-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          <motion.div
            className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-arc-cyan/20 rounded-tr-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
          <motion.div
            className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-arc-cyan/20 rounded-bl-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          />
          <motion.div
            className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-arc-cyan/20 rounded-br-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          />

          {/* ═══════ BOTTOM SHIMMER PROGRESS LINE ═══════ */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/5 z-30">
            <motion.div
              className="h-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #0055ff, #00f0ff, #ffffff)',
                boxShadow: '0 0 15px rgba(0,240,255,0.8)',
              }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
