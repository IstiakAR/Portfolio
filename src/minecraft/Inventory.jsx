import { useState } from "react";

import Player3D from "./Player3D.jsx";
import {
  ARMOR,
  ARROW_ROWS,
  CRAFT_INPUTS,
  CRAFT_RESULT,
  PROJECTS,
  SKILLS,
} from "./inventoryData.js";

function Tooltip({ name, desc }) {
  return (
    <span className="mc-tip">
      <span className="mc-tip-name">{name}</span>
      {desc && <span className="mc-tip-desc">{desc}</span>}
    </span>
  );
}

function ItemSlot({ item }) {
  return (
    <div className="mc-cell">
      <div className="mc-slot">
        <span className="mc-item">{item.icon}</span>
        <Tooltip name={item.name} desc={item.desc} />
      </div>
    </div>
  );
}

function EmptySlot() {
  return (
    <div className="mc-cell">
      <div className="mc-slot" />
    </div>
  );
}

function PixelArrow() {
  return (
    <div className="mc-arrow" aria-hidden="true">
      {ARROW_ROWS.map(([left, width], i) => (
        <div key={i} style={{ marginLeft: left, width }} />
      ))}
    </div>
  );
}

export default function Inventory() {
  const [recipeOpen, setRecipeOpen] = useState(false);



  return (
    <div className="mc">

      <div className="mc-window">
        {/* Top: armor | player | crafting */}
        <div className="mc-top">
          <div className="mc-armor-col">
            {ARMOR.map((a) => (
              <a
                key={a.slot}
                className="mc-cell"
                href={a.href}
                target={a.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
              >
                <div className="mc-slot">
                  <div className={`mc-ghost mc-ghost-${a.shape}`} />
                  <Tooltip name={a.name} desc={a.slot} />
                </div>
              </a>
            ))}
          </div>

          <Player3D />

          <div className="mc-craft">
            <div className="mc-craft-title">Crafting</div>
            <div className="mc-craft-row">
              <div className="mc-craft-grid">
                {CRAFT_INPUTS.map((c) => (
                  <ItemSlot key={c.name} item={c} />
                ))}
                <EmptySlot />
              </div>
              <PixelArrow />
              <ItemSlot item={CRAFT_RESULT} />
            </div>
          </div>
        </div>

        {/* Recipe book + off-hand slot */}
        <div className="mc-offhand-row">
          <button
            className="mc-book"
            onClick={() => setRecipeOpen(true)}
            title="Recipe Book"
            aria-label="Open contact"
          />
          <div className="mc-cell">
            <div className="mc-slot">
              <div className="mc-ghost mc-ghost-shield" />
              <Tooltip name="Shield" desc="Blocks distractions" />
            </div>
          </div>
        </div>

        {/* Main inventory: 27 slots, mostly empty */}
        <div className="mc-grid">
          {SKILLS.map((s) => (
            <ItemSlot key={s.name} item={s} />
          ))}
          {Array.from({ length: 27 - SKILLS.length }, (_, i) => (
            <EmptySlot key={`empty-${i}`} />
          ))}
        </div>

        {/* Hotbar: 4 projects + contact, rest empty */}
        <div className="mc-grid mc-hotbar">
          {PROJECTS.map((p) => (
            <ItemSlot key={p.name} item={p} />
          ))}
          {Array.from({ length: 4 }, (_, i) => (
            <EmptySlot key={`hb-empty-${i}`} />
          ))}
          <div className="mc-cell" onClick={() => setRecipeOpen(true)}>
            <div className="mc-slot" style={{ cursor: "pointer" }}>
              <span className="mc-item">✉️</span>
              <Tooltip name="Contact" desc="Send a message" />
            </div>
          </div>
        </div>
      </div>

      <div className="mc-hud">
        <span>❤❤❤❤❤❤❤❤❤❤</span>
        <span>x: -42 · y: 64 · z: 7</span>
        <span>Biome: Overworld</span>
      </div>

      <div className="mc-footer">hover a slot to inspect · hotbar holds the latest builds</div>

      {recipeOpen && (
        <div className="mc-overlay" onClick={() => setRecipeOpen(false)}>
          <div className="mc-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mc-modal-title">Craft a Message</div>
            <div className="mc-mail">alex@example.com</div>
            <div className="mc-links">
              {ARMOR.map((a) => (
                <a
                  key={a.name}
                  className="mc-cell"
                  href={a.href}
                  target={a.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                >
                  <div className="mc-slot">
                    <span className="mc-item">{a.icon}</span>
                    <Tooltip name={a.name} />
                  </div>
                </a>
              ))}
            </div>
            <button className="mc-close" onClick={() => setRecipeOpen(false)}>
              ✕ CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
