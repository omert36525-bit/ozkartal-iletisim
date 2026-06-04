/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:      '#0D0D1A',
          surface: '#F8F8FF',
          cyan:    '#00D4FF',
          purple:  '#7C3AED',
          dark:    '#F0F0F0',
          light:   '#111111',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body:    ['Geist', 'sans-serif'],
        mono:    ['Geist Mono', 'monospace'],
      },
      letterSpacing: {
        tight: '-0.03em',
      },
      lineHeight: {
        body: '1.7',
      },
    },
  },
  plugins: [],
};
