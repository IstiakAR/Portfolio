import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const MinecraftPortfolio = lazy(() => import('./MinecraftPortfolio.jsx'))
const XpPortfolio = lazy(() => import('./XpPortfolio.jsx'))

const designs = {
  minecraft: MinecraftPortfolio,
  xp: XpPortfolio,
}

const params = new URLSearchParams(window.location.search)
const design = params.get('design')
const Design = designs[design] || designs.xp

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={null}>
      <Design />
    </Suspense>
  </StrictMode>,
)
