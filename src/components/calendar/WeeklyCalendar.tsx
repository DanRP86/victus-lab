'use client';

import React from 'react';
import { MealSlotCell } from './MealSlotCell';
import { MealEntry, FoodArchetype, MealSlot, Language } from '@/types/nutrition';

export interface CalendarDay {
    id: string; // YYYY-MM-DD
    short: Record<Language, string>;
}

interface WeeklyCalendarProps {
    days: CalendarDay[];
    slots: { id: MealSlot; name: Record<Language, string> }[];
    meals: MealEntry[];
    archetypesMap: Map<string, FoodArchetype>;
    lang: Language;
    onSlotClick: (date: string, slot: MealSlot) => void;
    onRemoveMeal: (date: string, slot: MealSlot, e: React.MouseEvent) => void;
}

export const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
    days,
    slots,
    meals,
    archetypesMap,
    lang,
    onSlotClick,
    onRemoveMeal,
}) => {
    return (
        <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#12161B]/80 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
                <div>
                    <h2 className="font-mono text-xs uppercase tracking-widest text-white">
                        {lang === 'es' ? 'Agenda de Comidas' : 'Weekly Nutrition Grid'}
                    </h2>
                    <p className="mt-0.5 text-xs text-[#88929E]">
                        {lang === 'es' ? 'Planificación rápida en 3 clics' : '3-click quick log & projection'}
                    </p>
                </div>
                <span className="font-mono text-xs text-[#88929E]">
                    {lang === 'es' ? 'Semana 38 · 2026' : 'Week 38 · 2026'}
                </span>
            </div>

            <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                    {/* Day Headers */}
                    <div className="grid grid-cols-7 border-b border-white/[0.06] bg-white/[0.02] py-2.5 text-center">
                        {days.map((day) => (
                            <div key={day.id} className="font-mono text-xs text-[#D8DEE5]">
                                <span>{day.short[lang]}</span>
                                <span className="mt-0.5 block text-[10px] text-[#88929E]">
                                    {day.id.split('-')[2]}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Meal Slots Rows */}
                    {slots.map((slot) => (
                        <div key={slot.id} className="border-b border-white/[0.06] last:border-b-0">
                            <div className="border-b border-white/[0.03] bg-white/[0.01] px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[#88929E]">
                                {slot.name[lang]}
                            </div>
                            <div className="grid grid-cols-7 divide-x divide-white/[0.06]">
                                {days.map((day) => {
                                    const meal = meals.find((m) => m.date === day.id && m.slot === slot.id);
                                    const archetype = meal ? archetypesMap.get(meal.archetypeId) : undefined;

                                    return (
                                        <MealSlotCell
                                            key={`${day.id}-${slot.id}`}
                                            meal={meal}
                                            archetype={archetype}
                                            lang={lang}
                                            onSelect={() => onSlotClick(day.id, slot.id)}
                                            onRemove={(e) => onRemoveMeal(day.id, slot.id, e)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};