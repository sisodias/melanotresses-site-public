import { createBookingHandler } from '../../../modules/siso-booking/server/booking-handler.js'
import { MELANO_BOOKING_CONFIG } from '../../../src/modules/booking/melano-booking-config.js'

export const onRequest = createBookingHandler(MELANO_BOOKING_CONFIG)
