'use client';

import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './Reach.module.css';

const stats = [
  { 
    id: 1, 
    number: '10+', 
    label: 'YEARS OF CRAFT', 
    desc: 'Deep roots in architectural excellence.' 
  },
  { 
    id: 2, 
    number: '150+', 
    label: 'VISIONARY PROJECTS', 
    desc: 'From serene villas to urban landmarks.' 
  },
  { 
    id: 3, 
    number: '15', 
    label: 'GLOBAL REACH', 
    desc: 'Creating silence in 15 countries.' 
  }
];

const worldPoints = [
  { top: '30%', left: '20%' }, // USA
  { top: '45%', left: '48%' }, // Europe
  { top: '55%', left: '65%' }, // UAE
  { top: '60%', left: '72%' }, // India
  { top: '40%', left: '80%' }, // Asia
  { top: '75%', left: '35%' }, // Brazil
];

export default function Reach() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className={styles.reachSection} id="reach">
      <div className={styles.container}>
        <div className={styles.header}>
           <motion.span 
             style={{ opacity }}
             className={styles.subtitle}
           >
              GLOBAL FOOTPRINT
           </motion.span>
           <motion.h2 
             style={{ scale, opacity }}
             className={styles.title}
           >
              EXPANDING THE LIMITS
           </motion.h2>
        </div>

        <div className={styles.grid}>
           {stats.map((stat, idx) => (
             <StatCard key={stat.id} stat={stat} index={idx} parentScroll={scrollYProgress} />
           ))}
        </div>

        <div className={styles.mapContainer}>
           <motion.div 
             className={styles.mapGraphic}
             initial={{ opacity: 0, scale: 1.1 }}
             whileInView={{ opacity: 0.1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1.5 }}
           >
             <svg viewBox="0 0 1000 500" className={styles.mapSvg}>
                <path fill="currentColor" d="M150,150 Q250,100 350,150 T550,150 T750,150 T950,150 Q950,250 850,350 T650,450 T450,350 T250,250 T50,150 Q50,50 150,50 Z" opacity="0.1" />
                {/* Abstract World Map Paths would go here */}
             </svg>
           </motion.div>

           <div className={styles.mapPoints}>
              {worldPoints.map((point, i) => (
                <motion.div 
                  key={i} 
                  className={styles.point}
                  style={{ top: point.top, left: point.left }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                >
                  <div className={styles.pulse}></div>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  index,
  parentScroll,
}: {
  stat: typeof stats[0];
  index: number;
  parentScroll: MotionValue<number>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Custom drift effect
  const y = useTransform(parentScroll, [0, 1], [50, -50]);
  const rotateX = useTransform(parentScroll, [0, 1], [idxToAngle(index), -idxToAngle(index)]);

  function idxToAngle(idx: number) {
    return (idx - 1) * 5;
  }

  return (
    <motion.div 
      ref={cardRef}
      className={styles.statCard}
      style={{ y, rotateX, perspective: 1000 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
       <motion.span 
         className={styles.statNumber}
         animate={{ y: [0, -10, 0] }}
         transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
       >
          {stat.number}
       </motion.span>
       <div className={styles.statLabel}>{stat.label}</div>
       <p className={styles.pSub}>{stat.desc}</p>
    </motion.div>
  );
}
