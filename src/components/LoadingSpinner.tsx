import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  color = "neon",
}) => {
  // Size mapping
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  // Color mapping
  const colorMap = {
    neon: "border-t-neon border-r-accent border-b-neon border-l-accent",
    accent: "border-t-accent border-r-neon border-b-accent border-l-neon",
    white: "border-t-white border-r-gray-300 border-b-white border-l-gray-300",
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`relative ${sizeMap[size]}`}>
        <div
          className={`absolute inset-0 border-4 ${
            colorMap[color as keyof typeof colorMap]
          } rounded-full animate-spin`}
        ></div>
        <div
          className={`absolute inset-2 border-4 border-t-accent border-r-neon border-b-accent border-l-neon rounded-full animate-spin-reverse`}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-neon font-cyber text-xs">LOADING</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
