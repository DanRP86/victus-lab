'use client';

import React from 'react';

export default function CalendarCycle() {
  return (
    <section className="w-full shrink-0 flex flex-col my-1" style={{ transform: 'translateZ(15px)' }}>
      <div className="flex justify-between items-end mb-3 px-1">
        <div>
          <h1 className="font-display text-3xl font-light text-white/90 tracking-wide">Current Cycle</h1>
          <p className="text-micro text-white/40">Week 42 • Endurance Phase • Volume Peak</p>
        </div>
        <div className="flex items-center gap-4 text-micro">
          <button className="text-white/40 hover:text-white transition-colors">&lt; PREV</button>
          <span className="text-white/80">OCT 12 - OCT 18</span>
          <button className="text-white/40 hover:text-white transition-colors">NEXT &gt;</button>
        </div>
      </div>

      {/* Grid 7 Días con Espaciado Real (gap-4) */}
      <div className="grid grid-cols-7 gap-4 w-full">

        {/* MON */}
        <div className="flex flex-col gap-2 group">
          <div className="text-center pb-1">
            <p className="text-micro text-white/30 mb-0.5">MON</p>
            <p className="font-display text-lg font-light text-white/60">12</p>
          </div>
          <div className="glass-panel p-3.5 glass-panel-content h-[215px] xl:h-[235px] flex flex-col justify-between cursor-pointer">
            <div className="rounded bg-white/[0.025] border border-white/[0.04] p-2.5 transition-colors hover:bg-white/[0.05]">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[9px] uppercase tracking-widest text-[#38bdf8]/90 font-medium">Active Recovery</span>
                <svg className="w-3 h-3 text-[#38bdf8]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <p className="text-xs font-light text-white/90">Mobility Flow</p>
              <p className="text-[10px] text-white/40 mt-0.5">45 min • 120 kcal</p>
            </div>
            <div className="rounded bg-white/[0.025] border border-white/[0.04] p-2.5">
              <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden mb-1.5">
                <div className="h-full bg-white/40 w-[80%] rounded-full" />
              </div>
              <div className="flex justify-between text-[9px] text-white/40 uppercase tracking-wider">
                <span>Protein</span><span className="text-white/80">160g</span>
              </div>
            </div>
          </div>
        </div>

        {/* TUE (Activo - Flota a +20px en Z de forma permanente) */}
        <div className="flex flex-col gap-2">
          <div className="text-center pb-1 flex flex-col items-center">
            <p className="text-micro text-[#38bdf8] mb-0.5">TUE</p>
            <p className="font-display text-lg font-normal text-white">13</p>
            <div className="w-5 h-[2px] bg-[#38bdf8] rounded-full mt-0.5 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
          </div>
          <div
            className="glass-panel p-3.5 glass-panel-content h-[215px] xl:h-[235px] flex flex-col justify-between border-[#38bdf8]/40 bg-[rgba(16,26,45,0.45)] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.18)] cursor-pointer"
            style={{ transform: 'translateZ(18px)' }}
          >
            <div className="rounded bg-cyan-900/25 border border-[#38bdf8]/30 p-2.5">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[9px] uppercase tracking-widest text-[#38bdf8] font-medium">Primary Session</span>
              </div>
              <p className="text-xs font-medium text-white drop-shadow-md">VO2 Max Intervals</p>
              <p className="text-[10px] text-white/60 mt-0.5">Track • 8x400m</p>
              <div className="mt-2 flex gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-white/[0.06] text-[8px] text-white/70 border border-white/[0.06]">RPE 9</span>
                <span className="px-1.5 py-0.5 rounded bg-white/[0.06] text-[8px] text-white/70 border border-white/[0.06]">650 kcal</span>
              </div>
            </div>
            <div className="rounded bg-white/[0.025] border border-white/[0.04] p-2.5">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] uppercase tracking-widest text-white/50">Strength</span>
              </div>
              <p className="text-xs font-light text-white/80">Lower Body</p>
              <p className="text-[10px] text-white/40 mt-0.5">40 min</p>
            </div>
          </div>
        </div>

        {/* WED */}
        <div className="flex flex-col gap-2 group">
          <div className="text-center pb-1">
            <p className="text-micro text-white/30 mb-0.5">WED</p>
            <p className="font-display text-lg font-light text-white/60">14</p>
          </div>
          <div className="glass-panel p-3.5 glass-panel-content h-[215px] xl:h-[235px] flex flex-col justify-between cursor-pointer">
            <div className="rounded bg-white/[0.025] border border-white/[0.04] p-2.5 transition-colors hover:bg-white/[0.05]">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[9px] uppercase tracking-widest text-white/60">Base Aerobic</span>
              </div>
              <p className="text-xs font-light text-white/80">Zone 2 Ride</p>
              <p className="text-[10px] text-white/40 mt-0.5">90 min • 850 kcal</p>
            </div>
            <div className="text-[9px] text-white/30 font-mono text-center pb-2">Aerobic Flush Complete</div>
          </div>
        </div>

        {/* THU */}
        <div className="flex flex-col gap-2 group">
          <div className="text-center pb-1">
            <p className="text-micro text-white/30 mb-0.5">THU</p>
            <p className="font-display text-lg font-light text-white/60">15</p>
          </div>
          <div className="glass-panel p-3.5 glass-panel-content h-[215px] xl:h-[235px] flex flex-col items-center justify-center text-center opacity-65 hover:opacity-100 transition-opacity cursor-pointer">
            <svg className="w-6 h-6 text-white/40 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M20 12H4M8 16l-4-4 4-4M16 8l4 4-4 4" /></svg>
            <p className="text-micro text-white/70 font-medium">Rest Day</p>
            <p className="text-[10px] text-white/40 mt-1">Regeneration</p>
          </div>
        </div>

        {/* FRI */}
        <div className="flex flex-col gap-2 group">
          <div className="text-center pb-1">
            <p className="text-micro text-white/30 mb-0.5">FRI</p>
            <p className="font-display text-lg font-light text-white/60">16</p>
          </div>
          <div className="glass-panel p-3.5 glass-panel-content h-[215px] xl:h-[235px] flex flex-col justify-between cursor-pointer">
            <div className="rounded bg-white/[0.025] border border-white/[0.04] p-2.5 transition-colors hover:bg-white/[0.05]">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[9px] uppercase tracking-widest text-white/60">Strength</span>
              </div>
              <p className="text-xs font-light text-white/80">Upper Body</p>
              <p className="text-[10px] text-white/40 mt-0.5">60 min</p>
            </div>
            <div className="rounded bg-white/[0.025] border border-white/[0.04] p-2.5 border-l-2 border-l-yellow-500/80">
              <div className="flex justify-between text-[8px] text-white/50 uppercase tracking-wider mb-0.5">
                <span className="text-yellow-500/90 font-medium">Warning</span>
              </div>
              <p className="text-[9px] text-white/70 leading-tight">Hydration target missed.</p>
            </div>
          </div>
        </div>

        {/* SAT */}
        <div className="flex flex-col gap-2 group">
          <div className="text-center pb-1">
            <p className="text-micro text-white/30 mb-0.5">SAT</p>
            <p className="font-display text-lg font-light text-white/60">17</p>
          </div>
          <div className="glass-panel p-3.5 glass-panel-content h-[215px] xl:h-[235px] flex flex-col justify-between cursor-pointer">
            <div className="rounded bg-white/[0.025] border border-white/[0.04] p-2.5 transition-colors hover:bg-white/[0.05]">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[9px] uppercase tracking-widest text-white/60">Long Effort</span>
              </div>
              <p className="text-xs font-light text-white/80">Trail Run</p>
              <p className="text-[10px] text-white/40 mt-0.5">120 min • 1400 kcal</p>
            </div>
            <div className="pt-2 border-t border-white/[0.06]">
              <p className="text-[8px] text-white/40 uppercase tracking-widest mb-1">Fuel Prep</p>
              <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full bg-[#38bdf8]/60 w-[40%] rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* SUN */}
        <div className="flex flex-col gap-2 group">
          <div className="text-center pb-1">
            <p className="text-micro text-white/30 mb-0.5">SUN</p>
            <p className="font-display text-lg font-light text-white/60">18</p>
          </div>
          <div className="glass-panel p-3.5 glass-panel-content h-[215px] xl:h-[235px] flex flex-col items-center justify-center text-center opacity-65 hover:opacity-100 transition-opacity cursor-pointer">
            <svg className="w-6 h-6 text-white/40 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            <p className="text-micro text-white/70 font-medium">Recovery</p>
            <p className="text-[10px] text-white/40 mt-1">Sauna / Plunge</p>
          </div>
        </div>

      </div>
    </section>
  );
}
