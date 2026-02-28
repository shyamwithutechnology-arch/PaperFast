
// perfect this is code 
//   import React, { memo, useCallback, useMemo, useState } from 'react';
//   import {
//     View,
//     StyleSheet,
//     ActivityIndicator,
//   } from 'react-native';
//   import { moderateScale } from '../../../../../utils/responsiveSize';
//   import { Colors } from '../../../../../theme';
//   import MathRenderer from './MathRenderer';

//   export type Question = {
//     question_id: string;
//     question_text: string;
//     option_a: string;
//     option_b: string;
//     option_c: string;
//     option_d: string;
//     correct_option: string;
//     explanation: string;
//   };

//   type Props = {
//     selectCheck: 'Options' | 'Solutions';
//     questionsData: Question[];
//     currentPage: number;
//     limit: number;
//     isLoading: boolean;
//   };

// const cleanLatex = (text: string) => {
//   if (!text) return '';

//   // 1. Decode basic HTML entities
//   let cleaned = text
//     .replace(/&lt;/g, '<')
//     .replace(/&gt;/g, '>')
//     .replace(/&amp;/g, '&');

//   // 2. DYNAMIC FIX: Remove <br> and newlines INSIDE LaTeX delimiters
//   // This handles \(...\), \[...\], and $$...$$
//   cleaned = cleaned.replace(/(\\\(.*?\\\)|\\\[.*?\\\]|\$\$.*?\$\$)/gs, (match) => {
//     return match
//       .replace(/<br\s*\/?>/gi, ' ') // Remove <br>
//       .replace(/[\n\r]/g, ' ')      // Remove newlines
//       .replace(/\{ /g, '{')        // Fix accidental spaces in LaTeX commands
//       .replace(/ \}/g, '}');
//   });

//   // 3. Fix Physics Dimension Corruptions (Your specific requirement)
//   cleaned = cleaned
//     .replace(/\\left\\llcorner\^0/g, '[M^0 L^0 T^0]')
//     .replace(/\\left\\llcorner/g, '[')
//     .replace(/\\llcorner/g, 'L')
//     .replace(/\\mathrm\{~\}/g, ' ')
//     .replace(/\\right\./g, ''); // Fixes the trailing dots in your screenshots

//   // 4. Standardize double backslashes for array rows
//   // KaTeX needs exactly \\ or \\ followed by a space to recognize a new row
//   cleaned = cleaned.replace(/\\\\/g, '\\\\ ');

//   return cleaned.trim();
// };
// const QuestionListData: React.FC<Props> = ({
//   selectCheck,
//   questionsData,
//   currentPage,
//   limit,
//   isLoading,
// }) => {

// // State to manage multiple selections
//   const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

//   const toggleSelection = useCallback((id: string) => {
//     setSelectedIds((prev) => {
//       const next = new Set(prev);
//       if (next.has(id)) {
//         next.delete(id);
//       } else {
//         next.add(id);
//       }
//       return next;
//     });
//   }, []);

//   const renderShimmerItem = () => (
//   <View style={styles.shimmerCard}>
//     <View style={styles.shimmerRow}>
//       {/* Checkbox placeholder */}
//       <View style={styles.shimmerCheckbox} /> 
//       <View style={styles.shimmerContent}>
//         <View style={styles.shimmerQuestionText} />
//         <View style={styles.shimmerQuestionTextShort} />
//       </View>
//     </View>

//     <View style={styles.shimmerOptionsGrid}>
//       {[1, 2, 3, 4].map((_, index) => (
//         <View key={`shm-${index}`} style={styles.shimmerOptionContainer}>
//           <View style={styles.shimmerOptionText} />
//         </View>
//       ))}
//     </View>

//     {/* <View style={styles.shimmerFooter}>
//       <View style={styles.shimmerBadge} />
//       <View style={styles.shimmerLevel} />
//     </View> */}
//   </View>
// );
//   const combinedHTML = useMemo(() => {
//     return questionsData.map((item, index) => {
//       const questionNumber = (currentPage - 1) * limit + index + 1;

//       // We no longer need the if(item.question_id === "822") block!
//       const qText = cleanLatex(item.question_text);
//       const optA = cleanLatex(item.option_a);
//       const optB = cleanLatex(item.option_b);
//       const optC = cleanLatex(item.option_c);
//       const optD = cleanLatex(item.option_d);
//       const explanation = cleanLatex(item.explanation || '');
//       return `
//   <div class="card">
//     <div class="question">
//       <strong>${questionNumber}.</strong> ${qText}
//     </div>

//     <div class="options">
//       <div class="option"><strong>A.</strong> ${optA}</div>
//       <div class="option"><strong>B.</strong> ${optB}</div>
//       <div class="option"><strong>C.</strong> ${optC}</div>
//       <div class="option"><strong>D.</strong> ${optD}</div>
//     </div>

//     ${selectCheck === 'Solutions' ? `
//       <div class="solution">
//         <div class="solution-header"><strong>Solution:</strong></div>
//         <div class="solution-content">${explanation}</div>
//         <div class="answer">
//           <strong>Answer:</strong> Option ${item.correct_option || ''}
//         </div>
//       </div>
//     ` : ''}
//   </div>
// `;
//     }).join('');
//   }, [questionsData, selectCheck, currentPage, limit]);

//   // --- REPLACE YOUR LOADER WITH THIS ---
//   if (isLoading) {
//     return (
//       <View style={styles.container}>
//         {[1, 2, 3, 4].map((i) => (
//           <React.Fragment key={i}>
//             {renderShimmerItem()}
//           </React.Fragment>
//         ))}
//       </View>
//     );
//   }
//   return (
//     <View style={styles.container}>
//       <MathRenderer content={combinedHTML} />
//     </View>
//   );
// };

// export default memo(QuestionListData);
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9fafb',
//   },
//   shimmerCard: {
//     backgroundColor: '#ffffff',
//     padding: moderateScale(16),
//     // CHANGE: Removed borderBottomWidth and borderBottomColor to hide green line
//     marginBottom: moderateScale(8), // Creates space between cards while loading
//     elevation: 1, 
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//   },
//   shimmerRow: {
//     flexDirection: 'row',
//     marginBottom: moderateScale(12),
//   },
//   shimmerCheckbox: {
//     width: moderateScale(20),
//     height: moderateScale(20),
//     backgroundColor: '#e8e8e8',
//     borderRadius: moderateScale(4),
//     marginRight: moderateScale(12),
//   },
//   shimmerContent: {
//     flex: 1,
//   },
//   shimmerQuestionText: {
//     height: moderateScale(18),
//     backgroundColor: '#e8e8e8',
//     borderRadius: moderateScale(4),
//     width: '95%',
//     marginBottom: moderateScale(8),
//   },
//   shimmerQuestionTextShort: {
//     height: moderateScale(18),
//     backgroundColor: '#e8e8e8',
//     borderRadius: moderateScale(4),
//     width: '60%',
//   },
//   shimmerOptionsGrid: {
//     marginLeft: moderateScale(32), // Aligns options under the question text
//     // marginBottom: moderateScale(16),
//   },
//   shimmerOptionContainer: {
//     marginBottom: moderateScale(10),
//   },
//   shimmerOptionText: {
//     height: moderateScale(14),
//     backgroundColor: '#e8e8e8',
//     borderRadius: moderateScale(4),
//     width: '40%',
//   },
//   shimmerFooter: {
//     marginLeft: moderateScale(32),
//   },
//   shimmerBadge: {
//     height: moderateScale(18),
//     width: moderateScale(120),
//     backgroundColor: '#eff6ff', 
//     borderRadius: moderateScale(4),
//     marginBottom: moderateScale(8),
//   },
//   shimmerLevel: {
//     height: moderateScale(10),
//     width: moderateScale(80),
//     backgroundColor: '#e8e8e8',
//     borderRadius: moderateScale(2),
//   },
// });

// hard code problem solve 

// ////////////////////////////////////////////////////////////////888888
//   import React, { memo, useMemo } from 'react';
//   import {
//     View,
//     StyleSheet,
//     ActivityIndicator,
//   } from 'react-native';
//   import { moderateScale } from '../../../../../utils/responsiveSize';
//   import { Colors } from '../../../../../theme';
//   import MathRenderer from './MathRenderer';

//   export type Question = {
//     question_id: string;
//     question_text: string;
//     option_a: string;
//     option_b: string;
//     option_c: string;
//     option_d: string;
//     correct_option: string;
//     explanation: string;
//   };

//   type Props = {
//     selectCheck: 'Options' | 'Solutions';
//     questionsData: Question[];
//     currentPage: number;
//     limit: number;
//     isLoading: boolean;
//   };

// // const cleanLatex = (text: string) => {
// //   if (!text) return '';

// //   // 1. Decode basic HTML entities
// //   let cleaned = text
// //     .replace(/&lt;/g, '<')
// //     .replace(/&gt;/g, '>')
// //     .replace(/&amp;/g, '&');

// //   // 2. DYNAMIC FIX: Remove <br> and newlines INSIDE LaTeX delimiters
// //   // This handles \(...\), \[...\], and $$...$$
// //   cleaned = cleaned.replace(/(\\\(.*?\\\)|\\\[.*?\\\]|\$\$.*?\$\$)/gs, (match) => {
// //     return match
// //       .replace(/<br\s*\/?>/gi, ' ') // Remove <br>
// //       .replace(/[\n\r]/g, ' ')      // Remove newlines
// //       .replace(/\{ /g, '{')        // Fix accidental spaces in LaTeX commands
// //       .replace(/ \}/g, '}');
// //   });

// //   // 3. Fix Physics Dimension Corruptions (Your specific requirement)
// //   cleaned = cleaned
// //     .replace(/\\left\\llcorner\^0/g, '[M^0 L^0 T^0]')
// //     .replace(/\\left\\llcorner/g, '[')
// //     .replace(/\\llcorner/g, 'L')
// //     .replace(/\\mathrm\{~\}/g, ' ')
// //     .replace(/\\right\./g, ''); // Fixes the trailing dots in your screenshots

// //   // 4. Standardize double backslashes for array rows
// //   // KaTeX needs exactly \\ or \\ followed by a space to recognize a new row
// //   cleaned = cleaned.replace(/\\\\/g, '\\\\ ');

// //   return cleaned.trim();
// // };

// const cleanLatex = (text: string) => {
//   if (!text) return '';

//   // 1. Decode basic HTML entities
//   let cleaned = text
//     .replace(/&lt;/g, '<')
//     .replace(/&gt;/g, '>')
//     .replace(/&amp;/g, '&');

//   // 2. CRITICAL: Clean content ONLY inside the \( ... \) or \[ ... \] delimiters
//   // This removes the <br> and \n that make the text turn RED
//   cleaned = cleaned.replace(/\\\(.*?\\\)|\\\[.*?\\\]/gs, (match) => {
//     return match
//       .replace(/<br\s*\/?>/gi, ' ') // Remove <br> inside math
//       .replace(/[\n\r]/g, ' ')      // Remove newlines inside math
//       .replace(/\\{2,}\s+/g, '\\\\') // Fix: Convert "\\ " back to "\\"
//       .replace(/\\{2,}/g, '\\\\');   // Ensure exactly two backslashes for rows
//   });

//   // 3. Fix Physics Symbols
//   cleaned = cleaned
//     .replace(/\\left\\llcorner/g, '[')
//     .replace(/\\llcorner/g, 'L')
//     .replace(/\\right\./g, '');

//   return cleaned;
// };
// const QuestionListData: React.FC<Props> = ({
//   selectCheck,
//   questionsData,
//   currentPage,
//   limit,
//   isLoading,
// }) => {
//   const combinedHTML = useMemo(() => {
//     return questionsData.map((item, index) => {
//       const questionNumber = (currentPage - 1) * limit + index + 1;

//       // We no longer need the if(item.question_id === "822") block!
//       const qText = cleanLatex(item.question_text);
//       const optA = cleanLatex(item.option_a);
//       const optB = cleanLatex(item.option_b);
//       const optC = cleanLatex(item.option_c);
//       const optD = cleanLatex(item.option_d);
//       const explanation = cleanLatex(item.explanation || '');

//       return `
//         <div class="card">
//           <div class="question">
//             <strong>${questionNumber}.</strong> ${qText}
//           </div>

//           <div class="options">
//             <div class="option"><strong>A.</strong> ${optA}</div>
//             <div class="option"><strong>B.</strong> ${optB}</div>
//             <div class="option"><strong>C.</strong> ${optC}</div>
//             <div class="option"><strong>D.</strong> ${optD}</div>
//           </div>

// ${selectCheck === 'Solutions' ? `
//   <div class="solution">
//     <div class="solution-header"><strong>Solution:</strong></div>
//     <div class="solution-content">
//       ${explanation}
//     </div>
//     <div class="answer">
//       <strong>Answer:</strong> Option ${item.correct_option || ''}
//     </div>
//   </div>
// ` : ''}
//         </div>
//       `;
//     }).join('');
//   }, [questionsData, selectCheck, currentPage, limit]);

//   if (isLoading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color={Colors.primaryColor} />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <MathRenderer content={combinedHTML} />
//     </View>
//   );
// };

// export default memo(QuestionListData);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9fafb',
//     padding: moderateScale(8),
//   },
// });



// ?????????????????? additional functionality
// import React, { memo, useCallback, useMemo, useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   ActivityIndicator,
//   Image,
// } from 'react-native';
// import { moderateScale } from '../../../../../utils/responsiveSize';
// import { Colors } from '../../../../../theme';
// import MathRenderer from './MathRenderer';
// import { Icons } from '../../../../../assets/icons';
// import UploadErrorModal from '../UploadErrorModal';

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
//   onInfoPress: () => void;

//   selectedMap: Record<string, boolean>;
//   setSelectedMap: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
// };

// const cleanLatex = (text: string) => {
//   if (!text) return '';

//   // 1. Decode basic HTML entities
//   let cleaned = text
//     .replace(/&lt;/g, '<')
//     .replace(/&gt;/g, '>')
//     .replace(/&amp;/g, '&');

//   // 2. DYNAMIC FIX: Remove <br> and newlines INSIDE LaTeX delimiters
//   // This handles \(...\), \[...\], and $$...$$
//   cleaned = cleaned.replace(/(\\\(.*?\\\)|\\\[.*?\\\]|\$\$.*?\$\$)/gs, (match) => {
//     return match
//       .replace(/<br\s*\/?>/gi, ' ') // Remove <br>
//       .replace(/[\n\r]/g, ' ')      // Remove newlines
//       .replace(/\{ /g, '{')        // Fix accidental spaces in LaTeX commands
//       .replace(/ \}/g, '}');
//   });

//   // 3. Fix Physics Dimension Corruptions (Your specific requirement)
//   cleaned = cleaned
//     .replace(/\\left\\llcorner\^0/g, '[M^0 L^0 T^0]')
//     .replace(/\\left\\llcorner/g, '[')
//     .replace(/\\llcorner/g, 'L')
//     .replace(/\\mathrm\{~\}/g, ' ')
//     .replace(/\\right\./g, ''); // Fixes the trailing dots in your screenshots

//   // 4. Standardize double backslashes for array rows
//   // KaTeX needs exactly \\ or \\ followed by a space to recognize a new row
//   cleaned = cleaned.replace(/\\\\/g, '\\\\ ');

//   return cleaned.trim();
// };
// const QuestionListData: React.FC<Props> = ({
//   selectCheck,
//   questionsData,
//   currentPage,
//   limit,
//   isLoading,
//   onInfoPress,
// }) => {
//   const webViewRef = React.useRef<any>(null);
//   const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
//   const [openPicker, setOpenPicker] = useState<boolean>(false);
//   const handleCloseModal = () => {
//     setOpenPicker(false)
//   }
//   // console.log('selectedIds', selectedIds);

//   const openMediaPicker = useCallback(() => {
//     setOpenPicker(true);
//   }, []);
//   const toggleSelection = useCallback((id: string) => {
//     setSelectedIds((prev) => {
//       const next = new Set(prev);
//       const isNowSelected = !next.has(id);

//       if (next.has(id)) next.delete(id);
//       else next.add(id);

//       // INJECT JS: This changes the color instantly without jumping the scroll
//       webViewRef.current?.injectJavaScript(`window.updateCardUI('${id}', ${isNowSelected}); true;`);
//       return next;
//     });
//   }, []);
//   const renderShimmerItem = () => (
//     <View style={styles.shimmerCard}>
//       <View style={styles.shimmerRow}>
//         {/* Checkbox placeholder */}
//         <View style={styles.shimmerCheckbox} />
//         <View style={styles.shimmerContent}>
//           <View style={styles.shimmerQuestionText} />
//           <View style={styles.shimmerQuestionTextShort} />
//         </View>
//       </View>

//       <View style={styles.shimmerOptionsGrid}>
//         {[1, 2, 3, 4].map((_, index) => (
//           <View key={`shm-${index}`} style={styles.shimmerOptionContainer}>
//             <View style={styles.shimmerOptionText} />
//           </View>
//         ))}
//       </View>

//       {/* <View style={styles.shimmerFooter}>
//       <View style={styles.shimmerBadge} />
//       <View style={styles.shimmerLevel} />
//     </View> */}
//     </View>
//   );

//   const combinedHTML = useMemo(() => {
//     return questionsData.map((item, index) => {
//       const questionNumber = (currentPage - 1) * limit + index + 1;
//       const isSelected = selectedIds.has(item.question_id); // Check initial state

//       return `
//       <div id="card-${item.question_id}" class="card ${isSelected ? 'selected' : ''}" onclick="toggleCard('${item.question_id}')">
//         <div class="checkbox-container">
//         <strong class="questionnptext">${questionNumber}</strong> 
//           <div class="custom-checkbox"></div>
//         </div>
//         <div class="content-container">
//           <div class="question">${cleanLatex(item.question_text)}</div>

//           <div class="options">
//             <div class="option"><strong>A.</strong> ${cleanLatex(item.option_a)}</div>
//             <div class="option"><strong>B.</strong> ${cleanLatex(item.option_b)}</div>
//             <div class="option"><strong>C.</strong> ${cleanLatex(item.option_c)}</div>
//             <div class="option"><strong>D.</strong> ${cleanLatex(item.option_d)}</div>
//           </div>

//       ${selectCheck === 'Solutions' ? `
//     <div class="solution">
//     <div class="solution-header">Solution:</div>
//     <div class="solution-content">
//       ${cleanLatex(item.explanation || 'No explanation available.')}
//     </div>

//     <div class="answer-key">
//       <div class="answer-content">
//         <span class="answer-text">Answer:</span> 
//         <strong class="option-text">Option ${item.correct_option?.toUpperCase()}</strong>
//       </div>

//       <a 
//         href="javascript:void(0)" 
//         style="text-decoration: none; -webkit-tap-highlight-color: transparent;" 
//         onclick="event.stopPropagation(); window.ReactNativeWebView.postMessage('openMediaPicker');">
//         <img src="${Image.resolveAssetSource(Icons.danger).uri}" class="info-icon" />
//       </a> 
//     </div>
//   </div>
// ` : ''}
//         </div>
//       </div>  
//     `;
//     }).join('');
//   }, [questionsData, selectCheck, currentPage, limit]); // Removed selectedIds to prevent jumping
//   // --- REPLACE YOUR LOADER WITH THIS ---
//   if (isLoading) {
//     return <View style={styles.container}>{[1, 2, 3, 4].map((i) => <React.Fragment key={i}>{renderShimmerItem()}</React.Fragment>)}</View>;
//   }
//   return (
//     <View style={styles.container}>
//       <MathRenderer
//         ref={webViewRef}
//         content={combinedHTML}
//         onToggleSelection={toggleSelection}
//         onInfoPress={openMediaPicker} // This links the two!
//       />

//       <UploadErrorModal
//         visible={openPicker}
//         onClose={handleCloseModal}
//       />

//     </View>
//   );
// };

// export default memo(QuestionListData);
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9fafb',
//   },
//   shimmerCard: {
//     backgroundColor: '#ffffff',
//     padding: moderateScale(16),
//     // CHANGE: Removed borderBottomWidth and borderBottomColor to hide green line
//     marginBottom: moderateScale(8), // Creates space between cards while loading
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//   },
//   shimmerRow: {
//     flexDirection: 'row',
//     marginBottom: moderateScale(12),
//   },
//   shimmerCheckbox: {
//     width: moderateScale(20),
//     height: moderateScale(20),
//     backgroundColor: '#e8e8e8',
//     borderRadius: moderateScale(4),
//     marginRight: moderateScale(12),
//   },
//   shimmerContent: {
//     flex: 1,
//   },
//   shimmerQuestionText: {
//     height: moderateScale(18),
//     backgroundColor: '#e8e8e8',
//     borderRadius: moderateScale(4),
//     width: '95%',
//     marginBottom: moderateScale(8),
//   },
//   shimmerQuestionTextShort: {
//     height: moderateScale(18),
//     backgroundColor: '#e8e8e8',
//     borderRadius: moderateScale(4),
//     width: '60%',
//   },
//   shimmerOptionsGrid: {
//     marginLeft: moderateScale(32), // Aligns options under the question text
//     // marginBottom: moderateScale(16),
//   },
//   shimmerOptionContainer: {
//     marginBottom: moderateScale(10),
//   },
//   shimmerOptionText: {
//     height: moderateScale(14),
//     backgroundColor: '#e8e8e8',
//     borderRadius: moderateScale(4),
//     width: '40%',
//   },
//   shimmerFooter: {
//     marginLeft: moderateScale(32),
//   },
//   shimmerBadge: {
//     height: moderateScale(18),
//     width: moderateScale(120),
//     backgroundColor: '#eff6ff',
//     borderRadius: moderateScale(4),
//     marginBottom: moderateScale(8),
//   },
//   shimmerLevel: {
//     height: moderateScale(10),
//     width: moderateScale(80),
//     backgroundColor: '#e8e8e8',
//     borderRadius: moderateScale(2),
//   },
// });



//  ************************************** new redux implementst
import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { moderateScale } from '../../../../../utils/responsiveSize';
import { Colors, Fonts } from '../../../../../theme';
import MathRenderer from './MathRenderer';
import { Icons } from '../../../../../assets/icons';
import UploadErrorModal from '../UploadErrorModal';

//
import { useDispatch } from 'react-redux';
import { removePDFQuestions } from '../../../../../redux/slices/pdfQuestionsSlice';
import { Alert } from 'react-native';
import AppModal from '../../../../../component/modal/AppModal';

export type Question = {
  question_id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  explanation: string;
  dlevel_name: string
};

type Props = {
  selectCheck: 'Options' | 'Solutions';
  questionsData: Question[];
  currentPage: number;
  limit: number;
  isLoading: boolean;
  onInfoPress: () => void;


  selectedMap: Record<string, boolean>;
  setSelectedMap: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  questionNumber: Record<string, boolean>;
  setQuestionNumber: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;

  selectedQuestions: any[];      // Redux selected
};

const cleanLatex = (text: string) => {
  if (!text) return '';

  // 1. Decode basic HTML entities
  let cleaned = text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

  // 2. DYNAMIC FIX: Remove <br> and newlines INSIDE LaTeX delimiters
  // This handles \(...\), \[...\], and $$...$$
  cleaned = cleaned.replace(/(\\\(.*?\\\)|\\\[.*?\\\]|\$\$.*?\$\$)/gs, (match) => {
    return match
      .replace(/<br\s*\/?>/gi, ' ') // Remove <br>
      .replace(/[\n\r]/g, ' ')      // Remove newlines
      .replace(/\{ /g, '{')        // Fix accidental spaces in LaTeX commands
      .replace(/ \}/g, '}');
  });

  // 3. Fix Physics Dimension Corruptions (Your specific requirement)
  cleaned = cleaned
    .replace(/\\left\\llcorner\^0/g, '[M^0 L^0 T^0]')
    .replace(/\\left\\llcorner/g, '[')
    .replace(/\\llcorner/g, 'L')
    .replace(/\\mathrm\{~\}/g, ' ')
    .replace(/\\right\./g, ''); // Fixes the trailing dots in your screenshots

  // 4. Standardize double backslashes for array rows
  // KaTeX needs exactly \\ or \\ followed by a space to recognize a new row
  cleaned = cleaned.replace(/\\\\/g, '\\\\ ');

  return cleaned.trim();
};
const QuestionListData: React.FC<Props> = ({
  selectCheck,
  questionsData,
  currentPage,
  limit,
  isLoading,
  onInfoPress,

  // 
  selectedMap,
  setSelectedMap,
  setQuestionNumber,
  questionNumber,
  selectedQuestions
}) => {
  const dispatch = useDispatch();
  const webViewRef = React.useRef<any>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [openPicker, setOpenPicker] = useState<boolean>(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState<boolean>(false)
  const [removeTarget, setRemoveTarget] = useState<{
    id: string;
    questionNum: number;
  } | null>(null);
  const handleCloseModal = () => {
    setOpenPicker(false)
  }
  const handleRemoveModalClose = () => {
    setIsRemoveModalOpen(false)
  }
  const handleRemoveModalOpen = () => {
    setIsRemoveModalOpen(true)
  }
  const handleConfirmRemove = () => {
    if (!removeTarget) return;

    const { id, questionNum } = removeTarget;

    dispatch(removePDFQuestions([id]));

    setSelectedMap(prev => {
      const newMap = { ...prev };
      delete newMap[id];
      return newMap;
    });

    setQuestionNumber(prev => {
      const newNum = { ...prev };
      delete newNum[questionNum];
      return newNum;
    });

    webViewRef.current?.injectJavaScript(
      `window.updateCardUI('${id}', false); true;`
    );

    setRemoveTarget(null);
    setIsRemoveModalOpen(false);
  };
  // console.log('selectedIds', selectedIds);

  const openMediaPicker = useCallback(() => {
    setOpenPicker(true);
  }, []);
  // const toggleSelection = useCallback((id: string) => {
  //   setSelectedIds((prev) => {
  //     const next = new Set(prev);
  //     const isNowSelected = !next.has(id);

  //     if (next.has(id)) next.delete(id);
  //     else next.add(id);

  //     // INJECT JS: This changes the color instantly without jumping the scroll
  //     webViewRef.current?.injectJavaScript(`window.updateCardUI('${id}', ${isNowSelected}); true;`);
  //     return next;
  //   });
  // }, []);
  // const toggleSelection = useCallback((id: string, questionNum: number) => {

  //   const isPreSaved = selectedQuestions?.some(
  //     (q: any) => q?.question_id === id
  //   );

  //   const isCurrentlySelected = !!selectedMap[id];

  //   // 🔴 REMOVE PRE-SAVED QUESTION
  //   if (isPreSaved && isCurrentlySelected) {
  //     Alert.alert(
  //       'Remove Question',
  //       'This question was previously saved. Are you sure you want to remove it?',
  //       [
  //         { text: 'Cancel', style: 'cancel' },
  //         {
  //           text: 'Remove',
  //           style: 'destructive',
  //           onPress: () => {
  //             dispatch(removePDFQuestions([id]));

  //             setSelectedMap(prev => {
  //               const newMap = { ...prev };
  //               delete newMap[id];
  //               return newMap;
  //             });

  //             setQuestionNumber(prev => {
  //               const newNum = { ...prev };
  //               delete newNum[questionNum];
  //               return newNum;
  //             });

  //             webViewRef.current?.injectJavaScript(
  //               `window.updateCardUI('${id}', false); true;`
  //             );
  //           }
  //         }
  //       ]
  //     );
  //     return;
  //   }

  //   // 🟢 NORMAL TOGGLE
  //   setSelectedMap(prev => {
  //     const newMap = { ...prev };

  //     const isNowSelected = !newMap[id];

  //     if (newMap[id]) delete newMap[id];
  //     else newMap[id] = true;

  //     webViewRef.current?.injectJavaScript(
  //       `window.updateCardUI('${id}', ${isNowSelected}); true;`
  //     );

  //     return newMap;
  //   });

  //   setQuestionNumber(prev => {
  //     const newNum = { ...prev };
  //     if (newNum[questionNum]) delete newNum[questionNum];
  //     else newNum[questionNum] = true;
  //     return newNum;
  //   });

  // }, [selectedMap, selectedQuestions, setSelectedMap, setQuestionNumber, dispatch]);

  // const toggleSelection = useCallback((id: string, questionNum: number) => {

  //   const isPreSaved = selectedQuestions?.some(
  //     (q: any) => q?.question_id === id
  //   );

  //   // 🔥 IMPORTANT FIX
  //   const isSelectedNow =
  //     !!selectedMap[id] ||
  //     isPreSaved;

  //   // ✅ REMOVE PRE-SAVED (FIRST CLICK ALERT)
  //   if (isPreSaved && isSelectedNow) {
  //     // Alert.alert('ss',
  //     //   'Are you sure you want to remove this question',
  //     //   [
  //     //     { text: 'Cancel', style: 'cancel' },
  //     //     {
  //     //       text: 'Remove',
  //     //       style: 'destructive',
  //     //       onPress: () => {

  //     //         dispatch(removePDFQuestions([id]));

  //     //         setSelectedMap(prev => {
  //     //           const newMap = { ...prev };
  //     //           delete newMap[id];
  //     //           return newMap;
  //     //         });

  //     //         setQuestionNumber(prev => {
  //     //           const newNum = { ...prev };
  //     //           delete newNum[questionNum];
  //     //           return newNum;
  //     //         });

  //     //         webViewRef.current?.injectJavaScript(
  //     //           `window.updateCardUI('${id}', false); true;`
  //     //         );
  //     //       }
  //     //     }
  //     //   ]
  //     // );
  //     setRemoveTarget({ id, questionNum })
  //     handleRemoveModalOpen();
  //     return;
  //   }

  //   // ✅ NORMAL TOGGLE
  //   setSelectedMap(prev => {
  //     const newMap = { ...prev };

  //     const isNowSelected = !newMap[id];

  //     if (newMap[id]) delete newMap[id];
  //     else newMap[id] = true;

  //     webViewRef.current?.injectJavaScript(
  //       `window.updateCardUI('${id}', ${isNowSelected}); true;`
  //     );

  //     return newMap;
  //   });

  //   setQuestionNumber(prev => {
  //     const newNum = { ...prev };
  //     if (newNum[questionNum]) delete newNum[questionNum];
  //     else newNum[questionNum] = true;
  //     return newNum;
  //   });

  // }, [selectedMap, selectedQuestions, setSelectedMap, setQuestionNumber, dispatch]);

  const toggleSelection = useCallback((id: string, questionNum: number) => {

    const isPreSaved = selectedQuestions?.some(
      (q: any) => q?.question_id === id
    );

    // ✅ ONLY REDUX ITEMS OPEN MODAL
    if (isPreSaved) {
      setRemoveTarget({ id, questionNum });
      handleRemoveModalOpen();
      return;
    }

    // 🟢 NORMAL TOGGLE (Local Only)
    setSelectedMap(prev => {
      const newMap = { ...prev };
      const isNowSelected = !newMap[id];

      if (newMap[id]) delete newMap[id];
      else newMap[id] = true;

      webViewRef.current?.injectJavaScript(
        `window.updateCardUI('${id}', ${isNowSelected}); true;`
      );

      return newMap;
    });

    setQuestionNumber(prev => {
      const newNum = { ...prev };
      if (newNum[questionNum]) delete newNum[questionNum];
      else newNum[questionNum] = true;
      return newNum;
    });

  }, [selectedQuestions, setSelectedMap, setQuestionNumber, dispatch]);
  const renderShimmerItem = () => (
    <View style={styles.shimmerCard}>
      <View style={styles.shimmerRow}>
        {/* Checkbox placeholder */}
        <View style={styles.shimmerCheckbox} />
        <View style={styles.shimmerContent}>
          <View style={styles.shimmerQuestionText} />
          <View style={styles.shimmerQuestionTextShort} />
        </View>
      </View>

      <View style={styles.shimmerOptionsGrid}>
        {[1, 2, 3, 4].map((_, index) => (
          <View key={`shm-${index}`} style={styles.shimmerOptionContainer}>
            <View style={styles.shimmerOptionText} />
          </View>
        ))}
      </View>

      {/* <View style={styles.shimmerFooter}>
      <View style={styles.shimmerBadge} />
      <View style={styles.shimmerLevel} />
    </View> */}
    </View>
  );

  const combinedHTML = useMemo(() => {
    return questionsData.map((item, index) => {
      const questionNumber = (currentPage - 1) * limit + index + 1;
      // const isSelected = selectedIds.has(item.question_id); // Check initial state
      const isSelected = !!selectedMap[item.question_id] ||
        selectedQuestions?.some((q: any) => q?.question_id === item.question_id);
      const labelColorStatus = (level) => {
        if (level === 'Easy') return Colors.primaryColor;
        if (level === 'Hard') return Colors.red;
        if (level === 'Medium') return Colors.green;
        return Colors.black;
      };

      const getOptionBg = (optionLetter: string, correctOption: string): string => {
        if (optionLetter === correctOption) {
          return Colors.green; // correct color
        }
        return Colors.lightThemeBlue; // default background
      };
      // correct_option
      return `
      <div id="card-${item.question_id}" class="card ${isSelected ? 'selected' : ''}"
      onclick="toggleCard('${item.question_id}', ${questionNumber})">
        <div class="checkbox-container">
        <strong class="questionnptext">${questionNumber}</strong> 
          <div class="custom-checkbox"></div>
        </div>
        <div class="content-container">
          <div class="question">
            <span class="qs-text">
          ${cleanLatex(item.question_text)}
          </span>
          </div>
          
          <div class="options">
            <div class="option-inner">
     <div class="option-text-container"  ${selectCheck === 'Solutions' ? `style="background-color:${getOptionBg('A', item.correct_option)}"` : ''}>
            <strong class="option-number-test" ${selectCheck === 'Solutions' ? `style="color: ${item?.correct_option === 'A' ? Colors.white : Colors.black}"` : ''}>A</strong></div> 
  <span class="qs-option-text">
  ${cleanLatex(item.option_a)}
</span>
            </div>
            <div class="option-inner">
          <div class="option-text-container"  ${selectCheck === 'Solutions' ? `style="background-color:${getOptionBg('B', item.correct_option)}"` : ''}>
            <strong class="option-number-test" ${selectCheck === 'Solutions' ? `style="color: ${item?.correct_option === 'B' ? Colors.white : Colors.black}"` : ''}>B</strong></div> 
           <span class="qs-option-text">
  ${cleanLatex(item.option_b)}
</span>
            </div>
            <div class="option-inner">
            <div class="option-text-container"  ${selectCheck === 'Solutions' ? `style="background-color:${getOptionBg('C', item.correct_option)}"` : ''}>
            <strong class="option-number-test" ${selectCheck === 'Solutions' ? `style="color: ${item?.correct_option === 'C' ? Colors.white : Colors.black}"` : ''}>C</strong></div> 
          <span class="qs-option-text">
  ${cleanLatex(item.option_c)}
</span></div>
            <div class="option-inner">
              <div class="option-text-container"  ${selectCheck === 'Solutions' ? `style="background-color:${getOptionBg('D', item.correct_option)}"` : ''}>
            <strong class="option-number-test" ${selectCheck === 'Solutions' ? `style="color: ${item?.correct_option === 'D' ? Colors.white : Colors.black}"` : ''}>D</strong></div> 
            <span class="qs-option-text">
  ${cleanLatex(item.option_d)}
</span></div>
           
          </div>

          <span class="lebal-test">Lebel:</span>
<strong style="color:${labelColorStatus(item?.dlevel_name)};font-size:${moderateScale(13)}px; font-family:'Inter'">
  ${item?.dlevel_name}
</strong>
      ${selectCheck === 'Solutions' ? `
    <div class="solution">
    <div class="solution-header"> 
     <span class="solution-label">Solution:</span>
</div>
   <div class="solution-content">
    ${item.explanation
            ? cleanLatex(item.explanation)
            : `<span class="solution-label">Solution:</span> No explanation available.`
          }
  </div>
    
    <div class="answer-key">
      <div class="answer-content">
        <span class="answer-text">Answer:</span> 
        <strong class="option-text">${item.correct_option?.toUpperCase()}</strong>
      </div>

      <a 
        href="javascript:void(0)" 
        style="text-decoration: none; -webkit-tap-highlight-color: transparent;" 
        onclick="event.stopPropagation(); window.ReactNativeWebView.postMessage('openMediaPicker');"
        
        >
        <img src="${Image.resolveAssetSource(Icons.danger).uri}" class="info-icon" />
      </a> 
    </div>
  </div>
` : ''}
        </div>
      </div>  
    `;
    }).join('');
  }, [questionsData, selectCheck, currentPage, limit]); // Removed selectedIds to prevent jumping
  // --- REPLACE YOUR LOADER WITH THIS ---
  if (isLoading) {
    return <View style={styles.container}>{[1, 2, 3, 4].map((i) => <React.Fragment key={i}>{renderShimmerItem()}</React.Fragment>)}</View>;
  }
  return (
    <View style={styles.container}>
      <MathRenderer
        ref={webViewRef}
        content={combinedHTML}
        onToggleSelection={toggleSelection}
        onInfoPress={openMediaPicker} // This links the two!
      />

      <UploadErrorModal
        visible={openPicker}
        onClose={handleCloseModal}
      />

      <AppModal
        onClose={handleRemoveModalClose}
        visible={isRemoveModalOpen}
        animationType="fade"
        overlayStyle={styles.overlayStyle}
        containerStyle={styles.modalContainer}>
        <Text style={styles.areYouText}>Are you sure you want to remove{'\n'} this question?</Text>
        <View style={styles.cancelBox}>
          <TouchableOpacity onPress={handleRemoveModalClose}>
            <Text style={[styles.removeText, { marginRight: moderateScale(30) }]}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleConfirmRemove}>
            <Text style={styles.removeText} >Yes</Text>
          </TouchableOpacity>
        </View>
      </AppModal>

    </View>
  );
};

export default memo(QuestionListData);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  shimmerCard: {
    backgroundColor: '#ffffff',
    padding: moderateScale(16),
    // CHANGE: Removed borderBottomWidth and borderBottomColor to hide green line
    marginBottom: moderateScale(8), // Creates space between cards while loading
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  shimmerRow: {
    flexDirection: 'row',
    marginBottom: moderateScale(12),
  },
  shimmerCheckbox: {
    width: moderateScale(20),
    height: moderateScale(20),
    backgroundColor: '#e8e8e8',
    borderRadius: moderateScale(4),
    marginRight: moderateScale(12),
  },
  shimmerContent: {
    flex: 1,
  },
  shimmerQuestionText: {
    height: moderateScale(18),
    backgroundColor: '#e8e8e8',
    borderRadius: moderateScale(4),
    width: '95%',
    marginBottom: moderateScale(8),
  },
  shimmerQuestionTextShort: {
    height: moderateScale(18),
    backgroundColor: '#e8e8e8',
    borderRadius: moderateScale(4),
    width: '60%',
  },
  shimmerOptionsGrid: {
    marginLeft: moderateScale(32), // Aligns options under the question text
    // marginBottom: moderateScale(16),
  },
  shimmerOptionContainer: {
    marginBottom: moderateScale(10),
  },
  shimmerOptionText: {
    height: moderateScale(14),
    backgroundColor: '#e8e8e8',
    borderRadius: moderateScale(4),
    width: '40%',
  },
  shimmerFooter: {
    marginLeft: moderateScale(32),
  },
  shimmerBadge: {
    height: moderateScale(18),
    width: moderateScale(120),
    backgroundColor: '#eff6ff',
    borderRadius: moderateScale(4),
    marginBottom: moderateScale(8),
  },
  shimmerLevel: {
    height: moderateScale(10),
    width: moderateScale(80),
    backgroundColor: '#e8e8e8',
    borderRadius: moderateScale(2),
  },

  removeText: {
    fontSize: moderateScale(18),
    color: Colors.primaryColor,
    fontFamily: Fonts.InstrumentSansSemiBold,
    marginRight: moderateScale(20)
  },
  cancelBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: moderateScale(20)
  },
  areYouText: {
    fontSize: moderateScale(16),
    color: '#656565',
    fontFamily: Fonts.InstrumentSansMedium
  },

  // modal
  modalContainer: {
    padding: moderateScale(30),
    marginHorizontal: moderateScale(30),
    borderRadius: moderateScale(6),
    borderTopLeftRadius: moderateScale(6),
    borderTopRightRadius: moderateScale(6),
  },
  overlayStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center'
  }
});

