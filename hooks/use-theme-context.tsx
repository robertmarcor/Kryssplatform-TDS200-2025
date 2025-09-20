import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme as useRNColorScheme } from "react-native";

type ColorScheme = "light" | "dark" | "system";
type ActualColorScheme = "light" | "dark";

interface ThemeContextType {
  colorScheme: ActualColorScheme;
  themePreference: ColorScheme;
  setThemePreference: (theme: ColorScheme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "@theme_preference";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useRNColorScheme() ?? "light";
  const [themePreference, setThemePreferenceState] = useState<ColorScheme>("system");
  const [isLoaded, setIsLoaded] = useState(false);

  // Determine actual color scheme based on preference
  const actualColorScheme: ActualColorScheme =
    themePreference === "system" ? systemColorScheme : themePreference;

  // Load theme preference from storage
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (stored && ["light", "dark", "system"].includes(stored)) {
          setThemePreferenceState(stored as ColorScheme);
        }
      } catch (error) {
        console.warn("Failed to load theme preference:", error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadThemePreference();
  }, []);

  // Save theme preference to storage
  const setThemePreference = async (theme: ColorScheme) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
      setThemePreferenceState(theme);
    } catch (error) {
      console.warn("Failed to save theme preference:", error);
    }
  };

  // Toggle between light and dark (ignoring system)
  const toggleTheme = () => {
    const newTheme = actualColorScheme === "light" ? "dark" : "light";
    setThemePreference(newTheme);
  };

  // Don't render children until theme is loaded
  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        colorScheme: actualColorScheme,
        themePreference,
        setThemePreference,
        toggleTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}

// Hook for backwards compatibility
export function useColorScheme(): ActualColorScheme {
  const { colorScheme } = useThemeContext();
  return colorScheme;
}
