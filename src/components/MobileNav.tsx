import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const MobileNav: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Mobile navigation items with their icons, paths, and labels
  const navItems = [
    {
      id: "home",
      label: "Home",
      path: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      id: "search",
      label: "Search",
      path: "/search",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
    },
    {
      id: "movies",
      label: "Movies",
      path: "/movies",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
          />
        </svg>
      ),
    },
    {
      id: "profile",
      label: "Profile",
      path: "/myspace",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
  ];

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-[#0f0f10] border-t border-gray-800 sm:hidden z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              currentPath === item.path
                ? "text-blue-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <div className="relative">
              {item.icon}
              {currentPath === item.path && (
                <motion.div
                  className="absolute -inset-1 bg-blue-500/10 rounded-full"
                  layoutId="mobileNavHighlight"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </div>
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default MobileNav;
