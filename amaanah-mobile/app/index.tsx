import type { ComponentType } from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { AppShell } from '../src/components/AppShell';
import { AmanahStoreHydrator } from '../src/hooks/useAmanahStore';
import { HomeScreen } from '../src/screens/HomeScreen';
import { LearnScreen } from '../src/screens/LearnScreen';
import { SettingsScreen } from '../src/screens/SettingsScreen';
import { SnapshotScreen } from '../src/screens/SnapshotScreen';
import { ZakatScreen } from '../src/screens/ZakatScreen';
import type { ScreenNavigationProps, TabKey } from '../src/types';

const screens: Record<TabKey, ComponentType<ScreenNavigationProps>> = {
  home: HomeScreen,
  zakat: ZakatScreen,
  snapshot: SnapshotScreen,
  learn: LearnScreen,
  settings: SettingsScreen,
};

export default function AmanahApp() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const Screen = screens[activeTab];

  return (
    <AmanahStoreHydrator>
      <StatusBar style="light" />
      <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
        <Screen onNavigate={setActiveTab} />
      </AppShell>
    </AmanahStoreHydrator>
  );
}
