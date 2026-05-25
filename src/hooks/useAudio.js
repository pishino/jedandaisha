import { useRef, useState, useCallback } from 'react'
import { Howl } from 'howler'

export function useAudio(src) {
  const howlRef = useRef(null)
  const [muted, setMuted] = useState(false)
  const [started, setStarted] = useState(false)

  const init = useCallback(() => {
    if (howlRef.current) return
    howlRef.current = new Howl({
      src: [src],
      loop: true,
      volume: 0,
      html5: true,
    })
    howlRef.current.play()
    howlRef.current.fade(0, 0.18, 3000)
    setStarted(true)
  }, [src])

  const toggleMute = useCallback(() => {
    if (!howlRef.current) return
    if (muted) {
      howlRef.current.fade(0, 0.18, 400)
    } else {
      howlRef.current.fade(0.18, 0, 400)
    }
    setMuted(m => !m)
  }, [muted])

  return { init, toggleMute, muted, started }
}
