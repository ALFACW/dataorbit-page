import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Compass, Database, Code2, Bot, LifeBuoy, Gauge, Layers } from 'lucide-react';
import { ServiceFlow } from './ServiceFlow';

export const Solutions = () => {
  const reduceMotion = useReducedMotion();

  /**
   * El catálogo se agrupa en el mismo orden en que avanza un proyecto y en las
   * mismas etapas del mapa de ServiceFlow: primero se entiende, después se
   * construye, y al final se opera con IA y se mide.
   */
  const families = [
    {
      id: 'entender',
      label: 'Entender',
      caption: 'Cómo trabaja tu equipo de verdad, y qué conviene resolver primero',
      services: [
        {
          id: 'diagnostico',
          title: 'Diagnóstico y hoja de ruta de IA',
          icon: Compass,
          badge: 'Punto de partida',
          description:
            'Antes de construir nada, conversamos con el equipo: primero en conjunto, para entender el proceso completo, y después con cada persona, para ver lo que en grupo no aparece. Con eso priorizamos qué conviene resolver primero y entregamos una hoja de ruta por impacto, con alcance y plazo acotados.',
          highlights: ['Conversaciones con el equipo', 'Hoja de ruta priorizada', 'Alcance y plazo acotados'],
        },
      ],
    },
    {
      id: 'construir',
      label: 'Construir',
      caption: 'Los datos ordenados y la plataforma que la operación necesita',
      services: [
        {
          id: 'datos-ia',
          title: 'Datos listos para IA',
          icon: Database,
          badge: 'Ingeniería de datos y BI',
          description:
            'Unimos la información que hoy vive en planillas, sistemas y plataformas externas en un modelo de datos confiable, que se actualiza solo y tiene escritas las definiciones del negocio. Sobre esa base funcionan los tableros, las proyecciones y cualquier IA que venga después. También deja claro qué datos personales existen y quién accede a ellos, un paso necesario frente a la nueva Ley 21.719 de protección de datos personales.',
          highlights: ['Datos unidos y actualizados', 'Tableros y proyecciones', 'Trazabilidad y gobierno'],
        },
        {
          id: 'plataformas',
          title: 'Plataformas a la medida',
          icon: Code2,
          badge: 'Software y automatización',
          description:
            'Construimos el sistema que la operación necesita, ajustado a su proceso: planificación, proyecciones, alertas y automatizaciones en un mismo lugar, conectado con los sistemas que ya existen. Construir software propio dejó de ser caro y lento; lo que marca la diferencia es que calce con cómo trabaja tu equipo.',
          highlights: ['Ajustado al proceso real', 'Automatizaciones e integraciones', 'Con IA incorporada'],
        },
      ],
    },
    {
      id: 'operar',
      label: 'Operar y medir',
      caption: 'Que la IA se use todos los días, y que el impacto quede demostrado',
      services: [
        {
          id: 'agentes',
          title: 'Agentes conectados, con resguardos',
          icon: Bot,
          badge: 'IA que ejecuta',
          description:
            'No un chatbot que conversa, sino agentes con acceso real a los sistemas de la empresa mediante MCP: les pides algo y lo ejecutan, leyendo la información que ya existe y devolviendo trabajo hecho. Cada agente se entrega con resguardos definidos: a qué datos accede, qué ejecuta solo y qué requiere aprobación de una persona.',
          highlights: ['Conectados vía MCP', 'Ejecutan, no solo responden', 'Aprobación humana cuando corresponde'],
        },
        {
          id: 'operacion',
          title: 'Operación continua y adopción',
          icon: LifeBuoy,
          badge: 'Acompañamiento',
          description:
            'La IA deja de ser una promesa cuando el equipo la usa todos los días. Por eso nos quedamos después de la entrega: monitoreamos lo que construimos, capacitamos al equipo y ajustamos cuando el negocio cambia. Es la relación larga, no el proyecto puntual.',
          highlights: ['Monitoreo de lo entregado', 'Capacitación del equipo', 'Mejora continua'],
        },
        {
          id: 'impacto',
          title: 'Impacto medido',
          icon: Gauge,
          badge: 'Valor verificado',
          description:
            'Medimos el proceso antes de tocarlo y volvemos a medirlo después, con métricas acordadas contigo desde el inicio: horas liberadas, errores evitados, plata que se mueve antes. Si algo no se puede medir con rigor, lo decimos. No publicamos cifras que no podamos sostener.',
          highlights: ['Línea base antes de empezar', 'Métricas acordadas', 'Medición posterior'],
        },
      ],
    },
  ];

  // Numeración corrida a lo largo de todas las familias
  const numbers = {};
  families.forEach((family) =>
    family.services.forEach((service) => {
      numbers[service.id] = String(Object.keys(numbers).length + 1).padStart(2, '0');
    })
  );

  const familyIcons = { entender: Compass, construir: Layers, operar: Gauge };

  const [activeFamily, setActiveFamily] = useState(families[0].id);
  const [focused, setFocused] = useState(null);
  const catalogRef = useRef(null);
  const focusTimer = useRef(null);

  useEffect(() => () => clearTimeout(focusTimer.current), []);

  const familyOf = (serviceId) => families.find((f) => f.services.some((s) => s.id === serviceId))?.id;

  // Desde el mapa: abre la etapa, resalta el servicio elegido un momento y baja al detalle
  const goTo = (familyId, serviceId = null) => {
    setActiveFamily(familyId);
    setFocused(serviceId);
    clearTimeout(focusTimer.current);
    if (serviceId) focusTimer.current = setTimeout(() => setFocused(null), 3500);
    catalogRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  // Luz que sigue al cursor dentro de cada tarjeta
  const spotlight = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  const current = families.find((f) => f.id === activeFamily);

  return (
    <section
      id="soluciones"
      className="relative py-24 sm:py-28 bg-orbit-dark text-slate-100 overflow-hidden border-t border-white/5"
    >
      {/* Ambient depth: orbit rings kept from the original layout, now on dark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-white/[0.06] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] border border-white/[0.04] rounded-full pointer-events-none" />
      <div className="absolute -top-48 -right-40 w-[520px] h-[520px] bg-orbit-blue/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-48 -left-40 w-[520px] h-[520px] bg-orbit-accent/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Technical grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.09) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-orbit-blue-glow bg-orbit-blue/10 px-4 py-1.5 rounded-full border border-orbit-blue/30">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orbit-blue-glow opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orbit-blue-glow" />
            </span>
            Nuestros Servicios
          </span>

          <h2 className="mt-5 text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Nuestras{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400">
              Soluciones
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Partimos entendiendo cómo trabaja tu equipo, construimos sobre tus datos y nos quedamos
            hasta que la IA se usa en el día a día.
          </p>
        </div>

        {/* Primero el mapa: cómo se integran los servicios. Cada tramo es una etapa del detalle de abajo */}
        <ServiceFlow
          className=""
          onSelectService={(serviceId) => goTo(familyOf(serviceId), serviceId)}
          onSelectFamily={(familyId) => goTo(familyId)}
        />

        {/* Después, el detalle de cada etapa */}
        <div ref={catalogRef} className="mt-24 scroll-mt-24">
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />
            <h3 className="text-xl font-bold text-white sm:text-2xl">Cada etapa, en detalle</h3>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
          </div>

          {/* Pestañas de etapa */}
          <div role="tablist" aria-label="Etapas" className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {families.map((family, i) => {
              const Icon = familyIcons[family.id];
              const isActive = family.id === activeFamily;
              return (
                <button
                  key={family.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFamily(family.id)}
                  className={`relative inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition-colors duration-300 ${
                    isActive
                      ? 'border-orbit-blue-glow/60 text-white shadow-[0_0_24px_-6px_rgba(96,165,250,0.8)]'
                      : 'border-white/10 text-slate-400 hover:border-white/25 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="family-tab"
                      className="absolute inset-0 rounded-full bg-orbit-blue/20"
                      transition={reduceMotion ? { duration: 0 } : { type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <Icon className="relative h-4 w-4" />
                  <span className="relative">
                    <span className="mr-1.5 font-mono text-[11px] text-slate-500">0{i + 1}</span>
                    {family.label}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-center text-sm text-slate-500">{current.caption}</p>

          {/* Tarjetas de la etapa activa */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeFamily}
              role="tabpanel"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-10 grid md:grid-cols-2 gap-5"
            >
              {current.services.map((solution, index) => {
                const Icon = solution.icon;
                const isFocused = focused === solution.id;
                // Si la etapa tiene un número impar de servicios, el último ocupa el ancho completo
                const spanLast = index === current.services.length - 1 && current.services.length % 2 === 1;
                return (
                  <motion.article
                    key={solution.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: reduceMotion ? 0 : index * 0.06 }}
                    onMouseMove={spotlight}
                    className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white/[0.03] p-6 sm:p-7 backdrop-blur-sm transition-all duration-300 hover:border-orbit-blue/50 hover:bg-white/[0.05] hover:-translate-y-1 hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)] ${
                      spanLast ? 'md:col-span-2' : ''
                    } ${
                      isFocused
                        ? 'border-orbit-blue-glow/80 shadow-[0_0_50px_-8px_rgba(96,165,250,0.8)]'
                        : 'border-white/10'
                    }`}
                  >
                    {/* Luz que sigue al cursor */}
                    <span
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          'radial-gradient(360px circle at var(--x, 50%) var(--y, 50%), rgba(96,165,250,0.13), transparent 45%)',
                      }}
                    />
                    {/* Top hairline that lights up on hover */}
                    <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-orbit-blue-glow/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <header className="relative flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orbit-blue/25 to-orbit-accent/20 border border-orbit-blue/30 flex items-center justify-center text-orbit-blue-glow transition-transform duration-300 group-hover:scale-110">
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="block text-[10px] font-mono tracking-[0.25em] text-slate-500 mb-1">
                          {numbers[solution.id]}
                        </span>
                        <h4 className="text-lg sm:text-xl font-bold text-white leading-snug">
                          {solution.title}
                        </h4>
                        <span className="mt-1 inline-block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                          {solution.badge}
                        </span>
                      </div>
                    </header>

                    <p className="relative mt-5 text-sm sm:text-[15px] text-slate-400 leading-relaxed flex-1">
                      {solution.description}
                    </p>

                    <ul className="relative mt-6 flex flex-wrap gap-2">
                      {solution.highlights.map((item) => (
                        <li
                          key={item}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-medium text-slate-300 transition-colors group-hover:border-orbit-blue/25"
                        >
                          <span className="w-1 h-1 rounded-full bg-orbit-blue-glow/70" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Closing CTA */}
        <div className="mt-14 text-center">
          <p className="text-sm sm:text-base text-slate-400">
            ¿Lo que necesitas no calza exactamente con ninguno?{' '}
            <a
              href="#contacto"
              className="font-semibold text-orbit-blue-glow hover:text-white underline underline-offset-4 decoration-orbit-blue/40 hover:decoration-white/60 transition-colors"
            >
              Conversemos el caso
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};
