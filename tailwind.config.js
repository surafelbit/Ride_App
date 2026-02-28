// import type { Config } from 'tailwindcss';

// export default {
//   content: [
//     './app/**/*.{js,ts,jsx,tsx}',
//     './pages/**/*.{js,ts,jsx,tsx}',
//     './components/**/*.{js,ts,jsx,tsx}',
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [require('tailwindcss-animate')],
// } satisfies Config;
import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ← Add your custom animations here
      animation: {
        // Slower/more gentle pulse for the car icon
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',

        // Custom slower pings for the ripple effect around the icon
        'ping-slow': 'ping 4s cubic-bezier(0, 0, 0.2, 1) infinite',
        'ping-slower': 'ping 6s cubic-bezier(0, 0, 0.2, 1) infinite',

        // Progress bar sliding effect
        'progress': 'progress 3s ease-in-out infinite',
      },
      keyframes: {
        // We can override/extend the built-in ping if needed, but here we just use it
        // Custom progress bar sliding from left → right repeatedly
        progress: {
          '0%':   { transform: 'translateX(-100%)' },
          '50%':  { transform: 'translateX(300%)' },
          '100%': { transform: 'translateX(300%)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;