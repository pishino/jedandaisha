export default function FiligreeBorder({ style = {} }) {
  const S = '#6b1a24'
  return (
    <svg
      viewBox="0 0 400 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', ...style }}
    >
      {/* ── Outer border line ── */}
      <rect x="4" y="4" width="392" height="552" stroke={S} strokeWidth="1.2" />
      {/* ── Inner border line ── */}
      <rect x="10" y="10" width="380" height="540" stroke={S} strokeWidth="0.6" />

      {/* ── Corner ornament: top-left ── */}
      <g transform="translate(4,4)">
        {/* cross */}
        <line x1="0" y1="6" x2="0" y2="-6" stroke={S} strokeWidth="0.8" transform="translate(6,6)" />
        <line x1="-6" y1="0" x2="6" y2="0"  stroke={S} strokeWidth="0.8" transform="translate(6,6)" />
        {/* curling arms */}
        <path d="M6,6 C6,0 12,0 12,6" stroke={S} strokeWidth="0.6" fill="none" />
        <path d="M6,6 C0,6 0,12 6,12" stroke={S} strokeWidth="0.6" fill="none" />
        <circle cx="6" cy="6" r="1.8" fill={S} />
      </g>

      {/* ── Corner ornament: top-right ── */}
      <g transform="translate(396,4) scale(-1,1)">
        <line x1="0" y1="6" x2="0" y2="-6" stroke={S} strokeWidth="0.8" transform="translate(6,6)" />
        <line x1="-6" y1="0" x2="6" y2="0"  stroke={S} strokeWidth="0.8" transform="translate(6,6)" />
        <path d="M6,6 C6,0 12,0 12,6" stroke={S} strokeWidth="0.6" fill="none" />
        <path d="M6,6 C0,6 0,12 6,12" stroke={S} strokeWidth="0.6" fill="none" />
        <circle cx="6" cy="6" r="1.8" fill={S} />
      </g>

      {/* ── Corner ornament: bottom-left ── */}
      <g transform="translate(4,556) scale(1,-1)">
        <line x1="0" y1="6" x2="0" y2="-6" stroke={S} strokeWidth="0.8" transform="translate(6,6)" />
        <line x1="-6" y1="0" x2="6" y2="0"  stroke={S} strokeWidth="0.8" transform="translate(6,6)" />
        <path d="M6,6 C6,0 12,0 12,6" stroke={S} strokeWidth="0.6" fill="none" />
        <path d="M6,6 C0,6 0,12 6,12" stroke={S} strokeWidth="0.6" fill="none" />
        <circle cx="6" cy="6" r="1.8" fill={S} />
      </g>

      {/* ── Corner ornament: bottom-right ── */}
      <g transform="translate(396,556) scale(-1,-1)">
        <line x1="0" y1="6" x2="0" y2="-6" stroke={S} strokeWidth="0.8" transform="translate(6,6)" />
        <line x1="-6" y1="0" x2="6" y2="0"  stroke={S} strokeWidth="0.8" transform="translate(6,6)" />
        <path d="M6,6 C6,0 12,0 12,6" stroke={S} strokeWidth="0.6" fill="none" />
        <path d="M6,6 C0,6 0,12 6,12" stroke={S} strokeWidth="0.6" fill="none" />
        <circle cx="6" cy="6" r="1.8" fill={S} />
      </g>

      {/* ── Top-center pendant ── */}
      <g transform="translate(200,4)">
        <line x1="0" y1="0" x2="0" y2="7" stroke={S} strokeWidth="0.8" />
        <polygon points="0,7 3.5,12 0,17 -3.5,12" fill={S} />
        <polygon points="0,9 2,12 0,15 -2,12" fill="#bcc3ce" />
      </g>
    </svg>
  )
}
