import { useState, useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

/* ─────────────────────────────────────────────────────────────────────────────
   ARC REACTOR SVG
   A faithful hexagonal Arc Reactor icon in glowing cyan/blue.
───────────────────────────────────────────────────────────────────────────── */
function ArcReactorSVG() {
  return (
    <svg
      viewBox="0 0 200 200"
      width="180"
      height="180"
      xmlns="http://www.w3.org/2000/svg"
      className="reactor-core-glow"
    >
      {/* Glow filter */}
      <defs>
        <filter id="reactorGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="40%" stopColor="#00f0ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0040ff" stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id="ringGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0080ff" stopOpacity="0.2" />
        </radialGradient>
      </defs>

      {/* Outer decorative ring — spins slowly */}
      <g className="reactor-outer-ring" style={{ transformOrigin: '100px 100px' }}>
        {/* Tick marks */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          const rad = (angle * Math.PI) / 180;
          const r1 = 88, r2 = i % 3 === 0 ? 96 : 93;
          return (
            <line
              key={i}
              x1={100 + r1 * Math.cos(rad)}
              y1={100 + r1 * Math.sin(rad)}
              x2={100 + r2 * Math.cos(rad)}
              y2={100 + r2 * Math.sin(rad)}
              stroke={i % 3 === 0 ? '#00f0ff' : '#00a0cc'}
              strokeWidth={i % 3 === 0 ? 2 : 1}
              strokeOpacity={i % 3 === 0 ? 1 : 0.5}
            />
          );
        })}
        {/* Outer circle */}
        <circle cx="100" cy="100" r="90" fill="none" stroke="#00f0ff" strokeWidth="1.5" strokeOpacity="0.4" />
        <circle cx="100" cy="100" r="84" fill="none" stroke="#00f0ff" strokeWidth="0.5" strokeOpacity="0.2" />
      </g>

      {/* Hexagonal housing */}
      <polygon
        points="100,28 156,63 156,137 100,172 44,137 44,63"
        fill="rgba(0, 10, 30, 0.85)"
        stroke="#00f0ff"
        strokeWidth="2"
        filter="url(#reactorGlow)"
      />
      <polygon
        points="100,36 150,67 150,133 100,164 50,133 50,67"
        fill="rgba(0, 20, 60, 0.6)"
        stroke="#00c0ee"
        strokeWidth="1"
        strokeOpacity="0.5"
      />

      {/* Inner triangle blades — spin reverse */}
      <g className="reactor-inner-ring" style={{ transformOrigin: '100px 100px' }}>
        {[0, 120, 240].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const cos = Math.cos(rad);
          const sin = Math.sin(rad);
          // Blade: from center outward
          const tip = { x: 100 + 50 * cos, y: 100 + 50 * sin };
          const left = { x: 100 + 12 * Math.cos(rad + Math.PI / 2), y: 100 + 12 * Math.sin(rad + Math.PI / 2) };
          const right = { x: 100 + 12 * Math.cos(rad - Math.PI / 2), y: 100 + 12 * Math.sin(rad - Math.PI / 2) };
          return (
            <polygon
              key={i}
              points={`${tip.x},${tip.y} ${left.x},${left.y} ${right.x},${right.y}`}
              fill="url(#ringGrad)"
              stroke="#00f0ff"
              strokeWidth="1"
              filter="url(#reactorGlow)"
            />
          );
        })}
      </g>

      {/* Inner ring */}
      <circle cx="100" cy="100" r="28" fill="rgba(0,30,80,0.8)" stroke="#00f0ff" strokeWidth="2" />
      <circle cx="100" cy="100" r="22" fill="rgba(0,50,120,0.6)" stroke="#00d0ff" strokeWidth="1" />

      {/* Core glow */}
      <circle cx="100" cy="100" r="14" fill="url(#coreGrad)" filter="url(#reactorGlow)" />
      <circle cx="100" cy="100" r="8" fill="white" opacity="0.95" filter="url(#reactorGlow)" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PRELOADER COMPONENT
───────────────────────────────────────────────────────────────────────────── */
function Preloader({ onComplete }) {
  const [phase, setPhase] = useState('enter'); // 'enter' | 'visible' | 'exit'
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING STARK SYSTEMS...');
  const intervalRef = useRef(null);

  const statusMessages = [
    'INITIALIZING STARK SYSTEMS...',
    'LOADING ARC REACTOR CORE...',
    'CALIBRATING HUD INTERFACE...',
    'CONNECTING TO JARVIS...',
    'STARK TECH ONLINE.',
  ];

  useEffect(() => {
    // Progress counter
    let count = 0;
    intervalRef.current = setInterval(() => {
      count += 2;
      setProgress(Math.min(count, 100));

      // Cycle status messages
      const msgIndex = Math.min(Math.floor(count / 22), statusMessages.length - 1);
      setStatusText(statusMessages[msgIndex]);

      if (count >= 100) {
        clearInterval(intervalRef.current);
        // Brief pause at 100% then exit
        setTimeout(() => {
          setPhase('exit');
          setTimeout(() => onComplete?.(), 900);
        }, 600);
      }
    }, 30);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div
      className={cn(
        'preloader-overlay stark-grid-bg',
        phase === 'exit' && 'exit'
      )}
    >
      {/* Scan line */}
      <div className="scan-line" />

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-arc-cyan/60" />
      <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-arc-cyan/60" />
      <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-arc-cyan/60" />
      <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-arc-cyan/60" />

      {/* Main content */}
      <div className="flex flex-col items-center gap-8 z-10">

        {/* Arc Reactor */}
        <div className="relative">
          <ArcReactorSVG />
          {/* Outer glow rings */}
          <div className="absolute inset-0 rounded-full bg-arc-cyan/5 blur-3xl scale-150 animate-pulse-slow" />
        </div>

        {/* Stark Logo Text */}
        <div className="text-center space-y-1">
          <div className="font-orbitron text-xs tracking-[0.4em] text-arc-cyan/70 uppercase">
            Stark Industries
          </div>
          <h1 className="font-orbitron text-2xl font-black tracking-[0.2em] text-white text-shadow-cyan uppercase">
            IRON MAN
          </h1>
          <div className="font-rajdhani text-sm tracking-[0.3em] gradient-text-gold uppercase font-semibold">
            Stark Tech
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-72 space-y-3">
          {/* Status text */}
          <div className="font-orbitron text-xs text-arc-cyan/80 tracking-widest text-center hud-flicker">
            {statusText}
          </div>

          {/* Bar track */}
          <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-arc-cyan via-arc-cyan to-arc-cyan-dim rounded-full transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
            {/* Shimmer */}
            <div
              className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              style={{ left: `${Math.max(progress - 8, 0)}%`, transition: 'left 0.075s' }}
            />
          </div>

          {/* Percentage */}
          <div className="flex justify-between items-center">
            <div className="font-orbitron text-xs text-white/30 tracking-widest">SYS.BOOT</div>
            <div className="font-orbitron text-sm font-bold text-arc-cyan text-shadow-cyan">
              {progress.toString().padStart(3, '0')}%
            </div>
          </div>
        </div>

        {/* Bottom classification text */}
        <div className="font-rajdhani text-xs text-white/20 tracking-[0.5em] uppercase text-center">
          CLASSIFIED — STARK INDUSTRIES INTERNAL
        </div>
      </div>
    </div>
  );
}

export default Preloader;
