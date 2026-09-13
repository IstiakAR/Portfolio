import { useWindowManager } from './useWindowManager.js'
import { isTop } from './isTop.js'
import SystemTray from './SystemTray.jsx'
import StartMenu from './StartMenu.jsx'
import { useState, useCallback } from 'react'

/* Bottom XP taskbar: [Start] [window buttons...] [tray + clock]. */

export default function Taskbar({ apps, onShutdown }) {
  const { windows, focusWindow, minimizeWindow, toggleWindow } = useWindowManager()
  const [startOpen, setStartOpen] = useState(false)

  const onToggleStart = useCallback(() => setStartOpen((v) => !v), [])
  const onCloseStart = useCallback(() => setStartOpen(false), [])

  const onOpenApp = useCallback(
    (app) => {
      toggleWindow(app)
    },
    [toggleWindow]
  )

  return (
    <>
      {startOpen && (
        <StartMenu apps={apps} onOpenApp={onOpenApp} onClose={onCloseStart} onShutdown={onShutdown} />
      )}
      <div className="xp-taskbar">
        <button
          type="button"
          className={`xp-start-button ${startOpen ? 'open' : ''}`}
          onClick={onToggleStart}
          aria-haspopup="menu"
          aria-expanded={startOpen}
        >
          <span className="xp-start-flag" aria-hidden="true" />
          <span className="xp-start-text">start</span>
        </button>
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
