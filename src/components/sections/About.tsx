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
              passionate about business, data science, and software development.
              I have a strong foundation in languages such as TypeScript and
              Python, but I&apos;m always trying to learn more and better my
              skills. For example, this past summer, I gained a great amount of
              experience working with AWS products such as S3, DynamoDB, and
              Athena while developing an app for a company (shown below).
            </p>

            <p className="text-lg text-slate-300 leading-relaxed">
              In my time outside of school, I enjoy building web apps and
              exploring new technologies, but that&apos;s not my life 24/7. I am
              a big sports guy, but basketball is my biggest passion. I have
              played it, officiated it, watched it, and, most recently, become a
              student manager for the Drexel Women&apos;s Basketball Team, which
              has been an amazing experience so far.
            </p>

            <p className="text-lg text-slate-300 leading-relaxed">
              As I am writing this, I have a couple of goals for the near
              future. I want to increase my knowledge of Python and Machine
              Learning so I can build a predictive model passion project.
              Additionally, I plan on finishing my first SaaS, TBA soon, and
              releasing it to the public.
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
                      skills:{" "}
                      <span className="text-yellow-400">
                        [&quot;Python&quot;, &quot;TypeScript&quot;,
                        &quot;AWS&quot;]
                      </span>
                      ,
                    </div>
                    <div className="ml-4 text-slate-300">
                      passion:{" "}
                      <span className="text-green-400">
                        &quot;Building cool things&quot;
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
