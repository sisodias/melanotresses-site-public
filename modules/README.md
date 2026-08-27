# SISO client modules

These modules are host-installed building blocks for SISO client repositories.
Each host keeps its own adapter, brand, approved facts, database binding,
provider secrets, and release decision. The shared module must not contain
client PII, API keys, or client-specific business copy.

## Available modules

| Module | Use | Maintained fork | Host entry points |
|---|---|---|---|
| `siso-chat-assistant` | Branded same-origin AI chat with Groq-first routing and grounded fallback | [`sisodias/siso-chat-widget`](https://github.com/sisodias/siso-chat-widget/tree/siso-module) · `siso-module` | `react/ChatAssistantWidget.jsx`, `server/chat-handler.js` |
| `siso-booking` | Timezone-aware availability, conflict-safe reservations, operator controls, optional deposits, and calendar export | [`sisodias/siso-booking-kit`](https://github.com/sisodias/siso-booking-kit/tree/siso-module) · `siso-module` | `react/BookingCalendar.jsx`, `react/BookingAdmin.jsx`, `server/booking-handler.js` |

## Install pattern

1. Vendor the relevant `modules/<module>` directory from its maintained fork
   into the client repository, or use the matching package boundary.
2. Create a host adapter beside the app's own source. Put client facts and
   brand values there; do not edit shared prompts or service data for one host.
3. Mount the React surface and same-origin Pages Function route.
4. Add server-only provider/database secrets in the target host environment.
5. Run `npm run verify:modules` in this host, then run the host build, canonical
   route curls, and a browser smoke before a preview deployment.

## Boundary rules

- Chat hosts own `systemPrompt`, grounded fallback, logo, colours, endpoint,
  and provider secret. The module accepts both AI SDK UI messages and ordinary
  text messages.
- Booking hosts own services, prices, hours, timezone, buffers, cancellation
  policy, payment mode, D1 binding, and fallback provider. `BOOKING_PAYMENT_MODE=manual`
  is review-only; production must pass the payment/database readiness gate.
- Operator tokens and customer data stay server-side. Calendar URLs are
  management-token protected and should be rendered as downloads only after a
  reservation response is received.
- A module update is not a production release. Review the upstream manifest,
  run the focused contract test, then smoke the host before deployment.

See each module's `README.md` and `INSTALL.md` for the complete host contract.
