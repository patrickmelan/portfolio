"use client";

import { motion } from "framer-motion";

/**
 * Scoreboard-style section heading: a monospace index number, the title, and a
 * hardwood-accent rule that stretches to fill the row.
 */
const SectionHeading = ({ title }: { title: string }) => {
  return (
    <motion.div
      className="mb-8 flex items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}>
      <h2 className="text-2xl font-bold uppercase tracking-widest text-white">
        {title}
      </h2>
      <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
    </motion.div>
  );
};

export default SectionHeading;
