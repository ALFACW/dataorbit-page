import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Database, Repeat, GraduationCap, Activity, Sparkles, Crosshair } from 'lucide-react';

export const HeroInteractiveCore = () => {
  const canvasRef = useRef(null);
  const [activeMode, setActiveMode] = useState('bi');
  const [hoveredTelemetry, setHoveredTelemetry] = useState(null);

  const modes = [
    {
      id: 'bi',
      name: 'BI & Data Pipelines',
      icon: Database,
      primaryColor: '#3B82F6',
      secondaryColor: '#60A5FA',
      glowColor: 'rgba(59, 130, 246, 0.5)',
      speed: 0.004,
      readout: '12.4 GB/s Ingestion',
      badge: 'ETL & Data Warehousing',
    },
    {
      id: 'predictive',
      name: 'Modelos Predictivos AI',
      icon: Cpu,
      primaryColor: '#818CF8',
      secondaryColor: '#C084FC',
      glowColor: 'rgba(129, 140, 248, 0.5)',
      speed: 0.007,
      readout: '99.4% Accurancy',
      badge: 'Machine Learning',
    },
    {
      id: 'finances',
      name: 'Automatización Financiera',
      icon: Repeat,
      primaryColor: '#10B981',
      secondaryColor: '#F59E0B',
      glowColor: 'rgba(16, 185, 129, 0.5)',
      speed: 0.005,
      readout: '15,400+ Conciliaciones/m',
      badge: 'Cashflow Auto',
    },
    {
      id: 'eduorbit',
      name: 'EduOrbit 360',
      icon: GraduationCap,
      primaryColor: '#06B6D4',
      secondaryColor: '#10B981',
      glowColor: 'rgba(6, 182, 212, 0.5)',
      speed: 0.003,
      readout: 'Visión 360° Institucional',
      badge: 'Gestión Escolar',
    },
  ];

  const currentMode = modes.find((m) => m.id === activeMode);

  // References for render loop
  const activeModeRef = useRef(currentMode);
  activeModeRef.current = currentMode;

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

    // 3D Sphere Points Setup with Node Telemetry Data
    const numPoints = 120;
    const points = [];
    const radius = Math.min(width, height) * 0.35;

    const telemetryTopics = [
      'Ingesta Pipeline ETL',
      'Modelo Predicción Venta',
      'Conciliación Bancaria',
      'Asistencia Escolar',
      'Matrícula Proyectada',
      'Cluster Biomasa Centro',
      'Gobernanza de Datos',
      'Margen Operativo',
      'Alerta Temprana Deserción',
      'Consolidado Simce',
    ];

    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;
      points.push({
        id: i + 1,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        topic: telemetryTopics[i % telemetryTopics.length],
        status: (95 + (i % 5) * 1.1).toFixed(1) + '%',
      });
    }

    let rotX = 0;
    let rotY = 0;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX = x;
      mouseY = y;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      setHoveredTelemetry(null);
    };

    const parent = canvas.parentElement;
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    // Render loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const mode = activeModeRef.current;
      const centerX = width / 2;
      const centerY = height / 2;

      rotX += mode.speed;
      rotY += mode.speed * 1.2;

      // Radial Core Glow
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        radius * 1.25
      );
      gradient.addColorStop(0, mode.glowColor);
      gradient.addColorStop(0.6, mode.glowColor.replace('0.5', '0.12'));
      gradient.addColorStop(1, 'rgba(8, 12, 20, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // Project Points
      const projected = [];
      let closestHovered = null;
      let minDistance = 24;

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

        // Check cursor hover proximity
        const dx = mouseX - px;
        const dy = mouseY - py;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < minDistance && z2 > 0) {
          minDistance = dist;
          closestHovered = { id: p.id, topic: p.topic, status: p.status, px, py };
        }

        projected.push({ id: p.id, px, py, z: z2, scale, topic: p.topic, status: p.status });
      });

      // Update hover state for tooltip
      if (closestHovered) {
        setHoveredTelemetry(closestHovered);
      }

      // Draw Synaptic Connections
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 65) {
            const alpha = (1 - dist / 65) * ((p1.z + radius) / (radius * 2)) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = mode.primaryColor;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.75;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      }

      // Draw Nodes
      projected.forEach((p) => {
        const size = Math.max(1.2, ((p.z + radius) / (radius * 2)) * 3.5);
        const alpha = Math.max(0.2, (p.z + radius) / (radius * 2));
        const isHoveredNode = closestHovered && closestHovered.id === p.id;

        ctx.beginPath();
        ctx.arc(p.px, p.py, isHoveredNode ? size * 2 : size, 0, Math.PI * 2);
        ctx.fillStyle = isHoveredNode ? '#FFFFFF' : p.z > 0 ? mode.primaryColor : mode.secondaryColor;
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = isHoveredNode ? 18 : 8;
        ctx.shadowColor = mode.primaryColor;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;

        // Hover Ring
        if (isHoveredNode) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, size * 3.2, 0, Math.PI * 2);
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      // Radar Sweep
      const time = Date.now() * 0.002;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.96, time % (Math.PI * 2), (time + 0.8) % (Math.PI * 2));
      ctx.strokeStyle = mode.primaryColor;
      ctx.globalAlpha = 0.4;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none">
      
      {/* PUNTO 1: Mode Switcher Tabs */}
      <div className="w-full flex flex-wrap items-center justify-center gap-2 mb-4">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = mode.id === activeMode;
          return (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                isActive
                  ? 'bg-slate-800 text-white border border-blue-400/80 shadow-[0_0_15px_rgba(59,130,246,0.3)] scale-105'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" style={{ color: mode.primaryColor }} />
              <span>{mode.name}</span>
            </button>
          );
        })}
      </div>

      {/* 3D Interactive Canvas Container */}
      <div className="relative w-full h-[360px] sm:h-[440px] flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />

        {/* Outer Orbit Rings */}
        <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] border border-blue-500/20 rounded-full pointer-events-none animate-orbit-rotate" />
        <div className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] border border-indigo-500/20 rounded-full pointer-events-none animate-orbit-rotate-reverse" />

        {/* PUNTO 2: Floating Telemetry HUD Tooltip on Hover */}
        <AnimatePresence>
          {hoveredTelemetry && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                left: Math.min(hoveredTelemetry.px + 15, 260),
                top: Math.max(hoveredTelemetry.py - 40, 20),
              }}
              className="absolute z-20 glass-panel p-3 rounded-2xl border border-blue-400/50 shadow-2xl text-left pointer-events-none min-w-[180px]"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-300 flex items-center gap-1">
                  <Crosshair className="w-3 h-3 text-emerald-400 animate-spin" />
                  Nodo #{hoveredTelemetry.id}
                </span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">
                  {hoveredTelemetry.status}
                </span>
              </div>
              <p className="text-xs font-bold text-white leading-tight">
                {hoveredTelemetry.topic}
              </p>
              <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                <Activity className="w-3 h-3 text-blue-400" />
                <span>Telemetría en tiempo real</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mode Readout Status Badge at Bottom */}
        <div className="absolute bottom-1 glass-panel px-4 py-1.5 rounded-full border border-blue-500/30 text-xs font-bold text-slate-200 flex items-center gap-2 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>{currentMode.badge}:</span>
          <span className="text-orbit-blue-glow">{currentMode.readout}</span>
        </div>
      </div>

    </div>
  );
};
