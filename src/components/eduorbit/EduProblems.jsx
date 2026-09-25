import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { Unplug, Hourglass, FileStack, EyeOff, ArrowDown } from 'lucide-react';
import { useRotation } from '../../hooks/useCycle';

const problems = [
  {
    id: 'dispersos',
    short: 'Datos dispersos',
    title: 'Datos dispersos y falta de integración',
    icon: Unplug,
    points: [
      'La información está en múltiples plataformas (ERP, asistencia, notas).',
      'No hay una visión 360° que permita entender el estado real de la institución.',
      'Se necesita extraer datos manualmente de diferentes fuentes, lo que consume tiempo y aumenta el riesgo de errores.',
    ],
  },
  {
    id: 'manuales',
    short: 'Tareas manuales',
    title: 'Pérdida de tiempo en tareas manuales',
    icon: Hourglass,
    points: [
      'Generación de reportes semanales y mensuales en planillas Excel vulnerables.',
      'Horas acumuladas consolidando datos en lugar de analizar resultados pedagógicos.',
    ],
  },
  {
    id: 'carga',
    short: 'Carga administrativa',
    title: 'Pérdida de foco en lo académico por exceso de carga administrativa',
    icon: FileStack,
    points: [
      'Docentes y directivos sobrecargados con digitación repetitiva.',
      'Menor disponibilidad para implementar planes de mejora educativa centrados en los alumnos.',
    ],
  },
  {
    id: 'decisiones',
    short: 'Decisiones sin datos',
    title: 'Falta de información para la toma de decisiones estratégicas',
    icon: EyeOff,
    points: [
      'Decisiones tomadas a destiempo con información desactualizada.',
      'Dificultad para anticipar deserción escolar o caídas en la matrícula.',
    ],
  },
];

/* ---------- Ilustraciones animadas, una por problema ---------- */

const float = (i) => ({
  animate: { y: [0, -5, 0] },
  transition: { duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 },
});

/** Fuentes sueltas que no llegan a conectarse con el centro. */
const ScatteredData = () => {
  const sources = [
    { label: 'ERP', x: 40, y: 34 },
    { label: 'Asistencia', x: 212, y: 28 },
    { label: 'Notas', x: 36, y: 130 },
    { label: 'Excel', x: 218, y: 136 },
  ];
  return (
    <svg viewBox="0 0 260 170" className="h-full w-full" aria-hidden="true">
      {sources.map((s, i) => {
        // Trazo que va hacia el centro y se corta a mitad de camino
        const mx = s.x + (130 - s.x) * 0.55;
        const my = s.y + (85 - s.y) * 0.55;
        return (
          <g key={s.label}>
            <motion.line
              x1={s.x} y1={s.y} x2={mx} y2={my}
              stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 5"
              animate={{ opacity: [0.25, 0.8, 0.25] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
            <motion.g {...float(i)}>
              <rect x={s.x - 38} y={s.y - 14} width="76" height="28" rx="8" fill="#0F1A2E" stroke="rgba(245,158,11,0.45)" />
              <text x={s.x} y={s.y + 4.5} textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#FCD34D">{s.label}</text>
            </motion.g>
          </g>
        );
      })}
      <circle cx="130" cy="85" r="20" fill="none" stroke="rgba(148,163,184,0.35)" strokeDasharray="3 4" />
      <text x="130" y="91" textAnchor="middle" fontSize="16" fontWeight="700" fill="#64748B">?</text>
    </svg>
  );
};

/** Planilla que se llena celda por celda mientras corre el reloj. */
const ManualSheet = () => {
  const cols = 5;
  const rows = 4;
  return (
    <svg viewBox="0 0 260 170" className="h-full w-full" aria-hidden="true">
      <rect x="20" y="22" width="160" height="126" rx="10" fill="#0F1A2E" stroke="rgba(245,158,11,0.35)" />
      {Array.from({ length: rows * cols }).map((_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        // Las celdas se llenan una a una durante el primer 80% del ciclo
        const fillAt = (i / (rows * cols)) * 0.8;
        return (
          <motion.rect
            key={i}
            x={30 + c * 29} y={34 + r * 27} width="23" height="18" rx="3"
            fill="#F59E0B"
            initial={{ opacity: 0.08 }}
            animate={{ opacity: [0.08, 0.08, 0.7, 0.7, 0.08] }}
            transition={{ duration: 8, times: [0, fillAt, fillAt + 0.02, 0.92, 1], repeat: Infinity }}
          />
        );
      })}
      <circle cx="218" cy="85" r="28" fill="#0F1A2E" stroke="rgba(245,158,11,0.5)" strokeWidth="2" />
      {/* El círculo transparente centra el grupo en el reloj, así gira sobre su eje */}
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}>
        <circle cx="218" cy="85" r="28" fill="transparent" />
        <line x1="218" y1="85" x2="218" y2="64" stroke="#FCD34D" strokeWidth="2.5" strokeLinecap="round" />
      </motion.g>
      <line x1="218" y1="85" x2="232" y2="85" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <circle cx="218" cy="85" r="2.5" fill="#FCD34D" />
    </svg>
  );
};

/** Documentos que se apilan y van tapando lo académico. */
const PaperPile = () => (
  // Encuadre más cerrado que las demás: la pila ocupa poco ancho
  <svg viewBox="55 22 150 146" className="h-full w-full" aria-hidden="true">
    <g transform="translate(130 138)">
      <path d="M-30 -8 L0 -20 L30 -8 L0 4 Z" fill="#10B981" opacity="0.35" />
      <text y="22" textAnchor="middle" fontSize="11" fontWeight="600" fill="#64748B">Lo académico</text>
    </g>
    {[0, 1, 2, 3, 4].map((i) => (
      <motion.g
        key={i}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: [-60, 0, 0, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 6, times: [0, 0.12, 0.85, 1], repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
      >
        <rect
          x={92 + (i % 2) * 6} y={96 - i * 14} width="72" height="34" rx="4"
          fill="#0F1A2E" stroke="rgba(245,158,11,0.55)"
          transform={`rotate(${(i % 2 ? 1 : -1) * (2 + i)} ${128} ${113 - i * 14})`}
        />
        <line x1={102 + (i % 2) * 6} y1={107 - i * 14} x2={150 + (i % 2) * 6} y2={107 - i * 14} stroke="rgba(252,211,77,0.5)" strokeWidth="2" />
        <line x1={102 + (i % 2) * 6} y1={116 - i * 14} x2={138 + (i % 2) * 6} y2={116 - i * 14} stroke="rgba(252,211,77,0.3)" strokeWidth="2" />
      </motion.g>
    ))}
  </svg>
);

/** Un gráfico que se corta: lo que viene no se alcanza a ver. */
const BlindChart = () => (
  <svg viewBox="0 0 260 170" className="h-full w-full" aria-hidden="true">
    <line x1="24" y1="140" x2="240" y2="140" stroke="rgba(148,163,184,0.25)" />
    <line x1="24" y1="20" x2="24" y2="140" stroke="rgba(148,163,184,0.25)" />
    <motion.path
      d="M24 110 L60 96 L96 102 L132 80"
      fill="none" stroke="#FCD34D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: [0, 1, 1] }}
      transition={{ duration: 4, times: [0, 0.4, 1], repeat: Infinity }}
    />
    <path d="M132 80 L168 70 L204 88 L240 60" fill="none" stroke="rgba(148,163,184,0.35)" strokeWidth="2" strokeDasharray="4 6" />
    <rect x="140" y="24" width="100" height="112" rx="8" fill="url(#fog)" />
    <motion.g animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>
      <circle cx="190" cy="80" r="16" fill="#0F1A2E" stroke="rgba(245,158,11,0.6)" />
      <text x="190" y="86" textAnchor="middle" fontSize="16" fontWeight="700" fill="#FCD34D">?</text>
    </motion.g>
    <defs>
      <linearGradient id="fog" x1="0" x2="1">
        <stop offset="0" stopColor="#0B1222" stopOpacity="0" />
        <stop offset="1" stopColor="#0B1222" stopOpacity="0.85" />
      </linearGradient>
    </defs>
  </svg>
);

const illustrations = {
  dispersos: ScatteredData,
  manuales: ManualSheet,
  carga: PaperPile,
  decisiones: BlindChart,
};

/** Reloj con el minutero girando, para la pregunta de cierre. */
const Clock = () => (
  <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
    <circle cx="24" cy="24" r="21" fill="none" stroke="rgba(252,211,77,0.6)" strokeWidth="2.5" />
    <motion.g animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
      <circle cx="24" cy="24" r="21" fill="transparent" />
      <line x1="24" y1="24" x2="24" y2="9" stroke="#FCD34D" strokeWidth="2.5" strokeLinecap="round" />
    </motion.g>
    <line x1="24" y1="24" x2="33" y2="24" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="24" cy="24" r="2.5" fill="#FCD34D" />
  </svg>
);

/**
 * El problema: cuatro temas con su ícono. Pasar el cursor (o tocar, en móvil)
 * sobre un tema muestra su detalle con una ilustración animada. Sin
 * interacción, los temas rotan solos.
 */
export const EduProblems = () => {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-120px' });
  const [hovering, setHovering] = useState(false);
  // Si alguien toca o elige un tema, deja de rotar para no cambiarle lo que está leyendo
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useRotation(problems.length, {
    intervalMs: 5000,
    paused: hovering || pinned || !inView,
  });
  const choose = (i) => {
    setPinned(true);
    setActive(i);
  };
  const current = problems[active];
  const Illustration = illustrations[current.id];

  return (
    <section
      id="problema"
      ref={ref}
      className="relative scroll-mt-20 overflow-hidden bg-[#0A0F1A] px-4 py-24 text-white sm:px-6 lg:px-8"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300">
            Diagnóstico Institucional
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
            El <span className="text-amber-400">problema</span>
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            <span className="lg:hidden">Toca</span>
            <span className="hidden lg:inline">Pasa el cursor sobre</span> cada tema para ver qué hay detrás.
          </p>
        </div>

        <div
          className="grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* Temas */}
          <div role="tablist" aria-label="Problemas frecuentes" className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            {problems.map((p, i) => {
              const Icon = p.icon;
              const isActive = i === active;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => choose(i)}
                  onClick={() => choose(i)}
                  className={`group relative flex flex-col items-start gap-2.5 overflow-hidden rounded-2xl border px-4 py-4 text-left transition-all duration-300 lg:flex-row lg:items-center lg:gap-3 lg:px-5 ${
                    isActive
                      ? 'border-amber-400/70 bg-amber-500/10 shadow-[0_0_30px_-6px_rgba(245,158,11,0.55)]'
                      : 'border-white/10 bg-white/[0.03] hover:border-amber-400/40'
                  }`}
                >
                  {isActive && !reduceMotion && (
                    <motion.span
                      layoutId="problem-active"
                      className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-amber-300 to-amber-600"
                    />
                  )}
                  <span
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                      isActive
                        ? 'border-amber-300/60 bg-amber-400/20 text-amber-200 shadow-[0_0_16px_rgba(245,158,11,0.6)]'
                        : 'border-white/10 bg-white/5 text-slate-400 group-hover:text-amber-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <span className={`text-sm font-bold leading-snug sm:text-base ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {p.short}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detalle del tema activo */}
          <div
            role="tabpanel"
            className="relative overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-br from-[#111a2c] to-[#0B1222] p-6 shadow-[0_20px_60px_-20px_rgba(245,158,11,0.35)] sm:p-8"
          >
            <span className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="grid items-center gap-6 sm:grid-cols-[minmax(0,1fr)_260px]"
              >
                <div>
                  <h3 className="text-xl font-extrabold leading-snug text-white sm:text-2xl">{current.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {current.points.map((pt, idx) => (
                      <motion.li
                        key={pt}
                        initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.08 }}
                        className="flex items-start gap-3 text-sm leading-relaxed text-slate-300"
                      >
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
                        {pt}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="order-first h-40 rounded-2xl border border-white/5 bg-[#0B1222]/80 p-2 sm:order-none sm:h-48">
                  <Illustration />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* La pregunta que cierra la sección */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="relative mt-16 overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-r from-amber-500/10 via-[#0F1626] to-emerald-500/10 px-6 py-10 text-center sm:px-12"
        >
          <div className="pointer-events-none absolute -left-20 top-1/2 h-60 w-60 -translate-y-1/2 rounded-full bg-amber-500/20 blur-[90px]" />
          <div className="pointer-events-none absolute -right-20 top-1/2 h-60 w-60 -translate-y-1/2 rounded-full bg-emerald-500/20 blur-[90px]" />
          <div className="relative flex flex-col items-center gap-5">
            <Clock />
            <p className="max-w-3xl text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              ¿Cuánto tiempo invierten en{' '}
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-emerald-300 bg-clip-text text-transparent">
                generar reportes y consolidar datos
              </span>
              ?
            </p>
            <a
              href="#solucion"
              className="group inline-flex items-center gap-2 text-sm font-bold text-emerald-300 transition hover:text-emerald-200"
            >
              Ese tiempo se puede recuperar. Así lo hacemos
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
