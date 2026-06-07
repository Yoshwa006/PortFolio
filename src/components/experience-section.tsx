"use client";

import { motion } from "framer-motion";

const roles = [
  {
    title: "Software Engineer",
    company: "NectarIT Technologies",
    period: "May 2026 – Present",
    location: "India",
    points: [
      "Core backend engineer developing an IoT-integrated CAFM platform using Java, Spring Boot, PostgreSQL, Kafka and Docker",
      "Designed centralized RBAC and access-control systems across multiple enterprise modules",
      "Played a key role in migrating large-scale enterprise data from Neo4j to PostgreSQL",
      "Built scalable REST APIs and worked on distributed backend architecture using Kafka and cloud-native technologies",
    ],
  },
  {
    title: "Backend Software Engineer Intern",
    company: "NectarIT Technologies",
    period: "Oct 2025 – Apr 2026",
    location: "India",
    points: [
      "Developed backend APIs and enterprise modules using Spring Boot and PostgreSQL",
      "Contributed to access-control implementation, API optimization and PostgreSQL migration initiatives",
    ],
  },
  {
    title: "Web Development Intern",
    company: "NXTLOGIC",
    period: "May 2025 – Jul 2025",
    location: "India",
    points: [
      "Developed and deployed full-stack web applications using Spring Boot, React.js and MySQL",
      "Designed REST APIs and integrated frontend-backend workflows",
    ],
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export function ExperienceSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold">
        <span className="gradient-text">Experience</span>
      </h2>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="space-y-6"
      >
        {roles.map((role) => (
          <motion.div
            key={`${role.company}-${role.title}`}
            variants={item}
            className="border-l-2 border-zinc-700 pl-5 space-y-2 hover:border-blue-500/50 transition-colors hover:bg-white/[0.02] rounded-r-lg py-1"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-0">
              <div>
                <h3 className="font-semibold">{role.title}</h3>
                <p className="text-sm text-blue-400">{role.company}</p>
              </div>
              <div className="sm:text-right text-xs text-zinc-500">
                <p>{role.period}</p>
                <p>{role.location}</p>
              </div>
            </div>
            <ul className="space-y-1.5">
              {role.points.map((point, i) => (
                <li key={i} className="text-sm text-zinc-400 leading-relaxed flex gap-2">
                  <span className="text-zinc-600 mt-1.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
