import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Clock, DollarSign, Zap, Sparkles, TrendingUp } from 'lucide-react';

export const HeroInteractiveCore = () => {
  const canvasRef = useRef(null);
  
  // Interactive Slider State (PUNTO 4: Volume of monthly records processed)
  const [dataVolume, setDataVolume] = useState(250000); // Default 250k records

  // Calculations for Business Impact
  const hoursSaved = Math.round((dataVolume / 10000) * 3.8) + 24;
  const estimatedSavings = Math.round(hoursSaved * 32);
  const acceleration = (3.0 + (dataVolume / 1000000) * 2.5).toFixed(1);

  // Reference for 60fps canvas loop
  const volumeRef = useRef(dataVolume);
  volumeRef.current = dataVolume;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // 3D Sphere Points Setup
    const numPoints = 130;
    const points = [];
    const radius = Math.min(width, height) * 0.35;

    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;
      points.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
      });
    }

    let rotX = 0;
    let rotY = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const vol = volumeRef.current;
      const speedMultiplier = 1 + (vol / 1000000) * 1.5;
      const glowIntensity = 0.35 + (vol / 5000000) * 0.4;

      const centerX = width / 2;
      const centerY = height / 2;

      rotX += 0.003 * speedMultiplier;
      rotY += 0.004 * speedMultiplier;

      // Dynamic Radial Core Glow scaled by volume slider
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        radius * (1.2 + (vol / 5000000) * 0.3)
      );
      gradient.addColorStop(0, `rgba(59, 130, 246, ${glowIntensity})`);
      gradient.addColorStop(0.5, `rgba(99, 102, 241, ${glowIntensity * 0.4})`);
      gradient.addColorStop(1, 'rgba(8, 12, 20, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Project Points
      const projected = [];

      points.forEach((p) => {
        // Rotate Y
        let x1 = p.x * Math.cos(rotY) - p.z * Math.sin(rotY);
        let z1 = p.z * Math.cos(rotY) + p.x * Math.sin(rotY);

        // Rotate X
        let y2 = p.y * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = z1 * Math.cos(rotX) + p.y * Math.sin(rotX);

        const scale = 400 / (400 + z2);
        const px = x1 * scale + centerX;
        const py = y2 * scale + centerY;

        projected.push({ px, py, z: z2, scale });
      });

      // Draw Synaptic Mesh Connections (density scales with volume)
      const connectionMaxDist = 65 + (vol / 5000000) * 15;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionMaxDist) {
            const alpha = (1 - dist / connectionMaxDist) * ((p1.z + radius) / (radius * 2)) * 0.4;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
            ctx.lineWidth = 0.75 + (vol / 5000000) * 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      projected.forEach((p) => {
        const size = Math.max(1.2, ((p.z + radius) / (radius * 2)) * (3.5 + (vol / 5000000)));
        const alpha = Math.max(0.2, (p.z + radius) / (radius * 2));

        ctx.beginPath();
        ctx.arc(p.px, p.py, size, 0, Math.PI * 2);
        ctx.fillStyle = p.z > 0 ? '#60A5FA' : '#818CF8';
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#3B82F6';
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      });

      // Dynamic Radar Sweep
      const time = Date.now() * (0.002 * speedMultiplier);
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.96, time % (Math.PI * 2), (time + 0.8) % (Math.PI * 2));
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none">
      
      {/* 3D Interactive Canvas */}
      <div className="relative w-full h-[320px] sm:h-[400px] flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* Outer Orbit Rings */}
        <div className="absolute w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] border border-blue-500/20 rounded-full pointer-events-none animate-orbit-rotate" />
        <div className="absolute w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] border border-indigo-500/20 rounded-full pointer-events-none animate-orbit-rotate-reverse" />
      </div>

      {/* PUNTO 4: Interactive Business Impact Simulator HUD */}
      <div className="w-full glass-panel p-5 rounded-3xl border border-blue-500/30 shadow-2xl space-y-4">
        
        {/* Slider Controls Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-white">
            <Sliders className="w-4 h-4 text-orbit-blue-glow" />
            <span>Simulador de Impacto en Negocio</span>
          </div>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{dataVolume.toLocaleString()} registros / mes</span>
          </div>
        </div>

        {/* Range Slider Control */}
        <div>
          <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1.5">
            <span>10,000 registros</span>
            <span>2.5 Millones</span>
            <span>5.0 Millones</span>
          </div>
          <input
            type="range"
            min="10000"
            max="5000000"
            step="10000"
            value={dataVolume}
            onChange={(e) => setDataVolume(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orbit-blue"
          />
        </div>

        {/* Live Business Impact Metrics Cards */}
        <div className="grid grid-cols-3 gap-3 pt-1">
          
          <div className="bg-slate-900/90 p-3 rounded-2xl border border-blue-500/20 text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[10px] font-bold">Horas Ahorradas</span>
            </div>
            <p className="text-base sm:text-xl font-extrabold text-white">
              {hoursSaved} <span className="text-[10px] font-normal text-slate-400">hrs/mes</span>
            </p>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-2xl border border-emerald-500/20 text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] font-bold">Ahorro Operativo</span>
            </div>
            <p className="text-base sm:text-xl font-extrabold text-emerald-400">
              ${estimatedSavings.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">USD</span>
            </p>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-2xl border border-indigo-500/20 text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] font-bold">Aceleración</span>
            </div>
            <p className="text-base sm:text-xl font-extrabold text-amber-300">
              {acceleration}x
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
