# MealCart

A free, offline meal planner that builds a week of breakfasts, lunches and dinners
around one grocery store, a weekly budget, household size, diet, allergens and the
appliances you own, then gives you a shopping list of real store products in aisle order.

**Live app:** https://acejayl.github.io/mealcart/

## Install on your phone

- **iPhone:** open the link in Safari → tap Share → *Add to Home Screen*. Launch it
  from the icon; it works offline and Safari will not clear its data.
- **Android:** open the link in Chrome → menu → *Install app* (or *Add to Home screen*).

Everything is stored on your device. Nothing is sent anywhere.

## Stores

Trader Joe's, Safeway, QFC, Fred Meyer, Costco, Whole Foods, PCC. Prices are typical
Seattle-area shelf prices researched in September 2026 and will drift; tap any price on
the shopping list to correct it and your correction sticks for that store.

## Run locally

    npm install
    npm run dev        # http://localhost:5173/mealcart/
    npm test
    npm run build      # static site in dist/

## Add a recipe or fix a price

- Recipes: `src/data/recipes/{breakfast,lunch,dinner}.ts` using the `r()` helper.
  Ingredient ids come from `src/data/ingredients.ts`.
- Prices and products: `src/data/products/<store>.ts`. Each entry records where the
  price came from.
- `npm test` validates the catalog (ids, coverage per diet and allergen, product
  completeness) before you ship.
