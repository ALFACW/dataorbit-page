import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Clock,
  Sparkles,
  DollarSign,
  Compass,
  Layers,
  Gauge,
  Mail,
  Phone,
  MapPin,
  Globe,
} from 'lucide-react';

/**
 * DataOrbit en 1 minuto: un tríptico (A4 horizontal, tres paneles) que explica
 * rápido quiénes somos. La misma hoja se ve en pantalla y se imprime como PDF;
 * los estilos `print:` la ajustan exactamente a 297 x 210 mm.
 *
 * Todo el texto sale de lo que ya está publicado en el sitio.
 *
 * El PDF descargable (public/dataorbit-en-1-minuto.pdf) se genera desde esta
 * página con `npm run pdf:triptico`, con el servidor de desarrollo corriendo.
 * Si cambia el contenido, hay que volver a generarlo.
 */

const PDF_PATH = '/dataorbit-en-1-minuto.pdf';

const pillars = [
  { title: 'Eficiencia', caption: 'Optimización de equipos', icon: Clock },
  { title: 'Simplicidad', caption: 'Información clara y accesible', icon: Sparkles },
  { title: 'Rentabilidad', caption: 'Impacto en el margen operativo', icon: DollarSign },
];

const stages = [
  {
    num: '01',
    title: 'Entender',
    caption: 'Dónde se pierde tiempo y margen, y qué conviene hacer primero',
    icon: Compass,
    services: ['Diagnóstico de oportunidades', 'Estrategias digitales de optimización'],
  },
  {
    num: '02',
    title: 'Construir',
    caption: 'La infraestructura, las herramientas y los modelos que sostienen la operación',
    icon: Layers,
    services: ['BI & Ingeniería de Datos', 'Automatizaciones e integraciones', 'Software a la medida', 'Modelos predictivos'],
  },
  {
    num: '03',
    title: 'Operar y medir',
    caption: 'Que la IA se use de verdad, y que el impacto quede demostrado',
    icon: Gauge,
    services: ['Adopción de IA', 'Agentes conectados a tus sistemas', 'Impacto medido'],
  },
];

const clients = [
  { name: 'MOWI CHILE', logo: '/logos/clients/mowi-blanco.png' },
  { name: 'AHV ® INTERNATIONAL', logo: '/logos/clients/ahv-blanco-2.png' },
  { name: 'LA PROTECTORA DE LA INFANCIA', logo: '/logos/clients/la-protectora-blanco-2.png' },
  { name: 'IVÁN ZAPATA SERVICIOS CONTABLES', logo: '/logos/clients/iz-blanco.png' },
  { name: 'HUIRO AGRICULTURA OCEÁNICA', logo: '/logos/clients/huiro-blanco.png' },
];

const contact = [
  { icon: Mail, text: 'contacto@dataorbit.cl' },
  { icon: Phone, text: '+56 9 8452 1190' },
  { icon: MapPin, text: 'Santiago & Puerto Montt, Chile' },
  { icon: Globe, text: 'dataorbit.cl' },
];

/** Rótulo de panel: número y título. */
const PanelTag = ({ num, children }) => (
  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-orbit-blue-glow">
    <span className="font-mono text-slate-500">{num}</span>
    {children}
    <span className="h-px flex-1 bg-gradient-to-r from-orbit-blue/40 to-transparent" />
  </p>
);

export const TripticoPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#05070D] text-white font-sans print:min-h-0 print:bg-[#070A12]">
      {/* Barra superior (no se imprime) */}
      <header className="print:hidden border-b border-white/5 bg-[#070A12]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link
            to="/"
            className="group inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-bold text-white transition hover:text-orbit-blue-glow sm:gap-2"
          >
            <ArrowLeft className="h-4 w-4 text-orbit-blue-glow transition-transform group-hover:-translate-x-1" />
            <span>Volver a</span>
            <img src="/logos/l_do_blanco_2.svg" alt="DataOrbit" className="h-4 w-auto sm:h-5" />
          </Link>
          <a
            href={PDF_PATH}
            download
            className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-orbit-blue to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition hover:-translate-y-0.5 hover:shadow-blue-500/50 sm:px-5 sm:text-sm"
          >
            <Download className="h-4 w-4" />
            Descargar PDF
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 print:m-0 print:max-w-none print:p-0">
        <div className="mb-8 text-center print:hidden">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            DataOrbit en{' '}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              1 minuto
            </span>
          </h1>
          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            Lo esencial en tres paneles. Descárgalo en PDF para compartirlo.
          </p>
        </div>

        {/* La hoja: A4 horizontal con tres paneles */}
        <article className="print-triptico relative grid overflow-hidden rounded-3xl border border-white/10 bg-[#070A12] shadow-[0_40px_120px_-40px_rgba(37,99,235,0.55)] lg:aspect-[297/210] lg:grid-cols-3 print:grid print:h-[210mm] print:w-[297mm] print:grid-cols-3 print:rounded-none print:border-0 print:shadow-none">
          {/* Fondo técnico común a los tres paneles */}
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" />
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-orbit-blue/25 blur-[110px]" />
          <div className="pointer-events-none absolute -bottom-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-orbit-accent/20 blur-[110px]" />
          <div className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-cyan-500/15 blur-[110px]" />

          {/* Panel 1: quiénes somos */}
          <section className="relative flex flex-col gap-6 p-7 lg:p-8 print:p-[9mm]">
            <img src="/logos/l_do_blanco_2.svg" alt="DataOrbit" className="h-8 w-auto self-start" />

            <div>
              <PanelTag num="01">Quiénes somos</PanelTag>
              <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight lg:text-[26px]">
                Transformamos tus{' '}
                <span className="bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">datos</span> en
                decisiones estratégicas que impulsan tu negocio
              </h2>
              <p className="mt-4 text-[13px] leading-relaxed text-slate-400">
                Combinamos ingeniería de datos, desarrollo a medida e inteligencia artificial para resolver
                problemas concretos de operación y gestión.
              </p>
            </div>

            <div className="mt-auto">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                Nuestro impacto se basa en 3 pilares
              </p>
              <ul className="space-y-2.5">
                {pillars.map(({ title, caption, icon: Icon }) => (
                  <li key={title} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-orbit-blue/30 bg-orbit-blue/15 text-orbit-blue-glow">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold leading-tight">{title}</span>
                      <span className="block text-[11px] text-slate-400">{caption}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Panel 2: cómo trabajamos */}
          <section className="relative flex flex-col border-t border-white/10 p-7 lg:border-l lg:border-t-0 lg:p-8 print:border-l print:border-t-0 print:p-[9mm]">
            <PanelTag num="02">Cómo trabajamos</PanelTag>
            <p className="mt-4 text-[13px] leading-relaxed text-slate-400">
              No son servicios sueltos: un proyecto parte por entender el proceso, construye lo necesario
              y termina donde empezó, midiendo.
            </p>

            {/* Línea de tiempo: las tres etapas conectadas */}
            <ol className="relative mt-6 flex flex-1 flex-col justify-between gap-5">
              <span className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-orbit-blue-glow via-orbit-accent to-cyan-400" aria-hidden="true" />
              {stages.map(({ num, title, caption, icon: Icon, services }) => (
                <li key={num} className="relative flex gap-4">
                  <span className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-orbit-blue-glow/60 bg-[#0B1430] text-orbit-blue-glow shadow-[0_0_18px_rgba(96,165,250,0.45)]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono text-slate-500">{num}</p>
                    <p className="text-base font-extrabold leading-tight">{title}</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-slate-400">{caption}</p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {services.map((s) => (
                        <li key={s} className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10.5px] font-medium text-slate-200">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Panel 3: con quién trabajamos, EduOrbit y contacto */}
          <section className="relative flex flex-col gap-6 border-t border-white/10 p-7 lg:border-l lg:border-t-0 lg:p-8 print:border-l print:border-t-0 print:p-[9mm]">
            <div>
              <PanelTag num="03">Quiénes confían en nosotros</PanelTag>
              <ul className="mt-4 grid grid-cols-2 gap-2.5">
                {clients.map((c) => (
                  <li key={c.name} className="flex h-16 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-3">
                    <img src={c.logo} alt={c.name} className="max-h-11 w-auto max-w-full object-contain" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/[0.06] p-4">
              <img src="/logos/logo-eduorbit_blanco.png" alt="EduOrbit 360" className="h-6 w-auto" />
              <p className="mt-2 text-[12px] leading-relaxed text-slate-300">
                Visión integral para una educación más eficiente: Business Intelligence para colegios e
                instituciones educativas.
              </p>
            </div>

            <div className="mt-auto">
              <p className="text-lg font-extrabold leading-tight">
                ¿Conversamos tu{' '}
                <span className="bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">caso</span>?
              </p>
              <ul className="mt-3 space-y-2">
                {contact.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-2.5 text-[13px] font-semibold text-slate-200">
                    <Icon className="h-4 w-4 flex-shrink-0 text-orbit-blue-glow" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
};
