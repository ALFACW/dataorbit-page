import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Clock, Sparkles, DollarSign } from 'lucide-react';

/* ---------- Animaciones, una por pilar (sin cifras: ilustran la idea del texto) ---------- */

const Person = ({ x, y = 58, color = '#60A5FA' }) => (
  <g>
    <circle cx={x} cy={y - 14} r="7" fill={color} />
    <path d={`M${x - 11},${y + 14} Q${x - 11},${y - 2} ${x},${y - 2} Q${x + 11},${y - 2} ${x + 11},${y + 14} Z`} fill={color} />
  </g>
);

/** Eficiencia: lo que hacían cuatro personas lo maneja una, con un sistema adaptado. */
const FourToOne = ({ reduceMotion }) => {
  const xs = [34, 78, 122, 166];
  return (
    <svg viewBox="0 0 260 110" className="h-full w-full" aria-hidden="true">
      {/* Las cuatro figuras avanzan hasta el sistema y se funden en él */}
      {xs.map((x, i) => (
        <motion.g
          key={x}
          animate={reduceMotion ? undefined : { x: [0, 0, 222 - x], opacity: [0.9, 0.9, 0] }}
          transition={{ duration: 3.2, times: [0, 0.3, 0.7], repeat: Infinity, repeatDelay: 0.8, delay: i * 0.08 }}
        >
          <Person x={x} color="rgba(148,163,184,0.75)" />
        </motion.g>
      ))}
      {/* El sistema que recibe el trabajo */}
      <motion.g
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <circle cx="222" cy="58" r="30" fill="transparent" />
        <circle cx="222" cy="58" r="30" fill="none" stroke="rgba(96,165,250,0.45)" strokeDasharray="6 6" strokeWidth="2" />
      </motion.g>
      {/* Una sola persona queda a cargo */}
      <motion.g
        animate={reduceMotion ? undefined : { scale: [0.6, 0.6, 1, 1], opacity: [0, 0, 1, 1] }}
        transition={{ duration: 3.2, times: [0, 0.62, 0.8, 1], repeat: Infinity, repeatDelay: 0.8 }}
      >
        <Person x={222} y={62} color="#60A5FA" />
      </motion.g>
    </svg>
  );
};

/** Simplicidad: una línea enredada que se ordena. */
const Untangle = ({ reduceMotion }) => {
  const tangled = 'M20,70 C50,10 70,100 100,40 C130,-10 140,110 170,55 C200,10 220,95 240,50';
  const clean = 'M20,80 C50,76 70,72 100,66 C130,60 140,54 170,48 C200,42 220,36 240,30';
  return (
    <svg viewBox="0 0 260 110" className="h-full w-full" aria-hidden="true">
      {/* Los dos trazados tienen los mismos comandos, así se puede interpolar entre ellos */}
      <motion.path
        initial={{ d: reduceMotion ? clean : tangled }}
        animate={{ d: clean }}
        transition={reduceMotion ? { duration: 0 } : { duration: 1.6, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', repeatDelay: 1.4 }}
        fill="none" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round"
        style={{ filter: 'drop-shadow(0 0 6px rgba(96,165,250,0.7))' }}
      />
      <circle cx="20" cy="75" r="5" fill="#6366F1" />
      <circle cx="240" cy="40" r="5" fill="#22D3EE" />
    </svg>
  );
};

/** Rentabilidad: barras que suben y una tendencia que se dibuja. */
const Growth = ({ reduceMotion }) => {
  const bars = [30, 42, 50, 64, 78];
  return (
    <svg viewBox="0 0 260 110" className="h-full w-full" aria-hidden="true">
      <line x1="20" y1="100" x2="240" y2="100" stroke="rgba(148,163,184,0.25)" />
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={34 + i * 42} width="26" rx="4"
          fill="url(#growth-bar)"
          initial={false}
          animate={reduceMotion ? { y: 100 - h, height: h } : { y: [100, 100 - h, 100 - h, 100], height: [0, h, h, 0] }}
          transition={{ duration: 4, times: [0, 0.3, 0.85, 1], repeat: Infinity, delay: i * 0.12 }}
        />
      ))}
      <motion.path
        d="M47,66 L89,54 L131,46 L173,32 L215,16"
        fill="none" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        initial={false}
        animate={reduceMotion ? { pathLength: 1 } : { pathLength: [0, 0, 1, 1, 0] }}
        transition={{ duration: 4, times: [0, 0.3, 0.6, 0.85, 1], repeat: Infinity }}
        style={{ filter: 'drop-shadow(0 0 6px rgba(34,211,238,0.7))' }}
      />
      <defs>
        <linearGradient id="growth-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#60A5FA" />
          <stop offset="1" stopColor="#6366F1" stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const Pillars = () => {
  const reduceMotion = useReducedMotion();

  // Textos del sitio vigente (dataorbit.cl)
  const pillars = [
    {
      title: 'Eficiencia',
      icon: Clock,
      label: 'Optimización de equipos',
      visual: FourToOne,
      description:
        'Hemos transformado procesos que requerían cuatro personas en tareas manejadas por una sola, gracias a sistemas adaptados. Nuestras herramientas generan retornos significativos y permiten una gestión más proactiva que reactiva.',
    },
    {
      title: 'Simplicidad',
      icon: Sparkles,
      label: 'Información clara y accesible',
      visual: Untangle,
      description:
        'Simplificamos procesos financieros complejos mediante soluciones de BI, haciendo que la información sea fácil de entender y accesible para todos en tu organización.',
    },
    {
      title: 'Rentabilidad',
      icon: DollarSign,
      label: 'Impacto en el margen operativo',
      visual: Growth,
      description:
        'Aunque los resultados específicos varían, nuestros clientes experimentan mejoras en eficiencia operativa y agilidad en el trabajo, lo que contribuye positivamente a su rentabilidad general.',
    },
  ];

  return (
    <section className="relative py-24 bg-[#0A0F1A] text-white overflow-hidden border-t border-white/5">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orbit-blue/10 blur-[150px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Nuestro impacto en la colaboración se basa en{' '}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              3 pilares
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const Visual = pillar.visual;
            return (
              <motion.div
                key={pillar.title}
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: reduceMotion ? 0 : index * 0.15 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-orbit-blue/50 hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.55)]"
              >
                <span className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-orbit-blue-glow/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="mb-6 h-28 rounded-2xl border border-white/5 bg-[#0B1222]/80 p-2">
                  <Visual reduceMotion={reduceMotion} />
                </div>

                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-orbit-blue/30 bg-orbit-blue/15 text-orbit-blue-glow transition-transform group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-2xl font-bold">{pillar.title}</h3>
                </div>

                <p className="flex-1 text-sm leading-relaxed text-slate-400 sm:text-[15px]">{pillar.description}</p>

                <p className="mt-6 border-t border-white/10 pt-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                  {pillar.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
