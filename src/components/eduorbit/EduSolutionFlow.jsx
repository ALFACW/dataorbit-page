import React, { useRef } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { Database, RefreshCw, BarChart3, School } from 'lucide-react';
import { useCircuit } from '../../hooks/useCycle';

const solutions = [
  {
    title: 'Unificamos todo en un solo lugar',
    desc: 'Un director puede ver en un solo dashboard asistencia, desempeño académico y proyección de matrícula sin buscar en múltiples sistemas.',
    icon: Database,
  },
  {
    title: 'Automatizamos tus reportes',
    desc: 'En lugar de consolidar reportes manualmente cada mes, un colegio tendrá dashboards listos y actualizados en tiempo real con un solo clic.',
    icon: RefreshCw,
  },
  {
    title: 'Proporcionamos análisis para decisiones con sustento',
    desc: 'Si la plataforma detecta caída en la asistencia de ciertos niveles, se genera una alerta para tomar acción de inmediato.',
    icon: BarChart3,
  },
  {
    title: 'Optimizamos la gestión administrativa',
    desc: 'En lugar de que un equipo administrativo pase horas generando informes, pueden dedicar ese tiempo a implementar estrategias educativas.',
    icon: School,
  },
];

// La luz pasa por nodo, conexión, nodo, conexión... (4 nodos y 3 conexiones)
const nodeStage = (i) => i * 2;
const wireStage = (i) => i * 2 + 1;
const STAGE_COUNT = solutions.length * 2 - 1;

/** Conexión que se enciende en el sentido del flujo. */
const FlowWire = ({ lit, vertical = false, className }) => (
  <span className={`absolute overflow-hidden rounded-full bg-white/10 ${className}`} aria-hidden="true">
    <AnimatePresence>
      {lit && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-300 shadow-[0_0_12px_rgba(52,211,153,0.9)]"
          style={{ originX: 0, originY: 0 }}
          initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
          animate={vertical ? { scaleY: 1 } : { scaleX: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      )}
    </AnimatePresence>
  </span>
);

/** Ícono de la solución dentro de un anillo que gira cuando la luz pasa por él. */
const NodeIcon = ({ icon: Icon, lit, index }) => (
  <div className="relative mx-auto flex h-[72px] w-[72px] flex-shrink-0 items-center justify-center">
    <span
      className={`absolute inset-0 rounded-full border border-dashed transition-colors duration-500 ${
        lit ? 'animate-[spin_6s_linear_infinite] border-emerald-300/80' : 'border-emerald-500/25'
      }`}
    />
    <span
      className={`relative flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-500 ${
        lit
          ? 'border-emerald-300 bg-emerald-500/30 text-white shadow-[0_0_30px_rgba(16,185,129,0.8)]'
          : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
      }`}
    >
      <Icon className="h-6 w-6" strokeWidth={2} />
    </span>
    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-[#0B1222] text-[10px] font-black text-emerald-300">
      {index + 1}
    </span>
  </div>
);

/**
 * Nuestra solución como un flujo: cuatro pasos conectados, con una luz que
 * recorre el circuito cada pocos segundos y resalta cada paso al pasar.
 */
export const EduSolutionFlow = () => {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-100px' });
  const stage = useCircuit(STAGE_COUNT, { stepMs: 420, pauseMs: 2600, paused: !inView });

  const appear = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.5, delay: reduceMotion ? 0 : delay },
  });

  return (
    <section
      id="solucion"
      ref={ref}
      className="relative scroll-mt-20 overflow-hidden bg-[#070A12] px-4 py-24 text-white sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400">
            Transformación Digital
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Nuestra <span className="text-emerald-400">solución</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400 sm:text-base">
            Cuatro pasos encadenados: cada uno se apoya en el anterior.
          </p>
        </div>

        {/* Escritorio: flujo horizontal */}
        <div className="relative hidden lg:block">
          <div className="grid grid-cols-4 gap-0">
            {solutions.map((sol, i) => {
              const lit = stage === nodeStage(i);
              return (
                <motion.div key={sol.title} {...appear(0.08 * i)} className="relative flex flex-col px-4 text-center">
                  {/* Conexión hacia el paso siguiente: de borde a borde entre los íconos de dos columnas */}
                  {i < solutions.length - 1 && (
                    <FlowWire lit={stage === wireStage(i)} className="left-[calc(50%+44px)] right-[calc(-50%+44px)] top-[35px] h-0.5" />
                  )}
                  <NodeIcon icon={sol.icon} lit={lit} index={i} />
                  <div
                    className={`mt-6 flex-1 rounded-2xl border p-5 transition-all duration-500 ${
                      lit
                        ? 'border-emerald-400/50 bg-emerald-500/10 shadow-[0_0_40px_-10px_rgba(16,185,129,0.7)]'
                        : 'border-white/5 bg-white/[0.02]'
                    }`}
                  >
                    <h3 className="text-lg font-bold leading-snug text-white">{sol.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{sol.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Móvil y tablet: línea de tiempo vertical */}
        <div className="mx-auto max-w-xl lg:hidden">
          {solutions.map((sol, i) => {
            const lit = stage === nodeStage(i);
            const last = i === solutions.length - 1;
            return (
              <motion.div key={sol.title} {...appear(0.05 * i)} className="relative flex gap-5 pb-8">
                {!last && (
                  <FlowWire vertical lit={stage === wireStage(i)} className="bottom-0 left-[35px] top-[80px] w-0.5" />
                )}
                <NodeIcon icon={sol.icon} lit={lit} index={i} />
                <div
                  className={`flex-1 rounded-2xl border p-5 transition-all duration-500 ${
                    lit
                      ? 'border-emerald-400/50 bg-emerald-500/10 shadow-[0_0_40px_-10px_rgba(16,185,129,0.7)]'
                      : 'border-white/5 bg-white/[0.02]'
                  }`}
                >
                  <h3 className="text-base font-bold leading-snug text-white sm:text-lg">{sol.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{sol.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
