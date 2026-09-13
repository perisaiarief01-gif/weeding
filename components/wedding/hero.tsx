'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { weddingData as d } from '../../weddingData';
import { MotionFrame } from './entrance';

const ease = [0.22, 1, 0.36, 1] as const;

export function WeddingHero() {
  const [remaining, setRemaining] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 45]);
  useEffect(() => {
    const update = () => setRemaining(Math.max(0, new Date(d.date).getTime() - Date.now()));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);
  const seconds = Math.floor((remaining ?? 0) / 1000);
  const values = [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];

  return (
    <section ref={ref} id="home" tabIndex={-1} data-tone="dark" className="editorial-hero" aria-label="Pernikahan Rani dan Arief">
      <div className="hero-portrait">
        <motion.div className="hero-portrait-image" style={{ y }}
          initial={reduced ? false : { scale: 1.12 }} animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease }}>
          <img src={d.images.intimate} alt="Rani dan Arief dalam potret bersama" fetchPriority="high" decoding="async" />
        </motion.div>
        <div className="hero-portrait-shade" />
        <div className="hero-portrait-frame"><MotionFrame delay={0.45} /></div>
        <motion.p className="hero-photo-note" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 1 }}>
          A moment, a promise, a lifetime.
        </motion.p>
      </div>
      <div className="hero-editorial-copy" data-tone="light">
        <motion.div className="hero-title-group" initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 0.55, duration: 1, ease }}>
          <p className="eyebrow hero-kicker">THE WEDDING CELEBRATION OF</p>
          <h1 className="hero-names"><span>{d.names.bride}</span><em>&</em><span>{d.names.groom}</span></h1>
          <p className="hero-welcome">Dua jiwa, satu perjalanan.<br />Bersama, menuju selamanya.</p>
        </motion.div>
        <motion.div className="hero-date-line" initial={reduced ? false : { opacity: 0, scaleX: 0.8 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: reduced ? 0 : 0.85, duration: 0.8, ease }}>
          <span>{d.dateLabel}</span><i aria-hidden="true" /><span>{d.city}</span>
        </motion.div>
        <div className="hero-countdown-block">
          <p className="eyebrow countdown-label">{remaining === 0 ? 'HARI BAHAGIA TELAH TIBA' : 'MENUJU HARI BAHAGIA'}</p>
          <div className="countdown" aria-label="Hitung mundur menuju hari pernikahan">
            {values.map((value, index) => (
              <div key={index}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span key={value} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                    {remaining === null ? '—' : String(value).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
                <small>{['Hari', 'Jam', 'Menit', 'Detik'][index]}</small>
              </div>
            ))}
          </div>
        </div>
        <a className="hero-explore" href="#doa"><span>JELAJAHI CERITA KAMI</span><ArrowDown size={16} strokeWidth={1.2} /></a>
        <span className="hero-copy-corner hero-copy-corner-top" aria-hidden="true" />
        <span className="hero-copy-corner hero-copy-corner-bottom" aria-hidden="true" />
      </div>
    </section>
  );
}
