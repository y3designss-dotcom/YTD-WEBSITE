"use client";

import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 80, 
    damping: 30,
    restDelta: 0.001 
  });

  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [isMobile ? 15 : 30, 0, isMobile ? -15 : -30]);
  const rotateY = useTransform(smoothProgress, [0, 0.5, 1], [isMobile ? -8 : -15, 0, isMobile ? 8 : 15]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const bgX = useTransform(smoothProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={sectionRef} className={styles.root} id="contacts">
      <div className={styles.marqueeContainer}>
        <motion.div style={{ x: bgX }} className={styles.marqueeTrack}>
           {Array.from({length: 8}).map((_, i) => (
             <span key={i} className={i % 2 === 0 ? styles.mFilled : styles.mOutline}>CONNECT_</span>
           ))}
        </motion.div>
      </div>

      <div className={styles.header}>
        <span className={styles.label}>Get in Touch</span>
        <h2 className={styles.headline}>Let&apos;s Build Something <br /><span className={styles.accentText}>Extraordinary</span></h2>
      </div>

      <div className={styles.container}>
        <motion.div 
          style={{ 
            opacity, 
            scale, 
            rotateX: isMobile ? 0 : rotateX,
            rotateY,
            perspective: isMobile ? 600 : 1200 
          }} 
          className={styles.contactCard}
        >
          <div className={styles.cardGrid}>
            
            <div className={styles.infoCol}>
              <div className={styles.reachBlock}>
                <span className={styles.infoLabel}>General Inquiries</span>
                <p className={styles.infoValue}>ritikka@ytredezeen.com</p>
              </div>

              <div className={styles.reachBlock}>
                <span className={styles.infoLabel}>Contact Person</span>
                <p className={styles.infoValue}>Reettika Puri</p>
              </div>

              <div className={styles.reachBlock}>
                <span className={styles.infoLabel}>Studio Location</span>
                <p className={styles.infoValue}>Delhi, India</p>
              </div>

              <div className={styles.reachBlock}>
                <span className={styles.infoLabel}>Direct Line</span>
                <p className={styles.infoValue}>+91 95015 99998</p>
              </div>

              <div className={styles.socials}>
                 <a href="https://www.instagram.com/ytre_dezeen?igsh=MTdqN2lnMzR5Y3U5OA==" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>INSTAGRAM</a>
                 <span className={styles.socialLink}>LINKEDIN</span>
                 <span className={styles.socialLink}>BEHANCE</span>
              </div>
            </div>

            <div className={styles.formCol}>
              <form className={styles.form}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>FULL NAME</label>
                  <input type="text" className={styles.input} placeholder="YOUR NAME" />
                </div>
                
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>EMAIL ADDRESS</label>
                  <input type="email" className={styles.input} placeholder="YOUR EMAIL" />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>PROJECT TYPE</label>
                  <select className={styles.input}>
                    <option>Residence</option>
                    <option>Commercial</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>YOUR MESSAGE</label>
                  <textarea className={styles.textarea} placeholder="Describe your vision..." rows={3}></textarea>
                </div>
                <button type="submit" className={styles.submitBtn}>
                   <span>SEND INQUIRY</span>
                </button>
              </form>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
