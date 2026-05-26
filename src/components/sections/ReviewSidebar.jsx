import { useState } from 'react';
import { cn } from '../../lib/utils';

/* ─────────────────────────────────────────────────────────────────────────────
   GAME REVIEW BADGE DATA
───────────────────────────────────────────────────────────────────────────── */
const REVIEWS = [
  {
    outlet: 'IGN',
    score: '9.9',
    label: '"Potential Game of the Year"',
    icon: '🎮',
    accentColor: 'text-arc-cyan',
    glowColor: 'rgba(0, 240, 255, 0.6)',
    borderColor: 'border-arc-cyan/40',
  },
  {
    outlet: 'GamesRadar',
    score: '9.7',
    label: '"PlayStation\'s Masterpiece"',
    icon: '⭐',
    accentColor: 'text-stark-gold',
    glowColor: 'rgba(212, 175, 55, 0.6)',
    borderColor: 'border-stark-gold/40',
  },
  {
    outlet: 'GameSpot',
    score: '9.5',
    label: '"A New Benchmark in Gaming"',
    icon: '🏆',
    accentColor: 'text-arc-cyan',
    glowColor: 'rgba(0, 240, 255, 0.4)',
    borderColor: 'border-arc-cyan/30',
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   INDIVIDUAL REVIEW BADGE
───────────────────────────────────────────────────────────────────────────── */
function ReviewBadge({ outlet, score, label, accentColor, glowColor, borderColor, delay = 0 }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn(
        'relative flex items-center gap-3 p-3 rounded-sm glass-panel transition-all duration-400 cursor-default',
        `border ${borderColor}`,
        'hover:bg-white/5'
      )}
      style={{
        boxShadow: hovered
          ? `0 0 20px ${glowColor}, 0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`
          : `0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)`,
        transition: 'box-shadow 0.4s ease, background 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Score ring */}
      <div className="relative flex-shrink-0">
        <div
          className={cn(
            'w-11 h-11 rounded-full flex items-center justify-center',
            'border-2',
            borderColor,
            'bg-black/40'
          )}
          style={{
            boxShadow: hovered ? `0 0 12px ${glowColor}` : 'none',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          <span className={cn('font-orbitron text-sm font-black', accentColor)}>
            {score}
          </span>
        </div>
        {/* Corner accent */}
        <div
          className={cn('absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full', accentColor)}
          style={{ background: glowColor, boxShadow: `0 0 6px ${glowColor}` }}
        />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <div className={cn('font-orbitron text-xs font-bold tracking-widest', accentColor)}>
          {outlet}
        </div>
        <div className="font-rajdhani text-xs text-white/50 leading-tight mt-0.5 font-medium">
          {label}
        </div>
      </div>

      {/* Right glow accent */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-l-full"
        style={{ background: `linear-gradient(180deg, transparent, ${glowColor}, transparent)` }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   TRAILER THUMBNAIL CARD
───────────────────────────────────────────────────────────────────────────── */
function TrailerCard() {
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div className="space-y-3">
      {/* Section label */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-px bg-stark-gold/60" />
        <span className="font-orbitron text-xs font-bold tracking-[0.3em] text-stark-gold/80 uppercase">
          Watch Trailer
        </span>
        <div className="flex-1 h-px bg-stark-gold/20" />
      </div>

      {/* Thumbnail card */}
      <div
        className="relative rounded-lg overflow-hidden cursor-pointer group"
        style={{ aspectRatio: '16/9' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setPlaying(true)}
        role="button"
        aria-label="Watch Iron Man: Stark Tech trailer"
        tabIndex={0}
      >
        {/* Background — cinematic HUD scene */}
        <div className="absolute inset-0 bg-gradient-to-br from-crimson-deep via-black to-[#050520]">
          {/* Tech grid overlay */}
          <div className="absolute inset-0 stark-grid-bg opacity-60" />

          {/* Hexagonal pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-10"
            viewBox="0 0 300 169"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Decorative hex grid */}
            {[...Array(6)].map((_, row) =>
              [...Array(8)].map((_, col) => {
                const x = col * 40 + (row % 2 === 0 ? 0 : 20);
                const y = row * 30;
                const pts = [0, 1, 2, 3, 4, 5].map((i) => {
                  const a = (Math.PI / 180) * (60 * i - 30);
                  return `${x + 18 * Math.cos(a)},${y + 18 * Math.sin(a)}`;
                }).join(' ');
                return (
                  <polygon
                    key={`${row}-${col}`}
                    points={pts}
                    fill="none"
                    stroke="#00f0ff"
                    strokeWidth="0.5"
                    opacity="0.5"
                  />
                );
              })
            )}
          </svg>

          {/* Arc reactor light beam */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-arc-cyan/10" />

          {/* Iron Man silhouette hint — simple geometric */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-32 opacity-30">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-28 bg-gradient-to-t from-red-700 via-red-800 to-transparent rounded-t-full" />
            {/* Chest arc reactor */}
            <div
              className="absolute bottom-16 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
              style={{
                background: '#00f0ff',
                boxShadow: '0 0 8px #00f0ff, 0 0 16px #00f0ff',
              }}
            />
          </div>

          {/* "STARK TECH" watermark */}
          <div className="absolute top-2 left-3">
            <span className="font-orbitron text-xs text-stark-gold/40 tracking-widest">STARK TECH</span>
          </div>
          {/* Duration */}
          <div className="absolute top-2 right-3">
            <span className="font-orbitron text-xs text-white/40">02:47</span>
          </div>
        </div>

        {/* Hover overlay */}
        <div
          className={cn(
            'absolute inset-0 bg-black/20 transition-opacity duration-300',
            hovered ? 'opacity-0' : 'opacity-100'
          )}
        />

        {/* Scan line on hover */}
        {hovered && <div className="scan-line" />}

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={cn(
              'relative w-12 h-12 rounded-full flex items-center justify-center',
              'bg-arc-cyan/20 border-2 border-arc-cyan',
              'transition-all duration-300',
              'play-btn-pulse',
              hovered ? 'scale-110 bg-arc-cyan/30' : 'scale-100'
            )}
            style={{
              boxShadow: hovered
                ? '0 0 20px rgba(0,240,255,0.8), 0 0 40px rgba(0,240,255,0.4)'
                : '0 0 10px rgba(0,240,255,0.5)',
            }}
          >
            {/* Triangle play icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="#00f0ff"
              className="ml-1"
            >
              <polygon points="3,1 14,8 3,15" />
            </svg>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Bottom label */}
        <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center">
          <span className="font-rajdhani text-xs text-white/70 font-semibold tracking-wide">
            Official Reveal Trailer
          </span>
          <span className="font-orbitron text-xs text-arc-cyan/80 tracking-widest">4K</span>
        </div>

        {/* Border glow on hover */}
        <div
          className="absolute inset-0 rounded-lg border transition-all duration-300 pointer-events-none"
          style={{
            borderColor: hovered ? 'rgba(0, 240, 255, 0.5)' : 'rgba(0, 240, 255, 0.15)',
            boxShadow: hovered ? '0 0 20px rgba(0,240,255,0.3), inset 0 0 20px rgba(0,240,255,0.05)' : 'none',
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   REVIEW SIDEBAR COMPONENT
───────────────────────────────────────────────────────────────────────────── */
function ReviewSidebar() {
  return (
    <div className="hero-sidebar-enter flex flex-col gap-5 w-full max-w-xs">

      {/* ── Game Reviews section ── */}
      <div className="space-y-3">
        {/* Section header */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-px bg-arc-cyan/60" />
          <span className="font-orbitron text-xs font-bold tracking-[0.3em] text-arc-cyan/80 uppercase hud-flicker">
            Game Reviews
          </span>
          <div className="flex-1 h-px bg-arc-cyan/20" />
        </div>

        {/* Review badges */}
        <div className="space-y-2.5">
          {REVIEWS.map((review, i) => (
            <ReviewBadge key={review.outlet} {...review} delay={i * 150} />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── Trailer thumbnail ── */}
      <TrailerCard />

      {/* ── Floating HUD stats ── */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Players', value: '2.4M', color: 'text-arc-cyan' },
          { label: 'Awards', value: '47', color: 'text-stark-gold' },
          { label: 'Rating', value: '98%', color: 'text-arc-cyan' },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="glass-panel hud-border rounded-sm p-2 text-center"
          >
            <div className={cn('font-orbitron text-sm font-black', color)}>{value}</div>
            <div className="font-rajdhani text-xs text-white/40 tracking-widest uppercase">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewSidebar;
