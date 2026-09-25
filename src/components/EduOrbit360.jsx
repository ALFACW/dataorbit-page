import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  AlertTriangle,
  Clock,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  Database,
  RefreshCw,
  BarChart3,
  Bell,
  Users,
  DollarSign,
  UserCheck,
  Award,
  Heart,
  Briefcase,
  Layers,
  School,
  Send,
  ChevronDown,
  ChevronUp,
  LayoutDashboard
} from 'lucide-react';

export const EduOrbit360 = ({ isOpen, onClose }) => {
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

  if (!isOpen) return null;

  const problemItems = [
    {
      id: 0,
      title: 'Datos dispersos y falta de integración',
      color: 'bg-blue-600 border-blue-500 text-white',
      points: [
        'La información está en múltiples plataformas (ERP, notas, asistencia).',
        'No hay una visión 360° que permita entender el estado real de la institución.',
        'Se necesita extraer datos manualmente de diferentes fuentes, lo que consume tiempo y aumenta el riesgo de errores.',
      ],
    },
    {
      id: 1,
      title: 'Pérdida de tiempo en tareas manuales',
      color: 'bg-amber-500 border-amber-400 text-white',
      points: [
        'Generación de reportes semanales y mensuales en planillas Excel vulnerables.',
        'Horas acumuladas consolidando datos en lugar de analizar resultados.',
      ],
    },
    {
      id: 2,
      title: 'Pérdida de foco en lo académico por exceso de carga administrativa',
      color: 'bg-amber-500 border-amber-400 text-white',
      points: [
        'Docentes y directivos sobrecargados con digitación repetitiva.',
        'Menor disponibilidad para implementar planes de mejora pedagógica.',
      ],
    },
    {
      id: 3,
      title: 'Falta de información para la toma de decisiones estratégicas',
      color: 'bg-amber-500 border-amber-400 text-white',
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
      bg: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
    },
    {
      title: 'Automatizamos tus reportes',
      desc: 'En lugar de consolidar reportes manualmente cada mes, un colegio tendrá dashboards listos y actualizados en tiempo real con un solo clic.',
      icon: RefreshCw,
      bg: 'bg-purple-500/20 border-purple-500/40 text-purple-300',
    },
    {
      title: 'Proporcionamos análisis para decisiones con sustento',
      desc: 'Si la plataforma detecta caída en la asistencia de ciertos niveles, se genera una alerta para tomar acción de inmediato.',
      icon: BarChart3,
      bg: 'bg-purple-500/20 border-purple-500/40 text-purple-300',
    },
    {
      title: 'Optimizamos la gestión administrativa',
      desc: 'En lugar de que un equipo administrativo pase horas generando informes, pueden dedicar ese tiempo a implementar estrategias educativas.',
      icon: School,
      bg: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
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
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-lg flex justify-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="relative w-full max-w-6xl bg-[#090D16] text-white my-4 sm:my-8 rounded-3xl border border-blue-500/30 shadow-2xl overflow-hidden"
        >
          
          {/* Top Bar with Close */}
          <div className="sticky top-0 z-50 bg-[#090D16]/90 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logos/logo-eduorbit_blanco.png" alt="EduOrbit 360" className="h-7 w-auto" />
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
                Solución Integral Educación
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Hero Section 360 */}
          <div className="relative py-16 px-6 sm:px-12 text-center bg-gradient-to-b from-indigo-950/60 via-[#0B1020] to-[#090D16] overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <img
                src="/logos/logo-eduorbit_blanco.png"
                alt="EduOrbit 360 Logo"
                className="h-20 sm:h-28 w-auto mb-6 object-contain filter drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              />

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                EduOrbit <span className="text-amber-400">360</span>
              </h1>
              <p className="mt-3 text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-300 via-amber-300 to-indigo-300 bg-clip-text text-transparent">
                Visión integral para una Educación más Eficiente
              </p>
            </div>
          </div>

          {/* SECTION: El problema */}
          <div className="py-16 px-6 sm:px-12 bg-[#F1F5F9] text-slate-900">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                El <span className="text-blue-600">problema</span>
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
                      item.id === 0 ? 'bg-blue-600 text-white' : 'bg-amber-500 text-white'
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
                        <div key={idx} className="flex items-start gap-2 text-sm font-medium">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-sm font-bold text-blue-700 italic">
              ¿Cuánto tiempo invierten en generar reportes y consolidar datos?
            </p>
          </div>

          {/* SECTION: Nuestra solución */}
          <div className="py-16 px-6 sm:px-12 bg-slate-900 text-white">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Nuestra <span className="text-emerald-400">solución</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {solutions.map((sol, idx) => {
                const Icon = sol.icon;
                return (
                  <div
                    key={idx}
                    className={`rounded-3xl p-8 border backdrop-blur-md ${sol.bg} flex flex-col justify-between`}
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">
                        {sol.title}
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed font-normal">
                        {sol.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION: ¿Cómo funciona? */}
          <div className="py-16 px-6 sm:px-12 bg-[#E2E8F0] text-slate-900">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                ¿Cómo <span className="text-purple-600">funciona</span>?
              </h2>
            </div>

            <div className="space-y-6 max-w-5xl mx-auto">
              {processSteps.map((step) => (
                <div key={step.num} className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl flex-shrink-0 ${step.color}`}>
                    {step.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="bg-slate-100 p-3 rounded-xl">
                        <span className="font-bold text-slate-700 block mb-1">¿De dónde vienen / qué hacemos?</span>
                        <span className="text-slate-600">{step.deDonde}</span>
                      </div>
                      <div className="bg-slate-100 p-3 rounded-xl">
                        <span className="font-bold text-slate-700 block mb-1">¿Cómo lo hacemos?</span>
                        <span className="text-slate-600">{step.como}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Módulos Integrados Grid */}
            <div className="mt-16 max-w-5xl mx-auto">
              <h3 className="text-xl font-bold text-center text-slate-800 mb-2">
                Visión integral para una educación informada
              </h3>
              <p className="text-center text-xs text-slate-600 mb-8 max-w-xl mx-auto">
                Nos conectamos con distintas fuentes de datos, los procesamos y transformamos en reportes listos para la toma de decisiones.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {modules.map((mod, idx) => {
                  const Icon = mod.icon;
                  return (
                    <div key={idx} className="bg-blue-600 text-white rounded-2xl p-5 text-center flex flex-col items-center justify-center shadow-md hover:bg-blue-700 transition">
                      <Icon className="w-7 h-7 mb-2 text-blue-200" />
                      <h4 className="font-bold text-sm mb-1">{mod.title}</h4>
                      <p className="text-[11px] text-blue-100 font-medium">{mod.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION: Ejemplo Tableros */}
          <div className="py-16 px-6 sm:px-12 bg-slate-950 text-white text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8">
              Ejemplo <span className="text-blue-400">tablero</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                <img
                  src="/logos/Colegio Financiero_v2.png"
                  alt="Dashboard Ejemplo 1"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                <img
                  src="/logos/Colegio Financiero_v3.jpg"
                  alt="Dashboard Ejemplo 2"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* SECTION: Contacto EduOrbit */}
          <div className="py-16 px-6 sm:px-12 bg-[#F1F5F9] text-slate-900">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200">
              <h2 className="text-3xl font-extrabold text-center mb-2">Contacto EduOrbit 360</h2>
              <p className="text-center text-xs text-slate-600 mb-8 font-medium">
                Llena el formulario a continuación y nos pondremos en contacto contigo lo antes posible. <strong>¡Esperamos saber de ti pronto!</strong>
              </p>

              {submitted ? (
                <div className="text-center py-8 text-emerald-600 font-bold">
                  <CheckCircle2 className="w-14 h-14 mx-auto mb-3 animate-bounce" />
                  <p className="text-lg">¡Solicitud para colegio recibida!</p>
                  <p className="text-xs text-slate-500 mt-1">Nos contactaremos a la brevedad.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Nombre completo *</label>
                      <input
                        type="text"
                        required
                        placeholder="Nombre completo"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600"
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
                        className="w-full px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono *</label>
                      <input
                        type="tel"
                        required
                        placeholder="Teléfono"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600"
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
                        className="w-full px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mensaje *</label>
                    <textarea
                      required
                      rows="3"
                      placeholder="Escribe tu mensaje..."
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-blue-600 resize-none"
                    />
                  </div>

                  <div className="text-right pt-2">
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg transition"
                    >
                      Enviar
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
