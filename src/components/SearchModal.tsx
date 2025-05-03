import React, { useState, useEffect, useRef } from "react";

// Define the interface for search results
interface SearchResult {
  id: number;
  title: string;
  type: "movie" | "tvshow" | "sport";
  imageUrl: string;
  year?: string;
  rating?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [popularSearches] = useState<string[]>([
    "Avengers",
    "Game of Thrones",
    "Cricket World Cup",
    "The Last of Us",
    "Loki",
    "Dune",
  ]);

  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sample search results data
  const dummyResults: SearchResult[] = [
    {
      id: 1,
      title: "Avengers: Endgame",
      type: "movie",
      imageUrl:
        "https://images.unsplash.com/photo-1514778357791-f0eb1a87764c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      year: "2019",
      rating: "9.2",
    },
    {
      id: 2,
      title: "Avengers: Infinity War",
      type: "movie",
      imageUrl:
        "https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      year: "2018",
      rating: "8.9",
    },
    {
      id: 3,
      title: "The Avengers",
      type: "movie",
      imageUrl:
        "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1194&q=80",
      year: "2012",
      rating: "8.5",
    },
    {
      id: 4,
      title: "Avengers: Age of Ultron",
      type: "movie",
      imageUrl:
        "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      year: "2015",
      rating: "7.8",
    },
    {
      id: 5,
      title: "Avengers Assemble",
      type: "tvshow",
      imageUrl:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80",
      year: "2013-2019",
    },
  ];

  // Focus the input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [isOpen]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Search logic
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Filter results based on query (case insensitive)
      const filteredResults = dummyResults.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
      setIsLoading(false);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-80 overflow-y-auto pt-20">
      <div
        ref={modalRef}
        className="w-full max-w-3xl bg-gray-900 rounded-lg shadow-xl animate-slideDown"
        style={{ maxHeight: "calc(100vh - 100px)" }}
      >
        {/* Search Input */}
        <div className="p-4 border-b border-gray-800">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              ref={inputRef}
              type="text"
              className="block w-full pl-10 pr-10 py-3 bg-gray-800 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              placeholder="Search for movies, shows, sports..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              aria-label="Search for content"
              role="searchbox"
            />
            {searchQuery && (
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => handleSearch("")}
                aria-label="Clear search"
              >
                <svg
                  className="h-5 w-5 text-gray-400 hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
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
          </div>
        </div>

        {/* Search Results Container */}
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Popular searches (when no query) */}
          {!isLoading && searchQuery === "" && (
            <div className="p-6">
              <h3 className="text-white text-lg font-semibold mb-4">
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, index) => (
                  <button
                    key={index}
                    className="bg-gray-800 hover:bg-gray-700 text-white rounded-full px-4 py-2 text-sm transition-colors"
                    onClick={() => handleSearch(term)}
                    aria-label={`Search for ${term}`}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {!isLoading && searchQuery !== "" && searchResults.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-gray-400 text-lg">
                No results found for "{searchQuery}"
              </h3>
              <p className="mt-2 text-gray-500 text-sm">
                Try checking your spelling or use more general terms
              </p>
            </div>
          )}

          {/* Search results */}
          {!isLoading && searchResults.length > 0 && (
            <div>
              <div className="px-6 py-3 border-b border-gray-800">
                <h3 className="text-white text-lg font-semibold">
                  Search Results
                </h3>
                <p className="text-gray-400 text-sm">
                  Found {searchResults.length} results for "{searchQuery}"
                </p>
              </div>

              <div className="divide-y divide-gray-800">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="p-4 hover:bg-gray-800 transition-colors flex items-center space-x-4"
                  >
                    {/* Thumbnail */}
                    <div className="flex-shrink-0 h-16 w-16 md:h-20 md:w-20 rounded overflow-hidden">
                      <img
                        src={result.imageUrl}
                        alt={result.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate">
                        {result.title}
                      </h4>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-blue-400 border border-blue-400 rounded px-1.5 capitalize">
                          {result.type}
                        </span>
                        {result.year && (
                          <span className="ml-2 text-gray-400 text-sm">
                            {result.year}
                          </span>
                        )}
                        {result.rating && (
                          <span className="ml-2 flex items-center text-gray-400 text-sm">
                            <svg
                              className="h-4 w-4 text-yellow-400 mr-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {result.rating}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Play button */}
                    <button className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
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
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Close button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
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
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
