// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import {
//     Text,
//     View,
//     StyleSheet,
//     StatusBar,
//     TouchableOpacity,
//     ScrollView,
//     Image,
//     Modal,
//     Pressable
// } from 'react-native';
// import { Colors, Fonts } from '../../../theme';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { moderateScale } from '../../../utils/responsiveSize';
// import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import MathJax from 'react-native-mathjax';
// import { Icons } from '../../../assets/icons';
// import ClockIcon from "react-native-vector-icons/FontAwesome6";
// import SettingsIcon from "react-native-vector-icons/Ionicons";
// import BookMark from "react-native-vector-icons/Ionicons";
// import { useDispatch, useSelector } from 'react-redux';
// import localStorage from 'redux-persist/es/storage';
// import { storageKeys } from '../../../storage/storage';
// import { showToast } from '../../../utils/toast';
// import { POST_FORM } from '../../../api/request';
// import { ApiEndPoint } from '../../../api/endPoints';
// import { showSnackbar } from '../../../utils/showsnack';

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
//             body { margin:0; padding:0; font-size:11px; font-family: 'InstrumentSansRegular', sans-serif; line-height:18px; }
//         </style>
//         </head>
//         <body>${cleanText}</body>
//         </html>
//     `;

//     return (
//         <TouchableOpacity
//             style={[styles.optionButton, { backgroundColor: bgColor, borderColor },

//             // isSelected && !showResult ? {
//             //     borderWidth: 0,
//             // } : {
//             //     borderWidth: 1,
//             //     borderColor: 'rgba(12, 64, 111, 0.12)'
//             // },
//             showResult && isSelected && !isCorrect && {
//                 borderWidth: 0
//             },
//             showResult && isCorrect && {
//                 borderWidth: 1
//             }
//             ]}
//             onPress={onPress}
//             disabled={showResult}
//         // activeOpacity={0.7}
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
//                             // style={styles.optionMathJax}
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
//     const navigation = useNavigation();
//     const route = useRoute();
//     const scrollViewRef = useRef<ScrollView>(null);

//     useFocusEffect(
//         useCallback(() => {
//             navigation.getParent()?.setOptions({
//                 tabBarStyle: { display: 'none' },
//             });

//             return () => {
//                 navigation.getParent()?.setOptions({
//                     tabBarStyle: { display: 'flex' },
//                 });
//             };
//         }, [navigation]));

//     const {
//         questions = [],
//         currentIndex = 0,
//         chapterName = 'Plant kingdom'
//     } = route.params || {};
//     const [currentQIndex, setCurrentQIndex] = useState(currentIndex);
//     const [selectedOption, setSelectedOption] = useState<string | null>(null);
//     const [showSolution, setShowSolution] = useState(false);
//     const [answers, setAnswers] = useState<Record<string, string>>({});
//     const [timer, setTimer] = useState(0);
//     const [isTimerRunning, setIsTimerRunning] = useState(true);
//     const timerRef = useRef<NodeJS.Timeout | null>(null);
//     const currentQuestion = questions[currentQIndex] || {};
//     const totalQuestions = questions.length;
//     const questionNumber = currentQIndex + 1;
//     const isLastQuestion = currentQIndex === totalQuestions - 1;
//     const [userId, setUserId] = useState<string | null>('')
//     const [title, setTitle] = useState<string | null>('')
//     const [loading, setLoading] = useState(false)

//     const dispatch = useDispatch()
//     const userRole = useSelector((state: any) => state.userRole?.role);

//     // Timer logic
//     useEffect(() => {
//         if (isTimerRunning) {
//             timerRef.current = setInterval(() => {
//                 setTimer(prev => prev + 1);
//             }, 1000);
//         }
//         return () => {
//             if (timerRef.current) {
//                 clearInterval(timerRef.current);
//             }
//         };
//     }, [isTimerRunning]);

//     // Format time for display
//     const formatTime = (seconds: number) => {
//         const mins = Math.floor(seconds / 60);
//         const secs = seconds % 60;
//         return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     };

//     // Reset state when question changes
//     useEffect(() => {
//         const savedAnswer = answers[currentQuestion.question_id];
//         setSelectedOption(savedAnswer || null);
//         setShowSolution(false);
//         scrollViewRef.current?.scrollTo({ y: 0, animated: true });
//     }, [currentQIndex, currentQuestion.question_id, answers]);

//     const handleBack = () => navigation.goBack();
//     const handleOptionSelect = (optionId: string) => {
//         setSelectedOption(optionId);
//         setAnswers(prev => ({
//             ...prev,
//             [currentQuestion.question_id]: optionId
//         }));
//     };

//     const handleCheckAnswer = () => {
//         if (!selectedOption) return;
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

//     const handleFinishTest = () => {
//         setIsTimerRunning(false);
//         if (timerRef.current) {
//             clearInterval(timerRef.current);
//         }

//         // Calculate results
//         let correct = 0;
//         let wrong = 0;
//         let skipped = 0;

//         questions.forEach(question => {
//             const userAnswer = answers[question.question_id];
//             console.log('userAnswerwwww', answers);
//             console.log('userAnswerwwww', answers);

//             if (!userAnswer) {
//                 skipped++;
//             } else if (userAnswer === question.correct_option) {
//                 correct++;
//             } else {
//                 wrong++;
//             }
//         });

//         const results = { correct, wrong, skipped };

//         // Navigate to score board
//         navigation.navigate('ScoreCardScreen', {
//             results,
//             totalQuestions,
//             chapterName,
//             totalTimeSpent: timer
//         });
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
//         .replace(/<br\s*\/?>/gi, '')
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


//     //     const handleBookMark = () => {

//     //         const param = {
//     //             user_id: 10
//     // title: TESTkkk
//     // question_id: ["1", "2", "3"]
//     //         }
//     //     }

//     const handleDraftSet = async () => {
//         let questionId = ''
//         try {

//             // if (title?.trim() === '' || !title?.trim()) {
//             //     showSnackbar('Please enter title', 'error')
//             //     return
//             // }
//             // if (title?.trim().length < 4) {
//             //     showSnackbar('Please lenght then this text to 4 charactors or more', 'error')
//             //     return
//             // }

//             const params = {
//                 user_id: userId,
//                 title: 'abcdd',
//                 question_id: questionId || [],
//                 role: userRole
//             }
//             // console.log('para3333', params);

//             const response = await POST_FORM(ApiEndPoint.draftAdd, params)
//             if (response.status === 200) {
//                 showToast('success','Success', response?.msg)
//                 setTitle('')
//             }
//         } catch (error) {
//             if (error?.offline) {
//                 return;
//             }
//             const errorMessage = error?.response?.data?.message ||
//                 error?.message ||
//                 'Something went wrong. Please try again.';
//             showToast('error', 'Error', errorMessage);
//         } finally {
//             setLoading(false)
//         }
//     }
//     const handleSubmit = () => {
//     };

//     useEffect(() => {
//         const getId = async () => {
//             let userId = await localStorage.getItem(storageKeys.userId)
//             setUserId(userId)
//         }
//         getId()
//     })
//     return (
//         <View style={styles.container}>
//             <StatusBar barStyle="dark-content" backgroundColor={Colors.lightThemeBlue} />

//             <SafeAreaView style={styles.headerSafe} edges={['top']}>
//                 <View style={styles.qsBox}>
//                     {/* <View style={{borderWid}}/> */}
//                     <View style={{ flexDirection: "row", alignItems: 'center' }}>
//                         <TouchableOpacity onPress={handleBack} style={styles.arrowBox}>
//                             <Image source={Icons?.back} style={styles.backImg} resizeMode="contain" />
//                         </TouchableOpacity>
//                         <Text style={[styles.title]} numberOfLines={1}>
//                             Qs {questionNumber} of {totalQuestions}
//                         </Text>
//                     </View>
//                     <View style={styles.counderBox}>
//                         <ClockIcon name="clock" size={moderateScale(15)} color={Colors.white} />
//                         <Text style={styles.counterText}>{formatTime(timer)}</Text>
//                     </View>

//                     <SettingsIcon name='settings-outline' color={Colors.primaryColor} size={moderateScale(24)} />
//                 </View>
//             </SafeAreaView>

//             <SafeAreaView style={styles.contentSafe} edges={['left', 'right', 'bottom']}>
//                 <ScrollView
//                     ref={scrollViewRef}
//                     style={styles.scrollView}
//                     contentContainerStyle={styles.scrollContent}
//                     showsVerticalScrollIndicator={false}>

//                     {/* Question Number */}
//                     <View style={styles.qsMainBox}>
//                         <View style={styles.questionNumberContainer}>
//                             <Text style={styles.questionNumberText}>
//                                 Ques. {questionNumber}
//                             </Text>
//                         </View>
//                         <Pressable style={{ borderWidth: 1 }}  onPress={() => handleDraftSet(questionId)}>
//                             <BookMark name='bookmark-outline' size={moderateScale(22)} color={Colors.primaryColor} />
//                             <BookMark name='bookmark' size={moderateScale(22)} color={Colors.primaryColor} />
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
//                         {options.map((opt) => (
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

//                     {/* Solution Section */}
//                     {showSolution && currentQuestion.explanation && (
//                         <View style={styles.solutionCard}>
//                             <Text style={styles.solutionTitle}>Solution:</Text>
//                             <MathJax
//                                 mathJaxOptions={mathJaxOptions}
//                                 html={`
//                                     <!DOCTYPE html>
//                                     <html>
//                                     <head>
//                                     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                                     <style>
//                                         body { 
//                                             margin:0; 
//                                             padding:0; 
//                                             font-size:13px; 
//                                             font-family: 'InstrumentSansRegular', sans-serif; 
//                                             line-height:20px;
//                                             color: #000000;
//                                             background-color: #FFF9C4;
//                                             padding-bottom:10px
//                                         }
//                                     </style>
//                                     </head>
//                                     <body>${currentQuestion.explanation}</body>
//                                     </html>
//                                 `}
//                                 style={styles.solutionMathJax}
//                             />
//                             <Text style={styles.answerText}>
//                                 Answer: Option {currentQuestion.correct_option}
//                             </Text>
//                         </View>
//                     )}
//                 </ScrollView>

//                 {/* Bottom Buttons */}
//                 <View style={styles.bottomButtons}>
//                     <TouchableOpacity
//                         style={[styles.bottomButton, styles.prevButton, currentQIndex === 0 && { borderColor: '#C7C7C7' }]}
//                         onPress={handlePrevious}
//                         disabled={currentQIndex === 0}>
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

//                     {!isLastQuestion ? (
//                         <>
//                             <TouchableOpacity
//                                 style={[styles.bottomButton, { borderWidth: 0 }, selectedOption !== null ? styles.checkButton : { backgroundColor: '#C7C7C7' }]}
//                                 onPress={handleCheckAnswer}
//                                 disabled={selectedOption === null}>
//                                 <Text style={[styles.checkButtonText, selectedOption !== null && { color: Colors.white }]}>
//                                     Check Answer
//                                 </Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity
//                                 style={[styles.bottomButton, styles.nextButton]}
//                                 onPress={handleNext}>
//                                 <Text style={styles.buttonText}>Next</Text>
//                                 <Icon name="chevron-right" size={20} color={Colors.primaryColor} />
//                             </TouchableOpacity>
//                         </>
//                     ) : (
//                         <>
//                             <TouchableOpacity
//                                 style={[styles.bottomButton, { borderWidth: 0 }, selectedOption !== null ? styles.checkButton : { backgroundColor: '#C7C7C7' }]}
//                                 onPress={handleCheckAnswer}
//                                 disabled={selectedOption === null}>
//                                 <Text style={[styles.checkButtonText, selectedOption !== null && { color: Colors.white }]}>
//                                     Check Answer
//                                 </Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={[styles.bottomButton, styles.finishButton]}
//                                 onPress={handleFinishTest}>
//                                 <Text style={styles.finishButtonText}>Finish Test</Text>
//                             </TouchableOpacity>
//                         </>
//                     )}
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
//         backgroundColor: Colors.lightThemeBlue,
//         paddingHorizontal: moderateScale(16),
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingBottom: moderateScale(10),
//         paddingTop: moderateScale(10),
//         // borderWidth:1/
//     },
//     arrowBox: {
//         paddingLeft: moderateScale(1),
//         width: moderateScale(24),
//         // borderWidth:1
//     },
//     qsBox: {
//         flexDirection: 'row',
//         // borderWidth: 1,
//         justifyContent: "space-between",
//         alignItems: "center",
//         flex: 1
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
//     title: {
//         fontSize: moderateScale(15),
//         color: Colors.black,
//         fontFamily: Fonts.InstrumentSansMedium,
//         // flex: 1,
//         textAlign: 'left',
//         // marginLeft: moderateScale(2)
//     },
//     questionNumberContainer: {
//         // paddingHorizontal: moderateScale(16),
//         paddingTop: moderateScale(16),
//         paddingBottom: moderateScale(8)
//         // flexDirection: 'row',
//         // justifyContent: "space-between",
//         // alignItems: 'center'
//     },
//     questionNumberText: {
//         fontSize: moderateScale(14),
//         color: Colors.primaryColor,
//         fontFamily: Fonts.InstrumentSansSemiBold,
//         // borderWidth:1,        
//     },
//     qsMainBox: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: "space-between",
//         paddingHorizontal: moderateScale(16),
//         // borderWidth:1
//     },
//     questionCard: {
//         backgroundColor: Colors.white,
//         // marginHorizontal: moderateScale(16),
//         padding: moderateScale(16),
//         marginBottom: moderateScale(16),
//         borderRadius: moderateScale(8),
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.1,
//         // shadowRadius: 2,
//         // elevation: 2,
//         borderBottomWidth: 1,
//         borderBlockColor: 'rgba(0,0,0,.2)'
//     },
//     questionText: {
//         fontSize: moderateScale(15),
//         fontFamily: Fonts.InstrumentSansMedium,
//         color: Colors.black,
//         lineHeight: moderateScale(22),
//         // borderWidth:1
//     },
//     questionMathJax: {
//         fontSize: moderateScale(15),
//         fontFamily: Fonts.InstrumentSansMedium,
//         color: Colors.black,
//     },
//     questionImages: {
//         alignItems: 'center',
//         marginTop: moderateScale(10),
//     },
//     questionImage: {
//         width: '100%',
//         height: moderateScale(100),
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
//         marginBottom: moderateScale(10),
//         padding: moderateScale(12),
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.05,
//         shadowRadius: 1,
//         elevation: 1,

//         borderWidth: 1,
//         borderColor: '#000'
//     },
//     optionLetter: {
//         width: moderateScale(25),
//         height: moderateScale(25),
//         borderRadius: moderateScale(16),
//         backgroundColor: Colors.lightThemeBlue,
//         // backgroundColor: '#e7e3e3',
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
//     },
//     optionText: {
//         fontSize: moderateScale(12),
//         fontFamily: Fonts.InstrumentSansRegular,
//         color: Colors.black,
//         lineHeight: moderateScale(18),
//         // backgroundColor:
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
//     solutionMathJax: {
//         fontSize: moderateScale(13),
//         fontFamily: Fonts.InstrumentSansRegular,
//         color: Colors.black,
//         marginBottom: moderateScale(8),
//         lineHeight: moderateScale(20),
//         minHeight: moderateScale(30),
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
//         elevation: 50,
//     },
//     bottomButton: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingVertical: moderateScale(6),
//         borderRadius: moderateScale(6),
//         borderWidth: 1,
//         borderColor: Colors.primaryColor,
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
//     finishButton: {
//         backgroundColor: Colors.primaryColor,
//         borderWidth: 0,
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
//     finishButtonText: {
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansSemiBold,
//         color: Colors.white,
//     },
//     disabledText: {
//         color: '#C7C7C7',
//     },
//     backImg: {
//         width: moderateScale(20),
//         height: moderateScale(20),
//     },
//     counderBox: {
//         height: moderateScale(30),
//         width: moderateScale(70),
//         backgroundColor: Colors.primaryColor,
//         borderRadius: moderateScale(6),
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingHorizontal: moderateScale(8)
//     },
//     counterText: {
//         fontSize: moderateScale(12),
//         color: Colors.white,
//         fontFamily: Fonts.InstrumentSansMedium
//     },
//     // Score Board Styles
//     scoreBoardCard: {
//         backgroundColor: Colors.white,
//         margin: moderateScale(16),
//         borderRadius: moderateScale(16),
//         padding: moderateScale(20),
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//         elevation: 4,
//     },
//     scoreBoardTitle: {
//         fontSize: moderateScale(20),
//         fontFamily: Fonts.InstrumentSansSemiBold,
//         color: Colors.black,
//         marginBottom: moderateScale(4),
//     },
//     chapterName: {
//         fontSize: moderateScale(13),
//         fontFamily: Fonts.InstrumentSansRegular,
//         color: '#666',
//         marginBottom: moderateScale(24),
//     },
//     statsGrid: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-between',
//         marginBottom: moderateScale(24),
//     },
//     statGridItem: {
//         width: '48%',
//         backgroundColor: '#F5F5F5',
//         borderRadius: moderateScale(12),
//         padding: moderateScale(16),
//         alignItems: 'center',
//         marginBottom: moderateScale(12),
//     },
//     statIconLarge: {
//         width: moderateScale(60),
//         height: moderateScale(60),
//         borderRadius: moderateScale(30),
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: moderateScale(8),
//     },
//     statGridLabel: {
//         fontSize: moderateScale(12),
//         fontFamily: Fonts.InstrumentSansRegular,
//         color: '#666',
//         marginBottom: moderateScale(4),
//     },
//     statGridValue: {
//         fontSize: moderateScale(18),
//         fontFamily: Fonts.InstrumentSansSemiBold,
//         color: Colors.black,
//     },
//     additionalStats: {
//         backgroundColor: '#F8F9FA',
//         borderRadius: moderateScale(12),
//         padding: moderateScale(16),
//         marginBottom: moderateScale(20),
//     },
//     additionalStatRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingVertical: moderateScale(8),
//         borderBottomWidth: 1,
//         borderBottomColor: '#E0E0E0',
//     },
//     additionalStatLabel: {
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansMedium,
//         color: '#666',
//     },
//     additionalStatValue: {
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansSemiBold,
//         color: Colors.black,
//     },
//     scoreBoardButtons: {
//         flexDirection: 'row',
//         gap: moderateScale(10),
//     },
//     actionButton: {
//         flex: 1,
//         paddingVertical: moderateScale(12),
//         borderRadius: moderateScale(8),
//         alignItems: 'center',
//     },
//     reviewButton: {
//         backgroundColor: Colors.primaryColor,
//     },
//     reviewButtonText: {
//         color: Colors.white,
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansSemiBold,
//     },
//     homeButton: {
//         backgroundColor: Colors.white,
//         borderWidth: 1,
//         borderColor: Colors.primaryColor,
//     },
//     homeButtonText: {
//         color: Colors.primaryColor,
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansSemiBold,
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
    Modal,
    Pressable,
    ActivityIndicator
} from 'react-native';
import { Colors, Fonts } from '../../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from '../../../utils/responsiveSize';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MathJax from 'react-native-mathjax';
import { Icons } from '../../../assets/icons';
import ClockIcon from "react-native-vector-icons/FontAwesome6";
import SettingsIcon from "react-native-vector-icons/Ionicons";
import BookMark from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from 'react-redux';
import { localStorage, storageKeys } from '../../../storage/storage';
import { showToast } from '../../../utils/toast';
import { POST_FORM } from '../../../api/request';
import { ApiEndPoint } from '../../../api/endPoints';
import { showSnackbar } from '../../../utils/showsnack';
import Loader from '../../../component/loader/Loader';

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
            body { margin:0; padding:0; font-size:11px; font-family: 'InstrumentSansRegular', sans-serif; line-height:18px; }
        </style>
        </head>
        <body>${cleanText}</body>
        </html>
    `;

    return (
        <TouchableOpacity
            style={[styles.optionButton, { backgroundColor: bgColor, borderColor },
            showResult && isSelected && !isCorrect && {
                borderWidth: 0
            },
            showResult && isCorrect && {
                borderWidth: 1
            }
            ]}
            onPress={onPress}
            disabled={showResult}
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

    useFocusEffect(
        useCallback(() => {
            navigation.getParent()?.setOptions({
                tabBarStyle: { display: 'none' },
            });

            return () => {
                navigation.getParent()?.setOptions({
                    tabBarStyle: { display: 'flex' },
                });
            };
        }, [navigation]));

    const {
        questions = [],
        currentIndex = 0,
        chapterName = 'Plant kingdom'
    } = route.params || {};

    console.log('currentIndex', currentIndex);
    

    // State variables
    const [currentQIndex, setCurrentQIndex] = useState(currentIndex);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showSolution, setShowSolution] = useState(false);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [timer, setTimer] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [userId, setUserId] = useState<string | null>('')
    const [title, setTitle] = useState<string | null>('')
    const [loading, setLoading] = useState(false)

    // Bookmark and Draft states
    const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Set<string>>(new Set());
    const [draftAnswers, setDraftAnswers] = useState<Record<string, string>>({});
    const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);

    const currentQuestion = questions[currentQIndex] || {};
    const totalQuestions = questions.length;
    const questionNumber = currentQIndex + 1;
    const isLastQuestion = currentQIndex === totalQuestions - 1;

    // Single state for answer stats
    const [answerStats, setAnswerStats] = useState({
        correct: [] as string[],
        incorrect: [] as string[]
    });

    const loadAnswerStats = async () => {
        try {
            const saved = await localStorage.getItem('answerStats');
            console.log('Loaded from localStorage:', saved); // Add this
            if (saved) {
                setAnswerStats(JSON.parse(saved));
            }
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    };
    const dispatch = useDispatch()
    const userRole = useSelector((state: any) => state.userRole?.role);

    // Timer logic
    useEffect(() => {
        if (isTimerRunning) {
            timerRef.current = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isTimerRunning]);

    // Load saved data on mount
    useEffect(() => {
        loadSavedData();
        getUserId();
    }, []);

    const getUserId = async () => {
        let id = await localStorage.getItem(storageKeys.userId)
        setUserId(id)
    }

    const loadSavedData = async () => {
        try {
            // Load bookmarks
            const savedBookmarks = await localStorage.getItem('@bookmarked_questions');
            if (savedBookmarks) {
                setBookmarkedQuestions(new Set(JSON.parse(savedBookmarks)));
            }

            // Load drafts
            const savedDrafts = await localStorage.getItem('@draft_answers');
            if (savedDrafts) {
                setDraftAnswers(JSON.parse(savedDrafts));
            }
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    };

    // Auto-save draft when option is selected
    useEffect(() => {
        const saveDraft = async () => {
            if (!currentQuestion?.question_id || !selectedOption) return;

            try {
                const questionId = currentQuestion.question_id;

                const newDrafts = {
                    ...draftAnswers,
                    [questionId]: selectedOption
                };

                setDraftAnswers(newDrafts);
                await localStorage.setItem(
                    '@draft_answers',
                    JSON.stringify(newDrafts)
                );

            } catch (error) {
                console.error('Error saving draft:', error);
            }
        };

        const timeoutId = setTimeout(saveDraft, 1000);
        return () => clearTimeout(timeoutId);

    }, [selectedOption, currentQuestion?.question_id]);

    // Load saved answer when question changes
    useEffect(() => {
        if (currentQuestion?.question_id) {
            const savedAnswer = draftAnswers[currentQuestion.question_id];
            if (savedAnswer && !selectedOption) {
                setSelectedOption(savedAnswer);
                setAnswers(prev => ({
                    ...prev,
                    [currentQuestion.question_id]: savedAnswer
                }));
            }
        }
    }, [currentQIndex, currentQuestion?.question_id]);

    // Format time for display
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Reset state when question changes
    useEffect(() => {
        const savedAnswer = answers[currentQuestion.question_id];
        setSelectedOption(savedAnswer || null);
        setShowSolution(false);
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, [currentQIndex, currentQuestion.question_id, answers]);

    const handleBack = () => navigation.goBack();

    const handleOptionSelect = (optionId: string) => {
        setSelectedOption(optionId);
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.question_id]: optionId
        }));
    };

    // const handleCheckAnswer = () => {
    //     if (!selectedOption) return;
    //     setShowSolution(true);
    // };


    const handleCheckAnswer = () => {
        if (!selectedOption) return;

        const currentId = currentQuestion.question_id;
        const isCorrect = selectedOption === currentQuestion.correct_option;

        // Update state and localStorage in one operation
        setAnswerStats(prev => {
            const newCorrect = prev.correct.filter(id => id !== currentId);
            const newIncorrect = prev.incorrect.filter(id => id !== currentId);

            if (isCorrect) {
                newCorrect.push(currentId);
            } else {
                newIncorrect.push(currentId);
            }

            const newStats = {
                correct: newCorrect,
                incorrect: newIncorrect
            };

            // Save to localStorage (async)
            localStorage.setItem('answerStats', JSON.stringify(newStats))
                .catch(console.error);

            return newStats;
        });

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

    // Bookmark handler
    const handleBookmark = async () => {

        if (!currentQuestion?.question_id) return;
        try {
            setIsBookmarkLoading(true);
            const questionId = currentQuestion.question_id;

            const newBookmarked = new Set(bookmarkedQuestions);
            let isAdding = false;

            if (newBookmarked.has(questionId)) {
                newBookmarked.delete(questionId);
                showToast('success', 'Removed', 'Bookmark removed');
            } else {
                newBookmarked.add(questionId);
                isAdding = true;
                showToast('success', 'Added', 'Question bookmarked');
            }

            setBookmarkedQuestions(newBookmarked);
            await localStorage.setItem(
                '@bookmarked_questions',
                JSON.stringify(Array.from(newBookmarked))
            );

            // Sync with server if needed
            if (userId) {
                const params = {
                    user_id: userId,
                    title: 'My Bookmarked Questions',
                    question_id: [questionId],
                    role: userRole
                };

                // POST_FORM(ApiEndPoint.draftAdd, params).catch(err => 
                //     console.log('Background sync error:', err)
                // );

                const response = await POST_FORM(ApiEndPoint.draftAdd, params)
                if (response?.status === '1' || 200) {
                    console.log('resssssssssss', response)
                    // navigation.navigate
                }
            }

        } catch (error) {
            if (error?.offline) {
                return;
            }
            const errorMessage = error?.response?.data?.message ||
                error?.message ||
                'Failed to update bookmark';
            showToast('error', 'Error', errorMessage);
        } finally {
            setIsBookmarkLoading(false);

        }
    };

    // Clear drafts for current test
    const clearCurrentTestDrafts = async () => {
        const questionIds = questions.map(q => q.question_id);
        const newDrafts = { ...draftAnswers };

        questionIds.forEach(id => {
            delete newDrafts[id];
        });

        setDraftAnswers(newDrafts);
        await localStorage.setItem('@draft_answers', JSON.stringify(newDrafts));
        showToast('info', 'Cleared', 'Drafts cleared for this test');
    };

    // Save all drafts to server
    const saveAllDraftsToServer = async () => {
        if (!userId || !questions.length) return;

        try {
            const bookmarkedIds = Array.from(bookmarkedQuestions);
            if (bookmarkedIds.length === 0) {
                showSnackbar('No bookmarked questions to save', 'info');
                return;
            }

            setLoading(true);

            const params = {
                user_id: userId,
                title: 'My Practice Draft',
                question_id: bookmarkedIds,
                role: userRole
            };

            const response = await POST_FORM(ApiEndPoint.draftAdd, params);
            if (response.status === 200) {
                showToast('success', 'Success', response?.msg || 'Drafts saved successfully');
            }
        } catch (error: any) {
            if (error?.offline) {
                return;
            }
            const errorMessage = error?.response?.data?.message ||
                error?.message ||
                'Something went wrong. Please try again.';
            showToast('error', 'Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleFinishTest = async () => {
        setIsTimerRunning(false);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        // Save final answers as drafts
        try {
            await localStorage.setItem(
                '@draft_answers',
                JSON.stringify({ ...draftAnswers, ...answers })
            );
        } catch (error) {
            console.error('Error saving final drafts:', error);
        }

        // Calculate results
        let correct = 0;
        let wrong = 0;
        let skipped = 0;

        questions.forEach(question => {
            const userAnswer = answers[question.question_id];

            if (!userAnswer) {
                skipped++;
            } else if (userAnswer === question.correct_option) {
                correct++;
            } else {
                wrong++;
            }
        });

        const results = { correct, wrong, skipped };

        // Navigate to score board
        navigation.navigate('ScoreCardScreen', {
            results,
            totalQuestions,
            chapterName,
            totalTimeSpent: timer
        });
    };

    // Extract question images
    // const questionImages: string[] = [];
    // const imgRegex = /<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/g;
    // let cleanQuestion = currentQuestion.question_text || '';
    // let match;
    // while ((match = imgRegex.exec(cleanQuestion)) !== null) {
    //     questionImages.push(match[1]);
    //     cleanQuestion = cleanQuestion.replace(match[0], '');
    // }

    // // Clean question text
    // cleanQuestion = cleanQuestion
    //     // .replace(/<br\s*\/?>/gi, '')
    //     .replace(/&lt;/g, '<')
    //     .replace(/&gt;/g, '>')
    //     .replace(/&amp;/g, '&')
    //     .replace(/&nbsp;/g, ' ')
    //     .replace(/<[^>]*>/g, '')
    //     .trim();

    // const questionHasMath = containsMath(cleanQuestion);

    // const questionHtml = `
    //     <!DOCTYPE html>
    //     <html>
    //     <head>
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //     <style>
    //         body { margin:0; padding:0; font-size:15px; font-family: 'InstrumentSansMedium', sans-serif; line-height:24px; }
    //       p { margin: 0 0 8px 0; }  /* Control paragraph spacing */
    //       br { display: block; margin: 0; } /* Control line break spacing */
    //         </style>
    //     </head>
    //     <body>${cleanQuestion}</body>
    //     </html>
    // `;
    

    // In your render:
    // <View style={styles.questionCard}>
    //     {currentQuestion.question_text ? (
    //         questionHasMath ? (
    //             <MathJax
    //                 mathJaxOptions={mathJaxOptions}
    //                 html={questionHtml}
    //                 style={styles.questionMathJax}
    //             />
    //         ) : (
    //             <Text style={styles.questionText}>{cleanText}</Text>
    //         )
    //     ) : null}

    //     {/* Images - render separately */}
    //     {questionImages.length > 0 && (
    //         <View style={styles.questionImages}>
    //             {questionImages.map((base64, idx) => (
    //                 <Image
    //                     key={`q-img-${idx}`}
    //                     source={{ uri: `data:image/png;base64,${base64}` }}
    //                     style={styles.questionImage}
    //                     resizeMode="contain"
    //                 />
    //             ))}
    //         </View>
    //     )}
    // </View>

    // Extract question images
const questionImages: string[] = [];
const imgRegex = /<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/g;
let cleanQuestion = currentQuestion.question_text || '';
let match;
while ((match = imgRegex.exec(cleanQuestion)) !== null) {
    questionImages.push(match[1]);
    cleanQuestion = cleanQuestion.replace(match[0], '');
}

// For MathJax - use the ORIGINAL HTML with images removed but other tags preserved
const mathJaxHtml = currentQuestion.question_text
    .replace(/<img[^>]*>/g, ''); // Only remove image tags, keep everything else

// For plain text - clean version (remove all HTML)
const cleanText = cleanQuestion
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]*>/g, '')
    .trim();

const questionHasMath = containsMath(cleanText);

// REMOVE the comment from the HTML string
const questionHtml = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
    body { 
        margin:0; 
        padding:0; 
        font-size:15px; 
        font-family: 'InstrumentSansMedium', sans-serif; 
        line-height:24px;
    }
    p { 
        margin: 0 0 4px 0;
    }
    br { 
        display: block; 
        margin: 2px 0;
    }
    p:last-child {
        margin-bottom: 0;
    }
    .MathJax_Display {
        margin: 0 !important;
        padding: 0 !important;
    }
    .MathJax {
        margin: 0 !important;
        padding: 0 !important;
    }
</style>
</head>
<body>
${mathJaxHtml}
</body>
</html>
`; // No comment here!

// In your render:
<View style={styles.questionCard}>
    {currentQuestion.question_text ? (
        questionHasMath ? (
            <MathJax
                mathJaxOptions={mathJaxOptions}
                html={questionHtml}
                style={styles.questionMathJax}
            />
        ) : (
            <Text style={styles.questionText}>{cleanText}</Text>
        )
    ) : null}
    
    {/* Images - render separately */}
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
    
    // Options
    const options = [
        { id: 'A', text: currentQuestion.option_a },
        { id: 'B', text: currentQuestion.option_b },
        { id: 'C', text: currentQuestion.option_c },
        { id: 'D', text: currentQuestion.option_d },
    ];

    useFocusEffect(
        useCallback(() => {
            loadAnswerStats();
        }, [])
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.lightThemeBlue} />
            <SafeAreaView style={styles.headerSafe} edges={['top']}>
                <View style={styles.qsBox}>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <TouchableOpacity onPress={handleBack} style={styles.arrowBox}>
                            <Image source={Icons?.back} style={styles.backImg} resizeMode="contain" />
                        </TouchableOpacity>
                        <Text style={[styles.title]} numberOfLines={1}>
                            Qs {questionNumber} of {totalQuestions}
                        </Text>
                    </View>
                    <View style={styles.counderBox}>
                        <ClockIcon name="clock" size={moderateScale(15)} color={Colors.white} />
                        <Text style={styles.counterText}>{formatTime(timer)}</Text>
                    </View>

                    <TouchableOpacity onPress={saveAllDraftsToServer} disabled={loading}>
                        {loading ? (
                            // <ActivityIndicator size="small" color={Colors.primaryColor} //>
                            <Loader visible={loading} />
                        ) : (
                            <SettingsIcon name='settings-outline' color={Colors.primaryColor} size={moderateScale(24)} />
                        )}
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <SafeAreaView style={styles.contentSafe} edges={['left', 'right', 'bottom']}>
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}>

                    {/* Question Number with Bookmark */}
                    <View style={styles.qsMainBox}>
                        <View style={styles.questionNumberContainer}>
                            <Text style={styles.questionNumberText}>
                                Ques. {questionNumber}
                            </Text>
                            {draftAnswers[currentQuestion?.question_id] && (
                                <View style={styles.draftIndicator}>
                                    <Text style={styles.draftIndicatorText}>●</Text>
                                </View>
                            )}
                        </View>

                        <TouchableOpacity
                            style={styles.bookmarkButton}
                            onPress={handleBookmark}
                            disabled={isBookmarkLoading}
                        >
                            {isBookmarkLoading ? (
                                <ActivityIndicator size="small" color={Colors.primaryColor} />
                            ) : bookmarkedQuestions.has(currentQuestion?.question_id) ? (
                                <BookMark
                                    name="bookmark"
                                    size={moderateScale(26)}
                                    color={Colors.primaryColor}
                                />
                            ) : (
                                <BookMark
                                    name="bookmark-outline"
                                    size={moderateScale(26)}
                                    color={Colors.primaryColor}
                                />
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Question Content */}
                    <View style={styles.questionCard}>
                        {cleanQuestion ? (
                            questionHasMath ? (
                                <MathJax
                                    mathJaxOptions={mathJaxOptions}
                                    html={questionHtml}
                                    style={[styles.questionMathJax,  { margin: 0, padding: 0 }]}
                                />
                            ) : (
                                <Text style={[styles.questionText, { margin: 0, padding: 0 }]}>{cleanQuestion}</Text>
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
                        {options.map((opt) => (
                            <OptionButton
                                key={opt.id}
                                letter={opt.id}
                                text={opt.text}
                                isSelected={selectedOption === opt.id}
                                isCorrect={opt.id === currentQuestion.correct_option}
                                showResult={showSolution}
                                onPress={() => handleOptionSelect(opt.id)}
                            />
                        ))}
                    </View>

                    {/* Solution Section */}
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
                        disabled={currentQIndex === 0}>
                        {/* <Icon
                            name="chevron-left"
                            size={20}
                            color={currentQIndex === 0 ? '#C7C7C7' : Colors.primaryColor}
                        /> */}
                        <Text style={[
                            styles.buttonText,
                            currentQIndex === 0 && styles.disabledText
                        ]}>Previous</Text>
                    </TouchableOpacity>

                    {!isLastQuestion ? (
                        <>
                            <TouchableOpacity
                                style={[styles.bottomButton, { borderWidth: 0 }, selectedOption !== null ? styles.checkButton : { backgroundColor: '#C7C7C7' }]}
                                onPress={handleCheckAnswer}
                                disabled={selectedOption === null}>
                                <Text style={[styles.checkButtonText, selectedOption !== null && { color: Colors.white }]}>
                                    Check Answer
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.bottomButton, styles.nextButton]}
                                onPress={handleNext}>
                                <Text style={styles.buttonText}>Next</Text>
                                {/* <Icon name="chevron-right" size={20} color={Colors.primaryColor} /> */}
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity
                                style={[styles.bottomButton, { borderWidth: 0 }, selectedOption !== null ? styles.checkButton : { backgroundColor: '#C7C7C7' }]}
                                onPress={handleCheckAnswer}
                                disabled={selectedOption === null}>
                                <Text style={[styles.checkButtonText, selectedOption !== null && { color: Colors.white }]}>
                                    Check Answer
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.bottomButton, styles.finishButton]}
                                onPress={handleFinishTest}>
                                <Text style={styles.finishButtonText}>Finish Test</Text>
                            </TouchableOpacity>
                        </>
                    )}
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
        paddingTop: moderateScale(10),
    },
    arrowBox: {
        paddingLeft: moderateScale(1),
        width: moderateScale(24),
    },
    qsBox: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1
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
        textAlign: 'left',
    },
    questionNumberContainer: {
        paddingTop: moderateScale(16),
        paddingBottom: moderateScale(8),
        flexDirection: 'row',
        alignItems: 'center',
    },
    questionNumberText: {
        fontSize: moderateScale(14),
        color: Colors.primaryColor,
        fontFamily: Fonts.InstrumentSansSemiBold
    },
    qsMainBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: moderateScale(16),
    },
    questionCard: {
        backgroundColor: Colors.white,
        padding: moderateScale(16),
        marginBottom: moderateScale(16),
        borderRadius: moderateScale(8),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        borderBottomWidth: 1,
        borderBlockColor: 'rgba(0,0,0,.2)',
        // borderWidth:1
    },
    questionText: {
        fontSize: moderateScale(15),
        fontFamily: Fonts.InstrumentSansMedium,
        color: Colors.black,
        lineHeight: moderateScale(22),
        // borderWidth: 1,
        // borderColor: '#000'
    },
    questionMathJax: {
        fontSize: moderateScale(15),
        fontFamily: Fonts.InstrumentSansMedium,
        color: Colors.black,
        borderWidth: 1,
        borderColor: '#000',
           margin: 0,
        padding: 0,
        lineHeight: moderateScale(20),


    },
    questionImages: {
        alignItems: 'center',
        marginTop: moderateScale(10),
    },
    questionImage: {
        width: '100%',
        height: moderateScale(100),
        resizeMode: 'contain',
    },
    optionsContainer: {
        marginHorizontal: moderateScale(16),
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
        borderWidth: 1,
        borderColor: '#000'
    },
    optionLetter: {
        width: moderateScale(25),
        height: moderateScale(25),
        borderRadius: moderateScale(16),
        backgroundColor: Colors.lightThemeBlue,
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
        backgroundColor: Colors.lightThemeBlue,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        paddingVertical: moderateScale(16),
        paddingHorizontal: moderateScale(16),
        elevation: 50,
    },
    bottomButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: moderateScale(6),
        borderRadius: moderateScale(16),
        borderWidth: 1.2,
        borderColor: Colors.primaryColor,
        backgroundColor:Colors.white
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
    finishButton: {
        backgroundColor: Colors.primaryColor,
        borderWidth: 0,
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
    finishButtonText: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InstrumentSansSemiBold,
        color: Colors.white,
    },
    disabledText: {
        color: '#C7C7C7',
    },
    backImg: {
        width: moderateScale(20),
        height: moderateScale(20),
    },
    counderBox: {
        height: moderateScale(30),
        width: moderateScale(70),
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
    },
    bookmarkButton: {
        padding: moderateScale(8),
    },
    draftIndicator: {
        marginLeft: moderateScale(8),
    },
    draftIndicatorText: {
        color: '#FF9800',
        fontSize: moderateScale(16),
    },
    // Score Board Styles (keep existing)
    scoreBoardCard: {
        backgroundColor: Colors.white,
        margin: moderateScale(16),
        borderRadius: moderateScale(16),
        padding: moderateScale(20),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    scoreBoardTitle: {
        fontSize: moderateScale(20),
        fontFamily: Fonts.InstrumentSansSemiBold,
        color: Colors.black,
        marginBottom: moderateScale(4),
    },
    chapterName: {
        fontSize: moderateScale(13),
        fontFamily: Fonts.InstrumentSansRegular,
        color: '#666',
        marginBottom: moderateScale(24),
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: moderateScale(24),
    },
    statGridItem: {
        width: '48%',
        backgroundColor: '#F5F5F5',
        borderRadius: moderateScale(12),
        padding: moderateScale(16),
        alignItems: 'center',
        marginBottom: moderateScale(12),
    },
    statIconLarge: {
        width: moderateScale(60),
        height: moderateScale(60),
        borderRadius: moderateScale(30),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: moderateScale(8),
    },
    statGridLabel: {
        fontSize: moderateScale(12),
        fontFamily: Fonts.InstrumentSansRegular,
        color: '#666',
        marginBottom: moderateScale(4),
    },
    statGridValue: {
        fontSize: moderateScale(18),
        fontFamily: Fonts.InstrumentSansSemiBold,
        color: Colors.black,
    },
    additionalStats: {
        backgroundColor: '#F8F9FA',
        borderRadius: moderateScale(12),
        padding: moderateScale(16),
        marginBottom: moderateScale(20),
    },
    additionalStatRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: moderateScale(8),
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    additionalStatLabel: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InstrumentSansMedium,
        color: '#666',
    },
    additionalStatValue: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InstrumentSansSemiBold,
        color: Colors.black,
    },
    scoreBoardButtons: {
        flexDirection: 'row',
        gap: moderateScale(10),
    },
    actionButton: {
        flex: 1,
        paddingVertical: moderateScale(12),
        borderRadius: moderateScale(8),
        alignItems: 'center',
    },
    reviewButton: {
        backgroundColor: Colors.primaryColor,
    },
    reviewButtonText: {
        color: Colors.white,
        fontSize: moderateScale(14),
        fontFamily: Fonts.InstrumentSansSemiBold,
    },
    homeButton: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.primaryColor,
    },
    homeButtonText: {
        color: Colors.primaryColor,
        fontSize: moderateScale(14),
        fontFamily: Fonts.InstrumentSansSemiBold,
    },
});



// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import {
//     Text,
//     View,
//     StyleSheet,
//     StatusBar,
//     TouchableOpacity,
//     ScrollView,
//     Image,
//     Modal,
//     Pressable,
//     ActivityIndicator
// } from 'react-native';
// import { Colors, Fonts } from '../../../theme';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { moderateScale } from '../../../utils/responsiveSize';
// import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import MathJax from 'react-native-mathjax';
// import { Icons } from '../../../assets/icons';
// import ClockIcon from "react-native-vector-icons/FontAwesome6";
// import SettingsIcon from "react-native-vector-icons/Ionicons";
// import BookMark from "react-native-vector-icons/Ionicons";
// import { useDispatch, useSelector } from 'react-redux';
// import { localStorage, storageKeys } from '../../../storage/storage';

// import { showToast } from '../../../utils/toast';
// import { POST_FORM } from '../../../api/request';
// import { ApiEndPoint } from '../../../api/endPoints';
// import { showSnackbar } from '../../../utils/showsnack';
// import Loader from '../../../component/loader/Loader';

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
//             body { margin:0; padding:0; font-size:11px; font-family: 'InstrumentSansRegular', sans-serif; line-height:18px; }
//         </style>
//         </head>
//         <body>${cleanText}</body>
//         </html>
//     `;

//     return (
//         <TouchableOpacity
//             style={[styles.optionButton, { backgroundColor: bgColor, borderColor },
//             showResult && isSelected && !isCorrect && {
//                 borderWidth: 0
//             },
//             showResult && isCorrect && {
//                 borderWidth: 1
//             }
//             ]}
//             onPress={onPress}
//             disabled={showResult}
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
//     const navigation = useNavigation();
//     const route = useRoute();
//     const scrollViewRef = useRef<ScrollView>(null);

//     useFocusEffect(
//         useCallback(() => {
//             navigation.getParent()?.setOptions({
//                 tabBarStyle: { display: 'none' },
//             });

//             return () => {
//                 navigation.getParent()?.setOptions({
//                     tabBarStyle: { display: 'flex' },
//                 });
//             };
//         }, [navigation]));

//     const {
//         questions = [],
//         currentIndex = 0,
//         chapterName = 'Plant kingdom'
//     } = route.params || {};
//     console.log('routechapterName', route);

//     // State variables
//     const [currentQIndex, setCurrentQIndex] = useState(currentIndex);
//     const [selectedOption, setSelectedOption] = useState<string | null>(null);
//     const [showSolution, setShowSolution] = useState(false);
//     const [answers, setAnswers] = useState<Record<string, string>>({});
//     const [timer, setTimer] = useState(0);
//     const [isTimerRunning, setIsTimerRunning] = useState(true);
//     const timerRef = useRef<NodeJS.Timeout | null>(null);
//     const [userId, setUserId] = useState<string | null>('')
//     const [title, setTitle] = useState<string | null>('')
//     const [loading, setLoading] = useState(false)

//     // Bookmark and Draft states
//     const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Set<string>>(new Set());
//     const [draftAnswers, setDraftAnswers] = useState<Record<string, string>>({});
//     const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);
//     // backe logic
//     // Initialize state with existing values
//     const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
//     const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>([]);
//     const currentQuestion = questions[currentQIndex] || {};

//     const totalQuestions = questions.length;
//     const questionNumber = currentQIndex + 1;
//     const isLastQuestion = currentQIndex === totalQuestions - 1;

//     const dispatch = useDispatch()
//     const userRole = useSelector((state: any) => state.userRole?.role);

//     // Timer logic
//     useEffect(() => {
//         if (isTimerRunning) {
//             timerRef.current = setInterval(() => {
//                 setTimer(prev => prev + 1);
//             }, 1000);
//         }
//         return () => {
//             if (timerRef.current) {
//                 clearInterval(timerRef.current);
//             }
//         };
//     }, [isTimerRunning]);

//     // Load saved data on mount
//     useEffect(() => {
//         loadSavedData();
//         getUserId();
//     }, []);

//     const getUserId = async () => {
//         let id = await localStorage.getItem(storageKeys.userId)
//         setUserId(id)
//     }

//     // ✅ Load saved data using storageKeys
//     const loadSavedData = async () => {
//         try {
//             // Load bookmarks using storageKeys
//             const savedBookmarks = await localStorage.getItem(storageKeys.bookmarkedQuestions);
//             if (savedBookmarks) {
//                 setBookmarkedQuestions(new Set(JSON.parse(savedBookmarks)));
//             }

//             // Load drafts using storageKeys
//             const savedDrafts = await localStorage.getItem(storageKeys.draftAnswers);
//             if (savedDrafts) {
//                 setDraftAnswers(JSON.parse(savedDrafts));
//             }
//         } catch (error) {
//             console.error('Error loading saved data:', error);
//         }
//     };

//     // ✅ Auto-save draft when option is selected using storageKeys
//     useEffect(() => {
//         const saveDraft = async () => {
//             if (!currentQuestion?.question_id || !selectedOption) return;

//             try {
//                 const questionId = currentQuestion.question_id;

//                 const newDrafts = {
//                     ...draftAnswers,
//                     [questionId]: selectedOption
//                 };

//                 setDraftAnswers(newDrafts);
//                 await localStorage.setItem(
//                     storageKeys.draftAnswers,  // ✅ Use storageKeys
//                     JSON.stringify(newDrafts)
//                 );

//             } catch (error) {
//                 console.error('Error saving draft:', error);
//             }
//         };

//         const timeoutId = setTimeout(saveDraft, 1000);
//         return () => clearTimeout(timeoutId);

//     }, [selectedOption, currentQuestion?.question_id]);

//     // Load saved answer when question changes
//     useEffect(() => {
//         if (currentQuestion?.question_id) {
//             const savedAnswer = draftAnswers[currentQuestion.question_id];
//             if (savedAnswer && !selectedOption) {
//                 setSelectedOption(savedAnswer);
//                 setAnswers(prev => ({
//                     ...prev,
//                     [currentQuestion.question_id]: savedAnswer
//                 }));
//             }
//         }
//     }, [currentQIndex, currentQuestion?.question_id]);

//     // Format time for display
//     const formatTime = (seconds: number) => {
//         const mins = Math.floor(seconds / 60);
//         const secs = seconds % 60;
//         return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     };

//     // Reset state when question changes
//     useEffect(() => {
//         const savedAnswer = answers[currentQuestion.question_id];
//         setSelectedOption(savedAnswer || null);
//         setShowSolution(false);
//         scrollViewRef.current?.scrollTo({ y: 0, animated: true });
//     }, [currentQIndex, currentQuestion.question_id, answers]);

//     const handleBack = () => navigation.goBack();

//     const handleOptionSelect = (optionId: string) => {
//         setSelectedOption(optionId);
//         setAnswers(prev => ({
//             ...prev,
//             [currentQuestion.question_id]: optionId
//         }));
//     };

//     const handleCheckAnswer = () => {
//         if (!selectedOption) return;
//         console.log('selectedOption', selectedOption, answers);
//         questions.forEach(question => {

//             const userAnswer = answers[question.question_id];
//             console.log('userAnswerqqqq', answers);
//             console.log('userAnswerqqqquserAnswer', userAnswer);

//             if (userAnswer) {
//                 setCorrectAnswers((pre) => ({ ...pre, question?.question_id }));
//                 await localStorage.setItem('correcrtAns', ({ ...pre, question?.question_id }))
//             } else if (userAnswer === question.correct_option) {
//                 setIncorrectAnswers((pre) => ({ ...pre, question?.question_id }));
//                 await localStorage.setItem('inCorrecrtAns', ({ ...pre, question?.question_id }))

//             }
//         });
//         setShowSolution(true);
//     };

//     // ✅ Save current answer before navigating using storageKeys
//     const saveCurrentAnswer = async () => {
//         if (!currentQuestion?.question_id || !selectedOption) return;

//         try {
//             const questionId = currentQuestion.question_id;
//             const newDrafts = {
//                 ...draftAnswers,
//                 [questionId]: selectedOption
//             };

//             setDraftAnswers(newDrafts);
//             await localStorage.setItem(
//                 storageKeys.draftAnswers,  // ✅ Use storageKeys
//                 JSON.stringify(newDrafts)
//             );
//             // console.log('✅ Answer saved for question:', questionId);
//         } catch (error) {
//             console.error('Error saving answer:', error);
//         }
//     };

//     // ✅ Save and go to next
//     const handleNext = async () => {
//         await saveCurrentAnswer(); // Save before moving

//         if (currentQIndex < totalQuestions - 1) {
//             setCurrentQIndex(prev => prev + 1);
//         }
//     };

//     // ✅ Save and go to previous
//     const handlePrevious = async () => {
//         await saveCurrentAnswer(); // Save before moving

//         if (currentQIndex > 0) {
//             setCurrentQIndex(prev => prev - 1);
//         }
//     };

//     // ✅ Bookmark handler with storageKeys
//     const handleBookmark = async () => {
//         if (!currentQuestion?.question_id) return;

//         try {
//             setIsBookmarkLoading(true);
//             const questionId = currentQuestion.question_id;

//             const newBookmarked = new Set(bookmarkedQuestions);
//             let isAdding = false;

//             if (newBookmarked.has(questionId)) {
//                 newBookmarked.delete(questionId);
//                 showToast('success', 'Removed', 'Bookmark removed');
//             } else {
//                 newBookmarked.add(questionId);
//                 isAdding = true;
//                 showToast('success', 'Added', 'Question bookmarked');
//             }

//             setBookmarkedQuestions(newBookmarked);
//             await localStorage.setItem(
//                 storageKeys.bookmarkedQuestions,  // ✅ Use storageKeys
//                 JSON.stringify(Array.from(newBookmarked))
//             );

//             // Sync with server if needed
//             if (userId) {
//                 const params = {
//                     user_id: userId,
//                     title: 'My Bookmarked Questions',
//                     question_id: [questionId],
//                     role: userRole
//                 };

//                 const response = await POST_FORM(ApiEndPoint.draftAdd, params)
//                 if (response?.status === '1' || 200) {
//                     // console.log('Bookmark synced with server', response);
//                 }
//             }

//         } catch (error: any) {
//             if (error?.offline) {
//                 return;
//             }
//             const errorMessage = error?.response?.data?.message ||
//                 error?.message ||
//                 'Failed to update bookmark';
//             showToast('error', 'Error', errorMessage);
//         } finally {
//             setIsBookmarkLoading(false);
//         }
//     };

//     // Clear drafts for current test
//     const clearCurrentTestDrafts = async () => {
//         const questionIds = questions.map(q => q.question_id);
//         const newDrafts = { ...draftAnswers };

//         questionIds.forEach(id => {
//             delete newDrafts[id];
//         });

//         setDraftAnswers(newDrafts);
//         await localStorage.setItem(
//             storageKeys.draftAnswers,  // ✅ Use storageKeys
//             JSON.stringify(newDrafts)
//         );
//         showToast('info', 'Cleared', 'Drafts cleared for this test');
//     };

//     // Save all drafts to server
//     // const saveAllDraftsToServer = async () => {
//     //     if (!userId || !questions.length) return;

//     //     try {
//     //         const bookmarkedIds = Array.from(bookmarkedQuestions);
//     //         if (bookmarkedIds.length === 0) {
//     //             showSnackbar('No bookmarked questions to save', 'info');
//     //             return;
//     //         }

//     //         setLoading(true);

//     //         const params = {
//     //             user_id: userId,
//     //             title: 'My Practice Draft',
//     //             question_id: bookmarkedIds,
//     //             role: userRole
//     //         };

//     //         const response = await POST_FORM(ApiEndPoint.draftAdd, params);
//     //         if (response.status === 200) {
//     //             showToast('success', 'Success', response?.msg || 'Drafts saved successfully');
//     //         }
//     //     } catch (error: any) {
//     //         if (error?.offline) {
//     //             return;
//     //         }
//     //         const errorMessage = error?.response?.data?.message ||
//     //             error?.message ||
//     //             'Something went wrong. Please try again.';
//     //         showToast('error', 'Error', errorMessage);
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };

//     // ✅ Save all answers before finishing with storageKeys
//     const handleFinishTest = async () => {
//         setIsTimerRunning(false);
//         if (timerRef.current) {
//             clearInterval(timerRef.current);
//         }

//         // Save final answers as drafts
//         try {
//             await localStorage.setItem(
//                 storageKeys.draftAnswers,  // ✅ Use storageKeys
//                 JSON.stringify({ ...draftAnswers, ...answers })
//             );
//         } catch (error) {
//             console.error('Error saving final drafts:', error);
//         }

//         // Calculate results
//         let correct = 0;
//         let wrong = 0;
//         let skipped = 0;

//         questions.forEach(question => {
//             const userAnswer = answers[question.question_id];

//             if (!userAnswer) {
//                 skipped++;
//             } else if (userAnswer === question.correct_option) {
//                 correct++;
//             } else {
//                 wrong++;
//             }
//         });

//         const results = { correct, wrong, skipped };

//         // Navigate to score board
//         navigation.navigate('ScoreCardScreen', {
//             results,
//             totalQuestions,
//             chapterName,
//             totalTimeSpent: timer
//         });
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
//         .replace(/<br\s*\/?>/gi, '')
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
//                 <View style={styles.qsBox}>
//                     <View style={{ flexDirection: "row", alignItems: 'center' }}>
//                         <TouchableOpacity onPress={handleBack} style={styles.arrowBox}>
//                             <Image source={Icons?.back} style={styles.backImg} resizeMode="contain" />
//                         </TouchableOpacity>
//                         <Text style={[styles.title]} numberOfLines={1}>
//                             Qs {questionNumber} of {totalQuestions}
//                         </Text>
//                     </View>
//                     <View style={styles.counderBox}>
//                         <ClockIcon name="clock" size={moderateScale(15)} color={Colors.white} />
//                         <Text style={styles.counterText}>{formatTime(timer)}</Text>
//                     </View>

//                     <TouchableOpacity onPress={() => { }} disabled={true}>
//                         {loading ? (
//                             <Loader visible={loading} />
//                         ) : (
//                             <SettingsIcon name='settings-outline' color={Colors.primaryColor} size={moderateScale(24)} />
//                         )}
//                     </TouchableOpacity>
//                 </View>
//             </SafeAreaView>

//             <SafeAreaView style={styles.contentSafe} edges={['left', 'right', 'bottom']}>
//                 <ScrollView
//                     ref={scrollViewRef}
//                     style={styles.scrollView}
//                     contentContainerStyle={styles.scrollContent}
//                     showsVerticalScrollIndicator={false}>

//                     {/* Question Number with Bookmark */}
//                     <View style={styles.qsMainBox}>
//                         <View style={styles.questionNumberContainer}>
//                             <Text style={styles.questionNumberText}>
//                                 Ques. {questionNumber}
//                             </Text>
//                             {draftAnswers[currentQuestion?.question_id] && (
//                                 <View style={styles.draftIndicator}>
//                                     <Text style={styles.draftIndicatorText}>●</Text>
//                                 </View>
//                             )}
//                         </View>

//                         <TouchableOpacity
//                             style={styles.bookmarkButton}
//                             onPress={handleBookmark}
//                             disabled={isBookmarkLoading}
//                         >
//                             {isBookmarkLoading ? (
//                                 <ActivityIndicator size="small" color={Colors.primaryColor} />
//                             ) : bookmarkedQuestions.has(currentQuestion?.question_id) ? (
//                                 <BookMark
//                                     name="bookmark"
//                                     size={moderateScale(26)}
//                                     color={Colors.primaryColor}
//                                 />
//                             ) : (
//                                 <BookMark
//                                     name="bookmark-outline"
//                                     size={moderateScale(26)}
//                                     color={Colors.primaryColor}
//                                 />
//                             )}
//                         </TouchableOpacity>
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
//                         {options.map((opt) => (
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

//                     {/* Solution Section */}
//                     {showSolution && currentQuestion.explanation && (
//                         <View style={styles.solutionCard}>
//                             <Text style={styles.solutionTitle}>Solution:</Text>
//                             <MathJax
//                                 mathJaxOptions={mathJaxOptions}
//                                 html={`
//                                     <!DOCTYPE html>
//                                     <html>
//                                     <head>
//                                     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                                     <style>
//                                         body {
//                                             margin:0;
//                                             padding:0;
//                                             font-size:13px;
//                                             font-family: 'InstrumentSansRegular', sans-serif;
//                                             line-height:20px;
//                                             color: #000000;
//                                             background-color: #FFF9C4;
//                                             padding-bottom:10px
//                                         }
//                                     </style>
//                                     </head>
//                                     <body>${currentQuestion.explanation}</body>
//                                     </html>
//                                 `}
//                                 style={styles.solutionMathJax}
//                             />
//                             <Text style={styles.answerText}>
//                                 Answer: Option {currentQuestion.correct_option}
//                             </Text>
//                         </View>
//                     )}
//                 </ScrollView>

//                 {/* Bottom Buttons */}
//                 <View style={styles.bottomButtons}>
//                     <TouchableOpacity
//                         style={[styles.bottomButton, styles.prevButton, currentQIndex === 0 && { borderColor: '#C7C7C7' }]}
//                         onPress={handlePrevious}
//                         disabled={currentQIndex === 0}>
//                         {/* <Icon
//                             name="chevron-left"
//                             size={20}
//                             color={currentQIndex === 0 ? '#C7C7C7' : Colors.primaryColor}
//                         /> */}
//                         <Text style={[
//                             styles.buttonText,
//                             currentQIndex === 0 && styles.disabledText
//                         ]}>Previous</Text>
//                     </TouchableOpacity>

//                     {!isLastQuestion ? (
//                         <>
//                             <TouchableOpacity
//                                 style={[styles.bottomButton, { borderWidth: 0 }, selectedOption !== null ? styles.checkButton : { backgroundColor: '#C7C7C7' }]}
//                                 onPress={handleCheckAnswer}
//                                 disabled={selectedOption === null}>
//                                 <Text style={[styles.checkButtonText, selectedOption !== null && { color: Colors.white }]}>
//                                     Check Answer
//                                 </Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity
//                                 style={[styles.bottomButton, styles.nextButton]}
//                                 onPress={handleNext}>
//                                 <Text style={styles.buttonText}>Next</Text>
//                                 {/* <Icon name="chevron-right" size={20} color={Colors.primaryColor} /> */}
//                             </TouchableOpacity>
//                         </>
//                     ) : (
//                         <>
//                             <TouchableOpacity
//                                 style={[styles.bottomButton, { borderWidth: 0 }, selectedOption !== null ? styles.checkButton : { backgroundColor: '#C7C7C7' }]}
//                                 onPress={handleCheckAnswer}
//                                 disabled={selectedOption === null}>
//                                 <Text style={[styles.checkButtonText, selectedOption !== null && { color: Colors.white }]}>
//                                     Check Answer
//                                 </Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={[styles.bottomButton, styles.finishButton]}
//                                 onPress={handleFinishTest}>
//                                 <Text style={styles.finishButtonText}>Finish Test</Text>
//                             </TouchableOpacity>
//                         </>
//                     )}
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
//         backgroundColor: Colors.lightThemeBlue,
//         paddingHorizontal: moderateScale(16),
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingBottom: moderateScale(10),
//         paddingTop: moderateScale(10),
//     },
//     arrowBox: {
//         paddingLeft: moderateScale(1),
//         width: moderateScale(24),
//     },
//     qsBox: {
//         flexDirection: 'row',
//         justifyContent: "space-between",
//         alignItems: "center",
//         flex: 1
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
//     title: {
//         fontSize: moderateScale(15),
//         color: Colors.black,
//         fontFamily: Fonts.InstrumentSansMedium,
//         textAlign: 'left',
//     },
//     questionNumberContainer: {
//         paddingTop: moderateScale(16),
//         paddingBottom: moderateScale(8),
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     questionNumberText: {
//         fontSize: moderateScale(14),
//         color: Colors.primaryColor,
//         fontFamily: Fonts.InstrumentSansSemiBold,
//     },
//     qsMainBox: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: "space-between",
//         paddingHorizontal: moderateScale(16),
//     },
//     questionCard: {
//         backgroundColor: Colors.white,
//         padding: moderateScale(16),
//         marginBottom: moderateScale(16),
//         borderRadius: moderateScale(8),
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.1,
//         borderBottomWidth: 1,
//         borderBlockColor: 'rgba(0,0,0,.2)'
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
//         alignItems: 'center',
//         marginTop: moderateScale(10),
//     },
//     questionImage: {
//         width: '100%',
//         height: moderateScale(100),
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
//         marginBottom: moderateScale(10),
//         padding: moderateScale(12),
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.05,
//         shadowRadius: 1,
//         elevation: 1,
//         borderWidth: 1,
//         borderColor: '#000'
//     },
//     optionLetter: {
//         width: moderateScale(25),
//         height: moderateScale(25),
//         borderRadius: moderateScale(16),
//         backgroundColor: Colors.lightThemeBlue,
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
//     solutionMathJax: {
//         fontSize: moderateScale(13),
//         fontFamily: Fonts.InstrumentSansRegular,
//         color: Colors.black,
//         marginBottom: moderateScale(8),
//         lineHeight: moderateScale(20),
//         minHeight: moderateScale(30),
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
//         backgroundColor: Colors.lightThemeBlue,
//         borderTopWidth: 1,
//         borderTopColor: '#E0E0E0',
//         paddingVertical: moderateScale(18),
//         paddingHorizontal: moderateScale(16),
//         elevation: 50,
//     },
//     bottomButton: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingVertical: moderateScale(6),
//         borderRadius: moderateScale(20),
//         borderWidth: 1.2,
//         borderColor: Colors.primaryColor,
//         backgroundColor: Colors.white
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
//     finishButton: {
//         backgroundColor: Colors.primaryColor,
//         borderWidth: 0,
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
//     finishButtonText: {
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansSemiBold,
//         color: Colors.white,
//     },
//     disabledText: {
//         color: '#C7C7C7',
//     },
//     backImg: {
//         width: moderateScale(20),
//         height: moderateScale(20),
//     },
//     counderBox: {
//         height: moderateScale(30),
//         width: moderateScale(70),
//         backgroundColor: Colors.primaryColor,
//         borderRadius: moderateScale(6),
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingHorizontal: moderateScale(8)
//     },
//     counterText: {
//         fontSize: moderateScale(12),
//         color: Colors.white,
//         fontFamily: Fonts.InstrumentSansMedium
//     },
//     bookmarkButton: {
//         padding: moderateScale(8),
//     },
//     draftIndicator: {
//         marginLeft: moderateScale(8),
//     },
//     draftIndicatorText: {
//         color: '#FF9800',
//         fontSize: moderateScale(16),
//     },
//     // Score Board Styles (keep existing)
//     scoreBoardCard: {
//         backgroundColor: Colors.white,
//         margin: moderateScale(16),
//         borderRadius: moderateScale(16),
//         padding: moderateScale(20),
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//         elevation: 4,
//     },
//     scoreBoardTitle: {
//         fontSize: moderateScale(20),
//         fontFamily: Fonts.InstrumentSansSemiBold,
//         color: Colors.black,
//         marginBottom: moderateScale(4),
//     },
//     chapterName: {
//         fontSize: moderateScale(13),
//         fontFamily: Fonts.InstrumentSansRegular,
//         color: '#666',
//         marginBottom: moderateScale(24),
//     },
//     statsGrid: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-between',
//         marginBottom: moderateScale(24),
//     },
//     statGridItem: {
//         width: '48%',
//         backgroundColor: '#F5F5F5',
//         borderRadius: moderateScale(12),
//         padding: moderateScale(16),
//         alignItems: 'center',
//         marginBottom: moderateScale(12),
//     },
//     statIconLarge: {
//         width: moderateScale(60),
//         height: moderateScale(60),
//         borderRadius: moderateScale(30),
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: moderateScale(8),
//     },
//     statGridLabel: {
//         fontSize: moderateScale(12),
//         fontFamily: Fonts.InstrumentSansRegular,
//         color: '#666',
//         marginBottom: moderateScale(4),
//     },
//     statGridValue: {
//         fontSize: moderateScale(18),
//         fontFamily: Fonts.InstrumentSansSemiBold,
//         color: Colors.black,
//     },
//     additionalStats: {
//         backgroundColor: '#F8F9FA',
//         borderRadius: moderateScale(12),
//         padding: moderateScale(16),
//         marginBottom: moderateScale(20),
//     },
//     additionalStatRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingVertical: moderateScale(8),
//         borderBottomWidth: 1,
//         borderBottomColor: '#E0E0E0',
//     },
//     additionalStatLabel: {
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansMedium,
//         color: '#666',
//     },
//     additionalStatValue: {
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansSemiBold,
//         color: Colors.black,
//     },
//     scoreBoardButtons: {
//         flexDirection: 'row',
//         gap: moderateScale(10),
//     },
//     actionButton: {
//         flex: 1,
//         paddingVertical: moderateScale(12),
//         borderRadius: moderateScale(8),
//         alignItems: 'center',
//     },
//     reviewButton: {
//         backgroundColor: Colors.primaryColor,
//     },
//     reviewButtonText: {
//         color: Colors.white,
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansSemiBold,
//     },
//     homeButton: {
//         backgroundColor: Colors.white,
//         borderWidth: 1,
//         borderColor: Colors.primaryColor,
//     },
//     homeButtonText: {
//         color: Colors.primaryColor,
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansSemiBold,
//     },
// });