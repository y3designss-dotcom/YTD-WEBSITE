"use client";

import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Residence",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("sent");
      setFormData({ name: "", email: "", projectType: "Residence", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

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
              </div>
            </div>

            <div className={styles.formCol}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>FULL NAME</label>
                  <input
                    type="text"
                    name="name"
                    className={styles.input}
                    placeholder="YOUR NAME"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>EMAIL ADDRESS</label>
                  <input
                    type="email"
                    name="email"
                    className={styles.input}
                    placeholder="YOUR EMAIL"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>PROJECT TYPE</label>
                  <select
                    name="projectType"
                    className={styles.input}
                    value={formData.projectType}
                    onChange={handleChange}
                  >
                    <option>Residence</option>
                    <option>Commercial</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>YOUR MESSAGE</label>
                  <textarea
                    name="message"
                    className={styles.textarea}
                    placeholder="Describe your vision..."
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className={styles.submitBtn} disabled={status === "sending"}>
                   <span>
                     {status === "sending" ? "SENDING..." : "SEND INQUIRY"}
                   </span>
                </button>
                {status === "sent" && (
                  <p className={styles.formStatus}>Thanks! Your inquiry has been sent.</p>
                )}
                {status === "error" && (
                  <p className={styles.formStatus}>{errorMsg || "Failed to send. Please try again."}</p>
                )}
              </form>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
