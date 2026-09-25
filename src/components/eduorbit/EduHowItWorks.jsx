import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { useRotation } from '../../hooks/useCycle';
import { RotatingWord } from '../RotatingWord';

const steps = [
  {
    num: '1',
    title: 'Recopilación y Extracción de Datos',
    color: '#F43F5E',
    deDonde: 'Plataformas escolares, ERP, Sistemas RRHH, Archivos externos.',
    como: 'APIs oficiales, Scraping automático, CSV, Excel, Google Sheets.',
  },
  {
    num: '2',
    title: 'Limpieza y Procesamiento de Datos',
    color: '#A855F7',
    deDonde: 'Eliminación de inconsistencias, Estandarización, Métricas.',
    como: 'Dataflow, SQL avanzado, Procesos automatizados en la nube.',
  },
  {
    num: '3',
    title: 'Generación y Visualización de Reportes',
    color: '#10B981',
    deDonde: 'Visualización de KPIs clave, Filtros dinámicos, Tendencias.',
    como: 'Looker Studio, SQL, Dashboard interactivo accesible 24/7.',
  },
  {
    num: '4',
    title: 'Automatización y Alertas Inteligentes',
    color: '#F59E0B',
    deDonde: 'Sincronización diaria/tiempo real, Notificaciones de riesgo.',
    como: 'Alertas automáticas por correo/whatsapp, Exportación PDF/Excel.',
  },
];

// Qué parte del mapa se enciende en cada paso
const sources = ['Plataformas escolares', 'ERP', 'Sistemas de RRHH', 'Archivos externos'];
const outputs = [
  { label: 'KPIs y tendencias', step: 2 },
  { label: 'Dashboard 24/7', step: 2 },
  { label: 'Alertas de riesgo', step: 3 },
  { label: 'Exportación PDF / Excel', step: 3 },
];

/**
 * Dos diagramaciones del mismo mapa: horizontal en escritorio y vertical en
 * móvil, para que las etiquetas se lean bien en ambos.
 */
const layouts = {
  horizontal: {
    viewBox: '0 0 960 380',
    node: { w: 196, h: 44, font: 14 },
    core: { x: 480, y: 190, r: 64 },
    source: (i) => ({ x: 130, y: 55 + i * 90 }),
    output: (i) => ({ x: 830, y: 55 + i * 90 }),
    pathIn: (p, c, n) => `M${p.x + n.w / 2},${p.y} C${p.x + 170},${p.y} ${c.x - c.r - 90},${c.y} ${c.x - c.r},${c.y}`,
    pathOut: (p, c, n) => `M${c.x + c.r},${c.y} C${c.x + c.r + 90},${c.y} ${p.x - 170},${p.y} ${p.x - n.w / 2},${p.y}`,
  },
  vertical: {
    viewBox: '0 0 360 600',
    node: { w: 158, h: 44, font: 13 },
    core: { x: 180, y: 300, r: 62 },
    source: (i) => ({ x: i % 2 ? 268 : 92, y: 40 + Math.floor(i / 2) * 64 }),
    output: (i) => ({ x: i % 2 ? 268 : 92, y: 496 + Math.floor(i / 2) * 64 }),
    // En la grilla de 2x2, la fila más alejada del núcleo sale por el borde
    // interior y baja por el pasillo central, para no cruzar por detrás de la otra fila
    pathIn: (p, c, n, i) =>
      i < 2
        ? `M${p.x + (i % 2 ? -n.w / 2 : n.w / 2)},${p.y} C${c.x},${p.y} ${c.x},${c.y - c.r - 60} ${c.x},${c.y - c.r}`
        : `M${p.x},${p.y + n.h / 2} C${p.x},${p.y + 90} ${c.x},${c.y - c.r - 60} ${c.x},${c.y - c.r}`,
    pathOut: (p, c, n, i) =>
      i < 2
        ? `M${c.x},${c.y + c.r} C${c.x},${c.y + c.r + 60} ${p.x},${p.y - 90} ${p.x},${p.y - n.h / 2}`
        : `M${c.x},${c.y + c.r} C${c.x},${c.y + c.r + 60} ${c.x},${p.y} ${p.x + (i % 2 ? -n.w / 2 : n.w / 2)},${p.y}`,
  },
};

const Connection = ({ d, lit, color, reduceMotion, delay }) => (
  <g>
    <path d={d} fill="none" stroke="rgba(148,163,184,0.14)" strokeWidth="2" />
    <path
      d={d}
      fill="none"
      stroke={lit ? color : 'rgba(148,163,184,0.28)'}
      strokeWidth={lit ? 2.5 : 1.5}
      className="dash-flow transition-[stroke] duration-500"
      style={lit ? { filter: `drop-shadow(0 0 6px ${color})` } : undefined}
    />
    {!reduceMotion && (
      <circle r={lit ? 4.5 : 3} fill={lit ? color : '#475569'}>
        <animateMotion dur="2.6s" repeatCount="indefinite" path={d} begin={`${delay}s`} />
      </circle>
    )}
  </g>
);

const MapNode = ({ x, y, label, lit, color, node }) => (
  <g>
    <rect
      x={x - node.w / 2} y={y - node.h / 2} width={node.w} height={node.h} rx="12"
      fill={lit ? '#101B30' : '#0B1222'}
      stroke={lit ? color : 'rgba(148,163,184,0.2)'}
      strokeWidth={lit ? 1.8 : 1}
      className="transition-all duration-500"
      style={lit ? { filter: `drop-shadow(0 0 10px ${color}99)` } : undefined}
    />
    <text
      x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle"
      fontSize={node.font} fontWeight="600" fill={lit ? '#FFFFFF' : '#94A3B8'}
      className="transition-all duration-500"
    >
      {label}
    </text>
  </g>
);

const ConnectionMap = ({ layout, active, reduceMotion }) => {
  const L = layouts[layout];
  const c = L.core;
  const coreLit = active === 1;
  const coreColor = steps[1].color;

  return (
    <svg viewBox={L.viewBox} className="h-auto w-full" role="img" aria-label="Mapa de cómo fluyen los datos: fuentes del colegio, procesamiento en EduOrbit 360 y reportes y alertas de salida">
      {sources.map((label, i) => (
        <Connection
          key={`in-${label}`}
          d={L.pathIn(L.source(i), c, L.node, i)}
          lit={active === 0}
          color={steps[0].color}
          reduceMotion={reduceMotion}
          delay={i * 0.4}
        />
      ))}
      {outputs.map((o, i) => (
        <Connection
          key={`out-${o.label}`}
          d={L.pathOut(L.output(i), c, L.node, i)}
          lit={active === o.step}
          color={steps[o.step].color}
          reduceMotion={reduceMotion}
          delay={1.3 + i * 0.4}
        />
      ))}

      {sources.map((label, i) => {
        const p = L.source(i);
        return <MapNode key={label} {...p} label={label} lit={active === 0} color={steps[0].color} node={L.node} />;
      })}
      {outputs.map((o, i) => {
        const p = L.output(i);
        return <MapNode key={o.label} {...p} label={o.label} lit={active === o.step} color={steps[o.step].color} node={L.node} />;
      })}

      {/* Núcleo: EduOrbit 360 procesa y ordena */}
      <g>
        <circle cx={c.x} cy={c.y} r={c.r + 22} fill="none" stroke="rgba(16,185,129,0.18)" strokeDasharray="2 8" />
        <motion.g
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx={c.x} cy={c.y} r={c.r + 10} fill="none" stroke={coreLit ? coreColor : 'rgba(16,185,129,0.45)'} strokeWidth="1.5" strokeDasharray="14 10" />
        </motion.g>
        <circle
          cx={c.x} cy={c.y} r={c.r}
          fill="#0B1A1F"
          stroke={coreLit ? coreColor : 'rgba(16,185,129,0.6)'}
          strokeWidth="2"
          style={{ filter: `drop-shadow(0 0 ${coreLit ? 22 : 12}px ${coreLit ? coreColor : 'rgba(16,185,129,0.6)'})` }}
          className="transition-all duration-500"
        />
        <text x={c.x} y={c.y - 8} textAnchor="middle" fontSize="16" fontWeight="800" fill="#FFFFFF">EduOrbit</text>
        <text x={c.x} y={c.y + 14} textAnchor="middle" fontSize="16" fontWeight="800" fill="#FBBF24">360</text>
      </g>
    </svg>
  );
};

/**
 * ¿Cómo funciona? Un mapa de conexiones: las fuentes del colegio entran a
 * EduOrbit 360 y salen convertidas en reportes y alertas. Los cuatro pasos
 * rotan solos y cada uno enciende su parte del mapa; con el cursor encima de
 * un paso, el mapa se queda en ese paso.
 */
export const EduHowItWorks = () => {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-120px' });
  const [hovering, setHovering] = useState(false);
  const [active, setActive] = useRotation(steps.length, { intervalMs: 3500, paused: hovering || !inView });
  const current = steps[active];

  return (
    <section
      id="como-funciona"
      ref={ref}
      className="relative scroll-mt-20 overflow-hidden bg-[#0A0F1A] px-4 py-24 text-white sm:px-6 lg:px-8"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            ¿Cómo <span className="text-purple-400">funciona</span>?
          </h2>
          {/* Como en la referencia: el concepto que cambia va destacado en su propia línea */}
          <p className="mt-5 text-base text-slate-400 sm:text-lg">Nos conectamos a tu</p>
          <p className="mt-1 text-2xl font-extrabold sm:text-4xl">
            <RotatingWord
              words={['plataforma escolar', 'ERP', 'sistema de RRHH', 'planilla Excel']}
              className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent"
            />
          </p>
          <p className="mt-1 text-base text-slate-400 sm:text-lg">y lo convertimos en información lista para decidir.</p>
        </div>

        {/* Mapa de conexiones */}
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/5 bg-[#070A12]/70 p-4 backdrop-blur-sm sm:p-8">
          <div className="hidden sm:block">
            <ConnectionMap layout="horizontal" active={active} reduceMotion={reduceMotion} />
          </div>
          <div className="mx-auto max-w-sm sm:hidden">
            <ConnectionMap layout="vertical" active={active} reduceMotion={reduceMotion} />
          </div>
        </div>

        {/* Los cuatro pasos */}
        <div
          className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-3 lg:grid-cols-4"
          role="tablist"
          aria-label="Pasos del proceso"
          onMouseLeave={() => setHovering(false)}
        >
          {steps.map((step, i) => {
            const isActive = i === active;
            return (
              <button
                key={step.num}
                type="button"
                role="tab"
                aria-selected={isActive}
                onMouseEnter={() => {
                  setHovering(true);
                  setActive(i);
                }}
                onFocus={() => setActive(i)}
                onClick={() => {
                  setHovering(true);
                  setActive(i);
                }}
                className="relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300"
                style={{
                  borderColor: isActive ? step.color : 'rgba(255,255,255,0.08)',
                  background: isActive ? `${step.color}1A` : 'rgba(255,255,255,0.02)',
                  boxShadow: isActive ? `0 0 30px -8px ${step.color}` : 'none',
                }}
              >
                <span
                  className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl text-base font-black text-white"
                  style={{ background: step.color, boxShadow: isActive ? `0 0 16px ${step.color}` : 'none' }}
                >
                  {step.num}
                </span>
                <span className={`block text-sm font-bold leading-snug ${isActive ? 'text-white' : 'text-slate-400'}`}>
                  {step.title}
                </span>
                {/* Barra de avance mientras el paso está activo y rotando */}
                {isActive && !hovering && !reduceMotion && (
                  <motion.span
                    key={`bar-${active}`}
                    className="absolute bottom-0 left-0 h-0.5"
                    style={{ background: step.color }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3.5, ease: 'linear' }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Detalle del paso activo */}
        <div className="mx-auto mt-4 max-w-5xl" role="tabpanel">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.num}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid gap-3 sm:grid-cols-2"
            >
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                <span className="mb-1 block text-xs font-bold uppercase tracking-wider" style={{ color: current.color }}>
                  ¿De dónde vienen / qué hacemos?
                </span>
                <span className="text-sm text-slate-300">{current.deDonde}</span>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                <span className="mb-1 block text-xs font-bold uppercase tracking-wider" style={{ color: current.color }}>
                  ¿Cómo lo hacemos?
                </span>
                <span className="text-sm text-slate-300">{current.como}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
