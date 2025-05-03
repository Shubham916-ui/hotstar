import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeSlicerFilterProps {
  onTimeSelected: (minutes: number, contentType?: string) => void;
  className?: string;
}

const TimeSlicerFilter: React.FC<TimeSlicerFilterProps> = ({
  onTimeSelected,
  className = "",
}) => {
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [customTime, setCustomTime] = useState<number | null>(null);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [selectedContentType, setSelectedContentType] = useState<string | null>(
    null
  );
  const [showContentTypeSelection, setShowContentTypeSelection] =
    useState(false);

  // Memoize options to prevent unnecessary recreations
  const timeOptions = useMemo(
    () => [
      { label: "10 min", value: 10 },
      { label: "20 min", value: 20 },
      { label: "30 min", value: 30 },
      { label: "1 hour", value: 60 },
      { label: "2 hours", value: 120 },
      { label: "Custom", value: 0 },
    ],
    []
  );

  const contentTypeOptions = useMemo(
    () => [
      { label: "All Content", value: "all" },
      { label: "Action", value: "action" },
      { label: "Comedy", value: "comedy" },
      { label: "Drama", value: "drama" },
      { label: "Documentary", value: "documentary" },
      { label: "Family", value: "family" },
      { label: "Thriller", value: "thriller" },
      { label: "Horror", value: "horror" },
    ],
    []
  );

  // Optimized effect to prevent unnecessary updates
  useEffect(() => {
    let timerId: number | null = null;

    if (
      (selectedTime !== null && selectedTime > 0) ||
      (customTime !== null && customTime > 0)
    ) {
      const timeValue = selectedTime || customTime;
      if (timeValue) {
        // Show content type selection immediately without animation
        setShowContentTypeSelection(true);

        // Debounce the notification to parent to prevent rapid re-renders
        if (timerId) window.clearTimeout(timerId);

        timerId = window.setTimeout(() => {
          // If content type is also selected, notify parent
          if (selectedContentType) {
            onTimeSelected(timeValue, selectedContentType);
          } else {
            // Initially pass just the time
            onTimeSelected(timeValue);
          }
        }, 10);
      }
    }

    return () => {
      if (timerId) window.clearTimeout(timerId);
    };
  }, [selectedTime, customTime, selectedContentType, onTimeSelected]);

  // Optimized handlers with useCallback
  const handleTimeSelect = useCallback(
    (value: number) => {
      if (value === 0) {
        // Custom time selected
        setShowCustomInput(true);
        setSelectedTime(null);
      } else if (selectedTime === value) {
        // If same option is clicked again, reset everything
        setSelectedTime(null);
        setShowContentTypeSelection(false);
        setSelectedContentType(null);
        // Reset parent component's state (debounced)
        setTimeout(() => {
          onTimeSelected(0);
        }, 10);
      } else {
        if (selectedTime !== value) {
          setSelectedTime(value);
          setShowCustomInput(false);
        }
      }
    },
    [selectedTime, onTimeSelected]
  );

  const handleCustomTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      if (!isNaN(value) && value > 0) {
        setCustomTime(value);
      } else {
        setCustomTime(null);
      }
    },
    []
  );

  const handleCustomTimeSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (customTime !== null && customTime > 0) {
        setShowContentTypeSelection(true);
        onTimeSelected(customTime);
      }
    },
    [customTime, onTimeSelected]
  );

  const handleContentTypeSelect = useCallback(
    (value: string) => {
      if (value !== selectedContentType) {
        setSelectedContentType(value);
        const timeValue = selectedTime || customTime;
        if (timeValue) {
          // Debounce update to parent
          setTimeout(() => {
            onTimeSelected(timeValue, value);
          }, 10);
        }
      }
    },
    [selectedContentType, selectedTime, customTime, onTimeSelected]
  );

  return (
    <div className={`my-6 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-800 rounded-lg p-4 shadow-lg"
        style={{ willChange: "transform, opacity" }}
      >
        {/* Time Selection Section */}
        <h3 className="text-xl text-white font-bold mb-4 flex items-center">
          <svg
            className="w-6 h-6 mr-2 text-blue-400"
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
          How much time do you have?
        </h3>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
          {timeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleTimeSelect(option.value)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTime === option.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-200 hover:bg-gray-600"
              }`}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {option.label}
            </button>
          ))}
        </div>

        {showCustomInput && (
          <form
            onSubmit={handleCustomTimeSubmit}
            className="mt-3 flex items-center"
          >
            <input
              type="number"
              min="1"
              placeholder="Minutes"
              onChange={handleCustomTimeChange}
              className="bg-gray-700 text-white px-3 py-2 rounded-l-md border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none w-24"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
            >
              Show
            </button>
          </form>
        )}

        {/* Content Type Selection Section - Always rendered but only visible when needed */}
        <div
          className={`mt-5 pt-5 border-t border-gray-700 ${
            showContentTypeSelection
              ? "opacity-100"
              : "opacity-0 pointer-events-none h-0 overflow-hidden"
          }`}
          style={{ transition: "opacity 150ms ease-out" }}
        >
          <h3 className="text-xl text-white font-bold mb-4 flex items-center">
            <svg
              className="w-6 h-6 mr-2 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
            What would you like to watch?
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {contentTypeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleContentTypeSelect(option.value)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedContentType === option.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Filters Summary */}
        {(selectedTime !== null || customTime !== null) && (
          <div className="mt-4 text-blue-300 text-sm">
            <p>
              {selectedContentType && selectedContentType !== "all"
                ? `Showing ${selectedContentType} content for ${
                    selectedTime || customTime
                  } minutes`
                : `Showing perfect content for ${
                    selectedTime || customTime
                  } minutes`}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default React.memo(TimeSlicerFilter);
