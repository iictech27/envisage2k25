import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../styles/ThemeProvider";
import * as utils from "../styles/utils";
import { logOutUser } from "../api/handlers";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../features/userSlice";
import { RootState } from "../store";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const theme = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  const logoutUser = async () => {
    const success = await logOutUser();

    if (success) {
      dispatch(clearUser());
      alert("Logged out successfully");
      closeMenu(); // Close mobile menu after logout
    } else {
      alert("Couldn't log out. Try again later!");
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/events", label: "Events" },
    { path: "/team", label: "Team" },
    { path: "/partner", label: "Partner" },
  ];

  const scrolledHeaderStyle = {
    ...utils.glassEffect("medium", "md"),
    borderBottom: `1px solid ${theme.colors.border.light}`,
    boxShadow: theme.shadows.lg,
  };

  return (
    <div className="relative">
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
              {navItems.map((item) => (
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

          {user && (
            <button
              onClick={logoutUser}
              className="cyber-button cursor-pointer hover:scale-105 active:scale-95 transition-transform hidden md:block"
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
              Logout
            </button>
          )}

          {!user && (
            <div className="hidden md:flex space-x-4 items-center">
              <NavLink
                to="/login"
                className="font-cyber text-sm uppercase tracking-wider text-white hover:text-neon transition-colors duration-300"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
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
                Sign Up
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

                {/* Add Logout button to mobile menu when user is logged in */}
                {user && (
                  <li>
                    <button
                      onClick={logoutUser}
                      className="block w-full text-left py-3 px-2 font-cyber text-lg border-b border-border-light text-white"
                    >
                      Logout
                    </button>
                  </li>
                )}

                {/* Add Login and Signup buttons to mobile menu when user is not logged in */}
                {!user && (
                  <>
                    <li>
                      <NavLink
                        to="/login"
                        onClick={closeMenu}
                        className="block py-3 px-2 font-cyber text-lg border-b border-border-light text-white"
                      >
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/signup"
                        onClick={closeMenu}
                        className="block py-3 px-2 font-cyber text-lg border-b border-border-light text-white"
                      >
                        Sign Up
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
