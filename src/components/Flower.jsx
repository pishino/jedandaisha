import { forwardRef } from 'react'

const META = {
  'flower-top-right':         { color: '#1e3560', label: 'Blue peonies — top left' },
  'flower-bottom-left':       { color: '#6e1018', label: 'Crimson peony — bottom right' },
  'flower-back-top-left':     { color: '#6e1018', label: 'Crimson + cream peonies — top right' },
  'flower-back-bottom-right': { color: '#1e3560', label: 'Blue peonies — bottom left' },
}

const Flower = forwardRef(function Flower({ id, style = {} }, ref) {
  const meta = META[id] || { color: '#888', label: id }
  return (
    <div ref={ref} className="flower" style={style} aria-hidden="true">
      <img
        src={`/flowers/${id}.png`}
        alt=""
        loading="lazy"
        decoding="async"
        onError={e => {
          e.target.style.display = 'none'
          e.target.nextSibling.style.display = 'flex'
        }}
      />
      <div
        className="flower-placeholder"
        style={{
          display: 'none',
          background: `radial-gradient(circle, ${meta.color}40, ${meta.color}15)`,
          border: `1px dashed ${meta.color}60`,
          color: meta.color,
          fontSize: 9,
          fontStyle: 'italic',
          fontFamily: 'serif',
        }}
      >
        {meta.label}
      </div>
    </div>
  )
})

export default Flower
