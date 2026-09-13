import { icons } from './icons.js'
import Clock from './Clock.jsx'

/* Right side of the taskbar: tray icons + clock. Real image assets only. */
export default function SystemTray() {
  return (
    <div className="xp-tray">
      <img src={icons.networkSmall} alt="Network connected" width="16" height="16" title="Local Area Connection" />
      <img src={icons.volume} alt="Volume" width="16" height="16" title="Volume" />
      <Clock />
    </div>
  )
}
