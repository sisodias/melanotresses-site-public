# MelanoTresses website

The MelanoTresses website is a Vite + React single-page app for a trichology-led Afro-hair and
scalp-care studio in Newcastle upon Tyne. It includes the public marketing pages, a branded service
picker, Acuity booking, an optional same-origin AI assistant, and reusable SISO chat and booking
modules.

## Run locally

```bash
npm ci
npm run dev
```

Useful checks:

```bash
npm run build
npm run verify:modules
npm run verify:vercel
```

## Booking behaviour

`/book` is the production-safe public path. It shows the branded service picker and the studio's
official Acuity scheduler, preserving Acuity checkout, payments, reminders, and booking records.
It does not require an API key.

- `/book?demo` exercises the no-write native booking UI locally.
- `/book?native` exercises the optional SISO/D1 booking flow when a Cloudflare D1 binding and its
  payment configuration are available. On Vercel, the route reports that D1 is unavailable and
  falls back to Acuity.
- `/book?acuity-api` exercises the optional server-side Acuity REST proxy when Acuity credentials
  are configured. The normal embed does not need them.

## Chat behaviour

The chat widget calls the same-origin `/api/chat` route. A server-only `GROQ_API_KEY` enables live
answers; without a provider key the app returns a grounded curated fallback, so the site remains
usable without AI credentials. `GROQ_MODEL` defaults to `openai/gpt-oss-20b`.

Provider credentials must be configured in the hosting provider's server environment. Never put a
key in a `VITE_*` variable, browser code, a checked-in `.env` file, or a commit. See
[`.env.example`](.env.example) and [`VERCEL.md`](VERCEL.md) for the handoff contract.

## Deploy to Vercel

The repository includes [`vercel.json`](vercel.json), Vercel `/api` adapters for the server routes,
and an SPA rewrite for React Router deep links. Import the repository into Vercel with:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm ci` (or Vercel's detected npm install)

The default Acuity booking path and curated chat fallback work with no environment variables. Add
`GROQ_API_KEY` in Vercel Project Settings to enable live chat. The full variable matrix and the
Cloudflare-only native-booking caveat are in [`VERCEL.md`](VERCEL.md).

## Repository boundaries

This public handoff contains the application source, deploy adapters, reusable modules, and the
assets used by the site. Private source materials, commercial documents, credentials, and hosting
operational notes are intentionally excluded.

Generated campaign imagery and review-card portraits are illustrative assets; they are not claims
that the depicted people are real clients or that the displayed review text is a verified quote.
