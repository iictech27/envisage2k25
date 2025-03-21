import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import CyberpunkBackground3D from "../components/CyberpunkBackground3D";

// Gallery image interface
interface GalleryImage {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  imageUrl: string;
}

const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [animatedImages, setAnimatedImages] = useState<GalleryImage[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  // Sample gallery data - replace with your actual event images
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      title: "Launches redefine possibilities",
      description:
        "Our flagship annual conference bringing together metaverse pioneers and visionaries.",
      category: "conference",
      date: "June 15, 2023",
      imageUrl:
        "./iic-gallery/ead1.jpg",
    },
    {
      id: 2,
      title: "Immersive futuristic experiences",
      description:
        "Showcasing the latest VR technologies and immersive experiences.",
      category: "expo",
      date: "March 22, 2023",
      imageUrl:
        "./iic-gallery/ead2.jpg",
    },
    {
      id: 3,
      title: "Art inspires creativity",
      description:
        "Exhibition of cutting-edge digital art created for the metaverse.",
      category: "art",
      date: "August 5, 2023",
      imageUrl:
        "./iic-gallery/ead4.jpg",
    },
    
    {
      id: 4,
      title: "Experts share knowledge",
      description:
        "Virtual concert featuring top artists performing in our digital world.",
      category: "entertainment",
      date: "July 30, 2023",
      imageUrl:
        "./iic-gallery/ead7.jpg",
    },
    {
      id: 5,
      title: "Workshops enhance skills",
      description:
        "Hands-on session exploring blockchain integration in virtual environments.",
      category: "workshop",
      date: "April 18, 2023",
      imageUrl:
        "./iic-gallery/ead8.jpg",
    },
    {
      id: 6,
      title: "Entertainment captivates audiences",
      description:
        "Industry experts discussing the evolution of gaming in the metaverse.",
      category: "conference",
      date: "October 7, 2023",
      imageUrl:
        "./iic-gallery/ead16.jpg",
    },
    {
      id: 7,
      title: "Expos showcase talent",
      description:
        "Showcase of innovative digital spaces and metaverse environments.",
      category: "expo",
      date: "February 14, 2023",
      imageUrl:
        "./iic-gallery/estart12.jpg",
    },
    {
      id: 8,
      title: "Discussions shape ideas",
      description:
        "Celebration of our new platform for trading digital assets.",
      category: "launch",
      date: "May 3, 2023",
      imageUrl:
        "./iic-gallery/estart13.jpg",
    },
    {
      id: 9,
      title: "Expert shares insights",
      description: "Live demonstrations of AR applications for the metaverse.",
      category: "expo",
      date: "January 20, 2023",
      imageUrl:
        "./iic-gallery/ead15.jpg",
    },
    {
      id: 10,
      title: "Presenting new ideas",
      description:
        "Technical sessions for builders creating the future of virtual worlds.",
      category: "conference",
      date: "December 5, 2023",
      imageUrl:
        "./iic-gallery/ead18.jpg",
    },
    {
      id: 11,
      title: "Conference inspires innovation",
      description:
        "Technical sessions for builders creating the future of virtual worlds.",
      category: "conference",
      date: "December 5, 2023",
      imageUrl:
        "./iic-gallery/estart14.jpg",
    },{
      id: 12,
      title: " Engaging public speech",
      description:
        "Technical sessions for builders creating the future of virtual worlds.",
      category: "workshop",
      date: "December 5, 2023",
      imageUrl:
        "./iic-gallery/ead21.jpg",
    },
    {
      id: 13,
      title: "Presenting insightful data",
      description:
        "48-hour coding marathon to build innovative metaverse applications.",
      category: "hackathon",
      date: "November 12, 2023",
      imageUrl: "./iic-gallery/ead5.jpg"
    },
    {
      id: 14,
      title: "Engaging audience interaction",
      description: "Showcasing digital fashion designs for metaverse avatars.",
      category: "entertainment",
      date: "September 25, 2023",
      imageUrl:
        "./iic-gallery/ead9.jpg",
    },
    {
      id: 15,
      title: "Confidently sharing knowledge",
      description:
        "Technical sessions for builders creating the future of virtual worlds.",
      category: "launch",
      date: "December 5, 2023",
      imageUrl:
        "./iic-gallery/estart4.jpg",
    },
    {
      id: 16,
      title: "Professional poised speaker",
      description:
        "Technical sessions for builders creating the future of virtual worlds.",
      category: "launch",
      date: "December 5, 2023",
      imageUrl:
        "./iic-gallery/33.jpg",
    },
    {
      id: 17,
      title: "Knowledge drives progress",
      description:
        "Technical sessions for builders creating the future of virtual worlds.",
      category: "workshop",
      date: "December 5, 2023",
      imageUrl:
        "./iic-gallery/ead20.jpg",
    },{
      id: 18,
      title: "Networking builds opportunities",
      description:
        "Technical sessions for builders creating the future of virtual worlds.",
      category: "launch",
      date: "December 5, 2023",
      imageUrl:
        "./iic-gallery/ead22.jpg",
    },{
      id: 19,
      title: "Ideas spark change",
      description:
        "Technical sessions for builders creating the future of virtual worlds.",
      category: "hackathon",
      date: "December 5, 2023",
      imageUrl:
        "./iic-gallery/ead25.jpg",
    },{
      id: 20,
      title: "Collaboration fosters growth",
      description:
        "Technical sessions for builders creating the future of virtual worlds.",
      category: "entertainment",
      date: "December 5, 2023",
      imageUrl:
        "./iic-gallery/estart1.jpg",
    },{
      id: 21,
      title: "Leaders exchange perspectives",
      description:
        "Technical sessions for builders creating the future of virtual worlds.",
      category: "hackathon",
      date: "December 5, 2023",
      imageUrl: "./iic-gallery/estart2.jpg",
    },
    {
      id: 22,
      title: "Technology transforms industries",
      description:
        "Technical sessions for builders creating the future of virtual worlds.",
      category: "expo",
      date: "December 5, 2023",
      imageUrl:"./iic-gallery/estart3.jpg",
    },{
      id: 23,
      title: "Speakers motivate audiences",
      description:
        "Technical sessions for builders creating the future of virtual worlds.",
      category: "entertainment",
      date: "December 5, 2023",
      imageUrl:
        "./iic-gallery/estart4.jpg",
    },{
      id: 24,
      title: "Success requires adaptability",
      description:
        "Technical sessions for builders creating the future of virtual worlds.",
      category: "workshop",
      date: "December 5, 2023",
      imageUrl:
        "./iic-gallery/11.jpg",
    },{
      id: 25,
      title: "Conversations encourage leadership",
      description:
        "Technical sessions for builders creating the future of virtual worlds.",
      category: "art",
      date: "December 5, 2023",
      imageUrl:
        "./iic-gallery/estart6.jpg",
    },{
      id: 26,
      title: "Learning fuels excellence",
      description:
        "Technical sessions for builders creating the future of virtual worlds.",
      category: "art",
      date: "December 5, 2023",
      imageUrl:
        "./iic-gallery/estart8.jpg",
    },{
      id: 27,
      title: "Innovation demands curiosity",
      description:
        "Technical sessions for builders creating the future of virtual worlds.",
      category: "hackathon",
      date: "December 5, 2023",
      imageUrl:
        "./iic-gallery/estart9.jpg",
    },
    
    

  ];

  // Filter categories
  const filters = [
    { id: "all", label: "All Events" },
    { id: "conference", label: "Conferences" },
    { id: "expo", label: "Expos" },
    { id: "entertainment", label: "Entertainment" },
    { id: "hackathon", label: "Hackathons" },
    { id: "workshop", label: "Workshops" },
    { id: "art", label: "Art Shows" },
    { id: "launch", label: "Launches" },
  ];

  // Filter gallery images based on active filter
  const getFilteredImages = () => {
    if (activeFilter === "all") return galleryImages;
    return galleryImages.filter((image) => image.category === activeFilter);
  };

  // Simulate loading images
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Animate images appearing with staggered effect
  useEffect(() => {
    const filtered = getFilteredImages();
    setAnimatedImages([]); // Reset state before animation starts
  
    let newImages: GalleryImage[] = [];
    
    filtered.forEach((image, index) => {
      setTimeout(() => {
        newImages.push(image);
        setAnimatedImages([...newImages]); // Update state correctly
      }, index * 100);
    });
  
  }, [activeFilter, isLoading]);
  

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setSelectedImage(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation in modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      const filteredImages = getFilteredImages();
      const currentIndex = filteredImages.findIndex(
        (img) => img.id === selectedImage.id,
      );

      if (e.key === "ArrowRight") {
        const nextIndex = (currentIndex + 1) % filteredImages.length;
        setSelectedImage(filteredImages[nextIndex]);
      } else if (e.key === "ArrowLeft") {
        const prevIndex =
          (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        setSelectedImage(filteredImages[prevIndex]);
      } else if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  return (
  <>
      <Header />
      <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
        {/* 3D Background */}
        <CyberpunkBackground3D
          variant="hexagons"
          intensity={1.4}
          color1="#22d3ee"
          color2="#7c3aed"
          interactive={true}
        />

        {/* Additional visual elements for depth */}
        <div className="absolute inset-0 bg-primary bg-opacity-70 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-cyber mb-4">
              <span className="text-neon">EVENT</span>{" "}
              <span className="text-accent">GALLERY</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-neon to-accent mx-auto mb-6"></div>
            <p className="text-white font-futuristic max-w-2xl mx-auto">
              Explore our past events and immersive experiences in the
              metaverse. From conferences to virtual concerts, dive into the
              visual history of our digital world.
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-t-neon border-r-accent border-b-neon border-l-accent rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-4 border-t-accent border-r-neon border-b-accent border-l-neon rounded-full animate-spin-reverse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-neon font-cyber text-xs">LOADING</span>
                </div>
              </div>
            </div>
          )}

          {!isLoading && (
            <>
              {/* Filters */}
              <div className="flex space-x-6 overflow-x-auto scrollbar-hide px-4 py-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-lg font-cyber text-sm transition-all duration-300 transform whitespace-nowrap ${
                  activeFilter === filter.id
                    ? "bg-gradient-to-r from-neon to-accent text-white scale-105 shadow-lg"
                    : "bg-gray-900 text-white hover:bg-gray-800 border border-neon/30 hover:scale-105 cursor-pointer"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 pt-5">
              {animatedImages.map((image) => (
                  <div
                    key={image.id}
                    className="gallery-item opacity-0 animate-fade-in"
                    style={{
                      animationDelay: `${(image.id % 12) * 0.1}s`,
                      animationFillMode: "forwards",
                    }}
                    onClick={() => setSelectedImage(image)}
                  >
                        <div className="relative group overflow-hidden rounded-lg border-2 border-neon/30 hover:border-neon/80 transition-all duration-300 cursor-pointer">
                        {/* Image */}
                        <div className="aspect-w-16 aspect-h-9 bg-gray-900">
                          <img
                            src={image.imageUrl}
                            alt={image.title}
                            className="object-cover w-full h-full filter brightness-110 transition-all duration-500"
                          />
                        </div>

                        {/* Gradient Overlay on Content - Dark at First, Brightens on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black  to-transparent opacity-80 group-hover:from-purple-900 group-hover:via-primary/50 group-hover:to-transparent group-hover:opacity-100 transition-all duration-500"></div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-cyber text-neon bg-primary/80 px-2 py-1 rounded">
                              {image.category.toUpperCase()}
                            </span>
                            <span className="text-xs font-futuristic text-white/40 group-hover:text-white transition-colors duration-500">
                              {image.date}
                            </span>
                          </div>
                          <h3 className="text-lg font-cyber text-white group-hover:text-white transition-colors duration-500">
                            {image.title}
                          </h3>
                          <p className="text-white/80 text-sm font-futuristic line-clamp-2 mt-1 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                            {image.description}
                          </p>
                        </div>

                        {/* Decorative Corners */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon opacity-60 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent opacity-60 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent opacity-60 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon opacity-60 group-hover:opacity-100 transition-opacity"></div>
                      </div>


                  </div>
                ))}
              </div>



              {/* Empty State */}
              {animatedImages.length === 0 && !isLoading && (
                <div className="text-center py-16">
                  <div className="inline-block p-6 rounded-full bg-gray-900/50 border border-neon/30 mb-4">
                    <svg
                      className="w-12 h-12 text-neon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-cyber text-white mb-2">
                    No Events Found
                  </h3>
                  <p className="text-gray-400 font-futuristic">
                    No events match your current filter. Try selecting a
                    different category.
                  </p>
                </div>
              )}
            </>
          )}

          {/* Upcoming Events CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-cyber mb-4">
              <span className="text-white">JOIN OUR </span>
              <span className="text-neon">NEXT</span>
              <span className="text-accent"> EVENT</span>
            </h2>
            <p className="text-gray-300 font-futuristic max-w-2xl mx-auto mb-6">
              Don't miss our upcoming metaverse experiences. Stay updated on our
              latest events and be part of the future.
            </p>
            <a
              href="/events"
              className="cyber-button inline-block py-3 px-8 relative overflow-hidden group"
            >
              <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500"></span>
              <span className="relative z-10">VIEW UPCOMING EVENTS</span>
            </a>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div
            ref={modalRef}
            className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden glass-card border border-neon/50 rounded-lg"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 text-white hover:text-neon bg-black/50 rounded-full p-2 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => {
                const filteredImages = getFilteredImages();
                const currentIndex = filteredImages.findIndex(
                  (img) => img.id === selectedImage.id,
                );
                const prevIndex =
                  (currentIndex - 1 + filteredImages.length) %
                  filteredImages.length;
                setSelectedImage(filteredImages[prevIndex]);
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-neon bg-black/50 rounded-full p-2 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() => {
                const filteredImages = getFilteredImages();
                const currentIndex = filteredImages.findIndex(
                  (img) => img.id === selectedImage.id,
                );
                const nextIndex = (currentIndex + 1) % filteredImages.length;
                setSelectedImage(filteredImages[nextIndex]);
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-neon bg-black/50 rounded-full p-2 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            
              
            </div>
          </div>
      )}

      

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes glitch1 {
          0% { clip-path: inset(40% 0 61% 0); }
          20% { clip-path: inset(92% 0 1% 0); }
          40% { clip-path: inset(43% 0 1% 0); }
          60% { clip-path: inset(25% 0 58% 0); }
          80% { clip-path: inset(54% 0 7% 0); }
          100% { clip-path: inset(58% 0 43% 0); }
        }
        
        @keyframes glitch2 {
          0% { clip-path: inset(24% 0 29% 0); }
          20% { clip-path: inset(54% 0 56% 0); }
          40% { clip-path: inset(61% 0 36% 0); }
          60% { clip-path: inset(93% 0 4% 0); }
          80% { clip-path: inset(58% 0 33% 0); }
          100% { clip-path: inset(86% 0 5% 0); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-glitch-1 {
          animation: glitch1 2s infinite linear alternate-reverse;
        }
        
        .animate-glitch-2 {
          animation: glitch2 3s infinite linear alternate-reverse;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }
      `}</style>
    </>
  );
};

export default GalleryPage;
