import React from "react";
import { ContinueWatchingTray } from "./TimeBasedContent";
import LazyImage from "./common/LazyImage";

// Hero Banner Component
export const HeroBanner = () => {
  const featuredContent = {
    id: 301,
    title: "Kull: The Legacy of the Raisingghs",
    imageUrl:
      "https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    badge: "New Release",
    year: "2025",
    age: "U/A 16+",
    season: "1 Season",
    languages: "7 Languages",
    description:
      "A dysfunctional royal family implodes with the death of their diabolical patriarch. Now, the three surviving Raisingghs battle it out for power and kingship.",
    genres: ["Drama", "Thriller", "Father-Son", "Fight"],
  };

  return (
    <div className="relative w-full h-[75vh] min-h-[600px] overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <LazyImage
          src={featuredContent.imageUrl}
          alt={featuredContent.title}
          className="w-full h-full object-cover"
          aspectRatio="banner"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 text-white max-w-3xl">
        {/* Hotstar specials */}
        <div className="mb-2">
          <span className="text-gray-300 text-sm">hotstar</span>
          <span className="text-blue-400 text-sm ml-1">specials</span>
        </div>

        {/* Title */}
        <div className="mb-4">
          <img
            src="https://brand-img.hotstar.com/placeholder-horizontal.png"
            alt="Kull logo"
            className="h-24 object-contain mb-4"
          />
          <span className="text-blue-400 text-sm">{featuredContent.badge}</span>
        </div>

        {/* Metadata */}
        <div className="flex items-center space-x-2 text-sm text-gray-300 mb-2">
          <span>{featuredContent.year}</span>
          <span className="w-1 h-1 rounded-full bg-gray-500"></span>
          <span className="px-2 py-0.5 border border-gray-500 rounded text-xs">
            {featuredContent.age}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-500"></span>
          <span>{featuredContent.season}</span>
          <span className="w-1 h-1 rounded-full bg-gray-500"></span>
          <span>{featuredContent.languages}</span>
        </div>

        {/* Description */}
        <p className="text-gray-200 mb-4 max-w-2xl">
          {featuredContent.description}
        </p>

        {/* Genre tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {featuredContent.genres.map((genre, index) => (
            <div key={index} className="flex items-center">
              <span className="text-gray-300">{genre}</span>
              {index < featuredContent.genres.length - 1 && (
                <span className="mx-2 text-gray-500">|</span>
              )}
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex space-x-3 mb-8">
          <button className="bg-gradient-to-r from-blue-600 to-pink-600 text-white px-8 py-3 rounded-md flex items-center hover:opacity-90 transition-opacity">
            <svg
              className="w-6 h-6 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Now
          </button>
          <button className="bg-gray-800/80 text-white p-3 rounded-md hover:bg-gray-700/80 transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>

        {/* Thumbnail navigation */}
        <div className="flex space-x-2 overflow-x-auto pb-2 max-w-lg">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className={`flex-shrink-0 w-16 h-10 rounded overflow-hidden border-2 ${
                  i === 1 ? "border-blue-500" : "border-transparent"
                } hover:border-blue-400 transition-colors cursor-pointer`}
              >
                <LazyImage
                  src={`https://image.tmdb.org/t/p/w300/placeholder-${
                    i + 1
                  }.jpg`}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                  aspectRatio="video"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// HomePage Component
const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Continue Watching Section - Right below the hero banner */}
      <div className="container mx-auto px-4 mt-6">
        <ContinueWatchingTray />
      </div>

      {/* Other sections would go here */}
    </div>
  );
};

export default HomePage;
