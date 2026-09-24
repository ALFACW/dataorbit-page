import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { TrendingUp, Handshake, Package, GraduationCap, ArrowRight } from 'lucide-react';

// Tipos de sistemas, sin nombrar clientes ni proyectos en curso
const systems = [
  {
    title: 'Planificación y proyección',
    text: 'Anticipa lo que viene (producción, ventas o necesidades) cruzando datos que hoy están separados.',
    icon: TrendingUp,
  },
  {
    title: 'Gestión comercial con IA',
    text: 'Clientes, oportunidades y proyecciones en un mismo lugar, con alertas y un asistente que ejecuta.',
    icon: Handshake,
  },
  {
    title: 'Stock, compras y costos',
    text: 'Cuánto pedir y cuándo, según lo que se va a vender y lo que demora en llegar.',
    icon: Package,
  },
  {
    title: 'Gestión educacional',
    text: 'Matrícula, asistencia, resultados y finanzas de una institución educativa en un solo lugar.',
    icon: GraduationCap,
    link: { to: '/eduorbit', label: 'Conoce EduOrbit 360' },
  },
];

// Casos publicados en dataorbit.cl, con su formato Desafío / Solución y resultados
const cases = [
  {
    id: 'ahv',
    client: 'AHV',
    logo: '/logos/clients/ahv-blanco-2.png',
    title: 'Impulsando la eficiencia en la salmonicultura',
    challenge:
      'Demostrar con precisión cómo sus productos elevan la eficiencia productiva en la salmonicultura, generando ventajas competitivas reales en la industria.',
    solution:
      'Modelo predictivo avanzado que evidencia, con datos en tiempo real, cómo sus productos mejoran indicadores clave como FCR, Kg/Smolt e ICA. Herramienta interactiva que permitió mostrar a sus clientes, con transparencia, incrementos directos en rentabilidad.',
  },
  {
    id: 'iz',
    client: 'IZ',
    logo: '/logos/clients/iz-blanco.png',
    title: 'Automatización en contabilidad',
    challenge:
      'Optimizar el proceso manual y repetitivo de elaboración de formularios 29 (declaración de IVA) para numerosos clientes.',
    solution:
      'Solución automatizada con scraping, integrada con el Servicio de Impuestos Internos. Descarga automatizada y registro contable inmediato, estandarizado y sin errores.',
  },
  {
    id: 'huiro',
    client: 'Huiro',
    logo: '/logos/clients/huiro-blanco.png',
    title: 'Optimización del flujo de caja',
    challenge:
      'Contar con una herramienta ágil para gestionar el flujo de caja desde la cartola bancaria y proyectar las finanzas del negocio.',
    solution:
      'Plataforma semiautomatizada que clasifica movimientos bancarios y los asocia a centros de costo. Dashboards BI para anticipar proyecciones basadas en cuentas por cobrar, pagar y presupuestos.',
  },
  {
    id: 'protectora',
    client: 'La Protectora',
    logo: '/logos/clients/la-protectora-blanco-2.png',
    title: 'Transformación digital en educación',
    challenge:
      'Centralizar información dispersa en múltiples plataformas y transformar la gestión educativa mediante una cultura de datos.',
    solution:
      'Dashboard integral que consolidó matrícula, asistencia y desempeño académico en una sola plataforma.',
  },
];

/**
 * Lo que construimos: los tipos de sistemas que hacemos y, debajo, los casos
 * reales publicados. Los casos se eligen con el cursor (o tocando, en móvil).
 */
export const WhatWeBuild = () => {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = cases[active];

  return (
    <section id="lo-que-construimos" className="relative overflow-hidden border-t border-white/5 bg-[#070A12] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[460px] w-[860px] -translate-x-1/2 rounded-full bg-orbit-blue/10 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="rounded-full border border-orbit-blue/30 bg-orbit-blue/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-orbit-blue-glow">
            Lo que construimos
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Sistemas que{' '}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              planifican y operan
            </span>
          </h2>
        </div>

        {/* Tipos de sistemas */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {systems.map(({ title, text, icon: Icon, link }, i) => (
            <motion.div
              key={title}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: reduceMotion ? 0 : i * 0.08 }}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orbit-blue/50 hover:shadow-[0_0_40px_-12px_rgba(59,130,246,0.5)]"
            >
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-orbit-blue/30 bg-orbit-blue/15 text-orbit-blue-glow transition-transform group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold leading-snug">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{text}</p>
              {link && (
                <Link to={link.to} className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-300 transition hover:text-emerald-200">
                  {link.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Casos reales */}
        <div className="mt-20">
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />
            <h3 className="text-xl font-bold sm:text-2xl">Casos reales</h3>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
          </div>

          <div role="tablist" aria-label="Casos" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {cases.map((c, i) => {
              const isActive = i === active;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`flex h-20 items-center justify-center rounded-2xl border px-4 transition-all duration-300 ${
                    isActive
                      ? 'border-orbit-blue-glow/60 bg-orbit-blue/15 shadow-[0_0_30px_-8px_rgba(96,165,250,0.7)]'
                      : 'border-white/10 bg-white/[0.02] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={c.logo} alt={c.client} className="max-h-10 w-auto max-w-full object-contain" />
                </button>
              );
            })}
          </div>

          <div role="tabpanel" className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#101a2e] to-[#0B1222] p-6 sm:p-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-[11px] font-bold uppercase tracking-widest text-orbit-blue-glow">{current.client}</p>
                <h4 className="mt-1 text-xl font-extrabold sm:text-2xl">{current.title}</h4>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-amber-400/20 bg-amber-500/[0.05] p-5">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-amber-300">Desafío</p>
                    <p className="text-sm leading-relaxed text-slate-300">{current.challenge}</p>
                  </div>
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.05] p-5">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-300">Solución y resultados</p>
                    <p className="text-sm leading-relaxed text-slate-300">{current.solution}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
