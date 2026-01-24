// import React, { useState, useCallback } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { styles } from './styles';
// import { moderateScale } from '../../../../../utils/responsiveSize';
// import { Colors } from '../../../../../theme';

// type Option = {
//   id: string;
//   label: string;
// };

// type Question = {
//   id: string;
//   question: string;
//   options: Option[];
//   solutionDetails: string,
//   shortAnswer: string
// };

// const QUESTIONS: Question[] = [
//   {
//     id: '1',
//     question: 'What is the successor of 9999?',
//     options: [
//       { id: 'A', label: '10000' },
//       { id: 'B', label: '9998' },
//       { id: 'C', label: '9990' },
//       { id: 'D', label: '99999' },
//     ],
//     solutionDetails: `Perimeter = 2(l + b)
// = 2(14 + 8)
// = 2 × 22
// = 44 cm

// Area = l × b
// = 14 × 8
// = 112 cm²`,
//     shortAnswer: 'Perimeter = 44 cm, Area = 112 cm²',
//   },
//   {
//     id: '2',
//     question: 'What is the successor of 9999?',
//     options: [
//       { id: 'A', label: '10000' },
//       { id: 'B', label: '9998' },
//       { id: 'C', label: '9990' },
//       { id: 'D', label: '99999' },
//     ],
//     solutionDetails: `Perimeter = 2(l + b)
// = 2(14 + 8)
// = 2 × 22
// = 44 cm

// Area = l × b
// = 14 × 8  
// = 112 cm²`,
//     shortAnswer: 'Perimeter = 44 cm, Area = 112 cm²',
//   },
//   {
//     id: '3',
//     question: 'Which is the greatest number?',
//     options: [
//       { id: 'A', label: '56789' },
//       { id: 'B', label: '56987' },
//       { id: 'C', label: '56879' },
//       { id: 'D', label: '56678' },
//     ],
//     solutionDetails: `Perimeter = 2(l + b)
// = 2(14 + 8)
// = 2 × 22
// = 44 cm

// Area = l × b
// = 14 × 8
// = 112 cm²`,
//     shortAnswer: 'Perimeter = 44 cm, Area = 112 cm²',
//   },
//   {
//     id: '4',
//     question: 'What is the successor of 9999?',
//     options: [
//       { id: 'A', label: '10000' },
//       { id: 'B', label: '9998' },
//       { id: 'C', label: '9990' },
//       { id: 'D', label: '99999' },
//     ],
//     solutionDetails: `Perimeter = 2(l + b)
// = 2(14 + 8)
// = 2 × 22
// = 44 cm

// Area = l × b
// = 14 × 8
// = 112 cm²`,
//     shortAnswer: 'Perimeter = 44 cm, Area = 112 cm²',
//   },
// ];
// type Props = {
//   selectCheck: 'Options' | 'Solutions';
//   selectedMap: any,
//   setSelectedMap: any
// };

// const QuestionListData: React.FC<Props> = ({ selectCheck, selectedMap, setSelectedMap }) => {
//   const toggleSelect = useCallback((id: string) => {
//     setSelectedMap(pre => {
//       const newMap = { ...pre };
//       if (newMap[id]) {
//         delete newMap[id]
//       } else {
//         newMap[id] = true
//       }
//       return newMap
//     })
//   }, [])

//   /** 🧱 RENDER ITEM */
//   const renderItem = useCallback(
//     ({ item, index }: { item: Question; index: number }) => {
//       const isSelected = !!selectedMap[item.id];
//       return (
//         <TouchableOpacity
//           activeOpacity={0.85}
//           style={[
//             styles.card,
//             isSelected && styles.cardSelected,
//           ]}
//           onPress={() => toggleSelect(item.id)}>
//           {/* QUESTION ROW */}
//           <View style={styles.questionRow}>

//             <Text style={styles.questionText}>
//               {index + 1}.       {item.question}
//             </Text>
//           </View>

//           {/* OPTIONS ROW */}
//           <View style={styles.optionsRow}>
//             <>
//               {isSelected && (
//                 <TouchableOpacity style={[styles.chackBox, { backgroundColor: '#1E88E5', borderWidth: 0 }]}>
//                   <Icon name="check" size={moderateScale(16)} color={Colors.white} />
//                 </TouchableOpacity>
//               )}
//               {!isSelected && (
//                 <TouchableOpacity style={[styles.chackBox, { backgroundColor: 'white' }]}>
//                   <Icon name="check" size={moderateScale(16)} color={Colors.white} />
//                 </TouchableOpacity>
//               )}
//               {item.options.map((opt, index) => (
//                 <Text key={opt.id} style={[styles.optionText, { marginLeft: index === 0 ? moderateScale(-22) : 0 }]}>
//                   {opt.id}) {opt.label}
//                 </Text>
//               ))}
//             </>
//           </View>

//           {/* SOLUTION MODE */}
//           {selectCheck === 'Solutions' && (
//             <View style={styles.solutionBox}>
//               <Text style={styles.solutionTitle}>Solution :</Text>
//               <Text style={styles.solutionText}>{item.solutionDetails}</Text>
//               <Text style={styles.answerText}>
//                 <Text style={{ fontWeight: '600' }}>Answer: </Text>
//                 {item.shortAnswer}
//               </Text>
//             </View>
//           )}
//         </TouchableOpacity>
//       );
//     },
//     [selectedMap, toggleSelect, selectCheck],
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={QUESTIONS}
//         keyExtractor={item => item.id} 
//         renderItem={renderItem}
//         extraData={{ selectedMap, selectCheck}}
//         initialNumToRender={5}
//         windowSize={7}
//         removeClippedSubviews
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };
// export default QuestionListData;

// import React, { useState, useCallback } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   Image,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import MathJax from 'react-native-mathjax';
// import RenderHtml from 'react-native-render-html';
// import { mjFont, moderateScale, verticalScale } from '../../../../../utils/responsiveSize';
// import { Colors, Fonts } from '../../../../../theme';

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
//   TeX: {
//     extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js']
//   }
// };

// type Option = {
//   id: string;
//   label: string;
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

// type Props = {
//   selectCheck: 'Options' | 'Solutions';
//   selectedMap: any,
//   setSelectedMap: any;
//   questionsData: Question[]; // Add this prop for API data
// };

// const QuestionListData: React.FC<Props> = ({
//   selectCheck,
//   selectedMap,
//   setSelectedMap,
//   questionsData
// }) => {

//   // Function to extract base64 images from HTML
//   const extractBase64Images = (html: string) => {
//     const imgRegex = /<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/g;
//     const images: string[] = [];
//     let match;

//     while ((match = imgRegex.exec(html)) !== null) {
//       images.push(match[1]);
//     }
//     return images;
//   };

//   // Function to render question text with MathJax and HTML
//   // const renderQuestionContent = (text: string) => {
//   const renderQuestionContent = (item: object) => {
//     const isSelected = !!selectedMap[item?.question_id];
//     // Extract base64 images
//     const images = extractBase64Images(item?.question_text);

//     // Remove img tags for MathJax rendering
//     const textWithoutImages = item?.question_text?.replace(/<img[^>]*>/g, '');

//     // Clean up HTML tags but keep structure for math expressions
//     const cleanText = textWithoutImages
//       .replace(/<br\s*\/?>/gi, '\n')
//       .replace(/&lt;/g, '<')
//       .replace(/&gt;/g, '>')
//       .replace(/&amp;/g, '&')
//       .replace(/&nbsp;/g, ' ')
//       .replace(/<[^>]*>/g, '');

//     return (
//       <View>
//         {/* Render MathJax content */}
//         <MathJax
//           mathJaxOptions={mathJaxOptions}
//           html={`
//     <div style="
//       font-size:${mjFont(13)},
//       fontFamily:${Fonts.InstrumentSansBold},
//       color:${Colors.red}
//     ">
//     ${cleanText}
//     </div>
//   `}
//           // html={cleanText}
//           style={[styles.optionText, isSelected && styles.bgStyle]}
//         />

//         {/* question image*/}
//         {/* {images.length > 0 && (
//           <View style={styles.imagesContainer}>
//             {images.map((base64, index) => (
//               <Image
//                 key={index}
//                 source={{ uri: `data:image/png;base64,${base64}` }}
//                 style={styles.questionImage}
//                 resizeMode="contain"
//               />
//             ))}
//           </View>
//         )} */}
//         {images.length > 0 && (
//           <View style={styles.imagesContainer}>
//             {images.map((base64, index) => (
//               <View key={index} style={styles.imageBox}>
//                 <Image
//                   source={{ uri: `data:image/png;base64,${base64}` }}
//                   style={styles.questionImage}
//                   resizeMode="contain"
//                 />
//               </View>
//             ))}
//           </View>
//         )}

//       </View>
//     );
//   };

//   // Function to render options with MathJax
//   const renderOptions = (question: Question) => {
//     const isSelected = !!selectedMap[question.question_id];
//     const options = [
//       { id: 'A', label: question.option_a },
//       { id: 'B', label: question.option_b },
//       { id: 'C', label: question.option_c },
//       { id: 'D', label: question.option_d },
//     ];

//     // option 
//     return options.map((opt, index) => (
//       <View key={opt.id} style={[styles.optionContainer, isSelected && styles.optionMainBox]}>
//         <MathJax
//           mathJaxOptions={mathJaxOptions}
//           // html={`${opt.id}) ${opt.label}`}
//           style={[styles.optionText, isSelected && styles.optionMainBox]}
//           html={`
//     <div style="
//       font-size:${mjFont(10)};
//     ">
//       <b>${opt.id})</b> ${opt.label}
//     </div>
//   `}
//         />
//       </View>
//     ));
//   };

//   const toggleSelect = useCallback((id: string) => {
//     setSelectedMap(pre => {
//       const newMap = { ...pre };
//       if (newMap[id]) {
//         delete newMap[id];
//       } else {
//         newMap[id] = true;
//       }
//       return newMap;
//     });
//   }, []);

//   /** 🧱 RENDER ITEM */
//   const renderItem = useCallback(
//     ({ item, index }: { item: Question; index: number }) => {
//       const isSelected = !!selectedMap[item.question_id];

//       return (
//         <TouchableOpacity
//           activeOpacity={0.85}
//           style={[
//             styles.card,
//             isSelected && styles.cardSelected,
//           ]}
//           onPress={() => toggleSelect(item.question_id)}
//         >
//           {/* QUESTION ROW */}
//           <View style={styles.questionRow}>
//             <Text style={styles.questionNumber}>
//               {index + 1}.
//             </Text>
//             <View style={styles.questionContent}>
//               {renderQuestionContent(item)}
//             </View>
//           </View>

//           {/* OPTIONS ROW */}
//           <View style={styles.optionsRow}>
//             <>
//               {/* {isSelected && (
//                 <TouchableOpacity style={[styles.checkBox, { backgroundColor: '#1E88E5', borderWidth: 0 }]}>
//                   <Icon name="check" size={moderateScale(16)} color={Colors.white} />
//                 </TouchableOpacity>
//               )}
//               {!isSelected && (
//                 <TouchableOpacity style={[styles.checkBox, { backgroundColor: 'white' }]}>
//                   <Icon name="check" size={moderateScale(16)} color={Colors.white} />
//                 </TouchableOpacity>
//               )} */}
//               <View style={styles.optionsContainer}>
//                 {renderOptions(item)}
//               </View>
//             </>
//           </View>

//           {/* SOLUTION MODE */}
//           {selectCheck === 'Solutions' && (
//             <View style={styles.solutionBox}>
//               <Text style={styles.solutionTitle}>Solution :</Text>
//               <MathJax
//                 mathJaxOptions={mathJaxOptions}
//                 html={item.explanation}
//                 style={[styles.solutionText, isSelected && styles.bgStyle]}
//               />
//               <Text style={styles.answerText}>
//                 <Text style={{ fontWeight: '600' }}>Answer: </Text>
//                 Option {item.correct_option}
//               </Text>
//             </View>
//           )}
//         </TouchableOpacity>
//       );
//     },
//     [selectedMap, toggleSelect, selectCheck],
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={questionsData}
//         keyExtractor={item => item.question_id}
//         renderItem={renderItem}
//         extraData={{ selectedMap, selectCheck }}
//         initialNumToRender={5}
//         windowSize={7}
//         removeClippedSubviews
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// // Add these styles to your existing styles file
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors?.white
//   },
//   card: {
//     backgroundColor: Colors?.white,
//     // borderRadius: 8,
//     padding: 16,//
//     // marginBottom: 12,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     borderBottomWidth: 1,
//     borderColor: "rgba(12, 64, 111, 0.12)"
//     // borderColor:'#000'
//   },
//   cardSelected: {
//     // borderColor: '#1E88E5',
//     // borderWidth: 2,
//     backgroundColor: '#EBF6FF'
//   },
//   questionRow: {
//     flexDirection: 'row',
//     marginBottom: 12,
//     // backgroundColor: 'red'
//   },
//   questionNumber: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginRight: 8,
//     color: Colors.black,
//   },
//   questionContent: {
//     flex: 1,
//     // backgroundColor: 'red'
//   },
//   optionsRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   checkBox: {
//     width: 24,
//     height: 24,
//     borderWidth: 2,
//     borderColor: '#ccc',
//     borderRadius: 4,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   optionsContainer: {
//     flex: 1,
//     // backgroundColor:"red"
//     // backgroundColor: 'black'
//   },
//   // optionContainer: {
//   //   marginBottom: moderateScale(8),
//   // },
//   optionContainer: {
//     width: '100%',
//     paddingVertical: moderateScale(8),
//     paddingHorizontal: moderateScale(12),
//     borderRadius: moderateScale(8),
//     backgroundColor: '#fff',
//     // marginBottom: moderateScale(10),
//   },
//   optionText: {
//     fontSize: 14,
//     color: Colors.black,
//     backgroundColor: Colors.white
//   },
//   solutionBox: {
//     marginTop: 16,
//     padding: 12,
//     // backgroundColor: '#f5f5f5',
//     borderRadius: 6,
//     // backgroundColor:'#EBF6FF'
//   },
//   solutionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 8,
//     color: Colors.black,
//   },
//   solutionText: {
//     fontSize: 14,
//     color: Colors.black,
//     lineHeight: 20,
//   },
//   answerText: {
//     fontSize: 14,
//     fontWeight: '500',
//     marginTop: 8,
//     color: Colors.black,
//   },
//   // imagesContainer: {
//   //   marginTop: moderateScale(12),
//   //   // borderWidth:1
//   // },
//   // questionImage: {
//   //   width: '100%',
//   //   // height: 200,
//   //   height: moderateScale(100),
//   //   marginBottom: moderateScale(8),
//   //   backgroundColor: 'red'
//   // },
//   imagesContainer: {
//     width: '100%',
//     marginTop: moderateScale(12),
//   },

//   imageBox: {
//     width: '100%',
//     height: verticalScale(160), // fixed viewport
//     overflow: 'hidden'
//   },
//   questionImage: {
//     width: '100%',
//     height: '100%',
//   },
//   bgStyle: {
//     backgroundColor: '#EBF6FF'
//   },
//   optionMainBox: {
//     backgroundColor: '#EBF6FF'
//     // marginHorizontal:moderateScale(1),
//     // width:'auto'
//     // width:'80%',
//     // height:moderateScale(10)
//   }
// });

// export default QuestionListData;

// import React, { memo, useCallback, useMemo } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Dimensions,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import MathJax from 'react-native-mathjax';
// import { moderateScale, verticalScale } from '../../../../../utils/responsiveSize';
// import { Colors, Fonts } from '../../../../../theme';

// const { width: screenWidth } = Dimensions.get('window');

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

// type Props = {
//   selectCheck: 'Options' | 'Solutions';
//   selectedMap: Record<string, boolean>;
//   setSelectedMap: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
//   questionsData: Question[];
// };

// // Memoized Option Component
// const OptionItem = memo(({
//   id,
//   label,
//   isSelected
// }: {
//   id: string;
//   label: string;
//   isSelected: boolean;
// }) => {
//   return (
//     <View style={styles.optionContainer}>
//       <MathJax
//         mathJaxOptions={mathJaxOptions}
//         html={`${id}) ${label || ''}`}
//         style={[
//           styles.optionText,
//           isSelected && styles.optionSelected
//         ]}
//       />
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
//   const cleanText = useMemo(() => {
//     return (text || '')
//       .replace(/<br\s*\/?>/gi, '\n')
//       .replace(/&lt;/g, '<')
//       .replace(/&gt;/g, '>')
//       .replace(/&amp;/g, '&')
//       .replace(/&nbsp;/g, ' ')
//       .replace(/<[^>]*>/g, '');
//   }, [text]);

//   // Create HTML with inline font styling
//   const styledHtml = useMemo(() => {
//     const fontSize = moderateScale(11);
//     const lineHeight = moderateScale(22);
//     const fontFamily = "'Instrument Sans', sans-serif";
//     const color = Colors.black;

//     return `
//       <div style="
//         font-size: ${fontSize}px;
//         font-family: ${fontFamily};
//         color: ${color};
//         line-height: ${lineHeight}px;
//         text-align: left;
//         width: 100%;
//       "> ${cleanText}</div>`
//   }, [cleanText]);

//   return (
//     <View style={styles.questionContent}>
//       <View>
//       <View style={styles.mathJaxWrapper}>
//         <MathJax
//           mathJaxOptions={mathJaxOptions}
//           // html={cleanText}
//           html={styledHtml}
//           style={[styles.questionText, isSelected && styles.selectedText]}
//         />
//       </View>

//       {images.length > 0 && (
//         <View style={styles.imagesContainer}>
//           {images.map((base64, index) => (
//             <Image
//               key={`image-${index}`}
//               source={{ uri: `data:image/png;base64,${base64}` }}
//               style={styles.questionImage}
//               resizeMode="contain"
//             />
//           ))}
//         </View>
//       )}
//       </View>
//     </View>
//   );
// });

// QuestionContent.displayName = 'QuestionContent';

// // Memoized Solution Component
// const SolutionView = memo(({
//   explanation,
//   correctOption,
//   isSelected
// }: {
//   explanation: string;
//   correctOption: string;
//   isSelected: boolean;
// }) => {
//   const cleanExplanation = useMemo(() => {
//     return (explanation || '')
//       .replace(/<br\s*\/?>/gi, '\n')
//       .replace(/&lt;/g, '<')
//       .replace(/&gt;/g, '>')
//       .replace(/&amp;/g, '&')
//       .replace(/&nbsp;/g, ' ')
//       .replace(/<[^>]*>/g, '');
//   }, [explanation]);

//   return (
//     <View style={styles.solutionBox}>
//       <Text style={styles.solutionTitle}>Solution :</Text>
//       <View style={styles.solutionContent}>
//         <MathJax
//           mathJaxOptions={mathJaxOptions}
//           html={cleanExplanation}
//           style={[styles.solutionText, isSelected && styles.selectedText]}
//         />
//       </View>
//       <Text style={styles.answerText}>
//         <Text style={styles.answerLabel}>Answer: </Text>
//         Option {correctOption || ''}
//       </Text>
//     </View>
//   );
// });

// SolutionView.displayName = 'SolutionView';

// // Item Component (doesn't use hooks)
// const QuestionItem = memo(({
//   item,
//   index,
//   isSelected,
//   selectCheck,
//   onToggle,
//   extractImages
// }: {
//   item: Question;
//   index: number;
//   isSelected: boolean;
//   selectCheck: 'Options' | 'Solutions';
//   onToggle: (id: string) => void;
//   extractImages: (html: string) => string[];
// }) => {
//   const images = extractImages(item.question_text);
//   const questionTextWithoutImages = (item.question_text || '').replace(/<img[^>]*>/g, '');

//   const options = [
//     { id: 'A', label: item.option_a || '' },
//     { id: 'B', label: item.option_b || '' },
//     { id: 'C', label: item.option_c || '' },
//     { id: 'D', label: item.option_d || '' },
//   ];

//   return (
//     <View style={[
//       styles.card,
//       isSelected && styles.cardSelected
//     ]}>
//       <View style={styles.questionRow}>
//         <Text style={styles.questionNumber}>{index + 1}.</Text>
//         <QuestionContent
//           text={questionTextWithoutImages}
//           images={images}
//           isSelected={isSelected}
//         />
//       </View>

//       <View style={styles.optionsGrid}>
//         {options.map((option) => (
//           <OptionItem
//             key={option.id}
//             id={option.id}
//             label={option.label}
//             isSelected={isSelected}
//           />
//         ))}
//       </View>

//       <TouchableOpacity
//         style={styles.selectArea}
//         activeOpacity={0.7}
//         onPress={() => onToggle(item.question_id)}
//       >
//         <View style={[
//           styles.checkBox,
//           isSelected ? styles.checkBoxSelected : styles.checkBoxDefault
//         ]}>
//           {isSelected && (
//             <Icon
//               name="check"
//               size={moderateScale(14)}
//               color={Colors.white}
//             />
//           )}
//         </View>
//         <Text style={styles.selectText}>
//           {isSelected ? 'Selected' : 'Select this question'}
//         </Text>
//       </TouchableOpacity>

//       {selectCheck === 'Solutions' && (
//         <SolutionView
//           explanation={item.explanation || ''}
//           correctOption={item.correct_option || ''}
//           isSelected={isSelected}
//         />
//       )}
//     </View>
//   );
// });

// QuestionItem.displayName = 'QuestionItem';

// // Main Component
// const QuestionListData: React.FC<Props> = ({
//   selectCheck,
//   selectedMap,
//   setSelectedMap,
//   questionsData
// }) => {
//   // Hook at the top level
//   const extractBase64Images = useCallback((html: string): string[] => {
//     const imgRegex = /<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/g;
//     const images: string[] = [];
//     let match;

//     while ((match = imgRegex.exec(html || '')) !== null) {
//       images.push(match[1]);
//     }
//     return images;
//   }, []);

//   // Hook at the top level
//   const toggleSelect = useCallback((id: string) => {
//     setSelectedMap(prev => {
//       const newMap = { ...prev };
//       if (newMap[id]) {
//         delete newMap[id];
//       } else {
//         newMap[id] = true;
//       }
//       return newMap;
//     });
//   }, [setSelectedMap]);

//   // Hook at the top level
//   const renderItem = useCallback(({ item, index }: { item: Question; index: number }) => {
//     const isSelected = !!selectedMap[item.question_id];

//     return (
//       <QuestionItem
//         item={item}
//         index={index}
//         isSelected={isSelected}
//         selectCheck={selectCheck}
//         onToggle={toggleSelect}
//         extractImages={extractBase64Images}
//       />
//     );
//   }, [selectedMap, selectCheck, toggleSelect, extractBase64Images]);

//   // Hook at the top level
//   const keyExtractor = useCallback((item: Question) => item.question_id, []);

//   // Hook at the top level
//   const extraData = useMemo(() => ({
//     selectedMap,
//     selectCheck
//   }), [selectedMap, selectCheck]);

//   // Handle empty data
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
//         initialNumToRender={5}
//         maxToRenderPerBatch={10}
//         windowSize={10}
//         removeClippedSubviews={true}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.listContent}
//         ListHeaderComponent={<View style={styles.listHeader} />}
//         ListFooterComponent={<View style={styles.listFooter} />}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.white,
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
//     paddingHorizontal: moderateScale(8),
//     paddingTop: moderateScale(8),
//   },
//   listHeader: {
//     height: moderateScale(4),
//   },
//   listFooter: {
//     height: moderateScale(20),
//   },
//   card: {
//     backgroundColor: Colors.white,
//     borderRadius: moderateScale(8),
//     padding: moderateScale(12),
//     marginBottom: moderateScale(10),
//     borderWidth: 1,
//     borderColor: 'rgba(12, 64, 111, 0.12)',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 1,

//   },
//   cardSelected: {
//     backgroundColor: '#EBF6FF',
//     borderColor: '#1E88E5',
//     borderWidth: 1.5,
//   },
//   questionRow: {
//     flexDirection: 'row',
//     // marginBottom: moderateScale(12),
//     borderWidth: 1,
//     borderColor: "red",
//     // paddingVertical:moderateScale(10)
//   },
//   questionNumber: {
//     fontSize: moderateScale(14),
//     fontWeight: '600',
//     fontFamily: Fonts.InstrumentSansSemiBold,
//     color: Colors.black,
//     marginRight: moderateScale(2),
//     // lineHeight: moderateScale(20),
//     // minWidth: moderateScale(10),
//   },
//   questionContent: {
//     flex: 1,
//   },
//   mathJaxWrapper: {
//     flex: 1,
//     borderWidth:1,
//     // height:moderateScale(60),
//     // paddingVertical:'auto',
//     backgroundColor:'red'
//   },
//   questionText: {
//     fontSize: moderateScale(13),
//     fontFamily: Fonts.InstrumentSansMedium,
//     color: Colors.black,
//     borderWidth: 1,
//     borderColor: '#000'
//     // lineHeight: moderateScale(20),
//   },
//   selectedText: {
//     backgroundColor: 'transparent',
//   },
//   imagesContainer: {
//     borderWidth: 1,
//     alignItems: 'flex-start',
//     justifyContent: "flex-start"
//   },
//   questionImage: {
//     width: '100%',
//     height: moderateScale(60),
//     borderRadius: moderateScale(4),
//     // marginBottom: moderateScale(8),
//     backgroundColor: '#f5f5f5',
//     alignSelf: "flex-start"
//   },
//   optionsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginBottom: moderateScale(8),
//   },
//   optionContainer: {
//     width: '48%',
//     minHeight: moderateScale(40),
//     paddingVertical: moderateScale(8),
//     paddingHorizontal: moderateScale(6),
//     marginBottom: moderateScale(8),
//     backgroundColor: 'rgba(245, 245, 245, 0.7)',
//     borderRadius: moderateScale(6),
//     borderWidth: 1,
//     borderColor: 'rgba(0,0,0,0.08)',
//   },
//   optionText: {
//     fontSize: moderateScale(11),
//     fontFamily: Fonts.InstrumentSansMedium,
//     color: Colors.black,
//     lineHeight: moderateScale(16),
//   },
//   optionSelected: {
//     backgroundColor: 'rgba(30, 136, 229, 0.1)',
//   },
//   selectArea: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: moderateScale(8),
//     borderTopWidth: 1,
//     borderTopColor: 'rgba(0,0,0,0.1)',
//     marginTop: moderateScale(4),
//   },
//   checkBox: {
//     width: moderateScale(20),
//     height: moderateScale(20),
//     borderRadius: moderateScale(4),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: moderateScale(10),
//   },
//   checkBoxDefault: {
//     backgroundColor: Colors.white,
//     borderWidth: 1.5,
//     borderColor: '#BFBFBF',
//   },
//   checkBoxSelected: {
//     backgroundColor: '#1E88E5',
//     borderWidth: 0,
//   },
//   selectText: {
//     fontSize: moderateScale(12),
//     fontFamily: Fonts.InstrumentSansMedium,
//     color: Colors.black,
//   },
//   solutionBox: {
//     marginTop: moderateScale(12),
//     padding: moderateScale(10),
//     backgroundColor: 'rgba(245, 245, 245, 0.8)',
//     borderRadius: moderateScale(6),
//     borderWidth: 1,
//     borderColor: 'rgba(0,0,0,0.05)',
//   },
//   solutionTitle: {
//     fontSize: moderateScale(13),
//     fontFamily: Fonts.InstrumentSansSemiBold,
//     color: Colors.black,
//     marginBottom: moderateScale(6),
//   },
//   solutionContent: {
//     flex: 1,
//   },
//   solutionText: {
//     fontSize: moderateScale(12),
//     fontFamily: Fonts.InstrumentSansRegular,
//     color: Colors.black,
//     lineHeight: moderateScale(18),
//   },
//   answerText: {
//     fontSize: moderateScale(12),
//     fontFamily: Fonts.InstrumentSansSemiBold,
//     color: Colors.black,
//     marginTop: moderateScale(8),
//   },
//   answerLabel: {
//     fontFamily: Fonts.InstrumentSansSemiBold,
//   },
// });

// export default memo(QuestionListData);


import React, { memo, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MathJax from 'react-native-mathjax';
import { moderateScale, verticalScale, scale } from '../../../../../utils/responsiveSize';
import { Colors, Fonts } from '../../../../../theme';

const { width: screenWidth } = Dimensions.get('window');

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
};

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
    // Remove the img tag from text
    text = text.replace(match[0], '');
  }
  
  // Clean HTML tags
  text = text
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]*>/g, '')
    .trim();
    
  return { text, images };
};

// Memoized Option Component with image support
const OptionItem = memo(({
  id,
  label,
  isSelected
}: {
  id: string;
  label: string;
  isSelected: boolean;
}) => {
  // Extract images and text from option label
  const { text: optionText, images: optionImages } = useMemo(() => 
    extractImagesFromHtml(label || ''), 
    [label]
  );
  
  const hasMath = containsMath(optionText);
  const hasText = optionText.trim().length > 0;
  const hasImages = optionImages.length > 0;

  return (
    <View style={[
      styles.optionContainer,
      isSelected && styles.optionContainerSelected
    ]}>
      {/* Option Text */}
      {hasText && (
        <View style={styles.optionTextContainer}>
          {hasMath ? (
            <MathJax
              mathJaxOptions={mathJaxOptions}
              html={`${id}) ${optionText}`}
              style={styles.optionMathJax}
            />
          ) : (
            <Text style={styles.optionText}>
              {id}) {optionText}
            </Text>
          )}
        </View>
      )}
      
      {/* Option Images */}
      {hasImages && (
        <View style={[
          styles.optionImagesContainer,
          hasText && styles.optionImagesWithText
        ]}>
          {optionImages.map((base64, index) => (
            <Image
              key={`option-img-${id}-${index}`}
              source={{ uri: `data:image/png;base64,${base64}` }}
              style={styles.optionImage}
              resizeMode="contain"
            />
          ))}
        </View>
      )}
    </View>
  );
});

OptionItem.displayName = 'OptionItem';

// Memoized Question Content Component
const QuestionContent = memo(({
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
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&nbsp;/g, ' ')
      .replace(/<[^>]*>/g, '');
  }, [text]);

  const hasMath = containsMath(cleanText);
  const hasText = cleanText.trim().length > 0;
  const hasImages = images.length > 0;

  return (
    <View style={styles.questionContent}>
      {/* Question Text */}
      {hasText && (
        <View style={styles.mathJaxWrapper}>
          {hasMath ? (
            <MathJax
              mathJaxOptions={mathJaxOptions}
              html={cleanText}
              style={[styles.questionMathJax, isSelected && styles.selectedText]}
            />
          ) : (
            <Text style={[styles.questionText, isSelected && styles.selectedText]}>
              {cleanText}
            </Text>
          )}
        </View>
      )}

      {/* Question Images */}
      {hasImages && (
        <View style={[
          styles.imagesContainer,
          hasText && styles.imagesWithText
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

// Memoized Solution Component
const SolutionView = memo(({
  explanation,
  correctOption,
  isSelected
}: {
  explanation: string;
  correctOption: string;
  isSelected: boolean;
}) => {
  const { text: solutionText, images: solutionImages } = useMemo(() => 
    extractImagesFromHtml(explanation || ''), 
    [explanation]
  );
  
  const hasMath = containsMath(solutionText);
  const hasText = solutionText.trim().length > 0;
  const hasImages = solutionImages.length > 0;

  return (
    <View style={styles.solutionBox}>
      <Text style={styles.solutionTitle}>Solution :</Text>
      
      {/* Solution Text */}
      {hasText && (
        <View style={styles.solutionContent}>
          {hasMath ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <MathJax
                mathJaxOptions={mathJaxOptions}
                html={solutionText}
                style={[styles.solutionMathJax, isSelected && styles.selectedText]}
              />
            </ScrollView>
          ) : (
            <Text style={[styles.solutionText, isSelected && styles.selectedText]}>
              {solutionText}
            </Text>
          )}
        </View>
      )}
      
      {/* Solution Images */}
      {hasImages && (
        <View style={[
          styles.solutionImagesContainer,
          hasText && styles.solutionImagesWithText
        ]}>
          {solutionImages.map((base64, index) => (
            <Image
              key={`solution-img-${index}`}
              source={{ uri: `data:image/png;base64,${base64}` }}
              style={styles.solutionImage}
              resizeMode="contain"
            />
          ))}
        </View>
      )}
      
      <Text style={styles.answerText}>
        <Text style={styles.answerLabel}>Answer: </Text>
        Option {correctOption || ''}
      </Text>
    </View>
  );
});

SolutionView.displayName = 'SolutionView';

// Item Component
const QuestionItem = memo(({
  item,
  index,
  isSelected,
  selectCheck,
  onToggle,
  extractImages
}: {
  item: Question;
  index: number;
  isSelected: boolean;
  selectCheck: 'Options' | 'Solutions';
  onToggle: (id: string) => void;
  extractImages: (html: string) => string[];
}) => {
  const images = extractImages(item.question_text);
  const questionTextWithoutImages = (item.question_text || '').replace(/<img[^>]*>/g, '');

  const options = [
    { id: 'A', label: item.option_a || '' },
    { id: 'B', label: item.option_b || '' },
    { id: 'C', label: item.option_c || '' },
    { id: 'D', label: item.option_d || '' },
  ];

  return (
    <View style={[
      styles.card,
      isSelected && styles.cardSelected
    ]}>
      {/* Question Row */}
      <View style={styles.questionRow}>
        <Text style={styles.questionNumber}>{index + 1}.</Text>
        <QuestionContent
          text={questionTextWithoutImages}
          images={images}
          isSelected={isSelected}
        />
      </View>

      {/* Options Grid */}
      <View style={styles.optionsGrid}>
        {options.map((option) => (
          <OptionItem
            key={option.id}
            id={option.id}
            label={option.label}
            isSelected={isSelected}
          />
        ))}
      </View>

      {/* Select Area */}
      <TouchableOpacity
        style={styles.selectArea}
        activeOpacity={0.7}
        onPress={() => onToggle(item.question_id)}
      >
        <View style={[
          styles.checkBox,
          isSelected ? styles.checkBoxSelected : styles.checkBoxDefault
        ]}>
          {isSelected && (
            <Icon
              name="check"
              size={moderateScale(14)}
              color={Colors.white}
            />
          )}
        </View>
        <Text style={styles.selectText}>
          {isSelected ? 'Selected' : 'Select this question'}
        </Text>
      </TouchableOpacity>

      {/* Solution View */}
      {selectCheck === 'Solutions' && (
        <SolutionView
          explanation={item.explanation || ''}
          correctOption={item.correct_option || ''}
          isSelected={isSelected}
        />
      )}
    </View>
  );
});

QuestionItem.displayName = 'QuestionItem';

// Main Component
const QuestionListData: React.FC<Props> = ({
  selectCheck,
  selectedMap,
  setSelectedMap,
  questionsData
}) => {
  const extractBase64Images = useCallback((html: string): string[] => {
    const imgRegex = /<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/g;
    const images: string[] = [];
    let match;
    while ((match = imgRegex.exec(html || '')) !== null) {
      images.push(match[1]);
    }
    return images;
  }, []);

  const toggleSelect = useCallback((id: string) => {
    setSelectedMap(prev => {
      const newMap = { ...prev };
      if (newMap[id]) {
        delete newMap[id];
      } else {
        newMap[id] = true;
      }
      return newMap;
    });
  }, [setSelectedMap]);

  const renderItem = useCallback(({ item, index }: { item: Question; index: number }) => {
    const isSelected = !!selectedMap[item.question_id];
    return (
      <QuestionItem
        item={item}
        index={index}
        isSelected={isSelected}
        selectCheck={selectCheck}
        onToggle={toggleSelect}
        extractImages={extractBase64Images}
      />
    );
  }, [selectedMap, selectCheck, toggleSelect, extractBase64Images]);

  const keyExtractor = useCallback((item: Question) => item.question_id, []);

  const extraData = useMemo(() => ({
    selectedMap,
    selectCheck
  }), [selectedMap, selectCheck]);

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
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(8),
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(8),
    padding: moderateScale(16),
    marginBottom: moderateScale(12),
    borderWidth: 1,
    borderColor: 'rgba(12, 64, 111, 0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardSelected: {
    backgroundColor: '#EBF6FF',
    borderColor: '#1E88E5',
    borderWidth: 1.5,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: moderateScale(12),
  },
  questionNumber: {
    fontSize: moderateScale(15),
    fontFamily: Fonts.InstrumentSansSemiBold,
    color: Colors.black,
    marginRight: moderateScale(8),
    lineHeight: moderateScale(22),
    minWidth: moderateScale(24),
  },
  questionContent: {
    flex: 1,
  },
  mathJaxWrapper: {
    flex: 1,
  },
  questionText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.InstrumentSansMedium,
    color: Colors.black,
    lineHeight: moderateScale(22),
  },
  questionMathJax: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.InstrumentSansMedium,
    color: Colors.black,
    lineHeight: moderateScale(22),
  },
  selectedText: {
    backgroundColor: 'transparent',
  },
  imagesContainer: {
    marginTop: moderateScale(4),
  },
  imagesWithText: {
    marginTop: moderateScale(12),
  },
  questionImage: {
    width: '100%',
    height: verticalScale(180),
    maxHeight: verticalScale(250),
    minHeight: verticalScale(100),
    borderRadius: moderateScale(6),
    marginBottom: moderateScale(8),
    backgroundColor: '#f5f5f5',
    alignSelf: 'center',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: moderateScale(12),
  },
  optionContainer: {
    width: '48%',
    minHeight: moderateScale(60),
    padding: moderateScale(10),
    marginBottom: moderateScale(10),
    backgroundColor: '#F8F9FA',
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  optionContainerSelected: {
    backgroundColor: 'rgba(30, 136, 229, 0.08)',
    borderColor: '#1E88E5',
  },
  optionTextContainer: {
    marginBottom: moderateScale(4),
  },
  optionText: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.InstrumentSansMedium,
    color: Colors.black,
    lineHeight: moderateScale(18),
  },
  optionMathJax: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.InstrumentSansMedium,
    color: Colors.black,
    lineHeight: moderateScale(18),
  },
  optionImagesContainer: {
    marginTop: moderateScale(4),
  },
  optionImagesWithText: {
    marginTop: moderateScale(8),
  },
  optionImage: {
    width: '100%',
    height: verticalScale(80),
    maxHeight: verticalScale(120),
    minHeight: verticalScale(60),
    borderRadius: moderateScale(4),
    marginBottom: moderateScale(4),
    backgroundColor: '#f5f5f5',
    alignSelf: 'center',
  },
  selectArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(12),
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  checkBox: {
    width: moderateScale(22),
    height: moderateScale(22),
    borderRadius: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  checkBoxDefault: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: '#BFBFBF',
  },
  checkBoxSelected: {
    backgroundColor: '#1E88E5',
    borderWidth: 0,
  },
  selectText: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.InstrumentSansMedium,
    color: Colors.black,
  },
  solutionBox: {
    // marginTop: moderateScale(16),
    padding: moderateScale(14),
    backgroundColor: '#F8F9FA',
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  solutionTitle: {
    fontSize: moderateScale(15),
    fontFamily: Fonts.InstrumentSansSemiBold,
    color: Colors.black,
    marginBottom: moderateScale(8),
  },
  solutionContent: {
    marginBottom: moderateScale(8),
  },
  solutionText: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.InstrumentSansRegular,
    color: Colors.black,
    lineHeight: moderateScale(20),
  },
  solutionMathJax: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.InstrumentSansRegular,
    color: Colors.black,
    lineHeight: moderateScale(20),
  },
  solutionImagesContainer: {
    marginTop: moderateScale(8),
  },
  solutionImagesWithText: {
    marginTop: moderateScale(12),
  },
  solutionImage: {
    width: '100%',
    height: verticalScale(150),
    maxHeight: verticalScale(200),
    minHeight: verticalScale(100),
    borderRadius: moderateScale(6),
    marginBottom: moderateScale(8),
    backgroundColor: '#f5f5f5',
    alignSelf: 'center',
  },
  answerText: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.InstrumentSansSemiBold,
    color: Colors.black,
  },
  answerLabel: {
    fontFamily: Fonts.InstrumentSansSemiBold,
  },
});

export default memo(QuestionListData);