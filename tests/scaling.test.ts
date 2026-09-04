import { describe, it, expect } from 'vitest';
import { scaleFactor, formatQty } from '../src/domain/scaling';
import { RECIPES_BY_ID } from '../src/data';

describe('scaling', () => {
  it('scales by household / servings', () => {
    expect(scaleFactor(RECIPES_BY_ID['sheet-pan-chicken-potatoes'], 2)).toBe(0.5);
    expect(scaleFactor(RECIPES_BY_ID['pb-banana-toast'], 3)).toBe(3);
  });
  it('formats grams with an imperial hint', () => {
    expect(formatQty(450, 'g')).toBe('450 g (~1 lb)');
    expect(formatQty(30, 'g')).toBe('30 g (~1 oz)');
    expect(formatQty(1500, 'g')).toBe('1.5 kg (~3.3 lb)');
  });
  it('formats millilitres with cups or tablespoons', () => {
    expect(formatQty(240, 'ml')).toBe('240 ml (~1 cup)');
    expect(formatQty(15, 'ml')).toBe('15 ml (~1 tbsp)');
    expect(formatQty(1200, 'ml')).toBe('1.2 L (~5 cups)');
  });
  it('formats each with halves and quarters', () => {
    expect(formatQty(2, 'each')).toBe('2');
    expect(formatQty(0.5, 'each')).toBe('½');
    expect(formatQty(1.5, 'each')).toBe('1½');
    expect(formatQty(0.25, 'each')).toBe('¼');
    expect(formatQty(0.15, 'each')).toBe('¼');
  });
  it('never renders a positive each-quantity as zero', () => {
    // Half of "1 lemon" scaled down for one person still has to be bought.
    expect(formatQty(0.1, 'each')).toBe('¼');
    expect(formatQty(0.01, 'each')).toBe('¼');
    expect(formatQty(0, 'each')).toBe('0');
  });
});
