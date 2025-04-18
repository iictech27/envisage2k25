import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NeonHero3D from "../components/NeonHero3D";
import FeaturedEvents from "../components/FeaturedEvents";
import Countdown from "./CountdownPage";
// import SpeakersPage from "./SpeakersPage";

const HomePage = () => {
  const navigate = useNavigate();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      if (mobile) {
        document.documentElement.style.setProperty(
          "--animation-speed-multiplier",
          "0.5"
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
          "1"
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
        {/* <SpeakersPage /> */}
        {/* <AnimatedSection animation={fadeInUp}>
          <SpeakersPage />
        </AnimatedSection> */}
      </div>
    </section>
  );
};

export default HomePage;
