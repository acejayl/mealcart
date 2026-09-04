import type { Recipe } from '../../domain/types';
import { r } from './helpers';

export const DINNERS: Recipe[] = [
  r('chickpea-coconut-curry', 'Chickpea Coconut Curry', '🍛', 'dinner', {
    servings: 4, prep: 10, cook: 25, protein: 'beans', appliances: ['stovetop'], tags: ['indian', 'vegan'],
    ingredients: [
      ['chickpeas', 2], ['coconut-milk', 1], ['onion-yellow', 1], ['garlic', 3], ['ginger', 15],
      ['diced-tomatoes', 1], ['curry-powder', 10], ['spinach', 120], ['rice-jasmine', 300],
      ['olive-oil', 15], ['salt', 4], ['cilantro', 0.5],
    ],
    steps: [
      'Drain and rinse the chickpeas; dice the yellow onion and mince the garlic and ginger.',
      'Heat the olive oil in a large pot over medium heat and cook the onion 5 minutes until softened.',
      'Stir in the garlic, ginger and curry powder and cook 1 minute until fragrant.',
      'Add the diced tomatoes, coconut milk, chickpeas and salt; simmer 15 minutes, stirring occasionally.',
      'Meanwhile, cook the jasmine rice according to package directions.',
      'Stir the spinach into the curry and cook 2 minutes until wilted.',
      'Spoon over the rice and top with chopped cilantro.',
    ],
  }),

  r('tofu-veggie-stir-fry', 'Tofu Veggie Stir-Fry', '🥦', 'dinner', {
    servings: 4, prep: 15, cook: 15, protein: 'tofu', appliances: ['stovetop'], tags: ['asian', 'vegan'],
    ingredients: [
      ['tofu-firm', 400], ['broccoli', 400], ['bell-pepper', 2], ['soy-sauce', 60], ['garlic', 3],
      ['ginger', 15], ['cornstarch', 10], ['sesame-oil', 10], ['vegetable-oil', 30], ['rice-jasmine', 300],
    ],
    steps: [
      'Press the tofu to remove excess water, then cut into 1-inch cubes.',
      'Whisk the soy sauce, cornstarch and 60 ml water in a small bowl to make the sauce.',
      'Cook the jasmine rice according to package directions.',
      'Heat half the vegetable oil in a wok or large skillet over high heat and sear the tofu 5 minutes until golden; remove.',
      'Add the remaining vegetable oil, then stir-fry the broccoli and bell pepper 5 minutes until crisp-tender.',
      'Stir in the garlic and ginger and cook 30 seconds until fragrant.',
      'Return the tofu to the pan, pour in the sauce, and toss 1–2 minutes until glossy and thickened.',
      'Drizzle with sesame oil and serve over the rice.',
    ],
  }),

  r('black-bean-tacos', 'Black Bean Tacos with Slaw', '🌮', 'dinner', {
    servings: 4, prep: 15, cook: 10, protein: 'beans', appliances: ['stovetop'], tags: ['mexican', 'quick', 'vegan'],
    ingredients: [
      ['black-beans', 2], ['tortilla-corn', 12], ['cabbage', 0.5], ['avocado', 2], ['lime', 2],
      ['cilantro', 0.5], ['jalapeno', 1], ['cumin', 4], ['chili-powder', 4], ['olive-oil', 15], ['salt', 3],
    ],
    steps: [
      'Thinly slice the cabbage and mince the jalapeño; toss with the juice of one lime and a pinch of salt to make the slaw.',
      'Drain and rinse the black beans.',
      'Heat the olive oil in a skillet over medium heat and add the black beans, cumin, chili powder and remaining salt.',
      'Cook 6–8 minutes, mashing some of the beans, until warmed through and slightly thickened.',
      'Warm the corn tortillas in a dry skillet or over an open flame, about 30 seconds per side.',
      'Slice the avocado.',
      'Fill each tortilla with the beans, slaw, avocado and cilantro, and serve with the remaining lime cut into wedges.',
    ],
  }),

  r('vegan-chili', 'Three-Bean Chili', '🌶️', 'dinner', {
    servings: 4, prep: 10, cook: 35, protein: 'beans', appliances: ['stovetop'], tags: ['american', 'one-pan', 'vegan'],
    ingredients: [
      ['black-beans', 1], ['kidney-beans', 1], ['chickpeas', 1], ['diced-tomatoes', 2], ['onion-yellow', 1],
      ['bell-pepper', 1], ['garlic', 3], ['chili-powder', 12], ['cumin', 5], ['vegetable-broth', 500],
      ['olive-oil', 15], ['salt', 4],
    ],
    steps: [
      'Dice the onion and bell pepper and mince the garlic.',
      'Heat the olive oil in a large pot over medium heat and cook the onion and pepper 5 minutes until softened.',
      'Add the garlic, chili powder and cumin and cook 1 minute until fragrant.',
      'Drain and rinse the black beans, kidney beans and chickpeas and add them to the pot.',
      'Stir in the diced tomatoes, vegetable broth and salt.',
      'Bring to a simmer and cook uncovered 30 minutes, stirring occasionally, until thickened.',
      'Ladle into bowls and serve hot.',
    ],
  }),

  r('pasta-marinara-roasted-veg', 'Pasta with Roasted Vegetables & Marinara', '🍝', 'dinner', {
    servings: 4, prep: 10, cook: 25, protein: 'none', appliances: ['stovetop', 'oven'], tags: ['italian', 'vegan'],
    ingredients: [
      ['spaghetti', 400], ['marinara', 680], ['zucchini', 2], ['bell-pepper', 2], ['mushrooms-cremini', 200],
      ['olive-oil', 30], ['garlic', 2], ['salt', 3], ['red-pepper-flakes', 1],
    ],
    steps: [
      'Heat the oven to 425°F (220°C). Cut the zucchini and bell peppers into chunks and slice the mushrooms.',
      'Toss the vegetables with half the olive oil and half the salt on a sheet pan and roast 20 minutes, stirring once, until tender and lightly browned.',
      'Meanwhile, bring a large pot of salted water to a boil and cook the spaghetti according to package directions.',
      'Mince the garlic and warm the remaining olive oil in a saucepan over medium-low heat; add the garlic and red pepper flakes and cook 1 minute until fragrant.',
      'Stir in the marinara and remaining salt and simmer 5 minutes.',
      'Drain the pasta and toss with the marinara sauce and roasted vegetables.',
      'Serve hot.',
    ],
  }),

  r('sheet-pan-tofu-veg', 'Sheet-Pan Tofu, Cauliflower & Sweet Potato', '🍠', 'dinner', {
    servings: 4, prep: 15, cook: 30, protein: 'tofu', appliances: ['oven', 'stovetop'], tags: ['one-pan', 'vegan'],
    ingredients: [
      ['tofu-firm', 400], ['cauliflower', 1], ['sweet-potato', 500], ['olive-oil', 45], ['soy-sauce', 30],
      ['garlic-powder', 4], ['paprika', 4], ['rice-jasmine', 300], ['salt', 3],
    ],
    steps: [
      'Heat the oven to 425°F (220°C). Press the tofu and cut into 1-inch cubes; cut the cauliflower into florets and the sweet potato into 1-inch chunks.',
      'Toss the tofu, cauliflower and sweet potato with the olive oil, soy sauce, garlic powder, paprika and salt on a sheet pan.',
      'Spread in a single layer and roast 30 minutes, flipping halfway, until golden and tender.',
      'Meanwhile, cook the jasmine rice on the stovetop according to package directions.',
      'Serve the roasted tofu and vegetables over the rice.',
    ],
  }),

  r('lentil-bolognese', 'Lentil Bolognese', '🍝', 'dinner', {
    servings: 4, prep: 10, cook: 40, protein: 'beans', appliances: ['stovetop'], tags: ['italian', 'vegan'],
    ingredients: [
      ['lentils', 250], ['crushed-tomatoes', 1], ['onion-yellow', 1], ['carrots', 150], ['celery', 80],
      ['garlic', 3], ['spaghetti', 400], ['italian-seasoning', 4], ['olive-oil', 30], ['salt', 4],
    ],
    steps: [
      'Rinse the lentils. Finely dice the onion, carrots and celery, and mince the garlic.',
      'Heat the olive oil in a large pot over medium heat and cook the onion, carrots and celery 6 minutes until softened.',
      'Add the garlic and italian seasoning and cook 1 minute until fragrant.',
      'Stir in the lentils, crushed tomatoes, salt and 500 ml water; bring to a simmer.',
      'Cover and cook 30 minutes, stirring occasionally, until the lentils are tender.',
      'Meanwhile, cook the spaghetti according to package directions and drain.',
      'Toss the spaghetti with the lentil bolognese and serve.',
    ],
  }),

  r('coconut-red-lentil-dal', 'Coconut Red Lentil Dal', '🍛', 'dinner', {
    servings: 4, prep: 10, cook: 30, protein: 'beans', appliances: ['stovetop'], tags: ['indian', 'vegan'],
    ingredients: [
      ['red-lentils', 300], ['coconut-milk', 1], ['onion-yellow', 1], ['garlic', 3], ['ginger', 15],
      ['cumin', 4], ['curry-powder', 8], ['diced-tomatoes', 1], ['rice-jasmine', 300], ['cilantro', 0.5],
      ['olive-oil', 15], ['salt', 4],
    ],
    steps: [
      'Rinse the red lentils; dice the onion and mince the garlic and ginger.',
      'Heat the olive oil in a pot over medium heat and cook the onion 5 minutes until softened.',
      'Add the garlic, ginger, cumin and curry powder and cook 1 minute until fragrant.',
      'Stir in the red lentils, diced tomatoes, coconut milk, salt and 500 ml water.',
      'Bring to a simmer and cook 20 minutes, stirring occasionally, until the lentils break down and thicken.',
      'Meanwhile, cook the jasmine rice according to package directions.',
      'Spoon the dal over the rice and top with chopped cilantro.',
    ],
  }),

  r('veggie-fajitas', 'Veggie Fajitas', '🌯', 'dinner', {
    servings: 4, prep: 15, cook: 15, protein: 'none', appliances: ['stovetop'], tags: ['mexican', 'vegan'],
    ingredients: [
      ['bell-pepper', 3], ['onion-yellow', 1], ['mushrooms-cremini', 250], ['tortilla-flour', 8], ['lime', 2],
      ['chili-powder', 6], ['cumin', 4], ['avocado', 2], ['olive-oil', 30], ['salt', 3],
    ],
    steps: [
      'Slice the bell peppers and onion into thin strips; slice the mushrooms.',
      'Heat the olive oil in a large skillet over medium-high heat and add the peppers and onion.',
      'Cook 6 minutes, then add the mushrooms, chili powder, cumin and salt and cook 6 minutes more until tender.',
      'Squeeze the juice of one lime over the vegetables and toss.',
      'Warm the flour tortillas in a dry skillet, about 30 seconds per side.',
      'Slice the avocado.',
      'Fill the tortillas with the vegetables and avocado, and serve with the remaining lime cut into wedges.',
    ],
  }),

  r('stuffed-sweet-potatoes', 'Black Bean Stuffed Sweet Potatoes', '🍠', 'dinner', {
    servings: 4, prep: 10, cook: 50, protein: 'beans', appliances: ['oven'], tags: ['one-pan', 'vegan'],
    ingredients: [
      ['sweet-potato', 900], ['black-beans', 2], ['salsa', 200], ['avocado', 2], ['lime', 1],
      ['cilantro', 0.5], ['cumin', 3], ['salt', 3],
    ],
    steps: [
      'Heat the oven to 425°F (220°C). Pierce the sweet potatoes several times with a fork.',
      'Place on a sheet pan and roast 45 minutes until fork-tender.',
      'Meanwhile, drain and rinse the black beans and toss with the salsa, cumin and half the salt.',
      'When the potatoes are nearly done, spoon the bean mixture into a small oven-safe dish and warm in the oven 5 minutes.',
      'Slice the avocado and squeeze the lime juice over it.',
      'Split each sweet potato open and season with the remaining salt.',
      'Top with the warm black bean mixture, avocado and cilantro, and serve.',
    ],
  }),

  r('thai-red-curry-veg', 'Thai Red Curry with Tofu & Vegetables', '🥥', 'dinner', {
    servings: 4, prep: 15, cook: 20, protein: 'tofu', appliances: ['stovetop'], tags: ['thai', 'vegan'],
    ingredients: [
      ['curry-paste', 60], ['coconut-milk', 2], ['tofu-firm', 400], ['bell-pepper', 2], ['green-beans', 200],
      ['rice-jasmine', 300], ['lime', 1], ['basil', 15], ['vegetable-oil', 15], ['soy-sauce', 15], ['sugar', 10],
    ],
    steps: [
      'Press the tofu and cut into 1-inch cubes; slice the bell peppers and trim the green beans.',
      'Cook the jasmine rice according to package directions.',
      'Heat the vegetable oil in a large pot over medium heat and fry the curry paste 1 minute until fragrant.',
      'Stir in the coconut milk, soy sauce and sugar and bring to a simmer.',
      'Add the tofu, bell peppers and green beans and simmer 12 minutes until the vegetables are tender.',
      'Remove from heat and stir in the juice of the lime and torn basil leaves.',
      'Serve over the rice.',
    ],
  }),

  r('sheet-pan-chicken-potatoes', 'Sheet-Pan Chicken Thighs, Potatoes & Broccoli', '🍗', 'dinner', {
    servings: 4, prep: 10, cook: 35, protein: 'chicken', appliances: ['oven'], tags: ['one-pan', 'american'],
    ingredients: [
      ['chicken-thigh', 700], ['potato-yukon', 600], ['broccoli', 400], ['olive-oil', 45],
      ['garlic-powder', 4], ['paprika', 4], ['lemon', 1], ['salt', 4], ['black-pepper', 2],
    ],
    steps: [
      'Heat the oven to 425°F (220°C). Cut potatoes into 1-inch chunks and broccoli into florets.',
      'Toss potatoes with half the oil, salt and pepper on a sheet pan; roast 15 minutes.',
      'Pat chicken dry, rub with remaining oil, garlic powder, paprika, salt and pepper.',
      'Push potatoes to one side, add chicken and broccoli, and roast 20 minutes more until chicken reaches 165°F.',
      'Squeeze lemon over everything and serve.',
    ],
  }),

  r('chicken-stir-fry', 'Chicken & Broccoli Stir-Fry', '🥢', 'dinner', {
    servings: 4, prep: 15, cook: 15, protein: 'chicken', appliances: ['stovetop'], tags: ['asian'],
    ingredients: [
      ['chicken-breast', 600], ['broccoli', 400], ['bell-pepper', 1], ['soy-sauce', 60], ['garlic', 3],
      ['ginger', 15], ['cornstarch', 10], ['vegetable-oil', 30], ['rice-jasmine', 300],
    ],
    steps: [
      'Cut the chicken breast into bite-sized pieces; cut the broccoli into florets and slice the bell pepper.',
      'Whisk the soy sauce and cornstarch with 60 ml water to make the sauce.',
      'Cook the jasmine rice according to package directions.',
      'Heat half the vegetable oil in a wok or large skillet over high heat and stir-fry the chicken 5–6 minutes until cooked through; remove.',
      'Add the remaining vegetable oil, then stir-fry the broccoli and bell pepper 4 minutes until crisp-tender.',
      'Add the garlic and ginger and cook 30 seconds until fragrant.',
      'Return the chicken to the pan, pour in the sauce, and toss 1–2 minutes until thickened and the chicken reaches 165°F.',
      'Serve over the rice.',
    ],
  }),

  r('chicken-tacos', 'Chicken Tacos with Lime Slaw', '🌮', 'dinner', {
    servings: 4, prep: 15, cook: 15, protein: 'chicken', appliances: ['stovetop'], tags: ['mexican'],
    ingredients: [
      ['chicken-thigh', 600], ['tortilla-corn', 12], ['cabbage', 0.5], ['lime', 2], ['cilantro', 0.5],
      ['chili-powder', 6], ['cumin', 4], ['sour-cream', 100], ['vegetable-oil', 15], ['salt', 3],
    ],
    steps: [
      'Thinly slice the cabbage and toss with the juice of one lime and half the salt to make the slaw.',
      'Cut the chicken thighs into strips and season with the chili powder, cumin and remaining salt.',
      'Heat the vegetable oil in a skillet over medium-high heat and cook the chicken 8–9 minutes, stirring occasionally, until cooked through and reaching 165°F.',
      'Warm the corn tortillas in a dry skillet, about 30 seconds per side.',
      'Fill the tortillas with the chicken and slaw.',
      'Top with sour cream, cilantro and the remaining lime cut into wedges.',
    ],
  }),

  r('chicken-fajitas', 'Chicken Fajitas', '🌯', 'dinner', {
    servings: 4, prep: 15, cook: 15, protein: 'chicken', appliances: ['stovetop'], tags: ['mexican'],
    ingredients: [
      ['chicken-breast', 600], ['bell-pepper', 3], ['onion-yellow', 1], ['tortilla-flour', 8], ['lime', 2],
      ['chili-powder', 6], ['cumin', 4], ['sour-cream', 100], ['cheddar', 100], ['vegetable-oil', 30], ['salt', 3],
    ],
    steps: [
      'Cut the chicken breast and bell peppers and onion into thin strips.',
      'Season the chicken with the chili powder, cumin and half the salt.',
      'Heat half the vegetable oil in a large skillet over medium-high heat and cook the chicken 6–7 minutes until cooked through and reaching 165°F; remove.',
      'Add the remaining vegetable oil and cook the peppers and onion 6 minutes until softened, seasoning with the remaining salt.',
      'Return the chicken to the pan and squeeze the juice of one lime over everything.',
      'Warm the flour tortillas and shred the cheddar.',
      'Fill the tortillas with the chicken and vegetables, top with sour cream and cheddar, and serve with the remaining lime cut into wedges.',
    ],
  }),

  r('one-pot-chicken-rice', 'One-Pot Chicken & Rice', '🍚', 'dinner', {
    servings: 4, prep: 10, cook: 35, protein: 'chicken', appliances: ['stovetop'], tags: ['american', 'one-pan'],
    ingredients: [
      ['chicken-thigh', 600], ['rice-jasmine', 300], ['onion-yellow', 1], ['garlic', 3], ['chicken-broth', 700],
      ['frozen-mixed-veg', 250], ['paprika', 4], ['olive-oil', 15], ['salt', 4],
    ],
    steps: [
      'Dice the onion and mince the garlic. Season the chicken thighs with the paprika and half the salt.',
      'Heat the olive oil in a large pot over medium-high heat and sear the chicken 3 minutes per side until browned; remove.',
      'Add the onion and cook 4 minutes until softened, then add the garlic and cook 30 seconds.',
      'Stir in the rice, chicken broth and remaining salt, and nestle the chicken back into the pot.',
      'Bring to a boil, then cover, reduce heat to low, and simmer 18 minutes.',
      'Stir in the frozen mixed vegetables, cover, and cook 5 minutes more until the rice is tender and the chicken reaches 165°F.',
      'Fluff with a fork and serve.',
    ],
  }),

  r('baked-chicken-parm', 'Baked Chicken Parmesan', '🍗', 'dinner', {
    servings: 4, prep: 15, cook: 25, protein: 'chicken', appliances: ['oven', 'stovetop'], tags: ['italian'],
    ingredients: [
      ['chicken-breast', 600], ['panko', 80], ['parmesan', 60], ['eggs', 2], ['marinara', 500],
      ['mozzarella', 150], ['spaghetti', 400], ['italian-seasoning', 3], ['olive-oil', 15], ['salt', 3],
    ],
    steps: [
      'Heat the oven to 425°F (220°C). Slice the chicken breasts horizontally into thin cutlets.',
      'Whisk the eggs in one bowl; mix the panko, parmesan, italian seasoning and salt in another.',
      'Dip each cutlet in the egg, then coat in the panko mixture.',
      'Heat the olive oil in an oven-safe skillet over medium heat and sear the cutlets 2 minutes per side until golden.',
      'Spoon the marinara over the cutlets and top with the mozzarella.',
      'Transfer to the oven and bake 12–15 minutes until the chicken reaches 165°F and the cheese is bubbling.',
      'Meanwhile, cook the spaghetti according to package directions and drain.',
      'Serve the chicken over the spaghetti.',
    ],
  }),

  r('slow-cooker-bbq-chicken', 'Slow Cooker BBQ Chicken Sandwiches', '🍔', 'dinner', {
    servings: 4, prep: 10, cook: 240, protein: 'chicken', appliances: ['slowCooker'], tags: ['american'],
    ingredients: [
      ['chicken-thigh', 700], ['bbq-sauce', 300], ['burger-bun', 4], ['cabbage', 0.25], ['mayo', 40],
      ['vinegar', 15], ['salt', 2],
    ],
    steps: [
      'Season the chicken thighs with the salt and place in the slow cooker.',
      'Pour the BBQ sauce over the chicken and toss to coat.',
      'Cover and cook on high about 4 hours, or on low 8 hours, until the chicken shreds easily.',
      'Meanwhile, thinly slice the cabbage and toss with the mayo and vinegar to make a quick slaw.',
      'Shred the chicken with two forks directly in the slow cooker and stir into the sauce.',
      'Toast the burger buns and pile on the BBQ chicken.',
      'Top with the slaw and serve.',
    ],
  }),

  r('chicken-curry', 'Chicken Coconut Curry', '🍛', 'dinner', {
    servings: 4, prep: 15, cook: 30, protein: 'chicken', appliances: ['stovetop'], tags: ['indian'],
    ingredients: [
      ['chicken-thigh', 600], ['coconut-milk', 1], ['curry-powder', 12], ['onion-yellow', 1], ['garlic', 3],
      ['ginger', 15], ['diced-tomatoes', 1], ['rice-jasmine', 300], ['cilantro', 0.5], ['vegetable-oil', 15], ['salt', 4],
    ],
    steps: [
      'Cut the chicken thighs into bite-sized pieces; dice the onion and mince the garlic and ginger.',
      'Heat the vegetable oil in a pot over medium heat and cook the onion 5 minutes until softened.',
      'Add the garlic, ginger and curry powder and cook 1 minute until fragrant.',
      'Add the chicken and salt and cook 5 minutes, stirring, until the outside is no longer pink.',
      'Stir in the diced tomatoes and coconut milk; bring to a simmer.',
      'Cover and cook 15 minutes until the chicken reaches 165°F and the sauce has thickened.',
      'Meanwhile, cook the jasmine rice according to package directions.',
      'Spoon the curry over the rice and top with chopped cilantro.',
    ],
  }),

  r('beef-tacos', 'Ground Beef Tacos', '🌮', 'dinner', {
    servings: 4, prep: 10, cook: 15, protein: 'beef', appliances: ['stovetop'], tags: ['mexican', 'quick'],
    ingredients: [
      ['ground-beef', 500], ['tortilla-corn', 12], ['cheddar', 100], ['lettuce-romaine', 0.5], ['tomato-roma', 150],
      ['salsa', 120], ['chili-powder', 8], ['cumin', 4], ['sour-cream', 100], ['salt', 3],
    ],
    steps: [
      'Shred the cheddar, shred the romaine lettuce, and dice the roma tomatoes.',
      'Heat a skillet over medium-high heat and cook the ground beef 6–7 minutes, breaking it up, until browned.',
      'Stir in the chili powder, cumin and salt and cook 1 minute more.',
      'Warm the corn tortillas in a dry skillet, about 30 seconds per side.',
      'Fill the tortillas with the beef, cheddar, lettuce and tomatoes.',
      'Top with the salsa and sour cream and serve.',
    ],
  }),

  r('spaghetti-bolognese', 'Spaghetti Bolognese', '🍝', 'dinner', {
    servings: 4, prep: 10, cook: 40, protein: 'beef', appliances: ['stovetop'], tags: ['italian'],
    ingredients: [
      ['ground-beef', 500], ['crushed-tomatoes', 1], ['onion-yellow', 1], ['garlic', 3], ['carrots', 100],
      ['spaghetti', 400], ['parmesan', 40], ['italian-seasoning', 4], ['olive-oil', 15], ['salt', 4],
    ],
    steps: [
      'Finely dice the onion and carrots and mince the garlic.',
      'Heat the olive oil in a large pot over medium heat and cook the onion and carrots 6 minutes until softened.',
      'Add the garlic and cook 30 seconds, then add the ground beef and cook 7–8 minutes, breaking it up, until browned.',
      'Stir in the crushed tomatoes, italian seasoning and salt; bring to a simmer.',
      'Cover partially and cook 25 minutes, stirring occasionally, until thickened.',
      'Meanwhile, cook the spaghetti according to package directions and drain.',
      'Toss the spaghetti with the bolognese and top with grated parmesan.',
    ],
  }),

  r('burgers-oven-fries', 'Cheeseburgers with Oven Fries', '🍔', 'dinner', {
    servings: 4, prep: 15, cook: 30, protein: 'beef', appliances: ['stovetop', 'oven'], tags: ['american'],
    ingredients: [
      ['ground-beef', 600], ['burger-bun', 4], ['cheddar', 80], ['lettuce-romaine', 0.25], ['tomato-roma', 150],
      ['onion-red', 0.5], ['potato-russet', 800], ['olive-oil', 30], ['ketchup', 60], ['salt', 4],
      ['onion-powder', 2], ['black-pepper', 2],
    ],
    steps: [
      'Heat the oven to 425°F (220°C). Cut the russet potatoes into fries, toss with the olive oil, half the salt and the onion powder, and spread on a sheet pan.',
      'Roast the fries 25–30 minutes, flipping halfway, until golden and crisp.',
      'Meanwhile, shape the ground beef into 4 patties and season with the remaining salt and the black pepper.',
      'Heat a skillet over medium-high heat and cook the patties 4 minutes per side, topping with the cheddar in the last minute, until they reach 160°F.',
      'Slice the tomato and red onion and shred the lettuce.',
      'Toast the burger buns.',
      'Build the burgers with lettuce, tomato, red onion and ketchup, and serve with the fries.',
    ],
  }),

  r('beef-broccoli', 'Beef & Broccoli', '🥦', 'dinner', {
    servings: 4, prep: 15, cook: 15, protein: 'beef', appliances: ['stovetop'], tags: ['asian'],
    ingredients: [
      ['steak-flank', 500], ['broccoli', 500], ['soy-sauce', 60], ['garlic', 3], ['ginger', 15],
      ['cornstarch', 15], ['brown-sugar', 15], ['sesame-oil', 10], ['vegetable-oil', 30], ['rice-jasmine', 300],
    ],
    steps: [
      'Slice the flank steak thinly against the grain; cut the broccoli into florets.',
      'Whisk the soy sauce, cornstarch, brown sugar and 80 ml water to make the sauce.',
      'Cook the jasmine rice according to package directions.',
      'Heat half the vegetable oil in a wok or large skillet over high heat and sear the steak 2–3 minutes until browned; remove.',
      'Add the remaining vegetable oil and stir-fry the broccoli 4 minutes until crisp-tender.',
      'Add the garlic and ginger and cook 30 seconds until fragrant.',
      'Return the steak to the pan, pour in the sauce, and toss 1–2 minutes until glossy and thickened.',
      'Drizzle with sesame oil and serve over the rice.',
    ],
  }),

  r('slow-cooker-beef-stew', 'Slow Cooker Beef Stew', '🍲', 'dinner', {
    servings: 4, prep: 20, cook: 480, protein: 'beef', appliances: ['slowCooker', 'stovetop'], tags: ['american', 'one-pan'],
    ingredients: [
      ['beef-stew', 700], ['potato-yukon', 500], ['carrots', 300], ['onion-yellow', 1], ['garlic', 3],
      ['chicken-broth', 700], ['tomato-paste', 1], ['flour', 30], ['olive-oil', 15], ['salt', 4], ['black-pepper', 2],
    ],
    steps: [
      'Cut the potatoes into 1-inch chunks, slice the carrots and dice the onion; mince the garlic.',
      'Toss the beef stew meat with the flour, salt and black pepper.',
      'Heat the olive oil in a skillet over medium-high heat and sear the beef 4–5 minutes until browned; transfer to the slow cooker.',
      'Add the potatoes, carrots, onion, garlic and tomato paste to the slow cooker and pour in the chicken broth.',
      'Stir to combine, cover, and cook on low 8 hours until the beef and vegetables are fork-tender.',
      'Stir well and adjust seasoning before serving.',
    ],
  }),

  r('turkey-meatballs-marinara', 'Turkey Meatballs with Marinara', '🍝', 'dinner', {
    servings: 4, prep: 15, cook: 25, protein: 'chicken', appliances: ['oven', 'stovetop'], tags: ['italian'],
    ingredients: [
      ['ground-turkey', 500], ['panko', 60], ['eggs', 1], ['parmesan', 40], ['garlic', 2], ['marinara', 680],
      ['spaghetti', 400], ['italian-seasoning', 3], ['salt', 3],
    ],
    steps: [
      'Heat the oven to 400°F (205°C). Mince the garlic.',
      'In a bowl, mix the ground turkey, panko, egg, parmesan, garlic, italian seasoning and salt until just combined.',
      'Shape into 16 meatballs and arrange on a sheet pan.',
      'Bake 18–20 minutes until the meatballs reach 165°F.',
      'Meanwhile, warm the marinara in a saucepan over medium-low heat and cook the spaghetti according to package directions.',
      'Add the baked meatballs to the marinara and simmer 3 minutes to coat.',
      'Serve the meatballs and sauce over the spaghetti.',
    ],
  }),

  r('turkey-burrito-bowls', 'Turkey Burrito Bowls', '🥗', 'dinner', {
    servings: 4, prep: 10, cook: 20, protein: 'chicken', appliances: ['stovetop'], tags: ['mexican'],
    ingredients: [
      ['ground-turkey', 500], ['rice-jasmine', 300], ['black-beans', 1], ['frozen-corn', 150], ['salsa', 200],
      ['cheddar', 100], ['avocado', 2], ['lime', 1], ['chili-powder', 8], ['cumin', 4], ['vegetable-oil', 15], ['salt', 3],
    ],
    steps: [
      'Cook the jasmine rice according to package directions.',
      'Heat the vegetable oil in a skillet over medium-high heat and cook the ground turkey 7–8 minutes, breaking it up, until browned.',
      'Stir in the chili powder, cumin and salt and cook 1 minute more.',
      'Drain and rinse the black beans and add them with the frozen corn to the skillet; cook 3–4 minutes until heated through.',
      'Shred the cheddar and slice the avocado.',
      'Divide the rice between bowls and top with the turkey mixture, cheddar, avocado and salsa.',
      'Squeeze the lime juice over the top and serve.',
    ],
  }),

  r('pork-tenderloin-brussels', 'Roast Pork Tenderloin with Brussels & Sweet Potato', '🐖', 'dinner', {
    servings: 4, prep: 15, cook: 30, protein: 'pork', appliances: ['oven'], tags: ['american', 'one-pan'],
    ingredients: [
      ['pork-tenderloin', 600], ['brussels-sprouts', 450], ['sweet-potato', 500], ['olive-oil', 45],
      ['dijon', 20], ['honey', 20], ['garlic', 2], ['salt', 4], ['black-pepper', 2],
    ],
    steps: [
      'Heat the oven to 425°F (220°C). Halve the brussels sprouts and cut the sweet potato into 1-inch chunks.',
      'Toss the brussels sprouts and sweet potato with half the olive oil, half the salt and half the black pepper on a sheet pan; roast 10 minutes.',
      'Meanwhile, mince the garlic and whisk with the dijon, honey and remaining olive oil.',
      'Pat the pork tenderloin dry, season with the remaining salt and pepper, and brush with the dijon-honey mixture.',
      'Push the vegetables to one side, add the pork to the sheet pan, and roast 20–25 minutes until the pork reaches 145°F.',
      'Let the pork rest 5 minutes, then slice and serve with the roasted vegetables.',
    ],
  }),

  r('slow-cooker-pulled-pork', 'Slow Cooker Pulled Pork Sandwiches', '🍖', 'dinner', {
    servings: 4, prep: 10, cook: 480, protein: 'pork', appliances: ['slowCooker'], tags: ['american', 'one-pan'],
    ingredients: [
      ['pork-shoulder', 1200], ['bbq-sauce', 300], ['burger-bun', 4], ['cabbage', 0.25], ['mayo', 40],
      ['vinegar', 15], ['brown-sugar', 20], ['paprika', 6], ['salt', 4],
    ],
    steps: [
      'Rub the pork shoulder with the paprika, brown sugar and salt.',
      'Place in the slow cooker and pour half the BBQ sauce over the top.',
      'Cover and cook on low 8 hours until the pork is fork-tender.',
      'Meanwhile, thinly slice the cabbage and toss with the mayo and vinegar to make a quick slaw.',
      'Shred the pork with two forks directly in the slow cooker, discarding excess fat, and stir in the remaining BBQ sauce.',
      'Toast the burger buns and pile on the pulled pork.',
      'Top with the slaw and serve.',
    ],
  }),

  r('sausage-peppers-pasta', 'Sausage & Peppers Pasta', '🍝', 'dinner', {
    servings: 4, prep: 10, cook: 25, protein: 'pork', appliances: ['stovetop'], tags: ['italian'],
    ingredients: [
      ['sausage-italian', 450], ['bell-pepper', 2], ['onion-yellow', 1], ['garlic', 3], ['marinara', 500],
      ['penne', 400], ['parmesan', 40], ['olive-oil', 15], ['salt', 2],
    ],
    steps: [
      'Slice the bell peppers and onion; mince the garlic. Remove the sausage from its casing if needed.',
      'Heat the olive oil in a large skillet over medium heat and crumble in the sausage.',
      'Cook 6–7 minutes, breaking it up, until browned; add the peppers and onion and cook 6 minutes until softened.',
      'Stir in the garlic and cook 30 seconds, then add the marinara and salt and simmer 8 minutes.',
      'Meanwhile, cook the penne according to package directions and drain.',
      'Toss the penne with the sausage and pepper sauce and top with grated parmesan.',
    ],
  }),

  r('salmon-asparagus-rice', 'Pan-Seared Salmon with Asparagus & Rice', '🐟', 'dinner', {
    servings: 4, prep: 10, cook: 20, protein: 'fish', appliances: ['stovetop'], tags: ['american'],
    ingredients: [
      ['salmon', 600], ['asparagus', 400], ['lemon', 1], ['olive-oil', 30], ['garlic', 2],
      ['rice-jasmine', 300], ['salt', 3], ['black-pepper', 1],
    ],
    steps: [
      'Cook the jasmine rice according to package directions.',
      'Trim the asparagus and mince the garlic. Pat the salmon dry and season with half the salt and the black pepper.',
      'Heat half the olive oil in a skillet over medium-high heat and sear the salmon, skin side down, 4 minutes; flip and cook 3 minutes more until it flakes easily.',
      'Remove the salmon and add the remaining olive oil to the pan; cook the asparagus and garlic 5 minutes until crisp-tender, seasoning with the remaining salt.',
      'Squeeze the lemon over the salmon and asparagus.',
      'Serve the salmon and asparagus over the rice.',
    ],
  }),

  r('shrimp-tacos', 'Shrimp Tacos', '🌮', 'dinner', {
    servings: 4, prep: 15, cook: 10, protein: 'shellfish', appliances: ['stovetop'], tags: ['mexican', 'quick'],
    ingredients: [
      ['shrimp', 500], ['tortilla-corn', 12], ['cabbage', 0.5], ['lime', 2], ['cilantro', 0.5],
      ['chili-powder', 6], ['greek-yogurt', 100], ['avocado', 2], ['vegetable-oil', 15], ['salt', 3],
    ],
    steps: [
      'Thinly slice the cabbage and toss with the juice of one lime and half the salt to make the slaw.',
      'Pat the shrimp dry and season with the chili powder and remaining salt.',
      'Heat the vegetable oil in a skillet over medium-high heat and cook the shrimp 2–3 minutes per side until pink and opaque.',
      'Warm the corn tortillas in a dry skillet, about 30 seconds per side.',
      'Slice the avocado.',
      'Fill the tortillas with the shrimp, slaw and avocado, and top with the greek yogurt.',
      'Serve with the remaining lime cut into wedges.',
    ],
  }),

  r('garlic-shrimp-pasta', 'Garlic Butter Shrimp Pasta', '🍤', 'dinner', {
    servings: 4, prep: 10, cook: 15, protein: 'shellfish', appliances: ['stovetop'], tags: ['italian', 'quick'],
    ingredients: [
      ['shrimp', 500], ['spaghetti', 400], ['garlic', 5], ['butter', 45], ['lemon', 1], ['parsley', 0.5],
      ['red-pepper-flakes', 2], ['parmesan', 40], ['olive-oil', 15], ['salt', 3],
    ],
    steps: [
      'Bring a large pot of salted water to a boil and cook the spaghetti according to package directions.',
      'Meanwhile, mince the garlic and chop the parsley. Pat the shrimp dry and season with half the salt.',
      'Heat the olive oil and half the butter in a large skillet over medium-high heat and cook the shrimp 2 minutes per side until pink; remove.',
      'Add the remaining butter, garlic and red pepper flakes to the pan and cook 1 minute until fragrant.',
      'Squeeze in the lemon juice and add the drained spaghetti and remaining salt; toss to coat.',
      'Return the shrimp to the pan and toss with the parsley and grated parmesan.',
      'Serve immediately.',
    ],
  }),

  r('baked-cod-potatoes', 'Baked Cod with Potatoes & Green Beans', '🐟', 'dinner', {
    servings: 4, prep: 10, cook: 30, protein: 'fish', appliances: ['oven'], tags: ['american', 'one-pan'],
    ingredients: [
      ['cod', 600], ['potato-yukon', 600], ['green-beans', 300], ['lemon', 1], ['olive-oil', 45],
      ['garlic', 2], ['paprika', 4], ['salt', 4], ['black-pepper', 1],
    ],
    steps: [
      'Heat the oven to 425°F (220°C). Cut the potatoes into 1-inch chunks and mince the garlic.',
      'Toss the potatoes with half the olive oil, half the salt and the paprika on a sheet pan; roast 15 minutes.',
      'Toss the green beans with a little of the remaining olive oil and push the potatoes to one side.',
      'Pat the cod dry, season with the garlic, remaining salt and black pepper, and drizzle with the remaining olive oil.',
      'Add the cod and green beans to the sheet pan and roast 12–15 minutes until the cod flakes easily and reaches 145°F.',
      'Squeeze the lemon over everything and serve.',
    ],
  }),

  r('salmon-teriyaki-bowls', 'Salmon Teriyaki Bowls', '🍱', 'dinner', {
    servings: 4, prep: 10, cook: 20, protein: 'fish', appliances: ['stovetop'], tags: ['japanese'],
    ingredients: [
      ['salmon', 600], ['soy-sauce', 60], ['maple-syrup', 30], ['ginger', 10], ['garlic', 2], ['cornstarch', 5],
      ['rice-jasmine', 300], ['broccoli', 400], ['sesame-seeds', 10], ['vegetable-oil', 15],
    ],
    steps: [
      'Cook the jasmine rice according to package directions and steam or microwave the broccoli until tender.',
      'Mince the ginger and garlic. Whisk the soy sauce, maple syrup, ginger, garlic and cornstarch with 60 ml water to make the teriyaki sauce.',
      'Cut the salmon into cubes.',
      'Heat the vegetable oil in a skillet over medium-high heat and sear the salmon 4–5 minutes until nearly cooked through.',
      'Pour in the teriyaki sauce and simmer 2–3 minutes, spooning it over the salmon, until glossy and thickened.',
      'Divide the rice and broccoli between bowls, top with the salmon and sauce, and sprinkle with sesame seeds.',
    ],
  }),

  r('naan-margherita-flatbread', 'Margherita Naan Flatbreads', '🍕', 'dinner', {
    servings: 4, prep: 5, cook: 12, protein: 'dairy', appliances: ['oven'], tags: ['italian', 'quick', 'one-pan', 'vegetarian'],
    ingredients: [
      ['naan', 4], ['marinara', 200], ['mozzarella', 200], ['basil', 15], ['olive-oil', 15], ['salt', 1],
    ],
    steps: [
      'Heat the oven to 450°F (230°C). Arrange the naan on a sheet pan.',
      'Spread the marinara evenly over each naan, leaving a small border.',
      'Scatter the mozzarella over the top and drizzle with the olive oil and a pinch of salt.',
      'Bake 10–12 minutes until the cheese is melted and bubbling and the edges are crisp.',
      'Top with fresh basil leaves, slice, and serve.',
    ],
  }),

  r('mushroom-spinach-pasta', 'Creamy Mushroom Spinach Pasta', '🍄', 'dinner', {
    servings: 4, prep: 10, cook: 20, protein: 'dairy', appliances: ['stovetop'], tags: ['italian', 'vegetarian'],
    ingredients: [
      ['penne', 400], ['mushrooms-cremini', 300], ['spinach', 120], ['garlic', 3], ['heavy-cream', 240],
      ['parmesan', 60], ['olive-oil', 20], ['salt', 3], ['black-pepper', 1],
    ],
    steps: [
      'Bring a large pot of salted water to a boil and cook the penne according to package directions.',
      'Meanwhile, slice the mushrooms and mince the garlic.',
      'Heat the olive oil in a large skillet over medium heat and cook the mushrooms 6–7 minutes until browned.',
      'Add the garlic and cook 30 seconds, then stir in the heavy cream, salt and black pepper; simmer 3 minutes.',
      'Add the spinach and cook 1–2 minutes until wilted.',
      'Drain the penne and toss with the sauce and grated parmesan.',
      'Serve immediately.',
    ],
  }),

  r('tj-gnocchi-pesto', 'Cauliflower Gnocchi with Pesto & Tomatoes', '🥟', 'dinner', {
    servings: 2, prep: 5, cook: 12, protein: 'dairy', appliances: ['stovetop'], tags: ['italian', 'quick', 'one-pan', 'vegetarian'],
    ingredients: [
      ['tj-cauliflower-gnocchi', 340], ['pesto', 60], ['tomato-cherry', 150], ['spinach', 60],
      ['olive-oil', 15], ['parmesan', 20],
    ],
    steps: [
      'Halve the cherry tomatoes.',
      'Heat the olive oil in a large skillet over medium-high heat and add the cauliflower gnocchi in a single layer.',
      'Cook 5–6 minutes per side, without stirring too often, until golden and heated through.',
      'Add the cherry tomatoes and spinach and cook 2 minutes until the spinach wilts.',
      'Remove from heat and stir in the pesto to coat.',
      'Top with grated parmesan and serve.',
    ],
  }),

  r('tj-mandarin-chicken-bowls', 'Mandarin Orange Chicken Bowls', '🍊', 'dinner', {
    servings: 4, prep: 5, cook: 20, protein: 'chicken', appliances: ['oven', 'stovetop'], tags: ['chinese-american', 'quick'],
    ingredients: [
      ['tj-mandarin-chicken', 620], ['rice-jasmine', 300], ['broccoli', 400], ['sesame-seeds', 5], ['vegetable-oil', 10],
    ],
    steps: [
      'Heat the oven to 425°F (220°C) and bake the mandarin orange chicken according to package directions, about 18–20 minutes, until crisp and heated through.',
      'Meanwhile, cook the jasmine rice according to package directions.',
      'Heat the vegetable oil in a skillet over medium heat and steam-sauté the broccoli with a splash of water, covered, 5 minutes until tender.',
      'Divide the rice and broccoli between bowls.',
      'Top with the mandarin orange chicken and sprinkle with sesame seeds.',
    ],
  }),

  r('rotisserie-chicken-soup', 'Rotisserie Chicken & Rice Soup', '🍲', 'dinner', {
    servings: 4, prep: 10, cook: 30, protein: 'chicken', appliances: ['stovetop'], tags: ['american', 'one-pan'],
    ingredients: [
      ['rotisserie-chicken', 0.5], ['chicken-broth', 1500], ['carrots', 150], ['celery', 100], ['onion-yellow', 1],
      ['rice-jasmine', 120], ['parsley', 0.5], ['garlic', 2], ['olive-oil', 15], ['salt', 3], ['black-pepper', 1],
    ],
    steps: [
      'Dice the onion, carrots and celery and mince the garlic. Shred the rotisserie chicken, discarding skin and bones.',
      'Heat the olive oil in a large pot over medium heat and cook the onion, carrots and celery 6 minutes until softened.',
      'Add the garlic and cook 30 seconds, then pour in the chicken broth and bring to a boil.',
      'Stir in the jasmine rice, reduce heat, and simmer 15 minutes until the rice is tender.',
      'Add the shredded chicken and simmer 5 minutes more until heated through.',
      'Season with the salt and black pepper and stir in the chopped parsley before serving.',
    ],
  }),

  r('veggie-quesadillas', 'Loaded Veggie Quesadillas', '🧀', 'dinner', {
    servings: 4, prep: 10, cook: 15, protein: 'dairy', appliances: ['stovetop'], tags: ['mexican', 'quick', 'one-pan', 'vegetarian'],
    ingredients: [
      ['tortilla-flour', 4], ['cheddar', 200], ['black-beans', 1], ['bell-pepper', 1], ['spinach', 60],
      ['salsa', 120], ['sour-cream', 80], ['butter', 15], ['cumin', 2],
    ],
    steps: [
      'Dice the bell pepper and shred the cheddar. Drain and rinse the black beans.',
      'Toss the black beans with the cumin.',
      'Melt a little of the butter in a skillet over medium heat and lay one tortilla flat.',
      'Scatter cheddar, black beans, bell pepper and spinach over half the tortilla and fold it over.',
      'Cook 2–3 minutes per side until golden and the cheese has melted; repeat with the remaining tortillas and butter.',
      'Slice into wedges and serve with the salsa and sour cream.',
    ],
  }),

  r('shrimp-rice-noodle-stir-fry', 'Shrimp Rice Noodle Stir-Fry', '🍜', 'dinner', {
    servings: 4, prep: 15, cook: 15, protein: 'shellfish', appliances: ['stovetop'], tags: ['thai'],
    ingredients: [
      ['rice-noodles', 300], ['shrimp', 400], ['eggs', 2], ['garlic', 3], ['scallions', 4], ['carrots', 150],
      ['soy-sauce', 30], ['fish-sauce', 20], ['lime', 2], ['sriracha', 15], ['vegetable-oil', 30], ['sugar', 10],
    ],
    steps: [
      'Soak the rice noodles in hot water according to package directions until pliable; drain.',
      'Mince the garlic, slice the scallions, and julienne the carrots. Whisk the eggs.',
      'Whisk the soy sauce, fish sauce, sriracha and sugar together for the sauce.',
      'Heat half the vegetable oil in a wok or large skillet over high heat and cook the shrimp 2–3 minutes until pink; remove.',
      'Add the remaining vegetable oil, pour in the eggs, and scramble until just set.',
      'Add the garlic, carrots and noodles and stir-fry 2 minutes, then pour in the sauce and toss to coat.',
      'Return the shrimp to the pan along with the scallions and toss 1 minute more.',
      'Squeeze the lime juice over the top and serve.',
    ],
  }),
];
