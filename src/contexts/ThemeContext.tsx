import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  isTransitioning: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Check if user has previously set a preference or use system preference
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme !== null) {
      return savedTheme === "true";
    }
    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // State to track if theme is currently transitioning
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Update localStorage when dark mode changes
    localStorage.setItem("darkMode", darkMode.toString());

    // Update document class for Tailwind dark mode
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    // Set transitioning state
    setIsTransitioning(true);

    // Apply theme change after a short delay
    setTimeout(() => {
      setDarkMode((prev) => !prev);

      // Allow time for transitions to complete
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 50);
  };

  return (
    <ThemeContext.Provider
      value={{ darkMode, toggleDarkMode, isTransitioning }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
