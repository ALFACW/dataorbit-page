import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import {
  Bot,
  User,
  Loader2,
  CheckCircle2,
  Package,
  Users,
  KanbanSquare,
  ShieldCheck,
  RotateCcw,
  FlaskConical,
} from 'lucide-react';

/*
 * Tres ejemplos con datos ficticios. Cada uno muestra el pedido, los pasos que
 * ejecuta el agente y el resultado dentro del sistema. El de compras pide
 * aprobación antes de avanzar: es el ejemplo de "resguardo".
 */
const scenarios = [
  {
    id: 'compras',
    label: 'Stock y compras',
    icon: Package,
    system: 'Compras',
    prompt: '¿Qué productos se quedan sin stock este mes y cuánto hay que pedir?',
    steps: [
      'Leyendo la proyección de ventas del mes',
      'Cruzando con el stock y los tiempos de reposición',
      'Preparando el borrador de la orden de compra',
    ],
    needsApproval: true,
    rows: [
      { a: 'Producto A', b: 'Alcanza para 9 días', c: 'Pedir 400 u.' },
      { a: 'Producto B', b: 'Alcanza para 12 días', c: 'Pedir 250 u.' },
      { a: 'Producto C', b: 'Alcanza para 15 días', c: 'Pedir 180 u.' },
    ],
    done: 'Orden de compra en borrador',
  },
  {
    id: 'comercial',
    label: 'Seguimiento comercial',
    icon: Users,
    system: 'Clientes',
    prompt: '¿Qué clientes no hemos contactado en 30 días? Agéndame un recordatorio con cada uno.',
    steps: [
      'Buscando la última interacción con cada cliente',
      'Filtrando los que llevan más de 30 días sin contacto',
      'Creando los recordatorios en tu agenda',
    ],
    needsApproval: false,
    rows: [
      { a: 'Cliente Norte', b: '41 días sin contacto', c: 'Recordatorio el lunes' },
      { a: 'Cliente Sur', b: '36 días sin contacto', c: 'Recordatorio el martes' },
      { a: 'Cliente Centro', b: '33 días sin contacto', c: 'Recordatorio el miércoles' },
    ],
    done: '3 recordatorios creados',
  },
  {
    id: 'proyectos',
    label: 'Gestión de proyectos',
    icon: KanbanSquare,
    system: 'Proyectos',
    prompt: 'Crea las tareas para lanzar el nuevo módulo y asígnalas al equipo.',
    steps: [
      'Revisando el proyecto y su fecha de término',
      'Separando el trabajo en tareas',
      'Asignando responsables y fechas',
    ],
    needsApproval: false,
    rows: [
      { a: 'Cargar datos históricos', b: 'Ana', c: 'Vence el 6 oct' },
      { a: 'Validar cifras con el área', b: 'Tomás', c: 'Vence el 9 oct' },
      { a: 'Capacitar al equipo', b: 'Carla', c: 'Vence el 14 oct' },
    ],
    done: '3 tareas creadas en el proyecto',
  },
];

const STEP_MS = 900;

export const AiInAction = () => {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });
  const [active, setActive] = useState(0);
  const [run, setRun] = useState(0);
  const [typed, setTyped] = useState(0);
  // -1 escribiendo el pedido; 0..n-1 ejecutando cada paso; n terminado
  const [step, setStep] = useState(-1);
  const [approved, setApproved] = useState(false);

  const sc = scenarios[active];

  useEffect(() => {
    if (!inView) return undefined;
    setApproved(false);
    if (reduceMotion) {
      setTyped(sc.prompt.length);
      setStep(sc.steps.length);
      return undefined;
    }
    setTyped(0);
    setStep(-1);
    const timers = [];
    const perChar = Math.max(14, 1100 / sc.prompt.length);
    let t = 300;
    for (let i = 1; i <= sc.prompt.length; i += 1) {
      timers.push(setTimeout(() => setTyped(i), t));
      t += perChar;
    }
    t += 350;
    sc.steps.forEach((_, i) => {
      timers.push(setTimeout(() => setStep(i), t));
      t += STEP_MS;
    });
    timers.push(setTimeout(() => setStep(sc.steps.length), t));
    return () => timers.forEach(clearTimeout);
  }, [active, run, inView, reduceMotion, sc]);

  const finished = step >= sc.steps.length;

  // Lo que queda en el sistema. Se dibuja dos veces: invisible desde el inicio, para
  // reservar su alto, y visible (con animación) cuando el agente termina.
  const resultado = (animado) => (
    <>
      <ul className="space-y-2">
        {sc.rows.map((r, i) => (
          <motion.li
            key={r.a}
            initial={animado && !reduceMotion ? { opacity: 0, x: -10 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduceMotion ? 0 : i * 0.1 }}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-0.5 rounded-xl border border-emerald-400/20 bg-emerald-500/[0.06] px-3.5 py-3 text-sm sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]"
          >
            {/* En móvil el detalle baja a una segunda línea para no cortarse */}
            <span className="truncate font-semibold text-white">{r.a}</span>
            <span className="order-last col-span-2 text-xs text-slate-400 sm:order-none sm:col-span-1 sm:truncate sm:text-sm">{r.b}</span>
            <span className="text-right font-semibold text-emerald-300 sm:truncate">{r.c}</span>
          </motion.li>
        ))}
      </ul>

      {sc.needsApproval && (
        <div className="mt-5 rounded-2xl border border-amber-400/30 bg-amber-500/[0.07] p-4">
          <p className="flex items-center gap-2 text-sm font-bold text-amber-200">
            <ShieldCheck className="h-4 w-4" />
            Resguardo: compromete dinero, necesita tu aprobación
          </p>
          <button
            type="button"
            onClick={() => setApproved(true)}
            disabled={approved}
            className="mt-3 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-500 disabled:opacity-60"
          >
            {approved ? 'Aprobada' : 'Aprobar'}
          </button>
        </div>
      )}
    </>
  );

  return (
    <section id="ia-en-accion" ref={ref} className="relative overflow-hidden border-t border-white/5 bg-[#0A0F1A] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[420px] w-[420px] rounded-full bg-orbit-accent/15 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="rounded-full border border-orbit-blue/30 bg-orbit-blue/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-orbit-blue-glow">
            La IA en acción
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Le pides algo.{' '}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Lo ejecuta dentro de tu sistema.
            </span>
          </h2>
          <p className="mt-4 text-sm text-slate-400 sm:text-base">
            Así trabaja un agente conectado con resguardos: lo de bajo riesgo lo hace solo, y lo que
            compromete dinero te lo deja listo para aprobar. Elige un ejemplo.
          </p>
        </div>

        {/* Ejemplos */}
        <div role="tablist" aria-label="Ejemplos" className="mb-6 flex flex-wrap justify-center gap-2">
          {scenarios.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === active;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActive(i);
                  setRun((r) => r + 1);
                }}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition ${
                  isActive
                    ? 'border-orbit-blue-glow/60 bg-orbit-blue/20 text-white shadow-[0_0_24px_-6px_rgba(96,165,250,0.8)]'
                    : 'border-white/10 text-slate-400 hover:border-white/25 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                {s.label}
              </button>
            );
          })}
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Conversación con el agente */}
          <div className="rounded-3xl border border-white/10 bg-[#0B1222]/90 p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm font-bold">
                <Bot className="h-4 w-4 text-orbit-blue-glow" />
                Agente
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                <FlaskConical className="h-3 w-3" />
                Datos ficticios
              </span>
            </div>

            {/* Pedido */}
            <div className="flex justify-end">
              <div className="flex max-w-[85%] items-start gap-2.5 rounded-2xl rounded-tr-sm bg-orbit-blue/25 px-4 py-3 text-sm text-white">
                {/* La frase completa, invisible, reserva el alto final: así el globo no
                    crece mientras se escribe ni empuja los pasos hacia abajo */}
                <span className="grid min-h-[1.25rem]">
                  <span aria-hidden="true" className="invisible col-start-1 row-start-1">{sc.prompt}</span>
                  <span className="col-start-1 row-start-1">
                    {sc.prompt.slice(0, typed)}
                    {typed < sc.prompt.length && <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-white align-middle" />}
                  </span>
                </span>
                <User className="mt-0.5 h-4 w-4 flex-shrink-0 text-orbit-blue-glow" />
              </div>
            </div>

            {/* Pasos que ejecuta */}
            <ul className="mt-5 space-y-2.5">
              {sc.steps.map((label, i) => {
                const state = step > i || finished ? 'done' : step === i ? 'running' : 'waiting';
                return (
                  <li
                    key={label}
                    className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-sm transition-all duration-300 ${
                      state === 'waiting'
                        ? 'border-white/5 text-slate-600'
                        : state === 'running'
                          ? 'border-orbit-blue/40 bg-orbit-blue/10 text-white'
                          : 'border-white/10 text-slate-300'
                    }`}
                  >
                    {state === 'done' ? (
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-400" />
                    ) : state === 'running' ? (
                      <Loader2 className="h-4 w-4 flex-shrink-0 animate-spin text-orbit-blue-glow" />
                    ) : (
                      <span className="h-4 w-4 flex-shrink-0 rounded-full border border-slate-700" />
                    )}
                    {label}
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 flex items-center justify-between gap-3">
              <p className={`text-sm font-semibold transition-opacity ${finished ? 'text-emerald-300 opacity-100' : 'opacity-0'}`}>
                {sc.needsApproval ? (approved ? 'Aprobado: orden enviada' : 'Listo para tu aprobación') : sc.done}
              </p>
              <button
                type="button"
                onClick={() => setRun((r) => r + 1)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Ver de nuevo
              </button>
            </div>
          </div>

          {/* El sistema, donde queda el resultado */}
          <div className="relative rounded-3xl border border-white/10 bg-[#0D1526]/90 p-5 sm:p-6">
            <p className="mb-5 text-sm font-bold">
              Tu sistema <span className="text-slate-500">· {sc.system}</span>
            </p>

            <div className="grid">
              <div aria-hidden="true" className="invisible col-start-1 row-start-1">
                {resultado(false)}
              </div>
              <div className="col-start-1 row-start-1">
                <AnimatePresence mode="wait">
                  {finished ? (
                    <motion.div
                      key={`${sc.id}-${run}`}
                      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      {resultado(true)}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="espera"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex h-full min-h-[9rem] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 text-sm text-slate-500"
                    >
                      <Loader2 className="h-5 w-5 animate-spin text-orbit-blue-glow/70" />
                      El agente está trabajando…
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
