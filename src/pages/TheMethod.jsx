import { Link } from 'react-router-dom'
import { Stethoscope, ArrowRight, ScanSearch, FileText } from 'lucide-react'
import { PillarCards } from '../components/Pillars'
import {
  CONSULTATION,
  AREA_SERVED,
  METHOD_STAGES,
  ASSESSMENT_TOOLS,
  PILLARS,
  OUTCOMES,
} from '../data'
import {
  Seo,
  JsonLd,
  PageHero,
  SectionHead,
  StepFlow,
  Reveal,
  PhotoBlock,
  CtaBand,
} from '../components/ui'

/*
 * THE METHOD — the page that makes the studio read as a clinic, not a salon.
 * The page brings together the studio's five stages (METHOD_STAGES), assessment
 * tools (ASSESSMENT_TOOLS), the three pillars (PILLARS), and outcomes (OUTCOMES).
 */

const STAGES = METHOD_STAGES.map((s) => ({ title: s.name, body: s.body }))

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'The MelanoTresses Method',
  serviceType: 'Trichology-led Afro hair and scalp care',
  provider: { '@type': 'HealthAndBeautyBusiness', name: 'MelanoTresses', foundingDate: '2018' },
  areaServed: AREA_SERVED,
}

export default function TheMethod() {
  return (
    <>
      <Seo
        title="The MelanoTresses Method | Afro Hair & Scalp Trichology, Newcastle"
        description="A considered, trichology-led method for Afro and textured hair: consult, assess, profile, educate, style. Assessment before treatment. A clinic, not a salon, in Newcastle."
      />
      <JsonLd data={SCHEMA} id="ld-the-method" />

      <PageHero
        eyebrow="Care · Educate · Beautify"
        title="The MelanoTresses Method"
        intro="Most hair care is reactive. Something goes wrong, you book, and someone does something to it. The Method works the other way round. Your scalp and hair are assessed first, and only then is your hair treated and styled."
      >
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-cocoa/70">
          A trichology-led studio, not a salon chair. Every journey begins with a{' '}
          <strong className="text-cocoa">{CONSULTATION.price} consultation</strong> ({CONSULTATION.duration}).
        </p>
      </PageHero>

      {/* A clinic, not a salon */}
      <section className="section" aria-labelledby="clinic-heading">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">A considered approach</p>
            <h2 id="clinic-heading" className="text-[2rem] leading-tight sm:text-[2.6rem]">
              A clinic, not a salon
            </h2>
            <p className="mt-5 leading-relaxed text-cocoa/85">
              A salon sells appointments, so it starts with what you want done. A clinic starts with
              what is happening. That single difference in order is what makes this considered rather
              than reactive: the scalp is looked at properly, what is found is recorded, and
              nothing is recommended before it has been understood.
            </p>
            <p className="mt-4 leading-relaxed text-cocoa/85">
              It is also why a plan is not directly comparable with a column of individual
              service prices. You are not buying a set of appointments — you are buying the thinking
              that decides which appointments you actually need.
            </p>
            <div className="mt-8 flex items-start gap-4 rounded-2xl bg-white p-6 ring-1 ring-cocoa/[0.06]">
              <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bark/10 text-bark">
                <Stethoscope size={20} />
              </span>
              <p className="text-sm leading-relaxed text-cocoa/85">
                Unhurried, careful, and honest. You always leave knowing what is actually happening
                to your hair — including if the honest answer is that you do not need us.
              </p>
            </div>
          </div>

          {/* Generated clinic-room illustration (AI): treatment chair +
              trichoscopy station — the literal "clinic, not a salon". */}
          <PhotoBlock
            src="/images/generated/clinic-room-trichoscopy.jpg"
            alt="A calm clinical treatment room with a trichoscopy station"
            label="The clinic room"
            ratio="aspect-[4/5]"
            position="object-[35%_center]"
            className="mx-auto w-full max-w-md"
          />
        </div>
      </section>

      {/* The five stages — Priscilla's own */}
      <section className="section bg-white" aria-labelledby="stages-heading">
        <div className="container-x">
          <SectionHead
            eyebrow="The five stages"
            title="How a journey moves, step by step"
            intro="Every journey moves through five stages; consult, assess, profile, educate, then style."
          />
          <span id="stages-heading" className="sr-only">The stages of the method</span>

          {/*
            Connected five-stage flow: numbered markers joined by a hairline on
            desktop, cards revealing in sequence. Replaces the plain StepFlow.
          */}
          <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            <span aria-hidden="true" className="absolute left-0 right-0 top-[22px] hidden h-px bg-cocoa/15 lg:block" />
            {STAGES.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 90} className="relative">
                <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-bark font-head text-lg text-white ring-4 ring-white">
                  {i + 1}
                </div>
                <h3 className="mt-5 font-head text-xl text-cocoa">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cocoa/80">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* What's used to assess, and what you take home */}
      <section className="section" aria-labelledby="assess-heading">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">In the assessment</p>
            <h2 id="assess-heading" className="text-[2rem] leading-tight sm:text-[2.6rem]">
              What we look with, and what you take home
            </h2>
            <p className="mt-5 leading-relaxed text-cocoa/85">{ASSESSMENT_TOOLS}</p>
          </div>
          <div className="grid gap-5">
            <div className="flex items-start gap-4 rounded-2xl bg-white p-6 ring-1 ring-cocoa/[0.06]">
              <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bark/10 text-bark">
                <ScanSearch size={20} />
              </span>
              <p className="text-sm leading-relaxed text-cocoa/85">
                <strong className="text-cocoa">Trichoscope &amp; wood lamp.</strong> Non-invasive
                ways to look closely at the scalp and hair, so the plan is based on what is really
                there.
              </p>
            </div>
            <div className="flex items-start gap-4 rounded-2xl bg-white p-6 ring-1 ring-cocoa/[0.06]">
              <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bark/10 text-bark">
                <FileText size={20} />
              </span>
              <p className="text-sm leading-relaxed text-cocoa/85">
                <strong className="text-cocoa">Consultation Form Provided.</strong> What is found is
                recorded and given to you afterwards, so you leave with a record, not just a memory.
                <span className="mt-2 block text-cocoa/70">No Obligation to Continue.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Care · Educate · Beautify — meanings, in her words */}
      <section className="section bg-white" aria-labelledby="pillars-heading">
        <div className="container-x">
          <SectionHead
            eyebrow="Our core values"
            title="Care · Educate · Beautify"
            intro="Three words shape every journey."
          />
          <span id="pillars-heading" className="sr-only">Care, Educate, Beautify</span>

          <PillarCards />
        </div>
      </section>

      {/* What the method works toward */}
      <section className="section" aria-labelledby="outcomes-heading">
        <div className="container-narrow">
          <p className="eyebrow mb-4">What it works toward</p>
          <h2 id="outcomes-heading" className="text-[2rem] leading-tight sm:text-[2.6rem]">
            What a journey is built to achieve
          </h2>
          <ul className="mt-7 space-y-4">
            {OUTCOMES.map((line) => (
              <li key={line} className="flex gap-3 leading-relaxed text-cocoa/85">
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bark" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-7 text-sm leading-relaxed text-cocoa/70">
            Recovery depends on what caused the concern in the first place, and honesty is part of the
            method: if an assessment points to something outside hair care, you’ll be told to see your
            GP or a dermatologist.
          </p>

          <Link to="/programs" className="link-copper mt-8 inline-flex items-center gap-1.5 text-sm">
            See how our method feeds into our hair-care plans
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <CtaBand
        title="Every journey starts with a consultation"
        body={`The same first step, whichever way your care goes, is a ${CONSULTATION.price} consultation (${CONSULTATION.duration}), where your scalp and hair are assessed before anything is recommended.`}
      />
    </>
  )
}
