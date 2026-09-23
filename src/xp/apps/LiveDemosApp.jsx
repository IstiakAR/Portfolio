import { useRef, useState } from 'react'
import { icons } from '../icons.js'
import { projects } from '../../data/portfolio.js'

/* Live Demos — Internet Explorer-style app that renders each project's
   live demo in a real, interactive iframe with a sidebar of demo sites.
   Unlike the old desktop widget, frames here are full-size and usable. */

/* Sidebar groups demos by project id so the list survives content edits
   in portfolio.js; anything without an entry lands in "More demos". */
const FEATURED = ['furniture-mart', 'eduai', 'weather', 'memory-card']
const DEMO_ICONS = {
  'furniture-mart': icons.html,
  eduai: icons.image,
  weather: icons.html,
  'memory-card': icons.image,
}

function DemoListItem({ project, active, onSelect }) {
  return (
    <button
      type="button"
      className={`xp-taskpane-item ${active ? 'selected' : ''}`}
      onClick={() => onSelect(project)}
    >
      <img src={DEMO_ICONS[project.id] || icons.html} alt="" width="16" height="16" />
      <span>{project.name}</span>
    </button>
  )
}

export default function LiveDemosApp() {
  const demos = projects.filter((p) => p.demo)
  const [currentId, setCurrentId] = useState(demos[0]?.id ?? null)
  const [loaded, setLoaded] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)
  const frameRef = useRef(null)

  const current = demos.find((d) => d.id === currentId) ?? demos[0]

  const select = (project) => {
    if (project.id !== currentId) {
      setLoaded(false)
      setCurrentId(project.id)
    }
  }

  const go = (delta) => {
    const i = demos.findIndex((d) => d.id === currentId)
    const next = demos[(i + delta + demos.length) % demos.length]
    setLoaded(false)
    setCurrentId(next.id)
  }

  const featured = demos.filter((d) => FEATURED.includes(d.id))
  const more = demos.filter((d) => !FEATURED.includes(d.id))

  if (!current) {
    return (
      <div className="xp-app">
        <div className="xp-app-scroll">
          <p className="xp-subtle">No live demos found. Add demo URLs in src/data/portfolio.js</p>
        </div>
      </div>
    )
  }

  return (
    <div className="xp-app xp-explorer">
      <div className="xp-explorer-toolbar">
        <button type="button" className="xp-btn" onClick={() => go(-1)} aria-label="Previous demo">
          ◀ Back
        </button>
        <button type="button" className="xp-btn" onClick={() => go(1)} aria-label="Next demo">
          Forward ▶
        </button>
        <button
          type="button"
          className="xp-btn"
          onClick={() => setReloadKey((k) => k + 1)}
          aria-label="Reload demo"
        >
          ⟳ Refresh
        </button>
        <span className="xp-explorer-address">
          <img src={icons.html} alt="" width="16" height="16" />
          <span>{current.demo.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
        </span>
        <a className="xp-btn" href={current.demo} target="_blank" rel="noopener noreferrer">
          Open ↗
        </a>
      </div>
      <div className="xp-explorer-split">
        <div className="xp-explorer-side" role="navigation" aria-label="Demo sites">
          <div className="xp-taskpane">
            <div className="xp-taskpane-header">Featured demos</div>
            <div className="xp-taskpane-body">
              {featured.map((p) => (
                <DemoListItem
                  key={p.id}
                  project={p}
                  active={p.id === currentId}
                  onSelect={select}
                />
              ))}
            </div>
          </div>
          {more.length > 0 && (
            <div className="xp-taskpane">
              <div className="xp-taskpane-header">More demos</div>
              <div className="xp-taskpane-body">
                {more.map((p) => (
                  <DemoListItem
                    key={p.id}
                    project={p}
                    active={p.id === currentId}
                    onSelect={select}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="xp-explorer-main xp-livedemo-main">
          <div className={`xp-livedemo-viewport ${loaded ? 'loaded' : ''}`}>
            {!loaded && (
              <div className="xp-livedemo-loading" aria-hidden="true">
                <span className="xp-livedemo-loader">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            )}
            <iframe
              key={`${current.id}-${reloadKey}`}
              ref={frameRef}
              src={current.demo}
              title={`${current.name} live preview`}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms"
              referrerPolicy="no-referrer"
              onLoad={() => setLoaded(true)}
            />
          </div>
          <div className="xp-livedemo-statusbar">
            <span>
              {current.name} — {current.subtitle}
            </span>
            <span className="xp-livedemo-note">interactive preview</span>
          </div>
        </div>
      </div>
      <div className="xp-statusbar">{demos.length} demo sites</div>
    </div>
  )
}
