import { useRef, useEffect } from "react";
import React from "react";
// import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Sphere,
  Sparkles,
  Box,
  Torus,
  Float,
  Stars,
} from "@react-three/drei";
import * as THREE from "three";
// import { is } from "@react-three/fiber/dist/declarations/src/core/utils";
import { Preload } from "@react-three/drei";
import { PerformanceMonitor } from "@react-three/drei";

<Preload all />;

// Add a style tag to ensure text is visible by default
// const visibleTextStyle = {
//   opacity: 1,
//   visibility: "visible" as const,
//   transform: "translateY(0)",
// };

// Enhanced 3D background component
const Background = () => {
  const isMobile = window.innerWidth < 768;
  // Digital rain effect
  const DigitalRain = () => {
    const rainCount = isMobile ? 50 : 200;
    const rainDrops = [];

    for (let i = 0; i < rainCount; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 30;
      const z = -10 - Math.random() * 15;
      const size = 0.05 + Math.random() * 0.05;
      // const speed = 0.2 + Math.random() * 0.3;
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
        }
      });
    });

    return <group ref={rainGroup}>{rainDrops}</group>;
  };

  // Floating hexagons around the edges (not in center)
  const FloatingHexagons = () => {
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

  // Grid plane that extends to infinity
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
          opacity={0.5}
        />
      </mesh>
    );
  };

  // Floating particles system
  const ParticleSystem = () => {
    const particles = [];
    const count = isMobile ? 50 : 200;

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

    // useFrame(({ clock }) => {
    //   if (!particleGroup.current) return;
    //   const t = clock.getElapsedTime();

    //   // Rotate the entire particle system slowly
    //   particleGroup.current.rotation.y = t * 0.05;
    //   particleGroup.current.rotation.x = Math.sin(t * 0.025) * 0.1;
    // });
    useFrame(({ clock }, delta) => {
      if (!particleGroup.current) return;
      if (delta > 0.03) return; // Skip frames when FPS is low
      const t = clock.getElapsedTime();
      particleGroup.current.rotation.y = t * 0.05;
    });

    return <group ref={particleGroup}>{particles}</group>;
  };

  // Energy rings that pulse outward from the sides
  const EnergyRings = () => {
    const rings: React.ReactElement[] = [];
    const positions: [number, number, number][] = [
      [-8, 0, -5], // Left
      [8, 0, -5], // Right
      [0, 8, -5], // Top
      [0, -8, -5], // Bottom
    ];

    // Create refs outside the loop
    const ringRefs = positions.map(() =>
      Array(3)
        .fill(0)
        .map(() => React.createRef<THREE.Mesh>()),
    );

    // Create animation function outside the loop
    useFrame(({ clock }) => {
      positions.forEach((_, posIndex) => {
        for (let i = 0; i < 3; i++) {
          const ringRef = ringRefs[posIndex][i];
          if (!ringRef.current) return;

          const initialScale = 0.1 + i * 0.2;
          const speed = 0.3 + i * 0.1;
          const t = clock.getElapsedTime() + i * 2 + posIndex;

          // Pulse outward
          const scale = initialScale + (Math.sin(t * speed) + 1) * 0.5;
          ringRef.current.scale.set(scale, scale, scale);
        }
      });
    });

    // Create rings
    positions.forEach((pos, posIndex) => {
      for (let i = 0; i < 3; i++) {
        const initialScale = 0.1 + i * 0.2;

        rings.push(
          <Torus
            key={`${posIndex}-${i}`}
            ref={ringRefs[posIndex][i]}
            args={[1, 0.02, 16, 50]}
            position={pos}
            scale={initialScale}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial
              color={posIndex % 2 === 0 ? "#7c3aed" : "#22d3ee"}
              emissive={posIndex % 2 === 0 ? "#7c3aed" : "#22d3ee"}
              emissiveIntensity={1}
              transparent
              opacity={0.7}
            />
          </Torus>,
        );
      }
    });

    return <>{rings}</>;
  };

  return (
    <>
      <color attach="background" args={["#0f172a"]} />
      <fog attach="fog" args={["#0f172a", 8, 30]} />

      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={isMobile ? 0.3 : 0.5} />
      <pointLight
        position={[-10, -10, -10]}
        intensity={isMobile ? 0.3 : 0.5}
        color="#22d3ee"
      />

      {/* Digital rain effect */}
      <DigitalRain />

      {/* Floating hexagons around the edges */}
      <FloatingHexagons />

      {/* Grid plane */}
      <GridPlane />

      {/* Particle system */}
      <ParticleSystem />

      {/* Energy rings */}
      <EnergyRings />

      {/* Stars in background */}
      <Stars
        radius={100}
        depth={50}
        count={isMobile ? 500 : 2000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Subtle sparkles */}
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

interface NeonHero3DProps {
  onRegisterClick: () => void;
}

const NeonHero3D = ({ onRegisterClick }: NeonHero3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Simplified useEffect without animations
  useEffect(() => {
    // Ensure all text is visible by default
    document.querySelectorAll(".gsap-text, .gsap-button").forEach((el) => {
      el.classList.add("hero-text-visible");
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-primary hero-text-visible"
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
          <PerformanceMonitor
            onChange={({ fps }) => console.log("FPS:", fps)}
          />
          <Background />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.2}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary/90 z-10">
        {/* Additional radial gradient for better text contrast */}
        <div className="absolute inset-0 bg-radial-gradient"></div>
        {/* Vignette effect for better focus on content */}
        <div className="absolute inset-0 vignette-effect"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-20 text-center hero-text-visible">
        <div ref={textRef} className="mb-12 hero-text-visible">
          <h2
            className="gsap-text neon-text text-neon font-karnivor text-xl md:text-2xl mb-6 tracking-widest hero-text-visible"
            style={{ fontFamily: "'Karnivor', 'Orbitron', sans-serif" }}
          >
            IIC TMSL presents,
          </h2>

          <div className="gsap-text relative inline-block mb-8 hero-text-visible">
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold"
              style={{ letterSpacing: "0.05em" }}
            >
              <span className="text-white font-rovelink">ENVISAGE</span>
              <span className="text-accent font-karnivor"> 25</span>
            </h1>
          </div>

          <p className="gsap-text text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-futuristic mt-4 hero-text-visible">
            Join us for a groundbreaking journey where reality and virtuality
            converge. Experience cutting-edge technology, immersive
            environments, and the future of digital interaction.
          </p>
        </div>

        <div
          ref={ctaRef}
          className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8 mb-16"
        >
          {/* Register button - use regular button with GSAP animation */}
          <button
            className="gsap-button cyber-button text-lg px-10 py-4 relative overflow-hidden group z-20 hover:scale-105 active:scale-95 transition-transform hero-text-visible"
            onClick={onRegisterClick}
          >
            <span className="relative z-10 font-bold text-white text-xl hover:cursor-pointer">
              REGISTER NOW
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
      </div>

      {/* Simple corner decorations */}
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

      {/* Digital circuit elements on sides */}
      <div className="absolute left-4 top-1/4 bottom-1/4 w-16 z-10 opacity-70 hidden md:block">
        <svg viewBox="0 0 100 400" className="w-full h-full">
          <circle
            cx="20"
            cy="50"
            r="5"
            fill="#22d3ee"
            className="animate-pulse-slow"
          />
          <circle
            cx="20"
            cy="350"
            r="5"
            fill="#7c3aed"
            className="animate-pulse-slow"
          />
          <line
            x1="20"
            y1="50"
            x2="20"
            y2="350"
            stroke="#22d3ee"
            strokeWidth="1"
            strokeDasharray="10,5"
            className="data-line"
          />
          <circle
            cx="50"
            cy="150"
            r="3"
            fill="#22d3ee"
            className="animate-pulse-slow"
          />
          <line
            x1="20"
            y1="150"
            x2="50"
            y2="150"
            stroke="#22d3ee"
            strokeWidth="1"
          />
          <circle
            cx="50"
            cy="250"
            r="3"
            fill="#7c3aed"
            className="animate-pulse-slow"
          />
          <line
            x1="20"
            y1="250"
            x2="50"
            y2="250"
            stroke="#7c3aed"
            strokeWidth="1"
          />
          <rect
            x="60"
            y="140"
            width="20"
            height="20"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="1"
            className="animate-glow"
          />
          <rect
            x="60"
            y="240"
            width="20"
            height="20"
            fill="none"
            stroke="#7c3aed"
            strokeWidth="1"
            className="animate-glow"
          />
        </svg>
      </div>

      <div className="absolute right-4 top-1/4 bottom-1/4 w-16 z-10 opacity-70 hidden md:block">
        <svg viewBox="0 0 100 400" className="w-full h-full">
          <circle
            cx="80"
            cy="50"
            r="5"
            fill="#7c3aed"
            className="animate-pulse-slow"
          />
          <circle
            cx="80"
            cy="350"
            r="5"
            fill="#22d3ee"
            className="animate-pulse-slow"
          />
          <line
            x1="80"
            y1="50"
            x2="80"
            y2="350"
            stroke="#7c3aed"
            strokeWidth="1"
            strokeDasharray="10,5"
            className="data-line"
          />
          <circle
            cx="50"
            cy="150"
            r="3"
            fill="#7c3aed"
            className="animate-pulse-slow"
          />
          <line
            x1="80"
            y1="150"
            x2="50"
            y2="150"
            stroke="#7c3aed"
            strokeWidth="1"
          />
          <circle
            cx="50"
            cy="250"
            r="3"
            fill="#22d3ee"
            className="animate-pulse-slow"
          />
          <line
            x1="80"
            y1="250"
            x2="50"
            y2="250"
            stroke="#22d3ee"
            strokeWidth="1"
          />
          <rect
            x="20"
            y="140"
            width="20"
            height="20"
            fill="none"
            stroke="#7c3aed"
            strokeWidth="1"
            className="animate-glow"
          />
          <rect
            x="20"
            y="240"
            width="20"
            height="20"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="1"
            className="animate-glow"
          />
        </svg>
      </div>
    </div>
  );
};

export default NeonHero3D;
