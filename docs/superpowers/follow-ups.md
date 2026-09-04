# MealCart follow-ups

Items the per-task and final reviews noted as worth doing later. None block use.

## Behavior
- Settings offers "Keep current plan" for every change; meals that no longer fit are flagged. Consider forcing regeneration on allergen changes specifically.
- `recipeCostPerServing` omits ingredients the current store does not sell, so a flagged card's $/serving reads low.
- Regenerating one slot scores against every slot in the plan, including meal types turned off in Settings (scoring nuance only).
- Costco with the default $150 budget for two always opens over budget; a store-aware default budget would be friendlier than the hint.
- `Plan.overBudgetBy` is stored but the UI derives the banner live; the field could be dropped.

## Catalog data
- Whole Foods/PCC sources are Amazon search pages plus one aisle page rather than product pages; prices are more likely to drift there.
- Trader Joe's is at 21/145 estimated, one entry under the 15% test cap.
- Known price nits: Costco garlic clove count and chicken-thigh pack weight; conventional paprika and rice-jasmine prices; a few packLabels say "oz" where the product is measured in fl oz.
- Roster artifacts: smoked-salmon-bagel lists cook 0 but toasts the bagel; a few recipes warm items with no appliance declared.

## UI polish
- Chip-group headings are bare labels; use fieldset/legend for screen readers.
- Number inputs snap to their floor when cleared.
- The "Not sold at" group uses opacity for dimming; a color token would read better.
- The maskable icon is declared `any maskable`; `maskable` alone is tighter.

## Ideas (not started)
- Kroger's free product API for live QFC / Fred Meyer prices.
- Fridge Chef (type what you have), favorites and pinning, lunch-as-leftovers.
