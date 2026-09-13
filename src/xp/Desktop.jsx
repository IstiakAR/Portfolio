import { useCallback, useState } from 'react'
import { WindowManagerProvider } from './windowManager.jsx'
import { useWindowManager } from './useWindowManager.js'
import Window from './Window.jsx'
import Taskbar from './Taskbar.jsx'
import DesktopIcon from './DesktopIcon.jsx'

/* Desktop: wallpaper, icons, windows, taskbar. Renders everything from the registry. */

function DesktopSurface({ apps }) {
  const { windows, openWindow } = useWindowManager()
  const [selectedIcon, setSelectedIcon] = useState(null)
  const [shutdown, setShutdown] = useState(false)
  const handleShutdown = useCallback(() => setShutdown(true), [])

  return (
    <div
      className="xp-desktop"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) setSelectedIcon(null)
      }}
    >
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

      {shutdown && (
        <div className="xp-shutdown-screen" role="alert">
          <div className="xp-shutdown-box">
            <p>It is now safe to turn off your computer.</p>
            <button type="button" className="xp-btn" onClick={() => setShutdown(false)}>
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
