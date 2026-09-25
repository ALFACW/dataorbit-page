import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRotation } from '../hooks/useCycle';

/**
 * Palabra que va cambiando entre varios conceptos con una transición vertical.
 * El ancho se reserva con la palabra más larga para que el texto de alrededor
 * no salte en cada cambio. La palabra nueva entra mientras sale la anterior
 * (las dos van superpuestas), así la línea nunca queda vacía.
 */
export const RotatingWord = ({ words, intervalMs = 2400, className = '' }) => {
  const [index] = useRotation(words.length, { intervalMs });
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '');

  return (
    <span className="relative inline-grid">
      {/* Reserva el espacio y deja el texto completo para lectores de pantalla */}
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {longest}
      </span>
      <span className="sr-only">{words.join(', ')}</span>
      <span className="relative col-start-1 row-start-1 overflow-hidden" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.span
            key={words[index]}
            className={`absolute inset-x-0 top-0 block ${className}`}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
};
