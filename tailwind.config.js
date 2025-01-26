/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        zinc: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
        'apple-blue': '#007AFF',
        'apple-red': '#FF3B30',
        'apple-green': '#34C759',
        'border-color': '#A1A1AA80',
        light: {
          text: '#11181C',
          background: '#fff',
          tint: '#0a7ea4',
          icon: '#687076',
          tabIconDefault: '#687076',
          tabIconSelected: '#0a7ea4',
        },
        dark: {
          text: '#ECEDEE',
          background: '#151718',
          tint: '#fff',
          icon: '#9BA1A6',
          tabIconDefault: '#9BA1A6',
          tabIconSelected: '#fff',
        },
      },
    },
  },
  plugins: [],
}
