import React from 'react';

const clientLogos = [
  { name: 'MOWI CHILE', logoUrl: '/logos/clients/mowi-blanco.png' },
  { name: 'AHV ® INTERNATIONAL', logoUrl: '/logos/clients/ahv-blanco-2.png' },
  { name: 'LA PROTECTORA DE LA INFANCIA', logoUrl: '/logos/clients/la-protectora-blanco-2.png' },
  { name: 'IVÁN ZAPATA SERVICIOS CONTABLES', logoUrl: '/logos/clients/iz-blanco.png' },
  { name: 'HUIRO AGRICULTURA OCEÁNICA', logoUrl: '/logos/clients/huiro-blanco.png' },
];

export const TrustCarousel = () => {
  return (
    <section
      id="quienes-confian"
      className="relative py-20 bg-orbit-dark text-slate-100 overflow-hidden border-t border-slate-800 scroll-mt-20"
    >
      {/* Anchor alias for existing links */}
      <span id="casos-exito" className="absolute -top-24 left-0" />

      {/* Subtle Glow & Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-orbit-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-orbit-cyan bg-blue-950/70 px-4 py-1.5 rounded-full border border-blue-800/60 shadow-inner">
            Confianza & Trayectoria
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Quiénes <span className="text-transparent bg-clip-text bg-gradient-to-r from-orbit-blue-light via-blue-400 to-indigo-300">Confían en Nosotros</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Empresas y organizaciones líderes que transforman su gestión y analítica con nuestras soluciones.
          </p>
        </div>

        {/* High-Impact Logo Carousel Marquee */}
        <div className="relative overflow-hidden py-10 sm:py-14 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
          {/* Edge gradient masks for seamless fade */}
          <div className="absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-slate-900/95 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-slate-900/95 to-transparent z-10 pointer-events-none" />

          <div className="flex w-[200%] animate-marquee items-center gap-16 sm:gap-28">
            {[...clientLogos, ...clientLogos].map((client, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center flex-shrink-0 px-4 group transition-all duration-300"
              >
                <img
                  src={client.logoUrl}
                  alt={client.name}
                  className="h-14 sm:h-20 max-w-[200px] sm:max-w-[260px] w-auto object-contain opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 filter drop-shadow-[0_4px_16px_rgba(255,255,255,0.06)]"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
