import { useRef, useEffect } from "react";
import * as THREE from "three";

interface CyberpunkBackground3DProps {
  variant?: "grid" | "particles" | "hexagons" | "circles";
  intensity?: number;
  color1?: string;
  color2?: string;
  interactive?: boolean;
}

const CyberpunkBackground3D = ({
  variant = "grid",
  intensity = 1,
  color1 = "#22d3ee", // neon cyan
  color2 = "#7c3aed", // accent purple
  interactive = true,
}: CyberpunkBackground3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const timeRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Handle mouse movement for interactive effects
    const handleMouseMove = (event: MouseEvent) => {
      if (!interactive) return;

      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current)
        return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();

      rendererRef.current.setSize(width, height);
    };

    // Create background elements based on variant
    switch (variant) {
      case "grid":
        createGridBackground(scene, color1, color2, intensity);
        break;
      case "particles":
        createParticlesBackground(scene, color1, color2, intensity);
        break;
      case "hexagons":
        createHexagonsBackground(scene, color1, color2, intensity);
        break;
      case "circles":
        createCirclesBackground(scene, color1, color2, intensity);
        break;
      default:
        createGridBackground(scene, color1, color2, intensity);
    }

    // Animation loop
    const animate = () => {
      timeRef.current += 0.01;

      if (sceneRef.current && cameraRef.current && rendererRef.current) {
        // Apply interactive camera movement if enabled
        if (interactive) {
          cameraRef.current.position.x +=
            (mouseRef.current.x * 0.5 - cameraRef.current.position.x) * 0.05;
          cameraRef.current.position.y +=
            (mouseRef.current.y * 0.5 - cameraRef.current.position.y) * 0.05;
          cameraRef.current.lookAt(0, 0, 0);
        }

        // Animate objects in the scene
        animateObjects(sceneRef.current, timeRef.current, variant);

        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      frameIdRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }

      if (
        rendererRef.current &&
        rendererRef.current.domElement &&
        containerRef.current
      ) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [variant, intensity, color1, color2, interactive]);

  // Create a grid background
  const createGridBackground = (
    scene: THREE.Scene,
    color1: string,
    color2: string,
    intensity: number,
  ) => {
    const gridSize = 20;
    const gridDivisions = 20;

    // Create horizontal grid lines
    for (
      let i = -gridSize / 2;
      i <= gridSize / 2;
      i += gridSize / gridDivisions
    ) {
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-gridSize / 2, i, 0),
        new THREE.Vector3(gridSize / 2, i, 0),
      ]);

      const lineMaterial = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? color1 : color2,
        transparent: true,
        opacity: 0.3 * intensity,
      });

      const line = new THREE.Line(lineGeometry, lineMaterial);
      line.userData = { type: "gridLine", initialY: i };
      scene.add(line);
    }

    // Create vertical grid lines
    for (
      let i = -gridSize / 2;
      i <= gridSize / 2;
      i += gridSize / gridDivisions
    ) {
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i, -gridSize / 2, 0),
        new THREE.Vector3(i, gridSize / 2, 0),
      ]);

      const lineMaterial = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? color2 : color1,
        transparent: true,
        opacity: 0.3 * intensity,
      });

      const line = new THREE.Line(lineGeometry, lineMaterial);
      line.userData = { type: "gridLine", initialX: i };
      scene.add(line);
    }

    // Add some floating cubes for depth
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 0.3 + 0.1;
      const geometry = new THREE.BoxGeometry(size, size, size);
      const material = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? color1 : color2,
        transparent: true,
        opacity: 0.2 * intensity,
        wireframe: true,
      });

      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(
        (Math.random() - 0.5) * gridSize,
        (Math.random() - 0.5) * gridSize,
        (Math.random() - 0.5) * 5 - 2,
      );

      cube.userData = {
        type: "floatingCube",
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01,
        },
        floatSpeed: Math.random() * 0.005 + 0.001,
        floatOffset: Math.random() * Math.PI * 2,
      };

      scene.add(cube);
    }
  };

  // Create a particles background
  const createParticlesBackground = (
    scene: THREE.Scene,
    color1: string,
    color2: string,
    intensity: number,
  ) => {
    const particleCount = 500 * intensity;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const color1Obj = new THREE.Color(color1);
    const color2Obj = new THREE.Color(color2);

    for (let i = 0; i < particleCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 20; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5; // z

      // Color
      const mixFactor = Math.random();
      const particleColor = new THREE.Color().lerpColors(
        color1Obj,
        color2Obj,
        mixFactor,
      );

      colors[i * 3] = particleColor.r;
      colors[i * 3 + 1] = particleColor.g;
      colors[i * 3 + 2] = particleColor.b;

      // Size
      sizes[i] = Math.random() * 0.1 + 0.05;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.7 * intensity,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    particles.userData = { type: "particles" };
    scene.add(particles);
  };

  // Create a hexagons background
  const createHexagonsBackground = (
    scene: THREE.Scene,
    color1: string,
    color2: string,
    intensity: number,
  ) => {
    const hexCount = 30 * intensity;

    for (let i = 0; i < hexCount; i++) {
      const hexShape = new THREE.Shape();
      const size = Math.random() * 0.5 + 0.3;
      const segments = 6;

      // Create hexagon shape
      for (let j = 0; j < segments; j++) {
        const angle = (j / segments) * Math.PI * 2;
        const x = Math.cos(angle) * size;
        const y = Math.sin(angle) * size;

        if (j === 0) {
          hexShape.moveTo(x, y);
        } else {
          hexShape.lineTo(x, y);
        }
      }

      hexShape.closePath();

      const geometry = new THREE.ShapeGeometry(hexShape);
      const material = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? color1 : color2,
        transparent: true,
        opacity: (Math.random() * 0.2 + 0.1) * intensity,
        wireframe: Math.random() > 0.7,
        side: THREE.DoubleSide,
      });

      const hex = new THREE.Mesh(geometry, material);

      hex.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 8 - 3,
      );

      hex.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      );

      hex.userData = {
        type: "hexagon",
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.005,
          y: (Math.random() - 0.5) * 0.005,
          z: (Math.random() - 0.5) * 0.005,
        },
        floatSpeed: Math.random() * 0.003 + 0.001,
        floatOffset: Math.random() * Math.PI * 2,
      };

      scene.add(hex);
    }
  };

  // Create a circles background
  const createCirclesBackground = (
    scene: THREE.Scene,
    color1: string,
    color2: string,
    intensity: number,
  ) => {
    const circleCount = 25 * intensity;

    for (let i = 0; i < circleCount; i++) {
      const radius = Math.random() * 1 + 0.5;
      const segments = 32;

      const geometry = new THREE.CircleGeometry(radius, segments);
      const material = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? color1 : color2,
        transparent: true,
        opacity: (Math.random() * 0.15 + 0.05) * intensity,
        wireframe: Math.random() > 0.7,
        side: THREE.DoubleSide,
      });

      const circle = new THREE.Mesh(geometry, material);

      circle.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 3,
      );

      circle.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      );

      circle.userData = {
        type: "circle",
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
        floatSpeed: Math.random() * 0.003 + 0.001,
        floatOffset: Math.random() * Math.PI * 2,
      };

      scene.add(circle);
    }

    // Add some connecting lines for a network effect
    for (let i = 0; i < 30; i++) {
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10 - 3,
        ),
        new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10 - 3,
        ),
      ]);

      const lineMaterial = new THREE.LineBasicMaterial({
        color: Math.random() > 0.5 ? color1 : color2,
        transparent: true,
        opacity: (Math.random() * 0.2 + 0.1) * intensity,
      });

      const line = new THREE.Line(lineGeometry, lineMaterial);
      line.userData = { type: "networkLine" };
      scene.add(line);
    }
  };

  // Animate objects in the scene
  const animateObjects = (
    scene: THREE.Scene,
    time: number,
    variant: string,
  ) => {
    scene.traverse((object) => {
      if (!object.userData) return;

      switch (object.userData.type) {
        case "gridLine":
          // Pulse effect for grid lines
          if (object.userData.initialY !== undefined) {
            const line = object as THREE.Line;
            const material = line.material as THREE.LineBasicMaterial;
            material.opacity =
              (0.2 + Math.sin(time + object.userData.initialY) * 0.1) *
              intensity;
          } else if (object.userData.initialX !== undefined) {
            const line = object as THREE.Line;
            const material = line.material as THREE.LineBasicMaterial;
            material.opacity =
              (0.2 + Math.sin(time + object.userData.initialX) * 0.1) *
              intensity;
          }
          break;

        case "floatingCube":
          // Rotate and float cubes
          object.rotation.x += object.userData.rotationSpeed.x;
          object.rotation.y += object.userData.rotationSpeed.y;
          object.rotation.z += object.userData.rotationSpeed.z;
          object.position.y +=
            Math.sin(time + object.userData.floatOffset) *
            object.userData.floatSpeed;
          break;

        case "particles":
          // Swirl particles
          const particles = object as THREE.Points;
          const positions = particles.geometry.attributes.position
            .array as Float32Array;

          for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            const z = positions[i + 2];

            const angle = time * 0.1;
            const radius = Math.sqrt(x * x + y * y);

            positions[i] = Math.cos(angle + radius * 0.2) * radius;
            positions[i + 1] = Math.sin(angle + radius * 0.2) * radius;
            positions[i + 2] = z + Math.sin(time + radius) * 0.05;
          }

          particles.geometry.attributes.position.needsUpdate = true;
          break;

        case "hexagon":
          // Rotate and float hexagons
          object.rotation.x += object.userData.rotationSpeed.x;
          object.rotation.y += object.userData.rotationSpeed.y;
          object.rotation.z += object.userData.rotationSpeed.z;
          object.position.y +=
            Math.sin(time + object.userData.floatOffset) *
            object.userData.floatSpeed;
          break;

        case "circle":
          // Pulse and float circles
          const circle = object as THREE.Mesh;
          const material = circle.material as THREE.MeshBasicMaterial;
          material.opacity =
            (0.1 +
              Math.sin(
                time * object.userData.pulseSpeed + object.userData.pulseOffset,
              ) *
                0.05) *
            intensity;
          object.position.y +=
            Math.sin(time + object.userData.floatOffset) *
            object.userData.floatSpeed;
          break;

        case "networkLine":
          // Pulse network lines
          const line = object as THREE.Line;
          const lineMaterial = line.material as THREE.LineBasicMaterial;
          lineMaterial.opacity =
            (0.1 + Math.sin(time * 0.5) * 0.05) * intensity;
          break;
      }
    });
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default CyberpunkBackground3D;
