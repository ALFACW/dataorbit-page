import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, ChevronUp, HeartHandshake, Target, Flame, Sparkles } from 'lucide-react';

export const WhyUs = () => {
  const reduceMotion = useReducedMotion();
  const [showFullStory, setShowFullStory] = useState(false);

  const differentiators = [
    {
      title: 'Acompañamiento y compromiso',
      icon: HeartHandshake,
      description:
        'Nos involucramos profundamente en cada proyecto, asegurándonos de que nuestras soluciones no solo funcionen, sino que generen un retorno visible para tu empresa.',
    },
    {
      title: 'Capacidad de entendimiento y alineación',
      icon: Target,
      description:
        'Tenemos la habilidad de comprender exactamente lo que quieres y necesitas. Nos alineamos contigo para cumplir tus objetivos y te ayudamos a alinear tus procesos y estrategias con las soluciones más efectivas.',
    },
    {
      title: 'Pasión y ambición por solucionar problemas',
      icon: Flame,
      description:
        'Nuestra pasión por los datos y nuestra ambición por resolver desafíos nos impulsa a encontrar soluciones innovadoras para los problemas más complejos. Estamos dedicados a superar obstáculos y aportar valor real a tu negocio.',
    },
  ];

  // Luz que sigue al cursor dentro de cada tarjeta
  const spotlight = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="por-que-nosotros" className="relative py-24 bg-[#070A12] text-white overflow-hidden border-t border-white/5">
      {/* Órbitas de fondo */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-[700px] w-[700px] -translate-x-1/3 -translate-y-1/2 rounded-full border border-white/[0.05]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[480px] w-[480px] translate-x-1/3 rounded-full bg-orbit-accent/10 blur-[140px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            ¿Por qué{' '}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Nosotros
            </span>
            ?
          </h2>
        </div>

        {/* Nuestra historia */}
        <div className="relative max-w-4xl mx-auto overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10 mb-16 text-center backdrop-blur-sm">
          <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orbit-blue-glow/60 to-transparent" />
          <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-orbit-blue-glow" />
            Nuestra Historia
          </h3>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            DataOrbit nació de una pasión profunda por los datos y la convicción de que muchas empresas no están aprovechando todo su potencial.
          </p>

          <AnimatePresence>
            {showFullStory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4 pt-4 border-t border-white/10 text-slate-400 text-sm sm:text-base leading-relaxed text-left max-w-3xl mx-auto"
              >
                Fundada con la visión de cerrar la brecha entre la complejidad técnica de la analítica avanzada y las necesidades operativas reales del negocio, DataOrbit combina ingeniería de datos de alta precisión con visión de gestión ejecutiva. Acompañamos a nuestros clientes a estructurar sus datos, automatizar procesos críticos y tomar decisiones con total certeza y aceleración estratégica.
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setShowFullStory(!showFullStory)}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-orbit-blue/40 bg-orbit-blue/10 px-5 py-2 text-sm font-bold text-orbit-blue-glow transition-colors hover:bg-orbit-blue/20 hover:text-white"
          >
            <span>{showFullStory ? 'Ver menos' : 'Ver más'}</span>
            {showFullStory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Diferenciadores */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center sm:text-left">
            Nos diferenciamos en:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {differentiators.map((diff, idx) => {
              const Icon = diff.icon;
              return (
                <motion.div
                  key={diff.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: reduceMotion ? 0 : idx * 0.15 }}
                  onMouseMove={spotlight}
                  className="group relative overflow-hidden rounded-3xl border border-orbit-blue/25 bg-gradient-to-br from-orbit-blue/15 via-[#0D1526] to-[#0B1222] p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-orbit-blue/60 hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.6)]"
                >
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(96,165,250,0.16), transparent 45%)',
                    }}
                  />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl border border-orbit-blue/30 bg-orbit-blue/15 flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(96,165,250,0.6)]">
                      <Icon className="w-6 h-6 text-sky-300" />
                    </div>

                    <h4 className="text-xl sm:text-2xl font-bold mb-4 leading-snug">
                      {diff.title}
                    </h4>

                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                      {diff.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
