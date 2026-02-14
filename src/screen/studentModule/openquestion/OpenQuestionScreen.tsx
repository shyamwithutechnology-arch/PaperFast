
// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import {
//     Text,
//     View,
//     StyleSheet,
//     StatusBar,
//     TouchableOpacity,
//     ScrollView,
//     Image
// } from 'react-native';
// import { Colors, Fonts } from '../../../theme';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import HeaderPaperModule from '../../../component/headerpapermodule/Headerpapermodule';
// import { moderateScale } from '../../../utils/responsiveSize';
// import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import MathJax from 'react-native-mathjax';
// const navigation = useNavigation()
// // MathJax configuration for equations
// const mathJaxOptions = {
//     messageStyle: 'none',
//     extensions: ['tex2jax.js'],
//     jax: ['input/TeX', 'output/HTML-CSS'],
//     tex2jax: {
//         inlineMath: [['$', '$'], ['\\(', '\\)']],
//         displayMath: [['$$', '$$'], ['\\[', '\\]']],
//         processEscapes: true,
//     },
//     'HTML-CSS': {
//         scale: 120,
//         linebreaks: { automatic: true }
//     }
// };

// // Helper to check if text contains math
// const containsMath = (text: string): boolean => {
//     if (!text) return false;
//     return /(\$|\\\(|\\\[|\\frac|\\sqrt|\^|_|\{|\})/.test(text);
// };

// // Extract images from HTML
// const extractImagesFromHtml = (html: string): { text: string; images: string[] } => {
//     if (!html) return { text: '', images: [] };

//     const imgRegex = /<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/g;
//     const images: string[] = [];
//     let text = html;
//     let match;

//     while ((match = imgRegex.exec(html)) !== null) {
//         images.push(match[1]);
//         text = text.replace(match[0], '');
//     }

//     // Clean HTML
//     text = text
//         .replace(/<br\s*\/?>/gi, '\n')
//         .replace(/&lt;/g, '<')
//         .replace(/&gt;/g, '>')
//         .replace(/&amp;/g, '&')
//         .replace(/&nbsp;/g, ' ')
//         .replace(/<[^>]*>/g, '')
//         .trim();

//     return { text, images };
// };

// // Option Component
// const OptionButton = ({
//     letter,
//     text,
//     isSelected,
//     isCorrect,
//     showResult,
//     onPress
// }: any) => {
//     const { text: cleanText, images } = extractImagesFromHtml(text || '');
//     const hasMath = containsMath(cleanText);
//     const hasImages = images.length > 0;

//     // Determine background color based on state
//     let bgColor = '#FFF';
//     let borderColor = '#E0E0E0';
//     let textColor = '#000';

//     if (showResult) {
//         if (isCorrect) {
//             bgColor = '#E8F5E9';
//             borderColor = '#4CAF50';
//         } else if (isSelected && !isCorrect) {
//             bgColor = '#FFEBEE';
//             borderColor = '#F44336';
//         }
//     } else if (isSelected) {
//         bgColor = '#E3F2FD';
//         borderColor = Colors.primaryColor;
//     }

//     const htmlContent = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <style>
//             body { margin:0; padding:0; font-size:14px; font-family: 'InstrumentSansRegular', sans-serif; }
//         </style>
//         </head>
//         <body>${cleanText}</body>
//         </html>
//     `;

//     return (
//         <TouchableOpacity
//             style={[styles.optionButton, { backgroundColor: bgColor, borderColor }]}
//             onPress={onPress}
//             disabled={showResult}
//             activeOpacity={0.7}
//         >
//             <View style={[
//                 styles.optionLetter,
//                 isSelected && !showResult && styles.optionLetterSelected,
//                 showResult && isCorrect && styles.optionLetterCorrect,
//                 showResult && isSelected && !isCorrect && styles.optionLetterWrong
//             ]}>
//                 <Text style={[
//                     styles.optionLetterText,
//                     (isSelected || (showResult && isCorrect)) && styles.optionLetterTextSelected
//                 ]}>{letter}</Text>
//             </View>

//             <View style={styles.optionContent}>
//                 {hasImages && (
//                     <View style={styles.optionImages}>
//                         {images.map((base64, idx) => (
//                             <Image
//                                 key={`opt-img-${idx}`}
//                                 source={{ uri: `data:image/png;base64,${base64}` }}
//                                 style={styles.optionImage}
//                                 resizeMode="contain"
//                             />
//                         ))}
//                     </View>
//                 )}

//                 {cleanText ? (
//                     hasMath ? (
//                         <MathJax
//                             mathJaxOptions={mathJaxOptions}
//                             html={htmlContent}
//                             style={styles.optionMathJax}
//                         />
//                     ) : (
//                         <Text style={styles.optionText}>{cleanText}</Text>
//                     )
//                 ) : null}
//             </View>
//         </TouchableOpacity>
//     );
// };



// useFocusEffect(
//     useCallback(() => {
//         navigation.getParent()?.setOptions({
//             tabBarStyle: { display: 'none' },
//         });
//         return () => {
//             navigation.getParent()?.setOptions({
//                 tabBarStyle: { display: 'flex' },
//             });
//         };
//     }, []))
// // Main Component
// const OpenQuestionScreen = () => {
//     const navigation = useNavigation();
//     const route = useRoute();
//     const scrollViewRef = useRef<ScrollView>(null);

//     const {
//         questions = [],
//         currentIndex = 0,
//     } = route.params || {};

//     const [currentQIndex, setCurrentQIndex] = useState(currentIndex);
//     const [selectedOption, setSelectedOption] = useState<string | null>(null);
//     const [showSolution, setShowSolution] = useState(false);
//     const [answers, setAnswers] = useState<Record<string, string>>({});

//     const currentQuestion = questions[currentQIndex] || {};
//     const totalQuestions = questions.length;
//     const questionNumber = currentQIndex + 1;

//     // Reset state when question changes
//     useEffect(() => {
//         const savedAnswer = answers[currentQuestion.question_id];
//         setSelectedOption(savedAnswer || null);
//         setShowSolution(false);
//         scrollViewRef.current?.scrollTo({ y: 0, animated: true });
//     }, [currentQIndex, currentQuestion.question_id]);

//     const handleBack = () => navigation.goBack();

//     const handleOptionSelect = (optionId: string) => {
//         setSelectedOption(optionId);
//         setAnswers(prev => ({
//             ...prev,
//             [currentQuestion.question_id]: optionId
//         }));
//     };

//     const handleCheckAnswer = () => {
//         if (!selectedOption) {
//             // Show toast or alert
//             return;
//         }
//         setShowSolution(true);
//     };

//     const handleNext = () => {
//         if (currentQIndex < totalQuestions - 1) {
//             setCurrentQIndex(prev => prev + 1);
//         }
//     };

//     const handlePrevious = () => {
//         if (currentQIndex > 0) {
//             setCurrentQIndex(prev => prev - 1);
//         }
//     };

//     // Extract question images
//     const questionImages: string[] = [];
//     const imgRegex = /<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/g;
//     let cleanQuestion = currentQuestion.question_text || '';
//     let match;
//     while ((match = imgRegex.exec(cleanQuestion)) !== null) {
//         questionImages.push(match[1]);
//         cleanQuestion = cleanQuestion.replace(match[0], '');
//     }

//     // Clean question text
//     cleanQuestion = cleanQuestion
//         .replace(/<br\s*\/?>/gi, '\n')
//         .replace(/&lt;/g, '<')
//         .replace(/&gt;/g, '>')
//         .replace(/&amp;/g, '&')
//         .replace(/&nbsp;/g, ' ')
//         .replace(/<[^>]*>/g, '')
//         .trim();

//     const questionHasMath = containsMath(cleanQuestion);

//     const questionHtml = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <style>
//             body { margin:0; padding:0; font-size:16px; font-family: 'InstrumentSansMedium', sans-serif; line-height:24px; }
//         </style>
//         </head>
//         <body>${cleanQuestion}</body>
//         </html>
//     `;

//     // Options
//     const options = [
//         { id: 'A', text: currentQuestion.option_a },
//         { id: 'B', text: currentQuestion.option_b },
//         { id: 'C', text: currentQuestion.option_c },
//         { id: 'D', text: currentQuestion.option_d },
//     ];

//     return (
//         <View style={styles.container}>
//             <StatusBar barStyle="dark-content" backgroundColor={Colors.lightThemeBlue} />

//             <SafeAreaView style={styles.headerSafe} edges={['top']}>
//                 <HeaderPaperModule
//                     title={`Question ${questionNumber} of ${totalQuestions}`}
//                     leftIconPress={handleBack}
//                 />
//             </SafeAreaView>

//             <SafeAreaView style={styles.contentSafe} edges={['left', 'right', 'bottom']}>
//                 <ScrollView
//                     ref={scrollViewRef}
//                     style={styles.scrollView}
//                     contentContainerStyle={styles.scrollContent}
//                     showsVerticalScrollIndicator={false}
//                 >
//                     {/* Question Number */}
//                     <View style={styles.questionNumberContainer}>
//                         <Text style={styles.questionNumberText}>
//                             Ques. {questionNumber}
//                         </Text>
//                     </View>

//                     {/* Question Content */}
//                     <View style={styles.questionCard}>
//                         {cleanQuestion ? (
//                             questionHasMath ? (
//                                 <MathJax
//                                     mathJaxOptions={mathJaxOptions}
//                                     html={questionHtml}
//                                     style={styles.questionMathJax}
//                                 />
//                             ) : (
//                                 <Text style={styles.questionText}>{cleanQuestion}</Text>
//                             )
//                         ) : null}

//                         {questionImages.length > 0 && (
//                             <View style={styles.questionImages}>
//                                 {questionImages.map((base64, idx) => (
//                                     <Image
//                                         key={`q-img-${idx}`}
//                                         source={{ uri: `data:image/png;base64,${base64}` }}
//                                         style={styles.questionImage}
//                                         resizeMode="contain"
//                                     />
//                                 ))}
//                             </View>
//                         )}
//                     </View>

//                     {/* Options */}
//                     <View style={styles.optionsContainer}>
//                         {options.map((opt, idx) => (
//                             <OptionButton
//                                 key={opt.id}
//                                 letter={opt.id}
//                                 text={opt.text}
//                                 isSelected={selectedOption === opt.id}
//                                 isCorrect={opt.id === currentQuestion.correct_option}
//                                 showResult={showSolution}
//                                 onPress={() => handleOptionSelect(opt.id)}
//                             />
//                         ))}
//                     </View>

//                     {/* Solution */}
//                     {showSolution && currentQuestion.explanation && (
//                         <View style={styles.solutionCard}>
//                             <Text style={styles.solutionTitle}>Solution:</Text>
//                             <Text style={styles.solutionText}>
//                                 {currentQuestion.explanation.replace(/<[^>]*>/g, '')}
//                             </Text>
//                             <Text style={styles.answerText}>
//                                 Answer: Option {currentQuestion.correct_option}
//                             </Text>
//                         </View>
//                     )}
//                 </ScrollView>

//                 {/* Bottom Buttons - Exactly as in screenshot */}
//                 <View style={styles.bottomButtons}>
//                     <TouchableOpacity
//                         style={[styles.bottomButton, styles.prevButton]}
//                         onPress={handlePrevious}
//                         disabled={currentQIndex === 0}
//                     >
//                         <Icon
//                             name="chevron-left"
//                             size={20}
//                             color={currentQIndex === 0 ? '#C7C7C7' : Colors.primaryColor}
//                         />
//                         <Text style={[
//                             styles.buttonText,
//                             currentQIndex === 0 && styles.disabledText
//                         ]}>Previous</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         style={[styles.bottomButton, styles.checkButton]}
//                         onPress={handleCheckAnswer}
//                     >
//                         <Text style={styles.checkButtonText}>Check Answer</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         style={[styles.bottomButton, styles.nextButton]}
//                         onPress={handleNext}
//                         disabled={currentQIndex === totalQuestions - 1}
//                     >
//                         <Text style={[
//                             styles.buttonText,
//                             currentQIndex === totalQuestions - 1 && styles.disabledText
//                         ]}>Next</Text>
//                         <Icon
//                             name="chevron-right"
//                             size={20}
//                             color={currentQIndex === totalQuestions - 1 ? '#C7C7C7' : Colors.primaryColor}
//                         />
//                     </TouchableOpacity>
//                 </View>
//             </SafeAreaView>
//         </View>
//     );
// };

// export default OpenQuestionScreen;
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: Colors.white
//     },
//     headerSafe: {
//         backgroundColor: Colors.lightThemeBlue
//     },
//     contentSafe: {
//         flex: 1,
//         backgroundColor: '#F5F5F5'
//     },
//     scrollView: {
//         flex: 1,
//     },
//     scrollContent: {
//         paddingBottom: moderateScale(80),
//     },
//     questionNumberContainer: {
//         paddingHorizontal: moderateScale(16),
//         paddingTop: moderateScale(16),
//         paddingBottom: moderateScale(8),
//     },
//     questionNumberText: {
//         fontSize: moderateScale(14),
//         color: Colors.primaryColor,
//         fontFamily: Fonts.InstrumentSansSemiBold,
//     },
//     questionCard: {
//         backgroundColor: Colors.white,
//         marginHorizontal: moderateScale(16),
//         borderRadius: moderateScale(8),
//         padding: moderateScale(16),
//         marginBottom: moderateScale(16),
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.1,
//         shadowRadius: 2,
//         elevation: 2,
//     },
//     questionText: {
//         fontSize: moderateScale(15),
//         fontFamily: Fonts.InstrumentSansMedium,
//         color: Colors.black,
//         lineHeight: moderateScale(22),
//     },
//     questionMathJax: {
//         fontSize: moderateScale(15),
//         fontFamily: Fonts.InstrumentSansMedium,
//         color: Colors.black,
//     },
//     questionImages: {
//         marginTop: moderateScale(12),
//         alignItems: 'center',
//     },
//     questionImage: {
//         width: '100%',
//         height: moderateScale(150),
//         resizeMode: 'contain',
//     },
//     optionsContainer: {
//         marginHorizontal: moderateScale(16),
//     },
//     optionButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: Colors.white,
//         borderRadius: moderateScale(8),
//         borderWidth: 1,
//         borderColor: '#E0E0E0',
//         marginBottom: moderateScale(10),
//         padding: moderateScale(12),
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.05,
//         shadowRadius: 1,
//         elevation: 1,
//     },
//     optionLetter: {
//         width: moderateScale(32),
//         height: moderateScale(32),
//         borderRadius: moderateScale(16),
//         backgroundColor: '#F0F0F0',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginRight: moderateScale(12),
//     },
//     optionLetterSelected: {
//         backgroundColor: Colors.primaryColor,
//     },
//     optionLetterCorrect: {
//         backgroundColor: '#4CAF50',
//     },
//     optionLetterWrong: {
//         backgroundColor: '#F44336',
//     },
//     optionLetterText: {
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansSemiBold,
//         color: Colors.black,
//     },
//     optionLetterTextSelected: {
//         color: Colors.white,
//     },
//     optionContent: {
//         flex: 1,
//     },
//     optionText: {
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansRegular,
//         color: Colors.black,
//         lineHeight: moderateScale(20),
//     },
//     optionMathJax: {
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansRegular,
//         color: Colors.black,
//     },
//     optionImages: {
//         marginBottom: moderateScale(8),
//     },
//     optionImage: {
//         width: '100%',
//         height: moderateScale(100),
//         resizeMode: 'contain',
//     },
//     solutionCard: {
//         backgroundColor: '#FFF9C4',
//         marginHorizontal: moderateScale(16),
//         marginTop: moderateScale(16),
//         marginBottom: moderateScale(8),
//         borderRadius: moderateScale(8),
//         padding: moderateScale(16),
//         borderLeftWidth: 4,
//         borderLeftColor: '#FFC107',
//     },
//     solutionTitle: {
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansSemiBold,
//         color: Colors.black,
//         marginBottom: moderateScale(8),
//     },
//     solutionText: {
//         fontSize: moderateScale(13),
//         fontFamily: Fonts.InstrumentSansRegular,
//         color: Colors.black,
//         lineHeight: moderateScale(18),
//         marginBottom: moderateScale(8),
//     },
//     answerText: {
//         fontSize: moderateScale(13),
//         fontFamily: Fonts.InstrumentSansSemiBold,
//         color: '#2E7D32',
//     },
//     bottomButtons: {
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         flexDirection: 'row',
//         backgroundColor: Colors.white,
//         borderTopWidth: 1,
//         borderTopColor: '#E0E0E0',
//         paddingVertical: moderateScale(8),
//         paddingHorizontal: moderateScale(16),
//     },
//     bottomButton: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingVertical: moderateScale(10),
//         borderRadius: moderateScale(6),
//     },
//     prevButton: {
//         marginRight: moderateScale(4),
//     },
//     checkButton: {
//         backgroundColor: Colors.primaryColor,
//         marginHorizontal: moderateScale(4),
//     },
//     nextButton: {
//         marginLeft: moderateScale(4),
//     },
//     buttonText: {
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansMedium,
//         color: Colors.primaryColor,
//         marginHorizontal: moderateScale(4),
//     },
//     checkButtonText: {
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansSemiBold,
//         color: Colors.white,
//     },
//     disabledText: {
//         color: '#C7C7C7',
//     },
// });

// ****************
// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import {
//     Text,
//     View,
//     StyleSheet,
//     StatusBar,
//     TouchableOpacity,
//     ScrollView,
//     Image,
//     Pressable
// } from 'react-native';
// import { Colors, Fonts } from '../../../theme';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import HeaderPaperModule from '../../../component/headerpapermodule/Headerpapermodule';
// import { moderateScale } from '../../../utils/responsiveSize';
// import { useFocusEffect, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import MathJax from 'react-native-mathjax';
// import BookMark from "react-native-vector-icons/Ionicons";

// // 注意：这里删除了错误的 const navigation = useNavigation()

// // MathJax configuration for equations
// const mathJaxOptions = {
//     messageStyle: 'none',
//     extensions: ['tex2jax.js'],
//     jax: ['input/TeX', 'output/HTML-CSS'],
//     tex2jax: {
//         inlineMath: [['$', '$'], ['\\(', '\\)']],
//         displayMath: [['$$', '$$'], ['\\[', '\\]']],
//         processEscapes: true,
//     },
//     'HTML-CSS': {
//         scale: 120,
//         linebreaks: { automatic: true }
//     }
// };

// // Helper to check if text contains math
// const containsMath = (text: string): boolean => {
//     if (!text) return false;
//     return /(\$|\\\(|\\\[|\\frac|\\sqrt|\^|_|\{|\})/.test(text);
// };

// // Extract images from HTML
// const extractImagesFromHtml = (html: string): { text: string; images: string[] } => {
//     if (!html) return { text: '', images: [] };

//     const imgRegex = /<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/g;
//     const images: string[] = [];
//     let text = html;
//     let match;

//     while ((match = imgRegex.exec(html)) !== null) {
//         images.push(match[1]);
//         text = text.replace(match[0], '');
//     }

//     // Clean HTML
//     text = text
//         .replace(/<br\s*\/?>/gi, '\n')
//         .replace(/&lt;/g, '<')
//         .replace(/&gt;/g, '>')
//         .replace(/&amp;/g, '&')
//         .replace(/&nbsp;/g, ' ')
//         .replace(/<[^>]*>/g, '')
//         .trim();

//     return { text, images };
// };

// // Option Component
// const OptionButton = ({
//     letter,
//     text,
//     isSelected,
//     isCorrect,
//     showResult,
//     onPress,
//     selectedStatus
// }: any) => {
//     const { text: cleanText, images } = extractImagesFromHtml(text || '');
//     const hasMath = containsMath(cleanText);
//     const hasImages = images.length > 0;


//     // Determine background color based on state
//     let bgColor = '#FFF';
//     let borderColor = '#E0E0E0';
//     let textColor = '#000';

//     if (showResult) {
//         if (isCorrect) {
//             bgColor = '#E8F5E9';
//             borderColor = '#4CAF50';
//         } else if (isSelected && !isCorrect) {
//             bgColor = '#FFEBEE';
//             borderColor = '#F44336';
//         }
//     } else if (isSelected) {
//         bgColor = '#E3F2FD';
//         borderColor = Colors.primaryColor;
//     }

//     const htmlContent = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <style>
//             body { margin:0; padding:0; font-size:11px; font-family: 'InstrumentSansRegular', sans-serif; lineHeight :18px }
//         </style>
//         </head>
//         <body>${cleanText}</body>
//         </html>
//     `;

//     return (
//         <TouchableOpacity
//             style={[styles.optionButton, { backgroundColor: bgColor, borderColor },]}
//             onPress={onPress}
//             disabled={showResult}
//             activeOpacity={0.7}
//         >
//             <View style={[
//                 styles.optionLetter,
//                 isSelected && !showResult && styles.optionLetterSelected,
//                 showResult && isCorrect && styles.optionLetterCorrect,
//                 showResult && isSelected && !isCorrect && styles.optionLetterWrong
//             ]}>
//                 <Text style={[
//                     styles.optionLetterText,
//                     (isSelected || (showResult && isCorrect)) && styles.optionLetterTextSelected
//                 ]}>{letter}</Text>
//             </View>

//             <View style={styles.optionContent}>
//                 {hasImages && (
//                     <View style={styles.optionImages}>
//                         {images.map((base64, idx) => (
//                             <Image
//                                 key={`opt-img-${idx}`}
//                                 source={{ uri: `data:image/png;base64,${base64}` }}
//                                 style={styles.optionImage}
//                                 resizeMode="contain"
//                             />
//                         ))}
//                     </View>
//                 )}

//                 {cleanText ? (
//                     hasMath ? (
//                         <MathJax
//                             mathJaxOptions={mathJaxOptions}
//                             html={htmlContent}
//                             style={[styles.optionMathJax, isSelected && { backgroundColor: Colors.lightThemeBlue }, showResult && isCorrect && { backgroundColor: '#E8F5E9' }, showResult && isSelected && !isCorrect && { backgroundColor: '#FFEBEE' }]}
//                         />
//                     ) : (
//                         <Text style={styles.optionText}>{cleanText}</Text>
//                     )
//                 ) : null}
//             </View>
//         </TouchableOpacity>
//     );
// };

// // Main Component
// const OpenQuestionScreen = () => {
//     const navigation = useNavigation();  // ✅ 正确：在组件内部调用
//     const route = useRoute();  // ✅ 正确：在组件内部调用
//     const scrollViewRef = useRef<ScrollView>(null);
//     const isFocused = useIsFocused()

//     useFocusEffect(
//         useCallback(() => {
//             navigation.getParent()?.setOptions({
//                 tabBarStyle: { display: 'none' },
//             })

//             return () => {
//                 navigation.getParent()?.setOptions({
//                     tabBarStyle: { display: 'flex' },
//                 });
//             };
//         }, []))

//     const {
//         questions = [],
//         currentIndex = 0,
//     } = route.params || {};

//     const [currentQIndex, setCurrentQIndex] = useState(currentIndex);
//     const [selectedOption, setSelectedOption] = useState<string | null>(null);
//     console.log('selectedOption', selectedOption);

//     const [showSolution, setShowSolution] = useState(false);
//     const [answers, setAnswers] = useState<Record<string, string>>({});

//     const currentQuestion = questions[currentQIndex] || {};
//     const totalQuestions = questions.length;
//     const questionNumber = currentQIndex + 1;

//     // Reset state when question changes
//     useEffect(() => {
//         const savedAnswer = answers[currentQuestion.question_id];
//         setSelectedOption(savedAnswer || null);
//         setShowSolution(false);
//         scrollViewRef.current?.scrollTo({ y: 0, animated: true });
//     }, [currentQIndex, currentQuestion.question_id]);

//     const handleBack = () => navigation.goBack();

//     const handleOptionSelect = (optionId: string) => {
//         setSelectedOption(optionId);
//         setAnswers(prev => ({
//             ...prev,
//             [currentQuestion.question_id]: optionId
//         }));
//     };

//     console.log('selectedOption', selectedOption);

//     const handleCheckAnswer = () => {
//         if (!selectedOption) {
//             // Show toast or alert
//             return;
//         }
//         setShowSolution(true);
//     };

//     const handleNext = () => {
//         if (currentQIndex < totalQuestions - 1) {
//             setCurrentQIndex(prev => prev + 1);
//         }
//     };

//     const handlePrevious = () => {
//         if (currentQIndex > 0) {
//             setCurrentQIndex(prev => prev - 1);
//         }
//     };

//     // Extract question images
//     const questionImages: string[] = [];
//     const imgRegex = /<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/g;
//     let cleanQuestion = currentQuestion.question_text || '';
//     let match;
//     while ((match = imgRegex.exec(cleanQuestion)) !== null) {
//         questionImages.push(match[1]);
//         cleanQuestion = cleanQuestion.replace(match[0], '');
//     }

//     // Clean question text
//     cleanQuestion = cleanQuestion
//         .replace(/<br\s*\/?>/gi, '\n')
//         .replace(/&lt;/g, '<')
//         .replace(/&gt;/g, '>')
//         .replace(/&amp;/g, '&')
//         .replace(/&nbsp;/g, ' ')
//         .replace(/<[^>]*>/g, '')
//         .trim();

//     const questionHasMath = containsMath(cleanQuestion);

//     const questionHtml = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <style>
//             body { margin:0; padding:0; font-size:15px; font-family: 'InstrumentSansMedium', sans-serif; line-height:24px; }
//         </style>
//         </head>
//         <body>${cleanQuestion}</body>
//         </html>
//     `;

//     // Options
//     const options = [
//         { id: 'A', text: currentQuestion.option_a },
//         { id: 'B', text: currentQuestion.option_b },
//         { id: 'C', text: currentQuestion.option_c },
//         { id: 'D', text: currentQuestion.option_d },
//     ];

//     return (
//         <View style={styles.container}>
//             <StatusBar barStyle="dark-content" backgroundColor={Colors.lightThemeBlue} />

//             <SafeAreaView style={styles.headerSafe} edges={['top']}>
//                 <HeaderPaperModule
//                     title={`Q ${questionNumber} of ${totalQuestions}`}
//                     leftIconPress={handleBack}
//                 />
//             </SafeAreaView>

//             <SafeAreaView style={styles.contentSafe} edges={['left', 'right', 'bottom']}>
//                 <ScrollView
//                     ref={scrollViewRef}
//                     style={styles.scrollView}
//                     contentContainerStyle={styles.scrollContent}
//                     showsVerticalScrollIndicator={false}
//                 >
//                     {/* Question Number */}
//                     <View style={styles.questionNumberContainer}>
//                         <Text style={styles.questionNumberText}>
//                             Ques. {questionNumber}
//                         </Text>
//                         <Pressable>
//                             <BookMark name='bookmark-outline' size={moderateScale(22)} color={Colors.primaryColor} />
//                         </Pressable>
//                     </View>


//                     {/* Question Content */}
//                     <View style={styles.questionCard}>
//                         {cleanQuestion ? (
//                             questionHasMath ? (
//                                 <MathJax
//                                     mathJaxOptions={mathJaxOptions}
//                                     html={questionHtml}
//                                     style={styles.questionMathJax}
//                                 />
//                             ) : (
//                                 <Text style={styles.questionText}>{cleanQuestion}</Text>
//                             )
//                         ) : null}

//                         {questionImages.length > 0 && (
//                             <View style={styles.questionImages}>
//                                 {questionImages.map((base64, idx) => (
//                                     <Image
//                                         key={`q-img-${idx}`}
//                                         source={{ uri: `data:image/png;base64,${base64}` }}
//                                         style={styles.questionImage}
//                                         resizeMode="contain"
//                                     />
//                                 ))}
//                             </View>
//                         )}
//                     </View>

//                     {/* Options */}
//                     <View style={styles.optionsContainer}>
//                         {options.map((opt, idx) => (
//                             <OptionButton
//                                 key={opt.id}
//                                 letter={opt.id}
//                                 text={opt.text}
//                                 isSelected={selectedOption === opt.id}
//                                 isCorrect={opt.id === currentQuestion.correct_option}
//                                 showResult={showSolution}
//                                 onPress={() => handleOptionSelect(opt.id)}
//                                 selectedStatus={selectedOption}
//                             />
//                         ))}
//                     </View>

//                     {/* Solution */}
//                     {showSolution && currentQuestion.explanation && (
//                         <View style={styles.solutionCard}>
//                             <Text style={styles.solutionTitle}>Solution:</Text>
//                             <Text style={styles.solutionText}>
//                                 {currentQuestion.explanation.replace(/<[^>]*>/g, '')}
//                             </Text>
//                             <Text style={styles.answerText}>
//                                 Answer: Option {currentQuestion.correct_option}
//                             </Text>
//                         </View>
//                     )}
//                 </ScrollView>

//                 {/* Bottom Buttons - Exactly as in screenshot */}
//                 <View style={styles.bottomButtons}>
//                     <TouchableOpacity
//                         style={[styles.bottomButton, styles.prevButton, currentQIndex === 0 && { borderColor: '#C7C7C7' }]}
//                         onPress={handlePrevious}
//                         disabled={currentQIndex === 0}
//                     >
//                         <Icon
//                             name="chevron-left"
//                             size={20}
//                             color={currentQIndex === 0 ? '#C7C7C7' : Colors.primaryColor}
//                         />
//                         <Text style={[
//                             styles.buttonText,
//                             currentQIndex === 0 && styles.disabledText
//                         ]}>Previous</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         //  styles.checkButton
//                         style={[styles.bottomButton, { borderWidth: 0 }, selectedOption !== null ? styles.checkButton : { backgroundColor: '#C7C7C7' }]}
//                         onPress={handleCheckAnswer}
//                         disabled={selectedOption === null ? true : false}>
//                         <Text style={[styles.checkButtonText, selectedOption !== null && { color: Colors.white }]}>Check Answer</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         style={[styles.bottomButton, styles.nextButton, currentQIndex === totalQuestions - 1 && { borderColor: '#C7C7C7' }]}
//                         onPress={handleNext}
//                         disabled={currentQIndex === totalQuestions - 1}>
//                         <Text style={[
//                             styles.buttonText,
//                             currentQIndex === totalQuestions - 1 && styles.disabledText
//                         ]}>Next</Text>
//                         <Icon
//                             name="chevron-right"
//                             size={20}
//                             color={currentQIndex === totalQuestions - 1 ? '#C7C7C7' : Colors.primaryColor}
//                         />
//                     </TouchableOpacity>
//                 </View>
//             </SafeAreaView>
//         </View>
//     );
// };

// export default OpenQuestionScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: Colors.white
//     },
//     headerSafe: {
//         backgroundColor: Colors.lightThemeBlue
//     },
//     contentSafe: {
//         flex: 1,
//         backgroundColor: '#F5F5F5'
//     },
//     scrollView: {
//         flex: 1,
//     },
//     scrollContent: {
//         paddingBottom: moderateScale(80),
//     },
//     questionNumberContainer: {
//         paddingHorizontal: moderateScale(16),
//         paddingTop: moderateScale(16),
//         paddingBottom: moderateScale(8),
//         borderWidth: 1,
//         flexDirection: 'row',
//         justifyContent: "space-between",
//         alignItems: 'center'
//     },
//     questionNumberText: {
//         fontSize: moderateScale(14),
//         color: Colors.primaryColor,
//         fontFamily: Fonts.InstrumentSansSemiBold,
//     },
//     questionCard: {
//         backgroundColor: Colors.white,
//         marginHorizontal: moderateScale(16),
//         // borderRadius: moderateScale(8),
//         // padding: moderateScale(16),
//         paddingHorizontal: moderateScale(1),
//         marginBottom: moderateScale(16),
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.1,
//         shadowRadius: 2,
//         // borderBottomWidth: 1,
//         // borderBlockColor: 'rgba(12, 64, 111, 0.12)'
//         borderWidth: 1
//         // elevation: 2,
//     },
//     questionText: {
//         fontSize: moderateScale(15),
//         fontFamily: Fonts.InstrumentSansMedium,
//         color: Colors.black,
//         lineHeight: moderateScale(22),
//     },
//     questionMathJax: {
//         fontSize: moderateScale(15),
//         fontFamily: Fonts.InstrumentSansMedium,
//         color: Colors.black,
//     },
//     questionImages: {
//         // marginTop: moderateScale(12),
//         alignItems: 'center',
//         // borderWidth:1
//     },
//     questionImage: {
//         width: '100%',
//         height: moderateScale(100),
//         resizeMode: 'contain',
//     },
//     optionsContainer: {
//         marginHorizontal: moderateScale(16),
//         borderWidth: 1
//     },
//     optionButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: Colors.white,
//         borderRadius: moderateScale(8),
//         // borderWidth: 1,
//         // borderColor: '#E0E0E0',
//         marginBottom: moderateScale(10),
//         padding: moderateScale(12),
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.05,
//         shadowRadius: 1,
//         elevation: 1,
//     },
//     optionLetter: {
//         width: moderateScale(25),
//         height: moderateScale(25),
//         borderRadius: moderateScale(16),
//         // backgroundColor: '#e7e3e3',
//         backgroundColor: '#e7e3e3',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginRight: moderateScale(12),
//     },
//     optionLetterSelected: {
//         backgroundColor: Colors.primaryColor,
//     },
//     optionLetterCorrect: {
//         backgroundColor: '#4CAF50',
//     },
//     optionLetterWrong: {
//         backgroundColor: '#F44336',
//     },
//     optionLetterText: {
//         fontSize: moderateScale(13),
//         fontFamily: Fonts.InstrumentSansSemiBold,
//         color: Colors.black,
//     },
//     optionLetterTextSelected: {
//         color: Colors.white,
//     },
//     optionContent: {
//         flex: 1,
//         // borderWidth:1,
//         // marginLeft:moderateScale(-25)
//     },
//     optionText: {
//         fontSize: moderateScale(12),
//         fontFamily: Fonts.InstrumentSansRegular,
//         color: Colors.black,
//         lineHeight: moderateScale(18),
//     },
//     optionMathJax: {
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansRegular,
//         color: Colors.black,
//         // backgroundColor:Colors.lightThemeBlue
//     },
//     optionImages: {
//         marginBottom: moderateScale(8),
//     },
//     optionImage: {
//         width: '100%',
//         height: moderateScale(100),
//         resizeMode: 'contain',
//     },
//     solutionCard: {
//         backgroundColor: '#FFF9C4',
//         marginHorizontal: moderateScale(16),
//         marginTop: moderateScale(16),
//         marginBottom: moderateScale(8),
//         borderRadius: moderateScale(8),
//         padding: moderateScale(16),
//         borderLeftWidth: 4,
//         borderLeftColor: '#FFC107',
//     },
//     solutionTitle: {
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansSemiBold,
//         color: Colors.black,
//         marginBottom: moderateScale(8),
//     },
//     solutionText: {
//         fontSize: moderateScale(13),
//         fontFamily: Fonts.InstrumentSansRegular,
//         color: Colors.black,
//         lineHeight: moderateScale(18),
//         marginBottom: moderateScale(8),
//     },
//     answerText: {
//         fontSize: moderateScale(13),
//         fontFamily: Fonts.InstrumentSansSemiBold,
//         color: '#2E7D32',
//     },
//     bottomButtons: {
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         flexDirection: 'row',
//         backgroundColor: Colors.white,
//         borderTopWidth: 1,
//         borderTopColor: '#E0E0E0',
//         paddingVertical: moderateScale(16),
//         paddingHorizontal: moderateScale(16),
//         // marginBottom: moderateScale(18),
//         elevation: 50
//     },
//     bottomButton: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingVertical: moderateScale(5),
//         borderRadius: moderateScale(6),
//         borderWidth: 1,
//         borderColor: Colors.primaryColor,
//         // backgroundColor: '#C7C7C7'
//     },
//     prevButton: {
//         marginRight: moderateScale(4),
//     },
//     checkButton: {
//         backgroundColor: Colors.primaryColor,
//         marginHorizontal: moderateScale(4),
//     },
//     nextButton: {
//         marginLeft: moderateScale(4),
//     },
//     buttonText: {
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansMedium,
//         color: Colors.primaryColor,
//         marginHorizontal: moderateScale(4),
//     },
//     checkButtonText: {
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansSemiBold,
//         color: Colors.white,
//     },
//     disabledText: {
//         color: '#C7C7C7',
//     },
// });

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Image,
    Pressable
} from 'react-native';
import { Colors, Fonts } from '../../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderPaperModule from '../../../component/headerpapermodule/Headerpapermodule';
import { moderateScale } from '../../../utils/responsiveSize';
import { useFocusEffect, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MathJax from 'react-native-mathjax';
import BookMark from "react-native-vector-icons/Ionicons";
import { Icons } from '../../../assets/icons';
import ClockIcon from "react-native-vector-icons/FontAwesome6";
import SettingIcon from "react-native-vector-icons/SimpleLineIcons";

// import Setting from "react-native-vector-icons/SimpleLineIcons";

// MathJax configuration for equations
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
        scale: 120,
        linebreaks: { automatic: true }
    }
};

// Helper to check if text contains math
const containsMath = (text: string): boolean => {
    if (!text) return false;
    return /(\$|\\\(|\\\[|\\frac|\\sqrt|\^|_|\{|\})/.test(text);
};

// Extract images from HTML
const extractImagesFromHtml = (html: string): { text: string; images: string[] } => {
    if (!html) return { text: '', images: [] };

    const imgRegex = /<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/g;
    const images: string[] = [];
    let text = html;
    let match;

    while ((match = imgRegex.exec(html)) !== null) {
        images.push(match[1]);
        text = text.replace(match[0], '');
    }

    // Clean HTML
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

// Option Component
const OptionButton = ({
    letter,
    text,
    isSelected,
    isCorrect,
    showResult,
    onPress,
    selectedStatus
}: any) => {
    const { text: cleanText, images } = extractImagesFromHtml(text || '');
    const hasMath = containsMath(cleanText);
    const hasImages = images.length > 0;


    // Determine background color based on state
    let bgColor = '#FFF';
    let borderColor = '#E0E0E0';
    let textColor = '#000';

    if (showResult) {
        if (isCorrect) {
            bgColor = '#E8F5E9';
            borderColor = '#4CAF50';
        } else if (isSelected && !isCorrect) {
            bgColor = '#FFEBEE';
            borderColor = '#F44336';
        }
    } else if (isSelected) {
        bgColor = '#E3F2FD';
        borderColor = Colors.primaryColor;
    }

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { margin:0; padding:0; font-size:11px; font-family: 'InstrumentSansRegular', sans-serif; lineHeight :18px }
        </style>
        </head>
        <body>${cleanText}</body>
        </html>
    `;
    return (
        <TouchableOpacity
            style={[styles.optionButton, { backgroundColor: bgColor, borderColor },]}
            onPress={onPress}
            disabled={showResult}
            activeOpacity={0.7}
        >
            <View style={[
                styles.optionLetter,
                isSelected && !showResult && styles.optionLetterSelected,
                showResult && isCorrect && styles.optionLetterCorrect,
                showResult && isSelected && !isCorrect && styles.optionLetterWrong
            ]}>
                <Text style={[
                    styles.optionLetterText,
                    (isSelected || (showResult && isCorrect)) && styles.optionLetterTextSelected
                ]}>{letter}</Text>
            </View>

            <View style={styles.optionContent}>
                {hasImages && (
                    <View style={styles.optionImages}>
                        {images.map((base64, idx) => (
                            <Image
                                key={`opt-img-${idx}`}
                                source={{ uri: `data:image/png;base64,${base64}` }}
                                style={styles.optionImage}
                                resizeMode="contain"
                            />
                        ))}
                    </View>
                )}

                {cleanText ? (
                    hasMath ? (
                        <MathJax
                            mathJaxOptions={mathJaxOptions}
                            html={htmlContent}
                            style={[styles.optionMathJax, isSelected && { backgroundColor: Colors.lightThemeBlue }, showResult && isCorrect && { backgroundColor: '#E8F5E9' }, showResult && isSelected && !isCorrect && { backgroundColor: '#FFEBEE' }]}
                        />
                    ) : (
                        <Text style={styles.optionText}>{cleanText}</Text>
                    )
                ) : null}
            </View>
        </TouchableOpacity>
    );
};

// Main Component
const OpenQuestionScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const scrollViewRef = useRef<ScrollView>(null);
    const isFocused = useIsFocused()

    useFocusEffect(
        useCallback(() => {
            navigation.getParent()?.setOptions({
                tabBarStyle: { display: 'none' },
            })

            return () => {
                navigation.getParent()?.setOptions({
                    tabBarStyle: { display: 'flex' },
                });
            };
        }, []))

    const {
        questions = [],
        currentIndex = 0,
    } = route.params || {};

    const [currentQIndex, setCurrentQIndex] = useState(currentIndex);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    console.log('selectedOption', selectedOption);

    const [showSolution, setShowSolution] = useState(false);
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const currentQuestion = questions[currentQIndex] || {};
    const totalQuestions = questions.length;
    const questionNumber = currentQIndex + 1;

    // Reset state when question changes
    useEffect(() => {
        const savedAnswer = answers[currentQuestion.question_id];
        setSelectedOption(savedAnswer || null);
        setShowSolution(false);
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, [currentQIndex, currentQuestion.question_id]);

    const handleBack = () => navigation.goBack();

    const handleOptionSelect = (optionId: string) => {
        setSelectedOption(optionId);
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.question_id]: optionId
        }));
    };

    console.log('selectedOption', selectedOption);

    const handleCheckAnswer = () => {
        if (!selectedOption) {
            // Show toast or alert
            return;
        }
        setShowSolution(true);
    };

    const handleNext = () => {
        if (currentQIndex < totalQuestions - 1) {
            setCurrentQIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQIndex > 0) {
            setCurrentQIndex(prev => prev - 1);
        }
    };

    // Extract question images
    const questionImages: string[] = [];
    const imgRegex = /<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/g;
    let cleanQuestion = currentQuestion.question_text || '';
    let match;
    while ((match = imgRegex.exec(cleanQuestion)) !== null) {
        questionImages.push(match[1]);
        cleanQuestion = cleanQuestion.replace(match[0], '');
    }

    // Clean question text
    cleanQuestion = cleanQuestion
        .replace(/<br\s*\/?>/gi)
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&nbsp;/g, ' ')
        .replace(/<[^>]*>/g, '')
        .trim();

    const questionHasMath = containsMath(cleanQuestion);

    const questionHtml = `
        <!DOCTYPE html>
        <html>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { margin:0; padding:0; font-size:15px; font-family: 'InstrumentSansMedium', sans-serif; line-height:24px; }
        </style>
        </head>
        <body>${cleanQuestion}</body>
        </html>
    `;

    // Options
    const options = [
        { id: 'A', text: currentQuestion.option_a },
        { id: 'B', text: currentQuestion.option_b },
        { id: 'C', text: currentQuestion.option_c },
        { id: 'D', text: currentQuestion.option_d },
    ];
    const handlePress = () => {
        navigation.goBack()
    }
    console.log('chaperName', route.params);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.lightThemeBlue} />

            <SafeAreaView style={styles.headerSafe} edges={['top']}>
                {/* <HeaderPaperModule
                    title={`Q ${questionNumber} of ${totalQuestions}`}
                    leftIconPress={handleBack}
                /> */}
                <TouchableOpacity onPress={handlePress} style={{ paddingLeft: moderateScale(1), width: moderateScale(40) }}>
                    {/* <FontAwesome6 name="arrow-left" size={moderateScale(20)} color="#000"
                                    /> */}
                    <Image source={Icons?.back} style={styles.backImg} resizeMode="contain" />
                </TouchableOpacity>
                <Text style={[styles.title]} numberOfLines={1}>
                    {questionNumber} of {totalQuestions}
                </Text>
                {/* <View style={styles.counderBox}>
                    <ClockIcon name="clock-rotate-left" size={moderateScale(15)} color="#5DAAEE" />
                    <Text style={styles.counterText}>00:08</Text>
                </View>

                <SettingIcon name="settings" size={moderateScale(22)} color={Colors.primaryColor} /> */}
            </SafeAreaView>

            <SafeAreaView style={styles.contentSafe} edges={['left', 'right', 'bottom']}>
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}>
                    {/* Question Number */}
                    <View style={styles.questionNumberContainer}>
                        <Text style={styles.questionNumberText}>
                            Ques. {questionNumber}
                        </Text>
                        {/* <Pressable>
                            <BookMark name='bookmark-outline' size={moderateScale(22)} color={Colors.primaryColor} />
                        </Pressable> */}
                    </View>


                    {/* Question Content */}
                    <View style={styles.questionCard}>
                        {cleanQuestion ? (
                            questionHasMath ? (
                                <MathJax
                                    mathJaxOptions={mathJaxOptions}
                                    html={questionHtml}
                                    style={styles.questionMathJax}
                                />
                            ) : (
                                <Text style={styles.questionText}>{cleanQuestion}</Text>
                            )
                        ) : null}

                        {questionImages.length > 0 && (
                            <View style={styles.questionImages}>
                                {questionImages.map((base64, idx) => (
                                    <Image
                                        key={`q-img-${idx}`}
                                        source={{ uri: `data:image/png;base64,${base64}` }}
                                        style={styles.questionImage}
                                        resizeMode="contain"
                                    />
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Options */}
                    <View style={styles.optionsContainer}>
                        {options.map((opt, idx) => (
                            <OptionButton
                                key={opt.id}
                                letter={opt.id}
                                text={opt.text}
                                isSelected={selectedOption === opt.id}
                                isCorrect={opt.id === currentQuestion.correct_option}
                                showResult={showSolution}
                                onPress={() => handleOptionSelect(opt.id)}
                                selectedStatus={selectedOption}
                            />
                        ))}
                    </View>

                    {/* Fixed Solution Section - Now using MathJax for proper HTML rendering */}
                    {showSolution && currentQuestion.explanation && (
                        <View style={styles.solutionCard}>
                            <Text style={styles.solutionTitle}>Solution:</Text>
                            <MathJax
                                mathJaxOptions={mathJaxOptions}
                                html={`
                                    <!DOCTYPE html>
                                    <html>
                                    <head>
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <style>
                                        body { 
                                            margin:0; 
                                            padding:0; 
                                            font-size:13px; 
                                            font-family: 'InstrumentSansRegular', sans-serif; 
                                            line-height:20px;
                                            color: #000000;
                                            background-color: #FFF9C4;
                                             border-color: #000000;
                        // border-width: 1px;
                        // border-style: solid;
                        padding-bottom:10px
                                        }
                                    </style>
                                    </head>
                                    <body>${currentQuestion.explanation}</body>
                                    </html>
                                `}
                                style={styles.solutionMathJax}
                            />
                            <Text style={styles.answerText}>
                                Answer: Option {currentQuestion.correct_option}
                            </Text>
                        </View>
                    )}
                </ScrollView>

                {/* Bottom Buttons */}
                <View style={styles.bottomButtons}>
                    <TouchableOpacity
                        style={[styles.bottomButton, styles.prevButton, currentQIndex === 0 && { borderColor: '#C7C7C7' }]}
                        onPress={handlePrevious}
                        disabled={currentQIndex === 0}
                    >
                        <Icon
                            name="chevron-left"
                            size={20}
                            color={currentQIndex === 0 ? '#C7C7C7' : Colors.primaryColor}
                        />
                        <Text style={[
                            styles.buttonText,
                            currentQIndex === 0 && styles.disabledText
                        ]}>Previous</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.bottomButton, { borderWidth: 0 }, selectedOption !== null ? styles.checkButton : { backgroundColor: '#C7C7C7' }]}
                        onPress={handleCheckAnswer}
                        disabled={selectedOption === null ? true : false}>
                        <Text style={[styles.checkButtonText, selectedOption !== null && { color: Colors.white }]}>Check Answer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.bottomButton, styles.nextButton, currentQIndex === totalQuestions - 1 && { borderColor: '#C7C7C7' }]}
                        onPress={handleNext}
                        disabled={currentQIndex === totalQuestions - 1}>
                        <Text style={[
                            styles.buttonText,
                            currentQIndex === totalQuestions - 1 && styles.disabledText
                        ]}>Next</Text>
                        <Icon
                            name="chevron-right"
                            size={20}
                            color={currentQIndex === totalQuestions - 1 ? '#C7C7C7' : Colors.primaryColor}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};

export default OpenQuestionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    headerSafe: {
        backgroundColor: Colors.lightThemeBlue,
        paddingHorizontal: moderateScale(16),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: moderateScale(10),
        paddingTop: moderateScale(10)
    },
    contentSafe: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: moderateScale(80),
    },
    title: {
        fontSize: moderateScale(15),
        color: Colors.black,
        fontFamily: Fonts.InstrumentSansMedium,
        // borderWidth:1,
        width: moderateScale(300)
        // marginLeft: moderateScale(5)
        // paddingRight:moderateScale(8)
    },
    questionNumberContainer: {
        paddingHorizontal: moderateScale(16),
        paddingTop: moderateScale(16),
        paddingBottom: moderateScale(8),
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    questionNumberText: {
        fontSize: moderateScale(14),
        color: Colors.primaryColor,
        fontFamily: Fonts.InstrumentSansSemiBold,
    },
    questionCard: {
        backgroundColor: Colors.white,
        marginHorizontal: moderateScale(16),
        paddingHorizontal: moderateScale(1),
        marginBottom: moderateScale(16),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        // borderWidth: 1
    },
    questionText: {
        fontSize: moderateScale(15),
        fontFamily: Fonts.InstrumentSansMedium,
        color: Colors.black,
        lineHeight: moderateScale(22),
    },
    questionMathJax: {
        fontSize: moderateScale(15),
        fontFamily: Fonts.InstrumentSansMedium,
        color: Colors.black,
    },
    questionImages: {
        alignItems: 'center',
    },
    questionImage: {
        width: '100%',
        height: moderateScale(100),
        resizeMode: 'contain',
    },
    optionsContainer: {
        marginHorizontal: moderateScale(16),
        // borderWidth: 1
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: moderateScale(8),
        marginBottom: moderateScale(10),
        padding: moderateScale(12),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
    },
    optionLetter: {
        width: moderateScale(25),
        height: moderateScale(25),
        borderRadius: moderateScale(16),
        backgroundColor: '#e7e3e3',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: moderateScale(12),
    },
    optionLetterSelected: {
        backgroundColor: Colors.primaryColor,
    },
    optionLetterCorrect: {
        backgroundColor: '#4CAF50',
    },
    optionLetterWrong: {
        backgroundColor: '#F44336',
    },
    optionLetterText: {
        fontSize: moderateScale(13),
        fontFamily: Fonts.InstrumentSansSemiBold,
        color: Colors.black,
    },
    optionLetterTextSelected: {
        color: Colors.white,
    },
    optionContent: {
        flex: 1,
    },
    optionText: {
        fontSize: moderateScale(12),
        fontFamily: Fonts.InstrumentSansRegular,
        color: Colors.black,
        lineHeight: moderateScale(18),
    },
    optionMathJax: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InstrumentSansRegular,
        color: Colors.black,
    },
    optionImages: {
        marginBottom: moderateScale(8),
    },
    optionImage: {
        width: '100%',
        height: moderateScale(100),
        resizeMode: 'contain',
    },
    solutionCard: {
        backgroundColor: '#FFF9C4',
        marginHorizontal: moderateScale(16),
        marginTop: moderateScale(16),
        marginBottom: moderateScale(8),
        borderRadius: moderateScale(8),
        padding: moderateScale(16),
        borderLeftWidth: 4,
        borderLeftColor: '#FFC107',
    },
    solutionTitle: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InstrumentSansSemiBold,
        color: Colors.black,
        marginBottom: moderateScale(8),
    },
    solutionMathJax: {
        fontSize: moderateScale(13),
        fontFamily: Fonts.InstrumentSansRegular,
        color: Colors.black,
        marginBottom: moderateScale(8),
        lineHeight: moderateScale(20),
        minHeight: moderateScale(30),
    },
    answerText: {
        fontSize: moderateScale(13),
        fontFamily: Fonts.InstrumentSansSemiBold,
        color: '#2E7D32',
    },
    bottomButtons: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        paddingVertical: moderateScale(16),
        paddingHorizontal: moderateScale(16),
        elevation: 50
    },
    bottomButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: moderateScale(5),
        borderRadius: moderateScale(6),
        borderWidth: 1,
        borderColor: Colors.primaryColor,
    },
    prevButton: {
        marginRight: moderateScale(4),
    },
    checkButton: {
        backgroundColor: Colors.primaryColor,
        marginHorizontal: moderateScale(4),
    },
    nextButton: {
        marginLeft: moderateScale(4),
    },
    buttonText: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InstrumentSansMedium,
        color: Colors.primaryColor,
        marginHorizontal: moderateScale(4),
    },
    checkButtonText: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InstrumentSansSemiBold,
        color: Colors.white,
    },
    disabledText: {
        color: '#C7C7C7',
    },

    // header 
    backImg: {
        width: moderateScale(20),
        height: moderateScale(20),
    },

    counderBox: {
        height: moderateScale(32),
        width: moderateScale(80),
        borderWidth: 1,
        backgroundColor: Colors.primaryColor,
        borderRadius: moderateScale(6),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(8)
    },
    counterText: {
        fontSize: moderateScale(12),
        color: Colors.white,
        fontFamily: Fonts.InstrumentSansMedium
    }
});