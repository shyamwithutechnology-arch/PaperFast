import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import pdfQuestionsReducer from "../slices/pdfQuestionsSlice";
import userRoleReducer from '../slices/userRole';
import userSelectedSubReducer from "../slices/selectedSubSlice";
// future reducers here
// import cartReducer from '../slices/cartSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  pdfQuestions: pdfQuestionsReducer,
  userRole:userRoleReducer,
  selectedSubId:userSelectedSubReducer,
  // cart: cartReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
