import { cn } from '../../lib/utils';

/* ─────────────────────────────────────────────────────────────────────────────
   FOOTER LINKS DATA
───────────────────────────────────────────────────────────────────────────── */
const FOOTER_LINKS = {
  GAMES: ['Iron Man: Stark Tech', 'Avengers: Endgame', 'The Invincible', 'Legacy Mode', 'DLC Packs'],
  COMPANY: ['About Stark Ind.', 'Careers', 'Press Kit', 'Investors', 'Contact'],
  SUPPORT: ['FAQ', 'Community', 'Bug Reports', 'Refund Policy', 'System Status'],
  LEGAL: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'EULA', 'Accessibility'],
};

const SOCIAL_LINKS = [
  {
    name: 'Twitter / X',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.2 2.7 12 2.7 12 2.7s-4.2 0-6.8.2c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.2.7 11.4v2c0 2.3.3 4.5.3 4.5s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.2 22 12 22 12 22s4.2 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.2.3-4.5v-2C23.3 9.2 23 7 23 7zM9.7 15.5V8.4l6.5 3.6-6.5 3.5z" />
      </svg>
    ),
  },
  {
    name: 'Discord',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   FOOTER COMPONENT
───────────────────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="relative border-t border-white/10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 stark-grid-bg" />
      <div className="absolute inset-0 bg-gradient-to-r from-crimson-deep/20 via-transparent to-arc-cyan/5" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Top section ── */}
        <div className="pt-16 pb-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 border-b border-white/10">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <svg width="32" height="32" viewBox="0 0 40 40">
                <defs>
                  <radialGradient id="footerLogo" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00f0ff" />
                    <stop offset="100%" stopColor="#0060aa" stopOpacity="0.3" />
                  </radialGradient>
                </defs>
                <polygon points="20,2 35,11 35,29 20,38 5,29 5,11" fill="rgba(0,10,30,0.8)" stroke="#d4af37" strokeWidth="1.5" />
                {[0, 120, 240].map((angle, i) => {
                  const rad = ((angle - 90) * Math.PI) / 180;
                  const tip = { x: 20 + 10 * Math.cos(rad), y: 20 + 10 * Math.sin(rad) };
                  const l = { x: 20 + 3 * Math.cos(rad + Math.PI / 2), y: 20 + 3 * Math.sin(rad + Math.PI / 2) };
                  const r = { x: 20 + 3 * Math.cos(rad - Math.PI / 2), y: 20 + 3 * Math.sin(rad - Math.PI / 2) };
                  return <polygon key={i} points={`${tip.x},${tip.y} ${l.x},${l.y} ${r.x},${r.y}`} fill="#d4af37" opacity="0.9" />;
                })}
                <circle cx="20" cy="20" r="4" fill="url(#footerLogo)" />
              </svg>
              <div>
                <div className="font-orbitron text-sm font-black tracking-widest text-white">STARK</div>
                <div className="font-rajdhani text-xs tracking-[0.3em] text-stark-gold/80">INDUSTRIES</div>
              </div>
            </div>
            <p className="font-inter text-sm text-white/40 leading-relaxed max-w-xs">
              Pioneering the future of entertainment and immersive technology.
              Suit up. The future is now.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <button
                  key={social.name}
                  aria-label={social.name}
                  className="w-9 h-9 flex items-center justify-center rounded-sm glass-panel hud-border text-white/50 hover:text-arc-cyan hover:border-arc-cyan/40 hover:shadow-cyan-glow transition-all duration-300"
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="space-y-4">
              <h4 className="font-orbitron text-xs font-bold tracking-[0.3em] text-stark-gold/80 uppercase">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-rajdhani text-sm text-white/45 hover:text-white hover:text-shadow-cyan transition-all duration-200 tracking-wide"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-rajdhani text-xs text-white/30 tracking-widest text-center sm:text-left">
            © {new Date().getFullYear()} STARK INDUSTRIES™. ALL RIGHTS RESERVED. MARVEL ENTERTAINMENT.
          </div>

          {/* HUD status */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 font-orbitron text-xs text-arc-cyan/40 tracking-widest">
              <span className="w-1 h-1 rounded-full bg-arc-cyan animate-pulse" />
              SYSTEMS ONLINE
            </div>
            <div className="font-orbitron text-xs text-stark-gold/40 tracking-widest">
              BUILD: 3000.7
            </div>
          </div>
        </div>
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-arc-cyan/30 to-transparent" />
    </footer>
  );
}

export default Footer;
