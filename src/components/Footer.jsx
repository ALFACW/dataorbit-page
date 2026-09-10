import React from 'react';
import { ArrowUp, Linkedin, Twitter, Github, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#06090F] text-slate-400 pt-16 pb-12 border-t border-slate-800/80 overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-orbit-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Col 1: Official Brand Logo & Bio */}
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <img
                src="/logos/l_do_blanco_2.svg"
                alt="DataOrbit Official Logo"
                className="h-8 w-auto object-contain"
              />
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-normal">
              Impulsamos empresas con analítica avanzada, automatización financiera y modelos predictivos. Convierte tus datos en decisiones estratégicas con la tecnología líder de DataOrbit.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:bg-orbit-blue transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:bg-orbit-blue transition"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:bg-orbit-blue transition"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <a href="/#soluciones" className="hover:text-white transition">
                  Nuestras Soluciones
                </a>
              </li>
              <li>
                <a href="/#por-que-nosotros" className="hover:text-white transition">
                  ¿Por qué Nosotros?
                </a>
              </li>
              <li>
                <a href="/#casos-exito" className="hover:text-white transition">
                  Casos de Éxito
                </a>
              </li>
              <li>
                <a href="/#contacto" className="hover:text-white transition">
                  Contacto & Asesoría
                </a>
              </li>
              <li>
                <Link
                  to="/eduorbit"
                  className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 font-semibold"
                >
                  <img src="/logos/logo-eduorbit_blanco.png" alt="EduOrbit 360" className="h-4 w-auto" />
                  <span>EduOrbit 360</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Summary */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Soluciones Clave
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-orbit-blue" />
                <span>Business Intelligence & Data Warehousing</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-orbit-blue" />
                <span>Automatización de Flujo de Caja & Finanzas</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-orbit-blue" />
                <span>Modelos Predictivos & Machine Learning</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-orbit-blue" />
                <span>Partnership Operativo & Consultoría</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p>© {new Date().getFullYear()} DataOrbit SpA. Todos los derechos reservados.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition group"
          >
            <span>Volver arriba</span>
            <div className="p-2 rounded-full bg-slate-800 group-hover:bg-orbit-blue transition">
              <ArrowUp className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
};
