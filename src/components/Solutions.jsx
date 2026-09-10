import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Repeat, BrainCircuit, Handshake, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const Solutions = () => {
  const solutions = [
    {
      id: 'bi-data',
      title: 'BI & Ingeniería de Datos',
      icon: BarChart3,
      badge: 'Business Intelligence',
      description:
        'Transformamos tus datos en información valiosa y accionable. A través de soluciones de Business Intelligence y una sólida ingeniería de datos, centralizamos y estructuramos tu información para facilitar decisiones informadas y estratégicas.',
      highlights: ['Dashboards en Tiempo Real', 'ETL & Data Warehousing', 'Gobernanza de Datos'],
    },
    {
      id: 'fintech-auto',
      title: 'Automatización financiera',
      icon: Repeat,
      badge: 'Process Automation',
      description:
        'Optimizamos tus procesos financieros automatizando tareas críticas como la gestión del flujo de caja y registros contables. Reducimos errores manuales y liberamos recursos para que te enfoques en lo que realmente importa: hacer crecer tu negocio.',
      highlights: ['Conciliación Bancaria Automática', 'Gestión de Cash Flow', 'Reportes Financieros 100% Exactos'],
    },
    {
      id: 'predictive',
      title: 'Modelos predictivos',
      icon: BrainCircuit,
      badge: 'Artificial Intelligence & ML',
      description:
        'Anticípate al futuro con nuestros modelos predictivos. Analizamos tendencias y comportamientos para ayudarte a planificar y optimizar recursos, mejorando tus estrategias de marketing y ventas mientras reduces riesgos.',
      highlights: ['Proyección de Demanda', 'Machine Learning Custom', 'Detección de Patrones'],
    },
    {
      id: 'partners',
      title: 'Partners en Gestión Estratégica',
      icon: Handshake,
      badge: 'Strategic Consulting',
      description:
        'Más que un proveedor, somos tus socios estratégicos. Te acompañamos en la toma de decisiones financieras y operativas, alineando estrategias y procesos para mejorar la rentabilidad y eficiencia de tu empresa.',
      highlights: ['Acompañamiento Continuo', 'Optimización de Margen', 'Alineación Operativa'],
    },
  ];

  return (
    <section id="soluciones" className="relative py-24 bg-[#ECEFF5] text-slate-900 overflow-hidden">
      
      {/* Background Decorative Orbit Rings (Fiel a la gráfica original) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-slate-300/60 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] border border-slate-300/40 rounded-full pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-orbit-blue bg-blue-100/80 px-4 py-1.5 rounded-full border border-blue-200">
            Nuestros Servicios
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Nuestras <span className="text-orbit-blue underline underline-offset-8 decoration-orbit-blue/30">Soluciones</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Impulsamos la transformación digital de tu negocio combinando ingeniería de datos moderna y estrategia de alto nivel.
          </p>
        </div>

        {/* Vertical List of Pill Cards (Matching exact visual from screenshot) */}
        <div className="flex flex-col gap-6">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-[#A4B5F7]/80 hover:bg-[#93A6F5] transition-all duration-300 rounded-[2.5rem] p-6 sm:p-8 border border-blue-300/50 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  
                  {/* Icon Circle */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/90 shadow-md flex items-center justify-center text-orbit-blue group-hover:scale-110 transition-transform flex-shrink-0">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                        {solution.title}
                      </h3>
                      <span className="hidden sm:inline-block px-3 py-0.5 rounded-full bg-white/60 text-slate-700 text-xs font-semibold">
                        {solution.badge}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-slate-800 leading-relaxed mt-2 font-medium">
                      {solution.description}
                    </p>

                    {/* Feature Chips */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {solution.highlights.map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/70 text-slate-900 text-xs font-medium border border-blue-200"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-orbit-blue" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow Action */}
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/40 group-hover:bg-orbit-blue group-hover:text-white transition-all text-slate-700 flex-shrink-0">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
