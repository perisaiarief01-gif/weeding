'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { weddingData as d } from '../../weddingData';

const ease = [0.22, 1, 0.36, 1] as const;

export function MotionFrame({ delay = 0 }: { delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <svg className="motion-frame" viewBox="0 0 320 440" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <motion.path
        d="M160 12C78 12 12 78 12 160V428H308V160C308 78 242 12 160 12Z"
        stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke"
        initial={reduced ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.75 }} viewport={{ once: true }}
        transition={{ duration: reduced ? 0 : 1.8, delay, ease }}
      />
      <motion.path
        d="M160 24C85 24 24 85 24 160V416H296V160C296 85 235 24 160 24Z"
        stroke="currentColor" strokeWidth="0.6" vectorEffect="non-scaling-stroke"
        initial={reduced ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.35 }} viewport={{ once: true }}
        transition={{ duration: reduced ? 0 : 1.8, delay: delay + 0.15, ease }}
      />
      <path d="M150 428L160 418L170 428L160 438Z" fill="currentColor" opacity=".7" />
    </svg>
  );
}

export function OpeningTransition({ onComplete }: { onComplete: () => void }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="opening-transition" aria-hidden="true"
      initial={{ opacity: 1 }} animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: reduced ? 0.18 : 1.65, times: [0, 0.94, 1] }}
      onAnimationComplete={onComplete}
    >
      {['left', 'right'].map(side => (
        <motion.div key={side} className={`opening-leaf opening-leaf-${side}`}
          initial={{ x: 0 }} animate={{ x: reduced ? 0 : side === 'left' ? '-101%' : '101%' }}
          transition={{ duration: 1.1, delay: 0.32, ease }}>
          <span className="opening-leaf-frame" />
          <span className="opening-leaf-line" />
        </motion.div>
      ))}
      <motion.div className="opening-seal"
        initial={{ opacity: 1, scale: 1 }} animate={{ opacity: 0, scale: reduced ? 1 : 1.15 }}
        transition={{ duration: reduced ? 0.1 : 0.4, delay: reduced ? 0 : 0.25, ease }}>
        <span>{d.names.bride[0]}<i>&</i>{d.names.groom[0]}</span>
      </motion.div>
    </motion.div>
  );
}
