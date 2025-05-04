import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TimeSlicerFilter from "./TimeSlicerFilter";
import LazyImage from "./common/LazyImage";
import {
  getContentGroupedByTime,
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
  <div className="bg-gray-800 dark:bg-gray-800/50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform duration-200 hover:-translate-y-1">
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

// Section component with simplified animations
const ContentSection = React.memo(
  ({
    title,
    items,
    emptyMessage,
  }: {
    title: string;
    items: ContentItem[];
    emptyMessage: string;
  }) => (
    <div className="mb-8 animate-fadeIn" style={{ animationDuration: "250ms" }}>
      <h3 className="text-xl text-white font-bold mb-4">{title}</h3>
      {items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">{emptyMessage}</p>
      )}
    </div>
  )
);

const TimeBasedContent: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [selectedContentType, setSelectedContentType] = useState<string | null>(
    null
  );

  // Skip animation state to prevent lag when changing filters
  const [skipAnimation, setSkipAnimation] = useState(false);

  // Memoize content to prevent unnecessary recalculations
  const content = useMemo(() => {
    if (selectedTime === null) return null;

    return getContentGroupedByTime(
      selectedTime,
      selectedContentType || undefined
    );
  }, [selectedTime, selectedContentType]);

  // Optimized handler that skips animation when changing filters
  const handleTimeSelected = useCallback(
    (minutes: number, contentType?: string) => {
      // If minutes is 0, it means user has reset selection
      if (minutes === 0) {
        setSelectedTime(null);
        setSelectedContentType(null);
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

  // Get content section title based on selected filters
  const getContentSectionTitle = useCallback(() => {
    if (selectedContentType && selectedContentType !== "all") {
      return `${
        selectedContentType.charAt(0).toUpperCase() +
        selectedContentType.slice(1)
      } content for ${selectedTime} minutes`;
    }
    return `Perfect for ${selectedTime} minutes`;
  }, [selectedTime, selectedContentType]);

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
        {selectedTime !== null && content ? (
          <div
            className={skipAnimation ? "" : "animate-fadeIn"}
            style={{ animationDuration: "200ms" }}
          >
            {/* Perfect Fit Section */}
            <ContentSection
              title={getContentSectionTitle()}
              items={content.perfectFit}
              emptyMessage="No content found for this time duration"
            />

            {/* Maximize Time Section */}
            <ContentSection
              title="Make the most of your time"
              items={content.maximizeTime}
              emptyMessage="No content found for this time duration"
            />

            {/* Episodes Section (if time >= 30 min) */}
            {selectedTime >= 30 && (
              <ContentSection
                title="Episodes"
                items={content.episodes}
                emptyMessage="No episodes found for this time duration"
              />
            )}

            {/* Quick Viewing Section */}
            {selectedTime >= 15 && (
              <ContentSection
                title="Short Content"
                items={content.quickViewing}
                emptyMessage="No short content available"
              />
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

export default TimeBasedContent;
