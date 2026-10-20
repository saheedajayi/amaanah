import { StyleSheet, Text, View } from 'react-native';

import { Card, Muted, Title } from '../components/ui';
import { providers } from '../data/content';
import { colors, radius, spacing, type } from '../theme';
import type { ScreenNavigationProps } from '../types';

export interface DirectoryScreenProps extends ScreenNavigationProps {}

export function DirectoryScreen(_props: DirectoryScreenProps) {
  return (
    <View>
      <Title>Provider Guide</Title>
      <Muted>Factual starting points only-not endorsements or matches to your situation. Always verify current registration directly.</Muted>
      {providers.map((provider) => (
        <Card key={provider.name} style={styles.card}>
          <View style={styles.top}>
            <View style={styles.nameWrap}>
              <Text style={styles.name}>{provider.name}</Text>
              <Muted>{provider.meta}</Muted>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{provider.badge}</Text>
            </View>
          </View>
          <Text style={styles.description}>{provider.description}</Text>
        </Card>
      ))}
      <View style={styles.disclaimer}>
        <Muted>This directory does not execute investments or transfer your information. Provider details and licensing status require authoritative verification before production release.</Muted>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: spacing.lg,
  },
  top: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  nameWrap: {
    flex: 1,
  },
  name: {
    color: colors.ink,
    fontSize: type.heading,
    fontWeight: '700',
  },
  badge: {
    backgroundColor: colors.goldSoft,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  badgeText: {
    color: colors.inkSoft,
    fontSize: 8,
    fontWeight: '800',
  },
  description: {
    color: colors.text,
    fontSize: type.body,
    lineHeight: 21,
    marginTop: spacing.md,
  },
  disclaimer: {
    borderLeftColor: colors.gold,
    borderLeftWidth: 3,
    paddingLeft: spacing.md,
  },
});
