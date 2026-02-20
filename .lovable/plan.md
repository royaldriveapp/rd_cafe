
# Menu Item Preview with YouTube Video Popups and API Support

## What We're Building

1. **YouTube Video Preview Dialog** -- Clicking a menu item opens a popup with an embedded YouTube video so visitors can learn more about each item.

2. **Cleaner, Smaller Cards** -- Slightly smaller card sizing, bolder/thicker text matching the site's serif style, and a soft gradient overlay on the image instead of a solid bar for the item name/price.

3. **API-Ready Architecture** -- A dedicated menu items hook and service layer so menu data (including YouTube URLs) can be fetched from or sent to an external API or Supabase backend.

---

## Visual Changes

**Card Redesign (Menu page + Featured Menu on homepage):**
- Reduce card size slightly (switch from `aspect-video` to a tighter ratio, smaller padding)
- Replace the current text section below the image with a **soft gradient overlay** at the bottom of the image itself -- name, price, and description float over a warm transparent-to-dark gradient
- Make item name use `font-serif font-semibold text-lg` (thicker, matching site style)
- Add a subtle play icon overlay hint on cards that have a video
- For items without images, use a clean minimal card with the same gradient feel

**Video Preview Dialog:**
- Uses the existing Radix Dialog component
- Opens when clicking any menu card
- Shows the item name, description, price, and an embedded YouTube iframe (16:9 aspect ratio)
- If no video URL is set, shows the item image with details instead
- Smooth open/close animations (already handled by Radix)

---

## Technical Details

### New Files

1. **`src/types/menu.ts`** -- Shared `MenuItem` type with optional `videoUrl` field
2. **`src/services/menuService.ts`** -- API service layer with `getMenuItems()`, `getMenuItem(id)`, `updateMenuItem()`, `createMenuItem()`, `deleteMenuItem()` functions. Initially returns local data but structured for easy swap to fetch/Supabase calls.
3. **`src/hooks/useMenuItems.ts`** -- React Query hook wrapping the service, provides `{ data, isLoading, error, refetch }` plus mutation hooks for CRUD operations
4. **`src/components/menu/MenuItemCard.tsx`** -- New shared card component used by both Menu page and FeaturedMenu
5. **`src/components/menu/MenuPreviewDialog.tsx`** -- Dialog component with YouTube embed and item details

### Modified Files

1. **`src/pages/Menu.tsx`** -- Replace inline card rendering with new `MenuItemCard`, add `MenuPreviewDialog`, use `useMenuItems` hook instead of hardcoded array
2. **`src/components/home/FeaturedMenu.tsx`** -- Use new `MenuItemCard` component for consistency

### Data Shape

```text
MenuItem {
  id: string
  name: string
  description: string
  price: string
  category: "coffee" | "beverages" | "desserts" | "bites"
  image?: string
  videoUrl?: string       // YouTube embed URL
}
```

### API Service Structure

The `menuService.ts` will export functions with this pattern:

```text
getMenuItems(category?) --> MenuItem[]
getMenuItem(id)         --> MenuItem
createMenuItem(data)    --> MenuItem
updateMenuItem(id, data)--> MenuItem
deleteMenuItem(id)      --> void
```

Initially backed by local data, each function is an async wrapper ready to swap to `fetch()` or Supabase client calls. The React Query hooks will handle caching, re-fetching, and optimistic updates.

### Card Gradient Approach

Instead of a separate text area below the image, the card will use:
- Full image as background covering the entire card
- A CSS gradient overlay from `transparent` at top to `rgba(dark, 0.75)` at bottom
- Text (name, price, description) positioned absolutely at the bottom over the gradient
- This creates a premium, editorial look

### YouTube Embed

The dialog extracts the YouTube video ID from the `videoUrl` and renders:
```text
<iframe src="https://www.youtube.com/embed/{videoId}" .../>
```
with proper `allow` attributes for autoplay and fullscreen.

---

## Implementation Order

1. Create `types/menu.ts` with the shared type
2. Create `services/menuService.ts` with local data + API-ready functions
3. Create `hooks/useMenuItems.ts` with React Query integration
4. Create `components/menu/MenuPreviewDialog.tsx` dialog with YouTube embed
5. Create `components/menu/MenuItemCard.tsx` with new gradient overlay design
6. Update `pages/Menu.tsx` to use new components and hook
7. Update `components/home/FeaturedMenu.tsx` to use new card component
