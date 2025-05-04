import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LazyImage, { DEFAULT_POSTER_FALLBACK_IMAGE } from "./common/LazyImage";
import MovieDetailModal from "./MovieDetailModal";

// Movie card interface
interface MovieCard {
  id: number;
  title: string;
  imageUrl: string;
  fallbackImageUrl?: string;
  genre: string;
}

// Default fallback image (base64 encoded small placeholder)
const DEFAULT_FALLBACK_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzFmMjkzNyIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2MTdhODUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPk5vIEltYWdlPC90ZXh0PgogIDx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2MTdhODUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkF2YWlsYWJsZTwvdGV4dD4KPC9zdmc+";

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  hover: {
    y: -10,
    scale: 1.05,
    transition: {
      type: "tween",
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// CSS for the glowing animation and scrolling
const scrollStyles = `
/* Fix to ensure cards don't get cut off when moving up */
.trending-card-container {
  padding: 20px 0;
  margin: -20px 0;
  overflow-x: auto !important;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  /* Add scroll snap for better UX */
  scroll-snap-type: x proximity;
  scroll-padding: 0 16px;
  width: auto;
  flex-wrap: nowrap;
}

.trending-card-container > article {
  scroll-snap-align: start;
  -webkit-user-select: none;
  user-select: none;
}

.trending-card-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

.trending-movie-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform, box-shadow;
  transform-origin: center bottom;
  position: relative;
  z-index: 1;
}

.trending-movie-card:hover {
  box-shadow: 0 0 20px 5px rgba(59, 130, 246, 0.7);
  z-index: 10;
}

.trending-section {
  position: relative;
}

.trending-card-wrapper {
  overflow-x: hidden !important;
  position: relative;
  width: 100%;
}

.scroll-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.scroll-button:hover {
  background-color: rgba(59, 130, 246, 0.8);
  border-color: rgba(255, 255, 255, 0.5);
}

.scroll-button.left {
  left: 10px;
}

.scroll-button.right {
  right: 10px;
}

/* Ensure proper spacing for cards */
.movies-row {
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
}

@media (max-width: 768px) {
  .scroll-button {
    width: 32px;
    height: 32px;
    opacity: 0.8;
  }
}
`;

const TrendingNow: React.FC = () => {
  // State for the modal
  const [selectedMovie, setSelectedMovie] = useState<MovieCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Function to open the modal with selected movie
  const handleOpenModal = (movie: MovieCard) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Re-enable body scrolling when modal is closed
    document.body.style.overflow = "auto";
  };

  // Functions for scrolling
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = Math.min(container.clientWidth * 0.8, 800);
      container.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = Math.min(container.clientWidth * 0.8, 800);
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Prevent default to avoid page scrolling while swiping horizontally
    if (touchStartX !== null) {
      const touchCurrentX = e.touches[0].clientX;
      const diff = touchStartX - touchCurrentX;
      if (Math.abs(diff) > 5) {
        e.preventDefault();
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // Swipe threshold of 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left to scroll right
        scrollRight();
      } else {
        // Swipe right to scroll left
        scrollLeft();
      }
    }

    setTouchStartX(null);
  };

  // Add passive: false for touch events to allow preventDefault() in touchmove
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const preventDefaultTouchMove = (e: TouchEvent) => {
      if (touchStartX !== null) {
        const touchCurrentX = e.touches[0].clientX;
        const diff = touchStartX - touchCurrentX;
        if (Math.abs(diff) > 5) {
          e.preventDefault();
        }
      }
    };

    container.addEventListener("touchmove", preventDefaultTouchMove, {
      passive: false,
    });

    return () => {
      container.removeEventListener("touchmove", preventDefaultTouchMove);
    };
  }, [touchStartX]);

  // More reliable movie data with fallback images
  const trendingMovies: MovieCard[] = [
    {
      id: 1,
      title: "The Mandalorian",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg",
      fallbackImageUrl:
        "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      genre: "Sci-Fi",
    },
    {
      id: 2,
      title: "House of the Dragon",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
      fallbackImageUrl:
        "https://images.unsplash.com/photo-1624221734953-b1db2560f94f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      genre: "Fantasy",
    },
    {
      id: 3,
      title: "The Last of Us",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
      fallbackImageUrl:
        "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      genre: "Drama",
    },
    {
      id: 4,
      title: "Loki",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/voHUmluYmKyleFkTu3lOXQG4J1a.jpg",
      fallbackImageUrl:
        "https://images.unsplash.com/photo-1608178398319-48f814d0750c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80",
      genre: "Action",
    },
    {
      id: 5,
      title: "Stranger Things",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
      fallbackImageUrl:
        "https://images.unsplash.com/photo-1626814026762-dd8d0cc6dcbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      genre: "Mystery",
    },
    {
      id: 6,
      title: "Game of Thrones",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
      fallbackImageUrl:
        "https://images.unsplash.com/photo-1572053675669-e6681c78120b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      genre: "Fantasy",
    },
    {
      id: 7,
      title: "Breaking Bad",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
      fallbackImageUrl:
        "https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      genre: "Crime",
    },
    {
      id: 8,
      title: "Money Heist",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
      fallbackImageUrl:
        "https://images.unsplash.com/photo-1618273600568-81c4853c5afd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      genre: "Thriller",
    },
    {
      id: 9,
      title: "The Witcher",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
      genre: "Fantasy",
    },
    {
      id: 10,
      title: "The Queen's Gambit",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg",
      genre: "Drama",
    },
    {
      id: 11,
      title: "Dark",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/apbrbWs8M9lyTqYxCZ57TUXdNlQ.jpg",
      genre: "Mystery",
    },
    {
      id: 12,
      title: "Black Mirror",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/7PRddO6Hol3rQpDomh1IbUzGJgN.jpg",
      genre: "Sci-Fi",
    },
  ];

  // Filter out any movies without imageUrl (in case data is invalid)
  const validMovies = trendingMovies.filter((movie) => movie.title);

  return (
    <section
      className="py-8 bg-gray-900 dark:bg-gray-950 trending-section"
      aria-labelledby="trending-heading"
    >
      {/* Add the styling for scrolling */}
      <style dangerouslySetInnerHTML={{ __html: scrollStyles }} />

      <div className="px-6 md:px-16 lg:px-24">
        {/* Section header with title and see all link */}
        <header className="mb-6">
          <motion.div
            className="flex justify-between items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2
              id="trending-heading"
              className="text-2xl md:text-3xl font-bold text-white relative group"
            >
              Trending Now
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 group-hover:w-full transition-all duration-300 ease-in-out"></span>
            </h2>
            <Link
              to="/trending"
              className="text-blue-400 hover:text-blue-300 dark:text-blue-300 dark:hover:text-blue-200 text-sm font-medium flex items-center transition-all duration-300 hover:translate-x-1"
              aria-label="See all trending content"
            >
              See All
              <svg
                className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </Link>
          </motion.div>
        </header>

        {/* Display a message if no valid movies are available */}
        {validMovies.length === 0 && (
          <div className="flex justify-center items-center py-16">
            <p className="text-white text-lg">
              No trending content available at the moment.
            </p>
          </div>
        )}

        {/* Movies Container */}
        {validMovies.length > 0 && (
          <div
            className="relative overflow-hidden pb-8 -mx-6 px-6 trending-card-wrapper"
            role="region"
            aria-label="Trending movies and shows"
          >
            {/* Left scroll button */}
            <button
              onClick={scrollLeft}
              className="scroll-button left"
              aria-label="Scroll left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Right scroll button */}
            <button
              onClick={scrollRight}
              className="scroll-button right"
              aria-label="Scroll right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            <div
              className="overflow-x-auto"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <motion.div
                ref={scrollContainerRef}
                className="flex space-x-4 md:space-x-6 w-max trending-card-container carousel-touch-container"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {validMovies.map((movie, index) => {
                  return (
                    <motion.article
                      key={movie.id}
                      className="min-w-[160px] md:min-w-[200px] w-[160px] md:w-[200px] flex-shrink-0 cursor-pointer py-5"
                      variants={cardVariants}
                      whileHover="hover"
                      onClick={() => handleOpenModal(movie)}
                    >
                      <div
                        className="block bg-gray-800 dark:bg-gray-800/50 rounded-lg shadow-md overflow-hidden transition-all duration-300 h-full trending-movie-card"
                        aria-label={`View details for ${movie.title}`}
                      >
                        <figure className="relative h-[240px] md:h-[300px] w-full">
                          <LazyImage
                            src={movie.imageUrl}
                            alt={`${movie.title} poster`}
                            className="w-full h-full object-cover object-center rounded-t-lg transition-transform duration-500"
                            fallbackSrc={
                              movie.fallbackImageUrl ||
                              DEFAULT_POSTER_FALLBACK_IMAGE
                            }
                            priority={index < 3}
                            aspectRatio="poster"
                          />

                          {/* Genre Badge */}
                          <div className="absolute top-2 left-2 bg-blue-600/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md z-10">
                            {movie.genre}
                          </div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100 z-20">
                            <div
                              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transform transition-transform duration-300 hover:scale-110"
                              aria-hidden="true"
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
                                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                          </div>
                        </figure>
                        <figcaption className="p-4">
                          <h3 className="text-white font-bold text-sm truncate">
                            {movie.title}
                          </h3>
                        </figcaption>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <MovieDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          movie={selectedMovie}
        />
      )}
    </section>
  );
};

export default TrendingNow;
