import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import Button from '../ui/button';
import ReviewSidebar from './ReviewSidebar';

/* ─────────────────────────────────────────────────────────────────────────────
   CONSTANTS — Customise character name here
───────────────────────────────────────────────────────────────────────────── */
const CHARACTER_FIRST = 'Bahlil';
const CHARACTER_LAST = 'Stark';

/* ─────────────────────────────────────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────────────────────────────────────── */
function AnimatedCounter({ from = 0, to, duration = 2000, suffix = '', className }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const steps = 60;
    const increment = (to - from) / steps;
    let current = from;
    const timer = setInterval(() => {
      current += increment;
      if (current >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [to]);

  return (
    <span className={className}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   FLOATING PARTICLES (ambient HUD particles)
───────────────────────────────────────────────────────────────────────────── */
function HeroParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${Math.random() * 8 + 6}s`,
    color: i % 3 === 0 ? '#00f0ff' : i % 3 === 1 ? '#d4af37' : '#ff4060',
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            bottom: '-10px',
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CHARACTER FRAME — where the portrait / WebGL embed lives
───────────────────────────────────────────────────────────────────────────── */
function CharacterFrame() {
  const [armorMode, setArmorMode] = useState(false);

  return (
    <div className="relative character-frame flex-1 flex items-end justify-center min-h-[400px] lg:min-h-[600px]">

      {/* ── HUD frame corners ── */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-arc-cyan/50" />
      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-arc-cyan/50" />
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-arc-cyan/50" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-arc-cyan/50" />

      {/* Corner dots */}
      {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos) => (
        <div
          key={pos}
          className={`absolute ${pos} w-2 h-2 rounded-full bg-arc-cyan`}
          style={{ boxShadow: '0 0 8px #00f0ff' }}
        />
      ))}

      {/* ── HUD scan line ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="scan-line opacity-30" />
      </div>

      {/* ── Ground glow ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,240,255,0.12) 0%, transparent 70%)',
        }}
      />

      {/* ────────────────────────────────────────────────────────────────────
          CHARACTER PORTRAIT PLACEHOLDER
          ─────────────────────────────────────────────────────────────────
          Replace the content below with either:
            1. A static <img> tag for character artwork
            2. An <iframe> to a Unicorn.Studio / Spline WebGL scene:
               e.g.: <iframe src="https://app.unicorn.studio/embed/YOUR_ID"
                             allow="autoplay"
                             frameBorder="0"
                             style={{ width:'100%', height:'100%', border:'none' }} />
            3. A React Three Fiber <Canvas> component for a custom 3D model
            4. Any morphing/transition animation between civilian → Iron Man suit

          The frame is intentionally sized to fill this column vertically.
          The z-index layering is: bg-glow(0) → frame(10) → portrait(20) → HUD overlay(30)
          ─────────────────────────────────────────────────────────────────── */}
      <div
        className="relative z-20 w-full h-full flex items-end justify-center"
        style={{ minHeight: 'inherit' }}
      >
        {/* ── Decorative Iron Man silhouette (placeholder) ── */}
        <div
          className={cn(
            'relative transition-all duration-1000',
            armorMode ? 'filter-none' : 'opacity-90'
          )}
          style={{ width: 'clamp(280px, 55%, 420px)' }}
        >
          {/* Body glow */}
          <div
            className={cn(
              'absolute inset-0 rounded-full blur-3xl transition-all duration-1000 pointer-events-none',
              armorMode
                ? 'bg-arc-cyan/20 scale-125'
                : 'bg-crimson-accent/20 scale-100'
            )}
          />

          {/* SVG Silhouette — Iron Man geometric representation */}
          <svg
            viewBox="0 0 300 520"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10"
          >
            <defs>
              <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={armorMode ? '#00f0ff' : '#8b1a2a'} />
                <stop offset="50%" stopColor={armorMode ? '#0040ff' : '#c0392b'} />
                <stop offset="100%" stopColor={armorMode ? '#001030' : '#4a0e17'} />
              </linearGradient>
              <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#b8960c" />
                <stop offset="50%" stopColor="#f0d060" />
                <stop offset="100%" stopColor="#b8960c" />
              </linearGradient>
              <filter id="suitGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <radialGradient id="arcReactorHero" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#00f0ff" />
                <stop offset="100%" stopColor="#0020aa" stopOpacity="0.3" />
              </radialGradient>
            </defs>

            {/* ── Helmet ── */}
            {/* Dome */}
            <ellipse cx="150" cy="90" rx="65" ry="80" fill="url(#suitGrad)" />
            {/* Face plate */}
            <path d="M 105 80 Q 150 50 195 80 L 195 115 Q 150 140 105 115 Z" fill={armorMode ? '#00a0cc' : '#7a0f1f'} opacity="0.9" />
            {/* Eyes — glowing slits */}
            <path d="M 115 90 L 140 84 L 140 94 L 115 100 Z" fill={armorMode ? '#00f0ff' : '#d4af37'} filter="url(#suitGlow)" opacity={armorMode ? 1 : 0.9} />
            <path d="M 160 84 L 185 90 L 185 100 L 160 94 Z" fill={armorMode ? '#00f0ff' : '#d4af37'} filter="url(#suitGlow)" opacity={armorMode ? 1 : 0.9} />
            {/* Helmet chin */}
            <path d="M 115 115 Q 150 135 185 115 L 180 140 Q 150 158 120 140 Z" fill="url(#suitGrad)" opacity="0.95" />
            {/* Helmet sides */}
            <path d="M 85 70 Q 105 60 105 80 L 105 115 Q 90 110 88 90 Z" fill={armorMode ? '#0080aa' : '#6a0f1a'} />
            <path d="M 195 80 Q 195 60 215 70 L 212 90 Q 210 110 195 115 Z" fill={armorMode ? '#0080aa' : '#6a0f1a'} />

            {/* ── Neck / Collar ── */}
            <rect x="130" y="158" width="40" height="18" rx="4" fill="url(#suitGrad)" />
            <rect x="120" y="170" width="60" height="10" rx="4" fill="url(#goldAccent)" opacity="0.8" />

            {/* ── Chest plate ── */}
            <path d="M 90 180 Q 150 165 210 180 L 215 300 Q 150 320 85 300 Z" fill="url(#suitGrad)" />
            {/* Chest detail lines */}
            <line x1="150" y1="190" x2="150" y2="300" stroke={armorMode ? '#00f0ff' : '#d4af37'} strokeWidth="1" opacity="0.3" />
            <line x1="100" y1="220" x2="200" y2="220" stroke={armorMode ? '#00f0ff' : '#d4af37'} strokeWidth="1" opacity="0.2" />
            <line x1="100" y1="260" x2="200" y2="260" stroke={armorMode ? '#00f0ff' : '#d4af37'} strokeWidth="1" opacity="0.2" />

            {/* ── Arc Reactor (chest) ── */}
            <circle cx="150" cy="235" r="22" fill="rgba(0,10,30,0.9)" stroke={armorMode ? '#00f0ff' : '#d4af37'} strokeWidth="2" />
            <circle cx="150" cy="235" r="15" fill={armorMode ? 'url(#arcReactorHero)' : 'rgba(0,30,80,0.6)'} filter="url(#suitGlow)" />
            <circle cx="150" cy="235" r="8" fill={armorMode ? 'white' : '#00f0ff'} opacity="0.9" filter="url(#suitGlow)" />
            {/* Reactor ring ticks */}
            {[0, 60, 120, 180, 240, 300].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              return (
                <line
                  key={angle}
                  x1={150 + 17 * Math.cos(rad)}
                  y1={235 + 17 * Math.sin(rad)}
                  x2={150 + 22 * Math.cos(rad)}
                  y2={235 + 22 * Math.sin(rad)}
                  stroke={armorMode ? '#00f0ff' : '#d4af37'}
                  strokeWidth="1.5"
                  opacity="0.6"
                />
              );
            })}

            {/* ── Shoulders ── */}
            <ellipse cx="80" cy="195" rx="32" ry="26" fill={armorMode ? '#0060aa' : '#7a1020'} />
            <ellipse cx="220" cy="195" rx="32" ry="26" fill={armorMode ? '#0060aa' : '#7a1020'} />
            <ellipse cx="80" cy="190" rx="24" ry="18" fill="url(#suitGrad)" opacity="0.8" />
            <ellipse cx="220" cy="190" rx="24" ry="18" fill="url(#suitGrad)" opacity="0.8" />
            {/* Shoulder gold trim */}
            <path d="M 58 185 Q 80 168 102 185" fill="none" stroke="url(#goldAccent)" strokeWidth="2" opacity="0.7" />
            <path d="M 198 185 Q 220 168 242 185" fill="none" stroke="url(#goldAccent)" strokeWidth="2" opacity="0.7" />

            {/* ── Arms ── */}
            {/* Left arm */}
            <path d="M 58 210 Q 40 240 38 290 L 52 295 Q 58 250 68 220 Z" fill="url(#suitGrad)" />
            <path d="M 38 290 Q 30 320 35 360 L 50 358 Q 48 322 52 295 Z" fill={armorMode ? '#0050aa' : '#6a0f1a'} />
            {/* Left repulsor hand */}
            <ellipse cx="42" cy="370" rx="16" ry="12" fill={armorMode ? '#0040aa' : '#5a0f18'} />
            <circle cx="42" cy="370" r="6" fill={armorMode ? '#00f0ff' : '#d4af37'} filter="url(#suitGlow)" opacity="0.9" />

            {/* Right arm */}
            <path d="M 242 210 Q 260 240 262 290 L 248 295 Q 242 250 232 220 Z" fill="url(#suitGrad)" />
            <path d="M 262 290 Q 270 320 265 360 L 250 358 Q 252 322 248 295 Z" fill={armorMode ? '#0050aa' : '#6a0f1a'} />
            {/* Right repulsor hand */}
            <ellipse cx="258" cy="370" rx="16" ry="12" fill={armorMode ? '#0040aa' : '#5a0f18'} />
            <circle cx="258" cy="370" r="6" fill={armorMode ? '#00f0ff' : '#d4af37'} filter="url(#suitGlow)" opacity="0.9" />

            {/* ── Waist / Hip ── */}
            <path d="M 90 300 Q 150 318 210 300 L 210 340 Q 150 355 90 340 Z" fill={armorMode ? '#004080' : '#6a0f1a'} />
            <line x1="90" y1="320" x2="210" y2="320" stroke={armorMode ? '#00f0ff' : '#d4af37'} strokeWidth="1.5" opacity="0.4" />
            {/* Hip gold trim */}
            <path d="M 95 338 Q 150 352 205 338" fill="none" stroke="url(#goldAccent)" strokeWidth="2" opacity="0.6" />

            {/* ── Legs ── */}
            {/* Left leg */}
            <path d="M 95 340 Q 92 400 94 460 L 115 462 Q 118 402 115 342 Z" fill="url(#suitGrad)" />
            {/* Right leg */}
            <path d="M 185 342 Q 182 402 185 462 L 206 460 Q 208 400 205 340 Z" fill="url(#suitGrad)" />
            {/* Knee pads */}
            <ellipse cx="104" cy="400" rx="16" ry="12" fill={armorMode ? '#0060aa' : '#8a1525'} />
            <ellipse cx="196" cy="400" rx="16" ry="12" fill={armorMode ? '#0060aa' : '#8a1525'} />
            {/* Boots */}
            <path d="M 90 458 Q 94 488 100 498 L 120 498 Q 120 488 115 460 Z" fill={armorMode ? '#003080' : '#5a0f18'} />
            <path d="M 185 460 Q 180 488 180 498 L 200 498 Q 206 488 210 458 Z" fill={armorMode ? '#003080' : '#5a0f18'} />
            {/* Boot thrusters */}
            <ellipse cx="105" cy="498" rx="15" ry="6" fill={armorMode ? '#00f0ff' : '#d4af37'} opacity="0.7" filter="url(#suitGlow)" />
            <ellipse cx="192" cy="498" rx="15" ry="6" fill={armorMode ? '#00f0ff' : '#d4af37'} opacity="0.7" filter="url(#suitGlow)" />

            {/* ── Gold trim lines on chest ── */}
            <path d="M 90 185 Q 110 175 130 178" fill="none" stroke="url(#goldAccent)" strokeWidth="2" opacity="0.8" />
            <path d="M 170 178 Q 190 175 210 185" fill="none" stroke="url(#goldAccent)" strokeWidth="2" opacity="0.8" />
          </svg>

          {/* Armor Mode Toggle Hint */}
          <button
            onClick={() => setArmorMode(!armorMode)}
            className={cn(
              'absolute bottom-4 left-1/2 -translate-x-1/2 z-30',
              'px-4 py-2 rounded-full text-xs font-orbitron font-bold tracking-widest uppercase',
              'border transition-all duration-500',
              armorMode
                ? 'border-arc-cyan text-arc-cyan bg-arc-cyan/10 shadow-cyan-glow'
                : 'border-stark-gold text-stark-gold bg-stark-gold/10 shadow-gold-glow'
            )}
          >
            {armorMode ? '⚡ MARK L ACTIVE' : '🔧 SUIT UP'}
          </button>
        </div>
      </div>

      {/* ── HUD Overlay data ── */}
      <div className="absolute top-4 left-4 z-30 space-y-1 hud-flicker">
        <div className="font-orbitron text-xs text-arc-cyan/50 tracking-widest">SCANNING...</div>
        <div className="font-orbitron text-xs text-white/30 tracking-widest">ID: STARK-0047</div>
      </div>
      <div className="absolute top-4 right-4 z-30 text-right space-y-1 hud-flicker">
        <div className="font-orbitron text-xs text-stark-gold/50 tracking-widest">POWER</div>
        <div className="font-orbitron text-xs text-arc-cyan/60 tracking-widest">93%</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* ── Layered background effects ── */}
      {/* Base gradient */}
      <div className="absolute inset-0 bg-stark-gradient" />
      {/* Grid overlay */}
      <div className="absolute inset-0 stark-grid-bg opacity-60" />
      {/* Left glow */}
      <div className="absolute inset-0 hero-glow-left" />
      {/* Right subtle cyan glow */}
      <div className="absolute inset-0 hero-glow-right" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center,transparent_30%,rgba(0,0,0,0.4)_100%]" />

      {/* Ambient particles */}
      <HeroParticles />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8 pt-28 pb-12 flex-1 flex flex-col">

        {/* Pre-title badge */}
        <div className="hero-title-enter mb-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-panel border border-stark-gold/30">
            <span className="w-2 h-2 rounded-full bg-arc-cyan animate-pulse" />
            <span className="font-orbitron text-xs tracking-[0.35em] text-stark-gold/80 uppercase">
              Marvel Studios · Stark Industries · 2025
            </span>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div className="flex-1 flex flex-col lg:flex-row items-start lg:items-end gap-8 lg:gap-12">

          {/* ════════════════════════════════════
              LEFT COLUMN — Typography + CTAs
              ════════════════════════════════════ */}
          <div className="flex flex-col justify-end pb-12 space-y-6 lg:max-w-sm xl:max-w-md z-20">

            {/* ── Main title ── */}
            <div className="space-y-1 hero-title-enter">
              <div className="font-orbitron text-xs font-bold tracking-[0.5em] text-stark-gold/80 uppercase">
                MARVEL
              </div>
              <h1
                className="font-orbitron font-black uppercase leading-none"
                style={{
                  fontSize: 'clamp(2.8rem, 7vw, 5rem)',
                  background: 'linear-gradient(135deg, #ffffff 0%, #ffe0e0 50%, #d0d0d0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: 'none',
                  filter: 'drop-shadow(0 0 30px rgba(200,50,50,0.4))',
                }}
              >
                IRON MAN
              </h1>
            </div>

            {/* ── Character name ── */}
            <div className="hero-subtitle-enter space-y-0.5">
              <h2
                className="font-orbitron font-black uppercase leading-none gradient-text-gold"
                style={{ fontSize: 'clamp(1.4rem, 4vw, 2.6rem)' }}
              >
                {CHARACTER_FIRST} {CHARACTER_LAST}
              </h2>
              <div className="w-24 h-0.5 bg-gradient-to-r from-stark-gold to-transparent" />
            </div>

            {/* ── Sub-headline ── */}
            <div className="hero-desc-enter">
              <p
                className="font-rajdhani text-base font-semibold tracking-wide uppercase"
                style={{ color: '#00f0ff', textShadow: '0 0 10px rgba(0,240,255,0.5)' }}
              >
                Genius. Billionaire. Playboy. Philanthropist.
              </p>
            </div>

            {/* ── Description ── */}
            <div className="hero-desc-enter">
              <p className="font-inter text-sm text-white/60 leading-relaxed max-w-sm">
                Step into the arc reactor–powered suit and experience the most immersive
                Iron Man universe ever crafted. Build your legacy, upgrade your tech,
                and become the Invincible Iron Man — <span className="text-stark-gold/80">{CHARACTER_FIRST} {CHARACTER_LAST}</span>.
              </p>
            </div>

            {/* ── Action Buttons ── */}
            <div className="hero-btns-enter flex flex-wrap gap-3 pt-2">
              <Button variant="gold-metallic" size="lg" className="gap-2 font-orbitron font-black">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10,8 16,12 10,16" fill="currentColor" />
                </svg>
                Pre-Order Now
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                  <polyline points="13 2 13 9 20 9" />
                </svg>
                Learn More
              </Button>
            </div>

            {/* ── Social proof stats ── */}
            <div className="hero-btns-enter flex gap-6 pt-4 border-t border-white/10">
              {[
                { label: 'Pre-orders', value: 2400000, suffix: '+', prefix: '' },
                { label: 'Countries', value: 190, suffix: '+', prefix: '' },
                { label: 'Avg Rating', value: 9, suffix: '.8', prefix: '' },
              ].map(({ label, value, suffix, prefix }) => (
                <div key={label} className="space-y-0.5">
                  <div className="font-orbitron text-lg font-black text-white">
                    {prefix}
                    <AnimatedCounter to={value} suffix={suffix} />
                  </div>
                  <div className="font-rajdhani text-xs text-white/40 tracking-widest uppercase">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ════════════════════════════════════
              CENTER COLUMN — Character Frame
              ════════════════════════════════════ */}
          <div className="flex-1 flex items-end justify-center min-w-0">
            <CharacterFrame />
          </div>

          {/* ════════════════════════════════════
              RIGHT COLUMN — Review Sidebar
              ════════════════════════════════════ */}
          <div className="lg:pb-12 flex-shrink-0 lg:w-72 xl:w-80 w-full">
            <ReviewSidebar />
          </div>
        </div>
      </div>

      {/* ── Bottom scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-orbitron text-xs text-white/30 tracking-widest">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-arc-cyan/60 to-transparent" />
      </div>

      {/* ── Bottom vignette ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </section>
  );
}

export default Hero;
