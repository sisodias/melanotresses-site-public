import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Clock3, Stethoscope, ExternalLink, Phone, MessageCircle, Loader2 } from 'lucide-react'
import { CONSULTATION, ADDRESS, OPENING_HOURS, ACUITY_EMBED_SRC, CONTACT } from '../data'
import { Seo, SectionHead, PaymentNote, ACUITY } from '../components/ui'
import { BookingPicker } from '../components/BookingPicker'
import { BookingCalendar } from '../components/BookingCalendar'
import { MelanoBookingCalendar } from '../modules/booking/MelanoBookingCalendar.jsx'
import { Instagram } from '../components/SocialIcons'

/* WhatsApp deep link with a pre-drafted booking enquiry. */
const WHATSAPP_BOOK = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
  "Hi MelanoTresses! I'd like to book an appointment — could you help me find a time?"
)}`

export default function Book() {
  const navigate = useNavigate()
  /*
 * Acuity is the public booking platform. Our branded picker
   * preselects the chosen Acuity appointment type in the embedded scheduler,
 * so checkout, payments, reminders, and booking records stay in one system.
 * The native SISO/D1 flow remains available behind ?native; ?demo is a no-write
 * mock.
   */
  const [service, setService] = useState(null)
  const isDemo = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('demo')
  const nativeRequested = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('native')
  const acuityApiRequested = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('acuity-api')
  const [bookingProvider, setBookingProvider] = useState(() => {
    if (isDemo) return 'own'
    if (nativeRequested) return 'checking'
    return acuityApiRequested ? 'acuity-api' : 'acuity'
  })
  const [acuityNativeOk, setAcuityNativeOk] = useState(true)
  const onAcuityUnavailable = useCallback(() => setAcuityNativeOk(false), [])
  const onOwnUnavailable = useCallback(() => setBookingProvider('acuity'), [])

  useEffect(() => {
    if (isDemo) {
      setBookingProvider('own')
      return undefined
    }
    if (!nativeRequested) {
      setBookingProvider(acuityApiRequested ? 'acuity-api' : 'acuity')
      return undefined
    }
    let live = true
    fetch('/api/booking/health')
      .then((response) => response.json().catch(() => null).then((body) => ({ response, body })))
      .then(({ response, body }) => {
        if (!live) return
        setBookingProvider(response.ok && body?.configured ? 'own' : 'acuity')
      })
      .catch(() => {
        if (live) setBookingProvider('acuity')
    })
    return () => { live = false }
  }, [acuityApiRequested, isDemo, nativeRequested])
  const embedSrc = service
    ? `${ACUITY_EMBED_SRC}&appointmentType=${service.id}`
    : ACUITY_EMBED_SRC
  const goBack = () => {
    // In-app history → real back; direct landings → home.
    if (window.history.length > 2) navigate(-1)
    else navigate('/')
  }

  return (
    <>
      <Seo
        title="Book an Appointment | Afro Hair & Scalp Trichology, Newcastle — MelanoTresses"
        description="Book a trichology consultation with MelanoTresses in Newcastle. Every appointment starts with a proper scalp and hair assessment. Booking is handled through Acuity."
      />

      {/*
        FULL-PAGE TAKEOVER — the calendar owns the viewport. A slim bar carries
        a back control and the essential facts; the Acuity iframe fills the rest
        of the screen height so desktop users see the whole scheduler without
        double scrollbars. Supporting detail lives BELOW the takeover.
      */}
      <section
        aria-labelledby="booking-heading"
        className="flex min-h-[calc(100vh-73px)] flex-col"
      >
        <h2 id="booking-heading" className="sr-only">Book an appointment</h2>

        {/* takeover bar: back control · title · fallback link-out */}
        <div className="border-b border-cocoa/[0.07] bg-paper">
          <div className="container-x flex items-center justify-between gap-4 py-3.5">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-3 font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-cocoa transition-colors hover:bg-cocoa/[0.05] hover:text-bark"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back
            </button>
            <p className="hidden text-center font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-cocoa/70 sm:block">
              Book an appointment · {CONSULTATION.price} consultation · {CONSULTATION.duration}
            </p>
            {/* quick contact rail: WhatsApp (drafted message) · call · Instagram · new tab */}
            <div className="flex items-center gap-1">
              <a
                href={WHATSAPP_BOOK}
                target="_blank"
                rel="noreferrer"
                aria-label="Message us on WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-full text-cocoa transition-colors hover:bg-cocoa/[0.05] hover:text-bark"
              >
                <MessageCircle size={17} />
              </a>
              <a
                href={`tel:+${CONTACT.whatsapp}`}
                aria-label={`Call us on ${CONTACT.phoneDisplay}`}
                className="flex h-11 w-11 items-center justify-center rounded-full text-cocoa transition-colors hover:bg-cocoa/[0.05] hover:text-bark"
              >
                <Phone size={16} />
              </a>
              <a
                href="https://instagram.com/melanotresses"
                target="_blank"
                rel="noreferrer"
                aria-label="MelanoTresses on Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full text-cocoa transition-colors hover:bg-cocoa/[0.05] hover:text-bark"
              >
                <Instagram size={16} />
              </a>
              <a
                href={ACUITY}
                target="_blank"
                rel="noreferrer"
                className="hidden min-h-[44px] items-center gap-1.5 rounded-full px-3 font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-cocoa transition-colors hover:bg-cocoa/[0.05] hover:text-bark sm:inline-flex"
              >
                New tab <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* step 1: our branded service picker */}
        <BookingPicker selected={service} onSelect={setService} />

              {/* step 2: Acuity is the public flow; native D1 is explicit opt-in */}
        {bookingProvider === 'checking' ? (
          <div className="flex min-h-[30rem] items-center justify-center gap-2 bg-white text-sm text-cocoa/60">
            <Loader2 size={17} className="animate-spin" aria-hidden="true" /> Checking booking availability…
          </div>
        ) : bookingProvider === 'own' ? (
          <div className="flex-1 bg-white">
            <div className="container-x py-10">
              <MelanoBookingCalendar service={service} onUnavailable={onOwnUnavailable} />
            </div>
          </div>
        ) : bookingProvider === 'acuity-api' && acuityNativeOk ? (
          <div className="flex-1 bg-white">
            <div className="container-x py-10">
              <BookingCalendar service={service} onUnavailable={onAcuityUnavailable} />
            </div>
          </div>
        ) : (
          <iframe
            key={embedSrc}
            src={embedSrc}
            title="Book an appointment with MelanoTresses"
            className="block w-full flex-1 border-0 bg-white"
            style={{ minHeight: '640px' }}
            allow="payment"
          />
        )}
      </section>

      {/* Everything below is supporting detail for people who scroll past the calendar. */}
      <section className="section border-t border-cocoa/10" aria-label="Visit details">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card">
              <p className="eyebrow mb-3 flex items-center gap-2">
                <Stethoscope size={14} aria-hidden="true" /> Usually the first step
              </p>
              <p className="font-head text-2xl leading-snug text-cocoa">
                {CONSULTATION.price} consultation
              </p>
              <p className="mt-2 text-sm leading-relaxed text-cocoa/75">
                {CONSULTATION.duration} — a full scalp and hair assessment, before anything is
                recommended.
              </p>
            </div>

            <div className="card">
              <p className="eyebrow mb-3 flex items-center gap-2">
                <MapPin size={14} aria-hidden="true" /> Where to find us
              </p>
              <address className="not-italic">
                <p className="font-head text-xl leading-snug text-cocoa">{ADDRESS.line1}</p>
                <p className="mt-1 text-sm leading-relaxed text-cocoa/75">
                  {ADDRESS.city}
                  <br />
                  {ADDRESS.postcode}
                </p>
              </address>
            </div>

            <div className="card">
              <p className="eyebrow mb-3 flex items-center gap-2">
                <Clock3 size={14} aria-hidden="true" /> Opening hours
              </p>
              <dl className="space-y-2 text-sm">
                {OPENING_HOURS.map(([day, hrs]) => (
                  <div
                    key={day}
                    className="flex items-baseline justify-between gap-4 border-b border-cocoa/10 pb-2 last:border-0 last:pb-0"
                  >
                    <dt className="text-cocoa/70">{day}</dt>
                    <dd className="font-medium text-cocoa">{hrs}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* What happens at a consultation, beside a generated studio illustration. */}
      <section className="section bg-white">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead
              eyebrow="Your consultation"
              title="What happens when you come in"
              intro={CONSULTATION.intro + ' You leave with a clear sense of what your scalp and hair actually need, and the findings written up in a consultation form to take away.'}
              center={false}
            />
            <ul className="grid max-w-2xl gap-x-8 gap-y-2 sm:grid-cols-2">
              {CONSULTATION.assesses.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-cocoa/85">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bark" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-cocoa/70">{CONSULTATION.note}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <img
                src="/images/generated/booking-consultation-still-life.png"
                alt="Editorial still life of a clipboard and trichoscope in warm consultation light"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </figure>
            <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <img
                src="/images/generated/booking-care-still-life.png"
                alt="Editorial still life of a satin bonnet, comb and unlabelled care bottle"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

          {/* Payment-plan detail is kept together in PaymentNote. */}
      <section className="section">
        <div className="container-narrow">
          <PaymentNote />
        </div>
      </section>

      {/* Light closing prompt — no sticky bar, nothing that overlaps the embed. */}
      <section className="section">
        <div className="container-narrow text-center">
          <p className="eyebrow mb-4">Prefer to ask first?</p>
          <h2 className="text-2xl sm:text-3xl">Not sure where to start?</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-cocoa/85">
            If you would rather have a question answered before you book, send a message and we will
            come back to you.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/contact" className="btn-ghost">
              Ask a question
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
