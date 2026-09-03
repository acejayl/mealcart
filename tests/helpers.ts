import type { Preferences } from '../src/domain/types';
import { APPLIANCES } from '../src/domain/types';
import { DEFAULT_STAPLE_IDS } from '../src/data/staples';

export function defaultPrefs(overrides: Partial<Preferences> = {}): Preferences {
  return {
    storeId: 'qfc', weeklyBudget: 150, householdSize: 2, diet: 'none', excludedAllergens: [],
    appliances: [...APPLIANCES], mealsToPlan: ['breakfast', 'lunch', 'dinner'],
    stapleIds: [...DEFAULT_STAPLE_IDS], ...overrides,
  };
}
