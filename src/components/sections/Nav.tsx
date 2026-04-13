import { motion } from "framer-motion";

const Navbar = ({
  activeSection,
}: {
  activeSection: string;
  setActiveSection: (section: string) => void;
}) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center">
      <motion.div
        className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-full px-8 py-4 shadow-2xl"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}>
        <div className="flex items-center space-x-8">
          {/* Logo/Name */}
          <motion.button
            className="hover:cursor-pointer flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            onClick={() => scrollToSection("hero")}>
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center transform rotate-45">
              <span className="text-slate-900 font-bold text-xs transform -rotate-45">
                PM
              </span>
            </div>
            <span className="text-white font-semibold text-sm">
              Patrick Melan
            </span>
          </motion.button>
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {[
              { name: "About Me", id: "about" },
              { name: "Experience", id: "experience" },
              { name: "Projects", id: "projects" },
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`hover:cursor-pointer text-sm font-medium transition-colors duration-200 relative ${
                  activeSection === item.id
                    ? "text-cyan-400"
                    : "text-slate-300 hover:text-cyan-400"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                {item.name}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400 rounded-full"
                    layoutId="activeIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
