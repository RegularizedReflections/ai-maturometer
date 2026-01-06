/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // Blue 600
          hover: '#1d4ed8',   // Blue 700
        },
        secondary: {
          DEFAULT: '#6366f1', // Indigo 500
          hover: '#4f46e5',   // Indigo 600
        },
        neutral: {
          DEFAULT: '#334155', // Slate 700
          light: '#64748b',   // Slate 500
          dark: '#1e293b',    // Slate 800
        },
        success: '#22c55e',   // Green 500
        warning: '#f97316',   // Orange 500
        danger: '#dc2626',    // Red 600
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
