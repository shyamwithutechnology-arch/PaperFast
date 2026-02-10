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
  whitelist: ['auth','pdfQuestions'],
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

