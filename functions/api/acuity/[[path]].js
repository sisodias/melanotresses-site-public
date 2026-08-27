/*
 * Acuity API proxy — Cloudflare Pages Function.
 *
 * The Acuity REST API only allows server-side calls (basic auth would leak in
 * the browser), so the site calls /api/acuity/* and this function forwards to
 * https://acuityscheduling.com/api/v1/* with credentials from Pages secrets:
 *
 *   npx wrangler pages secret put ACUITY_USER_ID  --project-name <project>
 *   npx wrangler pages secret put ACUITY_API_KEY  --project-name <project>
 *
 * Until those secrets are set, every route returns 503 {configured:false} and
 * the frontend falls back to the embed flow. Only a small allowlist of
 * endpoints is forwarded — never arbitrary paths.
 */

const ALLOW = [
  { method: 'GET', path: /^appointment-types$/ },
  { method: 'GET', path: /^availability\/dates$/ },
  { method: 'GET', path: /^availability\/times$/ },
  { method: 'POST', path: /^appointments$/ },
]

export async function onRequest({ request, env, params }) {
  const path = (params.path || []).join('/')

  if (!env.ACUITY_USER_ID || !env.ACUITY_API_KEY) {
    return json({ configured: false, error: 'Acuity credentials not configured' }, 503)
  }
  if (!ALLOW.some((r) => r.method === request.method && r.path.test(path))) {
    return json({ error: 'endpoint not allowed' }, 404)
  }

  const upstream = new URL(`https://acuityscheduling.com/api/v1/${path}`)
  upstream.search = new URL(request.url).search

  const init = {
    method: request.method,
    headers: {
      Authorization: 'Basic ' + btoa(`${env.ACUITY_USER_ID}:${env.ACUITY_API_KEY}`),
      Accept: 'application/json',
    },
  }
  if (request.method === 'POST') {
    init.headers['Content-Type'] = 'application/json'
    init.body = await request.text()
  }

  const res = await fetch(upstream, init)
  return new Response(res.body, {
    status: res.status,
    headers: {
      'Content-Type': res.headers.get('Content-Type') || 'application/json',
      'Cache-Control': request.method === 'GET' ? 'public, max-age=60' : 'no-store',
    },
  })
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}
