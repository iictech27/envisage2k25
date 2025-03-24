import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars, Sparkles } from "@react-three/drei";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { NavLink } from "react-router-dom";
import AnimatedHeading from "../components/AnimatedHeading";

// Define the type for time left
type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

// 3D Background component for Countdown section
const CountdownBackground = () => {
  // Orbiting particles around the countdown clock
  const OrbitingParticles = () => {
    const particles = [];
    const count = 100;

    for (let i = 0; i < count; i++) {
      const radius = 4 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const size = 0.02 + Math.random() * 0.05;

      particles.push(
        <Sphere key={i} args={[size, 8, 8]} position={[x, y, z]}>
          <meshBasicMaterial
            color={
              Math.random() > 0.6
                ? "#7c3aed" // Purple
                : Math.random() > 0.3
                ? "#22d3ee" // Cyan
                : "#ec4899" // Pink
            }
            toneMapped={false}
          />
        </Sphere>,
      );
    }

    return <group>{particles}</group>;
  };

  return (
    <>
      <color attach="background" args={["#0f172a"]} />
      <fog attach="fog" args={["#0f172a", 5, 30]} />

      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22d3ee" />

      <OrbitingParticles />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
      <Sparkles
        count={200}
        scale={20}
        size={1}
        speed={0.3}
        opacity={0.5}
        color="#22d3ee"
      />
    </>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { ref: sectionRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });
  const isInView = inView;
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Set the event date (April 15, 2025)
    const eventDate = new Date("April 19, 2025 00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animate elements when section comes into view
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);

      // Animate the countdown cards
      const cards = document.querySelectorAll(".countdown-card");
      gsap.fromTo(
        cards,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
      );

      // Animate the event info
      const eventInfo = document.querySelector(".event-info");
      gsap.fromTo(
        eventInfo,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.5,
          ease: "power2.out",
        },
      );
    }
  }, [isInView, hasAnimated]);

  const countdownItems = [
    { label: "DAYS", value: timeLeft.days, color: "#7c3aed" },
    { label: "HOURS", value: timeLeft.hours, color: "#22d3ee" },
    { label: "MINUTES", value: timeLeft.minutes, color: "#ec4899" },
    { label: "SECONDS", value: timeLeft.seconds, color: "#f97316" },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ minHeight: "80vh" }}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 45 }}>
          <CountdownBackground />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </div>

      {/* Content overlay */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <AnimatedHeading
            text="EVENT COUNTDOWN"
            animation="typewriter"
            tag="h2"
            className="text-4xl md:text-5xl font-rovelink mb-4"
            colorWords={["#7c3aed", "#22d3ee"]} // Purple for "EVENT", Cyan for "COUNTDOWN"
            once={false}
            threshold={0.1}
          />

          <motion.div
            className="w-24 h-1 bg-neon mx-auto mb-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 128 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>

          <motion.p
            className="text-gray-300 max-w-2xl mx-auto font-futuristic text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            The future is approaching. Prepare to enter the metaverse.
          </motion.p>
        </div>

        {/* Mobile/Tablet Countdown Display - Using enhanced CSS classes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto  mb-16">
          {countdownItems.map((item) => (
            <motion.div
              key={item.label}
              className="countdown-card glass-card p-4 md:p-6 text-center border-2 rounded-xl overflow-hidden relative flex flex-col justify-center items-center"
              style={
                {
                  borderColor: `${item.color}40`,
                  boxShadow: `0 0 15px ${item.color}30`,
                  "--accent-color": item.color,
                  "--neon-color": "#22d3ee",
                } as React.CSSProperties
              }
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: 0.2 * countdownItems.indexOf(item),
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 20px ${item.color}50`,
              }}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  background: `radial-gradient(circle, ${item.color} 0%, transparent 70%)`,
                }}
              ></div>

              <div
                className="text-4xl md:text-5xl font-digital mb-2 animate-enhanced-pulse"
                style={{
                  color: item.color,
                  textShadow: `0 0 10px ${item.color}`,
                }}
              >
                {item.value.toString().padStart(2, "0")}
              </div>

              <div
                className="text-xs md:text-sm uppercase font-cyber tracking-wider text-gray-300 countdown-label"
                style={{ textShadow: `0 0 10px ${item.color}80` }}
              >
                {item.label}
              </div>

              <div
                className="absolute bottom-0 left-0 right-0 h-1 animate-enhanced-glow"
                style={{ background: item.color }}
              ></div>
            </motion.div>
          ))}
        </div>

        {/* Event Info Section - Positioned below countdown with clear separation */}
        <motion.div
          className="event-info text-center mt-8 pt-8 border border-black relative bg-primary/50 backdrop-blur-sm rounded-lg p-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-gray-300 font-futuristic mb-8 text-lg max-w-2xl mx-auto">
            Join us for three days of innovation, technology, and immersive
            experiences that will redefine the future.
          </p>

          <div className="inline-block bg-gradient-to-r from-purple-600 to-cyan-400 p-[2px] rounded-lg animate-enhanced-pulse mb-10">
            <div className="bg-primary px-8 py-4 rounded-lg">
              <p className="font-cyber text-white text-xl">
                APRIL 19-23, 2025 •{" "}
                <span className="text-white">VIRTUAL & ON CAMPUS</span>
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col md:flex-row justify-center gap-4 md:gap-6">
            {/* <motion.button
              className="cyber-button text-lg px-8 py-3 relative overflow-hidden group animate-enhanced-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Add to Calendar</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button> */}

            <motion.button
              className="cyber-button text-lg px-8 py-3 relative overflow-hidden group animate-enhanced-glow hover:cursor-pointer"
              style={{
                background: "linear-gradient(45deg, #ec4899, #f97316)",
                boxShadow:
                  "0 0 10px rgba(236, 72, 153, 0.5), inset 0 0 10px rgba(236, 72, 153, 0.5)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink to={"/register"} className="relative z-10">
                Register Now
              </NavLink>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Corner decorations with improved styling - top layer for visibility */}
      <div className="absolute top-0 left-0 w-24 h-24 z-30 corner-decoration">
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

      <div className="absolute bottom-0 right-0 w-24 h-24 z-30 corner-decoration">
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

      {/* Additional corner decorations for balance - top layer */}
      <div className="absolute top-0 right-0 w-24 h-24 z-30 corner-decoration">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M100,0 L40,0 L40,10 L90,10 L90,60 L100,60 Z"
            fill="none"
            stroke="#ec4899"
            strokeWidth="2"
            className="animate-enhanced-glow"
          />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-24 h-24 z-30 corner-decoration">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M0,100 L60,100 L60,90 L10,90 L10,40 L0,40 Z"
            fill="none"
            stroke="#f97316"
            strokeWidth="2"
            className="animate-enhanced-glow"
          />
        </svg>
      </div>
    </section>
  );
};

export default Countdown;
