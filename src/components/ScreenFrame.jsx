import { forwardRef } from 'react'

const S = '#6b1a24'

/* Corner ornament — drawn to align with the CSS border lines.
   Outer circle sits at (14,14) = matches inset:14 outer border.
   Inner accent sits at (20,20) = matches inset:20 inner border.
   Parent positions at top:0/left:0 so SVG coords = screen coords. */
function Corner() {
  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true"
      style={{ width: 44, height: 44 }}>
      {/* Arms running along the border lines toward corner */}
      <line x1="14" y1="2"  x2="14" y2="12" stroke={S} strokeWidth="1.1" />
      <line x1="2"  y1="14" x2="12" y2="14" stroke={S} strokeWidth="1.1" />
      {/* Main filled circle at outer border junction */}
      <circle cx="14" cy="14" r="2.8" fill={S} />
      {/* Curling scroll arms from outer to inner border junction */}
      <path d="M14,14 Q14,20 20,20" stroke={S} fill="none" strokeWidth="0.65" />
      <path d="M14,14 Q20,14 20,20" stroke={S} fill="none" strokeWidth="0.65" />
      {/* Small accent circle at inner border junction */}
      <circle cx="20" cy="20" r="1.6" fill={S} opacity="0.75" />
      {/* Tiny curls at arm tips */}
      <path d="M14,12 Q14,16 18,16" stroke={S} fill="none" strokeWidth="0.5" />
      <path d="M12,14 Q16,14 16,18" stroke={S} fill="none" strokeWidth="0.5" />
    </svg>
  )
}

/* Top-center pendant — hangs from the top border line */
function TopPendant() {
  return (
    <svg viewBox="0 0 22 20" fill="none" aria-hidden="true"
      style={{
        position: 'absolute', top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: 22, height: 20,
      }}>
      <line x1="11" y1="3" x2="11" y2="8" stroke={S} strokeWidth="0.9" />
      <polygon points="11,8 14.5,13.5 11,19 7.5,13.5" fill={S} opacity="0.9" />
      <polygon points="11,10.5 13,13.5 11,16.5 9,13.5" fill="var(--bg)" />
    </svg>
  )
}

/* Full-screen frame: CSS double-line border + SVG corner ornaments.
   Lines stretch with CSS at any screen size, corners stay fixed-size. */
const ScreenFrame = forwardRef(function ScreenFrame(_, ref) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0,
        zIndex: 1, pointerEvents: 'none',
        opacity: 0,
      }}
    >
      {/* Outer border line */}
      <div style={{
        position: 'absolute', inset: 14,
        border: '1.2px solid #6b1a24',
      }} />
      {/* Inner border line */}
      <div style={{
        position: 'absolute', inset: 20,
        border: '0.55px solid #6b1a24',
      }} />

      {/* Top pendant (centered at top) */}
      <TopPendant />

      {/* Corners — positioned so SVG(0,0) = screen corner */}
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        <Corner />
      </div>
      <div style={{ position: 'absolute', top: 0, right: 0, transform: 'scaleX(-1)' }}>
        <Corner />
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, transform: 'scaleY(-1)' }}>
        <Corner />
      </div>
      <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'scale(-1,-1)' }}>
        <Corner />
      </div>
    </div>
  )
})

export default ScreenFrame
