import { useWindowManager } from './useWindowManager.js'
import { isTop } from './isTop.js'
import SystemTray from './SystemTray.jsx'
import StartMenu from './StartMenu.jsx'
import { useState, useCallback, useRef } from 'react'

/* Quick Launch: small one-click launcher icons (opens app or focuses it). */
function QuickLaunch({ apps, onOpenApp }) {
  const byId = Object.fromEntries(apps.map((a) => [a.id, a]))
  const launchIds = ['projects', 'resume', 'terminal']
  const launchApps = launchIds.map((id) => byId[id]).filter(Boolean)
  return (
    <div className="xp-quicklaunch">
      {launchApps.map((app) => (
        <button
          key={app.id}
          type="button"
          title={app.title}
          aria-label={app.title}
          onClick={() => onOpenApp(app)}
        >
          <img src={app.icon} alt="" width="16" height="16" draggable={false} />
        </button>
      ))}
    </div>
  )
}

/* Bottom XP taskbar: [Start] [window buttons...] [tray + clock]. */

export default function Taskbar({ apps, onShutdown }) {
  const { windows, focusWindow, minimizeWindow, toggleWindow } = useWindowManager()
  const [startOpen, setStartOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const closeTimer = useRef(null)

  const open = useCallback(() => {
    clearTimeout(closeTimer.current)
    setClosing(false)
    setStartOpen(true)
  }, [])

  const close = useCallback(() => {
    if (!startOpen) return
    setClosing(true)
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => {
      setStartOpen(false)
      setClosing(false)
    }, 140)
  }, [startOpen])

  const onToggleStart = useCallback(() => {
    startOpen ? close() : open()
  }, [startOpen, open, close])

  const onCloseStart = useCallback(() => close(), [close])

  const onOpenApp = useCallback(
    (app) => {
      toggleWindow(app)
    },
    [toggleWindow]
  )

  return (
    <>
      {startOpen && (
        <StartMenu
          apps={apps}
          onOpenApp={onOpenApp}
          onClose={onCloseStart}
          onShutdown={onShutdown}
          closing={closing}
        />
      )}
      <div className="xp-taskbar">
        <button
          type="button"
          className={`xp-start-button ${startOpen ? 'open' : ''}`}
          onClick={onToggleStart}
          aria-haspopup="menu"
          aria-expanded={startOpen}
        >
          <img src="/favicon-dark.png" alt="" width="18" height="18" className="xp-start-flag" aria-hidden="true" />
          <span className="start-word">start</span>
        </button>
        <QuickLaunch apps={apps} onOpenApp={onOpenApp} />
        <div className="xp-taskbuttons">
          {windows.map((win) => {
            const active = isTop(win, windows) && !win.minimized
            return (
              <button
                key={win.id}
                type="button"
                className={`xp-taskbutton ${active ? 'active' : ''} ${
                  win.minimized ? 'minimized' : ''
                }`}
                onClick={() => {
                  if (active) minimizeWindow(win.id)
                  else focusWindow(win.id)
                }}
                title={win.title}
              >
                <img src={win.icon} alt="" width="16" height="16" />
                <span className="xp-taskbutton-label">{win.title}</span>
              </button>
            )
          })}
        </div>
        <SystemTray />
      </div>
    </>
  )
}
