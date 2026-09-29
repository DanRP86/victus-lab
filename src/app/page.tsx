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

  const viewRef = useRef(view);
  const isThrottled = useRef(false);
  const sceneRef = useRef<HTMLDivElement>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  // Blinded Scroll Control
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isThrottled.current) return;

      if (e.deltaY > 40 && viewRef.current === 'hero') {
        isThrottled.current = true;
        setView('dashboard');
        setTimeout(() => { isThrottled.current = false; }, 1000);
      } else if (e.deltaY < -60 && viewRef.current === 'dashboard') {
        // Solo volvemos al hero si estamos arriba del todo
        if (window.scrollY === 0) {
          isThrottled.current = true;
          setView('hero');
          setTimeout(() => { isThrottled.current = false; }, 1000);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Smooth Parallax 3D Engine (Reducido para no cortar letras en los bordes)
  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (viewRef.current !== 'dashboard') return;
      const xPos = (e.clientX / window.innerWidth) - 0.5;
      const yPos = (e.clientY / window.innerHeight) - 0.5;
      // Rotación mucho más sutil para evitar cortes en el borde de la pantalla
      targetRotation.current = { x: yPos * -1.5, y: xPos * 2.0 };
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
    // CAMBIO CLAVE: min-h-screen y overflow-y-auto en lugar de overflow-hidden
    <div className="selection:bg-[#4FE3C1] selection:text-black min-h-screen w-full overflow-x-hidden overflow-y-auto relative bg-[#04060A]">
      <div className="fixed inset-0 pointer-events-none" style={{
        zIndex: 0,
        backgroundImage: `radial-gradient(circle at 50% -10%, #0F131A 0%, transparent 45%),
                          radial-gradient(circle at 80% 80%, #080A0F 0%, transparent 45%),
                          radial-gradient(circle at 10% 90%, #05070A 0%, transparent 45%)`
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
            // Padding extra para proteger el contenido
            className="relative z-30 flex flex-col w-full min-h-screen p-6 lg:p-12 box-border"
            style={{ perspective: '2000px' }}
          >
            {/* Contenedor que crece dinámicamente sin colapsar hijos */}
            <div
              ref={sceneRef}
              className="preserve-3d-scene w-full max-w-[1780px] mx-auto flex flex-col gap-8 lg:gap-10 pb-12"
            >
              {/* shrink-0 evita que flexbox los aplaste verticalmente */}
              <div className="shrink-0 w-full"><Header /></div>

              <div className="shrink-0 w-full"><CalendarCycle /></div>

              <section className="grid grid-cols-2 gap-[16px] w-full shrink-0">
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