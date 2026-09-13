import { useState } from 'react'
import { icons } from '../icons.js'
import { projects } from '../../data/portfolio.js'

/* Projects — Explorer-style app. Folder list on the left, project detail view.
   GitHub / live demo links open in a new tab. */

export default function ProjectsApp() {
  const [currentId, setCurrentId] = useState(null)
  const current = projects.find((p) => p.id === currentId)

  if (current) {
    return (
      <div className="xp-app xp-explorer">
        <div className="xp-explorer-toolbar">
          <button type="button" className="xp-btn" onClick={() => setCurrentId(null)}>
            ← Back
          </button>
          <span className="xp-explorer-address">
            <img src={icons.folder} alt="" width="16" height="16" />
            <span>C:\Projects\{current.name}</span>
          </span>
        </div>
        <div className="xp-app-scroll">
          <div className="xp-panel">
            <h3 className="xp-panel-title">
              <img src={icons.folder} alt="" width="32" height="32" />
              {current.name} — {current.subtitle}
            </h3>
            <p>{current.description}</p>
            <h4 className="xp-h4">Technologies</h4>
            <div className="xp-tags">
              {current.technologies.map((t) => (
                <span key={t} className="xp-tag">
                  {t}
                </span>
              ))}
            </div>
            <div className="xp-btn-row">
              {current.github && (
                <a className="xp-btn" href={current.github} target="_blank" rel="noreferrer">
                  GitHub Repository
                </a>
              )}
              {current.demo && (
                <a className="xp-btn" href={current.demo} target="_blank" rel="noreferrer">
                  Open in new window
                </a>
              )}
            </div>
          </div>
        </div>
        {current.demo ? (
          <iframe
            className="xp-live-demo"
            src={current.demo}
            title={`${current.name} live demo`}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock allow-downloads"
          />
        ) : (
          <div className="xp-live-demo-empty">
            No live demo for this project — it's a desktop / device project.
          </div>
        )}
        <div className="xp-statusbar">{projects.length} objects</div>
      </div>
    )
  }

  return (
    <div className="xp-app xp-explorer">
      <div className="xp-explorer-toolbar">
        <span className="xp-explorer-address">
          <img src={icons.folder} alt="" width="16" height="16" />
          <span>C:\Projects</span>
        </span>
      </div>
      <div className="xp-app-scroll">
        <div className="xp-icon-grid">
          {projects.map((p) => (
            <button
              key={p.id}
              type="button"
              className="xp-file-icon"
              onClick={() => setCurrentId(p.id)}
            >
              <img src={icons.folder} alt="" width="48" height="48" />
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="xp-statusbar">{projects.length} objects</div>
    </div>
  )
}
