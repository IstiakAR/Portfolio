import { useSyncExternalStore } from 'react'
import Assistant from './Assistant.jsx'
import DesktopPets from './DesktopPets.jsx'
import { subscribeAssistant, getAssistantVisible } from './assistantVisible.js'

/* Desktop gadgets — the "homey" right side of the desktop.
   (Live demos are now a proper app — see src/xp/apps/LiveDemosApp.jsx.) */

export default function DesktopGadgets() {
  const assistantVisible = useSyncExternalStore(
    subscribeAssistant,
    getAssistantVisible,
    () => true
  )

  return (
    <>
      <DesktopPets />
      {assistantVisible && <Assistant key="clippy" />}
    </>
  )
}
