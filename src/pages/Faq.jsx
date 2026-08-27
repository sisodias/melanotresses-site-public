import { Link } from 'react-router-dom'
import { MapPin, Clock } from 'lucide-react'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Seo, JsonLd, PageHero, CtaBand, ACUITY } from '../components/ui'
import { PROGRAMS, CONSULTATION, EXTRA_CHILD, ADDRESS, OPENING_HOURS, CTA_TERTIARY, POLICIES } from '../data'

/*
 * Subscription names are read from data.js so the FAQ and programmes pages
 * remain consistent. Pricing guidance is kept with the relevant service data.
 */
const HEALING = PROGRAMS.find((p) => p.slug === 'healing-journey')
const REVIVAL = PROGRAMS.find((p) => p.slug === 'crown-revival')
const FAMILY = PROGRAMS.find((p) => p.slug === 'family-crown-care')

/*
 * The Q&A set. Each item may carry a visible answer and a plain-text
 * `schemaAnswer`; only the latter reaches the FAQPage JSON-LD.
 */
const FAQS = [
  {
    q: 'Do I need a subscription, or can I book a one-off?',
    a: (
      <p>
        You don’t have to commit to a subscription to see us. Almost everyone starts with a one-off{' '}
        <strong className="text-cocoa">{CONSULTATION.price} consultation</strong> ({CONSULTATION.duration}),
        where your scalp and hair are assessed before anything is recommended. Booking a consultation
        doesn’t sign you up to anything — a subscription is only suggested if it’s genuinely the right
        next step for your hair.
      </p>
    ),
    schemaAnswer:
      `You don’t have to commit to a subscription. Most people start with a one-off consultation — ${CONSULTATION.price} for ${CONSULTATION.duration} — where your scalp and hair are assessed before anything is recommended. Booking a consultation does not commit you to a subscription.`,
  },
  {
    q: 'What happens at a consultation?',
    a: (
      <p>
        A consultation is a {CONSULTATION.duration}, {CONSULTATION.price} appointment. We guide you
        through an analysis of your hair health — your scalp, your hair strands and problem areas,
        your methods and routine — and you leave with a clear sense of what your hair needs and the
        findings written up to take away. It’s a standalone appointment, so the fee isn’t credited
        against a subscription.
      </p>
    ),
    schemaAnswer:
      `A consultation lasts ${CONSULTATION.duration} and costs ${CONSULTATION.price}. We assess your scalp, hair strands and problem areas, your methods and your routine, and you leave with the findings written up. It is a standalone appointment and the fee is not credited against a subscription.`,
  },
  {
    q: 'What’s included in each subscription?',
    a: (
      <>
        <p>There are three subscriptions:</p>
        <ul className="mt-3 space-y-1.5 pl-5 marker:text-bark/50 list-disc">
          <li>
            <strong className="text-cocoa">{HEALING.name}</strong> — {HEALING.location.toLowerCase()}
          </li>
          <li>
            <strong className="text-cocoa">{REVIVAL.name}</strong> — {REVIVAL.location.toLowerCase()}
          </li>
          <li>
            <strong className="text-cocoa">{FAMILY.name}</strong> — {FAMILY.location.toLowerCase()}
          </li>
        </ul>
        <p className="mt-3">
          Each one includes a complimentary <strong className="text-cocoa">MelanoSilk</strong>, and a{' '}
          <strong className="text-cocoa">payment plan is available</strong> on all three. The full list
          of what each covers — appointments, treatments, trims and more — is on the Subscriptions
          page.{' '}
          <Link to="/programs" className="link-copper">
            {CTA_TERTIARY}
          </Link>
          .
        </p>
      </>
    ),
    schemaAnswer:
      `There are three subscriptions: the ${HEALING.name} (in-salon), the ${REVIVAL.name} (in-salon) and the ${FAMILY.name} (mobile or in-salon). Each includes a complimentary MelanoSilk and a payment plan is available on all three. Full inclusions are listed on the Subscriptions page.`,
  },
  {
    q: 'How much do the subscriptions cost?',
    a: (
      <>
        <ul className="space-y-1.5 pl-5 marker:text-bark/50 list-disc">
          <li><strong className="text-cocoa">{HEALING.name}</strong> — {HEALING.price} ({HEALING.plan})</li>
          <li><strong className="text-cocoa">{REVIVAL.name}</strong> — {REVIVAL.price} ({REVIVAL.plan})</li>
          <li><strong className="text-cocoa">{FAMILY.name}</strong> — {FAMILY.price} ({FAMILY.plan})</li>
        </ul>
        <p className="mt-3">
          Every subscription is spread over a payment plan, so you don’t pay for the whole journey up
          front. The {CONSULTATION.price} consultation is separate and isn’t credited against a plan.
        </p>
      </>
    ),
    schemaAnswer:
      `Subscription prices: the ${HEALING.name} is ${HEALING.price}, the ${REVIVAL.name} is ${REVIVAL.price}, and the ${FAMILY.name} is ${FAMILY.price}. Each is spread over a payment plan (an upfront deposit then monthly instalments). The ${CONSULTATION.price} consultation is separate and is not credited against a subscription.`,
  },
  {
    q: 'Is the Family Crown Care subscription mobile?',
    a: (
      <p>
        Yes. {FAMILY.name} can be booked as{' '}
        <strong className="text-cocoa">mobile appointments or in-salon</strong> for the length of the
        subscription. Mobile appointments cover{' '}
        <strong className="text-cocoa">Tyne, Wear and County Durham</strong> — you enter your address
        when you book. It’s built for a household of{' '}
        <strong className="text-cocoa">two to three people</strong>, with one appointment per person
        each month; the plan covers two people and you can add a third for{' '}
        <strong className="text-cocoa">{EXTRA_CHILD}</strong>.
      </p>
    ),
    schemaAnswer:
      `Yes. The ${FAMILY.name} can be booked as mobile appointments or in-salon; mobile appointments cover Tyne, Wear and County Durham. It is for a household of two to three people, one appointment per person per month, and you can add a third person for ${EXTRA_CHILD}.`,
  },
  {
    q: 'How do I book?',
    a: (
      <p>
        Everything is booked online through our Acuity booking page, which shows live availability.{' '}
        <Link to="/book" className="link-copper">
          Go to the booking page
        </Link>{' '}
        to choose a time that suits you.
      </p>
    ),
    schemaAnswer:
      `Appointments are booked online through the MelanoTresses Acuity booking page, which shows live availability: ${ACUITY}`,
  },
  {
    q: 'Where are you, and when are you open?',
    a: (
      <>
        <div className="flex gap-3">
          <MapPin size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-bark" />
          <address className="not-italic leading-relaxed text-cocoa">
            {ADDRESS.line1}
            <br />
            {ADDRESS.city}
            <br />
            {ADDRESS.postcode}
          </address>
        </div>
        <div className="mt-5 flex gap-3">
          <Clock size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-bark" />
          <div className="min-w-0">
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-bark">
              Opening hours
            </p>
            <dl className="mt-2 max-w-xs divide-y divide-cocoa/10 rounded-xl ring-1 ring-cocoa/[0.06]">
              {OPENING_HOURS.map(([day, hours]) => (
                <div key={day} className="flex items-center justify-between gap-4 px-4 py-2">
                  <dt className="font-body text-sm font-medium text-cocoa">{day}</dt>
                  <dd className="font-body text-sm text-cocoa/75">{hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </>
    ),
    schemaAnswer:
      `MelanoTresses is at ${ADDRESS.oneLine}. Opening hours: Monday to Friday 9am to 5pm, Saturday 1pm to 5pm, closed Sunday.`,
  },
  {
    q: 'What’s your cancellation and lateness policy?',
    a: (
      <>
        <p>{POLICIES.cancellation}</p>
        <p className="mt-3">{POLICIES.lateness}</p>
      </>
    ),
    schemaAnswer: `${POLICIES.cancellation} ${POLICIES.lateness}`,
  },
  {
    q: 'What deposit do you take?',
    a: <p>{POLICIES.deposit} Subscriptions instead run on a payment plan — an upfront deposit, then monthly instalments.</p>,
    schemaAnswer: `${POLICIES.deposit} Subscriptions run on a payment plan: an upfront deposit then monthly instalments.`,
  },
]

/* FAQPage JSON-LD is built at module scope so its identity stays stable. */
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.filter((item) => item.schemaAnswer).map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.schemaAnswer },
  })),
}

function FaqItem({ item, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="py-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-head text-xl leading-snug text-cocoa sm:text-2xl">{item.q}</span>
        <span
          aria-hidden="true"
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cocoa/15 text-cocoa transition-transform duration-300 ${
            open ? 'rotate-180 bg-bark text-white border-bark' : ''
          }`}
        >
          <ChevronDown size={17} />
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-7 pr-12 text-[15px] leading-relaxed text-cocoa/85">{item.a}</p>
        </div>
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <>
      <Seo
        title="FAQ — consultations, subscriptions & booking | MelanoTresses"
        description="Answers on booking a £70 consultation, the three MelanoTresses subscriptions, mobile Family Crown Care, and our Newcastle studio and opening hours. Afro hair and scalp trichology."
      />
      <JsonLd data={FAQ_SCHEMA} id="faq-schema" />

      <PageHero
        eyebrow="FAQ"
        title="Questions, answered plainly"
        intro="What people actually ask before they book — consultations, subscriptions, mobile appointments, deposits, and where to find us."
      />

      <section className="section" aria-labelledby="faq-heading">
        <div className="container-narrow">
          <h2 id="faq-heading" className="sr-only">
            Frequently asked questions
          </h2>

          {/*
            Accordion: first question open by default, one at a time. The
            grid-rows transition animates height without measuring; chevron
            rotates. Content stays in the DOM for SEO (and the JSON-LD carries
            the full text regardless).
          */}
          <div className="divide-y divide-cocoa/10 border-y border-cocoa/10">
            {FAQS.map((item, i) => (
              <FaqItem key={item.q} item={item} defaultOpen={i === 0} />
            ))}
          </div>

          <p className="mt-10 border-t border-cocoa/10 pt-8 text-[15px] leading-relaxed text-cocoa/85">
            Didn’t find your question? Nothing here replaces having your own hair looked at — you can{' '}
            <Link to="/contact" className="link-copper">
              ask it directly
            </Link>{' '}
            or{' '}
            <Link to="/programs" className="link-copper">
              see the subscriptions in detail
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
