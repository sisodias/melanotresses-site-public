import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Reveal } from './ui'

/*
 * Results teaser — editorial masonry-style gallery (2 rows on desktop, tall +
 * square tiles) showing the care-first studio approach. Hovering lifts a
 * caption bar from the base of the tile; the whole tile routes to /results.
 * The layout uses CSS grid row spans, a group-hover caption overlay, and one
 * quiet onward CTA.
 */
const TILES = [
  { label: 'A calm consultation setting', src: '/images/generated/consultation-desk.jpg', tall: true },
  { label: 'Care before styling', src: '/images/generated/booking-care-still-life.png' },
  { label: 'A close look at the scalp', src: '/images/generated/clinic-room-trichoscopy.jpg' },
  { label: 'Texture-conscious consultation', src: '/images/generated/scalp-assessment-hands.jpg', tall: true },
  { label: 'Consultation and education', src: '/images/generated/booking-consultation-still-life.png' },
  { label: 'A thoughtful studio approach', src: '/images/generated/consultation-desk.png' },
]

export function ResultsGallery() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:grid-rows-2">
      {TILES.map((t, i) => (
        <Reveal
          key={t.label}
          delay={i * 70}
          className={t.tall ? 'lg:row-span-2' : ''}
        >
          <Link
            to="/results"
            aria-label={`View results — ${t.label}`}
            className="group relative block h-full min-h-[11rem] overflow-hidden rounded-2xl"
          >
            <img
              src={t.src}
              alt={t.label}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            {/* caption bar lifts in on hover; always visible on touch via focus */}
            <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-cocoa/75 via-cocoa/35 to-transparent px-4 pb-3.5 pt-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                {t.label}
              </span>
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  )
}

export function ResultsTeaserSection() {
  return (
    <section className="section" aria-labelledby="results-heading">
      <div className="container-x">
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <p className="eyebrow mb-4">Results</p>
          <h2 id="results-heading" className="text-[2rem] leading-tight sm:text-[2.6rem]">
            See what healthy hair looks like
          </h2>
          <p className="mt-5 text-base leading-relaxed text-cocoa/85 sm:text-lg">
            A care-first studio approach — assessment and education before styling when it is right
            for you.
          </p>
        </header>

        <ResultsGallery />

        <div className="mt-10 text-center">
          <Link to="/results" className="btn-ghost">
            View all results <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
