import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Clock, MapPin, Banknote, CalendarDays, Check } from 'lucide-react'
import { CTA_PRIMARY, CTA_SECONDARY, CTA_TERTIARY, CONSULTATION, PROGRAMS } from '../data'

export const ACUITY = 'https://melanotresses.as.me/'

/** Sets document title + meta description per page. */
export function Seo({ title, description }) {
  useEffect(() => {
    document.title = title
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', description)
  }, [title, description])
  return null
}

/** Injects a JSON-LD block. */
export function JsonLd({ data, id }) {
  useEffect(() => {
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    el.textContent = JSON.stringify(data)
    document.head.appendChild(el)
    return () => { document.getElementById(id)?.remove() }
  }, [data, id])
  return null
}

/*
 * Scroll-reveal: fades and lifts content in as it enters the viewport, one
 * element at a time. Respects
 * prefers-reduced-motion via the CSS in index.css.
 */
export function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { el.classList.add('is-visible'); io.unobserve(el) }
      }),
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} style={delay ? { transitionDelay: `${delay}ms` } : undefined} className={`reveal ${className}`}>
      {children}
    </Tag>
  )
}

/** Dashed note block for information that needs an explicit follow-up. */
export function Placeholder({ children, label = 'Follow-up needed' }) {
  return (
    <div className="my-4 rounded-xl border border-dashed border-bark/50 bg-bark/[0.04] p-5">
       <span className="mb-2 inline-block font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-bark">
         Note — {label}
      </span>
      <div className="text-sm leading-relaxed text-cocoa">{children}</div>
    </div>
  )
}

/** Inline dashed pill for a short unconfirmed value. */
export function PlaceholderInline({ children }) {
  return (
    <span className="rounded border border-dashed border-bark/50 bg-bark/[0.05] px-2 py-0.5 font-body text-sm font-semibold text-bark">
      {children}
    </span>
  )
}

/*
 * Styled image stand-in — no stock photography. Soft sand gradient on light,
 * deep brown on dark. Supplied imagery can be added without changing the
 * component contract.
 */
export function PhotoBlock({ label, className = '', round = false, ratio = 'aspect-[4/3]', dark = false, src, alt, position = 'object-center' }) {
  // Image mode uses the same ratio/rounding wrapper as the illustration mode.
  if (src) {
    return (
      <figure className={`${ratio} ${round ? 'rounded-full' : 'rounded-2xl'} relative overflow-hidden ${className}`}>
        <img
          src={src}
          alt={alt ?? label}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover ${position}`}
        />
      </figure>
    )
  }
  return (
    <figure
      className={`${ratio} ${round ? 'rounded-full' : 'rounded-2xl'} relative flex items-center justify-center overflow-hidden ${
        dark ? 'bg-gradient-to-br from-bark to-ink' : 'bg-gradient-to-br from-[#F1F1EF] to-[#FAFAF9] ring-1 ring-cocoa/[0.06]'
      } ${className}`}
      role="img"
      aria-label={label}
    >
      <figcaption
        className={`px-5 text-center font-body text-[11px] font-medium uppercase tracking-[0.16em] ${
          dark ? 'text-white/70' : 'text-cocoa/45'
        }`}
      >
        {label}
      </figcaption>
    </figure>
  )
}

export function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-cocoa/15 bg-white px-3.5 py-1.5 font-body text-xs font-medium tracking-wide text-cocoa">
      {children}
    </span>
  )
}

export function SectionHead({ eyebrow, title, intro, center = true }) {
  return (
    <header className={`${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} mb-14`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="text-[2rem] leading-tight sm:text-[2.6rem]">{title}</h2>
      {intro && <p className="mt-5 text-base leading-relaxed text-cocoa/85 sm:text-lg">{intro}</p>}
    </header>
  )
}

/*
 * EvidenceStrip — optional light facts row. Unconfirmed slots remain visibly
 * flagged rather than being presented as established facts.
 */
export function EvidenceStrip({ slots = [], className = '' }) {
  if (!slots.length) return null
  return (
    <section className={`border-y border-cocoa/10 ${className}`} aria-label="Facts">
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-7 py-10 lg:grid-cols-4">
        {slots.map((s) => (
          <div key={s.label} className={s.confirmed ? '' : 'rounded-lg border border-dashed border-bark/40 bg-bark/[0.04] px-3 py-2'}>
            <p className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-bark">
              {s.confirmed ? s.label : `${s.label} — to confirm`}
            </p>
            <p className="mt-1.5 font-head text-lg leading-snug text-cocoa">{s.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* Compact spec row for a subscription — duration / where / price / payment. */
export function ProgramSpec({ program }) {
  const items = [
    { icon: Clock, label: 'Duration', value: program.duration },
    { icon: MapPin, label: 'Where', value: program.location },
    { icon: Banknote, label: 'Price', value: program.price ?? null, note: program.priceMatch },
    { icon: CalendarDays, label: 'Payment', value: program.priceNote || 'Payment plan available' },
  ]
  return (
    <dl className="my-7 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-cocoa/10 py-6 sm:grid-cols-4">
      {items.map(({ icon: Icon, label, value, note }) => (
        <div key={label}>
          <dt className="flex items-center gap-1.5 font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-bark">
            <Icon size={13} aria-hidden="true" />
            {label}
          </dt>
          <dd className="mt-2 font-head text-lg leading-snug text-cocoa">
            {value ?? <PlaceholderInline>To confirm</PlaceholderInline>}
            {note && <span className="mt-1 block font-body text-[11px] font-normal text-cocoa/60">{note}</span>}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/*
 * Payment note for the programme page. It keeps the consultation entry point
 * and payment-plan framing together without inventing deposit terms.
 */
export function PaymentNote() {
  return (
    <div className="rounded-2xl bg-white p-8 ring-1 ring-cocoa/[0.06] sm:p-10">
      <h2 className="text-2xl sm:text-3xl">Paying for your care</h2>
      <p className="mt-5 leading-relaxed text-cocoa/85">
        Every subscription is spread over a <strong className="text-cocoa">payment plan</strong> — an
        upfront deposit, then monthly instalments across the plan, so you don’t pay for the whole
        journey at once. New clients start with a{' '}
        <strong className="text-cocoa">{CONSULTATION.price} consultation</strong> ({CONSULTATION.duration}),
        where your scalp and hair are assessed before anything is recommended.
      </p>
      <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-cocoa/85">
        {PROGRAMS.filter((p) => p.plan).map((p) => (
          <li key={p.slug} className="flex flex-col border-t border-cocoa/10 pt-3 sm:flex-row sm:justify-between">
            <span className="font-medium text-cocoa">{p.name}</span>
            <span>{p.price} — {p.plan}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
export const DepositBlock = PaymentNote // legacy alias so older imports keep working

/*
 * Programme card shared by the programmes and booking pages.
 */
export function ProgramCard({ program, featured = false, onBookPage = false }) {
  return (
    <article
      className={`flex flex-col rounded-2xl p-8 transition-shadow hover:shadow-soft ${
        featured ? 'bg-cocoa text-white' : 'bg-white text-cocoa ring-1 ring-cocoa/10 shadow-soft'
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.14em] ${featured ? 'bg-white/15 text-white' : 'bg-bark/10 text-bark'}`}>
          {program.duration}
        </span>
        <span className={`rounded-full px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.14em] ${featured ? 'bg-white/15 text-white' : 'bg-bark/10 text-bark'}`}>
          {program.location}
        </span>
      </div>
      <h3 className={`mt-5 font-head text-2xl ${featured ? 'text-white' : 'text-cocoa'}`}>{program.name}</h3>
      {program.tagline && (
        <p className={`mt-2 font-head text-lg italic ${featured ? 'text-white/80' : 'text-cocoa/70'}`}>
          {program.tagline}
        </p>
      )}
      <p className={`mt-4 text-sm leading-relaxed ${featured ? 'text-white/85' : 'text-cocoa/85'}`}>
        {program.blurb}
      </p>

      {program.includes && (
        <ul className={`mt-6 space-y-2.5 border-t pt-6 text-sm ${featured ? 'border-white/15' : 'border-cocoa/10'}`}>
          {program.includes.slice(0, 5).map((item) => (
            <li key={item} className="flex gap-2.5">
              <Check size={16} aria-hidden="true" className={`mt-0.5 shrink-0 ${featured ? 'text-white/70' : 'text-bark'}`} />
              <span className={featured ? 'text-white/85' : 'text-cocoa/85'}>{item}</span>
            </li>
          ))}
          {program.includes.length > 5 && (
            <li className={`pl-6 text-xs ${featured ? 'text-white/60' : 'text-cocoa/55'}`}>
              + {program.includes.length - 5} more
            </li>
          )}
        </ul>
      )}

      <p className={`mt-6 font-body text-[11px] font-semibold uppercase tracking-[0.14em] ${featured ? 'text-white/70' : 'text-bark'}`}>
        {program.priceNote || 'Payment plan available'}
      </p>

      {onBookPage ? (
        <a href={ACUITY} target="_blank" rel="noreferrer" className={`mt-5 ${featured ? 'btn-on-dark' : 'btn-ghost'} w-full`}>
          {CTA_PRIMARY}
        </a>
      ) : (
        <Link to="/programs" className={`mt-5 ${featured ? 'btn-on-dark' : 'btn-ghost'} w-full`}>
          {CTA_TERTIARY}
        </Link>
      )}
    </article>
  )
}

/** TestimonialCard — explicit placeholder for a future attributed quote. */
export function TestimonialCard({ quote, name }) {
  return (
    <blockquote className="rounded-2xl border border-dashed border-bark/40 bg-bark/[0.04] p-7">
      <span className="mb-3 inline-block font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-bark">
        Placeholder — attributed quote to be added
      </span>
      <p className="font-head text-xl italic leading-relaxed text-cocoa">“{quote}”</p>
      <footer className="mt-5 flex items-center gap-3">
        <span aria-hidden="true" className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-[#F1F1EF] to-[#FAFAF9] ring-1 ring-cocoa/10" />
        <cite className="font-body text-sm font-medium not-italic text-cocoa">{name}</cite>
      </footer>
    </blockquote>
  )
}

/* Simple numbered step flow. */
export function StepFlow({ steps, onDark = false, columns = 3 }) {
  const grid =
    columns === 5 ? 'sm:grid-cols-2 lg:grid-cols-5'
    : columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4'
    : 'sm:grid-cols-3'
  return (
    <ol className={`grid gap-10 ${grid}`}>
      {steps.map((s, i) => (
        <li key={s.title}>
          <div className={`flex h-11 w-11 items-center justify-center rounded-full font-head text-lg ${onDark ? 'bg-white/15 text-white' : 'bg-bark text-white'}`}>
            {i + 1}
          </div>
          <h3 className={`mt-5 font-head text-xl ${onDark ? 'text-white' : 'text-cocoa'}`}>{s.title}</h3>
          <p className={`mt-2 text-sm leading-relaxed ${onDark ? 'text-white/75' : 'text-cocoa/80'}`}>{s.body}</p>
        </li>
      ))}
    </ol>
  )
}

/*
 * CtaBand — a single calm invitation with the two actions: book, or ask first.
 */
export function CtaBand({
  title = 'Book your consultation',
  body = 'We start by looking at your scalp and hair properly, then tell you what we think you need — including if that\u2019s nothing.',
}) {
  return (
    <section className="section">
      <div className="container-x">
        <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-cocoa/10 shadow-soft">
          <div className="grid lg:grid-cols-[1fr_0.85fr]">
            {/* copy + booking details */}
            <div className="px-8 py-14 sm:px-12 sm:py-16">
              <p className="eyebrow mb-5">Your crown, cared for</p>
              <h2 className="max-w-xl text-[2rem] leading-tight sm:text-[2.6rem]">{title}</h2>
              <p className="mt-5 max-w-xl leading-relaxed text-cocoa/85">{body}</p>

              {/* what-you-get spec row */}
              <dl className="mt-8 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-2xl bg-cocoa/10">
                {[
                  ['Price', CONSULTATION.price],
                  ['Length', CONSULTATION.duration],
                  ['Where', 'In-studio'],
                ].map(([label, value]) => (
                  <div key={label} className="bg-paper px-4 py-4 text-center sm:text-left">
                    <dt className="font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-bark">{label}</dt>
                    <dd className="mt-1 font-head text-lg leading-snug text-cocoa sm:text-xl">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Link to="/book" className="btn-copper w-full sm:w-auto">{CTA_PRIMARY}</Link>
                <Link to="/contact" className="btn-ghost w-full sm:w-auto">{CTA_SECONDARY}</Link>
              </div>
              <p className="mt-6 text-xs leading-relaxed text-cocoa/60">
                Scalp assessed under magnification · written plan to take home · no obligation to continue
              </p>
            </div>

            {/* imagery panel */}
            <div className="relative hidden min-h-[22rem] lg:block">
              <img
                src="/images/generated/booking-care-still-life.png"
                alt="Care-first studio still life"
                className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />
              <div className="absolute bottom-6 right-6 rounded-2xl bg-white/85 px-5 py-4 shadow-soft backdrop-blur">
                <p className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-bark">Newcastle upon Tyne</p>
                <p className="mt-1 font-head text-lg text-cocoa">86 Adelaide Terrace · Est. 2018</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Airy, editorial page hero — white, generous, serif. */
export function PageHero({ eyebrow, title, intro, children }) {
  return (
    <header className="border-b border-cocoa/[0.06]">
      <div className="container-x py-20 sm:py-28">
        {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
        <h1 className="max-w-3xl text-[2.6rem] leading-[1.08] sm:text-6xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cocoa/85">{intro}</p>}
        {children}
      </div>
    </header>
  )
}

/*
 * ConsultCta — THE one mid-page consultation prompt, used wherever a page needs
 * a booking nudge before its closing CtaBand. One consistent shape everywhere:
 * compact white card, eyebrow, a heading, optional supporting line, the primary
 * button with the £70/1hr facts beside it. Replaces the ad-hoc per-page boxes.
 */
export function ConsultCta({
  eyebrow = 'Start here',
  title = 'Every journey starts with a consultation',
  body,
  center = false,
}) {
  return (
    <div className={`rounded-2xl bg-white px-7 py-9 ring-1 ring-cocoa/[0.06] sm:px-10 ${center ? 'text-center' : ''}`}>
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h3 className="text-2xl leading-snug sm:text-3xl">{title}</h3>
      {body && (
        <p className={`mt-4 max-w-xl leading-relaxed text-cocoa/85 ${center ? 'mx-auto' : ''}`}>{body}</p>
      )}
      <div className={`mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 ${center ? 'items-center justify-center' : 'items-start'}`}>
        <Link to="/book" className="btn-copper w-full sm:w-auto">{CTA_PRIMARY}</Link>
        <p className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-bark">
          {CONSULTATION.price} · {CONSULTATION.duration} · in-studio
        </p>
      </div>
    </div>
  )
}

/*
 * Consultation entry point (£70, 1 hour).
 */
export function EntryRung() {
  return (
    <div className="rounded-2xl bg-white p-8 ring-1 ring-cocoa/[0.06] sm:p-10">
      <p className="eyebrow mb-4">Start here</p>
      <h2 className="text-2xl sm:text-3xl">Begin with a consultation</h2>
      <p className="mt-5 max-w-2xl leading-relaxed text-cocoa/85">
        Every journey starts the same way — a{' '}
        <strong className="text-cocoa">{CONSULTATION.price} consultation</strong> ({CONSULTATION.duration}),
        where your scalp and hair are assessed and you leave with a clear sense of what they actually
        need. No commitment to a subscription required.
      </p>
      <Link to="/book" className="btn-copper mt-6">{CTA_PRIMARY}</Link>
    </div>
  )
}
