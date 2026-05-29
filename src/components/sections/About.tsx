import { motion } from "framer-motion";
import { MapPin, Code, Mail, GraduationCap } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-brand mb-16 text-center"
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
            <p className="text-lg text-slate-700 leading-relaxed">
              Hello! I&apos;m Patrick Melan, a sophomore at Drexel University
              studying software engineering. I enjoy building full-stack web
              apps and useful data tools & dashboards, mostly in TypeScript and
              Python. My stack usually involves Next.js, Python, and some
              combination of AWS services, but I&apos;m always trying to learn
              new tech.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed">
              Outside of code, basketball takes up a lot of my time. I am a PIAA
              basketball official, officating varsity games throughout the
              Lehigh Valley and Philadelphia, and also a student manager for the
              Drexel Women&apos;s Basketball team, doing things from traveling
              with the team to away games to helping record statistics at
              practice.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed">
              Recently, I have been spending most of my coding/research time on
              machine learning, learning the funamentals of building and
              training models using different statistical models such as linear
              regression, decision trees, and neural networks. While I would
              consider myself at a basic-intermediate proficiency, I plan on
              continuing my learning and understanding throughout this summer.
            </p>

            <motion.div
              className="grid grid-cols-2 gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}>
              {[
                { icon: MapPin, text: "Philadelphia, PA" },
                { icon: GraduationCap, text: "Software Engineering Major" },
                { icon: Code, text: "Python, TypeScript, AWS" },
                { icon: Mail, text: "Building full-stack apps" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-2 text-slate-700">
                  <item.icon className="w-5 h-5 text-brand" />
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
                className="absolute inset-0 bg-gradient-to-r from-brand/20 to-brand-dark/20 rounded-2xl blur-3xl"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
              <motion.div className="relative bg-white rounded-2xl p-8 backdrop-blur-sm border border-slate-200">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-brand">
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
                        [&quot;Python&quot;, &quot;TypeScript&quot;,
                        &quot;AWS&quot;]
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
