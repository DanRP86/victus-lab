'use client';

import React from 'react';

export default function NutritionChart() {
  return (
    <div className="glass-panel p-5 flex flex-col justify-between h-full min-w-0 overflow-hidden">
      <div className="flex justify-between items-center mb-1">
        <div>
          <h2 className="text-micro text-white/60 mb-0.5">Nutrition Intelligence</h2>
          <p className="font-display text-xl text-white/90">Daily Balance</p>
        </div>
        <div className="px-2.5 py-0.5 rounded-full border border-white/[0.08] bg-white/[0.02]">
          <span className="text-[8px] text-white/80 font-mono uppercase tracking-wider">Optimal</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-between px-2 xl:px-4 mt-1">
        {/* Anillo de Calorías */}
        <div className="relative w-28 h-28 xl:w-32 xl:h-32 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="4" />
            <circle id="indicator-ring" className="indicator-ring" cx="60" cy="60" r="52" fill="none" stroke="#38bdf8" strokeWidth="4" strokeDasharray="326.72" strokeDashoffset="326.72" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 5px rgba(56,189,248,0.5))' }} />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-xl xl:text-2xl font-display font-light text-white">2450</span>
            <span className="text-[8px] uppercase tracking-widest text-white/40">Kcal</span>
            <span className="text-[7px] text-[#38bdf8] font-mono">+150 surplus</span>
          </div>
        </div>

        {/* Barras de Macros */}
        <div className="flex flex-col gap-2.5 w-[52%]">
          <div>
            <div className="flex justify-between text-[9px] mb-0.5">
              <span className="text-white/50 uppercase tracking-wider">Protein</span>
              <span className="text-white/90 font-mono">180g <span className="text-white/30">/ 200g</span></span>
            </div>
            <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full bg-white/80 rounded-full w-[90%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[9px] mb-0.5">
              <span className="text-white/50 uppercase tracking-wider">Carbs</span>
              <span className="text-white/90 font-mono">320g <span className="text-white/30">/ 350g</span></span>
            </div>
            <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full bg-white/45 rounded-full w-[91%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[9px] mb-0.5">
              <span className="text-white/50 uppercase tracking-wider">Fats</span>
              <span className="text-white/90 font-mono">65g <span className="text-white/30">/ 70g</span></span>
            </div>
            <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full bg-white/25 rounded-full w-[92%]" />
            </div>
          </div>

          <div className="mt-1 flex items-start gap-1.5 bg-white/[0.02] border border-white/[0.04] p-1.5 rounded">
            <svg className="w-3 h-3 text-white/50 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-[8px] text-white/60 leading-tight">Iron intake recommended for fatigue.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
