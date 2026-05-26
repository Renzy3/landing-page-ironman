import { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Footer from './components/layout/Footer';
import './index.css';

/* ─────────────────────────────────────────────────────────────────────────────
   APP ROOT
   Stitches the full page together:
     1. Preloader (gated, plays once on first render)
     2. Navbar (fixed at top)
     3. Main content (sections)
     4. Footer
───────────────────────────────────────────────────────────────────────────── */
function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  // Prevent scroll during preloader
  useEffect(() => {
    if (!preloaderDone) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [preloaderDone]);

  const handlePreloaderComplete = () => {
    setPreloaderDone(true);
  };

  return (
    <>
      {/* ── Preloader overlay ── */}
      {!preloaderDone && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {/* ── Main page shell ── */}
      <div
        className="relative min-h-screen"
        style={{
          opacity: preloaderDone ? 1 : 0,
          transform: preloaderDone ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
        }}
      >
        {/* Fixed navigation */}
        <Navbar />

        {/* Page sections */}
        <main>
          {/* Hero — full viewport landing */}
          <Hero />

          {/* ────────────────────────────────────────
              Additional sections can be added below:
              e.g. <Features />, <Gallery />, <Specs />, <CTA />, etc.
              ──────────────────────────────────────── */}

          {/* Features teaser — placeholder section */}
          <section
            id="features"
            className="relative py-24 overflow-hidden border-t border-white/5"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-crimson-dark to-black/80" />
            <div className="absolute inset-0 stark-grid-bg opacity-30" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center space-y-4">
              <div className="font-orbitron text-xs tracking-[0.5em] text-arc-cyan/60 uppercase">
                Stark Industries · Technology Preview
              </div>
              <h2
                className="font-orbitron font-black uppercase"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  background: 'linear-gradient(135deg, #d4af37, #f0d060, #d4af37)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Powered by Arc Reactor
              </h2>
              <p className="font-rajdhani text-base text-white/50 max-w-2xl mx-auto leading-relaxed">
                The most advanced suit of armor ever created. Adaptive AI, quantum-level shields,
                and 3,000 GW of raw repulsor power — all engineered by{' '}
                <span className="text-stark-gold">Bahlil Stark</span>.
              </p>

              {/* Feature cards */}
              <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: '⚡',
                    title: 'Arc Reactor V',
                    desc: '3,000 GW clean energy output powering every system simultaneously.',
                    accent: 'text-arc-cyan',
                    border: 'border-arc-cyan/20',
                  },
                  {
                    icon: '🛡️',
                    title: 'Adaptive Armor',
                    desc: 'Nanotech plates reconfigure in milliseconds based on threat analysis.',
                    accent: 'text-stark-gold',
                    border: 'border-stark-gold/20',
                  },
                  {
                    icon: '🤖',
                    title: 'JARVIS 4.0',
                    desc: 'Quantum-accelerated AI assistant with full predictive combat modeling.',
                    accent: 'text-arc-cyan',
                    border: 'border-arc-cyan/20',
                  },
                  {
                    icon: '🚀',
                    title: 'Mach 10 Flight',
                    desc: 'Repulsor-propelled flight with orbital insertion capability.',
                    accent: 'text-stark-gold',
                    border: 'border-stark-gold/20',
                  },
                  {
                    icon: '🎯',
                    title: 'Smart Weapons',
                    desc: 'Micro-missiles with AI targeting accuracy at 0.001ms response.',
                    accent: 'text-arc-cyan',
                    border: 'border-arc-cyan/20',
                  },
                  {
                    icon: '🔬',
                    title: 'Biomonitor',
                    desc: 'Real-time biometrics keeping Stark at peak cognitive performance.',
                    accent: 'text-stark-gold',
                    border: 'border-stark-gold/20',
                  },
                ].map(({ icon, title, desc, accent, border }) => (
                  <div
                    key={title}
                    className={`glass-panel rounded-sm p-6 text-left space-y-3 border ${border} group hover:bg-white/5 transition-all duration-300 cursor-default`}
                  >
                    <div className="text-3xl">{icon}</div>
                    <h3 className={`font-orbitron text-sm font-bold tracking-widest uppercase ${accent}`}>
                      {title}
                    </h3>
                    <p className="font-inter text-sm text-white/50 leading-relaxed">{desc}</p>
                    {/* Bottom glow line */}
                    <div className={`h-px bg-gradient-to-r from-transparent ${accent === 'text-arc-cyan' ? 'via-arc-cyan/40' : 'via-stark-gold/40'} to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default App;
