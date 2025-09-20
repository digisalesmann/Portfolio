import Head from "next/head";
import projects from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  return (
    <>
      <Head><title>Projects — BuildWithVictor</title></Head>
      <section className="section">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="muted mt-1">Curated work across Full-Stack, Web3, and AI/ML.</p>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {projects.map(p => <ProjectCard key={p.title} {...p} />)}
        </div>
      </section>
    </>
  );
}
