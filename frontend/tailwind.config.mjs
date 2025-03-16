/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0f172a",
          light: "#1e293b",
          dark: "#0a101c",
        },
        secondary: {
          DEFAULT: "#1e293b",
          light: "#334155",
          dark: "#0f172a",
        },
        accent: {
          DEFAULT: "#7c3aed",
          light: "#8b5cf6",
          dark: "#6d28d9",
        },
        highlight: {
          DEFAULT: "#10b981",
          light: "#34d399",
          dark: "#059669",
        },
        neon: {
          DEFAULT: "#22d3ee",
          light: "#67e8f9",
          dark: "#06b6d4",
        },
        darkPurple: "#4c1d95",
        darkBlue: "#1e3a8a",
        darkCyan: "#155e75",
        text: {
          primary: "rgba(255, 255, 255, 0.87)",
          secondary: "rgba(255, 255, 255, 0.6)",
          disabled: "rgba(255, 255, 255, 0.38)",
        },
        status: {
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
          info: "#3b82f6",
        },
        background: {
          DEFAULT: "#0f172a",
          paper: "#1e293b",
          elevated: "#334155",
        },
        border: {
          light: "rgba(255, 255, 255, 0.12)",
          DEFAULT: "rgba(255, 255, 255, 0.23)",
          dark: "rgba(255, 255, 255, 0.38)",
        },
      },
      fontFamily: {
        cyber: ["'Orbitron'", "sans-serif"],
        rovelink: ["'Rovelink'", "'Orbitron'", "sans-serif"],
        karnivor: ["'Karnivor'", "'Orbitron'", "sans-serif"],
        futuristic: ["'Rajdhani'", "sans-serif"],
        digital: ["'Share Tech Mono'", "monospace"],
      },
      fontSize: {
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "1.875rem", // 30px
        "4xl": "2.25rem", // 36px
        "5xl": "3rem", // 48px
        "6xl": "3.75rem", // 60px
        "7xl": "4.5rem", // 72px
        "8xl": "6rem", // 96px
        "9xl": "8rem", // 128px
      },
      lineHeight: {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },
      borderRadius: {
        none: "0",
        sm: "0.125rem", // 2px
        DEFAULT: "0.25rem", // 4px
        md: "0.375rem", // 6px
        lg: "0.5rem", // 8px
        xl: "0.75rem", // 12px
        "2xl": "1rem", // 16px
        "3xl": "1.5rem", // 24px
        full: "9999px",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        none: "none",
        "neon-sm": "0 0 5px rgba(34, 211, 238, 0.5)",
        "neon-md": "0 0 10px rgba(34, 211, 238, 0.7)",
        "neon-lg": "0 0 20px rgba(34, 211, 238, 0.9)",
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
      transitionDuration: {
        fastest: "100ms",
        faster: "200ms",
        fast: "300ms",
        normal: "400ms",
        slow: "500ms",
        slower: "600ms",
        slowest: "1000ms",
      },
      transitionTimingFunction: {
        "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
        "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
        "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      backgroundImage: {
        "gradient-metaverse":
          "linear-gradient(to right, #4c1d95, #1e3a8a, #155e75)",
        "gradient-neon": "linear-gradient(to right, #22d3ee, #8b5cf6)",
        "gradient-cyber": "linear-gradient(to right, #7c3aed, #3b82f6)",
        "gradient-futuristic": "linear-gradient(to bottom, #0f172a, #1e293b)",
        "grid-pattern":
          "linear-gradient(rgba(30, 41, 59, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 41, 59, 0.5) 1px, transparent 1px)",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
