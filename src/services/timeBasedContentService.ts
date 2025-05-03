interface ContentItem {
  id: number;
  title: string;
  imageUrl: string;
  durationMinutes: number;
  type: "movie" | "episode" | "short" | "documentary";
  rating: string;
  year: string;
  description?: string;
  genre?: string;
}

// Sample content data (in a real app, this would come from an API)
const allContent: ContentItem[] = [
  {
    id: 1,
    title: "The Last Dance",
    imageUrl: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    durationMinutes: 48,
    type: "episode",
    rating: "9.2",
    year: "2020",
    description: "A documentary about Michael Jordan and the Chicago Bulls.",
    genre: "documentary",
  },
  {
    id: 2,
    title: "Marriage Story",
    imageUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    durationMinutes: 137,
    type: "movie",
    rating: "8.5",
    year: "2019",
    description:
      "A stage director and his actor wife struggle through a divorce.",
    genre: "drama",
  },
  {
    id: 3,
    title: "Coffee with Karan - Episode 5",
    imageUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    durationMinutes: 45,
    type: "episode",
    rating: "7.8",
    year: "2023",
    description: "Talk show with Bollywood celebrities.",
    genre: "comedy",
  },
  {
    id: 4,
    title: "Short Film: Devi",
    imageUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    durationMinutes: 13,
    type: "short",
    rating: "8.7",
    year: "2020",
    description:
      "A powerful short film featuring nine women from different walks of life.",
    genre: "drama",
  },
  {
    id: 5,
    title: "The Office Season 1 Episode 1",
    imageUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    durationMinutes: 22,
    type: "episode",
    rating: "8.8",
    year: "2005",
    description: "The first episode of the hit comedy series.",
    genre: "comedy",
  },
  {
    id: 6,
    title: "Planet Earth II - Islands",
    imageUrl: "https://image.tmdb.org/t/p/w500/iZf0KyrE25z1sage4SYFLCCrMi9.jpg",
    durationMinutes: 58,
    type: "documentary",
    rating: "9.5",
    year: "2016",
    description: "Wildlife documentary exploring remote islands.",
    genre: "documentary",
  },
  {
    id: 7,
    title: "Friends S1 E1: The One Where Monica Gets a Roommate",
    imageUrl: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    durationMinutes: 25,
    type: "episode",
    rating: "8.9",
    year: "1994",
    description: "The pilot episode of the classic sitcom.",
    genre: "comedy",
  },
  {
    id: 8,
    title: "Interstellar",
    imageUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    durationMinutes: 169,
    type: "movie",
    rating: "8.6",
    year: "2014",
    description: "A team of explorers travel through a wormhole in space.",
    genre: "action",
  },
  {
    id: 9,
    title: "Panchayat S1 E1",
    imageUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    durationMinutes: 35,
    type: "episode",
    rating: "8.9",
    year: "2020",
    description: "An engineering graduate takes up a job in a remote village.",
    genre: "comedy",
  },
  {
    id: 10,
    title: "Everything Everywhere All at Once",
    imageUrl: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    durationMinutes: 139,
    type: "movie",
    rating: "8.9",
    year: "2022",
    description: "A middle-aged Chinese immigrant is swept up in an adventure.",
    genre: "action",
  },
  {
    id: 11,
    title: "Breakfast at Tiffany's",
    imageUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    durationMinutes: 114,
    type: "movie",
    rating: "7.6",
    year: "1961",
    description:
      "A young New York socialite becomes interested in a young man.",
    genre: "drama",
  },
  {
    id: 12,
    title: "Wild Wild Country - Episode 1",
    imageUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    durationMinutes: 64,
    type: "documentary",
    rating: "8.2",
    year: "2018",
    description: "A controversial cult leader builds a utopian city in Oregon.",
    genre: "documentary",
  },
  {
    id: 13,
    title: "Ted Lasso - Pilot",
    imageUrl: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    durationMinutes: 32,
    type: "episode",
    rating: "8.7",
    year: "2020",
    description:
      "An American football coach is hired to manage an English soccer team.",
    genre: "comedy",
  },
  {
    id: 14,
    title: "Oppenheimer",
    imageUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    durationMinutes: 180,
    type: "movie",
    rating: "8.8",
    year: "2023",
    description: "The story of American scientist J. Robert Oppenheimer.",
    genre: "drama",
  },
  {
    id: 15,
    title: "The Bear - System",
    imageUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    durationMinutes: 25,
    type: "episode",
    rating: "9.1",
    year: "2022",
    description: "A young chef returns home to run his family's restaurant.",
    genre: "drama",
  },
  {
    id: 16,
    title: "The Conjuring",
    imageUrl: "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg",
    durationMinutes: 112,
    type: "movie",
    rating: "7.5",
    year: "2013",
    description:
      "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
    genre: "horror",
  },
  {
    id: 17,
    title: "Toy Story",
    imageUrl: "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
    durationMinutes: 81,
    type: "movie",
    rating: "8.3",
    year: "1995",
    description:
      "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
    genre: "family",
  },
  {
    id: 18,
    title: "Die Hard",
    imageUrl: "https://image.tmdb.org/t/p/w500/yFihWxQcmqcaBR31QM6Y8gT6aYV.jpg",
    durationMinutes: 132,
    type: "movie",
    rating: "8.2",
    year: "1988",
    description:
      "An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party.",
    genre: "action",
  },
  {
    id: 19,
    title: "Stranger Things S1 E1",
    imageUrl: "https://image.tmdb.org/t/p/w500/5UatQrKV2XL5ULZ9XN4wP1Rl9ol.jpg",
    durationMinutes: 47,
    type: "episode",
    rating: "8.7",
    year: "2016",
    description:
      "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.",
    genre: "thriller",
  },
  {
    id: 20,
    title: "A Quiet Place",
    imageUrl: "https://image.tmdb.org/t/p/w500/nAU74GmpUk7t5iklEp3bufwDq4n.jpg",
    durationMinutes: 90,
    type: "movie",
    rating: "7.5",
    year: "2018",
    description:
      "In a post-apocalyptic world, a family is forced to live in silence while hiding from monsters with ultra-sensitive hearing.",
    genre: "thriller",
  },
];

/**
 * Filters content based on user's available time
 *
 * @param availableTimeMinutes The time user has available (in minutes)
 * @param buffer Buffer time (±) to include content slightly outside the time range
 * @returns Filtered content items
 */
export const getContentByTime = (
  availableTimeMinutes: number,
  buffer: number = 5,
  contentType?: string
): ContentItem[] => {
  // Calculate min and max duration with buffer
  const minDuration = Math.max(0, availableTimeMinutes - buffer);
  const maxDuration = availableTimeMinutes + buffer;

  // Filter by time
  let filtered = allContent.filter(
    (item) =>
      item.durationMinutes >= minDuration && item.durationMinutes <= maxDuration
  );

  // If content type is specified, filter by it
  if (contentType && contentType !== "all") {
    filtered = filtered.filter((item) => item.genre === contentType);
  }

  return filtered;
};

/**
 * Gets content that can be watched in the available time
 * (shorter than the available time)
 */
export const getContentUnderTime = (
  availableTimeMinutes: number,
  contentType?: string
): ContentItem[] => {
  // Get all items that fit within the time constraint
  let filtered = allContent
    .filter((item) => item.durationMinutes <= availableTimeMinutes)
    .sort((a, b) => b.durationMinutes - a.durationMinutes); // Sort by longest first

  // If content type is specified, filter by it
  if (contentType && contentType !== "all") {
    filtered = filtered.filter((item) => item.genre === contentType);
  }

  return filtered;
};

/**
 * Gets content grouped by time categories for more flexible recommendations
 */
export const getContentGroupedByTime = (
  availableTimeMinutes: number,
  contentType?: string
) => {
  // For exact matches - content that fits perfectly in the time slot
  const exactMatches = getContentByTime(availableTimeMinutes, 5, contentType);

  // Content that fits perfectly (within 5 min buffer)
  const perfectFit = exactMatches;

  // Get content that's shorter than available time
  let filteredByTime = allContent.filter(
    (item) => item.durationMinutes <= availableTimeMinutes
  );

  // If content type specified, apply that filter
  if (contentType && contentType !== "all") {
    filteredByTime = filteredByTime.filter(
      (item) => item.genre === contentType
    );
  }

  // Short content for quick viewing
  const quickViewing = filteredByTime
    .filter((item) => item.durationMinutes <= 15)
    .sort((a, b) => b.rating.localeCompare(a.rating));

  // Content that takes most of the available time
  const maximizeTime = filteredByTime
    .filter(
      (item) =>
        item.durationMinutes > availableTimeMinutes - 10 &&
        item.durationMinutes <= availableTimeMinutes
    )
    .sort((a, b) => b.durationMinutes - a.durationMinutes);

  // If user has 30+ minutes, suggest episodes
  const episodes =
    availableTimeMinutes >= 30
      ? filteredByTime
          .filter((item) => item.type === "episode")
          .sort((a, b) => a.durationMinutes - b.durationMinutes)
      : [];

  return {
    perfectFit,
    quickViewing,
    maximizeTime,
    episodes,
  };
};

export type { ContentItem };
