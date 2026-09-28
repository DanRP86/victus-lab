'use client';

import React from 'react';

export default function PerformanceChart() {
  return (
    <div className="glass-panel p-5 lg:p-6 flex flex-col justify-between h-full min-w-0 overflow-hidden relative">
      <div className="flex justify-between items-center mb-2 shrink-0">
        <div>
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/50">Performance Trajectory</h3>
          <p className="font-display text-xl lg:text-2xl text-white/95 leading-tight">Load vs Capacity</p>
        </div>
        <div className="flex items-center gap-5 text-[10px] font-mono shrink-0">
          <div className="flex items-center gap-1.5 text-white/80">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] shadow-[0_0_6px_rgba(56,189,248,0.8)]" /><span>Capacity</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/40">
            <span className="w-2 h-2 rounded-full bg-white/25" /><span>Load</span>
          </div>
        </div>
      </div>

      <div className="flex-1 relative w-full my-1 min-h-0">
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[8px] text-white/30 py-1 font-mono">
          <span>120</span><span>100</span><span>80</span><span>60</span>
        </div>
        <div className="ml-8 h-full relative border-b border-l border-white/[0.08]">
          <div className="absolute top-[33%] w-full border-b border-white/[0.03]" />
          <div className="absolute top-[66%] w-full border-b border-white/[0.03]" />
          <svg className="w-full h-full overflow-visible" viewBox="0 0 500 130" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(56, 189, 248, 0.22)" />
                <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
              </linearGradient>
            </defs>
            <path d="M 0 100 C 100 90, 200 110, 300 70 C 400 35, 450 65, 500 55" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M 0 80 C 150 60, 250 100, 350 45 C 420 15, 480 20, 500 5 L 500 130 L 0 130 Z" fill="url(#areaGrad)" />
            <path d="M 0 80 C 150 60, 250 100, 350 45 C 420 15, 480 20, 500 5" fill="none" stroke="#38bdf8" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 6px rgba(56,189,248,0.5))' }} />
            <circle cx="150" cy="70" r="3" fill="#030508" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="350" cy="45" r="3" fill="#030508" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="500" cy="5" r="3" fill="#030508" stroke="#38bdf8" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}