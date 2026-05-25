import { useState, useEffect } from 'react'

const TARGET = new Date('2026-06-20T11:00:00')
const pad = n => String(n).padStart(2, '0')

export default function Countdown() {
  const [diff, setDiff] = useState(null)

  useEffect(() => {
    const tick = () => {
      const ms = TARGET - Date.now()
      if (ms <= 0) { setDiff(null); return }
      setDiff({
        d: Math.floor(ms / 86400000),
        h: Math.floor((ms % 86400000) / 3600000),
        m: Math.floor((ms % 3600000) / 60000),
        s: Math.floor((ms % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  if (!diff) return null

  return (
    <p className="countdown" aria-live="polite">
      {diff.d}d &nbsp;·&nbsp; {pad(diff.h)}h &nbsp;·&nbsp; {pad(diff.m)}m &nbsp;·&nbsp; {pad(diff.s)}s
    </p>
  )
}
