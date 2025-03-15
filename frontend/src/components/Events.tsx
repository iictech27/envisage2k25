import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../styles/ThemeProvider";
import * as utils from "../styles/utils";

// Events section component
const Events = () => {
  const theme = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Event data with more details
  const events = [
    {
      id: 1,
      title: "VR Hackathon",
      date: "APR 15-17, 2025",
      description:
        "Join the ultimate VR development challenge! Create innovative virtual reality experiences in just 48 hours. Open to developers of all skill levels.",
      image:
        "https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      color: "var(--color-neon-main)",
      category: "hackathon",
    },
    {
      id: 2,
      title: "AI Art Exhibition",
      date: "MAY 5-12, 2025",
      description:
        "Experience the intersection of artificial intelligence and creativity. This exhibition showcases stunning artworks created with cutting-edge AI algorithms.",
      image:
        "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      color: "var(--color-accent-main)",
      category: "exhibition",
    },
    {
      id: 3,
      title: "Blockchain Workshop",
      date: "JUN 8, 2025",
      description:
        "Learn the fundamentals of blockchain technology and cryptocurrency. This hands-on workshop will cover smart contracts, DeFi, and NFT development.",
      image:
        "https://images.unsplash.com/photo-1639322537231-2f206e06af84?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      color: "var(--color-highlight-main)",
      category: "workshop",
    },
    {
      id: 4,
      title: "Cyberpunk Music Festival",
      date: "JUL 22-23, 2025",
      description:
        "Immerse yourself in futuristic sounds at this two-day music festival. Featuring electronic, synthwave, and industrial artists from around the world.",
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      color: "var(--color-neon-light)",
      category: "entertainment",
    },
  ];

  // Get unique categories
  const categories = ["all", ...new Set(events.map((event) => event.category))];

  // Filter events based on active category and search query
  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      activeCategory === "all" || event.category === activeCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Grid background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "var(--effect-grid-background)",
            backgroundSize: "var(--effect-grid-size) var(--effect-grid-size)",
            opacity: 0.2,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-cyber mb-4 uppercase tracking-wider"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={utils.neonTextEffect(theme.colors.neon.main, "md")}
          >
            Upcoming Events
          </motion.h2>
          <motion.p
            className="text-lg font-futuristic text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover our lineup of cutting-edge tech events and immersive
            experiences
          </motion.p>
        </div>

        {/* Search and filter controls */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Search input */}
          <motion.div
            className="relative w-full md:w-64"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-transparent rounded-md font-futuristic"
              style={{
                border: "1px solid var(--color-border-light)",
                color: "var(--color-text-primary)",
                boxShadow: "var(--shadow-neon-sm)",
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </motion.div>

          {/* Category filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className="px-4 py-2 rounded-full text-sm font-cyber uppercase tracking-wider transition-all duration-300"
                style={{
                  backgroundColor:
                    activeCategory === category
                      ? `var(--color-${
                          category === "all"
                            ? "neon"
                            : category === "hackathon"
                            ? "neon"
                            : category === "exhibition"
                            ? "accent"
                            : category === "workshop"
                            ? "highlight"
                            : category === "entertainment"
                            ? "neon-light"
                            : "neon"
                        }-main)`
                      : "transparent",
                  color:
                    activeCategory === category
                      ? "var(--color-background-default)"
                      : `var(--color-${
                          category === "all"
                            ? "neon"
                            : category === "hackathon"
                            ? "neon"
                            : category === "exhibition"
                            ? "accent"
                            : category === "workshop"
                            ? "highlight"
                            : category === "entertainment"
                            ? "neon-light"
                            : "neon"
                        }-main)`,
                  border: `1px solid var(--color-${
                    category === "all"
                      ? "neon"
                      : category === "hackathon"
                      ? "neon"
                      : category === "exhibition"
                      ? "accent"
                      : category === "workshop"
                      ? "highlight"
                      : category === "entertainment"
                      ? "neon-light"
                      : "neon"
                  }-main)`,
                  boxShadow:
                    activeCategory === category
                      ? `0 0 10px var(--color-${
                          category === "all"
                            ? "neon"
                            : category === "hackathon"
                            ? "neon"
                            : category === "exhibition"
                            ? "accent"
                            : category === "workshop"
                            ? "highlight"
                            : category === "entertainment"
                            ? "neon-light"
                            : "neon"
                        }-main)`
                      : "none",
                }}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-secondary-main rounded-lg overflow-hidden shadow-lg border border-border-light hover:border-neon-main transition-all duration-300"
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${event.image})` }}
                ></div>
                <div className="p-4">
                  <div
                    className="inline-block px-2 py-1 rounded-full text-xs mb-2"
                    style={{
                      backgroundColor: `${event.color}20`,
                      color: event.color,
                      border: `1px solid ${event.color}60`,
                    }}
                  >
                    {event.category}
                  </div>
                  <h3 className="text-xl font-cyber text-white mb-1">
                    {event.title}
                  </h3>
                  <p className="text-sm font-digital text-gray-300 mb-2">
                    {event.date}
                  </p>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <button
                    className="px-4 py-2 rounded-md font-cyber text-sm uppercase tracking-wider transition-all duration-300"
                    style={{
                      backgroundColor: "transparent",
                      color: event.color,
                      border: `1px solid ${event.color}`,
                    }}
                  >
                    Register Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p
                className="text-xl font-cyber mb-4"
                style={{ color: "var(--color-text-secondary)" }}
              >
                No events found
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="px-6 py-2 rounded-md font-cyber text-sm uppercase tracking-wider"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--color-neon-main)",
                  border: "1px solid var(--color-neon-main)",
                  boxShadow: "var(--shadow-neon-sm)",
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* View all events button */}
        {filteredEvents.length > 0 && (
          <div className="mt-12 text-center">
            <button
              className="px-8 py-3 rounded-md font-cyber text-base uppercase tracking-wider transition-all duration-300"
              style={{
                background: "var(--gradient-cyber)",
                color: "var(--color-text-primary)",
                border: "1px solid var(--color-accent-main)",
                boxShadow: "var(--shadow-neon-md)",
              }}
            >
              View All Events
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
