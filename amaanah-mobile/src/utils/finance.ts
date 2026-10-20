import type { NisabStandard, SnapshotForm, SnapshotResult, ZakatForm, ZakatResult } from '../types';

export const NISAB_GRAMS: Readonly<Record<NisabStandard, number>> = {
  gold: 87.48,
  silver: 612.36,
};

export const formatNaira = (value: number): string =>
  `₦${Math.round(Number(value) || 0).toLocaleString('en-NG')}`;

export const numberValue = (value: string | number): number => Math.max(0, Number.parseFloat(String(value)) || 0);

export function calculateZakat(input: ZakatForm, standard: NisabStandard = 'gold'): ZakatResult {
  const goldValue = numberValue(input.goldGrams) * numberValue(input.goldPurity || 0.9167) * numberValue(input.goldPrice);
  const silverValue = numberValue(input.silverGrams) * numberValue(input.silverPurity || 0.925) * numberValue(input.silverPrice);
  const cashAssets = numberValue(input.cash) + numberValue(input.bank) + numberValue(input.inventory) + numberValue(input.investments);
  const gross = cashAssets + goldValue + silverValue;
  const total = Math.max(0, gross - numberValue(input.debt));
  const price = standard === 'gold' ? numberValue(input.goldPrice) : numberValue(input.silverPrice);
  const nisab = NISAB_GRAMS[standard] * price;
  const eligible = total >= nisab;

  return {
    total,
    nisab,
    due: eligible ? total * 0.025 : 0,
    eligible,
    goldValue,
    silverValue,
    standard,
    date: new Date().toISOString(),
  };
}

export function calculateSnapshot(input: SnapshotForm): SnapshotResult {
  const totalFor = (kind: SnapshotForm['fields'][number]['kind']) =>
    input.fields.filter((field) => field.kind === kind).reduce((total, field) => total + numberValue(field.value), 0);
  const income = totalFor('income');
  const savings = totalFor('savings');
  const expenses = totalFor('expense');
  const monthlySurplus = income - expenses;

  return {
    income,
    savings,
    expenses,
    monthlySurplus,
    available: savings + monthlySurplus,
    date: new Date().toISOString(),
  };
}
