import { CookingMethod } from '@/types/nutrition';

export interface CookingModifier {
    fatDeltaGrams: number;
    potassiumRetentionRatio: number;
    vitaminCRetentionRatio: number;
    freshScorePenalty: number;
}

export const COOKING_MODIFIERS: Record<CookingMethod, CookingModifier> = {
    raw: {
        fatDeltaGrams: 0,
        potassiumRetentionRatio: 1.0,
        vitaminCRetentionRatio: 1.0,
        freshScorePenalty: 0,
    },
    steam_microwave: {
        fatDeltaGrams: 0,
        potassiumRetentionRatio: 0.95,
        vitaminCRetentionRatio: 0.85,
        freshScorePenalty: 0,
    },
    grilled_pan: {
        fatDeltaGrams: 6,
        potassiumRetentionRatio: 0.9,
        vitaminCRetentionRatio: 0.7,
        freshScorePenalty: 0,
    },
    roasted_baked: {
        fatDeltaGrams: 8,
        potassiumRetentionRatio: 0.85,
        vitaminCRetentionRatio: 0.55,
        freshScorePenalty: 1,
    },
    slow_cook_stew: {
        // El caldo se retiene: máxima conservación de potasio y minerales
        fatDeltaGrams: 5,
        potassiumRetentionRatio: 0.98,
        vitaminCRetentionRatio: 0.45,
        freshScorePenalty: 0,
    },
    boiled_drained: {
        // El agua se tira: lixiviación severa de minerales hidrosolubles
        fatDeltaGrams: 0,
        potassiumRetentionRatio: 0.55,
        vitaminCRetentionRatio: 0.4,
        freshScorePenalty: 1,
    },
    fried_battered: {
        // Alta absorción de aceite y degradación de frescura
        fatDeltaGrams: 16,
        potassiumRetentionRatio: 0.7,
        vitaminCRetentionRatio: 0.3,
        freshScorePenalty: 2,
    },
};