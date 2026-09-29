'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex w-full items-end justify-between pb-4" style={{ transform: 'translateZ(20px)' }}>
      {/* Landing / System Identity */}
      <div>
        <h1 className="font-display text-4xl lg:text-5xl font-light tracking-[0.2em] text-white leading-none">
          VICTUS
        </h1>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-[#4FE3C1]">
          Train. Fuel. Recover.
        </p>
      </div>

      {/* Refined Week Navigation */}
      <div className="flex flex-col items-end">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
          Current Cycle
        </span>
        <div className="mt-2 flex items-center gap-5">
          <button className="text-white/30 transition-colors hover:text-white">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="font-mono text-sm tracking-widest text-white">
            WEEK 38 · OCT 12—18
          </span>
          <button className="text-white/30 transition-colors hover:text-white">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}