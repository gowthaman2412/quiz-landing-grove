/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeOut: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out",
        fadeOut: "fadeOut 0.3s ease-out",
      },
      appearance: ["none"],
      backgroundImage: {
        "gold-pattern": "url('/Assets/icons/Gold Card Shining Element.svg')",
        "fire-icon": "url('/Assets/icons/Fire icon Blurred.svg')",
        "diamond-icon": "url('/Assets/icons/diamond Blurred.svg')",
        "badge-icon": "url('/Assets/icons/Badge Blurred.svg')",
      },
      colors: {
        "accent-blue": "rgba(15, 98, 254)",
      },
    },
  },

  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-security-disc": {
          "-webkit-text-security": "disc",
          "text-security": "disc",
        },
        ".scrollbar-hidden::-webkit-scrollbar": {
          display: "none",
        },
        ".scrollbar-hidden": {
          scrollbarWidth: "none",
          "-ms-overflow-style": "none",
        },
      });
    },
  ],
};
