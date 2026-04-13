import { motion } from "framer-motion";
import { MapPin, Code, Mail, GraduationCap } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-cyan-400 mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}>
          About Me
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>
            <p className="text-lg text-slate-300 leading-relaxed">
              Hello! I&apos;m Patrick Melan, a freshman at Drexel University
              studying Software Engineering. I build full-stack web apps and
              data-driven tools, mostly in TypeScript and Python. My stack
              usually involves Next.js, PostgreSQL, and some combination of AWS
              services — though I&apos;m always picking up new things.
            </p>

            <p className="text-lg text-slate-300 leading-relaxed">
              Outside of code, basketball takes up a lot of my time — I&apos;ve
              played it, officiated it as a PIAA official, and now I&apos;m a
              student manager for the Drexel Women&apos;s Basketball Team,
              traveling with the team to away games. It&apos;s been a great way
              to stay connected to the game while building real relationships
              with coaches and athletes.
            </p>

            <p className="text-lg text-slate-300 leading-relaxed">
              Right now I&apos;m focused on getting deeper into machine learning
              — I recently shipped an XGBoost bracket predictor with Monte Carlo
              simulations and live odds comparison. Next up: my first SaaS
              product. More on that soon.
            </p>

            <motion.div
              className="grid grid-cols-2 gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}>
              {[
                { icon: MapPin, text: "Eastern PA" },
                { icon: GraduationCap, text: "Software Engineering Major" },
                { icon: Code, text: "Python, TypeScript, AWS" },
                { icon: Mail, text: "Building full-stack apps" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-2 text-slate-300"
                  whileHover={{ scale: 1.05, x: 5 }}
                  transition={{ duration: 0.2 }}>
                  <item.icon className="w-5 h-5 text-cyan-400" />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-3xl"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
              <motion.div
                className="relative bg-slate-800/50 rounded-2xl p-8 backdrop-blur-sm border border-slate-700"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-cyan-400">
                    <Code className="w-5 h-5" />
                    <span className="font-mono text-sm">
                      Currently coding...
                    </span>
                  </div>
                  <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
                    <div className="text-cyan-400">const me = {"{"}</div>
                    <div className="ml-4 text-slate-300">
                      name:{" "}
                      <span className="text-green-400">
                        &quot;Patrick Melan&quot;
                      </span>
                      ,
                    </div>
                    <div className="ml-4 text-slate-300">
                      stack:{" "}
                      <span className="text-yellow-400">
                        [&quot;Next.js&quot;, &quot;Python&quot;,
                        &quot;PostgreSQL&quot;, &quot;Docker&quot;]
                      </span>
                      ,
                    </div>
                    <div className="ml-4 text-slate-300">
                      focus:{" "}
                      <span className="text-green-400">
                        &quot;Full-stack + ML&quot;
                      </span>
                    </div>
                    <div className="text-cyan-400">{"}"}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
