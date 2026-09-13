import { icons } from '../icons.js'
import { skills } from '../../data/portfolio.js'

/* Skills — Control Panel-style app: category groups with XP icons. */

const GROUP_ICONS = {
  Programming: icons.exe,
  'Web Development': icons.html,
  Frameworks: icons.harddriveUsb,
  Databases: icons.harddrive,
  Tools: icons.spreadsheet,
  Other: icons.document,
}

export default function SkillsApp() {
  return (
    <div className="xp-app">
      <div className="xp-app-scroll">
        <div className="xp-panel">
          <h3 className="xp-panel-title">
            <img src={icons.exe} alt="" width="32" height="32" />
            Control Panel — Skills
          </h3>
          <p className="xp-subtle">
            Pick a category icon to view installed capabilities.
          </p>
        </div>
        {Object.entries(skills).map(([group, list]) => (
          <fieldset key={group} className="xp-fieldset">
            <legend>
              <img src={GROUP_ICONS[group] || icons.document} alt="" width="16" height="16" />
              {' '}
              {group}
            </legend>
            <div className="xp-chip-wrap">
              {list.map((s) => (
                <span key={s} className="xp-chip">
                  {s}
                </span>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <div className="xp-statusbar">{Object.keys(skills).length} categories</div>
    </div>
  )
}
