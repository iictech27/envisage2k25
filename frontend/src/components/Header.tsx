import { useState, useEffect, useRef, RefObject } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../styles/ThemeProvider";
import { reqAuthUserData, reqServerStatus } from "../api/fetch";
import * as utils from "../styles/utils";

let serverStatus = null;
let authUser = null;
try {
  serverStatus = await reqServerStatus();
  authUser = await reqAuthUserData();
} catch(error) {
  console.error(error);
}

const Header = () => {
  const theme = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // Ref for mobile menu

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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    // Disable scrolling when the menu is open
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"; // Disable body scroll
    } else {
      document.body.style.overflow = "auto"; // Enable body scroll
    }
  }, [isMenuOpen]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/events", label: "Events" },
    { path: "/countdown", label: "Countdown" },
    { path: "/speakers", label: "Speakers" },
    { path: "/team", label: "Team" },
    { path: "/partner", label: "Partner" },
    { path: "/theme-demo", label: "Theme" },
    { path: "/signup", label: "Sign Up" },
    { path: "/login", label: "Login" },
  ];

  // Glass effect style for the header when scrolled
  const scrolledHeaderStyle = {
    ...utils.glassEffect("medium", "md"),
    borderBottom: `1px solid ${theme.colors.border.light}`,
    boxShadow: theme.shadows.lg,
  };


  return (
    <div className="relative">
      {/* Header */}
      <header
        style={scrolled ? scrolledHeaderStyle : {}}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          scrolled
            ? "py-2"
            : "py-4 bg-gradient-to-b from-primary-dark to-transparent"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <NavLink
              to="/"
              className="text-2xl font-cyber font-bold"
              style={utils.neonTextEffect(theme.colors.neon.main, "md")}
            >
              ENVISAGE<span className="text-accent">2025</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.slice(0, 7).map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `font-cyber text-sm uppercase tracking-wider transition-all duration-300 relative px-2 py-1 ${
                        isActive ? "text-neon" : "text-white hover:text-neon"
                      }`
                    }
                    style={({ isActive }) =>
                      isActive
                        ? {
                            textShadow: theme.shadows.neon.sm,
                            borderBottom: `2px solid ${theme.colors.neon.main}`,
                            boxShadow: `0 4px 6px -6px ${theme.colors.neon.main}`,
                          }
                        : {}
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {(serverStatus == null) && (
            <div className="hidden md:flex space-x-4 items-center">
              <NavLink
                to="/"
                className="cyber-button cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                style={{
                  ...utils.neonBorderEffect(theme.colors.neon.main, "sm"),
                  backgroundColor: theme.colors.dark.purple,
                  padding: `${theme.spacing["2"]} ${theme.spacing["4"]}`,
                  borderRadius: theme.borders.radius.md,
                  fontFamily: theme.typography.fontFamily.cyber,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Soon...
              </NavLink>
            </div>
          )}

          {(authUser != null) && (
            <div className="hidden md:flex space-x-4 items-center">
              <NavLink
                to="/"
                className="cyber-button cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                style={{
                  ...utils.neonBorderEffect(theme.colors.neon.main, "sm"),
                  backgroundColor: theme.colors.dark.purple,
                  padding: `${theme.spacing["2"]} ${theme.spacing["4"]}`,
                  borderRadius: theme.borders.radius.md,
                  fontFamily: theme.typography.fontFamily.cyber,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Profile
              </NavLink>
            </div>
          )}

          {(serverStatus != null && authUser == null) && (
            <div className="hidden md:flex space-x-4 items-center">
              <NavLink
                to="/login"
                className="cyber-button cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                style={{
                  ...utils.neonBorderEffect(theme.colors.neon.main, "sm"),
                  backgroundColor: theme.colors.dark.purple,
                  padding: `${theme.spacing["2"]} ${theme.spacing["4"]}`,
                  borderRadius: theme.borders.radius.md,
                  fontFamily: theme.typography.fontFamily.cyber,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Login
              </NavLink>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none p-2 rounded-full relative z-[110]"
              aria-label="Toggle Menu"
              style={
                isMenuOpen
                  ? {
                      backgroundColor: theme.colors.accent.dark,
                      boxShadow: theme.shadows.neon.sm,
                    }
                  : {}
              }
            >
              {isMenuOpen ? (
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Simple Full Screen Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 bg-primary z-[95] flex flex-col"
          style={{
            backgroundColor: theme.colors.primary.main,
          }}
        >
          <div className="flex justify-between items-center p-4 border-b border-border-light">
            {/* <div className="text-xl font-cyber text-white">Menu</div> */}
            <button
              onClick={closeMenu}
              className="text-white p-2"
              aria-label="Close Menu"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6">
            <nav>
              <ul className="space-y-4 px-4">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <NavLink
                      to={item.path}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `block py-3 px-2 font-cyber text-lg border-b border-border-light ${
                          isActive ? "text-neon" : "text-white"
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
        </div>
      )}
    </div>
  );
};

export default Header;
