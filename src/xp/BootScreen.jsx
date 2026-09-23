import { useEffect, useState } from 'react'

/* iarOS boot preloader — fake "starting up" splash that also
   preloads the wallpaper, then fades out to reveal the desktop. */

const MIN_MS = 2200

const preload = (src) =>
  new Promise((resolve) => {
    const img = new Image()
    img.onload = img.onerror = resolve
    img.src = src
  })

export default function BootScreen({ onDone }) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    let cancelled = false
    const started = performance.now()

    const finish = () => {
      if (cancelled) return
      const rest = Math.max(0, MIN_MS - (performance.now() - started))
      setTimeout(() => {
        setDone(true)
        setTimeout(onDone, 700)
      }, rest)
    }

    Promise.all(['/windows.jpg', '/favicon-dark.png'].map(preload)).then(finish)
    const hardCap = setTimeout(finish, MIN_MS + 2500)

    return () => {
      cancelled = true
      clearTimeout(hardCap)
    }
  }, [onDone])

  return (
    <div
      className={`xp-boot${done ? ' done' : ''}`}
      role="status"
      aria-label="Starting iarOS"
    >
      <div className="xp-boot-logo">
        <img src="/favicon-dark.png" alt="iarOS" className="xp-boot-wordmark" width="120" height="120" />
        <span className="xp-boot-edition">Portfolio Edition</span>
      </div>
      <div className="xp-boot-bar">
        <span className="xp-boot-bar-block" />
      </div>
      <div className="xp-boot-footer">Copyright © Istiak Ahammed Rhyme</div>
    </div>
  )
}