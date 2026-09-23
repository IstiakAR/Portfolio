import { useRef } from 'react'
import { useWindowManager } from './useWindowManager.js'
import { TASKBAR_HEIGHT, MIN_WINDOW_WIDTH, MIN_WINDOW_HEIGHT } from './constants.js'

/* Reusable pointer-based resize handle. Attach at a window corner/edge. */
export default function ResizeHandle({ win, dir = 'se' }) {
  const { focusWindow, resizeWindow, moveWindow } = useWindowManager()
  const state = useRef(null)

  const onPointerDown = (e) => {
    if (e.button !== 0 || win.maximized) return
    focusWindow(win.id)
    state.current = {
      startX: e.clientX,
      startY: e.clientY,
      startW: win.width,
      startH: win.height,
      startX0: win.x,
      startY0: win.y,
    }
    const onMove = (ev) => {
      const s = state.current
      if (!s) return
      const dx = ev.clientX - s.startX
      const dy = ev.clientY - s.startY
      // Shrink mins on small screens so windows stay resizable on phones.
      const MIN_W = Math.min(MIN_WINDOW_WIDTH, window.innerWidth - 8)
      const MIN_H = Math.min(MIN_WINDOW_HEIGHT, window.innerHeight - TASKBAR_HEIGHT - 8)
      const MAX_W = window.innerWidth - 4
      const MAX_H = window.innerHeight - TASKBAR_HEIGHT - 4
      let width = s.startW
      let height = s.startH
      let x = s.startX0
      let y = s.startY0
      if (dir.includes('e')) width = Math.min(MAX_W, Math.max(MIN_W, s.startW + dx))
      if (dir.includes('s')) height = Math.min(MAX_H, Math.max(MIN_H, s.startH + dy))
      if (dir.includes('w')) {
        width = Math.min(MAX_W, Math.max(MIN_W, s.startW - dx))
        x = s.startX0 + (s.startW - width)
      }
      if (dir.includes('n')) {
        height = Math.min(MAX_H, Math.max(MIN_H, s.startH - dy))
        y = s.startY0 + (s.startH - height)
      }
      resizeWindow(win.id, width, height)
      if (dir.includes('w') || dir.includes('n')) moveWindow(win.id, x, y)
    }
    const onUp = () => {
      state.current = null
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <span
      className={`xp-resize-handle xp-resize-${dir}`}
      onPointerDown={onPointerDown}
      aria-hidden="true"
    />
  )
}
