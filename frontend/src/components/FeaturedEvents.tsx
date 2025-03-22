import { useState, useEffect,  Suspense } from "react";
import { Link, NavLink } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Sphere,
  Torus,
  Float,
  PerformanceMonitor,
} from "@react-three/drei";
import { motion as FramerMotion } from "framer-motion";
import AnimatedHeading from "./AnimatedHeading";

// // Lazy load motion components for better performance
// const motion = lazy(() =>
//   import("framer-motion").then((mod) => ({ default: mod.motion })),
// );

// // Text animation variants
// const textCharacterAnimation = {
//   hidden: { opacity: 0, y: 20 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.05,
//       duration: 0.7,
//       ease: [0.2, 0.65, 0.3, 0.9],
//     },
//   }),
// };

// const textWordAnimation = {
//   hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     filter: "blur(0px)",
//     transition: {
//       delay: i * 0.1,
//       duration: 0.8,
//       ease: [0.2, 0.65, 0.3, 0.9],
//     },
//   }),
// };

// const textRevealAnimation = {
//   hidden: { width: "0%" },
//   visible: {
//     width: "100%",
//     transition: {
//       duration: 0.8,
//       ease: [0.2, 0.65, 0.3, 0.9],
//     },
//   },
// };

// Text animation component with proper TypeScript types
// interface AnimatedTextProps {
//   text: string;
//   animation?: "character" | "word";
//   className?: string;
//   wordClassName?: string;
// }

// const AnimatedText = ({
//   text,
//   animation = "character",
//   className = "",
//   wordClassName = "",
// }: AnimatedTextProps) => {
//   const { ref, inView } = useInView({
//     triggerOnce: false,
//     threshold: 0.1,
//   });

//   if (animation === "word") {
//     return (
//       <div ref={ref} className={`flex flex-wrap ${className}`}>
//         {text.split(" ").map((word: string, index: number) => (
//           <div key={index} className="overflow-hidden mr-2 mb-1">
//             <Suspense fallback={<span className={wordClassName}>{word}</span>}>
//               <FramerMotion.span
//                 className={wordClassName}
//                 custom={index}
//                 variants={textWordAnimation}
//                 initial="hidden"
//                 animate={inView ? "visible" : "hidden"}
//               >
//                 {word}
//               </FramerMotion.span>
//             </Suspense>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div ref={ref} className={className}>
//       {text.split("").map((char: string, index: number) => (
//         <Suspense key={index} fallback={<span>{char}</span>}>
//           <FramerMotion.span
//             custom={index}
//             variants={textCharacterAnimation}
//             initial="hidden"
//             animate={inView ? "visible" : "hidden"}
//           >
//             {char === " " ? "\u00A0" : char}
//           </FramerMotion.span>
//         </Suspense>
//       ))}
//     </div>
//   );
// };

// Event interface
interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  category: string;
  featured: boolean;
  registrationUrl: string;
}

// 3D Background component for mobile
// const MobileBackground3D = () => {
//   const isMobile = window.innerWidth < 768;

//   // Floating hexagons around the edges
//   const FloatingHexagons = () => {
//     const hexagons = [];
//     const count = 8; // Reduced count for mobile

//     for (let i = 0; i < count; i++) {
//       // Position hexagons around the edges, not in the center
//       const posX = Math.random() * 30 - 15;
//       const posY = Math.random() * 30 - 15;
//       const posZ = -5 - Math.random() * 10;
//       const scale = 0.2 + Math.random() * 0.3;

//       hexagons.push(
//         <Float
//           key={i}
//           speed={1 + Math.random()}
//           rotationIntensity={0.2}
//           floatIntensity={0.3}
//         >
//           <Torus
//             args={[0.5, 0.2, 6, 6]}
//             position={[posX, posY, posZ]}
//             scale={scale}
//             rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
//           >
//             <meshStandardMaterial
//               color={Math.random() > 0.5 ? "#7c3aed" : "#22d3ee"}
//               emissive={Math.random() > 0.5 ? "#7c3aed" : "#22d3ee"}
//               emissiveIntensity={0.8}
//               wireframe
//             />
//           </Torus>
//         </Float>,
//       );
//     }

//     return <>{hexagons}</>;
//   };

//   // Floating particles system
//   const ParticleSystem = () => {
//     const particles = [];
//     const count = 30; // Reduced for mobile

//     for (let i = 0; i < count; i++) {
//       // Create a spherical distribution
//       const theta = Math.random() * Math.PI * 2;
//       const phi = Math.acos(2 * Math.random() - 1);
//       const radius = 8 + Math.random() * 10;

//       const x = radius * Math.sin(phi) * Math.cos(theta);
//       const y = radius * Math.sin(phi) * Math.sin(theta);
//       const z = radius * Math.cos(phi) - 15; // Push back

//       const size = 0.02 + Math.random() * 0.04;

//       particles.push(
//         <Sphere key={i} args={[size, 8, 8]} position={[x, y, z]}>
//           <meshBasicMaterial
//             color={Math.random() > 0.5 ? "#7c3aed" : "#22d3ee"}
//             transparent
//             opacity={0.7}
//           />
//         </Sphere>,
//       );
//     }

//     const particleGroup = useRef(null);

//     return <group ref={particleGroup}>{particles}</group>;
//   };

//   return (
//     <>
//       <ambientLight intensity={0.3} />
//       <pointLight position={[0, 0, -10]} intensity={1} color="#22d3ee" />
//       <pointLight position={[10, 10, -10]} intensity={0.8} color="#7c3aed" />

//       <FloatingHexagons />
//       <ParticleSystem />
//     </>
//   );
// };

const FeaturedEvents = () => {
  const [activeEvent, setActiveEvent] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Sample featured events data
  const events: Event[] = [
    {
      id: 1,
      title: "HACK-UR-WAY ",
      date: "APR 19-20, 2025",
      location: "TMSL Labs",
      imageUrl:
        "https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      category: "Tech",
      featured: true,
      registrationUrl: "/events/metaverse-summit-2024",
    },
    {
      id: 2,
      title: "VENTURE VAULT",
      date: "APR 22, 2025",
      location: "G-Series",
      imageUrl:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Auction",
      featured: true,
      registrationUrl: "/events/digital-art-exhibition",
    },
    {
      id: 3,
      title: "STOCKIFY",
      date: "APR 15-22, 2025",
      location: "Online",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1681487769650-a0c3fbaed85a?q=80&w=2155&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Finance",
      featured: true,
      registrationUrl: "/events/blockchain-nft-workshop",
    },
    {
      id: 4,
      title: "CXO's Insights",
      date: "APR 19, 2025",
      location: "G-Series",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1661313688756-2e38d59fb9f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Business",
      featured: true,
      registrationUrl: "/events/cyberpunk-music-festival",
    },
  ];

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Delay loading animations until component is in view
  useEffect(() => {
    if (inView && !isLoaded) {
      setIsLoaded(true);
    }
  }, [inView, isLoaded]);

  // Auto-rotate featured events - only when in view and not on mobile
  useEffect(() => {
    if (isHovering || !inView || (isMobile && !isLoaded)) return;

    const interval = setInterval(() => {
      setActiveEvent((prev) => (prev + 1) % events.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [events.length, isHovering, inView, isMobile, isLoaded]);

  // Handle image error
  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  // Get fallback image
  const getFallbackImage = (index: number) => {
    const colors = ["#7c3aed", "#22d3ee", "#ec4899", "#10b981"];
    return `https://via.placeholder.com/400/0f172a/${colors[
      index % colors.length
    ].replace("#", "")}?text=${events[index].category}`;
  };

  // Simplified version for mobile with 3D background
  if (isMobile) {
    return (
      <section ref={ref} className="py-8 relative overflow-hidden">
        {/* Remove 3D Canvas background for better performance */}
        <div className="absolute inset-0 z-0 bg-primary">
          {/* Cyberpunk city silhouette */}
          <div className="absolute bottom-0 left-0 w-full h-[40%] city-silhouette opacity-30"></div>

          {/* Digital circuit pattern */}
          <div className="absolute inset-0 circuit-pattern opacity-15"></div>

          {/* Holographic grid */}
          <div className="absolute inset-0 perspective-container">
            <div className="absolute inset-0 holo-grid"></div>
          </div>

          {/* Animated data flow lines */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-[15%] left-0 w-full h-[1px] bg-neon/40 data-flow-line-1"></div>
            <div className="absolute top-[35%] left-0 w-full h-[1px] bg-accent/40 data-flow-line-2"></div>
            <div className="absolute top-[65%] left-0 w-full h-[1px] bg-neon/40 data-flow-line-3"></div>
            <div className="absolute top-0 left-[25%] w-[1px] h-full bg-accent/40 data-flow-line-4"></div>
            <div className="absolute top-0 left-[75%] w-[1px] h-full bg-neon/40 data-flow-line-5"></div>
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 particles-container">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-neon/70 particle"
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 15 + 10}s`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              ></div>
            ))}
            {[...Array(20)].map((_, i) => (
              <div
                key={i + 20}
                className="absolute rounded-full bg-accent/70 particle"
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 15 + 10}s`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Glitch overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-neon mix-blend-screen animate-glitch-1"></div>
            <div className="absolute inset-0 bg-accent mix-blend-screen animate-glitch-2"></div>
          </div>
        </div>

        {/* Overlay gradient for better content visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/60 to-primary/90 z-1">
          {/* Vignette effect for better focus on content */}
          <div className="absolute inset-0 vignette-effect"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section header with enhanced glitch effect */}
          <div className="relative mb-8 overflow-hidden">
            <div className="text-2xl font-cyber text-center relative z-10">
              <Suspense
                fallback={
                  <h2 className="cyber-glitch-text">
                    <span className="text-white">UPCOMING</span>{" "}
                    <span className="text-neon">EVENTS</span>
                  </h2>
                }
              >
                <FramerMotion.div
                  initial={{ opacity: 0 }}
                  animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <AnimatedHeading
                    text="UPCOMING EVENTS"
                    animation="glitch"
                    className="cyber-glitch-text text-2xl font-cyber text-center"
                    colorWords={["#ffffff", "#22d3ee"]}
                    once={false}
                    threshold={0.1}
                  />
                </FramerMotion.div>
              </Suspense>
            </div>

            {/* Enhanced animated underline */}
            <div className="w-40 h-[2px] bg-neon mx-auto relative">
              <div className="absolute top-0 left-0 w-full h-full bg-accent animate-pulse"></div>
              <div className="absolute top-0 left-0 w-1/2 h-full bg-white animate-ping"></div>
              <div className="absolute top-0 left-0 w-[10px] h-full bg-white animate-pulse-fast"></div>
            </div>

            {/* Corner decorative elements */}
            <div className="absolute -top-2 -left-2 w-8 h-8">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path
                  d="M0,0 L12,0 L12,2 L2,2 L2,12 L0,12 Z"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="1"
                  className="animate-enhanced-glow"
                />
              </svg>
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path
                  d="M24,24 L12,24 L12,22 L22,22 L22,12 L24,12 Z"
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="1"
                  className="animate-enhanced-glow"
                />
              </svg>
            </div>

            {/* Decorative binary code */}
            <div className="absolute -top-1 right-10 text-[8px] font-mono text-neon/30 binary-code">
              10110101
            </div>
            <div className="absolute -bottom-1 left-10 text-[8px] font-mono text-accent/30 binary-code">
              01001101
            </div>
          </div>

          {/* Card layout for mobile */}
          <div className="space-y-6 mt-8">
            {events.map((event, index) => (
              <Link key={event.id} to={event.registrationUrl} className="block">
                <div className="relative bg-primary/60 border border-neon/30 rounded overflow-hidden hover:shadow-glow-sm transition-all duration-300">
                  {/* Card content with diagonal split design */}
                  <div className="relative h-[160px] overflow-hidden">
                    {/* Image section */}
                    <div className="absolute top-0 right-0 w-[60%] h-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent to-primary/90 z-10"></div>
                      <img
                        src={
                          imageErrors[index]
                            ? getFallbackImage(index)
                            : event.imageUrl
                        }
                        alt={event.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={() => handleImageError(index)}
                        style={{ filter: "blur(1.5px) brightness(0.6)" }} // Adjust blur & brightness
                      />

                      {/* Scanline effect */}
                      <div className="absolute inset-0 scanline-effect pointer-events-none"></div>
                    </div>

                    {/* Content section */}
                    <div className="absolute top-0 left-0 w-[55%] h-full p-4 flex flex-col justify-between">
                      {/* Category badge */}
                      <div className="mb-1">
                        <span className="inline-block text-xs font-cyber text-white bg-neon px-2 py-0.5 rounded-sm">
                          {event.category.toUpperCase()}
                        </span>
                      </div>

                      {/* Title with glitch effect on active */}
                      <h3
                        className={`font-cyber text-lg leading-tight ${
                          index === activeEvent
                            ? "text-neon glitch-text"
                            : "text-white"
                        }`}
                      >
                        {event.title}
                      </h3>

                      {/* Date and location */}
                      <div className="mt-auto">
                        <div className="flex items-center text-xs text-white/70 mb-1">
                          <svg
                            className="w-3 h-3 mr-1 text-neon"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-xs text-white/70">
                          <svg
                            className="w-3 h-3 mr-1 text-accent"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive elements */}
                    <div className="absolute bottom-3 right-3 z-20">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          index === activeEvent ? "bg-neon" : "bg-gray-700"
                        }`}
                      >
                        <svg
                          className="w-4 h-4 text-black"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-neon"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-neon"></div>

                    {/* Decorative circuit lines */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path
                          d={`M5,${20 + index * 10} H20 V${50 + index * 5} H${
                            30 + index * 10
                          }`}
                          fill="none"
                          stroke={index === activeEvent ? "#22d3ee" : "#6b7280"}
                          strokeWidth="0.5"
                          strokeDasharray="4,2"
                        />
                        <circle
                          cx={30 + index * 10}
                          cy={50 + index * 5}
                          r="2"
                          fill={index === activeEvent ? "#22d3ee" : "#6b7280"}
                          className={
                            index === activeEvent ? "animate-ping" : ""
                          }
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* View all events and Download brochure buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <Link
                to="/events"
                className="cyber-button py-3 px-6 relative overflow-hidden group flex items-center justify-center"
              >
                <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500"></span>
                <span className="relative z-10 text-center">
                  VIEW ALL EVENTS
                </span>
              </Link>

              <button
                onClick={() =>
                  window.open(
                    `${window.location.origin}/brochure.pdf`,
                    "_blank",
                  )
                }
                className="cyber-button py-3 px-6 relative overflow-hidden group flex items-center justify-center cursor-pointer"
              >
                <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500"></span>
                <span className="relative z-10 text-center">
                  DOWNLOAD BROCHURE
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Add custom styles for the mobile design */}
        <style>{`
          .city-silhouette {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 200'%3E%3Cpath fill='%237c3aed' d='M0,200 L0,160 L30,160 L30,150 L45,150 L45,140 L55,140 L55,130 L65,130 L65,150 L75,150 L75,140 L85,140 L85,160 L100,160 L100,140 L110,140 L110,150 L120,150 L120,130 L140,130 L140,150 L150,150 L150,120 L160,120 L160,140 L170,140 L170,130 L185,130 L185,150 L200,150 L200,120 L220,120 L220,150 L230,150 L230,140 L240,140 L240,130 L250,130 L250,150 L260,150 L260,140 L270,140 L270,160 L280,160 L280,150 L290,150 L290,160 L300,160 L300,140 L310,140 L310,150 L320,150 L320,160 L340,160 L340,150 L350,150 L350,140 L360,140 L360,130 L370,130 L370,150 L380,150 L380,140 L390,140 L390,160 L400,160 L400,150 L410,150 L410,140 L420,140 L420,160 L430,160 L430,150 L440,150 L440,130 L450,130 L450,150 L460,150 L460,140 L470,140 L470,130 L480,130 L480,150 L490,150 L490,140 L500,140 L500,160 L510,160 L510,150 L520,150 L520,140 L530,140 L530,130 L540,130 L540,150 L550,150 L550,140 L560,140 L560,160 L570,160 L570,150 L580,150 L580,140 L590,140 L590,160 L600,160 L600,150 L610,150 L610,140 L620,140 L620,130 L630,130 L630,150 L640,150 L640,140 L650,140 L650,160 L660,160 L660,150 L670,150 L670,140 L680,140 L680,130 L690,130 L690,150 L700,150 L700,140 L710,140 L710,160 L720,160 L720,150 L730,150 L730,140 L740,140 L740,130 L750,130 L750,150 L760,150 L760,140 L770,140 L770,160 L780,160 L780,150 L790,150 L790,140 L800,140 L800,130 L810,130 L810,150 L820,150 L820,140 L830,140 L830,160 L840,160 L840,150 L850,150 L850,140 L860,140 L860,130 L870,130 L870,150 L880,150 L880,140 L890,140 L890,160 L900,160 L900,150 L910,150 L910,140 L920,140 L920,130 L930,130 L930,150 L940,150 L940,140 L950,140 L950,160 L960,160 L960,150 L970,150 L970,140 L980,140 L980,130 L990,130 L990,150 L1000,150 L1000,200 Z'/%3E%3C/svg%3E");
            background-size: cover;
            background-position: center bottom;
          }
          
          .circuit-pattern {
            background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0V0zm40 40v20h20V40H40zm0 40h20v20H40V80zm20-20h20v20H60V60zm0-20V20h20v20H60z' fill='%237c3aed' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
            background-size: 50px 50px;
          }
          
          .perspective-container {
            perspective: 1000px;
            perspective-origin: center center;
          }
          
          .holo-grid {
            background: 
              linear-gradient(to right, rgba(34, 211, 238, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(34, 211, 238, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
            transform: perspective(500px) rotateX(60deg);
            transform-origin: center top;
            height: 100%;
          }
          
          .vignette-effect {
            background: radial-gradient(ellipse at center, transparent 50%, rgba(15, 23, 42, 0.6) 100%);
          }
          
          .scanline-effect {
            background: repeating-linear-gradient(
              to bottom,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.3) 2px,
              rgba(0, 0, 0, 0.3) 4px
            );
          }
          
          .particle {
            opacity: 0.7;
            animation: float-particle linear infinite;
          }
          
          .data-flow-line-1 {
            animation: data-flow-horizontal 8s ease-in-out infinite;
          }
          
          .data-flow-line-2 {
            animation: data-flow-horizontal 12s ease-in-out infinite;
          }
          
          .data-flow-line-3 {
            animation: data-flow-horizontal 10s ease-in-out infinite;
          }
          
          .data-flow-line-4 {
            animation: data-flow-vertical 15s ease-in-out infinite;
          }
          
          .data-flow-line-5 {
            animation: data-flow-vertical 9s ease-in-out infinite;
          }
          
          .binary-code {
            animation: binary-flicker 3s linear infinite;
          }
          
          .cyber-glitch-text {
            position: relative;
            text-shadow: 0 0 5px rgba(34, 211, 238, 0.7);
            animation: textShadowPulse 2s infinite;
          }
          
          .glitch-text {
            position: relative;
            animation: glitch 1s infinite;
          }
          
          .glitch-hover:hover {
            animation: glitch 0.3s infinite;
          }
          
          .shadow-glow-sm {
            box-shadow: 0 0 8px rgba(34, 211, 238, 0.4);
          }
          
          .animate-enhanced-glow {
            animation: enhancedGlow 3s infinite alternate;
          }
          
          .animate-glitch-1 {
            animation: glitch-anim-1 2s infinite linear alternate;
          }
          
          .animate-glitch-2 {
            animation: glitch-anim-2 3s infinite linear alternate;
          }
          
          @keyframes textShadowPulse {
            0% {
              text-shadow: 0 0 4px rgba(34, 211, 238, 0.6);
            }
            50% {
              text-shadow: 0 0 8px rgba(34, 211, 238, 0.8), 0 0 12px rgba(124, 58, 237, 0.4);
            }
            100% {
              text-shadow: 0 0 4px rgba(34, 211, 238, 0.6);
            }
          }
          
          @keyframes enhancedGlow {
            0% {
              stroke-opacity: 0.3;
              stroke-width: 1;
            }
            100% {
              stroke-opacity: 1;
              stroke-width: 2;
            }
          }
          
          @keyframes data-flow-horizontal {
            0%, 100% {
              transform: translateX(-100%);
              opacity: 0;
            }
            50% {
              transform: translateX(100%);
              opacity: 1;
            }
          }
          
          @keyframes data-flow-vertical {
            0%, 100% {
              transform: translateY(-100%);
              opacity: 0;
            }
            50% {
              transform: translateY(100%);
              opacity: 1;
            }
          }
          
          @keyframes float-particle {
            0% {
              transform: translate(0, 0);
            }
            25% {
              transform: translate(10px, 10px);
            }
            50% {
              transform: translate(0, 20px);
            }
            75% {
              transform: translate(-10px, 10px);
            }
            100% {
              transform: translate(0, 0);
            }
          }
          
          @keyframes binary-flicker {
            0%, 100% {
              opacity: 0.3;
            }
            50% {
              opacity: 0.1;
            }
          }
          
          @keyframes glitch {
            0% {
              transform: translate(0);
            }
            20% {
              transform: translate(-2px, 2px);
            }
            40% {
              transform: translate(-2px, -2px);
            }
            60% {
              transform: translate(2px, 2px);
            }
            80% {
              transform: translate(2px, -2px);
            }
            100% {
              transform: translate(0);
            }
          }
          
          @keyframes glitch-anim-1 {
            0% {
              opacity: 1;
              transform: translate3d(10px, 0, 0);
              clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
            }
            2% {
              clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
            }
            4% {
              clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
            }
            6% {
              clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
            }
            8% {
              clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
            }
            10% {
              clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
            }
            12% {
              clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
            }
            14% {
              clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
            }
            16% {
              clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
            }
            18% {
              clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
            }
            20% {
              clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
            }
            21.9% {
              opacity: 1;
              transform: translate3d(10px, 0, 0);
            }
            22%, 100% {
              opacity: 0;
              transform: translate3d(0, 0, 0);
              clip-path: polygon(0 0, 0 0, 0 0, 0 0);
            }
          }
          
          @keyframes glitch-anim-2 {
            0% {
              opacity: 1;
              transform: translate3d(-10px, 0, 0);
              clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%);
            }
            3% {
              clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%);
            }
            5% {
              clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%);
            }
            7% {
              clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
            }
            9% {
              clip-path: polygon(0 40%, 100% 40%, 100% 40%, 0 40%);
            }
            11% {
              clip-path: polygon(0 52%, 100% 52%, 100% 59%, 0 59%);
            }
            13% {
              clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
            }
            15% {
              clip-path: polygon(0 75%, 100% 75%, 100% 75%, 0 75%);
            }
            17% {
              clip-path: polygon(0 65%, 100% 65%, 100% 40%, 0 40%);
            }
            19% {
              clip-path: polygon(0 45%, 100% 45%, 100% 50%, 0 50%);
            }
            20% {
              clip-path: polygon(0 14%, 100% 14%, 100% 33%, 0 33%);
            }
            21.9% {
              opacity: 1;
              transform: translate3d(-10px, 0, 0);
            }
            22%, 100% {
              opacity: 0;
              transform: translate3d(0, 0, 0);
              clip-path: polygon(0 0, 0 0, 0 0, 0 0);
            }
          }
          
          @keyframes gradient-x {
            0% {
              background-position: 0% 50%;
            }
            100% {
              background-position: 100% 50%;
            }
          }
          
          .animate-gradient-x {
            animation: gradient-x 3s linear infinite alternate;
          }
        `}</style>
      </section>
    );
  }

  // Desktop version with full animations
  return (
    <section ref={ref} className="py-16 relative overflow-hidden">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
          <PerformanceMonitor
            onDecline={() => {
              // Handle performance decline
              console.log("Performance declining");
            }}
          />
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 0, -10]} intensity={1} color="#22d3ee" />
          <pointLight
            position={[10, 10, -10]}
            intensity={0.8}
            color="#7c3aed"
          />

          {/* Floating hexagons */}
          {(() => {
            const hexagons = [];
            const count = 15;

            for (let i = 0; i < count; i++) {
              // Position hexagons around the edges, not in the center
              const posX = Math.random() * 40 - 20;
              const posY = Math.random() * 40 - 20;
              const posZ = -5 - Math.random() * 10;
              const scale = 0.2 + Math.random() * 0.4;

              hexagons.push(
                <Float
                  key={i}
                  speed={1 + Math.random()}
                  rotationIntensity={0.3}
                  floatIntensity={0.5}
                >
                  <Torus
                    args={[0.5, 0.2, 6, 6]}
                    position={[posX, posY, posZ]}
                    scale={scale}
                    rotation={[
                      Math.random() * Math.PI,
                      Math.random() * Math.PI,
                      0,
                    ]}
                  >
                    <meshStandardMaterial
                      color={Math.random() > 0.5 ? "#7c3aed" : "#22d3ee"}
                      emissive={Math.random() > 0.5 ? "#7c3aed" : "#22d3ee"}
                      emissiveIntensity={0.8}
                      wireframe
                    />
                  </Torus>
                </Float>,
              );
            }

            return hexagons;
          })()}

          {/* Particle system */}
          {(() => {
            const particles = [];
            const count = 200;

            for (let i = 0; i < count; i++) {
              // Create a spherical distribution
              const theta = Math.random() * Math.PI * 2;
              const phi = Math.acos(2 * Math.random() - 1);
              const radius = 8 + Math.random() * 15;

              const x = radius * Math.sin(phi) * Math.cos(theta);
              const y = radius * Math.sin(phi) * Math.sin(theta);
              const z = radius * Math.cos(phi) - 15; // Push back

              const size = 0.02 + Math.random() * 0.05;

              particles.push(
                <Sphere key={i} args={[size, 8, 8]} position={[x, y, z]}>
                  <meshBasicMaterial
                    color={Math.random() > 0.5 ? "#7c3aed" : "#22d3ee"}
                    transparent
                    opacity={0.7}
                  />
                </Sphere>,
              );
            }

            return particles;
          })()}

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.2}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </div>

      {/* Overlay gradient - matching NeonHero3D */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary/90 z-1">
        {/* Additional radial gradient for better text contrast */}
        <div className="absolute inset-0 bg-radial-gradient"></div>
        {/* Vignette effect for better focus on content */}
        <div className="absolute inset-0 vignette-effect"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <Suspense
            fallback={
              <h2 className="text-3xl md:text-4xl font-rovelink mb-4">
                <span className="text-white">UPCOMING</span>{" "}
                <span className="text-neon">FEATURED</span>{" "}
                <span className="text-accent">EVENTS</span>
              </h2>
            }
          >
            <FramerMotion.div
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <AnimatedHeading
                text="UPCOMING FEATURED EVENTS"
                animation="word-stagger"
                tag="h2"
                className="text-3xl md:text-4xl font-rovelink mb-4"
                colorWords={["#ffffff", "#22d3ee", "#7c3aed"]}
                once={false}
                threshold={0.1}
              />
            </FramerMotion.div>
          </Suspense>

          <div className="w-24 h-1 bg-gradient-to-r from-neon to-accent mx-auto mb-6 glow-line"></div>

          <Suspense
            fallback={
              <p className="text-gray-300 font-futuristic max-w-2xl mx-auto">
                Join us for our upcoming metaverse experiences and be part of
                the digital revolution. Connect with pioneers, creators, and
                enthusiasts in our virtual events.
              </p>
            }
          >
            <FramerMotion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <p className="text-gray-300 font-futuristic max-w-2xl mx-auto">
                Join us for our upcoming metaverse experiences and be part of
                the digital revolution. Connect with pioneers, creators, and
                enthusiasts in our virtual events.
              </p>
            </FramerMotion.div>
          </Suspense>
        </div>

        {/* Featured events showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Main featured event */}
          <div
            className="lg:col-span-2 relative h-[500px] rounded-lg overflow-hidden group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Featured event image with overlay */}
            <div className="absolute inset-0 z-0">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    activeEvent === index ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    transform:
                      activeEvent === index ? "scale(1)" : "scale(1.1)",
                    transition:
                      "transform 0.7s ease-out, opacity 0.7s ease-out",
                  }}
                >
                  <img
                    src={
                      imageErrors[index]
                        ? getFallbackImage(index)
                        : event.imageUrl
                    }
                    alt={event.title}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                    onError={() => handleImageError(index)}
                    style={{ filter: "blur(3px) brightness(0.6)" }} // Adjust blur & brightness
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent"></div>

                  {/* Simplified glitch effect */}
                  {isLoaded && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none">
                      <div className="absolute inset-0 bg-neon mix-blend-screen animate-glitch-1"></div>
                      <div className="absolute inset-0 bg-accent mix-blend-screen animate-glitch-2"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Featured event content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className={`relative transition-all duration-500 ${
                    activeEvent === index
                      ? "opacity-100 transform-none"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  {activeEvent === index && (
                    <>
                      <div className="mb-2">
                        <span className="text-xs font-cyber text-neon bg-primary/80 px-2 py-1 rounded">
                          {event.category.toUpperCase()}
                        </span>
                        <span className="text-xs font-futuristic text-white/80 ml-2">
                          {event.date}
                        </span>
                      </div>
                      <Suspense
                        fallback={
                          <h3 className="text-3xl font-cyber text-white mb-3 group-hover:text-neon transition-colors">
                            {event.title}
                          </h3>
                        }
                      >
                        <FramerMotion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <AnimatedHeading
                            text={event.title}
                            animation="character-slide"
                            tag="h3"
                            className="text-3xl font-cyber mb-3 group-hover:text-neon transition-colors"
                            color="white"
                            once={false}
                            threshold={0.1}
                          />
                        </FramerMotion.div>
                      </Suspense>
                      <p className="text-gray-300 font-futuristic mb-6">
                        <span className="text-neon">Location:</span>{" "}
                        {event.location}
                      </p>
                      <Link
                        to={"/register"}
                        className="cyber-button inline-block py-3 px-8 relative overflow-hidden group"
                      >
                        <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500"></span>
                        <NavLink to={"/register"} className="relative z-10">
                          REGISTER NOW
                        </NavLink>
                      </Link>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Event navigation dots */}
            <div className="absolute bottom-4 right-4 flex space-x-2 z-20">
              {events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveEvent(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeEvent === index
                      ? "bg-neon w-6"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`View event ${index + 1}`}
                />
              ))}
            </div>

            {/* Decorative corners - matching NeonHero3D */}
            {isLoaded && (
              <>
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10">
                  <div className="absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-neon"></div>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10">
                  <div className="absolute top-0 right-0 w-full h-full border-t-2 border-r-2 border-accent"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none z-10">
                  <div className="absolute bottom-0 left-0 w-full h-full border-b-2 border-l-2 border-accent"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-10">
                  <div className="absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-neon"></div>
                </div>
              </>
            )}
          </div>

          {/* Event cards */}
          <div className="space-y-4">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                  activeEvent === index
                    ? "border-2 border-neon shadow-glow-neon"
                    : "border border-gray-700 hover:border-neon/50"
                }`}
                onClick={() => setActiveEvent(index)}
              >
                <div className="flex items-center p-4">
                  {/* Event thumbnail */}
                  <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0 mr-4 bg-gray-800">
                    <img
                      src={
                        imageErrors[index]
                          ? getFallbackImage(index)
                          : event.imageUrl
                      }
                      alt={event.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={() => handleImageError(index)}
                    />
                  </div>

                  {/* Event info */}
                  <div className="flex-grow">
                    <h4
                      className={`font-cyber text-lg transition-colors ${
                        activeEvent === index ? "text-neon" : "text-white"
                      }`}
                    >
                      {event.title}
                    </h4>
                    <p className="text-gray-400 text-sm font-futuristic">
                      {event.date}
                    </p>
                  </div>

                  {/* Active indicator */}
                  <div
                    className={`w-2 h-10 rounded-full transition-all duration-300 ${
                      activeEvent === index ? "bg-neon" : "bg-gray-700"
                    }`}
                  ></div>
                </div>
              </div>
            ))}

            {/* View all events and Download brochure buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <Link
                to="/events"
                className="cyber-button py-3 px-6 relative overflow-hidden group"
              >
                <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500"></span>
                <span className="relative z-10">VIEW ALL EVENTS</span>
              </Link>

              <button
                onClick={() => window.open("/brochure.pdf", "_blank")}
                className="cyber-button py-3 px-6 relative overflow-hidden group"
              >
                <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-all duration-500"></span>
                <span className="relative z-10">DOWNLOAD BROCHURE</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Corner decorative elements - matching NeonHero3D */}
      <div className="absolute top-0 left-0 w-24 h-24 z-10 opacity-70">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M0,0 L60,0 L60,10 L10,10 L10,60 L0,60 Z"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
            className="animate-enhanced-glow"
          />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-24 h-24 z-10 opacity-70">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M100,100 L40,100 L40,90 L90,90 L90,40 L100,40 Z"
            fill="none"
            stroke="#7c3aed"
            strokeWidth="2"
            className="animate-enhanced-glow"
          />
        </svg>
      </div>

      {/* Add 3D effect styles */}
      <style>{`
        .bg-radial-gradient {
          background: radial-gradient(circle at center, transparent 0%, rgba(15, 23, 42, 0.7) 100%);
        }
        
        .vignette-effect {
          background: radial-gradient(ellipse at center, transparent 50%, rgba(15, 23, 42, 0.6) 100%);
        }
        
        .cyber-text-3d {
          text-shadow: 
            0 0 5px rgba(34, 211, 238, 0.7),
            0 0 10px rgba(34, 211, 238, 0.5),
            0 1px 2px rgba(34, 211, 238, 0.3),
            0 2px 4px rgba(0, 0, 0, 0.9);
          animation: text-pulse 4s ease-in-out infinite;
        }
        
        .glow-line {
          box-shadow: 0 0 10px rgba(34, 211, 238, 0.7), 0 0 20px rgba(124, 58, 237, 0.5);
          animation: glow-pulse 3s ease-in-out infinite;
        }
        
        .shadow-glow-neon {
          box-shadow: 0 0 15px rgba(34, 211, 238, 0.5);
        }
        
        @keyframes text-pulse {
          0%, 100% {
            text-shadow: 
              0 0 5px rgba(34, 211, 238, 0.7),
              0 0 10px rgba(34, 211, 238, 0.5),
              0 1px 2px rgba(34, 211, 238, 0.3),
              0 2px 4px rgba(0, 0, 0, 0.9);
          }
          50% {
            text-shadow: 
              0 0 10px rgba(34, 211, 238, 0.9),
              0 0 20px rgba(34, 211, 238, 0.7),
              0 0 30px rgba(34, 211, 238, 0.5),
              0 1px 2px rgba(34, 211, 238, 0.3),
              0 2px 4px rgba(0, 0, 0, 0.9);
          }
        }
        
        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 10px rgba(34, 211, 238, 0.7), 0 0 20px rgba(124, 58, 237, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.9), 0 0 40px rgba(124, 58, 237, 0.7);
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedEvents;
