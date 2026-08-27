import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Check, Loader2, ExternalLink, CalendarDays, MessageCircle } from 'lucide-react'
import { CONTACT } from '../data'

/*
 * BookingCalendar — the native availability flow, all in our UI:
 *
 *   pick a date (real availability)  →  pick a time  →  enter details  →  book
 *
 * Data comes from our Cloudflare Pages Function proxy (/api/acuity/*), which
 * holds the Acuity credentials server-side. If the proxy reports it is not
 * configured yet (503 configured:false) — or any request fails — the caller is
 * told via onUnavailable() so the page can fall back to the Acuity embed.
 *
 * Booking itself POSTs /appointments and the booking provider sends its own
 * confirmation email. Payment and policy details remain with that provider.
 */

const MONTH_FMT = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' })
const DAY_FMT = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
// Studio times must render in the studio's timezone, never the viewer's —
// a visitor abroad still books "2:00 pm at the Newcastle salon".
const TIME_FMT = new Intl.DateTimeFormat('en-GB', { hour: 'numeric', minute: '2-digit', timeZone: 'Europe/London' })

function ym(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

/*
 * Demo mode (?demo on /book): serves deterministic mock availability so the
 * native flow can be experienced before live provider access exists. Weekdays
 * get 9–5 hourly slots, Saturdays 1–5, Sundays closed — matching the published
 * opening hours. Booking in demo mode "succeeds" without calling anything.
 */
const DEMO = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('demo')

function demoData(path, params) {
  if (path === 'availability/dates') {
    const [y, m] = params.month.split('-').map(Number)
    const days = new Date(y, m, 0).getDate()
    const out = []
    for (let d = 1; d <= days; d++) {
      const dow = new Date(y, m - 1, d).getDay()
      if (dow !== 0 && d % 3 !== 0) out.push({ date: `${params.month}-${String(d).padStart(2, '0')}` })
    }
    return out
  }
  if (path === 'availability/times') {
    const dow = new Date(`${params.date}T12:00:00`).getDay()
    const hours = dow === 6 ? [13, 14, 15, 16] : [9, 10, 11, 13, 14, 15, 16]
    return hours.filter((h) => (h + Number(params.date.slice(-2))) % 4 !== 0)
      .map((h) => ({ time: `${params.date}T${String(h).padStart(2, '0')}:00:00+01:00` }))
  }
  return null
}

async function api(path, params) {
  if (DEMO) return demoData(path, params)
  const url = new URL(`/api/acuity/${path}`, window.location.origin)
  Object.entries(params || {}).forEach(([k, v]) => url.searchParams.set(k, v))
  const res = await fetch(url).catch(() => null)
  // Anything that isn't a JSON API response (proxy missing, dev server
  // serving the SPA shell, 503 unconfigured) means: fall back to the embed.
  if (!res || !(res.headers.get('Content-Type') || '').includes('json')) throw new Error('unconfigured')
  const body = await res.json().catch(() => null)
  if (res.status === 503 && body && body.configured === false) throw new Error('unconfigured')
  if (!res.ok) throw new Error(body?.message || `request failed (${res.status})`)
  return body
}

export function BookingCalendar({ service, onUnavailable }) {
  const [month, setMonth] = useState(() => new Date())
  const [dates, setDates] = useState(null)         // ['2026-08-20', ...]
  const [date, setDate] = useState(null)
  const [times, setTimes] = useState(null)         // [{time: iso}, ...]
  const [slot, setSlot] = useState(null)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' })
  const [state, setState] = useState('idle')       // idle | booking | booked | error
  const [error, setError] = useState('')

  // available dates for the visible month
  useEffect(() => {
    if (!service) return
    let live = true
    setDates(null); setDate(null); setTimes(null); setSlot(null)
    api('availability/dates', { month: ym(month), appointmentTypeID: service.id, timezone: 'Europe/London' })
      .then((d) => { if (live) setDates(d.map((x) => x.date)) })
      .catch((e) => { if (e.message === 'unconfigured') onUnavailable?.(); else if (live) setDates([]) })
    return () => { live = false }
  }, [service, month, onUnavailable])

  // times for the chosen date
  useEffect(() => {
    if (!service || !date) return
    let live = true
    setTimes(null); setSlot(null)
    api('availability/times', { date, appointmentTypeID: service.id, timezone: 'Europe/London' })
      .then((d) => { if (live) setTimes(d) })
      .catch(() => { if (live) setTimes([]) })
    return () => { live = false }
  }, [service, date])

  const grid = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1)
    const start = (first.getDay() + 6) % 7 // Monday-first
    const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
    return { start, count }
  }, [month])

  /* wa.me deep link carrying the full booking request, URL-encoded. */
  const whatsappHref = () => {
    const when = slot
      ? `${DAY_FMT.format(new Date(slot.time))} at ${TIME_FMT.format(new Date(slot.time))}`
      : date
        ? DAY_FMT.format(new Date(`${date}T12:00:00`))
        : 'a time that suits'
    const msg =
      `Hi MelanoTresses! I'm ${form.firstName || '...'} ${form.lastName || ''}`.trimEnd() +
      `. I'd like to book a ${service.name} for ${when}.` +
      (form.phone ? `\nPhone: ${form.phone}` : '') +
      (form.email ? `\nEmail: ${form.email}` : '')
    return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`
  }

  async function book(e) {
    e.preventDefault()
    setState('booking'); setError('')
    if (DEMO) {
      await new Promise((r) => setTimeout(r, 700))
      setState('booked')
      return
    }
    try {
      const res = await fetch('/api/acuity/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appointmentTypeID: service.id,
          datetime: slot.time,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
        }),
      })
      const body = await res.json().catch(() => null)
      if (!res.ok) throw new Error(body?.message || 'Booking failed — the slot may have just been taken.')
      setState('booked')
    } catch (err) {
      setState('error')
      setError(err.message)
    }
  }

  if (!service) {
    return (
      <div className="flex min-h-[24rem] flex-col items-center justify-center gap-3 text-center">
        <CalendarDays size={28} aria-hidden="true" className="text-bark" />
        <p className="max-w-xs text-sm leading-relaxed text-cocoa/70">
          Choose an appointment above and the live calendar appears here.
        </p>
      </div>
    )
  }

  if (state === 'booked') {
    return (
      <div className="flex min-h-[24rem] flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-bark text-white">
          <Check size={26} aria-hidden="true" />
        </span>
        <h3 className="font-head text-2xl text-cocoa">You&apos;re booked in</h3>
        <p className="max-w-sm text-sm leading-relaxed text-cocoa/80">
          {service.name} — {DAY_FMT.format(new Date(slot.time))}, {TIME_FMT.format(new Date(slot.time))}.
          A confirmation email is on its way to {form.email}. Any deposit due is settled per our{' '}
          policies — check your confirmation for details.
        </p>
        <a href={whatsappHref()} target="_blank" rel="noreferrer" className="btn-ghost">
          <MessageCircle size={15} aria-hidden="true" /> Message us on WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      {/* month grid */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
            aria-label="Previous month"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cocoa/15 text-cocoa hover:border-cocoa/40"
          >
            <ChevronLeft size={17} />
          </button>
          <p className="font-head text-xl text-cocoa">{MONTH_FMT.format(month)}</p>
          <button
            type="button"
            onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
            aria-label="Next month"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cocoa/15 text-cocoa hover:border-cocoa/40"
          >
            <ChevronRight size={17} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <span key={i} className="py-1 font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-cocoa/50">{d}</span>
          ))}
          {Array.from({ length: grid.start }).map((_, i) => <span key={`b${i}`} />)}
          {Array.from({ length: grid.count }).map((_, i) => {
            const dayIso = `${ym(month)}-${String(i + 1).padStart(2, '0')}`
            const open = dates?.includes(dayIso)
            const active = date === dayIso
            return (
              <button
                key={dayIso}
                type="button"
                disabled={!open}
                onClick={() => setDate(dayIso)}
                aria-pressed={active}
                className={`aspect-square rounded-full font-body text-sm transition-colors ${
                  active
                    ? 'bg-bark font-semibold text-white'
                    : open
                      ? 'bg-bark/[0.07] font-medium text-cocoa hover:bg-bark/15'
                      : 'text-cocoa/25'
                }`}
              >
                {i + 1}
              </button>
            )
          })}
        </div>
        {dates === null && (
          <p className="mt-4 flex items-center justify-center gap-2 text-sm text-cocoa/60">
            <Loader2 size={15} className="animate-spin" aria-hidden="true" /> Checking availability…
          </p>
        )}
        {dates?.length === 0 && (
          <p className="mt-4 text-center text-sm text-cocoa/60">No openings this month — try the next one.</p>
        )}
      </div>

      {/* times + details */}
      <div>
        {date && (
          <>
            <p className="eyebrow mb-4">{DAY_FMT.format(new Date(`${date}T12:00:00`))}</p>
            {times === null ? (
              <p className="flex items-center gap-2 text-sm text-cocoa/60">
                <Loader2 size={15} className="animate-spin" aria-hidden="true" /> Loading times…
              </p>
            ) : times.length === 0 ? (
              <p className="text-sm text-cocoa/60">No times left on this day.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {times.map((t) => (
                  <button
                    key={t.time}
                    type="button"
                    onClick={() => setSlot(t)}
                    aria-pressed={slot?.time === t.time}
                    className={`rounded-full border px-4 py-2 font-body text-sm transition-colors ${
                      slot?.time === t.time
                        ? 'border-bark bg-bark text-white'
                        : 'border-cocoa/20 text-cocoa hover:border-cocoa/50'
                    }`}
                  >
                    {TIME_FMT.format(new Date(t.time))}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {slot && (
          <form onSubmit={book} className="mt-7 space-y-3 border-t border-cocoa/10 pt-6">
            <div className="grid grid-cols-2 gap-3">
              {[['firstName', 'First name', 'given-name'], ['lastName', 'Last name', 'family-name']].map(([k, label, ac]) => (
                <div key={k}>
                  <label htmlFor={`bk-${k}`} className="block text-sm font-medium text-cocoa">{label}</label>
                  <input
                    id={`bk-${k}`} required type="text" autoComplete={ac} value={form[k]}
                    onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))}
                    className="mt-1.5 min-h-[44px] w-full rounded-xl border border-cocoa/20 bg-white px-3.5 text-sm text-cocoa focus:border-bark focus:outline-none focus:ring-2 focus:ring-bark/30"
                  />
                </div>
              ))}
            </div>
            {[['email', 'Email', 'email', 'email'], ['phone', 'Phone', 'tel', 'tel']].map(([k, label, type, ac]) => (
              <div key={k}>
                <label htmlFor={`bk-${k}`} className="block text-sm font-medium text-cocoa">{label}</label>
                <input
                  id={`bk-${k}`} required={k === 'email'} type={type} autoComplete={ac} value={form[k]}
                  onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))}
                  className="mt-1.5 min-h-[44px] w-full rounded-xl border border-cocoa/20 bg-white px-3.5 text-sm text-cocoa focus:border-bark focus:outline-none focus:ring-2 focus:ring-bark/30"
                />
              </div>
            ))}
            <button type="submit" disabled={state === 'booking'} className="btn-copper w-full disabled:opacity-60">
              {state === 'booking'
                ? <><Loader2 size={16} className="animate-spin" aria-hidden="true" /> Booking…</>
                : <>Confirm {TIME_FMT.format(new Date(slot.time))} · {service.name}</>}
            </button>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost w-full"
            >
              <MessageCircle size={15} aria-hidden="true" /> Request on WhatsApp instead
            </a>
            {state === 'error' && (
              <p role="alert" className="text-sm leading-relaxed text-bark">
                {error}{' '}
                <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" className="link-copper inline-flex items-center gap-1">
                  Message us instead <ExternalLink size={12} aria-hidden="true" />
                </a>
              </p>
            )}
            <p className="text-xs leading-relaxed text-cocoa/60">
              Confirmation comes by email from our booking system. Deposits are settled per our
              booking policies.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
