import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Quote, Star } from 'lucide-react'
import { GOOGLE_REVIEWS_URL, TESTIMONIALS } from '../data'
import { Seo, PageHero, SectionHead, CtaBand } from '../components/ui'

/* Real styling work from the studio (Priscilla's own photographs). */
const GALLERY = [
  { label: 'Flat twists, side profile', src: '/images/twists-profile.jpg', note: 'Protective flat twists, freshly installed in the studio.' },
  { label: 'Occasion updo with pearl pin', src: '/images/updo-pearl.jpg', note: 'Occasion and bridal styling: a sleek low updo, pearl-pinned.' },
  { label: 'Flat twists into a low bun', src: '/images/twists-low-bun.jpg', note: 'Flat twists finished into a neat low bun.' },
  { label: 'Blow-out on natural hair', src: '/images/afro-profile.jpg', note: 'A full blow-out on healthy natural hair.' },
  { label: 'Twists, worn loose', src: '/images/twists-side.jpg', note: 'Two-strand twists worn down, studio finish.' },
  { label: 'Fluffy blow-out, full shape', src: '/images/blowout-full.jpg', note: 'A fluffy blow-out with full shape and length.' },
]

function TestimonialCard({ t }) {
  const long = t.quote.length > 700
  const [open, setOpen] = useState(false)
  return (
    <figure className="flex h-full flex-col rounded-2xl bg-white p-7 ring-1 ring-cocoa/[0.08] sm:p-8">
      {t.photo && (
        <img src={t.photo} alt={`${t.name}, MelanoTresses client`} loading="lazy" className="mb-6 aspect-[4/3] w-full rounded-xl object-cover" />
      )}
      <Quote size={22} aria-hidden="true" className="text-bark/60" />
      <blockquote
        className={`mt-3 whitespace-pre-line text-sm leading-relaxed text-cocoa/85 sm:text-[15px] ${
          long && !open ? 'line-clamp-[12]' : ''
        }`}
      >
        {t.quote}
      </blockquote>
      {long && (
        <button type="button" onClick={() => setOpen((v) => !v)} className="link-copper mt-3 self-start text-sm">
          {open ? 'Show less' : `Read ${t.name}’s full story`}
        </button>
      )}
      <figcaption className="mt-6 border-t border-cocoa/10 pt-4">
        <p className="font-head text-xl text-cocoa">{t.name}</p>
        <p className="mt-1 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-bark">{t.condition}</p>
      </figcaption>
    </figure>
  )
}

export default function Results() {
  return (
    <>
      <Seo
        title="Client Testimonials | Afro Hair Specialist Newcastle | MelanoTresses"
        description="Client testimonials and real styling work from MelanoTresses, an Afro hair and scalp trichology studio in Newcastle upon Tyne."
      />

      <PageHero
        eyebrow="Testimonials"
        title="See the difference"
        intro="In our clients’ own words, and real work from the studio."
      />

      <section className="section" aria-labelledby="testimonials-heading">
        <div className="container-x">
          <SectionHead eyebrow="Client stories" title="What clients say" />
          <span id="testimonials-heading" className="sr-only">Client testimonials</span>
          <div className="mx-auto grid max-w-5xl items-start gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" className="btn-ghost">
              <Star size={15} fill="currentColor" strokeWidth={0} aria-hidden="true" />
              Read more reviews on Google
            </a>
          </div>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="gallery-heading">
        <div className="container-x">
          <SectionHead
            eyebrow="Transformations"
            title="Real work from the studio"
            intro="Styling from the MelanoTresses studio, always after the hair and scalp have been cared for."
          />
          <span id="gallery-heading" className="sr-only">Transformations</span>

          <div className="columns-2 gap-4 sm:columns-3 lg:gap-6">
            {GALLERY.map((image) => (
              <figure
                key={image.label}
                className="group relative mb-4 aspect-square break-inside-avoid overflow-hidden rounded-2xl lg:mb-6"
              >
                <img
                  src={image.src}
                  alt={image.note}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-cocoa/75 via-cocoa/35 to-transparent px-4 pb-3.5 pt-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                    {image.label}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-2xl rounded-2xl bg-paper p-7 text-center ring-1 ring-cocoa/[0.08] sm:p-9">
            <p className="eyebrow mb-3">Ready when you are</p>
            <h2 className="font-head text-2xl text-cocoa">Start with a conversation</h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa/75">
              Bring your questions, your routine and the hair or scalp concern you want to understand.
              The first appointment is about finding the right next step.
            </p>
            <Link to="/book" className="btn-copper mt-6">
              Book a consultation <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Bring us the hair you are worried about"
        body="We assess your scalp and hair first, then tell you honestly what we think it needs — including if the answer is rest, a GP, or nothing at all."
      />
    </>
  )
}
