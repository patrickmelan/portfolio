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
        className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-full px-8 py-4 shadow-lg">
        <div className="flex items-center space-x-8">
          {/* Logo/Name */}
          <motion.button
            className="hover:cursor-pointer flex items-center space-x-3"
            onClick={() => scrollToSection("hero")}>
            <span className="text-slate-900 font-semibold text-sm">
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
                    ? "text-brand"
                    : "text-slate-500 hover:text-brand"
                }`}>
                {item.name}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand rounded-full"
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
