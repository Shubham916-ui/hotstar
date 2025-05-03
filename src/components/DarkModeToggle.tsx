import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const DarkModeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode, isTransitioning } = useTheme();

  // Spring animation configuration
  const springConfig = {
    type: "spring",
    stiffness: 100,
    damping: 15,
    duration: 0.7,
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`relative p-1 rounded-full h-8 w-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-500 ${
        isTransitioning ? "pointer-events-none" : ""
      }`}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      disabled={isTransitioning}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: darkMode ? 45 : 0,
          scale: isTransitioning ? 0.8 : 1,
        }}
        transition={springConfig}
        className="relative"
      >
        {/* Sun Icon */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-yellow-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          initial={false}
          animate={{
            opacity: darkMode ? 0 : 1,
            y: darkMode ? -10 : 0,
            rotate: darkMode ? 90 : 0,
          }}
          transition={{ ...springConfig, duration: 0.5 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </motion.svg>

        {/* Moon Icon */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 absolute top-0 left-0 text-blue-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          initial={false}
          animate={{
            opacity: darkMode ? 1 : 0,
            y: darkMode ? 0 : 10,
            rotate: darkMode ? 0 : -90,
          }}
          transition={{ ...springConfig, duration: 0.5 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </motion.svg>
      </motion.div>
    </button>
  );
};

export default DarkModeToggle;
