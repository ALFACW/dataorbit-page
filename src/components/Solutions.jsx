import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  BarChart3,
  Code2,
  Sparkles,
  Workflow,
  Repeat,
  BrainCircuit,
  Route,
  Handshake,
  ArrowUpRight,
} from 'lucide-react';

export const Solutions = () => {
  const reduceMotion = useReducedMotion();

  const solutions = [
    {
      id: 'bi-data',
      title: 'BI & Ingeniería de Datos',
      icon: BarChart3,
      badge: 'Business Intelligence',
      description:
        'Centralizamos y estructuramos la información que hoy vive dispersa entre planillas y sistemas distintos. Modelamos los datos, construimos el flujo que los mantiene actualizados y los dejamos en tableros que el equipo puede leer sin intermediarios.',
      highlights: ['Tableros en producción', 'ETL y modelo de datos', 'Trazabilidad y gobierno'],
    },
    {
      id: 'software-medida',
      title: 'Software a la medida',
      icon: Code2,
      badge: 'Desarrollo de producto',
      description:
        'Cuando la herramienta que se necesita no existe en el mercado, la construimos. Desarrollamos plataformas de gestión pensadas para el proceso real de la empresa, no para el promedio de la industria.',
      highlights: ['CRM y plataformas de gestión', 'Integración con sistemas existentes', 'Despliegue y soporte'],
    },
    {
      id: 'adopcion-ia',
      title: 'Adopción de IA',
      icon: Sparkles,
      badge: 'Inteligencia Artificial',
      description:
        'Acompañamos a la organización a incorporar inteligencia artificial en su operación diaria: dónde aplicarla, con qué datos y con qué resguardos. Incluye agentes conectados a los sistemas de la empresa mediante MCP, capaces de trabajar sobre información real.',
      highlights: ['Diagnóstico de oportunidades', 'Agentes conectados vía MCP', 'Capacitación del equipo'],
    },
    {
      id: 'automatizaciones',
      title: 'Automatizaciones e integraciones',
      icon: Workflow,
      badge: 'Automatización de procesos',
      description:
        'Eliminamos el trabajo repetitivo que consume horas del equipo: extracción de datos desde portales y sistemas externos, cruces entre plataformas que no se hablan y generación automática de reportes periódicos.',
      highlights: ['Integración entre sistemas', 'Extracción automatizada', 'Reportes programados'],
    },
    {
      id: 'fintech-auto',
      title: 'Automatización financiera',
      icon: Repeat,
      badge: 'Finanzas',
      description:
        'Automatizamos las tareas críticas del área financiera: clasificación de movimientos bancarios, conciliación, registro contable y gestión del flujo de caja. Menos digitación manual y menos errores arrastrados.',
      highlights: ['Conciliación desde cartola', 'Flujo de caja proyectado', 'Cumplimiento tributario'],
    },
    {
      id: 'predictive',
      title: 'Modelos predictivos',
      icon: BrainCircuit,
      badge: 'Machine Learning',
      description:
        'Analizamos el historial de la operación para proyectar lo que viene: demanda, costos, resultados productivos o financieros. Modelos construidos sobre los indicadores que el negocio ya usa para decidir.',
      highlights: ['Proyección de demanda y costos', 'Indicadores productivos', 'Escenarios y sensibilidad'],
    },
    {
      id: 'estrategia-digital',
      title: 'Estrategias digitales de optimización',
      icon: Route,
      badge: 'Estrategia Digital',
      description:
        'Levantamos el proceso completo junto a las personas que lo ejecutan, identificamos dónde se pierde tiempo y margen, y priorizamos las intervenciones por impacto antes de escribir una línea de código.',
      highlights: ['Levantamiento en terreno', 'Priorización por impacto', 'Hoja de ruta digital'],
    },
    {
      id: 'partners',
      title: 'Partners en Gestión Estratégica',
      icon: Handshake,
      badge: 'Consultoría',
      description:
        'Más que un proveedor puntual, quedamos como contraparte técnica del negocio. Acompañamos las decisiones financieras y operativas en el tiempo, con la información a la vista.',
      highlights: ['Acompañamiento continuo', 'Contraparte técnica', 'Revisión periódica'],
    },
  ];

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
        <div className="text-center mb-16">
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
            Combinamos ingeniería de datos, desarrollo a medida e inteligencia artificial para
            resolver problemas concretos de operación y gestión.
          </p>
        </div>

        {/* Service grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.article
                key={solution.id}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : (index % 2) * 0.08 }}
                className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 backdrop-blur-sm transition-all duration-300 hover:border-orbit-blue/50 hover:bg-white/[0.05] hover:-translate-y-1 hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.45)]"
              >
                {/* Top hairline that lights up on hover */}
                <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-orbit-blue-glow/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <header className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orbit-blue/25 to-orbit-accent/20 border border-orbit-blue/30 flex items-center justify-center text-orbit-blue-glow transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="block text-[10px] font-mono tracking-[0.25em] text-slate-500 mb-1">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                      {solution.title}
                    </h3>
                    <span className="mt-1 inline-block text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      {solution.badge}
                    </span>
                  </div>

                  <ArrowUpRight className="w-5 h-5 flex-shrink-0 text-slate-600 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-orbit-blue-glow transition-all duration-300" />
                </header>

                <p className="mt-5 text-sm sm:text-[15px] text-slate-400 leading-relaxed flex-1">
                  {solution.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
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
