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
  selectedMediumId: 'selectedMediumId',
  selectedStandard: 'selectedStandard',
  selectedStandardId: 'selectedStandardId',
  user_exist: 'user_exist',
  mobileNumber: 'mobileNumber',
  userId: 'userId',
  selectedSubId:'selectedSubId',
  selectedSubject:'selectedSubject',
  selectedPaperType:'selectedPaperType',
  boardIdMain :'boardIdMain',
  boardId :'boardId',
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

   // Add clearAll method
  clearAll: (): Promise<void> => {
    return new Promise((resolve) => {
      // Get all keys first
      const keys = appMMKV.getAllKeys();
      // Remove each key
      keys.forEach(key => {
        appMMKV.remove(key);
      });
      resolve();
    });
  },
};