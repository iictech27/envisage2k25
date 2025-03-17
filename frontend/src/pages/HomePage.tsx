import { useState, useEffect, ReactNode, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, Variants, useInView } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";
import NeonHero3D from "../components/NeonHero3D";
import FeaturedEvents from "../components/FeaturedEvents";
import Countdown from "./CountdownPage";
import SpeakersPage from "./SpeakersPage";
import AnimatedHeading, { AnimationStyle } from "../components/AnimatedHeading";

// Animation variants for different sections
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const slideIn: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const scaleIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Section component with animations
interface AnimatedSectionProps {
  children: ReactNode;
  animation: Variants;
  className?: string;
}

const AnimatedSection = ({
  children,
  animation,
  className = "",
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      variants={animation}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        document.documentElement.style.setProperty(
          "--animation-speed-multiplier",
          "0.5",
        );
        document.body.classList.add("mobile-optimized");
        const scrollHandler = () => {
          if (!window.requestAnimationFrame) return;
          let scrolling = false;
          if (!scrolling) {
            window.requestAnimationFrame(() => {
              scrolling = false;
            });
            scrolling = true;
          }
        };
        window.addEventListener("scroll", scrollHandler, { passive: true });
        return () => {
          window.removeEventListener("scroll", scrollHandler);
          document.body.classList.remove("mobile-optimized");
        };
      } else {
        document.documentElement.style.setProperty(
          "--animation-speed-multiplier",
          "1",
        );
        document.body.classList.remove("mobile-optimized");
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 2000);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
      document.body.classList.remove("mobile-optimized");
      clearTimeout(timer);
    };
  }, []);

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <section className="homepage-container">
      {/* <motion.div
        className="will-change-transform"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        // transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <NeonHero3D onRegisterClick={handleRegisterClick} />
      </motion.div> */}
      <NeonHero3D onRegisterClick={handleRegisterClick} />

      <div
        className={`transition-opacity duration-500 ${
          isInitialLoad ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* <AnimatedSection animation={slideIn} className="mb-12">
          <FeaturedEvents />
        </AnimatedSection>

        <AnimatedSection animation={scaleIn} className="mb-12">
          <Countdown />
        </AnimatedSection> */}
        <FeaturedEvents />
        <Countdown />
        <SpeakersPage />
        {/* <AnimatedSection animation={fadeInUp}>
          <SpeakersPage />
        </AnimatedSection> */}
      </div>
    </section>
  );
};

export default HomePage;
