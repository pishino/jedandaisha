import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import OrnamentDivider from '../components/OrnamentDivider'

gsap.registerPlugin(ScrollTrigger)

function splitLetters(text, ref) {
  return (
    <h2 ref={ref} className="t-display" aria-label={text}>
      {text.split('').map((ch, i) => (
        <span key={i} style={{ display: 'inline-block', whiteSpace: ch === ' ' ? 'pre' : 'normal' }}>
          {ch}
        </span>
      ))}
    </h2>
  )
}

export default function Reception() {
  const sectionRef  = useRef(null)
  const headingRef  = useRef(null)
  const addressRefs = useRef([])

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        toggleActions: 'play none none none',
      },
    })

    if (headingRef.current) {
      tl.fromTo(headingRef.current.querySelectorAll('span'),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.04 },
        0.1)
    }

    tl.fromTo(addressRefs.current.filter(Boolean),
      { y: 18, opacity: 0 },
      { y: 0,  opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1 },
      0.75)
  }, { scope: sectionRef })

  const set = i => el => { addressRefs.current[i] = el }

  return (
    <section ref={sectionRef} className="card-panel">
      <div className="card-body">
        {splitLetters('RECEPTION', headingRef)}

        <p ref={set(0)} className="t-label gap-md">Follows immediately after the Ceremony</p>
        <p ref={set(1)} className="t-label gap-xs">At the Banquet Hall of</p>
        <p ref={set(2)} className="t-family gap-xs">NAF Conference Centre and Suites</p>
        <p ref={set(3)} className="t-detail gap-xs">Plot 307, Ahmadu Bello Way, Kado</p>
        <p ref={set(4)} className="t-detail">Abuja 900108 FCT, Nigeria</p>
      </div>

      <div className="section-ornament" ref={set(5)}>
        <OrnamentDivider />
      </div>
    </section>
  )
}
