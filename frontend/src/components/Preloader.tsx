import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Preloader.css"; // Import dedicated CSS

// This component shows a cyberpunk preloader for 2 seconds
const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Force the preloader to show for 2 seconds every time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          {/* Grid background */}
          <div className="preloader-grid-bg"></div>

          {/* Cyberpunk logo/text effect */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="preloader-title font-karnivor" data-text="ENVISAGE">
              <span className="text-white">ENVI</span>
              <span className="text-accent">SAGE</span>
            </h1>
            <div className="preloader-divider"></div>
          </motion.div>

          {/* Loading icon/spinner */}
          <div className="preloader-spinner">
            <div className="preloader-spinner-inner"></div>
            <div
              className="preloader-spinner-inner"
              style={{ animationDelay: "-0.5s" }}
            ></div>
            <div
              className="preloader-spinner-inner"
              style={{ animationDelay: "-1s" }}
            ></div>
            <div className="preloader-pulse"></div>
          </div>

          {/* Loading text with glitch effect */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <div className="preloader-loading-text">
              <span
                className="preloader-letter"
                style={{ "--delay": "0s" } as React.CSSProperties}
              >
                L
              </span>
              <span
                className="preloader-letter"
                style={{ "--delay": "0.1s" } as React.CSSProperties}
              >
                O
              </span>
              <span
                className="preloader-letter"
                style={{ "--delay": "0.2s" } as React.CSSProperties}
              >
                A
              </span>
              <span
                className="preloader-letter"
                style={{ "--delay": "0.3s" } as React.CSSProperties}
              >
                D
              </span>
              <span
                className="preloader-letter"
                style={{ "--delay": "0.4s" } as React.CSSProperties}
              >
                I
              </span>
              <span
                className="preloader-letter"
                style={{ "--delay": "0.5s" } as React.CSSProperties}
              >
                N
              </span>
              <span
                className="preloader-letter"
                style={{ "--delay": "0.6s" } as React.CSSProperties}
              >
                G
              </span>
              <span
                className="preloader-letter"
                style={{ "--delay": "0.7s" } as React.CSSProperties}
              >
                .
              </span>
              <span
                className="preloader-letter"
                style={{ "--delay": "0.8s" } as React.CSSProperties}
              >
                .
              </span>
              <span
                className="preloader-letter"
                style={{ "--delay": "0.9s" } as React.CSSProperties}
              >
                .
              </span>
            </div>
          </motion.div>

          {/* Decorative elements */}
          <div className="preloader-corner preloader-corner-tl">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M0,0 L60,0 L60,10 L10,10 L10,60 L0,60 Z"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="preloader-corner preloader-corner-br">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M100,100 L40,100 L40,90 L90,90 L90,40 L100,40 Z"
                fill="none"
                stroke="#7c3aed"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* DNA-like binary data flow lines on the sides */}
          <div className="preloader-data-stream-left"></div>
          <div className="preloader-data-stream-right"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
