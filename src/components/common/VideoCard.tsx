import React from "react";
import { Link } from "react-router-dom";
import LazyImage, { DEFAULT_POSTER_FALLBACK_IMAGE } from "./LazyImage";

export interface VideoCardProps {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
  year?: string;
  rating?: string;
  description?: string;
  fallbackImageUrl?: string;
  aspectRatio?: "video" | "poster" | "banner" | "square";
}

const VideoCard: React.FC<VideoCardProps> = ({
  id,
  title,
  imageUrl,
  category,
  year,
  rating,
  fallbackImageUrl,
  aspectRatio = "poster",
}) => {
  return (
    <Link
      to={`/video/${id}`}
      className="group relative flex flex-col bg-gray-800 dark:bg-gray-800/50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Video thumbnail */}
      <div className="relative h-[240px] w-full">
        <LazyImage
          src={imageUrl}
          alt={`${title} thumbnail`}
          className="w-full h-full object-cover object-center rounded-t-lg group-hover:scale-105 transition-transform duration-300"
          fallbackSrc={fallbackImageUrl || DEFAULT_POSTER_FALLBACK_IMAGE}
          aspectRatio={aspectRatio}
        />

        {/* Category badge */}
        <div className="absolute top-2 left-2 bg-blue-600/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
          {category}
        </div>

        {/* Rating badge - only show if rating exists */}
        {rating && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-xs font-bold text-white">{rating}</span>
          </div>
        )}

        {/* Play button overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transform transition-transform duration-300 hover:scale-110">
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
      </div>

      {/* Content info */}
      <div className="p-3 flex-grow flex flex-col">
        <h3 className="text-white font-medium line-clamp-2">{title}</h3>
        <div className="flex justify-between text-gray-400 text-xs mt-1">
          {year && <span>{year}</span>}
          <div className="flex items-center ml-auto">
            <svg
              className="w-4 h-4 text-blue-400 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <button
              className="text-blue-400 hover:text-blue-300"
              aria-label={`Add ${title} to watchlist`}
              onClick={(e) => {
                e.preventDefault();
                // Watchlist functionality would go here
                alert(`${title} added to watchlist!`);
              }}
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
      </div>
    </Link>
  );
};

export default VideoCard;
