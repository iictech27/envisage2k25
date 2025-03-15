import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Ref for mobile menu
  const menuOptionsRef = useRef(null); // Ref for menu options

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Disable scrolling when the menu is open
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"; // Disable body scroll
    } else {
      document.body.style.overflow = "auto"; // Enable body scroll
    }
  }, [isMenuOpen]);

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) && 
        menuOptionsRef.current && !menuOptionsRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <div className="relative">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-primary bg-opacity-80 py-2" : "bg-transparent py-4"
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
              aria-label="Toggle Menu"
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
      </header>

      {/* Mobile Navigation */}
      <nav
        ref={menuRef}  // Ref for the entire menu
        className={`md:hidden fixed top-0 right-0 w-1/2 h-screen bg-transparent backdrop-blur-md transition-transform duration-500 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } z-50 py-4 px-6`}
      >
        {/* Menu background with blur */}
        <ul
          ref={menuOptionsRef}  // Ref for the menu options
          className="flex flex-col space-y-4 text-center"
        >
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
    </div>
  );
};

export default Header;