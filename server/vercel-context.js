/**
 * Adapt a Vercel Web Standard function request to the context shape used by
 * the existing Cloudflare Pages handlers.
 */
export function createVercelContext(request, routePrefix) {
  const pathname = new URL(request.url).pathname
  const suffix = pathname.startsWith(routePrefix)
    ? pathname.slice(routePrefix.length)
    : ''

  return {
    request,
    env: process.env,
    params: { path: suffix.split('/').filter(Boolean) },
  }
}
