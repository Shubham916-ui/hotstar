import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface SlimSidebarProps {
  onExpansionChange?: (expanded: boolean) => void;
}

// Add preview content for menu items
const previewContent = {
  home: {
    title: "Home",
    description: "Browse popular and recommended content",
    image:
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&h=140&q=80",
  },
  tv: {
    title: "TV Shows",
    description: "Watch the latest episodes of your favorite shows",
    image:
      "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&h=140&q=80",
  },
  movies: {
    title: "Movies",
    description: "Stream hit films and cinema classics",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&h=140&q=80",
  },
  sports: {
    title: "Sports",
    description: "Live matches and highlights from around the world",
    image:
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&h=140&q=80",
  },
};

// Theme colors for dark and light modes
interface ThemeColors {
  background: string;
  backgroundHover: string;
  text: string;
  textSecondary: string;
  accent: string;
  accentHover: string;
  border: string;
  menuBackground: string;
  cardBackground: string;
}

const themes: { [key: string]: ThemeColors } = {
  dark: {
    background: "rgba(20, 20, 20, 0.85)",
    backgroundHover: "rgba(30, 30, 30, 0.9)",
    text: "#ffffff",
    textSecondary: "#9ca3af",
    accent: "#1f80e0",
    accentHover: "rgba(0, 255, 255, 0.5)",
    border: "rgba(255, 255, 255, 0.05)",
    menuBackground: "rgba(255, 255, 255, 0.05)",
    cardBackground: "rgba(20, 20, 20, 0.95)",
  },
  light: {
    background: "rgba(255, 255, 255, 0.85)",
    backgroundHover: "rgba(240, 240, 240, 0.9)",
    text: "#121212",
    textSecondary: "#4b5563",
    accent: "#0066cc",
    accentHover: "rgba(0, 102, 204, 0.7)",
    border: "rgba(0, 0, 0, 0.1)",
    menuBackground: "rgba(0, 0, 0, 0.05)",
    cardBackground: "rgba(255, 255, 255, 0.95)",
  },
};

const SlimSidebar: React.FC<SlimSidebarProps> = ({ onExpansionChange }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">("dark");
  const location = useLocation();
  const navigate = useNavigate();
  const currentYear = 2025; // Fixed at 2025 as requested

  // Hotstar brand color and theme-dependent colors
  const hotstarBlue = currentTheme === "dark" ? "#1f80e0" : "#0066cc";
  const hotstarCyan =
    currentTheme === "dark"
      ? "rgba(0, 255, 255, 0.5)"
      : "rgba(0, 102, 204, 0.7)";
  const theme = themes[currentTheme];

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("hotstarTheme");
    if (savedTheme && (savedTheme === "dark" || savedTheme === "light")) {
      setCurrentTheme(savedTheme);
    } else {
      // Use system preference as default if available
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setCurrentTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // Save theme preference when changed
  useEffect(() => {
    localStorage.setItem("hotstarTheme", currentTheme);

    // Apply theme to document body
    if (currentTheme === "light") {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
  }, [currentTheme]);

  // Toggle theme function
  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  // Add touch gesture support for mobile
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (isMobile) {
      const swipeDistance = touchEndX.current - touchStartX.current;
      // Right swipe to open
      if (swipeDistance > 50 && !isExpanded) {
        setIsExpanded(true);
      }
      // Left swipe to close
      else if (swipeDistance < -50 && isExpanded) {
        setIsExpanded(false);
      }
    }
  };

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

  // Close sidebar on route change for mobile
  useEffect(() => {
    if (isMobile) {
      setIsExpanded(false);
    }
  }, [location.pathname, isMobile]);

  // Notify parent component about expansion state changes
  useEffect(() => {
    if (onExpansionChange) {
      onExpansionChange(isExpanded);
    }
  }, [isExpanded, onExpansionChange]);

  // Focus search input when modal opens
  useEffect(() => {
    if (showSearchModal && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [showSearchModal]);

  // Handle ESC key to close search modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showSearchModal) {
        setShowSearchModal(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [showSearchModal]);

  // Add keyboard shortcut for search (pressing '/' key)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Open search modal when '/' is pressed, unless in an input field
      if (
        event.key === "/" &&
        !["INPUT", "TEXTAREA"].includes((event.target as HTMLElement).tagName)
      ) {
        event.preventDefault();
        setShowSearchModal(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Menu items with their icons and labels
  const menuItems = [
    {
      id: "upgrade",
      label: "Upgrade >",
      path: "/upgrade",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      ),
      isSpecial: true,
    },
    {
      id: "home",
      label: "Home",
      path: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      id: "search",
      label: "Search",
      path: "#", // Using # to prevent navigation
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
      isSearch: true, // Mark as search button
    },
    {
      id: "tv",
      label: "TV",
      path: "/tv",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      notificationCount: 3, // Add notification count
    },
    {
      id: "movies",
      label: "Movies",
      path: "/movies",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
          />
        </svg>
      ),
      notificationCount: 5, // Add notification count
    },
    {
      id: "sports",
      label: "Sports",
      path: "/sports",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      isNew: true, // Mark as new
    },
    {
      id: "sparks",
      label: "Sparks",
      path: "/sparks",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
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
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
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
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
  ];

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchModal(false);
      setSearchQuery("");
    }
  };

  // Check if the current path matches a menu item's path
  const isActive = (path: string): boolean => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && path !== "#" && location.pathname.startsWith(path))
      return true;
    return false;
  };

  // Handle mobile touch
  const handleMobileTouch = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
    }
  };

  // Add debounce mechanism for sidebar expansion
  const expandTimeoutRef = useRef<number | null>(null);

  // Replace with debounced mouse enter/leave handlers
  const handleMouseEnter = useCallback(() => {
    if (isMobile) return;

    // Clear any pending collapse timeout
    if (expandTimeoutRef.current) {
      window.clearTimeout(expandTimeoutRef.current);
      expandTimeoutRef.current = null;
    }

    // Set expanded immediately without animation for better performance
    setIsExpanded(true);
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;

    // Debounced collapse to prevent flicker
    if (expandTimeoutRef.current) {
      window.clearTimeout(expandTimeoutRef.current);
    }

    expandTimeoutRef.current = window.setTimeout(() => {
      setIsExpanded(false);
      expandTimeoutRef.current = null;
    }, 100);
  }, [isMobile]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (expandTimeoutRef.current) {
        window.clearTimeout(expandTimeoutRef.current);
      }
    };
  }, []);

  // Handle menu item click
  const handleMenuItemClick = (item: any, event: React.MouseEvent) => {
    if (item.isSearch) {
      event.preventDefault();
      setShowSearchModal(true);
    }
  };

  return (
    <>
      {/* Simplified overlay without blur for better performance */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-40"
          style={{
            background:
              currentTheme === "dark"
                ? "rgba(0, 0, 0, 0.5)"
                : "rgba(0, 0, 0, 0.2)",
            transition: "opacity 200ms ease-out",
          }}
          onClick={() => setIsExpanded(false)}
          aria-hidden="true"
        />
      )}

      {/* Main sidebar container with simplified animations */}
      <div
        ref={sidebarRef}
        className={`fixed left-0 top-0 h-full z-50 slim-sidebar ${
          isMobile ? (isExpanded ? "expanded" : "") : ""
        }`}
        style={{
          width: isExpanded ? "240px" : "60px",
          background: theme.background,
          boxShadow: `0 0 10px rgba(0, 0, 0, 0.2)`,
          borderRight: `1px solid ${theme.border}`,
          transition: "width 250ms ease-out",
          color: theme.text,
          // Hardware acceleration
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={isMobile ? handleMobileTouch : undefined}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="navigation"
        aria-label="Main sidebar"
      >
        {/* Logo Section */}
        <div
          className="h-14 flex justify-center items-center"
          style={{
            borderBottom: `1px solid ${theme.border}`,
            background: "transparent",
            transition: "color 300ms ease-out",
          }}
        >
          {isExpanded ? (
            <div
              className="font-bold text-xl cursor-pointer"
              style={{
                color: theme.text,
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <img
                src="/images/chat-logo.png"
                alt="Logo"
                style={{
                  height: "31.74px",
                  width: "51px",
                  borderRadius: "4px",
                }}
              />
            </div>
          ) : (
            <div
              className="font-bold text-lg cursor-pointer"
              style={{
                color: theme.text,
              }}
            >
              <img
                src="/images/chat-logo.png"
                alt="Logo"
                style={{
                  height: "31.74px",
                  width: "51px",
                  borderRadius: "4px",
                }}
              />
            </div>
          )}
        </div>

        {/* Menu Items */}
        <nav
          className="flex-1 overflow-y-auto custom-scrollbar"
          aria-label="Main Navigation"
          role="navigation"
          style={{
            background: "transparent",
          }}
        >
          <ul className="py-4" role="menu" aria-orientation="vertical">
            {menuItems.map((item, index) => {
              const active = isActive(item.path);
              return (
                <li key={item.id} className="my-1 px-2">
                  <Link
                    to={item.path}
                    className={`menu-item flex items-center h-10 rounded-lg ${
                      active ? "menu-item-active" : ""
                    } ${item.isSpecial ? "upgrade-button" : ""} ${
                      item.isSearch ? "search-button" : ""
                    }`}
                    onClick={(e) => handleMenuItemClick(item, e)}
                    aria-label={`${item.label}${
                      item.notificationCount
                        ? `, ${item.notificationCount} new items`
                        : ""
                    }${item.isNew ? ", New feature" : ""}`}
                    aria-current={active ? "page" : undefined}
                    role="menuitem"
                    tabIndex={0}
                    aria-haspopup={item.isSearch ? "dialog" : undefined}
                    style={{
                      paddingLeft: isExpanded ? "16px" : "0",
                      paddingRight: isExpanded ? "16px" : "0",
                      justifyContent: isExpanded ? "flex-start" : "center",
                      color: item.isSpecial
                        ? hotstarBlue
                        : active
                        ? "#ffffff"
                        : "#9ca3af",
                      borderLeft: active ? `3px solid ${hotstarCyan}` : "none",
                      position: "relative",
                      transition: "all 250ms ease-out",
                      opacity: 1, // Keep consistent opacity
                    }}
                    onMouseEnter={() => !isMobile && setHoveredItem(item.id)}
                    onMouseLeave={() => !isMobile && setHoveredItem(null)}
                  >
                    <div className="menu-icon-container">{item.icon}</div>

                    <span
                      className="menu-text ml-3 whitespace-nowrap font-medium"
                      style={{
                        opacity: isExpanded ? "1" : "0",
                        transform: isExpanded
                          ? "translateX(0)"
                          : "translateX(-10px)",
                        transition:
                          "opacity 200ms ease-out, transform 250ms ease-out",
                        position: isExpanded ? "relative" : "absolute",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {item.label}
                    </span>

                    {/* Notification Badge */}
                    {item.notificationCount && (
                      <span
                        className="notification-badge"
                        style={{
                          position: "absolute",
                          top: isExpanded ? "5px" : "3px",
                          right: isExpanded ? "16px" : "6px",
                          background: "rgba(255, 59, 48, 0.9)",
                          color: "white",
                          fontSize: "0.65rem",
                          fontWeight: "bold",
                          height: "16px",
                          minWidth: "16px",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "0 4px",
                          boxShadow: "0 0 5px rgba(255, 59, 48, 0.5)",
                          animation: "badgePulse 2s infinite",
                        }}
                      >
                        {item.notificationCount}
                      </span>
                    )}

                    {/* New Item Indicator */}
                    {item.isNew && (
                      <span
                        className="new-indicator"
                        style={{
                          position: "absolute",
                          top: isExpanded ? "5px" : "3px",
                          right: isExpanded ? "16px" : "6px",
                          background: "rgba(52, 199, 89, 0.9)",
                          color: "white",
                          fontSize: "0.6rem",
                          fontWeight: "bold",
                          padding: "2px 4px",
                          borderRadius: "4px",
                          boxShadow: "0 0 5px rgba(52, 199, 89, 0.5)",
                        }}
                      >
                        NEW
                      </span>
                    )}

                    {/* Active state underline animation */}
                    {active && (
                      <div
                        className="active-underline"
                        style={{
                          position: "absolute",
                          bottom: "6px",
                          left: isExpanded ? "16px" : "50%",
                          width: isExpanded ? "calc(100% - 32px)" : "16px",
                          height: "2px",
                          background: `linear-gradient(to right, ${hotstarCyan}, ${hotstarBlue})`,
                          transform: isExpanded
                            ? "translateX(0)"
                            : "translateX(-50%)",
                          opacity: 1,
                          transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}

            {/* Theme Toggle Button - Add this to the end of menu items */}
            <li className="my-1 px-2">
              <button
                className="menu-item flex items-center h-10 rounded-lg w-full"
                onClick={toggleTheme}
                aria-label={`Switch to ${
                  currentTheme === "dark" ? "light" : "dark"
                } theme`}
                role="menuitem"
                style={{
                  paddingLeft: isExpanded ? "16px" : "0",
                  paddingRight: isExpanded ? "16px" : "0",
                  justifyContent: isExpanded ? "flex-start" : "center",
                  color: theme.textSecondary,
                  position: "relative",
                  transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                  willChange: "transform, opacity, background",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <div
                  className="menu-icon-container"
                  style={{
                    transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                    willChange: "transform",
                  }}
                >
                  {currentTheme === "dark" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  )}
                </div>

                <span
                  className="menu-text ml-3 whitespace-nowrap font-medium"
                  style={{
                    opacity: isExpanded ? "1" : "0",
                    transform: isExpanded
                      ? "translateX(0)"
                      : "translateX(-10px)",
                    transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                    textShadow: "0 0 8px rgba(0, 0, 0, 0.5)",
                    position: isExpanded ? "relative" : "absolute",
                    letterSpacing: "0.5px",
                    willChange: "transform, opacity, letter-spacing",
                    color: theme.textSecondary,
                  }}
                >
                  {currentTheme === "dark" ? "Light Mode" : "Dark Mode"}
                </span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Light divider and Year at bottom */}
        <div
          className="h-10 flex items-center justify-center year-footer"
          style={{
            borderTop: `1px solid ${theme.border}`,
            background: "transparent",
            transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div
            className="text-xs"
            style={{
              transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              textShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
              position: "relative",
              zIndex: 1,
              color: theme.textSecondary,
            }}
          >
            {isExpanded ? `© ${currentYear}` : currentYear}
          </div>
        </div>
      </div>

      {/* Preview Cards */}
      {!isMobile &&
        !isExpanded &&
        hoveredItem &&
        previewContent[hoveredItem as keyof typeof previewContent] && (
          <div
            className="preview-card"
            style={{
              position: "fixed",
              left: "75px", // Position to the right of collapsed sidebar
              top: `${
                menuItems.findIndex((item) => item.id === hoveredItem) * 40 +
                100
              }px`,
              background: theme.cardBackground,
              backdropFilter: "blur(10px)",
              borderRadius: "8px",
              padding: "12px",
              width: "250px",
              boxShadow: `0 5px 20px rgba(0, 0, 0, 0.5), 0 0 15px ${theme.accentHover}`,
              border: `1px solid ${theme.border}`,
              zIndex: 40,
              animation: "fadeInPreview 200ms cubic-bezier(0.4, 0, 0.2, 1)",
              pointerEvents: "none", // Prevent interactions with the preview
              color: theme.text,
            }}
          >
            {previewContent[hoveredItem as keyof typeof previewContent]
              .image && (
              <div
                className="preview-image mb-3"
                style={{
                  width: "100%",
                  height: "140px",
                  borderRadius: "4px",
                  overflow: "hidden",
                  marginBottom: "8px",
                }}
              >
                <img
                  src={
                    previewContent[hoveredItem as keyof typeof previewContent]
                      .image
                  }
                  alt={
                    previewContent[hoveredItem as keyof typeof previewContent]
                      .title
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
            <h4
              className="preview-title text-white font-medium"
              style={{
                fontSize: "16px",
                marginBottom: "4px",
              }}
            >
              {previewContent[hoveredItem as keyof typeof previewContent].title}
            </h4>
            <p
              className="preview-description text-gray-300"
              style={{
                fontSize: "13px",
                lineHeight: "1.4",
                opacity: 0.8,
              }}
            >
              {
                previewContent[hoveredItem as keyof typeof previewContent]
                  .description
              }
            </p>
          </div>
        )}

      {/* Search Modal */}
      {showSearchModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-modal-title"
          style={{
            background:
              currentTheme === "dark"
                ? "rgba(0, 0, 0, 0.7)"
                : "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(8px)",
            animation: "fadeIn 200ms cubic-bezier(0.4, 0, 0.2, 1) forwards",
          }}
        >
          <div
            className="search-modal-content w-full max-w-xl p-6 rounded-xl"
            style={{
              background: theme.cardBackground,
              boxShadow: `0 0 20px ${theme.accentHover}`,
              animation: "scaleIn 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards",
              border: `1px solid ${theme.border}`,
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3
                id="search-modal-title"
                className="text-xl font-bold text-white"
              >
                Search
              </h3>
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-gray-400 hover:text-white"
                aria-label="Close search"
                style={{
                  transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
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
            </div>

            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  ref={searchInputRef}
                  aria-required="true"
                  aria-autocomplete="list"
                  aria-controls="search-results"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for movies, shows, sports..."
                  className="w-full p-4 pl-12 pr-10 rounded-lg text-white"
                  aria-label="Search query"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(4px)",
                    transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
                <span
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400"
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
                </span>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    aria-label="Clear search"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
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

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowSearchModal(false)}
                  className="px-6 py-2 mr-3 rounded-lg text-gray-300 hover:text-white"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg text-white font-medium"
                  style={{
                    background: `linear-gradient(90deg, ${hotstarBlue}, ${hotstarCyan})`,
                    boxShadow: "0 0 10px rgba(0, 255, 255, 0.3)",
                    transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        /* Remove complex animations */
        @keyframes fadeInMenuItem {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Simplified pulse animation */
        @keyframes simplePulse {
          0% { opacity: 0.9; }
          50% { opacity: 1; }
          100% { opacity: 0.9; }
        }

        /* Force hardware acceleration */
        .slim-sidebar {
          -webkit-transform: translateZ(0);
          -moz-transform: translateZ(0);
          -ms-transform: translateZ(0);
          -o-transform: translateZ(0);
          transform: translateZ(0);
          -webkit-backface-visibility: hidden;
          -moz-backface-visibility: hidden;
          -ms-backface-visibility: hidden;
          backface-visibility: hidden;
          -webkit-perspective: 1000;
          -moz-perspective: 1000;
          -ms-perspective: 1000;
          perspective: 1000;
        }

        /* Simplify menu item hover effects */
        .menu-item:hover:not(.menu-item-active) {
          background: rgba(255, 255, 255, 0.05) !important;
        }

        /* Improve transition performance */
        .menu-item, .menu-icon-container, .menu-text {
          transition: all 200ms ease-out !important;
        }
        
        /* Remove blur filters and complex effects */
        .slim-sidebar-overlay {
          backdrop-filter: none !important;
        }
        
        /* Optimize animation performance */
        * {
          animation-duration: 200ms !important;
          animation-timing-function: ease-out !important;
        }
      `}</style>
    </>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(SlimSidebar);
