import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import OrnamentDivider from '../components/OrnamentDivider'

export default function Families() {
  const sectionRef = useRef(null)
  const linesRef   = useRef([])

  useEffect(() => {
    gsap.set(linesRef.current.filter(Boolean), { opacity: 0, y: 20 })

    const handler = () => {
      gsap.to(linesRef.current.filter(Boolean), {
        opacity: 1, y: 0,
        duration: 0.8, ease: 'power2.out', stagger: 0.1, delay: 0.25,
      })
    }
    window.addEventListener('curtain-done', handler, { once: true })
    return () => window.removeEventListener('curtain-done', handler)
  }, [])

  const set = i => el => { linesRef.current[i] = el }

  return (
    <section ref={sectionRef} className="card-panel">
      <div className="card-body">
        <p ref={set(0)} className="t-label gap-sm">The Families of</p>

        <p ref={set(1)} className="t-family gap-xs">Charles &amp; Susan</p>
        <p ref={set(2)} className="t-family">Theophilus</p>

        <p ref={set(3)} className="t-label gap-sm">— and —</p>

        <p ref={set(4)} className="t-family gap-xs">Abdulganiyu &amp; Hafsat</p>
        <p ref={set(5)} className="t-family">Sofenwa</p>

        <div ref={set(6)} className="gap-md">
          <p className="t-body">request the honour of your presence to join in celebrating</p>
          <p className="t-body">the beginning of the lifetime journey in marriage</p>
          <p className="t-body">of their children</p>
        </div>
      </div>

      <div className="section-ornament" ref={set(7)}>
        <OrnamentDivider />
      </div>
    </section>
  )
}
