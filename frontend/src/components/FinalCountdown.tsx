import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HackathonCountdown({
  isCountdownOn = false,
  onComplete = () => {},
}) {
  const [count, setCount] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Custom text for final countdown numbers
  const getDisplayText = (num: number) => {
    switch (num) {
      case 3:
        return "HACK";
      case 2:
        return "UR";
      case 1:
        return "WAY";
      case 0:
        return "00";
      default:
        return num;
    }
  };

  // Watch for the external trigger
  useEffect(() => {
    if (isCountdownOn && !isRunning && !isComplete) {
      setCount(10);
      setIsRunning(true);
      setIsComplete(false);
    }
  }, [isComplete, isCountdownOn, isRunning]);

  // Handle the countdown
  useEffect(() => {
    if (isRunning && count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isRunning && count === 0) {
      setIsRunning(false);
      setIsComplete(true);
      onComplete(); // Call the completion callback
    }
  }, [count, isRunning, onComplete]);

  // Don't render anything if countdown hasn't started
  if (!isCountdownOn && !isRunning && !isComplete) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-blue-400 font-mono fixed inset-0 z-50">
      {/* Overlay with scanlines */}
      <div
        className="fixed inset-0 bg-black opacity-50 z-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(transparent, transparent 2px, rgba(0, 0, 0, 0.8) 2px, rgba(0, 0, 0, 0.8) 4px)",
        }}
      ></div>

      {/* Main countdown container */}
      <div className="relative z-10">
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse"></div>

        <AnimatePresence mode="wait">
          <motion.div
            key={count}
            initial={{ scale: 1.5, opacity: 0, filter: "blur(20px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="relative flex flex-col items-center">
              {/* Main display text - dynamic size based on content */}
              <motion.div
                className={`font-black tracking-tighter bg-clip-text text-transparent py-8 ${
                  count <= 3 ? "text-8xl md:text-9xl" : "text-[15rem]"
                }`}
                style={{
                  background:
                    "linear-gradient(180deg, #4ff0ff 0%, #00a3ff 50%, #0051ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow:
                    "0 0 20px rgba(56, 182, 255, 0.8), 0 0 40px rgba(36, 99, 235, 0.6)",
                }}
                animate={{
                  textShadow: [
                    "0 0 20px rgba(56, 182, 255, 0.8), 0 0 40px rgba(36, 99, 235, 0.6)",
                    "0 0 30px rgba(56, 182, 255, 1), 0 0 70px rgba(36, 99, 235, 0.8)",
                    "0 0 20px rgba(56, 182, 255, 0.8), 0 0 40px rgba(36, 99, 235, 0.6)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isComplete ? "UNLEASHED" : getDisplayText(count)}
              </motion.div>

              {/* Completion text */}
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold text-cyan-300 tracking-widest"
                  style={{ textShadow: "0 0 10px #00d9ff, 0 0 20px #00d9ff" }}
                >
                  PROBLEM STATEMENTS REVEALED
                </motion.div>
              )}

              {/* Horizontal glitch lines */}
              <motion.div
                className="absolute top-1/2 left-0 w-full h-2 bg-cyan-400 opacity-70"
                style={{ boxShadow: "0 0 20px 5px rgba(6, 182, 212, 0.7)" }}
                animate={{
                  y: [-5, 15, -20, 0],
                  opacity: [0.7, 0.5, 0.9, 0.7],
                  scaleX: [1, 1.1, 0.95, 1],
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              ></motion.div>

              <motion.div
                className="absolute top-1/3 left-0 w-full h-1 bg-blue-500 opacity-50"
                style={{ boxShadow: "0 0 15px 3px rgba(59, 130, 246, 0.6)" }}
                animate={{
                  y: [10, -10, 16, 0],
                  opacity: [0.5, 0.3, 0.7, 0.5],
                  scaleX: [1, 0.9, 1.05, 1],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
              ></motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating tech elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-30"
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0,
            }}
            animate={{
              top: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5 + Math.random() * 10,
              repeatType: "loop",
            }}
          >
            <span className="text-xs text-blue-400 font-mono">
              {
                ["</>", "{ }", "#", "&&", "||", "API", "ML", "AI", "VR", "IoT"][
                  Math.floor(Math.random() * 10)
                ]
              }
            </span>
          </motion.div>
        ))}
      </div>

      {/* Background grid for cyberpunk effect */}
      <div
        className="fixed inset-0 bg-black z-[-1]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(0, 162, 255, 0.15) 1px, transparent 1px), linear-gradient(rgba(0, 98, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px, 40px 40px",
        }}
      ></div>
    </div>
  );
}
