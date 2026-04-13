import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import Image from "next/image";

const Hero = () => {
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
              className="text-cyan-400 text-lg font-mono"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}>
              Hello, I&apos;m
            </motion.p>
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}>
              Patrick{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Melan
              </span>
            </motion.h1>
            <motion.p
              className="text-2xl md:text-3xl text-slate-400 font-mono"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}>
              Developer. Future Founder.
            </motion.p>
          </div>

          <motion.p
            className="text-lg text-slate-300 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}>
            Software engineering student at Drexel, building full-stack web
            apps and machine learning tools with TypeScript, Python, and AWS.
          </motion.p>

          {/*<motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => scrollToSection("projects")}
                className="hover:cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25"
              >
                See My Work
              </Button>
            </motion.div>
          </motion.div>*/}

          <motion.div
            className="flex space-x-6 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}>
            {[
              { icon: Github, href: "https://github.com/patrickmelan" },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/patrick-melan-723488244",
              },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className="text-slate-400 hover:text-cyan-400 transition-colors duration-200"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
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
              className="absolute z-0 inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-2xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="relative bg-slate-800 rounded-2xl p-2 border border-slate-700"
              whileHover={{ scale: 1.02, rotate: 0.25 }}
              transition={{ duration: 0.3 }}>
              <Image
                src="/graduation.jpg"
                alt="Patrick Melan"
                width={1600}
                height={1000}
                quality={100}
                className="rounded-xl z-10 object-cover"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-slate-300 text-center mt-5 text-sm relative z-20">
              2025 Graduation Speech.{" "}
              <a
                className="text-cyan-400 z-20 underline underline-offset-2 relative"
                target="_blank"
                href="https://www.youtube.com/live/3x6TwxvPOz8?si=1f2ieuPSBopu_sMW&t=3045">
                Click here to view
              </a>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
