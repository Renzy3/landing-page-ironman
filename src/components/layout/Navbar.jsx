import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import Button from '../ui/button';

/* ─────────────────────────────────────────────────────────────────────────────
   STARK INDUSTRIES LOGO MARK — minimal hexagonal arc reactor icon
───────────────────────────────────────────────────────────────────────────── */
function StarkLogo() {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      {/* Hex Icon */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.9)]"
      >
        <defs>
          <radialGradient id="logoCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#0060aa" stopOpacity="0.3" />
          </radialGradient>
        </defs>
        {/* Hex outline */}
        <polygon
          points="20,2 35,11 35,29 20,38 5,29 5,11"
          fill="rgba(0,10,30,0.8)"
          stroke="#00f0ff"
          strokeWidth="1.5"
          strokeOpacity="0.8"
        />
        {/* Inner triangle blades */}
        {[0, 120, 240].map((angle, i) => {
          const rad = ((angle - 90) * Math.PI) / 180;
          const tip = { x: 20 + 11 * Math.cos(rad), y: 20 + 11 * Math.sin(rad) };
          const l = { x: 20 + 3.5 * Math.cos(rad + Math.PI / 2), y: 20 + 3.5 * Math.sin(rad + Math.PI / 2) };
          const r = { x: 20 + 3.5 * Math.cos(rad - Math.PI / 2), y: 20 + 3.5 * Math.sin(rad - Math.PI / 2) };
          return (
            <polygon
              key={i}
              points={`${tip.x},${tip.y} ${l.x},${l.y} ${r.x},${r.y}`}
              fill="#00c0ff"
              opacity="0.85"
            />
          );
        })}
        {/* Core */}
        <circle cx="20" cy="20" r="4.5" fill="url(#logoCore)" />
        <circle cx="20" cy="20" r="2" fill="white" opacity="0.95" />
      </svg>

      {/* Text */}
      <div className="leading-none">
        <div className="font-orbitron text-xs font-black tracking-[0.2em] text-white uppercase group-hover:text-shadow-cyan transition-all duration-300">
          STARK
        </div>
        <div className="font-rajdhani text-xs tracking-[0.35em] text-arc-cyan/70 uppercase font-medium">
          INDUSTRIES
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   NAV DROPDOWN ITEM
───────────────────────────────────────────────────────────────────────────── */
function NavItem({ label, items = [] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="nav-link flex items-center gap-1.5 py-2">
        {label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          className={cn('transition-transform duration-200', open && 'rotate-180')}
        >
          <polyline
            points="2,3 5,7 8,3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Dropdown */}
      <div
        className={cn(
          'absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300',
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
        )}
      >
        <div className="glass-panel hud-border rounded-sm min-w-[160px] overflow-hidden">
          {items.map((item, i) => (
            <button
              key={i}
              className="w-full text-left px-4 py-2.5 font-rajdhani text-xs font-semibold tracking-widest text-white/70 uppercase hover:text-arc-cyan hover:bg-arc-cyan/5 transition-all duration-200 border-b border-white/5 last:border-0"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: 'GAMES', items: ['Iron Man: Stark Tech', 'Avengers: Endgame', 'The Invincible', 'Legacy Mode'] },
  { label: 'NEWS', items: ['Latest Updates', 'Patch Notes', 'Dev Blog', 'Community'] },
  { label: 'BLOG', items: ['Design Insights', 'Tech Notes', 'Behind the Scenes', 'Archive'] },
  { label: 'SERVICES', items: ['Stark Profile', 'HUD Customizer', 'Armor Vault', 'API Access'] },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'backdrop-blur-xl bg-black/40 border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
          : 'backdrop-blur-md bg-black/20'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Left: Logo ── */}
          <StarkLogo />

          {/* ── Center: Nav links (desktop) ── */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.label} label={item.label} items={item.items} />
            ))}
          </div>

          {/* ── Right: Profile Button ── */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Live indicator */}
            <div className="flex items-center gap-2 font-orbitron text-xs text-arc-cyan/60 tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-arc-cyan animate-pulse" />
              LIVE
            </div>
            <Button
              variant="cyan-glow"
              size="sm"
              className="gap-2"
            >
              {/* User icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              STARK PROFILE
            </Button>
          </div>

          {/* ── Mobile: Hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 text-white"
            aria-label="Toggle menu"
          >
            <span className={cn('w-6 h-px bg-current transition-all duration-300', mobileOpen && 'rotate-45 translate-y-2')} />
            <span className={cn('w-6 h-px bg-current transition-all duration-300', mobileOpen && 'opacity-0')} />
            <span className={cn('w-6 h-px bg-current transition-all duration-300', mobileOpen && '-rotate-45 -translate-y-2')} />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-500',
            mobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="pb-6 space-y-1 border-t border-white/10 pt-4 mt-2">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="font-orbitron text-xs font-bold tracking-widest text-arc-cyan/70 px-2 pt-2">
                  {item.label}
                </div>
                {item.items.map((sub, i) => (
                  <button
                    key={i}
                    className="w-full text-left px-4 py-2 font-rajdhani text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-sm transition-all duration-200"
                  >
                    {sub}
                  </button>
                ))}
              </div>
            ))}
            <div className="pt-4 px-2">
              <Button variant="cyan-glow" size="md" className="w-full justify-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                STARK PROFILE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
