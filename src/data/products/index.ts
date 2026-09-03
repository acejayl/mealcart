import type { Product, StoreProfile, StoreProfileId } from '../../domain/types';
import { AISLE_ORDERS } from '../stores';
import { TRADER_JOES_PRODUCTS } from './traderJoes';
import { CONVENTIONAL_PRODUCTS } from './conventional';
import { COSTCO_PRODUCTS } from './costco';
import { NATURAL_PRODUCTS } from './natural';

function profile(id: StoreProfileId, products: Product[]): StoreProfile {
  return { id, aisleOrder: AISLE_ORDERS[id], products: Object.fromEntries(products.map((x) => [x.ingredientId, x])) };
}

export const PROFILES: Record<StoreProfileId, StoreProfile> = {
  traderJoes: profile('traderJoes', TRADER_JOES_PRODUCTS),
  conventional: profile('conventional', CONVENTIONAL_PRODUCTS),
  costco: profile('costco', COSTCO_PRODUCTS),
  natural: profile('natural', NATURAL_PRODUCTS),
};
