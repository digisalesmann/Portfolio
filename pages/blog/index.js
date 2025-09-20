import Head from "next/head";
import { getAllPostsMeta } from "@/lib/md";
import BlogCard from "@/components/BlogCard";

export default function Blog({ posts }) {
  return (
    <>
      <Head><title>Articles — BuildWithVictor</title></Head>
      <section className="section">
        <h1 className="text-3xl font-semibold tracking-tight">Articles</h1>
        <p className="muted mt-1">AI/ML • Web3 • Full-Stack</p>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {posts.map(p => <BlogCard key={p.slug} {...p} />)}
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  return { props: { posts: getAllPostsMeta() } };
}
