import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Clock, Mail, Phone, MessageCircle } from 'lucide-react'
import { Instagram, Facebook } from '../components/SocialIcons'
import { Seo, JsonLd, SectionHead, CtaBand, ConsultCta, PageHero } from '../components/ui'
import { ADDRESS, OPENING_HOURS, AREA_SERVED, CONSULTATION, CTA_PRIMARY, CONTACT } from '../data'

const ENQUIRIES_EMAIL = CONTACT.email
const WHATSAPP_URL = `https://wa.me/${CONTACT.whatsapp}`

const SOCIALS = {
  instagram: 'https://instagram.com/melanotresses',
  facebook: 'https://facebook.com/melanotresses',
}

/* Convert a display time like "9am" or "1pm" to 24-hour "HH:MM" for schema. */
function to24(time) {
  const m = time.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i)
  if (!m) return null
  let h = parseInt(m[1], 10)
  const min = m[2] || '00'
  if (m[3].toLowerCase() === 'pm' && h !== 12) h += 12
  if (m[3].toLowerCase() === 'am' && h === 12) h = 0
  return `${String(h).padStart(2, '0')}:${min}`
}

/*
 * Opening-hours specification built straight from OPENING_HOURS, so the schema
 * and the visible table can never disagree. "Closed" days are dropped rather
 * than emitted as zero-length windows.
 */
const OPENING_HOURS_LD = OPENING_HOURS
  .filter(([, hours]) => hours.toLowerCase() !== 'closed')
  .map(([day, hours]) => {
    const [opens, closes] = hours.split(/\s*[–—-]\s*/).map((s) => s.trim())
    return {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${day}`,
      opens: to24(opens),
      closes: to24(closes),
    }
  })

/*
 * LocalBusiness (HealthAndBeautyBusiness) structured data.
 *
 * The studio address, contact channels, opening hours, service area and social
 * profiles come from shared constants so the page and structured data agree.
 */
const LOCAL_BUSINESS_LD = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  name: 'MelanoTresses',
  description:
    'Trichology-led Afro and textured hair and scalp care in Newcastle upon Tyne. Assessment before treatment. Founded 2018.',
  foundingDate: '2018',
  address: {
    '@type': 'PostalAddress',
    streetAddress: ADDRESS.line1,
    addressLocality: ADDRESS.city,
    postalCode: ADDRESS.postcode,
    addressCountry: 'GB',
  },
  telephone: CONTACT.phone,
  email: CONTACT.email,
  openingHoursSpecification: OPENING_HOURS_LD,
  areaServed: AREA_SERVED.map((name) => ({ '@type': 'AdministrativeArea', name })),
  sameAs: [SOCIALS.instagram, SOCIALS.facebook],
}

const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS.oneLine)}&output=embed`
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  '86 Adelaide Terrace Newcastle NE4 9JN'
)}`

/* A single way to reach the studio. */
function Channel({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-4">
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-bark"
      >
        <Icon size={18} />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="eyebrow mb-1.5">{label}</h3>
        <div className="text-sm leading-relaxed text-cocoa/85">{children}</div>
      </div>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [drafted, setDrafted] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  /* Both routes carry the full enquiry, pre-filled and URL-encoded. */
  const enquiryText = () =>
    `Hi MelanoTresses! I'm ${form.name || '...'}.\n\n${form.message || ''}\n\n` +
    `Email: ${form.email || '—'}\nPhone: ${form.phone || '—'}\n(Sent from melanotresses.co.uk)`

  function handleSubmit(e) {
    e.preventDefault()
    // WhatsApp deep link (wa.me requires url-encoded text) — opens their chat
    // with the message drafted; nothing sends until the visitor presses send.
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(enquiryText())}`, '_blank', 'noreferrer')
    setDrafted(true)
  }

  function handleEmail() {
    const subject = encodeURIComponent('Website enquiry — MelanoTresses')
    window.location.href = `mailto:${ENQUIRIES_EMAIL ?? ''}?subject=${subject}&body=${encodeURIComponent(enquiryText())}`
    setDrafted(true)
  }

  return (
    <>
      <Seo
        title="Contact | Afro Hair & Scalp Trichology, Newcastle — MelanoTresses"
        description="Visit MelanoTresses at 86 Adelaide Terrace, Newcastle upon Tyne NE4 9JN. Opening hours, map, socials and how to book a trichology consultation."
      />
      <JsonLd data={LOCAL_BUSINESS_LD} id="ld-melanotresses-localbusiness" />

      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        intro="A question before you book is welcome — there is no deposit and no commitment in asking. Below is where to find the studio, when we are open, and how to reach us."
      />

      {/* ── Visit the studio: address + hours | map ─────────────────────── */}
      <section className="section" aria-labelledby="visit-us">
        <div className="container-x">
          <SectionHead
            center={false}
            eyebrow="Where to find us"
            title="Visit the studio"
            intro="MelanoTresses is a Newcastle studio. Come in for a consultation; your scalp and hair are assessed properly before anything is recommended."
          />

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Address + opening hours */}
            <div>
              <address className="not-italic">
                <p className="flex items-center gap-2 eyebrow mb-3">
                  <MapPin size={14} aria-hidden="true" /> Studio address
                </p>
                <p className="font-head text-2xl leading-snug text-cocoa sm:text-[1.75rem]">
                  {ADDRESS.line1}
                  <br />
                  {ADDRESS.city}
                  <br />
                  {ADDRESS.postcode}
                </p>
              </address>

              <div className="mt-10">
                <p className="flex items-center gap-2 eyebrow mb-4">
                  <Clock size={14} aria-hidden="true" /> Opening hours
                </p>
                <dl className="border-y border-cocoa/10">
                  {OPENING_HOURS.map(([day, hours]) => {
                    const closed = hours.toLowerCase() === 'closed'
                    return (
                      <div
                        key={day}
                        className="flex items-center justify-between border-t border-cocoa/10 py-3 first:border-t-0"
                      >
                        <dt className="text-sm font-medium text-cocoa">{day}</dt>
                        <dd className={`text-sm ${closed ? 'text-cocoa/35' : 'text-cocoa/85'}`}>
                          {hours}
                        </dd>
                      </div>
                    )
                  })}
                </dl>
              </div>
            </div>

            {/* Map */}
            <div>
              <div className="overflow-hidden rounded-2xl ring-1 ring-cocoa/[0.06]">
                <div className="aspect-[4/3] w-full">
                  <iframe
                    title="Map showing MelanoTresses at 86 Adelaide Terrace, Newcastle upon Tyne NE4 9JN"
                    src={MAP_EMBED}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noreferrer"
                className="link-copper mt-4 inline-flex items-center gap-2 text-sm"
              >
                <MapPin size={15} aria-hidden="true" /> View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reach us + message form ─────────────────────────────────────── */}
      <section className="section bg-white" aria-labelledby="reach-us">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Ways to reach us */}
          <div>
            <SectionHead
              center={false}
              eyebrow="Ways to reach us"
              title="Say hello"
              intro="Follow along on social, or send a message. A phone line and enquiries email are on the way — flagged below so nothing is invented in the meantime."
            />

            <div className="space-y-8">
              <Channel icon={Instagram} label="Social">
                <div className="flex flex-col gap-1.5">
                  <a
                    href={SOCIALS.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[36px] items-center gap-2.5 font-medium text-cocoa hover:text-bark"
                  >
                    <Instagram size={18} /> @melanotresses on Instagram
                  </a>
                  <a
                    href={SOCIALS.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[36px] items-center gap-2.5 font-medium text-cocoa hover:text-bark"
                  >
                    <Facebook size={18} /> @melanotresses on Facebook
                  </a>
                </div>
              </Channel>

              <Channel icon={Phone} label="Telephone">
                <p>
                  <a href={`tel:${CONTACT.phone}`} className="link-copper">{CONTACT.phoneDisplay}</a>
                </p>
              </Channel>

              <Channel icon={Mail} label="Email">
                <p>
                  <a href={`mailto:${CONTACT.email}`} className="link-copper">{CONTACT.email}</a>
                </p>
              </Channel>

              <Channel icon={MessageCircle} label="WhatsApp">
                <p>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="link-copper">
                    Message us on WhatsApp
                  </a>
                </p>
                <p className="mt-2 text-xs text-cocoa/60">
                  Often the quickest way to ask a first question.
                </p>
              </Channel>
            </div>

            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-copper mt-8">
              <MessageCircle size={16} aria-hidden="true" /> Message us on WhatsApp
            </a>
          </div>

          {/* Message form */}
          <div>
            <SectionHead
              center={false}
              eyebrow="Message"
              title="Send a message"
              intro="Tell us what is going on with your hair and scalp. There is no obligation and no deposit attached to a question."
            />

            <p className="mt-4 text-sm leading-relaxed text-cocoa/70">
              Send it straight to our <strong className="text-cocoa">WhatsApp</strong> with your
              details filled in, or open a pre-filled email instead. Nothing sends until you press
              send in your own app.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-cocoa">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={update('name')}
                  className="mt-2 min-h-[48px] w-full rounded-xl border border-cocoa/20 bg-white px-4 py-3 text-sm text-cocoa focus:border-bark focus:outline-none focus:ring-2 focus:ring-bark/30"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-cocoa">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update('email')}
                  className="mt-2 min-h-[48px] w-full rounded-xl border border-cocoa/20 bg-white px-4 py-3 text-sm text-cocoa focus:border-bark focus:outline-none focus:ring-2 focus:ring-bark/30"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-cocoa">
                  Phone <span className="font-normal text-cocoa/50">(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={update('phone')}
                  className="mt-2 min-h-[48px] w-full rounded-xl border border-cocoa/20 bg-white px-4 py-3 text-sm text-cocoa focus:border-bark focus:outline-none focus:ring-2 focus:ring-bark/30"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-cocoa">
                  How can we help?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  className="mt-2 w-full rounded-xl border border-cocoa/20 bg-white px-4 py-3 text-sm text-cocoa focus:border-bark focus:outline-none focus:ring-2 focus:ring-bark/30"
                />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="submit" className="btn-copper w-full sm:w-auto">
                  <MessageCircle size={16} aria-hidden="true" /> Send on WhatsApp
                </button>
                <button type="button" onClick={handleEmail} className="btn-ghost w-full sm:w-auto">
                  Open email draft instead
                </button>
              </div>
              <p aria-live="polite" className="text-sm leading-relaxed text-cocoa/70">
                {drafted ? (
                  <>
                    <strong className="text-cocoa">Your chat or email app should have opened</strong>{' '}
                    with the message drafted. Nothing was sent from this site — you press send.
                  </>
                ) : (
                  <span className="text-cocoa/60">
                    Your message opens in your own WhatsApp or email app — you stay in control of
                    what sends.
                  </span>
                )}
              </p>
            </form>

            {/* Quiet booking nudge — the one shared consultation prompt. */}
            <div className="mt-8">
              <ConsultCta
                eyebrow="Already decided?"
                title="You do not need to message first"
                body="New clients start with a consultation, booked directly through the calendar."
              />
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
