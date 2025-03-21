import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// 3D Background Component
const Background = () => {
  return (
    <>
      <color attach="background" args={["#0f172a"]} />
      <fog attach="fog" args={["#0f172a", 8, 30]} />

      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22d3ee" />

      {/* Particle system */}
      <Sparkles count={200} scale={20} size={1} speed={0.3} opacity={0.5} color="#22d3ee" />

      {/* Grid plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, -10]}>
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
    </>
  );
};

const AboutPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-primary">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
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
      <div className="container relative mx-auto px-4 py-16 z-20">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="text-white font-rovelink">ABOUT</span>
              <span className="text-accent font-karnivor"> ENVISAGE</span>
            </h1>
            <div className="h-1 w-40 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-6 mb-8"></div>
          </motion.div>

          {/* About Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="bg-primary/60 backdrop-blur-sm border border-accent/30 rounded-lg p-8 hover:shadow-glow transition-all duration-300">
              <h2 className="text-3xl font-bold text-accent mb-6 font-karnivor">EVENT OVERVIEW</h2>
              <p className="text-lg text-gray-300 mb-6">
                Envisage is Techno Management Fest, the flagship event of the Innovation and Entrepreneurship Cell (IIC) of Techno Main Salt Lake. It brings together brilliant minds from various colleges and institutions to showcase their technical and managerial skills.
              </p>
              <p className="text-lg text-gray-300">
                With a vision to create a platform for students to exhibit their talents, Envisage features a diverse range of events from hackathons and coding competitions to business simulations and entrepreneurial challenges.
              </p>
            </div>
          </motion.div>

          {/* Vision Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="bg-primary/60 backdrop-blur-sm border border-accent/30 rounded-lg p-8 hover:shadow-glow transition-all duration-300">
              <h2 className="text-3xl font-bold text-accent mb-6 font-karnivor">OUR VISION</h2>
              <p className="text-lg text-gray-300 mb-6">
                At Envisage, we envision creating an ecosystem that fosters innovation, entrepreneurship, and technological advancement. We aim to bridge the gap between academic knowledge and practical application by providing a platform for students to showcase their ideas and solutions to real-world problems.
              </p>
              <p className="text-lg text-gray-300">
                Through our diverse range of events and competitions, we strive to nurture the next generation of innovators, entrepreneurs, and leaders who will shape the future of technology and business.
              </p>
            </div>
          </motion.div>

          {/* Organization Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="bg-primary/60 backdrop-blur-sm border border-accent/30 rounded-lg p-8 hover:shadow-glow transition-all duration-300">
              <h2 className="text-3xl font-bold text-accent mb-6 font-karnivor">THE ORGANIZATION</h2>
              <p className="text-lg text-gray-300 mb-6">
                Innovation and Entrepreneurship Cell (IIC) of Techno Main Salt Lake is a student-run organization dedicated to fostering the spirit of innovation and entrepreneurship among students. We organize workshops, seminars, and competitions throughout the year to expose students to the latest trends and opportunities in technology and business.
              </p>
              <p className="text-lg text-gray-300">
                Through our flagship event, Envisage, we aim to bring together students, professionals, and industry experts to create a vibrant ecosystem of innovation and collaboration.
              </p>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-primary/60 backdrop-blur-sm border border-accent/30 rounded-lg p-8 text-center hover:shadow-glow transition-all duration-300">
              <h3 className="text-5xl font-bold text-accent mb-2">10+</h3>
              <p className="text-xl text-gray-300">Exciting Events</p>
            </div>
            <div className="bg-primary/60 backdrop-blur-sm border border-accent/30 rounded-lg p-8 text-center hover:shadow-glow transition-all duration-300">
              <h3 className="text-5xl font-bold text-accent mb-2">2000+</h3>
              <p className="text-xl text-gray-300">Participants</p>
            </div>
            <div className="bg-primary/60 backdrop-blur-sm border border-accent/30 rounded-lg p-8 text-center hover:shadow-glow transition-all duration-300">
              <h3 className="text-5xl font-bold text-accent mb-2">50+</h3>
              <p className="text-xl text-gray-300">Colleges</p>
            </div>
          </motion.div>

          {/* Join Us Section */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">BE PART OF THE INNOVATION</h2>
            <a
              href="/register"
              className="cyber-button text-lg px-8 py-3 relative overflow-hidden group z-20 inline-block"
            >
              <span className="relative z-10 font-bold text-white hover:cursor-pointer">
                JOIN US NOW
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
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
    </div>
  );
};

export default AboutPage; 