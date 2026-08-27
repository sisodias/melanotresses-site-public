import { onRequest } from '../functions/api/chat.js'

// Vercel's Node.js runtime supports the Web Standard fetch export. The
// underlying handler is shared with the Cloudflare Pages deployment.
export default {
  fetch(request) {
    return onRequest({ request, env: process.env })
  },
}
