import type { MenuItem, MenuCategory, CreateMenuItemInput, UpdateMenuItemInput } from "@/types/menu";
import { defaultMenuItems } from "@/data/menuItems";
import { isSanityConfigured, sanityFetch } from "@/lib/sanity";
import { normalizeMenuPrice } from "@/lib/pricing";

interface SanityMenuItemDocument {
  _id: string;
  name: string;
  description: string;
  price: string;
  category: MenuCategory;
  image?: string;
  videoUrl?: string;
  ingredients?: string[];
  calories?: number;
  dietaryTags?: string[];
}

const menuProjection = `{
  _id,
  name,
  description,
  price,
  category,
  "image": image.asset->url,
  videoUrl,
  ingredients,
  calories,
  dietaryTags
}`;

function mapSanityMenuItem(item: SanityMenuItemDocument): MenuItem {
  return {
    id: item._id,
    name: item.name,
    description: item.description,
    price: normalizeMenuPrice(item.price),
    category: item.category,
    image: item.image,
    videoUrl: item.videoUrl,
    ingredients: item.ingredients,
    calories: item.calories,
    dietaryTags: item.dietaryTags,
  };
}

async function getSanityMenuItems(category?: MenuCategory) {
  const query = category
    ? `*[_type == "menuItem" && category == $category] | order(name asc) ${menuProjection}`
    : `*[_type == "menuItem"] | order(category asc, name asc) ${menuProjection}`;
  const result = await sanityFetch<SanityMenuItemDocument[]>(query, { category });
  return result.map(mapSanityMenuItem);
}

export async function getMenuItems(category?: MenuCategory): Promise<MenuItem[]> {
  if (isSanityConfigured()) {
    try {
      return await getSanityMenuItems(category);
    } catch (error) {
      console.warn("Falling back to local menu items because Sanity could not be reached.", error);
    }
  }

  await delay(0);
  if (!category) return defaultMenuItems;
  return defaultMenuItems.filter((item) => item.category === category);
}

export async function getMenuItem(id: string): Promise<MenuItem | undefined> {
  if (isSanityConfigured()) {
    try {
      const query = `*[_type == "menuItem" && _id == $id][0] ${menuProjection}`;
      const result = await sanityFetch<SanityMenuItemDocument | null>(query, { id });
      return result ? mapSanityMenuItem(result) : undefined;
    } catch (error) {
      console.warn("Falling back to local menu item because Sanity could not be reached.", error);
    }
  }

  await delay(0);
  return defaultMenuItems.find((item) => item.id === id);
}

export async function createMenuItem(input: CreateMenuItemInput): Promise<MenuItem> {
  await delay(0);
  const newItem: MenuItem = { ...input, id: crypto.randomUUID(), price: normalizeMenuPrice(input.price) };
  defaultMenuItems.push(newItem);
  return newItem;
}

export async function updateMenuItem(id: string, input: UpdateMenuItemInput): Promise<MenuItem> {
  await delay(0);
  const index = defaultMenuItems.findIndex((item) => item.id === id);
  if (index === -1) throw new Error("Menu item not found");
  defaultMenuItems[index] = {
    ...defaultMenuItems[index],
    ...input,
    ...(input.price ? { price: normalizeMenuPrice(input.price) } : {}),
  };
  return defaultMenuItems[index];
}

export async function deleteMenuItem(id: string): Promise<void> {
  await delay(0);
  const index = defaultMenuItems.findIndex((item) => item.id === id);
  if (index !== -1) defaultMenuItems.splice(index, 1);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
