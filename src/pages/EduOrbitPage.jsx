import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  AlertTriangle,
  School,
  Database,
  RefreshCw,
  BarChart3,
  UserCheck,
  DollarSign,
  Users,
  Award,
  Heart,
  Briefcase,
  Layers,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Send,
  Sparkles
} from 'lucide-react';

export const EduOrbitPage = () => {
  const [activeProblem, setActiveProblem] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    telefono: '',
    correo: '',
    asunto: 'Consulta EduOrbit 360',
    mensaje: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const problemItems = [
    {
      id: 0,
      title: 'Datos dispersos y falta de integración',
      points: [
        'La información está en múltiples plataformas (ERP, asistencia, notas).',
        'No hay una visión 360° que permita entender el estado real de la institución.',
        'Se necesita extraer datos manualmente de diferentes fuentes, lo que consume tiempo y aumenta el riesgo de errores.',
      ],
    },
    {
      id: 1,
      title: 'Pérdida de tiempo en tareas manuales',
      points: [
        'Generación de reportes semanales y mensuales en planillas Excel vulnerables.',
        'Horas acumuladas consolidando datos en lugar de analizar resultados pedagógicos.',
      ],
    },
    {
      id: 2,
      title: 'Pérdida de foco en lo académico por exceso de carga administrativa',
      points: [
        'Docentes y directivos sobrecargados con digitación repetitiva.',
        'Menor disponibilidad para implementar planes de mejora educativa centrados en los alumnos.',
      ],
    },
    {
      id: 3,
      title: 'Falta de información para la toma de decisiones estratégicas',
      points: [
        'Decisiones tomadas a destiempo con información desactualizada.',
        'Dificultad para anticipar deserción escolar o caídas en la matrícula.',
      ],
    },
  ];

  const solutions = [
    {
      title: 'Unificamos todo en un solo lugar',
      desc: 'Un director puede ver en un solo dashboard asistencia, desempeño académico y proyección de matrícula sin buscar en múltiples sistemas.',
      icon: Database,
      bg: 'bg-emerald-600 border-emerald-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.3)]',
    },
    {
      title: 'Automatizamos tus reportes',
      desc: 'En lugar de consolidar reportes manualmente cada mes, un colegio tendrá dashboards listos y actualizados en tiempo real con un solo clic.',
      icon: RefreshCw,
      bg: 'bg-[#1D4ED8] border-blue-500 text-white shadow-[0_0_25px_rgba(29,78,216,0.3)]',
    },
    {
      title: 'Proporcionamos análisis para decisiones con sustento',
      desc: 'Si la plataforma detecta caída en la asistencia de ciertos niveles, se genera una alerta para tomar acción de inmediato.',
      icon: BarChart3,
      bg: 'bg-[#1D4ED8] border-blue-500 text-white shadow-[0_0_25px_rgba(29,78,216,0.3)]',
    },
    {
      title: 'Optimizamos la gestión administrativa',
      desc: 'En lugar de que un equipo administrativo pase horas generando informes, pueden dedicar ese tiempo a implementar estrategias educativas.',
      icon: School,
      bg: 'bg-emerald-600 border-emerald-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.3)]',
    },
  ];

  const processSteps = [
    {
      num: '1',
      title: 'Recopilación y Extracción de Datos',
      color: 'bg-rose-500 text-white',
      deDonde: 'Plataformas escolares, ERP, Sistemas RRHH, Archivos externos.',
      como: 'APIs oficiales, Scraping automático, CSV, Excel, Google Sheets.',
    },
    {
      num: '2',
      title: 'Limpieza y Procesamiento de Datos',
      color: 'bg-purple-600 text-white',
      deDonde: 'Eliminación de inconsistencias, Estandarización, Métricas.',
      como: 'Dataflow, SQL avanzado, Procesos automatizados en la nube.',
    },
    {
      num: '3',
      title: 'Generación y Visualización de Reportes',
      color: 'bg-emerald-600 text-white',
      deDonde: 'Visualización de KPIs clave, Filtros dinámicos, Tendencias.',
      como: 'Looker Studio, SQL, Dashboard interactivo accesible 24/7.',
    },
    {
      num: '4',
      title: 'Automatización y Alertas Inteligentes',
      color: 'bg-amber-500 text-white',
      deDonde: 'Sincronización diaria/tiempo real, Notificaciones de riesgo.',
      como: 'Alertas automáticas por correo/whatsapp, Exportación PDF/Excel.',
    },
  ];

  const modules = [
    { title: 'Asistencia', desc: 'Consolidada por curso, estudiante y alertas.', icon: UserCheck },
    { title: 'Finanzas', desc: 'Control financiero y presupuesto al día.', icon: DollarSign },
    { title: 'Matrícula', desc: 'Monitorear lo actual vs lo proyectado.', icon: Users },
    { title: 'Simce y Rendimiento', desc: 'Analizar resultados y detectar brechas.', icon: Award },
    { title: 'Convivencia Escolar', desc: 'Seguimiento de incidentes y tendencias.', icon: Heart },
    { title: 'RRHH', desc: 'Cantidad, remuneraciones, antigüedad.', icon: Briefcase },
    { title: 'Programas Internos', desc: 'Impacto en lenguaje y matemáticas.', icon: Layers },
    { title: 'Ministerio / Plataformas', desc: 'Integración directa para análisis.', icon: School },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-white selection:bg-emerald-500 selection:text-white font-sans">
      
      {/* Sticky Header with High-Resolution EduOrbit 360 Logo */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-nav py-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-semibold text-sm transition group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-emerald-400" />
            <span>Volver a DataOrbit</span>
          </Link>

          <div className="flex items-center gap-3">
            <img
              src="/logos/Eduview 360 blanco_v2.png"
              alt="EduOrbit 360 HD Logo"
              className="h-8 sm:h-10 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]"
            />
          </div>

          <a
            href="#contacto-edu"
            className="px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition hover:scale-105"
          >
            Contacto Colegio
          </a>
        </div>
      </header>

      {/* Hero Section 360 */}
      <section className="relative pt-36 pb-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-[#061118] via-[#091522] to-[#070A12] overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/15 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <img
            src="/logos/Eduview 360 blanco_v2.png"
            alt="EduOrbit 360 HD Logo"
            className="h-28 sm:h-40 w-auto mb-8 object-contain filter drop-shadow-[0_0_30px_rgba(16,185,129,0.6)]"
          />

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            EduOrbit <span className="text-amber-400">360</span>
          </h1>
          <p className="mt-4 text-xl sm:text-3xl font-extrabold bg-gradient-to-r from-emerald-300 via-amber-300 to-blue-300 bg-clip-text text-transparent">
            Visión integral para una Educación más Eficiente
          </p>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
            Plataforma centralizada de Business Intelligence para colegios e instituciones educativas. Integra datos académicos, asistencia, finanzas y matrícula en dashboards automatizados.
          </p>
        </div>
      </section>

      {/* SECTION 1: El problema */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F1F5F9] text-slate-900">
        <div className="max-w-5xl mx-auto text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200">
            Diagnóstico Institucional
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight">
            El <span className="text-blue-700">problema</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {problemItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveProblem(activeProblem === item.id ? null : item.id)}
                className={`w-full p-5 text-left font-bold text-base sm:text-lg flex items-center justify-between ${
                  item.id === 0 ? 'bg-[#1D4ED8] text-white' : 'bg-amber-500 text-white'
                }`}
              >
                <span className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                  {item.title}
                </span>
                {activeProblem === item.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>

              {activeProblem === item.id && (
                <div className="p-6 bg-slate-50 text-slate-700 space-y-2">
                  {item.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm font-medium">
                      <span className="text-blue-600 font-bold text-base">•</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm sm:text-base font-bold text-blue-700 italic">
          ¿Cuánto tiempo invierten en generar reportes y consolidar datos?
        </p>
      </section>

      {/* SECTION 2: Nuestra solución (Verde Esmeralda & Cobalto) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-500/30">
            Transformación Digital
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight">
            Nuestra <span className="text-emerald-400">solución</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {solutions.map((sol, idx) => {
            const Icon = sol.icon;
            return (
              <div
                key={idx}
                className={`rounded-3xl p-8 border ${sol.bg} flex flex-col justify-between hover:-translate-y-1 transition duration-300`}
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    {sol.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
                    {sol.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: ¿Cómo funciona? */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#E2E8F0] text-slate-900">
        <div className="max-w-5xl mx-auto text-center mb-14">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            ¿Cómo <span className="text-purple-600">funciona</span>?
          </h2>
        </div>

        <div className="space-y-6 max-w-5xl mx-auto">
          {processSteps.map((step) => (
            <div key={step.num} className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200 flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-3xl flex-shrink-0 ${step.color}`}>
                {step.num}
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200">
                    <span className="font-bold text-slate-800 block mb-1">¿De dónde vienen / qué hacemos?</span>
                    <span className="text-slate-600 font-medium">{step.deDonde}</span>
                  </div>
                  <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200">
                    <span className="font-bold text-slate-800 block mb-1">¿Cómo lo hacemos?</span>
                    <span className="text-slate-600 font-medium">{step.como}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 8 Módulos Integrados */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Visión integral para una educación informada
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto font-medium">
              Nos conectamos con distintas fuentes de datos, los procesamos y transformamos en reportes listos para la toma de decisiones.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {modules.map((mod, idx) => {
              const Icon = mod.icon;
              return (
                <div key={idx} className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white rounded-3xl p-6 text-center flex flex-col items-center justify-center shadow-lg transition hover:-translate-y-1">
                  <Icon className="w-8 h-8 mb-3 text-blue-200" />
                  <h4 className="font-bold text-base mb-1">{mod.title}</h4>
                  <p className="text-xs text-blue-100 font-medium">{mod.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: Ejemplo Tableros */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white text-center">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-12">
          Ejemplo <span className="text-emerald-400">tablero</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="rounded-3xl overflow-hidden border border-slate-700 shadow-2xl hover:scale-[1.02] transition">
            <img
              src="/logos/Colegio Financiero_v2.png"
              alt="Dashboard Ejemplo 1"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="rounded-3xl overflow-hidden border border-slate-700 shadow-2xl hover:scale-[1.02] transition">
            <img
              src="/logos/Colegio Financiero_v3.jpg"
              alt="Dashboard Ejemplo 2"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION 5: Contacto EduOrbit */}
      <section id="contacto-edu" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F1F5F9] text-slate-900">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-3">Contacto EduOrbit 360</h2>
          <p className="text-center text-xs sm:text-sm text-slate-600 mb-8 font-medium">
            Llena el formulario a continuación y nos pondremos en contacto contigo lo antes posible. <br />
            <strong>¡Esperamos saber de ti pronto!</strong>
          </p>

          {submitted ? (
            <div className="text-center py-10 text-emerald-600 font-bold">
              <CheckCircle2 className="w-16 h-16 mx-auto mb-3 animate-bounce" />
              <p className="text-xl">¡Solicitud para colegio recibida con éxito!</p>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">Un especialista de EduOrbit 360 te contactará a la brevedad.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nombre completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nombre completo"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Empresa / Colegio *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nombre de la institución"
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Teléfono"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Correo electrónico *</label>
                  <input
                    type="email"
                    required
                    placeholder="Correo electrónico"
                    value={formData.correo}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mensaje *</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Escribe tu mensaje..."
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 resize-none"
                />
              </div>

              <div className="text-right pt-2">
                <button
                  type="submit"
                  className="px-10 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition"
                >
                  Enviar
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Dedicated EduOrbit Footer */}
      <footer className="py-12 bg-[#050810] border-t border-slate-800 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/logos/Eduview 360 blanco_v2.png" alt="EduOrbit 360 Logo" className="h-7 w-auto" />
            <span>© {new Date().getFullYear()} DataOrbit SpA. Todos los derechos reservados.</span>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <Link to="/" className="hover:text-white transition">Inicio DataOrbit</Link>
            <a href="mailto:vicente@dataorbit.cl" className="hover:text-white transition">vicente@dataorbit.cl</a>
            <span>+56 9734 9071</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
