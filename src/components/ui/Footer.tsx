'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const xPos = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);
  const signatureOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={styles.container}>
        
        {/* <div className={styles.signatureWrap}>
           <motion.h1 style={{ x: xPos, opacity: signatureOpacity }} className={styles.massiveSignature}>
              YTD ARCHITECTS
           </motion.h1>
        </div> */}

        <div className={styles.mainContent}>
           <div className={styles.footerGrid}>
              
              <div className={styles.col}>
                 <span className={styles.colLabel}>OFFICE</span>
                 <div className={styles.colList}>
                    <p className={styles.colVal}>Delhi, India <br /><span className={styles.miniLabel}>DEL • IN</span></p>
                 </div>
              </div>

              <div className={styles.col}>
                 <span className={styles.colLabel}>NAVIGATION</span>
                 <nav className={styles.colNav}>
                    <Link href="/projects">PORTFOLIO</Link>
                    <Link href="/#process">METHODOLOGY</Link>
                    <Link href="/#about">PHILOSOPHY</Link>
                    <Link href="/#contacts">INQUIRIES</Link>
                 </nav>
              </div>
           </div>
        </div>

        <div className={styles.bottomBar}>
           <div className={styles.legal}>
              <span>© 2026 YTD ARCHITECTS</span>
              <span className={styles.sep}>|</span>
              <span>PRIVACY POLICY</span>
              <span className={styles.sep}>|</span>
              <span>TERMS OF SERVICE</span>
           </div>

           <div className={styles.socials}>
              <span className={styles.socialLink}>INSTAGRAM</span>
              <span className={styles.socialLink}>LINKEDIN</span>
              <span className={styles.socialLink}>BEHANCE</span>
           </div>

           <button 
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
             className={styles.backToTop}
           >
              BACK TO TOP ↑
           </button>
        </div>

      </div>
      
      {/* Structural Decor */}
      <div className={styles.bgGlow}></div>
    </footer>
  );
}
