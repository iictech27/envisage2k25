import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  MeshDistortMaterial,
} from "@react-three/drei";

import AnimatedHeading from "./AnimatedHeading";

// Neon colors
// const neonColors = {
//   purple: "#7c3aed",
//   cyan: "#22d3ee",
//   green: "#10b981",
//   pink: "#ec4899",
//   orange: "#f97316",
// };

interface Speaker {
  name: string;
  role: string;
  image: string;
}

interface SpeakersSceneProps {
  speakers: Speaker[];
  activeIndex: number;
}

// interface Speaker3DProps {
//   position: [number, number, number];
//   color: string;
//   name: string;
//   role: string;
//   image: string;
// }

// // 3D Speaker Card component
// const Speaker3D: React.FC<Speaker3DProps> = ({
//   position,
//   color,
//   name,
//   role,
//   image,
// }) => {
//   const meshRef = useRef<THREE.Mesh>(null);

//   useEffect(() => {
//     if (!meshRef.current) return;

//     // Create texture from image
//     const textureLoader = new THREE.TextureLoader();
//     textureLoader.load(image, (texture) => {
//       if (meshRef.current && meshRef.current.material) {
//         // Handle material properly
//         const material = meshRef.current.material as THREE.MeshStandardMaterial;
//         if (material.map !== undefined) {
//           material.map = texture;
//           material.needsUpdate = true;
//         }
//       }
//     });
//   }, [image]);

//   return (
//     <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
//       <group position={position}>
//         {/* Speaker image on a floating card */}
//         <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
//           <boxGeometry args={[2, 3, 0.1]} />
//           <meshStandardMaterial
//             color={color}
//             emissive={color}
//             emissiveIntensity={0.2}
//             roughness={0.3}
//             metalness={0.7}
//           />
//         </mesh>

//         {/* Name text */}
//         <Text3D
//           font="/fonts/Orbitron_Bold.json"
//           position={[-0.9, -1.7, 0.1]}
//           size={0.2}
//           height={0.05}
//           curveSegments={12}
//         >
//           {name}
//           <meshStandardMaterial
//             color="#ffffff"
//             emissive="#ffffff"
//             emissiveIntensity={1}
//           />
//         </Text3D>

//         {/* Role text */}
//         <Text3D
//           font="/fonts/Orbitron_Bold.json"
//           position={[-0.9, -2.1, 0.1]}
//           size={0.15}
//           height={0.05}
//           curveSegments={12}
//         >
//           {role}
//           <meshStandardMaterial
//             color={color}
//             emissive={color}
//             emissiveIntensity={1}
//           />
//         </Text3D>
//       </group>
//     </Float>
//   );
// };

// 3D Scene for speakers
const SpeakersScene: React.FC<SpeakersSceneProps> = () => {
  // const colors = [
  //   neonColors.cyan,
  //   neonColors.purple,
  //   neonColors.green,
  //   neonColors.pink,
  // ];

  return (
    <>
      

      {/* Background sphere */}
      <mesh position={[0, 0, -10]}>
        <sphereGeometry args={[7, 32, 32]} />
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

// Speaker card component
const SpeakerCard = ({
  name,
  role,
  image,
  index,
  isActive,
  onClick,
}: {
  name: string;
  role: string;
  image: string;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer preserve-3d perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-xl">
        <div className="aspect-w-3 aspect-h-4">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute  inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent opacity-80"></div>

        <div className="absolute bg-black inset-x-0 bottom-0 p-4 text-center">
          <h3 className="text-xl font-cyber text-white mb-1 neon-text">
            {name}
          </h3>
          <p className="text-neon font-futuristic text-sm">{role}</p>
        </div>

        <div className="absolute top-4 right-4">
          <div
            className={`w-3 h-3 rounded-full ${
              isActive ? "bg-neon animate-pulse-slow" : "bg-gray-400"
            }`}
          ></div>
        </div>
      </div>

      <div
        className={`absolute -inset-0.5 bg-gradient-to-r from-accent to-neon rounded-xl blur-sm transition-opacity duration-300 ${
          isActive ? "opacity-70" : "opacity-0 group-hover:opacity-50"
        }`}
      ></div>
    </motion.div>
  );
};

// Speakers section component
const Speakers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const speakers = [
    {
      name: "Dr. Maya Patel",
      role: "VR Research Scientist",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Alex Chen",
      role: "Metaverse Architect",
      image:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Sophia Rodriguez",
      role: "Blockchain Developer",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    },
    {
      name: "Jamal Washington",
      role: "AI Ethics Specialist",
      image:
        "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    },
  ];

  return (
    <section
      id="speakers"
      ref={sectionRef}
      className="py-20 relative overflow-hidden min-h-screen"
    >
      <div className="absolute inset-0 bg-primary opacity-90"></div>

      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 opacity-90">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 45 }}>
          <SpeakersScene speakers={speakers} activeIndex={activeIndex} />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatedHeading
            text="FEATURED SPEAKERS"
            animation="wave"
            tag="h2"
            className="text-5xl md:text-5xl font-rovelink font-bold mb-4 neon-text"
            colorWords={["#22d3ee", "#ec4899"]}
            once={false}
            threshold={0.1}
          />

          <div className="w-24 h-1 bg-neon mx-auto mb-6 animate-glow"></div>
          <p className="text-gray-300 max-w-2xl mx-auto font-futuristic">
            Learn from industry leaders and visionaries who are shaping the
            future of the metaverse.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {speakers.map((speaker, index) => (
            <SpeakerCard
              key={index}
              name={speaker.name}
              role={speaker.role}
              image={speaker.image}
              index={index}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button className="cyber-button text-lg px-8 py-3 relative overflow-hidden group animate-glow mt-6">
            <span className="relative z-10">View All Speakers</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-900 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-900 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
    </section>
  );
};

export default Speakers;
