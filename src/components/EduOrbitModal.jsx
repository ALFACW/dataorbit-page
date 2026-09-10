import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, CheckCircle2, Send, Sparkles } from 'lucide-react';

export const EduOrbitModal = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    interes: 'BI & PowerBI Avanzado',
  });

  const courses = [
    {
      title: 'Business Intelligence & Dashboards Ejecutivos',
      desc: 'Diseño de cuadros de mando proactivos y arquitectura de datos.',
      level: 'Ejecutivo / Analista',
    },
    {
      title: 'Python & Machine Learning para Finanzas',
      desc: 'Modelos predictivos aplicados a proyecciones de flujo de caja y ventas.',
      level: 'Avanzado',
    },
    {
      title: 'Automatización de Procesos con SQL & ETL',
      desc: 'Centralización de datos heterogéneos y reducción de errores manuales.',
      level: 'Intermedio',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-3xl bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 text-white overflow-hidden"
        >
          {/* Glowing Orb Blob */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header with Official EduOrbit Logo */}
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-indigo-950 border border-indigo-500/30">
              <img
                src="/logos/logo-eduorbit_blanco.png"
                alt="EduOrbit Logo"
                className="h-9 w-auto object-contain"
              />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">
                Iniciativa Educativa Corporativa
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                Academia & Capacitación <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              </h3>
            </div>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Empoderamos a equipos corporativos y profesionales con las habilidades prácticas necesarias para dominar la ciencia de datos, el BI avanzado y la toma de decisiones informada.
          </p>

          {/* Course Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {courses.map((course, idx) => (
              <div
                key={idx}
                className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold mb-2">
                    {course.level}
                  </span>
                  <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                    {course.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {course.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Interest Form */}
          <div className="bg-indigo-950/40 border border-indigo-500/20 rounded-2xl p-6">
            {submitted ? (
              <div className="text-center py-6 text-emerald-400">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-3 animate-bounce" />
                <h4 className="text-lg font-bold">¡Solicitud Recibida!</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Un especialista de EduOrbit se pondrá en contacto contigo a la brevedad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  Solicitar Información de Cursos Corporativos
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre completo"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Correo corporativo"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-400">Capacitación In-Company & Online</span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
                  >
                    <span>Enviar Solicitud</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
