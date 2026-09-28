/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#05050A',
        cosmic: {
          900: '#070714',
          800: '#0D0E24',
          700: '#15173B',
        },
        neon: {
          cyan: '#00F0FF',
          magenta: '#FF007A',
          purple: '#A855F7',
          violet: '#7928CA',
          lime: '#00FF9D',
          amber: '#FFB800',
        }
      },
      fontFamily: {
        sans: ['"Outfit"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 35px -5px rgba(0, 240, 255, 0.45)',
        'glow-magenta': '0 0 35px -5px rgba(255, 0, 122, 0.45)',
        'glow-purple': '0 0 35px -5px rgba(168, 85, 247, 0.45)',
        'orb': '0 0 90px 20px rgba(0, 240, 255, 0.25), inset 0 0 60px 10px rgba(255, 0, 122, 0.25)',
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'reverse-spin': 'reverse-spin 35s linear infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
      },
      keyframes: {
        'reverse-spin': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        }
      }
    },
  },
  plugins: [],
}
