import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

// Digital rain effect (Matrix-style)
const DigitalRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = (): void => {
      // Add semi-transparent black rectangle to create fade effect
      ctx.fillStyle = "rgba(15, 23, 42, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text color and font
      ctx.fillStyle = "#22d3ee";
      ctx.font = "15px monospace";

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = characters.charAt(
          Math.floor(Math.random() * characters.length),
        );

        // x = i * fontSize, y = value of drops[i]
        ctx.fillText(text, i * 20, drops[i] * 20);

        // Sending the drop back to the top randomly after it has crossed the screen
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Incrementing Y coordinate
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    // Handle resize
    const handleResize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 opacity-20 pointer-events-none"
    />
  );
};

// Define mouse position type
interface MousePosition {
  x: number;
  y: number;
}

// Interactive floating elements
const FloatingElements: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Floating geometric shapes that follow mouse */}
      <div
        className="absolute w-32 h-32 rounded-full bg-accent opacity-10 blur-xl"
        style={{
          left: `calc(50% + ${mousePosition.x * 40}px)`,
          top: `calc(30% + ${mousePosition.y * 40}px)`,
          transform: "translate(-50%, -50%)",
          transition: "left 0.3s ease-out, top 0.3s ease-out",
        }}
      />

      <div
        className="absolute w-40 h-40 rounded-full bg-neon opacity-10 blur-xl"
        style={{
          left: `calc(60% + ${-mousePosition.x * 60}px)`,
          top: `calc(60% + ${-mousePosition.y * 60}px)`,
          transform: "translate(-50%, -50%)",
          transition: "left 0.5s ease-out, top 0.5s ease-out",
        }}
      />

      <div
        className="absolute w-24 h-24 rounded-full bg-highlight opacity-10 blur-xl"
        style={{
          left: `calc(30% + ${mousePosition.x * 30}px)`,
          top: `calc(70% + ${mousePosition.y * 30}px)`,
          transform: "translate(-50%, -50%)",
          transition: "left 0.4s ease-out, top 0.4s ease-out",
        }}
      />
    </div>
  );
};

// Main Hero component
const EnhancedHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (heroRef.current && textRef.current && ctaRef.current) {
      const tl = gsap.timeline();

      tl.from(textRef.current.querySelectorAll(".gsap-text"), {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out",
      }).from(
        ctaRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4",
      );
    }
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-primary grid-background"
    >
      {/* Digital rain background effect */}
      <DigitalRain />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-transparent opacity-80"></div>

      {/* Interactive floating elements */}
      <FloatingElements />

      <div className="container mx-auto px-4 z-10 text-center">
        <div ref={textRef} className="mb-8">
          <motion.h2
            className="gsap-text text-neon font-cyber text-xl md:text-2xl mb-4 tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            ENTER THE DIGITAL FRONTIER
          </motion.h2>

          <motion.div
            className="gsap-text relative inline-block mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-cyber font-bold">
              <span className="text-white">ENVISAGE</span>
              <span className="text-accent"> 2025</span>
            </h1>

            {/* Glitch effect overlay */}
            <div
              className="absolute inset-0 text-4xl md:text-6xl lg:text-7xl font-cyber font-bold text-accent opacity-50 animate-pulse"
              style={{
                clipPath: "inset(10% 0 10% 0)",
                left: "2px",
                top: "2px",
              }}
            >
              <span className="text-white">ENVISAGE</span>
              <span className="text-accent"> 2025</span>
            </div>
          </motion.div>

          <motion.div
            className="gsap-text metaverse-gradient p-[2px] rounded-lg inline-block mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="bg-primary px-6 py-2 rounded-lg">
              <h3 className="text-2xl md:text-3xl font-futuristic text-white">
                THEME: <span className="text-neon font-bold">METAVERSE</span>
              </h3>
            </div>
          </motion.div>

          <motion.p
            className="gsap-text text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-futuristic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Experience the convergence of reality and virtuality at the most
            anticipated tech fest of the year.
          </motion.p>
        </div>

        <div
          ref={ctaRef}
          className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6"
        >
          <motion.button
            className="cyber-button text-lg px-8 py-3 relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Register Now</span>
            <span className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.button>

          <motion.button
            className="font-futuristic text-white border-b-2 border-neon pb-1 flex items-center"
            whileHover={{ scale: 1.05, color: "#22d3ee" }}
          >
            Explore Events
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="flex flex-col items-center">
            <p className="text-gray-400 font-futuristic mb-2">
              Scroll to Explore
            </p>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-gray-400 rounded-full mt-2 animate-pulse-slow"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedHero;
