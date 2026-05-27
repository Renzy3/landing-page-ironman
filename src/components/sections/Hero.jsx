import { useState, useEffect } from 'react';
import { ArrowRight, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/button';

const CHARACTER_FIRST = 'Bahlil';
const CHARACTER_LAST = 'Stark';

function AnimatedCounter({ from = 0, to, duration = 2, suffix = '' }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * (to - from) + from));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(to);
      }
    };
    requestAnimationFrame(animate);
  }, [to, from, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export function Hero() {
  return (
    <div className="space-y-6 lg:space-y-7 text-left w-full">
      {/* Marvel Pre-title Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-stark-gold/30 bg-black/40 backdrop-blur-md animate-fade-in-down">
        <span className="w-1.5 h-1.5 rounded-full bg-arc-cyan animate-pulse" />
        <span className="font-orbitron text-[9px] sm:text-[10px] tracking-[0.3em] text-stark-gold font-bold uppercase">
          MARVEL STUDIOS • STARK INDUSTRIES
        </span>
      </div>

      {/* Main Title Section */}
      <div className="space-y-2">
        <p className="text-xs tracking-[0.35em] font-black text-white/40 uppercase font-orbitron ml-1">
          MARVEL
        </p>
        
        {/* Cinematic Title */}
        <h1 
          className="text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] font-display text-white animate-text-glow drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          IRON MAN
        </h1>

        {/* Character Subtitle */}
        <div className="flex items-center gap-3">
          <h2
            className="text-2xl md:text-3xl text-stark-gold tracking-wider uppercase font-semibold font-orbitron gradient-text-gold"
          >
            {CHARACTER_FIRST} {CHARACTER_LAST}
          </h2>
          <div className="flex-grow h-px bg-gradient-to-r from-stark-gold/30 to-transparent" />
        </div>
      </div>

      {/* Cinematic Description */}
      <p className="text-sm md:text-base text-white/70 leading-relaxed font-normal max-w-md font-inter">
        Experience the rise of <span className="text-white font-bold">{CHARACTER_FIRST} {CHARACTER_LAST}</span> as the new hero masters
        incredible, explosive nanotech weaponry to build his own Iron Man MK suit.
      </p>

      {/* CTAs */}
      <div className="pt-4 flex flex-wrap gap-4 items-center">
        <button className="btn-glow bg-white text-black font-bold px-8 py-3.5 rounded-full hover:scale-105 transform transition-all duration-300 shadow-lg shadow-black/30 uppercase tracking-widest text-xs flex items-center gap-2 group cursor-pointer font-orbitron">
          <span className="relative z-10 flex items-center gap-2">
            Pre-Order Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 text-arc-cyan" />
          </span>
        </button>
        
        <Button
          variant="outline"
          size="lg"
          className="rounded-full border border-white/20 hover:border-arc-cyan hover:bg-arc-cyan/10 transition-colors font-orbitron text-xs gap-2"
        >
          <Terminal className="w-3.5 h-3.5 text-arc-cyan" />
          SYSTEM SPECS
        </Button>
      </div>

      {/* Social Proof Stats */}
      <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-sm">
        {[
          { label: 'Vault Armor', value: 50, suffix: ' MK', prefix: '' },
          { label: 'Reactor GW', value: 3000, suffix: '+', prefix: '' },
          { label: 'Rating', value: 98, suffix: '%', prefix: '' },
        ].map(({ label, value, suffix, prefix }) => (
          <div key={label} className="space-y-1">
            <div className="font-orbitron text-lg font-black text-white">
              {prefix}
              <AnimatedCounter to={value} suffix={suffix} />
            </div>
            <div className="font-rajdhani text-[10px] text-white/40 tracking-[0.15em] font-bold uppercase">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
