type StorageLike = {
  readonly getItem: (key: string) => string | null;
  readonly setItem: (key: string, value: string) => void;
};

const memory = new Map<string, string>();

function getWebStorage(): StorageLike | undefined {
  const globalWithStorage = globalThis as typeof globalThis & { readonly localStorage?: StorageLike };

  return globalWithStorage.localStorage;
}

export const localStorageAdapter = {
  async getItem(key: string): Promise<string | null> {
    const storage = getWebStorage();

    if (storage) {
      return storage.getItem(key);
    }

    return memory.get(key) ?? null;
  },
  async setItem(key: string, value: string): Promise<void> {
    const storage = getWebStorage();

    if (storage) {
      storage.setItem(key, value);
      return;
    }

    memory.set(key, value);
  },
};
