import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import { GOOGLE_REVIEWS_URL } from '../data'
import { Seo, PageHero, SectionHead, CtaBand } from '../components/ui'

/*
 * Client testimonials, supplied by Priscilla on WhatsApp (Namen 21 Aug, Caden and Alina
 * 25 Aug, Lydia 28 Aug) in the clients' own words. Add `photo` to an entry when its
 * client photo is supplied.
 */
const TESTIMONIALS = [
  {
    name: 'Lydia',
    condition: 'Postpartum hair loss',
    quote: `I experienced postpartum hair loss. I was unhappy with how my hair looked and did not feel confident to leave my house with my hair out.

Priscilla asked a lot of questions around my diet and stress levels during my Trichology consultation. After a few months I noticed growth and my hair was no longer shedding a lot. Priscilla gave me confidence in how to look after my hair. Since coming to MelanoTresses my hair has been healthier and fuller. I could not recommend Priscilla enough!

I would also recommend to invest in her bundles. I did the 4-months Crown Revival and my hair has never looked better after just 4 months!`,
  },
  {
    name: 'Namen',
    condition: 'Seborrheic dermatitis',
    quote: `For a while I was experiencing dry and flaky scalp. I tried everything to reduce and stop the dryness, went to different braiders bought all sorts of shampoos, oils, and conditioners. Unfortunately, none of these were able to stop it, until I was recommended MelanoTresses. After my first appointment I was really pleased with the service most especially the intentionality Priscilla shows in her craft, which is very rare to find nowadays. She took her time to diagnose the problem which ended up being Seborrheic Dermatitis and provide a solution as while advising me on what I should do outside our monthly consultations. After that appointment I already started seeing a difference and my scalp felt so much lighter and refreshed, less particles fell on my shirt when I brushed my hair.

7 months later I am glad to say I am no longer battling dry scalp and I am very happy about that.`,
  },
  {
    name: 'Caden',
    condition: 'Seborrheic dermatitis',
    quote: `When I first started, I had really bad flakiness on my scalp that caused me to itch excessively. I was also becoming self-conscious about my hair and scalp health because I had no idea what I was doing wrong.

After recently moving to Newcastle, I found Priscilla, and honestly, it has been one of the best things I’ve done for my hair growth and scalp health. She talked me through exactly what was going on, explaining that I had seborrhoeic dermatitis, what causes it, and which products would be best to help manage and treat it.

With every appointment and throughout the months, my scalp has improved more and more. I genuinely don’t think my hair health, growth, length and overall journey would be anywhere near where it is today without her guidance.

I no longer have the constant itching, and my scalp and hair feel so much more hydrated, healthy and refreshed between appointments. These are things I would never have known how to manage beforehand.

I genuinely cannot recommend Priscilla’s expertise and knowledge highly enough. She has completely transformed my understanding of my hair and scalp.

10/10 — I couldn’t recommend her more!`,
  },
  {
    name: 'Alina',
    condition: 'Heat damage',
    quote: `So, before I started seeing Priscilla i had experienced heat damage from a hairdresser in Spain which led to me looking for a hairdresser in the north of england to save/heal my hair + help me work on my techniques. before i seeked for helped, my hair hadn’t been properly trimmed before so i had split ends, brittleness, different hair textures because of the heat damage, and my porosity had changed. so, i started going to Priscilla and she just completely changed my relationship between me and my hair genuinely, I remember how soft + moistured my hair felt after the first appointment and how clean my ends were i was just in shock. And from there, i continued seeing her every month and we focused on reversing the heat damage, making sure my ends were okay + trimmed, checking my scalp was doing fine, working on hair techniques and how to style my hair as well! After these appointments, I noticed how much my techniques with blow drying especially improved and how moisturised my hair was with the new hair moisturising routine she gave me. My hair was actually starting to retain length and breakage reduced SIGNIFICANTLY wowow.

Now, I feel very very very very happy and pleased with my hair. My hair retains length even when i have knotless braids in, my scalp is very healthy a lot more healthier in comparison to before i started seeing her. My hair doesn’t experience dryness anymore, it isn’t brittle either it’s very soft and clean. One thing i love doing actually is going to Priscilla and asking her to do 2 cornrows for me and i usually keep them in for a while up to 2-8 weeks ish and my hair still retains length because of how well her technique is and the products she uses :)`,
  },
]

/* Real styling work from the studio (Priscilla's own photographs). */
const GALLERY = [
  { label: 'Flat twists, side profile', src: '/images/twists-profile.jpg', note: 'Protective flat twists, freshly installed in the studio.' },
  { label: 'Occasion updo with pearl pin', src: '/images/updo-pearl.jpg', note: 'Occasion and bridal styling: a sleek low updo, pearl-pinned.' },
  { label: 'Flat twists into a low bun', src: '/images/twists-low-bun.jpg', note: 'Flat twists finished into a neat low bun.' },
  { label: 'Blow-out on natural hair', src: '/images/afro-profile.jpg', note: 'A full blow-out on healthy natural hair.' },
  { label: 'Twists, worn loose', src: '/images/twists-side.jpg', note: 'Two-strand twists worn down, studio finish.' },
  { label: 'Fluffy blow-out, full shape', src: '/images/blowout-full.jpg', note: 'A fluffy blow-out with full shape and length.' },
]

function TestimonialCard({ t }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl bg-white p-7 ring-1 ring-cocoa/[0.08] sm:p-8">
      {t.photo && (
        <img src={t.photo} alt={`${t.name}, MelanoTresses client`} loading="lazy" className="mb-6 aspect-[4/3] w-full rounded-xl object-cover" />
      )}
      <span className="inline-flex items-center gap-1 text-bark" aria-label="Five star client">
        {[0, 1, 2, 3, 4].map((n) => (
          <Star key={n} size={14} fill="currentColor" strokeWidth={0} aria-hidden="true" />
        ))}
      </span>
      <blockquote className="mt-4 flex-1 whitespace-pre-line text-sm leading-relaxed text-cocoa/85 sm:text-[15px]">
        {t.quote}
      </blockquote>
      <figcaption className="mt-6 border-t border-cocoa/10 pt-4">
        <p className="font-head text-xl text-cocoa">{t.name}</p>
        <p className="mt-1 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-bark">{t.condition}</p>
      </figcaption>
    </figure>
  )
}

export default function Results() {
  return (
    <>
      <Seo
        title="Client Testimonials | Afro Hair Specialist Newcastle | MelanoTresses"
        description="Client testimonials and real styling work from MelanoTresses, an Afro hair and scalp trichology studio in Newcastle upon Tyne."
      />

      <PageHero
        eyebrow="Testimonials"
        title="See the difference"
        intro="In our clients’ own words, and real work from the studio."
      />

      <section className="section" aria-labelledby="testimonials-heading">
        <div className="container-x">
          <SectionHead eyebrow="Client stories" title="What clients say" />
          <span id="testimonials-heading" className="sr-only">Client testimonials</span>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" className="btn-ghost">
              <Star size={15} fill="currentColor" strokeWidth={0} aria-hidden="true" />
              Read more reviews on Google
            </a>
          </div>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="gallery-heading">
        <div className="container-x">
          <SectionHead
            eyebrow="Transformations"
            title="Real work from the studio"
            intro="Styling from the MelanoTresses studio, always after the hair and scalp have been cared for."
          />
          <span id="gallery-heading" className="sr-only">Transformations</span>

          <div className="columns-2 gap-4 sm:columns-3 lg:gap-6">
            {GALLERY.map((image) => (
              <figure
                key={image.label}
                className="group relative mb-4 aspect-square break-inside-avoid overflow-hidden rounded-2xl lg:mb-6"
              >
                <img
                  src={image.src}
                  alt={image.note}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-cocoa/75 via-cocoa/35 to-transparent px-4 pb-3.5 pt-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                    {image.label}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-2xl rounded-2xl bg-paper p-7 text-center ring-1 ring-cocoa/[0.08] sm:p-9">
            <p className="eyebrow mb-3">Ready when you are</p>
            <h2 className="font-head text-2xl text-cocoa">Start with a conversation</h2>
            <p className="mt-3 text-sm leading-relaxed text-cocoa/75">
              Bring your questions, your routine and the hair or scalp concern you want to understand.
              The first appointment is about finding the right next step.
            </p>
            <Link to="/book" className="btn-copper mt-6">
              Book a consultation <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Bring us the hair you are worried about"
        body="We assess your scalp and hair first, then tell you honestly what we think it needs — including if the answer is rest, a GP, or nothing at all."
      />
    </>
  )
}
