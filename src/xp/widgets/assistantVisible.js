/* Shared Clippy visibility — localStorage + subscription so the tray
   can bring him back after the bubble's × dismisses him forever. */

const KEY = 'xp-assistant-hidden'
const listeners = new Set()

function readVisible() {
  try {
    return window.localStorage.getItem(KEY) !== '1'
  } catch {
    return true // private mode — always show
  }
}

let visible = typeof window === 'undefined' ? true : readVisible()

function emit() {
  visible = readVisible()
  listeners.forEach((listener) => listener())
}

export function showAssistant() {
  try {
    window.localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
  emit()
}

export function hideAssistant() {
  try {
    window.localStorage.setItem(KEY, '1')
  } catch {
    /* ignore */
  }
  emit()
}

export function toggleAssistant() {
  if (readVisible()) hideAssistant()
  else showAssistant()
}

export function subscribeAssistant(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getAssistantVisible() {
  return visible
}
