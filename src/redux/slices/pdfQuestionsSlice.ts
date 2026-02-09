// redux/slices/pdfQuestionsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define your question type
export interface QuestionData {
  question_id: string;
  question_text: string;
  question_type: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  explanation: string;
  board_name: string;
  class_name: string;
  subject_name: string;
  book_title: string | null;
  dlevel_name: string;
  medium_name: string;
  question_marks: number | null;
  question_chapter: string;
  question_practice: string;
  question_subtopic: string | null;
}

// Simple state - just an array of questions
interface PDFQuestionsState {
  questions: QuestionData[];
}

// Initial state - empty array
const initialState: PDFQuestionsState = {
  questions: [],
};

// Create slice with only 2 actions
const pdfQuestionsSlice = createSlice({
  name: 'pdfQuestions',
  initialState,
  reducers: {
    // SET: Replace entire array with new questions
    setPDFQuestions: (state, action: PayloadAction<QuestionData[]>) => {
      state.questions = action.payload;
    },
    
    // CLEAR: Reset to empty array
    clearPDFQuestions: (state) => {
      state.questions = [];
    },
  },
});

// Export ONLY 2 actions
export const { setPDFQuestions, clearPDFQuestions } = pdfQuestionsSlice.actions;

// Export reducer
export default pdfQuestionsSlice.reducer;