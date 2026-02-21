import type { MenuItem, MenuCategory, CreateMenuItemInput, UpdateMenuItemInput } from "@/types/menu";
import latteImage from "@/assets/coffee-latte.jpg";
import espressoImage from "@/assets/espresso.jpg";
import croissantImage from "@/assets/croissant.jpg";
import cakeImage from "@/assets/chocolate-cake.jpg";

// Local data — swap with fetch/Supabase calls when ready
const localMenuItems: MenuItem[] = [
  // Coffee
  { id: "1", name: "Signature Latte", description: "Smooth espresso with silky steamed milk and artisan latte art", price: "$5.50", category: "coffee", image: latteImage, videoUrl: "https://www.youtube.com/watch?v=fN_iiDCxjPo", ingredients: ["Espresso", "Steamed Milk", "Vanilla Syrup"], calories: 220, dietaryTags: ["Vegetarian", "Contains Dairy"] },
  { id: "2", name: "Classic Espresso", description: "Rich, bold, and perfectly extracted single origin beans", price: "$4.00", category: "coffee", image: espressoImage, videoUrl: "https://www.youtube.com/watch?v=fN_iiDCxjPo", ingredients: ["Single Origin Coffee Beans", "Filtered Water"], calories: 5, dietaryTags: ["Vegan", "Gluten-Free"] },
  { id: "3", name: "Cappuccino", description: "Perfect balance of espresso, steamed milk, and velvety foam", price: "$5.00", category: "coffee", ingredients: ["Espresso", "Steamed Milk", "Milk Foam"], calories: 150, dietaryTags: ["Vegetarian", "Contains Dairy"] },
  { id: "4", name: "Flat White", description: "Double ristretto with microfoam for a creamy finish", price: "$5.25", category: "coffee", ingredients: ["Double Ristretto", "Microfoam Milk"], calories: 140, dietaryTags: ["Vegetarian", "Contains Dairy"] },
  { id: "5", name: "Pour Over", description: "Hand-crafted single origin coffee, brewed to perfection", price: "$6.00", category: "coffee", ingredients: ["Single Origin Beans", "Filtered Water"], calories: 5, dietaryTags: ["Vegan", "Gluten-Free"] },
  { id: "6", name: "Cold Brew", description: "Smooth, naturally sweet, steeped for 18 hours", price: "$5.50", category: "coffee", ingredients: ["Coarse Ground Coffee", "Cold Filtered Water"], calories: 10, dietaryTags: ["Vegan", "Gluten-Free"] },
  { id: "7", name: "Mocha", description: "Espresso meets rich chocolate and steamed milk", price: "$6.00", category: "coffee", ingredients: ["Espresso", "Dark Chocolate", "Steamed Milk", "Whipped Cream"], calories: 310, dietaryTags: ["Vegetarian", "Contains Dairy"] },
  { id: "8", name: "Affogato", description: "Creamy vanilla gelato drowned in hot espresso", price: "$7.00", category: "coffee", ingredients: ["Vanilla Gelato", "Espresso"], calories: 280, dietaryTags: ["Vegetarian", "Contains Dairy"] },

  // Beverages
  { id: "9", name: "Matcha Latte", description: "Ceremonial grade matcha with oat milk", price: "$6.00", category: "beverages", ingredients: ["Ceremonial Matcha", "Oat Milk", "Honey"], calories: 180, dietaryTags: ["Vegan", "Gluten-Free"] },
  { id: "10", name: "Chai Latte", description: "Spiced chai with warming cinnamon and cardamom", price: "$5.50", category: "beverages", ingredients: ["Black Tea", "Cinnamon", "Cardamom", "Ginger", "Steamed Milk"], calories: 200, dietaryTags: ["Vegetarian", "Contains Dairy"] },
  { id: "11", name: "Hot Chocolate", description: "Rich Belgian chocolate with whipped cream", price: "$5.00", category: "beverages", ingredients: ["Belgian Chocolate", "Whole Milk", "Whipped Cream"], calories: 350, dietaryTags: ["Vegetarian", "Contains Dairy"] },
  { id: "12", name: "Fresh Juice", description: "Seasonal fruits pressed to order", price: "$6.50", category: "beverages", ingredients: ["Seasonal Fruits", "Ice"], calories: 120, dietaryTags: ["Vegan", "Gluten-Free"] },
  { id: "13", name: "Sparkling Water", description: "San Pellegrino 500ml", price: "$4.00", category: "beverages", ingredients: ["Carbonated Mineral Water"], calories: 0, dietaryTags: ["Vegan", "Gluten-Free"] },

  // Desserts
  { id: "14", name: "Chocolate Fondant", description: "Decadent dark chocolate cake with velvety cocoa dust", price: "$7.00", category: "desserts", image: cakeImage, ingredients: ["Dark Chocolate", "Butter", "Eggs", "Sugar", "Flour", "Cocoa Powder"], calories: 420, dietaryTags: ["Vegetarian", "Contains Gluten"] },
  { id: "15", name: "Fresh Croissant", description: "Buttery, flaky layers baked fresh every morning", price: "$4.50", category: "desserts", image: croissantImage, ingredients: ["Flour", "Butter", "Yeast", "Sugar", "Salt"], calories: 280, dietaryTags: ["Vegetarian", "Contains Gluten", "Contains Dairy"] },
  { id: "16", name: "Tiramisu", description: "Classic Italian layers of mascarpone and espresso", price: "$8.00", category: "desserts", ingredients: ["Mascarpone", "Espresso", "Ladyfingers", "Cocoa", "Eggs"], calories: 380, dietaryTags: ["Vegetarian", "Contains Gluten", "Contains Dairy"] },
  { id: "17", name: "Cheesecake", description: "New York style with berry compote", price: "$7.50", category: "desserts", ingredients: ["Cream Cheese", "Graham Cracker", "Eggs", "Sugar", "Mixed Berries"], calories: 410, dietaryTags: ["Vegetarian", "Contains Gluten"] },
  { id: "18", name: "Cinnamon Roll", description: "Warm, gooey, with cream cheese glaze", price: "$5.00", category: "desserts", ingredients: ["Flour", "Cinnamon", "Brown Sugar", "Butter", "Cream Cheese Glaze"], calories: 340, dietaryTags: ["Vegetarian", "Contains Gluten"] },

  // Light Bites
  { id: "19", name: "Avocado Toast", description: "Smashed avocado on sourdough with chili flakes", price: "$9.00", category: "bites", ingredients: ["Sourdough Bread", "Avocado", "Chili Flakes", "Lime", "Sea Salt"], calories: 320, dietaryTags: ["Vegan", "Contains Gluten"] },
  { id: "20", name: "Egg Benedict", description: "Poached eggs, hollandaise, on English muffin", price: "$12.00", category: "bites", ingredients: ["Eggs", "English Muffin", "Hollandaise Sauce", "Ham", "Chives"], calories: 480, dietaryTags: ["Contains Gluten", "Contains Dairy"] },
  { id: "21", name: "Granola Bowl", description: "House-made granola with yogurt and seasonal fruits", price: "$8.00", category: "bites", ingredients: ["House Granola", "Greek Yogurt", "Seasonal Fruits", "Honey"], calories: 290, dietaryTags: ["Vegetarian", "Gluten-Free"] },
  { id: "22", name: "Grilled Cheese", description: "Aged cheddar and gruyère on artisan bread", price: "$9.50", category: "bites", ingredients: ["Aged Cheddar", "Gruyère", "Artisan Sourdough", "Butter"], calories: 450, dietaryTags: ["Vegetarian", "Contains Gluten", "Contains Dairy"] },
  { id: "23", name: "Caesar Salad", description: "Crisp romaine, parmesan, house-made croutons", price: "$10.00", category: "bites", ingredients: ["Romaine Lettuce", "Parmesan", "Croutons", "Caesar Dressing", "Anchovies"], calories: 260, dietaryTags: ["Contains Gluten", "Contains Dairy"] },
];

// Simulate async — replace body with actual API calls
export async function getMenuItems(category?: MenuCategory): Promise<MenuItem[]> {
  // TODO: Replace with fetch(`/api/menu?category=${category}`)
  await delay(0);
  if (!category) return localMenuItems;
  return localMenuItems.filter((item) => item.category === category);
}

export async function getMenuItem(id: string): Promise<MenuItem | undefined> {
  await delay(0);
  return localMenuItems.find((item) => item.id === id);
}

export async function createMenuItem(input: CreateMenuItemInput): Promise<MenuItem> {
  // TODO: Replace with POST /api/menu
  await delay(0);
  const newItem: MenuItem = { ...input, id: crypto.randomUUID() };
  localMenuItems.push(newItem);
  return newItem;
}

export async function updateMenuItem(id: string, input: UpdateMenuItemInput): Promise<MenuItem> {
  // TODO: Replace with PATCH /api/menu/:id
  await delay(0);
  const index = localMenuItems.findIndex((item) => item.id === id);
  if (index === -1) throw new Error("Menu item not found");
  localMenuItems[index] = { ...localMenuItems[index], ...input };
  return localMenuItems[index];
}

export async function deleteMenuItem(id: string): Promise<void> {
  // TODO: Replace with DELETE /api/menu/:id
  await delay(0);
  const index = localMenuItems.findIndex((item) => item.id === id);
  if (index !== -1) localMenuItems.splice(index, 1);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
