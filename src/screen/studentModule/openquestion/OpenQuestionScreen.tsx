// // import React from 'react';
// // import { Text, View, StyleSheet, StatusBar } from 'react-native';
// // import { Colors, Fonts } from '../../../theme';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import HeaderPaperModule from '../../../component/headerpapermodule/Headerpapermodule';
// // import { moderateScale } from '../../../utils/responsiveSize';
// // import { useNavigation } from '@react-navigation/native';
// // export type OpenQuestionScreenProps = {
// // }
// // const OpenQuestionScreen = (props: OpenQuestionScreenProps) => {
// //     const navigation = useNavigation()
// //     const handleBack = () => {
// //         navigation?.goBack()
// //     }
// //     return (
// //         <View style={styles.container}>
// //             <StatusBar barStyle={'dark-content'} backgroundColor={Colors.lightThemeBlue} />
// //             <SafeAreaView style={{ backgroundColor: Colors.lightThemeBlue }} edges={['top']}>
// //                 <HeaderPaperModule leftIconPress={handleBack} />
// //             </SafeAreaView>
// //             <SafeAreaView style={styles.homeContainer} edges={['left', 'right', 'bottom']}>
// //                 <Text style={styles.qsText}>Ques .1</Text>
// //             </SafeAreaView>
// //         </View>
// //     )
// // }

// // export default OpenQuestionScreen
// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         backgroundColor: Colors.white
// //     },
// //     homeContainer: {
// //         flex: 1,
// //         backgroundColor: Colors.white
// //     },
// //     qsText: {
// //         fontSize: moderateScale(12),
// //         color: Colors.primaryColor,
// //         fontFamily: Fonts.InstrumentSansMedium,
// //         marginLeft: moderateScale(16),
// //         marginTop: moderateScale(16)
// //     }
// // })

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import {
//     Text,
//     View,
//     StyleSheet,
//     StatusBar,
//     TouchableOpacity,
//     ScrollView,
//     Dimensions
// } from 'react-native';
// import { Colors, Fonts } from '../../../theme';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import HeaderPaperModule from '../../../component/headerpapermodule/Headerpapermodule';
// import { moderateScale, verticalScale } from '../../../utils/responsiveSize';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// // import QuestionContent from './component/questionlist/QuestionContent'; // Import your existing components
// // import OptionItem from './component/questionlist/OptionItem';
// // import SolutionView from './component/questionlist/SolutionView';
// import QuestionContent, { OptionItem, SolutionView } from "../../studentModule/component/questionlist/QuestionListComponent";

// import { POST_FORM } from '../../../api/request';
// import { showToast } from '../../../utils/toast';
// import Loader from '../../../component/loader/Loader';

// const { width } = Dimensions.get('window');

// export type OpenQuestionScreenProps = {}

// const OpenQuestionScreen = (props: OpenQuestionScreenProps) => {
//     const navigation = useNavigation();
//     const route = useRoute();
//     const scrollViewRef = useRef<ScrollView>(null);

//     // Get params from navigation
//     const {
//         questions = [],
//         currentIndex = 0,
//         totalQuestions = 0,
//         selectedMap = {},
//         onQuestionChange,
//         selectCheck = 'Options'
//     } = route.params || {};
//     console.log('route.params', route.params);

//     // Local state
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(currentIndex);
//     const [selectedOption, setSelectedOption] = useState<string | null>(null);
//     const [showSolution, setShowSolution] = useState(false);
//     const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
//     const [loading, setLoading] = useState(false);

//     // Get current question
//     const currentQuestion = questions[currentQuestionIndex] || {};
//     const questionNumber = currentQuestionIndex + 1;
//     const isLastQuestion = currentQuestionIndex === questions.length - 1;
//     const isFirstQuestion = currentQuestionIndex === 0;

//     // Extract images helper
//     const extractImages = (html: string): string[] => {
//         const imgRegex = /<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/g;
//         const images: string[] = [];
//         let match;
//         while ((match = imgRegex.exec(html || '')) !== null) {
//             images.push(match[1]);
//         }
//         return images;
//     };

//     // Format options
//     const options = [
//         { id: 'A', label: currentQuestion.option_a || '' },
//         { id: 'B', label: currentQuestion.option_b || '' },
//         { id: 'C', label: currentQuestion.option_c || '' },
//         { id: 'D', label: currentQuestion.option_d || '' },
//     ];

//     // Check if current question has a saved answer
//     useEffect(() => {
//         const savedAnswer = userAnswers[currentQuestion.question_id];
//         if (savedAnswer) {
//             setSelectedOption(savedAnswer);
//         } else {
//             setSelectedOption(null);
//         }
//         setShowSolution(false);

//         // Scroll to top when question changes
//         scrollViewRef.current?.scrollTo({ y: 0, animated: true });
//     }, [currentQuestionIndex, currentQuestion.question_id, userAnswers]);

//     const handleBack = () => {
//         navigation.goBack();
//     };

//     const handleOptionSelect = (optionId: string) => {
//         setSelectedOption(optionId);
//         // Save answer
//         setUserAnswers(prev => ({
//             ...prev,
//             [currentQuestion.question_id]: optionId
//         }));
//     };

//     const handleNext = () => {
//         if (!isLastQuestion) {
//             setCurrentQuestionIndex(prev => prev + 1);
//         } else {
//             // Last question - maybe show summary or go back
//             showToast('info', 'Info', 'This is the last question');
//         }
//     };

//     const handlePrevious = () => {
//         if (!isFirstQuestion) {
//             setCurrentQuestionIndex(prev => prev - 1);
//         }
//     };

//     const handleCheckAnswer = () => {
//         if (!selectedOption) {
//             showToast('info', 'Info', 'Please select an option first');
//             return;
//         }
//         setShowSolution(true);
//     };

//     const handleQuestionSelect = (index: number) => {
//         setCurrentQuestionIndex(index);
//     };

//     // Calculate progress
//     const answeredCount = Object.keys(userAnswers).length;
//     const progress = ((answeredCount) / totalQuestions) * 100;

//     // Render question content
//     const renderQuestionContent = () => {
//         const images = extractImages(currentQuestion.question_text || '');
//         const questionTextWithoutImages = (currentQuestion.question_text || '')
//             .replace(/<img[^>]*>/g, '');

//         return (
//             <QuestionContent
//                 text={questionTextWithoutImages}
//                 images={images}
//                 isSelected={false}
//             />
//         );
//     };

//     // Render options
//     const renderOptions = () => {
//         return options.map(option => {
//             const isSelected = selectedOption === option.id;
//             const isCorrect = showSolution && option.id === currentQuestion.correct_option;

//             return (
//                 <TouchableOpacity
//                     key={option.id}
//                     onPress={() => !showSolution && handleOptionSelect(option.id)}
//                     activeOpacity={showSolution ? 1 : 0.7}
//                     style={[
//                         styles.optionWrapper,
//                         showSolution && option.id === currentQuestion.correct_option && styles.correctOptionWrapper,
//                         showSolution && isSelected && !isCorrect && styles.wrongOptionWrapper
//                     ]}
//                 >
//                     <OptionItem
//                         id={option.id}
//                         label={option.label}
//                         isSelected={isSelected}
//                         isCorrect={showSolution && option.id === currentQuestion.correct_option}
//                         selectCheck={selectCheck}
//                     />
//                     {showSolution && option.id === currentQuestion.correct_option && (
//                         <View style={styles.correctBadge}>
//                             <Icon name="check-circle" size={20} color="#4CAF50" />
//                         </View>
//                     )}
//                     {showSolution && isSelected && !isCorrect && (
//                         <View style={styles.wrongBadge}>
//                             <Icon name="cancel" size={20} color="#F44336" />
//                         </View>
//                     )}
//                 </TouchableOpacity>
//             );
//         });
//     };

//     // Render solution
//     const renderSolution = () => {
//         if (!showSolution) return null;

//         return (
//             <View style={styles.solutionContainer}>
//                 <SolutionView
//                     explanation={currentQuestion.explanation || 'No explanation available'}
//                     correctOption={currentQuestion.correct_option || ''}
//                     isSelected={false}
//                 />
//             </View>
//         );
//     };

//     // Render question palette (grid of question numbers)
//     const renderQuestionPalette = () => {
//         return (
//             <View style={styles.paletteContainer}>
//                 <Text style={styles.paletteTitle}>Questions</Text>
//                 <View style={styles.paletteGrid}>
//                     {questions.map((q, index) => {
//                         const isAnswered = userAnswers[q.question_id];
//                         const isCurrent = index === currentQuestionIndex;

//                         return (
//                             <TouchableOpacity
//                                 key={q.question_id}
//                                 style={[
//                                     styles.paletteItem,
//                                     isCurrent && styles.paletteItemCurrent,
//                                     isAnswered && styles.paletteItemAnswered
//                                 ]}
//                                 onPress={() => handleQuestionSelect(index)}
//                             >
//                                 <Text style={[
//                                     styles.paletteItemText,
//                                     isCurrent && styles.paletteItemTextCurrent,
//                                     isAnswered && styles.paletteItemTextAnswered
//                                 ]}>
//                                     {index + 1}
//                                 </Text>
//                             </TouchableOpacity>
//                         );
//                     })}
//                 </View>
//             </View>
//         );
//     };

//     return (
//         <View style={styles.container}>
//             <StatusBar barStyle={'dark-content'} backgroundColor={Colors.lightThemeBlue} />

//             {/* Header */}
//             <SafeAreaView style={{ backgroundColor: Colors.lightThemeBlue }} edges={['top']}>
//                 <HeaderPaperModule
//                     title={`Question ${questionNumber} of ${totalQuestions}`}
//                     leftIconPress={handleBack}
//                     rightIcon="menu"
//                     onRightPress={() => { }} // Toggle palette visibility if needed
//                 />
//             </SafeAreaView>

//             {/* Main Content */}
//             <SafeAreaView style={styles.homeContainer} edges={['left', 'right', 'bottom']}>
//                 <Loader visible={loading} />

//                 {/* Progress Bar */}
//                 <View style={styles.progressContainer}>
//                     <View style={[styles.progressBar, { width: `${progress}%` }]} />
//                     <Text style={styles.progressText}>
//                         {answeredCount}/{totalQuestions} Answered
//                     </Text>
//                 </View>

//                 <ScrollView
//                     ref={scrollViewRef}
//                     style={styles.scrollView}
//                     contentContainerStyle={styles.scrollContent}
//                     showsVerticalScrollIndicator={false}
//                 >
//                     {/* Question Number */}
//                     <View style={styles.questionHeader}>
//                         <Text style={styles.qsText}>Ques. {questionNumber}</Text>
//                         {currentQuestion.question_marks && (
//                             <Text style={styles.marksText}>[{currentQuestion.question_marks} Marks]</Text>
//                         )}
//                     </View>

//                     {/* Question Content */}
//                     <View style={styles.questionCard}>
//                         {renderQuestionContent()}
//                     </View>

//                     {/* Options */}
//                     <View style={styles.optionsContainer}>
//                         {renderOptions()}
//                     </View>

//                     {/* Solution */}
//                     {renderSolution()}
//                 </ScrollView>

//                 {/* Bottom Navigation Buttons */}
//                 <View style={styles.bottomButtons}>
//                     <TouchableOpacity
//                         style={[styles.navButton, styles.prevButton]}
//                         onPress={handlePrevious}
//                         disabled={isFirstQuestion}
//                     >
//                         <Icon name="chevron-left" size={24} color={isFirstQuestion ? '#ccc' : Colors.primaryColor} />
//                         <Text style={[styles.navButtonText, isFirstQuestion && styles.disabledText]}>Previous</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         style={[styles.navButton, styles.checkButton]}
//                         onPress={handleCheckAnswer}
//                     >
//                         <Text style={styles.checkButtonText}>Check Answer</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         style={[styles.navButton, styles.nextButton]}
//                         onPress={handleNext}
//                     >
//                         <Text style={[styles.navButtonText, isLastQuestion && styles.lastQuestionText]}>
//                             {isLastQuestion ? 'Finish' : 'Next'}
//                         </Text>
//                         <Icon name="chevron-right" size={24} color={isLastQuestion ? '#4CAF50' : Colors.primaryColor} />
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
//     homeContainer: {
//         flex: 1,
//         backgroundColor: '#f5f5f5'
//     },
//     progressContainer: {
//         height: verticalScale(30),
//         backgroundColor: '#e0e0e0',
//         marginHorizontal: moderateScale(16),
//         marginVertical: moderateScale(8),
//         borderRadius: moderateScale(15),
//         overflow: 'hidden',
//         position: 'relative',
//         justifyContent: 'center'
//     },
//     progressBar: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         bottom: 0,
//         backgroundColor: Colors.primaryColor,
//         opacity: 0.3
//     },
//     progressText: {
//         textAlign: 'center',
//         fontSize: moderateScale(12),
//         fontFamily: Fonts.InstrumentSansMedium,
//         color: Colors.black,
//         zIndex: 1
//     },
//     scrollView: {
//         flex: 1,
//     },
//     scrollContent: {
//         paddingBottom: verticalScale(80),
//     },
//     questionHeader: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginHorizontal: moderateScale(16),
//         marginTop: moderateScale(16),
//         marginBottom: moderateScale(8),
//     },
//     qsText: {
//         fontSize: moderateScale(14),
//         color: Colors.primaryColor,
//         fontFamily: Fonts.InstrumentSansSemiBold,
//     },
//     marksText: {
//         fontSize: moderateScale(12),
//         color: Colors.gray,
//         fontFamily: Fonts.InstrumentSansRegular,
//     },
//     questionCard: {
//         backgroundColor: Colors.white,
//         marginHorizontal: moderateScale(16),
//         borderRadius: moderateScale(8),
//         padding: moderateScale(12),
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.1,
//         shadowRadius: 2,
//         elevation: 2,
//         marginBottom: moderateScale(16),
//     },
//     optionsContainer: {
//         marginHorizontal: moderateScale(16),
//     },
//     optionWrapper: {
//         marginBottom: moderateScale(8),
//         backgroundColor: Colors.white,
//         borderRadius: moderateScale(8),
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.05,
//         shadowRadius: 1,
//         elevation: 1,
//         position: 'relative',
//     },
//     correctOptionWrapper: {
//         borderWidth: 2,
//         borderColor: '#4CAF50',
//         backgroundColor: '#E8F5E9',
//     },
//     wrongOptionWrapper: {
//         borderWidth: 2,
//         borderColor: '#F44336',
//         backgroundColor: '#FFEBEE',
//     },
//     correctBadge: {
//         position: 'absolute',
//         top: moderateScale(8),
//         right: moderateScale(8),
//     },
//     wrongBadge: {
//         position: 'absolute',
//         top: moderateScale(8),
//         right: moderateScale(8),
//     },
//     bottomButtons: {
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         flexDirection: 'row',
//         backgroundColor: Colors.white,
//         paddingVertical: moderateScale(8),
//         paddingHorizontal: moderateScale(16),
//         borderTopWidth: 1,
//         borderTopColor: '#e0e0e0',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: -2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     navButton: {
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
//         paddingHorizontal: moderateScale(8),
//     },
//     nextButton: {
//         marginLeft: moderateScale(4),
//     },
//     navButtonText: {
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansMedium,
//         color: Colors.primaryColor,
//     },
//     checkButtonText: {
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansSemiBold,
//         color: Colors.white,
//     },
//     disabledText: {
//         color: '#ccc',
//     },
//     lastQuestionText: {
//         color: '#4CAF50',
//     },
//     solutionContainer: {
//         marginHorizontal: moderateScale(16),
//         marginTop: moderateScale(16),
//         marginBottom: moderateScale(8),
//     },
//     paletteContainer: {
//         backgroundColor: Colors.white,
//         marginHorizontal: moderateScale(16),
//         marginVertical: moderateScale(8),
//         padding: moderateScale(12),
//         borderRadius: moderateScale(8),
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.05,
//         shadowRadius: 2,
//         elevation: 1,
//     },
//     paletteTitle: {
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansSemiBold,
//         color: Colors.black,
//         marginBottom: moderateScale(8),
//     },
//     paletteGrid: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//     },
//     paletteItem: {
//         width: (width - 80) / 5,
//         height: (width - 80) / 5,
//         margin: moderateScale(4),
//         borderRadius: moderateScale(4),
//         backgroundColor: '#f0f0f0',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     paletteItemCurrent: {
//         borderWidth: 2,
//         borderColor: Colors.primaryColor,
//     },
//     paletteItemAnswered: {
//         backgroundColor: '#C8E6C9',
//     },
//     paletteItemText: {
//         fontSize: moderateScale(12),
//         fontFamily: Fonts.InstrumentSansMedium,
//         color: Colors.black,
//     },
//     paletteItemTextCurrent: {
//         color: Colors.primaryColor,
//     },
//     paletteItemTextAnswered: {
//         color: '#2E7D32',
//     },
// });

import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';
import { Colors, Fonts } from '../../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderPaperModule from '../../../component/headerpapermodule/Headerpapermodule';
import { moderateScale } from '../../../utils/responsiveSize';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MathJax from 'react-native-mathjax';

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
    onPress 
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
            body { margin:0; padding:0; font-size:14px; font-family: 'InstrumentSansRegular', sans-serif; }
        </style>
        </head>
        <body>${cleanText}</body>
        </html>
    `;

    return (
        <TouchableOpacity 
            style={[styles.optionButton, { backgroundColor: bgColor, borderColor }]}
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
                            style={styles.optionMathJax}
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

    const {
        questions = [],
        currentIndex = 0,
    } = route.params || {};

    const [currentQIndex, setCurrentQIndex] = useState(currentIndex);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
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
        .replace(/<br\s*\/?>/gi, '\n')
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
            body { margin:0; padding:0; font-size:16px; font-family: 'InstrumentSansMedium', sans-serif; line-height:24px; }
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

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.lightThemeBlue} />
            
            <SafeAreaView style={styles.headerSafe} edges={['top']}>
                <HeaderPaperModule 
                    title={`Question ${questionNumber} of ${totalQuestions}`}
                    leftIconPress={handleBack}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.contentSafe} edges={['left', 'right', 'bottom']}>
                <ScrollView 
                    ref={scrollViewRef}
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Question Number */}
                    <View style={styles.questionNumberContainer}>
                        <Text style={styles.questionNumberText}>
                            Ques. {questionNumber}
                        </Text>
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
                            />
                        ))}
                    </View>

                    {/* Solution */}
                    {showSolution && currentQuestion.explanation && (
                        <View style={styles.solutionCard}>
                            <Text style={styles.solutionTitle}>Solution:</Text>
                            <Text style={styles.solutionText}>
                                {currentQuestion.explanation.replace(/<[^>]*>/g, '')}
                            </Text>
                            <Text style={styles.answerText}>
                                Answer: Option {currentQuestion.correct_option}
                            </Text>
                        </View>
                    )}
                </ScrollView>

                {/* Bottom Buttons - Exactly as in screenshot */}
                <View style={styles.bottomButtons}>
                    <TouchableOpacity 
                        style={[styles.bottomButton, styles.prevButton]}
                        onPress={handlePrevious}
                        disabled={currentQIndex === 0}
                    >
                        <Icon 
                            name="chevron-left" 
                            size={20} 
                            color={currentQIndex === 0 ? '#ccc' : Colors.primaryColor} 
                        />
                        <Text style={[
                            styles.buttonText,
                            currentQIndex === 0 && styles.disabledText
                        ]}>Previous</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.bottomButton, styles.checkButton]}
                        onPress={handleCheckAnswer}
                    >
                        <Text style={styles.checkButtonText}>Check Answer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.bottomButton, styles.nextButton]}
                        onPress={handleNext}
                        disabled={currentQIndex === totalQuestions - 1}
                    >
                        <Text style={[
                            styles.buttonText,
                            currentQIndex === totalQuestions - 1 && styles.disabledText
                        ]}>Next</Text>
                        <Icon 
                            name="chevron-right" 
                            size={20} 
                            color={currentQIndex === totalQuestions - 1 ? '#ccc' : Colors.primaryColor} 
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    headerSafe: {
        backgroundColor: Colors.lightThemeBlue
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
    questionNumberContainer: {
        paddingHorizontal: moderateScale(16),
        paddingTop: moderateScale(16),
        paddingBottom: moderateScale(8),
    },
    questionNumberText: {
        fontSize: moderateScale(14),
        color: Colors.primaryColor,
        fontFamily: Fonts.InstrumentSansSemiBold,
    },
    questionCard: {
        backgroundColor: Colors.white,
        marginHorizontal: moderateScale(16),
        borderRadius: moderateScale(8),
        padding: moderateScale(16),
        marginBottom: moderateScale(16),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
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
        marginTop: moderateScale(12),
        alignItems: 'center',
    },
    questionImage: {
        width: '100%',
        height: moderateScale(150),
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
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: moderateScale(10),
        padding: moderateScale(12),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
    },
    optionLetter: {
        width: moderateScale(32),
        height: moderateScale(32),
        borderRadius: moderateScale(16),
        backgroundColor: '#F0F0F0',
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
        fontSize: moderateScale(14),
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
        fontSize: moderateScale(14),
        fontFamily: Fonts.InstrumentSansRegular,
        color: Colors.black,
        lineHeight: moderateScale(20),
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
    solutionText: {
        fontSize: moderateScale(13),
        fontFamily: Fonts.InstrumentSansRegular,
        color: Colors.black,
        lineHeight: moderateScale(18),
        marginBottom: moderateScale(8),
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
        paddingVertical: moderateScale(8),
        paddingHorizontal: moderateScale(16),
    },
    bottomButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: moderateScale(10),
        borderRadius: moderateScale(6),
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
        color: '#ccc',
    },
});

export default OpenQuestionScreen;