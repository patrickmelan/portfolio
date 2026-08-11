"use client";

import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="border-t border-white/10 pt-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}>
      <div className="text-center">
        <p className="text-slate-400 mt-1">
          <a
            href="https://www.linkedin.com/in/patrick-melan"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-white transition-colors">
            LinkedIn
          </a>
          {" · "}
          <a
            href="https://github.com/patrickmelan"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-white transition-colors">
            GitHub
          </a>
          {" · "}
          <a
            href="mailto:patrick@patrickmelan.com"
            className="underline underline-offset-4 hover:text-white transition-colors">
            patrick@patrickmelan.com
          </a>
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
