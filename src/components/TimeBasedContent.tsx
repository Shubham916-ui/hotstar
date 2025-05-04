import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import TimeSlicerFilter from "./TimeSlicerFilter";
import LazyImage from "./common/LazyImage";
import {
  getContentGroupedByTime,
  getContentByTime,
  getAllGenres,
  type ContentItem,
} from "../services/timeBasedContentService";

// Simple fade-in animation without staggering
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

// Content card component is entirely CSS-based for better performance
const ContentCard = React.memo(({ item }: { item: ContentItem }) => (
  <div className="bg-gray-800 dark:bg-gray-800/50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform duration-200 hover:-translate-y-1 h-full">
    <div className="w-full h-[200px] md:h-[250px] relative">
      <LazyImage
        src={item.imageUrl}
        alt={`${item.title} poster`}
        className="w-full h-full object-cover object-center"
        aspectRatio="poster"
      />

      {/* Duration badge */}
      <div className="absolute top-2 left-2 bg-blue-600 rounded-full px-2 py-1 flex items-center">
        <svg
          className="w-4 h-4 mr-1 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-xs font-bold text-white">
          {item.durationMinutes} min
        </span>
      </div>

      {/* Rating badge */}
      <div className="absolute top-2 right-2 bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center">
        <span className="text-xs font-bold text-gray-900">{item.rating}</span>
      </div>

      {/* Content type badge */}
      <div className="absolute bottom-2 left-2 bg-gray-900/80 rounded-md px-2 py-1">
        <span className="text-xs font-medium text-white">
          {item.type === "movie"
            ? "Movie"
            : item.type === "episode"
            ? "Episode"
            : item.type === "documentary"
            ? "Documentary"
            : "Short Film"}
        </span>
      </div>

      {/* Genre badge if available */}
      {item.genre && (
        <div className="absolute bottom-2 right-2 bg-blue-500/80 rounded-md px-2 py-1">
          <span className="text-xs font-medium text-white">{item.genre}</span>
        </div>
      )}
    </div>

    <div className="p-3">
      <h3 className="text-white font-medium truncate">{item.title}</h3>
      <div className="flex justify-between text-gray-400 text-xs mt-1">
        <span>{item.year}</span>
        <button
          className="text-blue-400 hover:text-blue-300"
          aria-label={`Play ${item.title}`}
        >
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
        </button>
      </div>
    </div>
  </div>
));

// Horizontal carousel component
const ContentCarousel = React.memo(
  ({
    title,
    items,
    emptyMessage,
  }: {
    title: string;
    items: ContentItem[];
    emptyMessage: string;
  }) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    // Scroll functions
    const scrollLeft = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
      }
    };

    const scrollRight = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
    };

    if (items.length === 0) {
      return (
        <div className="mb-8">
          <h3 className="text-xl text-white font-bold mb-4">{title}</h3>
          <p className="text-gray-400">{emptyMessage}</p>
        </div>
      );
    }

    return (
      <div className="mb-8 relative group">
        <h3 className="text-xl text-white font-bold mb-4">{title}</h3>

        {/* Left scroll button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -mt-5 z-10 bg-black/70 rounded-r-lg p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ transform: "translateY(30px)" }}
          aria-label="Scroll left"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide snap-x"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollSnapType: "x mandatory",
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-none w-[220px] snap-start"
              style={{ scrollSnapAlign: "start" }}
            >
              <ContentCard item={item} />
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -mt-5 z-10 bg-black/70 rounded-l-lg p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ transform: "translateY(30px)" }}
          aria-label="Scroll right"
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    );
  }
);

// Render section for displaying when there's no content
const NoContentMessage = () => (
  <div className="text-center py-8 bg-gray-800/50 rounded-lg">
    <svg
      className="w-16 h-16 mx-auto text-gray-600 mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
      />
    </svg>
    <p className="text-gray-400 text-lg">
      No content available for this selection
    </p>
    <p className="text-gray-500 mt-2">
      Try selecting a different time duration or category
    </p>
  </div>
);

const TimeBasedContent: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [selectedContentType, setSelectedContentType] = useState<string | null>(
    null
  );
  const [activeGenre, setActiveGenre] = useState<string>("all");

  // Skip animation state to prevent lag when changing filters
  const [skipAnimation, setSkipAnimation] = useState(false);

  // Get all available genres
  const allGenres = useMemo(() => ["all"].concat(getAllGenres()), []);

  // Custom function to extract perfect fit items from grouped content
  const extractPerfectFitItems = useCallback(
    (
      groupedContent: ReturnType<typeof getContentGroupedByTime>
    ): ContentItem[] => {
      return groupedContent.perfectFit;
    },
    []
  );

  // Memoize content by genres
  const contentByGenres = useMemo(() => {
    if (selectedTime === null) return null;

    const genreContentMap: Record<string, ContentItem[]> = {};

    // For "all" category, use all content types
    genreContentMap["all"] = getContentByTime(
      selectedTime,
      5,
      selectedContentType || undefined
    );

    // For each genre, get content filtered by both time and genre
    getAllGenres().forEach((genre) => {
      genreContentMap[genre] = getContentByTime(selectedTime, 5, genre);
    });

    return genreContentMap;
  }, [selectedTime, selectedContentType]);

  // Optimized handler that skips animation when changing filters
  const handleTimeSelected = useCallback(
    (minutes: number, contentType?: string) => {
      // If minutes is 0, it means user has reset selection
      if (minutes === 0) {
        setSelectedTime(null);
        setSelectedContentType(null);
        setActiveGenre("all");
        return;
      }

      // Skip animation when changing filters to prevent lag
      setSkipAnimation(true);

      // Use requestAnimationFrame to prevent jank
      requestAnimationFrame(() => {
        setSelectedTime(minutes);
        setSelectedContentType(contentType || null);

        // Reset skip flag after a short delay
        setTimeout(() => {
          setSkipAnimation(false);
        }, 100);
      });
    },
    []
  );

  // Genre selector component
  const GenreSelector = () => (
    <div className="mb-6">
      <h3 className="text-xl text-white font-bold mb-4">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {allGenres.map((genre) => (
          <button
            key={genre}
            onClick={() => setActiveGenre(genre)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeGenre === genre
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section
      className="py-8 bg-gray-900 overflow-hidden overscroll-contain"
      style={{ overscrollBehavior: "none", backgroundColor: "#111827" }}
    >
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div>
            <h2 className="text-3xl text-white font-bold mb-2">
              Time-Based Content
            </h2>
            <p className="text-gray-400">
              Find the perfect content based on your available time
            </p>
          </div>
        </div>

        <TimeSlicerFilter onTimeSelected={handleTimeSelected} />

        {/* Simplified Content Rendering - No animations when changing filters */}
        {selectedTime !== null ? (
          <div
            className={skipAnimation ? "" : "animate-fadeIn"}
            style={{ animationDuration: "200ms" }}
          >
            {/* Genre selector */}
            <GenreSelector />

            {/* Check if there's any content at all */}
            {contentByGenres &&
            Object.values(contentByGenres).some((items) => items.length > 0) ? (
              <div className="mb-12">
                {/* Show specific genre if selected */}
                {activeGenre !== "all" ? (
                  contentByGenres &&
                  contentByGenres[activeGenre] &&
                  contentByGenres[activeGenre].length > 0 ? (
                    <ContentCarousel
                      key={activeGenre}
                      title={`${
                        activeGenre.charAt(0).toUpperCase() +
                        activeGenre.slice(1)
                      } Content`}
                      items={contentByGenres[activeGenre]}
                      emptyMessage={`No ${activeGenre} content found for this time duration`}
                    />
                  ) : (
                    <NoContentMessage />
                  )
                ) : (
                  // Show all genres
                  allGenres.map((genre) => {
                    // Skip if no content for this genre or if it's the "all" category
                    if (
                      genre === "all" ||
                      !contentByGenres ||
                      !contentByGenres[genre] ||
                      contentByGenres[genre].length === 0
                    ) {
                      return null;
                    }

                    return (
                      <ContentCarousel
                        key={genre}
                        title={`${
                          genre.charAt(0).toUpperCase() + genre.slice(1)
                        } Content`}
                        items={contentByGenres[genre]}
                        emptyMessage={`No ${genre} content found for this time duration`}
                      />
                    );
                  })
                )}
              </div>
            ) : (
              <NoContentMessage />
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              Select your available time to watch
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

// Component for recommendations tray like in the image
export const ContinueWatchingTray = () => {
  // Simple CSS for layout only - minimizing animations and effects
  const baseStyles = `
    .carousel-container {
      padding-bottom: 1rem;
      overflow-x: auto;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none;  /* IE and Edge */
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      position: relative;
      display: flex;
      gap: 16px;
      margin-left: 16px;
    }
    
    .carousel-container::-webkit-scrollbar {
      display: none; /* Chrome, Safari and Opera */
    }
    
    .cw-title {
      margin-left: 16px;
      margin-bottom: 16px;
      font-weight: bold;
      font-size: 1.5rem;
      color: white;
    }
    
    .cw-card {
      flex: none;
      width: 270px;
      border-radius: 8px;
      overflow: hidden;
      background-color: #1e293b;
      position: relative;
    }
    
    .progress-bar {
      height: 4px;
      background-color: #3b4a63;
      width: 100%;
    }
    
    .progress-value {
      height: 100%;
      background-color: #0369a1;
    }
    
    .card-content {
      padding: 12px;
    }
    
    .card-title {
      color: white;
      font-weight: 500;
      margin-bottom: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .card-subtitle {
      color: #94a3b8;
      font-size: 0.75rem;
    }
  `;

  // Sample data
  const watchlist = [
    {
      id: 101,
      title: "Sweetheart",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      progress: 45, // percentage watched
    },
    {
      id: 102,
      title: "1920",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg",
      progress: 30,
    },
    {
      id: 103,
      title: "IPL Weekly",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
      progress: 60,
    },
    {
      id: 104,
      title: "Wild Safari",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/iZf0KyrE25z1sage4SYFLCCrMi9.jpg",
      progress: 75,
    },
    {
      id: 105,
      title: "VR Experience",
      imageUrl:
        "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      progress: 15,
    },
  ];

  const carouselRef = useRef<HTMLDivElement>(null);

  // Simple touch event handling for swipe gestures
  const [touchStartX, setTouchStartX] = useState<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;

    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX;

    // Swipe threshold of 50px
    if (Math.abs(swipeDistance) < 50) return;

    if (swipeDistance > 0) {
      // Swipe right
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      // Swipe left
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-12 mb-16">
      <style>{baseStyles}</style>

      <h2 className="cw-title">Continue Watching for You</h2>

      <div
        ref={carouselRef}
        className="carousel-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {watchlist.map((item) => (
          <div key={item.id} className="cw-card">
            {/* Image */}
            <div
              style={{ width: "100%", height: "152px", position: "relative" }}
            >
              <LazyImage
                src={item.imageUrl}
                alt={`${item.title} poster`}
                className="w-full h-full object-cover"
                aspectRatio="banner"
              />

              {/* Play overlay on hover - not visible in screenshot but keeping for functionality */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
                <button className="bg-black/60 p-2 rounded-full">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="progress-bar">
              <div
                className="progress-value"
                style={{ width: `${item.progress}%` }}
              />
            </div>

            {/* Content */}
            <div className="card-content">
              <h3 className="card-title">{item.title}</h3>
              <p className="card-subtitle">Continue Watching</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeBasedContent;
