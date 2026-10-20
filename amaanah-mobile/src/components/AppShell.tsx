import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { tabs } from '../data/content';
import { colors, spacing, type } from '../theme';
import type { TabKey } from '../types';

export interface AppShellProps {
  readonly activeTab: TabKey;
  readonly onTabChange: (tab: TabKey) => void;
  readonly children: ReactNode;
}

export function AppShell({ activeTab, onTabChange, children }: AppShellProps) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>
            <Text style={styles.star}>✦ </Text>
            Amanah
          </Text>
          <Text style={styles.tag}>HALAL FINANCIAL COMPANION</Text>
        </View>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
      <View style={[styles.tabs, { paddingBottom: spacing.sm + insets.bottom }]}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.key}
            accessibilityRole="tab"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: tab.key === activeTab }}
            onPress={() => onTabChange(tab.key)}
            style={styles.tab}
          >
            <Text style={[styles.icon, tab.key === activeTab && styles.active]}>{tab.icon}</Text>
            <Text style={[styles.tabLabel, tab.key === activeTab && styles.active]}>{tab.label}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.ink,
  },
  header: {
    backgroundColor: colors.ink,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  brand: {
    color: colors.white,
    fontSize: 23,
    fontWeight: '700',
  },
  star: {
    color: colors.gold,
  },
  tag: {
    color: colors.goldSoft,
    fontSize: type.eyebrow,
    letterSpacing: 1.4,
    marginTop: 2,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.parchment,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  tabs: {
    backgroundColor: colors.white,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingTop: spacing.sm,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },
  icon: {
    color: colors.muted,
    fontSize: 20,
  },
  tabLabel: {
    color: colors.muted,
    fontSize: 8,
    fontWeight: '700',
    marginTop: 2,
    textTransform: 'uppercase',
  },
  active: {
    color: colors.emerald,
  },
});
