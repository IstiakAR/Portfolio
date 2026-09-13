/* Inventory contents — the single source of truth for the slot data.
   Skills fill the inventory grid, projects the hotbar, armor links the
   column on the left, and the crafting grid assembles a web app. */

// Vanilla arrow silhouette: 15 rows of [left, width] in CSS px (22x15 tex * 3)
export const ARROW_ROWS = [
  [63, 3], [57, 9], [51, 15], [45, 21], [39, 27],
  [6, 60], [6, 60], [6, 60], [6, 60], [6, 60],
  [39, 27], [45, 21], [51, 15], [57, 9], [63, 3],
];

export const SKILLS = [
  { icon: "⚛️", name: "React", desc: "UI components" },
  { icon: "🟨", name: "JavaScript", desc: "ES2024" },
  { icon: "🔷", name: "TypeScript", desc: "Static types" },
  { icon: "🎨", name: "CSS", desc: "Styling" },
  { icon: "⚡", name: "Node.js", desc: "Backend runtime" },
  { icon: "🐍", name: "Python", desc: "Scripting & ML" },
  { icon: "🐳", name: "Docker", desc: "Containers" },
  { icon: "☁️", name: "AWS", desc: "Cloud infra" },
  { icon: "🐘", name: "PostgreSQL", desc: "Relational DB" },
  { icon: "🌀", name: "Tailwind", desc: "Utility CSS" },
  { icon: "🧪", name: "Testing", desc: "Jest / Vitest" },
  { icon: "🌳", name: "Git", desc: "Version control" },
];

export const ARMOR = [
  { icon: "🐙", name: "GitHub", slot: "Helmet", shape: "helmet", href: "https://github.com" },
  { icon: "💼", name: "LinkedIn", slot: "Chestplate", shape: "chestplate", href: "https://linkedin.com" },
  { icon: "🐦", name: "X", slot: "Leggings", shape: "leggings", href: "https://x.com" },
  { icon: "✉️", name: "Email", slot: "Boots", shape: "boots", href: "mailto:alex@example.com" },
];

export const CRAFT_INPUTS = [
  { icon: "🌐", name: "HTML", desc: "Ingredient" },
  { icon: "🟨", name: "JavaScript", desc: "Ingredient" },
  { icon: "🎨", name: "CSS", desc: "Ingredient" },
];

export const CRAFT_RESULT = { icon: "⚛️", name: "Web Apps", desc: "HTML + JS + CSS" };

export const PROJECTS = [
  { icon: "⛏️", name: "VoxelForge", desc: "WebGL voxel engine" },
  { icon: "🗺️", name: "CartaCraft", desc: "Interactive world map" },
  { icon: "📦", name: "PackHarbor", desc: "Asset pipeline" },
  { icon: "🎛️", name: "RedstoneSim", desc: "Circuit simulator" },
];
