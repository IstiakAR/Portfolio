import { useState, useCallback } from 'react'

/* XP desktop icon: image + label, single-click selects, double-click (or
   double-tap / Enter) opens. Opening is handled by onDoubleClick only, so a
   double-click never spawns two windows. */

export default function DesktopIcon({ app, selected, onSelect, onOpen }) {
  const [hovered, setHovered] = useState(false)

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation()
      onSelect(app.id)
    },
    [app, onSelect]
  )

  const handleDoubleClick = useCallback(
    (e) => {
      e.stopPropagation()
      onOpen(app)
    },
    [app, onOpen]
  )

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onOpen(app)
      }
    },
    [app, onOpen]
  )

  return (
    <button
      type="button"
      className={`xp-desktop-icon ${selected ? 'selected' : ''} ${hovered ? 'hovered' : ''}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Open ${app.title}`}
    >
      <img src={app.icon} alt="" width="32" height="32" draggable="false" />
      <span className="xp-desktop-icon-label">{app.title}</span>
    </button>
  )
}
