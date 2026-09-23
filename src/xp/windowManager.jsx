import { useMemo, useReducer, useCallback } from 'react'
import { WindowManagerContext } from './context.js'
import { isTop } from './isTop.js'
import { TASKBAR_HEIGHT, MAXIMIZE_BELOW_WIDTH, MAXIMIZE_BELOW_HEIGHT } from './constants.js'

/* One centralized store for all desktop window state.
   Every application window — no matter which app opened it — lives here. */

const initialWMState = {
  windows: [], // all open windows
  nextZ: 10,
  nextId: 1,
}

/* Keep a newly opened window fully on-screen (and auto-maximize on phones). */
function fitToViewport(win) {
  const vw = window.innerWidth
  const vh = window.innerHeight - TASKBAR_HEIGHT
  const width = Math.max(Math.min(win.width, vw - 8), Math.min(200, vw - 8))
  const height = Math.max(Math.min(win.height, vh - 8), Math.min(120, vh - 8))
  const x = Math.max(0, Math.min(win.x, vw - Math.min(width, 80)))
  const y = Math.max(0, Math.min(win.y, vh - 8))

  // Small phones / landscape: open maximized so content is usable immediately.
  if (vw < MAXIMIZE_BELOW_WIDTH || vh < MAXIMIZE_BELOW_HEIGHT) {
    return {
      ...win,
      x: 0,
      y: 0,
      width: vw,
      height: vh,
      maximized: true,
      prevRect: null,
    }
  }
  return { ...win, x, y, width, height }
}

function reducer(state, action) {
  switch (action.type) {
    case 'OPEN': {
      const { app } = action
      // Single-instance apps: focus the existing window instead of duplicating
      if (app.singleInstance) {
        const existing = state.windows.find((w) => w.appId === app.id)
        if (existing) {
          return {
            ...state,
            windows: state.windows.map((w) =>
              w.id === existing.id
                ? { ...fitToViewport({ ...w, z: state.nextZ, minimized: false }), z: state.nextZ, minimized: false }
                : w
            ),
            nextZ: state.nextZ + 1,
          }
        }
      }
      const id = state.nextId
      const win = fitToViewport({
        id,
        appId: app.id,
        title: app.title,
        icon: app.icon,
        x: action.x ?? app.defaultX ?? 80,
        y: action.y ?? app.defaultY ?? 60,
        width: action.width ?? app.defaultWidth ?? 640,
        height: action.height ?? app.defaultHeight ?? 460,
        z: state.nextZ,
        minimized: false,
        maximized: false,
        prevRect: null, // geometry to restore after un-maximize
      })
      return {
        ...state,
        windows: [...state.windows, win],
        nextId: id + 1,
        nextZ: state.nextZ + 1,
      }
    }
    case 'CLOSE':
      return { ...state, windows: state.windows.filter((w) => w.id !== action.id) }
    case 'FOCUS': {
      const target = state.windows.find((w) => w.id === action.id)
      if (!target) return state
      const visible = state.windows.filter((w) => !w.minimized)
      const topZ = visible.length ? Math.max(...visible.map((w) => w.z)) : 0
      if (target.z === topZ && !target.minimized) return state // already focused
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, z: state.nextZ, minimized: false } : w
        ),
        nextZ: state.nextZ + 1,
      }
    }
    case 'MINIMIZE':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, minimized: true } : w
        ),
      }
    case 'TOGGLE_MAXIMIZE': {
      const target = state.windows.find((w) => w.id === action.id)
      if (!target) return state
      if (target.maximized) {
        return {
          ...state,
          windows: state.windows.map((w) =>
            w.id === action.id
              ? { ...w, maximized: false, ...(w.prevRect || {}), prevRect: null }
              : w
          ),
        }
      }
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? {
                ...w,
                maximized: true,
                prevRect: { x: w.x, y: w.y, width: w.width, height: w.height },
              }
            : w
        ),
      }
    }
    case 'MOVE':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? {
                ...w,
                x: Math.min(Math.max(action.x, -9999), window.innerWidth - 80),
                y: Math.min(
                  Math.max(action.y, 0),
                  window.innerHeight - TASKBAR_HEIGHT - 8
                ),
              }
            : w
        ),
      }
    case 'RESIZE':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? {
                ...w,
                width: Math.min(
                  Math.max(action.width, 200),
                  window.innerWidth - 4
                ),
                height: Math.min(
                  Math.max(action.height, 120),
                  window.innerHeight - TASKBAR_HEIGHT - 4
                ),
              }
            : w
        ),
      }
    default:
      return state
  }
}

export function WindowManagerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialWMState)

  const openWindow = useCallback(
    (app, opts = {}) => dispatch({ type: 'OPEN', app, ...opts }),
    []
  )
  const closeWindow = useCallback((id) => dispatch({ type: 'CLOSE', id }), [])
  const focusWindow = useCallback((id) => dispatch({ type: 'FOCUS', id }), [])
  const minimizeWindow = useCallback((id) => dispatch({ type: 'MINIMIZE', id }), [])
  const toggleMaximize = useCallback((id) => dispatch({ type: 'TOGGLE_MAXIMIZE', id }), [])
  const moveWindow = useCallback((id, x, y) => dispatch({ type: 'MOVE', id, x, y }), [])
  const resizeWindow = useCallback(
    (id, width, height) => dispatch({ type: 'RESIZE', id, width, height }),
    []
  )

  const toggleWindow = useCallback(
    (app) => {
      const existing = state.windows.find((w) => w.appId === app.id)
      if (!existing) {
        openWindow(app)
        return
      }
      if (existing.minimized) {
        focusWindow(existing.id)
        return
      }
      if (isTop(existing, state.windows)) {
        minimizeWindow(existing.id)
      } else {
        focusWindow(existing.id)
      }
    },
    [state.windows, openWindow, focusWindow, minimizeWindow]
  )

  const value = useMemo(
    () => ({
      windows: state.windows,
      openWindow,
      closeWindow,
      focusWindow,
      minimizeWindow,
      toggleMaximize,
      moveWindow,
      resizeWindow,
      toggleWindow,
    }),
    [
      state.windows,
      openWindow,
      closeWindow,
      focusWindow,
      minimizeWindow,
      toggleMaximize,
      moveWindow,
      resizeWindow,
      toggleWindow,
    ]
  )

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  )
}
