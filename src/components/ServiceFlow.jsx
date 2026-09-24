import React, { useRef } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { BarChart3, Code2, Bot, Workflow, Database, Compass, Gauge, ChevronDown } from 'lucide-react';
import { useCircuit } from '../hooks/useCycle';

/**
 * Etapas del circuito en el orden en que las recorre la luz: el diagnóstico,
 * la bifurcación, las dos filas de cada vía, la unión, la IA y el cierre.
 */
const STAGE = { diag: 0, split: 1, row1: 2, inner: 3, row2: 4, merge: 5, ia: 6, toEnd: 7, end: 8 };
const STAGE_COUNT = 9;

/** Tramo de conexión: una línea tenue que se enciende de punta a punta cuando pasa la luz. */
const Wire = ({ lit, className, grow = 'down', delay = 0, duration = 0.3 }) => {
  const vertical = grow === 'down';
  return (
    <span className={`absolute bg-white/15 ${className}`}>
      <AnimatePresence>
        {lit && (
          <motion.span
            className="absolute inset-0 bg-orbit-blue-glow shadow-[0_0_10px_2px_rgba(96,165,250,0.7)]"
            style={{ originX: grow === 'left' ? 1 : 0, originY: 0 }}
            initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
            animate={vertical ? { scaleY: 1 } : { scaleX: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.7 } }}
            transition={{ duration, delay, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </span>
  );
};

/** Conector vertical con punta de flecha. */
const Drop = ({ lit, className = 'h-8' }) => (
  <div className={`flex flex-col items-center ${className}`} aria-hidden="true">
    <span className="relative w-px flex-1">
      <Wire lit={lit} className="inset-0" duration={0.3} />
    </span>
    <ChevronDown
      className={`-mt-1.5 h-3.5 w-3.5 transition-colors duration-500 ${lit ? 'text-orbit-blue-glow' : 'text-slate-600'}`}
    />
  </div>
);

/** Detalle que aparece al pasar el cursor (o al tocar, en móvil) sobre una etapa. */
const Details = ({ badge, items, clickable }) => (
  <div
    role="tooltip"
    className="pointer-events-none absolute left-1/2 top-full z-30 mt-3 w-64 max-w-[calc(100vw-3rem)] -translate-x-1/2 translate-y-1 rounded-xl border border-orbit-blue/30 bg-[#0B1222] p-4 text-left opacity-0 shadow-[0_16px_40px_-8px_rgba(37,99,235,0.45)] backdrop-blur-md transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100"
  >
    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orbit-blue-glow">{badge}</p>
    <ul className="mt-2 space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-xs leading-snug text-slate-300">
          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-orbit-blue-glow" />
          {item}
        </li>
      ))}
    </ul>
    {clickable && (
      <p className="mt-3 border-t border-white/10 pt-2 text-[11px] font-semibold text-orbit-blue-glow">
        Clic para ver el detalle ↓
      </p>
    )}
  </div>
);

/** Props para que una caja funcione como botón (clic, Enter o espacio). */
const selectable = (onSelect) =>
  onSelect
    ? {
        role: 'button',
        onClick: onSelect,
        onKeyDown: (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect();
          }
        },
      }
    : {};

/** Clases de una caja según si la luz está pasando por ella. */
const litBox = (lit) =>
  lit
    ? 'border-orbit-blue-glow/80 bg-orbit-blue/20 shadow-[0_0_28px_-4px_rgba(96,165,250,0.65)]'
    : 'border-white/10 bg-white/[0.04]';

const litIcon = (lit) =>
  lit
    ? 'border-orbit-blue-glow/70 bg-orbit-blue/40 text-white shadow-[0_0_14px_rgba(96,165,250,0.8)]'
    : 'border-orbit-blue/25 bg-orbit-blue/15 text-orbit-blue-glow';

const StepBox = ({ icon: Icon, title, caption, badge, details, lit, onSelect }) => (
  <div
    tabIndex={0}
    {...selectable(onSelect)}
    className={`group relative w-full rounded-xl border px-4 py-4 text-center backdrop-blur-sm outline-none transition-all duration-500 hover:z-40 hover:border-orbit-blue/60 focus:z-40 focus:border-orbit-blue/60 ${
      onSelect ? 'cursor-pointer' : 'cursor-default'
    } ${litBox(lit)}`}
  >
    <div className={`mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-500 ${litIcon(lit)}`}>
      <Icon className="h-4 w-4" strokeWidth={2} />
    </div>
    <p className="text-sm font-semibold leading-snug text-white">{title}</p>
    <p className="mt-1 text-[11px] text-slate-500">{caption}</p>
    <Details badge={badge} items={details} clickable={Boolean(onSelect)} />
  </div>
);

/** Punto de partida y cierre del ciclo. */
const EndpointBox = ({ icon: Icon, title, tag, note, badge, details, lit, onSelect }) => (
  <div
    tabIndex={0}
    {...selectable(onSelect)}
    className={`group relative rounded-xl border px-5 py-4 text-center outline-none transition-all duration-500 hover:z-40 focus:z-40 ${
      onSelect ? 'cursor-pointer' : 'cursor-default'
    } ${
      lit
        ? 'border-orbit-blue-glow/80 bg-orbit-blue/25 shadow-[0_0_32px_-4px_rgba(96,165,250,0.7)]'
        : 'border-orbit-blue/30 bg-orbit-blue/10 hover:border-orbit-blue/60 focus:border-orbit-blue/60'
    }`}
  >
    <div className={`mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-500 ${litIcon(lit)}`}>
      <Icon className="h-4 w-4" strokeWidth={2} />
    </div>
    <p className="text-sm font-semibold text-white">{title}</p>
    <p className="mt-1 text-[11px] uppercase tracking-wider text-orbit-blue-glow/70">{tag}</p>
    {note && <p className="mt-2 text-xs leading-relaxed text-slate-400">{note}</p>}
    <Details badge={badge} items={details} clickable={Boolean(onSelect)} />
  </div>
);

/**
 * Tramo del flujo que corresponde a una etapa del catálogo (Entender,
 * Construir, Operar y medir). En pantallas anchas lleva un rótulo lateral; en
 * móvil, uno compacto arriba. Entre sm y xl no se muestra para no cortar los
 * conectores continuos.
 */
const Zone = ({ index, label, lit, onSelect, className = '', children }) => (
  <div className={`relative ${className}`}>
    <button
      type="button"
      onClick={onSelect}
      disabled={!onSelect}
      className="group/zone absolute bottom-0 right-full top-0 mr-6 hidden w-28 items-center justify-end gap-3 xl:flex"
    >
      <span className="text-right">
        <span className="block font-mono text-[10px] text-slate-500">{index}</span>
        <span
          className={`block text-[11px] font-bold uppercase leading-tight tracking-[0.2em] transition-colors duration-500 ${
            lit ? 'text-orbit-blue-glow' : 'text-slate-400 group-hover/zone:text-white'
          }`}
        >
          {label}
        </span>
      </span>
      <span
        className={`w-px self-stretch transition-all duration-500 ${
          lit ? 'bg-orbit-blue-glow shadow-[0_0_8px_rgba(96,165,250,0.8)]' : 'bg-white/15'
        }`}
      />
    </button>
    <button
      type="button"
      onClick={onSelect}
      disabled={!onSelect}
      className="mb-3 flex w-full items-center justify-center gap-2 sm:hidden"
    >
      <span className="h-px w-8 bg-white/15" />
      <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${lit ? 'text-orbit-blue-glow' : 'text-slate-400'}`}>
        {index} · {label}
      </span>
      <span className="h-px w-8 bg-white/15" />
    </button>
    {children}
  </div>
);

/**
 * Cómo se integran los servicios entre sí.
 * El diagnóstico abre el proceso, dos vías paralelas construyen (datos y
 * software), la IA atraviesa ambas y el impacto medido lo cierra. Cada pocos
 * segundos una luz recorre el circuito de punta a punta.
 *
 * Funciona como mapa del catálogo: cada tramo corresponde a una etapa y, si se
 * reciben `onSelectService` / `onSelectFamily`, las cajas y rótulos llevan a
 * su detalle.
 */
export const ServiceFlow = ({ className = 'mt-20', onSelectService, onSelectFamily }) => {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-80px' });
  const stage = useCircuit(STAGE_COUNT, { paused: !inView });
  const at = (s) => stage === s;
  const pick = (id) => (onSelectService ? () => onSelectService(id) : undefined);
  const pickFamily = (id) => (onSelectFamily ? () => onSelectFamily(id) : undefined);

  const appear = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.5, delay: reduceMotion ? 0 : delay },
  });

  // Los detalles salen de los destacados del catálogo de servicios
  const tracks = [
    {
      id: 'datos',
      label: 'Vía de datos',
      steps: [
        {
          id: 'datos-ia',
          icon: Database,
          title: 'Datos unidos y ordenados',
          caption: 'Una sola fuente confiable',
          badge: 'Datos listos para IA',
          details: ['Datos unidos y actualizados', 'Definiciones del negocio', 'Trazabilidad y gobierno'],
        },
        {
          id: 'datos-ia',
          icon: BarChart3,
          title: 'Tableros y proyecciones',
          caption: 'Anticipamos lo que viene',
          badge: 'Datos listos para IA',
          details: ['Tableros en producción', 'Proyecciones y escenarios', 'Alertas cuando algo se desvía'],
        },
      ],
    },
    {
      id: 'sistemas',
      label: 'Vía de sistemas',
      steps: [
        {
          id: 'plataformas',
          icon: Workflow,
          title: 'Automatizaciones e integraciones',
          caption: 'Conectamos lo que no se habla',
          badge: 'Plataformas a la medida',
          details: ['Integración entre sistemas', 'Extracción automatizada', 'Reportes programados'],
        },
        {
          id: 'plataformas',
          icon: Code2,
          title: 'Plataformas a la medida',
          caption: 'Construimos la herramienta',
          badge: 'Plataformas a la medida',
          details: ['Ajustado al proceso real', 'Planificación y alertas', 'Con IA incorporada'],
        },
      ],
    },
  ];

  const clickable = Boolean(onSelectService);

  return (
    <div ref={ref} className={className}>
      {/* Encabezado del diagrama */}
      <motion.div {...appear()} className="mb-10 text-center">
        <h3 className="text-xl font-bold text-white sm:text-2xl">Cómo se integran</h3>
        <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400 sm:text-base">
          No son servicios sueltos. Un proyecto parte conversando con el equipo, avanza por dos vías
          que corren en paralelo, y termina donde empezó: midiendo.
        </p>
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          {clickable
            ? 'Pasa el cursor sobre cada etapa y haz clic para ver su detalle'
            : 'Pasa el cursor sobre cada etapa para ver el detalle'}
        </p>
      </motion.div>

      <div className="mx-auto max-w-3xl">
        {/* Etapa 1: entender */}
        <Zone index="01" label="Entender" lit={at(STAGE.diag)} onSelect={pickFamily('entender')}>
          <motion.div {...appear(0.05)} className="relative mx-auto max-w-sm hover:z-40 focus-within:z-40">
            <EndpointBox
              icon={Compass}
              title="Diagnóstico y hoja de ruta"
              tag="Punto de partida"
              badge="Diagnóstico y hoja de ruta de IA"
              details={['Conversaciones con el equipo', 'Hoja de ruta priorizada', 'Alcance y plazo acotados']}
              lit={at(STAGE.diag)}
              onSelect={pick('diagnostico')}
            />
          </motion.div>
        </Zone>

        {/* Conector: baja y se abre en dos vías (escritorio).
            El centro de cada columna es (100% - gap) / 4, de ahí el calc. */}
        <div className="relative hidden h-12 sm:block" aria-hidden="true">
          <Wire lit={at(STAGE.split)} className="left-1/2 top-0 h-6 w-px -translate-x-1/2" duration={0.14} />
          <Wire lit={at(STAGE.split)} className="left-[calc(25%-6px)] right-1/2 top-6 h-px" grow="left" delay={0.12} duration={0.14} />
          <Wire lit={at(STAGE.split)} className="left-1/2 right-[calc(25%-6px)] top-6 h-px" grow="right" delay={0.12} duration={0.14} />
          <Wire lit={at(STAGE.split)} className="left-[calc(25%-6px)] top-6 h-6 w-px" delay={0.24} duration={0.12} />
          <Wire lit={at(STAGE.split)} className="right-[calc(25%-6px)] top-6 h-6 w-px" delay={0.24} duration={0.12} />
        </div>

        {/* Conector simple en móvil */}
        <Drop lit={at(STAGE.split)} className="h-8 sm:hidden" />

        {/* Etapa 2: construir, por las dos vías paralelas */}
        <Zone
          index="02"
          label="Construir"
          lit={stage >= STAGE.split && stage <= STAGE.merge}
          onSelect={pickFamily('construir')}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {tracks.map((track, t) => (
              <motion.div key={track.id} {...appear(0.1 + t * 0.08)} className="relative hover:z-40 focus-within:z-40">
                <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  {track.label}
                </p>
                <div className="flex flex-col items-center">
                  <StepBox {...track.steps[0]} lit={at(STAGE.row1)} onSelect={pick(track.steps[0].id)} />
                  <Drop lit={at(STAGE.inner)} className="my-1 h-8" />
                  <StepBox {...track.steps[1]} lit={at(STAGE.row2)} onSelect={pick(track.steps[1].id)} />
                </div>
              </motion.div>
            ))}
          </div>
        </Zone>

        {/* Conector: las dos vías vuelven a juntarse (escritorio) */}
        <div className="relative hidden h-12 sm:block" aria-hidden="true">
          <Wire lit={at(STAGE.merge)} className="left-[calc(25%-6px)] top-0 h-6 w-px" duration={0.12} />
          <Wire lit={at(STAGE.merge)} className="right-[calc(25%-6px)] top-0 h-6 w-px" duration={0.12} />
          <Wire lit={at(STAGE.merge)} className="left-[calc(25%-6px)] right-1/2 top-6 h-px" grow="right" delay={0.1} duration={0.14} />
          <Wire lit={at(STAGE.merge)} className="left-1/2 right-[calc(25%-6px)] top-6 h-px" grow="left" delay={0.1} duration={0.14} />
          <Wire lit={at(STAGE.merge)} className="left-1/2 top-6 h-6 w-px -translate-x-1/2" delay={0.22} duration={0.14} />
        </div>

        <Drop lit={at(STAGE.merge)} className="h-8 sm:hidden" />

        {/* Etapa 3: operar y medir */}
        <Zone index="03" label="Operar y medir" lit={stage >= STAGE.ia} onSelect={pickFamily('operar')}>
          {/* Capa transversal: adopción de IA */}
          <motion.div {...appear(0.25)} className="relative hover:z-40 focus-within:z-40">
            <div
              tabIndex={0}
              {...selectable(pick('agentes'))}
              className={`group relative rounded-xl border px-6 py-5 outline-none transition-all duration-500 ${
                clickable ? 'cursor-pointer' : 'cursor-default'
              } ${
                at(STAGE.ia)
                  ? 'border-orbit-blue-glow/80 shadow-[0_0_40px_-4px_rgba(99,102,241,0.7)]'
                  : 'border-orbit-blue/40 hover:border-orbit-blue/70 focus:border-orbit-blue/70'
              } bg-gradient-to-r from-orbit-blue/20 via-orbit-accent/20 to-orbit-blue/20`}
            >
              <div
                className={`pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(ellipse_at_center,rgba(96,165,250,0.18),transparent_70%)] transition-opacity duration-500 ${
                  at(STAGE.ia) ? 'opacity-100' : 'opacity-60'
                }`}
              />
              <div className="relative flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-4 sm:text-left">
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border transition-all duration-500 ${litIcon(at(STAGE.ia))}`}>
                  <Bot className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-base font-bold text-white sm:text-lg">
                    Agentes de IA conectados, con resguardos
                  </p>
                  <p className="mt-0.5 text-xs text-slate-300 sm:text-sm">
                    Operan sobre las dos vías: les pides algo y lo ejecutan dentro de tus sistemas, con
                    aprobación de una persona cuando corresponde.
                  </p>
                </div>
              </div>
              <Details
                badge="IA que ejecuta"
                items={['Conectados vía MCP', 'Ejecutan, no solo responden', 'Operación continua y capacitación']}
                clickable={clickable}
              />
            </div>
          </motion.div>

          {/* Conector hacia el cierre */}
          <Drop lit={at(STAGE.toEnd)} className="h-10" />

          {/* Cierre: el impacto se mide */}
          <motion.div {...appear(0.3)} className="relative mx-auto max-w-sm hover:z-40 focus-within:z-40">
            <EndpointBox
              icon={Gauge}
              title="Impacto medido"
              tag="Cierre del ciclo"
              note="Contra la línea base que levantamos al principio."
              badge="Valor verificado"
              details={['Línea base antes de empezar', 'Métricas acordadas', 'Medición posterior']}
              lit={at(STAGE.end)}
              onSelect={pick('impacto')}
            />
          </motion.div>
        </Zone>
      </div>
    </div>
  );
};
