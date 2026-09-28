'use client';

import React from 'react';

export default function CalendarCycle() {
  return (
    <section className="w-full flex flex-col" style={{ transform: 'translateZ(15px)' }}>
      <div className="flex justify-between items-end mb-2.5 px-1">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-light text-white/90 tracking-wide leading-none">Current Cycle</h1>
          <p className="text-micro text-white/40 mt-1 font-mono">Week 42 • Endurance Phase • Volume Peak</p>
        </div>
        <div className="flex items-center gap-4 text-micro font-mono">
          <button className="text-white/40 hover:text-white transition-colors">&lt; PREV</button>
          <span className="text-white/80">OCT 12 - OCT 18</span>
          <button className="text-white/40 hover:text-white transition-colors">NEXT &gt;</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4 xl:gap-5 w-full items-start">
        {/* MON (Sin rayo gigante) */}
        <div className="flex flex-col gap-1.5 group">
          <div className="h-7 flex flex-col justify-end text-center pb-0.5">
            <p className="text-micro text-white/30 leading-none">MON</p>
            <p className="font-display text-sm lg:text-base font-light text-white/60 leading-tight">12</p>
          </div>
          <div className="glass-panel p-3 h-[150px] lg:h-[160px] flex flex-col justify-between cursor-pointer overflow-hidden">
            <div className="rounded bg-white/[0.025] border border-white/[0.04] p-2 transition-colors hover:bg-white/[0.05]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] uppercase tracking-widest text-[#38bdf8]/90 font-medium">Active Recovery</span>
                <svg className="w-3.5 h-3.5 text-[#38bdf8]/70 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <p className="text-xs font-light text-white/90 leading-tight">Mobility Flow</p>
              <p className="text-[10px] text-white/40 mt-0.5 font-mono">45 min • 120 kcal</p>
            </div>
            <div className="rounded bg-white/[0.025] border border-white/[0.04] p-1.5 mt-auto">
              <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden mb-1">
                <div className="h-full bg-[#38bdf8]/50 w-[80%] rounded-full" />
              </div>
              <div className="flex justify-between text-[8px] text-white/40 uppercase tracking-wider font-mono">
                <span>Protein</span><span className="text-white/80">160g</span>
              </div>
            </div>
          </div>
        </div>

        {/* TUE */}
        <div className="flex flex-col gap-1.5">
          <div className="h-7 text-center pb-0.5 relative flex flex-col justify-end">
            <p className="text-micro text-[#38bdf8] leading-none font-medium">TUE</p>
            <p className="font-display text-sm lg:text-base font-normal text-white leading-tight">13</p>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#38bdf8] rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
          </div>
          <div className="glass-panel p-3 h-[150px] lg:h-[160px] flex flex-col justify-between border-[#38bdf8]/40 bg-[rgba(16,26,45,0.45)] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.18)] cursor-pointer overflow-hidden z-10 scale-[1.02]">
            <div className="rounded bg-cyan-900/25 border border-[#38bdf8]/30 p-2">
              <span className="text-[9px] uppercase tracking-widest text-[#38bdf8] font-medium block mb-0.5">Primary Session</span>
              <p className="text-xs font-medium text-white drop-shadow-md leading-tight">VO2 Max Intervals</p>
              <p className="text-[10px] text-white/60 font-mono mt-0.5">Track • 8x400m</p>
            </div>
            <div className="rounded bg-white/[0.025] border border-white/[0.04] p-1.5 mt-auto">
              <span className="text-[8px] uppercase tracking-widest text-white/50 font-mono block mb-0.5">Strength</span>
              <p className="text-[11px] font-light text-white/80 leading-tight">Lower Body • 40 min</p>
            </div>
          </div>
        </div>

        {/* WED a SUN (Estructura base idéntica ajustada a 150px) */}
        <div className="flex flex-col gap-1.5 group">
          <div className="h-7 flex flex-col justify-end text-center pb-0.5"><p className="text-micro text-white/30 leading-none">WED</p><p className="font-display text-sm lg:text-base font-light text-white/60 leading-tight">14</p></div>
          <div className="glass-panel p-3 h-[150px] lg:h-[160px] flex flex-col justify-between cursor-pointer overflow-hidden"><div className="rounded bg-white/[0.025] border border-white/[0.04] p-2 hover:bg-white/[0.05]"><span className="text-[9px] uppercase tracking-widest text-white/60 block mb-0.5">Base Aerobic</span><p className="text-xs font-light text-white/80 leading-tight">Zone 2 Ride</p><p className="text-[10px] text-white/40 mt-0.5 font-mono">90 min • 850 kcal</p></div><div className="text-[8px] text-white/30 font-mono text-center pb-1 mt-auto">Aerobic Flush Complete</div></div>
        </div>
        <div className="flex flex-col gap-1.5 group">
          <div className="h-7 flex flex-col justify-end text-center pb-0.5"><p className="text-micro text-white/30 leading-none">THU</p><p className="font-display text-sm lg:text-base font-light text-white/60 leading-tight">15</p></div>
          <div className="glass-panel p-3 h-[150px] lg:h-[160px] flex flex-col items-center justify-center text-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer overflow-hidden"><svg className="w-5 h-5 text-white/40 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M20 12H4M8 16l-4-4 4-4M16 8l4 4-4 4" /></svg><p className="text-micro text-white/70 font-medium">Rest Day</p><p className="text-[10px] text-white/40 mt-0.5 font-mono">Regeneration</p></div>
        </div>
        <div className="flex flex-col gap-1.5 group">
          <div className="h-7 flex flex-col justify-end text-center pb-0.5"><p className="text-micro text-white/30 leading-none">FRI</p><p className="font-display text-sm lg:text-base font-light text-white/60 leading-tight">16</p></div>
          <div className="glass-panel p-3 h-[150px] lg:h-[160px] flex flex-col justify-between cursor-pointer overflow-hidden"><div className="rounded bg-white/[0.025] border border-white/[0.04] p-2 hover:bg-white/[0.05]"><span className="text-[9px] uppercase tracking-widest text-white/60 block mb-0.5">Strength</span><p className="text-xs font-light text-white/80 leading-tight">Upper Body</p><p className="text-[10px] text-white/40 mt-0.5 font-mono">60 min</p></div><div className="rounded bg-white/[0.025] border border-white/[0.04] p-1.5 border-l-2 border-l-yellow-500/80 mt-auto"><span className="text-[8px] text-yellow-500/90 font-medium font-mono uppercase block">Warning</span><p className="text-[8px] text-white/70 leading-tight mt-0.5">Hydration target missed.</p></div></div>
        </div>
        <div className="flex flex-col gap-1.5 group">
          <div className="h-7 flex flex-col justify-end text-center pb-0.5"><p className="text-micro text-white/30 leading-none">SAT</p><p className="font-display text-sm lg:text-base font-light text-white/60 leading-tight">17</p></div>
          <div className="glass-panel p-3 h-[150px] lg:h-[160px] flex flex-col justify-between cursor-pointer overflow-hidden"><div className="rounded bg-white/[0.025] border border-white/[0.04] p-2 hover:bg-white/[0.05]"><span className="text-[9px] uppercase tracking-widest text-white/60 block mb-0.5">Long Effort</span><p className="text-xs font-light text-white/80 leading-tight">Trail Run</p><p className="text-[10px] text-white/40 mt-0.5 font-mono">120 min • 1400 kcal</p></div><div className="pt-1.5 border-t border-white/[0.06] mt-auto"><p className="text-[8px] text-white/40 uppercase tracking-widest mb-1 font-mono">Fuel Prep</p><div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden"><div className="h-full bg-[#38bdf8]/60 w-[40%] rounded-full" /></div></div></div>
        </div>
        <div className="flex flex-col gap-1.5 group">
          <div className="h-7 flex flex-col justify-end text-center pb-0.5"><p className="text-micro text-white/30 leading-none">SUN</p><p className="font-display text-sm lg:text-base font-light text-white/60 leading-tight">18</p></div>
          <div className="glass-panel p-3 h-[150px] lg:h-[160px] flex flex-col items-center justify-center text-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer overflow-hidden"><svg className="w-5 h-5 text-white/40 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg><p className="text-micro text-white/70 font-medium">Recovery</p><p className="text-[10px] text-white/40 mt-0.5 font-mono">Sauna / Plunge</p></div>
        </div>
      </div>
    </section>
  );
}