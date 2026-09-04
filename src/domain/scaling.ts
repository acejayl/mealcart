import type { Recipe, Unit } from './types';

export function scaleFactor(recipe: Recipe, householdSize: number): number {
  return householdSize / recipe.servings;
}

function trim(n: number, digits: number): string {
  return Number(n.toFixed(digits)).toString();
}

function fraction(qty: number): string {
  const whole = Math.floor(qty);
  const rem = qty - whole;
  let frac = '';
  if (rem >= 0.875) return String(whole + 1);
  if (rem >= 0.625) frac = '¾';
  else if (rem >= 0.375) frac = '½';
  else if (rem >= 0.125) frac = '¼';
  // A positive quantity must never read as "0" on a shopping list or recipe - floor at a
  // quarter, the smallest fraction this formatter names.
  if (!frac) return whole === 0 && qty > 0 ? '¼' : String(whole);
  return whole === 0 ? frac : `${whole}${frac}`;
}

export function formatQty(qty: number, unit: Unit): string {
  if (unit === 'each') return fraction(qty);
  if (unit === 'g') {
    if (qty >= 1000) return `${trim(qty / 1000, 1)} kg (~${trim(qty / 453.6, 1)} lb)`;
    if (qty >= 200) return `${Math.round(qty)} g (~${trim(qty / 453.6, 1)} lb)`;
    return `${Math.round(qty)} g (~${Math.max(1, Math.round(qty / 28.35))} oz)`;
  }
  if (qty >= 1000) return `${trim(qty / 1000, 1)} L (~${Math.round(qty / 240)} cups)`;
  if (qty >= 60) return `${Math.round(qty)} ml (~${trim(qty / 240, 1)} cup${qty / 240 > 1.05 ? 's' : ''})`;
  return `${Math.round(qty)} ml (~${Math.max(1, Math.round(qty / 15))} tbsp)`;
}
