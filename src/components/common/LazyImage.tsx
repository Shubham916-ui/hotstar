import React, { useState, useEffect } from "react";

// Default fallback image (base64 encoded placeholder)
export const DEFAULT_FALLBACK_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE2OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE2OSIgZmlsbD0iIzFmMjkzNyIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2MTdhODUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPk5vIEltYWdlIEF2YWlsYWJsZTwvdGV4dD4KPC9zdmc+";

// Default fallback for hero/banner images
export const DEFAULT_BANNER_FALLBACK_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjMWYyOTM3Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzYxN2E4NSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+QmFubmVyIEltYWdlIFVuYXZhaWxhYmxlPC90ZXh0Pgo8L3N2Zz4=";

// Default fallback for portrait movie posters
export const DEFAULT_POSTER_FALLBACK_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzFmMjkzNyIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2MTdhODUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPk5vIFBvc3RlcjwvdGV4dD4KICA8dGV4dCB4PSI1MCUiIHk9IjYwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjE3YTg1IiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5BdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPg==";

// Category-specific fallback images
export const MOVIES_FALLBACK_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE2OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE2OSIgZmlsbD0iIzFmMjkzNyIvPgogIDxwYXRoIGQ9Ik0xMjAsMzAgSDYwIHY4MCBoNjAgdi04MCBNMTgwLDMwIEgxMjAgdjgwIGg2MCB2LTgwIE0yNDAsMzAgSDE4MCB2ODAgaDYwIHYtODAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzYxN2E4NSIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPGNpcmNsZSBjeD0iNjAiIGN5PSIzMCIgcj0iOCIgZmlsbD0iIzYxN2E4NSIvPgogIDxjaXJjbGUgY3g9IjEyMCIgY3k9IjMwIiByPSI4IiBmaWxsPSIjNjE3YTg1Ii8+CiAgPGNpcmNsZSBjeD0iMTgwIiBjeT0iMzAiIHI9IjgiIGZpbGw9IiM2MTdhODUiLz4KICA8Y2lyY2xlIGN4PSIyNDAiIGN5PSIzMCIgcj0iOCIgZmlsbD0iIzYxN2E4NSIvPgogIDx0ZXh0IHg9IjE1MCIgeT0iMTQwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2MTdhODUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPk1vdmllczwvdGV4dD4KPC9zdmc+";

export const TV_SHOWS_FALLBACK_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE2OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE2OSIgZmlsbD0iIzFmMjkzNyIvPgogIDxyZWN0IHg9IjgwIiB5PSI0MCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSI4MCIgc3Ryb2tlPSIjNjE3YTg1IiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiLz4KICA8cmVjdCB4PSIxMDAiIHk9IjUwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjNjE3YTg1IiBmaWxsLW9wYWNpdHk9IjAuMyIvPgogIDxsaW5lIHgxPSIxMjAiIHkxPSIxMjAiIHgyPSIxNjAiIHkyPSIxMjAiIHN0cm9rZT0iIzYxN2E4NSIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPGxpbmUgeDE9IjE0MCIgeTE9IjEyMCIgeDI9IjE0MCIgeTI9IjEzMCIgc3Ryb2tlPSIjNjE3YTg1IiBzdHJva2Utd2lkdGg9IjMiLz4KICA8dGV4dCB4PSIxNTAiIHk9IjE0NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjE3YTg1IiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5UViBTaG93czwvdGV4dD4KPC9zdmc+";

export const SPORTS_FALLBACK_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE2OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE2OSIgZmlsbD0iIzFmMjkzNyIvPgogIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjgwIiByPSI0MCIgc3Ryb2tlPSIjNjE3YTg1IiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiLz4KICA8cGF0aCBkPSJNMTUwLDQwIEExMCwxMCAwIDAgMSAxNjAsNTAgQTEwLDEwIDAgMCAxIDE1MCw2MCBBMTAsMTAgMCAwIDEgMTQwLDUwIEExMCwxMCAwIDAgMSAxNTAsNDAiIGZpbGw9IiM2MTdhODUiLz4KICA8cGF0aCBkPSJNMTUwLDEwMCBBMTAsMTAgMCAwIDEgMTYwLDExMCBBMTAsMTAgMCAwIDEgMTUwLDEyMCBBMTAsMTAgMCAwIDEgMTQwLDExMCBBMTAsMTAgMCAwIDEgMTUwLDEwMCIgZmlsbD0iIzYxN2E4NSIvPgogIDxwYXRoIGQ9Ik0xMTAsODAgQTEwLDEwIDAgMCAxIDEyMCw5MCBBMTAsMTAgMCAwIDEgMTEwLDEwMCBBMTAsMTAgMCAwIDEgMTAwLDkwIEExMCwxMCAwIDAgMSAxMTAsODAiIGZpbGw9IiM2MTdhODUiLz4KICA8cGF0aCBkPSJNMTkwLDgwIEExMCwxMCAwIDAgMSAyMDAsOTAgQTEwLDEwIDAgMCAxIDE5MCwxMDAgQTEwLDEwIDAgMCAxIDE4MCw5MCBBMTAsMTAgMCAwIDEgMTkwLDgwIiBmaWxsPSIjNjE3YTg1Ii8+CiAgPHRleHQgeD0iMTUwIiB5PSIxNDUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzYxN2E4NSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+U3BvcnRzPC90ZXh0Pgo8L3N2Zz4=";

export const NEWS_FALLBACK_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE2OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE2OSIgZmlsbD0iIzFmMjkzNyIvPgogIDxyZWN0IHg9IjQwIiB5PSI0MCIgd2lkdGg9IjIyMCIgaGVpZ2h0PSI4MCIgc3Ryb2tlPSIjNjE3YTg1IiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiLz4KICA8bGluZSB4MT0iNzAiIHkxPSI2MCIgeDI9IjIzMCIgeTI9IjYwIiBzdHJva2U9IiM2MTdhODUiIHN0cm9rZS13aWR0aD0iMiIvPgogIDxsaW5lIHgxPSI3MCIgeTE9IjgwIiB4Mj0iMjMwIiB5Mj0iODAiIHN0cm9rZT0iIzYxN2E4NSIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPGxpbmUgeDE9IjcwIiB5MT0iMTAwIiB4Mj0iMjMwIiB5Mj0iMTAwIiBzdHJva2U9IiM2MTdhODUiIHN0cm9rZS13aWR0aD0iMiIvPgogIDxyZWN0IHg9IjQwIiB5PSI0MCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjNjE3YTg1Ii8+CiAgPHRleHQgeD0iMTUwIiB5PSIxNDUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzYxN2E4NSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+TmV3czwvdGV4dD4KPC9zdmc+";

// Image cache to store loaded images
const imageCache = new Map<string, boolean>();

interface LazyImageProps {
  src: string;
  alt: string;
  className: string;
  fallbackSrc?: string;
  priority?: boolean;
  aspectRatio?: "video" | "poster" | "banner" | "square";
  placeholderColor?: string;
  onLoad?: () => void;
}

/**
 * A reusable lazy loading image component with fallback handling and optimized loading
 */
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  fallbackSrc,
  priority = false,
  aspectRatio = "video",
  placeholderColor = "bg-gray-800",
  onLoad,
}) => {
  const [loaded, setLoaded] = useState(imageCache.has(src) ? true : false);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  const [showPlaceholder, setShowPlaceholder] = useState(!imageCache.has(src));

  // Determine appropriate fallback based on aspect ratio if not provided
  const getFallbackImage = () => {
    if (fallbackSrc) return fallbackSrc;

    switch (aspectRatio) {
      case "banner":
        return DEFAULT_BANNER_FALLBACK_IMAGE;
      case "poster":
        return DEFAULT_POSTER_FALLBACK_IMAGE;
      case "square":
      case "video":
      default:
        return DEFAULT_FALLBACK_IMAGE;
    }
  };

  // Preload the image
  useEffect(() => {
    // Skip if already in cache
    if (imageCache.has(src)) {
      setLoaded(true);
      setShowPlaceholder(false);
      return;
    }

    // For higher priority images, preload immediately
    if (priority) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.set(src, true);
        setLoaded(true);
        setShowPlaceholder(false);
        if (onLoad) onLoad();
      };
      img.onerror = handleError;
    }
  }, [src, priority]);

  // Reset states when src changes
  useEffect(() => {
    if (imageCache.has(src)) {
      setLoaded(true);
      setShowPlaceholder(false);
    } else {
      setLoaded(false);
      setShowPlaceholder(true);
      setError(false);
    }
    setImageSrc(src);
  }, [src]);

  const handleError = () => {
    if (!error) {
      setError(true);
      const fallbackImg = getFallbackImage();
      setImageSrc(fallbackImg);
      // No need to cache fallbacks
    }
  };

  const handleLoad = () => {
    // Cache the loaded image
    imageCache.set(src, true);
    setLoaded(true);

    // Start hiding the placeholder
    setShowPlaceholder(false);

    if (onLoad) onLoad();
  };

  // Return optimized image component
  return (
    <div
      className={`relative w-full h-full overflow-hidden ${placeholderColor}`}
    >
      {/* Low quality background color placeholder */}
      {showPlaceholder && (
        <div
          className={`absolute inset-0 ${placeholderColor} ${
            loaded ? "animate-fadeOut" : "animate-pulse"
          }`}
          aria-hidden="true"
          style={{
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {/* Simple loader with blurry preview of content shape */}
          <div className="flex items-center justify-center h-full">
            <div className="w-12 h-12 relative">
              <div className="absolute inset-0 blur-sm rounded-md opacity-30 bg-blue-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actual image with optimized rendering */}
      <img
        src={imageSrc}
        alt={alt}
        className={`${className} ${loaded ? "opacity-100" : "opacity-0"}`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          transition: "opacity 0.3s ease-in-out",
        }}
      />
    </div>
  );
};

// Add a preloader function that can be called to warm up the cache
export const preloadImages = (srcs: string[]) => {
  srcs.forEach((src) => {
    if (!imageCache.has(src)) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.set(src, true);
      };
    }
  });
};

export default LazyImage;
