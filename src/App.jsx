import { useRef, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useAudio } from './hooks/useAudio'
import Curtain from './components/Curtain'
import Families from './sections/Families'
import Names from './sections/Names'
import DateTime from './sections/DateTime'
import Ceremony from './sections/Ceremony'
import Reception from './sections/Reception'
import RSVP from './sections/RSVP'

gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.defaults({
  start: 'top center',
  toggleActions: 'play none none none',
})

export default function App() {
  const { init, toggleMute, muted, started } = useAudio('/audio/Pulp_Fiction.mp3')
  const flowerTLRef = useRef(null)
  const flowerBRRef = useRef(null)

  const moveCleanupRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      moveCleanupRef.current?.()
    }
  }, [])

  const startProximity = useCallback(() => {
    function attract(ref, mx, my) {
      if (!ref.current) return
      const r = ref.current.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top  + r.height / 2
      const dx = mx - cx
      const dy = my - cy
      const dist = Math.hypot(dx, dy)
      const maxD = 420
      if (dist >= maxD) {
        gsap.to(ref.current, { x: 0, y: 0, duration: 1.4, ease: 'power2.out', overwrite: 'auto' })
        return
      }
      const f = (1 - dist / maxD) * 0.12
      gsap.to(ref.current, { x: dx * f, y: dy * f, duration: 0.8, ease: 'power2.out', overwrite: 'auto' })
    }

    const handler = e => {
      attract(flowerTLRef, e.clientX, e.clientY)
      attract(flowerBRRef, e.clientX, e.clientY)
    }
    window.addEventListener('mousemove', handler, { passive: true })
    moveCleanupRef.current = () => window.removeEventListener('mousemove', handler)
  }, [])

  function handleRevealComplete() {
    const tl = gsap.timeline({
      onComplete: () => {
        window.dispatchEvent(new CustomEvent('curtain-done'))
        startProximity()
      },
    })

    tl.fromTo(flowerTLRef.current,
        { opacity: 0, x: -40, y: -30 },
        { opacity: 1, x: 0,   y: 0,  duration: 1.0, ease: 'power3.out' }, 0)
      .fromTo(flowerBRRef.current,
        { opacity: 0, x: 40,  y: 30 },
        { opacity: 1, x: 0,   y: 0,  duration: 1.0, ease: 'power3.out' }, 0.1)
  }

  return (
    <>
      <Curtain onReveal={init} onRevealComplete={handleRevealComplete} />

      {/* Flowers above content (z-index 3) */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
        <img
          ref={flowerTLRef}
          src="/flowers/blue-peonies.png"
          className="card-frame__flower card-frame__flower--tl"
          style={{ opacity: 0 }}
          alt=""
        />
        <img
          ref={flowerBRRef}
          src="/flowers/red-peonies.png"
          className="card-frame__flower card-frame__flower--br"
          style={{ opacity: 0 }}
          alt=""
        />
      </div>

      <button
        className={`mute-toggle${started ? ' visible' : ''}`}
        onClick={toggleMute}
        aria-label={muted ? 'Unmute music' : 'Mute music'}
        title={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? '🔇' : '🔊'}
      </button>

      <main onClick={e => {
        if (e.target.closest('a, button')) return
        const section = e.target.closest('.card-panel')
        if (!section) return
        const next = section.nextElementSibling
        if (next) {
          const targetY = next.getBoundingClientRect().top + window.scrollY
          window.scrollTo({ top: targetY, behavior: 'smooth' })
        }
      }}>
        <Families />
        <Names />
        <DateTime />
        <Ceremony />
        <Reception />
        <RSVP />
      </main>
    </>
  )
}
