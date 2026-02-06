
// const buildPDFHtml = (
//   questions: Question[],
//   mode: 'Options' | 'Solutions'
// ) => {
//   return `
// <!DOCTYPE html>
// <html>
// <head>
// <meta charset="utf-8" />

// <script src="https://cdn.jsdelivr.net/npm/mathjax@2/MathJax.js?config=TeX-AMS_HTML"></script>

// <style>
//   body {
//     font-family: Arial;
//     font-size: 12px;
//     line-height: 18px;
//   }
//   .question {
//     margin-bottom: 20px;
//     page-break-inside: avoid;
//   }
//   .option { margin-left: 16px; }
//   img {
//     max-width: 100%;
//     height: auto;
//   }
//   .solution {
//     background: #f3f6ff;
//     padding: 8px;
//     margin-top: 8px;
//   }
// </style>
// </head>

// <body>
// ${questions.map((q, i) => `
//   <div class="question">
//     <b>Q${i + 1}.</b> ${q.question_text}

//     <div class="option">A. ${q.option_a}</div>
//     <div class="option">B. ${q.option_b}</div>
//     <div class="option">C. ${q.option_c}</div>
//     <div class="option">D. ${q.option_d}</div>

//     ${mode === 'Solutions' ? `
//       <div class="solution">
//         <b>Answer:</b> ${q.correct_option}<br/>
//         ${q.explanation}
//       </div>
//     ` : ''}
//   </div>
// `).join('')}
// </body>
// </html>
// `;
// };


// import { Alert } from 'react-native';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import { Question } from '../studentModule/component/questionlist/QuestionListComponent';
