import { useEffect, useState } from 'react'

/* Classic XP taskbar clock (HH:MM AM/PM). */
export default function Clock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15000)
    return () => clearInterval(t)
  }, [])

  const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  return (
    <span className="xp-clock" title={now.toDateString()}>
      {time}
    </span>
  )
}
