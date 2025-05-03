import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const SlideOutSidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Close sidebar when route changes (mobile)
  useEffect(() => {
    if (isMobile) {
      setIsExpanded(false);
    }
  }, [location, isMobile]);

  // Toggle sidebar function for mobile
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Menu items with their icons and labels
  const menuItems = [
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

  // Check if the current path matches a menu item's path
  const isActive = (path: string): boolean => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Sidebar overlay - covers the page when sidebar is expanded */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-70 z-40 transition-opacity duration-300 ${
          isExpanded
            ? "opacity-100 sidebar-overlay-fade-in"
            : "opacity-0 pointer-events-none sidebar-overlay-fade-out"
        }`}
        onClick={() => setIsExpanded(false)}
        role="button"
        aria-label="Close sidebar"
        tabIndex={0}
        style={{ backdropFilter: isExpanded ? "blur(2px)" : "none" }}
      />

      {/* Mobile hamburger menu button - visible only on small screens */}
      {isMobile && (
        <button
          className="fixed left-4 top-4 z-50 bg-blue-500 p-2 rounded-md text-white shadow-lg hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200"
          onClick={toggleSidebar}
          aria-label={isExpanded ? "Close menu" : "Open menu"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isExpanded ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      )}

      {/* Sidebar trigger - only visible on desktop/tablet */}
      {!isMobile && (
        <div
          className="fixed left-0 top-0 w-1.5 h-full bg-blue-500 z-50 hover:w-3 transition-all duration-200 cursor-pointer sidebar-trigger"
          onMouseEnter={() => setIsExpanded(true)}
          role="button"
          aria-label="Open sidebar"
          tabIndex={0}
        >
          <div className="absolute top-1/2 left-1 -translate-y-1/2 h-16 flex items-center justify-center">
            <div className="flex flex-col space-y-1 opacity-0 hover:opacity-100 transition-opacity duration-200">
              <div className="w-4 h-0.5 bg-white rounded-full"></div>
              <div className="w-3 h-0.5 bg-white rounded-full"></div>
              <div className="w-4 h-0.5 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      )}

      {/* Main sidebar */}
      <div
        className={`fixed left-0 top-0 h-full z-50 ${
          isExpanded ? "sidebar-slide-in" : "sidebar-slide-out"
        }`}
        onMouseLeave={isMobile ? undefined : () => setIsExpanded(false)}
        style={{
          boxShadow: isExpanded ? "0 10px 30px rgba(0, 0, 0, 0.5)" : "none",
          touchAction: "pan-y",
        }}
      >
        <div className="flex flex-col h-full w-60 bg-[#121212] text-white">
          {/* Logo Section */}
          <div className="py-6 px-5 flex justify-center items-center border-b border-gray-800">
            <div className="text-white font-bold text-2xl cursor-pointer">
              <span className="text-blue-400">Hot</span>
              star
            </div>

            {/* Close button (mobile only) */}
            {isMobile && isExpanded && (
              <button
                className="absolute right-4 text-white p-1 rounded-full hover:bg-gray-700 active:bg-gray-600 transition-colors duration-200"
                onClick={() => setIsExpanded(false)}
                aria-label="Close sidebar"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto px-2 py-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                        active
                          ? "bg-gray-700 text-white sidebar-active-item"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      } ${isMobile ? "sidebar-menu-item" : ""}`}
                      onClick={
                        isMobile ? () => setIsExpanded(false) : undefined
                      }
                    >
                      {/* Active indicator */}
                      {active && (
                        <div className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r-full" />
                      )}
                      <span className={`p-1 ${active ? "text-blue-400" : ""}`}>
                        {item.icon}
                      </span>
                      <span className="ml-3 text-sm font-medium">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer with year */}
          <div className="p-4 border-t border-gray-800 text-gray-400 text-xs text-center">
            <p>© {currentYear} Hotstar</p>
            <p className="mt-1 text-gray-500">All rights reserved</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlideOutSidebar;
