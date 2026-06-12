'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ease = [0.22, 1, 0.36, 1];

export default function FadeIn({
  children,
  delay = 0,
  y = 20,
  duration = 1.15,
  className,
  style,
  once = true,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-72px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
