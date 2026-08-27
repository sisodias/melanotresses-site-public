import { createChatHandler } from '../../modules/siso-chat-assistant/server/chat-handler.js'

const SYSTEM_PROMPT = `You are the MelanoTresses website assistant for a trichology-led Afro-hair and scalp-care studio in Newcastle upon Tyne.

Only state facts that are present in this brief. If a detail is not here, say you do not have that information and direct the visitor to the consultation or WhatsApp contact instead. Never invent prices, qualifications, testimonials, availability, diagnoses, treatment outcomes, or medical advice. Do not claim that AI images or review stand-ins are real people or genuine client quotes.

Confirmed facts:
- The studio is at 86 Adelaide Terrace, Newcastle upon Tyne, NE4 9JN.
- Opening hours are Monday to Friday 9am–5pm, Saturday 1pm–5pm, and Sunday closed.
- A Trichology Consultation is £70 for one hour, in-studio.
- The consultation considers the visitor's scalp, hair strands, methods and techniques, routine, and lifestyle.
- The service pathway is Consultation, Maintenance, Styling, Children, then Hair Care Plans.
- Maintenance services are Express Service, Polish Me Up, and Monthly TLC.
- Styling services are The MelanoTouch, MelanoSilk, Natural Hairstyle, Super Defined (Wash and Go), and Fluffy Blowout.
- Children's services are Express Service, Polish Me Up, Monthly TLC, The MelanoTouch, MelanoSilk, Natural Hairstyle, and Super Defined (Wash and Go), with gentle and patient care for younger crowns. Children's MelanoSilk availability should be confirmed with the studio.
- The studio offers trichology-led Afro-hair and scalp care, styling, and Hair Care Plans.
- The three programmes are 6 Month Healing Journey, 4 Month Crown Revival, and 3 Month Family Crown Care.
- Family Crown Care can be mobile or in-salon for one adult and one child; an extra child is £65.
- Visitors can book through the Book page or request help on WhatsApp.

Keep replies warm, concise, and practical. For scalp or hair concerns, explain that a consultation is the appropriate next step rather than diagnosing from chat. Encourage booking when the visitor is ready.`

export const onRequest = createChatHandler({
  systemPrompt: SYSTEM_PROMPT,
  fallbackReply: getCuratedReply,
  emptyReply: 'Tell me what you would like help with — consultations, services, location, opening hours, or booking.',
  unavailableReply: 'The assistant is temporarily unavailable. Please use the Book page or WhatsApp instead.',
  modeHeader: 'X-Melano-Chat-Mode',
  providerHeader: 'X-Melano-Chat-Provider',
})

function getLatestUserText(messages) {
  const latest = [...messages].reverse().find((message) => message.role === 'user')
  if (!latest) return ''
  if (Array.isArray(latest.parts)) {
    return latest.parts
      .filter((part) => part?.type === 'text' && typeof part.text === 'string')
      .map((part) => part.text)
      .join(' ')
      .trim()
      .toLowerCase()
  }
  return typeof latest.content === 'string' ? latest.content.trim().toLowerCase() : ''
}

function getCuratedReply(messages) {
  const question = getLatestUserText(messages)

  if (/(price|cost|consult|assessment|appointment)/.test(question)) {
    return 'A Trichology Consultation is £70 for one hour in the Newcastle studio. It is the best place to start if you want your scalp and hair concerns assessed before anything is recommended. You can book through the Book page.'
  }

  if (/(where|address|location|find you|located)/.test(question)) {
    return 'MelanoTresses is at 86 Adelaide Terrace, Newcastle upon Tyne, NE4 9JN.'
  }

  if (/(open|hours|closing|saturday|sunday|weekend)/.test(question)) {
    return 'Opening hours are Monday to Friday 9am–5pm, Saturday 1pm–5pm, and Sunday closed.'
  }

  if (/(book|booking|schedule|reserve|availability)/.test(question)) {
    return 'You can choose a service and request an appointment on the Book page. If you would rather ask a question first, the team can also help on WhatsApp.'
  }

  if (/(service|maintenance|styling|melano|wash and go|blowout|natural hairstyle|polish me up|monthly tlc|express)/.test(question)) {
    return 'The service pathway starts with a Trichology Consultation, then moves through Maintenance, Styling, Children’s services, and Hair Care Plans. Visit the Services page to browse the menu, or book a consultation if you would like guidance on the right place to start.'
  }

  if (/(program|subscription|plan|healing|crown|family)/.test(question)) {
    return 'MelanoTresses offers three Hair Care Plans: the 6 Month Healing Journey, 4 Month Crown Revival, and 3 Month Family Crown Care. Family Crown Care is mobile or in-salon for one adult and one child; an extra child is £65. The Book page is the best next step for a recommendation.'
  }

  if (/(medical|diagnos|condition|itch|pain|hair loss|alopecia|scalp)/.test(question)) {
    return 'I cannot diagnose a scalp or hair condition in chat. A Trichology Consultation is the right next step so the studio can assess your concerns carefully. You can book the one-hour consultation from the Book page.'
  }

  return 'I can help with consultations, services, programmes, opening hours, location, and booking. Tell me what you are looking for, or head to the Book page when you are ready.'
}
