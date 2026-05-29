import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import projects from "../text/Projects";

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-brand mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}>
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col bg-white rounded-2xl border border-slate-200 hover:border-brand transition-all duration-300 overflow-hidden">

              {/* Image */}
              {project.image && (
                <div className="flex items-center justify-center h-44 bg-slate-100 px-6">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={300}
                    height={180}
                    className="object-contain max-h-32"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {project.title}
                  </h3>
                  <Badge
                    variant="outline"
                    className="border-brand text-brand shrink-0 text-xs">
                    {project.category}
                  </Badge>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed line-clamp-4 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-slate-200 text-slate-700 text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {project.demo && (
                  <div className="pt-2">
                    <motion.a
                      href={project.demo}
                      {...(project.demo.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-flex items-center gap-1.5 text-brand hover:text-brand text-sm font-medium transition-colors">
                      View Project <ExternalLink className="w-3.5 h-3.5" />
                    </motion.a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
