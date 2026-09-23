import { useState } from 'react'
import { icons } from '../icons.js'
import { profile, about } from '../../data/portfolio.js'

/* About Me — XP Explorer-style window with folder tree and detail panes. */

const NAV = [
  { id: 'about', label: 'About Me', icon: icons.user, desc: 'Who I am' },
  { id: 'education', label: 'Education', icon: icons.folder, desc: 'Degrees & schools' },
  { id: 'interests', label: 'Interests', icon: icons.folderSmall, desc: 'What I love' },
  { id: 'focus', label: 'Current Focus', icon: icons.harddrive, desc: 'What I am learning' },
]

export default function AboutApp() {
  const [section, setSection] = useState('about')

  return (
    <div className="xp-app xp-explorer">
      <div className="xp-explorer-toolbar">
        <span className="xp-explorer-address">
          <img src={icons.folder} alt="" width="16" height="16" />
          <span>C:\Documents\Portfolio\{section}</span>
        </span>
      </div>
      <div className="xp-explorer-split">
        <div className="xp-explorer-side" role="navigation" aria-label="About sections">
          <div className="xp-taskpane">
            <div className="xp-taskpane-header">About Me</div>
            <div className="xp-taskpane-body">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  className={`xp-taskpane-item ${section === n.id ? 'selected' : ''}`}
                  onClick={() => setSection(n.id)}
                >
                  <img src={n.icon} alt="" width="16" height="16" />
                  <span>{n.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="xp-explorer-main">
          {section === 'about' && (
            <div className="xp-panel">
              <h3 className="xp-panel-title">
                <img src={icons.user} alt="" width="32" height="32" />
                {profile.name}
              </h3>
              <p className="xp-subtle">{profile.title}</p>
              <p>{about.intro}</p>
              <table className="xp-table">
                <tbody>
                  {about.facts.map((f) => (
                    <tr key={f.label}>
                      <td className="xp-table-label">{f.label}:</td>
                      <td>{f.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {section === 'education' && (
            <div className="xp-panel">
              <h3 className="xp-panel-title">
                <img src={icons.folder} alt="" width="32" height="32" />
                Education
              </h3>
              {about.education.map((e) => (
                <div key={e.school} className="xp-file-row">
                  <img src={icons.document} alt="" width="32" height="32" />
                  <div>
                    <strong>{e.school}</strong>
                    <div className="xp-subtle">{e.degree}</div>
                    <div className="xp-subtle">{e.period}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {section === 'interests' && (
            <div className="xp-panel">
              <h3 className="xp-panel-title">
                <img src={icons.folderSmall} alt="" width="32" height="32" />
                Interests
              </h3>
              <ul className="xp-list">
                {about.interests.map((i) => (
                  <li key={i}>
                    <img src={icons.documentSmall} alt="" width="16" height="16" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {section === 'focus' && (
            <div className="xp-panel">
              <h3 className="xp-panel-title">
                <img src={icons.harddrive} alt="" width="32" height="32" />
                Currently Learning
              </h3>
              <ul className="xp-list">
                {about.currentFocus.map((i) => (
                  <li key={i}>
                    <img src={icons.folderSmall} alt="" width="16" height="16" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="xp-statusbar">1 object</div>
    </div>
  )
}
