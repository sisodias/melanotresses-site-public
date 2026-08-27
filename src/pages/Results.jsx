import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import { GOOGLE_REVIEWS_URL } from '../data'
import { Seo, PageHero, SectionHead, CtaBand } from '../components/ui'

const GALLERY = [
  {
    label: 'A calm consultation setting',
    src: '/images/generated/consultation-desk.jpg',
    note: 'A considered space for discussing hair and scalp care.',
  },
  {
    label: 'Care before styling',
    src: '/images/generated/booking-care-still-life.png',
    note: 'The care-first thinking behind every appointment.',
  },
  {
    label: 'A close look at the scalp',
    src: '/images/generated/clinic-room-trichoscopy.jpg',
    note: 'Assessment helps shape the next step.',
  },
  {
    label: 'Texture-conscious consultation',
    src: '/images/generated/scalp-assessment-hands.jpg',
    note: 'A scalp assessment through parted natural hair.',
  },
  {
    label: 'Consultation and education',
    src: '/images/generated/booking-consultation-still-life.png',
    note: 'Clear information to take into your own routine.',
  },
  {
    label: 'A thoughtful studio approach',
    src: '/images/generated/consultation-desk.png',
    note: 'Unhurried care, practical guidance and styling when it is right for you.',
  },
]

function PendingTestimonials() {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl bg-paper p-8 text-center ring-1 ring-cocoa/[0.08] sm:p-10">
      <p className="eyebrow mb-3">Client stories</p>
      <h3 className="font-head text-2xl text-cocoa">Real testimonials are being added</h3>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-cocoa/75">
        On-site stories will only be published after the wording and publication permission have been
        confirmed with each author. Read the studio&apos;s current reviews on Google in the meantime.
      </p>
      <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" className="btn-ghost mt-6">
        <Star size={15} fill="currentColor" strokeWidth={0} aria-hidden="true" />
        Read reviews on Google
      </a>
    </div>
  )
}

export default function Results() {
  return (
    <>
      <Seo
        title="The MelanoTresses Approach | Afro Hair Specialist Newcastle"
        description="See how MelanoTresses brings assessment, education and texture-conscious styling together in Newcastle upon Tyne."
      />

      <PageHero
        eyebrow="The studio approach"
        title="Care that comes before styling"
        intro="A MelanoTresses appointment begins with understanding your hair and scalp. Styling follows when it supports the plan."
      />

      <section className="section bg-white" aria-labelledby="gallery-heading">
        <div className="container-x">
          <SectionHead
            eyebrow="Inside the process"
            title="Assessment, education, then the finish"
            intro="These illustrative studio images show the atmosphere and care-first principles behind the service. They are not before-and-after claims or client case studies."
          />

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

      <section className="section" aria-labelledby="testimonials-heading">
        <div className="container-x">
          <SectionHead eyebrow="Testimonials" title="What clients say" />
          <span id="testimonials-heading" className="sr-only">Client testimonials</span>
          <PendingTestimonials />
        </div>
      </section>

      <CtaBand
        title="Bring us the hair you are worried about"
        body="We assess your scalp and hair first, then tell you honestly what we think it needs — including if the answer is rest, a GP, or nothing at all."
      />
    </>
  )
}
