import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card, Eyebrow, Muted, PrimaryButton, Stat, Title } from '../components/ui';
import { lessons } from '../data/content';
import { useAmanahStore } from '../hooks/useAmanahStore';
import { colors, spacing, type } from '../theme';
import type { ScreenNavigationProps, TabKey } from '../types';
import { formatNaira } from '../utils/finance';

export interface HomeScreenProps extends ScreenNavigationProps {}

interface QuickAction {
  readonly key: TabKey;
  readonly title: string;
  readonly sub: string;
}

function daysUntil(dateString: string): number | null {
  if (!dateString) {
    return null;
  }

  const now = new Date();
  const target = new Date(`${dateString}T12:00:00`);
  target.setFullYear(now.getFullYear());

  if (target < now) {
    target.setFullYear(now.getFullYear() + 1);
  }

  return Math.ceil((target.getTime() - now.getTime()) / 86400000);
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { state } = useAmanahStore();
  const latest = state.snapshotHistory[0];
  const days = daysUntil(state.anniversary);
  const quickActions: readonly QuickAction[] = [
    { key: 'snapshot', title: 'Update Financial Snapshot', sub: 'Income, expenses and savings' },
    {
      key: 'learn',
      title: 'Explore resources',
      sub: `${state.learned.length} of ${lessons.length} lessons read · informational directory`,
    },
  ];

  return (
    <View>
      <Eyebrow>{new Date().toLocaleDateString('en-NG', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase()}</Eyebrow>
      <Text style={styles.hero}>Assalamu alaikum</Text>
      <Muted>Here's where things stand.</Muted>
      <Card dark style={styles.first}>
        <Eyebrow light>CURRENT SAVINGS + MONTHLY SURPLUS</Eyebrow>
        <Text style={styles.heroAmount}>{latest ? formatNaira(latest.available) : '₦0'}</Text>
        <Muted style={styles.light}>{latest ? 'Based on your latest Financial Snapshot.' : 'Add a Financial Snapshot to see this.'}</Muted>
      </Card>
      <Card>
        <Eyebrow>ZAKAT</Eyebrow>
        <Text style={styles.cardTitle}>Next Zakat check-in</Text>
        <Stat
          label={days === null ? 'Set your anniversary date to track this.' : 'Until your approximate anniversary'}
          value={days === null ? '-' : `${days} days`}
        />
        <PrimaryButton label="Open Zakat Calculator" onPress={() => onNavigate('zakat')} />
      </Card>
      <Title>Quick actions</Title>
      {quickActions.map((action) => (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={action.title}
          key={action.key}
          onPress={() => onNavigate(action.key)}
          style={styles.action}
        >
          <View>
            <Text style={styles.actionTitle}>{action.title}</Text>
            <Muted>{action.sub}</Muted>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>
      ))}
      <View style={styles.disclaimer}>
        <Muted>Amanah shows your own numbers and general education. It does not recommend specific investments.</Muted>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    color: colors.ink,
    fontSize: 29,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  first: {
    marginTop: spacing.xl,
  },
  heroAmount: {
    color: colors.white,
    fontSize: 31,
    fontWeight: '700',
    marginVertical: spacing.sm,
  },
  light: {
    color: colors.goldSoft,
  },
  cardTitle: {
    color: colors.ink,
    fontSize: type.heading,
    fontWeight: '700',
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },
  action: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
  },
  actionTitle: {
    color: colors.ink,
    fontSize: type.body,
    fontWeight: '700',
  },
  chevron: {
    color: colors.muted,
    fontSize: 24,
  },
  disclaimer: {
    borderLeftColor: colors.gold,
    borderLeftWidth: 3,
    marginTop: spacing.xl,
    paddingLeft: spacing.md,
  },
});
