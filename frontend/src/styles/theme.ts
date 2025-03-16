/**
 * theme.ts
 *
 * This file contains all the centralized styling variables for the application.
 * Use this file to maintain consistent styling across the entire application.
 */

// COLORS
export const colors = {
  // Primary palette
  primary: {
    main: "#0f172a",
    light: "#1e293b",
    dark: "#0a101c",
  },

  // Secondary palette
  secondary: {
    main: "#1e293b",
    light: "#334155",
    dark: "#0f172a",
  },

  // Accent colors
  accent: {
    main: "#7c3aed",
    light: "#8b5cf6",
    dark: "#6d28d9",
  },

  // Highlight colors
  highlight: {
    main: "#10b981",
    light: "#34d399",
    dark: "#059669",
  },

  // Neon colors
  neon: {
    main: "#22d3ee",
    light: "#67e8f9",
    dark: "#06b6d4",
  },

  // Dark theme colors
  dark: {
    purple: "#4c1d95",
    blue: "#1e3a8a",
    cyan: "#155e75",
  },

  // Text colors
  text: {
    primary: "rgba(255, 255, 255, 0.87)",
    secondary: "rgba(255, 255, 255, 0.6)",
    disabled: "rgba(255, 255, 255, 0.38)",
  },

  // Status colors
  status: {
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },

  // Background colors
  background: {
    default: "#0f172a",
    paper: "#1e293b",
    elevated: "#334155",
  },

  // Border colors
  border: {
    light: "rgba(255, 255, 255, 0.12)",
    main: "rgba(255, 255, 255, 0.23)",
    dark: "rgba(255, 255, 255, 0.38)",
  },
};

// TYPOGRAPHY
export const typography = {
  // Font families
  fontFamily: {
    cyber: " 'Orbitron', sans-serif",
    rovelink: "Rovelink",
    karnivor: "'KARNOVOR', monospace",
    futuristic: "'Rajdhani', sans-serif",
    digital: "'Share Tech Mono', monospace",
    base: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',Poppins, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  },

  // Font weights
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Font sizes
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

  // Line heights
  lineHeight: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },

  // Letter spacing
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
};

// SPACING
export const spacing = {
  "0": "0",
  "0.5": "0.125rem", // 2px
  "1": "0.25rem", // 4px
  "1.5": "0.375rem", // 6px
  "2": "0.5rem", // 8px
  "2.5": "0.625rem", // 10px
  "3": "0.75rem", // 12px
  "3.5": "0.875rem", // 14px
  "4": "1rem", // 16px
  "5": "1.25rem", // 20px
  "6": "1.5rem", // 24px
  "7": "1.75rem", // 28px
  "8": "2rem", // 32px
  "9": "2.25rem", // 36px
  "10": "2.5rem", // 40px
  "11": "2.75rem", // 44px
  "12": "3rem", // 48px
  "14": "3.5rem", // 56px
  "16": "4rem", // 64px
  "20": "5rem", // 80px
  "24": "6rem", // 96px
  "28": "7rem", // 112px
  "32": "8rem", // 128px
  "36": "9rem", // 144px
  "40": "10rem", // 160px
  "44": "11rem", // 176px
  "48": "12rem", // 192px
  "52": "13rem", // 208px
  "56": "14rem", // 224px
  "60": "15rem", // 240px
  "64": "16rem", // 256px
  "72": "18rem", // 288px
  "80": "20rem", // 320px
  "96": "24rem", // 384px
};

// BORDERS
export const borders = {
  radius: {
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
  width: {
    "0": "0px",
    "1": "1px",
    "2": "2px",
    "4": "4px",
    "8": "8px",
  },
};

// SHADOWS
export const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  none: "none",

  // Custom neon shadows
  neon: {
    sm: "0 0 5px rgba(34, 211, 238, 0.5)",
    md: "0 0 10px rgba(34, 211, 238, 0.7)",
    lg: "0 0 20px rgba(34, 211, 238, 0.9)",
  },
};

// ANIMATIONS
export const animations = {
  duration: {
    fastest: "100ms",
    faster: "200ms",
    fast: "300ms",
    normal: "400ms",
    slow: "500ms",
    slower: "600ms",
    slowest: "1000ms",
  },

  easing: {
    linear: "linear",
    ease: "ease",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
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
    pulse: {
      "0%, 100%": { opacity: 1 },
      "50%": { opacity: 0.5 },
    },
  },

  animation: {
    "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    float: "float 6s ease-in-out infinite",
    glow: "glow 2s ease-in-out infinite alternate",
  },
};

// BREAKPOINTS
export const breakpoints = {
  xs: "0px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

// Z-INDEX
export const zIndex = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

// GRADIENTS
export const gradients = {
  metaverse: "linear-gradient(to right, #4c1d95, #1e3a8a, #155e75)",
  neon: "linear-gradient(to right, #22d3ee, #8b5cf6)",
  cyber: "linear-gradient(to right, #7c3aed, #3b82f6)",
  futuristic: "linear-gradient(to bottom, #0f172a, #1e293b)",
};

// EFFECTS
export const effects = {
  glassmorphism: {
    light: "rgba(255, 255, 255, 0.1)",
    medium: "rgba(255, 255, 255, 0.15)",
    strong: "rgba(255, 255, 255, 0.25)",
    blur: {
      sm: "4px",
      md: "8px",
      lg: "12px",
    },
  },

  grid: {
    background:
      "linear-gradient(rgba(30, 41, 59, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 41, 59, 0.5) 1px, transparent 1px)",
    size: "40px",
  },
};

// Export the entire theme
const theme = {
  colors,
  typography,
  spacing,
  borders,
  shadows,
  animations,
  breakpoints,
  zIndex,
  gradients,
  effects,
};

export default theme;
