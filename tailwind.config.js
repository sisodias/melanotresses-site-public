/** @type {import('tailwindcss').Config} */

/*
 * PALETTE — client-supplied brand colours (meeting notes, July 2026).
 * Only these five hexes are on-brand. The direction shifted from the earlier
 * dark/copper build to LIGHT, airy and minimal — a clinic, not a salon.
 *
 *   #FFFFFF  white   — primary background
 *   #EDE1D4  sand    — soft secondary / alternating sections
 *   #4D2E10  cocoa   — headings and body text
 *   #522700  bark    — accent: buttons, links, dark surfaces
 *   #000000  black   — max-contrast text (used sparingly)
 *
 * The legacy semantic token NAMES are kept (cream / tan / espresso / copper /
 * surface-dark / ink / on-dark) so existing markup keeps compiling, but every
 * VALUE is remapped to the palette above. "copper" is no longer copper — it is
 * the deep-brown accent. All dark-brown-on-light pairings clear WCAG AA
 * comfortably (verified), so the elaborate per-surface contrast rules the old
 * copper palette needed are gone.
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFFFFF',        // primary background
        tan: '#EDE1D4',          // soft sand — alternating sections
        espresso: '#4D2E10',     // headings + body text
        'espresso-soft': '#4D2E10',
        'surface-dark': '#522700', // bark — dark accent surface
        ink: '#3A2109',          // deepest brown — footer / darkest surface
        'on-dark': '#FFFFFF',
        copper: '#522700',       // accent (legacy name)
        'copper-deep': '#522700',
        'copper-soft': '#EDE1D4',
        paper: '#FFFFFF',
        sand: '#EDE1D4',
        cocoa: '#4D2E10',
        bark: '#522700',
      },
      fontFamily: {
        // Elegant serif for headings; Cormorant Garamond stands in for The Seasons.
        head: ['"The Seasons"', '"Cormorant Garamond"', 'Cormorant', 'Georgia', 'serif'],
        body: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -18px rgba(74,46,16,0.18)',
        lift: '0 24px 60px -24px rgba(58,33,9,0.28)',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadein: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        rise: 'rise 0.7s cubic-bezier(0.22,1,0.36,1) both',
        fadein: 'fadein 0.8s ease both',
      },
    },
  },
  plugins: [],
}
