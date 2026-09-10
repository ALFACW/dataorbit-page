import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Award, Quote, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

export const TrustCarousel = () => {
  const [activeTab, setActiveTab] = useState(0);

  const testimonials = [
    {
      company: 'Empresa Líder Acuícola / Salmonicultura',
      industry: 'Industria Acuícola & Operaciones',
      quote:
        'DataOrbit transformó nuestra gestión de datos operativos. Automatizamos reportes semanales y modelos de proyección de costos con una reducción del 75% en tiempos.',
      metrics: '4x Eficiencia Operativa',
      tag: 'Caso Éxito BI & Automatización',
    },
    {
      company: 'Grupo Financiero & Servicios',
      industry: 'Servicios Financieros',
      quote:
        'La precisión de los modelos predictivos de DataOrbit nos permitió anticipar variaciones de flujo de caja y tomar decisiones proactivas en lugar de reactivas.',
      metrics: '-65% Incertidumbre Financiera',
      tag: 'Caso Éxito Finanzas',
    },
    {
      company: 'Operador Logístico & Cadena de Suministro',
      industry: 'Logística',
      quote:
        'El acompañamiento de DataOrbit fue clave. No solo entregaron dashboards interactivos, sino que se integraron como verdaderos socios estratégicos.',
      metrics: '100% Visibilidad en Tiempo Real',
      tag: 'Caso Éxito Gestión Estratégica',
    },
  ];

  const clientLogos = [
    'MOWI Chile',
    'Salmones Camanchaca',
    'AquaChile',
    'Multiexport',
    'Cermaq',
    'Australis',
    'Empresas Maritime',
    'FinTech Sur',
  ];

  return (
    <section id="casos-exito" className="relative py-24 bg-[#E2E7F0] text-slate-900 overflow-hidden border-t border-slate-300">
      
      {/* Background Orbit circles */}
      <div className="absolute top-10 right-10 w-[600px] h-[600px] border border-slate-300/60 rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-orbit-blue bg-blue-100 px-4 py-1.5 rounded-full border border-blue-200">
            Confianza & Experiencia
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Quienes <span className="text-orbit-blue">Confían en Nosotros</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Acompañamos a grandes empresas e industrias en la toma de decisiones respaldadas por analítica avanzada.
          </p>
        </div>

        {/* Testimonial Spotlight Card (Matching blue hero video card in original screenshot) */}
        <div className="relative bg-gradient-to-r from-orbit-blue to-indigo-700 rounded-[2.5rem] p-8 sm:p-12 text-white shadow-2xl overflow-hidden mb-16">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-md mb-6">
                <Award className="w-4 h-4 text-yellow-300" />
                {testimonials[activeTab].tag}
              </div>

              <Quote className="w-12 h-12 text-blue-200/40 mb-4" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-xl sm:text-2xl font-medium leading-relaxed italic text-blue-50">
                    "{testimonials[activeTab].quote}"
                  </p>
                  
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <div>
                      <h4 className="text-lg font-bold text-white">
                        {testimonials[activeTab].company}
                      </h4>
                      <p className="text-sm text-blue-200">
                        {testimonials[activeTab].industry}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Metrics Badge */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
                {testimonials[activeTab].metrics.split(' ')[0]}
              </span>
              <span className="text-sm font-semibold text-blue-100">
                {testimonials[activeTab].metrics.split(' ').slice(1).join(' ')}
              </span>
              
              {/* Pagination controls */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setActiveTab((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition text-white"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-bold text-blue-200">
                  {activeTab + 1} / {testimonials.length}
                </span>
                <button
                  onClick={() => setActiveTab((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition text-white"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Marquee Continuous Client Showcase */}
        <div className="relative overflow-hidden py-4 rounded-2xl bg-white/60 border border-slate-300">
          <div className="flex w-[200%] animate-marquee items-center gap-12 sm:gap-16">
            {[...clientLogos, ...clientLogos].map((logo, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-slate-700 font-extrabold text-lg sm:text-xl whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity"
              >
                <Building2 className="w-5 h-5 text-orbit-blue" />
                <span>{logo}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
