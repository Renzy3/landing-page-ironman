/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'arc-cyan': '#00f0ff',
        'arc-cyan-dim': '#38bdf8',
        'stark-gold': '#d4af37',
        'stark-gold-light': '#f0d060',
        'crimson-deep': '#4a0e17',
        'crimson-mid': '#24050a',
        'crimson-dark': '#0a0104',
        'crimson-accent': '#8b1a2a',
        'hud-bg': 'rgba(0, 240, 255, 0.05)',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'rajdhani': ['Rajdhani', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'stark-gradient': 'linear-gradient(135deg, #4a0e17 0%, #24050a 50%, #0a0104 100%)',
        'gold-metallic': 'linear-gradient(135deg, #b8960c 0%, #d4af37 30%, #f0d060 50%, #d4af37 70%, #b8960c 100%)',
        'cyan-glow': 'linear-gradient(135deg, #00b4cc 0%, #00f0ff 50%, #38bdf8 100%)',
        'crimson-glow': 'linear-gradient(135deg, #8b1a2a 0%, #c0392b 50%, #8b1a2a 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'scan-line': 'scanLine 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'preloader-out': 'preloaderOut 0.8s ease-in-out forwards',
        'reactor-spin': 'reactorSpin 4s linear infinite',
        'hud-flicker': 'hudFlicker 4s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 40px #00f0ff' },
          '50%': { boxShadow: '0 0 20px #00f0ff, 0 0 40px #00f0ff, 0 0 80px #00f0ff' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        preloaderOut: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-100%)' },
        },
        reactorSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        hudFlicker: {
          '0%, 95%, 100%': { opacity: '1' },
          '96%': { opacity: '0.6' },
          '97%': { opacity: '1' },
          '98%': { opacity: '0.7' },
          '99%': { opacity: '1' },
        },
      },
      boxShadow: {
        'cyan-glow': '0 0 15px rgba(0, 240, 255, 0.5), 0 0 30px rgba(0, 240, 255, 0.3)',
        'cyan-glow-lg': '0 0 25px rgba(0, 240, 255, 0.7), 0 0 50px rgba(0, 240, 255, 0.4), 0 0 100px rgba(0, 240, 255, 0.2)',
        'gold-glow': '0 0 15px rgba(212, 175, 55, 0.5), 0 0 30px rgba(212, 175, 55, 0.3)',
        'crimson-glow': '0 0 15px rgba(139, 26, 42, 0.8), 0 0 30px rgba(192, 57, 43, 0.5)',
        'hud-panel': 'inset 0 1px 0 rgba(0, 240, 255, 0.1), 0 4px 24px rgba(0, 0, 0, 0.6)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
