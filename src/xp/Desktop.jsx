import { useCallback, useEffect, useState } from 'react'
import { WindowManagerProvider } from './windowManager.jsx'
import { useWindowManager } from './useWindowManager.js'
import Window from './Window.jsx'
import Taskbar from './Taskbar.jsx'
import DesktopIcon from './DesktopIcon.jsx'
import DesktopGadgets from './widgets/DesktopGadgets.jsx'

/* Desktop: wallpaper, icons, windows, taskbar. Renders everything from the registry. */

function DesktopSurface({ apps }) {
  const { windows, openWindow } = useWindowManager()
  const [selectedIcon, setSelectedIcon] = useState(null)
  const [shutdown, setShutdown] = useState(null) // null | 'shuttingdown' | 'safe'

  const handleShutdown = useCallback(() => setShutdown('shuttingdown'), [])

  useEffect(() => {
    if (shutdown !== 'shuttingdown') return
    const t = setTimeout(() => setShutdown('safe'), 2600)
    return () => clearTimeout(t)
  }, [shutdown])

  useEffect(() => {
    if (shutdown !== 'safe') return
    const t = setTimeout(() => window.close(), 1200)
    return () => clearTimeout(t)
  }, [shutdown])

  return (
    <div
      className="xp-desktop"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) setSelectedIcon(null)
      }}
    >
      <div className="xp-desktop-icons">
        {apps
          .filter((a) => a.onDesktop)
          .map((app) => (
            <DesktopIcon
              key={app.id}
              app={app}
              selected={selectedIcon === app.id}
              onSelect={setSelectedIcon}
              onOpen={(a) => openWindow(a)}
            />
          ))}
      </div>

      <DesktopGadgets />

      {windows.map((win) => {
        const app = apps.find((a) => a.id === win.appId)
        if (!app) return null
        const AppContent = app.component
        return (
          <Window key={win.id} win={win} app={app} windows={windows}>
            <AppContent win={win} />
          </Window>
        )
      })}

      <Taskbar apps={apps} onShutdown={handleShutdown} />

      {shutdown === 'shuttingdown' && (
        <div className="xp-shutdown-screen xp-shutdown-active" role="status">
          <div className="xp-shutdown-window">
            <span className="xp-shutdown-title">iarOS is shutting down...</span>
            <span className="xp-shutdown-wait">Please wait while your computer is shutting down</span>
          </div>
        </div>
      )}

      {shutdown === 'safe' && (
        <div className="xp-shutdown-screen" role="alert">
          <div className="xp-shutdown-box">
            <p>It is now safe to turn off your computer.</p>
            <p className="xp-shutdown-hint">
              If the page didn't close, just close this browser tab.
            </p>
            <button type="button" className="xp-btn" onClick={() => setShutdown(null)}>
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Desktop({ apps }) {
  return (
    <WindowManagerProvider>
      <DesktopSurface apps={apps} />
    </WindowManagerProvider>
  )
}
