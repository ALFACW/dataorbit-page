import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HeartHandshake, Target, Flame, Sparkles } from 'lucide-react';

export const WhyUs = () => {
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

  return (
    <section id="por-que-nosotros" className="relative py-24 bg-[#E0E5EE] text-slate-900 overflow-hidden border-t border-slate-300">
      
      {/* Background Orbit Ring SVG ornament */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[700px] h-[700px] border border-slate-300/60 rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            ¿Por qué <span className="text-orbit-blue underline decoration-orbit-blue/30">Nosotros</span>?
          </h2>
        </div>

        {/* History Accordion Card */}
        <div className="max-w-4xl mx-auto bg-white/80 rounded-3xl p-8 sm:p-10 border border-slate-300 shadow-lg mb-16 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-orbit-blue" />
            Nuestra Historia
          </h3>

          <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed max-w-3xl mx-auto">
            DataOrbit nació de una pasión profunda por los datos y la convicción de que muchas empresas no están aprovechando todo su potencial.
          </p>

          <AnimatePresence>
            {showFullStory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4 pt-4 border-t border-slate-200 text-slate-600 text-sm sm:text-base leading-relaxed text-left max-w-3xl mx-auto"
              >
                Fundada con la visión de cerrar la brecha entre la complejidad técnica de la analítica avanzada y las necesidades operativas reales del negocio, DataOrbit combina ingeniería de datos de alta precisión con visión de gestión ejecutiva. Acompañamos a nuestros clientes a estructurar sus datos, automatizar procesos críticos y tomar decisiones con total certeza y aceleración estratégica.
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setShowFullStory(!showFullStory)}
            className="mt-6 inline-flex items-center gap-2 text-orbit-blue font-bold text-sm hover:text-blue-700 transition-colors bg-blue-50 hover:bg-blue-100 px-5 py-2 rounded-full border border-blue-200"
          >
            <span>{showFullStory ? 'Ver menos' : 'Ver más'}</span>
            {showFullStory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* 3 Royal Cobalt Blue Differentiator Cards (Matching exact visual from original PDF) */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-8 text-center sm:text-left">
            Nos diferenciamos en:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {differentiators.map((diff, idx) => {
              const Icon = diff.icon;
              return (
                <motion.div
                  key={diff.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="bg-[#2E54D8] hover:bg-[#2546BE] text-white rounded-3xl p-8 shadow-xl border border-blue-400/40 flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-sky-300" />
                    </div>

                    <h4 className="text-xl sm:text-2xl font-bold mb-4 leading-snug">
                      {diff.title}
                    </h4>

                    <p className="text-blue-100 text-sm sm:text-base leading-relaxed font-normal">
                      {diff.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/20 text-xs font-semibold text-sky-200 flex items-center justify-between">
                    <span>Pilar de Excelencia DataOrbit</span>
                    <span className="w-2 h-2 rounded-full bg-sky-300 animate-ping" />
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
