import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-gray': {
          100: '#FFFFFF',
          200: '#e0e1dd',
          600: '#161616',
          700: '#131313',
          900: '#111111'
        },
        
        'brand-blue': {
          600: '#778da9',
          700: '#415a77',
          800: '#1b263b',
          900: '#0d1b2a'
        },

        'brand-green': {
          100: '#5bba6f',
          200: '#3fa34d',
          300: '#2a9134',
          400: '#137547',
          500: '#054a29'
        }
      }
    }
  },
  plugins: [require('tailwind-scrollbar')],
}
export default config
