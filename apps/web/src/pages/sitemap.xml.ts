export const prerender = false

export function GET ({ request }: { request: Request }) {
  console.log('request', request)
  const origin = new URL(request.url).origin
  console.log('origin', origin)
  const lastmod = new Date().toISOString().slice(0, 10)

  const urls = [
    { loc: origin, lastmod, changefreq: 'weekly' as const, priority: 1 },
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${
    urls
      .map(
        (u) =>
          `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
      )
      .join('\n')
  }
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
