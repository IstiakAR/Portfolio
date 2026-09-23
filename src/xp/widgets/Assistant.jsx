import { useState, useEffect, useCallback } from 'react'
import useDraggable from './useDraggable.js'
import { profile, about } from '../../data/portfolio.js'
import { hideAssistant } from './assistantVisible.js'

/* Clippy-style desktop assistant. Sits on the right side of the desktop,
   occasionally hops, and shows rotating speech-bubble tips. Pure CSS/JS,
   no assets. Dismissable (persists via localStorage). */

const TIPS = [
  { text: `Hi, I'm Clippy! Double-click any icon to open it.`, kind: 'hello' },
  { text: 'Try the Command Prompt — type "help" to see what I respond to.', icon: 'cmd' },
  { text: 'It looks like you love games. Minesweeper is over there. No pressure.', icon: 'game' },
  { text: `I'm ${profile.name.split(' ')[0]}'s assistant. Ask the Contact window for his email.`, icon: 'mail' },
  { text: 'Tip: double-click a window title bar to maximize it.', icon: 'window' },
  { text: 'Drag windows by the title bar. Drag ME around too, I like it.', icon: 'hand' },
  { text: 'The Recycle Bin is fake. Please do not delete me into it.', icon: 'warn' },
]

/* Tiny inline icons for the bubble, XP-style */
const BUBBLE_ICON = {
  cmd: (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <rect x="1" y="2" width="14" height="12" rx="1" fill="#000" stroke="#888" />
      <text x="3" y="11" fontSize="8" fill="#fff" fontFamily="monospace">C:\</text>
    </svg>
  ),
  game: (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6" fill="#333" />
      <circle cx="6" cy="6" r="1.4" fill="#fff" />
      <path d="M10 5l1 1 1-1-1-1z" fill="#fff" />
    </svg>
  ),
  mail: (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <rect x="1" y="3" width="14" height="10" fill="#fff" stroke="#4a5a8a" />
      <path d="M1 3l7 5 7-5" fill="none" stroke="#4a5a8a" />
    </svg>
  ),
  sparkle: (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 1l1.5 5L15 7.5l-5.5 1.5L8 15l-1.5-6L1 7.5 6.5 6z" fill="#ffd34d" stroke="#b8860b" strokeWidth="0.5" />
    </svg>
  ),
  globe: (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" fill="#7ec8ff" stroke="#2a5fd0" />
      <path d="M1.5 8h13M8 1.5c-3 3.5-3 9.5 0 13M8 1.5c3 3.5 3 9.5 0 13" fill="none" stroke="#2a5fd0" strokeWidth="0.8" />
    </svg>
  ),
  window: (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <rect x="1" y="2" width="14" height="12" fill="#ece9d8" stroke="#888" />
      <rect x="1" y="2" width="14" height="3" fill="#2a5fd0" />
    </svg>
  ),
  hand: (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M6 8V3.5a1 1 0 012 0V7m0-2.5a1 1 0 012 0V7m0-1.5a1 1 0 012 0V8m0-.5a1 1 0 012 0v3c0 2.5-2 4.5-4.5 4.5S5 13 5 11V9a1 1 0 011-1z" fill="#ffd9b3" stroke="#8a5a2a" strokeWidth="0.8" />
    </svg>
  ),
  warn: (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 1l7 13H1z" fill="#ffd34d" stroke="#8a6d00" />
      <text x="6.6" y="12.5" fontSize="9" fontWeight="bold" fill="#000">!</text>
    </svg>
  ),
}

export default function Assistant() {
  const [tipIdx, setTipIdx] = useState(0)
  const [bubbleOpen, setBubbleOpen] = useState(true)
  // Park on the right side, above the taskbar; draggable with persistence
  const { ref, pos, dragging, onPointerDown } = useDraggable(
    'xp-assistant',
    () => ({ x: window.innerWidth - 210, y: window.innerHeight * 0.42 }),
    { right: 120, bottom: 110 }
  )

  // One timer drives the whole cycle so open + tip-advance land in the same
  // paint (two intervals race: hide could reopen the old tip first).
  useEffect(() => {
    let showing = true
    const id = setInterval(() => {
      if (showing) {
        setBubbleOpen(false)
        showing = false
      } else {
        setTipIdx((i) => (i + 1) % TIPS.length)
        setBubbleOpen(true)
        showing = true
      }
    }, 5500)
    return () => clearInterval(id)
  }, [])

  const dismiss = useCallback(() => {
    hideAssistant()
  }, [])

  const nextTip = useCallback(() => {
    setTipIdx((i) => (i + 1) % TIPS.length)
    setBubbleOpen(true)
  }, [])

  const tip = TIPS[tipIdx]

  return (
    <div
      ref={ref}
      className={`xp-assistant ${dragging ? 'dragging' : ''}`}
      style={pos ? { left: pos.x, top: pos.y } : undefined}
      onPointerDown={onPointerDown}
    >
      <div className={`xp-assistant-bubble ${bubbleOpen ? 'open' : ''}`} role="status">
        <div className="xp-assistant-bubble-head">
          <span>Clippy</span>
          <button
            type="button"
            className="xp-assistant-bubble-close"
            onClick={dismiss}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label="Hide assistant"
          >
            ×
          </button>
        </div>
        <div className="xp-assistant-bubble-body">
          {tip.icon && BUBBLE_ICON[tip.icon]}
          <span>{tip.text}</span>
        </div>
        <button
          type="button"
          className="xp-assistant-bubble-next"
          onClick={nextTip}
          onPointerDown={(e) => e.stopPropagation()}
        >
          Next tip »
        </button>
      </div>

      <div
        className="xp-assistant-body"
        title="Drag me around!"
        role="img"
        aria-label="Clippy the assistant"
      >
        <img
          src="/gifs/clippy.gif"
          alt="Clippy"
          width={64}
          height={60}
          draggable={false}
        />
        <div className="xp-assistant-shadow" />
      </div>
    </div>
  )
}
