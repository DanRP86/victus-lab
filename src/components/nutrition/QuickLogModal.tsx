'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Wine, CakeSlice } from 'lucide-react';
import { FoodArchetype, PortionSize, Language, MealSlot } from '@/types/nutrition';

interface QuickLogModalProps {
    isOpen: boolean;
    onClose: () => void;
    date: string;
    slot: MealSlot;
    archetypes: FoodArchetype[];
    selectedArchetypeId: string;
    selectedPortion: PortionSize;
    alcoholUnits: number;
    hasDessert: boolean;
    lang: Language;
    onSelectArchetype: (id: string) => void;
    onSelectPortion: (portion: PortionSize) => void;
    onToggleAlcohol: () => void;
    onToggleDessert: () => void;
    onConfirm: () => void;
}

export const QuickLogModal: React.FC<QuickLogModalProps> = ({
    isOpen,
    onClose,
    date,
    slot,
    archetypes,
    selectedArchetypeId,
    selectedPortion,
    alcoholUnits,
    hasDessert,
    lang,
    onSelectArchetype,
    onSelectPortion,
    onToggleAlcohol,
    onToggleDessert,
    onConfirm,
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Panel */}
                    <motion.div
                        initial={{ y: 24, opacity: 0, scale: 0.98 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 24, opacity: 0, scale: 0.98 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-lg rounded-t-2xl border border-white/[0.1] bg-[#12161B] p-6 text-white shadow-2xl sm:rounded-2xl space-y-5"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                            <div>
                                <h3 className="text-base font-semibold text-white">
                                    {lang === 'es' ? 'Registrar Comida' : 'Log Meal'}
                                </h3>
                                <p className="font-mono text-xs text-[#88929E]">
                                    {date} · <span className="uppercase">{slot}</span>
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-lg p-1.5 text-[#88929E] hover:bg-white/[0.05] hover:text-white transition"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Click 2: Archetype Selection Grid */}
                        <div className="space-y-2">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-[#88929E]">
                                1. {lang === 'es' ? 'Elige el Arquetipo' : 'Select Archetype'}
                            </span>
                            <div className="grid max-h-52 grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
                                {archetypes.map((arch) => {
                                    const isSelected = selectedArchetypeId === arch.id;
                                    return (
                                        <button
                                            key={arch.id}
                                            type="button"
                                            onClick={() => onSelectArchetype(arch.id)}
                                            className={`flex flex-col justify-between rounded-xl border p-3 text-left transition-all ${isSelected
                                                    ? 'border-[#4FE3C1] bg-[#4FE3C1]/10 text-white shadow-[0_0_15px_rgba(79,227,193,0.15)]'
                                                    : 'border-white/[0.06] bg-white/[0.02] text-[#D8DEE5] hover:border-white/[0.2] hover:bg-white/[0.04]'
                                                }`}
                                        >
                                            <span className="text-xs font-medium leading-snug">{arch.name[lang]}</span>
                                            <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-[#88929E]">
                                                <span>{arch.nutrients.kcal} kcal</span>
                                                <span>{arch.nutrients.proteinG}g P</span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Click 3: Portion Scale & Toggles */}
                        <div className="space-y-4 border-t border-white/[0.06] pt-3">
                            <div>
                                <span className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-[#88929E]">
                                    2. {lang === 'es' ? 'Tamaño de Porción' : 'Portion Scale'}
                                </span>
                                <div className="grid grid-cols-3 gap-2">
                                    {(['light', 'standard', 'heavy'] as PortionSize[]).map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => onSelectPortion(size)}
                                            className={`rounded-lg border py-2 font-mono text-xs uppercase tracking-wider transition-all ${selectedPortion === size
                                                    ? 'border-[#4FE3C1] bg-[#4FE3C1] font-bold text-black'
                                                    : 'border-white/[0.06] bg-white/[0.02] text-[#88929E] hover:border-white/[0.2]'
                                                }`}
                                        >
                                            {size === 'light'
                                                ? lang === 'es' ? 'Ligero' : 'Light'
                                                : size === 'standard'
                                                    ? lang === 'es' ? 'Normal' : 'Standard'
                                                    : lang === 'es' ? 'Grande' : 'Heavy'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Extras Toggles */}
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={onToggleAlcohol}
                                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg border py-2 text-xs font-medium transition-all ${alcoholUnits > 0
                                            ? 'border-rose-500/40 bg-rose-500/10 text-[#FF6B6B]'
                                            : 'border-white/[0.06] bg-white/[0.02] text-[#88929E] hover:border-white/[0.2]'
                                        }`}
                                >
                                    <Wine className="h-3.5 w-3.5" />
                                    {lang === 'es' ? '+ Alcohol' : '+ Drink'}
                                </button>
                                <button
                                    type="button"
                                    onClick={onToggleDessert}
                                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg border py-2 text-xs font-medium transition-all ${hasDessert
                                            ? 'border-amber-500/40 bg-amber-500/10 text-[#F59E0B]'
                                            : 'border-white/[0.06] bg-white/[0.02] text-[#88929E] hover:border-white/[0.2]'
                                        }`}
                                >
                                    <CakeSlice className="h-3.5 w-3.5" />
                                    {lang === 'es' ? '+ Postre' : '+ Dessert'}
                                </button>
                            </div>
                        </div>

                        {/* Final Action Button */}
                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={onConfirm}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4FE3C1] py-3 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-[#45ccad] shadow-[0_4px_20px_rgba(79,227,193,0.25)]"
                        >
                            <span>{lang === 'es' ? 'Confirmar en 1 Clic' : 'Confirm Entry'}</span>
                            <ChevronRight className="h-4 w-4" />
                        </motion.button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};