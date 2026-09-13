import { useEffect, useRef } from "react";

/* 3D player model: a Steve-like figure rendered with CSS 3D transforms,
   textured from the vanilla 64x64 skin (public/skin_new.png). */

const U = 4; // CSS px per skin pixel

const HEAD_UV = { front: [8, 8, 8, 8], back: [24, 8, 8, 8], right: [0, 8, 8, 8], left: [16, 8, 8, 8], top: [8, 0, 8, 8], bottom: [16, 0, 8, 8] };
const BODY_UV = { front: [20, 20, 8, 12], back: [32, 20, 8, 12], right: [16, 20, 4, 12], left: [28, 20, 4, 12], top: [20, 16, 8, 4], bottom: [28, 16, 8, 4] };
const ARM_R_UV = { front: [44, 20, 4, 12], back: [52, 20, 4, 12], right: [40, 20, 4, 12], left: [48, 20, 4, 12], top: [44, 16, 4, 4], bottom: [48, 16, 4, 4] };
const ARM_L_UV = { front: [36, 52, 4, 12], back: [44, 52, 4, 12], right: [32, 52, 4, 12], left: [40, 52, 4, 12], top: [36, 48, 4, 4], bottom: [40, 48, 4, 4] };
const LEG_R_UV = { front: [4, 20, 4, 12], back: [12, 20, 4, 12], right: [0, 20, 4, 12], left: [8, 20, 4, 12], top: [4, 16, 4, 4], bottom: [8, 16, 4, 4] };
const LEG_L_UV = { front: [20, 52, 4, 12], back: [28, 52, 4, 12], right: [16, 52, 4, 12], left: [24, 52, 4, 12], top: [20, 48, 4, 4], bottom: [24, 48, 4, 4] };

// Second layer: most overlays = same rects shifted down 16px.
// Exception: left-arm overlay lives 16px to the RIGHT of its base (64x64 layout).
const shiftY = (uv, dy) => Object.fromEntries(Object.entries(uv).map(([k, r]) => [k, [r[0], r[1] + dy, r[2], r[3]]]));
const shiftX = (uv, dx) => Object.fromEntries(Object.entries(uv).map(([k, r]) => [k, [r[0] + dx, r[1], r[2], r[3]]]));
const BODY_OV = shiftY(BODY_UV, 16);
const ARM_R_OV = shiftY(ARM_R_UV, 16);
const ARM_L_OV = shiftX(ARM_L_UV, 16);
const LEG_R_OV = shiftY(LEG_R_UV, 16);

// One textured box (6 faces) of the player model.
// size = [w, h, d] in skin px; uv rects per face; push nudges faces outward (overlay layer).
function Box({ size, uv, left, top, push = 0 }) {
  const W = size[0] * U;
  const H = size[1] * U;
  const D = size[2] * U;
  const faces = [
    { rect: uv.front, fw: W, fh: H, t: `translateZ(${D / 2 + push}px)`, br: 0.9 },
    { rect: uv.back, fw: W, fh: H, t: `rotateY(180deg) translateZ(${D / 2 + push}px)`, br: 0.65 },
    { rect: uv.left, fw: D, fh: H, t: `rotateY(90deg) translateZ(${W / 2 + push}px)`, br: 0.78 },
    { rect: uv.right, fw: D, fh: H, t: `rotateY(-90deg) translateZ(${W / 2 + push}px)`, br: 0.78 },
    { rect: uv.top, fw: W, fh: D, t: `rotateX(90deg) translateZ(${H / 2 + push}px)`, br: 1 },
    { rect: uv.bottom, fw: W, fh: D, t: `rotateX(-90deg) translateZ(${H / 2 + push}px)`, br: 0.55 },
  ];
  return (
    <div className="mc3d-box" style={{ width: W, height: H, left, top }}>
      {faces.map((f, i) => (
        <div
          key={i}
          className="mc3d-face"
          style={{
            width: f.fw,
            height: f.fh,
            transform: `translate(-50%, -50%) ${f.t}`,
            backgroundPosition: `${-f.rect[0] * U}px ${-f.rect[1] * U}px`,
            filter: `brightness(${f.br})`,
          }}
        />
      ))}
    </div>
  );
}

function Player3D() {
  const modelRef = useRef(null);
  const headRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });

  // The model ONLY moves in response to the mouse: cursor position anywhere
  // in the window sets the target rotation; no idle animation, so it stays
  // completely still while the mouse is still.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      target.current.y = Math.max(-40, Math.min(40, nx * 40));
      target.current.x = Math.max(-22, Math.min(22, -ny * 22));
    };
    window.addEventListener("mousemove", onMove);

    let raf;
    const loop = () => {
      const c = cur.current;
      const tg = target.current;
      c.x += (tg.x - c.x) * 0.08;
      c.y += (tg.y - c.y) * 0.08;
      // Body takes part of the turn, head takes the rest (vanilla-style split)
      if (modelRef.current)
        modelRef.current.style.transform = `rotateX(${(c.x * 0.5).toFixed(2)}deg) rotateY(${(c.y * 0.6).toFixed(2)}deg)`;
      if (headRef.current)
        headRef.current.style.transform = `rotateX(${(c.x * 0.5).toFixed(2)}deg) rotateY(${(c.y * 0.4).toFixed(2)}deg)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="mc-player">
      <div className="mc3d">
        <div className="mc3d-model" ref={modelRef}>
          <div className="mc3d-figure">
            {/* Head pivots at the neck */}
            <div className="mc3d-head" ref={headRef}>
              <Box size={[8, 8, 8]} uv={HEAD_UV} left={-16} top={-32} />
            </div>

            {/* Torso + jacket overlay */}
            <Box size={[8, 12, 4]} uv={BODY_UV} left={-16} top={0} />
            <Box size={[8, 12, 4]} uv={BODY_OV} left={-16} top={0} push={1} />

            {/* Arms pivot at the shoulders (x: -24 right, +24 left) */}
            <div className="mc3d-limb" style={{ left: -24 }}>
              <Box size={[4, 12, 4]} uv={ARM_R_UV} left={-8} top={0} />
              <Box size={[4, 12, 4]} uv={ARM_R_OV} left={-8} top={0} push={1} />
            </div>
            <div className="mc3d-limb" style={{ left: 24 }}>
              <Box size={[4, 12, 4]} uv={ARM_L_UV} left={-8} top={0} />
              <Box size={[4, 12, 4]} uv={ARM_L_OV} left={-8} top={0} push={1} />
            </div>

            {/* Legs pivot at the hips (y: 48) */}
            <div className="mc3d-limb" style={{ left: -8, top: 48 }}>
              <Box size={[4, 12, 4]} uv={LEG_R_UV} left={-8} top={0} />
              <Box size={[4, 12, 4]} uv={LEG_R_OV} left={-8} top={0} push={1} />
            </div>
            <div className="mc3d-limb" style={{ left: 8, top: 48 }}>
              <Box size={[4, 12, 4]} uv={LEG_L_UV} left={-8} top={0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player3D;
