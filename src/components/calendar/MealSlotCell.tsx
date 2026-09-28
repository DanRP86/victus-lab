'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Wine, CakeSlice } from 'lucide-react';
import { MealEntry, FoodArchetype, Language } from '@/types/nutrition';

interface MealSlotCellProps {
    meal?: MealEntry;
    archetype?: FoodArchetype;
    lang: Language;
    onSelect: () => void;
    onRemove: (e: React.MouseEvent) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
    fast_food: '#FF6B6B',
    retail_convenience: '#4FE3C1',
    restaurant_social: '#F59E0B',
    home_cooked: '#3B82F6',
};

export const MealSlotCell: React.FC<MealSlotCellProps> = ({
    meal,
    archetype,
    lang,
    onSelect,
    onRemove,
}) => {
    return (
        <motion.div
            onClick={onSelect}
            whileTap={{ scale: 0.98 }}
            className="group relative flex min-h-[96px] cursor-pointer flex-col justify-between rounded-lg border border-transparent p-2.5 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.03]"
        >
            {meal && archetype ? (
                <>
                    <div>
                        <div className="flex items-start justify-between gap-1">
                            <span className="line-clamp-2 text-xs font-medium leading-snug text-white group-hover:text-[#4FE3C1] transition-colors">
                                {archetype.name[lang]}
                            </span>
                            <button
                                type="button"
                                onClick={onRemove}
                                className="opacity-0 transition-opacity duration-150 group-hover:opacity-100 p-0.5 text-[#88929E] hover:text-[#FF6B6B]"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                        <div className="mt-1 font-mono text-[10px] text-[#4FE3C1] tabular-nums">
                            ~{archetype.nutrients.kcal} kcal
                        </div>
                    </div>

                    <div className="mt-2 flex items-center gap-1.5">
                        <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: CATEGORY_COLORS[archetype.category] || '#88929E' }}
                        />
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#88929E]">
                            {meal.portion}
                        </span>
                        {meal.alcoholUnits > 0 && <Wine className="h-2.5 w-2.5 text-[#FF6B6B]" />}
                        {meal.hasDessert && <CakeSlice className="h-2.5 w-2.5 text-[#F59E0B]" />}
                    </div>
                </>
            ) : (
                <div className="flex h-full items-center justify-center text-white/20 transition-all duration-200 group-hover:scale-110 group-hover:text-[#4FE3C1]">
                    <Plus className="h-4 w-4" />
                </div>
            )}
        </motion.div>
    );
};