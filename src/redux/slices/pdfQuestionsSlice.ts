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


// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

// interface PDFQuestionsState {
//   questions: QuestionData[];
// }

// const initialState: PDFQuestionsState = {
//   questions: [],
// };

// const pdfQuestionsSlice = createSlice({
//   name: 'pdfQuestions',
//   initialState,
//   reducers: {
//     // Add new questions (merge and remove duplicates)
//     addPDFQuestions: (state, action: PayloadAction<QuestionData[]>) => {
//       const allQuestions = [...state.questions, ...action.payload];
//       const questionMap = new Map();
//       allQuestions.forEach(question => {
//         questionMap.set(question.question_id, question);
//       });
//       state.questions = Array.from(questionMap.values());
//     },

//     // Remove specific questions by ID
//     removePDFQuestions: (state, action: PayloadAction<string[]>) => {
//       const idsToRemove = new Set(action.payload);
//       state.questions = state.questions.filter(
//         q => !idsToRemove.has(q.question_id)
//       );
//     },

//     // Toggle question selection
//     togglePDFQuestion: (state, action: PayloadAction<QuestionData>) => {
//       const questionToToggle = action.payload;
//       const existingIndex = state.questions.findIndex(
//         q => q.question_id === questionToToggle.question_id
//       );

//       if (existingIndex >= 0) {
//         // Remove if exists
//         state.questions.splice(existingIndex, 1);
//       } else {
//         // Add if doesn't exist
//         state.questions.push(questionToToggle);
//       }
//     },

//     // Clear all questions
//     clearPDFQuestions: (state) => {
//       state.questions = [];
//     },
//   },
// });

// export const { 
//   addPDFQuestions, 
//   removePDFQuestions, 
//   togglePDFQuestion, 
//   clearPDFQuestions 
// } = pdfQuestionsSlice.actions;

// export default pdfQuestionsSlice.reducer;


// redux/slices/pdfQuestionsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectedQuestion {
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
  chapterId?: number;
  questionTypeId?: string;
  questionMarks?: string;
  questionNumbers?: number[];
}

export interface ChapterSummary {
  chapterId: number;
  chapterTitle: string;
  questionTypeId: string;
  questionMarks: string;
  label: string;
  selectedQuestions: SelectedQuestion[];
  questionNumbers: number[];
}

export interface PDFQuestionsState {
  chapters: ChapterSummary[];
  allQuestions: SelectedQuestion[];
}

const initialState: PDFQuestionsState = {
  chapters: [],
  allQuestions: [],
};

const pdfQuestionsSlice = createSlice({
  name: 'pdfQuestions',
  initialState,
  reducers: {
    // Add questions to a specific chapter
    // addChapterQuestions: (state, action: PayloadAction<{
    //   chapterId: number;
    //   chapterTitle: string;
    //   questionTypeId: string;
    //   questionMarks: string;
    //   label: string;
    //   questions: SelectedQuestion[];
    //   questionNumbers: number[];
    // }>) => {
    //   const {
    //     chapterId,
    //     chapterTitle,
    //     questionTypeId,
    //     questionMarks,
    //     label,
    //     questions,
    //     questionNumbers
    //   } = action.payload;

    //   // Check if this chapter already exists
    //   const existingChapterIndex = state.chapters.findIndex(
    //     chap => chap.chapterId === chapterId && 
    //             chap.questionTypeId === questionTypeId
    //   );

    //   if (existingChapterIndex >= 0) {
    //     // Update existing chapter
    //     state.chapters[existingChapterIndex] = {
    //       chapterId,
    //       chapterTitle,
    //       questionTypeId,
    //       questionMarks,
    //       label,
    //       selectedQuestions: questions,
    //       questionNumbers
    //     };
    //   } else {
    //     // Add new chapter
    //     state.chapters.push({
    //       chapterId,
    //       chapterTitle,
    //       questionTypeId,
    //       questionMarks,
    //       label,
    //       selectedQuestions: questions,
    //       questionNumbers
    //     });
    //   }

    //   // Update allQuestions array
    //   const existingQuestionIds = new Set(state.allQuestions.map(q => q.question_id));
    //   const newQuestions = questions.filter(q => !existingQuestionIds.has(q.question_id));
    //   state.allQuestions.push(...newQuestions);
    // },
    addChapterQuestions: (state, action: PayloadAction<{
      chapterId: number;
      chapterTitle: string;
      questionTypeId: string;
      questionMarks: string;
      label: string;
      questions: SelectedQuestion[];
      questionNumbers: number[];
    }>) => {
      const {
        chapterId,
        chapterTitle,
        questionTypeId,
        questionMarks,
        label,
        questions,
        questionNumbers
      } = action.payload;

      // Check if this chapter already exists
      const existingChapterIndex = state.chapters.findIndex(
        chap => chap.chapterId === chapterId &&
          chap.questionTypeId === questionTypeId
      );

      if (existingChapterIndex >= 0) {
        // Merge with existing chapter - DON'T REPLACE
        const existingChapter = state.chapters[existingChapterIndex];

        // Create a map of existing questions for quick lookup
        const existingQuestionMap = new Map();
        existingChapter.selectedQuestions.forEach(q => {
          existingQuestionMap.set(q.question_id, q);
        });

        // Create a Set of existing question numbers
        const existingQuestionNumbers = new Set(existingChapter.questionNumbers);

        // Add new questions (avoid duplicates)
        questions.forEach(newQuestion => {
          if (!existingQuestionMap.has(newQuestion.question_id)) {
            existingChapter.selectedQuestions.push(newQuestion);
            existingQuestionMap.set(newQuestion.question_id, newQuestion);
          }
        });

        // Add new question numbers (avoid duplicates)
        questionNumbers.forEach(num => {
          if (!existingQuestionNumbers.has(num)) {
            existingQuestionNumbers.add(num);
          }
        });

        // Convert Set back to array
        existingChapter.questionNumbers = Array.from(existingQuestionNumbers);

        // Update the chapter title and other info if needed
        existingChapter.chapterTitle = chapterTitle;
        existingChapter.questionMarks = questionMarks;
        existingChapter.label = label;

      } else {
        // Add new chapter
        state.chapters.push({
          chapterId,
          chapterTitle,
          questionTypeId,
          questionMarks,
          label,
          selectedQuestions: questions,
          questionNumbers
        });
      }

      // Update allQuestions array
      const existingQuestionIds = new Set(state.allQuestions.map(q => q.question_id));
      const newQuestions = questions.filter(q => !existingQuestionIds.has(q.question_id));
      state.allQuestions.push(...newQuestions);
    },

    // Remove questions from a chapter
    removeChapterQuestions: (state, action: PayloadAction<{
      chapterId: number;
      questionTypeId: string;
      questionIds: string[];
    }>) => {
      const { chapterId, questionTypeId, questionIds } = action.payload;

      // Find the chapter
      const chapterIndex = state.chapters.findIndex(
        chap => chap.chapterId === chapterId &&
          chap.questionTypeId === questionTypeId
      );

      if (chapterIndex >= 0) {
        // Filter out the removed questions
        state.chapters[chapterIndex].selectedQuestions =
          state.chapters[chapterIndex].selectedQuestions.filter(
            q => !questionIds.includes(q.question_id)
          );

        // Update question numbers
        state.chapters[chapterIndex].questionNumbers =
          state.chapters[chapterIndex].questionNumbers.filter(
            num => {
              // This logic might need adjustment based on how question numbers are mapped
              return true; // You'll need to implement proper number filtering
            }
          );

        // Remove from allQuestions
        state.allQuestions = state.allQuestions.filter(
          q => !questionIds.includes(q.question_id)
        );

        // If chapter has no more questions, remove it
        if (state.chapters[chapterIndex].selectedQuestions.length === 0) {
          state.chapters.splice(chapterIndex, 1);
        }
      }
    },

    // Clear all questions
    clearPDFQuestions: (state) => {
      state.chapters = [];
      state.allQuestions = [];
    },

    // Add individual question (for backwards compatibility)
    addPDFQuestions: (state, action: PayloadAction<SelectedQuestion[]>) => {
      const newQuestions = action.payload.filter(
        newQ => !state.allQuestions.some(existing => existing.question_id === newQ.question_id)
      );
      state.allQuestions.push(...newQuestions);
    },

    // Remove individual question
    // Remove individual question
   // In your pdfQuestionsSlice.ts
removePDFQuestions: (state, action: PayloadAction<string[]>) => {
  const questionIds = action.payload;
  
  // Remove from allQuestions
  state.allQuestions = state.allQuestions.filter(
    q => !questionIds.includes(q.question_id)
  );
  
  // Also remove from chapters - IMPORTANT FIX
  state.chapters = state.chapters.map(chapter => {
    // Filter out removed questions
    const filteredQuestions = chapter.selectedQuestions.filter(
      q => !questionIds.includes(q.question_id)
    );
    
    // Get question numbers for remaining questions
    // This assumes questionNumbers are stored in order
    // If you have a better way to map numbers to questions, use that
    const filteredQuestionNumbers = chapter.questionNumbers.filter((num, index) => {
      // Simple approach: keep numbers if question exists at that index
      if (index < chapter.selectedQuestions.length) {
        const question = chapter.selectedQuestions[index];
        return !questionIds.includes(question.question_id);
      }
      return true;
    });
    
    return {
      ...chapter,
      selectedQuestions: filteredQuestions,
      questionNumbers: filteredQuestionNumbers
    };
  }).filter(chapter => chapter.selectedQuestions.length > 0);
},
  },
});

export const {
  addChapterQuestions,
  removeChapterQuestions,
  clearPDFQuestions,
  addPDFQuestions,
  removePDFQuestions,
} = pdfQuestionsSlice.actions;

export default pdfQuestionsSlice.reducer;