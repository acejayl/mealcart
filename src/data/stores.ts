import type { Category, Store, StoreProfileId } from '../domain/types';

export const STORES: Store[] = [
  { id: 'trader-joes', name: "Trader Joe's", profile: 'traderJoes' },
  { id: 'safeway', name: 'Safeway', profile: 'conventional' },
  { id: 'qfc', name: 'QFC', profile: 'conventional' },
  { id: 'fred-meyer', name: 'Fred Meyer', profile: 'conventional' },
  { id: 'costco', name: 'Costco', profile: 'costco' },
  { id: 'whole-foods', name: 'Whole Foods', profile: 'natural' },
  { id: 'pcc', name: 'PCC', profile: 'natural' },
];

export const STORES_BY_ID: Record<string, Store> = Object.fromEntries(STORES.map((s) => [s.id, s]));

/** Walking order through each store layout. Every category must appear exactly once. */
export const AISLE_ORDERS: Record<StoreProfileId, Category[]> = {
  traderJoes: ['produce', 'bakery', 'deli', 'meat', 'seafood', 'dairy', 'eggs', 'frozen',
    'canned', 'pantry', 'grains', 'condiments', 'spices', 'snacks', 'beverages'],
  conventional: ['produce', 'deli', 'bakery', 'meat', 'seafood', 'canned', 'pantry', 'grains',
    'condiments', 'spices', 'snacks', 'beverages', 'dairy', 'eggs', 'frozen'],
  costco: ['bakery', 'deli', 'meat', 'seafood', 'dairy', 'eggs', 'produce', 'frozen', 'pantry',
    'grains', 'canned', 'condiments', 'spices', 'snacks', 'beverages'],
  natural: ['produce', 'bakery', 'deli', 'meat', 'seafood', 'dairy', 'eggs', 'grains', 'pantry',
    'canned', 'condiments', 'spices', 'snacks', 'frozen', 'beverages'],
};
