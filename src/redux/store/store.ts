// import { configureStore } from '@reduxjs/toolkit';
// import { persistReducer, persistStore } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { combineReducers } from 'redux';

// import authReducer from './slices/authSlice';

// const rootReducer = combineReducers({
//   auth: authReducer,
// });

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   whitelist: ['auth'],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({ serializableCheck: false }),
// });

// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import authReducer from "../slices/authSlice";
// const rootReducer = combineReducers({
//   auth: authReducer,
// });

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


// import { configureStore } from '@reduxjs/toolkit'
// import { persistReducer, persistStore } from 'redux-persist'
// import authReducer from '../slices/authSlice'
// import { reduxStorage } from '../../storage'

// const persistConfig = {
//   key: 'root',
//   storage: reduxStorage,
//   whitelist: ['auth'], // 🔴 VERY IMPORTANT
// }

// const persistedReducer = persistReducer(persistConfig, authReducer)

// export const store = configureStore({
//   reducer: {
//     auth: persistedReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// })
// export const persistor = persistStore(store)

// src/redux/store/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { 
  persistReducer, 
  persistStore, 
  FLUSH, 
  REHYDRATE, 
  PAUSE, 
  PERSIST, 
  PURGE, 
  REGISTER 
} from 'redux-persist'
import authReducer from '../slices/authSlice'
import { reduxStorage } from '../../storage/storage'
import rootReducer from '../rootReducer/rootReducer'


const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)