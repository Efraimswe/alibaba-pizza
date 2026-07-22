# Graph Report - /home/skaylet/dev/alibaba-pizza  (2026-07-20)

## Corpus Check
- 30 files · ~425,107 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 234 nodes · 278 edges · 26 communities (12 shown, 14 thin omitted)
- Extraction: 94% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Design Foundation (Bento v2)
- Typography & Work Plan
- Landing Components
- Locale Layouts (NL/EN/FR)
- Package Dependencies
- TypeScript Config
- Home Pages (per-locale)
- Next.js Scaffold
- Image Manifest Builder
- Cookies Page
- Privacy Page
- ESLint Config
- Next Config
- PostCSS Config
- Metadata
- Metadata
- Metadata
- File Icon
- Globe Icon
- Next.js Logo
- Vercel Logo
- Window Icon
- UIUX Fix Bundle

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `UI/UX Audit — Alibaba Kebab (2026-07-16)` - 16 edges
3. `Production Packaging Plan (2026-07-15)` - 14 edges
4. `Minimal Bento Direction (v2)` - 8 edges
5. `Mobile-First Layout (375px)` - 7 edges
6. `C2 — SEO/AEO Package Task` - 7 edges
7. `Next.js` - 6 edges
8. `C1 — i18n NL/EN/FR Task` - 6 edges
9. `C4 — EU/Belgium Compliance Task` - 6 edges
10. `Alibaba Kebab Lichtaart` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Wireframe Invariants` --semantically_similar_to--> `Audit Verdict (No S1 Blockers)`  [INFERRED] [semantically similar]
  design-foundation.md → uiux-audit-plan.md
- `Opening Hours` --semantically_similar_to--> `Finding 3: 'Today' Not Highlighted in Hours`  [INFERRED] [semantically similar]
  public/llms.txt → uiux-audit-plan.md
- `Decision: Keep Giant Wordmark Hero (Not a Bug)` --references--> `Lobster (Former Logo Font)`  [AMBIGUOUS]
  uiux-audit-plan.md → design-foundation.md
- `pnpm` --conceptually_related_to--> `pnpm-workspace allowBuilds config`  [INFERRED]
  README.md → pnpm-workspace.yaml
- `Production Packaging Plan (2026-07-15)` --references--> `Minimal Bento Direction (v2)`  [EXTRACTED]
  plan.md → design-foundation.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Fix 5 Polish Bundle Resolving Findings 5-9** — uiux_audit_plan_fix_5_polish_bundle, uiux_audit_plan_finding_5_pluralization, uiux_audit_plan_finding_6_price_line_break, uiux_audit_plan_finding_7_ondernemingsnummer_placeholder, uiux_audit_plan_finding_8_no_collapse_button, uiux_audit_plan_finding_9_desktop_callbar_duplicate [EXTRACTED 1.00]
- **AEO/SEO Structured Content Package** — plan_c2_seo_aeo_task, public_llms_alibaba_kebab_lichtaart, plan_jsonld_restaurant_schema, plan_menu_json [INFERRED 0.85]
- **Menu Data Represented Across Design, AEO Doc, and Source** — design_foundation_menu_tickets, public_llms_menu, plan_menu_json [INFERRED 0.85]
- **pnpm-based project tooling setup** — readme_next_js, readme_pnpm, pnpm_workspace_allowbuilds [INFERRED 0.70]

## Communities (26 total, 14 thin omitted)

### Community 0 - "Design Foundation (Bento v2)"
Cohesion: 0.07
Nodes (41): Allergens Note Section, Bento Shape System v2 (radii/shadow, no borders), Color Palette v2 (primary/secondary/bg), Alibaba Kebab — Design Foundation (Document), Info Section (Hours/Address/Phone), Language Dropdown Pop-in Animation (180ms), Mobile-First Layout (375px), Menu 'Chek-Tickets' Pattern (+33 more)

### Community 1 - "Typography & Work Plan"
Cohesion: 0.07
Nodes (34): Karla (Body Font), Lobster (Former Logo Font), Pacifico (Logo Font), Space Grotesk (Display Font), Typography System, app/layout.tsx, C1 — i18n NL/EN/FR Task, C2 — SEO/AEO Package Task (+26 more)

### Community 2 - "Landing Components"
Cohesion: 0.10
Nodes (24): Distance(), Status, Gallery(), PHOTOS, Category, eur(), imgSrc(), Item (+16 more)

### Community 3 - "Locale Layouts (NL/EN/FR)"
Cohesion: 0.12
Nodes (14): golos, lobster, SiteLayout(), siteMetadata, ClickPop(), DetailsAnim(), HopOnView(), Category (+6 more)

### Community 4 - "Package Dependencies"
Cohesion: 0.08
Nodes (23): dependencies, next, react, react-dom, @vercel/analytics, @vercel/speed-insights, devDependencies, eslint (+15 more)

### Community 5 - "TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 6 - "Home Pages (per-locale)"
Cohesion: 0.14
Nodes (10): metadata, metadata, metadata, AllergenKey, DayKey, Dict, dictionaries, en (+2 more)

### Community 7 - "Next.js Scaffold"
Cohesion: 0.20
Nodes (11): pnpm-workspace allowBuilds config, sharp (npm package), unrs-resolver (npm package), app/page.tsx, create-next-app, Geist (font family), next/font, Next.js (+3 more)

### Community 8 - "Image Manifest Builder"
Cohesion: 0.40
Nodes (4): CAT_PROMPT, DEAL_PROMPT, entries, menu

## Ambiguous Edges - Review These
- `Lobster (Former Logo Font)` → `Decision: Keep Giant Wordmark Hero (Not a Bug)`  [AMBIGUOUS]
  uiux-audit-plan.md · relation: references

## Knowledge Gaps
- **108 isolated node(s):** `eslintConfig`, `nextConfig`, `config`, `target`, `lib` (+103 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Lobster (Former Logo Font)` and `Decision: Keep Giant Wordmark Hero (Not a Bug)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `Production Packaging Plan (2026-07-15)` connect `Typography & Work Plan` to `Design Foundation (Bento v2)`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Why does `UI/UX Audit — Alibaba Kebab (2026-07-16)` connect `Design Foundation (Bento v2)` to `Typography & Work Plan`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Why does `Minimal Bento Direction (v2)` connect `Design Foundation (Bento v2)` to `Typography & Work Plan`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `config` to the rest of the system?**
  _109 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Design Foundation (Bento v2)` be split into smaller, more focused modules?**
  _Cohesion score 0.06585365853658537 - nodes in this community are weakly interconnected._
- **Should `Typography & Work Plan` be split into smaller, more focused modules?**
  _Cohesion score 0.0748663101604278 - nodes in this community are weakly interconnected._