import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import pdfQuestionsReducer from "../slices/pdfQuestionsSlice";
// future reducers here
// import cartReducer from '../slices/cartSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  pdfQuestions: pdfQuestionsReducer,
  // cart: cartReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
