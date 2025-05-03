import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Sidebar menu item interface
interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const Sidebar: React.FC = () => {
  // State to track if sidebar is expanded (on hover)
  const [isExpanded, setIsExpanded] = useState(false);
  // State to track active menu item
  const [activeItem, setActiveItem] = useState("home");

  // Animation variants for the sidebar
  const sidebarVariants = {
    expanded: {
      width: "220px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    collapsed: {
      width: "80px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  // Animation variants for the menu items
  const menuItemVariants = {
    expanded: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    collapsed: {
      x: -10,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Animation variants for the icon glow effect
  const glowVariants = {
    active: {
      opacity: 1,
      scale: 1.2,
      transition: { duration: 0.3 },
    },
    inactive: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 },
    },
  };

  // Menu items with their icons and labels
  const menuItems: MenuItem[] = [
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
      id: "tv",
      label: "TV",
      path: "/tv",
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
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
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
      id: "sports",
      label: "Sports",
      path: "/sports",
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
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      id: "sparks",
      label: "Sparks",
      path: "/sparks",
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      id: "categories",
      label: "Categories",
      path: "/categories",
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
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
    },
    {
      id: "myspace",
      label: "My Space",
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
    <motion.nav
      className="fixed left-0 top-0 h-screen bg-[#0f0f10] flex flex-col z-50 overflow-hidden shadow-lg sidebar-transition"
      variants={sidebarVariants}
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo Section */}
      <div className="py-6 px-4 flex justify-center md:justify-start items-center border-b border-gray-800">
        <img
          src="/logo.svg"
          alt="Hotstar Logo"
          className="h-10"
          onError={(e) => {
            // Fallback if logo image is not available
            const target = e.target as HTMLImageElement;
            target.src =
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMjg4MGZmIiByeD0iOCIvPjx0ZXh0IHg9IjIwIiB5PSIyNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+SDwvdGV4dD48L3N2Zz4=";
          }}
        />
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-hidden flex flex-col gap-2 px-3 py-5">
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.id}
            className={`relative flex items-center p-3 rounded-xl transition-all duration-300 ${
              activeItem === item.id
                ? "text-white"
                : "text-gray-400 hover:text-white"
            } hover:bg-gray-800/50`}
            onClick={() => setActiveItem(item.id)}
          >
            {/* Background glow effect for active item */}
            <motion.div
              className="absolute inset-0 bg-blue-500/20 rounded-xl sidebar-active-glow"
              variants={glowVariants}
              initial="inactive"
              animate={activeItem === item.id ? "active" : "inactive"}
            />

            {/* Icon */}
            <div
              className={`relative z-10 ${
                isExpanded ? "mr-4" : "mx-auto"
              } transition-all duration-300`}
            >
              {item.icon}
            </div>

            {/* Label */}
            <motion.span
              className="text-sm font-medium whitespace-nowrap"
              variants={menuItemVariants}
              initial="collapsed"
              animate={isExpanded ? "expanded" : "collapsed"}
            >
              {item.label}
            </motion.span>

            {/* Active indicator dot for collapsed state */}
            {!isExpanded && activeItem === item.id && (
              <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            )}
          </Link>
        ))}
      </div>

      {/* User Avatar */}
      <div className="mt-auto px-3 pb-10 border-t border-gray-800 pt-4">
        <div className="relative cursor-pointer p-3 flex items-center rounded-xl transition-all duration-300 hover:bg-gray-800/50">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-blue-400 to-cyan-300 flex items-center justify-center mx-auto overflow-hidden shadow-lg">
            {/* User initials or avatar */}
            <span className="text-white font-bold text-sm">U</span>
          </div>

          {/* Username (visible when expanded) */}
          <motion.span
            className="ml-4 text-sm font-medium text-white whitespace-nowrap"
            variants={menuItemVariants}
            initial="collapsed"
            animate={isExpanded ? "expanded" : "collapsed"}
          >
            User Profile
          </motion.span>
        </div>
      </div>
    </motion.nav>
  );
};

export default Sidebar;
