import React, { createContext, useContext, ReactNode } from "react";
import theme from "./theme";
import "./variables.css";

// Create a context for the theme
const ThemeContext = createContext(theme);

// Custom hook to use the theme
export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * ThemeProvider component
 *
 * This component provides the theme to all child components.
 * It also includes the CSS variables defined in variables.css.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
