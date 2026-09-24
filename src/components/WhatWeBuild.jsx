import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
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

/**
 * Lo que construimos: ejemplos de las plataformas a la medida que hacemos,
 * descritos por tipo de sistema, sin nombrar clientes ni proyectos en curso.
 */
export const WhatWeBuild = () => {
  const reduceMotion = useReducedMotion();

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
          <p className="mt-4 text-sm text-slate-400 sm:text-base">
            Ejemplos de plataformas a la medida que construimos sobre los datos de cada empresa.
          </p>
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

      </div>
    </section>
  );
};
