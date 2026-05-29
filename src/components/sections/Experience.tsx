import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import experiences from "../text/Experience";

const Experience = () => {
  const [activeExperience, setActiveExperience] = useState(0);

  const getExperienceIcon = (type: string) => {
    switch (type) {
      case "Freelance":
        return Briefcase;
      case "Education":
        return GraduationCap;
      case "Internship":
        return Building;
      default:
        return Briefcase;
    }
  };

  return (
    <section id="experience" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-brand mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}>
          Relevant Experience
        </motion.h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Experience Tabs */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>
            {experiences.map((exp, index) => {
              const IconComponent = getExperienceIcon(exp.type);
              return (
                <motion.button
                  key={index}
                  onClick={() => setActiveExperience(index)}
                  className={`hover:cursor-pointer w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                    activeExperience === index
                      ? "bg-brand/10 border-brand text-brand"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:border-brand"
                  }`}>
                  <div className="flex items-center space-x-3">
                    <IconComponent className="w-5 h-5" />
                    <div>
                      <h3 className="font-semibold">{exp.title}</h3>
                      <p className="text-sm opacity-75">{exp.company}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Experience Details */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExperience}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold text-slate-900">
                        {experiences[activeExperience].title}
                      </h3>
                      <Badge
                        variant="outline"
                        className="border-brand text-brand">
                        {experiences[activeExperience].type}
                      </Badge>
                    </div>
                    <p className="text-lg text-brand font-semibold">
                      {experiences[activeExperience].company}
                    </p>
                    <p className="text-slate-500 font-mono">
                      {experiences[activeExperience].period}
                    </p>
                  </div>

                  <p className="text-slate-700 leading-relaxed">
                    {experiences[activeExperience].description}
                  </p>

                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-3">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {experiences[activeExperience].achievements.map(
                        (achievement, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-center space-x-2 text-slate-700">
                            <span className="text-brand mt-1">•</span>
                            <span className="pt-1">{achievement}</span>
                          </motion.li>
                        ),
                      )}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-3">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experiences[activeExperience].technologies.map(
                        (tech, index) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}>
                            <Badge
                              variant="secondary"
                              className="bg-slate-200 text-slate-700">
                              {tech}
                            </Badge>
                          </motion.div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
