'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

const menuLinks = [
  { name: 'HOME', href: '/', desc: 'RETURN TO HOMEPAGE' },
  { name: 'PROJECTS', href: '/projects', desc: 'OUR ARCHITECTURAL PORTFOLIO' },
  { name: 'STAGES', href: '/#process', desc: 'DESIGN & CREATION PROCESS' },
  { name: 'ABOUT US', href: '/#about', desc: 'STUDIO PHILOSOPHY & MISSION' },
  { name: 'REVIEWS', href: '/#reviews', desc: 'CLIENT TESTIMONIALS' },
  { name: 'CONTACTS', href: '/#contacts', desc: 'START YOUR PROJECT' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <>
      <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''} ${isOpen ? styles.hidden : ''}`}>
        <div className={styles.container}>
          <div className={styles.left}>
             <Link href="/" className={styles.logo}>
               <img src="/logo.png" alt="YTD" className={styles.logoImg} />
             </Link>
          </div>

          <div className={styles.menuToggle} onClick={() => setIsOpen(true)}>
             <span className={styles.burgerLabel}>MENU</span>
             <div className={styles.burger}>
                <span></span>
                <span></span>
             </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={styles.menuOverlay}
          >
             <div className={styles.menuTopBar}>
                <Link href="/" onClick={() => setIsOpen(false)}>
                   <img src="/logo.png" alt="YTD" className={styles.logoLarge} />
                </Link>
                
                <div className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                   <span className={styles.closeLabel}>CLOSE</span>
                   <div className={styles.crossIcon}>
                      <span></span>
                      <span></span>
                   </div>
                </div>
             </div>

             <div className={styles.overlayContent}>
                <div className={styles.menuVisual}>
                   <motion.div 
                     whileHover={{ scale: 1.02 }}
                     className={styles.overlayBranding}
                   >
                      <img src="/logo.png" alt="YTD Architects" className={styles.overlayLogoImg} />
                   </motion.div>
                </div>

                <div className={styles.linksGrid}>
                   {menuLinks.map((link, i) => (
                     <motion.div 
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (i * 0.1), duration: 0.5 }}
                        className={styles.menuItem}
                     >
                        <Link 
                          href={link.href} 
                          className={styles.menuLink}
                          onClick={() => setIsOpen(false)}
                        >
                          <div className={styles.linkTextWrapper}>
                             <span className={styles.linkName}>{link.name}</span>
                             <span className={styles.linkDesc}>{link.desc}</span>
                          </div>
                          <div className={styles.linkArrow}>
                             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                             </svg>
                          </div>
                        </Link>
                     </motion.div>
                   ))}
                </div>

                <div className={styles.menuFooter}>
                   <div className={styles.footerCol}>
                      <span>FOLLOW US</span>
                      <div className={styles.socialLinks}>
                         <a href="https://www.instagram.com/ytre_dezeen?igsh=MTdqN2lnMzR5Y3U5OA==" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
                         <a href="#">BEHANCE</a>
                         <a href="#">LINKEDIN</a>
                      </div>
                   </div>
                   <div className={styles.footerCol}>
                      <span>START A PROJECT</span>
                      <p>ADDRESS@YTDARCH.COM</p>
                   </div>
                </div>
             </div>

             <div className={styles.bgTypography}>
                ARCHITECTURE & DESIGN
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
