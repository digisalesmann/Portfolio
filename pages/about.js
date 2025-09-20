import Head from "next/head";
import skills from "@/data/skills";

export default function About() {
  return (
    <>
      <Head><title>About — BuildWithVictor</title></Head>
      <section className="section">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">About Victor</h1>
        <p className="muted mt-3 max-w-3xl">
          Final-year Computer Science student at FUTO. Full-stack developer and Web3/AI enthusiast.
          I ship apps, run experiments, and write accessible technical articles.
        </p>

        <h2 className="text-xl font-semibold mt-8">Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="card p-4">
              <h3 className="font-semibold capitalize">{group}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {items.map(s => <span key={s} className="text-xs rounded-full border px-2 py-1">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
