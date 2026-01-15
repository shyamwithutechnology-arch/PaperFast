import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'paperfast-storage',
});

/**
 * Centralized keys
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'AUTH_TOKEN',
  FIRST_LOGIN_DONE: 'FIRST_LOGIN_DONE',

  USER_PROFILE: 'USER_PROFILE',

  SELECTED_BOARD: 'SELECTED_BOARD',
  SELECTED_MEDIUM: 'SELECTED_MEDIUM',
  SELECTED_STANDARD: 'SELECTED_STANDARD',
} as const;

type StorageValue = string | number | boolean | object;

/**
 * SET (auto-detect type)
 */
export const setItem = (key: string, value: StorageValue) => {
  if (typeof value === 'object') {
    storage.set(key, JSON.stringify(value));
  } else {
    storage.set(key, value);
  }
};

/**
 * GET (explicit type)
 */
export const getItem = <T>(
  key: string,
  type: 'string' | 'number' | 'boolean' | 'object'
): T | null => {
  switch (type) {
    case 'string':
      return storage.getString(key) as T | null;

    case 'number':
      return storage.getNumber(key) as T | null;

    case 'boolean':
      return storage.getBoolean(key) as T | null;

    case 'object': {
      const value = storage.getString(key);
      return value ? (JSON.parse(value) as T) : null;
    }

    default:
      return null;
  }
};

/**
 * DELETE
 */
export const removeItem = (key: string) => {
  storage.delete(key);
};
