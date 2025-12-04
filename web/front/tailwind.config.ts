import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          100: 'rgb(184 198 188)',
          200: 'rgb(122 154 130)',
          300: 'rgb(76 114 80)',
          400: 'rgb(48 85 54)',
          500: 'rgb(30 56 35)',
        },
        // Gray colors
        gray: {
          50: 'rgb(253 253 253)',
          100: 'rgb(244 246 244)',
          200: 'rgb(232 236 232)',
          300: 'rgb(218 223 217)',
          400: 'rgb(201 206 201)',
          500: 'rgb(154 158 154)',
          600: 'rgb(77 85 77)',
          700: 'rgb(52 60 52)',
          800: 'rgb(26 36 26)',
          900: 'rgb(4 6 4)',
        },
        // Status colors
        status: {
          error: 'rgb(172 55 71)',
          warning: 'rgb(240 173 61)',
          success: 'rgb(155 135 255)',
          info: 'rgb(58 110 165)',
        },
      },
      spacing: {
        0: '0px',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
      },
      fontFamily: {
        sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Book Antiqua', 'Palatino', 'Palatino Linotype', 'serif'],
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease forwards',
        'fade-out': 'fade-out 0.5s ease forwards',
      },
    },
  },
  plugins: [],
}

export default config
