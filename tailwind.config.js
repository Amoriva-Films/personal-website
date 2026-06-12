/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:     '#F6F1EB',
        bg2:    '#EFE7DD',
        bg3:    '#E7DED3',
        'text-primary': '#1A1A1A',
        soft:   '#5E5148',
        brown:  '#3B2F2A',
        gold:   '#B79B72',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': 'clamp(56px, 7vw, 92px)',
        'h2':      'clamp(36px, 3.5vw, 56px)',
        'h3':      'clamp(22px, 2.2vw, 32px)',
      },
      lineHeight: {
        tight:    '0.98',
        editorial:'1.04',
        body:     '1.85',
      },
      letterSpacing: {
        widest2: '0.32em',
        widest3: '0.5em',
      },
    },
  },
  plugins: [],
};
