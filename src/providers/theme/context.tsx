import { PropsWithChildren, createContext, useContext, useMemo, useState } from "react";
import { ThemeContextType, ThemeName } from "./types";
import useChangeListener from "../../hooks/useChangeListener";
import { setCSSVariable } from "./utils";
import { THEMES } from "./constants";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>("default");

  const isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  const value = useMemo<ThemeContextType>(
    () => ({
      selectedTheme,
      setSelectedTheme,
    }),
    [selectedTheme]
  );

  useChangeListener(() => {
    const selectedThemeObject = THEMES[isDarkMode ? "dark" : "light"][selectedTheme];

    Object.entries(selectedThemeObject).forEach(([key, value]) => {
      setCSSVariable(key, value);
    });
  }, [selectedTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export default ThemeProvider;
