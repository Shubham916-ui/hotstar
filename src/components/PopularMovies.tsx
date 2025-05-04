import React, { useEffect } from "react";
import { motion } from "framer-motion";
import LazyImage, {
  DEFAULT_POSTER_FALLBACK_IMAGE,
  preloadImages,
} from "./common/LazyImage";

// Movie card interface
interface MovieCard {
  id: number;
  title: string;
  imageUrl: string;
  fallbackImageUrl?: string;
  rating: string;
  year: string;
}

const PopularMovies: React.FC = () => {
  // Updated movie data with more reliable TMDb image URLs and fallbacks
  const popularMovies: MovieCard[] = [
    {
      id: 1,
      title: "Avengers: Endgame",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
      fallbackImageUrl:
        "https://images.unsplash.com/photo-1514778357791-f0eb1a87764c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      rating: "9.2",
      year: "2019",
    },
    {
      id: 2,
      title: "Inception",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      fallbackImageUrl:
        "https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      rating: "8.8",
      year: "2010",
    },
    {
      id: 3,
      title: "Interstellar",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      fallbackImageUrl:
        "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1194&q=80",
      rating: "8.6",
      year: "2014",
    },
    {
      id: 4,
      title: "The Dark Knight",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      fallbackImageUrl:
        "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      rating: "9.0",
      year: "2008",
    },
    {
      id: 5,
      title: "Parasite",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
      fallbackImageUrl:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80",
      rating: "8.5",
      year: "2019",
    },
    {
      id: 6,
      title: "1917",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/iZf0KyrE25z1sage4SYFLCCrMi9.jpg",
      fallbackImageUrl:
        "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      rating: "8.3",
      year: "2019",
    },
    {
      id: 7,
      title: "Dune",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
      fallbackImageUrl:
        "https://images.unsplash.com/photo-1547700055-b61cacebece9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      rating: "8.2",
      year: "2021",
    },
    {
      id: 8,
      title: "The Godfather",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      fallbackImageUrl:
        "https://images.unsplash.com/photo-1560109947-543149eceb16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
      rating: "9.2",
      year: "1972",
    },
    {
      id: 9,
      title: "The Shawshank Redemption",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
      rating: "9.3",
      year: "1994",
    },
    {
      id: 10,
      title: "Everything Everywhere All at Once",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
      rating: "8.9",
      year: "2022",
    },
  ];

  // Preload all movie images as soon as component mounts
  useEffect(() => {
    // Preload visible movie images first (important ones)
    const visibleMovies = popularMovies
      .slice(0, 5)
      .map((movie) => movie.imageUrl);
    preloadImages(visibleMovies);

    // Then preload the rest with a slight delay to not block main rendering
    setTimeout(() => {
      const remainingMovies = popularMovies
        .slice(5)
        .map((movie) => movie.imageUrl);
      preloadImages(remainingMovies);
    }, 1000);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Reduced from 0.1 to make animations faster
        delayChildren: 0.1, // Reduced from 0.3 to show content faster
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 }, // Reduced y-offset for smoother animation
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120, // Increased stiffness for faster animations
        damping: 12,
        duration: 0.3, // Adding a short duration to make animations faster
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, x: -10 }, // Reduced offset for faster appearance
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4, // Reduced from 0.7 for faster animation
      },
    },
  };

  // Add CSS for card styling without shooting star animation
  const movieCardCss = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out forwards;
  }
  .animate-fadeOut {
    animation: fadeOut 0.3s ease-in-out forwards;
  }

  .popular-movie-card {
    position: relative;
    overflow: hidden;
    transform: translate3d(0, 0, 0);
    transition: all 0.3s ease;
    will-change: transform;
    z-index: 1;
    /* Add better shadow instead of glowing effect on mobile */
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .popular-movie-card:hover {
    z-index: 10;
    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.5), 0 4px 6px -2px rgba(59, 130, 246, 0.3);
  }

  .movies-grid-container {
    padding: 10px;
    margin: -10px;
    overflow: visible !important;
  }

  /* Use simpler effect for touch devices */
  @media (hover: none) {
    .popular-movie-card:active {
      transform: scale(0.98) translateY(0);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
    }
  }
  `;

  // Filter out any movies without valid data
  const validMovies = popularMovies.filter((movie) => movie.title);

  return (
    <section className="py-8 bg-gray-900 dark:bg-gray-950 overflow-visible">
      {/* Add the custom CSS */}
      <style dangerouslySetInnerHTML={{ __html: movieCardCss }} />

      <div className="px-6 md:px-16 lg:px-24">
        {/* Section header with title and see all link */}
        <motion.div
          className="flex justify-between items-center mb-6"
          variants={headerVariants}
          initial="hidden"
          animate="show"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Popular Movies
          </h2>
          <button className="text-blue-400 hover:text-blue-300 dark:text-blue-300 dark:hover:text-blue-200 text-sm font-medium flex items-center">
            Browse All
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </motion.div>

        {/* Display a message if no valid movies are available */}
        {validMovies.length === 0 && (
          <div className="flex justify-center items-center py-16">
            <p className="text-white text-lg">
              No popular movies available at the moment.
            </p>
          </div>
        )}

        {/* Movies grid with optimized image loading */}
        {validMovies.length > 0 && (
          <div className="overflow-visible py-4">
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 movies-grid-container"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {validMovies.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  className="bg-gray-800 dark:bg-gray-800/50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 popular-movie-card"
                  variants={cardVariants}
                  layout
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Movie poster with priority loading for visible items */}
                  <div className="w-full h-[200px] md:h-[250px] lg:h-[300px] relative">
                    <LazyImage
                      src={movie.imageUrl}
                      alt={`${movie.title} poster`}
                      className="w-full h-full object-cover object-center"
                      fallbackSrc={
                        movie.fallbackImageUrl || DEFAULT_POSTER_FALLBACK_IMAGE
                      }
                      priority={index < 10} // Set all images to priority loading for faster initial render
                      aspectRatio="poster"
                    />

                    {/* Rating badge - optimized to always be visible */}
                    <div className="absolute top-2 right-2 bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {movie.rating}
                      </span>
                    </div>
                  </div>

                  {/* Movie info with optimized render */}
                  <div className="p-3">
                    <h3 className="text-white font-medium truncate">
                      {movie.title}
                    </h3>
                    <div className="flex justify-between text-gray-400 text-xs mt-1">
                      <span>{movie.year}</span>
                      <button
                        className="text-blue-400 hover:text-blue-300"
                        aria-label={`Add ${movie.title} to watchlist`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularMovies;
