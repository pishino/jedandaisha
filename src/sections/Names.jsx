import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import OrnamentDivider from '../components/OrnamentDivider'

gsap.registerPlugin(ScrollTrigger)

export default function Names() {
  const sectionRef = useRef(null)
  const name1Ref   = useRef(null)
  const andRef     = useRef(null)
  const name2Ref   = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        toggleActions: 'play none none none',
      },
    })

    tl.fromTo(name1Ref.current,
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      { clipPath: 'inset(0 0% 0 0)',   opacity: 1, duration: 0.9, ease: 'power3.out' },
      0)

    tl.fromTo(andRef.current,
      { scale: 0.85, opacity: 0 },
      { scale: 1,    opacity: 1, duration: 0.6, ease: 'back.out(1.4)' },
      0.5)

    tl.fromTo(name2Ref.current,
      { clipPath: 'inset(0 0% 0 100%)', opacity: 0 },
      { clipPath: 'inset(0 0% 0 0%)',   opacity: 1, duration: 0.9, ease: 'power3.out' },
      0.3)
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="card-panel">
      <div className="card-body">
        <div ref={name1Ref} style={{ overflow: 'hidden' }}>
          <h2 className="t-display">Jedidiah Jinton<br />Mosimabale</h2>
        </div>

        <div ref={andRef} className="and-row gap-xs">
          <span className="t-script">and</span>
        </div>

        <div ref={name2Ref} style={{ overflow: 'hidden' }}>
          <h2 className="t-display">Aisha Titilola<br />Abdulganiyu</h2>
        </div>
      </div>

      <div className="section-ornament">
        <OrnamentDivider />
      </div>
    </section>
  )
}
