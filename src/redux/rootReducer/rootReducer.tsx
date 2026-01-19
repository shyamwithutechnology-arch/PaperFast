import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
// future reducers here
// import cartReducer from '../slices/cartSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  // cart: cartReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
