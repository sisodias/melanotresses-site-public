/*
 * MelanoTresses — shared site data.
 *
 * Pages import these constants so service details, contact information and
 * structured data stay consistent throughout the app.
 */

/* ------------------------------------------------------------------ booking */
export const ACUITY = 'https://melanotresses.as.me/'
// The official Acuity embed (owner 28794861). The <script>
// only adds auto-resize; the <iframe> works on its own where scripts can't run.
export const ACUITY_EMBED_IFRAME =
  '<iframe src="https://app.acuityscheduling.com/schedule.php?owner=28794861&ref=embedded_csp" title="Schedule Appointment" width="100%" height="800" frameBorder="0" allow="payment"></iframe>'
export const ACUITY_EMBED_SCRIPT =
  '<script src="https://embed.acuityscheduling.com/js/embed.js" type="text/javascript"></script>'
export const ACUITY_EMBED_SRC =
  'https://app.acuityscheduling.com/schedule.php?owner=28794861&ref=embedded_csp'


/*
 * Acuity appointment-type IDs, extracted from the live public scheduler
 * (melanotresses.as.me, 15 Aug 2026) and verified against prices/durations.
 * Used to deep-link the scheduler with a service preselected
 * (schedule.php?appointmentType=ID — official Acuity dynamic-link feature).
 */
export const ACUITY_TYPE_IDS = {
  'Trichology Consultation': 43693084,
  'Monthly TLC (adult)': 44144571,
  'Polish Me Up (adult)': 44144648,
  'Express Service (adult)': 44145096,
  'The MelanoTouch': 44143904,
  'MelanoSilk': 44144078,
  'Natural Hairstyle': 44149617,
  'Super Defined (Wash and Go)': 68749359,
  'Fluffy Blowout': 75817424,
  // children's services (6-18)
  'Monthly TLC': 59341890,
  'Polish Me Up': 59342093,
  'Express Service': 59342182,
  'MelanoTouch': 59342244,          // children's MelanoTouch £70
  'Natural Hairstyle (child)': 59342298,
  'Super Defined (Wash and Go) (child)': 83130241,
// No active public Acuity appointment type currently exposes this service for
// direct preselection.
}

/* -------------------------------------------------------------- consultation */
export const CONSULTATION = {
  price: '£70',
  duration: '1 hour',
  creditedToSubscription: false, // confirmed: the fee is NOT credited against a plan
  intro:
    'During your consultation we guide you through an analysis of your hair health.',
  assesses: [
    'Your scalp',
    'Your hair strands',
    'Your methods and techniques',
    'Your routine',
    'Your lifestyle',
  ],
  note:
    'Your questions, concerns and thoughts matter — set out what you’d like to discuss using the ‘Hair Consult’ form when you book. The one-hour consultation is an approximate estimate; session times may vary.',
}

/* ------------------------------------------------------------- qualification */
export const QUALIFICATION = {
  title: 'VTCT Skills (ITEC) Level 4 Certificate in Trichology',
  grade: 'Distinction',
  date: '13 May 2025',
  awardingBody: 'Trichocare Education',
  short: 'Level 4 Certificate in Trichology (Distinction), Trichocare Education',
}

/* ---------------------------------------------------------------- the method */
/* The five stages used by the studio. */
export const METHOD_STAGES = [
  {
    name: 'Consult',
    body:
      'We start with a conversation regarding your immediate hair concerns, your daily routine, your lifestyle, and a brief medical history.',
  },
  {
    name: 'Assess',
    body:
      'A trichoscopy and wood-lamp examination of your scalp. Non-invasive throughout.',
  },
  {
    name: 'Profile',
    body:
      'Using the MelanoTresses Hair Profiling system, we build your hair identity to best recommend the products and routine that generally suit you.',
  },
  {
    name: 'Educate',
    body:
      'With quality knowledge and practical methods, we reshape how you see your hair, and set you up to overcome your concerns and reach your goals.',
  },
  {
    name: 'Style',
    body:
      'We set your crown in a style that’s beautiful and true to your taste.',
  },
]

/* What is assessed and what the visitor takes home. */
export const ASSESSMENT_TOOLS =
  'During a trichology consultation, a trichoscope and wood lamp may be used to examine your scalp. What is found is recorded in a consultation form, which you receive after your appointment.'

/* Care | Educate | Beautify — the three pillars. */
export const PILLARS = [
  {
    word: 'Care',
    body: 'Care that honours you and benefits your hair long-term.',
  },
  {
    word: 'Educate',
    body: 'Deepening your understanding of your hair, scalp and the science behind caring for it.',
  },
  {
    word: 'Beautify',
    body: 'Celebrating your real hair and showcasing your texture.',
  },
]

/* Outcomes the studio can support. */
export const OUTCOMES = [
  'A restored relationship with your hair',
  'Greater confidence in yourself',
  'Length retention — the 6-Month Healing Journey is built around three inches over the six months',
]

/* ----------------------------------------------------------- subscriptions */
/*
 * Now fully priced. Each plan is paid as an upfront deposit (equal to one
 * monthly instalment) plus monthly instalments across the plan. `PROGRAMS`
 * name is kept so existing imports keep working; SUBSCRIPTIONS is the alias.
 */
export const PROGRAMS = [
  {
    slug: 'healing-journey',
    name: '6 Month Healing Journey',
    duration: '6 months',
    months: 6,
    price: '£750',
    deposit: '£107',
    instalment: '£107',
    plan: '£107 to secure your place, then £107 a month across the six months',
    location: 'In-salon',
    tag: 'Most in-depth',
    featured: true,
    tagline: 'An invitation to commit to your crown with intention.',
    blurb:
      'Over six months you move through a rhythm where each visit builds on the last — restoring balance, refining shape, and nourishing your roots.',
    forWho: 'Clients who want luxury care, maximum growth, and hands-on guidance.',
    includes: [
      'Priority booking',
      '2 appointments per month',
      '6 trichology-led consultations & treatments',
      '3 precision trims',
      'Signature styling that honours your crown',
      '1 MelanoSilk',
      'Exclusive 1-on-1 education session',
      'Tailored hair care plan',
      'Hair Healing Kit',
    ],
    finale: 'At the end of your journey, one complimentary MelanoSilk to celebrate your crown.',
  },
  {
    slug: 'crown-revival',
    name: '4 Month Crown Revival',
    duration: '4 months',
    months: 4,
    price: '£550',
    deposit: '£110',
    instalment: '£110',
    plan: '£110 to secure your place, then £110 a month across the four months',
    location: 'In-salon',
    tagline: 'Four months of intentional care for your crown.',
    blurb:
      'Sometimes your hair just needs a season to breathe, heal and thrive. A reset rooted in love and understanding — texture nurtured, shape refined, and your crown ready to grow into its next chapter.',
    forWho: 'You want a focused reset on a shorter runway than the full Healing Journey.',
    includes: [
      'Priority booking',
      '1 appointment per month',
      '4 trichology-led consultations & treatments',
      '2 precision trims',
      'Signature styling',
      '1 MelanoSilk',
    ],
    finale: 'You’ll also receive a complimentary MelanoSilk.',
  },
  {
    slug: 'family-crown-care',
    name: '3 Month Family Crown Care',
    duration: '3 months',
    months: 3,
    price: '£750',
    deposit: '£187.50',
    instalment: '£187.50',
    plan: '£187.50 to secure your place, then £187.50 a month across the three months',
    location: 'Mobile or in-salon',
    tag: 'Mobile available',
    tagline: 'A shared journey of love and care — for you and your little one(s).',
    blurb:
      'Over three months, intentional hair care rooted in expert knowledge and gentle hands — learned together as a household.',
    forWho: 'Households of two or three caring for children’s and adults’ textured hair together.',
    includes: [
      '1 appointment per month, per person',
      'Trichology-led treatments',
      'Precision trims',
      'Signature styling',
    ],
    finale: 'You’ll also receive a complimentary MelanoSilk.',
    familyTerms:
      'For two to three people. One appointment per person, per month. The plan covers two people; add a third for £65.',
    mobileNote:
       'You can choose mobile appointments instead of in-salon for the duration of the Hair Care Plan. Mobile appointments cover Tyne, Wear and County Durham — just enter your address when you book. Subject to the mobile policy.',
  },
]
export const SUBSCRIPTIONS = PROGRAMS
export const EXTRA_CHILD = '£65'

/* --------------------------------------------------------------- services */
/* Appointment menu and published new-client prices. Returning-client rates are
 handled inside Acuity. */
export const SERVICE_GROUPS = [
  {
    name: 'Consultation',
    note: 'Where every journey starts.',
    items: [{ name: 'Trichology Consultation', duration: '1 hour', price: '£70' }],
  },
  {
    name: 'Maintenance',
    note: 'Ongoing care for the health and length of your hair.',
    items: [
      { name: 'Express Service', duration: '1 hour 45 minutes', price: '£45', acuityId: ACUITY_TYPE_IDS['Express Service (adult)'] },
      { name: 'Polish Me Up', duration: '2 hours 45 minutes', price: '£55', acuityId: ACUITY_TYPE_IDS['Polish Me Up (adult)'] },
      { name: 'Monthly TLC', duration: '3 hours 30 minutes', price: '£75', acuityId: ACUITY_TYPE_IDS['Monthly TLC (adult)'] },
    ],
  },
  {
    name: 'Styling',
    note: 'Signature styling on hair that’s been cared for properly.',
    items: [
      { name: 'The MelanoTouch', duration: '5 hours', price: '£85', acuityId: ACUITY_TYPE_IDS['The MelanoTouch'] },
      { name: 'MelanoSilk', duration: '3 hours 30 minutes', price: '£90', acuityId: ACUITY_TYPE_IDS.MelanoSilk },
      { name: 'Natural Hairstyle', duration: '2 hours 30 minutes', price: '£50', acuityId: ACUITY_TYPE_IDS['Natural Hairstyle'] },
      { name: 'Super Defined (Wash and Go)', duration: '2 hours 30 minutes', price: '£65', acuityId: ACUITY_TYPE_IDS['Super Defined (Wash and Go)'] },
      { name: 'Fluffy Blowout', duration: '3 hours', price: '£65', acuityId: ACUITY_TYPE_IDS['Fluffy Blowout'] },
    ],
  },
  {
    name: 'Children',
    note: 'Gentle, patient care for younger crowns.',
    items: [
      { name: 'Express Service', duration: '1 hour 45 minutes', price: '£30', acuityId: ACUITY_TYPE_IDS['Express Service'] },
      { name: 'Polish Me Up', duration: '2 hours 45 minutes', price: '£40', acuityId: ACUITY_TYPE_IDS['Polish Me Up'] },
      { name: 'Monthly TLC', duration: '3 hours 30 minutes', price: '£60', acuityId: ACUITY_TYPE_IDS['Monthly TLC'] },
      { name: 'The MelanoTouch', duration: '5 hours', price: '£70', acuityId: ACUITY_TYPE_IDS.MelanoTouch },
      { name: 'MelanoSilk', detail: 'Children’s availability to confirm' },
      { name: 'Natural Hairstyle', duration: '2 hours', price: '£30', acuityId: ACUITY_TYPE_IDS['Natural Hairstyle (child)'] },
      { name: 'Super Defined (Wash and Go)', duration: '2 hours 45 minutes', price: '£55', acuityId: ACUITY_TYPE_IDS['Super Defined (Wash and Go) (child)'] },
    ],
  },
  {
    name: 'Hair Care Plans',
    note: 'Longer-term support when a firmer rhythm is right for you.',
    items: [
      { name: '6 Month Healing Journey', duration: '6 months', price: '£107/month' },
      { name: '4 Month Crown Revival', duration: '4 months', price: '£110/month' },
      { name: '3 Month Family Crown Care', duration: '3 months', price: '£187.50/month' },
    ],
  },
]

/* ---------------------------------------------------------------- policies */
export const POLICIES = {
  deposit:
    'A non-refundable 50% deposit secures your booking. The remaining balance is settled on the day of your appointment.',
  subscriptionPayment:
    'Hair Care Plans are spread over a payment plan — an upfront deposit (equal to one monthly instalment), then monthly instalments across the plan.',
  cancellation:
    'Cancellations must be made at least 12 hours before your appointment to reschedule using your original deposit. With less than 12 hours’ notice, a new deposit is needed to rebook.',
  lateness:
    'A £25 fee is added to your balance if you arrive more than 15 minutes late. Arriving 30 minutes late results in cancellation of the appointment.',
  contactRequired:
    'You’ll need to provide a contact number and email so we can send you information about your appointment.',
  mobile:
    'For a mobile appointment, enter your address when prompted at booking — it must be within Tyne, Wear or County Durham. For a salon appointment, enter “In Salon”.',
}

/* ---------------------------------------------------------------- contact */
export const CONTACT = {
  phone: '07551491338',
  phoneDisplay: '07551 491338',
  whatsapp: '447551491338', // wa.me format (UK, no leading 0)
  email: 'melanotresses@gmail.com',
}

/* Public Google Business page — current reviews live there. */
export const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps/place/MelanoTresses/'

/* Studio location and opening hours. */
export const ADDRESS = {
  line1: '86 Adelaide Terrace',
  city: 'Newcastle upon Tyne',
  postcode: 'NE4 9JN',
  oneLine: '86 Adelaide Terrace, Newcastle upon Tyne, NE4 9JN',
}

export const OPENING_HOURS = [
  ['Sunday', 'Closed'],
  ['Monday', '9am – 5pm'],
  ['Tuesday', '9am – 5pm'],
  ['Wednesday', '9am – 5pm'],
  ['Thursday', '9am – 5pm'],
  ['Friday', '9am – 5pm'],
  ['Saturday', '1pm – 5pm'],
]

/* Founder story used by the About page. */
export const STORY_BEATS = [
  {
    title: 'The moment',
    body:
      'My hair journey started at eleven, just as I was about to begin high school. It was the early years of the natural-hair movement on YouTube, around 2008, and I threw myself into styling, caring for and understanding my own hair — subscribed to all the original natural-hair creators of the time.',
  },
  {
    title: 'What failed me',
    body:
      'It wasn’t all smooth. I dealt with heat damage in my mid-teens, and in my late teens some highly potent Ayurvedic recipes led to hair loss. I learned first-hand how much harm well-meant advice can do.',
  },
  {
    title: 'The turning point',
    body:
      'From the age of seven I was set on medicine. At eleven I came across trichology, and mapped out a path toward becoming a doctor who could one day specialise in the science of hair and scalp.',
  },
  {
    title: 'My mission',
    body:
      'I believe everyone should be able to love themselves from hair to toe. No part of a person should ever stand in the way of truly loving who they are.',
  },
  {
    title: 'The early days, 2018',
    body:
      'I launched MelanoTresses in 2018, during my first year studying Medicine at Newcastle University — at first as a side hustle, braiding for the many curly and textured-haired students who wanted braids. I soon saw how many had never been taught to care for their own hair, and were quietly living with scalp conditions and hair problems. My knowledge of textured hair, alongside a growing understanding of skin conditions, meant I found myself advising as much as styling. MelanoTresses grew from there.',
  },
]

/* Founder quote used as a pull quote. */
export const FOUNDER_QUOTE =
  'I specialise in the care of Afro-textured hair. My mission is to educate, inspire and tend to the hair care needs of all my beautiful clients.'

/* Standardised CTA labels. */
export const CTA_PRIMARY = 'Book a consultation'
export const CTA_NAV = 'Book an appointment'
export const CTA_SECONDARY = 'Ask a question'
export const CTA_TERTIARY = 'See what’s included'

export const AREA_SERVED = ['Newcastle upon Tyne', 'Tyne and Wear', 'County Durham']

export const NAV_PRIMARY = [
  { to: '/', label: 'Home', description: 'Welcome to MelanoTresses' },
  { to: '/about', label: 'About', description: 'The story behind MelanoTresses' },
  { to: '/the-method', label: 'MelanoTresses Method', description: 'Care. Educate. Beautify.' },
  { to: '/services', label: 'Services', description: 'Consultation, Care, Styling' },
  { to: '/results', label: 'Testimonials', description: 'See the difference' },
  { to: '/trichology-101', label: 'Trichology 101', description: 'Understand your hair & scalp' },
]

export const NAV_FOOTER = [
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
  { to: '/policies', label: 'Policies' },
  ]
