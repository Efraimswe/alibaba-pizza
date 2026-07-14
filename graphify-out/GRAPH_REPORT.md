# Graph Report - /home/skaylet/dev/alibaba-pizza  (2026-07-14)

## Corpus Check
- Corpus is ~1,057 words - fits in a single context window. You may not need a graph.

## Summary
- 71 nodes · 59 edges · 16 communities (7 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 210,259 input · 0 output

## Community Hubs (Navigation)
- TypeScript Compiler Options
- Project Docs & Tooling
- Dev Dependencies
- Package Manifest
- Root Layout & Fonts
- NPM Scripts
- TSConfig Scope
- ESLint Config
- Next.js Config
- PostCSS Config
- File Icon
- Globe Icon
- Next.js Logo
- Vercel Logo
- Window Icon

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Next.js` - 6 edges
3. `scripts` - 5 edges
4. `pnpm-workspace allowBuilds config` - 3 edges
5. `paths` - 2 edges
6. `next/font` - 2 edges
7. `Geist (font family)` - 2 edges
8. `Vercel Platform` - 2 edges
9. `pnpm` - 2 edges
10. `geistSans` - 1 edges

## Surprising Connections (you probably didn't know these)
- `pnpm` --conceptually_related_to--> `pnpm-workspace allowBuilds config`  [INFERRED]
  README.md → pnpm-workspace.yaml

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **pnpm-based project tooling setup** — readme_next_js, readme_pnpm, pnpm_workspace_allowbuilds [INFERRED 0.70]

## Communities (16 total, 9 thin omitted)

### Community 0 - "TypeScript Compiler Options"
Cohesion: 0.12
Nodes (17): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+9 more)

### Community 1 - "Project Docs & Tooling"
Cohesion: 0.20
Nodes (11): pnpm-workspace allowBuilds config, sharp (npm package), unrs-resolver (npm package), app/page.tsx, create-next-app, Geist (font family), next/font, Next.js (+3 more)

### Community 2 - "Dev Dependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+1 more)

### Community 3 - "Package Manifest"
Cohesion: 0.25
Nodes (7): dependencies, next, react, react-dom, name, private, version

### Community 4 - "Root Layout & Fonts"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 5 - "NPM Scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

## Knowledge Gaps
- **51 isolated node(s):** `geistSans`, `geistMono`, `metadata`, `eslintConfig`, `nextConfig` (+46 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `compilerOptions` connect `TypeScript Compiler Options` to `TSConfig Scope`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Dev Dependencies` to `Package Manifest`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **Why does `scripts` connect `NPM Scripts` to `Package Manifest`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **What connects `geistSans`, `geistMono`, `metadata` to the rest of the system?**
  _51 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `TypeScript Compiler Options` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._