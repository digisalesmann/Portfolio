import Link from "next/link";

export default function BlogCard({ slug, title, date, tags = [], summary }) {
  return (
    <article className="rounded-2xl border border-black/10 dark:border-white/10 p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
        <time>{new Date(date).toLocaleDateString()}</time>
        {tags.length ? <>• <span>{tags.join(", ")}</span></> : null}
      </div>
      <h3 className="font-semibold text-lg mt-2">
        <Link className="hover:underline" href={`/blog/${slug}`}>{title}</Link>
      </h3>
      {summary && <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{summary}</p>}
    </article>
  );
}
