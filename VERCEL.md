# Vercel handoff

This public handoff is ready to import into Vercel as a Vite application. It intentionally
contains only the customer-facing application and generic illustrative assets; private review
notes, client correspondence, internal review routes, and identifiable client imagery stay out of
this repository. Add any authorized business photography privately only after publication permission
is confirmed. The repository's
[`vercel.json`](vercel.json) sets the build command, `dist` output directory, and React Router SPA
rewrite. The `/api` directory contains Vercel Web Standard adapters around the existing server
handlers, so Vercel receives the same chat and Acuity behaviour as the Cloudflare Pages build.

## Import settings

When importing the repository:

| Setting | Value |
|---|---|
| Framework | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm ci` |
| Node.js | 22.x |

The API routes are server-side. Do not expose their credentials through `VITE_*` variables.

## Environment variables

### Needed for the default site

None. The public `/book` flow embeds the studio's official Acuity scheduler, and chat uses the
grounded curated fallback when no model provider is configured.

### Recommended for live chat

| Variable | Required? | Purpose |
|---|---|---|
| `GROQ_API_KEY` | Recommended | Server-only key for live chat responses. |
| `GROQ_MODEL` | Optional | Model name; defaults to `openai/gpt-oss-20b`. |

The handler also accepts the following alternatives when Groq is absent:

| Variable | Purpose |
|---|---|
| `XAI_API_KEY` / `XAI_MODEL` | xAI-compatible chat provider. |
| `OPENAI_API_KEY` / `OPENAI_MODEL` | OpenAI-compatible chat provider. |

Only configure the provider you intend to use. Put the key in Vercel Project Settings for both
Preview and Production as appropriate, then create a new deployment; environment-variable changes
apply to new deployments.

### Optional Acuity REST proxy

`ACUITY_USER_ID` and `ACUITY_API_KEY` are only used by `/book?acuity-api`. The ordinary `/book`
embed does not require them, and the current public booking decision is to keep Acuity's own
checkout as the default.

### Native booking limitation on Vercel

The optional SISO booking module currently uses a Cloudflare D1 binding (`BOOKING_DB`) for
availability, reservations, idempotency, cancellation, calendar export, and admin overrides. A D1
binding is not representable as a normal Vercel environment-variable string. Therefore:

- `/book?native` gracefully falls back to Acuity on Vercel until a Vercel database adapter is chosen.
- Do not paste a Cloudflare D1 database ID into `BOOKING_DB` in Vercel; that does not create a
  database connection.
- A true native Vercel cutover requires selecting and implementing an external SQL/database
  adapter, then configuring the payment and mail services below and running the full booking
  readiness tests.

The native Cloudflare path, when intentionally used, also needs `STRIPE_SECRET_KEY`,
`STRIPE_WEBHOOK_SECRET`, and `BOOKING_ADMIN_TOKEN`; `RESEND_API_KEY`, `BOOKING_FROM`, and
`BOOKING_TO` are optional for email notifications. These values are not required for the default
Vercel deployment.

## Post-import smoke checks

After the first Vercel deployment, check:

1. `/`, `/about`, `/services`, `/programs`, `/results`, `/trichology-101`, `/the-method`, `/book`,
   `/faq`, `/contact`, and `/policies` load directly (the SPA rewrite is working).
2. `/api/chat/health` returns `provider: "groq"` when `GROQ_API_KEY` is configured, or
   `provider: "curated-fallback"` when it is intentionally omitted.
3. `/book` renders the Acuity scheduler and selecting a service opens its matching appointment
   type.
4. `/book?demo` completes the no-write demo flow.
5. `/api/booking/health` reports `database: false` on Vercel unless a future database adapter is
   installed; this is expected and keeps `/book` on the working Acuity path.

The no-secret local equivalent is:

```bash
npm run verify:vercel
```
