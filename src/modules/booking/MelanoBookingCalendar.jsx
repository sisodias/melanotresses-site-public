import { BookingCalendar } from '../../../modules/siso-booking/react/BookingCalendar.jsx'
import { getMelanoBookingService, MELANO_BOOKING_CONFIG } from './melano-booking-config.js'

export function MelanoBookingCalendar({ service, onUnavailable }) {
  const bookingService = getMelanoBookingService(service?.bookingId)
  return (
    <BookingCalendar
      endpoint="/api/booking"
      service={bookingService ? { ...bookingService, bookingId: bookingService.id } : null}
      timezone={MELANO_BOOKING_CONFIG.timezone}
      contact={{ name: 'MelanoTresses', whatsapp: '447551491338' }}
      onUnavailable={onUnavailable}
    />
  )
}
