'use client';

import { useMemo } from 'react';
import { MealEntry, FoodArchetype, PortionSize } from '@/types/nutrition';
import { COOKING_MODIFIERS } from '@/data/cookingModifiers';

export interface TelemetrySummary {
    totalKcal: number;
    caloricDelta: number;
    avgDailyProtein: number;
    ratioNaK: number;
    freshIndexPct: number;
    dailyAvgSodium: number;
    dailyAvgPotassium: number;
    dailyAvgMagnesium: number;
    dailyAvgIron: number;
    dailyAvgCalcium: number;
    dailyAvgVitaminC: number;
    dailyAvgB12: number;
    dailyAvgFiber: number;
}

const PORTION_SCALES: Record<PortionSize, number> = {
    light: 0.7,
    standard: 1.0,
    heavy: 1.35,
};

export function useNutritionTelemetry(
    meals: MealEntry[],
    archetypesMap: Map<string, FoodArchetype>
): TelemetrySummary {
    return useMemo(() => {
        let totalKcal = 0;
        let totalProtein = 0;
        let totalSodium = 0;
        let totalPotassium = 0;
        let totalMagnesium = 0;
        let totalIron = 0;
        let totalCalcium = 0;
        let totalVitaminC = 0;
        let totalB12 = 0;
        let totalFiber = 0;
        let freshPointsSum = 0;
        const mealCount = meals.length;

        meals.forEach((meal) => {
            const arch = archetypesMap.get(meal.archetypeId);
            if (!arch) return;

            const scale = PORTION_SCALES[meal.portion];
            const cookingMethod = meal.cookingMethod || arch.defaultCooking;
            const mod = COOKING_MODIFIERS[cookingMethod] || COOKING_MODIFIERS.raw;

            const fatKcalAddition = mod.fatDeltaGrams * 9;
            const alcoholKcal = meal.alcoholUnits * 120;
            const dessertKcal = meal.hasDessert ? 320 : 0;

            totalKcal += arch.nutrients.kcal * scale + fatKcalAddition + alcoholKcal + dessertKcal;
            totalProtein += arch.nutrients.proteinG * scale;
            totalSodium += arch.nutrients.sodiumMg * scale;
            totalPotassium += arch.nutrients.potassiumMg * scale * mod.potassiumRetentionRatio;
            totalMagnesium += arch.nutrients.magnesiumMg * scale * mod.potassiumRetentionRatio;
            totalIron += arch.nutrients.ironMg * scale;
            totalCalcium += arch.nutrients.calciumMg * scale;
            totalVitaminC += arch.nutrients.vitaminCMg * scale * mod.vitaminCRetentionRatio;
            totalB12 += arch.nutrients.vitaminB12Ug * scale;
            totalFiber += arch.nutrients.fiberG * scale;

            const adjustedFreshScore = Math.max(0, arch.nutrients.freshVegetableScore - mod.freshScorePenalty);
            freshPointsSum += adjustedFreshScore;
        });

        const baselineMaintenanceWeekly = 2200 * 7;
        const expectedElapsedKcal = baselineMaintenanceWeekly * (mealCount / 14);
        const caloricDelta = Math.round(totalKcal - expectedElapsedKcal);

        return {
            totalKcal: Math.round(totalKcal),
            caloricDelta,
            avgDailyProtein: mealCount > 0 ? Math.round(totalProtein / 7) : 0,
            ratioNaK: totalPotassium > 0 ? Number((totalSodium / totalPotassium).toFixed(2)) : 0,
            freshIndexPct: mealCount > 0 ? Math.round((freshPointsSum / (mealCount * 3)) * 100) : 0,
            dailyAvgSodium: Math.round(totalSodium / 7),
            dailyAvgPotassium: Math.round(totalPotassium / 7),
            dailyAvgMagnesium: Math.round(totalMagnesium / 7),
            dailyAvgIron: Math.round(totalIron / 7),
            dailyAvgCalcium: Math.round(totalCalcium / 7),
            dailyAvgVitaminC: Math.round(totalVitaminC / 7),
            dailyAvgB12: Number((totalB12 / 7).toFixed(1)),
            dailyAvgFiber: Math.round(totalFiber / 7),
        };
    }, [meals, archetypesMap]);
}