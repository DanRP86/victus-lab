'use client';

import React from 'react';

export default function NutritionChart() {
  return (
    <div className="glass-panel p-4 lg:p-5 flex flex-col justify-between h-full min-w-0 overflow-hidden relative">
      <div className="flex justify-between items-center mb-2 shrink-0">
        <div>
          <h2 className="text-micro text-white/50 font-mono">Nutrition Intelligence</h2>
          <p className="font-display text-xl lg:text-2xl text-white/95 leading-tight">Daily Balance</p>
        </div>
        <div className="px-3 py-1 rounded-full border border-[#38bdf8]/15 bg-[#38bdf8]/[0.04]">
          <span className="text-[10px] text-[#38bdf8] font-mono uppercase tracking-wider font-medium">Optimal</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-between px-3 xl:px-6 my-1 min-h-0">
        {/* Anillo de Calorías */}
        <div className="relative w-28 h-28 lg:w-32 lg:h-32 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="5" />
            <circle id="indicator-ring" className="indicator-ring" cx="60" cy="60" r="52" fill="none" stroke="#38bdf8" strokeWidth="5" strokeDasharray="326.72" strokeDashoffset="326.72" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 6px rgba(56,189,248,0.6))' }} />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-2xl lg:text-3xl font-display font-light text-white leading-none">2450</span>
            <span className="text-[9px] uppercase tracking-widest text-white/40 mt-1 font-mono">Kcal</span>
            <span className="text-[8px] text-[#38bdf8] font-mono mt-0.5">+150 surplus</span>
          </div>
        </div>

        {/* Barras de Macros */}
        <div className="flex flex-col gap-2.5 w-[52%] shrink-0">
          <div>
            <div className="flex justify-between text-[10px] mb-1 font-mono">
              <span className="text-white/50 uppercase tracking-wider">Protein</span>
              <span className="text-white/90">180g <span className="text-white/30">/ 200g</span></span>
            </div>
            <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
              <div className="h-full bg-white/80 rounded-full w-[90%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[10px] mb-1 font-mono">
              <span className="text-white/50 uppercase tracking-wider">Carbs</span>
              <span className="text-white/90">320g <span className="text-white/30">/ 350g</span></span>
            </div>
            <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
              <div className="h-full bg-[#38bdf8]/60 rounded-full w-[91%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[10px] mb-1 font-mono">
              <span className="text-white/50 uppercase tracking-wider">Fats</span>
              <span className="text-white/90">65g <span className="text-white/30">/ 70g</span></span>
            </div>
            <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
              <div className="h-full bg-white/30 rounded-full w-[92%]" />
            </div>
          </div>

          <div className="mt-0.5 flex items-start gap-2 bg-white/[0.015] border border-[#38bdf8]/10 p-2 rounded-lg">
            <p className="text-[9px] text-white/60 leading-tight">Iron intake recommended based on recent load.</p>
          </div>
        </div>
      </div>
    </div>
  );
}