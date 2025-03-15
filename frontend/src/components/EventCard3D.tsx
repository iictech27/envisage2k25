import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface EventCardProps {
  title: string;
  date: string;
  description: string;
  image: string;
  color: string;
  category: string;
}

const EventCard3D: React.FC<EventCardProps> = ({
  title,
  date,
  description,
  image,
  color,
  category,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Calculate rotation based on mouse position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setMousePosition({ x: rotateY, y: rotateX });
  };

  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  // Glowing border effect
  const borderGlow = {
    boxShadow: isHovered
      ? `0 0 20px ${color}80, 0 0 30px ${color}40, inset 0 0 10px ${color}30`
      : `0 0 5px ${color}40, inset 0 0 5px ${color}20`,
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full h-[400px] rounded-xl overflow-hidden perspective-1000 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: mousePosition.y,
        rotateY: mousePosition.x,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.5,
      }}
    >
      {/* Card background with image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
          filter: "brightness(0.5) contrast(1.2)",
          transform: "translateZ(-10px)",
        }}
      />

      {/* Overlay gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"
        style={{ transform: "translateZ(-5px)" }}
      />

      {/* Glowing border */}
      <div
        className="absolute inset-0 rounded-xl border-2 transition-all duration-300"
        style={{
          borderColor: color,
          ...borderGlow,
          transform: "translateZ(5px)",
        }}
      />

      {/* Card content */}
      <div
        className="absolute inset-0 p-6 flex flex-col justify-between"
        style={{ transform: "translateZ(20px)" }}
      >
        <div>
          {/* Category badge */}
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-cyber mb-4"
            style={{
              backgroundColor: `${color}20`,
              color: color,
              border: `1px solid ${color}60`,
              boxShadow: `0 0 10px ${color}40`,
            }}
          >
            {category}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-cyber text-white mb-2">{title}</h3>

          {/* Date */}
          <p className="text-sm font-digital text-gray-300 mb-4">{date}</p>

          {/* Description */}
          <p className="text-gray-300 font-futuristic text-sm line-clamp-3">
            {description}
          </p>
        </div>

        {/* Button */}
        <motion.button
          className="self-start px-4 py-2 rounded-md font-cyber text-sm"
          style={{
            backgroundColor: isHovered ? color : "transparent",
            color: isHovered ? "#0f172a" : color,
            border: `1px solid ${color}`,
            boxShadow: isHovered ? `0 0 15px ${color}60` : "none",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Register Now
        </motion.button>
      </div>

      {/* Floating particles (only visible on hover) */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: "translateZ(15px)" }}
        >
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 5px ${color}, 0 0 10px ${color}`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20 - Math.random() * 30],
                x: [0, (Math.random() - 0.5) * 20],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0.5],
              }}
              transition={{
                duration: 1 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default EventCard3D;
