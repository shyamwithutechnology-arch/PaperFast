// import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Image,
//   Dimensions,
//   Pressable,
//   Modal,
//   Platform,
//   PermissionsAndroid,
//   TextInput,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import MathJax from 'react-native-mathjax';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import CloseIcon from "react-native-vector-icons/EvilIcons";
// import AddIcon from "react-native-vector-icons/MaterialIcons";
// import { useDispatch, useSelector } from 'react-redux';
// import { moderateScale, scale, verticalScale } from '../../../../utils/responsiveSize';
// import { Colors, Fonts } from '../../../../theme';
// import { Icons } from '../../../../assets/icons';

// // MathJax configuration
// const mathJaxOptions = {
//   messageStyle: 'none',
//   extensions: ['tex2jax.js'],
//   jax: ['input/TeX', 'output/HTML-CSS'],
//   tex2jax: {
//     inlineMath: [['$', '$'], ['\\(', '\\)']],
//     displayMath: [['$$', '$$'], ['\\[', '\\]']],
//     processEscapes: true,
//   },
//   'HTML-CSS': {
//     scale: 100,
//     linebreaks: { automatic: true }
//   },
//   TeX: {
//     extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js']
//   }
// };


// export type Question = {
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
// };

// type TogglePayload = {
//   id: string;
//   questionNum: number;
// };

// type Props = {
//   selectCheck: 'Options' | 'Solutions';
//   selectedMap: Record<string, boolean>;
//   setSelectedMap: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
//   questionNumber: Record<string, boolean>;
//   setQuestionNumber: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
//   questionsData: Question[];
//   currentPage: number,
//   limit: number;
//   hideContant: boolean;
//   isLoading: boolean;
//   selectedQuestions: any[];
//   questionType:string
// };

// // Helper to check if text contains math expressions
// const containsMath = (text: string): boolean => {
//   if (!text) return false;
//   return /(\$|\\\(|\\\[|\\frac|\\sqrt|\^|_)/.test(text);
// };

// // Helper to extract base64 images from HTML
// const extractImagesFromHtml = (html: string): { text: string; images: string[] } => {
//   if (!html) return { text: html || '', images: [] };

//   const imgRegex = /<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/g;
//   const images: string[] = [];
//   let text = html;
//   let match;

//   // First extract all images
//   while ((match = imgRegex.exec(html)) !== null) {
//     images.push(match[1]);
//     // Remove the img tag from text
//     text = text.replace(match[0], '');
//   }

//   // Clean HTML tags - IMPORTANT: Handle <br> tags properly
//   text = text
//     .replace(/<br\s*\/?>\s*<br\s*\/?>/gi, '\n\n') // Convert double <br> to double newline
//     .replace(/<br\s*\/?>/gi, ' ') // Convert single <br> to space
//     .replace(/&lt;/g, '<')
//     .replace(/&gt;/g, '>')
//     .replace(/&amp;/g, '&')
//     .replace(/&nbsp;/g, ' ')
//     .replace(/<[^>]*>/g, '') // Remove all remaining HTML tags
//     .trim();

//   return { text, images };
// };


// // Memoized Option Component with image support
// const OptionItem = memo(({
//   id,
//   label,
//   isSelected,
//   isCorrect, // Add isCorrect as prop
//   selectCheck
// }: {
//   id: string;
//   label: string;
//   isSelected: boolean;
//   isCorrect: boolean;
//   selectCheck: 'Solutions' | 'Options'
// }) => {
//   // Extract images and text from option label
//   const { text: optionText, images: optionImages } = useMemo(() =>
//     extractImagesFromHtml(label || ''),
//     [label]
//   );
//   // const formattedOptionText = useMemo(() => {
//   //   return `
//   //   <div style="font-size:${moderateScale(10)}px;  line-height:16px;border:1px solid #000">
//   //     ${optionText}
//   //   </div>
//   // `;
//   // }, [optionText]);      // padding: 6px;


//   const formattedOptionText = useMemo(() => {
//     return `
//     <div style="
//       font-size: 6px;
//       line-height: 20px;
//       border: 0px solid #000;
//       paddingVertical:4px 0,
//     ">
//       ${optionText}
//     </div>
//   `;
//   }, [optionText]);

//   const hasMath = containsMath(optionText);
//   const hasText = optionText.trim().length > 0;
//   const hasImages = optionImages.length > 0;
//   const selectOption = selectCheck === 'Solutions'
//   return (
//     <View style={[
//       styles.optionContainer,
//       // hasText  ? styles.correctOptionContainer : styles.imageStyle/
//     ]}>
//       {/* Option Content */}
//       {/* // selectOption && isCorrect && styles.correctOptionLabel */}
//       {hasImages &&
//         // <View style={[styles.optionContent, hasImages && { borderWidth: 1, flexDirection: 'row', alignItems: "center", borderColor: selectOption && isCorrect ? Colors.questionSelect : '#fff' },]}>
//         //   <View style={[
//         //     styles.optionLabelContainer,
//         //     selectOption && isCorrect && styles.correctOptionBgColor
//         //   ]}>
//         //     <Text style={[
//         //       styles.optionLabel,
//         //       (selectOption && isCorrect && styles.correctOptionText
//         //       )]}>
//         //       {id}
//         //     </Text>
//         //   </View>
//         //   {hasImages && (
//         //     // <View style={[styles.optionImagesContainer, { height: moderateScale(62),borderWidth:1 ,width:moderateScale(150), alignItems:'flex-start',justifyContent:"flex-start"}]}>
//         //     <View style={[styles.optionImagesContainer, { width: moderateScale(270), height: moderateScale(62) }]}>
//         //       {optionImages.map((base64, index) => (
//         //         <Image
//         //           key={`option-img-${id}-${index}`}
//         //           source={{ uri: `data:image/png;base64,${base64}` }}
//         //           style={styles.optionImage}
//         //           resizeMode='contain'
//         //         />
//         //       ))}
//         //     </View>
//         //   )}
//         // </View>
//         <View
//           style={[
//             styles.optionContent,
//             hasImages && styles.optionWithImages,
//             selectOption && isCorrect && { borderColor: Colors.questionSelect },
//           ]}
//         >
//           {/* LEFT: Option ID */}
//           <View
//             style={[
//               styles.optionLabelContainer,
//               selectOption && isCorrect && styles.correctOptionBgColor,
//             ]}
//           >
//             <Text
//               style={[
//                 styles.optionLabel,
//                 selectOption && isCorrect && styles.correctOptionText,
//               ]}
//             >
//               {id}
//             </Text>
//           </View>

//           {/* RIGHT: Images */}
//           <View style={styles.optionImagesContainer}>
//             {optionImages.map((base64, index) => (
//               <Image
//                 key={`option-img-${id}-${index}`}
//                 source={{ uri: `data:image/png;base64,${base64}` }}
//                 style={styles.optionImage}
//                 resizeMode="contain"
//               />
//             ))}
//           </View>
//         </View>
//       }


//       {hasText &&
//         // <View style={[{
//         //   borderWidth: 1, borderColor: 'green', flexDirection: "row", justifyContent: "center", alignItems: 'center', paddingVertical: moderateScale(6),
//         // }]}>
//         <View style={[styles.optionContent, { paddingVertical: moderateScale(0) }]}>
//           {/* hasText && {  borderColor: selectOption && isCorrect ? Colors.questionSelect : '#fff'} */}
//           <View style={[
//             styles.optionLabelContainer, { marginLeft: moderateScale(0) },
//             selectOption && isCorrect && styles.correctOptionBgColor
//           ]}>
//             <Text style={[
//               styles.optionLabel,
//               (selectOption && isCorrect && styles.correctOptionText
//               )]}>
//               {id}
//             </Text>
//           </View>

//           {hasText && (
//             <>
//               {
//                 hasMath ? (
//                   <View style={[
//                     styles.optionTextContainer,
//                     hasImages && styles.optionTextWithImages, {
//                       paddingVertical: moderateScale(1.5)
//                     }
//                   ]}>
//                     <MathJax
//                       mathJaxOptions={mathJaxOptions}
//                       html={formattedOptionText}
//                       style={[
//                         styles.optionMathJax,
//                         (selectOption && isCorrect && styles.correctOptionText)
//                       ]}
//                     />
//                   </View>
//                 ) : (
//                   <View style={[
//                     styles.optionTextContainer, { paddingVertical: moderateScale(11), marginLeft: moderateScale(10) },
//                     hasImages && styles.optionTextWithImages
//                   ]}>
//                     <Text style={[
//                       styles.optionText,
//                       (selectOption && isCorrect && styles.correctOptionText)
//                     ]}>
//                       {optionText}
//                     </Text>
//                   </View>
//                 )
//               }
//             </>
//           )}
//           {/* {hasText && (
//             <View style={[
//               styles.optionTextContainer,
//               hasImages && styles.optionTextWithImages
//             ]}>
//               {
//                 hasMath && (
//                   <Text style={[
//                     styles.optionText,
//                     (selectOption && isCorrect && styles.correctOptionText)
//                   ]}>
//                     {optionText}
//                   </Text>
//                 )
//               }
//             </View>
//           )} */}
//           {/* Option Text */}
//           {/* {hasText && (
//               <View style={[
//                 styles.optionTextContainer,
//                 hasImages && styles.optionTextWithImages
//               ]}>
//                 {hasMath ? (
//                   <MathJax
//                     mathJaxOptions={mathJaxOptions}
//                     html={formattedOptionText}
//                     style={[
//                       styles.optionMathJax,
//                       (selectOption && isCorrect && styles.correctOptionText)
//                     ]}
//                   />
//                 ) : (
//                   <Text style={[
//                     styles.optionText,
//                     (selectOption && isCorrect && styles.correctOptionText)
//                   ]}>
//                     {optionText}
//                   </Text>
//                 )}
//               </View>
//             )} */}

//         </View>
//       }

//     </View>
//   );
// });

// OptionItem.displayName = 'OptionItem';

// // Memoized Question Content Component
// const QuestionContent = memo(({
//   text,
//   images,
//   isSelected
// }: {
//   text: string;
//   images: string[];
//   isSelected: boolean;
// }) => {
//   // const cleanText = useMemo(() => {
//   //   return (text || '')
//   // .replace(/<br\s*\/?>/gi, '\n')
//   // .replace(/&lt;/g, '<')
//   // .replace(/&gt;/g, '>')
//   // .replace(/&amp;/g, '&')
//   // .replace(/&nbsp;/g, ' ')
//   // .replace(/<[^>]*>/g, '');
//   // }, [text]);
//   const cleanText = useMemo(() => {
//     return (text || '')
//       // .replace(/<br\s*\/?>/gi, '\n')
//       .replace(/&lt;/g, '<')
//       .replace(/&gt;/g, '>')
//       .replace(/&amp;/g, '&')
//       .replace(/&nbsp;/g, ' ')
//       .replace(/<[^>]*>/g, '');
//   }, [text]);


//   const hasMath = containsMath(cleanText);
//   const hasText = cleanText.trim().length > 0;
//   const hasImages = images.length > 0;

//   const htmlContent = `
// <!DOCTYPE html>
// <html>
// <head>
// <meta name="viewport" content="width=device-width, initial-scale=1.0">
// <style>

//   body {
//     margin: 0 !important;
//     padding: 0 !important;
//     font-size: ${moderateScale(10)}px;
//     color: #000;
//     font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
//     line-height: ${moderateScale(18)}px;
//   }

//   p, div {
//     margin: 0 !important;
//     padding: 0 !important;
//   }

//   .MathJax_Display {
//     margin: 0 !important;
//   }

// </style>
// </head>
// <body>
// ${cleanText}
// </body>
// </html>
// `
//   return (
//     <View style={styles.questionContent}>
//       {/* Question Text */}
//       {hasText && (
//         <View style={styles.mathJaxWrapper}>
//           {hasMath ? (
//             <MathJax
//               mathJaxOptions={mathJaxOptions}
//               html={htmlContent}
//               style={[styles.questionMathJax, isSelected && styles.selectedText, {
//                 marginTop: 0, paddingVertical: 0,
//               }]}
//             />
//           ) : (
//             <Text style={[styles.questionText, isSelected && styles.selectedText]}>
//               {cleanText}
//             </Text>
//           )}
//         </View>
//       )}

//       {/* Question Images */}
//       {hasImages && (
//         <View style={[
//           styles.imagesContainer,
//           hasText && styles.imagesWithText,
//           isSelected && { backgroundColor: '#EBF6FF' },
//           {
//             // borderWidth: 1,
//             // borderColor: "red"
//           }

//         ]}>
//           {images.map((base64, index) => (
//             <Image
//               key={`question-img-${index}`}
//               source={{ uri: `data:image/png;base64,${base64}` }}
//               style={styles.questionImage}
//               resizeMode="contain"
//             />
//           ))}
//         </View>
//       )}
//     </View>
//   );
// });

// QuestionContent.displayName = 'QuestionContent';

// const SolutionView = memo(({
//   explanation,
//   correctOption,
//   isSelected
// }: {
//   explanation: string;
//   correctOption: string;
//   isSelected: boolean;
// }) => {
//   // 1. Extract images
//   const images = useMemo(() => {
//     const imgRegex = /<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/g;
//     const matches: string[] = [];
//     let match;
//     while ((match = imgRegex.exec(explanation || '')) !== null) {
//       matches.push(match[1]);
//     }
//     return matches;
//   }, [explanation]);


//   // 2. Remove image tags to get clean text
//   const cleanText = useMemo(() => {
//     let text = explanation || '';

//     // Remove image tags
//     text = text.replace(/<img[^>]*>/g, '');

//     // Clean HTML
//     text = text
//       // .replace(/<br\s*\/?>/gi, ' ') // Convert <br> to space
//       // .replace(/<br\s*\/?>/gi, '<br/>')
//       .replace(/&lt;/g, '<')
//       .replace(/&gt;/g, '>')
//       .replace(/&amp;/g, '&')
//       .replace(/&nbsp;/g, ' ')
//       // .replace(/<[^>]*>/g, '') // Remove any remaining HTML
//       .trim();

//     return text;
//   }, [explanation]);


//   const htmlContent = `
// <!DOCTYPE html>
// <html>
// <head>
// <meta name="viewport" content="width=device-width, initial-scale=1.0">

// <style>

// @font-face {
//   font-family: 'InstrumentSansBold';
//   src: url('file:///android_asset/fonts/InstrumentSans_SemiCondensed-Regular.ttf');
//   font-weight: normal;
// }

// body {
//   margin:0 !important;
//   padding:0 !important;
//   font-size:14px;
//   color:#000;
//   font-family:'InstrumentSansBold', Arial, sans-serif;
//   line-height:20px;
// }

// p, div {
//   margin:0 !important;
//   padding:0 !important;
// }

// .MathJax_Display {
//   margin:0 !important;
// }

// </style>
// </head>

// <body>
// ${cleanText}
// </body>
// </html>
// `;

//   const hasMath = containsMath(htmlContent);
//   const hasText = htmlContent.length > 0;
//   const hasImages = images.length > 0;

//   return (
//     <View style={[styles.solutionBox, isSelected && styles.cardSelected]}>
//       <Text style={styles.solutionTitle}>Solution :</Text>

//       {/* Text Content */}
//       {hasText && (
//         <View style={styles.textContainer}>
//           {hasMath ? (
//             <MathJax
//               mathJaxOptions={mathJaxOptions}
//               html={htmlContent}
//               style={[styles.solutionMathJax, isSelected && styles.selectedText]}
//             />
//           ) : (
//             <Text style={[styles.solutionText, isSelected && styles.selectedText]}>
//               {htmlContent}
//             </Text>
//           )}
//         </View>
//       )}

//       {/* Images (after text) */}
//       {hasImages && (
//         <View style={styles.imagesContainer}>
//           {images.map((base64, index) => (
//             <Image
//               key={`img-${index}`}
//               source={{ uri: `data:image/png;base64,${base64}` }}
//               style={styles.solutionImage}
//               resizeMode="contain"
//             />
//           ))}
//         </View>
//       )}

//       <Text style={styles.answerText}>
//         <Text style={styles.answerLabel}>Answer: </Text>
//         Option {correctOption || ''}
//       </Text>
//     </View>
//   );
// });

// const QuestionItem = memo(({
//   item,
//   index,
//   isSelected,
//   selectCheck,
//   onToggle,
//   extractImages,
//   listottomLineHide,
//   currentPage,
//   limit,
//   onInfoPress,
//   hideContant
// }: {
//   item: Question;
//   index: number;
//   isSelected: boolean;
//   selectCheck: 'Options' | 'Solutions';
//   // onToggle: (id: string) => void;
//   onToggle: (payload: TogglePayload) => void;
//   extractImages: (html: string) => string[];
//   listottomLineHide: any,
//   currentPage: number,
//   limit: number,
//   onInfoPress: () => void,
//   hideContant: boolean
// }) => {

//   const images = extractImages(item.question_text);
//   const questionTextWithoutImages = (item.question_text || '').replace(/<img[^>]*>/g, '');

//   const options = [
//     { id: 'A', label: item.option_a || '' },
//     { id: 'B', label: item.option_b || '' },
//     { id: 'C', label: item.option_c || '' },
//     { id: 'D', label: item.option_d || '' },
//   ];
//   const questionNumber = (currentPage - 1) * limit + index + 1;
//   const textSty = () => {
//     // console.log('item?.dlevel_name', item?.dlevel_name);
//     if (item?.dlevel_name === 'Easy') {
//       return { color: Colors.primaryColor }
//     } else if (item?.dlevel_name === 'Hard') {
//       return { color: Colors.red }
//     } else {
//       return { color: Colors.green }
//     }
//   }
//   // const textSty = (item: any) => {
//   //   if (item?.dlevel_name === 'Easy') {
//   //     return { color: Colors.primaryColor };
//   //   } else if (item?.dlevel_name === 'Difficult') {
//   //     return { color: Colors.warning };
//   //   } else {
//   //     return { color: Colors.red };
//   //   }
//   // };

//   return (
//     <Pressable
//       style={[!hideContant && styles.cardMainBox, isSelected && styles.cardSelected,
//       { flexDirection: "row", paddingLeft: moderateScale(3) }]}
//       // onPress={() => onToggle({ id: item?.question_id, qsNumber: questionNumber })}
//       onPress={() =>
//         !hideContant && onToggle({
//           id: item?.question_id,
//           questionNum: questionNumber,
//         })
//       }
//     >
//       <View style={[styles.questionNumberContainer, {}]}>
//         <Text style={styles.questionNumber}> {questionNumber}</Text>
//         {!hideContant && <View style={[
//           styles.checkBox,
//           isSelected ? styles.checkBoxSelected : styles.checkBoxDefault
//         ]}>
//           {isSelected && (
//             <Icon
//               name="check"
//               size={moderateScale(12)}
//               color={Colors.white}
//             />
//           )}
//         </View>}
//       </View>
//       <View style={[styles.card, isSelected && styles.cardSelected,]}>
//         <QuestionContent
//           text={questionTextWithoutImages}
//           images={images}
//           isSelected={isSelected}
//         />
//         {/* Options Grid */}
//         <View style={styles.optionsGrid}>
//           {options.map((option) => (
//             <OptionItem
//               key={option.id}
//               id={option.id}
//               label={option.label}
//               isSelected={isSelected}
//               isCorrect={item.correct_option === option.id} // Pass correct option check
//               selectCheck={selectCheck} // Pass it here
//             />)
//           )}
//         </View>
//         {!hideContant && <View style={styles.mainLevelBox}>
//           <Text style={styles.lebalText}>Level : <Text style={[styles.lebalText, textSty(), { fontFamily: Fonts.InterBold }]}>
//             {item?.dlevel_name}
//           </Text></Text>
//           <Pressable style={{ borderWidth: 0 }} onPress={onInfoPress}>
//             <Image source={Icons.danger} style={styles.infoImg} resizeMode='contain' />
//           </Pressable>
//         </View>}


//         {/* Solution View */}
//         {selectCheck === 'Solutions' && (
//           <View style={styles.solutionWrapper}>
//             <SolutionView
//               explanation={item.explanation || ''}
//               correctOption={item.correct_option || ''}
//               isSelected={isSelected}
//             />
//           </View>
//         )}
//       </View>
//     </Pressable>
//   );
// });

// // Main Component

// const PDFPreviewListComponent: React.FC<Props> = ({
//   selectCheck,
//   selectedMap,
//   setSelectedMap,
//   questionsData,
//   currentPage,
//   limit,
//   questionNumber,
//   setQuestionNumber,
//   hideContant,
//   isLoading,
//   selectedQuestions,
//   questionType
// }) => {
//   const [openPicker, setOpenPicker] = useState<boolean>(false);
//   const handleCloseModal = () => {
//     setOpenPicker(false)
//   }
//   // console.log('selectCheck',selectCheck);
//   const extractBase64Images = useCallback((html: string): string[] => {
//     const imgRegex = /<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/g;
//     const images: string[] = [];
//     let match;
//     while ((match = imgRegex.exec(html || '')) !== null) {
//       images.push(match[1]);
//     }
//     return images;
//   }, []);
//   // Render shimmer items when loading
//   const renderShimmerItem = useCallback(() => (
//     <View style={styles.shimmerContainer}>
//       {/* Question Shimmer */}
//       <View style={styles.shimmerRow}>
//         <View style={styles.shimmerNumber} />
//         <View style={styles.shimmerContent}>
//           <View style={styles.shimmerQuestionText} />
//           <View style={styles.shimmerQuestionTextShort} />
//         </View>
//       </View>

//       {/* Options Shimmer */}
//       <View style={styles.shimmerOptionsGrid}>
//         {[1, 2, 3, 4].map((_, index) => (
//           <View key={`shimmer-opt-${index}`} style={styles.shimmerOptionContainer}>
//             <View style={styles.shimmerOptionLabel} />
//             <View style={styles.shimmerOptionText} />
//           </View>
//         ))}
//       </View>

//       {/* Level Shimmer */}
//       {!hideContant && (
//         <View style={styles.shimmerLevelContainer}>
//           <View style={styles.shimmerLevelText} />
//         </View>
//       )}
//     </View>
//   ), [hideContant]);
//   const openMediaPicker = useCallback(() => {
//     setOpenPicker(true);
//   }, []);
//   useEffect(() => {
//     if (selectedQuestions && selectedQuestions.length > 0) {
//       const initialMap: Record<string, boolean> = {};
//       selectedQuestions.forEach((question: any) => {
//         if (question?.question_id) {
//           initialMap[question.question_id] = true;
//         }
//       });
//       setSelectedMap(initialMap);
//     }
//   }, [selectedQuestions]);
//   const toggleSelect = useCallback(
//     ({ id, questionNum }: TogglePayload) => {
//       console.log('🔄 Toggling question ID:', id);

//       // Check if already selected in local state
//       const isCurrentlySelected = !!selectedMap[id];

//       // If already selected, DO NOT REMOVE - just log
//       if (isCurrentlySelected) {
//         console.log('✅ Question already selected - maintaining selection');
//         return; // Don't remove, just exit
//       }

//       // If not currently selected, add it
//       console.log('➕ Adding new question to selection');

//       // Add to local state
//       setSelectedMap(prev => ({
//         ...prev,
//         [id]: true
//       }));

//       // Add to question numbers if valid
//       if (Number.isFinite(questionNum)) {
//         setQuestionNumber(prev => ({
//           ...prev,
//           [questionNum]: true
//         }));
//       }

//       // Add to Redux (if you're tracking selections there too)
//       // dispatch(addPDFQuestions([{ id, questionNum }]));

//       console.log('✅ New question added to selection');
//     },
//     [selectedMap, setSelectedMap, setQuestionNumber]
//   );

//   const renderItem = useCallback(({ item, index }: { item: Question; index: number }) => {
//     const isLocallySelected = !!selectedMap[item?.question_id];

//     // // ✅ FIXED: Remove .questions from here too
//     const isInRedux = selectedQuestions?.some((q: any) => q?.question_id === item?.question_id);
//     const isSelected = isLocallySelected || isInRedux;
//     const langthList = index === questionsData?.length - 1;
//     // console.log(`Question ${item.question_id}: local=${isLocallySelected}, redux=${isInRedux}, selected=${isSelected}`);
//     // const isLocallySelected = !!selectedMap[item?.question_id];
//     // // Check if it's pre-selected from props
//     // const isPreSelected = selectedQuestions?.some((q: any) => q?.question_id === item?.question_id);
//     // // Combine both checks
//     // const isSelected = isLocallySelected || isPreSelected;
//     // const langthList = index === questionsData?.length - 1;
//     // console.log(`Question ${item.question_id}: local=${isLocallySelected}, pre=${isPreSelected}, selected=${isSelected}`);
//     return (
//       <QuestionItem
//         item={item}
//         index={index}
//         isSelected={isSelected}
//         selectCheck={selectCheck}
//         onToggle={toggleSelect}
//         extractImages={extractBase64Images}
//         listottomLineHide={langthList}
//         currentPage={currentPage}
//         limit={limit}
//         onInfoPress={openMediaPicker}
//         hideContant={hideContant}
//       />
//     );
//   }, [selectedMap, selectedQuestions, selectCheck, toggleSelect,
//     extractBase64Images, currentPage, limit, openMediaPicker, hideContant, questionsData])

//   const keyExtractor = useCallback((item: Question) => item.question_id, []);
//   const extraData = useMemo(() => ({
//     selectedMap,
//     selectCheck,
//     length: questionsData.length,
//   }), [selectedMap, selectCheck, questionsData.length]);



//   // Shimmer key extractor
//   const shimmerKeyExtractor = useCallback((_: any, index: number) => `shimmer-${index}`, []);

//   if (isLoading) {
//     return (
//       <View style={styles.container}>
//         <FlatList
//           data={Array(5).fill({})} // 5 shimmer items
//           keyExtractor={shimmerKeyExtractor}
//           renderItem={renderShimmerItem}
//           initialNumToRender={3}
//           maxToRenderPerBatch={5}
//           windowSize={21}
//           removeClippedSubviews={false}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.listContent}
//         />
//       </View>
//     );
//   }
//   if (!questionsData || questionsData.length === 0) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Text style={styles.emptyText}>No questions available</Text>
//       </View>
//     );
//   }
//   const cameraOptions = {
//     mediaType: 'photo',
//     cameraType: 'back', // or 'front'
//     saveToPhotos: true,
//     quality: 0.8,
//   };

//   const galleryOptions = {
//     mediaType: 'photo',
//     selectionLimit: 1, // single image
//   };
//   const requestCameraPermission = async () => {
//     if (Platform.OS !== 'android') return true;

//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       {
//         title: 'Camera Permission',
//         message: 'App needs camera access to take photos',
//         buttonPositive: 'OK',
//         buttonNegative: 'Cancel',
//       }
//     );

//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   };

//   const openCamera = async () => {
//     setOpenPicker(false);

//     const hasPermission = await requestCameraPermission();
//     if (!hasPermission) {
//       console.log('Camera permission denied');
//       return;
//     }
//     const result = await launchCamera({
//       mediaType: 'photo',
//       cameraType: 'back',
//       saveToPhotos: true,
//       quality: 0.8,
//     });

//     if (result.didCancel) return;
//     if (result.errorCode) {
//       console.log('Camera Error:', result.errorCode, result.errorMessage);
//       return;
//     }

//     const photo = result.assets?.[0];
//     console.log('Camera image:', photo);
//   };

//   const openGallery = async () => {
//     setOpenPicker(false);

//     const result = await launchImageLibrary(galleryOptions);

//     if (result.didCancel) return;
//     if (result.errorCode) {
//       console.log('Gallery Error:', result.errorMessage);
//       return;
//     }
//     const image = result.assets?.[0];
//     console.log('Gallery image:', image);
//     // 👉 Use image.uri for preview / upload
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={questionsData}
//         keyExtractor={keyExtractor}
//         renderItem={renderItem}
//         extraData={extraData}
//         initialNumToRender={3}
//         maxToRenderPerBatch={5}
//         windowSize={21}
//         removeClippedSubviews={false}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.listContent}
//       />
//     </View>
//   );
// };
// export default memo(PDFPreviewListComponent);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9fafb',
//     marginHorizontal: 0,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: moderateScale(100),
//   },
//   emptyText: {
//     fontSize: moderateScale(16),
//     fontFamily: Fonts.InstrumentSansMedium,
//     color: Colors.gray,
//   },
//   listContent: {
//     paddingVertical: moderateScale(8),
//     // borderWidth:1,
//     marginBottom:moderateScale(100)
//     // marginTop:moderateScale(-30)
//   },
//   card: {
//     // backgroundColor: 'red',
//     backgroundColor: '#f9fafb',
//     // marginHorizontal: 0,
//     flex: 1,
//     paddingBottom: moderateScale(6),
//     paddingTop: moderateScale(6),
//     paddingHorizontal: moderateScale(12),
//     // paddingVertical: moderateScale(10)
//   },
//   cardSelected: {
//     backgroundColor: '#EBF6FF'
//   },
//   questionRow: {
//     flexDirection: 'row',
//     marginBottom: moderateScale(10),

//   },
//   questionNumber: {
//     fontSize: moderateScale(12),
//     fontFamily: Fonts.InstrumentSansMedium,
//     color: Colors.black,
//     // textAlignVertical: 'top'
//   },
//   questionContent: {
//     flex: 1,
//     marginBottom: moderateScale(10),
//     // borderWidth: 1
//   },
//   mathJaxWrapper: {
//     paddingVertical: moderateScale(1),
//     marginBottom: moderateScale(8)
//   },
//   questionText: {
//     fontSize: moderateScale(10),
//     fontFamily: Fonts.InstrumentSansMedium,
//     color: Colors.black,
//     marginTop: moderateScale(1)
//   },
//   questionMathJax: {
//     fontSize: moderateScale(10),
//     fontFamily: Fonts.InstrumentSansMedium,
//     color: Colors.black,
//     // alignSelf: 'stretch', // ✅ important
//     width: '100%',
//     minHeight: moderateScale(20), // prevents collapse
//     // borderWidth:1
//   },
//   selectedText: {
//     backgroundColor: 'transparent',
//   },
//   imagesWithText: {
//     // marginTop: moderateScale(12),

//   },
//   questionImage: {
//     width: '100%',
//     height: moderateScale(40),
//     maxHeight: verticalScale(250),
//     borderRadius: moderateScale(2),
//     backgroundColor: Colors?.white,
//     alignSelf: 'center',
//     resizeMode: "contain",
//   },
//   optionsGrid: {
//     // Your options grid styles
//   },
//   optionContainer: {
//     marginBottom: moderateScale(8),
//     backgroundColor: Colors.white,
//     borderRadius: moderateScale(4),
//     paddingVertical: moderateScale(.2),
//     //  borderWidth: 1,
//     // borderColor: 'green'
//   },
//   correctOptionContainer: {
//     borderWidth: 1,
//     borderColor: 'rgba(12, 64, 111, 0.12)',
//     flexDirection: 'row'
//   },
//   imageStyle: {
//     flexDirection: 'column'
//   },
//   correctOptionLabel: {
//     borderColor: '#1E88E5',
//     borderWidth: 1.4
//   },
//   optionLabel: {
//     fontSize: moderateScale(9),
//     fontFamily: Fonts.InstrumentSansMedium,
//     color: Colors.black
//   },
//   correctOptionText: {
//     color: Colors?.white,
//     fontFamily: Fonts.InstrumentSansSemiBold,
//   },
//   correctOptionBgColor: {
//     backgroundColor: Colors?.questionSelect,
//   },
//   optionTextContainer: {
//     flex: 1,
//     marginLeft: moderateScale(3),
//     justifyContent: 'center', 
//   },
//   optionTextWithImages: {
//     marginTop: moderateScale(4),
//   },
//   optionText: {
//     fontSize: moderateScale(10),
//     fontFamily: Fonts.InstrumentSansMedium,
//     color: Colors.black,
//     lineHeight: moderateScale(16)
//   },
//   optionMathJax: {
//     fontSize: moderateScale(10),
//     fontFamily: Fonts.InstrumentSansMedium,
//     color: Colors.black,
//     borderWidth: 1
//   },
//   checkBox: {
//     width: moderateScale(17),
//     height: moderateScale(17),
//     borderRadius: moderateScale(5),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: moderateScale(3),
//   },
//   checkBoxDefault: {
//     backgroundColor: Colors.white,
//     borderWidth: 1.5,
//     borderColor: Colors?.InputStroke,
//     marginRight: moderateScale(3),
//   },
//   checkBoxSelected: {
//     backgroundColor: '#1E88E5',
//     borderWidth: 0,
//   },
//   solutionWrapper: {
//     marginTop: moderateScale(6),
//     overflow: 'visible',
//   },
//   questionNumberContainer: {
//     alignItems: 'flex-start',
//     flexDirection: "column",
//     height: moderateScale(50),
//     marginTop: moderateScale(6),
//     paddingLeft: moderateScale(4)
//   },
//   cardMainBox: {
//     elevation: 30,
//     marginVertical: moderateScale(1),
//     shadowColor: 'rgba(0, 140, 227, 1)',
//     backgroundColor: '#f9fafb'
//   },
//   solutionBox: {
//     backgroundColor: Colors.white,
//     borderRadius: moderateScale(6),
//   },
//   solutionTitle: {
//     fontSize: moderateScale(13),
//     fontFamily: Fonts.InstrumentSansBold,
//     color: Colors.primaryColor,
//     marginTop: moderateScale(5)
//   },
//   textContainer: {
//     marginLeft: 0
//   },
//   solutionText: {
//     fontSize: moderateScale(13),
//     fontFamily: Fonts.InstrumentSansRegular,
//     color: Colors.black,
//     lineHeight: moderateScale(20),
//     marginLeft: 0
//   },
//   solutionMathJax: {
//     fontSize: moderateScale(13),
//     fontFamily: Fonts.InstrumentSansRegular,
//     color: Colors.black,
//     marginLeft: 0
//   },
//   imagesContainer: {
//     // Images appear right after text
//   },

//   solutionImage: {
//     width: '100%',
//     height: moderateScale(150),
//     maxHeight: moderateScale(200),
//     borderRadius: moderateScale(4),
//     backgroundColor: 'transparent',
//     alignSelf: 'center',
//     marginTop: moderateScale(4),
//     resizeMode: "contain"
//   },
//   answerText: {
//     fontSize: moderateScale(12),
//     fontFamily: Fonts.InstrumentSansSemiBold,
//     color: Colors.black,
//     marginTop: moderateScale(5)
//   },
//   answerLabel: {
//     fontFamily: Fonts.InstrumentSansBold,
//     fontSize: moderateScale(14),
//     color: Colors.green
//   },
//   noSolutionText: {
//     fontSize: moderateScale(13),
//     fontFamily: Fonts.InstrumentSansRegular,
//     color: Colors.gray,
//     fontStyle: 'italic',
//     marginBottom: moderateScale(12),
//   },

//   // ?????????????????????
//   optionContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     // justifyContent:"center",
//     borderRadius: moderateScale(4),
//     // padding: moderateScale(8),
//     paddingHorizontal: moderateScale(8),
//     paddingVertical: moderateScale(1),
//     // borderWidth: 1,
//     // borderColor: 'red',
//   },

//   optionWithImages: {
//     // borderWidth: 1,
//   },

//   /* LEFT ID BOX */
//   optionLabelContainer: {
//     width: moderateScale(22),
//     height: moderateScale(22),
//     borderRadius: moderateScale(16),
//     alignItems: 'center',
//     justifyContent: 'center',
//     // borderWidth:1,
//     // ????,
//     backgroundColor: Colors?.lightThemeBlue,
//     // marginLeft: moderateScale(2)
//   },

//   /* RIGHT IMAGE WRAPPER */
//   optionImagesContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',        // 🔥 allows multiple images
//     marginLeft: moderateScale(10),
//   },

//   /* SINGLE IMAGE */
//   optionImage: {
//     width: moderateScale(130),   // dynamic base size
//     height: moderateScale(90),
//     borderRadius: moderateScale(6),
//   },
//   mainLevelBox: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center"
//   },
//   lebalText: {
//     fontSize: moderateScale(13),
//     color: Colors.InputText,
//     fontFamily: Fonts?.InstrumentSansMedium
//   },
//   infoImg: {
//     width: moderateScale(18),
//     height: moderateScale(18),
//   },

//   // ????????????????????mode
//   sendQuesetionText: {
//     fontSize: moderateScale(18),
//     color: Colors.black,
//     fontFamily: Fonts.InterRegular
//   },
//   uploadBox: {
//     height: scale(100),
//     borderWidth: 1,
//     borderColor: Colors.InputStroke,
//     borderRadius: moderateScale(8),
//     marginTop: moderateScale(8),
//     paddingHorizontal: moderateScale(8),
//     marginHorizontal: moderateScale(1.6)
//   },
//   addBox: {
//     height: moderateScale(30),
//     width: moderateScale(30),
//     borderRadius: moderateScale(40),
//     borderWidth: 1,
//     backgroundColor: Colors.primaryColor,
//     alignItems: 'center',
//     justifyContent: "center"
//   },
//   submitBtn: {
//     width: '90%',
//     borderWidth: 1,
//     backgroundColor: Colors.primaryColor
//   },
//   enterDecInput: {
//     fontSize: moderateScale(16),
//     color: Colors.InputText,
//     fontFamily: Fonts.InterRegular,
//     verticalAlign: 'top',
//     flex: 1,
//     flexWrap: 'wrap',
//     // width:'90%'
//   },
//   mainInputBox: {
//     borderWidth: 1,
//     // paddingVertical: moderateScale(.1),
//     // minHeight:moderateScale(10),
//     height: moderateScale(110),
//     borderColor: Colors.InputStroke,
//     borderRadius: moderateScale(6),
//     marginTop: moderateScale(10),
//     paddingHorizontal: moderateScale(5)
//     // marginHorizontal:moderateScale(1.6)
//   },
//   lineBox: {
//     height: 1,
//     width: '100%',
//     backgroundColor: Colors.InputStroke,
//     marginVertical: moderateScale(24)
//   },
//   sendMainBox: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: "center",
//     marginHorizontal: moderateScale(4)
//   },
//   // Shimmer Styles
//   shimmerContainer: {
//     backgroundColor: '#f9fafb',
//     marginVertical: moderateScale(8),
//     padding: moderateScale(12),
//     borderRadius: moderateScale(4),
//   },
//   shimmerRow: {
//     flexDirection: 'row',
//     marginBottom: moderateScale(10),
//   },
//   shimmerNumber: {
//     width: moderateScale(30),
//     height: moderateScale(30),
//     backgroundColor: '#e0e0e0',
//     borderRadius: moderateScale(20),
//     marginRight: moderateScale(3),
//     // borderWidth:1
//   },
//   shimmerContent: {
//     flex: 1,
//   },
//   shimmerQuestionText: {
//     height: moderateScale(16),
//     backgroundColor: '#e0e0e0',
//     borderRadius: moderateScale(2),
//     marginBottom: moderateScale(8),
//     width: '94%',
//   },
//   shimmerQuestionTextShort: {
//     height: moderateScale(16),
//     backgroundColor: '#e0e0e0',
//     borderRadius: moderateScale(2),
//     width: '60%',

//   },
//   shimmerOptionsGrid: {
//     marginBottom: moderateScale(12),
//   },
//   shimmerOptionContainer: {
//     flexDirection: 'row',
//     marginBottom: moderateScale(8),
//     alignItems: 'center',
//   },
//   shimmerOptionLabel: {
//     width: moderateScale(24),
//     height: moderateScale(24),
//     backgroundColor: '#e0e0e0',
//     borderRadius: moderateScale(12),
//     marginRight: moderateScale(8),
//   },
//   shimmerOptionText: {
//     height: moderateScale(30),
//     backgroundColor: '#e0e0e0',
//     borderRadius: moderateScale(2),
//     flex: 1,
//   },
//   shimmerLevelContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   shimmerLevelText: {
//     height: moderateScale(12),
//     width: moderateScale(80),
//     backgroundColor: '#e0e0e0',
//     borderRadius: moderateScale(2),
//   },
// });



// import React from 'react';
// import { Text, View, StyleSheet } from 'react-native';

// export type PDFPreviewListComponentProps = {

//   }


// const PDFPreviewListComponent = (props: PDFPreviewListComponentProps) => {
//   return (
//     <View style={styles.container}>
//       <Text>PDFPreviewListComponent component</Text>
//     </View>
//   )
// }

// export default PDFPreviewListComponent

// const styles = StyleSheet.create({
//   container:{

//   }
// })


// //  ************************************** new redux implementst
// import React, { memo, useCallback, useMemo, useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   ActivityIndicator,
//   Image,
//   Text,
//   TouchableOpacity,
// } from 'react-native';
// import { useDispatch } from 'react-redux';
// import { removePDFQuestions } from '../../../../redux/slices/pdfQuestionsSlice';
// import { Colors, Fonts } from '../../../../theme';
// import { moderateScale } from '../../../../utils/responsiveSize';
// import { Icons } from '../../../../assets/icons';
// import MathRenderer from '../../../papermodule/questionModule/component/questionlist/MathRenderer';
// import UploadErrorModal from '../../../papermodule/questionModule/component/UploadErrorModal';
// import AppModal from '../../../../component/modal/AppModal';

// export type Question = {
//   question_id: string;
//   question_text: string;
//   option_a: string;
//   option_b: string;
//   option_c: string;
//   option_d: string;
//   correct_option: string;
//   explanation: string;
//   dlevel_name: string
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
//   questionNumber: Record<string, boolean>;
//   setQuestionNumber: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;

//   selectedQuestions: any[];      // Redux selected
//   onEndReached: () => void
//   onScrollDirection?: (direction: 'up' | 'down') => void;  // ✅ ADD THIS

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
// const PDFPreviewListComponent: React.FC<Props> = ({
//   selectCheck,
//   questionsData,
//   currentPage,
//   limit,
//   isLoading,
//   onInfoPress,

//   // 
//   selectedMap,
//   setSelectedMap,
//   setQuestionNumber,
//   questionNumber,
//   selectedQuestions,
//   onEndReached,

// }) => {
//   const dispatch = useDispatch();
//   const webViewRef = React.useRef<any>(null);
//   const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
//   const [openPicker, setOpenPicker] = useState<boolean>(false);
//   const [isRemoveModalOpen, setIsRemoveModalOpen] = useState<boolean>(false)
//   const [removeTarget, setRemoveTarget] = useState<{
//     id: string;
//     questionNum: number;
//   } | null>(null);
//   const handleCloseModal = () => {
//     setOpenPicker(false)
//   }
//   const handleRemoveModalClose = () => {
//     setIsRemoveModalOpen(false)
//   }
//   const handleRemoveModalOpen = () => {
//     setIsRemoveModalOpen(true)
//   }
//   const handleConfirmRemove = () => {
//     if (!removeTarget) return;

//     const { id, questionNum } = removeTarget;

//     dispatch(removePDFQuestions([id]));

//     setSelectedMap(prev => {
//       const newMap = { ...prev };
//       delete newMap[id];
//       return newMap;
//     });

//     setQuestionNumber(prev => {
//       const newNum = { ...prev };
//       delete newNum[questionNum];
//       return newNum;
//     });

//     webViewRef.current?.injectJavaScript(
//       `window.updateCardUI('${id}', false); true;`
//     );

//     setRemoveTarget(null);
//     setIsRemoveModalOpen(false);
//   };
//   // console.log('selectedIds', selectedIds);

//   const openMediaPicker = useCallback(() => {
//     setOpenPicker(true);
//   }, []);
//   const toggleSelection = useCallback((id: string, questionNum: number) => {

//     const isPreSaved = selectedQuestions?.some(
//       (q: any) => q?.question_id === id
//     );

//     // ✅ ONLY REDUX ITEMS OPEN MODAL
//     if (isPreSaved) {
//       setRemoveTarget({ id, questionNum });
//       handleRemoveModalOpen();
//       return;
//     }

//     // 🟢 NORMAL TOGGLE (Local Only)
//     setSelectedMap(prev => {
//       const newMap = { ...prev };
//       const isNowSelected = !newMap[id];

//       if (newMap[id]) delete newMap[id];
//       else newMap[id] = true;

//       webViewRef.current?.injectJavaScript(
//         `window.updateCardUI('${id}', ${isNowSelected}); true;`
//       );

//       return newMap;
//     });

//     setQuestionNumber(prev => {
//       const newNum = { ...prev };
//       if (newNum[questionNum]) delete newNum[questionNum];
//       else newNum[questionNum] = true;
//       return newNum;
//     });

//   }, [selectedQuestions, setSelectedMap, setQuestionNumber, dispatch]);
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
//     return questionsData?.map((item, index) => {
//       const questionNumber = (currentPage - 1) * limit + index + 1;
//       // const isSelected = selectedIds.has(item.question_id); // Check initial state
//       const isSelected = !!selectedMap[item.question_id] ||
//         selectedQuestions?.some((q: any) => q?.question_id === item.question_id);
//       const labelColorStatus = (level) => {
//         if (level === 'Easy') return Colors.primaryColor;
//         if (level === 'Hard') return Colors.red;
//         if (level === 'Medium') return Colors.green;
//         return Colors.black;
//       };

//       // const getOptionStatus = (optionLetter: string, correctOption: string): string => {
//       //   if (optionLetter === correctOption) {
//       //     console.log('Correct option color:', Colors.green); // Debug line
//       //     return Colors.green; // correct color
//       //   }
//       //   console.log('Incorrect option color: red'); // Debug line
//       //   return '#444444'; // default background
//       // };
//       const getOptionTextStyle = (optionLetter: string, correctOption: string): string => {
//         const isCorrect = optionLetter === correctOption;
//         const color = isCorrect ? Colors.green : '#444444';
//         const fontWeight = isCorrect ? '500' : '400';

//         // Add font-family here
//         return `color: ${color} !important; font-weight: ${fontWeight} !important; font-size : ${moderateScale(13)}px !important; font-family: 'Inter' !important;`;
//       };

//       const getOptionContainerBg = (optionLetter: string, correctOption: string): string => {
//         if (optionLetter === correctOption) {
//           return '#dceedc'; // correct color
//         }
//         return `${Colors.blackGray}`; // default background
//       };
//       // ${selectCheck === 'Solutions' ? `style="color: ${item?.correct_option === 'A' ? Colors.white : Colors.white}"` : ''}
//       // ${selectCheck === 'Solutions' ? `style="color: ${item?.correct_option === 'B' ? Colors.white : Colors.white}"` : ''}
//       //  ${selectCheck === 'Solutions' ? `style="color: ${item?.correct_option === 'C' ? Colors.white : Colors.white}"` : ''} 
//       // ${selectCheck === 'Solutions' ? `style="color: ${item?.correct_option === 'D' ? Colors.white : Colors.white}"` : ''}
//       // Inside your .map() function

//       return `
//       <div id="card-${item.question_id}" class="card ${isSelected ? 'selected' : ''}"
//       onclick="toggleCard('${item.question_id}', ${questionNumber})">
//         <div class="checkbox-container">
//         <strong class="questionnptext">${questionNumber}</strong> 
//           <div class="custom-checkbox"></div>
//         </div>
//         <div class="content-container">
//           <div class="question">
//             <span class="qs-text">
//           ${cleanLatex(item.question_text)}
//           </span>
//           </div>

//           <div class="options">
//             <div class="option-inner"  ${selectCheck === 'Solutions' ? `style="background-color:${getOptionContainerBg('A', item.correct_option)}"` : ''}>
//      <div class="option-text-container"  >
//      <strong class="option-number-test">A</strong>            </div> 
// <span class="qs-option-test" style="${selectCheck === 'Solutions' ?
//           getOptionTextStyle('A', item.correct_option)
//           : `color: #444444 !important; font-size : ${moderateScale(13)}px !important; font-family: 'Inter' !important;`}"> 
//  ${cleanLatex(item.option_a)}
// </span>
//             </div>
//             <div class="option-inner"  ${selectCheck === 'Solutions' ? `style="background-color:${getOptionContainerBg('B', item.correct_option)}"` : ''}>
//           <div class="option-text-container" >
//             <strong class="option-number-test" >B</strong></div> 
// <span class="qs-option-test" style="${selectCheck === 'Solutions' ? getOptionTextStyle('B', item.correct_option) : `color: #444444 !important; font-size : ${moderateScale(13)}px !important; font-family: 'Inter' !important;`}"> 
//   ${cleanLatex(item.option_b)}
// </span>
//             </div>
//             <div class="option-inner"  ${selectCheck === 'Solutions' ? `style="background-color:${getOptionContainerBg('C', item.correct_option)}"` : ''}>
//             <div class="option-text-container">
//             <strong class="option-number-test" >C</strong></div> 
// <span class="qs-option-test" style="${selectCheck === 'Solutions'
//           ? getOptionTextStyle('C', item.correct_option)
//           : `color: #444444 !important; font-size : ${moderateScale(13)}px !important; font-family: 'Inter' !important;`}"> 
//   ${cleanLatex(item.option_c)}
// </span>
// </div>
//             <div class="option-inner"  ${selectCheck === 'Solutions' ? `style="background-color:${getOptionContainerBg('D', item.correct_option)}"` : ''}>
//               <div class="option-text-container" >
//             <strong class="option-number-test" >D</strong></div> 
// <span class="qs-option-test" style="${selectCheck === 'Solutions' ? getOptionTextStyle('D', item.correct_option) : `color: #444444 !important; font-size : ${moderateScale(13)}px !important; font-family: 'Inter' !important;`}">  
//   ${cleanLatex(item.option_d)}
// </span>
//             </div>

//           </div>

//           <span class="lebal-test">Lebel:</span>
// <strong style="color:${labelColorStatus(item?.dlevel_name)};font-size:${moderateScale(13)}px; font-family:'Inter'">
//   ${item?.dlevel_name}
// </strong>
//       ${selectCheck === 'Solutions' ? `
//     <div class="solution">
//     <div class="solution-header"> 
//      <span class="solution-label">Solution:</span>
// </div>
//    <div class="solution-content">
//     ${item.explanation
//             ? cleanLatex(item.explanation)
//             : `<span class="solution-label">Solution:</span> No explanation available.`
//           }
//   </div>

//     <div class="answer-key">
//       <div class="answer-content">
//         <span class="answer-text">Answer:</span> 
//         <strong class="option-text">${item.correct_option?.toUpperCase()}</strong>
//       </div>

//       <a 
//         href="javascript:void(0)" 
//         style="text-decoration: none; -webkit-tap-highlight-color: transparent;" 
//         onclick="event.stopPropagation(); window.ReactNativeWebView.postMessage('openMediaPicker');"

//         >
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
//         isLoading={isLoading}
//       />

//       <UploadErrorModal
//         visible={openPicker}
//         onClose={handleCloseModal}
//       />

//       <AppModal
//         onClose={handleRemoveModalClose}
//         visible={isRemoveModalOpen}
//         animationType="fade"
//         overlayStyle={styles.overlayStyle}
//         containerStyle={styles.modalContainer}>
//         <Text style={styles.areYouText}>Are you sure you want to remove{'\n'} this question?</Text>
//         <View style={styles.cancelBox}>
//           <TouchableOpacity onPress={handleRemoveModalClose}>
//             <Text style={[styles.removeText, { marginRight: moderateScale(30) }]}>No</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleConfirmRemove}>
//             <Text style={styles.removeText} >Yes</Text>
//           </TouchableOpacity>
//         </View>
//       </AppModal>

//     </View>
//   );
// };

// export default memo(PDFPreviewListComponent);
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.white,
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

//   removeText: {
//     fontSize: moderateScale(18),
//     color: Colors.primaryColor,
//     fontFamily: Fonts.InstrumentSansSemiBold,
//     marginRight: moderateScale(20)
//   },
//   cancelBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     marginTop: moderateScale(20)
//   },
//   areYouText: {
//     fontSize: moderateScale(16),
//     color: '#656565',
//     fontFamily: Fonts.InstrumentSansMedium
//   },

//   // modal
//   modalContainer: {
//     padding: moderateScale(30),
//     marginHorizontal: moderateScale(30),
//     borderRadius: moderateScale(6),
//     borderTopLeftRadius: moderateScale(6),
//     borderTopRightRadius: moderateScale(6),
//   },
//   overlayStyle: {
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center'
//   }
// });




import React, { useEffect, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import MathRenderer from "./MathRenderer";
import { Colors, Fonts } from "../../../../theme";
import { localStorage, storageKeys } from "../../../../storage/storage";
import { moderateScale } from "../../../../utils/responsiveSize";
// Example logic (do this before setting previewData)
import RNFS from 'react-native-fs';
type Question = {
  question_id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  explanation?: string;
  correct_option?: string;
};

type Props = {
  questionsData: Question[];
  selectCheck: "Options" | "Solutions";
  selectedMap: Record<string, boolean>;
  setSelectedMap: any;
  questionNumber: Record<string, boolean>;
  setQuestionNumber: any;
  currentPage: number;
  limit: number;
  previewData: any
};

const PDFPreviewListComponent: React.FC<Props> = ({
  questionsData = [],
  selectCheck,
  selectedMap,
  setSelectedMap,
  questionNumber,
  setQuestionNumber,
  currentPage,
  limit,
  previewData
}) => {

  console.log('previewdata', previewData);

  const webViewRef = React.useRef<any>(null);
  const [subName, setSubName] = useState('');
  const base64Logo = RNFS.readFile(previewData.logoUri, 'base64');
  const webSafeUri = `data:image/jpeg;base64,${base64Logo}`;
  const handleToggle = (id: string, questionNum: number) => {
    setSelectedMap((prev: any) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


  const [webViewHeight, setWebViewHeight] = React.useState(500);

  const handleMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);

    if (data.type === 'setHeight') {
      // Set the container height based on WebView content
      setWebViewHeight(data.height);
    } else if (data.type === 'toggle') {
      setSelectedMap((prev: any) => ({
        ...prev,
        [data.id]: !prev[data.id],
      }));
    }
  };
  // const htmlContent = useMemo(() => {


  //   // Add CSS styles here
  //   const styles = `
  //     <style>
  //       * {
  //         margin: 0;
  //         padding: 0;
  //         box-sizing: border-box;
  //       }

  //       body {
  //         background-color: white;
  //         padding: 10px;
  //       }

  //       .card {
  //         border-bottom: 1px solid ${Colors.primaryColor};
  //         padding: 12px;
  //         background-color: #ffffff;
  //         display: flex;
  //         flex-direction: row;
  //       }

  //       .checkbox-container {
  //         width: 30px;
  //         margin-right: 10px;
  //       }

  //       .custom-checkbox {
  //         width: 20px;
  //         height: 20px;
  //         border: 2px solid #007AFF;
  //         border-radius: 4px;
  //       }

  //       .content-container {
  //         flex: 1;
  //       }

  //       .question {
  //         margin-bottom: 12px;
  //         font-size: 14px;
  //         line-height: 1.5;
  //         color: #333;
  //       }

  //       .questionnptext {
  //         font-weight: bold;
  //         margin-right: 5px;
  //         color: #000;
  //       }

  //       .qs-text {
  //         color: #333;
  //       }

  //       .options {
  //         margin-top: 8px;
  //       }

  //       .option-inner {
  //         flex-direction: row;
  //         align-items: flex-start;
  //         margin-bottom: 8px;
  //         padding: 4px 0;
  //       }

  //       .option-text-container {
  //         width: 25px;
  //         margin-right: 8px;
  //       }

  //       .option-number-test {
  //         font-weight: bold;
  //         color: #555;
  //         font-size: 14px;
  //       }

  //       .qs-option-text {
  //         flex: 1;
  //         font-size: 14px;
  //         color: #444;
  //         line-height: 1.4;
  //       }

  //       /* Selected state */
  //       .card.selected {
  //         background-color: #e6f2ff;
  //         border-color: #007AFF;
  //       }

  //       .card.selected .custom-checkbox {
  //         background-color: #007AFF;
  //         border-color: #007AFF;
  //       }

  //       /* Make text readable */
  //       p, span, div {
  //         font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  //       }
  //     </style>
  //   `;

  //   const questionsHtml = questionsData
  //     .map((q, index) => {
  //       // const qNum = (currentPage - 1) * limit + index + 1;
  //       const qNum = index + 1;
  //       const isSelected = selectedMap[q.question_id] ? 'selected' : '';
  //       return `
  //         <div class="card ${isSelected}" id="card-${q.question_id}" onclick="toggleCard('${q.question_id}', ${qNum})">

  //           <div class="content-container">
  //             <div class="question">
  //               <span class="questionnptext">${qNum}.</span>
  //               <span class="qs-text">${q.question_text || ""}</span>
  //             </div>

  //             </div>
  //           </div>
  //         </div>
  //       `;
  //     })
  //     .join("");

  //   // Add JavaScript for toggle functionality
  //   const script = `
  //     <script>
  //       function toggleCard(id, qNum) {
  //         const card = document.getElementById('card-' + id);
  //         card.classList.toggle('selected');
  //         if (window.ReactNativeWebView) {
  //           window.ReactNativeWebView.postMessage(JSON.stringify({
  //             type: 'toggle',
  //             id: id,
  //             questionNum: qNum
  //           }));
  //         }
  //       }
  //     </script>
  //   `;

  //   return `
  //     <html>
  //       <head>
  //         <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0">
  //         ${styles}
  //       </head>
  //       <body>
  //         ${questionsHtml}
  //         ${script}
  //       </body>
  //     </html>
  //   `;
  // }, [questionsData, currentPage, limit, selectedMap]);

  /* border: ${previewData?.borderType === '1' ? '.5px solid black' : 'none'}; */

  useEffect(() => {
    const loadSubject = async () => {
      const subject = await localStorage.getItem(storageKeys.selectedSubject);
      setSubName(subject || '');
    };
    loadSubject();
  }, []);
  const htmlContent = useMemo(() => {
    // 1. Define the Styles (including Header styles)
    const styles = `
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { background-color: white; font-family: sans-serif; 
      }
      
      /* Header Styles */
      .paper-header { text-align: center; padding: 0px ${moderateScale(8)}px;  margin-bottom: ${moderateScale(0)}px;}
.logo-container { 
  width: 100%; 
  display: flex; 
  justify-content: center; 
  margin-bottom: 8px;
}      .logo-img { width: 300px; height: ${moderateScale(85)}px; object-fit: cover; }
      .institute-name { font-size: 18px; font-weight: bold; margin-bottom: 2px; }
      .test-name {      
       font-size: ${moderateScale(10)}px;
       margin-top: ${moderateScale(2)}px;
      color: ${Colors.black};
      font-family: ${Fonts.InterRegular} ; margin-bottom:${moderateScale(4)}px; }
      .meta-row { display: flex; justify-content: space-between; padding: 0 ${moderateScale(5)}px; font-size: 11px; margin-bottom: ${moderateScale(5)}px; }
      .line-box { height: 1.5px; background-color: black; width: 96%; margin: 5px ${moderateScale(6)}px; }
      .section-box { 
       display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #000;
            background-color: white;
            padding: 5px ${moderateScale(10)}px;
            margin: 5px ${moderateScale(6)}px;
            font-size: ${moderateScale(14)}px;
      }

      /* Question Styles */
      .card { border-bottom: 1px solid ${Colors.primaryColor}; padding: 12px; display: flex; }
      .question { font-size: 14px; line-height: 1.5; color: #333; }
      .questionnptext { font-weight: bold; margin-right: 5px; }
      .card.selected { background-color: #e6f2ff; }
    </style>
  `;

    // 2. Generate the Header HTML
    const headerHtml = `
    <div class="paper-header">
  ${previewData?.logoUri ? `
  <div class="logo-container">  
    <img src="${webSafeUri}" class="logo-img" />
  </div>
` : ''}
      <div class="institute-name">${previewData?.instituteName || ''}</div>
      <div class="test-name">${previewData?.testName || ''}</div>
      
      <div class="meta-row" >
        <span class="subject-test">Subject: ${previewData?.subjectName || ''}</span>
        <span  class="subject-test">Date: ${previewData?.date || ''}</span>
      </div>
      <div class="meta-row" style="margin-bottom: ${moderateScale(10)}px">
        <span  class="subject-test">Total Marks: ${previewData?.dropDownValue || ''}</span>
        <span  class="subject-test">Time: 3 Hours</span>
      </div>

      <div class="line-box"></div>
      <div class="section-box">
       <span class="section-subject-test">
        ${subName || ''} - Section ${previewData?.questionType || ''} (MCQ)
       </span>

      </div>
      <div class="line-box"></div>
    </div>
  `;

    // 3. Generate Questions HTML
    const questionsHtml = questionsData
      .map((q, index) => {
        const qNum = index + 1;
        const isSelected = selectedMap[q.question_id] ? 'selected' : '';
        return `
        <div class="card ${isSelected}" id="card-${q.question_id}" onclick="toggleCard('${q.question_id}', ${qNum})">
          <div class="question">
            <span class="questionnptext">${qNum}.</span>
            <span class="qs-text">${q.question_text || ""}</span>
          </div>
        </div>
      `;
      })
      .join("");

    const script = `
    <script>
      function toggleCard(id, qNum) {
        const card = document.getElementById('card-' + id);
        card.classList.toggle('selected');
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'toggle',
            id: id,
            questionNum: qNum
          }));
        }
      }
    </script>
  `;

    return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${styles}
      </head>
      <body>
        ${headerHtml}
        ${questionsHtml}
        ${script}
      </body>
    </html>
  `;
  }, [questionsData, selectedMap, previewData]);
  return (
    <View style={{ flex: 1, minHeight: 500 }}>
      <MathRenderer
        content={htmlContent}
        // onToggleSelection={handleToggle}
        webViewRef={webViewRef}
        isLoading={false}
      />
    </View>
  );
};

export default PDFPreviewListComponent;

