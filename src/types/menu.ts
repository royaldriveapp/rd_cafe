export type MenuCategory = "coffee" | "beverages" | "desserts" | "bites";

export interface MenuItem {
  id: string;
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

export type CreateMenuItemInput = Omit<MenuItem, "id">;
export type UpdateMenuItemInput = Partial<CreateMenuItemInput>;
