/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,yaml,yml}'],
  theme: {
    extend: {
      colors: {
        pptl: {
          blue: {
            50: '#eef4ff',
            100: '#dbe6fe',
            200: '#bfd3fe',
            300: '#93b8fd',
            400: '#6093fa',
            500: '#3b71f6',
            DEFAULT: '#21409a',
            600: '#21409a',
            700: '#1b357f',
            800: '#172a64',
            900: '#121e48',
            950: '#0a1028',
          },
          red: {
            50: '#fef2f2',
            100: '#fee2e2',
            500: '#ef4444',
            DEFAULT: '#df1a23',
            600: '#df1a23',
            700: '#b9121a',
            800: '#991b1b',
          },
          amber: {
            50: '#fffbeb',
            100: '#fef3c7',
            400: '#fbbf24',
            DEFAULT: '#ffc010',
            500: '#ffc010',
            600: '#d97706',
          },
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
            950: '#080d1a',
          }
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
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

