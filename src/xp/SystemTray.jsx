import { useSyncExternalStore } from 'react'
import { icons } from './icons.js'
import Clock from './Clock.jsx'
import { profile } from '../data/portfolio.js'
import {
  showAssistant,
  subscribeAssistant,
  getAssistantVisible,
} from './widgets/assistantVisible.js'

/* Open the default mail client to message Istiak. */
const MAILTO = `mailto:${profile.email}?subject=${encodeURIComponent('Hello from your portfolio')}`

/* Right side of the taskbar: mail link + tray icons + clock. */
export default function SystemTray() {
  const assistantVisible = useSyncExternalStore(
    subscribeAssistant,
    getAssistantVisible,
    () => true
  )

  return (
    <div className="xp-tray">
      {!assistantVisible && (
        <button
          type="button"
          className="xp-tray-clippy"
          onClick={showAssistant}
          title="Show Clippy"
          aria-label="Show Clippy"
        >
          <img src="/gifs/clippy.gif" alt="" width="16" height="16" draggable={false} />
        </button>
      )}
      <a
        className="xp-tray-mail"
        href={MAILTO}
        title="Email Istiak"
        aria-label="Email Istiak"
      >
        <img src="/gifs/email.gif" alt="" width="16" height="16" draggable={false} />
      </a>
      <img src={icons.networkSmall} alt="Network connected" width="16" height="16" title="Local Area Connection" />
      <img src={icons.volume} alt="Volume" width="16" height="16" title="Volume" />
      <Clock />
    </div>
  )
}
