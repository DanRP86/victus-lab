'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TelemetrySummary } from '@/hooks/useNutritionTelemetry';
import { Language } from '@/types/nutrition';

interface MicronutrientDrawerProps {
    isOpen: boolean;
    telemetry: TelemetrySummary;
    lang: Language;
}

export const MicronutrientDrawer: React.FC<MicronutrientDrawerProps> = ({
    isOpen,
    telemetry,
    lang,
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.section
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden rounded-2xl border border-[#4FE3C1]/20 bg-[#12161B]/90 p-6 backdrop-blur-md"
                >
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                        <div>
                            <h3 className="font-mono text-xs uppercase tracking-widest text-[#4FE3C1]">
                                {lang === 'es' ? 'Laboratorio de Micronutrientes' : 'Micronutrient Laboratory'}
                            </h3>
                            <p className="text-xs text-[#88929E]">
                                {lang === 'es'
                                    ? 'Valores medios diarios extrapolados de los vectores de referencia'
                                    : 'Extrapolated daily averages from reference composite vectors'}
                            </p>
                        </div>
                        <span className="rounded-full border border-white/[0.1] bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10px] text-[#D8DEE5]">
                            7-Day Rolling
                        </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                            <span className="font-mono text-[10px] uppercase text-[#88929E]">Potassium (K)</span>
                            <div className="mt-1 font-mono text-lg font-bold text-white tabular-nums">
                                {telemetry.dailyAvgPotassium} mg
                            </div>
                            <span className="text-[10px] text-[#88929E]">Target: &gt;3,500</span>
                        </div>

                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                            <span className="font-mono text-[10px] uppercase text-[#88929E]">Sodium (Na)</span>
                            <div className="mt-1 font-mono text-lg font-bold text-white tabular-nums">
                                {telemetry.dailyAvgSodium} mg
                            </div>
                            <span className="text-[10px] text-[#88929E]">Limit: &lt;2,300</span>
                        </div>

                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                            <span className="font-mono text-[10px] uppercase text-[#88929E]">Magnesium</span>
                            <div className="mt-1 font-mono text-lg font-bold text-white tabular-nums">
                                {telemetry.dailyAvgMagnesium} mg
                            </div>
                            <span className="text-[10px] text-[#88929E]">Target: &gt;350</span>
                        </div>

                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                            <span className="font-mono text-[10px] uppercase text-[#88929E]">Vitamin C</span>
                            <div className="mt-1 font-mono text-lg font-bold text-white tabular-nums">
                                {telemetry.dailyAvgVitaminC} mg
                            </div>
                            <span className="text-[10px] text-[#88929E]">Target: &gt;80</span>
                        </div>

                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                            <span className="font-mono text-[10px] uppercase text-[#88929E]">Dietary Fiber</span>
                            <div className="mt-1 font-mono text-lg font-bold text-white tabular-nums">
                                {telemetry.dailyAvgFiber} g
                            </div>
                            <span className="text-[10px] text-[#88929E]">Target: &gt;30</span>
                        </div>

                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                            <span className="font-mono text-[10px] uppercase text-[#88929E]">Vitamin B12</span>
                            <div className="mt-1 font-mono text-lg font-bold text-white tabular-nums">
                                {telemetry.dailyAvgB12} µg
                            </div>
                            <span className="text-[10px] text-[#88929E]">Target: &gt;2.4</span>
                        </div>
                    </div>
                </motion.section>
            )}
        </AnimatePresence>
    );
};