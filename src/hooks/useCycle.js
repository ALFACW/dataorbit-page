import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Recorre `steps` etapas como una luz que atraviesa un circuito: avanza una
 * etapa cada `stepMs` y, al llegar al final, espera `pauseMs` antes de volver
 * a partir. Devuelve la etapa encendida, o -1 mientras el circuito descansa.
 * Con "reducir movimiento" o `paused` queda quieto en -1.
 */
export const useCircuit = (steps, { stepMs = 380, pauseMs = 3000, paused = false } = {}) => {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (reduceMotion || paused) {
      setActive(-1);
      return undefined;
    }

    let step = -1;
    let timer;
    const tick = () => {
      step += 1;
      if (step >= steps) {
        step = -1;
        setActive(-1);
        timer = setTimeout(tick, pauseMs);
        return;
      }
      setActive(step);
      timer = setTimeout(tick, stepMs);
    };

    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [steps, stepMs, pauseMs, paused, reduceMotion]);

  return active;
};

/**
 * Índice que rota solo entre `count` elementos cada `intervalMs`.
 * Mientras `paused` es verdadero (por ejemplo, con el cursor encima) no avanza,
 * y quien lo usa puede fijar el índice a mano con `setIndex`.
 */
export const useRotation = (count, { intervalMs = 3000, paused = false } = {}) => {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || paused || count < 2) return undefined;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), intervalMs);
    return () => clearInterval(timer);
  }, [count, intervalMs, paused, reduceMotion]);

  return [index, setIndex];
};
