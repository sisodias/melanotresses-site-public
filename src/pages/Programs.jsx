import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Check, MapPin, Truck, Gift, Users, CalendarDays } from 'lucide-react'
import { PROGRAMS, CONSULTATION, CTA_PRIMARY, AREA_SERVED } from '../data'
import { SubscriptionCards } from '../components/SubscriptionCards'
import {
  ACUITY,
  Seo,
  JsonLd,
  PageHero,
  ProgramSpec,
  PaymentNote,
  CtaBand,
} from '../components/ui'

/*
 * Hair Care Plans page. Content comes from PROGRAMS data and uses light,
 * airy sections with hairline dividers and generous whitespace.
 */

/* Structured data lists the available programmes without offer markup. */
const SUBSCRIPTION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'MelanoTresses Hair Care Plans',
  itemListElement: PROGRAMS.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: p.name,
      serviceType: 'Trichology hair and scalp plan',
      areaServed: AREA_SERVED,
      provider: { '@type': 'HealthAndBeautyBusiness', name: 'MelanoTresses' },
    },
  })),
}

/* Small letter-spaced pill used for the location + tag badges. */
function Pill({ icon: Icon, children, accent = false }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-[0.14em] ${
        accent ? 'border-bark/30 bg-bark/[0.06] text-bark' : 'border-cocoa/15 bg-white text-cocoa'
      }`}
    >
      {Icon && <Icon size={12} aria-hidden="true" />}
      {children}
    </span>
  )
}

function SubscriptionSection({ program: p, index, total }) {
  const isMobile = p.location.toLowerCase().includes('mobile')
  return (
    <section
      id={p.slug}
      className={`section scroll-mt-24 ${index > 0 ? 'border-t border-cocoa/10' : ''}`}
      aria-labelledby={`${p.slug}-title`}
    >
      <div className="container-x">
        <div className="mx-auto max-w-4xl">
          {/* Badges: location (in-salon vs mobile) + any tag. */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="eyebrow">
              Hair Care Plan {index + 1} of {total}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <Pill icon={isMobile ? Truck : MapPin}>{p.location}</Pill>
              {p.tag && <Pill accent>{p.tag}</Pill>}
            </div>
          </div>

          <h2
            id={`${p.slug}-title`}
            className="mt-5 text-[2rem] leading-tight sm:text-[2.6rem]"
          >
            {p.name}
          </h2>

          {p.tagline && (
            <p className="mt-3 font-head text-xl italic leading-snug text-cocoa/65 sm:text-2xl">
              {p.tagline}
            </p>
          )}

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cocoa/85 sm:text-lg">
            {p.blurb}
          </p>

          {/* Duration / Where / Price (flagged) / Payment — one factual row. */}
          <ProgramSpec program={p} />

          <div className="grid gap-10 md:grid-cols-2">
            {/* What's included — the full list, with the finale beneath it. */}
            <div>
              <p className="eyebrow mb-5">What’s included</p>
              <ul className="space-y-3.5">
                {p.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-cocoa/85 sm:text-base"
                  >
                    <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-bark" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {p.finale && (
                <p className="mt-6 flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-cocoa/[0.06]">
                  <Gift size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-bark" />
                  <span className="font-head text-base italic leading-snug text-cocoa/80">
                    {p.finale}
                  </span>
                </p>
              )}
            </div>

              {/* Who it is for, location details and pricing. */}
            <div className="space-y-7">
              <div>
                <p className="eyebrow mb-3">Who it’s for</p>
                <p className="text-sm leading-relaxed text-cocoa/85">{p.forWho}</p>
              </div>

              {p.familyTerms && (
                <div>
                  <p className="eyebrow mb-3">Family terms</p>
                  <p className="flex items-start gap-2.5 text-sm leading-relaxed text-cocoa/85">
                    <Users size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-bark" />
                    <span>{p.familyTerms}</span>
                  </p>
                </div>
              )}

              {p.mobileNote && (
                <div>
                  <p className="eyebrow mb-3">Mobile option</p>
                  <p className="flex items-start gap-2.5 text-sm leading-relaxed text-cocoa/85">
                    <Truck size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-bark" />
                    <span>{p.mobileNote}</span>
                  </p>
                </div>
              )}

              {/* Price + payment plan — confirmed. */}
              <div className="card !p-6">
                <p className="eyebrow mb-3">The price</p>
                <p className="font-head text-4xl text-bark">{p.price}</p>
                <p className="mt-2 text-sm leading-relaxed text-cocoa/85">{p.plan}.</p>
                <p className="mt-4 flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-bark">
                  <CalendarDays size={13} aria-hidden="true" />
                  Payment plan available
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <a href={ACUITY} target="_blank" rel="noreferrer" className="btn-copper">
              {CTA_PRIMARY}
            </a>
            <p className="mt-4 text-sm leading-relaxed text-cocoa/70">
              This Hair Care Plan begins with a {CONSULTATION.price} consultation (
              {CONSULTATION.duration}), booked through Acuity.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Programs() {
  // Layout scrolls to top on route change; when a card links to /programs#slug
  // we scroll on to that subscription's own section after render.
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const t = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
    return () => clearTimeout(t)
  }, [hash])

  return (
    <>
      <Seo
        title="Hair Care Plans | MelanoTresses — Afro Hair & Scalp Trichology, Newcastle"
        description="Three trichology-led Hair Care Plans for Afro and textured hair in Newcastle: the 6 Month Healing Journey, 4 Month Crown Revival and mobile-friendly 3 Month Family Crown Care. Payment plans available; each starts with a £70 consultation."
      />
      <JsonLd data={SUBSCRIPTION_SCHEMA} id="subscriptions-schema" />

      <PageHero
        eyebrow="Ongoing care"
        title="Hair Care Plans"
        intro="Structured, months-long care for your scalp and hair — not a single appointment and a hope for the best. Three Hair Care Plans, each built around a proper trichology assessment before anything is recommended."
      >
        <p className="mt-8 max-w-2xl border-l-2 border-bark/40 pl-4 text-sm leading-relaxed text-cocoa/80 sm:text-base">
          Every Hair Care Plan starts with a{' '}
          <strong className="text-cocoa">{CONSULTATION.price} consultation</strong> (
          {CONSULTATION.duration}) — your scalp and hair assessed before anything is recommended.
          Booking is through Acuity, and every Hair Care Plan can be spread over a payment plan.
        </p>
      </PageHero>

      {/* At-a-glance pricing cards; each links down to its full section. */}
      <section className="section !pb-10" aria-label="Hair Care Plans at a glance">
        <div className="container-x">
          <SubscriptionCards />
        </div>
      </section>

      {/* Each subscription is its own airy section, carrying one booking CTA. */}
      {PROGRAMS.map((p, i) => (
        <SubscriptionSection key={p.slug} program={p} index={i} total={PROGRAMS.length} />
      ))}

      {/* Payment plans + £70 consultation entry + flagged prices, in one place. */}
      <section className="section border-t border-cocoa/10">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <PaymentNote />
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which Hair Care Plan is right for you?"
        body="Start with a consultation — your scalp and hair are assessed first, then we recommend the Hair Care Plan that fits, or tell you honestly if that’s not what you need yet."
      />
    </>
  )
}
