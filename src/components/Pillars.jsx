import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PILLARS } from '../data'
import { Reveal } from './ui'

/*
 * Care · Educate · Beautify — icon feature cards using the generated icons in
 * public/images/icons. Structure follows a classic feature-section
 * shape: centred header, three cards with icon badge / title / body, one quiet
 * route onward. The fourth icon (consultation) stays reserved for CTA use.
 */
const PILLAR_ICONS = {
  Care: '/images/icons/scalp-care.png',
  Educate: '/images/icons/education.png',
  Beautify: '/images/icons/beauty-bloom.png',
}

export function PillarCards() {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
      {PILLARS.map((p, i) => (
        <Reveal key={p.word} delay={i * 90} className="h-full">
          <div className="group flex h-full flex-col items-center rounded-2xl bg-paper px-8 py-10 text-center ring-1 ring-cocoa/[0.07] transition-all duration-300 hover:shadow-soft hover:ring-cocoa/15">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-sand/60 ring-1 ring-cocoa/10 transition-transform duration-300 group-hover:scale-105">
              <img
                src={PILLAR_ICONS[p.word]}
                alt=""
                aria-hidden="true"
                className="h-12 w-12 object-contain"
                loading="lazy"
                width={512}
                height={512}
              />
            </span>
            <h3 className="mt-6 font-head text-2xl text-cocoa">{p.word}</h3>
            <p className="mt-3 text-sm leading-relaxed text-cocoa/80">{p.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

export function PillarsSection() {
  return (
    <section className="border-t border-cocoa/10 bg-white" aria-labelledby="pillars-heading">
      <div className="container-x py-16 sm:py-24">
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <p className="eyebrow mb-4">The promise</p>
          <h2 id="pillars-heading" className="text-[2rem] leading-tight sm:text-[2.6rem]">
            Care · Educate · Beautify
          </h2>
        </header>
        <PillarCards />
        <p className="mt-10 text-center">
          <Link to="/the-method" className="link-copper inline-flex items-center gap-1.5 text-sm">
            See how the method works
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  )
}
