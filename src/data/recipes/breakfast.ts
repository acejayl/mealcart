import type { Recipe } from '../../domain/types';
import { r } from './helpers';

export const BREAKFASTS: Recipe[] = [
  r('overnight-oats-berries', 'Overnight Oats with Berries', '🥣', 'breakfast', {
    servings: 2, prep: 5, cook: 0, protein: 'none', appliances: [], tags: ['quick', 'no-cook', 'vegan'],
    ingredients: [
      ['oats', 90], ['oat-milk', 360], ['chia-seeds', 20], ['blueberries', 120],
      ['maple-syrup', 20], ['cinnamon', 1],
    ],
    steps: [
      'Divide oats, chia seeds and cinnamon between two jars.',
      'Pour oat milk and maple syrup over each and stir well.',
      'Cover and refrigerate overnight, or at least 4 hours.',
      'Top with blueberries before eating.',
    ],
  }),

  r('pb-banana-toast', 'Peanut Butter Banana Toast', '🍌', 'breakfast', {
    servings: 1, prep: 5, cook: 2, protein: 'none', appliances: [], tags: ['quick', 'no-cook', 'vegan'],
    ingredients: [
      ['bread', 2], ['peanut-butter', 32], ['banana', 1], ['cinnamon', 0.5],
    ],
    steps: [
      'Toast the bread slices until golden, about 2 minutes.',
      'Spread peanut butter evenly over each slice while still warm.',
      'Slice the banana thin and arrange it over the peanut butter.',
      'Dust with cinnamon and serve right away.',
    ],
  }),

  r('avocado-toast-egg', 'Avocado Toast with Fried Egg', '🥑', 'breakfast', {
    servings: 1, prep: 5, cook: 5, protein: 'eggs', appliances: ['stovetop'], tags: ['quick', 'vegetarian'],
    ingredients: [
      ['bread', 2], ['avocado', 1], ['eggs', 2], ['lemon', 0.25],
      ['red-pepper-flakes', 0.5], ['olive-oil', 5], ['salt', 1],
    ],
    steps: [
      'Toast the bread until golden and crisp.',
      'Mash the avocado with a squeeze of lemon and half the salt; spread over the toast.',
      'Heat the olive oil in a skillet over medium heat and fry the eggs to your liking, about 3 minutes.',
      'Season the eggs with the remaining salt and top each toast with a fried egg.',
      'Sprinkle with red pepper flakes and serve immediately.',
    ],
  }),

  r('avocado-toast-tomato', 'Avocado Toast with Cherry Tomatoes', '🍅', 'breakfast', {
    servings: 1, prep: 5, cook: 2, protein: 'none', appliances: [], tags: ['quick', 'no-cook', 'vegan'],
    ingredients: [
      ['bread', 2], ['avocado', 1], ['tomato-cherry', 60], ['lemon', 0.25],
      ['olive-oil', 5], ['salt', 1], ['black-pepper', 0.5],
    ],
    steps: [
      'Toast the bread until golden and crisp.',
      'Mash the avocado with a squeeze of lemon, salt and black pepper.',
      'Halve the cherry tomatoes.',
      'Spread the mashed avocado over the toast and top with the tomatoes.',
      'Drizzle with olive oil and serve.',
    ],
  }),

  r('tofu-scramble', 'Tofu Scramble with Peppers & Spinach', '🌱', 'breakfast', {
    servings: 2, prep: 10, cook: 10, protein: 'tofu', appliances: ['stovetop'], tags: ['quick', 'vegan'],
    ingredients: [
      ['tofu-firm', 400], ['bell-pepper', 1], ['spinach', 60], ['onion-yellow', 0.5],
      ['olive-oil', 15], ['garlic-powder', 2], ['paprika', 2], ['salt', 2], ['black-pepper', 1],
    ],
    steps: [
      'Dice the bell pepper and onion; crumble the tofu into bite-sized pieces.',
      'Heat the olive oil in a skillet over medium heat and cook the onion and pepper until softened, about 4 minutes.',
      'Add the crumbled tofu, garlic powder and paprika, and cook 5 minutes, stirring occasionally.',
      'Stir in the spinach and cook until wilted, about 1 minute.',
      'Season with salt and black pepper and serve hot.',
    ],
  }),

  r('chia-pudding', 'Vanilla Chia Pudding with Strawberries', '🍓', 'breakfast', {
    servings: 2, prep: 5, cook: 0, protein: 'none', appliances: [], tags: ['quick', 'no-cook', 'vegan'],
    ingredients: [
      ['chia-seeds', 45], ['oat-milk', 360], ['maple-syrup', 20], ['vanilla', 5], ['strawberries', 150],
    ],
    steps: [
      'Whisk the chia seeds, oat milk, maple syrup and vanilla together in a bowl.',
      'Let sit 5 minutes, then whisk again to break up any clumps.',
      'Cover and refrigerate at least 4 hours, or overnight, until thickened.',
      'Slice the strawberries and stir most of them in, saving some for the top.',
      'Divide between two bowls and top with the remaining strawberries.',
    ],
  }),

  r('berry-smoothie', 'Berry Banana Smoothie', '🫐', 'breakfast', {
    servings: 1, prep: 5, cook: 0, protein: 'none', appliances: ['blender'], tags: ['quick', 'vegan'],
    ingredients: [
      ['banana', 1], ['frozen-berries', 150], ['oat-milk', 240], ['spinach', 30],
    ],
    steps: [
      'Peel and break the banana into chunks.',
      'Add the banana, frozen berries, spinach and oat milk to the blender.',
      'Blend on high for 45–60 seconds until smooth and creamy.',
      'Pour into a glass and drink right away.',
    ],
  }),

  r('breakfast-potatoes', 'Skillet Breakfast Potatoes & Peppers', '🥔', 'breakfast', {
    servings: 2, prep: 10, cook: 20, protein: 'none', appliances: ['stovetop'], tags: ['vegan'],
    ingredients: [
      ['potato-yukon', 450], ['bell-pepper', 1], ['onion-yellow', 0.5], ['olive-oil', 20],
      ['paprika', 2], ['garlic-powder', 2], ['salt', 2], ['black-pepper', 1],
    ],
    steps: [
      'Cut the potatoes into 1/2-inch cubes and dice the bell pepper and onion.',
      'Heat the olive oil in a large skillet over medium heat.',
      'Add the potatoes, cover, and cook 12 minutes, stirring occasionally, until fork-tender.',
      'Add the pepper and onion, paprika, garlic powder, salt and pepper, and cook uncovered 8 minutes more until browned.',
      'Serve hot straight from the skillet.',
    ],
  }),

  r('granola-parfait', 'Granola & Yogurt Parfait', '🥛', 'breakfast', {
    servings: 1, prep: 5, cook: 0, protein: 'dairy', appliances: [], tags: ['quick', 'no-cook', 'vegetarian'],
    ingredients: [
      ['greek-yogurt', 170], ['granola', 50], ['blueberries', 75], ['honey', 10],
    ],
    steps: [
      'Spoon half the Greek yogurt into a glass or jar.',
      'Layer in half the granola and half the blueberries.',
      'Repeat with the remaining yogurt, granola and blueberries.',
      'Drizzle honey over the top and serve immediately.',
    ],
  }),

  r('veggie-omelet', 'Mushroom Spinach Cheddar Omelet', '🍳', 'breakfast', {
    servings: 1, prep: 5, cook: 8, protein: 'eggs', appliances: ['stovetop'], tags: ['quick', 'vegetarian'],
    ingredients: [
      ['eggs', 3], ['mushrooms-cremini', 60], ['spinach', 30], ['cheddar', 30],
      ['butter', 10], ['salt', 1], ['black-pepper', 0.5],
    ],
    steps: [
      'Slice the mushrooms and whisk the eggs with salt and black pepper.',
      'Melt half the butter in a nonstick skillet over medium heat and sauté the mushrooms until golden, about 4 minutes.',
      'Add the spinach and cook until wilted, about 1 minute; remove the filling to a plate.',
      'Melt the remaining butter in the skillet, pour in the eggs, and let set 2 minutes.',
      'Sprinkle the cheddar and mushroom-spinach filling over half the eggs, fold the omelet over, and cook 1 minute more.',
      'Slide onto a plate and serve hot.',
    ],
  }),

  r('scrambled-eggs-toast', 'Scrambled Eggs & Buttered Toast', '🍞', 'breakfast', {
    servings: 1, prep: 3, cook: 5, protein: 'eggs', appliances: ['stovetop'], tags: ['quick', 'vegetarian'],
    ingredients: [
      ['eggs', 3], ['butter', 15], ['bread', 2], ['salt', 1], ['black-pepper', 0.5],
    ],
    steps: [
      'Whisk the eggs with salt and black pepper in a bowl.',
      'Melt half the butter in a nonstick skillet over medium-low heat.',
      'Pour in the eggs and gently push them across the pan with a spatula until just set, about 3 minutes.',
      'Meanwhile, toast the bread and spread with the remaining butter.',
      'Serve the scrambled eggs alongside the buttered toast.',
    ],
  }),

  r('yogurt-banana-walnut', 'Greek Yogurt with Banana & Walnuts', '🍯', 'breakfast', {
    servings: 1, prep: 3, cook: 0, protein: 'dairy', appliances: [], tags: ['quick', 'no-cook', 'vegetarian'],
    ingredients: [
      ['greek-yogurt', 200], ['banana', 1], ['walnuts', 20], ['honey', 10], ['cinnamon', 0.5],
    ],
    steps: [
      'Spoon the Greek yogurt into a bowl.',
      'Slice the banana and arrange it over the yogurt.',
      'Scatter the walnuts on top.',
      'Drizzle with honey and dust with cinnamon before serving.',
    ],
  }),

  r('apple-cinnamon-oatmeal', 'Apple Cinnamon Oatmeal', '🍎', 'breakfast', {
    servings: 2, prep: 5, cook: 8, protein: 'none', appliances: ['stovetop'], tags: ['quick', 'vegan'],
    ingredients: [
      ['oats', 90], ['oat-milk', 480], ['apple', 1], ['cinnamon', 2], ['maple-syrup', 20], ['salt', 0.5],
    ],
    steps: [
      'Dice the apple into small cubes.',
      'Bring the oat milk to a simmer in a saucepan over medium heat.',
      'Stir in the oats, diced apple, cinnamon and salt.',
      'Cook, stirring often, 6–7 minutes until thick and creamy.',
      'Remove from heat, drizzle with maple syrup and serve warm.',
    ],
  }),

  r('breakfast-burrito', 'Egg & Black Bean Breakfast Burrito', '🌯', 'breakfast', {
    servings: 2, prep: 5, cook: 10, protein: 'eggs', appliances: ['stovetop'], tags: ['quick', 'vegetarian', 'mexican'],
    ingredients: [
      ['eggs', 4], ['tortilla-flour', 2], ['cheddar', 50], ['black-beans', 0.5],
      ['salsa', 60], ['butter', 10], ['salt', 1],
    ],
    steps: [
      'Drain and rinse the black beans, then warm them in a small pan or microwave.',
      'Whisk the eggs with the salt.',
      'Melt the butter in a skillet over medium heat and scramble the eggs until just set, about 3 minutes.',
      'Warm the tortillas, then divide the scrambled eggs, black beans and cheddar between them.',
      'Spoon salsa over the filling, fold each tortilla into a burrito, and serve.',
    ],
  }),

  r('bacon-egg-muffin', 'Bacon, Egg & Cheese English Muffin', '🥓', 'breakfast', {
    servings: 2, prep: 5, cook: 12, protein: 'eggs', appliances: ['stovetop'], tags: ['quick', 'american'],
    ingredients: [
      ['bacon', 60], ['eggs', 2], ['cheddar', 40], ['english-muffin', 2], ['salt', 0.5],
    ],
    steps: [
      'Cook the bacon in a skillet over medium heat until crisp, about 6 minutes; drain on a paper towel.',
      'Split and toast the English muffins.',
      'Crack the eggs into the same skillet and season with salt; fry until the yolks set, about 3 minutes.',
      'Lay a slice of cheddar on the bottom half of each muffin while it is still warm so it melts slightly.',
      'Top with bacon and a fried egg, close the muffin, and serve.',
    ],
  }),

  r('bagel-cream-cheese', 'Bagel with Cream Cheese & Cucumber', '🥯', 'breakfast', {
    servings: 1, prep: 3, cook: 2, protein: 'dairy', appliances: [], tags: ['quick', 'no-cook', 'vegetarian'],
    ingredients: [
      ['bagel', 1], ['cream-cheese', 40], ['cucumber', 0.25], ['black-pepper', 0.5],
    ],
    steps: [
      'Slice the bagel in half and toast until golden.',
      'Thinly slice the cucumber.',
      'Spread cream cheese generously over both halves.',
      'Layer the cucumber slices on top and finish with a crack of black pepper.',
    ],
  }),

  r('cottage-cheese-bowl', 'Cottage Cheese & Strawberry Bowl', '🍓', 'breakfast', {
    servings: 1, prep: 3, cook: 0, protein: 'dairy', appliances: [], tags: ['quick', 'no-cook', 'vegetarian'],
    ingredients: [
      ['cottage-cheese', 200], ['strawberries', 100], ['granola', 30], ['honey', 5],
    ],
    steps: [
      'Spoon the cottage cheese into a bowl.',
      'Slice the strawberries and arrange them over the top.',
      'Sprinkle with granola.',
      'Drizzle with honey and serve.',
    ],
  }),

  r('sweet-potato-hash', 'Sweet Potato Hash with Eggs', '🍠', 'breakfast', {
    servings: 2, prep: 10, cook: 20, protein: 'eggs', appliances: ['stovetop'], tags: ['vegetarian'],
    ingredients: [
      ['sweet-potato', 400], ['onion-yellow', 0.5], ['bell-pepper', 1], ['eggs', 4],
      ['olive-oil', 20], ['paprika', 2], ['salt', 2], ['black-pepper', 1],
    ],
    steps: [
      'Peel and dice the sweet potato into 1/2-inch cubes; dice the onion and bell pepper.',
      'Heat the olive oil in a large skillet over medium heat and add the sweet potato.',
      'Cover and cook 12 minutes, stirring occasionally, until nearly tender.',
      'Add the onion, bell pepper, paprika, salt and black pepper, and cook uncovered 6 minutes more.',
      'Make four wells in the hash, crack an egg into each, cover, and cook 4–5 minutes until the whites set.',
      'Serve straight from the skillet.',
    ],
  }),

  r('banana-pancakes', 'Banana Pancakes', '🥞', 'breakfast', {
    servings: 2, prep: 10, cook: 15, protein: 'eggs', appliances: ['stovetop'], tags: ['quick', 'vegetarian', 'american'],
    ingredients: [
      ['flour', 150], ['baking-powder', 6], ['sugar', 15], ['salt', 1], ['milk', 240],
      ['eggs', 1], ['banana', 1], ['butter', 20], ['maple-syrup', 40], ['vanilla', 3],
    ],
    steps: [
      'Whisk together the flour, baking powder, sugar and salt in a bowl.',
      'Mash the banana and whisk it with the milk, egg and vanilla in a separate bowl.',
      'Pour the wet ingredients into the dry and stir just until combined.',
      'Melt a little of the butter in a skillet over medium heat and ladle in batter for each pancake.',
      'Cook 2–3 minutes until bubbles form on top, then flip and cook 1–2 minutes more.',
      'Repeat with the remaining batter and butter, and serve with maple syrup.',
    ],
  }),

  r('smoked-salmon-bagel', 'Smoked Salmon Bagel', '🐟', 'breakfast', {
    servings: 1, prep: 5, cook: 0, protein: 'fish', appliances: [], tags: ['quick', 'no-cook', 'pescatarian'],
    ingredients: [
      ['bagel', 1], ['cream-cheese', 40], ['smoked-salmon', 50], ['onion-red', 0.15],
      ['lemon', 0.25], ['black-pepper', 0.5],
    ],
    steps: [
      'Slice the bagel in half and toast until golden.',
      'Thinly slice the red onion.',
      'Spread cream cheese over both bagel halves.',
      'Drape the smoked salmon over the cream cheese and scatter the red onion on top.',
      'Squeeze lemon juice over the top and finish with a crack of black pepper.',
    ],
  }),

  r('shakshuka', 'Shakshuka', '🍅', 'breakfast', {
    servings: 2, prep: 10, cook: 20, protein: 'eggs', appliances: ['stovetop'], tags: ['vegetarian', 'middle-eastern'],
    ingredients: [
      ['eggs', 4], ['diced-tomatoes', 1], ['onion-yellow', 0.5], ['bell-pepper', 1],
      ['garlic', 2], ['cumin', 2], ['paprika', 2], ['feta', 40], ['olive-oil', 15],
      ['bread', 2], ['salt', 2],
    ],
    steps: [
      'Dice the onion and bell pepper, and mince the garlic.',
      'Heat the olive oil in a large skillet over medium heat and cook the onion and pepper until soft, about 6 minutes.',
      'Add the garlic, cumin and paprika, and cook 1 minute until fragrant.',
      'Pour in the diced tomatoes with their juice and the salt, and simmer 8 minutes until slightly thickened.',
      'Make four wells in the sauce, crack an egg into each, cover, and cook 6–8 minutes until the whites are set.',
      'Crumble the feta over the top and serve with the bread for dipping.',
    ],
  }),

  r('breakfast-quesadilla', 'Egg & Cheese Breakfast Quesadilla', '🧀', 'breakfast', {
    servings: 1, prep: 5, cook: 8, protein: 'eggs', appliances: ['stovetop'], tags: ['quick', 'vegetarian', 'mexican'],
    ingredients: [
      ['tortilla-flour', 1], ['eggs', 2], ['cheddar', 40], ['salsa', 30], ['butter', 5], ['salt', 0.5],
    ],
    steps: [
      'Whisk the eggs with the salt and scramble them in a skillet over medium heat until just set, about 3 minutes; set aside.',
      'Melt the butter in the same skillet over medium heat and lay the tortilla flat.',
      'Scatter the cheddar and scrambled eggs over half the tortilla and fold it over.',
      'Cook 2 minutes per side until the tortilla is golden and the cheese has melted.',
      'Slice into wedges and serve with the salsa.',
    ],
  }),

  r('tofu-breakfast-burrito', 'Tofu Breakfast Burrito', '🌯', 'breakfast', {
    servings: 2, prep: 10, cook: 10, protein: 'tofu', appliances: ['stovetop'], tags: ['quick', 'vegan', 'mexican'],
    ingredients: [
      ['tofu-firm', 300], ['tortilla-flour', 2], ['black-beans', 0.5], ['avocado', 1],
      ['salsa', 60], ['olive-oil', 10], ['cumin', 2], ['garlic-powder', 2], ['salt', 2],
    ],
    steps: [
      'Crumble the tofu into bite-sized pieces and drain and rinse the black beans.',
      'Heat the olive oil in a skillet over medium heat and add the tofu, cumin, garlic powder and salt.',
      'Cook 6–7 minutes, stirring occasionally, until lightly browned.',
      'Stir in the black beans and warm through, about 2 minutes.',
      'Warm the tortillas, then slice the avocado and divide it with the tofu mixture between them.',
      'Top with salsa, fold each tortilla into a burrito, and serve.',
    ],
  }),

  r('breakfast-fried-rice', 'Breakfast Fried Rice with Egg', '🍚', 'breakfast', {
    servings: 2, prep: 5, cook: 12, protein: 'eggs', appliances: ['stovetop'], tags: ['quick', 'vegetarian', 'asian'],
    ingredients: [
      ['rice-jasmine', 150], ['eggs', 3], ['frozen-peas', 80], ['scallions', 2],
      ['soy-sauce', 20], ['vegetable-oil', 15], ['sesame-oil', 5],
    ],
    steps: [
      'Slice the scallions, keeping the whites and greens separate.',
      'Heat half the vegetable oil in a wok or large skillet over medium-high heat, scramble two of the eggs, and set aside.',
      'Add the remaining vegetable oil, the rice and frozen peas, and stir-fry 4 minutes until heated through.',
      'Push the rice to one side, crack in the remaining egg, and scramble it into the rice along with the scallion whites.',
      'Stir in the reserved scrambled egg, soy sauce and sesame oil, and toss to combine.',
      'Garnish with the scallion greens and serve hot.',
    ],
  }),

  r('sausage-egg-scramble', 'Sausage & Pepper Egg Scramble', '🌭', 'breakfast', {
    servings: 2, prep: 5, cook: 12, protein: 'pork', appliances: ['stovetop'], tags: ['quick'],
    ingredients: [
      ['sausage-italian', 150], ['eggs', 4], ['bell-pepper', 1], ['olive-oil', 5],
      ['salt', 1], ['black-pepper', 0.5],
    ],
    steps: [
      'Dice the bell pepper and remove the sausage from its casing if needed.',
      'Heat the olive oil in a skillet over medium heat and crumble in the sausage.',
      'Cook 6 minutes, breaking it up, until browned, then add the bell pepper and cook 3 minutes more.',
      'Whisk the eggs with the salt and black pepper and pour into the skillet.',
      'Cook, stirring gently, 3 minutes until the eggs are just set.',
      'Serve immediately.',
    ],
  }),
];
