import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  Text3D,
  Float,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";

// Define types for component props
interface MetaCubeProps {
  position: [number, number, number];
  color: string;
  speed?: number;
  rotationFactor?: number;
}

// Floating cube component
const MetaCube = ({
  position,
  color,
  speed = 1,
  rotationFactor = 0.01,
}: MetaCubeProps) => {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += rotationFactor;
      mesh.current.rotation.y += rotationFactor * 1.5;
      mesh.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.2;
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </mesh>
  );
};

// Define types for FloatingText props
interface FloatingTextProps {
  text: string;
  position: [number, number, number];
  color: string;
  size?: number;
}

// Floating text component
const FloatingText = ({
  text,
  position,
  color,
  size = 0.5,
}: FloatingTextProps) => {
  const textRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y =
        position[1] + Math.sin(clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text3D
        ref={textRef}
        position={position}
        font="/fonts/Orbitron_Bold.json"
        size={size}
        height={0.1}
        curveSegments={12}
      >
        {text}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </Text3D>
    </Float>
  );
};

// Grid floor component
const GridFloor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[50, 50, 50, 50]} />
      <meshStandardMaterial
        color="#1e293b"
        wireframe
        emissive="#22d3ee"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

// Main scene component
const MetaverseScene = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Create a font loader to preload the font
    const loader = new THREE.FileLoader();
    loader.load("/fonts/Orbitron_Bold.json", () => {
      console.log("Font loaded");
    });

    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="w-full h-screen">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#7c3aed" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#22d3ee"
        />

        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <GridFloor />

        <group>
          <FloatingText
            text="ENVISAGE"
            position={[0, 2, 0]}
            color="#7c3aed"
            size={1}
          />
          <FloatingText
            text="METAVERSE"
            position={[0, 0.5, 0]}
            color="#22d3ee"
            size={0.7}
          />

          <MetaCube position={[-4, 0, -2]} color="#7c3aed" speed={1.2} />
          <MetaCube position={[4, 0, -2]} color="#22d3ee" speed={1.5} />
          <MetaCube
            position={[-2, -1, -1]}
            color="#10b981"
            speed={0.8}
            rotationFactor={0.02}
          />
          <MetaCube
            position={[2, -1, -1]}
            color="#4c1d95"
            speed={1}
            rotationFactor={0.015}
          />
        </group>

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default MetaverseScene;
