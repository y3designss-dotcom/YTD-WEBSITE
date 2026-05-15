"use client";

import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { projects, type Project } from "@/data/projects";
import styles from "./ProjectGrid.module.css";

export default function ProjectGrid() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section ref={containerRef} className={styles.projectSection} id="projects">
      <div className={styles.marqueeContainer}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className={styles.marqueeTrack}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className={i % 2 === 0 ? styles.mFilled : styles.mOutline}>
              PORTFOLIO
            </span>
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i + 8} className={i % 2 === 0 ? styles.mFilled : styles.mOutline}>
              PORTFOLIO
            </span>
          ))}
        </motion.div>
      </div>

      <div className={styles.verticalList}>
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      <div className={styles.exploreAll}>
        <Link href="/projects" className={styles.exploreLink}>
          <h2 className={styles.exploreBtn}>Explore All</h2>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={styles.exploreCircle}
          >
            <svg viewBox="0 0 100 100">
              <path d="M20 50h60M60 30l20 20-20 20" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const num = String(index + 1).padStart(2, "0");

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const springProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(springProgress, [0, 0.5, 1], [30, 0, -30]);
  const rotateY = useTransform(springProgress, [0, 0.5, 1], [-15, 0, 15]);
  const scale = useTransform(springProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const opacity = useTransform(springProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const imgY = useTransform(springProgress, [0, 1], ["-12%", "12%"]);
  const textY = useTransform(springProgress, [0, 1], [80, -80]);

  return (
    <div className={styles.cardWrapper}>
      <motion.div
        ref={cardRef}
        style={{
          opacity,
          scale,
          rotateX,
          rotateY,
          perspective: 1200,
        }}
        className={styles.projectCard}
      >
        <div className={styles.cardContent}>
          <div className={styles.imageBox}>
            <motion.img
              src={project.cover}
              alt={project.title}
              className={styles.projectImage}
              style={{ y: imgY }}
            />
            <div className={styles.imageOverlay}></div>
          </div>

          <motion.div style={{ y: textY }} className={styles.projectInfo}>
            <span className={styles.projectLocation}>{project.location}</span>
            <h3 className={styles.projectTitle}>
              <span className={styles.boldItalic}>{project.title}</span>
              <span className={styles.thin}>{project.category}</span>
            </h3>
            <p className={styles.projectSummary}>{project.summary}</p>
            <Link href={`/projects/${project.slug}`} className={styles.moreLink}>
              VIEW PROJECT
            </Link>
          </motion.div>
        </div>

        <span className={styles.projectNum}>{num}</span>
      </motion.div>
    </div>
  );
}
