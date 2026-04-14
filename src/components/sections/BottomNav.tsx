"use client";

import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="py-8 px-6 border-t border-slate-800"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-slate-400">
          {new Date().getFullYear()}. Built by Patrick Melan.
        </p>
        <p className="text-slate-400 mt-1">
          <a
            href="https://www.linkedin.com/in/patrick-melan-723488244"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-200 transition-colors"
          >
            LinkedIn
          </a>
          {" · "}
          <a
            href="https://github.com/patrickmelan"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-200 transition-colors"
          >
            GitHub
          </a>
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
