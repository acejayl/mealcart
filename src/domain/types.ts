export type Unit = 'g' | 'ml' | 'each';

export type Category =
  | 'produce' | 'meat' | 'seafood' | 'dairy' | 'eggs' | 'bakery' | 'deli'
  | 'frozen' | 'pantry' | 'grains' | 'canned' | 'spices' | 'condiments'
  | 'snacks' | 'beverages';
export const CATEGORIES: Category[] = [
  'produce', 'meat', 'seafood', 'dairy', 'eggs', 'bakery', 'deli', 'frozen',
  'pantry', 'grains', 'canned', 'spices', 'condiments', 'snacks', 'beverages',
];
export const CATEGORY_LABELS: Record<Category, string> = {
  produce: 'Produce', meat: 'Meat', seafood: 'Seafood', dairy: 'Dairy',
  eggs: 'Eggs', bakery: 'Bakery', deli: 'Deli', frozen: 'Frozen',
  pantry: 'Pantry', grains: 'Rice, Pasta & Grains', canned: 'Canned & Jarred',
  spices: 'Spices', condiments: 'Oils & Condiments', snacks: 'Snacks & Nuts',
  beverages: 'Beverages',
};

export type Allergen =
  | 'dairy' | 'eggs' | 'peanuts' | 'treeNuts' | 'soy' | 'wheat' | 'fish'
  | 'shellfish' | 'sesame';
export const ALLERGENS: Allergen[] = [
  'dairy', 'eggs', 'peanuts', 'treeNuts', 'soy', 'wheat', 'fish', 'shellfish', 'sesame',
];
export const ALLERGEN_LABELS: Record<Allergen, string> = {
  dairy: 'Dairy', eggs: 'Eggs', peanuts: 'Peanuts', treeNuts: 'Tree nuts',
  soy: 'Soy', wheat: 'Wheat / gluten', fish: 'Fish', shellfish: 'Shellfish',
  sesame: 'Sesame',
};

export type Diet = 'none' | 'vegetarian' | 'vegan' | 'pescatarian';
export const DIETS: Diet[] = ['none', 'vegetarian', 'pescatarian', 'vegan'];
export const DIET_LABELS: Record<Diet, string> = {
  none: 'No restriction', vegetarian: 'Vegetarian', vegan: 'Vegan', pescatarian: 'Pescatarian',
};

export type Appliance =
  | 'stovetop' | 'oven' | 'microwave' | 'airFryer' | 'slowCooker' | 'blender' | 'riceCooker';
export const APPLIANCES: Appliance[] = [
  'stovetop', 'oven', 'microwave', 'airFryer', 'slowCooker', 'blender', 'riceCooker',
];
export const APPLIANCE_LABELS: Record<Appliance, string> = {
  stovetop: 'Stovetop', oven: 'Oven', microwave: 'Microwave', airFryer: 'Air fryer',
  slowCooker: 'Slow cooker', blender: 'Blender', riceCooker: 'Rice cooker',
};

export type MealType = 'breakfast' | 'lunch' | 'dinner';
export const MEAL_TYPES: MealType[] = ['breakfast', 'lunch', 'dinner'];
export const MEAL_LABELS: Record<MealType, string> = {
  breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner',
};

export const DAY_LABELS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export type StoreProfileId = 'traderJoes' | 'conventional' | 'costco' | 'natural';
export const STORE_PROFILE_IDS: StoreProfileId[] = ['traderJoes', 'conventional', 'costco', 'natural'];

export type ProteinGroup =
  | 'chicken' | 'beef' | 'pork' | 'fish' | 'shellfish' | 'eggs' | 'tofu' | 'beans' | 'dairy' | 'none';

export interface Nutrition { kcal: number; proteinG: number; carbsG: number; fatG: number }

export interface Ingredient {
  id: string;
  name: string;
  unit: Unit;
  category: Category;
  allergens: Allergen[];
  vegetarian: boolean;
  vegan: boolean;
  isFishOrShellfish: boolean;
  defaultStaple: boolean;
  /** per 100 g, per 100 ml, or per 1 each */
  nutrition: Nutrition;
}

export interface Product {
  ingredientId: string;
  name: string;
  packSize: number;
  packLabel: string;
  price: number;
  available: boolean;
  priceSource: string;
  estimated: boolean;
}

export interface StoreProfile {
  id: StoreProfileId;
  aisleOrder: Category[];
  products: Record<string, Product>;
}

export interface Store { id: string; name: string; profile: StoreProfileId }

export interface RecipeIngredient { ingredientId: string; qty: number; note?: string }

export interface Recipe {
  id: string;
  name: string;
  emoji: string;
  mealType: MealType;
  servings: number;
  prepMinutes: number;
  cookMinutes: number;
  ingredients: RecipeIngredient[];
  steps: string[];
  appliances: Appliance[];
  tags: string[];
  proteinGroup: ProteinGroup;
}

export interface Preferences {
  storeId: string;
  weeklyBudget: number;
  householdSize: number;
  diet: Diet;
  excludedAllergens: Allergen[];
  appliances: Appliance[];
  mealsToPlan: MealType[];
  stapleIds: string[];
}

export interface PlanSlot { day: number; meal: MealType; recipeId: string | null }

export interface Plan {
  id: string;
  createdAt: string;
  storeId: string;
  slots: PlanSlot[];
  seed: number;
  overBudgetBy: number;
}

export interface ShoppingItem {
  ingredientId: string;
  product: Product;
  neededQty: number;
  packs: number;
  unitPrice: number;
  cost: number;
  category: Category;
  checked: boolean;
}

export interface ShoppingListResult {
  items: ShoppingItem[];
  groups: { category: Category; items: ShoppingItem[] }[];
  total: number;
  inCart: number;
  staples: { ingredientId: string; name: string; neededQty: number }[];
  /**
   * Non-staple ingredients the chosen store does not sell. They are not priced, so the total
   * excludes them - surfaced here so the shortfall is visible instead of silently cheap.
   */
  missing: { ingredientId: string; name: string; neededQty: number }[];
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
