import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Card, Divider, Eyebrow, Muted, PrimaryButton, Stat, Title } from '../components/ui';
import { useAmanahStore } from '../hooks/useAmanahStore';
import { colors, radius, spacing, type } from '../theme';
import type { ScreenNavigationProps, SnapshotField, SnapshotFieldKind, SnapshotForm, SnapshotResult } from '../types';
import { calculateSnapshot, formatNaira } from '../utils/finance';

export interface SnapshotScreenProps extends ScreenNavigationProps {}

const defaultFieldDefinitions: readonly Omit<SnapshotField, 'value'>[] = [
  { id: 'income', label: 'Monthly income', kind: 'income' },
  { id: 'housing', label: 'Housing and rent', kind: 'expense' },
  { id: 'food', label: 'Food and groceries', kind: 'expense' },
  { id: 'transport', label: 'Transport', kind: 'expense' },
  { id: 'utilities', label: 'Utilities and bills', kind: 'expense' },
  { id: 'other', label: 'Other expenses', kind: 'expense' },
  { id: 'savings', label: 'Current savings', kind: 'savings' },
];

const createDefaultFields = (): readonly SnapshotField[] =>
  defaultFieldDefinitions.map((field) => ({ ...field, value: '' }));

const kindLabels: Readonly<Record<SnapshotFieldKind, string>> = {
  income: 'Income',
  expense: 'Expense',
  savings: 'Savings',
};

export function SnapshotScreen(_props: SnapshotScreenProps) {
  const [form, setForm] = useState<SnapshotForm>({ fields: createDefaultFields() });
  const [result, setResult] = useState<SnapshotResult | null>(null);
  const [saved, setSaved] = useState(false);
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldKind, setNewFieldKind] = useState<SnapshotFieldKind>('expense');
  const [fieldError, setFieldError] = useState('');
  const { state, actions } = useAmanahStore();

  const updateField = (id: string, value: string) => {
    setForm((current) => ({
      fields: current.fields.map((field) => (field.id === id ? { ...field, value } : field)),
    }));
    setResult(null);
  };

  const removeField = (id: string) => {
    setForm((current) => ({ fields: current.fields.filter((field) => field.id !== id) }));
    setResult(null);
  };

  const addField = () => {
    const label = newFieldLabel.trim();

    if (!label) {
      setFieldError('Enter a name for the new field.');
      return;
    }

    setForm((current) => ({
      fields: [
        ...current.fields,
        { id: `custom-${Date.now()}`, label, kind: newFieldKind, value: '' },
      ],
    }));
    setNewFieldLabel('');
    setFieldError('');
    setResult(null);
  };

  return (
    <View>
      <Title>Financial Snapshot</Title>
      <Muted>A descriptive picture of what is coming in, going out, and currently saved. Amanah will not turn this into a product recommendation.</Muted>
      <Card style={styles.first}>
        <View style={styles.fieldHeading}>
          <Eyebrow>YOUR FIELDS</Eyebrow>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Restore default fields"
            onPress={() => {
              setForm({ fields: createDefaultFields() });
              setResult(null);
            }}
          >
            <Text style={styles.restoreText}>Restore defaults</Text>
          </Pressable>
        </View>
        {form.fields.length ? (
          form.fields.map((field) => (
            <View key={field.id} style={styles.fieldRow}>
              <View style={styles.fieldInputWrap}>
                <View style={styles.fieldLabelRow}>
                  <Text style={styles.fieldLabel}>{field.label}</Text>
                  <Text style={styles.kindBadge}>{kindLabels[field.kind]}</Text>
                </View>
                <TextInput
                  accessibilityLabel={field.label}
                  keyboardType="decimal-pad"
                  value={field.value}
                  onChangeText={(value) => updateField(field.id, value)}
                  placeholder="0"
                  placeholderTextColor={colors.muted}
                  style={styles.moneyInput}
                />
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Remove ${field.label}`}
                onPress={() => removeField(field.id)}
                hitSlop={8}
                style={styles.removeButton}
              >
                <Text style={styles.removeText}>×</Text>
              </Pressable>
            </View>
          ))
        ) : (
          <View style={styles.emptyFields}>
            <Muted>No fields are currently included. Add one below or restore the defaults.</Muted>
          </View>
        )}
        <Divider />
        <Eyebrow>ADD YOUR OWN FIELD</Eyebrow>
        <TextInput
          accessibilityLabel="New financial field name"
          value={newFieldLabel}
          onChangeText={(value) => {
            setNewFieldLabel(value);
            setFieldError('');
          }}
          placeholder="For example: School fees"
          placeholderTextColor={colors.muted}
          style={styles.nameInput}
        />
        <View style={styles.kindSelector}>
          {(['income', 'expense', 'savings'] as const).map((kind) => (
            <Pressable
              key={kind}
              accessibilityRole="radio"
              accessibilityState={{ checked: newFieldKind === kind }}
              onPress={() => setNewFieldKind(kind)}
              style={[styles.kindButton, newFieldKind === kind && styles.kindButtonActive]}
            >
              <Text style={[styles.kindButtonText, newFieldKind === kind && styles.kindButtonTextActive]}>
                {kindLabels[kind]}
              </Text>
            </Pressable>
          ))}
        </View>
        {fieldError ? <Text style={styles.fieldError}>{fieldError}</Text> : null}
        <PrimaryButton variant="ghost" label="Add field" onPress={addField} />
        <PrimaryButton
          label="Calculate snapshot"
          onPress={() => {
            setResult(calculateSnapshot(form));
            setSaved(false);
          }}
        />
      </Card>
      {result && (
        <Card>
          <Eyebrow>CURRENT SAVINGS + MONTHLY SURPLUS</Eyebrow>
          <Text style={styles.amount}>{formatNaira(result.available)}</Text>
          <View style={styles.row}>
            <Stat label="Income" value={formatNaira(result.income)} />
            <Stat label="Expenses" value={formatNaira(result.expenses)} />
          </View>
          <Divider />
          <Muted>
            This includes {formatNaira(result.savings)} in current savings and a monthly {result.monthlySurplus >= 0 ? 'surplus' : 'shortfall'} of{' '}
            {formatNaira(Math.abs(result.monthlySurplus))}. It is not an investment target.
          </Muted>
          <PrimaryButton
            variant="gold"
            label={saved ? 'Snapshot saved' : 'Save to history'}
            onPress={() => {
              actions.saveSnapshot(result);
              setSaved(true);
            }}
          />
        </Card>
      )}
      <Divider />
      <Title>History</Title>
      {state.snapshotHistory.length ? (
        state.snapshotHistory.map((item: SnapshotResult, index: number) => (
          <View key={`${item.date}-${index}`} style={styles.history}>
            <Muted>{new Date(item.date).toLocaleDateString('en-NG')}</Muted>
            <Text style={styles.historyValue}>{formatNaira(item.available)}</Text>
          </View>
        ))
      ) : (
        <Muted>No snapshots saved yet.</Muted>
      )}
      <Card style={styles.guide}>
        <Eyebrow>GENERAL EDUCATION - NOT PERSONALIZED</Eyebrow>
        <Text style={styles.guideTitle}>The 50/30/20 framework</Text>
        <Muted>A common budgeting reference: approximately 50% needs, 30% wants, and 20% savings. It may not suit every income or household.</Muted>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  first: {
    marginTop: spacing.xl,
  },
  fieldHeading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  restoreText: {
    color: colors.emerald,
    fontSize: type.small,
    fontWeight: '700',
  },
  fieldRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  fieldInputWrap: {
    flex: 1,
  },
  fieldLabelRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  fieldLabel: {
    color: colors.muted,
    flexShrink: 1,
    fontSize: type.eyebrow,
    fontWeight: '700',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  kindBadge: {
    backgroundColor: colors.sand,
    borderRadius: radius.pill,
    color: colors.inkSoft,
    fontSize: 8,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    textTransform: 'uppercase',
  },
  moneyInput: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.sm,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  removeButton: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radius.sm,
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    width: 44,
  },
  removeText: {
    color: '#A33A2B',
    fontSize: 26,
    lineHeight: 28,
  },
  emptyFields: {
    backgroundColor: colors.sand,
    borderRadius: radius.sm,
    marginTop: spacing.md,
    padding: spacing.md,
  },
  nameInput: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.sm,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 16,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  kindSelector: {
    backgroundColor: colors.sand,
    borderRadius: radius.sm,
    flexDirection: 'row',
    marginTop: spacing.md,
    padding: 3,
  },
  kindButton: {
    alignItems: 'center',
    flex: 1,
    padding: spacing.sm,
  },
  kindButtonActive: {
    backgroundColor: colors.white,
    borderRadius: radius.sm,
  },
  kindButtonText: {
    color: colors.muted,
    fontSize: type.small,
  },
  kindButtonTextActive: {
    color: colors.ink,
    fontWeight: '700',
  },
  fieldError: {
    color: '#A33A2B',
    fontSize: type.small,
    marginTop: spacing.sm,
  },
  amount: {
    color: colors.emerald,
    fontSize: 30,
    fontWeight: '700',
    marginVertical: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  history: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  historyValue: {
    color: colors.ink,
    fontSize: type.body,
    fontWeight: '700',
  },
  guide: {
    backgroundColor: colors.sand,
    borderWidth: 0,
    marginTop: spacing.xl,
  },
  guideTitle: {
    color: colors.ink,
    fontSize: type.heading,
    fontWeight: '700',
    marginVertical: spacing.sm,
  },
});
