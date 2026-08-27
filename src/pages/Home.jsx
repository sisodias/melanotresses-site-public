import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Microscope, Star } from 'lucide-react'
import { ADDRESS, AREA_SERVED, GOOGLE_REVIEWS_URL } from '../data'
import { Seo, JsonLd, Reveal, PhotoBlock, SectionHead } from '../components/ui'
import { PillarCards } from '../components/Pillars'
import { ResultsGallery } from '../components/ResultsTeaser'

const LOCAL_BUSINESS = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  name: 'MelanoTresses',
  description:
    'Trichology-led Afro and textured hair and scalp care in Newcastle upon Tyne. Assessment and treatment for breakage, thinning and scalp conditions.',
  foundingDate: '2018',
  address: {
    '@type': 'PostalAddress',
    streetAddress: ADDRESS.line1,
    addressLocality: ADDRESS.city,
    postalCode: ADDRESS.postcode,
    addressCountry: 'GB',
  },
  areaServed: AREA_SERVED.map((name) => ({ '@type': 'AdministrativeArea', name })),
  sameAs: [
    'https://www.instagram.com/melanotresses',
    'https://www.facebook.com/melanotresses',
  ],
}

const HERO_SLIDES = [
  {
    src: '/images/generated/hero-male-sand-01.png',
    alt: 'Editorial campaign portrait for MelanoTresses',
    pos: 'object-[78%_center] lg:object-center',
  },
  {
    src: '/images/generated/hero-male-cream-02.png',
    alt: 'Cream-toned editorial campaign portrait for MelanoTresses',
    pos: 'object-[78%_center] lg:object-center',
  },
  {
    src: '/images/generated/hero-male-cocoa-03.png',
    alt: 'Cocoa-toned editorial campaign portrait for MelanoTresses',
    pos: 'object-[78%_center] lg:object-center',
  },
  {
    src: '/images/generated/hero-male-studio-04.png',
    alt: 'Editorial consultation-studio campaign portrait for MelanoTresses',
    pos: 'object-[78%_center] lg:object-center',
  },
]

function HeroCopy() {
  return (
    <>
      <p className="eyebrow mb-5">Care · Educate · Beautify</p>
      <h1 className="text-[2.6rem] leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
        Trichologist and textured hair specialist in the North East
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-cocoa/85">
        Specialised hair-care services designed to help you understand, care for and confidently
        style your hair. Assessment first, treatment second, styling last.
      </p>
      <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
        <Link to="/programs" className="btn-copper w-full sm:w-auto">Explore Hair Care Plans</Link>
        <Link to="/book" className="link-copper inline-flex min-h-[44px] items-center gap-1.5 text-sm">
          Book an appointment
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </>
  )
}

function HeroFounder() {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setSlide((current) => (current + 1) % HERO_SLIDES.length), 7000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="relative overflow-hidden border-b border-cocoa/10 bg-[#D9BF9F]">
      {HERO_SLIDES.map((item, index) => (
        <img
          key={item.src}
          src={item.src}
          alt={index === slide ? item.alt : ''}
          aria-hidden={index !== slide}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${item.pos} ${
            index === slide ? 'opacity-100' : 'opacity-0'
          }`}
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-[#E8D7BC]/95 via-[#E8D7BC]/70 to-transparent lg:via-[#E8D7BC]/40" />
      <div className="container-x relative flex min-h-[62vh] items-center py-16 sm:py-20 lg:min-h-[86vh]">
        <div className="max-w-xl text-left lg:max-w-[38rem]">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-white/70 px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-cocoa">
                North East England · Est. 2018
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-bark" aria-label="Five star rated">
                <Star size={14} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                <span aria-hidden="true">★★★★★</span>
              </span>
            </div>
            <div className="mt-5"><HeroCopy /></div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function PendingReviewNotice() {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl bg-paper p-8 text-center ring-1 ring-cocoa/[0.08] sm:p-10">
      <p className="eyebrow mb-3">Google reviews</p>
      <h3 className="font-head text-2xl text-cocoa">Read the studio&apos;s current reviews</h3>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-cocoa/75">
        The studio&apos;s current reviews are kept on Google. On-site client stories will only be added
        after the wording and publication permission have been confirmed.
      </p>
      <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" className="btn-ghost mt-6">
        <Star size={15} fill="currentColor" strokeWidth={0} aria-hidden="true" />
        Read reviews on Google
      </a>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Seo
        title="Afro Hair Specialist Newcastle | Trichologist North East | MelanoTresses"
        description="Trichology-led Afro hair and scalp care in Newcastle upon Tyne. Assessment and treatment for breakage, thinning and scalp conditions. Founded 2018."
      />
      <JsonLd data={LOCAL_BUSINESS} id="ld-localbusiness-home" />

      <HeroFounder />

      <div className="flex flex-col">
        <section className="section order-2" aria-labelledby="clinic-heading">
          <div className="container-x grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="eyebrow mb-4">Your scalp before your style</p>
              <h2 id="clinic-heading" className="text-[2rem] leading-tight sm:text-[2.6rem]">
                Healthy hair starts at the scalp
              </h2>
              <p className="mt-5 leading-relaxed text-cocoa/85">
                Trichology is the study of the hair and scalp — the health underneath the style.
                Breakage, thinning and irritation are symptoms, and treating them properly means
                understanding the cause first rather than covering it up. The room is calm and
                clinical, the care is unhurried, and you leave knowing what is happening to your hair.
              </p>
              <p className="mt-4 leading-relaxed text-cocoa/85">
                Discover how trichology and hairstyling can work together to support a healthy hair
                journey.
              </p>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
                <Link to="/trichology-101" className="btn-copper w-full sm:w-auto">Trichology 101</Link>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative">
                <PhotoBlock
                  src="/images/generated/scalp-assessment-hands.jpg"
                  alt="A scalp examined under a trichoscope through parted natural hair"
                  label="Scalp assessment under magnification"
                  ratio="aspect-[4/3]"
                  className="w-full"
                />
                <div className="relative z-10 -mt-10 mr-0 flex items-start gap-4 rounded-2xl bg-white p-6 shadow-soft ring-1 ring-cocoa/[0.08] lg:-ml-10 lg:mr-16">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bark/10 text-bark">
                    <Microscope size={20} aria-hidden="true" />
                  </span>
                  <p className="text-sm leading-relaxed text-cocoa/85">
                    Every plan begins with a proper look at the scalp — nothing is recommended before
                    it has been assessed.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="order-1 border-t border-cocoa/10 bg-white" aria-labelledby="pillars-heading">
          <div className="container-x py-16 sm:py-24">
            <header className="mx-auto mb-12 max-w-2xl text-center">
              <p className="eyebrow mb-4">The MT Method</p>
              <h2 id="pillars-heading" className="text-[2rem] leading-tight sm:text-[2.6rem]">
                Care · Educate · Beautify
              </h2>
            </header>
            <PillarCards />
            <p className="mt-10 text-center">
              <Link to="/the-method" className="link-copper text-sm">Learn the MT Method</Link>
            </p>
          </div>
        </section>

        <section className="section order-3" aria-labelledby="results-heading">
          <div className="container-x">
            <SectionHead
              eyebrow="The studio approach"
              title="Care that comes before styling"
              intro="Explore the considered, texture-conscious approach behind a MelanoTresses appointment."
            />
            <span id="results-heading" className="sr-only">The studio approach</span>
            <ResultsGallery />
            <div className="mt-8 text-center">
              <Link to="/results" className="btn-ghost">Explore the studio approach</Link>
            </div>
          </div>
        </section>

        <section className="section order-4 bg-white" aria-labelledby="reviews-heading">
          <div className="container-x">
            <SectionHead
              eyebrow="Reviews"
              title="Trusted by clients across the North East"
              intro="Read the studio&apos;s current public reviews while future on-site stories are confirmed with their authors."
            />
            <span id="reviews-heading" className="sr-only">Client reviews</span>
            <PendingReviewNotice />
          </div>
        </section>

        <section className="section order-5 bg-sand/30" aria-labelledby="journey-heading">
          <div className="container-x">
            <SectionHead
              eyebrow="Your hair journey"
              title="Find your next step"
              intro="Choose care and styling at your pace, beginning with a consultation when you need one."
            />
            <span id="journey-heading" className="sr-only">Your hair journey</span>
            <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-5">
              {[
                {
                  label: 'Consultation',
                  title: 'Start here',
                  price: '£70',
                  body: 'Start with a £70 trichology consultation so we can understand what your hair and scalp need.',
                  to: '/book',
                },
                {
                  label: 'Maintenance',
                  title: 'Ongoing care',
                  price: 'From £45',
                  body: 'Maintain the health and length of your hair at your own pace.',
                  to: '/services',
                },
                {
                  label: 'Styling',
                  title: 'Carefully styled',
                  price: 'From £50',
                  body: 'Choose styling that celebrates your texture after your hair has been cared for.',
                  to: '/services#styling',
                },
                {
                  label: 'Children',
                  title: 'Younger crowns',
                  price: 'From £30',
                  body: 'Gentle, patient care for children and their growing crowns.',
                  to: '/services#children',
                },
                {
                  label: 'Hair Care Plans',
                  title: 'Care that continues',
                  price: 'From £107/month',
                  body: 'For a firmer rhythm of support, explore the 6 month, 4 month and 3 month plans.',
                  to: '/programs',
                },
              ].map((step) => (
                <Link
                  key={step.label}
                  to={step.to}
                  className="group flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-cocoa/[0.08] transition-shadow hover:shadow-lift"
                >
                  <p className="eyebrow mb-3 lg:min-h-[2.25rem]">{step.label}</p>
                  <h3 className="font-head text-2xl text-cocoa lg:min-h-[3.5rem]">{step.title}</h3>
                  <p className="mt-3 font-head text-xl text-bark lg:min-h-[2rem]">{step.price}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-cocoa/75">{step.body}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-bark group-hover:underline">
                    Explore
                    <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
