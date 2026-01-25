
const SITE_URL = "https://buildwthvictor.com";

export async function getServerSideProps({ res }) {
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/projects",
    "/blog",
  ];

  // If later you fetch blog slugs from filesystem or CMS, you can add them here
  const pages = staticPages.map((page) => {
    return `
      <url>
        <loc>${SITE_URL}${page}</loc>
        <changefreq>weekly</changefreq>
        <priority>${page === "" ? 1.0 : 0.8}</priority>
      </url>
    `;
  }).join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null;
}
