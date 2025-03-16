import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EventCard3D from "./EventCard3D";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  Sparkles,
  Box,
  Torus,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// 3D Background component for Events section
const EventsBackground = () => {
  // Digital rain effect (similar to Hero section)
  const DigitalRain = () => {
    const rainCount = 60; // Fewer drops for better performance
    const rainDrops = [];

    for (let i = 0; i < rainCount; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 30;
      const z = -10 - Math.random() * 15;
      const size = 0.05 + Math.random() * 0.05;
      const color = Math.random() > 0.7 ? "#7c3aed" : "#22d3ee";

      rainDrops.push(
        <Box
          key={i}
          args={[size, 0.5 + Math.random(), size]}
          position={[x, y, z]}
        >
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1}
            transparent
            opacity={0.6}
          />
        </Box>,
      );
    }

    const rainGroup = useRef<THREE.Group>(null);

    useFrame(() => {
      if (!rainGroup.current) return;

      rainGroup.current.children.forEach((drop, i) => {
        // Move drops down
        drop.position.y -= 0.05 + (i % 5) * 0.01;

        // Reset position when out of view
        if (drop.position.y < -15) {
          drop.position.y = 15;
          drop.position.x = (Math.random() - 0.5) * 30;
        }
      });
    });

    return <group ref={rainGroup}>{rainDrops}</group>;
  };

  // Floating hexagons (similar to Hero section)
  const FloatingHexagons = () => {
    const hexagons = [];
    const count = 10; // Fewer hexagons for better performance

    for (let i = 0; i < count; i++) {
      // Create a "donut" distribution - avoid the center
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 10;

      const posX = Math.cos(angle) * radius;
      const posY = Math.sin(angle) * radius;
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
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
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

    return <>{hexagons}</>;
  };

  // Grid plane (similar to Hero section but more subtle)
  const GridPlane = () => {
    const gridRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
      if (!gridRef.current) return;
      const t = clock.getElapsedTime();

      // Subtle movement
      gridRef.current.position.z = -10 + Math.sin(t * 0.1) * 0.5;
    });

    return (
      <mesh
        ref={gridRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -5, -10]}
      >
        <planeGeometry args={[60, 60, 60, 60]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#22d3ee"
          emissiveIntensity={0.2}
          wireframe
          transparent
          opacity={0.3} // More subtle than hero section
        />
      </mesh>
    );
  };

  // Particle system (similar to Hero section)
  const ParticleSystem = () => {
    const particles = [];
    const count = 100; // Fewer particles for better performance

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

    const particleGroup = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
      if (!particleGroup.current) return;
      const t = clock.getElapsedTime();

      // Rotate the entire particle system slowly
      particleGroup.current.rotation.y = t * 0.05;
      particleGroup.current.rotation.x = Math.sin(t * 0.025) * 0.1;
    });

    return <group ref={particleGroup}>{particles}</group>;
  };
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <>
      <color attach="background" args={["#0f172a"]} />
      <fog attach="fog" args={["#0f172a", 8, 30]} />

      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22d3ee" />

      {/* Digital rain effect */}
      <DigitalRain />

      {/* Floating hexagons */}
      <FloatingHexagons />

      {/* Grid plane */}
      <GridPlane />

      {/* Particle system */}
      <ParticleSystem />

      {/* Subtle sparkles */}
      <Sparkles
        count={isMobile ? 30 : 100}
        scale={20}
        size={1}
        speed={0.3}
        opacity={0.3}
      />

      {/* Background sphere */}
      <mesh position={[0, 0, -15]}>
        <sphereGeometry args={[10, 32, 32]} />
        <MeshDistortMaterial
          color="#0f172a"
          emissive="#1e293b"
          emissiveIntensity={0.2}
          roughness={0.9}
          metalness={0.2}
          distort={0.3}
          speed={1.5}
        />
      </mesh>
    </>
  );
};

// Events section component
const Events = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // State for category filter
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Event data with more details
  const events = [
    {
      title: "VR Hackathon",
      date: "APR 15-17, 2025",
      description:
        "Build innovative VR applications in this 24-hour coding marathon. Collaborate with fellow developers and designers to create groundbreaking metaverse experiences.",
      image:
        "https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      color: "#7c3aed", // accent
      category: "Tech",
    },
    {
      title: "Metaverse Art Gallery",
      date: "APR 18-20, 2025",
      description:
        "Showcase your digital art in our virtual reality exhibition space. Experience immersive installations and interactive sculptures in ways impossible in the physical world.",
      image:
        "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      color: "#22d3ee", // neon
      category: "Art",
    },
    {
      title: "Crypto Conference",
      date: "APR 21-22, 2025",
      description:
        "Learn about blockchain, NFTs, and the future of digital ownership. Connect with industry leaders and discover how crypto is shaping the metaverse economy.",
      image:
        "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      color: "#10b981", // highlight
      category: "Finance",
    },
    {
      title: "Gaming Tournament",
      date: "APR 23-25, 2025",
      description:
        "Compete in our esports arena for glory and amazing prizes. Experience next-gen gaming with full-body haptic feedback and neural interface controllers.",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      color: "#ec4899", // pink
      category: "Gaming",
    },
    {
      title: "AI Workshop",
      date: "APR 26-27, 2025",
      description:
        "Hands-on session on artificial intelligence and machine learning. Learn how AI is powering the next generation of metaverse experiences and digital beings.",
      image:
        "https://images.unsplash.com/photo-1677442135136-760c813028c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      color: "#8b5cf6", // purple
      category: "Tech",
    },
    {
      title: "Digital Fashion Show",
      date: "APR 28-30, 2025",
      description:
        "Experience the future of fashion with digital wearables and NFT clothing. See how designers are pushing boundaries with physics-defying garments and dynamic textures.",
      image:
        "https://images.unsplash.com/photo-1633536726481-9b4a245151e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      color: "#f97316", // orange
      category: "Fashion",
    },
  ];

  // Get unique categories
  const categories = ["all", ...new Set(events.map((event) => event.category))];

  // Filter events based on active category
  const filteredEvents =
    activeCategory === "all"
      ? events
      : events.filter((event) => event.category === activeCategory);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !headingRef.current ||
      !cardsContainerRef.current
    )
      return;

    // Animate heading with glitch effect
    const headingTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    headingTimeline
      .from(headingRef.current.querySelectorAll(".char"), {
        opacity: 0,
        y: gsap.utils.random(-100, 100, true),
        x: gsap.utils.random(-100, 100, true),
        rotationX: gsap.utils.random(-90, 90, true),
        rotationY: gsap.utils.random(-90, 90, true),
        stagger: 0.04,
        duration: 0.8,
        ease: "power3.out",
      })
      .to(headingRef.current.querySelectorAll(".char"), {
        color: "#22d3ee",
        duration: 0.2,
        stagger: 0.02,
        repeat: 1,
        yoyo: true,
      });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Split text into characters for animation
  // const splitHeading = (text: string) => {
  //   return text.split("").map((char, i) => (
  //     <span key={i} className="char inline-block">
  //       {char === " " ? "\u00A0" : char}
  //     </span>
  //   ));
  // };

  return (
    <section
      id="events"
      ref={sectionRef}
      className="py-20 relative overflow-hidden min-h-screen"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 45 }}>
          <EventsBackground />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.2}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </div>
      <div className="container mx-auto px-4 relative z-10 flex justify-center items-center">
        <h2
          ref={headingRef}
          className="text-3xl md:text-5xl font-cyber font-bold mb-4 tracking-wider text-center"
        >
          <span className="text-white">FEATURED</span>
          <span className="text-accent ml-3">EVENTS</span>
        </h2>
      </div>
      {/* Overlay gradient for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/70 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-32 h-1 bg-gradient-to-r from-accent to-neon mx-auto mb-6 animate-enhanced-glow"></div>

          <p className="text-gray-300 max-w-2xl mx-auto font-futuristic text-lg">
            Dive into the future with our cutting-edge events designed to
            explore the boundless possibilities of the metaverse.
          </p>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-cyber transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-neon text-primary"
                    : "bg-primary/50 text-white border border-neon/30 hover:border-neon"
                }`}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.toUpperCase()}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div ref={cardsContainerRef} className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <EventCard3D
                    title={event.title}
                    date={event.date}
                    description={event.description}
                    image={event.image}
                    color={event.color}
                    category={event.category}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button className="cyber-button text-lg px-8 py-3 relative overflow-hidden group animate-glow">
            <span className="relative z-10">Explore All Events</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </motion.div>
      </div>

      {/* Simple corner decorations (similar to Hero section) */}
      <div className="absolute top-0 left-0 w-24 h-24 z-10 opacity-70">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M0,0 L60,0 L60,10 L10,10 L10,60 L0,60 Z"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
            className="animate-glow"
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
            className="animate-glow"
          />
        </svg>
      </div>
    </section>
  );
};

export default Events;
