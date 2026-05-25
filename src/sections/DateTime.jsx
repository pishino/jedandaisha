import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import OrnamentDivider from '../components/OrnamentDivider'
import Countdown from '../components/Countdown'

gsap.registerPlugin(ScrollTrigger)

export default function DateTime() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(contentRef.current,
      { y: 28, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          toggleActions: 'play none none none',
        },
      })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="card-panel">
      <div className="card-body">
        <div ref={contentRef} style={{ lineHeight: 1.15 }}>
          <p className="t-label" style={{ marginBottom: '0.15em' }}>On Saturday</p>
          <p className="t-display" style={{ marginBottom: '0.1em' }}>20th June 2026</p>
          <p className="t-label" style={{ marginBottom: '0.6em' }}>by 1100 hours (11:00am)</p>
          <Countdown />
        </div>
      </div>

      <div className="section-ornament">
        <OrnamentDivider />
      </div>
    </section>
  )
}
