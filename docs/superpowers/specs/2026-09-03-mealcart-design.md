# MealCart — Design Spec

Date: 2026-09-03
Status: approved in conversation, pending written review

## 1. Purpose

MealCart is a free, self-hosted replacement for the Potto meal-planning app
(pottoapp.com, ~$10/week subscription). It plans a week of meals around a
specific grocery store, a weekly budget, household size, dietary needs, and
owned appliances, then produces a shopping list of real named products at that
store, sorted in the store's aisle order, with a running cost.

The owner will share it with friends. Everyone runs their own copy on their
own phone with no accounts, no server, and no ongoing cost.

## 2. Goals

- Plan breakfast, lunch, and dinner (each toggleable) for 7 days.
- Never exceed the weekly budget silently. Fit the plan under budget or show
  clearly how far over it is and why.
- Never include an excluded allergen. Hard filter, not a preference.
- Shopping list shows actual store products with package size and price, e.g.
  "Kirkland Signature Organic Boneless Chicken Thighs, 6 lb, $24.99 x 1", not
  "chicken thighs, 700 g".
- Work fully offline once installed. Installable on iPhone via
  Safari > Share > Add to Home Screen. Works on Android and desktop too.
- Zero running cost: no API keys, no backend, no images.

## 3. Non-goals (v1)

- Fridge Chef (recipes from what you have).
- Favorites, pinning, and locking meals across regenerations.
- Photo features (Potto's Calorie Snap and Fridge Chef photos).
- Sync between devices or between friends. Each device is independent.
- Splitting one list across multiple stores, or comparing stores side by side.
- Live prices from store APIs. (Kroger has a free API covering QFC and Fred
  Meyer; noted as a v2 candidate.)
- Lunch-as-leftovers planning.
- Food photos. Recipes get an emoji instead.

## 4. Platform and distribution

**Installable web app (PWA).** Static site, no server.

- Built with Vite + React + TypeScript.
- `vite-plugin-pwa` generates the web manifest and a service worker that
  precaches the whole app, including the bundled catalog, so it runs offline.
- Manifest: `display: standalone`, app name "MealCart", themed icon (simple
  SVG-derived PNGs at 192 and 512 px, plus an Apple touch icon).
- Hosted on GitHub Pages from the repo's `main` branch via a GitHub Actions
  workflow. The Vite `base` is set to the repo name. Fallback: drag the `dist/`
  folder onto Netlify Drop.
- Sharing = sending the URL. Installing = Add to Home Screen.

Why not native: distributing a native iOS app to friends requires an Apple
developer account (App Store or TestFlight). Free-account sideloading expires
after 7 days and needs a Mac. Expo Go is a developer tool, not a distribution
channel.

## 5. Architecture

```
src/
  data/
    ingredients.ts      # canonical ingredient definitions
    products/           # one file per store profile: real products + prices
      traderJoes.ts
      conventional.ts   # Safeway / QFC / Fred Meyer
      costco.ts
      natural.ts        # Whole Foods / PCC
    stores.ts           # 7 named stores -> 4 profiles, aisle orders
    recipes/            # recipes grouped by meal type
      breakfast.ts
      lunch.ts
      dinner.ts
    staples.ts          # default staple ingredient ids
  domain/
    types.ts            # all shared types
    eligibility.ts      # recipe filtering (diet, allergens, appliances, store availability)
    shoppingList.ts     # aggregate -> resolve products -> round packages -> price -> sort
    planner.ts          # fill week, variety scoring, budget repair, single-slot regen
    nutrition.ts        # per-day totals
    scaling.ts          # household scaling helpers
  state/
    store.ts            # app state (reducer + context), persistence, migrations
  ui/
    App.tsx             # routing + tab bar
    screens/            # Setup, Plan, Recipe, List, Settings
    components/         # cards, toggles, price editor, etc.
  pwa/                  # manifest config, icons
tests/                  # vitest unit tests mirroring domain/ and a catalog validator
```

Domain logic is pure functions with no React imports, so it is unit-testable
and could later run in a worker or on a server if live prices are added.

## 6. Data model

All quantities use one canonical unit per ingredient: `g`, `ml`, or `each`.

```ts
type Unit = 'g' | 'ml' | 'each';
type Category =
  | 'produce' | 'meat' | 'seafood' | 'dairy' | 'eggs' | 'bakery'
  | 'deli' | 'frozen' | 'pantry' | 'grains' | 'canned' | 'spices'
  | 'condiments' | 'snacks' | 'beverages';
type Allergen =
  | 'dairy' | 'eggs' | 'peanuts' | 'treeNuts' | 'soy' | 'wheat'
  | 'fish' | 'shellfish' | 'sesame';
type Diet = 'none' | 'vegetarian' | 'vegan' | 'pescatarian';
type Appliance =
  | 'stovetop' | 'oven' | 'microwave' | 'airFryer' | 'slowCooker'
  | 'blender' | 'riceCooker';
type MealType = 'breakfast' | 'lunch' | 'dinner';
type StoreProfileId = 'traderJoes' | 'conventional' | 'costco' | 'natural';

interface Ingredient {
  id: string;             // 'chicken-thigh-boneless'
  name: string;           // 'boneless skinless chicken thighs'
  unit: Unit;
  category: Category;
  allergens: Allergen[];
  vegetarian: boolean;
  vegan: boolean;
  isFishOrShellfish: boolean; // for pescatarian
  defaultStaple: boolean;
  nutrition: { kcal: number; proteinG: number; carbsG: number; fatG: number };
                          // per 100 g, per 100 ml, or per 1 each
}

interface Product {
  ingredientId: string;
  name: string;           // 'Kirkland Signature Organic Boneless Skinless Chicken Thighs'
  packSize: number;       // in the ingredient's unit, e.g. 2722 (g) for 6 lb
  packLabel: string;      // '6 lb'
  price: number;          // USD
  available: boolean;     // false => recipes needing this are ineligible at this store
  priceSource: string;    // URL or 'estimated' + date checked
  estimated: boolean;     // true when no online price was found
}

interface StoreProfile {
  id: StoreProfileId;
  aisleOrder: Category[]; // walking order for this store layout
  products: Record<string /* ingredientId */, Product>;
}

interface Store {
  id: string;             // 'qfc'
  name: string;           // 'QFC'
  profile: StoreProfileId;
}

interface RecipeIngredient { ingredientId: string; qty: number; note?: string }

interface Recipe {
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
  tags: string[];         // 'quick', 'one-pan', 'high-protein', cuisine, etc.
  proteinGroup: string;   // 'chicken' | 'beef' | 'pork' | 'fish' | 'shellfish' | 'eggs' | 'tofu' | 'beans' | 'dairy' | 'none'
}
// Recipe nutrition per serving is derived in nutrition.ts by summing each
// ingredient's per-100 (or per-each) values times quantity, divided by
// servings. It is not stored on the recipe.

interface Preferences {
  storeId: string;
  weeklyBudget: number;
  householdSize: number;
  diet: Diet;
  excludedAllergens: Allergen[];
  appliances: Appliance[];
  mealsToPlan: MealType[];
  stapleIds: string[];
}

interface PlanSlot { day: 0|1|2|3|4|5|6; meal: MealType; recipeId: string | null }

interface Plan {
  id: string;
  createdAt: string;      // ISO date
  storeId: string;
  slots: PlanSlot[];
  seed: number;
  overBudgetBy: number;   // 0 when within budget
}

interface ShoppingItem {
  ingredientId: string;
  product: Product;
  neededQty: number;      // canonical units after scaling
  packs: number;          // ceil(neededQty / packSize)
  cost: number;           // packs * effective price
  category: Category;
  checked: boolean;
}

interface AppState {
  schemaVersion: 1;
  prefs: Preferences | null;         // null => show Setup
  plan: Plan | null;
  checked: Record<string, boolean>;  // ingredientId -> checked, reset on new plan
  priceOverrides: Record<StoreProfileId, Record<string, number>>;
  history: string[][];               // recipe ids of the last 3 plans
}
```

Derived, not stored: recipe eligibility, the shopping list, costs, nutrition.

Diet rules:
- `vegetarian`: every ingredient has `vegetarian: true`.
- `vegan`: every ingredient has `vegan: true`.
- `pescatarian`: every ingredient is vegetarian or `isFishOrShellfish`.
- `none`: no restriction.

## 7. Catalog content and price research

Targets:
- Ingredients: ~150-180.
- Recipes: at least 90 (roughly 24 breakfasts, 30 lunches, 36 dinners), with
  enough vegetarian, vegan, gluten-free, and dairy-free coverage that each diet
  can fill a full week at every store.
- Products: one entry per ingredient per store profile (so 4 per ingredient).
  Entries may be `available: false` where a store does not sell a sensible
  size (e.g. Costco and a single bunch of cilantro).

Price research rule: while building each product file, look up the current
price online (store site, fan price-tracking sites, recent Reddit posts,
Instacart listings) and record the URL and date in `priceSource`. If no price
is found, estimate from a comparable item and set `estimated: true`. The UI
shows a small "est." marker next to estimated prices. Prices are Seattle-area,
September 2026.

Product naming uses real house brands: Trader Joe's, Signature Select /
Simple Truth / Kroger / Private Selection, Kirkland Signature, 365 by Whole
Foods Market. Where a recipe leans on a store-specific product (TJ's
Cauliflower Gnocchi, Kirkland rotisserie chicken), that ingredient is simply
unavailable at other profiles so the recipe only appears for that store.

## 8. Planner

Inputs: preferences, store profile, recipe library, history, current plan
(for single-slot regeneration), seed.

**Eligibility** (`eligibility.ts`): a recipe is eligible when all hold:
1. `mealType` matches the slot.
2. Diet rule passes for every ingredient.
3. No ingredient allergen is in `excludedAllergens`.
4. `recipe.appliances` is a subset of `prefs.appliances`.
5. Every non-staple ingredient's product at this store has `available: true`.

**Filling the week** (`planner.ts`):
1. Order slots dinner first (all 7 days), then lunch, then breakfast. Dinners
   are the most expensive and constrain the budget most.
2. For each slot, score every eligible recipe not yet used this week:
   - `+reuse`: for each ingredient already in the cart, a bonus when the
     recipe's need fits in the leftover of a pack already being bought (a
     full bonus if it fits, a small one if it would open another pack). This
     models the real cost driver, avoiding a new pack, rather than a strictly
     proportional fraction.
   - `-recent`: penalty if the recipe appeared in history (stronger for last
     week than three weeks ago).
   - `-sameProtein`: penalty if the same `proteinGroup` is already planned on
     the same day or the adjacent day for the same meal type.
   - `+jitter`: seeded random in [0, 1) so regenerations differ.
   Pick the highest score.
3. Build the shopping list and total it.
4. **Budget repair**: while total > budget, for each slot compute the saving
   from replacing its recipe with the cheapest eligible unused alternative,
   using marginal list cost (total with vs. without, which accounts for pack
   sharing). Apply the single largest saving. Stop when under budget or when no
   swap saves money.
5. If still over budget, return the plan with `overBudgetBy` set. The Plan
   screen shows a clear banner: "Over budget by $X. Raise the budget, plan
   fewer meals, or add more staples." The plan is never silently over.

**Single-slot regeneration**: keep all other slots, choose a new eligible
recipe for the slot, excluding the current one and any already in the week,
preferring candidates that keep the total under budget. If none fits, choose
the cheapest and surface the over-budget banner.

**Regenerate week**: new seed, push the current plan's recipe ids onto
`history` (keep 3), clear `checked`, refill.

Complexity is trivial (at most 100 recipes and 21 slots), so the
marginal-cost loop runs synchronously on the main thread.

## 9. Shopping list

`shoppingList.ts` takes plan + prefs + store profile + price overrides:
1. For each slot, scale each recipe ingredient by `householdSize / servings`.
2. Sum quantities per ingredient across the week.
3. Drop ingredients in `prefs.stapleIds`.
4. Resolve each ingredient to the store's product; `packs = ceil(qty / packSize)`.
5. `cost = packs * (override ?? product.price)`.
6. Group by category and sort groups by the profile's `aisleOrder`; sort items
   alphabetically within a group.

Only slots whose meal type is in `prefs.mealsToPlan` feed the list, so a
plan kept after turning a meal type off is priced for the meals shown. A
non-staple ingredient whose product is unavailable at the current store
(possible after a store change with "Keep current plan") is not priced; it is
collected into a `missing` group that the List screen renders greyed under
"Not sold at {store}" and counts in the header, so the total is never
silently understated.

The List screen shows, per item: product name, pack label, packs to buy,
line cost, checkbox. Header: "In cart $X of $Y" where X is the cost of
checked items and Y is the full list total, plus the budget. Tapping a price
opens an inline editor; saving writes `priceOverrides[profile][ingredientId]`.
Overrides are per profile, so a price fixed at QFC also applies at Safeway
and Fred Meyer.
A toggle reveals hidden staples (greyed, no cost) as a reminder.

## 10. Screens

Bottom tab bar: **Plan**, **List**, **Settings**. Setup wizard replaces the
tabs on first run (or when `prefs` is null).

- **Setup**: five short steps: store; budget + household size; diet +
  allergens; appliances + meals to plan; staples (pre-checked defaults).
  Finishes by generating the first plan.
- **Plan**: header with store, "Shopping total $X / budget $Y", Regenerate
  Week button. Seven day sections labeled Monday through Sunday (day 0 =
  Monday); the plan is not tied to calendar dates. Each meal card: emoji,
  name, total minutes,
  cost per serving, kcal per serving, a regenerate icon. Daily nutrition total
  under each day. Tap a card for Recipe.
- **Recipe**: name, emoji, times, servings scaled to household, ingredients
  with scaled quantities in friendly units (g/ml plus a human hint like
  "about 1 lb"), steps, nutrition per serving, the store product it maps to.
- **List**: as in section 9.
- **Settings**: same fields as Setup in one scrollable form, plus "Reset all
  data". Changing store, diet, allergens, appliances, or meals-to-plan prompts
  to regenerate the plan. Changing budget or household size re-prices without
  regenerating and shows the over-budget banner if applicable.
  "Keep current plan" is always offered (so a user can see what the same week
  would cost at another store), but a kept plan is never presented as if it
  still fit: the Plan screen marks each meal that no longer passes eligibility
  under the new settings and shows a banner counting them, a meal type that
  was turned on but has no slot yet renders a "Not planned yet" card whose
  regenerate button creates and fills the slot, and the List handles
  unavailable ingredients as described in section 9.

Visual direction: mobile-first, one-column, large tap targets, system font
stack, CSS variables for a light theme with a green accent. No photos.

## 11. Persistence

`localStorage` key `mealcart.v1` holding `AppState` as JSON. Written on every
state change (debounced 100 ms). A `schemaVersion` field guards future
migrations. Installed PWAs on iOS are exempt from Safari's 7-day storage
eviction; the browser-tab version is not, which the Settings screen notes.

## 12. Error handling

- Corrupt or unparseable stored state, a wrong `schemaVersion`, or stored
  `prefs`/`plan` whose basic shape is wrong (missing arrays): discard, log to
  console, start at Setup. An error boundary around the app catches any
  render crash and offers "Reset all data" so an installed app can never be
  stuck on a blank screen.
- No eligible recipe for a slot (e.g. vegan + no stovetop + Costco): leave the
  slot's `recipeId` null, show "No recipe fits your filters for this meal" on
  the card, and exclude it from cost. Setup warns when a combination yields
  fewer than 7 eligible recipes for any planned meal type.
- Price override input: numeric, >= 0, two decimals; invalid input is rejected
  inline.

## 13. Testing

Vitest, run with `npm test`.

- `catalog.test.ts`: every recipe ingredient id exists; every ingredient has a
  product in all 4 profiles; nutrition present and positive; no recipe with
  zero ingredients; each diet at each store has at least 7 eligible recipes
  per meal type, assuming all appliances owned and no allergens excluded
  (this is the guard for planning a full week).
- `eligibility.test.ts`: allergen exclusion is absolute; diet rules; appliance
  subset; store availability.
- `shoppingList.test.ts`: scaling, aggregation across recipes, staple removal,
  pack rounding, cost with and without overrides, aisle ordering.
- `planner.test.ts`: no repeated recipe in a week; budget repair reaches under
  budget when possible and reports `overBudgetBy` otherwise; single-slot
  regeneration changes only that slot; same seed gives same plan; history
  penalty reduces repeats across weeks.
- UI: verified by hand in a phone-sized browser viewport; no UI unit tests in
  v1.

## 14. Deployment

- `npm run build` produces `dist/`.
- `.github/workflows/pages.yml` builds on push to `main` and deploys to GitHub
  Pages.
- Repo created with `gh repo create` under the owner's GitHub account.
- README covers: the URL, how to Add to Home Screen on iPhone and Android, how
  to run locally, and how to add a recipe or fix a price in the data files.

## 15. Assumptions

- Prices are typical Seattle-area shelf prices, not sale prices, and will
  drift; the override mechanism is the correction path.
- Household size scales ingredients linearly; no leftover logic.
- One plan at a time; regenerating replaces it.
- App name "MealCart" is a placeholder and trivial to change.
