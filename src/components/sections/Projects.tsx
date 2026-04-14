import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import projects from "../text/Projects";

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-cyan-400 mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Projects
        </motion.h2>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden"
            >
              <div className="grid md:grid-cols-5 gap-0">
                {/* Image */}
                {project.image && (
                  <div className="md:col-span-2 flex items-center justify-center p-8 bg-slate-600/40">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="object-contain max-h-52"
                    />
                  </div>
                )}

                {/* Content */}
                <div className={`${project.image ? "md:col-span-3" : "md:col-span-5"} p-8 space-y-4`}>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-bold text-white">
                      {project.title}
                    </h3>
                    <Badge
                      variant="outline"
                      className="border-cyan-500 text-cyan-400 shrink-0"
                    >
                      {project.category}
                    </Badge>
                  </div>

                  <p className="text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-slate-700 text-slate-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {project.demo && (
                    <div className="pt-2">
                      <motion.a
                        href={project.demo}
                        {...(project.demo.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        View Project <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
