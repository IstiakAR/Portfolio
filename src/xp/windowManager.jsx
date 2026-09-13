import { useMemo, useReducer, useCallback } from 'react'
import { WindowManagerContext } from './context.js'
import { isTop } from './isTop.js'

/* One centralized store for all desktop window state.
   Every application window — no matter which app opened it — lives here. */

const initialWMState = {
  windows: [], // all open windows
  nextZ: 10,
  nextId: 1,
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
                ? { ...w, z: state.nextZ, minimized: false }
                : w
            ),
            nextZ: state.nextZ + 1,
          }
        }
      }
      const id = state.nextId
      const win = {
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
      }
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
          w.id === action.id ? { ...w, x: action.x, y: action.y } : w
        ),
      }
    case 'RESIZE':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, width: action.width, height: action.height } : w
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
