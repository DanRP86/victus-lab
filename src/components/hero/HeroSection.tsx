'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <motion.div
      key="hero"
      exit={{ opacity: 0, y: -40, filter: 'blur(12px)', transition: { duration: 0.8 } }}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '3.5rem 2rem',
        zIndex: 40,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {/* 1. Badge superior: hace que el diseño empiece arriba */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-md"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse" />
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/60">
          Performance Engine // 2026
        </span>
      </motion.div>

      {/* 2. Centro imponente: Título VICTUS a gran escala */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center my-auto"
      >
        <div className="flex items-center justify-center gap-4 md:gap-6">
          <h1 className="font-display text-7xl sm:text-8xl md:text-9xl lg:text-[9.5rem] tracking-[0.25em] font-light text-white pl-[0.25em] leading-none drop-shadow-[0_0_50px_rgba(255,255,255,0.18)]">
            VICTUS
          </h1>
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.9)] animate-pulse shrink-0" />
        </div>
        <p className="mt-6 md:mt-8 font-mono text-xs sm:text-sm md:text-base uppercase tracking-[0.5em] text-white/50 pl-[0.5em]">
          Digital Performance Laboratory
        </p>
      </motion.div>

      {/* 3. Indicador inferior de scroll */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="flex flex-col items-center gap-3"
      >
        <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-[#38bdf8]/70 to-transparent animate-pulse" />
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40 whitespace-nowrap pl-[0.35em]">
          Scroll or Wheel to Enter
        </span>
      </motion.div>
    </motion.div>
  );
}