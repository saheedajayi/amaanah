import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Card, Divider, Eyebrow, MoneyInput, Muted, PrimaryButton, Stat, Title } from '../components/ui';
import { useAmanahStore } from '../hooks/useAmanahStore';
import { fetchLiveMetalRates } from '../services/metalRates';
import { colors, radius, spacing, type } from '../theme';
import type { NisabStandard, ScreenNavigationProps, ZakatForm, ZakatFormKey, ZakatResult } from '../types';
import { calculateZakat, formatNaira, numberValue } from '../utils/finance';

export interface ZakatScreenProps extends ScreenNavigationProps {}

const initial: ZakatForm = {
  cash: '',
  bank: '',
  goldGrams: '',
  goldPurity: '0.9167',
  silverGrams: '',
  silverPurity: '0.925',
  inventory: '',
  investments: '',
  debt: '',
  goldPrice: '145000',
  silverPrice: '1650',
};

const cashFields: readonly { readonly label: string; readonly key: ZakatFormKey }[] = [
  { label: 'Cash on hand', key: 'cash' },
  { label: 'Bank balances', key: 'bank' },
];

const otherAssetFields: readonly { readonly label: string; readonly key: ZakatFormKey }[] = [
  { label: 'Business inventory value', key: 'inventory' },
  { label: 'Other investments', key: 'investments' },
  { label: 'Eligible short-term debts - subtracted', key: 'debt' },
];

const goldKarats = [
  { label: '24K (999 pure)', purity: '1' },
  { label: '22K', purity: '0.9167' },
  { label: '21K', purity: '0.875' },
  { label: '18K', purity: '0.75' },
  { label: '14K', purity: '0.583' },
] as const;

const silverPurities = [
  { label: 'Fine silver (999)', purity: '0.999' },
  { label: 'Sterling (925)', purity: '0.925' },
  { label: 'Coin silver (900)', purity: '0.9' },
  { label: '800 silver', purity: '0.8' },
] as const;

export function ZakatScreen(_props: ZakatScreenProps) {
  const [form, setForm] = useState<ZakatForm>(initial);
  const [standard, setStandard] = useState<NisabStandard>('gold');
  const [result, setResult] = useState<ZakatResult | null>(null);
  const [saved, setSaved] = useState(false);
  const [ratesLoading, setRatesLoading] = useState(false);
  const [ratesError, setRatesError] = useState('');
  const [ratesUpdatedAt, setRatesUpdatedAt] = useState('');
  const [usdToNgn, setUsdToNgn] = useState<number | null>(null);
  const { state, actions } = useAmanahStore();
  const set = (key: ZakatFormKey) => (value: string) => setForm((current) => ({ ...current, [key]: value }));
  const goldValue = numberValue(form.goldGrams) * numberValue(form.goldPurity) * numberValue(form.goldPrice);
  const silverValue = numberValue(form.silverGrams) * numberValue(form.silverPurity) * numberValue(form.silverPrice);

  const refreshRates = useCallback(async () => {
    setRatesLoading(true);
    setRatesError('');

    try {
      const rates = await fetchLiveMetalRates();

      setForm((current) => ({
        ...current,
        goldPrice: String(Math.round(rates.goldPerGramNgn)),
        silverPrice: String(Math.round(rates.silverPerGramNgn)),
      }));
      setUsdToNgn(rates.usdToNgn);
      setRatesUpdatedAt(rates.updatedAt);
      setResult(null);
    } catch {
      setRatesError('Live rates are unavailable. You can still enter the prices manually below.');
    } finally {
      setRatesLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshRates().catch(() => undefined);
  }, [refreshRates]);

  const calculate = () => {
    setResult(calculateZakat(form, standard));
    setSaved(false);
  };

  return (
    <View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>METHODOLOGY PENDING FORMAL REVIEW</Text>
      </View>
      <Title>Zakat Calculator</Title>
      <Muted>Enter what you hold today. Amanah compares it with the selected Nisab and explains the result.</Muted>
      <Card style={styles.first}>
        {cashFields.map((field) => (
          <MoneyInput key={field.key} label={field.label} value={form[field.key]} onChangeText={set(field.key)} />
        ))}
        <Eyebrow>GOLD HELD</Eyebrow>
        <View style={styles.metalRow}>
          <View style={styles.metalField}>
            <MoneyInput label="Weight (grams)" value={form.goldGrams} onChangeText={set('goldGrams')} inputStyle={styles.metalInput} />
          </View>
          <View style={styles.selectorGroup}>
            <Text style={styles.selectorLabel}>PURITY / KARAT</Text>
            <View style={styles.pickerShell}>
              <Picker
                accessibilityLabel="Gold purity or karat"
                selectedValue={form.goldPurity}
                onValueChange={(value) => set('goldPurity')(String(value))}
                style={styles.picker}
              >
                {goldKarats.map((karat) => (
                  <Picker.Item key={karat.purity} label={karat.label} value={karat.purity} />
                ))}
              </Picker>
            </View>
          </View>
        </View>
        <Muted style={styles.valueNote}>≈ {formatNaira(goldValue)} in pure gold value</Muted>
        <Eyebrow>SILVER HELD</Eyebrow>
        <View style={styles.metalRow}>
          <View style={styles.metalField}>
            <MoneyInput label="Weight (grams)" value={form.silverGrams} onChangeText={set('silverGrams')} inputStyle={styles.metalInput} />
          </View>
          <View style={styles.selectorGroup}>
            <Text style={styles.selectorLabel}>PURITY</Text>
            <View style={styles.pickerShell}>
              <Picker
                accessibilityLabel="Silver purity"
                selectedValue={form.silverPurity}
                onValueChange={(value) => set('silverPurity')(String(value))}
                style={styles.picker}
              >
                {silverPurities.map((purity) => (
                  <Picker.Item key={purity.purity} label={purity.label} value={purity.purity} />
                ))}
              </Picker>
            </View>
          </View>
        </View>
        <Muted style={styles.valueNote}>≈ {formatNaira(silverValue)} in pure silver value</Muted>
        {otherAssetFields.map((field) => (
          <MoneyInput key={field.key} label={field.label} value={form[field.key]} onChangeText={set(field.key)} />
        ))}
        <Divider />
        <View style={styles.rateHeading}>
          <View style={styles.rateHeadingText}>
            <Eyebrow>LIVE REFERENCE PRICES</Eyebrow>
            <Muted>24K gold and fine silver · converted to NGN</Muted>
          </View>
          <Pressable accessibilityRole="button" onPress={refreshRates} disabled={ratesLoading} style={styles.refreshButton}>
            {ratesLoading ? (
              <ActivityIndicator color={colors.emerald} size="small" />
            ) : (
              <Text style={styles.refreshText}>Refresh</Text>
            )}
          </Pressable>
        </View>
        {ratesUpdatedAt ? (
          <Text style={styles.rateStatus}>
            Updated {new Date(ratesUpdatedAt).toLocaleString('en-NG')}
            {usdToNgn ? ` · USD/NGN ${usdToNgn.toLocaleString('en-NG', { maximumFractionDigits: 2 })}` : ''}
          </Text>
        ) : null}
        {ratesError ? <Text style={styles.rateError}>{ratesError}</Text> : null}
        <MoneyInput label="Gold price per gram, 24K" value={form.goldPrice} onChangeText={set('goldPrice')} />
        <MoneyInput label="Silver price per gram, fine" value={form.silverPrice} onChangeText={set('silverPrice')} />
        <Muted>Reference spot prices can differ from local dealer prices. Both fields remain editable.</Muted>
        <Text style={styles.label}>NISAB STANDARD</Text>
        <View style={styles.segment}>
          {(['gold', 'silver'] as const).map((item) => (
            <Pressable
              accessibilityRole="radio"
              accessibilityState={{ checked: standard === item }}
              accessibilityLabel={`${item} Nisab standard`}
              key={item}
              onPress={() => setStandard(item)}
              style={[styles.segmentButton, standard === item && styles.segmentActive]}
            >
              <Text style={[styles.segmentText, standard === item && styles.segmentTextActive]}>
                {item === 'gold' ? 'Gold · 87.48g' : 'Silver · 612.36g'}
              </Text>
            </Pressable>
          ))}
        </View>
        <PrimaryButton label="Calculate Zakat" onPress={calculate} />
      </Card>
      {result && (
        <Card>
          <Eyebrow>RESULT</Eyebrow>
          <Text style={[styles.resultTitle, result.eligible ? styles.due : styles.notDue]}>
            {result.eligible ? 'Above Nisab - Zakat is due' : 'Below Nisab - no Zakat due'}
          </Text>
          <View style={styles.row}>
            <Stat label="Zakatable wealth" value={formatNaira(result.total)} />
            <Stat label="Nisab threshold" value={formatNaira(result.nisab)} />
          </View>
          <Divider />
          <Muted>Zakat due at 2.5%</Muted>
          <Text style={styles.dueAmount}>{formatNaira(result.due)}</Text>
          <Muted>
            {result.eligible ? 'Based on the full zakatable amount entered.' : `Currently ${formatNaira(result.nisab - result.total)} below the selected threshold.`}
          </Muted>
          <PrimaryButton
            variant="gold"
            label={saved ? 'Calculation saved' : 'Save this calculation'}
            onPress={() => {
              actions.saveZakat(result);
              setSaved(true);
            }}
          />
        </Card>
      )}
      <Divider />
      <Title>Anniversary date</Title>
      <Muted>Zakat is generally assessed after a lunar year above Nisab. Confirm your circumstances with a qualified scholar.</Muted>
      <TextInput
        accessibilityLabel="Zakat anniversary date"
        value={state.anniversary}
        onChangeText={actions.setAnniversary}
        placeholder="MM-DD or YYYY-MM-DD"
        placeholderTextColor={colors.muted}
        style={styles.dateInput}
      />
      <Divider />
      <Title>History</Title>
      {state.zakatHistory.length ? (
        state.zakatHistory.map((item: ZakatResult, index: number) => (
          <View key={`${item.date}-${index}`} style={styles.history}>
            <Muted>
              {new Date(item.date).toLocaleDateString('en-NG')} · {item.standard}
            </Muted>
            <Text style={styles.historyValue}>{formatNaira(item.due)} due</Text>
          </View>
        ))
      ) : (
        <Muted>No calculations saved yet.</Muted>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  first: {
    marginTop: spacing.xl,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.goldSoft,
    borderRadius: radius.pill,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  badgeText: {
    color: colors.inkSoft,
    fontSize: 9,
    fontWeight: '800',
  },
  label: {
    color: colors.muted,
    fontSize: type.eyebrow,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  segment: {
    backgroundColor: colors.sand,
    borderRadius: radius.sm,
    flexDirection: 'row',
    padding: 3,
  },
  metalRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  metalField: {
    flex: 1,
  },
  metalInput: {
    height: 56,
    paddingVertical: 0,
  },
  selectorGroup: {
    flex: 1,
    marginTop: spacing.md,
  },
  selectorLabel: {
    color: colors.muted,
    fontSize: type.eyebrow,
    fontWeight: '700',
    letterSpacing: 0.7,
    marginBottom: spacing.sm,
  },
  pickerShell: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.sm,
    borderWidth: 1,
    justifyContent: 'center',
    height: 56,
    overflow: 'hidden',
  },
  picker: {
    color: colors.ink,
    height: 56,
  },
  valueNote: {
    marginBottom: spacing.lg,
    marginTop: spacing.xs,
  },
  rateHeading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rateHeadingText: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  refreshButton: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radius.sm,
    borderWidth: 1,
    minWidth: 76,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  refreshText: {
    color: colors.emerald,
    fontSize: type.small,
    fontWeight: '700',
  },
  rateStatus: {
    color: colors.emerald,
    fontSize: type.eyebrow,
    marginTop: spacing.sm,
  },
  rateError: {
    color: '#A33A2B',
    fontSize: type.small,
    marginTop: spacing.sm,
  },
  segmentButton: {
    flex: 1,
    padding: spacing.sm,
  },
  segmentActive: {
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  segmentText: {
    color: colors.muted,
    fontSize: type.small,
    textAlign: 'center',
  },
  segmentTextActive: {
    color: colors.ink,
    fontWeight: '700',
  },
  resultTitle: {
    fontSize: type.heading,
    fontWeight: '700',
    marginVertical: spacing.md,
  },
  due: {
    color: colors.emerald,
  },
  notDue: {
    color: colors.ink,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  dueAmount: {
    color: colors.emerald,
    fontSize: 30,
    fontWeight: '700',
    marginVertical: spacing.xs,
  },
  dateInput: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radius.sm,
    borderWidth: 1,
    color: colors.ink,
    marginTop: spacing.md,
    padding: spacing.md,
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
    fontSize: type.small,
    fontWeight: '700',
  },
});
