import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  ChevronLeft,
  ChevronRight,
  Building2,
  Calculator,
  Waves,
  GraduationCap,
  Fish,
  Ship,
  School,
  Bot
} from 'lucide-react';

const cases = [
  {
    company: 'MOWI CHILE',
    industry: 'Salmonicultura · Logística & Procesos',
    icon: Ship,
    logoUrl: '/logos/clients/mowi.svg',
    title: 'BI e Ingeniería de Datos',
    tag: 'BI & Pipelines · Logística',
    challenge:
      'Dar visibilidad integral al área de logística y procesos, y terminar con la elaboración manual y fragmentada de los reportes mensuales.',
    solution:
      'Implementamos tableros asociados a logística y procesos, junto con la generación automática de reportes mensuales y monitores de pipeline. La automatización liberó horas críticas de trabajo recurrente del equipo y garantizó trazabilidad diaria.',
    metrics: [
      { label: 'Reportes Mensuales', value: '100% Auto' },
      { label: 'Visibilidad Operativa', value: 'Tiempo Real' },
      { label: 'Carga de Trabajo Manual', value: 'Liberada' },
    ],
  },
  {
    company: 'FEDUCA CORPORACIÓN EDUCACIONAL',
    industry: 'Educación · Gestión Institucional',
    icon: School,
    logoUrl: null,
    title: 'Modelo Presupuestario Proyectado',
    tag: 'Finanzas & Subvención · Educación',
    challenge:
      'Consolidar la ejecución presupuestaria de múltiples establecimientos y proyectar con exactitud los ingresos por subvención estatal sobre bases históricas reales.',
    solution:
      'Desarrollamos un modelo presupuestario integral que toma la ejecución real histórica y proyecta hacia el futuro, incorporando todos los cálculos de ingresos por subvención para dos colegios y visualizaciones interactivas de ejecución vs. real.',
    metrics: [
      { label: 'Subvención Escolar', value: 'Automatizada' },
      { label: 'Colegios en Plataforma', value: '1 Vista' },
      { label: 'Control Ejecución vs Real', value: '100% Preciso' },
    ],
  },
  {
    company: 'DATAORBIT · PRODUCTO PROPIO',
    industry: 'Ingeniería de Software & Agentes de IA',
    icon: Bot,
    logoUrl: '/logos/nuevo-icono-dataorbit.svg',
    title: 'Gestión con Protocolo MCP de IA',
    tag: 'Innovación · Model Context Protocol',
    challenge:
      'Conectar el trabajo asistido por modelos de inteligencia artificial con los tableros de gestión, métricas y trazabilidad de avance en los proyectos.',
    solution:
      'Desarrollamos una plataforma de gestión de proyectos con integración nativa de MCP (Model Context Protocol), permitiendo que los agentes de IA registren avances, auditen entregables y actualicen el estado del desarrollo en tiempo real.',
    metrics: [
      { label: 'Integración MCP', value: 'Nativa' },
      { label: 'Avances con IA', value: 'En Línea' },
      { label: 'Diferenciador Tecnológico', value: 'Líder' },
    ],
  },
  {
    company: 'AHV ® INTERNATIONAL',
    industry: 'Salud Animal & Salmonicultura',
    icon: Fish,
    logoUrl: '/logos/clients/ahv-blanco-2.png',
    title: 'Impulsando la Eficiencia en la Salmonicultura',
    tag: 'Modelo Predictivo · Salmonicultura',
    challenge:
      'Demostrar con precisión cómo sus productos elevan la eficiencia productiva en la salmonicultura, generando ventajas competitivas reales en la industria.',
    solution:
      'Creamos un modelo predictivo avanzado que evidencia, con datos en tiempo real, cómo sus productos mejoran significativamente indicadores clave como el FCR, Kg/Smolt e ICA. Esta herramienta interactiva permitió que la empresa mostrara a sus clientes, con total transparencia, incrementos directos en rentabilidad, posicionándolos claramente por sobre su competencia y generando un impacto económico tangible en cada ciclo productivo.',
    metrics: [
      { label: 'Indicadores FCR / Kg Smolt', value: 'Tiempo Real' },
      { label: 'Demostración de Rentabilidad', value: 'Transparente' },
      { label: 'Impacto por Ciclo', value: 'Tangible' },
    ],
  },
  {
    company: 'LA PROTECTORA DE LA INFANCIA DESDE 1894',
    industry: 'Educación & Gestión Social',
    icon: GraduationCap,
    logoUrl: '/logos/clients/la-protectora-blanco-2.png',
    title: 'Transformación Digital en Educación',
    tag: 'Transformación Digital & BI Integral',
    challenge:
      'Centralizar información dispersa en múltiples plataformas y transformar la gestión educativa mediante una sólida cultura de datos.',
    solution:
      'Creamos un dashboard integral que consolidó en una sola plataforma datos clave sobre matrícula, asistencia y desempeño académico. Este sistema generó una visión clara, unificada y fácilmente accesible del rendimiento escolar y corporativo, facilitando la toma de decisiones informadas y potenciando la adopción de una cultura orientada a datos dentro de toda la organización educativa.',
    metrics: [
      { label: 'Plataformas Unificadas', value: '1 Vista 360°' },
      { label: 'KPIs Académicos y Matrícula', value: 'Centralizados' },
      { label: 'Cultura de Datos', value: 'Institucional' },
    ],
  },
  {
    company: 'IVAN ZAPATA SERVICIOS CONTABLES',
    industry: 'Servicios Contables & Tributarios',
    icon: Calculator,
    logoUrl: '/logos/clients/iz-blanco.png',
    title: 'Automatización en Contabilidad',
    tag: 'Automatización & Scraping · SII',
    challenge:
      'Optimizar y agilizar el proceso manual y repetitivo de elaboración de formularios 29 (declaración IVA) para numerosos clientes.',
    solution:
      'Desarrollamos e implementamos una solución automatizada con tecnología scrapping, integrada directamente con el Servicio de Impuestos Internos. El resultado fue una descarga automatizada y un registro contable inmediato, estandarizado y sin errores, logrando importantes ahorros de tiempo y recursos, además de mejorar significativamente el control interno y la calidad del servicio a sus clientes.',
    metrics: [
      { label: 'Descarga y Registro SII', value: '100% Auto' },
      { label: 'Ahorro de Tiempo', value: 'Significativo' },
      { label: 'Tasa de Error', value: '0%' },
    ],
  },
  {
    company: 'HUIRO AGRICULTURA OCEÁNICA REGENERATIVA',
    industry: 'Agricultura Oceánica Regenerativa',
    icon: Waves,
    logoUrl: '/logos/clients/huiro-blanco.png',
    title: 'Optimización del Flujo de Caja',
    tag: 'BI & Proyección Financiera',
    challenge:
      'Contar con una herramienta ágil que permitiera gestionar el flujo de caja directamente desde la cartola bancaria y proyectar con alta precisión las finanzas del negocio.',
    solution:
      'Implementamos una plataforma semiautomatizada que clasifica movimientos bancarios automáticamente, asociándolos a centros de costos y cuentas específicas. Esta solución generó dashboards mediante BI claros e intuitivos, permitiendo visualizar rápidamente el comportamiento del flujo de caja, anticipar proyecciones financieras precisas basadas en cuentas por cobrar, pagar y presupuestos, aumentando notablemente la eficiencia y precisión de la gestión financiera.',
    metrics: [
      { label: 'Clasificación de Movimientos', value: 'Automática' },
      { label: 'Proyección de Caja', value: 'Alta Precisión' },
      { label: 'Visibilidad Financiera', value: 'Tiempo Real' },
    ],
  },
];

const clientLogos = [
  { name: 'MOWI CHILE', logoUrl: '/logos/clients/mowi.svg', icon: Ship },
  { name: 'AHV ® INTERNATIONAL', logoUrl: '/logos/clients/ahv-blanco-2.png', icon: Fish },
  { name: 'LA PROTECTORA', logoUrl: '/logos/clients/la-protectora-blanco-2.png', icon: GraduationCap },
  { name: 'IVÁN ZAPATA', logoUrl: '/logos/clients/iz-blanco.png', icon: Calculator },
  { name: 'HUIRO OCEÁNICA', logoUrl: '/logos/clients/huiro-blanco.png', icon: Waves },
  { name: 'FEDUCA CORPORACIÓN', logoUrl: null, icon: School },
  { name: 'DATAORBIT MCP', logoUrl: '/logos/nuevo-icono-dataorbit.svg', icon: Bot },
];

export const TrustCarousel = () => {
  const [activeTab, setActiveTab] = useState(0);

  const prev = () => setActiveTab((p) => (p === 0 ? cases.length - 1 : p - 1));
  const next = () => setActiveTab((p) => (p === cases.length - 1 ? 0 : p + 1));

  const current = cases[activeTab];
  const Icon = current.icon;

  return (
    <section id="casos-exito" className="relative py-24 bg-[#E2E7F0] text-slate-900 overflow-hidden border-t border-slate-300">

      {/* Background Orbit circles */}
      <div className="absolute top-10 right-10 w-[600px] h-[600px] border border-slate-300/60 rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-orbit-blue bg-blue-100 px-4 py-1.5 rounded-full border border-blue-200">
            Confianza & Experiencia Real
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Quienes <span className="text-orbit-blue">Confían en Nosotros</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Casos reales de impacto: analítica avanzada, automatización, modelos predictivos y adopción tecnológica de punta.
          </p>
        </div>

        {/* Case Spotlight Card */}
        <div className="relative bg-gradient-to-r from-orbit-blue to-indigo-700 rounded-[2.5rem] p-8 sm:p-12 text-white shadow-2xl overflow-hidden mb-10">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left: Case Content */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-md mb-5">
                <Award className="w-4 h-4 text-yellow-300" />
                {current.tag}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex flex-wrap items-center gap-4 mb-5">
                    {current.logoUrl ? (
                      <div className="h-14 px-4 py-2 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center backdrop-blur-md shadow-sm">
                        <img
                          src={current.logoUrl}
                          alt={current.company}
                          className="max-h-9 max-w-[150px] w-auto object-contain filter drop-shadow"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shadow-inner">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-lg sm:text-xl font-extrabold text-white tracking-wide">{current.company}</h4>
                      <p className="text-xs sm:text-sm font-semibold text-blue-200">{current.title} · <span className="text-blue-100/80">{current.industry}</span></p>
                    </div>
                  </div>

                  <div className="mb-5 bg-white/10 rounded-2xl p-4 border border-white/15 backdrop-blur-sm">
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-1.5">Desafío</p>
                    <p className="text-sm sm:text-base text-blue-50 leading-relaxed">{current.challenge}</p>
                  </div>

                  <div className="bg-white/10 rounded-2xl p-4 sm:p-5 border border-white/15 backdrop-blur-sm">
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-1.5">Solución y Resultados</p>
                    <p className="text-sm sm:text-base text-blue-50 leading-relaxed font-normal">
                      {current.solution}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Metrics + Navigation */}
            <div className="lg:col-span-4 flex flex-col gap-4">

              {/* Metrics */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`metrics-${activeTab}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-1 gap-3"
                >
                  {current.metrics.map((m, i) => (
                    <div
                      key={i}
                      className="p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md text-center"
                    >
                      <span className="block text-xl sm:text-2xl font-extrabold text-white">{m.value}</span>
                      <span className="text-xs font-semibold text-blue-200 mt-1 block">{m.label}</span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between bg-white/10 rounded-2xl p-3 border border-white/20 mt-2">
                <button
                  onClick={prev}
                  className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 transition text-white"
                  aria-label="Anterior caso"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-center">
                  <span className="text-sm font-bold text-white">
                    {activeTab + 1} / {cases.length}
                  </span>
                  <p className="text-[11px] text-blue-200 font-medium truncate max-w-[140px]">
                    {cases[activeTab].company}
                  </p>
                </div>
                <button
                  onClick={next}
                  className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 transition text-white"
                  aria-label="Siguiente caso"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Real Client Marquee */}
        <div className="relative overflow-hidden py-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="flex w-[200%] animate-marquee items-center gap-14 sm:gap-20">
            {[...clientLogos, ...clientLogos].map((client, idx) => {
              const ClientIcon = client.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 whitespace-nowrap opacity-85 hover:opacity-100 transition-opacity"
                >
                  {client.logoUrl ? (
                    <img
                      src={client.logoUrl}
                      alt={client.name}
                      className="h-9 max-w-[150px] w-auto object-contain filter drop-shadow brightness-105"
                    />
                  ) : (
                    <div className="flex items-center gap-2.5 text-slate-100 font-bold text-sm sm:text-base tracking-wide">
                      <ClientIcon className="w-5 h-5 text-orbit-cyan flex-shrink-0" />
                      <span>{client.name}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
