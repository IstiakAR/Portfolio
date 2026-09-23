import { useRef, useState } from 'react'

/* Shared drag helper for desktop gadgets (and the assistant).
   - Restores a saved position from localStorage, or falls back to getDefault().
   - Returns pos, dragging flag and a pointer handler to attach to the gadget.
     Clicks on links/buttons/selects inside the widget are ignored so they
     stay clickable. Positions persist after each drag. */

function readSaved(storageKey) {
  try {
    const raw = window.localStorage.getItem(storageKey)
    const saved = raw ? JSON.parse(raw) : null
    if (
      saved &&
      Number.isFinite(saved.x) &&
      Number.isFinite(saved.y) &&
      saved.x < window.innerWidth - 40 &&
      saved.y < window.innerHeight - 40
    ) {
      return saved
    }
  } catch {
    /* corrupted or unavailable storage — use the default */
  }
  return null
}

export default function useDraggable(storageKey, getDefault, clamp = {}) {
  const bounds = { right: 60, bottom: 40, ...clamp }
  const posRef = useRef(null)
  const [pos, setPos] = useState(() => readSaved(storageKey) || getDefault())
  const [dragging, setDragging] = useState(false)

  const onPointerDown = (e) => {
    if (e.button !== 0) return
    // Let links/buttons inside the widget behave normally
    if (e.target.closest('a, button, select, input, textarea')) return
    e.preventDefault()
    e.stopPropagation()
    const start = { x: e.clientX - pos.x, y: e.clientY - pos.y }
    setDragging(true)
    const onMove = (ev) => {
      const next = {
        x: Math.min(Math.max(ev.clientX - start.x, 4), window.innerWidth - bounds.right),
        y: Math.min(Math.max(ev.clientY - start.y, 4), window.innerHeight - bounds.bottom),
      }
      posRef.current = next
      setPos(next)
    }
    const onUp = () => {
      setDragging(false)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      const p = posRef.current
      if (p) {
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(p))
        } catch {
          /* storage unavailable — position just won't persist */
        }
      }
    }
    posRef.current = pos
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  return { pos, dragging, onPointerDown }
}
