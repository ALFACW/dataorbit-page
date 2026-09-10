import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles, DollarSign, ArrowRight } from 'lucide-react';

export const Pillars = () => {
  const pillars = [
    {
      title: 'Eficiencia',
      icon: Clock,
      stat: '4x',
      statLabel: 'Optimización de Equipos',
      description:
        'Hemos transformado procesos que requerían cuatro personas en tareas manejadas por una sola, gracias a sistemas adaptados. Nuestras herramientas generan retornos significativos y permiten una gestión más proactiva que reactiva.',
    },
    {
      title: 'Simplicidad',
      icon: Sparkles,
      stat: '100%',
      statLabel: 'Información Clara & Accesible',
      description:
        'Simplificamos procesos financieros complejos mediante soluciones de BI, haciendo que la información sea fácil de entender y accesible para todos en tu organización.',
    },
    {
      title: 'Rentabilidad',
      icon: DollarSign,
      stat: '+ ROI',
      statLabel: 'Impacto en Margen Operativo',
      description:
        'Aunque los resultados específicos varían, nuestros clientes experimentan mejoras en eficiencia operativa y agilidad en el trabajo, lo que contribuye positivamente a su rentabilidad general.',
    },
  ];

  return (
    <section className="relative py-20 bg-[#E5E9F2] text-slate-900 overflow-hidden border-t border-slate-300/40">
      
      {/* Background Orbit Ring Accent */}
      <div className="absolute -bottom-20 left-10 w-[500px] h-[500px] border border-slate-300/50 rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Nuestro impacto en la colaboración se basa en{' '}
            <span className="text-orbit-blue underline decoration-orbit-blue/30">3 pilares</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-[#A4B5F7]/90 hover:bg-[#93A6F5] transition-all duration-300 rounded-3xl p-8 border border-blue-300/60 shadow-lg hover:shadow-2xl flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-orbit-blue group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-2xl font-black text-orbit-blue bg-white/70 px-3 py-1 rounded-xl shadow-sm">
                      {pillar.stat}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-blue-300/60 flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>{pillar.statLabel}</span>
                  <ArrowRight className="w-4 h-4 text-orbit-blue group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
