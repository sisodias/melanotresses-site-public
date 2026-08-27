import { onRequest } from '../../functions/api/booking/[[path]].js'
import { createVercelContext } from '../../server/vercel-context.js'

export default {
  fetch(request) {
    return onRequest(createVercelContext(request, '/api/booking'))
  },
}
