'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const springX = useSpring(0, { stiffness: 150, damping: 15 });
  const springY = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ctaRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ctaRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Check if mouse is within a certain distance
    const dist = Math.sqrt(Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2));
    
    if (dist < 200) {
      springX.set((clientX - centerX) * 0.4);
      springY.set((clientY - centerY) * 0.4);
    } else {
      springX.set(0);
      springY.set(0);
    }
  };

  const textLines = [
    "TRANSFORMING VISION",
    "INTO ARCHITECTURAL REALITY"
  ];

  return (
    <section ref={containerRef} className={styles.hero} onMouseMove={handleMouseMove}>
      <div className={styles.noise}></div>
      
      {/* Decorative center line */}
      <motion.div 
        className={styles.horizontalLine}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      ></motion.div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          <motion.div className={styles.titleWrapper} style={{ y: y1, opacity }}>
            <h1 className={styles.title}>
              {textLines.map((line, i) => (
                <div key={i} className={styles.lineOverflow}>
                  <motion.span 
                    className={i === 0 ? styles.line1 : styles.line2}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ 
                      duration: 1.5, 
                      ease: [0.16, 1, 0.3, 1], 
                      delay: 0.8 + (i * 0.2) 
                    }}
                  >
                    {line}
                  </motion.span>
                </div>
              ))}
            </h1>
          </motion.div>
          
          <motion.div 
            ref={ctaRef}
            className={styles.ctaWrapper}
            style={{ 
              x: springX, 
              y: springY,
              opacity: isHydrated ? opacity : 1
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <a href="#contacts" className={styles.ctaCircle} aria-label="Send request">
              <div className={styles.ctaText}>
                <span>SEND</span>
                <span>REQUEST</span>
              </div>
              <div className={styles.ctaArrow}>
                <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
                  <path d="M0 10H58M58 10L50 2M58 10L50 18" stroke="currentColor" strokeWidth="1"/>
                </svg>
              </div>
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div className={styles.scrollIndicator} style={{ opacity: isHydrated ? opacity : 1 }}>
        <span className={styles.scrollText}>EXPLORE</span>
        <div className={styles.scrollLine}></div>
      </motion.div>

      <motion.div className={styles.background} style={{ scale: isHydrated ? scale : 1 }}>
        <div className={styles.overlay}></div>
        <img 
          src="/banner.jpeg" 
          alt="Architectural Design" 
          className={styles.bgImage}
        />
      </motion.div>
    </section>
  );
}
