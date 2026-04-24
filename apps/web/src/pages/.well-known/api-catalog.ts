import type { APIRoute } from 'astro'

export const GET: APIRoute = ({ url }) => {
  const origin = url.origin

  const catalog = {
    linkset: [
      {
        anchor: `${origin}/_actions/contact`,
        'service-desc': [{ href: `${origin}/openapi.json`, type: 'application/openapi+json' }],
        'service-doc':  [{ href: `${origin}/llms.txt`,     type: 'text/markdown' }],
        'status':       [{ href: `${origin}/api/health` }],
      },
    ],
  }

  return new Response(JSON.stringify(catalog), {
    headers: { 'Content-Type': 'application/linkset+json' },
  })
}
