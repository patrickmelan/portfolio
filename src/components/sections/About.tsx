"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const About = () => {
  return (
    <section id="about" className="mb-24 scroll-mt-24">
      <SectionHeading title="About" />

      <motion.div
        className="space-y-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}>
        <p className="leading-relaxed text-slate-300">
          Hello! My name is Patrick Melan, and I&apos;m a sophomore at Drexel
          University in the process of obtaining my B.S. in Software Engineering
          with a minor in Finance. I enjoy building full-stack web apps and
          useful data tools &amp; dashboards, mostly in TypeScript and Python.
          My stack usually involves Next.js, Python, and some combination of AWS
          services, but I&apos;m always pushing myself to learn new
          technologies.
        </p>

        <p className="leading-relaxed text-slate-300">
          Outside of code, basketball takes up a lot of my time. I&apos;m a PIAA
          basketball official, officiating varsity games throughout the Lehigh
          Valley and Philadelphia, and a student manager for the Drexel
          Women&apos;s Basketball team.
        </p>

        <p className="leading-relaxed text-slate-300">
          Over the last few months, I&apos;ve been spending most of my coding
          time on building GovToKnow, a government technology platform, learning
          the fundamentals of building RAG (Retrieval-Augmented Generation)
          applications, and exploring the world of AI and LLMs at a deeper
          level. I&apos;ve also been working on a larger personal project,
          RefChat (unreleased), which is another RAG application, built on NBA
          and NCAA basketball rulebooks, allowing users, such as fans and
          officials, to interact with the rules in a simpler, more readable way.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
