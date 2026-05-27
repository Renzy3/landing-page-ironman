import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import images from assets folder
import civilianImg from '../../assets/img.png';
import ironmanImg from '../../assets/ironman.png';

export default function CharacterMorph() {
  const containerRef = useRef(null);
  const [trail, setTrail] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false });
  const [sparks, setSparks] = useState([]);

  // Animation Loop to fade out and shrink brush trail circles
  useEffect(() => {
    let animFrame;
    const tick = () => {
      setTrail((prev) =>
        prev
          .map((pt) => ({
            ...pt,
            opacity: pt.opacity - 0.035, // Smooth fade out
            radius: pt.radius * 0.98,   // Taper off size
          }))
          .filter((pt) => pt.opacity > 0)
      );

      // Fade out sparks
      setSparks((prev) =>
        prev
          .map((sp) => ({
            ...sp,
            opacity: sp.opacity - 0.02,
            y: sp.y + sp.vy,
            x: sp.x + sp.vx,
          }))
          .filter((sp) => sp.opacity > 0)
      );

      animFrame = requestAnimationFrame(tick);
    };

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    // 1. Get the screen rectangle (scaled size) and the local client CSS dimensions
    const rect = containerRef.current.getBoundingClientRect();
    const localWidth = containerRef.current.clientWidth;
    const localHeight = containerRef.current.clientHeight;

    // 2. Map screen coordinates (clientX/Y) into local CSS coordinates
    const localX = ((e.clientX - rect.left) / rect.width) * localWidth;
    const localY = ((e.clientY - rect.top) / rect.height) * localHeight;

    setMousePos({ x: localX, y: localY, active: true });

    // 3. Add new brush point in local coordinates to match the SVG coordinate space
    const newPoint = {
      id: Math.random(),
      x: localX,
      y: localY,
      radius: 80, // Perfect feathered airbrush radius in local pixels
      opacity: 1.0,
    };
    setTrail((prev) => [...prev.slice(-30), newPoint]); // Cap trail points for rendering speed

    // 4. Erupt high-tech nanotech sparks from the cursor brush in local coordinates
    if (Math.random() > 0.4) {
      const newSpark = {
        id: Math.random(),
        x: localX,
        y: localY,
        size: Math.random() * 3.5 + 1.5,
        color: Math.random() > 0.5 ? '#00f0ff' : '#d4af37',
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4 - 2, // Drift upwards
        opacity: 1.0,
      };
      setSparks((prev) => [...prev.slice(-25), newSpark]);
    }
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-end justify-center h-full w-[350px] md:w-[450px] lg:w-[520px] select-none cursor-crosshair group pointer-events-auto overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── SVG MASK SYSTEM (Matches container size exactly) ── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-30" style={{ mixBlendMode: 'normal' }}>
        <defs>
          {/* Feathered Gaussian blur filter to make the reveal brush soft and natural */}
          <filter id="brush-blur">
            <feGaussianBlur stdDeviation="22" />
          </filter>
          
          {/* SVG Mask: Solid black hides the ironman suit, white circles reveal it */}
          <mask id="reveal-mask">
            {/* Base hiding layer */}
            <rect width="100%" height="100%" fill="black" />
            
            {/* Render dynamically fading circles along the cursor path */}
            {trail.map((point) => (
              <circle
                key={point.id}
                cx={point.x}
                cy={point.y}
                r={point.radius}
                fill="white"
                filter="url(#brush-blur)"
                opacity={point.opacity}
              />
            ))}
          </mask>
        </defs>
      </svg>

      {/* ── LAYER 1: Civilian Layer (img.png) ── */}
      <img
        src={civilianImg}
        alt="Bahlil Stark - Civilian Suit"
        className="absolute inset-0 w-full h-full object-contain object-bottom z-10 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.01] filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)] brightness-[0.9] group-hover:brightness-100"
      />

      {/* ── LAYER 2: Iron Man Layer (ironman.png) — Masked dynamically ── */}
      <img
        src={ironmanImg}
        alt="Bahlil Stark - Iron Man MK suit"
        className="absolute inset-0 w-full h-full object-contain object-bottom z-20 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.01] filter drop-shadow-[0_0_40px_rgba(0,240,255,0.45)]"
        style={{
          maskImage: 'url(#reveal-mask)',
          WebkitMaskImage: 'url(#reveal-mask)',
        }}
      />

      {/* ── Holographic Custom Cursor Ring Follower ── */}
      <AnimatePresence>
        {mousePos.active && (
          <motion.div
            className="absolute rounded-full border border-arc-cyan/80 z-40 pointer-events-none flex items-center justify-center"
            style={{
              left: mousePos.x - 24,
              top: mousePos.y - 24,
              width: 48,
              height: 48,
              boxShadow: '0 0 15px rgba(0, 240, 255, 0.6), inset 0 0 8px rgba(0, 240, 255, 0.4)',
              background: 'radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, transparent 70%)',
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          >
            {/* Center target dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-stark-gold shadow-[0_0_6px_#d4af37]" />
            {/* Tech HUD crosshairs */}
            <div className="absolute top-0 w-px h-1.5 bg-arc-cyan/60" />
            <div className="absolute bottom-0 w-px h-1.5 bg-arc-cyan/60" />
            <div className="absolute left-0 h-px w-1.5 bg-arc-cyan/60" />
            <div className="absolute right-0 h-px w-1.5 bg-arc-cyan/60" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sparks erupting from cursor path ── */}
      <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
        {sparks.map((spark) => (
          <div
            key={spark.id}
            className="absolute rounded-full"
            style={{
              left: spark.x,
              top: spark.y,
              width: spark.size,
              height: spark.size,
              backgroundColor: spark.color,
              opacity: spark.opacity,
              boxShadow: `0 0 8px ${spark.color}, 0 0 15px ${spark.color}`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {/* Ambient background body glow */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] aspect-square rounded-full blur-[100px] pointer-events-none z-0 transition-all duration-1000 ${
          mousePos.active ? 'bg-arc-cyan/15 scale-110' : 'bg-red-800/10 scale-100'
        }`}
      />
    </div>
  );
}
