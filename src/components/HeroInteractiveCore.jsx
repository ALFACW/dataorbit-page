import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const HeroInteractiveCore = () => {
  const canvasRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);

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

    // 3D Sphere Points
    const numPoints = 120;
    const points = [];
    const radius = Math.min(width, height) * 0.36;

    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;
      points.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        baseX: radius * Math.cos(theta) * Math.sin(phi),
        baseY: radius * Math.sin(theta) * Math.sin(phi),
        baseZ: radius * Math.cos(phi),
      });
    }

    let angleX = 0.003;
    let angleY = 0.005;

    // Mouse interaction for 3D rotation
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      mouseX = x * 0.0001;
      mouseY = y * 0.0001;
    };

    const parent = canvas.parentElement;
    parent.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Update rotation based on mouse or steady spin
      const rotX = angleX + mouseY;
      const rotY = angleY + mouseX;

      // Draw Glowing Core Center
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        radius * 1.2
      );
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.45)');
      gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.15)');
      gradient.addColorStop(1, 'rgba(8, 12, 20, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Transform & render 3D Points
      const projected = [];

      points.forEach((p) => {
        // Rotate around Y
        let x1 = p.x * Math.cos(rotY) - p.z * Math.sin(rotY);
        let z1 = p.z * Math.cos(rotY) + p.x * Math.sin(rotY);

        // Rotate around X
        let y2 = p.y * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = z1 * Math.cos(rotX) + p.y * Math.sin(rotX);

        p.x = x1;
        p.y = y2;
        p.z = z2;

        // Perspective projection
        const scale = 400 / (400 + z2);
        const px = x1 * scale + centerX;
        const py = y2 * scale + centerY;

        projected.push({ px, py, z: z2, scale });
      });

      // Draw synaptic 3D connections
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 65) {
            const alpha = (1 - dist / 65) * ( (p1.z + radius) / (radius * 2) ) * 0.3;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      projected.forEach((p) => {
        const size = Math.max(1, (p.z + radius) / (radius * 2) * 3);
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

      // Draw Radar Sweep ring
      const time = Date.now() * 0.0015;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.95, time % (Math.PI * 2), (time + 0.8) % (Math.PI * 2));
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (parent) parent.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
      {/* Decorative Outer Rings */}
      <div className="absolute w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] border border-blue-500/20 rounded-full pointer-events-none animate-orbit-rotate" />
      <div className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] border border-indigo-500/20 rounded-full pointer-events-none animate-orbit-rotate-reverse" />
    </div>
  );
};
