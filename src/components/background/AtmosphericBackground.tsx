'use client';

import React, { useEffect, useRef } from 'react';

export default function AtmosphericBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: Particle[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulseSpeed: number;
      pulseVal: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 2.8 + 1.2;
        this.speedX = (Math.random() - 0.5) * 0.28;
        this.speedY = (Math.random() - 0.5) * 0.28;
        this.opacity = Math.random() * 0.45 + 0.35;
        this.pulseSpeed = Math.random() * 0.02 + 0.008;
        this.pulseVal = Math.random() * Math.PI;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulseVal += this.pulseSpeed;

        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
        if (this.y < -10) this.y = height + 10;
        if (this.y > height + 10) this.y = -10;
      }

      draw() {
        if (!ctx) return;
        const currentOpacity = this.opacity * (0.8 + Math.sin(this.pulseVal) * 0.25);

        // Suavizado total mediante gradiente radial (elimina puntos duros)
        const rad = Math.max(1, this.radius);
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, rad * 2.2);
        grad.addColorStop(0, `rgba(235, 245, 255, ${currentOpacity})`);
        grad.addColorStop(0.35, `rgba(56, 189, 248, ${currentOpacity * 0.7})`);
        grad.addColorStop(0.75, `rgba(56, 189, 248, ${currentOpacity * 0.15})`);
        grad.addColorStop(1, 'rgba(56, 189, 248, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, rad * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor((width * height) / 9500);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Nebulosas atmosféricas flotando en la lejanía
      const time = Date.now() * 0.0003;
      const orb1X = width * 0.25 + Math.sin(time * 0.7) * 140;
      const orb1Y = height * 0.35 + Math.cos(time * 0.5) * 100;
      const orbGrad = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, 480);
      orbGrad.addColorStop(0, 'rgba(56, 189, 248, 0.045)');
      orbGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = orbGrad;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />;
}
