import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Text3D,
  Float,
  Sphere,
  MeshDistortMaterial,
  Environment,
  OrbitControls,
  Torus,
} from "@react-three/drei";

// Floating particles component
const ParticleField = ({ count = 200 }) => {
  const mesh = useRef<THREE.InstancedMesh>(null!);

  useEffect(() => {
    if (!mesh.current) return;

    // Create a temporary object to hold position and scale
    const temp = new THREE.Object3D();
    const colors = [
      new THREE.Color("#7c3aed"), // accent
      new THREE.Color("#22d3ee"), // neon
      new THREE.Color("#10b981"), // highlight
      new THREE.Color("#4c1d95"), // darkPurple
    ];

    // Position particles randomly in a sphere
    for (let i = 0; i < count; i++) {
      const radius = 15 * Math.pow(Math.random(), 1 / 3);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      temp.position.x = radius * Math.sin(phi) * Math.cos(theta);
      temp.position.y = radius * Math.sin(phi) * Math.sin(theta);
      temp.position.z = radius * Math.cos(phi);

      const scale = Math.random() * 0.5 + 0.1;
      temp.scale.set(scale, scale, scale);

      temp.updateMatrix();
      mesh.current.setMatrixAt(i, temp.matrix);

      // Set random colors
      mesh.current.setColorAt(
        i,
        colors[Math.floor(Math.random() * colors.length)],
      );
    }

    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor)
      mesh.current.instanceColor.needsUpdate = true;
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;

    // Rotate the entire particle field
    mesh.current.rotation.y = clock.getElapsedTime() * 0.05;
    mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.03) * 0.1;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
};

// Floating holographic logo
const HolographicLogo = () => {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!mesh.current) return;

    // Add subtle floating animation
    mesh.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.2;
  });

  return (
    <group position={[0, 1, -2]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text3D
          ref={mesh}
          font="/fonts/Orbitron_Bold.json"
          size={1.2}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelSegments={5}
        >
          ENVISAGE
          <meshStandardMaterial
            color="#7c3aed"
            emissive="#7c3aed"
            emissiveIntensity={0.8}
            metalness={0.8}
            roughness={0.2}
            wireframe={true}
          />
        </Text3D>
      </Float>

      <Float
        speed={1.5}
        rotationIntensity={0.1}
        floatIntensity={0.3}
        position={[0, -1.5, 0]}
      >
        <Text3D
          font="/fonts/Orbitron_Bold.json"
          size={0.7}
          height={0.1}
          curveSegments={12}
        >
          METAVERSE
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={1}
            metalness={0.9}
            roughness={0.1}
          />
        </Text3D>
      </Float>
    </group>
  );
};

// Animated portal ring
const PortalRing = () => {
  const ring = useRef<THREE.Mesh>(null!);
  const innerRing = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!ring.current || !innerRing.current) return;

    // Rotate the rings in opposite directions
    ring.current.rotation.z = clock.getElapsedTime() * 0.3;
    innerRing.current.rotation.z = -clock.getElapsedTime() * 0.5;

    // Pulse the emission intensity
    const material = ring.current.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity =
      0.5 + Math.sin(clock.getElapsedTime() * 2) * 0.3;

    const innerMaterial = innerRing.current
      .material as THREE.MeshStandardMaterial;
    innerMaterial.emissiveIntensity =
      0.5 + Math.cos(clock.getElapsedTime() * 2) * 0.3;
  });

  return (
    <group position={[0, 0, -5]} rotation={[Math.PI / 6, 0, 0]}>
      <Torus ref={ring} args={[3, 0.2, 16, 100]}>
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </Torus>

      <Torus ref={innerRing} args={[2.5, 0.1, 16, 80]}>
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={1}
          metalness={0.9}
          roughness={0.1}
        />
      </Torus>

      {/* Portal center with distortion effect */}
      <Sphere args={[2.2, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#0f172a"
          emissive="#4c1d95"
          emissiveIntensity={0.2}
          roughness={0.4}
          metalness={0.8}
          distort={0.4}
          speed={2}
        />
      </Sphere>
    </group>
  );
};

// Floating digital cubes
const DigitalCubes = () => {
  const group = useRef<THREE.Group>(null!);
  const cubes = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!group.current) return;

    // Store references to all cube meshes
    cubes.current = [];
    group.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        cubes.current.push(child);
      }
    });
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;

    // Rotate the entire group
    group.current.rotation.y = clock.getElapsedTime() * 0.1;

    // Animate each cube individually
    cubes.current.forEach((cube, i) => {
      cube.rotation.x = clock.getElapsedTime() * (0.2 + i * 0.05);
      cube.rotation.z = clock.getElapsedTime() * (0.1 + i * 0.03);

      // Pulse scale
      const scale =
        0.8 + Math.sin(clock.getElapsedTime() * (1 + i * 0.2)) * 0.1;
      cube.scale.set(scale, scale, scale);
    });
  });

  // Create positions for the cubes in a circular pattern
  const positions: [number, number, number][] = [];
  const count = 8;
  const radius = 6;

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = Math.sin(i * 1.5) * 2;
    positions.push([x, y, z]);
  }

  return (
    <group ref={group}>
      {positions.map((position, i) => (
        <mesh key={i} position={position}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#7c3aed" : "#22d3ee"}
            emissive={i % 2 === 0 ? "#7c3aed" : "#22d3ee"}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
            wireframe={i % 3 === 0}
          />
        </mesh>
      ))}
    </group>
  );
};

// Main 3D scene
const MetaverseHeroScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <color attach="background" args={["#0f172a"]} />

      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#7c3aed" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22d3ee" />

      <HolographicLogo />
      <PortalRing />
      <DigitalCubes />
      <ParticleField count={300} />

      <Environment preset="city" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
};

// Interactive floating elements
const FloatingElements = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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

// Digital rain effect (Matrix-style)
const DigitalRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const draw = () => {
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
    const handleResize = () => {
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

// Main Hero component
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Parallax effect on scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
    <div ref={heroRef} className="relative min-h-screen w-full overflow-hidden">
      {/* Digital rain background effect */}
      <DigitalRain />

      {/* Grid background */}
      <div className="absolute inset-0 grid-background opacity-30"></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-transparent opacity-80 z-10"></div>

      {/* Interactive floating elements */}
      <FloatingElements />

      {/* 3D Scene */}
      <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
        <MetaverseHeroScene />
      </motion.div>

      {/* Content */}
      <div className="container relative mx-auto px-4 z-20 h-screen flex flex-col justify-center items-center">
        <div ref={textRef} className="mb-8 text-center">
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
            <div className="bg-primary/80 backdrop-blur-md px-6 py-2 rounded-lg">
              <h3 className="text-2xl md:text-3xl font-futuristic text-white">
                THEME:{" "}
                <span className="text-neon font-bold animate-glow">
                  METAVERSE
                </span>
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
            <span className="absolute -inset-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-accent to-neon blur-md"></span>
          </motion.button>

          {/* <motion.button
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
          </motion.button> */}
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

export default Hero;
