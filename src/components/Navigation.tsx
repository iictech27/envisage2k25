import { NavLink } from "react-router-dom";

const Navigation = () => {
  const navItems = [
    { path: "/", label: "Home", id: "home" },
    { path: "/events", label: "Events", id: "events" },
    { path: "/countdown", label: "Countdown", id: "countdown" },
    { path: "/speakers", label: "Speakers", id: "speakers" },
  ];

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
      <div className="flex flex-col space-y-4">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `nav-dot w-3 h-3 rounded-full cursor-pointer ${
                isActive
                  ? "bg-cyan-400 shadow-[0_0_10px_2px_rgba(34,211,238,0.7)]"
                  : "bg-gray-500"
              }`
            }
            title={item.label}
          />
        ))}
      </div>
    </div>
  );
};

export default Navigation;
