import { createMMKV } from 'react-native-mmkv';

export const reduxMMKV = createMMKV({
  id: 'redux-persist-storage',
});

// 🔥 Async wrapper to make MMKV compatible with redux-persist in New Architecture
export const reduxStorage = {
  setItem: (key: string, value: string): Promise<void> => {
    return new Promise((resolve) => {
      reduxMMKV.set(key, value);
      resolve();
    });
  },

  getItem: (key: string): Promise<string | null> => {
    return new Promise((resolve) => {
      const value = reduxMMKV.getString(key);
      resolve(value ?? null);
    });
  },

  removeItem: (key: string): Promise<void> => {
    return new Promise((resolve) => {
      reduxMMKV.remove(key);
      resolve();
    });
  },
};

/* ===============================
   App Local Storage (Manual use)
================================== */
export const appMMKV = createMMKV({
  id: 'app-local-storage',
});

export const storageKeys = {
  selectedBoard: 'selectedBoard',
  selectedMedium: 'selectedMedium',
  selectedStandard: 'selectedStandard',
};
export const localStorage = {
  setItem: (key: string, value: string): Promise<void> => {
    return new Promise((resolve) => {
      appMMKV.set(key, value);
      resolve();
    });
  },

  getItem: (key: string): Promise<string | null> => {
    return new Promise((resolve) => {
      const value = appMMKV.getString(key);
      resolve(value ?? null);
    });
  },

  removeItem: (key: string): Promise<void> => {
    return new Promise((resolve) => {
      appMMKV.remove(key);
      resolve();
    });
  },
};























// import { MMKV } from 'react-native-mmkv';

// export const storage = new MMKV({
//   id: 'paperfast-storage',
// });

// /**
//  * Centralized keys
//  */
// export const STORAGE_KEYS = {
//   AUTH_TOKEN: 'AUTH_TOKEN',
//   FIRST_LOGIN_DONE: 'FIRST_LOGIN_DONE',

//   USER_PROFILE: 'USER_PROFILE',

//   SELECTED_BOARD: 'SELECTED_BOARD',
//   SELECTED_MEDIUM: 'SELECTED_MEDIUM',
//   SELECTED_STANDARD: 'SELECTED_STANDARD',
// } as const;

// type StorageValue = string | number | boolean | object;

// /**
//  * SET (auto-detect type)
//  */
// export const setItem = (key: string, value: StorageValue) => {
//   if (typeof value === 'object') {
//     storage.set(key, JSON.stringify(value));
//   } else {
//     storage.set(key, value);
//   }
// };

// /**
//  * GET (explicit type)
//  */
// export const getItem = <T>(
//   key: string,
//   type: 'string' | 'number' | 'boolean' | 'object'
// ): T | null => {
//   switch (type) {
//     case 'string':
//       return storage.getString(key) as T | null;

//     case 'number':
//       return storage.getNumber(key) as T | null;

//     case 'boolean':
//       return storage.getBoolean(key) as T | null;

//     case 'object': {
//       const value = storage.getString(key);
//       return value ? (JSON.parse(value) as T) : null;
//     }

//     default:
//       return null;
//   }
// };

// /**
//  * DELETE
//  */
// export const removeItem = (key: string) => {
//   storage.delete(key);
// };
