import { motion } from "framer-motion";

const CyberpunkButton = ({
  isTimeUp,
  handleClick,
}: {
  isTimeUp: boolean;
  handleClick: () => void;
}) => {
  return (
    <motion.button
      className={`w-full cyber-button text-base px-6 py-2 relative overflow-hidden group transition-all duration-300 ${
        !isTimeUp
          ? "opacity-60 grayscale"
          : "animate-enhanced-glow hover:cursor-pointer"
      }`}
      style={{
        background: "linear-gradient(45deg, #ec4899, #f97316)",
        boxShadow: isTimeUp
          ? "0 0 10px rgba(236, 72, 153, 0.5), inset 0 0 10px rgba(236, 72, 153, 0.5)"
          : "0 0 5px rgba(100, 100, 100, 0.3), inset 0 0 5px rgba(100, 100, 100, 0.3)",
      }}
      whileHover={isTimeUp ? { scale: 1.05 } : undefined}
      whileTap={isTimeUp ? { scale: 0.95 } : undefined}
      disabled={!isTimeUp}
      onClick={handleClick}
    >
      <span className="relative z-10">Reveal Problems</span>
      {isTimeUp && (
        <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      )}
    </motion.button>
  );
};

export default CyberpunkButton;
