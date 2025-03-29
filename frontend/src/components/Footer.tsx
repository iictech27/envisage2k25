import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";




const Footer = () => {
  const socialLinks = [
    { name: "Twitter", icon: "twitter", url: "https://x.com/iictmsl" },
    { name: "Instagram", icon: "instagram", url: "https://www.instagram.com/iictmsl/" },
    { name: "Facebook", icon: "facebook", url: "https://www.facebook.com/iictmsl" },
    { name: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/company/iictmsl/posts/?feedView=all" },
    { name: "YouTube", icon: "youtube", url: "https://youtube.com/@iictmsl6826?si=h9IRg9fs48fh2gK2" },
  ];

  const footerLinks = [
    { title: "About", links: [
      { name: "About Us", path: "/about" },
      { name: "Team", path: "/team" },
      { name: "Sponsors", path: "/sponsors" },
      { name: "Past Events", path: "/past-events" }
    ]},
    { title: "Events", links: [
      { name: "Schedule", path: "/schedule" },
      { name: "Speakers", path: "/speakers" },
      { name: "Workshops", path: "/workshops" },
      { name: "Competitions", path: "/competitions" }
    ]},
    { title: "Resources", links: [
      { name: "FAQs", path: "/faqs" },
      { name: "Contact", path: "/contact" },
      { name: "Privacy Policy", path: "/privacy-policy" },
      { name: "Terms of Service", path: "/terms" }
    ]}
  ];
  

  return (
    <footer className="bg-primary pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 grid-background opacity-10"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 metaverse-gradient"></div>
      <div className="absolute top-1/4 right-10 w-32 h-32 bg-darkPurple rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-darkCyan rounded-full filter blur-3xl opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
            <motion.div
              className="mb-6 flex items-center space-x-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Logo with Neon Effect */}
              <img
                src={logo}
                alt="Envisage Logo"
                 className="h-10 w-10 object-contain transition-all duration-100 "
                style={{
                  filter: `drop-shadow(0px 0px 4px #00FFFF) drop-shadow(0px 0px 8px #00FFFF)`,
                }}
                
              />

              <h2 className="text-2xl font-cyber font-bold neon-text mb-2">
                ENVISAGE<span className="text-accent">2025</span>
              </h2>
            </motion.div>

            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                   className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white transition-all duration-300
                 hover:text-white hover:filter hover:drop-shadow-[0_0_6px_white] hover:drop-shadow-[0_0_12px_white]"
                  aria-label={social.name}
                >
                  <i className={`fab fa-${social.icon}`}></i>
                </a>
              ))}
            </motion.div>
          </div>

          {footerLinks.map((column, columnIndex) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * columnIndex }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-cyber text-white mb-4">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                <li li key={link.path}>
                  <Link
                    to={link.path}
                      className="text-gray-400 hover:text-white transition-all duration-300 font-futuristic 
                                hover:[text-shadow:0_0_10px_white]"
      >
                        {link.name}
                    </Link>
                </li>
                  ))}
              </ul>

            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-cyber text-white mb-4">Contact Us</h3>
            <div className="space-y-4 font-futuristic">
              <p className="flex items-start text-gray-400">
                <span className="mr-2">📍</span>
                <span>4, TECHNO INDIA, 1, Eastern Metropolitan Bypass, EM Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091</span>
              </p>
              <p className="flex items-start text-gray-400">
                <span className="mr-2">📧</span>
                <a
                  href="mailto:iic.tmsl@gmail.com"
                  className="hover:text-neon transition-colors duration-300"
                >
                  iic.tmsl@gmail.com
                </a>
              </p>
              <p className="flex items-start text-gray-400">
                <span className="mr-2">📱</span>
                <a
                  href="tel:+91 73526 27157"
                  className="hover:text-neon transition-colors duration-300"
                >
                  +91 73526 27157
                </a>
              </p>
            </div>
          </motion.div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 font-futuristic text-sm">
            &copy; {new Date().getFullYear()} Envisage 2025. All rights
            reserved. Designed with 💜 for the metaverse.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
