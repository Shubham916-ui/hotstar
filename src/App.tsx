import React, { useState } from "react";
import "./App.css";
import SlimSidebar from "./components/SlimSidebar";
import Hero from "./components/Hero";
import TrendingNow from "./components/TrendingNow";
import PopularMovies from "./components/PopularMovies";
import TimeBasedContent from "./components/TimeBasedContent";
import Footer from "./components/Footer";
import TrendingBar from "./components/TrendingBar";
import { motion } from "framer-motion";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import LazyImage, {
  MOVIES_FALLBACK_IMAGE,
  TV_SHOWS_FALLBACK_IMAGE,
  SPORTS_FALLBACK_IMAGE,
  NEWS_FALLBACK_IMAGE,
} from "./components/common/LazyImage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Home page component that contains all sections
const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full">
        <Hero />
      </section>

      {/* Content Sections */}
      <div className="space-y-2 mt-2 overflow-hidden">
        {/* Trending Now Section - Add overflow-visible */}
        <section className="overflow-visible">
          <TrendingNow />
        </section>

        {/* Time-Based Content Section */}
        <section>
          <TimeBasedContent />
        </section>

        {/* Popular Movies Section - Add overflow-visible */}
        <section className="overflow-visible relative z-10">
          <PopularMovies />
        </section>

        {/* Welcome Section */}
        <motion.section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-0"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:shadow-blue-700/20 hover:shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-4 md:mb-0 md:mr-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Premium Subscription
                </h2>
                <p className="text-gray-300 text-sm md:text-base">
                  Get access to exclusive content, ad-free viewing, and multiple
                  device streaming.
                </p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-md text-sm font-medium transition-colors flex-shrink-0 flex items-center justify-center">
                <span>Subscribe Now</span>
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </motion.section>

        {/* Featured Categories */}
        <motion.section
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            Featured Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Category 1 */}
            <motion.div
              className="group relative rounded-lg overflow-hidden bg-gray-800 dark:bg-gray-800 h-32 md:h-40"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>
              <div className="absolute inset-0">
                <LazyImage
                  src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80"
                  alt="Movies"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  fallbackSrc={MOVIES_FALLBACK_IMAGE}
                  aspectRatio="video"
                />
              </div>
              <div className="absolute inset-0 flex items-end z-20 p-4">
                <h3 className="text-white font-bold">Movies</h3>
              </div>
            </motion.div>

            {/* Category 2 */}
            <motion.div
              className="group relative rounded-lg overflow-hidden bg-gray-800 dark:bg-gray-800 h-32 md:h-40"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>
              <div className="absolute inset-0">
                <LazyImage
                  src="https://images.unsplash.com/photo-1522869635100-187f6605151d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="TV Shows"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  fallbackSrc={TV_SHOWS_FALLBACK_IMAGE}
                  aspectRatio="video"
                />
              </div>
              <div className="absolute inset-0 flex items-end z-20 p-4">
                <h3 className="text-white font-bold">TV Shows</h3>
              </div>
            </motion.div>

            {/* Category 3 */}
            <motion.div
              className="group relative rounded-lg overflow-hidden bg-gray-800 dark:bg-gray-800 h-32 md:h-40"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>
              <div className="absolute inset-0">
                <LazyImage
                  src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1007&q=80"
                  alt="Sports"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  fallbackSrc={SPORTS_FALLBACK_IMAGE}
                  aspectRatio="video"
                />
              </div>
              <div className="absolute inset-0 flex items-end z-20 p-4">
                <h3 className="text-white font-bold">Sports</h3>
              </div>
            </motion.div>

            {/* Category 4 */}
            <motion.div
              className="group relative rounded-lg overflow-hidden bg-gray-800 dark:bg-gray-800 h-32 md:h-40"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>
              <div className="absolute inset-0">
                <LazyImage
                  src="https://images.unsplash.com/photo-1618329027137-a76bb028062c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="News"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  fallbackSrc={NEWS_FALLBACK_IMAGE}
                  aspectRatio="video"
                />
              </div>
              <div className="absolute inset-0 flex items-end z-20 p-4">
                <h3 className="text-white font-bold">News</h3>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  );
};

// Placeholder pages for other routes
const TVPage = () => (
  <div className="flex items-center justify-center h-96">
    <h1 className="text-4xl text-white font-bold">TV Shows</h1>
  </div>
);

const MoviesPage = () => (
  <div className="flex items-center justify-center h-96">
    <h1 className="text-4xl text-white font-bold">Movies</h1>
  </div>
);

const SportsPage = () => (
  <div className="flex items-center justify-center h-96">
    <h1 className="text-4xl text-white font-bold">Sports</h1>
  </div>
);

const PremiumPage = () => (
  <div className="flex items-center justify-center h-96">
    <h1 className="text-4xl text-white font-bold">Premium Content</h1>
  </div>
);

// Trending page
const TrendingPage = () => (
  <div className="flex items-center justify-center h-96">
    <h1 className="text-4xl text-white font-bold">All Trending Content</h1>
  </div>
);

// Video details page
const VideoDetailsPage = () => {
  // Get video ID from URL params
  const location = window.location.pathname;
  const videoId = location.split("/video/")[1];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-800 rounded-lg p-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {videoId.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
        </h1>
        <div className="flex flex-wrap items-center gap-2 text-gray-400 mb-6">
          <span>2023</span>
          <span>•</span>
          <span>Action, Adventure</span>
          <span>•</span>
          <span>2h 32m</span>
          <span className="ml-4 bg-yellow-500 text-black px-2 py-0.5 rounded text-xs font-bold">
            9.0
          </span>
        </div>
        <p className="text-gray-300 mb-8">
          After a long hiatus, Batman returns to Gotham City to face a new
          threat that's taking over the city. With allies old and new, can the
          Dark Knight save Gotham one more time?
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
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
            Play
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

// Movie details page
const MovieDetailsPage = () => {
  // Get movie ID from URL params
  const location = window.location.pathname;
  const movieSlug = location.split("/movie/")[1];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-800 rounded-lg p-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {movieSlug
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())}
        </h1>
        <div className="flex flex-wrap items-center gap-2 text-gray-400 mb-6">
          <span>2023</span>
          <span>•</span>
          <span>Trending</span>
          <span>•</span>
          <span>1h 45m</span>
          <span className="ml-4 bg-yellow-500 text-black px-2 py-0.5 rounded text-xs font-bold">
            8.7
          </span>
        </div>
        <p className="text-gray-300 mb-8">
          This is a placeholder description for {movieSlug.replace(/-/g, " ")}.
          In a thrilling adventure that spans galaxies, our heroes must overcome
          incredible odds to save what they hold dear.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
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
            Play
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

// The main app content component that uses the theme context
const AppContent: React.FC = () => {
  const { darkMode, isTransitioning } = useTheme();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleSidebarExpand = (expanded: boolean) => {
    setIsSidebarExpanded(expanded);
  };

  return (
    <Router>
      <div
        className={`flex flex-col min-h-screen bg-gray-900 text-white dark:bg-gray-950 overflow-x-hidden ${
          isTransitioning ? "theme-transitioning" : ""
        }`}
      >
        <SlimSidebar onExpansionChange={handleSidebarExpand} />

        <div
          className={`main-content flex-grow transition-all duration-300 pb-16 sm:pb-0 overflow-x-hidden ${
            isSidebarExpanded ? "xl:ml-240" : ""
          }`}
        >
          <TrendingBar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tv" element={<TVPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/sports" element={<SportsPage />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/video/:videoId" element={<VideoDetailsPage />} />
            <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Footer />
        </div>
      </div>
    </Router>
  );
};

// App component with theme provider wrapper
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
