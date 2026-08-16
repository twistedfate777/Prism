---
name: Serene Guardian
colors:
  surface: '#fcf8ff'
  surface-dim: '#dcd9df'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f2f9'
  surface-container: '#f0ecf3'
  surface-container-high: '#eae7ed'
  surface-container-highest: '#e4e1e8'
  on-surface: '#1b1b20'
  on-surface-variant: '#464650'
  inverse-surface: '#303035'
  inverse-on-surface: '#f3eff6'
  outline: '#777681'
  outline-variant: '#c7c5d2'
  surface-tint: '#55589b'
  primary: '#141558'
  on-primary: '#ffffff'
  primary-container: '#2b2d6e'
  on-primary-container: '#9597df'
  inverse-primary: '#c0c1ff'
  secondary: '#006b58'
  on-secondary: '#ffffff'
  secondary-container: '#6df6d4'
  on-secondary-container: '#00705c'
  tertiary: '#301c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#4c2f00'
  on-tertiary-container: '#d59024'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#101054'
  on-primary-fixed-variant: '#3d4081'
  secondary-fixed: '#70f9d7'
  secondary-fixed-dim: '#4fdcbc'
  on-secondary-fixed: '#002019'
  on-secondary-fixed-variant: '#005142'
  tertiary-fixed: '#ffddb5'
  tertiary-fixed-dim: '#ffb958'
  on-tertiary-fixed: '#2a1800'
  on-tertiary-fixed-variant: '#643f00'
  background: '#fcf8ff'
  on-background: '#1b1b20'
  surface-variant: '#e4e1e8'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding-mobile: 20px
  container-padding-desktop: 40px
  gutter: 24px
  section-gap: 64px
---

## Brand & Style

The design system is built on the philosophy of "Protective Calm." Unlike traditional security software that leverages fear and urgency, this system adopts an editorial, lifestyle-oriented aesthetic. It communicates safety through clarity, breathing room, and a composed visual hierarchy.

The style is a hybrid of **Modern Corporate** and **Minimalism**, prioritizing high-quality typography and a card-based layout that feels more like a wellness app than a utility. The emotional response should be one of relief and confidence—moving away from "alarmist alerts" toward "mindful protection."

## Colors

The palette is designed to de-escalate tension. The primary Indigo provides a foundation of professional trust, while the Emerald accent signifies a "healthy" state. 

Crucially, the "Risk" color is a soft Coral rather than a harsh red, and the "Caution" color is a warm Amber. These choices ensure that users remain informed without feeling panicked. The background is a warm off-white, providing a softer contrast than pure white, which reduces eye strain and enhances the editorial feel.

## Typography

The typography strategy pairs the friendly, geometric curves of **Plus Jakarta Sans** for headings with the systematic legibility of **Inter** for functional text. 

Headlines should be set with tighter letter-spacing to maintain an editorial "locked-in" feel. Body text utilizes a generous line height to ensure readability, especially for multi-lingual support (Bahasa Indonesia/English) where word lengths vary significantly. Use `label-sm` sparingly for category eyebrows or status indicators.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop (max-width 1200px) and a **Fluid** approach on mobile. To maintain the "calm" atmosphere, vertical rhythm is loose; section gaps are intentionally large to prevent the UI from feeling cluttered.

- **Desktop:** 12-column grid with 24px gutters.
- **Mobile:** 4-column grid with 20px margins.
- **Alignment:** Center-aligned containers for marketing/editorial views; left-aligned for dashboard/utility views.

Components should utilize an 8px spacing scale, but major layout blocks should lean toward 48px or 64px increments to enforce whitespace.

## Elevation & Depth

This design system avoids high-contrast shadows. Depth is achieved through **Tonal Layers** and extremely soft, diffused ambient shadows.

- **Level 0 (Background):** #FAFAF7.
- **Level 1 (Cards/Surfaces):** White #FFFFFF with a 4% opacity indigo shadow (Blur: 20px, Y-offset: 4px).
- **Level 2 (Modals/Overlays):** White #FFFFFF with a 8% opacity indigo shadow (Blur: 40px, Y-offset: 12px).

Avoid inner shadows or heavy borders. Content is separated by subtle value shifts rather than hard lines.

## Shapes

The shape language is consistently soft to evoke approachability. 

- **Primary Radius:** 16px (1rem) for all main containers and cards.
- **Button Radius:** 12px (0.75rem) to provide a slightly more structured feel than the cards they sit within.
- **Icon Treatment:** Icons should reside within circular or "squircle" containers with 20% opacity background tints of their respective semantic color.

Everything should feel "touchable" and organic; strictly avoid 0px corners.

## Components

### Buttons
- **Primary:** Deep Indigo background, White text. High-contrast, 12px radius.
- **Secondary:** Transparent background, 1px border of Indigo, or light Indigo tint.
- **State Changes:** Hover states should be a subtle darken, never a shift in hue.

### Cards
Cards are the primary container. They must always use the 16px radius and the Level 1 shadow. Padding inside cards should be generous (min 24px).

### Input Fields
Inputs use a 12px radius with a light grey border (#E2E2E6). On focus, the border transitions to Primary Indigo with a 2px outer glow of 10% opacity Indigo.

### Chips & Status Indicators
Status chips use low-saturation background tints (e.g., 10% Emerald background for "Protected" status) with high-saturation text of the same hue.

### Iconography
- **Style:** 2px stroke width, rounded caps and joins.
- **Metaphors:** Use a "shield" sparingly; prefer "circles," "dots," and "locks" with soft edges. To indicate "Scanning," use a pulsing soft ring rather than a spinning radar to maintain the "calm" directive.