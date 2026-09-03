import type { Recipe } from '../../domain/types';
import { BREAKFASTS } from './breakfast';
import { LUNCHES } from './lunch';
import { DINNERS } from './dinner';

export const RECIPES: Recipe[] = [...BREAKFASTS, ...LUNCHES, ...DINNERS];
export const RECIPES_BY_ID: Record<string, Recipe> = Object.fromEntries(RECIPES.map((x) => [x.id, x]));
