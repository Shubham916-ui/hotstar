import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LazyImage, { DEFAULT_BANNER_FALLBACK_IMAGE } from "./common/LazyImage";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [autoplayVideo, setAutoplayVideo] = useState(false); // Changed to false by default

  const heroImageUrl =
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80";
  const trailerUrl =
    "https://www.youtube.com/embed/TcMBFSGVi1c?autoplay=1&mute=1"; // Example trailer URL with autoplay
  const previewSceneUrl =
    "https://www.youtube.com/embed/eHd-M-Cu4E8?autoplay=1&mute=1&start=23&end=38"; // Preview scene with specific start and end times

  // Pre-load the image
  useEffect(() => {
    const img = new Image();
    img.src = heroImageUrl;
    img.onload = () => setImageLoaded(true);
  }, [heroImageUrl]);

  // Removed the auto-play useEffect that was automatically showing the trailer

  // Handle navigation to video details
  const handleWatchNow = () => {
    navigate("/video/the-dark-knight-returns");
  };

  // Toggle watchlist state
  const toggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWatchlisted(!isWatchlisted);
  };

  // Show trailer modal
  const openTrailerModal = () => {
    setShowTrailer(true);
    setAutoplayVideo(false); // Manual open means it's no longer auto-playing
    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  // Close trailer modal
  const closeTrailerModal = () => {
    setShowTrailer(false);
    // Re-enable body scrolling when modal is closed
    document.body.style.overflow = "auto";
  };

  // Function to play the preview scene when user hovers over the play button
  const handlePlayPreview = () => {
    setShowTrailer(true);
    setAutoplayVideo(true);
  };

  return (
    <div className="relative w-full">
      {/* Background Image Container */}
      <motion.div
        className="w-full h-[500px] md:h-[600px] lg:h-[700px] relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>

        {/* Image - using a placeholder image URL, can be replaced with your actual image */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <LazyImage
            src={heroImageUrl}
            alt="The Dark Knight Returns - Batman returns to Gotham City to confront a new threat"
            className="w-full h-full object-cover object-center"
            priority={true}
            aspectRatio="banner"
            fallbackSrc={DEFAULT_BANNER_FALLBACK_IMAGE}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Show low-quality image placeholder while the main image loads */}
          {!imageLoaded && (
            <div
              className="absolute inset-0 bg-gray-800 animate-pulse"
              aria-hidden="true"
            ></div>
          )}
        </motion.div>

        {/* Large Play Button Overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 transform transition-all duration-300 hover:scale-110 focus:outline-none group animate-pulse"
            aria-label="Play trailer"
            onClick={openTrailerModal}
            onMouseEnter={handlePlayPreview} // Added hover functionality (optional)
            onMouseLeave={() => setShowTrailer(false)} // Close preview on mouse leave (optional)
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 md:h-16 md:w-16"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="absolute hidden group-hover:block bg-black/80 text-white text-sm py-1 px-3 rounded-md top-full mt-2 whitespace-nowrap">
              Play Trailer
            </span>
          </button>
        </motion.div>

        {/* Content Container */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end z-20 px-6 pb-20 md:px-16 md:pb-24 lg:px-24 lg:pb-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {/* Content */}
          <div className="max-w-3xl">
            {/* Tags/Categories */}
            <motion.div
              className="flex items-center space-x-2 mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <span className="bg-blue-600 text-white px-2 py-1 text-xs rounded-sm">
                Premium
              </span>
              <span className="text-gray-300 text-sm">
                Action • Adventure • 2023
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              The Dark Knight Returns
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-gray-300 text-sm md:text-base mb-6 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              After a long hiatus, Batman returns to Gotham City to face a new
              threat that's taking over the city. With allies old and new, can
              the Dark Knight save Gotham one more time?
            </motion.p>

            {/* Buttons Container */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              {/* Watch Now Button */}
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md flex items-center transition duration-300"
                aria-label="Watch The Dark Knight Returns"
                onClick={handleWatchNow}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Watch Now
              </button>

              {/* Add to Watchlist Button */}
              <button
                className={`${
                  isWatchlisted
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-800 hover:bg-gray-700"
                } text-white py-3 px-6 rounded-md flex items-center transition duration-300`}
                aria-label={
                  isWatchlisted
                    ? "Remove The Dark Knight Returns from your watchlist"
                    : "Add The Dark Knight Returns to your watchlist"
                }
                onClick={toggleWatchlist}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {isWatchlisted ? (
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  )}
                </svg>
                {isWatchlisted ? "Added" : "Add to Watchlist"}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Trending Shows Strip - Optional, can be removed if not needed */}
      <motion.div
        className="w-full bg-gradient-to-r from-blue-900 to-blue-800 py-4 px-6 md:px-16 lg:px-24"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <div className="flex items-center">
          <span className="text-white font-semibold mr-4">Trending Now:</span>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            <div className="flex-shrink-0 bg-blue-700 rounded-md px-3 py-1 text-white text-sm">
              Game of Thrones
            </div>
            <div className="flex-shrink-0 bg-blue-700 rounded-md px-3 py-1 text-white text-sm">
              Loki
            </div>
            <div className="flex-shrink-0 bg-blue-700 rounded-md px-3 py-1 text-white text-sm">
              House of the Dragon
            </div>
            <div className="flex-shrink-0 bg-blue-700 rounded-md px-3 py-1 text-white text-sm">
              The Last of Us
            </div>
          </div>
        </div>
      </motion.div>

      {/* Video Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Dark overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm transition-opacity"
            onClick={autoplayVideo ? undefined : closeTrailerModal}
          ></div>

          {/* Modal container */}
          <div className="relative z-10 w-full max-w-4xl p-2 md:p-4">
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
              {/* Close button - hidden during autoplay preview */}
              {!autoplayVideo && (
                <button
                  className="absolute top-4 right-4 z-20 bg-black/70 hover:bg-black p-2 rounded-full text-white hover:text-red-500 transition-colors"
                  onClick={closeTrailerModal}
                  aria-label="Close trailer"
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

              {/* Video player - 16:9 aspect ratio wrapper */}
              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={autoplayVideo ? previewSceneUrl : trailerUrl}
                  title="The Dark Knight Returns Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Watch full trailer button - only shown during autoplay preview */}
              {autoplayVideo && (
                <div className="absolute bottom-4 right-4 z-20">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300"
                    onClick={() => {
                      setAutoplayVideo(false);
                      // Keep modal open but switch to full trailer
                    }}
                  >
                    Watch Full Trailer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
