import { Link } from 'react-router-dom'
import { ArrowRight, Check, MapPin, Truck } from 'lucide-react'
import { PROGRAMS } from '../data'
import { Reveal, ACUITY } from './ui'

/*
 * SubscriptionCards — three-tier pricing grid: card header with name + popular
 * badge,
 * description, big price with frequency baseline, check feature list, full-width
 * CTA footer. Adapted to the MelanoTresses stack: brand palette, serif heads,
 * PROGRAMS data, no shadcn primitives.
 *
 * Price is framed with the monthly instalment first and the total beside it.
 */
export function SubscriptionCards({ toBooking = false }) {
  return (
    /*
     * Mobile: one row you swipe through (snap-scroll, cards ~85vw, edge peek
     * hints there's more). Desktop (lg+): the normal 3-up grid.
     */
    <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-10 sm:px-10 lg:mx-0 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:px-0 lg:pb-0">
      {PROGRAMS.map((p, i) => {
        const isMobile = p.location.toLowerCase().includes('mobile')
        return (
          <Reveal key={p.slug} delay={i * 90} className="h-full w-[85vw] max-w-sm shrink-0 snap-center lg:w-auto lg:max-w-none lg:shrink">
            <article
              className={`flex h-full flex-col overflow-hidden rounded-2xl bg-white transition-shadow duration-300 ${
                p.featured
                  ? 'shadow-lift ring-1 ring-bark/25'
                  : 'shadow-soft ring-1 ring-cocoa/10 hover:shadow-lift'
              }`}
            >
              {/* header: name + tag badge, then the tagline as description */}
              <header className="px-7 pt-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-head text-2xl leading-snug text-cocoa">{p.name}</h3>
                  {p.tag && (
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.12em] ${
                        p.featured ? 'bg-bark text-white' : 'bg-bark/10 text-bark'
                      }`}
                    >
                      {p.tag}
                    </span>
                  )}
                </div>
                {p.tagline && (
                  <p className="mt-2.5 text-sm leading-relaxed text-cocoa/70">{p.tagline}</p>
                )}
              </header>

              {/* price block: instalment leads, total + duration beside it */}
              <div className="flex flex-1 flex-col px-7 pt-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-head text-4xl text-cocoa lg:text-5xl">{p.instalment}</span>
                  <span className="font-body text-sm text-cocoa/60">/month</span>
                </div>
                <p className="mt-1.5 font-body text-xs text-cocoa/60">
                  {p.price} across {p.duration.toLowerCase()} · {p.instalment} secures your place
                </p>

                <p className="mt-4 inline-flex items-center gap-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-bark">
                  {isMobile ? <Truck size={13} aria-hidden="true" /> : <MapPin size={13} aria-hidden="true" />}
                  {p.location}
                </p>

                <ul className="mt-6 flex flex-col gap-3 border-t border-cocoa/10 pt-6">
                  {p.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-bark" />
                      <span className="text-sm leading-relaxed text-cocoa/85">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* footer CTA */}
              <footer className="px-7 pb-7 pt-7">
                {toBooking ? (
                  <a
                    href={ACUITY}
                    target="_blank"
                    rel="noreferrer"
                    className={`${p.featured ? 'btn-copper' : 'btn-ghost'} w-full`}
                  >
                    Book a consultation <ArrowRight size={15} aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    to={`/programs#${p.slug}`}
                    className={`${p.featured ? 'btn-copper' : 'btn-ghost'} w-full`}
                    aria-label={`See what's included in ${p.name}`}
                  >
                    See what&apos;s included <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                )}
              </footer>
            </article>
          </Reveal>
        )
      })}
    </div>
  )
}
