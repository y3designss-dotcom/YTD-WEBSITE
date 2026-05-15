import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getProject, projects } from "@/data/projects";
import styles from "./project.module.css";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found | YTD Architects",
    };
  }

  return {
    title: `${project.title} | YTD Architects`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const related = projects.filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <main className={styles.page}>
      <Navbar />
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <Image src={project.cover} alt={project.title} fill priority sizes="100vw" />
        </div>
        <div className={styles.heroContent}>
          <Link href="/projects" className={styles.backLink}>
            Back to portfolio
          </Link>
          <span className={styles.eyebrow}>{project.category}</span>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </div>
      </section>

      <section className={styles.overview}>
        <div className={styles.factGrid}>
          <div>
            <span>Location</span>
            <strong>{project.location}</strong>
          </div>
          <div>
            <span>Year</span>
            <strong>{project.year}</strong>
          </div>
          <div>
            <span>Type</span>
            <strong>{project.category}</strong>
          </div>
          <div>
            <span>Gallery</span>
            <strong>{project.images.length} Images</strong>
          </div>
        </div>

        <div className={styles.story}>
          <span>Project Story</span>
          <p>{project.description}</p>
          <ul>
            {project.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.gallery} aria-label={`${project.title} image showcase`}>
        {project.images.map((src, index) => (
          <figure className={index % 5 === 0 ? styles.featuredImage : styles.galleryImage} key={src}>
            <Image
              src={src}
              alt={`${project.title} view ${index + 1}`}
              fill
              sizes="(max-width: 560px) 90vw, (max-width: 900px) 44vw, 29vw"
              loading={index < 3 ? "eager" : "lazy"}
            />
            <figcaption>{String(index + 1).padStart(2, "0")}</figcaption>
          </figure>
        ))}
      </section>

      <section className={styles.nextSection}>
        <div>
          <span className={styles.eyebrow}>Continue Exploring</span>
          <h2>More from the portfolio</h2>
        </div>
        <div className={styles.relatedGrid}>
          {related.map((item) => (
            <Link href={`/projects/${item.slug}`} className={styles.relatedCard} key={item.slug}>
              <div className={styles.relatedImage}>
                <Image src={item.cover} alt={item.title} fill sizes="(max-width: 900px) 90vw, 29vw" />
              </div>
              <span>{item.location}</span>
              <strong>{item.title}</strong>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
