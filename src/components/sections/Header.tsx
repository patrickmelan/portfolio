"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const TITLES = ["Student, Founder, and Engineer"];

const SOCIALS = [
  { icon: Github, href: "https://github.com/patrickmelan", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/patrick-melan-723488244",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:patrick@patrickmelan.com", label: "Email" },
];

const Header = () => {
  const [title, setTitle] = useState(TITLES[0]);

  useEffect(() => {
    setTitle(TITLES[Math.floor(Math.random() * TITLES.length)]);
  }, []);

  return (
    <motion.header
      className="mb-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}>
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Patrick <span className="text-accent">Melan</span>
      </h1>
      <p className="mt-3 font-mono text-xl text-slate-400">{title}</p>

      <p className="mt-6 max-w-xl leading-relaxed text-slate-300">
        Software engineering student at Drexel, building full-stack web apps and
        machine learning tools with TypeScript, Python, and AWS.
      </p>

      {/* Socials — hidden on desktop where the side rail shows them */}
      <ul className="mt-8 flex items-center space-x-6 lg:hidden">
        {SOCIALS.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-slate-400 transition-colors duration-200 hover:text-accent">
              <social.icon className="h-6 w-6" />
            </a>
          </li>
        ))}
      </ul>
    </motion.header>
  );
};

export default Header;
