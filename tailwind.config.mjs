/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,yaml,yml}'],
  theme: {
    extend: {
      colors: {
        pptl: {
          blue: {
            DEFAULT: '#0C53A4', // Primary brand blue
            primary: '#0C53A4',
            deep: '#213C94',    // Deep structural navy/blue
            50: '#f0f5fc',
            100: '#e1ebf9',
            200: '#c3d7f3',
            600: '#0C53A4',
            700: '#213C94',
            800: '#172a6b',
            900: '#0f1c48',
          },
          red: {
            DEFAULT: '#D81A21', // Signal red (used sparingly for decisive actions)
            signal: '#D81A21',
            hover: '#b5151c',
            50: '#fdf2f2',
            100: '#fae2e2',
            700: '#b5151c',
            800: '#941117',
          },
          gold: {
            DEFAULT: '#FAB218', // Industrial gold highlight
            50: '#fef9e8',
            100: '#fef1c8',
            400: '#fbc54b',
            500: '#FAB218',
            600: '#d99408',
          },
          graphite: '#070707',
          white: '#F6F6F6',
          steel: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
            950: '#070707',
          },
        },
      },
      fontFamily: {
        sans: [
          '"Source Sans 3"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
        condensed: [
          '"Archivo"',
          '"Arial Black"',
          'sans-serif',
        ],
        heading: [
          '"Archivo"',
          '"Arial Black"',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
