"use client";

import { motion } from "framer-motion";

const items = [
  {
    title: "Kongunadu Arts and Science College",
    subtitle: "Bachelor of Computer Applications — CGPA: 8.54/10",
    meta: "Graduated Apr 2026 · Tamil Nadu, India",
  },
  {
    title: "LeetCode",
    subtitle: "Solved 450+ problems with a rating of 1700",
    meta: null,
  },
  {
    title: "CodeForces",
    subtitle: "Ranked among Top 24 participants in Coimbatore-level contest rankings",
    meta: null,
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function EducationAchievements() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold">
        <span className="gradient-text">Education & Achievements</span>
      </h2>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="space-y-4"
      >
        {items.map((item) => (
          <motion.div
            key={item.title}
            variants={itemAnim}
            whileHover={{ x: 4 }}
            className="glass-card p-6 space-y-3"
          >
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-zinc-400">{item.subtitle}</p>
            {item.meta && (
              <p className="text-xs text-zinc-500">{item.meta}</p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
