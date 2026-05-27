import { useState } from 'react';
import { ChevronDown, Menu, X, User } from 'lucide-react'; // Swapped ShoppingBag to User icon for a profile feel
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Re-themed navbar categories for a professional developer profile
  const navItems = ['Projects', 'About', 'Tech Stack', 'Contact'];

  // Clean, high-tech content mapping for your project categories and portfolio data
  const dropdownContent = {
    Projects: ['Web & Mobile Apps', 'Full-Stack Systems', 'API Integrations', 'Open Source'],
    About: ['Developer Profile', 'Academic Background', 'Certifications', 'Experience'],
    'Tech Stack': ['Frontend Engine', 'Backend Systems', 'Database Architecture', 'DevOps Tools'],
    Contact: ['Secure Channel', 'GitHub Vault', 'LinkedIn Node', 'Encrypted Email'],
  };

  const toggleDropdown = (item) => {
    if (activeDropdown === item) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(item);
    }
  };

  return (
    <nav className="relative z-50 flex justify-between items-center py-6 lg:py-8 select-none">
      {/* Logo — Far Left */}
      <motion.div
        className="flex items-center cursor-pointer group"
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{
          scale: 1.08,
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Stark Industries Arc Reactor Core Logo Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="w-10 h-10 md:w-11 md:h-11 fill-none stroke-arc-cyan transition-all duration-500 group-hover:rotate-90 group-hover:scale-105"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.9))',
          }}
        >
          {/* Outer Heavy Circular Reactor Shell */}
          <circle cx="32" cy="32" r="28" stroke="#00f0ff" strokeWidth="2" opacity="0.9" />

          {/* Inner ring mechanical segments */}
          <circle cx="32" cy="32" r="23" stroke="#00f0ff" strokeWidth="1" strokeDasharray="3, 2" opacity="0.6" />

          {/* Concentric brass/gold accent ring */}
          <circle cx="32" cy="32" r="8" stroke="#d4af37" strokeWidth="1" opacity="0.5" />

          {/* Inverted Triangular Reactor Energy Slots */}
          <polygon points="18,20 46,20 32,44" stroke="#00f0ff" strokeWidth="2.5" strokeLinejoin="round" opacity="0.95" />
          <polygon points="22,22 42,22 32,39" stroke="#00f0ff" strokeWidth="1.2" strokeLinejoin="round" opacity="0.8" />

          {/* Central Triangular Core Node */}
          <polygon points="27,24 37,24 32,33" fill="#00f0ff" stroke="#00f0ff" strokeWidth="0.8" opacity="0.95" />

          {/* Gold Heavy Coupling Spokes */}
          <line x1="18" y1="20" x2="10" y2="12" stroke="#d4af37" strokeWidth="2.2" opacity="0.9" />
          <line x1="46" y1="20" x2="54" y2="12" stroke="#d4af37" strokeWidth="2.2" opacity="0.9" />
          <line x1="32" y1="44" x2="32" y2="58" stroke="#d4af37" strokeWidth="2.2" opacity="0.9" />

          {/* Core White Light Emitter */}
          <circle cx="32" cy="32" r="3.5" fill="#ffffff" />
        </svg>
        <div className="ml-2.5 hidden sm:block">
          <div className="font-orbitron text-xs font-black tracking-[0.25em] text-white">STARK</div>
          <div className="font-rajdhani text-[9px] tracking-[0.35em] text-stark-gold font-bold">INDUSTRIES</div>
        </div>
      </motion.div>

      {/* Desktop Nav Links — Center */}
      <div className="hidden md:flex space-x-8 lg:space-x-10 text-xs font-bold tracking-[0.15em] uppercase font-orbitron">
        {navItems.map((item, i) => (
          <div
            key={item}
            className="relative group"
            onMouseEnter={() => setActiveDropdown(item)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <a
              href="#"
              className="flex items-center text-white/80 hover:text-white transition-all duration-300 py-2"
            >
              {item}
              <ChevronDown className="w-3.5 h-3.5 ml-1 group-hover:rotate-180 transition-transform duration-300 text-stark-gold" />
            </a>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {activeDropdown === item && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-52 rounded-xl overflow-hidden border border-white/10 shadow-2xl z-50 p-2 bg-black/60 backdrop-blur-md"
                >
                  {dropdownContent[item].map((subItem) => (
                    <a
                      key={subItem}
                      href="#"
                      className="block px-4 py-2.5 text-[11px] font-semibold text-white/70 hover:text-arc-cyan hover:bg-white/[0.04] rounded-lg transition-all duration-200"
                    >
                      {subItem}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Right Actions — Far Right */}
      <div className="flex items-center space-x-4 lg:space-x-6">
        {/* Profile Button — Updated to VIEW CV / RESUME vibe */}
        <motion.a
          href="#"
          className="hidden sm:flex items-center gap-2 rounded-full px-6 py-2.5 font-bold uppercase tracking-wider text-[11px] bg-white text-black shadow-lg cursor-pointer hover:bg-arc-cyan hover:text-black transition-colors duration-300 font-orbitron"
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 20px rgba(0,240,255,0.4)',
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 3,
            }}
          >
            <User className="w-3.5 h-3.5" />
          </motion.span>
          VIEW RESUME
        </motion.a>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white/70 hover:text-white p-2 transition-all duration-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-arc-cyan" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 left-0 right-0 z-50 rounded-2xl p-6 md:hidden bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            <div className="flex flex-col space-y-3 font-orbitron">
              {navItems.map((item) => (
                <div key={item} className="space-y-1">
                  <button
                    onClick={() => toggleDropdown(item)}
                    className="w-full flex justify-between items-center text-white/80 hover:text-white text-xs uppercase tracking-wider font-bold py-2.5 border-b border-white/5"
                  >
                    {item}
                    <ChevronDown className={`w-4 h-4 text-stark-gold transition-transform duration-300 ${activeDropdown === item ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDropdown === item && (
                    <div className="pl-4 py-2 space-y-2 bg-white/[0.02] rounded-lg">
                      {dropdownContent[item].map((subItem) => (
                        <a
                          key={subItem}
                          href="#"
                          className="block py-1.5 text-[11px] font-semibold text-white/50 hover:text-arc-cyan"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a
                href="#"
                className="flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold uppercase tracking-wider text-xs bg-white text-black w-full mt-4 hover:bg-arc-cyan hover:text-black transition-colors"
              >
                <User className="w-4 h-4" />
                VIEW RESUME
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;