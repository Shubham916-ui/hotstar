import { VideoCardProps } from "../components/common/VideoCard";

export interface VideoDetails extends VideoCardProps {
  description: string;
  duration: string;
  releaseDate: string;
  language: string;
  director?: string;
  cast?: string[];
  ageRating?: string;
  trailerUrl?: string;
  similarVideos?: number[]; // IDs of similar videos
}

// Dummy data for our application
export const videos: VideoDetails[] = [
  // Movies
  {
    id: 1,
    title: "Avengers: Endgame",
    imageUrl: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1514778357791-f0eb1a87764c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Movies",
    year: "2019",
    rating: "9.2",
    description:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    duration: "3h 1m",
    releaseDate: "April 26, 2019",
    language: "English",
    director: "Anthony Russo, Joe Russo",
    cast: [
      "Robert Downey Jr.",
      "Chris Evans",
      "Mark Ruffalo",
      "Chris Hemsworth",
      "Scarlett Johansson",
    ],
    ageRating: "PG-13",
    trailerUrl: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
    similarVideos: [2, 3, 4],
  },
  {
    id: 2,
    title: "Inception",
    imageUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Movies",
    year: "2010",
    rating: "8.8",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    duration: "2h 28m",
    releaseDate: "July 16, 2010",
    language: "English",
    director: "Christopher Nolan",
    cast: [
      "Leonardo DiCaprio",
      "Joseph Gordon-Levitt",
      "Ellen Page",
      "Tom Hardy",
    ],
    ageRating: "PG-13",
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    similarVideos: [1, 3, 5],
  },
  {
    id: 3,
    title: "Interstellar",
    imageUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1194&q=80",
    category: "Movies",
    year: "2014",
    rating: "8.6",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    duration: "2h 49m",
    releaseDate: "November 7, 2014",
    language: "English",
    director: "Christopher Nolan",
    cast: [
      "Matthew McConaughey",
      "Anne Hathaway",
      "Jessica Chastain",
      "Michael Caine",
    ],
    ageRating: "PG-13",
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    similarVideos: [2, 5, 7],
  },
  {
    id: 4,
    title: "The Dark Knight",
    imageUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "Movies",
    year: "2008",
    rating: "9.0",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    duration: "2h 32m",
    releaseDate: "July 18, 2008",
    language: "English",
    director: "Christopher Nolan",
    cast: [
      "Christian Bale",
      "Heath Ledger",
      "Aaron Eckhart",
      "Michael Caine",
      "Gary Oldman",
    ],
    ageRating: "PG-13",
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    similarVideos: [1, 2, 6],
  },
  {
    id: 5,
    title: "Dune",
    imageUrl: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1547700055-b61cacebece9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Movies",
    year: "2021",
    rating: "8.2",
    description:
      "Feature adaptation of Frank Herbert's science fiction novel, about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
    duration: "2h 35m",
    releaseDate: "October 22, 2021",
    language: "English",
    director: "Denis Villeneuve",
    cast: [
      "Timothée Chalamet",
      "Rebecca Ferguson",
      "Oscar Isaac",
      "Josh Brolin",
      "Zendaya",
    ],
    ageRating: "PG-13",
    trailerUrl: "https://www.youtube.com/watch?v=8g18jFHCLXk",
    similarVideos: [3, 7, 8],
  },

  // TV Shows
  {
    id: 6,
    title: "The Mandalorian",
    imageUrl: "https://image.tmdb.org/t/p/w500/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "TV Shows",
    year: "2019-Present",
    rating: "8.7",
    description:
      "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
    duration: "Season 3",
    releaseDate: "November 12, 2019",
    language: "English",
    cast: ["Pedro Pascal", "Carl Weathers", "Giancarlo Esposito"],
    ageRating: "TV-14",
    trailerUrl: "https://www.youtube.com/watch?v=aOC8E8z_ifw",
    similarVideos: [7, 10, 11],
  },
  {
    id: 7,
    title: "House of the Dragon",
    imageUrl: "https://image.tmdb.org/t/p/w500/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1624221734953-b1db2560f94f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "TV Shows",
    year: "2022-Present",
    rating: "8.5",
    description:
      "An internal succession war within House Targaryen at the height of its power, 172 years before the birth of Daenerys Targaryen.",
    duration: "Season 1",
    releaseDate: "August 21, 2022",
    language: "English",
    cast: ["Paddy Considine", "Emma D'Arcy", "Matt Smith", "Olivia Cooke"],
    ageRating: "TV-MA",
    trailerUrl: "https://www.youtube.com/watch?v=DotnJ7tTA34",
    similarVideos: [6, 8, 9],
  },
  {
    id: 8,
    title: "The Last of Us",
    imageUrl: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "TV Shows",
    year: "2023-Present",
    rating: "8.8",
    description:
      "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
    duration: "Season 1",
    releaseDate: "January 15, 2023",
    language: "English",
    cast: ["Pedro Pascal", "Bella Ramsey", "Gabriel Luna", "Anna Torv"],
    ageRating: "TV-MA",
    trailerUrl: "https://www.youtube.com/watch?v=uLtkt8BonwM",
    similarVideos: [6, 7, 10],
  },
  {
    id: 9,
    title: "Stranger Things",
    imageUrl: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1626814026762-dd8d0cc6dcbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "TV Shows",
    year: "2016-Present",
    rating: "8.7",
    description:
      "When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.",
    duration: "Season 4",
    releaseDate: "July 15, 2016",
    language: "English",
    cast: [
      "Millie Bobby Brown",
      "Finn Wolfhard",
      "Winona Ryder",
      "David Harbour",
    ],
    ageRating: "TV-14",
    trailerUrl: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
    similarVideos: [8, 10, 11],
  },
  {
    id: 10,
    title: "Breaking Bad",
    imageUrl: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    fallbackImageUrl:
      "https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "TV Shows",
    year: "2008-2013",
    rating: "9.5",
    description:
      "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    duration: "5 Seasons",
    releaseDate: "January 20, 2008",
    language: "English",
    cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn", "Dean Norris"],
    ageRating: "TV-MA",
    trailerUrl: "https://www.youtube.com/watch?v=HhesaQXLuRY",
    similarVideos: [9, 11, 12],
  },

  // Sports
  {
    id: 11,
    title: "Cricket World Cup 2023 Final",
    imageUrl:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1305&q=80",
    category: "Sports",
    year: "2023",
    rating: "9.3",
    description:
      "India vs Australia - The cricket world cup final match with all the highlights and key moments from this epic showdown.",
    duration: "3h 45m",
    releaseDate: "November 19, 2023",
    language: "English",
    ageRating: "TV-G",
    similarVideos: [12, 13, 14],
  },
  {
    id: 12,
    title: "FIFA World Cup 2022 Final",
    imageUrl:
      "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80",
    category: "Sports",
    year: "2022",
    rating: "9.4",
    description:
      "Argentina vs France - The thrilling FIFA World Cup final that went to penalties after a 3-3 draw, with Messi finally claiming the trophy.",
    duration: "2h 15m",
    releaseDate: "December 18, 2022",
    language: "Multiple",
    ageRating: "TV-G",
    similarVideos: [11, 13, 15],
  },
  {
    id: 13,
    title: "Wimbledon 2023 Men's Final",
    imageUrl:
      "https://images.unsplash.com/photo-1622279457486-53d2f999the2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Sports",
    year: "2023",
    rating: "8.9",
    description:
      "Carlos Alcaraz vs Novak Djokovic - The Wimbledon men's final where the young Spanish star defeated the Serbian champion in a five-set thriller.",
    duration: "4h 42m",
    releaseDate: "July 16, 2023",
    language: "English",
    ageRating: "TV-G",
    similarVideos: [11, 12, 14],
  },
  {
    id: 14,
    title: "NBA Finals 2023 Game 5",
    imageUrl:
      "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    category: "Sports",
    year: "2023",
    rating: "8.7",
    description:
      "Denver Nuggets vs Miami Heat - The decisive game 5 where the Nuggets clinched their first NBA championship led by finals MVP Nikola Jokić.",
    duration: "2h 31m",
    releaseDate: "June 12, 2023",
    language: "English",
    ageRating: "TV-G",
    similarVideos: [11, 13, 15],
  },
  {
    id: 15,
    title: "Formula 1 Monaco Grand Prix 2023",
    imageUrl:
      "https://images.unsplash.com/photo-1504707748692-419802cf939d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Sports",
    year: "2023",
    rating: "8.5",
    description:
      "The prestigious Monaco Grand Prix where Max Verstappen dominated the race to extend his championship lead in a dramatic race around the narrow streets.",
    duration: "1h 52m",
    releaseDate: "May 28, 2023",
    language: "English",
    ageRating: "TV-G",
    similarVideos: [12, 13, 14],
  },

  // Premium Content
  {
    id: 16,
    title: "House of Cards",
    imageUrl: "https://image.tmdb.org/t/p/w500/hKWxWjFwnMvA6kJIHhsb1sSNimi.jpg",
    category: "Premium",
    year: "2013-2018",
    rating: "8.7",
    description:
      "A Congressman works with his equally conniving wife to exact revenge on the people who betrayed him.",
    duration: "6 Seasons",
    releaseDate: "February 1, 2013",
    language: "English",
    cast: ["Kevin Spacey", "Robin Wright", "Michael Kelly", "Kate Mara"],
    ageRating: "TV-MA",
    trailerUrl: "https://www.youtube.com/watch?v=ULwUzF1q5w4",
    similarVideos: [7, 10, 17],
  },
  {
    id: 17,
    title: "The Crown",
    imageUrl: "https://image.tmdb.org/t/p/w500/4T2EV1SCuX0cJDEYb3lR4qP3tOs.jpg",
    category: "Premium",
    year: "2016-Present",
    rating: "8.6",
    description:
      "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
    duration: "5 Seasons",
    releaseDate: "November 4, 2016",
    language: "English",
    cast: [
      "Claire Foy",
      "Olivia Colman",
      "Imelda Staunton",
      "Matt Smith",
      "Tobias Menzies",
    ],
    ageRating: "TV-MA",
    trailerUrl: "https://www.youtube.com/watch?v=JWtnJjn6ng0",
    similarVideos: [7, 16, 18],
  },
  {
    id: 18,
    title: "Succession",
    imageUrl: "https://image.tmdb.org/t/p/w500/4z6bZ3iAXpJHZ1bnk2oFZvCJxIy.jpg",
    category: "Premium",
    year: "2018-2023",
    rating: "8.8",
    description:
      "The Roy family is known for controlling the biggest media and entertainment company in the world. However, their world changes when their father steps down from the company.",
    duration: "4 Seasons",
    releaseDate: "June 3, 2018",
    language: "English",
    cast: [
      "Brian Cox",
      "Jeremy Strong",
      "Sarah Snook",
      "Kieran Culkin",
      "Matthew Macfadyen",
    ],
    ageRating: "TV-MA",
    trailerUrl: "https://www.youtube.com/watch?v=OzYxJV_rmE8",
    similarVideos: [10, 16, 17],
  },
  {
    id: 19,
    title: "The Queen's Gambit",
    imageUrl: "https://image.tmdb.org/t/p/w500/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg",
    category: "Premium",
    year: "2020",
    rating: "8.6",
    description:
      "Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in 1960s USA. But child stardom comes at a price.",
    duration: "1 Season",
    releaseDate: "October 23, 2020",
    language: "English",
    cast: [
      "Anya Taylor-Joy",
      "Bill Camp",
      "Moses Ingram",
      "Thomas Brodie-Sangster",
    ],
    ageRating: "TV-MA",
    trailerUrl: "https://www.youtube.com/watch?v=CDrieqwSdgI",
    similarVideos: [17, 18, 20],
  },
  {
    id: 20,
    title: "Hamilton",
    imageUrl: "https://image.tmdb.org/t/p/w500/uPpi0CiXuLZV8S1RxAK7f4Liw49.jpg",
    category: "Premium",
    year: "2020",
    rating: "8.5",
    description:
      "The real life of one of America's foremost founding fathers and first Secretary of the Treasury, Alexander Hamilton. Captured live on Broadway from the Richard Rodgers Theater.",
    duration: "2h 40m",
    releaseDate: "July 3, 2020",
    language: "English",
    director: "Thomas Kail",
    cast: [
      "Lin-Manuel Miranda",
      "Leslie Odom Jr.",
      "Renée Elise Goldsberry",
      "Daveed Diggs",
      "Jonathan Groff",
    ],
    ageRating: "PG-13",
    trailerUrl: "https://www.youtube.com/watch?v=DSCKfXpAGHc",
    similarVideos: [17, 19],
  },
];

// Helper function to get videos by category
export const getVideosByCategory = (category: string): VideoDetails[] => {
  return videos.filter((video) => video.category === category);
};

// Helper function to get a video by ID
export const getVideoById = (id: number): VideoDetails | undefined => {
  return videos.find((video) => video.id === id);
};

// Helper function to get similar videos
export const getSimilarVideos = (id: number): VideoDetails[] => {
  const video = getVideoById(id);
  if (!video || !video.similarVideos) return [];

  return video.similarVideos
    .map((similarId) => {
      const similar = getVideoById(similarId);
      return similar as VideoDetails;
    })
    .filter(Boolean);
};

// Helper function to search videos
export const searchVideos = (query: string): VideoDetails[] => {
  if (!query) return [];

  const lowerCaseQuery = query.toLowerCase();
  return videos.filter(
    (video) =>
      video.title.toLowerCase().includes(lowerCaseQuery) ||
      video.category.toLowerCase().includes(lowerCaseQuery) ||
      video.description.toLowerCase().includes(lowerCaseQuery)
  );
};

// Export a function to get trending videos (random selection of 8 videos)
export const getTrendingVideos = (): VideoDetails[] => {
  const shuffled = [...videos].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 8);
};

// Export a function to get featured videos (4 videos with high ratings)
export const getFeaturedVideos = (): VideoDetails[] => {
  return videos
    .filter((video) => parseFloat(video.rating || "0") > 8.5)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
};
