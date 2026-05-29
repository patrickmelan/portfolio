"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const TITLES = [
  "Programmer.",
  "Full-Stack Developer.",
  "ML Enthusiast.",
  "Programmer & Student.",
  "Founder.",
];

const Hero = () => {
  const [title, setTitle] = useState(TITLES[0]);

  useEffect(() => {
    setTitle(TITLES[Math.floor(Math.random() * TITLES.length)]);
  }, []);
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 pt-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}>
          <div className="space-y-4">
            <motion.p
              className="text-brand text-lg font-mono"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}>
              Hello, I&apos;m
            </motion.p>
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}>
              Patrick{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-dark">
                Melan
              </span>
            </motion.h1>
            <motion.p
              className="text-2xl md:text-3xl text-slate-500 font-mono"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}>
              {title}
            </motion.p>
          </div>

          <motion.p
            className="text-lg text-slate-600 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}>
            Software engineering student at Drexel, building full-stack web apps
            and machine learning tools with TypeScript, Python, and AWS.
          </motion.p>

          <motion.div
            className="flex space-x-6 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}>
            {[
              { icon: Github, href: "https://github.com/patrickmelan" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/patrick-melan-723488244" },
              { icon: Mail, href: "mailto:patrick@patrickmelan.com" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className="text-slate-400 hover:text-brand transition-colors duration-200 cursor-pointer"
                target="_blank">
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}>
          <div className="relative">
            <motion.div
              className="absolute z-0 inset-0 bg-gradient-to-r from-brand/20 to-brand-dark/20 rounded-2xl blur-2xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <div className="relative bg-white rounded-2xl p-2 border border-slate-200">
              <Image
                src="/graduation.jpg"
                alt="Patrick Melan"
                width={1600}
                height={1000}
                quality={100}
                loading="eager"
                className="rounded-xl z-10 object-cover"
              />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-slate-500 text-center mt-5 text-sm relative z-20">
              2025 Graduation Speech |{" "}
              <a
                className="text-brand z-20 underline underline-offset-2 relative hover:text-brand transition-colors duration-200"
                target="_blank"
                href="https://www.youtube.com/live/3x6TwxvPOz8?si=1f2ieuPSBopu_sMW&t=3045">
                Click here to watch
              </a>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
