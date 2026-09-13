/* Shared helper: is this window the top (focused) one? */
export function isTop(win, windows) {
  const visible = windows.filter((w) => !w.minimized)
  if (!visible.length) return false
  return Math.max(...visible.map((w) => w.z)) === win.z
}
