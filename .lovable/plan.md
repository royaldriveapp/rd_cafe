

# Smoother Animations + Flip Cards with Nutritional Info

## Overview
Two main improvements: (1) polish all animations across the site for buttery-smooth transitions, and (2) add a 3D flip effect to every menu card so hovering/tapping reveals ingredients and calorie info on the back.

---

## 1. Flip Card Effect on Menu Items

### How it works
- Each menu card becomes a 3D flip container using CSS `perspective` and `transform-style: preserve-3d`
- **Front face**: The existing card (image + name + price + description)
- **Back face**: A warm-toned card showing ingredients list, calorie count, and dietary tags (vegan, gluten-free, etc.)
- **Trigger**: Hover on desktop, tap on mobile (toggle flip state)
- Clicking the back side still opens the preview dialog

### Data changes
Add new optional fields to the `MenuItem` type:
- `ingredients?: string[]` — e.g. `["Espresso", "Steamed Milk", "Vanilla Syrup"]`
- `calories?: number` — e.g. `220`
- `dietaryTags?: string[]` — e.g. `["Vegetarian", "Contains Dairy"]`

Populate these fields in `menuService.ts` and `FeaturedMenu.tsx` for all items.

### Card structure
The `MenuItemCard` component will wrap front and back in a perspective container:
- Outer div: `perspective: 1200px`
- Inner div: `transform-style: preserve-3d`, rotates `rotateY(180deg)` on flip
- Front div: `backface-visibility: hidden` (existing card content)
- Back div: `backface-visibility: hidden`, `rotateY(180deg)` (nutritional info)
- Smooth 0.6s cubic-bezier transition

### Back face design
- Warm gradient background matching the cafe aesthetic
- Item name at top (smaller)
- "Ingredients" section with a clean list
- Calorie badge (e.g., "220 kcal") with a subtle icon
- Dietary tags as small pills/badges
- A subtle "Tap for details" hint at the bottom

---

## 2. Smoother Global Animations

### CSS transition improvements
- Increase the global transition to include `box-shadow`, `transform`, and `opacity` for smoother interactive feedback
- Use `cubic-bezier(0.4, 0, 0.2, 1)` (Material ease) instead of plain `ease` for more natural motion

### Framer Motion improvements in `lib/animations.ts`
- Switch default easing to a custom cubic-bezier `[0.25, 0.46, 0.45, 0.94]` for silkier fade-ups
- Slightly increase durations (0.5 to 0.6s for fade-ups, 0.6 to 0.8s for section headers)
- Add a new `smoothSpring` transition preset with lower stiffness (300) and higher damping (35) for bouncier but controlled motion

### Page-level transitions
- Wrap route content with `AnimatePresence` and add a subtle fade transition (opacity 0 to 1, 0.3s) when navigating between pages

---

## Technical Details

### Files to modify
- **`src/types/menu.ts`** — Add `ingredients`, `calories`, `dietaryTags` fields
- **`src/services/menuService.ts`** — Populate nutritional data for all 23 menu items
- **`src/components/home/FeaturedMenu.tsx`** — Add nutritional data to the 4 featured items
- **`src/components/menu/MenuItemCard.tsx`** — Rebuild as a 3D flip card with front/back faces
- **`src/lib/animations.ts`** — Smoother easing curves, new spring preset, flip variants
- **`src/index.css`** — Add flip card CSS utilities, smoother global transitions
- **`src/App.tsx`** — Add `AnimatePresence` around routes for page transitions

### No new dependencies required
Everything uses existing `framer-motion` + CSS transforms.

