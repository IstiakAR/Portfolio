import Desktop from './xp/Desktop.jsx'
import { APPS } from './xp/appRegistry.jsx'
import './xp/xp.css'

/* Windows XP-style desktop portfolio. See src/xp/ for the window manager,
   shell components, and src/xp/apps/ for the applications. */

export default function XpPortfolio() {
  return <Desktop apps={APPS} />
}
