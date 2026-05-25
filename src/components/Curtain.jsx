import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'

export default function Curtain({ onReveal, onRevealComplete }) {
  const curtainRef  = useRef(null)
  const ankaraRef   = useRef(null)
  const monogramRef = useRef(null)
  const captionRef  = useRef(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.fromTo(monogramRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out', delay: 0.5 })
    gsap.fromTo(captionRef.current,
      { opacity: 0 },
      { opacity: 0.55, duration: 1.1, ease: 'power2.out', delay: 1.6 })
  }, [])

  function handleReveal() {
    if (dismissed) return
    setDismissed(true)
    onReveal()

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      curtainRef.current.style.display = 'none'
      onRevealComplete?.()
      return
    }

    const tl = gsap.timeline()

    // Text + Ankara fade out together
    tl.to(monogramRef.current, { opacity: 0, y: -18, duration: 0.55, ease: 'power2.in' })
      .to(captionRef.current,  { opacity: 0, duration: 0.3 }, '<')
      .to(ankaraRef.current,   { opacity: 0, duration: 1.1, ease: 'power2.in' }, '<0.15')
      // Curtain resolves to parchment colour, then fades to reveal card
      .to(curtainRef.current,  { backgroundColor: '#bcc3ce', duration: 0.4 }, '-=0.2')
      .to(curtainRef.current,  { opacity: 0, duration: 1.0, ease: 'power2.inOut', delay: 0.1 })
      .call(() => {
        curtainRef.current.style.display = 'none'
        onRevealComplete?.()
      })
  }

  return (
    <div
      ref={curtainRef}
      onClick={handleReveal}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        backgroundColor: '#0a0608',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        overflow: 'hidden',
      }}
      role="button"
      tabIndex={0}
      aria-label="Press to begin"
      onKeyDown={e => e.key === 'Enter' && handleReveal()}
    >
      {/* Ankara wax print background */}
      <div
        ref={ankaraRef}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/ankara-circles.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.82,
        }}
      />

      {/* Dark overlay — keeps text legible over the pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10, 6, 8, 0.52)',
          pointerEvents: 'none',
        }}
      />

      {/* Names + date */}
      <div
        ref={monogramRef}
        style={{
          position: 'relative',
          zIndex: 1,
          fontFamily: "'Cormorant Garamond', serif",
          textAlign: 'center',
          color: '#f0ece4',
          opacity: 0,
          lineHeight: 1.15,
        }}
      >
        <div style={{
          fontSize: 'clamp(2rem, 7vw, 4.5rem)',
          fontWeight: 300,
          letterSpacing: '0.18em',
        }}>
          Jed &amp; Aisha
        </div>
        <div style={{
          fontSize: 'clamp(0.65rem, 1.6vw, 0.85rem)',
          fontWeight: 300,
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          marginTop: '0.65rem',
          opacity: 0.72,
        }}>
          20th June, 2026
        </div>
      </div>

      {/* Prompt */}
      <p
        ref={captionRef}
        style={{
          position: 'relative',
          zIndex: 1,
          fontFamily: "'EB Garamond', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
          color: '#f0ece4',
          opacity: 0,
          marginTop: '2rem',
          letterSpacing: '0.06em',
        }}
      >
        Press anywhere to begin
      </p>
    </div>
  )
}
