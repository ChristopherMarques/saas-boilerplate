---
name: SaaS Boilerplate
description: A high-performance SaaS boilerplate with premium aesthetics.
colors:
  primary: "hsl(351 97% 43.1%)"
  neutral-bg: "hsl(0 0% 10.2%)"
  neutral-surface: "hsl(0 0% 13%)"
  neutral-border: "hsl(0 0% 20%)"
  text-primary: "hsl(0 100% 97.3%)"
  text-muted: "hsl(0 0% 55%)"
typography:
  display:
    fontFamily: "Archivo Black, Inter, sans-serif"
    fontWeight: 400
  body:
    fontFamily: "Inter, sans-serif"
    fontWeight: 400
  mono:
    fontFamily: "JetBrains Mono, monospace"
    fontWeight: 400
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.625rem"
  xl: "0.75rem"
spacing:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "1rem"
---

# Design System: SaaS Boilerplate

## Overview

**Creative North Star: "The Aggressive Innovator"**

A bold, high-contrast, strictly dark-mode aesthetic that favors distinctiveness over generic SaaS cleanliness. It combines brutalist typography (Archivo Black) with delicate glassmorphism and subtle noise textures. The environment feels tactile, focused, and unashamedly premium.

**Key Characteristics:**
- Forced dark mode with deep black/gray backgrounds.
- High-contrast crimson primary accents.
- Subtle background noise and animated particles.
- Glassmorphism for floating elements (navbars, dialogs).

## Colors

A highly restrained dark palette punctured by a vibrant crimson.

### Primary
- **Crimson Red** (hsl(351 97% 43.1%)): Used for primary calls to action, scrollbars, and focus rings. High urgency, high energy.

### Neutral
- **Deep Void** (hsl(0 0% 10.2%)): The absolute background.
- **Raised Surface** (hsl(0 0% 13%)): Cards and popovers.
- **Structural Border** (hsl(0 0% 20%)): Subtle demarcations.
- **Starlight Text** (hsl(0 100% 97.3%)): Primary reading text.
- **Muted Text** (hsl(0 0% 55%)): Secondary information and metadata.

**The One Voice Rule.** The primary crimson is used sparingly. Its rarity is the point.

## Typography

**Display Font:** Archivo Black (with Inter)
**Body Font:** Inter (with system-ui)
**Label/Mono Font:** JetBrains Mono

**Character:** Bold, unapologetic headers paired with highly legible, utilitarian body text.

### Hierarchy
- **Display** (400, large clamp): Hero headlines only. Unmissable.
- **Headline** (400, large): Major section boundaries.
- **Body** (400, 1rem): Primary reading text.
- **Label** (400, small, uppercase tracking): Metadata and small UI elements.

**The Brutalist Header Rule.** Display text is thick, tight, and demands attention.

## Layout

Centered max-width containers (max-w-6xl) with generous horizontal padding. Components breathe with distinct negative space, avoiding claustrophobic data-density unless explicitly in an operative table.

## Elevation & Depth

Surfaces rely on subtle lightness shifts (hsl(0 0% 13%) over hsl(0 0% 10.2%)) and glassmorphism (translucency + backdrop blur) rather than traditional drop shadows.

**The Glass Rule.** Floating elements (like sticky headers) use backdrop-filter blur instead of opaque backgrounds to maintain connection with the texture underneath.

## Shapes

Slightly rounded corners (0.5rem for cards) to soften the aggressive color palette. Inputs and buttons share consistent border radii to feel part of the same physical system.

## Components

### Buttons
- **Shape:** Medium radius (0.5rem).
- **Primary:** Solid Crimson Red background with Starlight Text.
- **Hover / Focus:** Slight opacity shift or brightness increase; crimson focus ring.

### Cards / Containers
- **Corner Style:** Medium to Large radius (0.5rem - 0.75rem).
- **Background:** Raised Surface (hsl(0 0% 13%)).
- **Border:** Structural Border (1px solid hsl(0 0% 20%)).

## Do's and Don'ts

### Do:
- **Do** use glassmorphism for floating overlays to reveal the noise texture underneath.
- **Do** stick to the forced dark mode palette.

### Don't:
- **Don't** use pure white (#FFF) for backgrounds; the design relies on dark space.
- **Don't** overuse the primary crimson; reserve it for interactive or highly critical elements.
