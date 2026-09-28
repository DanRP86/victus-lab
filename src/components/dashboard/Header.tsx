'use client';

import React from 'react';

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full shrink-0 mb-3" style={{ transform: 'translateZ(35px)' }}>
      <div className="flex items-center gap-2">
        <span className="font-display text-2xl tracking-[0.2em] font-light text-white opacity-90">VICTUS</span>
        <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] opacity-80 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
      </div>

      <nav className="hidden md:flex gap-10">
        <a href="#" className="text-xs tracking-widest uppercase text-white hover:text-white transition-colors duration-300 font-light relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[#38bdf8] after:rounded-full after:opacity-100">Calendar</a>
        <a href="#" className="text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-300 font-light relative">Training</a>
        <a href="#" className="text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-300 font-light relative">Nutrition</a>
        <a href="#" className="text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-300 font-light relative">Progress</a>
        <a href="#" className="text-xs tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-300 font-light relative">Profile</a>
      </nav>

      <div className="flex gap-4">
        <button className="glass-button w-10 h-10 group" aria-label="Search">
          <svg className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
        <button className="glass-button w-10 h-10 group relative" aria-label="Notifications">
          <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#38bdf8] rounded-full border border-[#0a0c10]" />
          <svg className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        </button>
        <button className="glass-button w-10 h-10 group" aria-label="Settings">
          <svg className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </button>
      </div>
    </header>
  );
}
