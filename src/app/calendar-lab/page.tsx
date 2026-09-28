'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
    Wind,
    Activity,
    Flame,
    ShieldAlert,
    Sparkles,
    Check,
    X,
    Compass,
    Maximize2
} from 'lucide-react';

// --- ATHLETE DATA TYPES ---
type Category = 'climbing' | 'strength' | 'aerobic' | 'windsurf' | 'work' | 'social' | 'mobility';
type EventStatus = 'completed' | 'planned' | 'constraint';

interface CalendarEvent {
    id: string;
    title: string;
    subtitle?: string;
    category: Category;
    status: EventStatus;
    time: string;
    durationMin: number;
    // Exposure 0 to 3
    exposure?: {
        grip: 0 | 1 | 2 | 3;
        pull: 0 | 1 | 2 | 3;
        push: 0 | 1 | 2 | 3;
        shoulder: 0 | 1 | 2 | 3;
        core: 0 | 1 | 2 | 3;
    };
    notes?: string;
    constraintRationale?: string;
}

interface NutritionSummary {
    caloricDelta: number; // e.g. +450 or -200
    freshScorePct: number;
    ratioNaK: number;
    socialExposure?: string;
}

interface DayData {
    id: string; // YYYY-MM-DD
    dateNum: number;
    dayOfWeek: string;
    isToday?: boolean;
    loadScore: number; // 0 to 100 for terrain curve
    loadLabel: 'Light' | 'Moderate' | 'Heavy' | 'Peak';
    events: CalendarEvent[];
    nutrition: NutritionSummary;
}

// --- REALISTIC ATHLETE WEEK MOCK (WEEK 38) ---
const MOCK_WEEK: DayData[] = [
    {
        id: '2026-09-14',
        dateNum: 14,
        dayOfWeek: 'MON',
        loadScore: 68,
        loadLabel: 'Moderate',
        events: [
            {
                id: 'e-1',
                title: 'Office On-Site',
                subtitle: 'Headquarters · Madrid',
                category: 'work',
                status: 'constraint',
                time: '09:00 — 18:00',
                durationMin: 540,
                notes: 'Blocks morning and afternoon windows.',
            },
            {
                id: 'e-2',
                title: 'Bouldering Session',
                subtitle: 'Sputnik Las Rozas · High Power',
                category: 'climbing',
                status: 'completed',
                time: '19:15 — 21:00',
                durationMin: 105,
                exposure: { grip: 3, pull: 3, push: 0, shoulder: 2, core: 2 },
                notes: 'Target: 7A boulder circuits + board contact power.',
                constraintRationale: 'Executed. 48h finger tendon recovery timer initiated.',
            },
        ],
        nutrition: {
            caloricDelta: -120,
            freshScorePct: 74,
            ratioNaK: 0.88,
        },
    },
    {
        id: '2026-09-15',
        dateNum: 15,
        dayOfWeek: 'TUE',
        loadScore: 42,
        loadLabel: 'Light',
        events: [
            {
                id: 'e-3',
                title: 'Strategy Workshops',
                subtitle: 'Continuous meetings',
                category: 'work',
                status: 'constraint',
                time: '09:30 — 17:30',
                durationMin: 480,
            },
            {
                id: 'e-4',
                title: 'Push & Scapular Micro',
                subtitle: 'Antagonist compensation',
                category: 'strength',
                status: 'completed',
                time: '18:15 — 18:45',
                durationMin: 30,
                exposure: { grip: 0, pull: 0, push: 2, shoulder: 2, core: 1 },
                notes: 'Overhead kettlebell presses, ring dips & scap pull-ins.',
                constraintRationale: 'Zero pull/grip stimulus to respect Monday recovery.',
            },
            {
                id: 'e-5',
                title: 'Team Dinner',
                subtitle: 'Tapas & Social drinks',
                category: 'social',
                status: 'completed',
                time: '20:45 — 23:00',
                durationMin: 135,
                notes: 'High sodium intake compensated with baseline hydration.',
            },
        ],
        nutrition: {
            caloricDelta: 620,
            freshScorePct: 35,
            ratioNaK: 1.45,
            socialExposure: 'Social Feast',
        },
    },
    {
        id: '2026-09-16',
        dateNum: 16,
        dayOfWeek: 'WED',
        loadScore: 48,
        loadLabel: 'Light',
        events: [
            {
                id: 'e-6',
                title: 'Aerobic Zone 2',
                subtitle: 'Steady State Endurance',
                category: 'aerobic',
                status: 'planned',
                time: '18:30 — 19:25',
                durationMin: 55,
                exposure: { grip: 0, pull: 0, push: 0, shoulder: 0, core: 1 },
                notes: 'Low eccentric cost. Flushes metabolic byproducts before Thursday.',
                constraintRationale: 'Keeps upper body fresh for planned strength workout.',
            },
        ],
        nutrition: {
            caloricDelta: -180,
            freshScorePct: 82,
            ratioNaK: 0.72,
        },
    },
    {
        id: '2026-09-17',
        dateNum: 17,
        dayOfWeek: 'THU',
        loadScore: 72,
        loadLabel: 'Heavy',
        events: [
            {
                id: 'e-7',
                title: 'Compact Strength',
                subtitle: 'Lower Posterior & Chest',
                category: 'strength',
                status: 'planned',
                time: '18:00 — 19:10',
                durationMin: 70,
                exposure: { grip: 1, pull: 1, push: 3, shoulder: 2, core: 2 },
                notes: 'Romanian deadlifts, weighted push-ups & anti-rotational core.',
                constraintRationale: 'Scheduled before wind trip to ensure full weekly muscle coverage.',
            },
            {
                id: 'e-8',
                title: 'Corporate Dinner',
                subtitle: 'Restaurante Asador',
                category: 'social',
                status: 'planned',
                time: '21:00 — 23:30',
                durationMin: 150,
            },
        ],
        nutrition: {
            caloricDelta: 540,
            freshScorePct: 40,
            ratioNaK: 1.32,
            socialExposure: 'Business Dinner',
        },
    },
    {
        id: '2026-09-18',
        dateNum: 18,
        dayOfWeek: 'FRI',
        isToday: true,
        loadScore: 94,
        loadLabel: 'Peak',
        events: [
            {
                id: 'e-9',
                title: 'Windsurf / Wingfoil',
                subtitle: 'Embalse del Ebro · 24-28 knots',
                category: 'windsurf',
                status: 'planned',
                time: '14:30 — 18:00',
                durationMin: 210,
                exposure: { grip: 3, pull: 3, push: 1, shoulder: 3, core: 3 },
                notes: 'High gust wind forecast. Spontaneous outdoor adaptation.',
                constraintRationale: 'Dominates calendar. Suppresses Saturday indoor sessions.',
            },
        ],
        nutrition: {
            caloricDelta: -750,
            freshScorePct: 65,
            ratioNaK: 0.95,
        },
    },
    {
        id: '2026-09-19',
        dateNum: 19,
        dayOfWeek: 'SAT',
        loadScore: 88,
        loadLabel: 'Peak',
        events: [
            {
                id: 'e-10',
                title: 'Outdoor Crag Climbing',
                subtitle: 'Cuenca · Las Hoces (Limestone)',
                category: 'climbing',
                status: 'planned',
                time: '11:00 — 17:30',
                durationMin: 390,
                exposure: { grip: 3, pull: 2, push: 0, shoulder: 2, core: 2 },
                notes: 'Sustained endurance routes (6c - 7b). Campervan base.',
                constraintRationale: 'Outdoor trip. High grip strain.',
            },
            {
                id: 'e-11',
                title: 'Crag Dinner & Fire',
                subtitle: 'Campervan Cookout',
                category: 'social',
                status: 'planned',
                time: '20:30 — 22:30',
                durationMin: 120,
            },
        ],
        nutrition: {
            caloricDelta: 210,
            freshScorePct: 58,
            ratioNaK: 1.05,
        },
    },
    {
        id: '2026-09-20',
        dateNum: 20,
        dayOfWeek: 'SUN',
        loadScore: 25,
        loadLabel: 'Light',
        events: [
            {
                id: 'e-12',
                title: 'Mobility & Fascial Flow',
                subtitle: 'Deep recovery & hips',
                category: 'mobility',
                status: 'planned',
                time: '10:30 — 11:15',
                durationMin: 45,
                exposure: { grip: 0, pull: 0, push: 0, shoulder: 1, core: 1 },
                notes: 'Low systemic strain. Restores tissue elasticity.',
                constraintRationale: 'Permits neural rest prior to Week 39.',
            },
        ],
        nutrition: {
            caloricDelta: -250,
            freshScorePct: 88,
            ratioNaK: 0.65,
        },
    },
];

// --- STYLING TOKEN HELPERS ---
const CATEGORY_COLORS: Record<Category, { text: string; bg: string; border: string; accent: string }> = {
    climbing: { text: 'text-[#4FE3C1]', bg: 'bg-[#4FE3C1]/5', border: 'border-[#4FE3C1]/30', accent: '#4FE3C1' },
    strength: { text: 'text-[#3B82F6]', bg: 'bg-[#3B82F6]/5', border: 'border-[#3B82F6]/30', accent: '#3B82F6' },
    windsurf: { text: 'text-[#38BDF8]', bg: 'bg-[#38BDF8]/5', border: 'border-[#38BDF8]/30', accent: '#38BDF8' },
    aerobic: { text: 'text-[#818CF8]', bg: 'bg-[#818CF8]/5', border: 'border-[#818CF8]/30', accent: '#818CF8' },
    work: { text: 'text-[#94A3B8]', bg: 'bg-[#94A3B8]/5', border: 'border-[#94A3B8]/20', accent: '#64748B' },
    social: { text: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/5', border: 'border-[#F59E0B]/30', accent: '#F59E0B' },
    mobility: { text: 'text-[#55E3D0]', bg: 'bg-[#55E3D0]/5', border: 'border-[#55E3D0]/30', accent: '#55E3D0' },
};

export default function CalendarLabMockup() {
    const [selectedDayId, setSelectedDayId] = useState<string | null>(null);
    const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);
    const [hoveredDayId, setHoveredDayId] = useState<string | null>(null);

    const selectedDay = useMemo(() => {
        return MOCK_WEEK.find((d) => d.id === selectedDayId) || null;
    }, [selectedDayId]);

    const activeHoverEvent = useMemo(() => {
        if (!hoveredEventId) return null;
        for (const d of MOCK_WEEK) {
            const ev = d.events.find((e) => e.id === hoveredEventId);
            if (ev) return ev;
        }
        return null;
    }, [hoveredEventId]);

    return (
        <div className="relative min-h-screen w-full bg-[#05070A] text-[#D8DEE5] selection:bg-[#4FE3C1] selection:text-black overflow-hidden font-sans">
            {/* Background Precision Grid */}
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-40"
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* --- GLOBAL INSTRUMENT HEADER --- */}
            <header className="relative z-20 border-b border-white/[0.05] bg-[#05070A]/80 px-8 py-5 backdrop-blur-md">
                <div className="mx-auto flex max-w-[1600px] items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2.5">
                            <div className="h-2 w-2 rounded-full bg-[#4FE3C1] shadow-[0_0_10px_#4FE3C1]" />
                            <span className="font-mono text-xs font-semibold tracking-[0.28em] text-white">
                                VICTUS <span className="text-[#4FE3C1]">LAB</span>
                            </span>
                        </div>
                        <div className="h-3 w-[1px] bg-white/10" />
                        <span className="font-mono text-[11px] uppercase tracking-widest text-[#626D7C]">
                            Adaptive Calendar Prototype
                        </span>
                    </div>

                    {/* Temporal Position Metadata */}
                    <div className="flex items-center gap-8 font-mono text-xs">
                        <div className="flex items-center gap-2">
                            <span className="text-white font-medium">WEEK 38</span>
                            <span className="text-[#626D7C]">·</span>
                            <span className="text-[#A0ABC0]">14 — 20 SEP 2026</span>
                        </div>

                        <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] p-0.5">
                            <button className="rounded px-2.5 py-1 text-[11px] font-mono text-white transition hover:bg-white/5">
                                <ChevronLeft className="h-3.5 w-3.5" />
                            </button>
                            <span className="px-2 font-mono text-[10px] uppercase tracking-wider text-[#4FE3C1]">
                                Current
                            </span>
                            <button className="rounded px-2.5 py-1 text-[11px] font-mono text-white transition hover:bg-white/5">
                                <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- 2.5D CONTINUOUS PERFORMANCE LANDSCAPE --- */}
            <main className="relative z-10 mx-auto flex max-w-[1600px] flex-col px-8 pt-8 pb-12">
                {/* Landscape Status Subheader */}
                <div className="mb-6 flex items-end justify-between border-b border-white/[0.04] pb-4">
                    <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#626D7C]">
                            Multi-Sport Exposure & Constraint Engine
                        </span>
                        <h1 className="mt-1 font-sans text-2xl font-light tracking-tight text-white">
                            Weekly Performance Landscape
                        </h1>
                    </div>

                    <div className="flex items-center gap-6 font-mono text-xs text-[#626D7C]">
                        <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                            <span>Completed</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full border border-white/60" />
                            <span>Planned (Adaptive)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#64748B]" />
                            <span>Real-Life Constraint</span>
                        </div>
                    </div>
                </div>

                {/* 2.5D SPATIAL STAGE CONTAINER */}
                <div
                    className="relative min-h-[640px] w-full"
                    style={{ perspective: '1800px' }}
                >
                    <motion.div
                        layout
                        className="grid h-full w-full grid-cols-7 divide-x divide-white/[0.05] border-y border-white/[0.05] bg-[#0B0E14]/40 backdrop-blur-sm"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {MOCK_WEEK.map((day) => {
                            const isSelected = selectedDayId === day.id;
                            const hasSelection = selectedDayId !== null;

                            // 2.5D Spatial Transformation:
                            // - If this day is selected: translateZ forward (+60px), scale up slightly.
                            // - If another day is selected: translateZ backward (-80px), scale down, opacity drops.
                            let zOffset = 0;
                            let scaleOffset = 1;
                            let opacityOffset = 1;

                            if (hasSelection) {
                                if (isSelected) {
                                    zOffset = 50;
                                    scaleOffset = 1.02;
                                    opacityOffset = 1;
                                } else {
                                    zOffset = -60;
                                    scaleOffset = 0.98;
                                    opacityOffset = 0.35;
                                }
                            }

                            return (
                                <motion.div
                                    key={day.id}
                                    onClick={() => setSelectedDayId(isSelected ? null : day.id)}
                                    onMouseEnter={() => setHoveredDayId(day.id)}
                                    onMouseLeave={() => setHoveredDayId(null)}
                                    animate={{
                                        z: zOffset,
                                        scale: scaleOffset,
                                        opacity: opacityOffset,
                                    }}
                                    transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                                    className={`group relative flex flex-col justify-between p-4.5 transition-colors cursor-pointer select-none ${isSelected
                                            ? 'bg-[#141822]/90 shadow-[0_0_50px_rgba(0,0,0,0.8)] ring-1 ring-[#4FE3C1]/30 z-30'
                                            : 'hover:bg-white/[0.015]'
                                        }`}
                                >
                                    {/* --- TOP: DAY TYPOGRAPHY & INDICATORS --- */}
                                    <div>
                                        <div className="flex items-baseline justify-between">
                                            <span className={`font-mono text-xs font-semibold tracking-wider ${day.isToday ? 'text-[#4FE3C1]' : 'text-[#626D7C]'
                                                }`}>
                                                {day.dayOfWeek}
                                            </span>
                                            {day.isToday && (
                                                <span className="rounded bg-[#4FE3C1]/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#4FE3C1]">
                                                    Today
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-1 flex items-baseline gap-2">
                                            <span className="font-mono text-3xl font-light text-white tracking-tight tabular-nums">
                                                {day.dateNum}
                                            </span>
                                            <span className={`font-mono text-[10px] uppercase ${day.loadLabel === 'Peak' ? 'text-[#FF4B4B]' :
                                                    day.loadLabel === 'Heavy' ? 'text-[#F59E0B]' :
                                                        'text-[#626D7C]'
                                                }`}>
                                                {day.loadLabel}
                                            </span>
                                        </div>

                                        {/* Hairline spacer */}
                                        <div className="my-4 h-[1px] w-full bg-white/[0.05]" />

                                        {/* --- CENTER: CONTINUOUS PERFORMANCE EVENTS --- */}
                                        <div className="flex flex-col gap-2.5 min-h-[300px]">
                                            {day.events.map((ev) => {
                                                const isCompleted = ev.status === 'completed';
                                                const isConstraint = ev.status === 'constraint';
                                                const colorStyle = CATEGORY_COLORS[ev.category];

                                                return (
                                                    <motion.div
                                                        key={ev.id}
                                                        onMouseEnter={(e) => {
                                                            e.stopPropagation();
                                                            setHoveredEventId(ev.id);
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.stopPropagation();
                                                            setHoveredEventId(null);
                                                        }}
                                                        whileHover={{ y: -2 }}
                                                        className={`relative rounded-lg p-3 transition-all ${isCompleted
                                                                ? 'bg-[#171B22] border border-white/[0.12] text-white shadow-sm'
                                                                : isConstraint
                                                                    ? 'bg-white/[0.015] border border-dashed border-white/[0.1] text-[#94A3B8]'
                                                                    : 'bg-white/[0.02] border border-white/[0.18] text-white' // Planned outline
                                                            }`}
                                                    >
                                                        {/* Accent edge indicator */}
                                                        <div
                                                            className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r"
                                                            style={{ backgroundColor: colorStyle.accent }}
                                                        />

                                                        <div className="flex items-center justify-between pl-1.5 font-mono text-[9px] text-[#626D7C]">
                                                            <span>{ev.time}</span>
                                                            <span className="uppercase">{ev.durationMin}m</span>
                                                        </div>

                                                        <div className="mt-1 pl-1.5">
                                                            <h4 className="font-sans text-xs font-medium leading-snug tracking-tight text-white">
                                                                {ev.title}
                                                            </h4>
                                                            {ev.subtitle && (
                                                                <p className="mt-0.5 font-mono text-[10px] text-[#626D7C] line-clamp-1">
                                                                    {ev.subtitle}
                                                                </p>
                                                            )}
                                                        </div>

                                                        {/* Exposure Micro-Dots if available */}
                                                        {ev.exposure && (
                                                            <div className="mt-2.5 flex items-center gap-3 border-t border-white/[0.04] pt-2 pl-1.5 font-mono text-[9px] text-[#626D7C]">
                                                                {ev.exposure.grip > 0 && (
                                                                    <span className="text-[#4FE3C1]">Grip {ev.exposure.grip}</span>
                                                                )}
                                                                {ev.exposure.pull > 0 && (
                                                                    <span className="text-[#3B82F6]">Pull {ev.exposure.pull}</span>
                                                                )}
                                                                {ev.exposure.push > 0 && (
                                                                    <span className="text-[#F59E0B]">Push {ev.exposure.push}</span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* --- BOTTOM: MUSCLE STRAIN & NUTRITION TELEMETRY --- */}
                                    <div className="border-t border-white/[0.05] pt-3.5 mt-4 space-y-3">
                                        {/* Muscle Load Vector Strip */}
                                        <div>
                                            <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-[#626D7C]">
                                                <span>Tissue Strain</span>
                                                <span className="tabular-nums">{day.loadScore}%</span>
                                            </div>
                                            <div className="mt-1.5 flex h-1 w-full gap-0.5 rounded-full bg-white/[0.04] overflow-hidden">
                                                <div
                                                    className={`h-full ${day.loadScore > 80 ? 'bg-[#FF4B4B]' :
                                                            day.loadScore > 50 ? 'bg-[#F59E0B]' :
                                                                'bg-[#4FE3C1]'
                                                        }`}
                                                    style={{ width: `${day.loadScore}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Fuel Telemetry */}
                                        <div className="flex items-baseline justify-between font-mono text-[10px]">
                                            <span className="text-[#626D7C]">Fuel:</span>
                                            <span className={day.nutrition.caloricDelta > 0 ? 'text-[#F59E0B]' : 'text-[#4FE3C1]'}>
                                                {day.nutrition.caloricDelta > 0 ? `+${day.nutrition.caloricDelta}` : day.nutrition.caloricDelta} kcal
                                            </span>
                                            <span className="text-[#626D7C]">Na/K {day.nutrition.ratioNaK}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* --- LAYER 3: SPATIAL DEEP-DIVE INSPECTOR PANEL --- */}
                    <AnimatePresence>
                        {selectedDay && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="absolute right-0 top-0 bottom-0 z-40 w-full max-w-md border-l border-white/[0.12] bg-[#0A0D13]/95 p-7 shadow-[-30px_0_90px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-y-auto"
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                                    <div>
                                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#4FE3C1]">
                                            Deep Dive Telemetry · Layer 3
                                        </span>
                                        <h3 className="mt-1 font-sans text-xl font-light text-white">
                                            {selectedDay.dayOfWeek}, September {selectedDay.dateNum}
                                        </h3>
                                    </div>
                                    <button
                                        onClick={() => setSelectedDayId(null)}
                                        className="rounded-lg p-1.5 text-[#626D7C] hover:bg-white/5 hover:text-white transition"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="mt-6 space-y-6">
                                    {/* Consecutive-Day Constraint Logic */}
                                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#626D7C] block mb-2">
                                            Adaptive Scheduling Rules
                                        </span>
                                        <p className="font-sans text-xs leading-relaxed text-[#A0ABC0]">
                                            {selectedDay.events.find((e) => e.constraintRationale)?.constraintRationale ||
                                                'No conflicting tissue stress detected. Available for secondary athletic stimuli.'}
                                        </p>
                                    </div>

                                    {/* Muscle Group Coverage Vector */}
                                    <div className="space-y-3">
                                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#626D7C]">
                                            Cumulative Physical Exposure
                                        </span>
                                        <div className="space-y-2">
                                            {[
                                                { name: 'Grip & Finger Flexors', level: selectedDay.loadScore > 60 ? 3 : 1 },
                                                { name: 'Posterior Pulling Chain', level: selectedDay.loadScore > 50 ? 2 : 0 },
                                                { name: 'Antagonist Pushing & Scapular', level: selectedDay.dateNum === 15 ? 2 : 0 },
                                                { name: 'Core Tension & Anti-Rotation', level: selectedDay.loadScore > 70 ? 3 : 1 },
                                            ].map((item) => (
                                                <div key={item.name} className="flex items-center justify-between font-mono text-xs">
                                                    <span className="text-[#A0ABC0]">{item.name}</span>
                                                    <div className="flex gap-1">
                                                        {[1, 2, 3].map((dot) => (
                                                            <div
                                                                key={dot}
                                                                className={`h-2 w-2 rounded-full ${dot <= item.level ? 'bg-[#4FE3C1]' : 'bg-white/10'
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Nutritional Consequence */}
                                    <div className="space-y-3 border-t border-white/[0.06] pt-6">
                                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#626D7C]">
                                            Nutritional Correlation
                                        </span>
                                        <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                                            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                                                <span className="text-[10px] text-[#626D7C] block">Energy Balance</span>
                                                <span className="mt-1 text-base font-medium text-white tabular-nums">
                                                    {selectedDay.nutrition.caloricDelta > 0 ? `+${selectedDay.nutrition.caloricDelta}` : selectedDay.nutrition.caloricDelta} kcal
                                                </span>
                                            </div>
                                            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                                                <span className="text-[10px] text-[#626D7C] block">Na / K Ratio</span>
                                                <span className="mt-1 text-base font-medium text-white tabular-nums">
                                                    {selectedDay.nutrition.ratioNaK}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* --- WEEKLY LOAD TERRAIN CURVE (BOTTOM HUD) --- */}
                <div className="mt-8 border-t border-white/[0.05] pt-6">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#626D7C] mb-3">
                        <span>Weekly Acute Load Landscape</span>
                        <span>Capacity Horizon: 75% Optimal</span>
                    </div>

                    <div className="relative h-20 w-full overflow-hidden">
                        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 700 80">
                            <defs>
                                <linearGradient id="terrainGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#4FE3C1" stopOpacity="0.25" />
                                    <stop offset="100%" stopColor="#4FE3C1" stopOpacity="0.0" />
                                </linearGradient>
                            </defs>

                            {/* Area fill */}
                            <path
                                d="M 0 80 L 50 30 L 150 55 L 250 50 L 350 25 L 450 10 L 550 15 L 650 65 L 700 80 Z"
                                fill="url(#terrainGrad)"
                            />

                            {/* Stroke line */}
                            <path
                                d="M 0 80 L 50 30 L 150 55 L 250 50 L 350 25 L 450 10 L 550 15 L 650 65 L 700 80"
                                fill="none"
                                stroke="#4FE3C1"
                                strokeWidth="1.5"
                            />

                            {/* Data points */}
                            {[
                                { x: 50, y: 30 },
                                { x: 150, y: 55 },
                                { x: 250, y: 50 },
                                { x: 350, y: 25 },
                                { x: 450, y: 10 },
                                { x: 550, y: 15 },
                                { x: 650, y: 65 },
                            ].map((pt, idx) => (
                                <circle
                                    key={idx}
                                    cx={pt.x}
                                    cy={pt.y}
                                    r="3.5"
                                    className="fill-[#05070A] stroke-[#4FE3C1] stroke-2 transition-all hover:r-5 cursor-pointer"
                                />
                            ))}
                        </svg>
                    </div>
                </div>
            </main>
        </div>
    );
}