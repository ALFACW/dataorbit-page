import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Database, Plug, Users, AlertTriangle, CheckCircle2, ArrowDown } from 'lucide-react';

const reasons = [
  {
    id: 'datos',
    icon: Database,
    without: 'Sin datos ordenados',
    withoutText: 'La IA se equivoca con total seguridad.',
    with: 'Con los datos ordenados',
    withText: 'La IA responde con los números correctos, porque sabe de dónde salen.',
  },
  {
    id: 'sistemas',
    icon: Plug,
    without: 'Sin conexión a tus sistemas',
    withoutText: 'La IA solo conversa: no puede hacer nada por ti.',
    with: 'Conectada con resguardos',
    withText: 'La IA ejecuta tareas dentro de tus sistemas, y pide aprobación cuando corresponde.',
  },
  {
    id: 'equipo',
    icon: Users,
    without: 'Sin tu equipo',
    withoutText: 'La IA queda instalada y nadie la usa.',
    with: 'Con el equipo a bordo',
    withText: 'La IA se usa todos los días, porque se diseñó sobre cómo trabajan.',
  },
];

/** Tarjeta que muestra el problema y, al pasar el cursor o tocarla, cómo se resuelve. */
const ReasonCard = ({ reason, index, reduceMotion }) => {
  const [solved, setSolved] = useState(false);
  const Icon = reason.icon;
  return (
    <motion.button
      type="button"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.12 }}
      onMouseEnter={() => setSolved(true)}
      onMouseLeave={() => setSolved(false)}
      onFocus={() => setSolved(true)}
      onBlur={() => setSolved(false)}
      onClick={() => setSolved((s) => !s)}
      aria-pressed={solved}
      className={`group relative flex min-h-[220px] flex-col overflow-hidden rounded-3xl border p-7 text-left transition-all duration-500 ${
        solved
          ? 'border-emerald-400/50 bg-emerald-500/[0.07] shadow-[0_0_50px_-12px_rgba(16,185,129,0.6)]'
          : 'border-amber-400/25 bg-white/[0.03]'
      }`}
    >
      <div className="mb-5 flex items-center justify-between">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-500 ${
            solved
              ? 'border-emerald-300/50 bg-emerald-400/15 text-emerald-200'
              : 'border-amber-300/40 bg-amber-400/10 text-amber-200'
          }`}
        >
          <Icon className="h-6 w-6" />
        </span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors duration-500 ${
            solved ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/10 text-amber-300'
          }`}
        >
          {solved ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
          {solved ? 'Resuelto' : 'Hoy'}
        </span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={solved ? 'con' : 'sin'}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <h3 className="text-xl font-bold text-white">{solved ? reason.with : reason.without}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400 sm:text-base">
            {solved ? reason.withText : reason.withoutText}
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

/**
 * Por qué ahora: la IA ya escribe código; lo difícil es que funcione en una
 * empresa real. Tres condiciones que no resuelve la IA sola.
 */
export const WhyNow = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="por-que-ahora" className="relative overflow-hidden border-t border-white/5 bg-[#070A12] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orbit-blue/10 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="rounded-full border border-orbit-blue/30 bg-orbit-blue/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-orbit-blue-glow">
            Por qué ahora
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
            La IA ya escribe código.{' '}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Lo difícil es que funcione en tu empresa.
            </span>
          </h2>
          <p className="mt-4 text-sm text-slate-400 sm:text-base">
            <span className="lg:hidden">Toca</span>
            <span className="hidden lg:inline">Pasa el cursor sobre</span> cada tarjeta para ver cómo se resuelve.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {reasons.map((reason, i) => (
            <ReasonCard key={reason.id} reason={reason} index={i} reduceMotion={reduceMotion} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#soluciones"
            className="group inline-flex items-center gap-2 text-sm font-bold text-orbit-blue-glow transition hover:text-white"
          >
            De eso nos encargamos. Así trabajamos
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
