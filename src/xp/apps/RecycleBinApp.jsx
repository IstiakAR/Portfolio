import { icons } from '../icons.js'

/* Recycle Bin — playful easter-egg app. */

const ITEMS = [
  { name: 'internet_explorer_sucks.txt', icon: icons.documentSmall },
  { name: 'old_portfolio_2019.bak', icon: icons.documentSmall },
  { name: 'semicolons.js', icon: icons.exeSmall },
  { name: 'my_mixtape.mp3', icon: icons.documentSmall },
]

export default function RecycleBinApp() {
  return (
    <div className="xp-app xp-explorer">
      <div className="xp-explorer-toolbar">
        <span className="xp-explorer-address">
          <img src={icons.recycleBin} alt="" width="16" height="16" />
          <span>Recycle Bin</span>
        </span>
      </div>
      <div className="xp-app-scroll">
        <div className="xp-icon-grid">
          {ITEMS.map((it) => (
            <div key={it.name} className="xp-file-icon">
              <img src={it.icon} alt="" width="48" height="48" />
              <span>{it.name}</span>
            </div>
          ))}
        </div>
        <p className="xp-recycle-note">
          Restore is disabled by your systems administrator. (Nice try.)
        </p>
      </div>
      <div className="xp-statusbar">{ITEMS.length} objects</div>
    </div>
  )
}
