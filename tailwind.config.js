/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './*.html',
    './src/**/*.js',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.25rem', // 20px
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px', // Custom container width
      },
    },
    extend: {
      colors: {
        // primary: '#0ebd66',
        // primary: '#30819c',
        // primary: '#2B59C3',
        primary: '#0CCE6B',
        secondary: '#021936',
        textColor: '#6A6A6A',
        headingColor: '#021936',
        lightGray: '#f8f9fa',
        borderColorCustom: '#e9ecef',
        'top-bar-bg': '#f5f5f5',
        'top-bar-text': '#555',
        'nav-link-hover-bg': '#e9ecef',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        DEFAULT: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 25px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        DEFAULT: '8px', // Corresponds to --border-radius
        lg: '8px',
        md: '6px',
        sm: '4px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fadeIn 0.6s ease-in',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

// 1. https://bracketweb.com/laboixwp/
// 2. https://bracketweb.com/laboixwp/home-two/
// 3. https://bracketweb.com/laboixwp/home-three/
// 4. https://demo.templatemonster.com/es/demo/185423.html
// 5. https://demo.themedraft.net/wp/labtory/?storefront=envato-elements