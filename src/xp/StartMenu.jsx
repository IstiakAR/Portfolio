import { useEffect, useRef, useState } from 'react'
import { icons } from './icons.js'

/* XP-style Start menu: user header, pinned programs + All Programs on the
   left, blue "places" column on the right, Log Off / Turn Off footer.
   Closes on outside click / Escape. */

/* Left column: programs only. Anything also listed as a "place" on the
   right must NOT appear here — otherwise both columns open the same app. */
const PINNED_ORDER = ['projects', 'resume', 'live-demos', 'contact', 'terminal', 'minesweeper']
const OVERFLOW_ORDER = []

/* Right column: XP place names — only apps that are not left-column programs. */
const PLACES = [
  { id: 'about', label: 'My Computer', icon: icons.myComputer },
  { id: 'skills', label: 'Control Panel', icon: icons.harddriveUsb },
  { id: 'recycle-bin', label: 'Recycle Bin', icon: icons.recycleBin },
]

function AllProgramsArrow() {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" aria-hidden="true">
      <defs>
        <linearGradient id="ap-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fdb5f" />
          <stop offset="0.5" stopColor="#4ca828" />
          <stop offset="1" stopColor="#2f7d14" />
        </linearGradient>
      </defs>
      <path
        d="M2 4.5 L8.5 10.5 L2 16.5 Z"
        fill="url(#ap-green)"
        stroke="#25650e"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 4.5 L17 10.5 L10.5 16.5 Z"
        fill="url(#ap-green)"
        stroke="#25650e"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LogOffIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <defs>
        <linearGradient id="lo-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fd0ff" />
          <stop offset="0.5" stopColor="#3d8ce8" />
          <stop offset="1" stopColor="#1a5cc0" />
        </linearGradient>
      </defs>
      <rect x="2.5" y="2.5" width="17" height="17" rx="2.5" fill="url(#lo-blue)" stroke="#123f8f" />
      <path
        d="M11 5.5v7M11 12.5l-3.2-3M11 12.5l3.2-3"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M6.5 15.5h9" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function StartMenu({ apps, onOpenApp, onClose, onShutdown, closing = false }) {
  const menuRef = useRef(null)
  const [allPrograms, setAllPrograms] = useState(false)

  useEffect(() => {
    const onDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        if (e.target.closest('.xp-start-button')) return
        onClose()
      }
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

  const byId = Object.fromEntries(apps.map((a) => [a.id, a]))
  const pinned = PINNED_ORDER.map((id) => byId[id]).filter(Boolean)
  const overflow = OVERFLOW_ORDER.map((id) => byId[id]).filter(Boolean)
  const visible = allPrograms ? [...pinned, ...overflow] : pinned

  const openApp = (app) => {
    onOpenApp(app)
    onClose()
  }

  return (
    <div
      className={`xp-startmenu${closing ? ' closing' : ''}`}
      ref={menuRef}
      role="menu"
      aria-label="Start menu"
    >
      <div className="xp-startmenu-header">
        <img src={icons.user} alt="" width="42" height="42" />
        <span>Istiak Ahammed Rhyme</span>
      </div>
      <div className="xp-startmenu-body">
        <ul className="xp-startmenu-programs">
          {visible.map((app, i) => (
            <li key={app.id}>
              <button
                type="button"
                role="menuitem"
                className={i === 0 ? 'featured' : ''}
                onClick={() => openApp(app)}
              >
                <img src={app.icon} alt="" width={i === 0 ? 30 : 24} height={i === 0 ? 30 : 24} />
                <span>{app.startMenuLabel || app.title}</span>
              </button>
            </li>
          ))}
          {overflow.length > 0 && (
            <li>
              <button
                type="button"
                role="menuitem"
                className={`xp-startmenu-allprogs${allPrograms ? ' expanded' : ''}`}
                onClick={() => setAllPrograms((v) => !v)}
                aria-expanded={allPrograms}
              >
                <AllProgramsArrow />
                <span>All Programs</span>
              </button>
            </li>
          )}
        </ul>
        <div className="xp-startmenu-divider" />
        <ul className="xp-startmenu-actions">
          {PLACES.map((place) => {
            const app = byId[place.id]
            if (!app) return null
            return (
              <li key={place.label}>
                <button type="button" role="menuitem" onClick={() => openApp(app)}>
                  <img src={place.icon} alt="" width="24" height="24" />
                  <span>{place.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="xp-startmenu-footer">
        <button
          type="button"
          role="menuitem"
          onClick={() => {
            onClose()
            window.location.reload()
          }}
        >
          <LogOffIcon />
          <span>Log Off</span>
        </button>
        <button
          type="button"
          role="menuitem"
          onClick={() => {
            onShutdown?.()
            onClose()
          }}
        >
          <img src={icons.shutdown} alt="" width="22" height="22" />
          <span>Turn Off Computer</span>
        </button>
      </div>
    </div>
  )
}
