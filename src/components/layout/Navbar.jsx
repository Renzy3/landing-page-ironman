import { useState } from 'react';
import { ChevronDown, Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = ['Games', 'News', 'Blog', 'Services'];

  const dropdownContent = {
    Games: ['Iron Man: Stark Tech', 'Armor Customizer', 'Vault Access', 'Legacy mode'],
    News: ['Stark Updates', 'Patch Notes', 'Press Releases', 'Media Kit'],
    Blog: ['Dev Insights', 'Design Team', 'Technical Specs', 'Archives'],
    Services: ['Arc Grid', 'Stark Profile', 'Support Hub', 'API Portal'],
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
        {/* Stark Industries Hexagonal Logo Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="w-10 h-10 md:w-11 md:h-11 fill-white transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]"
          style={{
            filter: 'drop-shadow(0 0 6px rgba(212,175,55,0.4))',
          }}
        >
          {/* Stark Industries Hex Reactor Shell */}
          <path d="M32,7c11.589,0,20,8.832,20,21c0,13.135-8.921,29-20,29S12,41.135,12,28C12,15.832,20.411,7,32,7z M29.423,31.474c0.236-0.708-0.084-1.482-0.752-1.816c-2.931-1.466-8.267-5.942-9.061-12.901C17.319,19.67,16,23.53,16,28c0,4.237,1.117,8.91,2.969,13.059C19.609,41.336,20.285,41.5,21,41.5C25.836,41.5,28.865,33.148,29.423,31.474z M45.031,41.059C46.883,36.91,48,32.237,48,28c0-4.47-1.319-8.33-3.61-11.242c-0.794,6.958-6.13,11.435-9.061,12.901c-0.668,0.334-0.988,1.108-0.752,1.816C35.135,33.148,38.164,41.5,43,41.5C43.715,41.5,44.391,41.336,45.031,41.059z" />
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
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 rounded-xl overflow-hidden glass-panel border border-white/10 shadow-2xl z-50 p-2 bg-black/60 backdrop-blur-md"
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
        {/* Store Profile Button */}
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
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 3,
            }}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </motion.span>
          STARK PROFILE
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
            className="absolute top-20 left-0 right-0 z-50 glass-panel rounded-2xl p-6 md:hidden bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl"
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
                <ShoppingBag className="w-4 h-4" />
                STARK PROFILE
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
