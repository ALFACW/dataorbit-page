import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Send, AlertCircle, Loader2 } from 'lucide-react';
import { EduProblems } from '../components/eduorbit/EduProblems';
import { EduSolutionFlow } from '../components/eduorbit/EduSolutionFlow';
import { EduHowItWorks } from '../components/eduorbit/EduHowItWorks';
import { EduModules } from '../components/eduorbit/EduModules';
import { EduDashboardDemo } from '../components/eduorbit/EduDashboardDemo';
import { EduBudgetCase } from '../components/eduorbit/EduBudgetCase';

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition';

export const EduOrbitPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    telefono: '',
    correo: '',
    asunto: 'Consulta EduOrbit 360',
    mensaje: '',
    website_url: '', // Honeypot: queda oculto para las personas; si llega con algo, es un bot
  });

  // Al abrir la página se parte desde arriba, salvo que se haya llegado a una sección con #
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);

  // Mismo backend que el formulario del home. El asunto identifica que la consulta viene de EduOrbit 360.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contacto.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          nombreCompleto: formData.nombre,
          empresa: formData.empresa,
          telefono: formData.telefono,
          correo: formData.correo,
          asunto: formData.asunto,
          mensaje: formData.mensaje,
          website_url: formData.website_url,
        }),
      });

      // Solo se da por enviado si el servidor lo confirma. Una respuesta que no
      // es JSON (por ejemplo, si el hosting no ejecuta el PHP) cuenta como error.
      const data = await response.json().catch(() => null);
      if (response.ok && data?.success) {
        setSubmitted(true);
        return;
      }
      setError(data?.error || 'No se pudo enviar el mensaje. Inténtalo de nuevo.');
    } catch {
      setError('Error de conexión. Puedes escribirnos directamente a vicente@dataorbit.cl');
    } finally {
      setLoading(false);
    }
  };

  const update = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  return (
    <div className="secciones-diferidas min-h-screen bg-[#070A12] text-white selection:bg-emerald-500 selection:text-white font-sans">

      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-nav py-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          <Link
            to="/"
            className="group inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-bold text-white transition hover:text-emerald-200 sm:gap-2"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400 transition-transform group-hover:-translate-x-1" />
            <span>Volver a</span>
            <img
              src="/logos/l_do_blanco_2.svg"
              alt="DataOrbit"
              className="h-4 sm:h-5 w-auto object-contain transition group-hover:drop-shadow-[0_0_10px_rgba(104,138,255,0.7)]"
            />
          </Link>

          <div className="hidden sm:flex items-center gap-3">
            <img
              src="/logos/logo-eduorbit_blanco.png"
              alt="EduOrbit 360"
              className="h-8 sm:h-10 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]"
            />
          </div>

          <a
            href="#contacto-edu"
            className="flex-shrink-0 px-4 sm:px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition hover:scale-105"
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
            src="/logos/Solo logo.png"
            alt="EduOrbit 360"
            className="h-24 sm:h-32 w-auto mb-8 object-contain filter drop-shadow-[0_0_30px_rgba(16,185,129,0.6)]"
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

      <EduProblems />
      <EduSolutionFlow />
      <EduHowItWorks />
      <EduModules />
      <EduDashboardDemo />
      <EduBudgetCase />

      {/* Contacto EduOrbit */}
      <section id="contacto-edu" className="relative scroll-mt-20 overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-[#070A12] text-slate-900">
        {/* Órbitas de fondo */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/10" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[1040px] w-[1040px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/5" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />

        <div className="relative max-w-3xl mx-auto overflow-hidden bg-white rounded-3xl p-8 sm:p-12 shadow-[0_30px_80px_-20px_rgba(16,185,129,0.35)] border border-emerald-500/20">
          <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-400" />

          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-3">
            Contacto{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              EduOrbit 360
            </span>
          </h2>
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
              {/* Honeypot anti-spam: fuera de la vista y del orden de tabulación */}
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label>
                  No completar este campo
                  <input type="text" tabIndex={-1} autoComplete="off" value={formData.website_url} onChange={update('website_url')} />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nombre completo *</label>
                  <input type="text" required placeholder="Nombre completo" value={formData.nombre} onChange={update('nombre')} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Empresa / Colegio *</label>
                  <input type="text" required placeholder="Nombre de la institución" value={formData.empresa} onChange={update('empresa')} className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono *</label>
                  <input type="tel" required placeholder="Teléfono" value={formData.telefono} onChange={update('telefono')} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Correo electrónico *</label>
                  <input type="email" required placeholder="Correo electrónico" value={formData.correo} onChange={update('correo')} className={inputClass} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mensaje *</label>
                <textarea required rows="4" placeholder="Escribe tu mensaje..." value={formData.mensaje} onChange={update('mensaje')} className={`${inputClass} resize-none`} />
              </div>

              {error && (
                <div role="alert" className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="text-right pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-10 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-70 disabled:cursor-wait text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition hover:shadow-emerald-500/50"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {loading ? 'Enviando…' : 'Enviar'}
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
            <img src="/logos/logo-eduorbit_blanco.png" alt="EduOrbit 360 Logo" className="h-7 w-auto" />
            <span>© {new Date().getFullYear()} DataOrbit SpA. Todos los derechos reservados.</span>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <Link to="/" className="hover:text-white transition">Inicio DataOrbit</Link>
            <a href="mailto:vicente@dataorbit.cl" className="hover:text-white transition">vicente@dataorbit.cl</a>
            <span>+56 9 8452 1190</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
