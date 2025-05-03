import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
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
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  isOpen,
  onClose,
  videoUrl,
  title,
}) => {
  // Define a default video URL if one isn't provided
  const defaultVideoUrl = "https://www.youtube.com/embed/TcMBFSGVi1c"; // Avengers Endgame trailer
  const videoSrc = videoUrl || defaultVideoUrl;

  // Handle keyboard events for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with click handler to close */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 z-50"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            onClick={onClose}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
          />

          {/* Video container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <div
              className="w-full max-w-5xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute -top-10 right-0 text-white p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
                onClick={onClose}
                aria-label="Close video player"
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

              {/* Video title */}
              <h2 className="absolute -top-10 left-0 text-white text-xl font-bold truncate pr-12 max-w-full">
                {title}
              </h2>

              {/* 16:9 aspect ratio wrapper */}
              <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={videoSrc}
                  title={`${title} video player`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default VideoPlayer;
