const MAX_DEPTH = 7;
const MAX_LEAVES = 400;
const LEAVES_PER_BRANCH = 3;
const FIRST_LEAFY_DEPTH = 2;
const FULL_GROWTH_COUNT = 5000;
const BASE = { x: 400, y: 472 };
const UNIT = 104;
const MIN_HALF_WIDTH = 240;
const PADDING = 28;
const LEAF_COLORS = ["#67e8f9", "#a5f3fc", "#a78bfa", "#c4b5fd", "#f0abfc"];

type Branch = { id: number; depth: number; x1: number; y1: number; x2: number; y2: number };

// Seeded so every render draws the same tree, and keyed by branch id so a branch never changes as the count rises.
function random(seed: number, salt: number) {
  let t = (Math.imul(seed, 2654435761) + Math.imul(salt, 40503) + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function grow(branches: Branch[], id: number, depth: number, x1: number, y1: number, angle: number, length: number) {
  const x2 = x1 + Math.cos(angle) * length;
  const y2 = y1 + Math.sin(angle) * length;
  branches.push({ id, depth, x1, y1, x2, y2 });
  if (depth === MAX_DEPTH) return;
  [-1, 1].forEach((side, index) => {
    const child = id * 2 + index;
    const spread = 0.3 + 0.3 * random(child, 1);
    const wobble = (random(child, 2) - 0.5) * 0.2;
    grow(branches, child, depth + 1, x2, y2, angle + side * spread + wobble, length * (0.74 + 0.1 * random(child, 3)));
  });
}

const branches: Branch[] = [];
grow(branches, 1, 0, 0, 0, -Math.PI / 2, 1);

// The full tree's leaf positions, inner branches first. A count fills the first N, so leaf N always sits in the same spot.
const leafSlots = branches
  .filter((branch) => branch.depth >= FIRST_LEAFY_DEPTH)
  .flatMap((branch) => Array.from({ length: LEAVES_PER_BRANCH }, (_, index) => {
    const salt = 10 + index * 5;
    const along = 0.45 + 0.55 * random(branch.id, salt);
    return {
      depth: branch.depth,
      order: random(branch.id, salt + 1),
      x: branch.x1 + (branch.x2 - branch.x1) * along + (random(branch.id, salt + 2) - 0.5) * 0.12,
      y: branch.y1 + (branch.y2 - branch.y1) * along + (random(branch.id, salt + 3) - 0.5) * 0.12,
      rotation: random(branch.id, salt + 4) * 360,
      color: LEAF_COLORS[Math.floor(random(branch.id, salt + 5) * LEAF_COLORS.length)],
    };
  }))
  .sort((a, b) => a.depth - b.depth || a.order - b.order)
  .slice(0, MAX_LEAVES);

export default function ContributionTree({ count }: { count: number }) {
  // Logarithmic, so a young profile still looks healthy and later contributions keep showing.
  const growth = Math.min(1, Math.log(count + 1) / Math.log(FULL_GROWTH_COUNT + 1));
  const scale = UNIT * (0.5 + 0.5 * growth);
  const leaves = leafSlots.slice(0, count);
  const deepest = Math.max(FIRST_LEAFY_DEPTH, leaves.at(-1)?.depth ?? 0);
  // Past the cap, leaves grow instead of adding more SVG nodes.
  const leafSize = 1 + 0.6 * Math.min(1, Math.max(0, Math.log(count / MAX_LEAVES) / Math.log(FULL_GROWTH_COUNT / MAX_LEAVES)));
  const px = (x: number) => (BASE.x + x * scale).toFixed(1);
  const py = (y: number) => (BASE.y + y * scale).toFixed(1);
  const visible = branches.filter((branch) => branch.depth <= deepest);

  // Crops the canvas to the tree, with a minimum width so a small count isn't blown up to fill the card.
  const halfWidth = Math.max(MIN_HALF_WIDTH, Math.max(...visible.map((branch) => Math.abs(branch.x2))) * scale + PADDING);
  const top = BASE.y + Math.min(...visible.map((branch) => branch.y2)) * scale - PADDING;
  const viewBox = `${(BASE.x - halfWidth).toFixed(0)} ${top.toFixed(0)} ${(halfWidth * 2).toFixed(0)} ${(BASE.y + 18 - top).toFixed(0)}`;

  return (
    <svg viewBox={viewBox} role="img" aria-label="A tree that gains a leaf for each public GitHub contribution" className="h-auto w-full">
      <defs>
        <linearGradient id="tree-bark" gradientUnits="userSpaceOnUse" x1="0" y1={BASE.y} x2="0" y2={BASE.y - 3 * scale}>
          <stop offset="0" stopColor="#64748b" />
          <stop offset="1" stopColor="#67e8f9" />
        </linearGradient>
        <path id="tree-leaf" d="M0 0C3-5 9-5 12 0 9 5 3 5 0 0Z" />
      </defs>
      <ellipse cx={BASE.x} cy={BASE.y + 2} rx="190" ry="9" fill="rgba(103,232,249,.09)" />
      <g stroke="url(#tree-bark)" strokeLinecap="round">
        {visible.map((branch) => (
          <line key={branch.id} x1={px(branch.x1)} y1={py(branch.y1)} x2={px(branch.x2)} y2={py(branch.y2)} strokeWidth={Math.max(1, 12 * (scale / UNIT) * 0.7 ** branch.depth).toFixed(1)} />
        ))}
      </g>
      <g fillOpacity=".9">
        {leaves.map((leaf, index) => (
          <use key={index} href="#tree-leaf" fill={leaf.color} transform={`translate(${px(leaf.x)} ${py(leaf.y)}) rotate(${leaf.rotation.toFixed(0)}) scale(${leafSize.toFixed(2)})`} />
        ))}
      </g>
    </svg>
  );
}
