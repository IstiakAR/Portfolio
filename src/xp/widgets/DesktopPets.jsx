/* Desktop pets — scripted gif critters living on the wallpaper.
   Float above the wallpaper (z-index 1) but below windows (z-index 5+). */

/* Pikachu stands on top of the taskbar (taskbar is 30px + 1px border). */
function Pikachu() {
  return (
    <div className="xp-pet xp-pet-pikachu" title="Pikachu resting on the taskbar">
      <img src="/gifs/pikachu.gif" alt="pikachu" width={88} draggable={false} />
    </div>
  )
}

/* Bowser flies himself across the sky — pure CSS path, no dragging. */
function BowserFlyer() {
  return (
    <div className="xp-pet-bowser" aria-hidden="true" title="Bowser soaring through the sky">
      <img src="/gifs/bowser.gif" alt="bowser" width={64} draggable={false} />
    </div>
  )
}

/* Triforce pinned in the sky like the sun — fixed, glowing, not draggable. */
function SunTriforce() {
  return (
    <div className="xp-pet-sun" aria-hidden="true" title="It's dangerous to go alone — take this sun">
      <img src="/gifs/triforce.gif" alt="triforce sun" width={72} draggable={false} />
    </div>
  )
}

export default function DesktopPets() {
  return (
    <>
      <SunTriforce />
      <Pikachu />
      <BowserFlyer />
    </>
  )
}
