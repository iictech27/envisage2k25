import React, { useEffect, useState } from "react";

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPosition = window.scrollY;
      const progress = (scrollPosition / totalHeight) * 100;
      setScrollProgress(progress);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Initial calculation
    handleScroll();

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="scroll-progress-container">
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Decorative elements */}
      <div className="absolute right-0 top-0 h-full w-4 overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-2 bg-accent opacity-50"></div>
      </div>

      <div className="absolute left-0 top-0 h-full w-4 overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-2 bg-neon opacity-50"></div>
      </div>
    </div>
  );
};

export default ScrollProgress;
