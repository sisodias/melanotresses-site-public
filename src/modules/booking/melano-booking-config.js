import { CONTACT, SERVICE_GROUPS } from '../../data.js'

function slugify(value) {
  return String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function bookingIdFor(group, name) {
  return slugify(`${group}-${name}`)
}

function durationToMinutes(value) {
  const text = String(value)
  const hours = Number(text.match(/(\d+)\s*hour/)?.[1] || 0)
  const minutes = Number(text.match(/(\d+)\s*minute/)?.[1] || 0)
  return hours * 60 + minutes
}

function priceToCents(value) {
  return Math.round(Number(String(value).replace(/[^0-9.]/g, '')) * 100)
}

const services = SERVICE_GROUPS.flatMap((group) =>
  group.items.map((item) => {
    const priceCents = priceToCents(item.price)
    return {
      id: bookingIdFor(group.name, item.name),
      name: item.name,
      group: group.name,
      description: group.note,
      durationMinutes: durationToMinutes(item.duration),
      priceCents,
      depositCents: Math.round(priceCents / 2),
      currency: 'gbp',
      bufferBefore: 0,
      bufferAfter: 0,
    }
  }),
)

export const MELANO_SERVICE_IDS = Object.fromEntries(
  services.map((service) => [
    `${service.group}:${service.name}`,
    service.id,
  ]),
)

export const MELANO_BOOKING_CONFIG = {
  providerId: 'melanotresses',
  providerName: 'MelanoTresses',
  contactEmail: CONTACT.email,
  location: '86 Adelaide Terrace, Newcastle upon Tyne, NE4 9JN',
  timezone: 'Europe/London',
  currency: 'gbp',
  paymentMode: 'deposit',
  services,
// Published studio hours: Mon–Fri 09:00–17:00, Sat 13:00–17:00, Sun closed.
  weeklyAvailability: [
    { weekday: 1, start: '09:00', end: '17:00' },
    { weekday: 2, start: '09:00', end: '17:00' },
    { weekday: 3, start: '09:00', end: '17:00' },
    { weekday: 4, start: '09:00', end: '17:00' },
    { weekday: 5, start: '09:00', end: '17:00' },
    { weekday: 6, start: '13:00', end: '17:00' },
  ],
  availabilityOverrides: [],
  slotIntervalMinutes: 30,
  minimumNoticeMinutes: 0,
  maxFutureDays: 90,
  cancellationWindowHours: 12,
}

export function getMelanoBookingService(serviceId) {
  return services.find((service) => service.id === serviceId) || null
}
