import { useEffect, useRef } from 'react'
import { icons } from './icons.js'

/* XP-style Start menu: user header, pinned apps, and shut down action.
   Closes on outside click / Escape. */

export default function StartMenu({ apps, onOpenApp, onClose, onShutdown }) {
  const menuRef = useRef(null)

  useEffect(() => {
    const onDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) onClose()
    }
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const pinnedApps = apps.filter((a) => a.inStartMenu)

  return (
    <div className="xp-startmenu" ref={menuRef} role="menu" aria-label="Start menu">
      <div className="xp-startmenu-header">
        <img src={icons.myComputer} alt="" width="42" height="42" />
        <span>Portfolio</span>
      </div>
      <div className="xp-startmenu-body">
        <ul className="xp-startmenu-programs">
          {pinnedApps.map((app) => (
            <li key={app.id}>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  onOpenApp(app)
                  onClose()
                }}
              >
                <img src={app.icon} alt="" width="24" height="24" />
                <span>{app.startMenuLabel || app.title}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="xp-startmenu-divider" />
        <ul className="xp-startmenu-actions">
          <li>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                onShutdown?.()
                onClose()
              }}
            >
              <img src={icons.recycleBinSmall} alt="" width="24" height="24" />
              <span>Shut Down...</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
