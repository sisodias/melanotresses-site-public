import { Award } from 'lucide-react'
import {
  Seo,
  PageHero,
  PhotoBlock,
  SectionHead,
  Reveal,
  CtaBand,
} from '../components/ui'
import { STORY_BEATS, QUALIFICATION, FOUNDER_QUOTE } from '../data'

/*
 * ABOUT — deliberately minimal. Hero (story-led introduction),
 * the founder story told one beat at a time as you scroll, credentials at the
 * end, and a booking band. The narrative comes from STORY_BEATS. The public
 * handoff uses an illustrative campaign image.
 */

export default function About() {
  return (
    <>
      <Seo
        title="About Priscilla | Afro Hair Trichologist Newcastle — MelanoTresses"
        description="Meet Priscilla, founder of MelanoTresses — an Afro hair and scalp trichology studio in Newcastle upon Tyne, in practice since 2018."
      />

      <PageHero
        eyebrow="About"
        title="Meet Priscilla, founder of MelanoTresses"
        intro="An Afro hair and scalp trichology studio in Newcastle upon Tyne, in practice since 2018."
      >
        <div className="mt-12 grid items-center gap-8 sm:gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
          <PhotoBlock
            src="/images/generated/hero-male-sand-01.png"
            alt="Editorial campaign image for MelanoTresses"
            label="Editorial campaign image"
            ratio="aspect-[4/5]"
            position="object-top"
          />

          <div className="rounded-2xl bg-white p-8 ring-1 ring-cocoa/[0.06] sm:p-10">
            <p className="eyebrow mb-4">Her story</p>
            <h2 className="font-head text-2xl leading-tight text-cocoa sm:text-3xl">
              Why MelanoTresses exists
            </h2>
            <p className="mt-5 leading-relaxed text-cocoa/85">{STORY_BEATS[0].body}</p>
            <blockquote className="mt-7 border-l-2 border-bark/40 pl-5">
              <p className="font-head text-xl italic leading-snug text-cocoa">“{FOUNDER_QUOTE}”</p>
              <cite className="mt-3 block text-sm font-medium not-italic text-bark">
                Priscilla, founder of MelanoTresses
              </cite>
            </blockquote>
          </div>
        </div>
      </PageHero>

      {/* ── HER STORY — one beat at a time, fading in on scroll ───────────── */}
      <section className="section">
        <div className="container-narrow">
          <SectionHead
            eyebrow="Her story"
            title="Why MelanoTresses exists, in Priscilla’s words"
            center={false}
          />

          {/*
            Timeline treatment: a hairline spine on the left with numbered
            markers, each beat revealing as you scroll. Replaces the plain
            "Beat one/two" stack.
          */}
          <ol className="relative space-y-14 border-l border-cocoa/15 pl-8 sm:space-y-20 sm:pl-12">
            {STORY_BEATS.map((beat, i) => (
              <Reveal as="li" key={beat.title} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-8 top-0 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-bark font-head text-sm text-white ring-4 ring-paper sm:-left-12"
                >
                  {i + 1}
                </span>
                <h3 className="font-head text-2xl sm:text-3xl">{beat.title}</h3>
                <p className="mt-4 leading-relaxed text-cocoa/85">{beat.body}</p>
              </Reveal>
            ))}
          </ol>

          {/* Founder's own line, as a pull quote. */}
          <Reveal>
            <blockquote className="mt-16 border-l-2 border-bark/40 pl-6 sm:mt-24">
              <p className="font-head text-2xl italic leading-snug text-cocoa sm:text-3xl">
                “{FOUNDER_QUOTE}”
              </p>
              <cite className="mt-4 block font-body text-sm font-medium not-italic text-bark">
                Priscilla, founder of MelanoTresses
              </cite>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ── CREDENTIALS — story first, credentials last ──────────────────── */}
      <section className="section pt-0">
        <div className="container-narrow">
          <div className="border-t border-cocoa/10 pt-16 sm:pt-20">
            <p className="eyebrow mb-4">Credentials</p>
            <div className="rounded-2xl bg-white p-8 ring-1 ring-cocoa/[0.06] sm:p-10">
              <p className="flex items-start gap-3">
                <Award size={20} aria-hidden="true" className="mt-1 shrink-0 text-bark" />
                <span className="font-head text-xl leading-snug text-cocoa sm:text-2xl">
                  {QUALIFICATION.title}
                </span>
              </p>
              <dl className="mt-6 space-y-3 border-t border-cocoa/10 pt-6 text-sm leading-relaxed text-cocoa/85">
                <div className="flex justify-between gap-4">
                  <dt className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-bark">
                    Grade
                  </dt>
                  <dd className="text-right font-medium text-cocoa">{QUALIFICATION.grade}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-bark">
                    Awarded by
                  </dt>
                  <dd className="text-right font-medium text-cocoa">{QUALIFICATION.awardingBody}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-bark">
                    Awarded
                  </dt>
                  <dd className="text-right font-medium text-cocoa">{QUALIFICATION.date}</dd>
                </div>
              </dl>
              {/* This historical note uses past tense. */}
              <p className="mt-6 text-sm leading-relaxed text-cocoa/75">
                MelanoTresses began in 2018, while Priscilla was studying medicine at Newcastle
                University — the scientific grounding her trichology practice is built on.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
