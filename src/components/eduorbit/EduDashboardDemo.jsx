import React, { useMemo, useState } from 'react';
import { motion, useDragControls, useReducedMotion } from 'framer-motion';
import { GripVertical, UserCheck, Users, AlertTriangle, RotateCcw, MousePointer2, FlaskConical, ArrowRight } from 'lucide-react';

/* ---------- Datos ficticios de demostración ---------- */

// Asistencia (%) y matrícula por curso, por semestre. No corresponden a ningún colegio real.
const COURSES = [
  { name: '1°B', level: 'basica', att: [94, 92], mat: [36, 36] },
  { name: '2°B', level: 'basica', att: [92, 91], mat: [38, 37] },
  { name: '3°B', level: 'basica', att: [90, 89], mat: [35, 35] },
  { name: '4°B', level: 'basica', att: [91, 88], mat: [37, 37] },
  { name: '5°B', level: 'basica', att: [88, 86], mat: [36, 35] },
  { name: '6°B', level: 'basica', att: [87, 84], mat: [34, 34] },
  { name: '7°B', level: 'basica', att: [89, 87], mat: [38, 38] },
  { name: '8°B', level: 'basica', att: [86, 83], mat: [35, 34] },
  { name: 'I°M', level: 'media', att: [85, 83], mat: [40, 39] },
  { name: 'II°M', level: 'media', att: [84, 80], mat: [38, 37] },
  { name: 'III°M', level: 'media', att: [82, 79], mat: [36, 35] },
  { name: 'IV°M', level: 'media', att: [86, 84], mat: [34, 34] },
];

const MONTHS = [
  ['Mar', 'Abr', 'May', 'Jun', 'Jul'],
  ['Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
];
// Cómo se mueve la asistencia mes a mes en torno al promedio del semestre
const MONTH_SHAPE = [
  [1.8, 0.9, -0.4, -1.6, -0.7],
  [0.6, 1.2, -0.3, -0.8, -0.7],
];

const ALERT_THRESHOLD = 85;

const LEVELS = [
  { id: 'todos', label: 'Todos' },
  { id: 'basica', label: 'Básica' },
  { id: 'media', label: 'Media' },
];
const PERIODS = [
  { id: 0, label: '1er semestre' },
  { id: 1, label: '2do semestre' },
];

const useDashboardData = (level, period) =>
  useMemo(() => {
    const courses = COURSES.filter((c) => level === 'todos' || c.level === level).map((c) => ({
      name: c.name,
      att: c.att[period],
      mat: c.mat[period],
    }));
    const totalMat = courses.reduce((s, c) => s + c.mat, 0);
    const avgAtt = courses.reduce((s, c) => s + c.att * c.mat, 0) / totalMat;
    const trend = MONTH_SHAPE[period].map((d, i) => ({ month: MONTHS[period][i], value: avgAtt + d }));
    const alerts = courses.filter((c) => c.att < ALERT_THRESHOLD).sort((a, b) => a.att - b.att);
    return { courses, totalMat, avgAtt, trend, alerts };
  }, [level, period]);

/* ---------- Módulos del tablero ---------- */

const Kpi = ({ icon: Icon, label, value, suffix, tone }) => (
  <div className="flex items-center gap-4">
    <span className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${tone}`}>
      <Icon className="h-5 w-5" />
    </span>
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
      <motion.p
        key={value}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-extrabold text-white"
      >
        {value}
        {suffix && <span className="ml-0.5 text-base font-bold text-slate-400">{suffix}</span>}
      </motion.p>
    </div>
  </div>
);

const AttendanceBars = ({ courses }) => (
  <div>
    <p className="text-sm font-bold text-white">Asistencia por curso</p>
    <p className="mb-4 mt-1 flex items-center gap-1.5 text-[10px] font-semibold text-amber-300/80">
      <span className="w-4 border-t border-dashed border-amber-400/70" />
      Umbral de alerta {ALERT_THRESHOLD}%
    </p>
    <div className="relative flex h-40 items-end gap-1.5">
      {/* Línea del umbral de alerta, sobre una escala de 70% a 100% */}
      <span
        className="absolute inset-x-0 border-t border-dashed border-amber-400/50"
        style={{ bottom: `${((ALERT_THRESHOLD - 70) / 30) * 100}%` }}
      />
      {courses.map((c) => {
        const low = c.att < ALERT_THRESHOLD;
        return (
          <div key={c.name} className="group relative flex h-full min-w-0 flex-1 flex-col justify-end">
            <span className="pointer-events-none absolute -top-7 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 px-1.5 py-0.5 text-[10px] font-bold text-white opacity-0 transition group-hover:opacity-100">
              {c.att}%
            </span>
            <div
              className={`w-full rounded-t-md transition-all duration-700 ease-out ${
                low
                  ? 'bg-gradient-to-t from-amber-600 to-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.6)]'
                  : 'bg-gradient-to-t from-emerald-600 to-cyan-400 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.7)]'
              }`}
              style={{ height: `${Math.max(0, ((c.att - 70) / 30) * 100)}%` }}
            />
          </div>
        );
      })}
    </div>
    <div className="mt-2 flex gap-1.5">
      {courses.map((c) => (
        <span key={c.name} className="min-w-0 flex-1 truncate text-center text-[9px] font-semibold text-slate-500">
          {c.name}
        </span>
      ))}
    </div>
  </div>
);

const TrendLine = ({ trend }) => {
  const W = 280;
  const H = 120;
  const min = 78;
  const max = 96;
  const pts = trend.map((t, i) => ({
    x: 12 + (i * (W - 24)) / (trend.length - 1),
    y: H - 10 - ((t.value - min) / (max - min)) * (H - 20),
    ...t,
  }));
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const area = `${d} L${pts[pts.length - 1].x},${H} L${pts[0].x},${H} Z`;

  return (
    <div>
      <p className="mb-4 text-sm font-bold text-white">Tendencia de asistencia</p>
      <svg viewBox={`0 0 ${W} ${H + 18}`} className="h-40 w-full" aria-hidden="true">
        <defs>
          <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#22D3EE" stopOpacity="0.35" />
            <stop offset="1" stopColor="#22D3EE" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* initial={false}: al cargar se dibuja directo; solo se anima cuando cambia un filtro */}
        <motion.path initial={false} animate={{ d: area }} transition={{ duration: 0.7, ease: 'easeOut' }} fill="url(#trend-fill)" />
        <motion.path
          initial={false}
          animate={{ d }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          fill="none" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ filter: 'drop-shadow(0 0 6px rgba(34,211,238,0.7))' }}
        />
        {pts.map((p) => (
          <g key={p.month}>
            <motion.circle initial={false} animate={{ cx: p.x, cy: p.y }} transition={{ duration: 0.7, ease: 'easeOut' }} r="3.5" fill="#0B1222" stroke="#22D3EE" strokeWidth="2" />
            <text x={p.x} y={H + 14} textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748B">{p.month}</text>
          </g>
        ))}
      </svg>
    </div>
  );
};

const AlertList = ({ alerts }) => (
  <div>
    <p className="mb-4 text-sm font-bold text-white">Cursos bajo {ALERT_THRESHOLD}% de asistencia</p>
    {alerts.length === 0 ? (
      <p className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-300">
        Ningún curso bajo el umbral en este filtro.
      </p>
    ) : (
      <ul className="space-y-2">
        {alerts.map((c) => (
          <motion.li
            key={c.name}
            layout
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between rounded-xl border border-amber-400/20 bg-amber-500/10 px-3 py-2"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-white">
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
              {c.name}
            </span>
            <span className="text-sm font-bold text-amber-300">{c.att}%</span>
          </motion.li>
        ))}
      </ul>
    )}
  </div>
);

/**
 * Contenedor arrastrable. Se toma desde el ícono de agarre (así en móvil no
 * se roba el scroll) y, al soltarlo sobre otro módulo del mismo grupo,
 * intercambian lugar.
 */
const Widget = ({ id, group, onDrop, hinting, className = '', children }) => {
  const controls = useDragControls();
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      layout={!reduceMotion}
      data-widget={id}
      data-group={group}
      drag
      dragListener={false}
      dragControls={controls}
      dragSnapToOrigin
      dragElastic={0.15}
      whileDrag={{ scale: 1.03, zIndex: 50, boxShadow: '0 25px 60px -15px rgba(34,211,238,0.55)' }}
      onDragEnd={(event, info) => onDrop(id, group, info.point)}
      className={`relative min-w-0 rounded-2xl border border-white/10 bg-[#0D1526]/90 p-5 backdrop-blur-md transition-colors hover:border-cyan-400/40 ${className}`}
    >
      <button
        type="button"
        aria-label="Arrastrar para mover este módulo"
        onPointerDown={(e) => controls.start(e)}
        className={`absolute right-3 top-3 z-10 flex h-7 w-7 cursor-grab touch-none items-center justify-center rounded-lg border text-slate-400 transition hover:text-cyan-300 active:cursor-grabbing ${
          hinting ? 'animate-pulse border-cyan-400/60 text-cyan-300' : 'border-white/10'
        }`}
      >
        <GripVertical className="h-4 w-4" />
      </button>
      {children}
    </motion.div>
  );
};

const Chip = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
      active
        ? 'border-cyan-400/70 bg-cyan-400/15 text-cyan-200 shadow-[0_0_14px_-2px_rgba(34,211,238,0.6)]'
        : 'border-white/10 bg-white/[0.03] text-slate-400 hover:text-white'
    }`}
  >
    {children}
  </button>
);

const INITIAL_ORDER = {
  kpi: ['asistencia', 'matricula', 'alertas'],
  chart: ['barras', 'tendencia', 'lista'],
};

/**
 * Diseñamos tableros a la medida: una muestra de tablero de gestión escolar
 * con datos ficticios que se puede explorar. Se filtra por nivel y semestre,
 * y los módulos se reordenan arrastrándolos.
 */
export const EduDashboardDemo = () => {
  const reduceMotion = useReducedMotion();
  const [level, setLevel] = useState('todos');
  const [period, setPeriod] = useState(0);
  const [order, setOrder] = useState(INITIAL_ORDER);
  const [touched, setTouched] = useState(false);
  const data = useDashboardData(level, period);

  const handleDrop = (id, group, point) => {
    setTouched(true);
    // info.point viene en coordenadas de página; elementsFromPoint usa las de la ventana
    const target = document
      .elementsFromPoint(point.x - window.scrollX, point.y - window.scrollY)
      .map((el) => el.closest('[data-widget]'))
      .find((el) => el && el.dataset.widget !== id && el.dataset.group === group);
    if (!target) return;
    const other = target.dataset.widget;
    setOrder((prev) => {
      const list = [...prev[group]];
      const a = list.indexOf(id);
      const b = list.indexOf(other);
      [list[a], list[b]] = [list[b], list[a]];
      return { ...prev, [group]: list };
    });
  };

  const kpis = {
    asistencia: <Kpi icon={UserCheck} label="Asistencia promedio" value={data.avgAtt.toFixed(1)} suffix="%" tone="bg-emerald-500/15 text-emerald-300" />,
    matricula: <Kpi icon={Users} label="Matrícula" value={data.totalMat} suffix=" est." tone="bg-cyan-500/15 text-cyan-300" />,
    alertas: <Kpi icon={AlertTriangle} label="Cursos en alerta" value={data.alerts.length} tone="bg-amber-500/15 text-amber-300" />,
  };
  const charts = {
    barras: <AttendanceBars courses={data.courses} />,
    tendencia: <TrendLine trend={data.trend} />,
    lista: <AlertList alerts={data.alerts} />,
  };

  return (
    <section id="tablero" className="relative scroll-mt-20 overflow-hidden bg-[#050810] px-4 py-24 text-white sm:px-6 lg:px-8">
      {/* Fondo vivo: grilla en movimiento y luces que flotan */}
      <div className={`bg-grid pointer-events-none absolute inset-0 opacity-80 ${reduceMotion ? '' : 'bg-grid-drift'}`} />
      <div className="pointer-events-none absolute -left-32 top-24 h-[380px] w-[380px] rounded-full bg-cyan-500/15 blur-[120px] animate-float-slow" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-[420px] w-[420px] rounded-full bg-emerald-500/15 blur-[130px] animate-float" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-300">
            Tableros a la medida
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Diseñamos <span className="text-emerald-400">tableros</span> a la medida
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-400 sm:text-base">
            Cada institución mide lo suyo: el tablero se diseña con los indicadores que tu equipo
            necesita. Esta es una muestra interactiva: filtra por nivel y semestre, pasa el cursor por
            los gráficos y arrastra los módulos desde{' '}
            <GripVertical className="inline h-4 w-4 align-text-bottom text-cyan-300" /> para ordenarlo a tu manera.
          </p>
        </div>

        {/* Ventana del tablero */}
        <div className="rounded-3xl border border-cyan-400/20 bg-[#0A1120]/80 shadow-[0_30px_80px_-30px_rgba(34,211,238,0.45)] backdrop-blur-xl">
          {/* Barra superior */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              </span>
              <span className="text-sm font-bold text-white">Colegio Demo · Panel de gestión</span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-300">
              <FlaskConical className="h-3.5 w-3.5" />
              Datos ficticios de demostración
            </span>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-white/5 px-5 py-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Nivel</span>
              {LEVELS.map((l) => (
                <Chip key={l.id} active={level === l.id} onClick={() => setLevel(l.id)}>{l.label}</Chip>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Periodo</span>
              {PERIODS.map((p) => (
                <Chip key={p.id} active={period === p.id} onClick={() => setPeriod(p.id)}>{p.label}</Chip>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setOrder(INITIAL_ORDER)}
              className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Restablecer orden
            </button>
          </div>

          {/* Módulos */}
          <div className="space-y-4 p-4 sm:p-5">
            <div className="grid gap-4 sm:grid-cols-3">
              {order.kpi.map((id) => (
                <Widget key={id} id={id} group="kpi" onDrop={handleDrop} hinting={!touched}>
                  {kpis[id]}
                </Widget>
              ))}
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {order.chart.map((id) => (
                <Widget key={id} id={id} group="chart" onDrop={handleDrop} hinting={!touched}>
                  {charts[id]}
                </Widget>
              ))}
            </div>
          </div>
        </div>

        {!touched && (
          <p className="mt-5 flex items-center justify-center gap-2 text-xs font-semibold text-cyan-300/80">
            <MousePointer2 className="h-4 w-4 animate-bounce" />
            El tablero es interactivo: prueba moviendo un módulo
          </p>
        )}

        <div className="mt-8 text-center">
          <a
            href="#contacto-edu"
            className="group inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-6 py-3 text-sm font-bold text-emerald-200 transition hover:border-emerald-300 hover:bg-emerald-500/20 hover:text-white"
          >
            Diseñemos el de tu colegio
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};
