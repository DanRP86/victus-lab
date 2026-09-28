export type Language = 'es' | 'en';

export type MealSlot = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type PortionSize = 'light' | 'standard' | 'heavy';

export type CuisineOrigin = 'mediterranean' | 'japanese' | 'american' | 'mexican' | 'nordic' | 'global';

export type CookingMethod =
    | 'raw'
    | 'steam_microwave'
    | 'grilled_pan'
    | 'roasted_baked'
    | 'slow_cook_stew'
    | 'boiled_drained'
    | 'fried_battered';

export interface NutritionalVector {
    kcal: number;
    proteinG: number;
    carbsG: number;
    fatG: number;
    fiberG: number;
    sodiumMg: number;
    potassiumMg: number;
    magnesiumMg: number;
    ironMg: number;
    calciumMg: number;
    vitaminCMg: number;
    vitaminB12Ug: number;
    freshVegetableScore: 0 | 1 | 2 | 3;
}

export interface FoodArchetype {
    id: string;
    code: string;
    origin: CuisineOrigin;
    category: 'fast_food' | 'retail_convenience' | 'restaurant_social' | 'home_cooked';
    name: Record<Language, string>;
    description?: Record<Language, string>;
    basePortionGrams: number;
    defaultCooking: CookingMethod;
    nutrients: NutritionalVector;
}

export interface MealEntry {
    id: string;
    date: string;
    slot: MealSlot;
    archetypeId: string;
    portion: PortionSize;
    cookingMethod?: CookingMethod;
    alcoholUnits: number;
    hasDessert: boolean;
    notes?: string;
}