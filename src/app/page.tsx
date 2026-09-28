'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AtmosphericBackground from '@/components/background/AtmosphericBackground';
import HeroSection from '@/components/hero/HeroSection';
import Header from '@/components/dashboard/Header';
import CalendarCycle from '@/components/dashboard/CalendarCycle';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import NutritionChart from '@/components/dashboard/NutritionChart';

export default function VictusPerformanceLaboratory() {
  const [view, setView] = useState<'hero' | 'dashboard'>('hero');

  // Referencias para el control de scroll ciego (evita el bucle infinito)
  const viewRef = useRef(view);
  const isThrottled = useRef(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  // Control de scroll blindado
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isThrottled.current) return;

      if (e.deltaY > 40 && viewRef.current === 'hero') {
        isThrottled.current = true;
        setView('dashboard');
        setTimeout(() => { isThrottled.current = false; }, 1000);
      } else if (e.deltaY < -60 && viewRef.current === 'dashboard') {
        isThrottled.current = true;
        setView('hero');
        setTimeout(() => { isThrottled.current = false; }, 1000);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Motor Parallax 3D Suave
  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (viewRef.current !== 'dashboard') return;
      const xPos = (e.clientX / window.innerWidth) - 0.5;
      const yPos = (e.clientY / window.innerHeight) - 0.5;
      targetRotation.current = { x: yPos * -2.8, y: xPos * 3.8 };
    };

    const tick = () => {
      if (viewRef.current === 'dashboard' && sceneRef.current) {
        currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.08;
        currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.08;
        sceneRef.current.style.transform = `rotateX(${currentRotation.current.x}deg) rotateY(${currentRotation.current.y}deg)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="selection:bg-cyan-900 selection:text-white h-screen w-screen overflow-hidden relative bg-[#04060a]">
      <div className="fixed inset-0 pointer-events-none" style={{
        zIndex: 0,
        backgroundImage: `radial-gradient(circle at 50% -10%, #111b2d 0%, transparent 45%),
                          radial-gradient(circle at 80% 80%, #0a1422 0%, transparent 45%),
                          radial-gradient(circle at 10% 90%, #070f1a 0%, transparent 45%)`
      }} />

      <AtmosphericBackground />

      <AnimatePresence mode="wait">
        {view === 'hero' ? (
          <HeroSection key="hero-view" />
        ) : (
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-30 flex flex-col w-full h-full p-6 md:p-8 lg:p-10 box-border overflow-hidden"
            style={{ perspective: '1400px' }}
          >
            {/* Contenedor Flex: Gap estricto (no se pegan) y ocupa el 100% del alto */}
            <div
              ref={sceneRef}
              className="preserve-3d-scene w-full max-w-[1780px] mx-auto h-full flex flex-col gap-6 lg:gap-8"
            >
              {/* 1. Header (Tamaño automático) */}
              <div className="shrink-0"><Header /></div>

              {/* 2. Calendario (Tamaño automático ajustado) */}
              <div className="shrink-0"><CalendarCycle /></div>

              {/* 3. Gráficas (flex-1: Rellenan todo el hueco vacío inferior dinámicamente) */}
              <section className="grid grid-cols-2 gap-6 xl:gap-8 w-full flex-1 min-h-0 pb-2">
                <PerformanceChart />
                <NutritionChart />
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}