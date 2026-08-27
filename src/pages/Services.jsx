import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { Seo, PageHero, PhotoBlock, SectionHead, CtaBand } from '../components/ui'
import { CONSULTATION, SERVICE_GROUPS, CTA_PRIMARY } from '../data'

/*
 * The published service menu (SERVICE_GROUPS): Trichology, Styling, and
 * Children's Services. Prices shown are new-client rates; returning-client
 * rates are handled inside Acuity at booking.
 */

export default function Services() {
  return (
    <>
      <Seo
        title="Individual Services | Afro Hair & Scalp, Newcastle — MelanoTresses"
        description="Explore MelanoTresses consultations, maintenance, styling, children’s services and Hair Care Plans in Newcastle."
      />

      <PageHero
        eyebrow="Services"
        title="Individual Services"
        intro="Discover our services, tailored to guide and support you on your intentional hair-care journey."
      />

      {/* The consultation — first, and distinct */}
      <section className="section" aria-labelledby="consultation-heading">
        <div className="container-x">
          <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 ring-1 ring-cocoa/[0.06] sm:p-10">
            <p className="eyebrow mb-4">Start here</p>
            <h2 id="consultation-heading" className="text-[2rem] leading-tight sm:text-4xl">
              The Trichology Consultation
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-cocoa/85">
              {CONSULTATION.intro} We assess:
            </p>
            <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {CONSULTATION.assesses.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-cocoa/85">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bark" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-cocoa/75">{CONSULTATION.note}</p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cocoa/75">
              Once we understand the needs of your scalp and hair, the best-fitting individual
              services are recommended to build your hair-restoration journey at your pace.
            </p>

            <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-cocoa/10 sm:grid-cols-2">
              {[
                ['Price', CONSULTATION.price],
                ['Length', CONSULTATION.duration],
              ].map(([label, value]) => (
                <div key={label} className="bg-white p-5">
                  <dt className="font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-bark">
                    {label}
                  </dt>
                  <dd className="mt-1.5 font-head text-2xl leading-snug text-cocoa">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-cocoa/60">
              The consultation is a standalone appointment; the fee isn’t credited against a
              subscription.
            </p>

            <Link to="/book" className="btn-copper mt-6">{CTA_PRIMARY}</Link>
          </div>
        </div>
      </section>

      {/* The full menu */}
      <section className="section pt-0" aria-label="Service menu">
        <div className="container-x">
          <SectionHead
            eyebrow="The menu"
            title="Individual Services"
            intro="Book your appointment for better guidance on which appointment to book."
          />

          <div className="mx-auto max-w-4xl space-y-10 sm:space-y-14">
            {SERVICE_GROUPS.map((group) => (
              <div key={group.name} id={group.name.toLowerCase().replace(/\s+/g, '-')}>
                <div className="mb-6 border-b border-cocoa/15 pb-4">
                  <h3 className="font-head text-2xl text-cocoa sm:text-3xl">{group.name}</h3>
                  {group.note && <p className="mt-1 text-sm text-cocoa/70">{group.note}</p>}
                </div>
                <ul className="divide-y divide-cocoa/10">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="group flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-lg px-3 py-4 transition-colors duration-200 hover:bg-sand/30 -mx-3"
                    >
                      <span className="font-head text-lg text-cocoa transition-colors group-hover:text-bark">{item.name}</span>
                      {/* dotted leader ties name to price on wide screens */}
                      <span aria-hidden="true" className="mx-2 hidden flex-1 border-b border-dotted border-cocoa/25 sm:block" />
                      {item.duration || item.price ? (
                        <span className="flex items-center gap-4">
                          {item.duration && (
                            <span className="flex items-center gap-1.5 text-sm text-cocoa/60">
                              <Clock size={13} aria-hidden="true" />
                              {item.duration}
                            </span>
                          )}
                          {item.price && <span className="font-head text-xl text-bark">{item.price}</span>}
                        </span>
                      ) : (
                        <span className="font-body text-sm text-cocoa/60">{item.detail}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Illustrative editorial imagery for the public handoff. */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
            {[
              { src: '/images/generated/booking-care-still-life.png', label: 'Care before styling' },
              { src: '/images/generated/consultation-desk.jpg', label: 'A calm consultation setting' },
              { src: '/images/generated/booking-consultation-still-life.png', label: 'Consultation and education' },
            ].map((g) => (
              <figure key={g.src} className="group relative aspect-square overflow-hidden rounded-2xl">
                <img
                  src={g.src}
                  alt={g.label}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-cocoa/75 via-cocoa/35 to-transparent px-4 pb-3.5 pt-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-white">{g.label}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure what to book?"
        body="Start with a consultation. We’ll tell you what you actually need — including if that’s nothing, or something we’re not the right people for."
      />
    </>
  )
}
