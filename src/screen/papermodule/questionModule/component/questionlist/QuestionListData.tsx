
// import React, { memo, useMemo } from 'react';
// import {
//   View,
//   StyleSheet,
//   ActivityIndicator,
// } from 'react-native';
// import { moderateScale } from '../../../../../utils/responsiveSize';
// import { Colors } from '../../../../../theme';
// import MathRenderer from './MathRenderer';

// export type Question = {
//   question_id: string;
//   question_text: string;
//   option_a: string;
//   option_b: string;
//   option_c: string;
//   option_d: string;
//   correct_option: string;
//   explanation: string;
// };

// type Props = {
//   selectCheck: 'Options' | 'Solutions';
//   questionsData: Question[];
//   currentPage: number;
//   limit: number;
//   isLoading: boolean;
// };

// // const cleanLatex = (text: string) => {
// //   if (!text) return '';

// //   return text
// //     // Fix degree symbol
// //     .replace(/{\\,\^o}/g, '^\\circ')
// //     .replace(/\\,\^o/g, '^\\circ')
// //     .replace(/\^o/g, '^\\circ')

// //     // Fix wrong C^{-1} formatting
// //     .replace(/\^\circ\s*{C\^{-1}}/g, '^\\circ C^{-1}')
    
// //     // Fix spacing
// //     .replace(/\\,/g, ' ');
// // };

// //show
// // const cleanLatex = (text: string) => {
// //   if (!text) return '';

// //   return text
// //     // 1. Remove HTML line breaks that break KaTeX parsing
// //     .replace(/<br\s*\/?>/gi, ' ')
    
// //     // 2. Fix the double-escaped spaces the API is sending
// //     .replace(/\\,/g, ' ')
    
   
// //     // 3. Your existing degree fixes
// //     // .replace(/{\\,\^o}/g, '^\\circ')
// //     // .replace(/\\,\^o/g, '^\\circ')
// //     // .replace(/\^o/g, '^\\circ')
// //         .replace(/\\,/g, ' ')
// //     .replace(/{\\?\^o}/g, '^\\circ')
// //     .replace(/\\?\^o/g, '^\\circ')
    
// //     // 4. Ensure \begin{array} is wrapped in display delimiters if not already
// //     .replace(/(\\begin\{array\}.*?\\end\{array\})/gs, (match) => {
// //        return `\\[ ${match} \\]`;
// //     })
    
// // };


// // const cleanLatex = (text: string) => {
// //   if (!text) return '';

// //   return text
// //     // 1. Convert double backslashes to single ones so KaTeX can read them
// //     .replace(/\\\\/g, '\\')
    
// //     // 2. Remove <br> tags specifically INSIDE math delimiters \( ... \) 
// //     // because line breaks inside a LaTeX array environment cause it to fail.
// //     .replace(/\\\((.*?)\\\)/gs, (match) => {
// //       return match.replace(/<br\s*\/?>/gi, ' ');
// //     })

// //     // 3. Fix the "i ^" issue to "\hat{i}" and clean up double spaces (\, \,)
// //     .replace(/\\,\s*\\,/g, ' ')
// //     .replace(/([ijk])\s*\^/gi, '\\hat{$1}')

// //     // 4. Ensure degree symbols are formatted correctly
// //     .replace(/{\\?\^o}/g, '^\\circ')
// //     .trim();
// // };
// const cleanLatex = (text: string) => {
//   if (!text) return '';

//   return text
//     // Remove all HTML tags first (this is the key fix!)
//     .replace(/<[^>]*>/g, ' ')
    
//     // Convert double backslashes to single
//     .replace(/\\\\/g, '\\')
    
//     // Remove extra curly braces that are not part of LaTeX commands
//     .replace(/{(\s*)\\{/g, '\\{')  // Fix { \command to just \command
//     .replace(/}(\s*)}/g, '}')       // Remove double }}
    
//     // Clean up the array - replace *{20}{c} with simple ccc
//     .replace(/\{\*\{20\}\{c\}\}/g, '{ccc}')
    
//     // Remove extra spaces and commas inside math
//     .replace(/\\,\\,/g, ' ')
//     .replace(/\\,/g, ' ')
//     .replace(/\s+/g, ' ')
//     .trim();
// };
//   const QuestionListData: React.FC<Props> = ({
//     selectCheck,
//     questionsData,
//     currentPage,
//     limit,
//     isLoading,
//   }) => {

//     const combinedHTML = useMemo(() => {

//       return questionsData.map((item, index) => {

//         const questionNumber =
//           (currentPage - 1) * limit + index + 1;
//       return `
//     <div class="card">

//       <div>
//         <b>${questionNumber}.</b>
//         ${cleanLatex(item.question_text)}
//       </div>

//       <div class="option">A. ${cleanLatex(item.option_a)}</div>
//       <div class="option">B. ${cleanLatex(item.option_b)}</div>
//       <div class="option">C. ${cleanLatex(item.option_c)}</div>
//       <div class="option">D. ${cleanLatex(item.option_d)}</div>

//       ${
//         selectCheck === 'Solutions'
//           ? `
//             <div class="solution">
//               <b>Solution:</b><br/>
//               ${cleanLatex(item.explanation || '')}<br/><br/>
//               <b>Answer:</b> Option ${item.correct_option || ''}
//             </div>
//           `
//           : ''
//       }

//     </div>
//   `;
//       }).join('');
//     }, [questionsData, selectCheck, currentPage, limit]);

//     if (isLoading) {
//       return (
//         <View style={styles.container}>
//           <ActivityIndicator size="large" color={Colors.primaryColor} />
//         </View>
//       );
//     }

//     return (
//       <View style={styles.container}>
//         <MathRenderer content={combinedHTML} />
//       </View>
//     );
//   };

//   export default memo(QuestionListData);

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#f9fafb',
//       padding: moderateScale(8),
//     },
//   });

import React from 'react';
import { Text, View } from 'react-native';

export type QuestionListDataProps = {
  
  }


const QuestionListData = (props: QuestionListDataProps) => {
  return (
    <View>
      <Text>QuestionListData component</Text>
    </View>
  )
}

export default QuestionListData