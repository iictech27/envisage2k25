import {  ReactNode } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Animation style types
export type AnimationStyle =
  | "character-fade"
  | "character-slide"
  | "word-blur"
  | "word-stagger"
  | "split-reveal"
  | "glitch"
  | "typewriter"
  | "wave"
  | "bounce"
  | "flip"
  | "neon-pulse";

interface AnimatedHeadingProps {
  text: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  animation: AnimationStyle;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  color?: string;
  highlightWords?: string[];
  highlightColor?: string;
  children?: ReactNode;
  colorWords?: string[]; // Array of colors to apply to each word in sequence
}

const AnimatedHeading = ({
  text,
  tag = "h2",
  animation = "character-fade",
  className = "",
  delay = 0,
  duration = 0.7,
  once = false,
  threshold = 0.1,
  color = "",
  highlightWords = [],
  highlightColor = "#22d3ee",
  children,
  colorWords = [], // Default to empty array
}: AnimatedHeadingProps) => {
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold,
  });

  // Character animation variants
  const characterFadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay + i * 0.05,
        duration,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  };

  // Character slide animation variants
  const characterSlideVariants = {
    hidden: { opacity: 0, y: 50, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        delay: delay + i * 0.04,
        duration: duration * 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  };

  // Word blur animation variants
  const wordBlurVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: delay + i * 0.1,
        duration,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  };

  // Word stagger animation variants
  const wordStaggerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: delay,
        staggerChildren: 0.1,
      },
    },
  };

  const wordStaggerItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration * 0.8,
        ease: "easeOut",
      },
    },
  };

  // Split reveal animation variants
  const splitRevealVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "100%",
      opacity: 1,
      transition: {
        delay,
        duration: duration * 1.2,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  // Glitch animation variants
  const glitchVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        duration: duration * 0.5,
      },
    },
  };

  // Typewriter animation variants
  const typewriterVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        delay,
        duration: duration * 2,
        ease: "easeInOut",
      },
    },
  };

  // Wave animation variants
  const waveVariants = {
    hidden: { y: 0 },
    visible: (i: number) => ({
      y: [0, -15, 0],
      transition: {
        delay: delay + i * 0.05,
        duration: duration * 0.8,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        repeat: 0,
      },
    }),
  };

  // Bounce animation variants
  const bounceVariants = {
    hidden: { scale: 0 },
    visible: (i: number) => ({
      scale: [0, 1.2, 1],
      transition: {
        delay: delay + i * 0.05,
        duration: duration * 0.7,
        ease: "easeOut",
        times: [0, 0.7, 1],
      },
    }),
  };

  // Flip animation variants
  const flipVariants = {
    hidden: { opacity: 0, rotateX: 90 },
    visible: (i: number) => ({
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: delay + i * 0.07,
        duration: duration * 0.8,
        ease: "easeOut",
      },
    }),
  };

  // Neon pulse animation variants
  const neonPulseVariants = {
    hidden: { opacity: 0, textShadow: "0 0 0px rgba(34, 211, 238, 0)" },
    visible: (i: number) => ({
      opacity: 1,
      textShadow: [
        "0 0 5px rgba(34, 211, 238, 0.7)",
        "0 0 20px rgba(34, 211, 238, 0.9), 0 0 30px rgba(34, 211, 238, 0.7)",
        "0 0 5px rgba(34, 211, 238, 0.7)",
      ],
      transition: {
        delay: delay + i * 0.04,
        duration: duration * 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse" as const,
        times: [0, 0.5, 1],
      },
    }),
  };

  // Check if a word should be highlighted
  const shouldHighlight = (word: string) => {
    return highlightWords.includes(word.toLowerCase().replace(/[^\w\s]/g, ""));
  };

  // Get color for a specific word based on its index
  const getWordColor = (word: string, index: number) => {
    // If the word should be highlighted, use highlightColor
    if (shouldHighlight(word)) {
      return highlightColor;
    }

    // If colorWords array is provided and has a color for this index, use it
    if (colorWords.length > 0 && index < colorWords.length) {
      return colorWords[index];
    }

    // Otherwise, use the default color
    return color;
  };

  // Render based on animation type
  const renderAnimatedText = () => {
    // Split text into words for word-based animations
    const words = text.split(" ");

    switch (animation) {
      case "character-fade":
        return (
          <div ref={ref} className={`inline-block ${className}`}>
            {words.length > 1 && colorWords.length > 0
              ? // If we have multiple words and colorWords is provided, apply colors to words
                words.map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    style={{ display: "inline-block", marginRight: "0.25rem" }}
                  >
                    {word.split("").map((char, charIndex) => (
                      <motion.span
                        key={`${wordIndex}-${charIndex}`}
                        custom={charIndex + wordIndex * 10} // Offset to create fade effect across words
                        variants={characterFadeVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        style={{
                          display: "inline-block",
                          color: getWordColor(word, wordIndex),
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))
              : // Original character-by-character animation
                text.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={characterFadeVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    style={{
                      display: "inline-block",
                      color: color,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
          </div>
        );

      case "character-slide":
        return (
          <div ref={ref} className={`inline-block ${className}`}>
            {words.length > 1 && colorWords.length > 0
              ? // If we have multiple words and colorWords is provided, apply colors to words
                words.map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    style={{ display: "inline-block", marginRight: "0.25rem" }}
                  >
                    {word.split("").map((char, charIndex) => (
                      <motion.span
                        key={`${wordIndex}-${charIndex}`}
                        custom={charIndex + wordIndex * 10} // Offset to create slide effect across words
                        variants={characterSlideVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        style={{
                          display: "inline-block",
                          color: getWordColor(word, wordIndex),
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))
              : // Original character-by-character animation
                text.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={characterSlideVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    style={{
                      display: "inline-block",
                      color: color,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
          </div>
        );

      case "word-blur":
        return (
          <div ref={ref} className={`inline-flex flex-wrap ${className}`}>
            {words.map((word, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={wordBlurVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                style={{
                  display: "inline-block",
                  marginRight: "0.25rem",
                  color: getWordColor(word, index),
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        );

      case "word-stagger":
        return (
          <motion.div
            ref={ref}
            className={`inline-flex flex-wrap ${className}`}
            variants={wordStaggerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {words.map((word, index) => (
              <motion.span
                key={index}
                variants={wordStaggerItemVariants}
                style={{
                  display: "inline-block",
                  marginRight: "0.25rem",
                  color: getWordColor(word, index),
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        );

      case "split-reveal":
        return (
          <div ref={ref} className={`relative ${className}`}>
            <div className="relative overflow-hidden">
              <motion.div
                variants={splitRevealVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                style={{ color }}
                className="whitespace-nowrap"
              >
                {text}
              </motion.div>
            </div>
            {children}
          </div>
        );

      case "glitch":
        return (
          <motion.div
            ref={ref}
            className={`relative ${className} cyber-glitch-text`}
            variants={glitchVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{ color }}
          >
            {words.length > 1 && colorWords.length > 0 ? (
              // If we have multiple words and colorWords is provided, apply colors to words
              <span className="relative z-10">
                {words.map((word, index) => (
                  <span
                    key={index}
                    style={{
                      color: getWordColor(word, index),
                      marginRight: index < words.length - 1 ? "0.25rem" : 0,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </span>
            ) : (
              // Original glitch animation
              <span className="relative z-10">{text}</span>
            )}
            <span className="absolute top-0 left-0.5 text-accent opacity-70 glitch-1">
              {text}
            </span>
            <span className="absolute top-0 -left-0.5 text-neon opacity-70 glitch-2">
              {text}
            </span>
          </motion.div>
        );

      case "typewriter":
        return (
          <div ref={ref} className={`relative ${className}`}>
            <div className="overflow-hidden whitespace-nowrap">
              <motion.div
                variants={typewriterVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                style={{ color }}
              >
                {words.length > 1 && colorWords.length > 0
                  ? // If we have multiple words and colorWords is provided, apply colors to words
                    words.map((word, index) => (
                      <span
                        key={index}
                        style={{
                          color: getWordColor(word, index),
                          marginRight: index < words.length - 1 ? "0.25rem" : 0,
                        }}
                      >
                        {word}
                      </span>
                    ))
                  : // Original typewriter animation
                    text}
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: delay + 0.2 }}
              className="absolute right-0 top-0 h-full w-[2px] bg-neon typewriter-cursor"
            />
          </div>
        );

      case "wave":
        return (
          <div ref={ref} className={`inline-block ${className}`}>
            {words.length > 1 && colorWords.length > 0
              ? // If we have multiple words and colorWords is provided, apply colors to words
                words.map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    style={{ display: "inline-block", marginRight: "0.25rem" }}
                  >
                    {word.split("").map((char, charIndex) => (
                      <motion.span
                        key={`${wordIndex}-${charIndex}`}
                        custom={charIndex + wordIndex * 10} // Offset to create wave effect across words
                        variants={waveVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        style={{
                          display: "inline-block",
                          color: getWordColor(word, wordIndex),
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))
              : // Original character-by-character animation
                text.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={waveVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    style={{
                      display: "inline-block",
                      color: color,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
          </div>
        );

      case "bounce":
        return (
          <div ref={ref} className={`inline-block ${className}`}>
            {words.length > 1 && colorWords.length > 0
              ? // If we have multiple words and colorWords is provided, apply colors to words
                words.map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    style={{ display: "inline-block", marginRight: "0.25rem" }}
                  >
                    {word.split("").map((char, charIndex) => (
                      <motion.span
                        key={`${wordIndex}-${charIndex}`}
                        custom={charIndex + wordIndex * 10} // Offset to create bounce effect across words
                        variants={bounceVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        style={{
                          display: "inline-block",
                          color: getWordColor(word, wordIndex),
                          transformOrigin: "bottom",
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))
              : // Original character-by-character animation
                text.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={bounceVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    style={{
                      display: "inline-block",
                      color: color,
                      transformOrigin: "bottom",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
          </div>
        );

      case "flip":
        return (
          <div
            ref={ref}
            className={`inline-block ${className}`}
            style={{ perspective: "1000px" }}
          >
            {words.length > 1 && colorWords.length > 0
              ? // If we have multiple words and colorWords is provided, apply colors to words
                words.map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    style={{ display: "inline-block", marginRight: "0.25rem" }}
                  >
                    {word.split("").map((char, charIndex) => (
                      <motion.span
                        key={`${wordIndex}-${charIndex}`}
                        custom={charIndex + wordIndex * 10} // Offset to create flip effect across words
                        variants={flipVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        style={{
                          display: "inline-block",
                          color: getWordColor(word, wordIndex),
                          transformStyle: "preserve-3d",
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))
              : // Original character-by-character animation
                text.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={flipVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    style={{
                      display: "inline-block",
                      color: color,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
          </div>
        );

      case "neon-pulse":
        return (
          <div ref={ref} className={`inline-block ${className}`}>
            {words.length > 1 && colorWords.length > 0
              ? // If we have multiple words and colorWords is provided, apply colors to words
                words.map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    style={{ display: "inline-block", marginRight: "0.25rem" }}
                  >
                    {word.split("").map((char, charIndex) => (
                      <motion.span
                        key={`${wordIndex}-${charIndex}`}
                        custom={charIndex + wordIndex * 10} // Offset to create neon pulse effect across words
                        variants={{
                          hidden: {
                            opacity: 0,
                            textShadow: "0 0 0px rgba(34, 211, 238, 0)",
                          },
                          visible: (i: number) => ({
                            opacity: 1,
                            textShadow: [
                              `0 0 5px ${getWordColor(word, wordIndex)}70`,
                              `0 0 20px ${getWordColor(
                                word,
                                wordIndex,
                              )}90, 0 0 30px ${getWordColor(
                                word,
                                wordIndex,
                              )}70`,
                              `0 0 5px ${getWordColor(word, wordIndex)}70`,
                            ],
                            transition: {
                              delay: delay + i * 0.04,
                              duration: duration * 2,
                              ease: "easeInOut",
                              repeat: Infinity,
                              repeatType: "reverse" as const,
                              times: [0, 0.5, 1],
                            },
                          }),
                        }}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        style={{
                          display: "inline-block",
                          color: getWordColor(word, wordIndex),
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))
              : // Original character-by-character animation
                text.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={neonPulseVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    style={{
                      display: "inline-block",
                      color: color,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
          </div>
        );

      default:
        return <div className={className}>{text}</div>;
    }
  };

  // Render the component with the appropriate HTML tag
  const Tag = tag;
  return <Tag className={`${className}`}>{renderAnimatedText()}</Tag>;
};

export default AnimatedHeading;

// Add these styles to your global CSS or component
export const animatedHeadingStyles = `
  .glitch-1 {
    animation: glitch-anim-1 2s infinite linear alternate;
  }
  
  .glitch-2 {
    animation: glitch-anim-2 3s infinite linear alternate;
  }
  
  .typewriter-cursor {
    animation: blink 1s step-end infinite;
  }
  
  @keyframes blink {
    from, to {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
  
  @keyframes glitch-anim-1 {
    0% {
      clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
      transform: translate3d(3px, 0, 0);
    }
    5% {
      clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
    }
    10% {
      clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
    }
    15% {
      clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
    }
    20% {
      clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
    }
    25% {
      clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
    }
    30% {
      clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
    }
    45% {
      clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
    }
    50% {
      clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
    }
    55% {
      clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
    }
    60% {
      clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
    }
    100% {
      clip-path: polygon(0 90%, 100% 90%, 100% 95%, 0 95%);
      transform: translate3d(-3px, 0, 0);
    }
  }
  
  @keyframes glitch-anim-2 {
    0% {
      clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%);
      transform: translate3d(-3px, 0, 0);
    }
    15% {
      clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%);
    }
    25% {
      clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%);
    }
    35% {
      clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
    }
    45% {
      clip-path: polygon(0 40%, 100% 40%, 100% 40%, 0 40%);
    }
    50% {
      clip-path: polygon(0 52%, 100% 52%, 100% 59%, 0 59%);
    }
    65% {
      clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
    }
    75% {
      clip-path: polygon(0 75%, 100% 75%, 100% 75%, 0 75%);
    }
    80% {
      clip-path: polygon(0 65%, 100% 65%, 100% 40%, 0 40%);
    }
    90% {
      clip-path: polygon(0 45%, 100% 45%, 100% 50%, 0 50%);
    }
    100% {
      clip-path: polygon(0 14%, 100% 14%, 100% 33%, 0 33%);
      transform: translate3d(3px, 0, 0);
    }
  }
`;
