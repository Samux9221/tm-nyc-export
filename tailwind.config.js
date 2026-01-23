/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#DC2626',    // Vermelho forte
          green: '#16A34A',  // Verde WhatsApp/CTA
          dark: '#0a0a0a',   // Fundo quase preto
          gray: '#171717',   // Fundo secundário
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}