'use client';

import React from 'react';
import { Flame, Leaf, Activity, CheckCircle2 } from 'lucide-react';
import { TelemetryDial } from './TelemetryDial';
import { TelemetrySummary } from '@/hooks/useNutritionTelemetry';
import { Language } from '@/types/nutrition';

interface TelemetryBarProps {
    telemetry: TelemetrySummary;
    lang: Language;
}

export const TelemetryBar: React.FC<TelemetryBarProps> = ({ telemetry, lang }) => {
    const isSurplus = telemetry.caloricDelta > 200;
    const isHighSodium = telemetry.ratioNaK > 1.2;

    return (
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* 1. Caloric Balance */}
            <TelemetryDial
                label={lang === 'es' ? 'Balance Energético' : 'Caloric Balance'}
                value={telemetry.caloricDelta > 0 ? `+${telemetry.caloricDelta}` : telemetry.caloricDelta}
                unit="kcal"
                subtext={
                    isSurplus
                        ? lang === 'es' ? 'Superávit semanal' : 'Weekly surplus'
                        : lang === 'es' ? 'Zona neutra / déficit' : 'Equilibrium zone'
                }
                progressPct={50 + telemetry.caloricDelta / 30}
                accentColor={isSurplus ? '#FF6B6B' : '#4FE3C1'}
                icon={Flame}
            />

            {/* 2. Fresh & Fiber Score */}
            <TelemetryDial
                label={lang === 'es' ? 'Índice de Frescos' : 'Fresh & Fiber'}
                value={`${telemetry.freshIndexPct}%`}
                subtext={
                    telemetry.freshIndexPct >= 60
                        ? lang === 'es' ? 'Densidad vegetal óptima' : 'Optimal plant density'
                        : lang === 'es' ? 'Déficit de verdura/fibra' : 'Vegetable deficit'
                }
                progressPct={telemetry.freshIndexPct}
                accentColor={telemetry.freshIndexPct < 45 ? '#F59E0B' : '#4FE3C1'}
                icon={Leaf}
            />

            {/* 3. Sodium / Potassium Ratio */}
            <TelemetryDial
                label={lang === 'es' ? 'Ratio Sodio / Potasio' : 'Na / K Ratio'}
                value={telemetry.ratioNaK}
                subtext={
                    isHighSodium
                        ? lang === 'es' ? 'Retención hídrica probable' : 'Elevated vascular stress'
                        : lang === 'es' ? 'Balance celular óptimo (<1.0)' : 'Ideal fluid balance'
                }
                progressPct={telemetry.ratioNaK * 50}
                accentColor={isHighSodium ? '#FF6B6B' : '#3B82F6'}
                icon={Activity}
                badge={isHighSodium ? (lang === 'es' ? 'Exceso' : 'High') : undefined}
            />

            {/* 4. Daily Protein */}
            <TelemetryDial
                label={lang === 'es' ? 'Proteína Diaria' : 'Daily Protein'}
                value={telemetry.avgDailyProtein}
                unit="g / day"
                subtext={
                    telemetry.avgDailyProtein >= 130
                        ? lang === 'es' ? 'Target proteico cubierto' : 'Target reached'
                        : lang === 'es' ? 'Por debajo del objetivo' : 'Below target'
                }
                progressPct={(telemetry.avgDailyProtein / 140) * 100}
                accentColor="#3B82F6"
                icon={CheckCircle2}
            />
        </section>
    );
};