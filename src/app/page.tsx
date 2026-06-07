"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProjectsSection } from "@/components/projects-section";
import { EducationAchievements } from "@/components/education-achievements";
import { ExperienceSection } from "@/components/experience-section";
import { TechStack } from "@/components/tech-stack";
import { ActivityGraph } from "@/components/activity-graph";
import { AnimatedSection } from "@/components/animated-section";

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-16 md:space-y-24">
      <Hero />
      <AnimatedSection>
        <ActivityGraph />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <ExperienceSection />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <ProjectsSection />
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        <EducationAchievements />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <TechStack />
      </AnimatedSection>
      <AnimatedSection delay={0.5}>
        <BookingSection />
      </AnimatedSection>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="space-y-6"
    >
      <motion.div variants={fadeUp} className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-blue-500/30 ring-offset-2 ring-offset-[#0a0a0a]">
          <img
            src="/profile.jpg"
            alt="Yoshwa R"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold"
          >
            <span className="gradient-text">Yoshwa R</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-zinc-400 text-sm"
          >
            Backend Software Engineer
          </motion.p>
          <LocationWidget />
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-4 max-w-2xl">
        <p className="text-zinc-300 leading-relaxed">
          Backend engineer who builds systems that don't fall over. Java, Spring Boot, Kafka, PostgreSQL — I make them dance together. Distributed systems, clean APIs, and automation that actually works.
        </p>
        <motion.div variants={fadeUp} className="flex items-center gap-4 text-sm text-zinc-400">
          <a
            href="https://github.com/yoshwa006"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-zinc-100 transition-colors group"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            github.com/yoshwa006
          </a>
          <a
            href="https://linkedin.com/in/yos"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-zinc-100 transition-colors group"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            linkedin.com/in/yos
          </a>
        </motion.div>
        <motion.p variants={fadeUp} className="text-zinc-500 text-sm">got an idea worth building? let&apos;s chat</motion.p>
        <motion.div variants={fadeUp} className="flex gap-3">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:ryoshwaa@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            Email me
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function LocationWidget() {
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("https://wttr.in/Coimbatore?format=j1")
      .then((r) => r.json())
      .then((data) => {
        const current = data.current_condition[0];
        setWeather(current.weatherDesc[0].value);
        setTemp(current.temp_C + "°C");
      })
      .catch(() => {});
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-zinc-500"
    >
      <span className="flex items-center gap-1">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        {time}
      </span>
      <span className="text-zinc-700">·</span>
      <span className="flex items-center gap-1">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
        {weather} {temp}
      </span>
      <span className="text-zinc-700">·</span>
      <span className="flex items-center gap-1">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        Coimbatore, IN
      </span>
    </motion.div>
  );
}

function BookingSection() {
  return (
    <section className="space-y-6 text-center">
      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Let&apos;s build something together
      </h2>
      <p className="text-zinc-400 max-w-lg mx-auto">
        Have an idea or an opening? Let&apos;s connect and make it happen.
      </p>
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="mailto:ryoshwaa@gmail.com"
        className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shadow-lg shadow-blue-600/20"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            src="/profile.jpg"
            alt="Yoshwa R"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-left">
          <div className="text-sm font-medium">Get in touch</div>
          <div className="text-xs text-blue-200">ryoshwaa@gmail.com</div>
        </div>
      </motion.a>
    </section>
  );
}

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex items-center justify-center gap-4 py-8 text-xs text-zinc-600 border-t border-zinc-800"
    >
      <a href="/sitemap.xml" className="hover:text-zinc-400 transition-colors">Sitemap</a>
      <span>·</span>
      <a href="/rss.xml" className="hover:text-zinc-400 transition-colors">RSS Feed</a>
    </motion.footer>
  );
}
