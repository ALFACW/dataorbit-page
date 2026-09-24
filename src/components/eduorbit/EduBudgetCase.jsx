import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  Users,
  Briefcase,
  UserCheck,
  DollarSign,
  Calculator,
  FileSpreadsheet,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Database,
} from 'lucide-react';

// Esquema ilustrativo: qué datos entran y qué partidas arma el presupuesto
const INPUTS = [
  { label: 'Matrícula', icon: Users },
  { label: 'Dotación y RRHH', icon: Briefcase },
  { label: 'Asistencia', icon: UserCheck },
  { label: 'Finanzas', icon: DollarSign },
];
const LINES = [
  { label: 'Remuneraciones', width: 88 },
  { label: 'Operación', width: 58 },
  { label: 'Mantención', width: 36 },
  { label: 'Recursos pedagógicos', width: 47 },
  { label: 'Inversión', width: 28 },
];

// Ciclo: 0 entran los datos, 1 procesa el sistema, 2..6 aparecen las partidas,
// 7 en adelante queda listo un rato antes de volver a empezar
const PROCESS_STEP = 1;
const FIRST_LINE_STEP = 2;
const DONE_STEP = FIRST_LINE_STEP + LINES.length;
const CYCLE_LENGTH = DONE_STEP + 4;

/** Haz de luz entre dos etapas; horizontal en escritorio, vertical en móvil. */
const Beam = ({ active, reduceMotion }) => (
  <div className="relative flex items-center justify-center py-2 lg:py-0" aria-hidden="true">
    <span className="relative block h-10 w-px bg-gradient-to-b from-emerald-500/10 via-emerald-400/50 to-emerald-500/10 lg:h-px lg:w-full lg:bg-gradient-to-r">
      {!reduceMotion && (
        <>
          <motion.span
            className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-emerald-300 shadow-[0_0_10px_3px_rgba(52,211,153,0.8)] lg:hidden"
            animate={{ top: ['0%', '100%'], opacity: active ? [0, 1, 0] : [0, 0.4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="absolute top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full bg-emerald-300 shadow-[0_0_10px_3px_rgba(52,211,153,0.8)] lg:block"
            animate={{ left: ['0%', '100%'], opacity: active ? [0, 1, 0] : [0, 0.4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}
    </span>
  </div>
);

/**
 * Caso real: sobre los datos que ya se habían integrado, se construyó un
 * sistema que genera el presupuesto de una fundación educacional. El esquema
 * muestra los datos entrando al sistema y el presupuesto armándose solo.
 */
export const EduBudgetCase = () => {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-120px' });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduceMotion || !inView) return undefined;
    const timer = setInterval(() => setStep((s) => (s + 1) % CYCLE_LENGTH), 650);
    return () => clearInterval(timer);
  }, [reduceMotion, inView]);

  // Con "reducir movimiento" se muestra directamente el resultado final
  const current = reduceMotion ? CYCLE_LENGTH - 1 : step;
  const linesShown = Math.max(0, Math.min(LINES.length, current - FIRST_LINE_STEP + 1));
  const done = current >= DONE_STEP;
  const processing = current >= PROCESS_STEP && !done;

  return (
    <section
      id="caso-presupuesto"
      ref={ref}
      className="relative scroll-mt-20 overflow-hidden bg-[#070A12] px-4 py-24 text-white sm:px-6 lg:px-8"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[420px] w-[420px] rounded-full bg-emerald-500/15 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[380px] w-[380px] rounded-full bg-amber-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-300" />
            </span>
            Caso real · Producto a la medida
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Y no termina en un{' '}
            <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-amber-300 bg-clip-text text-transparent">
              tablero
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
            Para una fundación educacional, el primer proyecto fue integrar sus datos. Sobre esa misma
            base construimos después un sistema que genera el presupuesto de la fundación.
          </p>
        </div>

        {/* Los dos pasos del caso */}
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
              <Database className="h-4 w-4" />
            </span>
            <span className="text-sm">
              <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Paso 1</span>
              <span className="font-bold text-white">Integramos sus datos</span>
            </span>
          </div>
          <ArrowRight className="mx-auto h-4 w-4 flex-shrink-0 rotate-90 text-slate-500 sm:rotate-0" aria-hidden="true" />
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-amber-400/30 bg-amber-500/[0.06] px-4 py-3">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-300">
              <Calculator className="h-4 w-4" />
            </span>
            <span className="text-sm">
              <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Paso 2</span>
              <span className="font-bold text-white">Construimos su sistema de presupuesto</span>
            </span>
          </div>
        </div>

        {/* Esquema: datos → sistema → presupuesto */}
        <div className="mx-auto grid max-w-5xl items-center gap-2 lg:grid-cols-[minmax(0,1fr)_72px_auto_72px_minmax(0,1.2fr)] lg:gap-0">
          {/* Datos integrados */}
          <div className="rounded-3xl border border-white/10 bg-[#0B1222]/80 p-5 backdrop-blur">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-500">Datos ya integrados</p>
            <ul className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              {INPUTS.map(({ label, icon: Icon }, i) => (
                <li
                  key={label}
                  className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all duration-500 ${
                    current === 0
                      ? 'border-emerald-400/60 bg-emerald-500/10 text-white shadow-[0_0_18px_-4px_rgba(16,185,129,0.8)]'
                      : 'border-white/10 bg-white/[0.02] text-slate-300'
                  }`}
                  style={{ transitionDelay: current === 0 ? `${i * 80}ms` : '0ms' }}
                >
                  <Icon className="h-4 w-4 flex-shrink-0 text-emerald-300" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <Beam active={current <= PROCESS_STEP} reduceMotion={reduceMotion} />

          {/* El sistema */}
          <div className="relative mx-auto flex h-44 w-44 items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-dashed border-emerald-400/30 animate-orbit-rotate" />
            <span className="absolute inset-4 rounded-full border border-amber-400/25 animate-orbit-rotate-reverse" />
            <div
              className={`relative flex h-28 w-28 flex-col items-center justify-center rounded-full border text-center transition-all duration-500 ${
                processing
                  ? 'border-amber-300/80 bg-amber-500/15 shadow-[0_0_50px_-4px_rgba(245,158,11,0.7)]'
                  : 'border-emerald-400/50 bg-[#0B1A1F] shadow-[0_0_30px_-6px_rgba(16,185,129,0.6)]'
              }`}
            >
              <Calculator className={`h-7 w-7 ${processing ? 'text-amber-200' : 'text-emerald-300'}`} />
              <span className="mt-1.5 px-2 text-[10px] font-bold uppercase leading-tight tracking-wider text-slate-300">
                Sistema de presupuesto
              </span>
            </div>
          </div>

          <Beam active={processing} reduceMotion={reduceMotion} />

          {/* El presupuesto que se arma solo */}
          <div className="rounded-3xl border border-amber-400/25 bg-gradient-to-br from-[#141a26] to-[#0B1222] p-5 shadow-[0_20px_60px_-25px_rgba(245,158,11,0.5)]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="flex items-center gap-2 text-sm font-bold text-white">
                <FileSpreadsheet className="h-4 w-4 text-amber-300" />
                Presupuesto de la fundación
              </p>
              <span
                className={`inline-flex flex-shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                  done ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/10 text-amber-300'
                }`}
              >
                {done ? <CheckCircle2 className="h-3 w-3" /> : <Loader2 className="h-3 w-3 animate-spin" />}
                {done ? 'Generado' : 'Generando'}
              </span>
            </div>
            <ul className="space-y-3">
              {LINES.map((line, i) => {
                const visible = i < linesShown;
                return (
                  <li key={line.label} className="grid grid-cols-[minmax(0,9rem)_minmax(0,1fr)] items-center gap-3">
                    <span className={`truncate text-xs font-semibold transition-colors duration-300 ${visible ? 'text-slate-200' : 'text-slate-600'}`}>
                      {line.label}
                    </span>
                    <span className="h-2.5 overflow-hidden rounded-full bg-white/5">
                      <span
                        className="block h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500 ease-out"
                        style={{ width: visible ? `${line.width}%` : '0%', opacity: visible ? 1 : 0 }}
                      />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] font-semibold uppercase tracking-widest text-slate-600">
          Esquema ilustrativo
        </p>

        <div className="mt-10 text-center">
          <a
            href="#contacto-edu"
            className="group inline-flex items-center gap-2 text-sm font-bold text-amber-300 transition hover:text-amber-200"
          >
            ¿Qué herramienta necesita tu institución? Conversemos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};
