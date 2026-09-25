import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { UserCheck, DollarSign, Users, Award, Heart, Briefcase, Layers, School } from 'lucide-react';
import { useRotation } from '../../hooks/useCycle';

const modules = [
  { title: 'Asistencia', desc: 'Consolidada por curso, estudiante y alertas.', icon: UserCheck },
  { title: 'Finanzas', desc: 'Control financiero y presupuesto al día.', icon: DollarSign },
  { title: 'Matrícula', desc: 'Monitorear lo actual vs lo proyectado.', icon: Users },
  { title: 'Simce y Rendimiento', desc: 'Analizar resultados y detectar brechas.', icon: Award },
  { title: 'Convivencia Escolar', desc: 'Seguimiento de incidentes y tendencias.', icon: Heart },
  { title: 'RRHH', desc: 'Cantidad, remuneraciones, antigüedad.', icon: Briefcase },
  { title: 'Programas Internos', desc: 'Impacto en lenguaje y matemáticas.', icon: Layers },
  { title: 'Ministerio / Plataformas', desc: 'Integración directa para análisis.', icon: School },
];

// Geometría de la órbita (escritorio), en px dentro de un lienzo cuadrado
const SIZE = 620;
const CENTER = SIZE / 2;
const RADIUS = 238;
const position = (i) => {
  const angle = (-90 + (360 / modules.length) * i) * (Math.PI / 180);
  return { x: CENTER + RADIUS * Math.cos(angle), y: CENTER + RADIUS * Math.sin(angle) };
};

/** Lo que muestra el núcleo: el módulo activo, con transición entre uno y otro. */
const Hub = ({ mod, reduceMotion }) => {
  const Icon = mod.icon;
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={mod.title}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        exit={reduceMotion ? undefined : { opacity: 0, scale: 1.08, filter: 'blur(4px)' }}
        transition={{ duration: 0.35 }}
        className="flex flex-col items-center px-6 text-center"
      >
        <Icon className="mb-3 h-9 w-9 text-emerald-300 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" strokeWidth={1.8} />
        <p className="text-lg font-extrabold text-white">{mod.title}</p>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{mod.desc}</p>
      </motion.div>
    </AnimatePresence>
  );
};

/**
 * Visión integral: los ocho módulos orbitan alrededor de EduOrbit 360.
 * El núcleo rota entre los módulos; con el cursor encima de uno, se enciende
 * su conexión y el núcleo muestra su detalle. En móvil pasa a una grilla.
 */
export const EduModules = () => {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-120px' });
  const [hovering, setHovering] = useState(false);
  const [active, setActive] = useRotation(modules.length, { intervalMs: 2800, paused: hovering || !inView });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#070A12] px-4 py-24 text-white sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[160px]" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Visión integral para una{' '}
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
              educación informada
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm font-medium text-slate-400 sm:text-base">
            Nos conectamos con distintas fuentes de datos, los procesamos y transformamos en reportes listos para la toma de decisiones.
          </p>
        </div>

        {/* Escritorio: órbita */}
        <div
          className="relative mx-auto hidden lg:block"
          style={{ width: SIZE, height: SIZE }}
          onMouseLeave={() => setHovering(false)}
        >
          <svg className="absolute inset-0" width={SIZE} height={SIZE} aria-hidden="true">
            <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="rgba(16,185,129,0.18)" strokeDasharray="3 7" />
            <circle cx={CENTER} cy={CENTER} r={RADIUS - 70} fill="none" stroke="rgba(148,163,184,0.08)" />
            {modules.map((m, i) => {
              const p = position(i);
              const lit = i === active;
              return (
                <line
                  key={m.title}
                  x1={CENTER} y1={CENTER} x2={p.x} y2={p.y}
                  stroke={lit ? '#34D399' : 'rgba(148,163,184,0.12)'}
                  strokeWidth={lit ? 2 : 1}
                  className={lit ? 'dash-flow' : ''}
                  style={lit ? { filter: 'drop-shadow(0 0 6px #10B981)' } : undefined}
                />
              );
            })}
          </svg>

          {/* Satélite que recorre la órbita */}
          {!reduceMotion && (
            <div className="absolute inset-0 animate-orbit-rotate" aria-hidden="true">
              <span
                className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_4px_rgba(103,232,249,0.7)]"
                style={{ left: CENTER, top: CENTER - RADIUS }}
              />
            </div>
          )}

          {/* Núcleo */}
          <div
            className="absolute flex h-60 w-60 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-400/40 bg-[#0B1A1F]/90 shadow-[0_0_60px_-10px_rgba(16,185,129,0.6)] backdrop-blur"
            style={{ left: CENTER, top: CENTER }}
            aria-live="polite"
          >
            <span className="absolute inset-3 rounded-full border border-dashed border-emerald-400/20 animate-orbit-rotate-reverse" />
            <Hub mod={modules[active]} reduceMotion={reduceMotion} />
          </div>

          {/* Módulos en órbita */}
          {modules.map((m, i) => {
            const Icon = m.icon;
            const p = position(i);
            const lit = i === active;
            return (
              <button
                key={m.title}
                type="button"
                onMouseEnter={() => {
                  setHovering(true);
                  setActive(i);
                }}
                onFocus={() => setActive(i)}
                className={`absolute flex w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-2xl border px-3 py-3 text-center transition-all duration-300 ${
                  // Fondos opacos: la conexión y el satélite pasan por detrás de la tarjeta
                  lit
                    ? 'scale-105 border-emerald-400/70 bg-[#0C2522] shadow-[0_0_30px_-4px_rgba(16,185,129,0.7)]'
                    : 'border-white/10 bg-[#0B1222] hover:border-emerald-400/40'
                }`}
                style={{ left: p.x, top: p.y }}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                    lit ? 'bg-emerald-400/25 text-emerald-200' : 'bg-white/5 text-slate-400'
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className={`text-xs font-bold leading-tight ${lit ? 'text-white' : 'text-slate-300'}`}>
                  {m.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Móvil y tablet: grilla */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:hidden">
          {modules.map((m, i) => {
            const Icon = m.icon;
            const lit = i === active;
            return (
              <div
                key={m.title}
                className={`rounded-2xl border p-4 text-center transition-all duration-500 ${
                  lit
                    ? 'border-emerald-400/60 bg-emerald-500/10 shadow-[0_0_24px_-6px_rgba(16,185,129,0.7)]'
                    : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                <Icon className={`mx-auto mb-2 h-7 w-7 transition-colors duration-500 ${lit ? 'text-emerald-300' : 'text-slate-400'}`} />
                <h4 className="text-sm font-bold text-white">{m.title}</h4>
                <p className="mt-1 text-xs text-slate-400">{m.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
