import React from "react";
import { useTheme } from "../styles/ThemeProvider";
import * as utils from "../styles/utils";

/**
 * ThemeDemo component
 *
 * This component demonstrates how to use the theme system.
 * It shows different ways to apply the theme:
 * 1. Using the theme object directly
 * 2. Using CSS variables
 * 3. Using utility functions
 */
const ThemeDemo: React.FC = () => {
  const theme = useTheme();

  // Example of inline styles using the theme object
  const headingStyle = {
    color: theme.colors.neon.main,
    fontFamily: theme.typography.fontFamily.cyber,
    fontSize: theme.typography.fontSize["3xl"],
    marginBottom: theme.spacing["6"],
  };

  // Example of using utility functions
  const neonTextStyle = utils.neonTextEffect();
  const glassCardStyle = utils.glassCardStyle();
  const gradientTextStyle = utils.gradientTextEffect();

  return (
    <div className="p-8">
      {/* Using inline styles with theme object */}
      <h1 style={headingStyle}>Theme System Demo</h1>

      {/* Using CSS variables in className */}
      <div className="mb-8">
        <h2 className="text-[var(--color-accent-main)] font-[var(--font-family-futuristic)] text-2xl mb-4">
          Using CSS Variables
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[var(--color-primary-light)] p-4 rounded-[var(--border-radius-lg)]">
            Primary Light
          </div>
          <div className="bg-[var(--color-primary-main)] p-4 rounded-[var(--border-radius-lg)]">
            Primary Main
          </div>
          <div className="bg-[var(--color-primary-dark)] p-4 rounded-[var(--border-radius-lg)]">
            Primary Dark
          </div>
        </div>
      </div>

      {/* Using utility functions */}
      <div className="mb-8">
        <h2 className="text-[var(--color-highlight-main)] font-[var(--font-family-futuristic)] text-2xl mb-4">
          Using Utility Functions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div style={neonTextStyle} className="p-4">
            Neon Text Effect
          </div>
          <div style={glassCardStyle} className="p-4">
            Glass Card Effect
          </div>
          <div style={gradientTextStyle} className="p-4 font-bold text-xl">
            Gradient Text Effect
          </div>
        </div>
      </div>

      {/* Using Tailwind with our custom theme */}
      <div className="mb-8">
        <h2 className="text-neon font-futuristic text-2xl mb-4">
          Using Tailwind Classes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="cyber-button">Cyber Button</button>
          <div className="glass-card p-4">Glass Card</div>
        </div>
      </div>

      {/* Typography showcase */}
      <div className="mb-8">
        <h2 className="text-[var(--color-neon-main)] font-[var(--font-family-futuristic)] text-2xl mb-4">
          Typography
        </h2>
        <div className="space-y-4">
          <p className="font-[var(--font-family-cyber)] text-[var(--font-size-xl)]">
            Cyber Font: Orbitron
          </p>
          <p className="font-[var(--font-family-futuristic)] text-[var(--font-size-xl)]">
            Futuristic Font: Rajdhani
          </p>
          <p className="font-[var(--font-family-digital)] text-[var(--font-size-xl)]">
            Digital Font: Share Tech Mono
          </p>
        </div>
      </div>

      {/* Color palette showcase */}
      <div>
        <h2 className="text-[var(--color-neon-main)] font-[var(--font-family-futuristic)] text-2xl mb-4">
          Color Palette
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(theme.colors).map(([category, colors]) => {
            if (typeof colors === "object") {
              return Object.entries(colors).map(([shade, color]) => (
                <div
                  key={`${category}-${shade}`}
                  className="p-4 rounded-lg text-center"
                  style={{ backgroundColor: color as string, color: "#fff" }}
                >
                  {category}-{shade}
                </div>
              ));
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default ThemeDemo;
