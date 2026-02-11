// // redux/slices/pdfQuestionsSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// // Define your question type
// export interface QuestionData {
//   question_id: string;
//   question_text: string;
//   question_type: string;
//   option_a: string;
//   option_b: string;
//   option_c: string;
//   option_d: string;
//   correct_option: string;
//   explanation: string;
//   board_name: string;
//   class_name: string;
//   subject_name: string;
//   book_title: string | null;
//   dlevel_name: string;
//   medium_name: string;
//   question_marks: number | null;
//   question_chapter: string;
//   question_practice: string;
//   question_subtopic: string | null;
// }

// // Simple state - just an array of questions
// interface PDFQuestionsState {
//   questions: QuestionData[];
// }

// // Initial state - empty array
// const initialState: PDFQuestionsState = {
//   questions: [],
// };

// // Create slice with only 2 actions
// const pdfQuestionsSlice = createSlice({
//   name: 'pdfQuestions',
//   initialState,
//   reducers: {
//     // SET: Replace entire array with new questions
//   //   setPDFQuestions: (state, action: PayloadAction<QuestionData[]>) => {
//   // state.questions = [...state.questions, ...action.payload ];
//   //   },
// //     setPDFQuestions: (state, action: PayloadAction<QuestionData[]>) => {
// //   state.questions = [{...state?.questions, action.payload}] // Just replace with new array
// // },

// setPDFQuestions: (state, action: PayloadAction<QuestionData[]>) => {
//   const allQuestions = [...state.questions, ...action.payload];
  
//   // Use Map to keep last occurrence (or first if you prefer)
//   const questionMap = new Map();
//   allQuestions.forEach(question => {
//     questionMap.set(question.question_id, question);
//   });
  
//   state.questions = Array.from(questionMap.values());
// },
//     // CLEAR: Reset to empty array
//     clearPDFQuestions: (state) => {
//       state.questions = [];
//     },
//   },
// });

// // Export ONLY 2 actions
// export const { setPDFQuestions, clearPDFQuestions } = pdfQuestionsSlice.actions;

// // Export reducer
// export default pdfQuestionsSlice.reducer;

// redux/slices/pdfQuestionsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface PDFQuestionsState {
  questions: QuestionData[];
}

const initialState: PDFQuestionsState = {
  questions: [],
};

const pdfQuestionsSlice = createSlice({
  name: 'pdfQuestions',
  initialState,
  reducers: {
    // Add new questions (merge and remove duplicates)
    addPDFQuestions: (state, action: PayloadAction<QuestionData[]>) => {
      const allQuestions = [...state.questions, ...action.payload];
      const questionMap = new Map();
      allQuestions.forEach(question => {
        questionMap.set(question.question_id, question);
      });
      state.questions = Array.from(questionMap.values());
    },
    
    // Remove specific questions by ID
    removePDFQuestions: (state, action: PayloadAction<string[]>) => {
      const idsToRemove = new Set(action.payload);
      state.questions = state.questions.filter(
        q => !idsToRemove.has(q.question_id)
      );
    },
    
    // Toggle question selection
    togglePDFQuestion: (state, action: PayloadAction<QuestionData>) => {
      const questionToToggle = action.payload;
      const existingIndex = state.questions.findIndex(
        q => q.question_id === questionToToggle.question_id
      );
      
      if (existingIndex >= 0) {
        // Remove if exists
        state.questions.splice(existingIndex, 1);
      } else {
        // Add if doesn't exist
        state.questions.push(questionToToggle);
      }
    },
    
    // Clear all questions
    clearPDFQuestions: (state) => {
      state.questions = [];
    },
  },
});

export const { 
  addPDFQuestions, 
  removePDFQuestions, 
  togglePDFQuestion, 
  clearPDFQuestions 
} = pdfQuestionsSlice.actions;

export default pdfQuestionsSlice.reducer;
