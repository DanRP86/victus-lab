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
  const sceneRef = useRef<HTMLDivElement>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  // Control de scroll entre vistas
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let isThrottled = false;
    const throttle = () => {
      isThrottled = true;
      timeout = setTimeout(() => { isThrottled = false; }, 1200);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isThrottled) return;
      if (e.deltaY > 40 && view === 'hero') { setView('dashboard'); throttle(); }
      else if (e.deltaY < -40 && view === 'dashboard') { setView('hero'); throttle(); }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => { window.removeEventListener('wheel', handleWheel); clearTimeout(timeout); };
  }, [view]);

  // Motor Parallax 3D Suave (Físicas con requestAnimationFrame exactas al HTML original)
  useEffect(() => {
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (view !== 'dashboard') return;
      const xPos = (e.clientX / window.innerWidth) - 0.5;
      const yPos = (e.clientY / window.innerHeight) - 0.5;
      targetRotation.current = { x: yPos * -3.2, y: xPos * 4.2 };
    };

    const tick = () => {
      if (view === 'dashboard' && sceneRef.current) {
        // Interpolación fluida (lerp)
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
  }, [view]);

  // Animación del anillo de carga
  useEffect(() => {
    if (view === 'dashboard') {
      const timer = setTimeout(() => {
        const ring = document.getElementById('indicator-ring');
        if (ring) {
          ring.style.strokeDashoffset = '60';
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [view]);

  return (
    <div className="selection:bg-cyan-900 selection:text-white h-screen w-screen overflow-hidden relative" style={{ backgroundColor: '#04060a' }}>
      {/* Fondo con atmósfera radial profunda */}
      <div className="fixed inset-0 pointer-events-none" style={{
        zIndex: 0,
        backgroundImage: `radial-gradient(circle at 50% -10%, #111b2d 0%, transparent 45%),
                          radial-gradient(circle at 80% 80%, #0a1422 0%, transparent 45%),
                          radial-gradient(circle at 10% 90%, #070f1a 0%, transparent 45%)`
      }} />

      {/* Partículas suaves en movimiento */}
      <AtmosphericBackground />

      {/* --- VISTA HERO --- */}
      <AnimatePresence>
        {view === 'hero' && <HeroSection />}
      </AnimatePresence>

      {/* --- VISTA DASHBOARD (Estructura espacial 3D con perspectiva real) --- */}
      <AnimatePresence>
        {view === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-30 flex flex-col w-full h-full p-6 md:p-8 lg:p-10 box-border overflow-hidden"
            style={{ perspective: '1400px' }}
          >
            {/* ESCENARIO 3D INTERACTIVO */}
            <div
              ref={sceneRef}
              className="preserve-3d-scene w-full max-w-[1780px] mx-auto h-full flex flex-col justify-between"
            >
              {/* --- CABECERA (Elevada a +35px en Z) --- */}
              <Header />

              {/* --- CALENDARIO SUPERIOR (Elevado a +15px en Z) --- */}
              <CalendarCycle />

              {/* --- GRÁFICOS INFERIORES (Elevados a +25px en Z) --- */}
              <section className="grid grid-cols-2 gap-6 xl:gap-8 w-full h-[230px] xl:h-[250px] shrink-0 my-1" style={{ transform: 'translateZ(25px)' }}>
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