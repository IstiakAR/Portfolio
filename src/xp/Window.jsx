import { useRef, useCallback } from 'react'
import { useWindowManager } from './useWindowManager.js'
import { isTop } from './isTop.js'
import { TASKBAR_HEIGHT } from './constants.js'
import ResizeHandle from './ResizeHandle.jsx'

/* One application window. Pure chrome + drag logic; content comes from the registry. */

export default function Window({ win, windows, children }) {
  const { focusWindow, closeWindow, minimizeWindow, toggleMaximize, moveWindow } =
    useWindowManager()
  const focused = isTop(win, windows)
  const dragState = useRef(null)

  const onTitlePointerDown = useCallback(
    (e) => {
      if (e.button !== 0) return
      focusWindow(win.id)
      if (win.maximized) {
        // Dragging a maximized window restores it and keeps the grab point
        const relX = e.clientX / window.innerWidth
        const width = win.prevRect?.width ?? 640
        const height = win.prevRect?.height ?? 460
        toggleMaximize(win.id)
        dragState.current = {
          offsetX: width * relX,
          offsetY: 12,
          width,
          height,
        }
        moveWindow(
          win.id,
          e.clientX - width * relX,
          e.clientY - 12
        )
      } else {
        dragState.current = {
          offsetX: e.clientX - win.x,
          offsetY: e.clientY - win.y,
        }
      }

      const onMove = (ev) => {
        const d = dragState.current
        if (!d) return
        const nx = ev.clientX - d.offsetX
        const ny = ev.clientY - d.offsetY
        // Keep the title bar reachable: clamp within viewport
        const maxX = window.innerWidth - 80
        const maxY = Math.max(0, window.innerHeight - TASKBAR_HEIGHT - 8)
        const minY = Math.min(0, maxY - 24)
        moveWindow(
          win.id,
          Math.min(Math.max(nx, -9999), maxX),
          Math.min(Math.max(ny, minY), maxY)
        )
      }
      const onUp = () => {
        dragState.current = null
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
        document.body.classList.remove('xp-dragging')
      }
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
      document.body.classList.add('xp-dragging')
      e.preventDefault()
    },
    [win, focusWindow, moveWindow, toggleMaximize]
  )

  const geometry = win.maximized
    ? {
        left: 0,
        top: 0,
        width: '100%',
        height: `calc(100% - ${TASKBAR_HEIGHT}px)`,
      }
    : { left: win.x, top: win.y, width: win.width, height: win.height }

  return (
    <div
      className={`xp-window ${focused ? 'focused' : 'blurred'} ${
        win.maximized ? 'maximized' : ''
      }`}
      style={{
        ...geometry,
        zIndex: win.z,
        display: win.minimized ? 'none' : 'flex',
      }}
      onPointerDown={() => focusWindow(win.id)}
      role="dialog"
      aria-label={win.title}
    >
      <div
        className="xp-titlebar"
        onPointerDown={onTitlePointerDown}
        onDoubleClick={() => toggleMaximize(win.id)}
      >
        <img src={win.icon} alt="" width="16" height="16" className="xp-titlebar-icon" />
        <span className="xp-titlebar-text">{win.title}</span>
        <div className="xp-titlebar-buttons">
          <button
            type="button"
            className="xp-tb-btn minimize"
            aria-label={`Minimize ${win.title}`}
            onClick={(e) => {
              e.stopPropagation()
              minimizeWindow(win.id)
            }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <span className="glyph glyph-min" />
          </button>
          <button
            type="button"
            className="xp-tb-btn maximize"
            aria-label={win.maximized ? `Restore ${win.title}` : `Maximize ${win.title}`}
            onClick={(e) => {
              e.stopPropagation()
              toggleMaximize(win.id)
            }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <span className={`glyph ${win.maximized ? 'glyph-restore' : 'glyph-max'}`} />
          </button>
          <button
            type="button"
            className="xp-tb-btn close"
            aria-label={`Close ${win.title}`}
            onClick={(e) => {
              e.stopPropagation()
              closeWindow(win.id)
            }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <span className="glyph glyph-close" />
          </button>
        </div>
      </div>
      <div className="xp-window-body">{children}</div>
      {!win.maximized && (
        <>
          <ResizeHandle win={win} dir="n" />
          <ResizeHandle win={win} dir="s" />
          <ResizeHandle win={win} dir="e" />
          <ResizeHandle win={win} dir="w" />
          <ResizeHandle win={win} dir="ne" />
          <ResizeHandle win={win} dir="nw" />
          <ResizeHandle win={win} dir="se" />
          <ResizeHandle win={win} dir="sw" />
        </>
      )}
    </div>
  )
}
