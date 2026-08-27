/* Minimal serif wordmark used by the header and footer. */

export function Wordmark({ tone = 'light', size = 'md' }) {
  const onDark = tone === 'dark'
  const text = size === 'lg' ? 'text-3xl' : 'text-xl'
  return (
    <span
      className={`font-body font-medium uppercase tracking-[0.28em] ${text} ${
        onDark ? 'text-white' : 'text-cocoa'
      }`}
    >
      Melanotresses
    </span>
  )
}

/* Optional outline mark for future brand treatments. */
export function AfroMark({ className = '', size = 34 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M32 6c-11.5 0-20 6.6-20 15.6 0 6.2 4 11 10 13.2" />
      <path d="M32 6c11.5 0 20 6.6 20 15.6 0 6.2-4 11-10 13.2" />
      <path d="M25.6 24.5c0-3.6 2.9-6.2 6.4-6.2s6.4 2.6 6.4 6.2c0 4.4-2.6 8.2-6.4 8.2s-6.4-3.8-6.4-8.2z" />
      <path d="M32 32.7v5.1" />
      <path d="M22 46.5c0-4.8 4.5-8.7 10-8.7s10 3.9 10 8.7" />
      <path d="M22 46.5 16.5 58" />
      <path d="M42 46.5 47.5 58" />
    </svg>
  )
}
