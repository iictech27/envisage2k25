/**
 * utils.ts
 *
 * This file contains utility functions for working with the theme.
 * These functions help maintain consistent styling across the application.
 */

import theme from "./theme";

/**
 * Creates a CSS variable string from a theme value
 * @param value - The theme value to convert to a CSS variable
 * @returns The CSS variable string
 */
export const cssVar = (value: string): string => `var(--${value})`;

/**
 * Creates a responsive style object based on breakpoints
 * @param property - The CSS property to set
 * @param values - The values for each breakpoint
 * @returns An object with responsive styles
 */
export const responsive = (
  property: string,
  values: { [key: string]: string | number },
): { [key: string]: any } => {
  const result: { [key: string]: any } = {};

  Object.entries(values).forEach(([breakpoint, value]) => {
    if (breakpoint === "base") {
      result[property] = value;
    } else if (breakpoint in theme.breakpoints) {
      const breakpointKey = breakpoint as keyof typeof theme.breakpoints;
      result[`@media (min-width: ${theme.breakpoints[breakpointKey]})`] = {
        [property]: value,
      };
    }
  });

  return result;
};

/**
 * Creates a glass effect style object
 * @param intensity - The intensity of the glass effect ('light', 'medium', or 'strong')
 * @param blurAmount - The amount of blur ('sm', 'md', or 'lg')
 * @returns An object with glass effect styles
 */
export const glassEffect = (
  intensity: "light" | "medium" | "strong" = "medium",
  blurAmount: "sm" | "md" | "lg" = "md",
): { [key: string]: string } => {
  return {
    backgroundColor: theme.effects.glassmorphism[intensity],
    backdropFilter: `blur(${theme.effects.glassmorphism.blur[blurAmount]})`,
    WebkitBackdropFilter: `blur(${theme.effects.glassmorphism.blur[blurAmount]})`,
  };
};

/**
 * Creates a neon text effect style object
 * @param color - The color of the neon effect (default: theme.colors.neon.main)
 * @param intensity - The intensity of the neon effect ('sm', 'md', or 'lg')
 * @returns An object with neon text effect styles
 */
export const neonTextEffect = (
  color: string = theme.colors.neon.main,
  intensity: "sm" | "md" | "lg" = "md",
): { [key: string]: string } => {
  return {
    color: color,
    textShadow: theme.shadows.neon[intensity],
  };
};

/**
 * Creates a neon border effect style object
 * @param color - The color of the neon effect (default: theme.colors.neon.main)
 * @param intensity - The intensity of the neon effect ('sm', 'md', or 'lg')
 * @param width - The width of the border
 * @returns An object with neon border effect styles
 */
export const neonBorderEffect = (
  color: string = theme.colors.neon.main,
  intensity: "sm" | "md" | "lg" = "md",
  width: string = "2px",
): { [key: string]: string } => {
  return {
    border: `${width} solid ${color}`,
    boxShadow: theme.shadows.neon[intensity],
  };
};

/**
 * Creates a gradient text effect style object
 * @param gradient - The gradient to use (default: theme.gradients.neon)
 * @returns An object with gradient text effect styles
 */
export const gradientTextEffect = (
  gradient: string = theme.gradients.neon,
): { [key: string]: string } => {
  return {
    background: gradient,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textFillColor: "transparent",
  };
};

/**
 * Creates a truncate text style object
 * @param lines - The number of lines to show before truncating (default: 1)
 * @returns An object with truncate text styles
 */
export const truncateText = (
  lines: number = 1,
): { [key: string]: string | number } => {
  if (lines === 1) {
    return {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    };
  }

  return {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical",
  };
};

/**
 * Creates a grid background style object
 * @param size - The size of the grid cells (default: theme.effects.grid.size)
 * @returns An object with grid background styles
 */
export const gridBackground = (
  size: string = theme.effects.grid.size,
): { [key: string]: string } => {
  return {
    backgroundImage: theme.effects.grid.background,
    backgroundSize: `${size} ${size}`,
  };
};

/**
 * Creates a style object for a cyber button
 * @returns An object with cyber button styles
 */
export const cyberButtonStyle = (): { [key: string]: any } => {
  return {
    backgroundColor: theme.colors.dark.purple,
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily.cyber,
    padding: `${theme.spacing["2"]} ${theme.spacing["6"]}`,
    borderRadius: theme.borders.radius.md,
    border: `2px solid ${theme.colors.neon.main}`,
    transition: `all ${theme.animations.duration.fast}`,
    "&:hover": {
      backgroundColor: theme.colors.accent.main,
      boxShadow: `0 0 15px rgba(124, 58, 237, 0.8)`,
    },
  };
};

/**
 * Creates a style object for a glass card
 * @returns An object with glass card styles
 */
export const glassCardStyle = (): { [key: string]: string } => {
  return {
    backgroundColor: "rgba(30, 41, 59, 0.2)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderRadius: theme.borders.radius["2xl"],
    border: `1px solid ${theme.colors.border.light}`,
  };
};
