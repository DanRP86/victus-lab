'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <motion.div
      key="hero"
      exit={{ opacity: 0, y: -50, filter: 'blur(10px)', transition: { duration: 0.8 } }}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
      style={{ perspective: '1400px' }}
    >
      <motion.div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <h1 className="font-display text-6xl md:text-[8rem] tracking-[0.3em] font-light text-white opacity-90 drop-shadow-2xl">
            VICTUS
          </h1>
          <div className="w-3 h-3 rounded-full bg-[#38bdf8] opacity-80 shadow-[0_0_15px_rgba(56,189,248,0.8)] animate-pulse" />
        </div>
        <p className="text-micro text-white/50 tracking-[0.4em]">Digital Performance Laboratory</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-16 flex flex-col items-center gap-3"
      >
        <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-[#38bdf8]/50 to-transparent animate-pulse" />
        <span className="text-micro text-white/40 tracking-widest">Scroll to Enter</span>
      </motion.div>
    </motion.div>
  );
}
