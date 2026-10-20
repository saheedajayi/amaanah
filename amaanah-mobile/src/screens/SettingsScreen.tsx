import { Alert, StyleSheet, Switch, Text, View } from 'react-native';

import { Card, Divider, Muted, PrimaryButton, Title } from '../components/ui';
import { useAmanahStore } from '../hooks/useAmanahStore';
import { colors, spacing, type } from '../theme';
import type { AmanahSettingKey, ScreenNavigationProps } from '../types';

export interface SettingsScreenProps extends ScreenNavigationProps {}

const items: readonly {
  readonly key: AmanahSettingKey;
  readonly title: string;
  readonly sub: string;
}[] = [
  { key: 'zakat', title: 'Zakat reminders', sub: 'Notify ahead of your anniversary date' },
  { key: 'savings', title: 'Savings check-ins', sub: 'Periodic accountability nudge' },
  { key: 'learning', title: 'Learning nudges', sub: 'Reminders to finish guides' },
];

export function SettingsScreen(_props: SettingsScreenProps) {
  const { state, actions } = useAmanahStore();
  const clear = () =>
    Alert.alert('Clear all Amanah data?', 'Saved calculations, snapshots, learning progress, and settings will be removed from this device.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear data', style: 'destructive', onPress: actions.clear },
    ]);

  return (
    <View>
      <Title>Settings</Title>
      <Card style={styles.first}>
        {items.map((item, index) => (
          <View key={item.key} style={[styles.row, index < items.length - 1 && styles.border]}>
            <View style={styles.copy}>
              <Text style={styles.rowTitle}>{item.title}</Text>
              <Muted>{item.sub}</Muted>
            </View>
            <Switch
              accessibilityLabel={item.title}
              value={state.settings[item.key]}
              onValueChange={() => actions.toggleSetting(item.key)}
              trackColor={{ false: colors.border, true: colors.emeraldSoft }}
              thumbColor={state.settings[item.key] ? colors.emerald : colors.muted}
            />
          </View>
        ))}
      </Card>
      <Divider />
      <Title>Data and privacy</Title>
      <Muted>Your saved information is stored locally on this device in this MVP. It is not encrypted with a separate Amanah account and will not sync across devices.</Muted>
      <PrimaryButton variant="ghost" label="Clear all my data" onPress={clear} />
      <Divider />
      <Title>Important</Title>
      <Muted>Notification preferences are saved, but scheduled device notifications are not yet active. Amanah does not provide investment advice or execute transactions.</Muted>
    </View>
  );
}

const styles = StyleSheet.create({
  first: {
    marginTop: spacing.xl,
    paddingVertical: 0,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
  },
  border: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  copy: {
    flex: 1,
    paddingRight: spacing.md,
  },
  rowTitle: {
    color: colors.ink,
    fontSize: type.body,
    fontWeight: '700',
    marginBottom: 2,
  },
});
