"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import styles from "./projects.module.css";

export default function PortfolioCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const springProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(springProgress, [0, 0.5, 1], [18, 0, -18]);
  const rotateY = useTransform(springProgress, [0, 0.5, 1], [-8, 0, 8]);
  const scale = useTransform(springProgress, [0, 0.5, 1], [0.94, 1, 0.94]);
  const opacity = useTransform(springProgress, [0, 0.16, 0.86, 1], [0, 1, 1, 0.2]);
  const imageY = useTransform(springProgress, [0, 1], ["-8%", "8%"]);

  return (
    <Link href={`/projects/${project.slug}`} className={styles.cardLink}>
      <motion.article
        ref={cardRef}
        className={styles.projectCard}
        style={{ opacity, scale, rotateX, rotateY, perspective: 1200 }}
        initial={{ y: 42 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.22 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.04, 0.14) }}
        whileHover={{ y: -10, scale: 1.015 }}
      >
        <div className={styles.cardImage}>
          <motion.div className={styles.imageMover} style={{ y: imageY }}>
            <Image src={project.cover} alt={project.title} fill sizes="(max-width: 560px) 90vw, (max-width: 1100px) 44vw, 28vw" />
          </motion.div>
          <span>{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className={styles.cardBody}>
          <div>
            <span className={styles.location}>{project.location}</span>
            <h2>{project.title}</h2>
          </div>
          <p>{project.summary}</p>
          <div className={styles.meta}>
            <span>{project.category}</span>
            <span>{project.images.length} Images</span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
