import assert from 'node:assert/strict'
import chat from '../api/chat.js'
import chatHealth from '../api/chat/health.js'
import acuity from '../api/acuity/[...path].js'
import booking from '../api/booking/[...path].js'

const secretNames = [
  'GROQ_API_KEY',
  'XAI_API_KEY',
  'OPENAI_API_KEY',
  'ACUITY_USER_ID',
  'ACUITY_API_KEY',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'RESEND_API_KEY',
  'BOOKING_ADMIN_TOKEN',
  'BOOKING_PAYMENT_MODE',
  'BOOKING_DB',
]

const saved = Object.fromEntries(secretNames.map((name) => [name, process.env[name]]))
for (const name of secretNames) delete process.env[name]

try {
  const health = await chatHealth.fetch(new Request('https://example.test/api/chat/health'))
  assert.equal(health.status, 200)
  assert.deepEqual(await health.json(), {
    status: 'ok',
    module: 'chat-assistant',
    provider: 'curated-fallback',
  })

  const chatResponse = await chat.fetch(new Request('https://example.test/api/chat', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'user', content: 'Where are you located?' }] }),
  }))
  assert.equal(chatResponse.status, 200)
  assert.match(chatResponse.headers.get('content-type') || '', /text\/event-stream/)
  assert.equal(chatResponse.headers.get('x-melano-chat-mode'), 'curated-fallback')

  const acuityResponse = await acuity.fetch(new Request('https://example.test/api/acuity/appointment-types'))
  assert.equal(acuityResponse.status, 503)
  assert.deepEqual(await acuityResponse.json(), {
    configured: false,
    error: 'Acuity credentials not configured',
  })

  const bookingResponse = await booking.fetch(new Request('https://example.test/api/booking/health'))
  assert.equal(bookingResponse.status, 200)
  const bookingHealth = await bookingResponse.json()
  assert.equal(bookingHealth.module, 'booking')
  assert.equal(bookingHealth.configured, false)
  assert.equal(bookingHealth.database, false)

  console.log('verify:vercel: PASS')
} finally {
  for (const name of secretNames) {
    if (saved[name] === undefined) delete process.env[name]
    else process.env[name] = saved[name]
  }
}
