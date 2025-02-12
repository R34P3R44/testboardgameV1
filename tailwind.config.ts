/* eslint-disable @typescript-eslint/no-require-imports */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        enemyDice: "#8a2422",
        friendlyDice: "#183f92",
      },
      animation: {
        'bounce-top': 'bounceTop 3s ease-in-out',  
      },
      keyframes: {
        bounceTop: {
          '0%': { transform: 'translateY(-500px)' },  // Start 50px above the screen
          '30%': { transform: 'translateY(10px)' },  // Move slightly down
          '50%': { transform: 'translateY(-5px)' },  // Bounce slightly up
          '70%': { transform: 'translateY(5px)' },   // Bounce slightly down
          '100%': { transform: 'translateY(-3000px)' },    // End at the normal position (top of the screen)
        },
      },
      screens: {
        '2xl': '1536px',  // Default
        '3xl': '1920px',  // Custom for larger screens
        '4k': '3840px',   // Custom breakpoint for 4K resolution
      },
    },
  },
  plugins: [require('daisyui'), require('tailwind-scrollbar')],
  daisyui: {
    themes: ["light"], // Enables both light and dark themes
  },
};
