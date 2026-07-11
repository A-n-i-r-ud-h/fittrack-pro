/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#0B0D11',
          900: '#12151B',
          850: '#171B22',
          800: '#1D222B',
          700: '#2A303B',
          600: '#3D4552',
          400: '#7C8698',
          200: '#C4CAD4',
          50: '#F5F6F8'
        },
        mint: {
          400: '#4FF0B4',
          500: '#34E0A1',
          600: '#20C289'
        },
        coral: {
          400: '#FF8A7A',
          500: '#FF6B5B',
          600: '#F0503E'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(52,224,161,0.15), 0 8px 24px -8px rgba(52,224,161,0.25)'
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    }
  },
  plugins: []
}
