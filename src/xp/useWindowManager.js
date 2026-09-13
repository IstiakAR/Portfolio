import { useContext } from 'react'
import { WindowManagerContext } from './context.js'

/* Access the window manager from any component. */
export function useWindowManager() {
  const ctx = useContext(WindowManagerContext)
  if (!ctx) throw new Error('useWindowManager must be used inside <WindowManagerProvider>')
  return ctx
}
