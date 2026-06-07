"use client";

import { motion } from "framer-motion";

interface TechItem {
  name: string;
  icon: string;
}

const techStack: TechItem[] = [
  { name: "Java", icon: "/skills/java.svg" },
  { name: "Spring Boot", icon: "/skills/spring.svg" },
  { name: "JavaScript", icon: "/skills/javascript.svg" },
  { name: "React.js", icon: "/skills/react.svg" },
  { name: "PostgreSQL", icon: "/skills/postgresql.svg" },
  { name: "MySQL", icon: "/skills/mysql.svg" },
  { name: "MongoDB", icon: "/skills/mongodb.svg" },
  { name: "Kafka", icon: "/skills/kafka.svg" },
  { name: "Redis", icon: "/skills/redis.svg" },
  { name: "Docker", icon: "/skills/docker.svg" },
  { name: "AWS EC2", icon: "/skills/aws.svg" },
  { name: "AWS S3", icon: "/skills/amazons3.svg" },
  { name: "APISIX", icon: "/skills/apisix.svg" },
  { name: "Linux", icon: "/skills/linux.svg" },
  { name: "Git", icon: "/skills/git.svg" },
  { name: "Maven", icon: "/skills/maven.svg" },
  { name: "Neo4j", icon: "/skills/neo4j.svg" },
  { name: "Solr", icon: "/skills/apachesolr.svg" },
  { name: "HTML", icon: "/skills/html5.svg" },
  { name: "CSS", icon: "/skills/css3.svg" },
  { name: "SQL", icon: "/skills/postgresql.svg" },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export function TechStack() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold">
          <span className="gradient-text">Tech Stack</span>
        </h2>
        <p className="text-sm text-zinc-500 mt-1">
          the tools and technologies I work with
        </p>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-3"
      >
        {techStack.map((tech) => (
          <motion.div
            key={tech.name}
            variants={item}
            whileHover={{ y: -4, scale: 1.05 }}
            className="tech-icon cursor-default"
          >
            <img src={tech.icon} alt={tech.name} className="w-8 h-8 lg:w-10 lg:h-10" />
            <span>{tech.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
