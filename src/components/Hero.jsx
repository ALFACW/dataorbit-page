import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ChevronRight } from 'lucide-react';
import { HeroCanvas } from './HeroCanvas';
import { RotatingWord } from './RotatingWord';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-gradient-to-b from-[#05080E] via-orbit-dark to-[#090E1A]">

      {/* Background Synaptic Particle Mesh Canvas */}
      <HeroCanvas />

      {/* Background Radial Glow Spheres */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-orbit-blue/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-indigo-600/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">

        {/* Main Headline: la palabra que rota va en su propia línea para no dejar huecos */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]"
        >
          Preparamos tu
          <span className="block font-black">
            <RotatingWord
              words={['empresa', 'planta', 'área comercial', 'colegio']}
              intervalMs={2600}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 pb-1"
            />
          </span>
          para operar con IA
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal"
        >
          Ordenamos tus datos, conectamos tus sistemas y construimos la plataforma que tu operación
          necesita. Te acompañamos hasta que la IA trabaja en el día a día, medimos el antes y el después,
          y respondemos por el resultado.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contacto"
            className="w-full sm:w-auto relative group overflow-hidden px-10 py-4 rounded-full font-bold text-base text-white bg-gradient-to-r from-orbit-blue via-blue-600 to-indigo-600 shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(59,130,246,0.6)] hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Conversemos 20 minutos
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          <a
            href="#soluciones"
            className="w-full sm:w-auto px-10 py-4 rounded-full font-semibold text-base text-slate-200 glass-panel border border-slate-700/60 hover:border-slate-500 hover:text-white transition-all duration-300 hover:bg-slate-800/50 text-center"
          >
            Cómo trabajamos
          </a>
        </motion.div>

        {/* Scroll Indicator Down */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => {
            const el = document.getElementById('soluciones');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="w-10 h-10 rounded-full glass-panel border border-slate-700/80 flex items-center justify-center text-slate-400 group-hover:text-orbit-blue-glow group-hover:border-orbit-blue/50 transition-all duration-300 group-hover:scale-110 shadow-lg">
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};
