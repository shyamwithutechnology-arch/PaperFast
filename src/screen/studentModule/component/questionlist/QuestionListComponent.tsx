// import React, { memo, useCallback, useMemo, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Image,
//   Dimensions,
//   Pressable,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import MathJax from 'react-native-mathjax';
// import { Colors, Fonts } from '../../../../theme';
// import { moderateScale, verticalScale } from '../../../../utils/responsiveSize';
// import { useNavigation } from '@react-navigation/native';

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
// }

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

// type Props = {
//   selectCheck: 'Options' | 'Solutions';
//   selectedMap: Record<string, boolean>;
//   setSelectedMap: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
//   questionsData: Question[];
//   currentPage: number,
//   limit: number;

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
// export const OptionItem = memo(({
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

//   const formattedOptionText = useMemo(() => {
//     return `
//     <div style="
//       font-size: 11px;
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
//     ]}>
//       {hasImages &&
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
//               ]}>
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
//         </View>}

//       {hasText &&
//         <View style={[styles.optionContent, { paddingVertical: moderateScale(0) }]}>
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
//         </View>
//       }
//     </View>
//   );
// });

// OptionItem.displayName = 'OptionItem';

// // Memoized Question Content Component
// export const QuestionContent = memo(({
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
//     font-size: ${moderateScale(12)}px;
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
//           isSelected && { backgroundColor: '#EBF6FF' }
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

// export const SolutionView = memo(({
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
// }: {
//   item: Question;
//   index: number;
//   isSelected: boolean;
//   selectCheck: 'Options' | 'Solutions';
//   onToggle: (id: string) => void;
//   extractImages: (html: string) => string[];
//   listottomLineHide: any,
//   currentPage: number;
//   limit: number;
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
//   return (
//     <Pressable
//       style={[styles.cardMainBox, isSelected && styles.cardSelected,
//       { flexDirection: "row", paddingLeft: moderateScale(3) }]}
//       onPress={() => onToggle(item.question_id)}>
//       <View style={[styles.questionNumberContainer, {}]}>
//         <Text style={styles.questionNumber}>
//           {'  '}{questionNumber}.
//         </Text>
//         <View style={[
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
//         </View>
//       </View>
//       <View style={[styles.card, isSelected && styles.cardSelected,]}>
//         <QuestionContent
//           text={questionTextWithoutImages}
//           images={images}
//           isSelected={isSelected}
//         />
//       </View>
//     </Pressable>
//   );
// });

// // Main Component
// const QuestionListComponent: React.FC<Props> = ({
//   selectCheck,
//   selectedMap,
//   setSelectedMap,
//   questionsData,
//   currentPage,
//   limit,
// }) => {
//   const navigation = useNavigation()
//   const extractBase64Images = useCallback((html: string): string[] => {
//     const imgRegex = /<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/g;
//     const images: string[] = [];
//     let match;
//     while ((match = imgRegex.exec(html || '')) !== null) {
//       images.push(match[1]);
//     }
//     return images;
//   }, []);

//   // const toggleSelect = useCallback((id: string) => {
//   //   setSelectedMap(prev => {
//   //     // const newMap = { ...prev };
//   //     // if (newMap[id]) {
//   //     //   delete newMap[id];
//   //     // } else {
//   //     //   newMap[id] = true;
//   //     // }
//   //     // return newMap;
//   //     // Create empty object (deselect all)
//   //     const newMap = {};
//   //     // If the clicked item is not already selected, select it
//   //     if (!prev[id]) {
//   //       newMap[id] = true;
//   //     }
//   //     return newMap;
//   //   });
//   //   // setSelectedMap([id])
//   //   navigation.navigate('OpenQuestionScreen')

//   // }, [setSelectedMap]);

//   const toggleSelect = useCallback((id: string) => {
//     // Update selected map
//     setSelectedMap(prev => {
//       const newMap = {};
//       if (!prev[id]) {
//         newMap[id] = true;
//       }
//       return newMap;
//     });

//     // Navigate to OpenQuestionScreen with all data
//     navigation.navigate('OpenQuestionScreen', {
//       questions: questionsData,
//       currentIndex: questionsData.findIndex(q => q.question_id === id),
//       totalQuestions: questionsData.length,
//       selectedMap: { ...selectedMap, [id]: true },
//       onQuestionChange: (newIndex: number) => {
//         // This will be handled in OpenQuestionScreen
//       },
//       selectCheck: selectCheck
//     });
//   }, [setSelectedMap, navigation, questionsData, selectedMap, selectCheck]);
//   const renderItem = useCallback(({ item, index }: { item: Question; index: number }) => {
//     const isSelected = !!selectedMap[item.question_id];
//     let langthList = index === questionsData?.length - 1;
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
//       />
//     );
//   }, [selectedMap, selectCheck, toggleSelect, extractBase64Images, currentPage, limit]);

//   const keyExtractor = useCallback((item: Question) => item.question_id, []);

//   const extraData = useMemo(() => ({
//     selectedMap,
//     selectCheck
//   }), [selectedMap, selectCheck]);

//   if (!questionsData || questionsData.length === 0) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Text style={styles.emptyText}>No questions available</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={questionsData}
//         keyExtractor={keyExtractor}
//         renderItem={renderItem}
//         extraData={extraData}
//         // initialNumToRender={5}
//         // maxToRenderPerBatch={10}
//         // windowSize={10}
//         // removeClippedSubviews={true}
//         initialNumToRender={3}
//         maxToRenderPerBatch={6}
//         windowSize={21}
//         removeClippedSubviews={false}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.listContent}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
// container: {
//   flex: 1,
//   backgroundColor: '#f9fafb',
//   marginHorizontal: 0,
// },
// emptyContainer: {
//   flex: 1,
//   justifyContent: 'center',
//   alignItems: 'center',
//   paddingVertical: moderateScale(100),
// },
// emptyText: {
//   fontSize: moderateScale(16),
//   fontFamily: Fonts.InstrumentSansMedium,
//   color: Colors.gray,
// },
// listContent: {
//   paddingVertical: moderateScale(8),
// },
// card: {
//   // backgroundColor: 'red',
//   backgroundColor: '#f9fafb',
//   // marginHorizontal: 0,
//   flex: 1,
//   paddingBottom: moderateScale(6),
//   paddingTop: moderateScale(6),
//   paddingHorizontal: moderateScale(12),
//   // paddingVertical: moderateScale(10)
// },
// cardSelected: {
//   backgroundColor: '#EBF6FF'
// },
// questionRow: {
//   flexDirection: 'row',
//   marginBottom: moderateScale(10),

// },
// questionNumber: {
//   fontSize: moderateScale(12),
//   fontFamily: Fonts.InstrumentSansMedium,
//   color: Colors.black,
//   // textAlignVertical: 'top'
// },
// questionContent: {
//   flex: 1,
//   marginBottom: moderateScale(10),
//   // borderWidth: 1
// },
// mathJaxWrapper: {
//   // flex: 1,
//   // marginTop: moderateScale(6),
//   // borderWidth: 1,
//   paddingVertical: moderateScale(1),
//   marginBottom: moderateScale(8)
// },
// questionText: {
//   fontSize: moderateScale(14),
//   fontFamily: Fonts.InstrumentSansMedium,
//   color: Colors.black,
//   // borderWidth:1,

//   // lineHeight: moderateScale(18),
//   marginTop: moderateScale(1),
//   // marginLeft:moderateScale(-32)
//   // marginTop:moderateScale(10)

// },
// questionMathJax: {
//   fontSize: moderateScale(12),
//   fontFamily: Fonts.InstrumentSansMedium,
//   color: Colors.black,
//   alignSelf: 'stretch', // ✅ important
//   minHeight: moderateScale(20), // prevents collapse
//   // borderWidth:1
// },
// selectedText: {
//   backgroundColor: 'transparent',
// },
// imagesWithText: {
//   // marginTop: moderateScale(12),

// },
// questionImage: {
//   width: '100%',
//   height: moderateScale(98),
//   maxHeight: verticalScale(250),
//   borderRadius: moderateScale(2),
//   backgroundColor: Colors?.white,
//   alignSelf: 'center',
//   resizeMode: "contain",
// },
// optionsGrid: {
//   // Your options grid styles
// },
// optionContainer: {
//   // flexDirection: 'row',
//   // alignItems: 'flex-start',
//   // justifyContent:"flex-start",
//   marginBottom: moderateScale(8),
//   backgroundColor: Colors.white,
//   borderRadius: moderateScale(4),
//   paddingVertical: moderateScale(.2),
//   //  borderWidth: 1,
//   // borderColor: 'green'
// },
// correctOptionContainer: {
//   borderWidth: 1,
//   borderColor: 'rgba(12, 64, 111, 0.12)',
//   flexDirection: 'row'
// },
// imageStyle: {
//   flexDirection: 'column'
// },
// // optionLabelContainer: {
// // width: moderateScale(28),
// // alignItems: 'center',
// // justifyContent: "center",
// // // justifyContent: 'flex-start',
// // borderRadius: moderateScale(20),
// // // borderColor: '#BFBFBF',
// // // borderWidth: 1,
// // height: moderateScale(28),
// // backgroundColor: Colors?.lightThemeBlue,
// // marginLeft: moderateScale(2)
// // },
// correctOptionLabel: {
//   // backgroundColor: '#4CAF50',
//   borderColor: '#1E88E5',
//   borderWidth: 1.4
// },
// optionLabel: {
//   fontSize: moderateScale(11),
//   fontFamily: Fonts.InstrumentSansMedium,
//   color: Colors.black,
//   // textAlign:'center'
// },
// correctOptionText: {
//   color: Colors?.white,
//   fontFamily: Fonts.InstrumentSansSemiBold,
// },
// correctOptionBgColor: {
//   backgroundColor: Colors?.questionSelect,
// },
// // optionContent: {
// //   flex: 1,
// //   // flexDirection:'row',
// //   // flexDirection: 'row',
// //   // alignItems:"center",
// //   // justifyContent:"flex-start",
// //   // overflow:"hidden"
// //   borderRadius: moderateScale(2),
// //   // borderWidth:1
// // },
// // optionImagesContainer: {
// //   marginBottom: moderateScale(4),
// //   // borderWidth: 1,
// //   justifyContent: "flex-start",
// //   alignItems: 'flex-start',
// //   marginLeft: moderateScale(10)
// // },
// // optionImage: {
// //   width: '100%',
// //   height: '100%',
// //   maxHeight: moderateScale(120),
// //   borderRadius: moderateScale(4),
// //   alignSelf: "flex-start"
// //   // alignSelf: 'flex-start',
// //   // resizeMode: 'contain',
// // },
// optionTextContainer: {
//   // flex: 1,
//   // paddingVertical: moderateScale(.5),
//   // minHeight: moderateScale(40),
//   flex: 1,
//   marginLeft: moderateScale(3),
//   justifyContent: 'center', // ✅ center relative to ID
//   // borderWidth: 1,
//   // borderColor: 'green'
// },
// optionTextWithImages: {
//   marginTop: moderateScale(4),
// },
// optionText: {
//   fontSize: moderateScale(13),
//   fontFamily: Fonts.InstrumentSansMedium,
//   color: Colors.black,
//   lineHeight: moderateScale(16),
//   // marginLeft: moderateScale(5),
//   // borderWidth: 1
// },
// optionMathJax: {
//   fontSize: moderateScale(13),
//   fontFamily: Fonts.InstrumentSansMedium,
//   color: Colors.black,
//   // alignSelf: 'flex-start', 
//   borderWidth: 1
// },
// checkBox: {
//   width: moderateScale(17),
//   height: moderateScale(17),
//   borderRadius: moderateScale(5),
//   justifyContent: 'center',
//   alignItems: 'center',
//   marginRight: moderateScale(3),
// },
// checkBoxDefault: {
//   backgroundColor: Colors.white,
//   borderWidth: 1.5,
//   borderColor: Colors?.InputStroke,
//   marginRight: moderateScale(3),
// },
// checkBoxSelected: {
//   backgroundColor: '#1E88E5',
//   borderWidth: 0,
// },
// solutionWrapper: {
//   marginTop: moderateScale(6),
//   overflow: 'visible',
// },
// questionNumberContainer: {
//   alignItems: 'flex-start',
//   flexDirection: "column",
//   height: moderateScale(50),
//   marginTop: moderateScale(6),
//   paddingLeft: moderateScale(4),
//   // borderWidth:1
// },
// cardMainBox: {
//   elevation: 30,
//   marginVertical: moderateScale(1),
//   shadowColor: 'rgba(0, 140, 227, 1)',
//   // borderRadius:moderateScale(10),
//   backgroundColor: '#f9fafb'
// },
// solutionBox: {
//   backgroundColor: Colors.white,
//   borderRadius: moderateScale(6),
// },
// solutionTitle: {
//   fontSize: moderateScale(12),
//   fontFamily: Fonts.InstrumentSansSemiBold,
//   color: Colors.black,
// },
// textContainer: {
//   marginLeft: 0
// },
// solutionText: {
//   fontSize: moderateScale(13),
//   fontFamily: Fonts.InstrumentSansRegular,
//   color: Colors.black,
//   lineHeight: moderateScale(20),
//   marginLeft: 0
// },
// solutionMathJax: {
//   fontSize: moderateScale(13),
//   fontFamily: Fonts.InstrumentSansRegular,
//   color: Colors.black,
//   marginLeft: 0
// },
// imagesContainer: {
//   // Images appear right after text
// },

// solutionImage: {
//   width: '100%',
//   height: moderateScale(150),
//   maxHeight: moderateScale(200),
//   borderRadius: moderateScale(4),
//   backgroundColor: 'transparent',
//   alignSelf: 'center',
//   marginTop: moderateScale(4),
//   resizeMode: "contain"
// },
// answerText: {
//   fontSize: moderateScale(12),
//   fontFamily: Fonts.InstrumentSansSemiBold,
//   color: Colors.black,
//   marginTop: moderateScale(5)
// },
// answerLabel: {
//   fontFamily: Fonts.InstrumentSansSemiBold,
//   fontSize: moderateScale(12),
//   color: Colors.black
// },
// noSolutionText: {
//   fontSize: moderateScale(13),
//   fontFamily: Fonts.InstrumentSansRegular,
//   color: Colors.gray,
//   fontStyle: 'italic',
//   marginBottom: moderateScale(12),
// },

// // ?????????????????????
// optionContent: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   // justifyContent:"center",
//   borderRadius: moderateScale(4),
//   // padding: moderateScale(8),
//   paddingHorizontal: moderateScale(8),
//   paddingVertical: moderateScale(1),
//   // borderWidth: 1,
//   // borderColor: 'red',
// },

// optionWithImages: {
//   // borderWidth: 1,
// },

// /* LEFT ID BOX */
// optionLabelContainer: {
//   width: moderateScale(26),
//   height: moderateScale(26),
//   borderRadius: moderateScale(16),
//   alignItems: 'center',
//   justifyContent: 'center',
//   // borderWidth:1,
//   // ????,
//   backgroundColor: Colors?.lightThemeBlue,
//   // marginLeft: moderateScale(2)
// },

// /* RIGHT IMAGE WRAPPER */
// optionImagesContainer: {
//   flex: 1,
//   flexDirection: 'row',
//   flexWrap: 'wrap',        // 🔥 allows multiple images
//   marginLeft: moderateScale(10),
//   // gap: moderateScale(8),   // RN 0.71+
//   // borderWidth: 1
// },

// /* SINGLE IMAGE */
// optionImage: {
//   width: moderateScale(130),   // dynamic base size
//   height: moderateScale(90),
//   borderRadius: moderateScale(6),
// },

// });
// export default memo(QuestionListComponent);


// import React, { memo, useCallback, useMemo, useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Image,
//   Dimensions,
//   Pressable,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import IconIonicons from 'react-native-vector-icons/Ionicons';
// import MathJax from 'react-native-mathjax';
// import { Colors, Fonts } from '../../../../theme';
// import { moderateScale, verticalScale } from '../../../../utils/responsiveSize';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import { localStorage } from '../../../../storage/storage';

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
// }

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

// type Props = {
//   selectCheck: 'Options' | 'Solutions';
//   selectedMap: Record<string, boolean>;
//   setSelectedMap: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
//   questionsData: Question[];
//   currentPage: number,
//   limit: number;

//   correctAnswers?: string[];
//   incorrectAnswers?: string[];
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

//   while ((match = imgRegex.exec(html)) !== null) {
//     images.push(match[1]);
//     text = text.replace(match[0], '');
//   }

//   text = text
//     .replace(/<br\s*\/?>\s*<br\s*\/?>/gi, '\n\n')
//     .replace(/<br\s*\/?>/gi, ' ')
//     .replace(/&lt;/g, '<')
//     .replace(/&gt;/g, '>')
//     .replace(/&amp;/g, '&')
//     .replace(/&nbsp;/g, ' ')
//     .replace(/<[^>]*>/g, '')
//     .trim();

//   return { text, images };
// };

// // Memoized Question Content Component
// export const QuestionContent = memo(({
//   text,
//   images,
//   isSelected
// }: {
//   text: string;
//   images: string[];
//   isSelected: boolean;
// }) => {
//   const cleanText = useMemo(() => {
//     return (text || '')
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
//     font-size: ${moderateScale(12)}px;
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

//       {hasImages && (
//         <View style={[
//           styles.imagesContainer,
//           hasText && styles.imagesWithText,
//           isSelected && { backgroundColor: '#EBF6FF' }
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
//   answerStatus,
// }: {
//   item: Question;
//   index: number;
//   isSelected: boolean;
//   selectCheck: 'Options' | 'Solutions';
//   onToggle: (id: string) => void;
//   extractImages: (html: string) => string[];
//   listottomLineHide: any,
//   currentPage: number;
//   limit: number;
//   answerStatus?: 'correct' | 'incorrect' | 'unanswered';
// }) => {
//   const images = extractImages(item.question_text);
//   const questionTextWithoutImages = (item.question_text || '').replace(/<img[^>]*>/g, '');
//   const questionNumber = (currentPage - 1) * limit + index + 1;

//   // Render status icon based on answer status
//   const renderStatusIcon = () => {
//     if (answerStatus === 'correct') {
//       return (
//         <View style={[styles.statusIcon, styles.correctIcon]}>
//           <IconIonicons name="checkmark" size={moderateScale(12)} color={Colors.white} />
//         </View>
//       );
//     } else if (answerStatus === 'incorrect') {
//       return (
//         <View style={[styles.statusIcon, styles.incorrectIcon]}>
//           <IconIonicons name="close" size={moderateScale(12)} color={Colors.white} />
//         </View>
//       );
//     }
//     return null;
//   };

//   return (
//     <Pressable
//       style={[
//         styles.cardMainBox,
//         isSelected && styles.cardSelected,
//         { flexDirection: "row", paddingLeft: moderateScale(3) }
//       ]}
//       onPress={() => onToggle(item.question_id)}
//     >
//       <View style={styles.questionNumberContainer}>
//         <Text style={styles.questionNumber}>
//           {questionNumber}.
//         </Text>
//         {renderStatusIcon()}
//       </View>
//       <View style={[styles.card, isSelected && styles.cardSelected]}>
//         <QuestionContent
//           text={questionTextWithoutImages}
//           images={images}
//           isSelected={isSelected}
//         />
//       </View>
//     </Pressable>
//   );
// });

// // Main Component
// const QuestionListComponent: React.FC<Props> = ({
//   selectCheck,
//   selectedMap,
//   setSelectedMap,
//   questionsData,
//   currentPage,
//   limit,
//   correctAnswers = [],  // Add with default
//   incorrectAnswers = [], // Add with default
// }) => {
//   const navigation = useNavigation();
//   const [answerStats, setAnswerStats] = useState({
//     correct: [] as string[],
//     incorrect: [] as string[]
//   });

//   // Load answer stats from localStorage when screen focuses
//   useFocusEffect(
//     useCallback(() => {
//       loadAnswerStats();
//     }, [])
//   );

//   const loadAnswerStats = async () => {
//     try {
//       const saved = await localStorage.getItem('answerStats');
//       if (saved) {
//         setAnswerStats(JSON.parse(saved));
//       }
//     } catch (error) {
//       console.error('Error loading answer stats:', error);
//     }
//   };

//   const extractBase64Images = useCallback((html: string): string[] => {
//     const imgRegex = /<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/g;
//     const images: string[] = [];
//     let match;
//     while ((match = imgRegex.exec(html || '')) !== null) {
//       images.push(match[1]);
//     }
//     return images;
//   }, []);

//   // const getQuestionStatus = useCallback((questionId: string): 'correct' | 'incorrect' | 'unanswered' => {
//   //   if (answerStats.correct.includes(questionId)) return 'correct';
//   //   if (answerStats.incorrect.includes(questionId)) return 'incorrect';
//   //   return 'unanswered';
//   // }, [answerStats]);

//   // Determine status for each question
//   const getQuestionStatus = useCallback((questionId: string) => {
//     if (correctAnswers.includes(questionId)) return 'correct';
//     if (incorrectAnswers.includes(questionId)) return 'incorrect';
//     return 'unanswered';
//   }, [correctAnswers, incorrectAnswers]);


// // Render icons in QuestionItem
// const renderStatusIcon = () => {
//     if (answerStatus === 'correct') {
//         return (
//             <View style={[styles.statusIcon, styles.correctIcon]}>
//                 <IconIonicons name="checkmark" size={12} color={Colors.white} />
//             </View>
//         );
//     } else if (answerStatus === 'incorrect') {
//         return (
//             <View style={[styles.statusIcon, styles.incorrectIcon]}>
//                 <IconIonicons name="close" size={12} color={Colors.white} />
//             </View>
//         );
//     }
//     return null;
// };
//   const toggleSelect = useCallback((id: string) => {
//     setSelectedMap(prev => {
//       const newMap = {};
//       if (!prev[id]) {
//         newMap[id] = true;
//       }
//       return newMap;
//     });

//     navigation.navigate('OpenQuestionScreen', {
//       questions: questionsData,
//       currentIndex: questionsData.findIndex(q => q.question_id === id),
//       chapterName: 'Questions',
//     });
//   }, [setSelectedMap, navigation, questionsData]);

//   // Determine status for each question
//   // const getQuestionStatus = useCallback((questionId: string) => {
//   //   if (correctAnswers.includes(questionId)) return 'correct';
//   //   if (incorrectAnswers.includes(questionId)) return 'incorrect';
//   //   return 'unanswered';
//   // }, [correctAnswers, incorrectAnswers]);

//   const renderItem = useCallback(({ item, index }: { item: Question; index: number }) => {
//     const isSelected = !!selectedMap[item.question_id];
//     const status = getQuestionStatus(item.question_id);
//     let langthList = index === questionsData?.length - 1;

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
//         answerStatus={status}
//       />
//     );
//   }, [selectedMap, selectCheck, toggleSelect, extractBase64Images, currentPage, limit, getQuestionStatus, questionsData]);

//   const keyExtractor = useCallback((item: Question) => item.question_id, []);

//   const extraData = useMemo(() => ({
//     selectedMap,
//     selectCheck,
//     answerStats
//   }), [selectedMap, selectCheck, answerStats]);

//   if (!questionsData || questionsData.length === 0) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Text style={styles.emptyText}>No questions available</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={questionsData}
//         keyExtractor={keyExtractor}
//         renderItem={renderItem}
//         extraData={extraData}
//         initialNumToRender={3}
//         maxToRenderPerBatch={6}
//         windowSize={21}
//         removeClippedSubviews={false}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.listContent}
//       />
//     </View>
//   );
// };

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
//   },
//   card: {
//     backgroundColor: '#f9fafb',
//     flex: 1,
//     paddingBottom: moderateScale(6),
//     paddingTop: moderateScale(6),
//     paddingHorizontal: moderateScale(12),
//   },
//   cardSelected: {
//     backgroundColor: '#EBF6FF'
//   },
//   questionNumber: {
//     fontSize: moderateScale(12),
//     fontFamily: Fonts.InstrumentSansMedium,
//     color: Colors.black,
//   },
//   questionContent: {
//     flex: 1,
//     marginBottom: moderateScale(10),
//   },
//   mathJaxWrapper: {
//     paddingVertical: moderateScale(1),
//     marginBottom: moderateScale(8)
//   },
//   questionText: {
//     fontSize: moderateScale(14),
//     fontFamily: Fonts.InstrumentSansMedium,
//     color: Colors.black,
//     marginTop: moderateScale(1),
//   },
//   questionMathJax: {
//     fontSize: moderateScale(12),
//     fontFamily: Fonts.InstrumentSansMedium,
//     color: Colors.black,
//     alignSelf: 'stretch',
//     minHeight: moderateScale(20),
//   },
//   selectedText: {
//     backgroundColor: 'transparent',
//   },
//   imagesWithText: {},
//   questionImage: {
//     width: '100%',
//     height: moderateScale(98),
//     maxHeight: verticalScale(250),
//     borderRadius: moderateScale(2),
//     backgroundColor: Colors?.white,
//     alignSelf: 'center',
//     resizeMode: "contain",
//   },
//   cardMainBox: {
//     elevation: 30,
//     marginVertical: moderateScale(1),
//     shadowColor: 'rgba(0, 140, 227, 1)',
//     backgroundColor: '#f9fafb'
//   },
//   questionNumberContainer: {
//     alignItems: 'center',
//     flexDirection: "column",
//     marginTop: moderateScale(12),
//     paddingLeft: moderateScale(4),
//     width: moderateScale(40),
//   },
//   statusIcon: {
//     width: moderateScale(20),
//     height: moderateScale(20),
//     borderRadius: moderateScale(10),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: moderateScale(2),
//   },
//   correctIcon: {
//     backgroundColor: '#4CAF50',
//   },
//   incorrectIcon: {
//     backgroundColor: '#F44336',
//   },
//   // Keep all your existing styles below...
//   // I've omitted them for brevity but keep them all
//   optionContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: moderateScale(4),
//     paddingHorizontal: moderateScale(8),
//     paddingVertical: moderateScale(1),
//   },
//   optionLabelContainer: {
//     width: moderateScale(26),
//     height: moderateScale(26),
//     borderRadius: moderateScale(16),
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: Colors?.lightThemeBlue,
//   },
//   optionImagesContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginLeft: moderateScale(10),
//   },
//   optionImage: {
//     width: moderateScale(130),
//     height: moderateScale(90),
//     borderRadius: moderateScale(6),
//   },
//   // ... rest of your styles remain exactly the same


// });

// export default memo(QuestionListComponent);


import React, { memo, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import MathJax from 'react-native-mathjax';
import { Colors, Fonts } from '../../../../theme';
import { moderateScale, verticalScale } from '../../../../utils/responsiveSize';
import { useNavigation } from '@react-navigation/native';
import EmptyComponent from "../../../../component/emptyComponent";

// MathJax configuration
const mathJaxOptions = {
  messageStyle: 'none',
  extensions: ['tex2jax.js'],
  jax: ['input/TeX', 'output/HTML-CSS'],
  tex2jax: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
  },
  'HTML-CSS': {
    scale: 100,
    linebreaks: { automatic: true }
  },
  TeX: {
    extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js']
  }
}

export type Question = {
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
};

type Props = {
  selectCheck: 'Options' | 'Solutions';
  selectedMap: Record<string, boolean>;
  setSelectedMap: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  questionsData: Question[];
  currentPage: number;
  limit: number;
  correctAnswers?: string[];
  incorrectAnswers?: string[];
  index: number,
  hideContant: boolean,
  isLoading: boolean

};

// Helper to check if text contains math expressions
const containsMath = (text: string): boolean => {
  if (!text) return false;
  return /(\$|\\\(|\\\[|\\frac|\\sqrt|\^|_)/.test(text);
};

// Helper to extract base64 images from HTML
const extractImagesFromHtml = (html: string): { text: string; images: string[] } => {
  if (!html) return { text: html || '', images: [] };

  const imgRegex = /<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/g;
  const images: string[] = [];
  let text = html;
  let match;

  while ((match = imgRegex.exec(html)) !== null) {
    images.push(match[1]);
    text = text.replace(match[0], '');
  }

  text = text
    .replace(/<br\s*\/?>\s*<br\s*\/?>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]*>/g, '')
    .trim();

  return { text, images };
};

// Memoized Question Content Component
export const QuestionContent = memo(({
  text,
  images,
  isSelected
}: {
  text: string;
  images: string[];
  isSelected: boolean;
}) => {
  const cleanText = useMemo(() => {
    return (text || '')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&nbsp;/g, ' ')
      .replace(/<[^>]*>/g, '');
  }, [text]);

  const hasMath = containsMath(cleanText);
  const hasText = cleanText.trim().length > 0;
  const hasImages = images.length > 0;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body {
    margin: 0 !important;
    padding: 0 !important;
    font-size: ${moderateScale(12)}px;
    color: #000;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    line-height: ${moderateScale(18)}px;
  }
  p, div {
    margin: 0 !important;
    padding: 0 !important;
  }
  .MathJax_Display {
    margin: 0 !important;
  }
</style>
</head>
<body>
${cleanText}
</body>
</html>
`
  return (
    <View style={styles.questionContent}>
      {hasText && (
        <View style={styles.mathJaxWrapper}>
          {hasMath ? (
            <MathJax
              mathJaxOptions={mathJaxOptions}
              html={htmlContent}
              style={[styles.questionMathJax, isSelected && styles.selectedText, {
                marginTop: 0, paddingVertical: 0,
              }]}
            />
          ) : (
            <Text style={[styles.questionText, isSelected && styles.selectedText]}>
              {cleanText}
            </Text>
          )}
        </View>
      )}

      {hasImages && (
        <View style={[
          styles.imagesContainer,
          hasText && styles.imagesWithText,
          isSelected && { backgroundColor: '#EBF6FF' }
        ]}>
          {images.map((base64, index) => (
            <Image
              key={`question-img-${index}`}
              source={{ uri: `data:image/png;base64,${base64}` }}
              style={styles.questionImage}
              resizeMode="contain"
            />
          ))}
        </View>
      )}
    </View>
  );
});

QuestionContent.displayName = 'QuestionContent';

const QuestionItem = memo(({
  item,
  index,
  isSelected,
  selectCheck,
  onToggle,
  extractImages,
  listottomLineHide,
  currentPage,
  limit,
  answerStatus,
  hideContant
}: {
  item: Question;
  index: number;
  isSelected: boolean;
  selectCheck: 'Options' | 'Solutions';
  onToggle: (id: string, questionNumber: number) => void;
  extractImages: (html: string) => string[];
  listottomLineHide: any;
  currentPage: number;
  limit: number;
  answerStatus?: 'correct' | 'incorrect' | 'unanswered';
  hideContant: boolean
}) => {
  const images = extractImages(item.question_text);
  const questionTextWithoutImages = (item.question_text || '').replace(/<img[^>]*>/g, '');
  const questionNumber = (currentPage - 1) * limit + index + 1;

  // Render status icon based on answer status
  // const renderStatusIcon = () => {
  //   if (answerStatus === 'correct') {
  //     return (
  //       <View style={styles.questionNumberContainer}>
  //         <Text style={[styles.questionNumber, { color: Colors.green }]}>
  //           {questionNumber}.
  //         </Text>
  //       </View>
  //     );
  //   } else if (answerStatus === 'incorrect') {
  //     return (
  //       <View style={styles.questionNumberContainer}>
  //         <Text style={[styles.questionNumber, { color: Colors.red }]}>
  //           {questionNumber}.
  //         </Text>
  //       </View>
  //     );
  //   }
  //   return null;
  // };
  // Render shimmer items when loading
  const renderShimmerItem = useCallback(() => (
    <View style={styles.shimmerContainer}>
      {/* Question Shimmer */}
      <View style={styles.shimmerRow}>
        <View style={styles.shimmerNumber} />
        <View style={styles.shimmerContent}>
          <View style={styles.shimmerQuestionText} />
          <View style={styles.shimmerQuestionTextShort} />
        </View>
      </View>

      {/* Options Shimmer */}
      <View style={styles.shimmerOptionsGrid}>
        {[1, 2, 3, 4].map((_, index) => (
          <View key={`shimmer-opt-${index}`} style={styles.shimmerOptionContainer}>
            <View style={styles.shimmerOptionLabel} />
            <View style={styles.shimmerOptionText} />
          </View>
        ))}
      </View>

      {/* Level Shimmer */}
      {!hideContant && (
        <View style={styles.shimmerLevelContainer}>
          <View style={styles.shimmerLevelText} />
        </View>
      )}
    </View>
  ), [hideContant]);

  return (
    <Pressable
      style={[
        styles.cardMainBox,
        isSelected && styles.cardSelected,
        { flexDirection: "row", paddingLeft: moderateScale(3) }
      ]}
      onPress={() => onToggle(item.question_id, questionNumber)}>
      {/* {renderStatusIcon()} */}
      <View style={styles.questionNumberContainer}>
        <Text style={[styles.questionNumber, answerStatus === 'correct' && { color: Colors.green }, answerStatus === 'incorrect' && { color: Colors.red }]}>
          {questionNumber}.
        </Text>
      </View>
      <View style={[styles.card, isSelected && styles.cardSelected]}>
        <QuestionContent
          text={questionTextWithoutImages}
          images={images}
          isSelected={isSelected}
        />
      </View>
    </Pressable>
  );
});

// Main Component
const QuestionListComponent: React.FC<Props> = ({
  selectCheck,
  selectedMap,
  setSelectedMap,
  questionsData,
  currentPage,
  limit,
  correctAnswers = [],
  incorrectAnswers = [],
  index,
  hideContant,
  isLoading,

}) => {
  const navigation = useNavigation();
  const qsNumber = (currentPage - 1) * limit + index + 1;
  console.log('qsNumberaaaaaaaaa', index);

  const extractBase64Images = useCallback((html: string): string[] => {
    const imgRegex = /<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/g;
    const images: string[] = [];
    let match;
    while ((match = imgRegex.exec(html || '')) !== null) {
      images.push(match[1]);
    }
    return images;
  }, []);

  // Determine status for each question using props directly
  const getQuestionStatus = useCallback((questionId: string): 'correct' | 'incorrect' | 'unanswered' => {
    if (correctAnswers.includes(questionId)) return 'correct';
    if (incorrectAnswers.includes(questionId)) return 'incorrect';
    return 'unanswered';
  }, [correctAnswers, incorrectAnswers]);

  const toggleSelect = useCallback((id: string, questionNumber: number) => {
    setSelectedMap(prev => {
      const newMap = {};
      if (!prev[id]) {
        newMap[id] = true;
      }
      return newMap;
    });

    navigation.navigate('OpenQuestionScreen', {
      questions: questionsData,
      currentIndex: questionsData.findIndex(q => q.question_id === id),
      chapterName: 'Questions'
      // qsNumber:qsNumber

    });
  }, [setSelectedMap, navigation, questionsData]);


  // Render shimmer items when loading
  const renderShimmerItem = useCallback(() => (
    <View style={styles.shimmerContainer}>
      {/* Question Shimmer */}
      <View style={styles.shimmerRow}>
        <View style={styles.shimmerNumber} />
        <View style={styles.shimmerContent}>
          <View style={styles.shimmerQuestionText} />
          <View style={styles.shimmerQuestionTextShort} />
        </View>
      </View>

      {/* Options Shimmer */}
      <View style={styles.shimmerOptionsGrid}>
        {[1, 2, 3, 4].map((_, index) => (
          <View key={`shimmer-opt-${index}`} style={styles.shimmerOptionContainer}>
            <View style={styles.shimmerOptionLabel} />
            <View style={styles.shimmerOptionText} />
          </View>
        ))}
      </View>

      {/* Level Shimmer */}
      {!hideContant && (
        <View style={styles.shimmerLevelContainer}>
          <View style={styles.shimmerLevelText} />
        </View>
      )}
    </View>
  ), [hideContant]);
  const renderItem = useCallback(({ item, index }: { item: Question; index: number }) => {
    const isSelected = !!selectedMap[item.question_id];
    const status = getQuestionStatus(item.question_id);
    const isLastItem = index === questionsData?.length - 1;

    return (
      <QuestionItem
        item={item}
        index={index}
        isSelected={isSelected}
        selectCheck={selectCheck}
        onToggle={toggleSelect}
        extractImages={extractBase64Images}
        listottomLineHide={isLastItem}
        currentPage={currentPage}
        limit={limit}
        answerStatus={status}
        hideContant={hideContant}
      />
    );
  }, [selectedMap, selectCheck, toggleSelect, extractBase64Images, currentPage, limit, getQuestionStatus, questionsData]);

  const keyExtractor = useCallback((item: Question) => item.question_id, []);

  const extraData = useMemo(() => ({
    selectedMap,
    selectCheck,
    correctAnswers,
    incorrectAnswers
  }), [selectedMap, selectCheck, correctAnswers, incorrectAnswers]);



  // Shimmer key extractor
  const shimmerKeyExtractor = useCallback((_: any, index: number) => `shimmer-${index}`, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <FlatList
          data={Array(5).fill({})} // 5 shimmer items
          keyExtractor={shimmerKeyExtractor}
          renderItem={renderShimmerItem}
          initialNumToRender={3}
          maxToRenderPerBatch={5}
          windowSize={21}
          removeClippedSubviews={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}

          // Optional: Add empty component
          ListEmptyComponent={
            !isLoading && questionsData.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No questions available</Text>
              </View>
            ) : null
          }
        />
      </View>
    );
  }
  if (!questionsData || questionsData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No questions available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={questionsData}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        extraData={extraData}
        initialNumToRender={3}
        maxToRenderPerBatch={6}
        windowSize={21}
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => <EmptyComponent title='No question data found' />

        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    marginHorizontal: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(100),
  },
  emptyText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.InstrumentSansMedium,
    color: Colors.gray,
  },
  listContent: {
    paddingVertical: moderateScale(8),
  },
  card: {
    backgroundColor: '#f9fafb',
    flex: 1,
    paddingBottom: moderateScale(6),
    paddingTop: moderateScale(6),
    paddingRight: moderateScale(12),
  },
  cardSelected: {
    backgroundColor: '#EBF6FF'
  },
  questionNumber: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.InstrumentSansMedium,
    color: Colors.black,
    marginBottom: moderateScale(4),
  },
  questionContent: {
    flex: 1,
    marginBottom: moderateScale(10),

    // borderWidth: 1,
    // borderColor: '#000'
  },
  mathJaxWrapper: {
    paddingVertical: moderateScale(1),
    marginBottom: moderateScale(8),
  },
  questionText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.InstrumentSansMedium,
    color: Colors.black,
    marginTop: moderateScale(1),
  },
  questionMathJax: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.InstrumentSansMedium,
    color: Colors.black,
    alignSelf: 'stretch',
    minHeight: moderateScale(20),
  },
  selectedText: {
    backgroundColor: 'transparent',
  },
  imagesWithText: {},
  questionImage: {
    width: '100%',
    height: moderateScale(98),
    maxHeight: verticalScale(250),
    borderRadius: moderateScale(2),
    backgroundColor: Colors?.white,
    alignSelf: 'center',
    resizeMode: "contain",
  },
  cardMainBox: {
    elevation: 30,
    marginVertical: moderateScale(1),
    shadowColor: 'rgba(0, 140, 227, 1)',
    backgroundColor: '#f9fafb'
  },
  questionNumberContainer: {
    alignItems: 'center',
    flexDirection: "column",
    marginTop: moderateScale(12),
    paddingLeft: moderateScale(4),
    width: moderateScale(40),
    // borderWidth:1
  },
  statusIcon: {
    width: moderateScale(18),
    height: moderateScale(18),
    borderRadius: moderateScale(4),
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: moderateScale(2),
  },
  correctIcon: {
    backgroundColor: '#40D79A',
    width: moderateScale(16),
    height: moderateScale(16),
  },
  incorrectIcon: {
    backgroundColor: '#FFDDDA',

  },
  // Keep all your existing styles below...
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(4),
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(1),
  },
  optionLabelContainer: {
    width: moderateScale(26),
    height: moderateScale(26),
    borderRadius: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors?.lightThemeBlue,
  },
  optionImagesContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: moderateScale(10),
  },
  optionImage: {
    width: moderateScale(130),
    height: moderateScale(90),
    borderRadius: moderateScale(6),
  },


  // Shimmer Styles
  shimmerContainer: {
    backgroundColor: '#f9fafb',
    marginVertical: moderateScale(8),
    padding: moderateScale(12),
    borderRadius: moderateScale(4),
  },
  shimmerRow: {
    flexDirection: 'row',
    marginBottom: moderateScale(10),
  },
  shimmerNumber: {
    width: moderateScale(30),
    height: moderateScale(30),
    backgroundColor: '#e0e0e0',
    borderRadius: moderateScale(20),
    marginRight: moderateScale(3),
    // borderWidth:1
  },
  shimmerContent: {
    flex: 1,
  },
  shimmerQuestionText: {
    height: moderateScale(16),
    backgroundColor: '#e0e0e0',
    borderRadius: moderateScale(2),
    marginBottom: moderateScale(8),
    width: '94%',
  },
  shimmerQuestionTextShort: {
    height: moderateScale(16),
    backgroundColor: '#e0e0e0',
    borderRadius: moderateScale(2),
    width: '60%',

  },

  // '#e0e0e0'
  shimmerOptionsGrid: {
    marginBottom: moderateScale(12),
  },
  shimmerOptionContainer: {
    flexDirection: 'row',
    marginBottom: moderateScale(8),
    alignItems: 'center',
  },
  shimmerOptionLabel: {
    width: moderateScale(24),
    height: moderateScale(24),
    backgroundColor: '#e0e0e0',
    borderRadius: moderateScale(12),
    marginRight: moderateScale(8),
  },
  shimmerOptionText: {
    height: moderateScale(30),
    backgroundColor: '#e0e0e0',
    borderRadius: moderateScale(2),
    flex: 1,
  },
  shimmerLevelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shimmerLevelText: {
    height: moderateScale(12),
    width: moderateScale(80),
    backgroundColor: '#e0e0e0',
    borderRadius: moderateScale(2),
  },

});

export default memo(QuestionListComponent);