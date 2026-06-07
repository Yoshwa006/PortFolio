"use client";

import { motion } from "framer-motion";
import { ChessGame } from "@/components/games/chess";
import { SnakeGame } from "@/components/games/snake";
import { AnimatedSection } from "@/components/animated-section";

export function GamesSection() {
  return (
    <section className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          Games
        </h2>
        <p className="text-zinc-500 text-sm">
          Built with React · no server, no BS
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-900/50 rounded-xl border border-zinc-800 overflow-hidden"
        >
          <ChessGame compact />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900/50 rounded-xl border border-zinc-800 overflow-hidden"
        >
          <SnakeGame compact />
        </motion.div>
      </div>
    </section>
  );
}
