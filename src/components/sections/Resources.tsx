"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import resources from "../text/Resources";
import SectionHeading from "./SectionHeading";

const Resources = () => {
  return (
    <section id="resources" className="mb-24 scroll-mt-24">
      <SectionHeading title="Resources" />

      <div className="group/list">
        {resources.map((resource, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="group/item relative mb-10 grid pb-1 transition-opacity sm:grid-cols-12 sm:gap-6 lg:group-hover/list:opacity-50 lg:hover:!opacity-100">
            {/* Hover highlight */}
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-xl transition lg:-inset-x-6 lg:block lg:group-hover/item:bg-white/5 lg:group-hover/item:shadow-sm" />

            {/* Stretched link — makes the whole card clickable */}
            {resource.link && (
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${resource.title} — ${resource.source} (opens in a new tab)`}
                className="absolute -inset-x-4 -inset-y-4 z-20 rounded-xl lg:-inset-x-6"
              />
            )}

            {/* Image */}
            <div className="relative z-10 mb-3 sm:col-span-4 sm:mb-0 sm:mt-1">
              {resource.image && (
                <div className="aspect-video overflow-hidden rounded-lg border border-white/10 bg-white/5">
                  <Image
                    src={resource.image}
                    alt={resource.title}
                    width={300}
                    height={180}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="relative z-10 sm:col-span-8">
              <h3 className="font-medium leading-snug">
                <span className="inline-flex items-baseline gap-1 text-accent transition-colors group-hover/item:text-white">
                  <span>
                    {resource.title} · {resource.source}
                  </span>
                  {resource.link && (
                    <ArrowUpRight className="h-4 w-4 shrink-0 translate-y-0.5 transition-transform group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5" />
                  )}
                </span>
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {resource.description}
              </p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {resource.tags.map((tag) => (
                  <li key={tag}>
                    <Badge className="rounded-full border-none bg-accent/10 font-medium text-accent hover:bg-accent/20">
                      {tag}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Resources;
