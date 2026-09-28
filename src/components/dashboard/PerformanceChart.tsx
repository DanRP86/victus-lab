'use client';

import React from 'react';

export default function PerformanceChart() {
  return (
    <div className="glass-panel p-5 flex flex-col justify-between h-full min-w-0 overflow-hidden">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-micro text-white/60 mb-0.5">Performance Trajectory</h2>
          <p className="font-display text-xl text-white/90">Load vs Capacity</p>
        </div>
        <div className="flex gap-3 text-micro">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#38bdf8]" /> Capacity</span>
          <span className="flex items-center gap-1.5 text-white/40"><span className="w-2 h-2 rounded-full bg-white/20" /> Load</span>
        </div>
      </div>

      <div className="flex-1 relative w-full my-1 min-h-0">
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[8px] text-white/30 py-0.5">
          <span>120</span><span>100</span><span>80</span><span>60</span>
        </div>

        <div className="ml-7 h-full relative border-b border-l border-white/[0.06]">
          <div className="absolute top-0 w-full border-b border-white/[0.03]" />
          <div className="absolute top-[33%] w-full border-b border-white/[0.03]" />
          <div className="absolute top-[66%] w-full border-b border-white/[0.03]" />

          <svg className="w-full h-full overflow-visible" viewBox="0 0 500 130" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(56, 189, 248, 0.22)" />
                <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
              </linearGradient>
              <linearGradient id="loadLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.3)" />
              </linearGradient>
            </defs>
            <path d="M 0 100 C 100 90, 200 110, 300 70 C 400 35, 450 65, 500 55" fill="none" stroke="url(#loadLine)" strokeWidth="1" strokeDasharray="4 4" />
            <path className="chart-area" d="M 0 80 C 150 60, 250 100, 350 45 C 420 15, 480 20, 500 5 L 500 130 L 0 130 Z" />
            <path className="chart-line" d="M 0 80 C 150 60, 250 100, 350 45 C 420 15, 480 20, 500 5" />
            <circle className="data-point" cx="150" cy="70" r="3" />
            <circle className="data-point" cx="350" cy="45" r="3" />
            <circle className="data-point" cx="500" cy="5" r="3" />
          </svg>

          <div className="absolute -bottom-4 w-full flex justify-between text-[8px] text-white/30 font-mono">
            <span>Week 38</span><span>Week 40</span><span>Week 42</span>
          </div>
        </div>
      </div>
    </div>
  );
}
