import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LazyImage, { DEFAULT_POSTER_FALLBACK_IMAGE } from "./common/LazyImage";
import VideoPlayer from "./VideoPlayer";

interface MovieDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: {
    id: number;
    title: string;
    imageUrl: string;
    fallbackImageUrl?: string;
    genre: string;
  };
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    y: 50,
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.4,
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
    },
  },
};

const MovieDetailModal: React.FC<MovieDetailModalProps> = ({
  isOpen,
  onClose,
  movie,
}) => {
  // State for the video player
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);

  // Function to open the video player
  const handleOpenVideoPlayer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVideoPlayerOpen(true);
  };

  // Function to close the video player
  const handleCloseVideoPlayer = () => {
    setIsVideoPlayerOpen(false);
  };

  if (!isOpen) return null;

  // Get a trailer URL based on the movie title
  const getTrailerUrl = () => {
    // In a real app, this would come from your API
    // For demonstration, we'll use a few sample trailers
    const trailers: Record<string, string> = {
      "The Mandalorian": "https://www.youtube.com/embed/aOC8E8z_ifw",
      "House of the Dragon": "https://www.youtube.com/embed/DotnJ7tTA34",
      "The Last of Us": "https://www.youtube.com/embed/uLtkt8BonwM",
      Loki: "https://www.youtube.com/embed/nW948Va-l10",
    };

    return trailers[movie.title] || "https://www.youtube.com/embed/TcMBFSGVi1c";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with click handler to close */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 z-40"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            onClick={onClose}
          />

          {/* Modal container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <div
              className="bg-gray-900 max-w-3xl w-full rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with close button */}
              <div className="relative">
                {/* Movie hero image or trailer */}
                <div className="w-full h-64 sm:h-80 bg-gray-800 relative">
                  <LazyImage
                    src={movie.imageUrl}
                    alt={`${movie.title} banner`}
                    className="w-full h-full object-cover"
                    fallbackSrc={
                      movie.fallbackImageUrl || DEFAULT_POSTER_FALLBACK_IMAGE
                    }
                    aspectRatio="banner"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full transform transition-transform duration-300 hover:scale-110 focus:outline-none"
                      aria-label={`Play ${movie.title} trailer`}
                      onClick={handleOpenVideoPlayer}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
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
                    </button>
                  </div>

                  {/* Close button */}
                  <button
                    className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors duration-200"
                    onClick={onClose}
                    aria-label="Close details"
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

                  {/* Movie title */}
                  <div className="absolute bottom-0 left-0 p-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      {movie.title}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Movie details */}
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2 text-gray-400 mb-4">
                  <span className="bg-blue-600/80 text-white text-xs px-2 py-1 rounded-md">
                    {movie.genre}
                  </span>
                  <span>•</span>
                  <span>2023</span>
                  <span>•</span>
                  <span>2h 15m</span>
                  <span className="ml-auto bg-yellow-500 text-black px-2 py-0.5 rounded text-xs font-bold">
                    8.7
                  </span>
                </div>

                <p className="text-gray-300 mb-6">
                  This is a trending title that viewers are loving right now.{" "}
                  {movie.title} brings exciting action and adventure that will
                  keep you on the edge of your seat.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center transition-colors duration-200"
                    onClick={handleOpenVideoPlayer}
                  >
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
                  <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition-colors duration-200">
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
          </motion.div>

          {/* Video Player */}
          <VideoPlayer
            isOpen={isVideoPlayerOpen}
            onClose={handleCloseVideoPlayer}
            videoUrl={getTrailerUrl()}
            title={`${movie.title} Trailer`}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default MovieDetailModal;
