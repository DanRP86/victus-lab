'use client';

import React, { useState } from 'react';
import { Search, Bell, Settings } from 'lucide-react';

export default function Header() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'sports' | 'nutrition'>('calendar');

  return (
    <header className="flex justify-between items-center w-full h-10 px-1" style={{ transform: 'translateZ(20px)' }}>
      <div className="flex items-center gap-2.5">
        <span className="font-display text-2xl lg:text-3xl tracking-[0.2em] font-light text-white opacity-95 leading-none">VICTUS</span>
        <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          {[
            { id: 'calendar', label: 'CALENDAR' },
            { id: 'sports', label: 'SPORTS' },
            { id: 'nutrition', label: 'NUTRITION' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-[0.18em] uppercase transition-all duration-300 ${activeTab === tab.id
                  ? 'bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/35 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                  : 'bg-white/[0.02] text-white/50 border border-white/[0.06] hover:text-white'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 pl-3 border-l border-white/10">
          <button className="glass-button w-8 h-8 group"><Search className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors" /></button>
          <button className="glass-button w-8 h-8 group relative">
            <div className="absolute top-1.5 right-1.5 w-1 h-1 bg-[#38bdf8] rounded-full" />
            <Bell className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors" />
          </button>
          <button className="glass-button w-8 h-8 group"><Settings className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors" /></button>
        </div>
      </div>
    </header>
  );
}