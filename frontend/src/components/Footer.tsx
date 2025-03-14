import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    { name: "Twitter", icon: "twitter", url: "#" },
    { name: "Instagram", icon: "instagram", url: "#" },
    { name: "Facebook", icon: "facebook", url: "#" },
    { name: "LinkedIn", icon: "linkedin", url: "#" },
    { name: "YouTube", icon: "youtube", url: "#" },
  ];

  const footerLinks = [
    { title: "About", links: ["About Us", "Team", "Sponsors", "Past Events"] },
    {
      title: "Events",
      links: ["Schedule", "Speakers", "Workshops", "Competitions"],
    },
    {
      title: "Resources",
      links: ["FAQs", "Contact", "Privacy Policy", "Terms of Service"],
    },
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
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-cyber font-bold neon-text mb-2">
                ENVISAGE<span className="text-accent">2025</span>
              </h2>
              <p className="text-gray-300 font-futuristic">
                The ultimate college tech fest exploring the boundless
                possibilities of the metaverse.
              </p>
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
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white hover:bg-accent transition-colors duration-300"
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
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-neon transition-colors duration-300 font-futuristic"
                    >
                      {link}
                    </a>
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
                <span>University Campus, Tech Avenue, Innovation City</span>
              </p>
              <p className="flex items-start text-gray-400">
                <span className="mr-2">📧</span>
                <a
                  href="mailto:info@envisage2025.com"
                  className="hover:text-neon transition-colors duration-300"
                >
                  info@envisage2025.com
                </a>
              </p>
              <p className="flex items-start text-gray-400">
                <span className="mr-2">📱</span>
                <a
                  href="tel:+1234567890"
                  className="hover:text-neon transition-colors duration-300"
                >
                  +123 456 7890
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
