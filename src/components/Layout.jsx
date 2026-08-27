import { lazy, Suspense, useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, MessageCircle } from 'lucide-react'
import { Instagram, Facebook } from './SocialIcons'
import {
  NAV_PRIMARY, NAV_FOOTER, CTA_PRIMARY, CTA_NAV, CTA_SECONDARY, ADDRESS, OPENING_HOURS,
} from '../data'
import { Wordmark } from './Logo'

const ACUITY = 'https://melanotresses.as.me/'
const MelanoChatWidget = lazy(() => import('../modules/chat/MelanoChatWidget'))

/*
 * Slide-out drawer navigation for every breakpoint. The overlay dims the page,
 * the panel slides from the right, and body scroll locks while it is open.
 */
function Drawer({ open, onClose, firstLinkRef }) {
  return (
    <>
      {/* overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-cocoa/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <nav
        id="site-menu"
        aria-label="Main menu"
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col bg-white shadow-lift transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-8 pt-7">
          <span className="eyebrow">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full text-cocoa hover:bg-cocoa/[0.05]"
          >
            <X size={22} />
          </button>
        </div>

        <ul className="flex flex-1 flex-col justify-center gap-1 px-8 lg:justify-start lg:pt-16">
          {/*
            Staggered link reveal: each link slides in from the right with a
            cascading delay once the panel is open, and resets instantly on
            close so reopening replays the cascade. Reduced-motion users get
            the links in place immediately (global reduced-motion CSS zeroes
            the transition).
          */}
          {NAV_PRIMARY.map((l, i) => (
            <li
              key={l.to}
              style={{ transitionDelay: open ? `${180 + i * 55}ms` : '0ms' }}
              className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}
            >
              <NavLink
                to={l.to}
                end={l.to === '/'}
                ref={i === 0 ? firstLinkRef : undefined}
                tabIndex={open ? undefined : -1}
                className={({ isActive }) =>
                  `group flex items-start py-2.5 font-head text-[1.7rem] leading-tight tracking-wide transition-colors ${
                    isActive ? 'text-bark' : 'text-cocoa hover:text-bark'
                  }`
                }
              >
                <span className="flex flex-col">
                  <span>{l.label}</span>
                  {l.description && (
                    <span className="mt-1 max-h-8 overflow-hidden font-head text-[1rem] italic leading-tight tracking-normal text-cocoa/55 opacity-100 transition-[max-height,opacity,color] duration-300 group-hover:text-bark/70 lg:max-h-0 lg:opacity-0 lg:group-focus-visible:max-h-8 lg:group-focus-visible:opacity-100 lg:group-hover:max-h-8 lg:group-hover:opacity-100">
                      {l.description}
                    </span>
                  )}
                </span>
              </NavLink>
            </li>
          ))}
          <li
            style={{ transitionDelay: open ? `${180 + NAV_PRIMARY.length * 55}ms` : '0ms' }}
            className={`mt-4 border-t border-cocoa/10 pt-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
          >
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {NAV_FOOTER.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  tabIndex={open ? undefined : -1}
                  className={({ isActive }) =>
                    `py-1.5 font-body text-sm tracking-wide ${
                      isActive ? 'text-bark' : 'text-cocoa/70 hover:text-bark'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </li>
        </ul>

        <div className="px-8 pb-9">
          <Link to="/book" tabIndex={open ? undefined : -1} className="btn-copper w-full">
            {CTA_NAV}
          </Link>
          <div className="mt-6 flex gap-3">
            <a
              href="https://instagram.com/melanotresses"
              target="_blank"
              rel="noreferrer"
              aria-label="MelanoTresses on Instagram"
              tabIndex={open ? undefined : -1}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cocoa/20 text-cocoa hover:bg-cocoa/[0.05]"
            >
              <Instagram size={17} />
            </a>
            <a
              href="https://facebook.com/melanotresses"
              target="_blank"
              rel="noreferrer"
              aria-label="MelanoTresses on Facebook"
              tabIndex={open ? undefined : -1}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cocoa/20 text-cocoa hover:bg-cocoa/[0.05]"
            >
              <Facebook size={17} />
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}

/* Subtle sticky booking bar on small screens, shown after the visitor scrolls. */
function MobileBookingBar() {
  const [show, setShow] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (pathname === '/book') return null

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-cocoa/10 bg-paper/95 px-4 py-3 backdrop-blur transition-transform duration-300 sm:hidden ${
        show ? 'translate-y-0' : 'translate-y-full pointer-events-none'
      }`}
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center gap-2">
        <Link to="/book" tabIndex={show ? undefined : -1} className="btn-copper flex-1 px-4 py-3 text-[12px]">
          {CTA_NAV}
        </Link>
        <Link
          to="/contact"
          tabIndex={show ? undefined : -1}
          aria-label={CTA_SECONDARY}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cocoa/25 text-cocoa"
        >
          <MessageCircle size={19} aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

/*
 * PromoStrip — rotating announcement bar above the header. Messages rotate
 * every five seconds and each announcement links to a relevant page.
 */
const PROMOS = [
  { label: 'Specialised Textured hair care, styling and Trichology', href: '/services' },
  { label: 'Based in North East England est. 2018', href: '/services' },
  { label: 'Begin Your hair journey with our Trichology-led Consultation', href: '/book' },
  { label: '6, 4 or 3 month Hair Care Plans', href: '/programs' },
]

function PromoStrip() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => setActive((p) => (p + 1) % PROMOS.length), 5000)
    return () => window.clearInterval(id)
  }, [])
  return (
    <div className="overflow-hidden bg-sand">
      <div className="container-x">
        <div className="relative flex min-h-8 items-center justify-center py-2 text-center font-body text-[10px] font-semibold uppercase leading-tight tracking-[0.16em] text-cocoa sm:h-9 sm:min-h-0 sm:py-0 sm:text-[11px] sm:tracking-[0.22em]">
          {PROMOS.map((msg, idx) => (
            <span
              key={msg.label}
              aria-hidden={idx !== active}
              className={`absolute max-w-[calc(100vw-2rem)] whitespace-normal transition-opacity duration-300 sm:whitespace-nowrap ${
                idx === active ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <Link
                to={msg.href}
                tabIndex={idx === active ? 0 : -1}
                className="underline decoration-cocoa/40 underline-offset-4 hover:text-bark"
              >
                {msg.label}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Layout({ children }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const toggleRef = useRef(null)
  const firstLinkRef = useRef(null)

  useEffect(() => {
    setOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  // Lock body scroll, focus the first link on open, restore focus on close.
  // Compensate for the scrollbar so the page does not shift when the drawer opens.
  useEffect(() => {
    if (open) {
      const sw = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      if (sw > 0) document.body.style.paddingRight = `${sw}px`
      const t = setTimeout(() => firstLinkRef.current?.focus(), 350)
      return () => {
        clearTimeout(t)
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
      }
    }
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cocoa focus:px-5 focus:py-3 focus:font-body focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <PromoStrip />
      <header className="sticky top-0 z-30 border-b border-cocoa/[0.07] bg-paper/90 backdrop-blur">
        <div className="container-x flex items-center justify-between py-5">
          <button
            type="button"
            ref={toggleRef}
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label="Open menu"
            className="flex items-center gap-2.5 text-cocoa"
          >
            <Menu size={22} strokeWidth={1.5} />
            <span className="hidden font-body text-[11px] font-semibold uppercase tracking-[0.2em] sm:inline">
              Menu
            </span>
          </button>

          <Link
            to="/"
            aria-label="MelanoTresses home"
            className="absolute left-1/2 -translate-x-1/2 !outline-none focus-visible:opacity-70"
          >
            <Wordmark />
          </Link>

          <Link
            to="/book"
            className="font-head text-[15px] italic tracking-[0.04em] text-cocoa hover:text-bark"
          >
            Book
          </Link>
        </div>
      </header>

      <Drawer open={open} onClose={() => setOpen(false)} firstLinkRef={firstLinkRef} />

      <main id="main" className="flex-1">{children}</main>

      <MobileBookingBar />

      {pathname !== '/book' && !open && (
        <Suspense fallback={null}>
          <MelanoChatWidget />
        </Suspense>
      )}

      <FooterCurrent />
    </div>
  )
}

function FooterCurrent() {
  return (
      <footer className="border-t border-cocoa/10 bg-white text-cocoa">
        <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cocoa/80">
              Trichology-led textured hair and scalp care in Newcastle upon Tyne. Founded 2018.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://instagram.com/melanotresses"
                target="_blank"
                rel="noreferrer"
                aria-label="MelanoTresses on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cocoa/20 hover:bg-paper"
              >
                <Instagram size={17} />
              </a>
              <a
                href="https://facebook.com/melanotresses"
                target="_blank"
                rel="noreferrer"
                aria-label="MelanoTresses on Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cocoa/20 hover:bg-paper"
              >
                <Facebook size={17} />
              </a>
            </div>
          </div>

          <nav aria-label="Footer — pages">
            <h2 className="eyebrow">Explore</h2>
            <ul className="mt-4 text-sm">
              {NAV_PRIMARY.map((l) => (
                <li key={l.to}><Link to={l.to} className="block py-2 text-cocoa/80 hover:text-bark">{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — more">
            <h2 className="eyebrow">More</h2>
            <ul className="mt-4 text-sm">
              {NAV_FOOTER.map((l) => (
                <li key={l.to}><Link to={l.to} className="block py-2 text-cocoa/80 hover:text-bark">{l.label}</Link></li>
              ))}
              <li><Link to="/book" className="block py-2 text-cocoa/80 hover:text-bark">{CTA_PRIMARY}</Link></li>
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow">Visit</h2>
            <address className="mt-4 text-sm not-italic leading-relaxed text-cocoa/80">
              {ADDRESS.line1}<br />
              {ADDRESS.city}<br />
              {ADDRESS.postcode}
            </address>
            <dl className="mt-4 space-y-0.5 text-sm text-cocoa/80">
              {OPENING_HOURS.map(([day, hrs]) => (
                <div key={day} className="flex justify-between gap-4">
                  <dt>{day}</dt>
                  <dd className={hrs === 'Closed' ? 'text-cocoa/50' : ''}>{hrs}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="border-t border-cocoa/10">
          <div className="container-x flex flex-col gap-2 py-6 text-xs text-cocoa/70 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} MelanoTresses. All rights reserved.</p>
            <p className="uppercase tracking-[0.14em]">Care · Educate · Beautify</p>
          </div>
        </div>
      </footer>
  )
}
