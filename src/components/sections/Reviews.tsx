"use client";

import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useRef } from "react";
import styles from "./Reviews.module.css";

const reviews = [
  {
    id: 1,
    name: "MARCUS CHEN",
    location: "DUBAI, UAE",
    subtitle: "RESIDENTIAL MASTERPIECE",
    text: "YTD Architects transformed our industrial shell into a living sanctuary. Their attention to structural rhythm is unparalleled.",
    image: "/2J3A7704-HDR.jpg"
  },
  {
    id: 2,
    name: "SARA AL-SAYED",
    location: "ABU DHABI, UAE",
    subtitle: "LUXURY PENTHOUSE",
    text: "The most professional design journey I've experienced. From first sketch to final delivery, the team was flawless.",
    image: "/2J3A7836-HDR.jpg"
  },
  {
    id: 3,
    name: "OLIVER KNIGHT",
    location: "NEW YORK, USA",
    subtitle: "SUSTAINABLE OFFICE",
    text: "Their ability to blend sustainable materials with ultra-luxury aesthetics is what sets them apart in the global market.",
    image: "/DSC_9276.jpg"
  }
];

export default function Reviews() {
  return (
    <section className={styles.root} id="reviews">
      <div className={styles.marqueeContainer}>
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className={styles.marqueeTrack}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className={i % 2 === 0 ? styles.mFilled : styles.mOutline}>
              REVIEWS
            </span>
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i + 8} className={i % 2 === 0 ? styles.mFilled : styles.mOutline}>
              REVIEWS
            </span>
          ))}
        </motion.div>
      </div>

      <div className={styles.header}>
        <span className={styles.premiumLabel}>Feedback</span>
        <h2 className={styles.headline}>Every Detail Matters</h2>
      </div>

      <div className={styles.verticalList}>
        {reviews.map((review, i) => (
          <ReviewCard key={review.id} review={review} index={i} />
        ))}
      </div>
    </section>
  );
}

function ReviewCard({ review, index }: { review: typeof reviews[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const springProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });


  const rotateX = useTransform(springProgress, [0, 0.5, 1], [30, 0, -30]);
  const rotateY = useTransform(springProgress, [0, 0.5, 1], [-15, 0, 15]);
  const scale = useTransform(springProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const opacity = useTransform(springProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  

  const imgY = useTransform(springProgress, [0, 1], ["-12%", "12%"]);

  const textY = useTransform(springProgress, [0, 1], [60, -60]);

  return (
    <div key={review.id} ref={cardRef} className={styles.stepWrapper}>
      <motion.div 
        style={{ 
          opacity, 
          scale,
          rotateX,
          rotateY,
          perspective: 1200
        }} 
        className={styles.processCard}
      >
        <div className={styles.cardContent}>
          
          <div className={styles.imageBox}>
             <motion.img 
               src={review.image} 
               alt={review.name} 
               className={styles.mainImg}
               style={{ y: imgY }}
             />
             <div className={styles.imageOverlay}></div>
          </div>

          <motion.div style={{ y: textY }} className={styles.infoBox}>
             <div className={styles.topInfo}>
                <span className={styles.subtitle}>{review.subtitle}</span>
                <span className={styles.stepNum}>0{index + 1}</span>
             </div>
             
             <div className={styles.quoteWrap}>
                <span className={styles.quoteChar}>“</span>
                <p className={styles.desc}>{review.text}</p>
             </div>
             
             <div className={styles.authorBadge}>
                <div className={styles.line}></div>
             </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
