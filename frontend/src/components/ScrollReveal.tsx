import  { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  effect?:
    | "fade-up"
    | "fade-down"
    | "fade-left"
    | "fade-right"
    | "zoom-in"
    | "zoom-out"
    | "glitch-in"
    | "cyber-reveal"
    | "split";
  threshold?: number;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const ScrollReveal = ({
  children,
  effect = "fade-up",
  threshold = 0.05,
  delay = 0,
  duration = 800,
  className = "",
  once = true,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const observedRef = useRef<boolean>(false);

  useEffect(() => {
    const currentRef = ref.current;

    if (!currentRef) return;

    // Set CSS variables for animation control
    currentRef.style.setProperty("--delay", `${delay}ms`);
    currentRef.style.setProperty("--duration", `${duration}ms`);

    // Add initial hidden class
    currentRef.classList.add("scroll-hidden", `scroll-${effect}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Add a class to the body when animations are active
          if (entry.isIntersecting) {
            document.body.classList.add("scroll-animation-active");

            // Add visible class with a small delay to ensure the transition works
            setTimeout(() => {
              currentRef.classList.add("scroll-visible");
              currentRef.classList.remove("scroll-hidden");
            }, 50);

            // Remove the body class after animation completes
            setTimeout(() => {
              document.body.classList.remove("scroll-animation-active");
            }, duration + delay + 100);

            // Unobserve if once is true
            if (once) {
              observer.unobserve(currentRef);
              observedRef.current = true;
            }
          } else if (!once && !observedRef.current) {
            // If element leaves viewport and once is false, hide it again
            currentRef.classList.remove("scroll-visible");
            currentRef.classList.add("scroll-hidden");
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: "0px 0px -10% 0px", // Trigger earlier when scrolling down
      },
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [effect, threshold, delay, duration, once]);

  return (
    <div ref={ref} className={`scroll-reveal ${className}`}>
      {children}
    </div>
  );
};

export default ScrollReveal;
