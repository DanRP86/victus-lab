'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const MOCK_WEEK = [
  { id: 'mon', dayOfWeek: 'MON', dateNum: 12, isToday: false, sport: 'MOBILITY FLOW', sportSub: 'Recovery', duration: '45 MIN', fuel: 'Optimal', fuelColor: 'text-[#4FE3C1]', lunch: 'Salad + Chicken', dinner: 'Fish + Veg' },
  { id: 'tue', dayOfWeek: 'TUE', dateNum: 13, isToday: true, sport: 'VO2 MAX INTERVALS', sportSub: '8 × 400m', duration: '60 MIN', fuel: 'Low Fuel', fuelColor: 'text-[#F59E0B]', lunch: 'Salmon + Rice', dinner: 'Chicken + Potatoes' },
  { id: 'wed', dayOfWeek: 'WED', dateNum: 14, isToday: false, sport: 'BASE AEROBIC', sportSub: 'Zone 2 Ride', duration: '90 MIN', fuel: 'Optimal', fuelColor: 'text-[#4FE3C1]', lunch: 'Pasta + Turkey', dinner: 'Steak + Asparagus' },
  { id: 'thu', dayOfWeek: 'THU', dateNum: 15, isToday: false, sport: 'REST DAY', sportSub: 'Regeneration', duration: '-', fuel: 'Surplus', fuelColor: 'text-[#3B82F6]', lunch: 'Rice Bowl', dinner: 'Sushi' },
  { id: 'fri', dayOfWeek: 'FRI', dateNum: 16, isToday: false, sport: 'STRENGTH', sportSub: 'Upper Body', duration: '60 MIN', fuel: 'Warning', fuelColor: 'text-[#FF6B6B]', lunch: 'Chicken Wrap', dinner: 'Beef Stir-fry' },
  { id: 'sat', dayOfWeek: 'SAT', dateNum: 17, isToday: false, sport: 'LONG EFFORT', sportSub: 'Trail Run', duration: '120 MIN', fuel: 'Loading', fuelColor: 'text-[#3B82F6]', lunch: 'Pancakes', dinner: 'Pasta + Meatballs' },
  { id: 'sun', dayOfWeek: 'SUN', dateNum: 18, isToday: false, sport: 'RECOVERY', sportSub: 'Sauna / Plunge', duration: '30 MIN', fuel: 'Optimal', fuelColor: 'text-[#4FE3C1]', lunch: 'Poke Bowl', dinner: 'Light Salad' },
];

export default function CalendarCycle() {
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);
  const selectedDay = MOCK_WEEK.find((d) => d.id === selectedDayId);

  return (
    <section className="relative w-full">
      <div className="grid grid-cols-7 gap-[clamp(8px,1vw,16px)] w-full [perspective:2000px]">
        {MOCK_WEEK.map((day) => {
          const isToday = day.isToday;
          const isSelected = selectedDayId === day.id;
          const hasSelection = selectedDayId !== null;

          return (
            <motion.div
              key={day.id}
              layoutId={`card-${day.id}`}
              onClick={() => setSelectedDayId(day.id)}
              animate={{
                z: hasSelection && !isSelected ? -100 : 0,
                scale: hasSelection && !isSelected ? 0.94 : 1,
                opacity: hasSelection && !isSelected ? 0.3 : 1,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              // Altura fija h-[420px] para que nunca se aplasten con el flex de la página
              className={`relative min-w-0 h-[420px] overflow-hidden rounded-[18px] flex flex-col p-4 xl:p-5 cursor-pointer transition-colors backdrop-blur-md ${isToday
                  ? 'bg-[#121A25]/60 shadow-[0_15px_40px_rgba(0,0,0,0.5),inset_0_0_30px_rgba(79,227,193,0.08)]'
                  : 'bg-[#080C12]/40 hover:bg-[#0B1018]/60'
                }`}
            >
              <div className="flex flex-col items-start min-w-0 shrink-0">
                <span className={`font-mono text-[11px] xl:text-xs font-medium truncate ${isToday ? 'text-[#4FE3C1]' : 'text-white/40'}`}>
                  {day.dayOfWeek}
                </span>
                <span className="font-display text-[26px] xl:text-[32px] text-white/90 leading-none mt-1">
                  {day.dateNum}
                </span>
                {isToday && (
                  <span className="mt-2 rounded bg-[#4FE3C1]/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#4FE3C1] truncate">
                    TODAY
                  </span>
                )}
              </div>

              <div className="flex-1 min-h-0 flex flex-col justify-center min-w-0 py-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/30 truncate block">
                  SPORT
                </span>
                <p className="mt-1 font-display text-sm xl:text-base leading-tight text-white/90 line-clamp-2 break-words">
                  {day.sport}
                </p>
                <div className="mt-1.5 space-y-0.5">
                  <p className="font-mono text-[10px] text-white/50 truncate">
                    {day.sportSub}
                  </p>
                  <p className="font-mono text-[10px] text-white/50 truncate">
                    {day.duration}
                  </p>
                </div>
              </div>

              <div className="min-w-0 shrink-0 flex flex-col justify-end">
                <div className="flex flex-col min-w-0 mb-2.5">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/30 truncate">
                    NUTRITION
                  </span>
                  <span className={`font-mono text-[9px] uppercase truncate mt-0.5 ${day.fuelColor}`}>
                    {day.fuel}
                  </span>
                </div>

                <div className="space-y-1.5 min-w-0 flex flex-col">
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-[8px] text-white/30 truncate">LUNCH</span>
                    <span className="font-mono text-[10px] text-white/60 truncate">{day.lunch}</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-[8px] text-white/30 truncate">DINNER</span>
                    <span className="font-mono text-[10px] text-white/60 truncate">{day.dinner}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedDayId && selectedDay && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-40 bg-[#030508]/70 backdrop-blur-md"
              onClick={() => setSelectedDayId(null)}
            />

            <motion.div
              layoutId={`card-${selectedDayId}`}
              className="absolute inset-x-0 top-[5%] z-50 mx-auto flex w-full max-w-4xl h-[500px] flex-col rounded-[24px] bg-[#0A0D14] shadow-[0_40px_100px_rgba(0,0,0,1)] ring-1 ring-white/[0.05] overflow-hidden"
            >
              <div className="flex justify-between items-center p-8 bg-[#0D1219]/80 border-b border-white/[0.04]">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-4xl text-white">{selectedDay.dayOfWeek} {selectedDay.dateNum}</span>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#4FE3C1]">Deep Dive Inspector</span>
                </div>
                {/* BOTÓN X MEJORADO (y con e.stopPropagation() para que funcione) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDayId(null);
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all backdrop-blur-md cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 grid grid-cols-2 gap-12 flex-1">
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-4">Training Telemetry</h3>
                  <p className="font-display text-2xl text-white">{selectedDay.sport}</p>
                  <p className="font-mono text-sm text-white/50 mt-2">{selectedDay.sportSub} · Detailed physiological strain estimation active.</p>
                </div>
                <div>
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-4">Nutritional Protocol</h3>
                  <div className="space-y-4">
                    <div className="bg-white/[0.02] p-4 rounded-lg">
                      <span className="font-mono text-[10px] text-white/40 block mb-1">LUNCH</span>
                      <span className="font-mono text-sm text-white">{selectedDay.lunch}</span>
                    </div>
                    <div className="bg-white/[0.02] p-4 rounded-lg">
                      <span className="font-mono text-[10px] text-white/40 block mb-1">DINNER</span>
                      <span className="font-mono text-sm text-white">{selectedDay.dinner}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}