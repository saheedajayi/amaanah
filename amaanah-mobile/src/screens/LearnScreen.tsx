import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card, Divider, Muted, Title } from '../components/ui';
import { lessons } from '../data/content';
import { useAmanahStore } from '../hooks/useAmanahStore';
import { colors, spacing, type } from '../theme';
import type { ScreenNavigationProps } from '../types';
import { DirectoryScreen } from './DirectoryScreen';

export interface LearnScreenProps extends ScreenNavigationProps {}

export function LearnScreen({ onNavigate }: LearnScreenProps) {
  const [open, setOpen] = useState<string | null>(null);
  const { state, actions } = useAmanahStore();

  return (
    <View>
      <Title>Learn</Title>
      <Muted>Neutral explainers for the Nigerian Muslim context. Production content requires documented compliance and Shariah review.</Muted>
      <Card style={styles.first}>
        {lessons.map((lesson, index) => (
          <View key={lesson.id} style={[styles.lesson, index < lessons.length - 1 && styles.border]}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`${lesson.title} lesson`}
              accessibilityState={{ expanded: open === lesson.id }}
              onPress={() => {
                setOpen(open === lesson.id ? null : lesson.id);
                actions.markLearned(lesson.id);
              }}
              style={styles.head}
            >
              <View style={styles.titleRow}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                {state.learned.includes(lesson.id) && <Text style={styles.read}>READ</Text>}
              </View>
              <Text style={styles.plus}>{open === lesson.id ? '-' : '+'}</Text>
            </Pressable>
            {open === lesson.id && <Muted style={styles.body}>{lesson.body}</Muted>}
          </View>
        ))}
      </Card>
      <Divider />
      <DirectoryScreen onNavigate={onNavigate} />
      <Divider />
      <Title>About Amanah</Title>
      <Muted>
        Amanah is a calculation and education tool. It does not generate personalized investment recommendations. Any future advisory capability is
        contingent on appropriate registration and governance.
      </Muted>
    </View>
  );
}

const styles = StyleSheet.create({
  first: {
    marginTop: spacing.xl,
    paddingVertical: 0,
  },
  lesson: {
    paddingVertical: spacing.md,
  },
  border: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  head: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  lessonTitle: {
    color: colors.ink,
    fontSize: type.heading,
    fontWeight: '700',
  },
  read: {
    color: colors.emerald,
    fontSize: 9,
    fontWeight: '800',
  },
  plus: {
    color: colors.emerald,
    fontSize: 22,
  },
  body: {
    marginTop: spacing.md,
  },
});
