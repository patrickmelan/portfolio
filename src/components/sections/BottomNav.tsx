"use client";

import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="py-8 px-6 border-t border-slate-200"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-slate-500">
          {new Date().getFullYear()}. Built by Patrick Melan.
        </p>
        <p className="text-slate-500 mt-1">
          <a
            href="https://www.linkedin.com/in/patrick-melan-723488244"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-slate-700 transition-colors"
          >
            LinkedIn
          </a>
          {" · "}
          <a
            href="https://github.com/patrickmelan"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-slate-700 transition-colors"
          >
            GitHub
          </a>
          {" · "}
          <a
            href="mailto:patrick@patrickmelan.com"
            className="underline underline-offset-4 hover:text-slate-700 transition-colors"
          >
            patrick@patrickmelan.com
          </a>
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
