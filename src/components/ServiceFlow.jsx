import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BarChart3, Code2, Sparkles, Workflow, BrainCircuit, Compass, Gauge, ArrowDown } from 'lucide-react';

/**
 * Cómo se integran los servicios entre sí.
 * El diagnóstico abre el proceso, dos vías paralelas construyen (datos y
 * software), la IA atraviesa ambas y el impacto medido lo cierra.
 */
export const ServiceFlow = () => {
  const reduceMotion = useReducedMotion();

  const appear = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.5, delay: reduceMotion ? 0 : delay },
  });

  const tracks = [
    {
      id: 'datos',
      label: 'Vía de datos',
      steps: [
        { icon: BarChart3, title: 'BI & Ingeniería de Datos', caption: 'Ordenamos y centralizamos' },
        { icon: BrainCircuit, title: 'Modelos predictivos', caption: 'Proyectamos lo que viene' },
      ],
    },
    {
      id: 'software',
      label: 'Vía de software',
      steps: [
        { icon: Workflow, title: 'Automatizaciones e integraciones', caption: 'Conectamos lo que no se habla' },
        { icon: Code2, title: 'Software a la medida', caption: 'Construimos la herramienta' },
      ],
    },
  ];

  const StepBox = ({ icon: Icon, title, caption }) => (
    <div className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-center backdrop-blur-sm transition-colors duration-300 hover:border-orbit-blue/40">
      <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg border border-orbit-blue/25 bg-orbit-blue/15 text-orbit-blue-glow">
        <Icon className="h-4 w-4" strokeWidth={2} />
      </div>
      <p className="text-sm font-semibold leading-snug text-white">{title}</p>
      <p className="mt-1 text-[11px] text-slate-500">{caption}</p>
    </div>
  );

  return (
    <div className="mt-20">
      {/* Encabezado del diagrama */}
      <motion.div {...appear()} className="mb-10 text-center">
        <h3 className="text-xl font-bold text-white sm:text-2xl">Cómo se integran</h3>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400 sm:text-base">
          No son servicios sueltos. Un proyecto parte por entender el proceso, avanza por dos vías
          que corren en paralelo, y termina donde empezó: midiendo.
        </p>
      </motion.div>

      <div className="mx-auto max-w-3xl">
        {/* Punto de partida */}
        <motion.div {...appear(0.05)} className="mx-auto max-w-sm">
          <div className="rounded-xl border border-orbit-blue/30 bg-orbit-blue/10 px-5 py-4 text-center">
            <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg border border-orbit-blue/30 bg-orbit-blue/20 text-orbit-blue-glow">
              <Compass className="h-4 w-4" strokeWidth={2} />
            </div>
            <p className="text-sm font-semibold text-white">Diagnóstico de oportunidades</p>
            <p className="mt-1 text-[11px] uppercase tracking-wider text-orbit-blue-glow/70">
              Punto de partida
            </p>
          </div>
        </motion.div>

        {/* Conector: baja y se abre en dos vías (escritorio).
            El centro de cada columna es (100% - gap) / 4, de ahí el calc. */}
        <div className="relative hidden h-12 sm:block" aria-hidden="true">
          <span className="absolute left-1/2 top-0 h-6 w-px -translate-x-1/2 bg-white/15" />
          <span className="absolute left-[calc(25%-6px)] right-[calc(25%-6px)] top-6 h-px bg-white/15" />
          <span className="absolute left-[calc(25%-6px)] top-6 h-6 w-px bg-white/15" />
          <span className="absolute right-[calc(25%-6px)] top-6 h-6 w-px bg-white/15" />
        </div>

        {/* Conector simple en móvil */}
        <div className="flex h-8 items-center justify-center sm:hidden" aria-hidden="true">
          <ArrowDown className="h-4 w-4 text-slate-600" />
        </div>

        {/* Las dos vías paralelas */}
        <div className="grid gap-6 sm:grid-cols-2">
          {tracks.map((track, t) => (
            <motion.div key={track.id} {...appear(0.1 + t * 0.08)}>
              <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                {track.label}
              </p>
              <div className="flex flex-col items-center">
                <StepBox {...track.steps[0]} />
                <ArrowDown className="my-2 h-4 w-4 flex-shrink-0 text-slate-600" aria-hidden="true" />
                <StepBox {...track.steps[1]} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Conector: las dos vías vuelven a juntarse (escritorio) */}
        <div className="relative hidden h-12 sm:block" aria-hidden="true">
          <span className="absolute left-[calc(25%-6px)] top-0 h-6 w-px bg-white/15" />
          <span className="absolute right-[calc(25%-6px)] top-0 h-6 w-px bg-white/15" />
          <span className="absolute left-[calc(25%-6px)] right-[calc(25%-6px)] top-6 h-px bg-white/15" />
          <span className="absolute left-1/2 top-6 h-6 w-px -translate-x-1/2 bg-white/15" />
        </div>

        <div className="flex h-8 items-center justify-center sm:hidden" aria-hidden="true">
          <ArrowDown className="h-4 w-4 text-slate-600" />
        </div>

        {/* Capa transversal: adopción de IA */}
        <motion.div {...appear(0.25)}>
          <div className="relative overflow-hidden rounded-xl border border-orbit-blue/40 bg-gradient-to-r from-orbit-blue/20 via-orbit-accent/20 to-orbit-blue/20 px-6 py-5">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(96,165,250,0.18),transparent_70%)]" />
            <div className="relative flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-4 sm:text-left">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-orbit-blue/40 bg-orbit-blue/25 text-orbit-blue-glow">
                <Sparkles className="h-5 w-5" strokeWidth={2} />
              </div>
              <div>
                <p className="text-base font-bold text-white sm:text-lg">
                  Adopción de IA + agentes conectados
                </p>
                <p className="mt-0.5 text-xs text-slate-300 sm:text-sm">
                  Atraviesa las dos vías: va incorporada en el software que construimos y en la forma
                  en que se opera todo lo demás.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Conector hacia el cierre */}
        <div className="flex h-10 items-center justify-center" aria-hidden="true">
          <span className="hidden h-full w-px bg-white/15 sm:block" />
          <ArrowDown className="h-4 w-4 text-slate-600 sm:hidden" />
        </div>

        {/* Cierre: el impacto se mide */}
        <motion.div {...appear(0.3)} className="mx-auto max-w-sm">
          <div className="rounded-xl border border-orbit-blue/30 bg-orbit-blue/10 px-5 py-4 text-center">
            <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg border border-orbit-blue/30 bg-orbit-blue/20 text-orbit-blue-glow">
              <Gauge className="h-4 w-4" strokeWidth={2} />
            </div>
            <p className="text-sm font-semibold text-white">Impacto medido</p>
            <p className="mt-1 text-[11px] uppercase tracking-wider text-orbit-blue-glow/70">
              Cierre del ciclo
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              Contra la línea base que levantamos al principio.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
