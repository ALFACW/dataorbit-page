import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MousePointer, Zap } from 'lucide-react';

export const HeroInteractiveCore = () => {
  const canvasRef = useRef(null);
  const [pulseCount, setPulseCount] = useState(0);

  // Physics state references for requestAnimationFrame
  const isDraggingRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0.005, y: 0.003 });
  const rotationRef = useRef({ x: 0, y: 0 });
  const shockwaveRef = useRef({ active: false, radius: 0, maxRadius: 220, alpha: 1, force: 0 });

  const triggerPulse = () => {
    shockwaveRef.current = {
      active: true,
      radius: 10,
      maxRadius: 260,
      alpha: 1,
      force: 25,
    };
    setPulseCount((prev) => prev + 1);
  };

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

    // 3D Sphere Points initialization
    const numPoints = 130;
    const points = [];
    const radius = Math.min(width, height) * 0.36;

    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      points.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        dispX: 0,
        dispY: 0,
        dispZ: 0,
      });
    }

    // Drag Mouse / Touch Handlers
    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      previousMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMouseRef.current.x;
      const deltaY = e.clientY - previousMouseRef.current.y;

      velocityRef.current = {
        x: deltaY * 0.005,
        y: deltaX * 0.005,
      };

      rotationRef.current.x += velocityRef.current.x;
      rotationRef.current.y += velocityRef.current.y;

      previousMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch Event support for mobile
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMouseRef.current.x;
      const deltaY = e.touches[0].clientY - previousMouseRef.current.y;

      velocityRef.current = {
        x: deltaY * 0.005,
        y: deltaX * 0.005,
      };

      rotationRef.current.x += velocityRef.current.x;
      rotationRef.current.y += velocityRef.current.y;

      previousMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const parent = canvas.parentElement;
    parent.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    parent.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // Main 60fps Physics Render Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Friction & Inertia momentum physics
      if (!isDraggingRef.current) {
        velocityRef.current.x *= 0.96;
        velocityRef.current.y *= 0.96;

        if (Math.abs(velocityRef.current.x) < 0.002) velocityRef.current.x = 0.002;
        if (Math.abs(velocityRef.current.y) < 0.003) velocityRef.current.y = 0.003;
      }

      rotationRef.current.x += velocityRef.current.x;
      rotationRef.current.y += velocityRef.current.y;

      // Shockwave Pulse Calculations
      const shock = shockwaveRef.current;
      if (shock.active) {
        shock.radius += 12;
        shock.alpha -= 0.035;
        shock.force *= 0.88;

        if (shock.alpha <= 0 || shock.radius >= shock.maxRadius) {
          shock.active = false;
        }
      }

      // Draw Glowing Core Atmosphere
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        radius * 1.25
      );
      gradient.addColorStop(0, shock.active ? 'rgba(96, 165, 250, 0.7)' : 'rgba(59, 130, 246, 0.45)');
      gradient.addColorStop(0.5, shock.active ? 'rgba(147, 197, 253, 0.3)' : 'rgba(99, 102, 241, 0.15)');
      gradient.addColorStop(1, 'rgba(8, 12, 20, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * (shock.active ? 1.4 : 1.2), 0, Math.PI * 2);
      ctx.fill();

      // Transform & Project 3D Points
      const rotX = rotationRef.current.x;
      const rotY = rotationRef.current.y;
      const projected = [];

      points.forEach((p) => {
        if (shock.active) {
          const force = shock.force * (1 + Math.random() * 0.2);
          p.dispX += (p.baseX / radius) * force;
          p.dispY += (p.baseY / radius) * force;
          p.dispZ += (p.baseZ / radius) * force;
        }

        p.dispX *= 0.85;
        p.dispY *= 0.85;
        p.dispZ *= 0.85;

        const curX = p.baseX + p.dispX;
        const curY = p.baseY + p.dispY;
        const curZ = p.baseZ + p.dispZ;

        // Rotate Y
        let x1 = curX * Math.cos(rotY) - curZ * Math.sin(rotY);
        let z1 = curZ * Math.cos(rotY) + curX * Math.sin(rotY);

        // Rotate X
        let y2 = curY * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = z1 * Math.cos(rotX) + curY * Math.sin(rotX);

        // Perspective Projection
        const scale = 400 / (400 + z2);
        const px = x1 * scale + centerX;
        const py = y2 * scale + centerY;

        projected.push({ px, py, z: z2, scale, x1, y2 });
      });

      // Draw 3D Synaptic Mesh Connections
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 68) {
            const alpha = (1 - dist / 68) * ((p1.z + radius) / (radius * 2)) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = shock.active ? `rgba(147, 197, 253, ${alpha * 1.5})` : `rgba(96, 165, 250, ${alpha})`;
            ctx.lineWidth = shock.active ? 1.2 : 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      projected.forEach((p) => {
        const size = Math.max(1.2, ((p.z + radius) / (radius * 2)) * 3.5);
        const alpha = Math.max(0.2, (p.z + radius) / (radius * 2));

        ctx.beginPath();
        ctx.arc(p.px, p.py, size, 0, Math.PI * 2);
        ctx.fillStyle = shock.active ? '#93C5FD' : p.z > 0 ? '#60A5FA' : '#818CF8';
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = shock.active ? 16 : 8;
        ctx.shadowColor = '#3B82F6';
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      });

      // Draw Expanding Shockwave Shock Ring
      if (shock.active) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, shock.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(147, 197, 253, ${shock.alpha})`;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#60A5FA';
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Draw Radar Sweep ring
      const time = Date.now() * 0.002;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.96, time % (Math.PI * 2), (time + 0.8) % (Math.PI * 2));
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.45)';
      ctx.lineWidth = 2;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (parent) {
        parent.removeEventListener('mousedown', handleMouseDown);
        parent.removeEventListener('touchstart', handleTouchStart);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[420px] sm:h-[520px] flex flex-col items-center justify-center select-none group">
      
      {/* 3D Physics Canvas */}
      <canvas
        ref={canvasRef}
        onDoubleClick={triggerPulse}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Outer Rotating Rings */}
      <div className="absolute w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] border border-blue-500/20 rounded-full pointer-events-none animate-orbit-rotate" />
      <div className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] border border-indigo-500/20 rounded-full pointer-events-none animate-orbit-rotate-reverse" />

      {/* Interactive Control Controls & Physics Hint HUD */}
      <div className="absolute bottom-2 flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={triggerPulse}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-blue-500/40 text-blue-200 hover:text-white text-xs font-bold hover:border-blue-400 hover:bg-blue-600/20 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:scale-105 active:scale-95"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Lanzar Pulso de Datos</span>
          {pulseCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-blue-500/30 text-[10px]">
              {pulseCount}
            </span>
          )}
        </button>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400 text-[11px] font-medium">
          <MousePointer className="w-3 h-3 text-blue-400" />
          <span>Arrastra para girar • Doble clic para pulso</span>
        </span>
      </div>

    </div>
  );
};
