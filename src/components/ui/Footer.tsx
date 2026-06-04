'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.footerGrid}>
            <div className={styles.col}>
              <span className={styles.colLabel}>OFFICE</span>
              <div className={styles.colList}>
                <p className={styles.colVal}>
                  Delhi, India
                  <br />
                  <span className={styles.miniLabel}>DEL • IN</span>
                </p>
              </div>
            </div>

            <div className={styles.col}>
              <span className={styles.colLabel}>CONTACT</span>
              <div className={styles.colList}>
                <p className={styles.colVal}>
                  <a href="mailto:ritikka@ytredezeen.com" className={styles.colVal}>ritikka@ytredezeen.com</a>
                  <br />
                  <a href="tel:+919501599998" className={styles.colVal}>+91 95015 99998</a>
                </p>
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

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={styles.backToTop}
          >
            BACK TO TOP ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
