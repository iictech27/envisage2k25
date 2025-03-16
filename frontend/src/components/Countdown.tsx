import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  MeshDistortMaterial,
  Sparkles,
  Box,
  Torus,
  Float,
  Text3D,
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

// 3D Background component for Countdown section
const CountdownBackground = ({ timeLeft }: { timeLeft: TimeLeft }) => {
  // Digital clock numbers in 3D
  const DigitalNumber = ({
    value,
    position,
    color = "#22d3ee",
  }: {
    value: number;
    position: [number, number, number];
    color?: string;
  }) => {
    const displayValue = value.toString().padStart(2, "0");

    return (
      <group position={position}>
        <Text3D
          font="/fonts/Orbitron_Bold.json"
          size={1.2}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelSegments={5}
        >
          {displayValue}
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1}
            toneMapped={false}
          />
        </Text3D>
      </group>
    );
  };

  // Floating particles that orbit around the clock
  const OrbitingParticles = () => {
    const particles = [];
    const count = 80;
    const radius = 12;
    const groupRef = useRef<THREE.Group>(null);

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = (Math.random() - 0.5) * 10;

      const size = 0.05 + Math.random() * 0.1;
      const color =
        i % 3 === 0 ? "#7c3aed" : i % 3 === 1 ? "#22d3ee" : "#ec4899";

      particles.push(
        <Float key={i} speed={1} rotationIntensity={2} floatIntensity={1}>
          <Box args={[size, size, size]} position={[x, y, z]}>
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1}
              transparent
              opacity={0.8}
            />
          </Box>
        </Float>,
      );
    }

    useFrame(({ clock }) => {
      if (!groupRef.current) return;
      groupRef.current.rotation.z = clock.getElapsedTime() * 0.05;
    });

    return <group ref={groupRef}>{particles}</group>;
  };

  // Pulsing rings that indicate seconds
  const PulsingRings = () => {
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
      if (!ringRef.current) return;
      const t = clock.getElapsedTime();
      const scale = 1 + Math.sin(t * 2) * 0.1;
      ringRef.current.scale.set(scale, scale, scale);
    });

    return (
      <Torus
        ref={ringRef}
        args={[8, 0.1, 16, 100]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={1}
          transparent
          opacity={0.5}
        />
      </Torus>
    );
  };

  // Background elements
  const BackgroundElements = () => {
    return (
      <>
        <mesh position={[0, 0, -20]}>
          <sphereGeometry args={[15, 32, 32]} />
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

        <Sparkles
          count={200}
          scale={30}
          size={1}
          speed={0.3}
          opacity={0.3}
          color="white"
        />
      </>
    );
  };

  return (
    <>
      <color attach="background" args={["#0f172a"]} />
      <fog attach="fog" args={["#0f172a", 8, 30]} />

      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22d3ee" />

      <BackgroundElements />
      <OrbitingParticles />
      <PulsingRings />

      {/* 3D Digital Clock - Adjusted positions for better alignment */}
      <group position={[0, 0, 0]}>
        {/* Using negative half of text width to center each element */}
        <DigitalNumber
          value={timeLeft.days}
          position={[-8, 0, 0]}
          color="#7c3aed"
        />
        <DigitalNumber
          value={timeLeft.hours}
          position={[-2.5, 0, 0]}
          color="#22d3ee"
        />
        <DigitalNumber
          value={timeLeft.minutes}
          position={[3, 0, 0]}
          color="#ec4899"
        />
        <DigitalNumber
          value={timeLeft.seconds}
          position={[8.5, 0, 0]}
          color="#f97316"
        />

        {/* Separators - Adjusted positions */}
        <group position={[-4.5, 0, 0]}>
          <Text3D font="/fonts/Orbitron_Bold.json" size={1.2} height={0.2}>
            :
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.5}
            />
          </Text3D>
        </group>

        <group position={[0.5, 0, 0]}>
          <Text3D font="/fonts/Orbitron_Bold.json" size={1.2} height={0.2}>
            :
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.5}
            />
          </Text3D>
        </group>

        <group position={[5.5, 0, 0]}>
          <Text3D font="/fonts/Orbitron_Bold.json" size={1.2} height={0.2}>
            :
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.5}
            />
          </Text3D>
        </group>
      </group>

      {/* Labels - Adjusted positions and wrapped in groups for centering */}
      <group position={[0, -2, 0]}>
        <group position={[-8, 0, 0]}>
          <Text3D font="/fonts/Orbitron_Bold.json" size={0.4} height={0.1}>
            DAYS
            <meshStandardMaterial
              color="#7c3aed"
              emissive="#7c3aed"
              emissiveIntensity={0.8}
            />
          </Text3D>
        </group>

        <group position={[-2.5, 0, 0]}>
          <Text3D font="/fonts/Orbitron_Bold.json" size={0.4} height={0.1}>
            HOURS
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#22d3ee"
              emissiveIntensity={0.8}
            />
          </Text3D>
        </group>

        <group position={[3, 0, 0]}>
          <Text3D font="/fonts/Orbitron_Bold.json" size={0.4} height={0.1}>
            MINUTES
            <meshStandardMaterial
              color="#ec4899"
              emissive="#ec4899"
              emissiveIntensity={0.8}
            />
          </Text3D>
        </group>

        <group position={[8.5, 0, 0]}>
          <Text3D font="/fonts/Orbitron_Bold.json" size={0.4} height={0.1}>
            SECONDS
            <meshStandardMaterial
              color="#f97316"
              emissive="#f97316"
              emissiveIntensity={0.8}
            />
          </Text3D>
        </group>
      </group>
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

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Set the event date (April 19, 2025)
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
    if (isInView && !hasAnimated && sectionRef.current) {
      setHasAnimated(true);

      // Animate the countdown cards
      const cards = sectionRef.current.querySelectorAll(".countdown-card");
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
      const eventInfo = sectionRef.current.querySelector(".event-info");
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
      className="py-20 relative overflow-hidden min-h-screen flex flex-col justify-center"
      id="countdown-section"
    >
      {/* 3D Canvas Background - lowest z-index */}
      <div className="absolute inset-0 z-0 opacity-70">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 15], fov: 45 }}>
          <CountdownBackground timeLeft={timeLeft} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.2}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </div>

      {/* Overlay gradient for better text contrast - middle layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/80 z-1"></div>

      {/* Content - top layer with higher z-index */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-cyber font-bold mb-4 tracking-wider animate-enhanced-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
            style={{}}
          >
            <span className="text-white">EVENT</span>
            <span className=""> COUNTDOWN</span>
          </motion.h2>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-accent to-neon mx-auto mb-6 animate-enhanced-glow"
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto lg:hidden mb-16">
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
          className="event-info text-center mt-8 pt-8 border-t border-gray-800 relative bg-primary/50 backdrop-blur-sm rounded-lg p-6"
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
                APRIL 18-23, 2025 •{" "}
                <span className="text-white">VIRTUAL & ON CAMPUS</span>
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col md:flex-row justify-center gap-4 md:gap-6">
            <motion.button
              className="cyber-button text-lg px-8 py-3 relative overflow-hidden group animate-enhanced-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Add to Calendar</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>

            <motion.button
              className="cyber-button text-lg px-8 py-3 relative overflow-hidden group animate-enhanced-glow"
              style={{
                background: "linear-gradient(45deg, #ec4899, #f97316)",
                boxShadow:
                  "0 0 10px rgba(236, 72, 153, 0.5), inset 0 0 10px rgba(236, 72, 153, 0.5)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Register Now</span>
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
