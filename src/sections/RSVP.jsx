import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const CONTACTS = [
  { name: 'Shuaibu\nHaruna Audu',    phone: '08036627273', display: '0803 662 7273' },
  { name: 'Panam\nAgboh',            phone: '08033375606', display: '0803 337 5606' },
  { name: 'Ishaku Audu\nTheophilus', phone: '08033176329', display: '0803 317 6329' },
]

export default function RSVP() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef   = useRef([])

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        toggleActions: 'play none none none',
      },
    })

    tl.fromTo(headingRef.current,
      { scale: 0.7, opacity: 0 },
      { scale: 1,   opacity: 1, duration: 0.65, ease: 'back.out(1.7)' },
      0.2)

    tl.fromTo(cardsRef.current.filter(Boolean),
      { y: 24, opacity: 0 },
      { y: 0,  opacity: 1, duration: 0.55, ease: 'power2.out', stagger: 0.12 },
      0.6)
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="card-panel">
      <div className="monogram-bg" aria-hidden="true">J &amp; A</div>

      <div className="card-body" style={{ position: 'relative', zIndex: 2 }}>
        <h2 ref={headingRef} className="t-display" style={{ letterSpacing: '0.3em' }}>RSVP</h2>

        <div className="rsvp-grid gap-md">
          {CONTACTS.map((c, i) => (
            <div key={i} ref={el => { cardsRef.current[i] = el }} className="rsvp-cell t-detail">
              {c.name.split('\n').map((line, j) => <p key={j}>{line}</p>)}
              <a href={`tel:+234${c.phone.slice(1)}`} className="t-detail">{c.display}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
