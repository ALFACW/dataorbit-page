import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    empresa: '',
    telefono: '',
    correo: '',
    asunto: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      nombreCompleto: formData.nombreCompleto,
      empresa: formData.empresa,
      telefono: formData.telefono,
      correo: formData.correo,
      asunto: formData.asunto,
      mensaje: formData.mensaje,
    };

    try {
      const response = await fetch('/api/contacto.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get('content-type');
      if (response.ok && contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (data.success) {
          setSubmitted(true);
          return;
        } else {
          setError(data.error || 'No se pudo enviar el mensaje.');
        }
      } else {
        // En caso de respuesta sin JSON
        if (response.ok) {
          setSubmitted(true);
        } else {
          setError('Error en el servidor al enviar el mensaje. Inténtalo de nuevo.');
        }
      }
    } catch {
      setError('Error de conexión. Puedes contactarnos directamente a contacto@dataorbit.cl o al +56 9 8452 1190');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="relative py-24 bg-[#070A12] text-slate-900 overflow-hidden border-t border-white/5">

      {/* Órbitas de fondo */}
      <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] border border-orbit-blue/10 rounded-full pointer-events-none" />
      <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1060px] h-[1060px] border border-white/[0.04] rounded-full pointer-events-none" />
      <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[480px] bg-orbit-blue/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Form Side (Matching white form card with soft blue fields from PDF) */}
          <div className="relative overflow-hidden lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-[0_30px_80px_-20px_rgba(37,99,235,0.45)] border border-orbit-blue/20">
            <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-orbit-blue via-sky-400 to-orbit-accent" />
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              Envíanos un mensaje
            </h3>
            <p className="text-slate-600 text-sm mb-8 font-medium">
              Completa todos los campos marcados con (*) y te responderemos en menos de 24 horas.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
                <h4 className="text-2xl font-bold text-slate-900 mb-2">¡Mensaje Enviado con Éxito!</h4>
                <p className="text-slate-600 text-base max-w-md mx-auto">
                  Gracias por comunicarte con DataOrbit. Nuestro equipo de ingenieros y especialistas revisará tu requerimiento y te contactará a la brevedad.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      nombreCompleto: '',
                      empresa: '',
                      telefono: '',
                      correo: '',
                      asunto: '',
                      mensaje: '',
                    });
                  }}
                  className="mt-6 px-6 py-2.5 rounded-full bg-orbit-blue text-white font-bold text-sm shadow-md hover:bg-blue-700 transition"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Row 1: Nombre completo & Empresa */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nombreCompleto"
                      required
                      placeholder="Nombre completo"
                      value={formData.nombreCompleto}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#EDF3FC] border border-blue-200/80 text-slate-900 text-sm focus:outline-none focus:border-orbit-blue focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Empresa <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="empresa"
                      required
                      placeholder="Empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#EDF3FC] border border-blue-200/80 text-slate-900 text-sm focus:outline-none focus:border-orbit-blue focus:bg-white transition"
                    />
                  </div>
                </div>

                {/* Row 2: Teléfono & Correo electrónico */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Teléfono <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      required
                      placeholder="Teléfono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#EDF3FC] border border-blue-200/80 text-slate-900 text-sm focus:outline-none focus:border-orbit-blue focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Correo electrónico <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="correo"
                      required
                      placeholder="Correo electrónico"
                      value={formData.correo}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#EDF3FC] border border-blue-200/80 text-slate-900 text-sm focus:outline-none focus:border-orbit-blue focus:bg-white transition"
                    />
                  </div>
                </div>

                {/* Asunto */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Asunto <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="asunto"
                    required
                    placeholder="Asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#EDF3FC] border border-blue-200/80 text-slate-900 text-sm focus:outline-none focus:border-orbit-blue focus:bg-white transition"
                  />
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mensaje <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="mensaje"
                    required
                    rows="4"
                    placeholder="Mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#EDF3FC] border border-blue-200/80 text-slate-900 text-sm focus:outline-none focus:border-orbit-blue focus:bg-white transition resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-[#3B59C8] hover:bg-[#2F49B0] text-white font-extrabold text-base shadow-lg shadow-blue-600/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Enviando...</span>
                    ) : (
                      <>
                        <span>Enviar</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  {error && (
                    <p className="mt-3 text-sm text-red-600 font-semibold">{error}</p>
                  )}
                </div>

              </form>
            )}

          </div>

          {/* Right Text & Info Side (Matching text from PDF screenshot) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-orbit-blue-glow bg-orbit-blue/10 border border-orbit-blue/30 px-3 py-1 rounded-full w-fit mb-4">
              Contacto Directo
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
              Contacto
            </h2>
            <p className="text-lg text-slate-300 font-medium leading-relaxed mb-8">
              Llena el formulario a continuación y nos pondremos en contacto contigo lo antes posible.
              <br />
              <strong className="text-white">¡Esperamos saber de ti!</strong>
            </p>

            <div className="space-y-6 pt-4 border-t border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl border border-orbit-blue/30 bg-orbit-blue/15 text-orbit-blue-glow flex items-center justify-center font-bold">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold">Correo Electrónico</p>
                  <a href="mailto:contacto@dataorbit.cl" className="text-base font-bold text-white hover:text-orbit-blue-glow transition">
                    contacto@dataorbit.cl
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl border border-orbit-blue/30 bg-orbit-blue/15 text-orbit-blue-glow flex items-center justify-center font-bold">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold">Atención Ejecutiva</p>
                  <p className="text-base font-bold text-white">
                    +56 9 8452 1190
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl border border-orbit-blue/30 bg-orbit-blue/15 text-orbit-blue-glow flex items-center justify-center font-bold">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold">Ubicación</p>
                  <p className="text-base font-bold text-white">
                    Santiago & Puerto Montt, Chile
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
