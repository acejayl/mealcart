import type { Recipe } from '../../domain/types';
import { r } from './helpers';

export const LUNCHES: Recipe[] = [
  r('chickpea-salad-sandwich', 'Chickpea Salad Sandwich', '🥪', 'lunch', {
    servings: 2, prep: 10, cook: 0, protein: 'beans', appliances: [], tags: ['mediterranean', 'quick', 'no-cook', 'vegan'],
    ingredients: [
      ['chickpeas', 1], ['tahini', 30], ['lemon', 0.5], ['celery', 60], ['onion-red', 0.25],
      ['bread', 4], ['spring-mix', 30], ['salt', 2], ['black-pepper', 1],
    ],
    steps: [
      'Drain and rinse the chickpeas, then mash them in a bowl with a fork until mostly broken down.',
      'Finely dice the celery and red onion and stir them into the mashed chickpeas.',
      'Add the tahini, a squeeze of lemon juice, salt and black pepper, and mix until creamy.',
      'Divide the spring mix between two slices of bread.',
      'Spoon the chickpea salad over the greens and top with the remaining bread slices.',
      'Slice each sandwich in half and serve.',
    ],
  }),

  r('hummus-veggie-wrap', 'Hummus Veggie Wrap', '🌯', 'lunch', {
    servings: 2, prep: 10, cook: 0, protein: 'beans', appliances: [], tags: ['mediterranean', 'quick', 'no-cook', 'vegan'],
    ingredients: [
      ['tortilla-flour', 2], ['hummus', 120], ['cucumber', 0.5], ['spring-mix', 40],
      ['bell-pepper', 1], ['carrots', 80],
    ],
    steps: [
      'Thinly slice the cucumber, bell pepper and carrots into matchsticks.',
      'Lay the tortillas flat and spread the hummus evenly over each.',
      'Scatter the spring mix over the hummus.',
      'Arrange the cucumber, bell pepper and carrot matchsticks down the center of each tortilla.',
      'Roll each tortilla tightly into a wrap, tucking in the sides as you go.',
      'Slice in half on a diagonal and serve.',
    ],
  }),

  r('black-bean-burrito-bowl', 'Black Bean Burrito Bowl', '🥗', 'lunch', {
    servings: 2, prep: 10, cook: 20, protein: 'beans', appliances: ['stovetop'], tags: ['mexican', 'vegan'],
    ingredients: [
      ['rice-jasmine', 150], ['black-beans', 1], ['frozen-corn', 120], ['salsa', 100],
      ['avocado', 1], ['lime', 1], ['cilantro', 0.25], ['cumin', 2], ['salt', 2],
    ],
    steps: [
      'Rinse the rice, then combine it with water in a saucepan and bring to a boil.',
      'Cover and simmer 15 minutes until tender, then remove from heat and let steam 5 minutes.',
      'Meanwhile, drain and rinse the black beans and warm them in a small pot with the cumin and salt, about 5 minutes.',
      'Warm the frozen corn in the same pot for the last 2 minutes.',
      'Slice the avocado and roughly chop the cilantro.',
      'Divide the rice between bowls and top with the black beans, corn, salsa and avocado.',
      'Squeeze lime juice over each bowl, scatter with cilantro, and serve.',
    ],
  }),

  r('red-lentil-soup', 'Red Lentil Soup', '🍲', 'lunch', {
    servings: 4, prep: 10, cook: 30, protein: 'beans', appliances: ['stovetop'], tags: ['mediterranean', 'vegan'],
    ingredients: [
      ['red-lentils', 250], ['onion-yellow', 1], ['carrots', 150], ['garlic', 3], ['cumin', 4],
      ['vegetable-broth', 1200], ['lemon', 1], ['olive-oil', 20], ['salt', 4], ['black-pepper', 1],
    ],
    steps: [
      'Dice the onion and carrots, and mince the garlic.',
      'Heat the olive oil in a large pot over medium heat and cook the onion and carrots until softened, about 6 minutes.',
      'Add the garlic and cumin and cook 1 minute until fragrant.',
      'Rinse the red lentils, then stir them into the pot with the vegetable broth.',
      'Bring to a boil, then reduce heat and simmer 20 minutes until the lentils are soft and the soup has thickened.',
      'Season with salt and black pepper, and stir in a squeeze of lemon juice.',
      'Ladle into bowls and serve.',
    ],
  }),

  r('quinoa-chickpea-salad', 'Quinoa Chickpea Salad', '🥗', 'lunch', {
    servings: 2, prep: 10, cook: 15, protein: 'beans', appliances: ['stovetop'], tags: ['mediterranean', 'quick', 'vegan'],
    ingredients: [
      ['quinoa', 120], ['chickpeas', 1], ['cucumber', 0.5], ['tomato-cherry', 150], ['parsley', 0.5],
      ['lemon', 1], ['olive-oil', 30], ['salt', 2], ['black-pepper', 1],
    ],
    steps: [
      'Rinse the quinoa, then combine with water in a saucepan and bring to a boil.',
      'Cover and simmer 12 minutes until the water is absorbed, then remove from heat and let cool slightly.',
      'Drain and rinse the chickpeas, and dice the cucumber and cherry tomatoes.',
      'Chop the parsley.',
      'Whisk the olive oil with the juice of the lemon, salt and black pepper in a large bowl.',
      'Add the quinoa, chickpeas, cucumber, tomatoes and parsley, and toss to combine.',
      'Serve at room temperature or chilled.',
    ],
  }),

  r('peanut-noodle-salad', 'Cold Peanut Noodle Salad', '🥜', 'lunch', {
    servings: 2, prep: 10, cook: 10, protein: 'none', appliances: ['stovetop'], tags: ['asian', 'quick', 'vegan'],
    ingredients: [
      ['spaghetti', 200], ['peanut-butter', 60], ['soy-sauce', 30], ['lime', 1], ['carrots', 100],
      ['cabbage', 0.25], ['scallions', 2], ['sriracha', 10], ['sesame-oil', 5],
    ],
    steps: [
      'Bring a pot of water to a boil and cook the spaghetti according to package directions, about 9 minutes; drain and rinse under cold water.',
      'Whisk the peanut butter, soy sauce, sesame oil, sriracha and the juice of the lime together in a bowl until smooth.',
      'Thinly shred the cabbage and julienne the carrots; slice the scallions.',
      'Toss the cooled noodles with the peanut sauce until evenly coated.',
      'Add the cabbage, carrots and scallions and toss again.',
      'Chill briefly or serve right away.',
    ],
  }),

  r('tomato-basil-pasta', 'Tomato Basil Pasta', '🍝', 'lunch', {
    servings: 2, prep: 5, cook: 15, protein: 'none', appliances: ['stovetop'], tags: ['italian', 'quick', 'vegan'],
    ingredients: [
      ['penne', 200], ['tomato-cherry', 300], ['garlic', 3], ['basil', 15], ['olive-oil', 30],
      ['red-pepper-flakes', 1], ['salt', 3],
    ],
    steps: [
      'Bring a large pot of salted water to a boil and cook the penne until al dente, about 11 minutes; reserve 1/2 cup pasta water and drain.',
      'Meanwhile, halve the cherry tomatoes and mince the garlic.',
      'Heat the olive oil in a large skillet over medium heat and cook the garlic and red pepper flakes 1 minute until fragrant.',
      'Add the cherry tomatoes and salt, and cook 6–8 minutes until they begin to burst and release their juices.',
      'Add the drained penne to the skillet along with a splash of the reserved pasta water, and toss to coat.',
      'Tear the basil and stir it in just before serving.',
    ],
  }),

  r('veggie-fried-rice', 'Veggie Fried Rice', '🍚', 'lunch', {
    servings: 2, prep: 5, cook: 12, protein: 'none', appliances: ['stovetop'], tags: ['asian', 'quick', 'vegan'],
    ingredients: [
      ['rice-jasmine', 150], ['frozen-stirfry-veg', 250], ['soy-sauce', 30], ['garlic', 2],
      ['scallions', 2], ['sesame-oil', 5], ['vegetable-oil', 15],
    ],
    steps: [
      'Cook the rice according to the package directions, then spread it on a tray to cool slightly.',
      'Mince the garlic and slice the scallions, keeping the whites and greens separate.',
      'Heat the vegetable oil in a wok or large skillet over high heat and add the garlic and scallion whites; stir-fry 30 seconds until fragrant.',
      'Add the frozen stir-fry vegetables and cook 4 minutes until thawed and lightly browned.',
      'Add the rice, breaking up clumps, and stir-fry 5 minutes until heated through.',
      'Stir in the soy sauce and sesame oil and toss to coat evenly.',
      'Garnish with the scallion greens and serve hot.',
    ],
  }),

  r('egg-fried-rice', 'Egg Fried Rice', '🍳', 'lunch', {
    servings: 2, prep: 5, cook: 12, protein: 'eggs', appliances: ['stovetop'], tags: ['asian', 'quick', 'vegetarian'],
    ingredients: [
      ['rice-jasmine', 150], ['eggs', 3], ['frozen-peas', 100], ['carrots', 80],
      ['soy-sauce', 30], ['scallions', 2], ['vegetable-oil', 15],
    ],
    steps: [
      'Cook the rice according to the package directions, then spread it on a tray to cool slightly.',
      'Dice the carrots small and slice the scallions, keeping whites and greens separate.',
      'Whisk the eggs in a bowl.',
      'Heat half the vegetable oil in a wok over medium-high heat, scramble the eggs until just set, and set aside.',
      'Add the remaining oil, the carrots and frozen peas, and stir-fry 3 minutes until tender.',
      'Add the rice and scallion whites, breaking up clumps, and stir-fry 4 minutes until heated through.',
      'Return the scrambled egg to the wok, add the soy sauce, and toss to combine.',
      'Garnish with the scallion greens and serve hot.',
    ],
  }),

  r('minestrone', 'Minestrone Soup', '🍲', 'lunch', {
    servings: 4, prep: 10, cook: 30, protein: 'beans', appliances: ['stovetop'], tags: ['italian', 'vegan'],
    ingredients: [
      ['vegetable-broth', 1200], ['diced-tomatoes', 1], ['kidney-beans', 1], ['penne', 120],
      ['carrots', 120], ['celery', 80], ['onion-yellow', 1], ['zucchini', 1], ['garlic', 2],
      ['italian-seasoning', 3], ['olive-oil', 20], ['salt', 4],
    ],
    steps: [
      'Dice the onion, carrots, celery and zucchini, and mince the garlic.',
      'Heat the olive oil in a large pot over medium heat and cook the onion, carrots and celery until softened, about 6 minutes.',
      'Add the garlic and Italian seasoning and cook 1 minute until fragrant.',
      'Pour in the vegetable broth and diced tomatoes with their juice, and bring to a boil.',
      'Drain and rinse the kidney beans and add them along with the zucchini and salt; simmer 10 minutes.',
      'Stir in the penne and cook 10–12 minutes more until the pasta is tender.',
      'Ladle into bowls and serve hot.',
    ],
  }),

  r('sweet-potato-black-bean-bowl', 'Sweet Potato & Black Bean Bowl', '🍠', 'lunch', {
    servings: 2, prep: 10, cook: 25, protein: 'beans', appliances: ['oven'], tags: ['mexican', 'vegan'],
    ingredients: [
      ['sweet-potato', 400], ['black-beans', 1], ['kale', 80], ['avocado', 1], ['lime', 1],
      ['olive-oil', 20], ['cumin', 3], ['salt', 2],
    ],
    steps: [
      'Heat the oven to 425°F (220°C). Peel and cube the sweet potato into 3/4-inch pieces.',
      'Toss the sweet potato with half the olive oil, the cumin and salt on a sheet pan.',
      'Roast 22–25 minutes, stirring once, until tender and lightly caramelized.',
      'Meanwhile, drain and rinse the black beans and warm them in a small pot.',
      'Massage the kale with the remaining olive oil until softened.',
      'Slice the avocado.',
      'Divide the kale between bowls and top with the roasted sweet potato, black beans and avocado.',
      'Squeeze lime juice over each bowl and serve.',
    ],
  }),

  r('edamame-rice-bowl', 'Edamame Sesame Rice Bowl', '🍱', 'lunch', {
    servings: 2, prep: 10, cook: 30, protein: 'tofu', appliances: ['stovetop'], tags: ['asian', 'vegan'],
    ingredients: [
      ['rice-brown', 150], ['edamame', 150], ['cucumber', 0.5], ['carrots', 80],
      ['sesame-seeds', 10], ['soy-sauce', 20], ['rice-vinegar', 15], ['sriracha', 10],
    ],
    steps: [
      'Rinse the brown rice, then combine with water in a saucepan and bring to a boil.',
      'Cover and simmer 25–28 minutes until tender, then remove from heat and let steam 5 minutes.',
      'Meanwhile, cook the edamame according to the package directions and drain.',
      'Thinly slice the cucumber and julienne the carrots.',
      'Whisk the soy sauce, rice vinegar and sriracha together in a small bowl.',
      'Divide the rice between bowls and top with the edamame, cucumber and carrots.',
      'Drizzle with the soy sauce mixture and scatter the sesame seeds over the top.',
    ],
  }),

  r('turkey-avocado-sandwich', 'Turkey Avocado Sandwich', '🥪', 'lunch', {
    servings: 2, prep: 5, cook: 0, protein: 'chicken', appliances: [], tags: ['american', 'quick', 'no-cook'],
    ingredients: [
      ['bread', 4], ['deli-turkey', 120], ['avocado', 1], ['lettuce-romaine', 0.25],
      ['tomato-roma', 100], ['mayo', 20],
    ],
    steps: [
      'Slice the avocado and tomato.',
      'Spread the mayo evenly over two slices of bread.',
      'Layer the deli turkey, avocado, tomato and lettuce over the mayo.',
      'Top with the remaining bread slices and press gently.',
      'Slice each sandwich in half and serve.',
    ],
  }),

  r('tuna-salad-sandwich', 'Tuna Salad Sandwich', '🐟', 'lunch', {
    servings: 2, prep: 10, cook: 0, protein: 'fish', appliances: [], tags: ['american', 'quick', 'no-cook', 'pescatarian'],
    ingredients: [
      ['tuna-canned', 1], ['mayo', 40], ['celery', 40], ['onion-red', 0.25], ['bread', 4],
      ['lettuce-romaine', 0.25], ['salt', 1], ['black-pepper', 1],
    ],
    steps: [
      'Drain the canned tuna and flake it into a bowl.',
      'Finely dice the celery and red onion and add them to the tuna.',
      'Stir in the mayo, salt and black pepper until well combined.',
      'Lay the lettuce over two slices of bread.',
      'Spoon the tuna salad over the lettuce and top with the remaining bread slices.',
      'Slice each sandwich in half and serve.',
    ],
  }),

  r('chicken-caesar-salad', 'Chicken Caesar Salad', '🥗', 'lunch', {
    servings: 2, prep: 10, cook: 5, protein: 'chicken', appliances: ['stovetop'], tags: ['american', 'quick'],
    ingredients: [
      ['rotisserie-chicken', 0.5], ['lettuce-romaine', 1], ['parmesan', 30], ['mayo', 40],
      ['lemon', 0.5], ['dijon', 5], ['garlic', 1], ['bread', 2], ['olive-oil', 10], ['black-pepper', 1],
    ],
    steps: [
      'Cut the bread into cubes and mince the garlic.',
      'Heat the olive oil in a skillet over medium heat, add the bread cubes and garlic, and toast 4–5 minutes, tossing often, until golden croutons form.',
      'Whisk the mayo, Dijon mustard, a squeeze of lemon juice and the black pepper together in a small bowl to make the dressing.',
      'Shred the rotisserie chicken and chop the romaine lettuce.',
      'Toss the lettuce with the dressing in a large bowl.',
      'Top with the shredded chicken, croutons and shaved parmesan.',
      'Serve immediately.',
    ],
  }),

  r('greek-salad-pita', 'Greek Salad with Pita', '🫒', 'lunch', {
    servings: 2, prep: 10, cook: 0, protein: 'dairy', appliances: [], tags: ['greek', 'quick', 'no-cook', 'vegetarian'],
    ingredients: [
      ['cucumber', 1], ['tomato-cherry', 200], ['onion-red', 0.25], ['feta', 80], ['olives', 60],
      ['olive-oil', 30], ['lemon', 0.5], ['oregano', 2], ['pita', 2], ['salt', 1],
    ],
    steps: [
      'Chop the cucumber into chunks and halve the cherry tomatoes.',
      'Thinly slice the red onion.',
      'Combine the cucumber, tomatoes and onion in a bowl with the olives.',
      'Whisk the olive oil, a squeeze of lemon juice, the oregano and salt together and pour over the vegetables; toss to coat.',
      'Crumble the feta over the top.',
      'Warm the pita and serve alongside the salad.',
    ],
  }),

  r('pesto-mozzarella-panini', 'Pesto Mozzarella Panini', '🥪', 'lunch', {
    servings: 2, prep: 5, cook: 8, protein: 'dairy', appliances: ['stovetop'], tags: ['italian', 'quick', 'vegetarian'],
    ingredients: [
      ['bread', 4], ['mozzarella', 100], ['pesto', 40], ['tomato-roma', 120], ['butter', 10],
    ],
    steps: [
      'Slice the tomato thinly.',
      'Spread the pesto over one side of each of the four bread slices.',
      'Layer the mozzarella and tomato slices on two of the bread slices, then top with the remaining bread, pesto side down.',
      'Butter the outside of each sandwich.',
      'Heat a skillet over medium heat and cook the sandwiches 3–4 minutes per side, pressing gently, until golden and the mozzarella has melted.',
      'Slice in half and serve warm.',
    ],
  }),

  r('blt', 'BLT Sandwich', '🥓', 'lunch', {
    servings: 2, prep: 5, cook: 10, protein: 'pork', appliances: ['stovetop'], tags: ['american', 'quick'],
    ingredients: [
      ['bacon', 120], ['lettuce-romaine', 0.25], ['tomato-roma', 150], ['mayo', 30], ['bread', 4],
    ],
    steps: [
      'Cook the bacon in a skillet over medium heat until crisp, about 8 minutes; drain on a paper towel.',
      'Toast the bread slices.',
      'Slice the tomato.',
      'Spread the mayo over two slices of the toasted bread.',
      'Layer the bacon, tomato and lettuce on top.',
      'Close each sandwich with the remaining bread, slice in half, and serve.',
    ],
  }),

  r('chicken-quesadilla', 'Rotisserie Chicken Quesadilla', '🧀', 'lunch', {
    servings: 2, prep: 5, cook: 10, protein: 'chicken', appliances: ['stovetop'], tags: ['mexican', 'quick'],
    ingredients: [
      ['rotisserie-chicken', 0.4], ['tortilla-flour', 2], ['cheddar', 100], ['salsa', 60],
      ['sour-cream', 40], ['butter', 10],
    ],
    steps: [
      'Shred the rotisserie chicken.',
      'Melt half the butter in a skillet over medium heat and lay one tortilla flat.',
      'Scatter half the cheddar over the tortilla, then top with the chicken and the remaining cheddar.',
      'Place the second tortilla on top and cook 3 minutes until the bottom is golden.',
      'Melt the remaining butter, flip the quesadilla, and cook 3 minutes more until golden and the cheese has melted.',
      'Slice into wedges and serve with the salsa and sour cream.',
    ],
  }),

  r('chicken-salad-wrap', 'Chicken Salad Wrap with Apple & Walnuts', '🌯', 'lunch', {
    servings: 2, prep: 10, cook: 0, protein: 'chicken', appliances: [], tags: ['american', 'quick', 'no-cook'],
    ingredients: [
      ['rotisserie-chicken', 0.4], ['greek-yogurt', 80], ['celery', 50], ['apple', 1],
      ['walnuts', 20], ['tortilla-flour', 2], ['lettuce-romaine', 0.25], ['salt', 1], ['black-pepper', 1],
    ],
    steps: [
      'Shred the rotisserie chicken and dice the celery and apple.',
      'Roughly chop the walnuts.',
      'Combine the chicken, celery, apple and walnuts in a bowl with the Greek yogurt, salt and black pepper; stir to coat.',
      'Lay the lettuce over each tortilla.',
      'Spoon the chicken salad down the center of each tortilla.',
      'Roll tightly, slice in half, and serve.',
    ],
  }),

  r('ramen-egg-bok-choy', 'Upgraded Ramen with Egg & Bok Choy', '🍜', 'lunch', {
    servings: 2, prep: 5, cook: 12, protein: 'eggs', appliances: ['stovetop'], tags: ['asian', 'quick', 'vegetarian'],
    ingredients: [
      ['ramen-noodles', 160], ['eggs', 2], ['bok-choy', 200], ['scallions', 2],
      ['vegetable-broth', 700], ['soy-sauce', 20], ['sesame-oil', 5], ['garlic', 1], ['ginger', 5],
    ],
    steps: [
      'Mince the garlic and ginger, and slice the scallions and bok choy.',
      'Bring the vegetable broth to a boil in a pot with the garlic, ginger and soy sauce.',
      'Meanwhile, soft-boil the eggs in a separate pot of simmering water, about 6–7 minutes, then peel and halve them.',
      'Add the ramen noodles to the broth and cook 3 minutes until nearly tender.',
      'Stir in the bok choy and cook 2 minutes more until wilted.',
      'Remove from heat and stir in the sesame oil.',
      'Divide between bowls, top each with a halved egg and the scallions, and serve hot.',
    ],
  }),

  r('grilled-cheese-tomato-soup', 'Grilled Cheese & Tomato Soup', '🍅', 'lunch', {
    servings: 2, prep: 5, cook: 25, protein: 'dairy', appliances: ['stovetop'], tags: ['american', 'vegetarian'],
    ingredients: [
      ['bread', 4], ['cheddar', 100], ['butter', 30], ['crushed-tomatoes', 1], ['onion-yellow', 0.5],
      ['garlic', 2], ['vegetable-broth', 250], ['heavy-cream', 60], ['olive-oil', 10], ['salt', 3],
    ],
    steps: [
      'Dice the onion and mince the garlic.',
      'Heat the olive oil in a pot over medium heat and cook the onion until softened, about 5 minutes.',
      'Add the garlic and cook 1 minute, then stir in the crushed tomatoes, vegetable broth and salt.',
      'Simmer 15 minutes, then stir in the heavy cream and simmer 2 minutes more.',
      'Meanwhile, butter the outside of the bread slices and layer the cheddar between two sandwiches.',
      'Cook the sandwiches in a skillet over medium heat 3–4 minutes per side until golden and the cheese has melted.',
      'Slice the sandwiches and serve alongside bowls of the soup.',
    ],
  }),

  r('cottage-cheese-power-bowl', 'Cottage Cheese Power Bowl', '🥒', 'lunch', {
    servings: 1, prep: 5, cook: 0, protein: 'dairy', appliances: [], tags: ['quick', 'no-cook', 'vegetarian'],
    ingredients: [
      ['cottage-cheese', 200], ['tomato-cherry', 100], ['cucumber', 0.5], ['avocado', 0.5],
      ['olive-oil', 10], ['black-pepper', 1], ['salt', 1],
    ],
    steps: [
      'Spoon the cottage cheese into a bowl.',
      'Halve the cherry tomatoes and dice the cucumber and avocado.',
      'Arrange the tomatoes, cucumber and avocado over the cottage cheese.',
      'Drizzle with the olive oil and season with salt and black pepper.',
      'Serve immediately.',
    ],
  }),

  r('shrimp-rice-bowl', 'Shrimp & Edamame Rice Bowl', '🍤', 'lunch', {
    servings: 2, prep: 10, cook: 15, protein: 'shellfish', appliances: ['stovetop'], tags: ['asian', 'quick', 'pescatarian'],
    ingredients: [
      ['shrimp', 250], ['rice-jasmine', 150], ['edamame', 100], ['avocado', 1], ['cucumber', 0.5],
      ['soy-sauce', 20], ['sriracha', 10], ['sesame-seeds', 5], ['vegetable-oil', 10],
    ],
    steps: [
      'Cook the rice according to the package directions.',
      'Meanwhile, cook the edamame according to the package directions and drain.',
      'Pat the shrimp dry, then heat the vegetable oil in a skillet over medium-high heat.',
      'Add the shrimp and cook 2–3 minutes per side until pink and opaque.',
      'Slice the avocado and cucumber.',
      'Divide the rice between bowls and top with the shrimp, edamame, avocado and cucumber.',
      'Drizzle with the soy sauce and sriracha, sprinkle with sesame seeds, and serve.',
    ],
  }),

  r('salmon-salad', 'Seared Salmon Salad', '🐟', 'lunch', {
    servings: 2, prep: 5, cook: 12, protein: 'fish', appliances: ['stovetop'], tags: ['american', 'quick', 'pescatarian'],
    ingredients: [
      ['salmon', 300], ['spring-mix', 100], ['cucumber', 0.5], ['avocado', 1], ['lemon', 1],
      ['olive-oil', 30], ['salt', 2], ['black-pepper', 1],
    ],
    steps: [
      'Pat the salmon dry and season with salt and black pepper.',
      'Heat half the olive oil in a skillet over medium heat and sear the salmon 4–5 minutes per side until it flakes easily.',
      'Meanwhile, slice the cucumber and avocado.',
      'Whisk the remaining olive oil with the juice of the lemon in a small bowl.',
      'Toss the spring mix, cucumber and avocado with the lemon dressing.',
      'Flake the salmon and arrange it over the salad.',
      'Serve immediately.',
    ],
  }),

  r('turkey-chili', 'Turkey Chili', '🌶️', 'lunch', {
    servings: 4, prep: 10, cook: 35, protein: 'chicken', appliances: ['stovetop'], tags: ['tex-mex'],
    ingredients: [
      ['ground-turkey', 450], ['kidney-beans', 1], ['diced-tomatoes', 1], ['onion-yellow', 1],
      ['bell-pepper', 1], ['garlic', 3], ['chili-powder', 10], ['cumin', 5], ['chicken-broth', 250],
      ['olive-oil', 15], ['salt', 4],
    ],
    steps: [
      'Dice the onion and bell pepper, and mince the garlic.',
      'Heat the olive oil in a large pot over medium heat and cook the onion and bell pepper until softened, about 5 minutes.',
      'Add the garlic, chili powder and cumin and cook 1 minute until fragrant.',
      'Add the ground turkey and cook, breaking it up, 6–7 minutes until browned.',
      'Drain and rinse the kidney beans and add them along with the diced tomatoes, chicken broth and salt.',
      'Bring to a simmer and cook 20 minutes, stirring occasionally, until thickened.',
      'Ladle into bowls and serve.',
    ],
  }),

  r('loaded-sweet-potato', 'Loaded Baked Sweet Potato', '🍠', 'lunch', {
    servings: 2, prep: 5, cook: 45, protein: 'beans', appliances: ['oven'], tags: ['american', 'vegetarian'],
    ingredients: [
      ['sweet-potato', 500], ['black-beans', 1], ['greek-yogurt', 60], ['cheddar', 50],
      ['scallions', 2], ['salsa', 60], ['salt', 1],
    ],
    steps: [
      'Heat the oven to 400°F (200°C). Pierce the sweet potatoes several times with a fork.',
      'Rub the sweet potatoes with the salt and place on a sheet pan.',
      'Bake 40–45 minutes until a knife slides in easily.',
      'Meanwhile, drain and rinse the black beans and warm them in a small pot.',
      'Slice the scallions.',
      'Split the sweet potatoes open and fluff the flesh with a fork.',
      'Top each with the black beans, cheddar, a dollop of Greek yogurt, salsa and scallions, and serve.',
    ],
  }),

  r('mediterranean-couscous-bowl', 'Mediterranean Couscous Bowl', '🥙', 'lunch', {
    servings: 2, prep: 10, cook: 10, protein: 'beans', appliances: ['stovetop'], tags: ['mediterranean', 'quick', 'vegetarian'],
    ingredients: [
      ['couscous', 150], ['chickpeas', 1], ['cucumber', 0.5], ['tomato-cherry', 150], ['feta', 60],
      ['olives', 50], ['lemon', 1], ['olive-oil', 30], ['parsley', 0.5], ['salt', 2],
    ],
    steps: [
      'Bring water to a boil, pour over the couscous in a bowl, cover, and let sit 5 minutes until absorbed; fluff with a fork.',
      'Meanwhile, drain and rinse the chickpeas, and dice the cucumber and cherry tomatoes.',
      'Chop the parsley.',
      'Whisk the olive oil with the juice of the lemon and the salt in a large bowl.',
      'Add the couscous, chickpeas, cucumber, tomatoes, olives and parsley, and toss to combine.',
      'Crumble the feta over the top and serve.',
    ],
  }),

  r('chicken-noodle-soup', 'Chicken Noodle Soup', '🍲', 'lunch', {
    servings: 4, prep: 10, cook: 30, protein: 'chicken', appliances: ['stovetop'], tags: ['american'],
    ingredients: [
      ['chicken-breast', 400], ['chicken-broth', 1500], ['carrots', 150], ['celery', 100],
      ['onion-yellow', 1], ['spaghetti', 120], ['parsley', 0.5], ['garlic', 2], ['olive-oil', 15],
      ['salt', 4], ['black-pepper', 1],
    ],
    steps: [
      'Dice the onion, carrots and celery, and mince the garlic.',
      'Heat the olive oil in a large pot over medium heat and cook the onion, carrots and celery until softened, about 6 minutes.',
      'Add the garlic and cook 1 minute, then pour in the chicken broth.',
      'Add the chicken breast, bring to a simmer, and cook 15 minutes until the chicken is cooked through.',
      'Remove the chicken, shred it, and return it to the pot.',
      'Break the spaghetti into short pieces, add it to the pot with the salt and black pepper, and simmer 8–10 minutes until tender.',
      'Chop the parsley, stir it in, and serve hot.',
    ],
  }),

  r('bean-cheese-burrito', 'Bean & Cheese Burrito', '🌯', 'lunch', {
    servings: 2, prep: 5, cook: 15, protein: 'beans', appliances: ['stovetop'], tags: ['mexican', 'quick', 'vegetarian'],
    ingredients: [
      ['tortilla-flour', 2], ['black-beans', 1], ['cheddar', 80], ['rice-jasmine', 100],
      ['salsa', 80], ['sour-cream', 40], ['cumin', 2], ['salt', 1],
    ],
    steps: [
      'Cook the rice according to the package directions.',
      'Meanwhile, drain and rinse the black beans and warm them in a small pot with the cumin and salt, about 5 minutes.',
      'Warm the tortillas in a dry skillet, about 30 seconds per side.',
      'Divide the rice, black beans and cheddar between the tortillas.',
      'Top each with the salsa and sour cream.',
      'Fold each tortilla into a burrito and serve.',
    ],
  }),

  r('avocado-egg-salad-sandwich', 'Avocado Egg Salad Sandwich', '🥑', 'lunch', {
    servings: 2, prep: 10, cook: 12, protein: 'eggs', appliances: ['stovetop'], tags: ['american', 'quick', 'vegetarian'],
    ingredients: [
      ['eggs', 4], ['avocado', 1], ['lemon', 0.5], ['bread', 4], ['spring-mix', 30],
      ['salt', 1], ['black-pepper', 1],
    ],
    steps: [
      'Place the eggs in a pot of water, bring to a boil, then cover and remove from heat; let sit 11 minutes.',
      'Drain and cool the eggs under cold water, then peel and chop them.',
      'Mash the avocado in a bowl with a squeeze of lemon juice.',
      'Fold the chopped eggs into the mashed avocado and season with salt and black pepper.',
      'Divide the spring mix between two slices of bread.',
      'Spoon the avocado egg salad over the greens and top with the remaining bread slices.',
      'Slice in half and serve.',
    ],
  }),
];
