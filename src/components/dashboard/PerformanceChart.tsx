'use client';

import React from 'react';

export default function PerformanceChart() {
  return (
    <div className="flex flex-col justify-between h-full min-w-0 relative rounded-[18px] bg-[#080C12]/40 backdrop-blur-md p-6 lg:p-8 shadow-xl">
      <div className="flex justify-between items-start mb-6 shrink-0">
        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-white/30">Performance</h3>
          <p className="mt-1 font-display text-xl lg:text-2xl text-white/90 leading-tight">Load vs Capacity</p>
        </div>
        <div className="flex items-center gap-5 text-[10px] font-mono shrink-0">
          <div className="flex items-center gap-1.5 text-white/80">
            <span className="w-2 h-2 rounded-full bg-[#4FE3C1]" /><span>Capacity</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/40">
            <span className="w-2 h-2 rounded-full bg-white/20" /><span>Load</span>
          </div>
        </div>
      </div>

      <div className="flex-1 relative w-full mt-2 min-h-0">
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[9px] text-white/20 py-1 font-mono">
          <span>120</span><span>100</span><span>80</span><span>60</span>
        </div>

        <div className="ml-8 h-full relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 500 130" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(79, 227, 193, 0.15)" />
                <stop offset="100%" stopColor="rgba(79, 227, 193, 0)" />
              </linearGradient>
            </defs>
            <path d="M 0 100 C 100 90, 200 110, 300 70 C 400 35, 450 65, 500 55" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M 0 80 C 150 60, 250 100, 350 45 C 420 15, 480 20, 500 5 L 500 130 L 0 130 Z" fill="url(#areaGrad)" />
            <path d="M 0 80 C 150 60, 250 100, 350 45 C 420 15, 480 20, 500 5" fill="none" stroke="#4FE3C1" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 8px rgba(79,227,193,0.4))' }} />
            <circle cx="150" cy="70" r="3" fill="#0A0D14" stroke="#4FE3C1" strokeWidth="2" />
            <circle cx="350" cy="45" r="3" fill="#0A0D14" stroke="#4FE3C1" strokeWidth="2" />
            <circle cx="500" cy="5" r="3" fill="#0A0D14" stroke="#4FE3C1" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}