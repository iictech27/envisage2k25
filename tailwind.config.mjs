/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
        secondary: "#1e293b",
        accent: "#7c3aed",
        highlight: "#10b981",
        neon: "#22d3ee",
        darkPurple: "#4c1d95",
        darkBlue: "#1e3a8a",
        darkCyan: "#155e75",
      },
      fontFamily: {
        cyber: ["'Orbitron'", "sans-serif"],
        futuristic: ["'Rajdhani'", "sans-serif"],
        digital: ["'Share Tech Mono'", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { textShadow: "0 0 5px #22d3ee, 0 0 10px #22d3ee" },
          "100%": {
            textShadow: "0 0 20px #22d3ee, 0 0 30px #22d3ee, 0 0 40px #22d3ee",
          },
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
