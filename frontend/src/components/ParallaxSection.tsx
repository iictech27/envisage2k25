import React, { useEffect, useRef, useCallback } from "react";

interface ParallaxSectionProps {
  children: React.ReactNode;
  layers?: React.ReactNode[];
  speed?: number[];
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  layers = [],
  speed = [0.2, 0.4, 0.6, 0.8],
  className = "",
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Set up the refs array for each layer
  useEffect(() => {
    layerRefs.current = layerRefs.current.slice(0, layers.length);
  }, [layers.length]);

  // Create a ref callback using useCallback
  const setLayerRef = useCallback(
    (el: HTMLDivElement | null, index: number) => {
      layerRefs.current[index] = el;
    },
    [],
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const windowHeight = window.innerHeight;

      // Calculate how far the section is from the center of the viewport
      const distanceFromCenter =
        sectionTop - windowHeight / 2 + sectionRect.height / 2;

      // Apply parallax effect to each layer
      layerRefs.current.forEach((layer, index) => {
        if (!layer) return;

        // Calculate the transform based on the layer's speed
        const parallaxOffset = distanceFromCenter * speed[index % speed.length];
        layer.style.transform = `translateY(${parallaxOffset}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div
      ref={sectionRef}
      className={`parallax-container relative ${className}`}
    >
      {/* Parallax background layers */}
      {layers.map((layer, index) => (
        <div
          key={`layer-${index}`}
          ref={(el) => setLayerRef(el, index)}
          className={`parallax-layer parallax-layer-${index}`}
        >
          {layer}
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ParallaxSection;
