import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fish, DollarSign, GraduationCap, ArrowRight, BarChart2, CheckCircle2, Sparkles, Filter } from 'lucide-react';

export const InteractiveDashboardShowcase = () => {
  const [activeSector, setActiveSector] = useState('acuicola');

  const sectors = [
    {
      id: 'acuicola',
      name: 'Acuícola & Salmonicultura',
      icon: Fish,
      badge: 'Industria Salmonera',
      description: 'Control de biomasa, proyecciones de alimentación, mortalidad y análisis de costos por centro en tiempo real.',
      metrics: [
        { label: 'Reducción Costo Alimento', value: '-12%' },
        { label: 'Precisión Biomasa', value: '98.5%' },
        { label: 'Tiempo de Reportes', value: '-70%' },
      ],
      image: '/logos/Colegio Financiero_v3.jpg',
      highlights: ['Modelos de Crecimiento SGR', 'Alertas Sanitarias Automáticas', 'Integración con ERPs de Centro'],
    },
    {
      id: 'finanzas',
      name: 'Finanzas & Cash Flow',
      icon: DollarSign,
      badge: 'Automatización Financiera',
      description: 'Centralización de tesorería, flujo de caja proyectado a 90 días y conciliación bancaria automatizada.',
      metrics: [
        { label: 'Precisión Flujo Caja', value: '99.2%' },
        { label: 'Horas Ahorradas / Mes', value: '85 hrs' },
        { label: 'Conciliación Automática', value: '100%' },
      ],
      image: '/logos/Colegio Financiero_v2.png',
      highlights: ['Conciliación Multibanco', 'Proyección de Liquidez', 'Reportes de Margen Operativo'],
    },
    {
      id: 'educacion',
      name: 'EduOrbit 360 (Educativo)',
      icon: GraduationCap,
      badge: 'Gestión Institucional',
      description: 'Visión 360° para colegios: asistencia diaria por nivel, proyección de matrícula y detección temprana de deserción.',
      metrics: [
        { label: 'Control de Asistencia', value: '100%' },
        { label: 'Retención de Matrícula', value: '+15%' },
        { label: 'Carga Administrativa', value: '-65%' },
      ],
      image: '/logos/Colegio Financiero_v2.png',
      highlights: ['Alertas de Inasistencia Grave', 'Consolidado Simce & Notas', 'Modulo Financiero Escolar'],
    },
  ];

  const currentSector = sectors.find((s) => s.id === activeSector);

  return (
    <section id="tableros-bi" className="relative py-24 bg-[#070A13] text-white overflow-hidden border-t border-slate-800">
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-orbit-blue/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-indigo-600/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-semibold mb-4">
            <Filter className="w-4 h-4 text-orbit-blue-glow" />
            <span>Explorador Interactivo de Dashboards BI</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Tableros <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400">Inteligentes por Industria</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal">
            Selecciona tu sector para explorar cómo nuestras soluciones estructuran tus datos y automatizan tus decisiones en tiempo real.
          </p>
        </div>

        {/* Sector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {sectors.map((sec) => {
            const Icon = sec.icon;
            const isActive = sec.id === activeSector;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSector(sec.id)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-orbit-blue to-indigo-600 text-white shadow-[0_0_25px_rgba(37,99,235,0.4)] scale-105'
                    : 'glass-panel border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-500'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                <span>{sec.name}</span>
              </button>
            );
          })}
        </div>

        {/* Showcase Content Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSector}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="glass-panel p-6 sm:p-10 rounded-3xl border border-blue-500/30 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Info & Metrics */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-extrabold border border-blue-500/30 mb-4">
                    {currentSector.badge}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                    {currentSector.name}
                  </h3>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal mb-6">
                    {currentSector.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2.5 mb-8">
                    {currentSector.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Metrics Grid */}
                <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800">
                  {currentSector.metrics.map((m, i) => (
                    <div key={i} className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 text-center">
                      <p className="text-lg sm:text-xl font-extrabold text-orbit-blue-glow">{m.value}</p>
                      <p className="text-[10px] sm:text-xs text-slate-400 font-medium leading-tight mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Interactive Dashboard Preview Graphic */}
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl overflow-hidden border border-blue-500/30 shadow-2xl group">
                  <img
                    src={currentSector.image}
                    alt={currentSector.name}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070A13] via-transparent to-transparent opacity-60 pointer-events-none" />
                  
                  <div className="absolute bottom-4 right-4 glass-panel px-4 py-2 rounded-xl text-xs font-bold text-slate-200 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span>Vista previa del Tablero BI</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
