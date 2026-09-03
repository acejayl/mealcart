import type { Allergen, Category, Ingredient, Unit } from '../domain/types';

type Flags = { allergens?: Allergen[]; veg?: boolean; vegan?: boolean; fish?: boolean; staple?: boolean };

function ing(
  id: string, name: string, unit: Unit, category: Category,
  n: [number, number, number, number], f: Flags = {},
): Ingredient {
  const vegetarian = f.veg ?? true;
  return {
    id, name, unit, category,
    allergens: f.allergens ?? [],
    vegetarian,
    vegan: vegetarian && (f.vegan ?? true),
    isFishOrShellfish: f.fish ?? false,
    defaultStaple: f.staple ?? false,
    nutrition: { kcal: n[0], proteinG: n[1], carbsG: n[2], fatG: n[3] },
  };
}

const MEAT: Flags = { veg: false };
const FISH: Flags = { veg: false, fish: true, allergens: ['fish'] };
const SHELL: Flags = { veg: false, fish: true, allergens: ['shellfish'] };
const DAIRY: Flags = { vegan: false, allergens: ['dairy'] };
const EGG: Flags = { vegan: false, allergens: ['eggs'] };

export const INGREDIENTS: Ingredient[] = [
  // ---- produce (each = 1 piece; g otherwise) ----
  ing('onion-yellow', 'yellow onion', 'each', 'produce', [60, 1.6, 14, 0.2]),
  ing('onion-red', 'red onion', 'each', 'produce', [60, 1.6, 14, 0.2]),
  ing('garlic', 'garlic (clove)', 'each', 'produce', [4, 0.2, 1, 0]),
  ing('ginger', 'fresh ginger', 'g', 'produce', [80, 1.8, 18, 0.8]),
  ing('scallions', 'scallion', 'each', 'produce', [5, 0.3, 1, 0]),
  ing('carrots', 'carrots', 'g', 'produce', [41, 0.9, 10, 0.2]),
  ing('celery', 'celery', 'g', 'produce', [14, 0.7, 3, 0.2]),
  ing('bell-pepper', 'bell pepper', 'each', 'produce', [37, 1.2, 9, 0.3]),
  ing('jalapeno', 'jalapeño', 'each', 'produce', [4, 0.2, 1, 0]),
  ing('tomato-roma', 'roma tomatoes', 'g', 'produce', [18, 0.9, 4, 0.2]),
  ing('tomato-cherry', 'cherry tomatoes', 'g', 'produce', [18, 0.9, 4, 0.2]),
  ing('cucumber', 'cucumber', 'each', 'produce', [45, 2, 11, 0.3]),
  ing('lettuce-romaine', 'romaine lettuce (head)', 'each', 'produce', [50, 3.7, 10, 0.9]),
  ing('spring-mix', 'spring mix salad greens', 'g', 'produce', [20, 2, 3, 0.3]),
  ing('spinach', 'baby spinach', 'g', 'produce', [23, 2.9, 3.6, 0.4]),
  ing('kale', 'kale', 'g', 'produce', [49, 4.3, 9, 0.9]),
  ing('broccoli', 'broccoli', 'g', 'produce', [34, 2.8, 7, 0.4]),
  ing('cauliflower', 'cauliflower (head)', 'each', 'produce', [150, 12, 30, 1.7]),
  ing('zucchini', 'zucchini', 'each', 'produce', [34, 2.4, 6, 0.6]),
  ing('mushrooms-cremini', 'cremini mushrooms', 'g', 'produce', [22, 3.1, 3.3, 0.1]),
  ing('sweet-potato', 'sweet potatoes', 'g', 'produce', [86, 1.6, 20, 0.1]),
  ing('potato-russet', 'russet potatoes', 'g', 'produce', [79, 2, 18, 0.1]),
  ing('potato-yukon', 'yukon gold potatoes', 'g', 'produce', [77, 2, 17, 0.1]),
  ing('avocado', 'avocado', 'each', 'produce', [240, 3, 13, 22]),
  ing('lemon', 'lemon', 'each', 'produce', [17, 0.6, 5, 0.2]),
  ing('lime', 'lime', 'each', 'produce', [20, 0.5, 7, 0.1]),
  ing('banana', 'banana', 'each', 'produce', [105, 1.3, 27, 0.4]),
  ing('apple', 'apple', 'each', 'produce', [95, 0.5, 25, 0.3]),
  ing('blueberries', 'blueberries', 'g', 'produce', [57, 0.7, 14, 0.3]),
  ing('strawberries', 'strawberries', 'g', 'produce', [32, 0.7, 8, 0.3]),
  ing('cilantro', 'cilantro (bunch)', 'each', 'produce', [5, 0.5, 1, 0]),
  ing('parsley', 'flat-leaf parsley (bunch)', 'each', 'produce', [10, 1, 2, 0.2]),
  ing('basil', 'fresh basil', 'g', 'produce', [23, 3.2, 2.6, 0.6]),
  ing('green-beans', 'green beans', 'g', 'produce', [31, 1.8, 7, 0.2]),
  ing('cabbage', 'green cabbage (head)', 'each', 'produce', [225, 11.5, 52, 0.9]),
  ing('bok-choy', 'baby bok choy', 'g', 'produce', [13, 1.5, 2.2, 0.2]),
  ing('asparagus', 'asparagus', 'g', 'produce', [20, 2.2, 3.9, 0.1]),
  ing('brussels-sprouts', 'brussels sprouts', 'g', 'produce', [43, 3.4, 9, 0.3]),
  ing('tofu-firm', 'firm tofu', 'g', 'produce', [144, 17, 3, 9], { allergens: ['soy'] }),

  // ---- meat & deli ----
  ing('chicken-breast', 'boneless skinless chicken breast', 'g', 'meat', [120, 22.5, 0, 2.6], MEAT),
  ing('chicken-thigh', 'boneless skinless chicken thighs', 'g', 'meat', [144, 19, 0, 7], MEAT),
  ing('rotisserie-chicken', 'rotisserie chicken (whole)', 'each', 'deli', [1500, 225, 0, 63], MEAT),
  ing('ground-beef', 'ground beef (85% lean)', 'g', 'meat', [215, 18.6, 0, 15], MEAT),
  ing('ground-turkey', 'ground turkey (93% lean)', 'g', 'meat', [150, 18, 0, 8], MEAT),
  ing('steak-flank', 'flank steak', 'g', 'meat', [135, 21, 0, 5.5], MEAT),
  ing('beef-stew', 'beef stew meat', 'g', 'meat', [160, 20, 0, 9], MEAT),
  ing('pork-tenderloin', 'pork tenderloin', 'g', 'meat', [120, 21, 0, 3.5], MEAT),
  ing('pork-shoulder', 'pork shoulder', 'g', 'meat', [190, 17, 0, 13], MEAT),
  ing('bacon', 'bacon', 'g', 'meat', [417, 13, 1.4, 40], MEAT),
  ing('sausage-italian', 'Italian sausage', 'g', 'meat', [300, 14, 2, 26], MEAT),
  ing('deli-turkey', 'sliced deli turkey', 'g', 'deli', [100, 17, 3, 1.5], MEAT),
  ing('smoked-salmon', 'smoked salmon', 'g', 'deli', [117, 18, 0, 4.3], FISH),

  // ---- seafood ----
  ing('salmon', 'salmon fillet', 'g', 'seafood', [208, 20, 0, 13], FISH),
  ing('shrimp', 'raw peeled shrimp', 'g', 'seafood', [85, 20, 0, 0.5], SHELL),
  ing('cod', 'cod fillet', 'g', 'seafood', [82, 18, 0, 0.7], FISH),
  ing('tuna-canned', 'canned tuna (5 oz can)', 'each', 'canned', [120, 26, 0, 1], FISH),

  // ---- dairy & eggs ----
  ing('eggs', 'large eggs', 'each', 'eggs', [72, 6.3, 0.4, 4.8], EGG),
  ing('milk', 'whole milk', 'ml', 'dairy', [61, 3.2, 4.8, 3.3], DAIRY),
  ing('butter', 'butter', 'g', 'dairy', [717, 0.9, 0.1, 81], { ...DAIRY, staple: true }),
  ing('greek-yogurt', 'plain Greek yogurt', 'g', 'dairy', [97, 9, 4, 5], DAIRY),
  ing('cheddar', 'cheddar cheese', 'g', 'dairy', [403, 23, 1.3, 33], DAIRY),
  ing('mozzarella', 'shredded mozzarella', 'g', 'dairy', [300, 22, 2, 22], DAIRY),
  ing('parmesan', 'parmesan cheese', 'g', 'dairy', [431, 38, 4, 29], DAIRY),
  ing('feta', 'feta cheese', 'g', 'dairy', [264, 14, 4, 21], DAIRY),
  ing('cream-cheese', 'cream cheese', 'g', 'dairy', [342, 6, 4, 34], DAIRY),
  ing('sour-cream', 'sour cream', 'g', 'dairy', [198, 2.4, 4.6, 19], DAIRY),
  ing('heavy-cream', 'heavy cream', 'ml', 'dairy', [340, 2.8, 2.8, 36], DAIRY),
  ing('cottage-cheese', 'cottage cheese', 'g', 'dairy', [98, 11, 3.4, 4.3], DAIRY),
  ing('oat-milk', 'oat milk', 'ml', 'dairy', [45, 1, 7, 1.5]),

  // ---- bakery (each = 1 slice / 1 piece) ----
  ing('bread', 'sandwich bread (slice)', 'each', 'bakery', [80, 3, 15, 1], { allergens: ['wheat'] }),
  ing('tortilla-flour', 'flour tortilla (burrito size)', 'each', 'bakery', [150, 4, 25, 4], { allergens: ['wheat'] }),
  ing('tortilla-corn', 'corn tortilla', 'each', 'bakery', [60, 1.5, 12, 0.8]),
  ing('bagel', 'bagel', 'each', 'bakery', [280, 11, 55, 1.5], { allergens: ['wheat'] }),
  ing('english-muffin', 'English muffin', 'each', 'bakery', [130, 5, 26, 1], { allergens: ['wheat'] }),
  ing('burger-bun', 'burger bun', 'each', 'bakery', [150, 5, 27, 2.5], { allergens: ['wheat'] }),
  ing('pita', 'pita bread', 'each', 'bakery', [165, 5.5, 33, 0.7], { allergens: ['wheat'] }),
  ing('naan', 'naan', 'each', 'bakery', [260, 8, 45, 5], { vegan: false, allergens: ['wheat', 'dairy'] }),

  // ---- frozen ----
  ing('frozen-mixed-veg', 'frozen mixed vegetables', 'g', 'frozen', [65, 3, 13, 0.5]),
  ing('frozen-peas', 'frozen peas', 'g', 'frozen', [81, 5, 14, 0.4]),
  ing('frozen-corn', 'frozen corn', 'g', 'frozen', [88, 3, 19, 1]),
  ing('frozen-berries', 'frozen mixed berries', 'g', 'frozen', [50, 0.7, 12, 0.3]),
  ing('edamame', 'frozen shelled edamame', 'g', 'frozen', [121, 12, 9, 5], { allergens: ['soy'] }),
  ing('frozen-stirfry-veg', 'frozen stir-fry vegetables', 'g', 'frozen', [40, 2, 8, 0.3]),
  ing('tj-cauliflower-gnocchi', "Trader Joe's Cauliflower Gnocchi", 'g', 'frozen', [100, 1.4, 16, 2]),
  ing('tj-mandarin-chicken', "Trader Joe's Mandarin Orange Chicken", 'g', 'frozen', [230, 13, 23, 10], { veg: false, allergens: ['wheat', 'soy'] }),

  // ---- grains & pantry ----
  ing('rice-jasmine', 'jasmine rice', 'g', 'grains', [360, 7, 79, 0.7]),
  ing('rice-brown', 'brown rice', 'g', 'grains', [370, 7.5, 77, 2.7]),
  ing('quinoa', 'quinoa', 'g', 'grains', [368, 14, 64, 6]),
  ing('oats', 'rolled oats', 'g', 'grains', [379, 13, 68, 6.5]),
  ing('spaghetti', 'spaghetti', 'g', 'grains', [371, 13, 75, 1.5], { allergens: ['wheat'] }),
  ing('penne', 'penne pasta', 'g', 'grains', [371, 13, 75, 1.5], { allergens: ['wheat'] }),
  ing('rice-noodles', 'rice noodles', 'g', 'grains', [364, 6, 80, 0.6]),
  ing('ramen-noodles', 'dried ramen noodles', 'g', 'grains', [380, 10, 65, 10], { allergens: ['wheat'] }),
  ing('couscous', 'couscous', 'g', 'grains', [376, 13, 77, 0.6], { allergens: ['wheat'] }),
  ing('panko', 'panko breadcrumbs', 'g', 'pantry', [380, 12, 72, 2.5], { allergens: ['wheat'] }),
  ing('flour', 'all-purpose flour', 'g', 'pantry', [364, 10, 76, 1], { allergens: ['wheat'], staple: true }),
  ing('sugar', 'granulated sugar', 'g', 'pantry', [387, 0, 100, 0], { staple: true }),
  ing('brown-sugar', 'brown sugar', 'g', 'pantry', [380, 0, 98, 0], { staple: true }),
  ing('baking-powder', 'baking powder', 'g', 'pantry', [53, 0, 28, 0], { staple: true }),
  ing('cornstarch', 'cornstarch', 'g', 'pantry', [381, 0, 91, 0], { staple: true }),
  ing('granola', 'granola', 'g', 'snacks', [471, 10, 64, 20], { allergens: ['treeNuts'] }),
  ing('chia-seeds', 'chia seeds', 'g', 'pantry', [486, 17, 42, 31]),
  ing('walnuts', 'walnuts', 'g', 'snacks', [654, 15, 14, 65], { allergens: ['treeNuts'] }),
  ing('peanut-butter', 'peanut butter', 'g', 'pantry', [588, 25, 20, 50], { allergens: ['peanuts'] }),
  ing('lentils', 'dry brown lentils', 'g', 'pantry', [352, 25, 63, 1]),
  ing('red-lentils', 'dry red lentils', 'g', 'pantry', [358, 24, 63, 2]),
  ing('sesame-seeds', 'sesame seeds', 'g', 'pantry', [573, 18, 23, 50], { allergens: ['sesame'] }),

  // ---- canned & jarred (each = 1 can) ----
  ing('black-beans', 'black beans (15 oz can)', 'each', 'canned', [240, 16, 42, 1]),
  ing('chickpeas', 'chickpeas (15 oz can)', 'each', 'canned', [350, 19, 55, 6.5]),
  ing('kidney-beans', 'kidney beans (15 oz can)', 'each', 'canned', [260, 17, 46, 1]),
  ing('diced-tomatoes', 'diced tomatoes (14.5 oz can)', 'each', 'canned', [90, 4, 18, 0.5]),
  ing('crushed-tomatoes', 'crushed tomatoes (28 oz can)', 'each', 'canned', [200, 8, 40, 1]),
  ing('tomato-paste', 'tomato paste (6 oz can)', 'each', 'canned', [140, 7, 32, 0.8]),
  ing('coconut-milk', 'coconut milk (13.5 oz can)', 'each', 'canned', [720, 6, 12, 72]),
  ing('chicken-broth', 'chicken broth', 'ml', 'canned', [6, 1, 0.5, 0.2], MEAT),
  ing('vegetable-broth', 'vegetable broth', 'ml', 'canned', [5, 0.3, 1, 0.1]),
  ing('marinara', 'marinara sauce', 'ml', 'canned', [60, 2, 8, 2]),
  ing('olives', 'kalamata olives', 'g', 'canned', [230, 1, 6, 22]),

  // ---- oils & condiments ----
  ing('olive-oil', 'olive oil', 'ml', 'condiments', [884, 0, 0, 100], { staple: true }),
  ing('vegetable-oil', 'vegetable oil', 'ml', 'condiments', [884, 0, 0, 100], { staple: true }),
  ing('soy-sauce', 'soy sauce', 'ml', 'condiments', [53, 8, 5, 0], { allergens: ['soy', 'wheat'], staple: true }),
  ing('sesame-oil', 'toasted sesame oil', 'ml', 'condiments', [884, 0, 0, 100], { allergens: ['sesame'] }),
  ing('rice-vinegar', 'rice vinegar', 'ml', 'condiments', [18, 0, 0, 0]),
  ing('vinegar', 'apple cider vinegar', 'ml', 'condiments', [21, 0, 0.9, 0], { staple: true }),
  ing('mayo', 'mayonnaise', 'g', 'condiments', [680, 1, 1, 75], EGG),
  ing('dijon', 'Dijon mustard', 'g', 'condiments', [66, 4, 6, 3]),
  ing('ketchup', 'ketchup', 'g', 'condiments', [101, 1, 27, 0]),
  ing('sriracha', 'sriracha', 'ml', 'condiments', [93, 2, 19, 1]),
  ing('honey', 'honey', 'g', 'condiments', [304, 0.3, 82, 0], { vegan: false }),
  ing('maple-syrup', 'maple syrup', 'ml', 'condiments', [260, 0, 67, 0]),
  ing('tahini', 'tahini', 'g', 'condiments', [595, 17, 21, 54], { allergens: ['sesame'] }),
  ing('hummus', 'hummus', 'g', 'deli', [237, 8, 15, 18], { allergens: ['sesame'] }),
  ing('bbq-sauce', 'BBQ sauce', 'ml', 'condiments', [165, 1, 40, 0.5]),
  ing('fish-sauce', 'fish sauce', 'ml', 'condiments', [35, 5, 4, 0], FISH),
  ing('salsa', 'salsa', 'ml', 'condiments', [30, 1.5, 6, 0.2]),
  ing('curry-paste', 'Thai red curry paste', 'g', 'condiments', [100, 2, 12, 5]),
  ing('pesto', 'basil pesto', 'g', 'condiments', [430, 5, 8, 44], { vegan: false, allergens: ['dairy', 'treeNuts'] }),

  // ---- spices (all default staples) ----
  ing('salt', 'kosher salt', 'g', 'spices', [0, 0, 0, 0], { staple: true }),
  ing('black-pepper', 'black pepper', 'g', 'spices', [251, 10, 64, 3], { staple: true }),
  ing('cumin', 'ground cumin', 'g', 'spices', [375, 18, 44, 22], { staple: true }),
  ing('chili-powder', 'chili powder', 'g', 'spices', [282, 13, 50, 14], { staple: true }),
  ing('paprika', 'smoked paprika', 'g', 'spices', [282, 14, 54, 13], { staple: true }),
  ing('garlic-powder', 'garlic powder', 'g', 'spices', [331, 17, 73, 1], { staple: true }),
  ing('onion-powder', 'onion powder', 'g', 'spices', [341, 10, 79, 1], { staple: true }),
  ing('oregano', 'dried oregano', 'g', 'spices', [265, 9, 69, 4], { staple: true }),
  ing('italian-seasoning', 'Italian seasoning', 'g', 'spices', [265, 9, 69, 4], { staple: true }),
  ing('cinnamon', 'ground cinnamon', 'g', 'spices', [247, 4, 81, 1], { staple: true }),
  ing('curry-powder', 'curry powder', 'g', 'spices', [325, 14, 58, 14], { staple: true }),
  ing('red-pepper-flakes', 'red pepper flakes', 'g', 'spices', [318, 12, 57, 17], { staple: true }),
  ing('vanilla', 'vanilla extract', 'ml', 'spices', [288, 0, 13, 0], { staple: true }),
];

export const INGREDIENTS_BY_ID: Record<string, Ingredient> = Object.fromEntries(
  INGREDIENTS.map((i) => [i.id, i]),
);
export const INGREDIENT_IDS: string[] = INGREDIENTS.map((i) => i.id);
