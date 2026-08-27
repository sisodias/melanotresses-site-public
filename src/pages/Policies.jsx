import { Link } from 'react-router-dom'
import { CalendarClock, Clock3, ClipboardList, MapPin, CreditCard } from 'lucide-react'
import { EXTRA_CHILD, CTA_SECONDARY, POLICIES } from '../data'
import { Seo, PageHero, PaymentNote, CtaBand } from '../components/ui'

/*
 * Policies is read by people deciding whether to book. The content comes from
 * the shared POLICIES data and is stated plainly.
 */

const SECTIONS = [
  {
    id: 'deposit',
    icon: CreditCard,
    title: 'Deposit & payment',
    body: POLICIES.deposit,
  },
  {
    id: 'cancellations',
    icon: CalendarClock,
    title: 'Cancellations & rescheduling',
    body: POLICIES.cancellation,
  },
  {
    id: 'late-arrivals',
    icon: Clock3,
    title: 'Late arrivals & no-shows',
    body: POLICIES.lateness,
  },
]

export default function Policies() {
  return (
    <>
      <Seo
        title="Booking Policies — MelanoTresses"
        description="Booking policies for MelanoTresses, Afro hair and scalp trichology in Newcastle: the 50% deposit, subscription payment plans, cancellations, late arrivals, and mobile appointments across Tyne, Wear and County Durham."
      />

      <PageHero
        eyebrow="Policies"
        title="Booking policies"
        intro="Clear terms, in plain English, so there are no surprises before you book."
      />

      {/* Deposit, cancellation and lateness */}
      <section className="section" aria-label="Booking terms">
        <div className="container-narrow">
          <div className="space-y-6">
            {SECTIONS.map(({ id, icon: Icon, title, body }) => (
              <article key={id} id={id} className="card p-8 sm:p-10">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-bark/10 text-bark">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-head text-xl text-cocoa sm:text-2xl">{title}</h2>
                <p className="mt-3 leading-relaxed text-cocoa/85">{body}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-cocoa/70">{POLICIES.contactRequired}</p>
        </div>
      </section>

      {/* Payment plans for subscriptions */}
      <section className="section pt-0" aria-label="Paying for a subscription">
        <div className="container-narrow">
          <PaymentNote />
        </div>
      </section>

      {/* Mobile appointments */}
      <section className="section pt-0" aria-labelledby="mobile-heading">
        <div className="container-narrow">
          <p className="eyebrow rule mb-6">Coming to you</p>
          <h2 id="mobile-heading" className="text-2xl sm:text-3xl">Mobile appointments</h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-cocoa/85">
            <strong className="text-cocoa">Family Crown Care</strong> — our three-month subscription
            for a household of two or three — can be booked as a{' '}
            <strong className="text-cocoa">mobile service</strong> rather than in-salon, so your care
            comes to you. The plan covers two people; an additional person can be added for {EXTRA_CHILD}.
          </p>
          <div className="mt-8 flex items-start gap-4">
            <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bark/10 text-bark">
              <MapPin size={20} aria-hidden="true" />
            </span>
            <p className="leading-relaxed text-cocoa/85">{POLICIES.mobile}</p>
          </div>
        </div>
      </section>

      {/* Appointment preparation */}
      <section className="section pt-0" aria-labelledby="prep-heading">
        <div className="container-narrow">
          <p className="eyebrow rule mb-6">Before you come in</p>
          <h2 id="prep-heading" className="flex items-center gap-3 text-2xl sm:text-3xl">
            <ClipboardList size={22} aria-hidden="true" className="text-bark" />
            Preparing for your appointment
          </h2>
          {/* Practical preparation guidance. */}
          <ul className="mt-6 space-y-3.5">
            {[
              'Come with your hair as it normally lives — an assessment reads your scalp and strands in their everyday state, so there is no need to present “salon-ready” hair.',
              'If your hair is in a tight protective style, let us know when you book — the scalp needs to be visible in places to be examined properly.',
              'Bring (or photograph) the products you use most, and be ready to talk through your routine, styling history and anything already tried.',
              'Set out what you would like to discuss in the “Hair Consult” form when you book, so your appointment time goes on your questions.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-cocoa/85 sm:text-base">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bark" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-cocoa/70">
            Any question about a policy before you book?{' '}
            <Link to="/contact" className="link-copper">{CTA_SECONDARY.toLowerCase()}</Link>.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
