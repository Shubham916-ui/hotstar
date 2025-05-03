import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface TrendingItem {
  id: string;
  title: string;
  link: string;
}

const TrendingBar: React.FC = () => {
  // Sample trending data
  const trendingItems: TrendingItem[] = [
    { id: "1", title: "Game of Thrones", link: "/video/game-of-thrones" },
    { id: "2", title: "Loki", link: "/video/loki" },
    {
      id: "3",
      title: "House of the Dragon",
      link: "/video/house-of-the-dragon",
    },
    { id: "4", title: "The Last of Us", link: "/video/the-last-of-us" },
    { id: "5", title: "Stranger Things", link: "/video/stranger-things" },
    { id: "6", title: "The Mandalorian", link: "/video/the-mandalorian" },
  ];

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Automatic scrolling for mobile view
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % trendingItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [trendingItems.length]);

  return (
    <motion.div
      className="relative backdrop-blur-md bg-gradient-to-r from-blue-900/80 via-purple-900/80 to-indigo-900/80 border-b border-white/10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between">
        {/* Left side - Trending title with animation */}
        <div className="flex items-center">
          <motion.div
            className="relative flex items-center"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 animate-pulse"></div>
            <span className="hidden sm:inline-block text-white font-medium mr-3">
              Trending Now:
            </span>
            <span className="sm:hidden text-white font-medium mr-3">
              Trending:
            </span>
          </motion.div>

          {/* Mobile view - Single item showing with animation */}
          <div className="sm:hidden overflow-hidden h-6 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="whitespace-nowrap"
              >
                <Link
                  to={trendingItems[activeIndex].link}
                  className="text-white hover:text-blue-300 transition-colors duration-300 font-medium"
                >
                  {trendingItems[activeIndex].title}
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Desktop view - Multiple trending items */}
          <div className="hidden sm:flex space-x-4 md:space-x-6 items-center">
            {trendingItems.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  to={item.link}
                  className="text-white hover:text-blue-300 transition-colors duration-300 whitespace-nowrap"
                >
                  {item.title}
                </Link>

                {/* Animated underline on hover */}
                {hoveredItem === item.id && (
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-400"
                    layoutId="underline"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right side - View All link with icon */}
        <Link
          to="/trending"
          className="text-blue-300 hover:text-blue-200 transition-colors duration-300 text-sm font-medium flex items-center group"
        >
          <span className="hidden md:inline-block">View All</span>
          <span className="md:hidden">More</span>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 group-hover:ml-2 transition-all duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ x: [0, 3, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </motion.svg>
        </Link>
      </div>

      {/* Decorative effect - moving circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-purple-500 rounded-full filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>
    </motion.div>
  );
};

export default TrendingBar;
