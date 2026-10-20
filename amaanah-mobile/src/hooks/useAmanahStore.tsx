import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { create } from 'zustand';

import { localStorageAdapter } from '../storage/localStorage';
import type { AmanahActions, AmanahState } from '../types';

const STORAGE_KEY = 'amanah:v1';

const initialState: AmanahState = {
  zakatHistory: [],
  snapshotHistory: [],
  anniversary: '',
  learned: [],
  settings: {
    zakat: true,
    savings: false,
    learning: false,
  },
};

interface AmanahStore {
  readonly state: AmanahState;
  readonly actions: AmanahActions;
  readonly ready: boolean;
  readonly hydrate: () => Promise<void>;
}

type SetAmanahStore = (
  partial: Partial<AmanahStore> | ((store: AmanahStore) => Partial<AmanahStore>),
  replace?: false,
) => void;

function restoreState(value: string): AmanahState {
  const parsed = JSON.parse(value) as Partial<AmanahState>;

  return {
    ...initialState,
    ...parsed,
    settings: {
      ...initialState.settings,
      ...parsed.settings,
    },
  };
}

function persistState(state: AmanahState): void {
  localStorageAdapter.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => undefined);
}

export const useAmanahStore = create<AmanahStore>((set: SetAmanahStore) => ({
  state: initialState,
  ready: false,
  hydrate: async () => {
    try {
      const value = await localStorageAdapter.getItem(STORAGE_KEY);

      set({ state: value ? restoreState(value) : initialState, ready: true });
    } catch {
      set({ ready: true });
    }
  },
  actions: {
    saveZakat: (item: AmanahState['zakatHistory'][number]) =>
      set((store) => {
        const state = { ...store.state, zakatHistory: [item, ...store.state.zakatHistory].slice(0, 12) };
        persistState(state);

        return { state };
      }),
    saveSnapshot: (item: AmanahState['snapshotHistory'][number]) =>
      set((store) => {
        const state = { ...store.state, snapshotHistory: [item, ...store.state.snapshotHistory].slice(0, 12) };
        persistState(state);

        return { state };
      }),
    setAnniversary: (anniversary: string) =>
      set((store) => {
        const state = { ...store.state, anniversary };
        persistState(state);

        return { state };
      }),
    markLearned: (id: string) =>
      set((store) => {
        const learned = store.state.learned.includes(id) ? store.state.learned : [...store.state.learned, id];
        const state = { ...store.state, learned };
        persistState(state);

        return { state };
      }),
    toggleSetting: (key: keyof AmanahState['settings']) =>
      set((store) => {
        const state = {
          ...store.state,
          settings: {
            ...store.state.settings,
            [key]: !store.state.settings[key],
          },
        };
        persistState(state);

        return { state };
      }),
    clear: () =>
      set(() => {
        persistState(initialState);

        return { state: initialState };
      }),
  },
}));

export interface AmanahStoreHydratorProps {
  readonly children: ReactNode;
}

export function AmanahStoreHydrator({ children }: AmanahStoreHydratorProps) {
  const hydrate = useAmanahStore((store: AmanahStore) => store.hydrate);

  useEffect(() => {
    hydrate().catch(() => undefined);
  }, [hydrate]);

  return <>{children}</>;
}
