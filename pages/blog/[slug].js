import Head from "next/head";
import { getAllPostsMeta, getPostBySlug } from "../../lib/md";

export default function Post({ post }) {
  return (
    <>
      <Head><title>{post.title} — BuildWithVictor</title></Head>
      <article className="section prose prose-neutral dark:prose-invert max-w-none">
        <p className="muted">{new Date(post.date).toLocaleDateString()} — {post.tags.join(", ")}</p>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </>
  );
}

export async function getStaticPaths() {
  const posts = getAllPostsMeta();
  return {
    paths: posts.map(p => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);
  return { props: { post } };
}
