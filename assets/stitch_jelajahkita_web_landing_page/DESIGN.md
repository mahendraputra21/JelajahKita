---
name: Warm Tactile Family Board Game
colors:
  surface: '#fdf9f4'
  surface-dim: '#ddd9d5'
  surface-bright: '#fdf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3ee'
  surface-container: '#f1ede8'
  surface-container-high: '#ece7e3'
  surface-container-highest: '#e6e2dd'
  on-surface: '#1c1c19'
  on-surface-variant: '#424843'
  inverse-surface: '#31302d'
  inverse-on-surface: '#f4f0eb'
  outline: '#727973'
  outline-variant: '#c1c8c1'
  surface-tint: '#446651'
  primary: '#062919'
  on-primary: '#ffffff'
  primary-container: '#1e3f2d'
  on-primary-container: '#86aa93'
  inverse-primary: '#aacfb6'
  secondary: '#99452c'
  on-secondary: '#ffffff'
  secondary-container: '#ff9475'
  on-secondary-container: '#762b14'
  tertiary: '#331e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#503200'
  on-tertiary-container: '#d6952f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c6ecd2'
  primary-fixed-dim: '#aacfb6'
  on-primary-fixed: '#002111'
  on-primary-fixed-variant: '#2c4e3b'
  secondary-fixed: '#ffdbd1'
  secondary-fixed-dim: '#ffb5a0'
  on-secondary-fixed: '#3b0900'
  on-secondary-fixed-variant: '#7b2e17'
  tertiary-fixed: '#ffddb4'
  tertiary-fixed-dim: '#ffb955'
  on-tertiary-fixed: '#291800'
  on-tertiary-fixed-variant: '#633f00'
  background: '#fdf9f4'
  on-background: '#1c1c19'
  surface-variant: '#e6e2dd'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 34px
    fontWeight: '800'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '800'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '800'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 26px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.03em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 0.875rem
  gutter-mobile: 0.75rem
  margin: 1.25rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.875rem
  space-lg: 1.25rem
  space-xl: 1.75rem
---

## Brand & Style

This design system translates the grounding, intimate feel of physical tabletop board games into an accessible mobile-first web interface tailored for Android WebView displays. The atmosphere evokes wooden tokens, thick linen-finish cardstock, smooth river pebbles, and gathering around a sunlit dining table.

The design movement is **Tactile Skeuomorphism paired with Organic Modernism**. Instead of digital-native glassmorphism or sterile corporate SaaS flat geometry, the system embraces physical board game metaphors:
- Raised pressable card surfaces with tangible click-down depth.
- Warm, earthy color harmonies rooted in nature—deep forest greens, sunlit amber, raw terracotta, and unbleached cream paper.
- Rounded, soft-contoured interaction zones that feel gentle, friendly, and forgiving for multi-generational play (children to grandparents).
- Clear, highly legible game states that eliminate visual noise and foster calm, cooperative celebration.

## Colors

The palette is derived from natural landscape elements and artisanal board game materials. Every tone is warm-skewed to avoid cold bluish digital whites or sterile grays.

### Core Swatches
- **Primary (`#1E3F2D` - Deep Forest Green):** Anchors primary actions, turn indicators, active player rings, and major confirmation banners.
- **Secondary (`#E27D60` - Soft Terracotta):** Used for cooperative milestone badges, warm alerts, and Player 3 token accents.
- **Tertiary (`#E6A23C` - Warm Amber):** Highlights mission prompts, active dice/spinner states, resource markers, and playful instructions.
- **Neutral Primary (`#2C2B28` - Dark Bark):** High-contrast typography and icon fills, replacing harsh `#000000` with deep organic pigment.

### Supporting & Canvas Swatches
- **Canvas Base (`#FAF7F0` - Warm Ivory / Cream):** The underlying table surface.
- **Card Surface (`#FFFDF9` - Warm Card Stock):** Slightly elevated playable elements with paper-like lightness.
- **Player & Path Accents:**
  - Lake Blue (`#6890AA`): Player 4 tokens, water routes, and secondary informational badges.
  - Soft Lavender (`#8E7DBE`): Exploration cards, mystery tiles, and family prompt categories.
  - Sage (`#8FA88D`): Muted trails, passive track boundaries, and non-intrusive container borders.
  - Subdued Bark Tint (`rgba(44, 43, 40, 0.08)`): Subtle linen-textured dividers and inactive track strokes.

## Typography

The typography relies on **Plus Jakarta Sans** across all levels to deliver a rounded, friendly, yet structurally grounded family reading experience.

### Hierarchy & Usage
- **Display & Headlines (`800 Extrabold`):** Used for mission outcomes, player turn announcements ("GILIRAN BAPAK"), round summaries, and celebration headers. The tight letter tracking gives headers a printed wooden block feel.
- **Subheadings & Labels (`700 Bold` & `600 SemiBold`):** Employed for card titles, active choice options, chip counters, and timer meters. Uppercase styling with expanded tracking (`0.03em - 0.04em`) is strictly reserved for mini card flags (e.g., "KARTU TANTANGAN", "EDISI MEJA KELUARGA").
- **Body Text (`500 Medium` & `400 Regular`):** Medium is the default reading weight for prompt instructions and collaborative trivia cards to ensure effortless readability on various Android WebView resolutions under natural light.

## Layout & Spacing

The layout is built for **touch-first WebView enclosures**, prioritizing thumb ergonomics and shared table-view orientation.

### Layout Model
- **Mobile Handheld (360px – 480px):** Single-column stacked fluid grid with `margin-mobile: 1rem` and `gutter-mobile: 0.75rem`. Essential game actions (rolling, picking cards, ending turns) are docked into a sticky, pill-shaped bottom dock.
- **Tablet / Shared Centerpiece (481px – 840px):** 2-to-4 column fluid grid simulating an open tabletop. The central playmat hosts the interactive board canvas, flanked by player token docks on the margins.
- **Safe Bounds:** Top safe area incorporates 12px dynamic padding for Android status bars; bottom safe area includes 16px to protect navigation bars from accidental turn advances.

### Spacing Rhythm
Spacing is rhythmic and tactile:
- `space-xs` (4px) and `space-sm` (8px) govern tight card icon-text clusters and token status pills.
- `space-md` (14px) provides breathing space within card interiors.
- `space-lg` (20px) and `space-xl` (28px) enforce generous touch separation between interactive tiles, preventing accidental mis-taps by younger players.

## Elevation & Depth

Visual hierarchy uses physical board game material depth instead of synthetic glowing blur. Surfaces mimic 2mm to 4mm punchboard tiles laid over natural cloth.

### The Tactile Shadow Paradigm
All shadows are tinted using **Dark Bark (`#2C2B28`)** with low opacity and high diffusion, combined with a subtle downward solid offset to create a physically stamped feel:
- **Resting Board Tile (Level 1):** `0 2px 0 #EADDC7, 0 4px 10px rgba(44, 43, 40, 0.06)` — Simulates a die-cut cardboard counter resting on the board.
- **Interactive Card (Level 2):** `0 4px 0 #D9CBB0, 0 8px 16px rgba(44, 43, 40, 0.09)` — A playable card held slightly above the mat.
- **Floating Modal / Drawn Card (Level 3):** `0 8px 0 #C9BBA0, 0 16px 28px rgba(44, 43, 40, 0.14)` — A drawn card presented to the entire family circle.
- **Pressed State (All Interactive Levels):** `0 1px 0 #C9BBA0, translateY(3px)` with instant spring physics (`cubic-bezier(0.34, 1.56, 0.64, 1)`), providing tactile tactile feedback like pushing a physical plastic/wooden button into a slot.

## Shapes

The interface embraces a **Round Organic (`2`)** silhouette profile. Sharp 90-degree corners are eliminated to evoke wooden meeple edges, tumbled stones, and rounded-corner playing cards.

### Shape Hierarchy
- **Standard Cards & Playfield Tiles:** Defined with `rounded-lg` (16px / 1rem) for an authentic bridge-sized card feel.
- **Interactive Buttons & Token Counters:** Defined with full pill geometry (`9999px`) to emulate smooth game tokens.
- **Container Sheets & Overlays:** Defined with `rounded-xl` (24px / 1.5rem) on top edges to simulate rounded paper mats unrolled onto the table.
- **Borders:** Subtle structural outlines (1.5px to 2px solid) tinted in Sage (`#8FA88D`) or lightened Bark (`#EADDC7`) reinforce the edges of die-cut cardboard.

## Components

### 1. Buttons (Physical Tokens)
- **Primary Action (e.g., "Kocok Dadu", "Selesai Giliran"):** Thick pill button in Deep Forest Green (`#1E3F2D`) with white bold text, supported by an inset top bevel (`inset 0 1px 0 rgba(255,255,255,0.25)`) and a bottom mechanical lip (`box-shadow: 0 4px 0 #13281D`). On active press, the button drops 3px down and reduces the bottom lip to 1px.
- **Secondary Action:** Warm Amber (`#E6A23C`) button with Dark Bark typography, styled with the same stamped 3D bottom bevel (`box-shadow: 0 4px 0 #B97F29`).
- **Tertiary / Utility:** Warm Ivory background, 2px solid border in Sage (`#8FA88D`), Dark Bark text.

### 2. Family Question & Challenge Cards
- **Base Surface:** Warm Card Surface (`#FFFDF9`) with a 1.5px border of `#EFE7D8`.
- **Category Badge:** Embedded pill top-left using Lake Blue (`#6890AA`) or Soft Lavender (`#8E7DBE`) with crisp white label text (`label-sm`).
- **Prompt Typography:** Large, high-contrast, centered Dark Bark text (`headline-sm` or `body-lg`) formatted for group reading across the table.
- **Deck Texture:** Subtle dual-line internal border (inset 4px) simulating classic playing card framing.

### 3. Player Turn Chips & Tokens
- Compact pill-shaped badges displaying the player's avatar, name, and role.
- **Active State:** Forest Green border with an animated pulsing halo in Warm Amber. 
- **Assigned Palette per Player:**
  - Player 1: Forest Green (`#1E3F2D`)
  - Player 2: Warm Amber (`#E6A23C`)
  - Player 3: Soft Terracotta (`#E27D60`)
  - Player 4: Lake Blue (`#6890AA`)

### 4. Interactive Option Selectors (Pills & Radio Tiles)
- Full-width selectable cards with generous padding (`space-md`).
- **Default State:** Warm Ivory surface, subtle `#E3D8C4` stroke, resting flat.
- **Selected State:** Soft Terracotta background tint (10% opacity) with a solid 2px Terracotta outline and a checkmark token embossed in Deep Forest Green.

### 5. Cooperative Resource & Progress Trackers
- A horizontal path meter framed in Sage (`#8FA88D`) with wooden token notches.
- Completed steps fill with Warm Amber; pending steps rest as faint Bark dots.
- Step counters use `headline-sm` to maintain clarity even when the device is placed in the center of the table.

### 6. Modal Sheets & Dialogue Overlays
- Slide-up bottom sheets with generous top corner rounding (28px).
- Handle bar styled as an organic indented groove (36px wide, 4px thick, color `#D8CCB8`).
- Scrim background applies a darkened warm wash (`rgba(44, 43, 40, 0.45)`) rather than an aggressive dark shade.