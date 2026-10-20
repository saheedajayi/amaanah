import type { ReactNode } from 'react';
import type { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, radius, spacing, type } from '../theme';

export interface CardProps {
  readonly children: ReactNode;
  readonly dark?: boolean;
  readonly style?: StyleProp<ViewStyle>;
}

export function Card({ children, dark = false, style }: CardProps) {
  return <View style={[styles.card, dark && styles.darkCard, style]}>{children}</View>;
}

export interface EyebrowProps {
  readonly children: ReactNode;
  readonly light?: boolean;
}

export function Eyebrow({ children, light = false }: EyebrowProps) {
  return <Text style={[styles.eyebrow, light && styles.lightMuted]}>{children}</Text>;
}

export interface TitleProps {
  readonly children: ReactNode;
}

export function Title({ children }: TitleProps) {
  return <Text style={styles.title}>{children}</Text>;
}

export interface MutedProps {
  readonly children: ReactNode;
  readonly style?: StyleProp<TextStyle>;
}

export function Muted({ children, style }: MutedProps) {
  return <Text style={[styles.muted, style]}>{children}</Text>;
}

export interface DividerProps {}

export function Divider(_props: DividerProps) {
  return <View style={styles.divider} />;
}

export type PrimaryButtonVariant = 'primary' | 'gold' | 'ghost';

export interface PrimaryButtonProps {
  readonly label: string;
  readonly onPress: (event: GestureResponderEvent) => void;
  readonly variant?: PrimaryButtonVariant;
}

export function PrimaryButton({ label, onPress, variant = 'primary' }: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === 'gold' ? styles.goldButton : variant === 'ghost' ? styles.ghostButton : styles.primaryButton,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.buttonText, variant !== 'primary' && styles.darkButtonText]}>{label}</Text>
    </Pressable>
  );
}

export interface MoneyInputProps {
  readonly label: string;
  readonly value: string;
  readonly onChangeText: (text: string) => void;
  readonly placeholder?: string;
  readonly inputStyle?: StyleProp<TextStyle>;
}

export function MoneyInput({ label, value, onChangeText, placeholder = '0', inputStyle }: MoneyInputProps) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        keyboardType="decimal-pad"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        style={[styles.input, inputStyle]}
      />
    </View>
  );
}

export interface StatProps {
  readonly label: string;
  readonly value: string;
  readonly light?: boolean;
}

export function Stat({ label, value, light = false }: StatProps) {
  return (
    <View style={styles.stat}>
      <Muted style={light && styles.lightMuted}>{label}</Muted>
      <Text style={[styles.amount, light && styles.white]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  darkCard: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  eyebrow: {
    color: colors.muted,
    fontSize: type.eyebrow,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  title: {
    color: colors.ink,
    fontSize: type.title,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  muted: {
    color: colors.muted,
    fontSize: type.small,
    lineHeight: 18,
  },
  divider: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    marginVertical: spacing.xl,
  },
  button: {
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.emerald,
  },
  goldButton: {
    backgroundColor: colors.gold,
  },
  ghostButton: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.82,
  },
  buttonText: {
    color: colors.white,
    fontSize: type.body,
    fontWeight: '700',
  },
  darkButtonText: {
    color: colors.ink,
  },
  inputGroup: {
    marginTop: spacing.md,
  },
  label: {
    color: colors.muted,
    fontSize: type.eyebrow,
    fontWeight: '700',
    letterSpacing: 0.7,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.sm,
    color: colors.ink,
    fontSize: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  stat: {
    flex: 1,
  },
  amount: {
    color: colors.ink,
    fontSize: 23,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  white: {
    color: colors.white,
  },
  lightMuted: {
    color: colors.goldSoft,
  },
});
