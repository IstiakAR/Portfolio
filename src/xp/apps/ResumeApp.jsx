import { profile, about, skills, projects, experience, achievements, resumeFile } from '../../data/portfolio.js'

/* Resume — styled as an XP document viewer (Notepad-ish chrome with toolbar).
   Download button serves the real file from /public if present. */

export default function ResumeApp() {
  return (
    <div className="xp-app">
      <div className="xp-menubar">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Help</span>
      </div>
      <div className="xp-doc-toolbar">
        <a className="xp-btn" href={resumeFile.path} download>
          Download {resumeFile.label}
        </a>
        <span className="xp-subtle">Word Pad — Resume.txt</span>
      </div>
      <div className="xp-app-scroll xp-doc-view">
        <h2 className="xp-doc-name">{profile.name}</h2>
        <p className="xp-doc-sub">
          {profile.title} · {profile.location}
        </p>
        <p className="xp-doc-sub">
          {profile.email} · {profile.githubLabel} · {profile.location}
        </p>

        <h3>Summary</h3>
        <p>{about.intro}</p>

        <h3>Education</h3>
        {about.education.map((e) => (
          <p key={e.school}>
            <strong>{e.degree}</strong> — {e.school} ({e.period})
          </p>
        ))}

        <h3>Experience</h3>
        {experience.length === 0 && (
          <p className="xp-subtle">[PLACEHOLDER — add internships/jobs in src/data/portfolio.js]</p>
        )}
        {experience.map((x) => (
          <p key={x.company}>
            <strong>{x.role}</strong> — {x.company} ({x.period})
            <br />
            {x.summary}
          </p>
        ))}

        <h3>Technical Skills</h3>
        {Object.entries(skills).map(([group, list]) => (
          <p key={group}>
            <strong>{group}:</strong> {list.join(', ')}
          </p>
        ))}

        <h3>Projects</h3>
        {projects.map((p) => (
          <p key={p.id}>
            <strong>{p.name}</strong> — {p.subtitle}. {p.technologies.join(', ')}
            {p.github ? ` (${p.github})` : ''}
          </p>
        ))}

        <h3>Achievements</h3>
        <ul className="xp-list">
          {achievements.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>
      <div className="xp-statusbar">Resume.txt — Read Only</div>
    </div>
  )
}
