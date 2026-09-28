'use client';

import React, { useState, useMemo } from 'react';
import {
    X,
    Search,
    Plus,
    Sparkles,
    Check,
    ChefHat,
    ArrowRight,
    Wine,
    CakeSlice,
    ArrowLeft
} from 'lucide-react';
import {
    FoodArchetype,
    CuisineOrigin,
    CookingMethod,
    PortionSize,
    Language,
    MealSlot
} from '@/types/nutrition';
import { COOKING_MODIFIERS } from '@/data/cookingModifiers';

interface MealsBrowserProps {
    archetypes: FoodArchetype[];
    lang: Language;
    initialDate: string;
    initialSlot: MealSlot;
    onClose: () => void;
    onConfirmAdd: (entry: {
        archetypeId: string;
        date: string;
        slot: MealSlot;
        portion: PortionSize;
        cookingMethod?: CookingMethod;
        alcoholUnits: number;
        hasDessert: boolean;
    }) => void;
}

export const MealsBrowser: React.FC<MealsBrowserProps> = ({
    archetypes,
    lang,
    initialDate,
    initialSlot,
    onClose,
    onConfirmAdd,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrigin, setSelectedOrigin] = useState<CuisineOrigin | 'all'>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedArchId, setSelectedArchId] = useState<string>(archetypes[0]?.id || '');
    const [portion, setPortion] = useState<PortionSize>('standard');
    const [alcoholUnits, setAlcoholUnits] = useState(0);
    const [hasDessert, setHasDessert] = useState(false);
    const [targetSlot, setTargetSlot] = useState<MealSlot>(initialSlot);

    // Filtrado seguro con fallbacks
    const filteredArchetypes = useMemo(() => {
        return archetypes.filter((arch) => {
            const name = arch.name?.[lang] || arch.name?.['en'] || '';
            const desc = arch.description?.[lang] || arch.description?.['en'] || '';
            const matchesSearch =
                name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                desc.toLowerCase().includes(searchQuery.toLowerCase());

            const archOrigin = arch.origin || 'global';
            const matchesOrigin = selectedOrigin === 'all' || archOrigin === selectedOrigin;
            const matchesCategory = selectedCategory === 'all' || arch.category === selectedCategory;
            return matchesSearch && matchesOrigin && matchesCategory;
        });
    }, [archetypes, searchQuery, selectedOrigin, selectedCategory, lang]);

    const selectedArch = useMemo(() => {
        return archetypes.find((a) => a.id === selectedArchId) || archetypes[0];
    }, [archetypes, selectedArchId]);

    // Telemetría en tiempo real para la ficha inferior
    const telemetryPreview = useMemo(() => {
        if (!selectedArch) return null;
        const pMultiplier = portion === 'light' ? 0.7 : portion === 'heavy' ? 1.35 : 1.0;
        const defaultCooking = selectedArch.defaultCooking || 'grilled_pan';
        const mod = COOKING_MODIFIERS[defaultCooking] || COOKING_MODIFIERS.raw;
        const addedFatKcal = mod.fatDeltaGrams * 9;
        const totalKcal = Math.round((selectedArch.nutrients?.kcal ?? 500) * pMultiplier + addedFatKcal + alcoholUnits * 120 + (hasDessert ? 320 : 0));
        const sodium = Math.round((selectedArch.nutrients?.sodiumMg ?? 800) * pMultiplier);
        const potassium = Math.round((selectedArch.nutrients?.potassiumMg ?? 600) * pMultiplier * mod.potassiumRetentionRatio);
        const ratioNaK = potassium > 0 ? (sodium / potassium).toFixed(2) : '0';

        return {
            kcal: totalKcal,
            protein: Math.round((selectedArch.nutrients?.proteinG ?? 30) * pMultiplier),
            carbs: Math.round((selectedArch.nutrients?.carbsG ?? 50) * pMultiplier),
            fat: Math.round((selectedArch.nutrients?.fatG ?? 15) * pMultiplier + mod.fatDeltaGrams),
            fiber: Math.round((selectedArch.nutrients?.fiberG ?? 5) * pMultiplier),
            sodium,
            potassium,
            ratioNaK,
        };
    }, [selectedArch, portion, alcoholUnits, hasDessert]);

    return (
        <div className="flex h-full w-full flex-col bg-[#0A0C0F] text-[#D8DEE5]">
            {/* 1. Cabecera del Panel */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/[0.08] bg-[#11141A]/90 px-6 py-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-[#88929E] transition-all hover:border-[#4FE3C1] hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </button>
                    <div>
                        <div className="flex items-center gap-2">
                            <ChefHat className="h-4 w-4 text-[#4FE3C1]" />
                            <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-white">
                                {lang === 'es' ? 'Catálogo de Comidas' : 'Meal Archetypes'}
                            </h2>
                        </div>
                        <p className="text-[11px] text-[#88929E]">
                            {lang === 'es' ? 'Selecciona un plato para proyectar su telemetría' : 'Select a dish to project nutritional impact'}
                        </p>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 font-mono text-xs text-[#88929E] transition-all hover:border-white/[0.2] hover:text-white"
                >
                    <X className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">ESC</span>
                </button>
            </div>

            {/* 2. Cuerpo Principal: Filtros + Parrilla */}
            <div className="flex flex-1 min-h-0 flex-col overflow-hidden lg:flex-row">
                {/* Barra Lateral de Filtros */}
                <aside className="w-full shrink-0 border-b border-white/[0.08] bg-[#11141A]/40 p-5 backdrop-blur-sm lg:w-64 lg:border-b-0 lg:border-r space-y-6 overflow-y-auto">
                    {/* Buscador */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#88929E]" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={lang === 'es' ? 'Buscar plato...' : 'Search dish...'}
                            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-2 pl-9 pr-3 text-xs text-white placeholder-[#88929E] transition-colors focus:border-[#4FE3C1] focus:outline-none"
                        />
                    </div>

                    {/* Filtro: Origen */}
                    <div className="space-y-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#88929E]">
                            {lang === 'es' ? 'Origen Culinario' : 'Origin'}
                        </span>
                        <div className="flex flex-wrap gap-1.5 lg:flex-col">
                            {[
                                { id: 'all', label: lang === 'es' ? 'Todos' : 'All', flag: '🌐' },
                                { id: 'japanese', label: 'Japón / Asia', flag: '🇯🇵' },
                                { id: 'mediterranean', label: 'Mediterráneo', flag: '🇪🇸' },
                                { id: 'american', label: 'American Fast', flag: '🇺🇸' },
                                { id: 'global', label: 'Global Fusión', flag: '🌍' },
                            ].map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => setSelectedOrigin(opt.id as CuisineOrigin | 'all')}
                                    className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-left font-mono text-xs transition-all ${selectedOrigin === opt.id
                                            ? 'border border-[#4FE3C1] bg-[#4FE3C1]/15 font-semibold text-white'
                                            : 'border border-transparent text-[#88929E] hover:bg-white/[0.04] hover:text-[#D8DEE5]'
                                        }`}
                                >
                                    <span>{opt.flag}</span>
                                    <span>{opt.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Filtro: Tipo de Comida */}
                    <div className="space-y-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#88929E]">
                            {lang === 'es' ? 'Categoría' : 'Category'}
                        </span>
                        <div className="flex flex-wrap gap-1.5 lg:flex-col">
                            {[
                                { id: 'all', label: lang === 'es' ? 'Todas' : 'All' },
                                { id: 'home_cooked', label: lang === 'es' ? 'Casero / Limpio' : 'Home Cooked' },
                                { id: 'retail_convenience', label: lang === 'es' ? 'Convenience / Retail' : 'Retail Grab & Go' },
                                { id: 'restaurant_social', label: lang === 'es' ? 'Restaurante' : 'Restaurant' },
                                { id: 'fast_food', label: lang === 'es' ? 'Fast Food' : 'Fast Food' },
                            ].map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => setSelectedCategory(opt.id)}
                                    className={`rounded-lg px-3 py-1.5 text-left font-mono text-xs transition-all ${selectedCategory === opt.id
                                            ? 'border border-[#3B82F6] bg-[#3B82F6]/15 font-semibold text-white'
                                            : 'border border-transparent text-[#88929E] hover:bg-white/[0.04] hover:text-[#D8DEE5]'
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Parrilla de Platos */}
                <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-4">
                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
                        {filteredArchetypes.map((arch) => {
                            const isSelected = arch.id === selectedArchId;
                            const pG = arch.nutrients?.proteinG ?? 25;
                            const cG = arch.nutrients?.carbsG ?? 40;
                            const fG = arch.nutrients?.fatG ?? 15;
                            const totalMacros = Math.max(1, pG + cG + fG);
                            const proteinPct = Math.round((pG / totalMacros) * 100);
                            const carbsPct = Math.round((cG / totalMacros) * 100);

                            return (
                                <div
                                    key={arch.id}
                                    onClick={() => setSelectedArchId(arch.id)}
                                    className={`group relative flex cursor-pointer flex-col justify-between rounded-2xl border p-4.5 transition-all duration-200 ${isSelected
                                            ? 'border-[#4FE3C1] bg-[#141820] shadow-[0_0_25px_rgba(79,227,193,0.18)] ring-1 ring-[#4FE3C1]'
                                            : 'border-white/[0.06] bg-[#11141A]/80 hover:border-white/[0.2] hover:bg-[#141820]'
                                        }`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="font-mono text-[9px] uppercase tracking-wider text-[#4FE3C1] bg-[#4FE3C1]/10 px-2 py-0.5 rounded-full border border-[#4FE3C1]/20">
                                                {arch.origin || 'global'}
                                            </span>
                                            {isSelected && (
                                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4FE3C1] text-black">
                                                    <Check className="h-3 w-3 stroke-[3]" />
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="mt-2.5 text-sm font-semibold text-white group-hover:text-[#4FE3C1] transition-colors">
                                            {arch.name?.[lang] || arch.name?.['en']}
                                        </h3>
                                        <p className="mt-1 line-clamp-2 text-xs text-[#88929E] leading-relaxed">
                                            {arch.description?.[lang] || arch.description?.['en'] || 'Perfil nutricional calibrado'}
                                        </p>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-2">
                                        <div className="flex items-baseline justify-between font-mono text-xs">
                                            <span className="text-white font-bold tabular-nums">
                                                ~{arch.nutrients?.kcal ?? 500} <span className="text-[10px] font-normal text-[#88929E]">kcal</span>
                                            </span>
                                            <span className="text-[10px] text-[#88929E]">
                                                {pG}g P · {cG}g C · {fG}g G
                                            </span>
                                        </div>

                                        {/* Barra de proporción de macros */}
                                        <div className="flex h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                                            <div style={{ width: `${proteinPct}%` }} className="bg-[#3B82F6]" />
                                            <div style={{ width: `${carbsPct}%` }} className="bg-[#F59E0B]" />
                                            <div style={{ width: `${100 - proteinPct - carbsPct}%` }} className="bg-[#FF6B6B]" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Tarjeta: Añadir Nuevo Plato */}
                        <div className="flex min-h-[160px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.01] p-6 text-center transition-colors hover:border-[#4FE3C1]/50 hover:bg-white/[0.02] cursor-pointer">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.04] text-[#88929E]">
                                <Plus className="h-4 w-4" />
                            </div>
                            <h4 className="mt-2.5 text-xs font-semibold text-white">
                                {lang === 'es' ? 'Añadir Nuevo Plato' : 'Create Custom Dish'}
                            </h4>
                            <p className="mt-0.5 text-[10px] text-[#88929E]">
                                {lang === 'es' ? 'Receta personalizada o scanner' : 'Custom recipe or barcode'}
                            </p>
                            <span className="mt-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#F59E0B]">
                                Roadmap v1.1
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Dock Inferior Fijo: Telemetría y Botón de Asignación */}
            {telemetryPreview && selectedArch && (
                <div className="shrink-0 border-t border-white/[0.12] bg-[#11141A] p-4.5 shadow-[0_-15px_40px_rgba(0,0,0,0.85)]">
                    <div className="mx-auto max-w-7xl flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        {/* Información del plato y micronutrientes */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-[#4FE3C1]" />
                                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                                    {selectedArch.name?.[lang] || selectedArch.name?.['en']}
                                </span>
                                <span className="font-mono text-xs text-[#4FE3C1]">({telemetryPreview.kcal} kcal)</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-[#88929E]">
                                <span className="text-white font-medium">{telemetryPreview.protein}g Proteína</span>
                                <span>·</span>
                                <span>{telemetryPreview.carbs}g Carbs</span>
                                <span>·</span>
                                <span>{telemetryPreview.fat}g Grasas</span>
                                <span>·</span>
                                <span className={Number(telemetryPreview.ratioNaK) > 1.2 ? 'text-[#FF6B6B]' : 'text-[#4FE3C1]'}>
                                    Ratio Na/K: {telemetryPreview.ratioNaK}
                                </span>
                                <span>·</span>
                                <span>Potasio: {telemetryPreview.potassium} mg</span>
                                <span>·</span>
                                <span>Sodio: {telemetryPreview.sodium} mg</span>
                            </div>
                        </div>

                        {/* Controles de porción y acción */}
                        <div className="flex flex-wrap items-center gap-2.5">
                            {/* Selector de porción */}
                            <div className="flex rounded-xl border border-white/[0.08] bg-white/[0.02] p-0.5">
                                {(['light', 'standard', 'heavy'] as PortionSize[]).map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPortion(p)}
                                        className={`rounded-lg px-2.5 py-1 font-mono text-[10px] uppercase transition-all ${portion === p
                                                ? 'bg-[#4FE3C1] font-bold text-black shadow-sm'
                                                : 'text-[#88929E] hover:text-white'
                                            }`}
                                    >
                                        {p === 'light' ? '0.7x' : p === 'standard' ? '1.0x' : '1.35x'}
                                    </button>
                                ))}
                            </div>

                            {/* Extras: Alcohol y Postre */}
                            <div className="flex gap-1">
                                <button
                                    onClick={() => setAlcoholUnits((u) => (u > 0 ? 0 : 1))}
                                    className={`rounded-lg border px-2.5 py-1.5 text-xs transition-all ${alcoholUnits > 0
                                            ? 'border-rose-500/40 bg-rose-500/15 text-[#FF6B6B]'
                                            : 'border-white/[0.08] text-[#88929E]'
                                        }`}
                                >
                                    <Wine className="h-3.5 w-3.5" />
                                </button>
                                <button
                                    onClick={() => setHasDessert((d) => !d)}
                                    className={`rounded-lg border px-2.5 py-1.5 text-xs transition-all ${hasDessert
                                            ? 'border-amber-500/40 bg-amber-500/15 text-[#F59E0B]'
                                            : 'border-white/[0.08] text-[#88929E]'
                                        }`}
                                >
                                    <CakeSlice className="h-3.5 w-3.5" />
                                </button>
                            </div>

                            {/* Selector de Slot */}
                            <select
                                value={targetSlot}
                                onChange={(e) => setTargetSlot(e.target.value as MealSlot)}
                                className="rounded-xl border border-white/[0.08] bg-[#141820] px-3 py-2 font-mono text-xs text-white focus:border-[#4FE3C1] focus:outline-none"
                            >
                                <option value="lunch">{lang === 'es' ? 'Comida' : 'Lunch'}</option>
                                <option value="dinner">{lang === 'es' ? 'Cena' : 'Dinner'}</option>
                            </select>

                            {/* Botón de confirmación */}
                            <button
                                onClick={() =>
                                    onConfirmAdd({
                                        archetypeId: selectedArch.id,
                                        date: initialDate,
                                        slot: targetSlot,
                                        portion,
                                        alcoholUnits,
                                        hasDessert,
                                    })
                                }
                                className="flex items-center gap-2 rounded-xl bg-[#4FE3C1] px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(79,227,193,0.3)] transition-all hover:bg-[#45ccad]"
                            >
                                <span>{lang === 'es' ? 'Añadir a la Agenda' : 'Assign to Day'}</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};