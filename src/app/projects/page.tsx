import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { projects } from "@/data/projects";
import PortfolioCard from "./PortfolioCard";
import styles from "./projects.module.css";

export const metadata = {
  title: "Portfolio | YTD Architects",
  description: "Explore the complete YTD Architects portfolio of residences, farmhouses, and interior projects.",
};

export default function ProjectsPage() {
  return (
    <main className={styles.page}>
      <Navbar />
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <Image src={projects[1].cover} alt="" fill priority sizes="100vw" />
        </div>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>Complete Portfolio</span>
          <h1>Projects shaped for living, gathering, and memory.</h1>
          <p>
            A curated view of residential interiors, farmhouses, retail environments, and entertainment spaces
            designed with material richness and architectural clarity.
          </p>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.sectionHead}>
          <span>{String(projects.length).padStart(2, "0")} Projects</span>
          <p>Every project below opens into a dedicated visual showcase.</p>
        </div>

        <div className={styles.projectGrid}>
          {projects.map((project, index) => (
            <PortfolioCard project={project} index={index} key={project.slug} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
