import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/events", label: "Events" },
    { path: "/countdown", label: "Countdown" },
    { path: "/speakers", label: "Speakers" },
    { path: "/team", label: "Team" },
    { path: "/partner", label: "Partner" },
    { path: "/signup", label: "Sign Up" },
    { path: "/login", label: "Login" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary bg-opacity-80 backdrop-blur-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <NavLink to="/" className="text-2xl font-cyber font-bold neon-text">
            ENVISAGE<span className="text-accent">2025</span>
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navItems.slice(0, 6).map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `font-futuristic transition-colors duration-300 ${
                      isActive ? "text-neon" : "text-white hover:text-neon"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:flex space-x-4">
          <NavLink
            to="/login"
            className="font-futuristic text-white hover:text-neon transition-colors duration-300"
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="cyber-button cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          >
            Sign Up
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav
        className={`md:hidden fixed top-16 left-0 w-full bg-primary bg-opacity-90 backdrop-blur-md transition-all duration-300 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col space-y-4 p-4 text-center">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                onClick={() => setIsMenuOpen(false)} // Close menu on click
                className={({ isActive }) =>
                  `block py-2 font-futuristic text-lg transition-colors duration-300 ${
                    isActive ? "text-neon" : "text-white hover:text-neon"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
