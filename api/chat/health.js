import { onRequest } from '../../functions/api/chat/health.js'

export default {
  fetch(request) {
    return onRequest({ request, env: process.env })
  },
}
