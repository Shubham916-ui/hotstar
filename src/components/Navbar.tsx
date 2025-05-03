import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import DarkModeToggle from "./DarkModeToggle";
import SearchModal from "./SearchModal";

// Icons for the navbar
const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);

const TVIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
      clipRule="evenodd"
    />
  </svg>
);

const MoviesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z"
      clipRule="evenodd"
    />
  </svg>
);

const SportsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
      clipRule="evenodd"
    />
  </svg>
);

const PremiumIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const SearchIcon = () => (
  <svg
    className="h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
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
);

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  // Track scroll position to change navbar background
  useMotionValueEvent(scrollY, "change", (latest) => {
    setHasScrolled(latest > 10);
  });

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  // Check if the route is active
  const isActive = (path: string): boolean => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <motion.nav
        className={`sticky top-0 z-50 ${
          hasScrolled
            ? "bg-black bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-95 shadow-md"
            : "bg-gradient-to-r from-blue-900 to-blue-800 dark:from-gray-800 dark:to-gray-900"
        } transition-all duration-300`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and left section */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                {/* Logo */}
                <div className="text-white font-bold text-2xl cursor-pointer hover:text-blue-200 transition-colors duration-300">
                  <span className="text-blue-300 hover:text-blue-100 transition-colors duration-300 dark:text-blue-400">
                    Hot
                  </span>
                  star
                </div>
              </Link>
            </div>

            {/* Menu items - Desktop */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className={`flex items-center text-white hover:text-blue-200 px-3 py-2 text-sm font-medium transition-all duration-300 border-b-2 ${
                  isActive("/")
                    ? "border-blue-400 text-blue-200"
                    : "border-transparent"
                } hover:border-blue-300 dark:hover:border-blue-400`}
                aria-label="Home navigation link"
              >
                <HomeIcon />
                <span className="ml-1">Home</span>
              </Link>

              <Link
                to="/tv"
                className={`flex items-center text-white hover:text-blue-200 px-3 py-2 text-sm font-medium transition-all duration-300 border-b-2 ${
                  isActive("/tv")
                    ? "border-blue-400 text-blue-200"
                    : "border-transparent"
                } hover:border-blue-300 dark:hover:border-blue-400`}
                aria-label="TV shows navigation link"
              >
                <TVIcon />
                <span className="ml-1">TV</span>
              </Link>

              <Link
                to="/movies"
                className={`flex items-center text-white hover:text-blue-200 px-3 py-2 text-sm font-medium transition-all duration-300 border-b-2 ${
                  isActive("/movies")
                    ? "border-blue-400 text-blue-200"
                    : "border-transparent"
                } hover:border-blue-300 dark:hover:border-blue-400`}
                aria-label="Movies navigation link"
              >
                <MoviesIcon />
                <span className="ml-1">Movies</span>
              </Link>

              <Link
                to="/sports"
                className={`flex items-center text-white hover:text-blue-200 px-3 py-2 text-sm font-medium transition-all duration-300 border-b-2 ${
                  isActive("/sports")
                    ? "border-blue-400 text-blue-200"
                    : "border-transparent"
                } hover:border-blue-300 dark:hover:border-blue-400`}
                aria-label="Sports navigation link"
              >
                <SportsIcon />
                <span className="ml-1">Sports</span>
              </Link>

              <Link
                to="/premium"
                className={`flex items-center text-white hover:text-blue-200 px-3 py-2 text-sm font-medium transition-all duration-300 border-b-2 ${
                  isActive("/premium")
                    ? "border-blue-400 text-blue-200"
                    : "border-transparent"
                } hover:border-blue-300 dark:hover:border-blue-400`}
                aria-label="Premium content navigation link"
              >
                <PremiumIcon />
                <span className="ml-1">Premium</span>
              </Link>

              {/* Search icon */}
              <button
                className="text-white hover:text-blue-200 p-2 rounded-full transition-all duration-300 hover:bg-blue-700/30"
                onClick={openSearchModal}
                aria-label="Open search"
              >
                <SearchIcon />
              </button>

              {/* Dark Mode Toggle */}
              <DarkModeToggle />

              {/* User avatar */}
              <div className="ml-3 relative">
                <div>
                  <button
                    className="flex text-sm rounded-full focus:outline-none transform transition-all duration-300 hover:scale-110"
                    aria-label="User account"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center text-white font-bold hover:from-blue-500 hover:to-blue-600 transition-colors duration-300">
                      U
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              {/* Search icon - Mobile */}
              <button
                className="text-white hover:text-blue-200 p-2 rounded-full transition-all duration-300 hover:bg-blue-700/30 mr-1"
                onClick={openSearchModal}
                aria-label="Open search"
              >
                <SearchIcon />
              </button>

              {/* Dark Mode Toggle - Mobile */}
              <DarkModeToggle />

              {/* User avatar - Mobile */}
              <div className="mx-2">
                <button
                  className="flex text-sm rounded-full focus:outline-none"
                  aria-label="User account"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center text-white font-bold">
                    U
                  </div>
                </button>
              </div>

              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-700 focus:outline-none transition-colors duration-300 dark:hover:bg-gray-700"
                aria-expanded={isMenuOpen}
                aria-label="Main menu"
              >
                <span className="sr-only">Open main menu</span>
                {/* Menu icon */}
                <svg
                  className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* Close icon */}
                <svg
                  className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div
          className={`${isMenuOpen ? "block" : "hidden"} md:hidden ${
            hasScrolled
              ? "bg-black bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-95"
              : "bg-blue-800 dark:bg-gray-800"
          } transition-all duration-300 ease-in-out`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`flex items-center text-white ${
                isActive("/")
                  ? "bg-blue-700 dark:bg-gray-700"
                  : "hover:bg-blue-700 dark:hover:bg-gray-700"
              } block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:pl-4`}
              aria-label="Home navigation link"
            >
              <HomeIcon />
              <span className="ml-2">Home</span>
            </Link>

            <Link
              to="/tv"
              className={`flex items-center text-white ${
                isActive("/tv")
                  ? "bg-blue-700 dark:bg-gray-700"
                  : "hover:bg-blue-700 dark:hover:bg-gray-700"
              } block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:pl-4`}
              aria-label="TV shows navigation link"
            >
              <TVIcon />
              <span className="ml-2">TV</span>
            </Link>

            <Link
              to="/movies"
              className={`flex items-center text-white ${
                isActive("/movies")
                  ? "bg-blue-700 dark:bg-gray-700"
                  : "hover:bg-blue-700 dark:hover:bg-gray-700"
              } block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:pl-4`}
              aria-label="Movies navigation link"
            >
              <MoviesIcon />
              <span className="ml-2">Movies</span>
            </Link>

            <Link
              to="/sports"
              className={`flex items-center text-white ${
                isActive("/sports")
                  ? "bg-blue-700 dark:bg-gray-700"
                  : "hover:bg-blue-700 dark:hover:bg-gray-700"
              } block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:pl-4`}
              aria-label="Sports navigation link"
            >
              <SportsIcon />
              <span className="ml-2">Sports</span>
            </Link>

            <Link
              to="/premium"
              className={`flex items-center text-white ${
                isActive("/premium")
                  ? "bg-blue-700 dark:bg-gray-700"
                  : "hover:bg-blue-700 dark:hover:bg-gray-700"
              } block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:pl-4`}
              aria-label="Premium content navigation link"
            >
              <PremiumIcon />
              <span className="ml-2">Premium</span>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
    </>
  );
};

export default Navbar;
 