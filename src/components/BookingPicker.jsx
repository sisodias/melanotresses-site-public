import { useState } from 'react'
import { Stethoscope, Sparkles, Baby, HeartHandshake, BookOpen, Check, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ACUITY_TYPE_IDS, CONSULTATION } from '../data'
import { bookingIdFor } from '../modules/booking/melano-booking-config.js'

/*
 * BookingPicker — our own branded step-one for booking. The visitor picks a
 * service here (our UI, our type), and the Acuity embed below reloads with
 * that appointment type preselected via the official dynamic-link parameter
 * (schedule.php?...&appointmentType=ID). Kills the worst part of the iframe —
 * hunting through Acuity's full menu — without touching payments, which stay
 * on Acuity checkout. No API key needed for this step; the availability API
 * upgrade can slot in later behind the same component.
 */
const GROUPS = [
  {
    icon: Stethoscope,
    label: 'Start here',
    services: [
      {
        name: 'Trichology Consultation',
        id: ACUITY_TYPE_IDS['Trichology Consultation'],
        bookingId: bookingIdFor('Trichology', 'Trichology Consultation'),
        note: `${CONSULTATION.price} · ${CONSULTATION.duration} — where every journey starts`,
        featured: true,
      },
    ],
  },
  {
    icon: HeartHandshake,
    label: 'Maintenance',
    services: [
      { name: 'Express Service', id: ACUITY_TYPE_IDS['Express Service (adult)'], bookingId: bookingIdFor('Maintenance', 'Express Service'), note: '£45 · 1.75 hours' },
      { name: 'Polish Me Up', id: ACUITY_TYPE_IDS['Polish Me Up (adult)'], bookingId: bookingIdFor('Maintenance', 'Polish Me Up'), note: '£55 · 2.75 hours' },
      { name: 'Monthly TLC', id: ACUITY_TYPE_IDS['Monthly TLC (adult)'], bookingId: bookingIdFor('Maintenance', 'Monthly TLC'), note: '£75 · 3.5 hours' },
    ],
  },
  {
    icon: Sparkles,
    label: 'Styling',
    services: [
      { name: 'The MelanoTouch', id: ACUITY_TYPE_IDS['The MelanoTouch'], bookingId: bookingIdFor('Styling', 'The MelanoTouch'), note: '£85 · 5 hours' },
      { name: 'MelanoSilk', id: ACUITY_TYPE_IDS['MelanoSilk'], bookingId: bookingIdFor('Styling', 'MelanoSilk'), note: '£90 · 3.5 hours' },
      { name: 'Natural Hairstyle', id: ACUITY_TYPE_IDS['Natural Hairstyle'], bookingId: bookingIdFor('Styling', 'Natural Hairstyle'), note: '£50 · 2.5 hours' },
      { name: 'Super Defined (Wash & Go)', id: ACUITY_TYPE_IDS['Super Defined (Wash and Go)'], bookingId: bookingIdFor('Styling', 'Super Defined (Wash and Go)'), note: '£65 · 2.5 hours' },
      { name: 'Fluffy Blowout', id: ACUITY_TYPE_IDS['Fluffy Blowout'], bookingId: bookingIdFor('Styling', 'Fluffy Blowout'), note: '£65 · 3 hours' },
    ],
  },
  {
    icon: Baby,
    label: 'Children (6–18)',
    services: [
      { name: 'Express Service', id: ACUITY_TYPE_IDS['Express Service'], bookingId: bookingIdFor('Children’s Services (6–18 years)', 'Express Service'), note: '£30 · 1.75 hours' },
      { name: 'Polish Me Up', id: ACUITY_TYPE_IDS['Polish Me Up'], bookingId: bookingIdFor('Children’s Services (6–18 years)', 'Polish Me Up'), note: '£40 · 2.75 hours' },
      { name: 'Monthly TLC', id: ACUITY_TYPE_IDS['Monthly TLC'], bookingId: bookingIdFor('Children’s Services (6–18 years)', 'Monthly TLC'), note: '£60 · 3.5 hours' },
      { name: 'The MelanoTouch', id: ACUITY_TYPE_IDS.MelanoTouch, bookingId: bookingIdFor('Children’s Services (6–18 years)', 'MelanoTouch'), note: '£70 · 5 hours' },
      { name: 'MelanoSilk', href: '/services#children', note: 'Children’s availability to confirm' },
      { name: 'Natural Hairstyle', id: ACUITY_TYPE_IDS['Natural Hairstyle (child)'], bookingId: bookingIdFor('Children’s Services (6–18 years)', 'Natural Hairstyle'), note: '£30 · 2 hours' },
      { name: 'Super Defined (Wash and Go)', id: ACUITY_TYPE_IDS['Super Defined (Wash and Go) (child)'], bookingId: bookingIdFor('Children’s Services (6–18 years)', 'Super Defined (Wash and Go)'), note: '£55 · 2.75 hours' },
    ],
  },
  {
    icon: BookOpen,
    label: 'Hair Care Plans',
    services: [
      { name: '6 Month Healing Journey', href: '/programs#healing-journey', note: 'Longer-term care · explore the plan' },
      { name: '4 Month Crown Revival', href: '/programs#crown-revival', note: 'Focused care · explore the plan' },
      { name: '3 Month Family Crown Care', href: '/programs#family-crown-care', note: 'Shared care · explore the plan' },
    ],
  },
]

export function BookingPicker({ selected, onSelect }) {
  const [openGroup, setOpenGroup] = useState(0)
  return (
    <div className="border-b border-cocoa/[0.07] bg-white">
      <div className="container-x py-6">
        <p className="eyebrow mb-4">1 · Choose your appointment</p>

        {/* group tabs */}
        <div className="flex flex-wrap gap-2">
          {GROUPS.map((g, gi) => (
            <button
              key={g.label}
              type="button"
              onClick={() => setOpenGroup(gi)}
              aria-pressed={openGroup === gi}
              className={`inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 font-body text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                openGroup === gi
                  ? 'border-bark bg-bark text-white'
                  : 'border-cocoa/20 text-cocoa hover:border-cocoa/50'
              }`}
            >
              <g.icon size={14} aria-hidden="true" />
              {g.label}
            </button>
          ))}
        </div>

        {/* service chips — horizontal snap row on mobile, wrap on desktop */}
        <div className="-mx-6 mt-4 flex snap-x gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
           {GROUPS[openGroup].services.map((s) => {
            const active = Boolean(s.id && selected?.id === s.id)
            const className = [
              'shrink-0 snap-start rounded-2xl border px-5 py-3.5 text-left transition-all',
              active
                ? 'border-bark bg-bark/[0.06] ring-1 ring-bark'
                : 'border-cocoa/15 bg-white hover:border-cocoa/40',
            ].join(' ')
            const content = (
              <>
                <span className="flex items-center gap-2 font-head text-base text-cocoa">
                  {active && <Check size={15} aria-hidden="true" className="text-bark" />}
                  {s.name}
                </span>
                <span className="mt-1 block font-body text-xs text-cocoa/60">{s.note}</span>
              </>
            )
            return s.href ? (
              <Link key={s.href} to={s.href} className={className}>
                {content}
              </Link>
            ) : (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelect(active ? null : s)}
                aria-pressed={active}
                className={className}
              >
                {content}
              </button>
            )
         })}
        </div>

        <p className="mt-4 flex items-center gap-1.5 font-body text-xs text-cocoa/60">
          <ArrowRight size={13} aria-hidden="true" />
          {selected
            ? `${selected.name} preselected below — pick your time and pay the deposit as usual.`
            : 'Pick a service to preload it in the calendar, or browse the full menu below.'}
        </p>
      </div>
    </div>
  )
}
