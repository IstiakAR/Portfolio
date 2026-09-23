import { useCallback, useState } from 'react'
import Desktop from './xp/Desktop.jsx'
import { APPS } from './xp/appRegistry.jsx'
import BootScreen from './xp/BootScreen.jsx'
import './xp/xp.css'
import './xp/widgets/gadgets.css'

/* Windows XP-style desktop portfolio. See src/xp/ for the window manager,
   shell components, and src/xp/apps/ for the applications. */

export default function XpPortfolio() {
  const [booted, setBooted] = useState(false)
  const finishBoot = useCallback(() => setBooted(true), [])

  return (
    <>
      {!booted && <BootScreen onDone={finishBoot} />}
      <Desktop apps={APPS} />
    </>
  )
}