import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { ReviewSidebar } from './components/sections/ReviewSidebar';
import CharacterMorph from './components/sections/CharacterMorph';
import { Footer } from './components/layout/Footer';
import { Preloader } from './components/Preloader';

// Import Three.js globally for Vanta
import * as THREE from 'three';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);
  const ready = !loading;
  
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  // Initialize Vanta Waves background dynamically
  useEffect(() => {
    let effect = null;

    const initVanta = async () => {
      try {
        window.THREE = THREE;
        const WAVES = (await import('vanta/dist/vanta.waves.min')).default;

        if (vantaRef.current) {
          effect = WAVES({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x3d0d12,           // Base dark maroon red
            shininess: 35.00,          // Cybernetic metallic reflection
            waveHeight: 12.00,         // Wave amplitude
            waveSpeed: 0.50,           // Gentle idle animation speed
            zoom: 0.95
          });
          setVantaEffect(effect);
        }
      } catch (err) {
        console.error("Vanta initialization failed:", err);
      }
    };

    if (ready) {
      initVanta();
    }

    return () => {
      if (effect) {
        effect.destroy();
      }
    };
  }, [ready]);

  // Prevent background scroll while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <>
      {/* Preloader Overlay */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* ====== BACKGROUND LAYERS ====== */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-black">
        {/* Vanta Waves background container */}
        <div 
          ref={vantaRef}
          className="absolute inset-0 w-full h-full opacity-90 transition-opacity duration-1000"
          style={{ backgroundColor: '#140507' }}
        />

        {/* Subtle holographic grid overlay */}
        <div className="absolute inset-0 stark-grid-bg opacity-[0.15] pointer-events-none z-[1]" />

        {/* Subtle stardust noise overlay */}
        <div className="absolute inset-0 bg-spider-texture opacity-[0.03] pointer-events-none mix-blend-overlay z-[1]" />

        {/* Dark vignette gradient overlay for text readability */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_35%,rgba(0,0,0,0.7)_100%] pointer-events-none z-[2]" />

        {/* Extra left-side readability gradient for typography */}
        <div className="absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none z-[2] hidden lg:block" />

        {/* Ambient top-left cyber-glow */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-red-800/20 blur-[120px] pointer-events-none z-[3] animate-hero-glow" />

        {/* Ambient bottom-right cyber-cyan glow */}
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-arc-cyan/5 blur-[120px] pointer-events-none z-[3]" />
      </div>

      {/* ====== LAYER 1: FOREGROUND INTERACTIVE CHARACTER (Majestic Scale) ====== */}
      {ready && (
        <div 
          className="fixed bottom-[-8vh] left-1/2 -translate-x-1/2 z-10 flex justify-center items-end pointer-events-auto h-[115vh] w-[450px] md:w-[650px] lg:w-[750px] scale-[1.62] origin-bottom"
        >
          <CharacterMorph />
        </div>
      )}

      {/* ====== LAYER 2: UI OVERLAY (Navbar, Typography, Ratings, Buttons) ====== */}
      <div 
        className="relative z-20 min-h-screen flex flex-col justify-between max-w-7xl mx-auto px-6 lg:px-8 pointer-events-none"
        style={{
          opacity: ready ? 1 : 0,
          transform: ready ? 'translateY(0)' : 'translateY(15px)',
          transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
        }}
      >
        {/* Navbar */}
        <div className="pointer-events-auto">
          <Navbar />
        </div>

        {/* Main UI layout columns */}
        <main className="grow grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative py-6 lg:py-0 pointer-events-none">
          
          {/* Left Column — Typography & CTA */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-center z-20 order-2 lg:order-1 pointer-events-auto"
            initial={{ opacity: 0, x: -80 }}
            animate={ready ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
          >
            <Hero />
          </motion.div>

          {/* Spacer Column in middle — allows transparent view to background CharacterMorph */}
          <div className="lg:col-span-4 order-1 lg:order-2 pointer-events-none" />

          {/* Right Column — HUD Review Sidebar */}
          <motion.div
            className="lg:col-span-3 flex flex-col justify-center z-20 order-3 pointer-events-auto"
            initial={{ opacity: 0, x: 80 }}
            animate={ready ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
          >
            <ReviewSidebar />
          </motion.div>
        </main>

        {/* Footer */}
        <div className="pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
          >
            <Footer />
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default App;
