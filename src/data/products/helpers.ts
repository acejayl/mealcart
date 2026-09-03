import type { Product } from '../../domain/types';

// Conversions to canonical units (g or ml).
export const LB = 453.6;
export const OZ = 28.35;
export const FLOZ = 29.57;
export const CUP = 240;
export const QT = 946;
export const GAL = 3785;

/**
 * A real product at this store.
 * packSize is in the ingredient's canonical unit (g, ml, or each).
 * priceSource is the URL where the price was found plus the date checked,
 * e.g. 'https://www.instacart.com/... (2026-09-03)'.
 */
export function p(
  ingredientId: string, name: string, packSize: number, packLabel: string,
  price: number, priceSource: string, opts: { estimated?: boolean } = {},
): Product {
  return { ingredientId, name, packSize, packLabel, price, available: true, priceSource, estimated: opts.estimated ?? false };
}

/** The store does not sell this in a sensible size. Recipes needing it are skipped at this store. */
export function unavailable(ingredientId: string, reason: string): Product {
  return { ingredientId, name: `(not sold here: ${reason})`, packSize: 1, packLabel: '', price: 0, available: false, priceSource: reason, estimated: false };
}
