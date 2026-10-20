export type TabKey = 'home' | 'zakat' | 'snapshot' | 'learn' | 'settings';

export interface TabItem {
  readonly key: TabKey;
  readonly label: string;
  readonly icon: string;
}

export interface Lesson {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

export interface Provider {
  readonly name: string;
  readonly meta: string;
  readonly description: string;
  readonly badge: string;
}

export type NisabStandard = 'gold' | 'silver';

export interface ZakatForm {
  readonly cash: string;
  readonly bank: string;
  readonly goldGrams: string;
  readonly goldPurity: string;
  readonly silverGrams: string;
  readonly silverPurity: string;
  readonly inventory: string;
  readonly investments: string;
  readonly debt: string;
  readonly goldPrice: string;
  readonly silverPrice: string;
}

export type ZakatFormKey = keyof ZakatForm;

export interface ZakatResult {
  readonly total: number;
  readonly nisab: number;
  readonly due: number;
  readonly eligible: boolean;
  readonly goldValue: number;
  readonly silverValue: number;
  readonly standard: NisabStandard;
  readonly date: string;
}

export type SnapshotFieldKind = 'income' | 'expense' | 'savings';

export interface SnapshotField {
  readonly id: string;
  readonly label: string;
  readonly kind: SnapshotFieldKind;
  readonly value: string;
}

export interface SnapshotForm {
  readonly fields: readonly SnapshotField[];
}

export interface SnapshotResult {
  readonly income: number;
  readonly savings: number;
  readonly expenses: number;
  readonly monthlySurplus: number;
  readonly available: number;
  readonly date: string;
}

export interface AmanahSettings {
  readonly zakat: boolean;
  readonly savings: boolean;
  readonly learning: boolean;
}

export type AmanahSettingKey = keyof AmanahSettings;

export interface AmanahState {
  readonly zakatHistory: readonly ZakatResult[];
  readonly snapshotHistory: readonly SnapshotResult[];
  readonly anniversary: string;
  readonly learned: readonly string[];
  readonly settings: AmanahSettings;
}

export interface AmanahActions {
  readonly saveZakat: (item: ZakatResult) => void;
  readonly saveSnapshot: (item: SnapshotResult) => void;
  readonly setAnniversary: (anniversary: string) => void;
  readonly markLearned: (id: string) => void;
  readonly toggleSetting: (key: AmanahSettingKey) => void;
  readonly clear: () => void;
}

export interface ScreenNavigationProps {
  readonly onNavigate: (tab: TabKey) => void;
}
