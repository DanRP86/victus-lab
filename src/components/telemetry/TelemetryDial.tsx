'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface TelemetryDialProps {
  label: string;
  value: string | number;
  unit?: string;
  subtext: string;
  progressPct: number;
  accentColor: string; // e.g. '#4FE3C1' or '#FF6B6B'
  icon: LucideIcon;
  badge?: string;
}

export const TelemetryDial: React.FC<TelemetryDialProps> = ({
  label,
  value,
  unit,
  subtext,
  progressPct,
  accentColor,
  icon: Icon,
  badge,
}) => {
  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#12161B]/90 p-4.5 backdrop-blur-md transition-all duration-300 hover:border-white/[0.2] hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
    >
      {/* Subtle ambient gradient spotlight on hover */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
        style={{ backgroundColor: accentColor }}
      />

      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#88929E]">
          {label}
        </span>
        <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" style={{ color: accentColor }} />
      </div>

      <div className="my-2.5 flex items-baseline gap-2">
        <span className="font-mono text-2xl font-semibold tracking-tight text-white tabular-nums">
          {value}
        </span>
        {unit && <span className="font-mono text-xs text-[#88929E]">{unit}</span>}
        {badge && (
          <span className="ml-auto rounded border border-rose-500/30 bg-rose-500/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#FF6B6B]">
            {badge}
          </span>
        )}
      </div>

      <p className="line-clamp-1 text-xs text-[#88929E]">{subtext}</p>

      {/* Progress Track */}
      <div className="mt-3.5 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, progressPct))}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ backgroundColor: accentColor }}
        />
      </div>
    </motion.div>
  );
};