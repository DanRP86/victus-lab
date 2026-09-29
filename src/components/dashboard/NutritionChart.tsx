'use client';

import React from 'react';

export default function NutritionChart() {
  return (
    <div className="flex flex-col justify-between h-full min-w-0 relative rounded-[18px] bg-[#080C12]/40 backdrop-blur-md p-6 lg:p-8 shadow-xl">
      <div className="flex justify-between items-start mb-4 xl:mb-6 shrink-0">
        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-white/30">Nutrition</h3>
          <p className="mt-1 font-display text-xl lg:text-2xl text-white/90 leading-tight">System Fuel State</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-[#4FE3C1]/10">
          <span className="text-[9px] text-[#4FE3C1] font-mono uppercase tracking-widest font-medium">Equilibrium</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-6 xl:gap-8 items-center min-h-0 w-full">
        {/* Lado Izquierdo: Resumen Kcal */}
        <div className="flex flex-col justify-center min-w-0">
          <span className="font-display text-[52px] xl:text-[68px] font-light text-white leading-none tracking-tight truncate">
            2450
          </span>
          <div className="mt-2 xl:mt-3 space-y-1">
            <span className="block font-mono text-[9px] xl:text-[10px] uppercase tracking-widest text-[#4FE3C1] truncate">
              Kcal Baseline
            </span>
            <span className="block font-mono text-[9px] xl:text-[10px] uppercase tracking-widest text-white/40 truncate">
              +150 Surplus
            </span>
          </div>
        </div>

        {/* Lado Derecho: Macros con anchos y altos explícitos para no desaparecer */}
        <div className="flex flex-col justify-center gap-4 xl:gap-5 w-full min-w-0">

          <div className="w-full">
            <div className="flex justify-between text-[9px] xl:text-[10px] mb-2 font-mono min-w-0">
              <span className="text-white/50 uppercase tracking-widest">Protein</span>
              <span className="text-white">180g <span className="text-white/30">/ 200g</span></span>
            </div>
            <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
              <div className="h-full bg-white/80 rounded-full" style={{ width: '90%' }} />
            </div>
          </div>

          <div className="w-full">
            <div className="flex justify-between text-[9px] xl:text-[10px] mb-2 font-mono min-w-0">
              <span className="text-white/50 uppercase tracking-widest">Carbs</span>
              <span className="text-white">320g <span className="text-white/30">/ 350g</span></span>
            </div>
            <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
              <div className="h-full bg-[#4FE3C1] rounded-full" style={{ width: '91%' }} />
            </div>
          </div>

          <div className="w-full">
            <div className="flex justify-between text-[9px] xl:text-[10px] mb-2 font-mono min-w-0">
              <span className="text-white/50 uppercase tracking-widest">Fats</span>
              <span className="text-white">65g <span className="text-white/30">/ 70g</span></span>
            </div>
            <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
              <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: '92%' }} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}