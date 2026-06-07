"use client";

import { motion } from "framer-motion";

export default function BlogsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 py-12 space-y-8"
    >
      <h1 className="text-3xl md:text-4xl font-bold">Blogs</h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-zinc-500"
      >
        Coming soon...
      </motion.p>
    </motion.div>
  );
}
