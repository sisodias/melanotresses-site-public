import { Link } from 'react-router-dom'
import { Droplets, Waves, Layers, ArrowRight } from 'lucide-react'
import {
  Seo,
  JsonLd,
  PageHero,
  SectionHead,
  CtaBand,
  ConsultCta,
  PhotoBlock,
} from '../components/ui'

/* ------------------------------------------------------------------ *
 * Everything on this page is general, industry-level education about
 * hair and scalp biology. Nothing here describes an individual's
 * condition, promises an outcome, or claims an efficacy. Anything that
 * would require knowing studio-specific equipment or protocol is kept out of
 * this general education page.
 * ------------------------------------------------------------------ */

const CHAPTERS = [
  { id: 'what-is-trichology', label: 'What is trichology' },
  { id: 'textured-hair', label: 'Textured Hair Science' },
  { id: 'assessment', label: 'Our Assessment' },
  { id: 'conditions', label: 'Common conditions' },
  { id: 'questions', label: 'Frequently Asked Questions' },
]

const MECHANISMS = [
  {
    icon: Droplets,
    title: 'Curl pattern changes how scalp oil reaches the ends',
    body: 'Sebum — the oil your scalp produces — is the hair’s own conditioner, and on a straight strand it slides down the length with very little help. On a coiled strand it has to negotiate every turn, so it tends to stay near the scalp while the lengths and ends stay comparatively dry.',
    soWhat: 'This is why textured hair can genuinely be oily at the root and parched at the ends on the same day, and why moisture usually has to be applied deliberately rather than left to arrive on its own.',
  },
  {
    icon: Waves,
    title: 'Every bend in the strand is a natural stress point',
    body: 'A curl-textured hair strand has a flattened, elliptical cross-section compared with straighter hair strands, which are more circular or oval. This characteristic influences the curling nature of textured hair. At each turn the strand narrows and the cuticle scales lift slightly out of alignment. Those turns are where force concentrates when hair is combed, stretched, detangled or pulled through a style.',
    soWhat: 'It’s why breakage in textured hair so often shows up mid-strand at a curve rather than as shedding from the root — and why the two look similar in the sink but mean completely different things.',
  },
  {
    icon: Layers,
    title: 'The load is cumulative, not one bad appointment',
    body: 'Protective styles, heat, colour and chemical processing each place a different demand on the strand and the follicle: tension at the root, altered internal bonds along the length, lifted cuticle at the surface. Any one of them, spaced out and done well, may be entirely manageable.',
    soWhat: 'Difficulty usually builds where they stack with no recovery between — which is why a specialist asks about the last two years of your hair, not just the last two weeks.',
  },
]

const TOPICS = [
  {
    title: 'Breakage',
    what: 'Hair snapping part-way along the strand rather than shedding from the root — short pieces, uneven lengths, a length that never seems to move.',
    why: 'Broken hair has a blunt, torn end; shed hair carries a small pale bulb. The distinction points in different directions: mechanical stress, chemical history and moisture balance are all possible contributors, and they call for different responses.',
  },
  {
    title: 'Thinning or reduced density',
    what: 'Less hair overall, a part that looks wider than it used to, or a hairline that has changed shape.',
    why: 'Density can change for many reasons — some to do with the scalp, some not to do with hair at all. That range is exactly why a specialist assesses before recommending anything, and why some concerns are better taken to a GP.',
  },
  {
    title: 'Tension from protective styles',
    what: 'Soreness after a style is installed, small bumps along the hairline, or fine hairs at the edges that never grow back to length.',
    why: 'Follicles respond to sustained pull. Styles designed to protect hair can work against it when they’re installed too tight, sized too heavy, or worn too long without a break. It is one of the most common patterns in textured hair and one of the most worth raising early.',
  },
  {
    title: 'Scalp irritation and flaking',
    what: 'Itching, tightness, tenderness, or flaking that returns however often you wash.',
    why: 'The scalp is skin, and it behaves like skin. Flaking can be about the scalp’s own condition or about what is being left on it, and those two look almost identical from the outside — which is a poor basis for choosing a product.',
  },
  {
    title: 'Product buildup',
    what: 'Hair that feels coated, refuses to absorb water, or goes limp and dull soon after washing.',
    why: 'Heavy oils, butters and silicones can sit on the scalp and cuticle rather than absorbing into them. Once there is a film, everything applied afterwards works on the film instead of the hair — so a routine can be full of good products and still not be reaching anything.',
  },
  {
    title: 'Shedding after a life event',
    what: 'A noticeable increase in hair coming out from the root, often some months after childbirth, illness, significant stress or a change in medication.',
    why: 'Hair grows in cycles and the whole head is not on the same clock. Events that affect the body can shift a proportion of hairs into their resting phase together, which shows up as a wave of shedding weeks later. This is a well-recognised pattern and a specific one — which is why it is worth having assessed rather than self-diagnosed from the internet.',
  },
]

const FAQS = [
  {
    q: 'Is a trichologist a doctor?',
    a: 'No. Trichology is the study of the hair and scalp, not a medical qualification, and a trichologist does not diagnose or treat medical conditions. A good one works the other way round from a salon — assessing first, and saying plainly when something belongs with your GP or a dermatologist rather than with them.',
  },
  {
    q: 'What is the difference between a trichologist and a hairdresser?',
    a: 'A hairdresser works on how hair looks and behaves today; that is a real craft and MelanoTresses does that work too, including bridal and occasion styling. Trichology asks a different question: what is the scalp and the follicle actually doing, and what pattern explains it. The two are complementary, not ranked.',
  },
  {
    q: 'Does Afro and textured hair really need different care?',
    a: 'Yes — for structural reasons rather than reputational ones. Scalp oil travels down a coiled strand less readily, each bend in the coil concentrates mechanical stress, and the styling practices common to textured hair add tension, heat and chemical history on top. Generic advice tends to miss all three.',
  },
  {
    q: 'Do I need a full Hair Care Plan to get an answer?',
    a: 'No. Everything starts with a consultation, and the point of a consultation is to find out what is going on — including the possibility that the answer is a change of routine rather than a Hair Care Plan.',
  },
]

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function Trichology101() {
  return (
    <>
      <Seo
        title="Trichology 101: Scalp and hair health explained | MelanoTresses"
        description="Understanding the basics of scalp and hair science so you can properly care for your own scalp and hair. Education from MelanoTresses in Newcastle."
      />
      <JsonLd data={FAQ_SCHEMA} id="trichology-101-faq" />

      <PageHero
        eyebrow="Education"
        title="Trichology 101: Scalp and hair health explained"
        intro="Understanding the basics of scalp and hair science will set the foundations to build your knowledge of your own scalp and hair so you can properly care for it."
      >
        <nav aria-label="On this page" className="mt-9">
          <ul className="flex flex-wrap gap-2.5">
            {CHAPTERS.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="inline-flex min-h-[44px] items-center rounded-full border border-espresso/25 bg-cream/70 px-4 font-head text-xs font-bold text-espresso transition-colors hover:border-espresso/70"
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {/* ---------------- 1. What trichology is ---------------- */}
      <section id="what-is-trichology" className="section scroll-mt-28 sm:scroll-mt-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-2xl sm:text-3xl">What is trichology?</h2>
            <p className="mt-5 leading-relaxed">
              Trichology is the study of the hair and scalp. It sits between hair care and health
              care: the aim isn’t to make hair look good for a day, but to understand why it is
              behaving as it is, and build a plan that works to sustain a healthy scalp and hair.
            </p>

            <h3 className="mt-12 text-xl sm:text-2xl">
              The difference is in the questions being asked
            </h3>
            <p className="mt-4 leading-relaxed">
              The difference isn’t skill or care — it’s the questions being asked, that sets the tone
              for the direction of your care.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-stretch sm:gap-5">
              <div className="rounded-[20px] bg-white/70 p-6 shadow-soft ring-1 ring-espresso/10">
                <p className="eyebrow mb-3">A styling appointment asks</p>
                <p className="font-head text-lg font-medium leading-snug text-espresso">
                  “What would you like it to look like?”
                </p>
              </div>
              <div
                aria-hidden="true"
                className="flex items-center justify-center py-1 font-head text-sm font-bold tracking-[0.18em] text-copper-deep sm:px-1"
              >
                VS
              </div>
              <div className="rounded-2xl bg-white p-6 ring-1 ring-cocoa/[0.06]">
                <p className="eyebrow mb-3">A trichology appointment asks</p>
                <p className="font-head text-xl leading-snug text-cocoa">
                  “What is your scalp doing, and why?”
                </p>
              </div>
            </div>

            <p className="mt-7 leading-relaxed">
              The MelanoTresses Method approaches your appointment with Assessment, Profiling and
              Education before we finalise and adorn your crown with a style. See it set out step by
              step on{' '}
              <Link to="/the-method" className="link-copper">
                The MelanoTresses Method
              </Link>
              .
            </p>
          </div>

          <PhotoBlock
            src="/images/generated/scalp-assessment-hands.jpg"
            alt="A scalp examined under a trichoscope through parted natural hair"
            label="Scalp assessment under magnification"
            ratio="aspect-[3/4]"
            position="object-top"
          />
        </div>
      </section>

      {/* ---------------- 2. Why textured hair differs ---------------- */}
      <section id="textured-hair" className="section scroll-mt-28 bg-white sm:scroll-mt-32">
        <div className="container-x">
          <SectionHead
            eyebrow="Structure, not stereotype"
            title="Textured Hair Science"
            intro="Three structural facts explain most of the difference. None of them is about hair being weak, they’re about hair being shaped differently."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {MECHANISMS.map(({ icon: Icon, title, body, soWhat }) => (
              <article key={title} className="rounded-[20px] bg-cream p-7 shadow-soft">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-copper-soft/60 text-copper-deep"
                >
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 font-head text-lg font-medium leading-snug">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed">{body}</p>
                <p className="mt-4 border-t border-espresso/10 pt-4 text-sm leading-relaxed text-espresso">
                  <span className="eyebrow mr-2">In practice</span>
                  {soWhat}
                </p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-3xl space-y-4 text-center leading-relaxed text-espresso">
            <p>
              Despite textured hair being generally finer in diameter amongst all hair types, it is
              perceived to have a higher volume due to the tight coils the strands create. This
              appearance has long influenced the manner in which textured hair is handled, which is
              commonly harshly.
            </p>
            <p>
              <strong>In practice:</strong> textured hair requires strategic handling, detangling and
              minimised use of harsh chemicals and heat styling to protect the individual fibres from
              breakage.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- 3. What assessment involves ---------------- */}
      <section id="assessment" className="section scroll-mt-28 sm:scroll-mt-32">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            <div>
              <p className="eyebrow mb-3">Our Assessment</p>
              <h2 className="text-2xl sm:text-3xl">Why an assessment must come first</h2>
              <p className="mt-5 leading-relaxed">
                Two very different problems can look identical in the mirror. Tension loss at the
                hairline and hair shedding due to a hormonal change in the body both read as “my hair
                is coming out”. Acting on the wrong conclusion can cost months of lost time and effort.
                Assessments are what decide the treatment: the scalp examined directly, a proper
                history taken, and a baseline recorded so change can be measured.
              </p>

              <h3 className="mt-10 text-xl">What assessment can tell you</h3>
              <ul className="mt-4 space-y-2.5 leading-relaxed">
                {[
                  'Whether hair is breaking along the strand or shedding from the root',
                  'Whether density has changed evenly across the scalp or in a pattern',
                  'Whether the scalp shows signs of irritation',
                  'Whether a hairline change matches a tension pattern, and how far it has progressed',
                  'Whether any of your signs and symptoms warrants a GP or dermatologist referral and further tests',
                ].map((i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copper"
                    />
                    {i}
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 text-xl">How we look, and what you take home</h3>
              <p className="mt-4 leading-relaxed">
                During a trichology consultation, a thorough history is taken, trichoscope imaging
                of your scalp is recorded and a wood lamp may be used to further examine your scalp.
                What is found is recorded in a consultation form, which you receive after your
                appointment.
              </p>

              <p className="mt-4 leading-relaxed">
                Our thorough process allows us to make confident decisions and create plans for the
                care and health of your hair.{' '}
                <Link to="/programs" className="link-copper">
                  See how the Hair Care Plans are structured
                </Link>
                .
              </p>
              <div className="mt-8">
                <ConsultCta
                  eyebrow="Discover your scalp health"
                  title="Have your scalp properly assessed"
                />
              </div>
            </div>

            <div className="lg:sticky lg:top-28">
              <PhotoBlock
                src="/images/generated/scalp-assessment-hands.jpg"
                alt="A scalp examined under a trichoscope through parted natural hair"
                label="Photo: scalp assessment in progress"
                ratio="aspect-[4/5]"
                position="object-[center_40%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 4. Common conditions ---------------- */}
      <section id="conditions" className="section scroll-mt-28 bg-white sm:scroll-mt-32">
        <div className="container-x">
          <SectionHead
            eyebrow="Common conditions"
            title="What people bring to a consultation, and what’s happening underneath"
            intro="These are things worth discussing with a specialist — general information about how hair and scalp behave, not a diagnosis or a treatment recommendation for any individual."
          />

          <div className="grid gap-6 sm:grid-cols-2">
            {TOPICS.map((t) => (
              <article key={t.title} className="rounded-[20px] bg-cream p-7 shadow-soft">
                <h3 className="font-head text-lg font-medium">{t.title}</h3>
                <dl className="mt-4 space-y-4 text-sm leading-relaxed">
                  <div>
                    <dt className="eyebrow mb-1.5">What it looks like</dt>
                    <dd>{t.what}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-1.5">Why it’s worth assessing</dt>
                    <dd>{t.why}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-[20px] bg-cream/80 p-7 text-center shadow-soft">
            <h3 className="font-head text-base font-medium">
              When the honest answer is “see your GP”
            </h3>
            <p className="mt-3 text-sm leading-relaxed">
              Some hair and scalp changes have causes that sit outside hair care entirely. A
              trichologist’s job includes recognising when that may be the case and saying so,
              rather than starting a subscription regardless. Being told what is not ours to treat is
              part of what you’re paying for.
            </p>
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-espresso/70">
            This page is general educational information about hair and scalp health. It isn’t
            medical advice, it isn’t a diagnosis, and nothing here predicts a result for any
            individual. If you have a concern, a consultation is the place to have it looked at
            properly.
          </p>
        </div>
      </section>

      {/* ---------------- 5. Questions ---------------- */}
      <section id="questions" className="section scroll-mt-28 sm:scroll-mt-32">
        <div className="container-x">
          <SectionHead
            eyebrow="Straight answers"
            title="Frequently Asked Questions"
            intro="The ones that come up most often, answered without hedging."
          />
          <dl className="mx-auto max-w-3xl divide-y divide-espresso/10 border-y border-espresso/10">
            {FAQS.map((f) => (
              <div key={f.q} className="py-7">
                <dt className="font-head text-lg font-medium text-espresso">{f.q}</dt>
                <dd className="mt-3 leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>

          <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
            <Link
              to="/the-method"
              className="group rounded-[20px] bg-white/70 p-6 shadow-soft ring-1 ring-espresso/10 transition-shadow hover:shadow-lift"
            >
              <p className="eyebrow mb-2">Next</p>
              <p className="font-head text-lg font-medium text-espresso">
                The MelanoTresses Method
              </p>
              <p className="mt-2 text-sm leading-relaxed">
                How assessment turns into a plan, stage by stage.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 font-head text-sm font-bold text-copper-deep">
                Read the method
                <ArrowRight size={15} aria-hidden="true" />
              </span>
            </Link>
            <Link
              to="/programs"
              className="group rounded-[20px] bg-white/70 p-6 shadow-soft ring-1 ring-espresso/10 transition-shadow hover:shadow-lift"
            >
              <p className="eyebrow mb-2">Next</p>
               <p className="font-head text-lg font-medium text-espresso">The Hair Care Plans</p>
              <p className="mt-2 text-sm leading-relaxed">
                What each one covers, how long it runs, and what it costs.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 font-head text-sm font-bold text-copper-deep">
                 See the Hair Care Plans
                <ArrowRight size={15} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Curious what’s actually going on with your hair and scalp?"
        body="Book a consultation and find out properly — from someone who will explain what she’s seeing, and tell you honestly if a Hair Care Plan isn’t what you need."
      />
    </>
  )
}
