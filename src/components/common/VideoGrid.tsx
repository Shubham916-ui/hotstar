import React from "react";
import VideoCard, { VideoCardProps } from "./VideoCard";
import { motion } from "framer-motion";

interface VideoGridProps {
  title: string;
  videos: VideoCardProps[];
  viewAllLink?: string;
}

const VideoGrid: React.FC<VideoGridProps> = ({
  title,
  videos,
  viewAllLink,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-8">
      <div className="px-4 sm:px-6 md:px-16 lg:px-24">
        {/* Section header with title and see all link */}
        <motion.div
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white relative group">
            {title}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400 group-hover:w-full transition-all duration-300 ease-in-out"></span>
          </h2>

          {viewAllLink && (
            <a
              href={viewAllLink}
              className="text-blue-400 hover:text-blue-300 dark:text-blue-300 dark:hover:text-blue-200 text-sm font-medium flex items-center transition-all duration-300 hover:translate-x-1"
            >
              See All
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
            </a>
          )}
        </motion.div>

        {/* Display a message if no videos are available */}
        {videos.length === 0 && (
          <div className="flex justify-center items-center py-16">
            <p className="text-white text-lg">
              No content available at the moment.
            </p>
          </div>
        )}

        {/* Videos grid */}
        {videos.length > 0 && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {videos.map((video) => (
              <motion.div key={video.id} variants={itemVariants}>
                <VideoCard {...video} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default VideoGrid;
