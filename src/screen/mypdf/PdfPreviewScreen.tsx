// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   Dimensions,
//   StatusBar,
//   FlatList,
// } from 'react-native';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import MathJax from 'react-native-mathjax';
// import HeaderPaperModule from '../../component/headerpapermodule/Headerpapermodule';
// import { Colors, Fonts } from '../../theme';
// import { moderateScale } from '../../utils/responsiveSize';

// import {
//   Gesture,
//   GestureDetector,
//   GestureHandlerRootView,
// } from 'react-native-gesture-handler';

// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withSpring,
// } from 'react-native-reanimated';
// import { localStorage, storageKeys } from '../../storage/storage';

// const { width } = Dimensions.get('window');

// const mathJaxOptions = {
//   messageStyle: 'none',
//   extensions: ['tex2jax.js'],
//   jax: ['input/TeX', 'output/HTML-CSS'],
//   tex2jax: {
//     inlineMath: [['$', '$'], ['\\(', '\\)']],
//     displayMath: [['$$', '$$'], ['\\[', '\\]']],
//   },
// };

// const PDFPreviewScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute<any>();
//   const { previewData } = route.params || {};
//   const [subName, setSubName] = useState('')

//   const questions = useSelector(
//     (state: any) => state.pdfQuestions.questions || []
//   );

//   console.log('questionsssss', questions);
//   /* -------------------- PINCH ZOOM -------------------- */

//   const scale = useSharedValue(1);

//   const pinchGesture = Gesture.Pinch()
//     .onUpdate((e) => {
//       scale.value = Math.min(Math.max(e.scale, 1), 3);
//     })
//     .onEnd(() => {
//       if (scale.value < 1) {
//         scale.value = withSpring(1);
//       }
//     });

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: scale.value }],
//   }));

//   /* --------------------------------------------------- */

//   const stripHtml = (text = '') =>
//     text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');

//   useEffect(() => {

//     const sub = async () => {
//       const subjectName = await localStorage.getItem(storageKeys.selectedSubject);
//       setSubName(subjectName || '');
//     }
//     sub()
//   }, [])
//   return (
//     // <GestureHandlerRootView style={{ flex: 1 }}>
//     //   <StatusBar backgroundColor={Colors.primaryColor} />

//     //   <SafeAreaView style={{ backgroundColor: Colors.lightThemeBlue }}>
//     //     <HeaderPaperModule
//     //       title="Preview"
//     //       leftIconPress={() => navigation.goBack()}
//     //     />
//     //   </SafeAreaView>

//     //   <SafeAreaView style={styles.container} edges={['bottom']}>
//     //     <GestureDetector gesture={pinchGesture}>
//     //       <Animated.ScrollView
//     //         contentContainerStyle={styles.scrollContent}
//     //         showsVerticalScrollIndicator={false}
//     //       >
//     //         <Animated.View style={[styles.paper, animatedStyle]}>
//     //           {/* HEADER */}
//     //           <View style={styles.header}>
//     //             {previewData?.logoUri && (
//     //               <Image
//     //                 source={{ uri: previewData.logoUri }}
//     //                 style={styles.logo}
//     //               />
//     //             )}

//     //             <Text style={styles.institute}>
//     //               {previewData?.instituteName}
//     //             </Text>
//     //             <Text style={styles.test}>{previewData?.testName}</Text>

//     //             <View style={styles.metaRow}>
//     //               <Text>Subjects : Maths</Text>
//     //               <Text>Date : {previewData?.date}</Text>
//     //             </View>

//     //             <View style={styles.metaRow}>
//     //               <Text>Total Marks : 32</Text>
//     //               <Text>Hours : 3 Hours</Text>
//     //             </View>
//     //           </View>

//     //           {/* QUESTIONS */}
//     //           {questions.map((q: any, index: number) => (
//     //             <View key={index} style={styles.question}>
//     //               <Text style={styles.qNo}>Q{index + 1}.</Text>

//     //               <MathJax
//     //                 html={`<div>${stripHtml(q.question_text)}</div>`}
//     //                 mathJaxOptions={mathJaxOptions}
//     //                 style={styles.math}
//     //               />

//     //               {['a', 'b', 'c', 'd'].map((opt, i) => (
//     //                 <View key={i} style={styles.option}>
//     //                   <Text style={styles.optLabel}>
//     //                     {String.fromCharCode(65 + i)}.
//     //                   </Text>
//     //                   <Text style={styles.optText}>
//     //                     {stripHtml(q[`option_${opt}`])}
//     //                   </Text>
//     //                 </View>
//     //               ))}
//     //             </View>
//     //           ))}

//     //           {/* FOOTER */}
//     //           <Text style={styles.footer}>
//     //             {previewData?.wishText || 'Wish you all the best!'}
//     //           </Text>

//     //           {/* WATERMARK */}
//     //           {previewData?.waterMarkType === '2' && (
//     //             <Text style={styles.watermark}>
//     //               {previewData?.instituteName}
//     //             </Text>
//     //           )}
//     //         </Animated.View>
//     //       </Animated.ScrollView>
//     //     </GestureDetector>
//     //   </SafeAreaView>
//     // </GestureHandlerRootView>
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <StatusBar backgroundColor={Colors.primaryColor} />

//       {/* HEADER */}
//       <SafeAreaView style={styles.headerWrap} edges={['top']} >
//         <HeaderPaperModule headerContainerStyle={{ paddingVertical: moderateScale(1) }} title="Preview" leftIconPress={() => navigation.goBack()}
//           rightPress2={() => { navigation.navigate('MyPdfScreen') }}
//         />
//       </SafeAreaView>

//       {/* QUESTION CHIP */}
//       <View style={styles.questionChipWrap}>
//         <Text style={styles.questionChip}>Question</Text>
//       </View>

//       <SafeAreaView style={styles.container} edges={['bottom']}>
//         <GestureDetector gesture={pinchGesture}>
//           <Animated.ScrollView
//             contentContainerStyle={styles.scrollContent}
//             showsVerticalScrollIndicator={false}>
//             {/* PAGE CONTAINER */}
//             <View style={styles.pageWrapper}>
//               <Animated.View style={[styles.paper, animatedStyle, previewData?.borderType === '1' && { borderColor: 'rgba(0,0,0,.6)', borderWidth: 1 }]}>
//                 {/* HEADER */}
//                 <View style={styles.header}>
//                   {previewData?.logoUri && (
//                     <View style={{ height: moderateScale(80), width: moderateScale(324), }}>
//                       <Image
//                         source={{ uri: previewData.logoUri }}
//                         style={styles.logo}
//                         resizeMode='contain'
//                       />
//                     </View>
//                   )}

//                   <Text style={styles.institute}>
//                     {previewData?.instituteName}
//                   </Text>
//                   <Text style={styles.test}>{previewData?.testName}</Text>

//                   <View style={styles.metaRow}>
//                     <Text style={styles.subText}>Subjects : {subName || ''}</Text>
//                     <Text style={styles.subText}>Date : {previewData?.date || ''}</Text>
//                   </View>

//                   <View style={styles.metaRow}>
//                     <Text style={styles.subText}>Total Marks : {previewData?.dropDownValue}</Text>
//                     <Text style={styles.subText}>Hours : 3 Hours</Text>
//                   </View>
//                 </View>

//                 {/* <View style={styles.sectionTitle}>
//                   <Text style={styles.sectionText}>
//                     {subName} - Section A (MCQ)
//                   </Text>
//                 </View> */}

//                 {/* QUESTIONS */}
//                 {/* {questions.map((q: any, index: number) => (
//                   <View key={index} style={styles.question}>
//                     <Text style={styles.qNo}>Q{index + 1}.</Text>
//                     <MathJax
//                       html={`<div>${stripHtml(q.question_text)}</div>`}
//                       mathJaxOptions={mathJaxOptions}
//                       style={styles.mathStyle}
//                     />

//                     {['a', 'b', 'c', 'd'].map((opt, i) => (
//                       <View key={i} style={styles.option}>
//                         <Text style={styles.optLabel}>
//                           {String.fromCharCode(65 + i)}.
//                         </Text>
//                         <Text style={styles.optText}>
//                           {stripHtml(q[`option_${opt}`])}
//                         </Text>
//                       </View>
//                     ))}
//                   </View>
//                 ))} */}


// <FlatList
//         data={questions}
//         // keyExtractor={keyExtractor}
//         renderItem={renderItem}
//         extraData={extraData}
//         initialNumToRender={3}
//         maxToRenderPerBatch={5}
//         windowSize={21}
//         removeClippedSubviews={false}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.listContent}
//       />


//                 {/* FOOTER */}
//                 <Text style={styles.footer}>
//                   {previewData?.wishText || 'Wish you all the best!'}
//                 </Text>

//                 {/* WATERMARK */}
//                 {previewData?.waterMarkType === '2' && (
//                   <Text style={styles.watermark}>
//                     {previewData?.instituteName}
//                   </Text>
//                 )}
//               </Animated.View>
//             </View>
//           </Animated.ScrollView>
//         </GestureDetector>
//       </SafeAreaView>
//     </GestureHandlerRootView>
//   );
// };

// export default PDFPreviewScreen;

// /* -------------------- STYLES -------------------- */

// const PAGE_WIDTH = width * 0.9;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#EAF3FA',
//   },

//   headerWrap: {
//     backgroundColor: Colors.lightThemeBlue,
//   },
//   previewTexet: {
//     fontSize: moderateScale(16),
//     color: Colors.black,
//     fontFamily: Fonts.InstrumentSansRegular,
//     marginVertical: moderateScale(6)
//   },
//   generateBtn: {
//     backgroundColor: '#2F80ED',
//     color: '#fff',
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//     borderRadius: 6,
//     fontSize: 12,
//   },

//   questionChipWrap: {
//     alignItems: 'center',
//     marginVertical: 8,
//     // padding: moderateScale(0),
//     // borderRadius:moderateScale(4)\
//   },

//   questionChip: {
//     backgroundColor: Colors.primaryColor,
//     color: '#fff',
//     borderRadius: moderateScale(4),
//     fontSize: moderateScale(8),
//     paddingHorizontal: moderateScale(6),
//     paddingVertical: moderateScale(3),
//   },

//   scrollContent: {
//     paddingBottom: 40,
//   },

//   pageWrapper: {
//     alignItems: 'center',
//     // borderWidth:1
//   },

//   paper: {
//     width: PAGE_WIDTH,
//     backgroundColor: '#fff',
//     borderRadius: 4,
//     paddingHorizontal: moderateScale(8),
//     paddingBottom: moderateScale(16),
//     paddingTop: moderateScale(2),
//     borderWidth: 1,
//     borderColor: '#DADADA',

//     // Shadow (PDF look)
//     // // elevation: 1,
//     // shadowColor: '#000',
//     // shadowOpacity: 0.15,
//     // shadowRadius: 8,
//     // shadowOffset: { width: 0, height: 4 },
//   },

//   header: {
//     alignItems: 'center',
//     marginBottom: 16,
//   },

//   logo: {
//     // width: moderateScale(60),
//     // height: moderateScale(60),
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },

//   institute: {
//     fontFamily: Fonts.InstrumentSansSemiBold,
//     fontSize: moderateScale(18),
//     color: Colors.black
//   },

//   test: {
//     fontSize: moderateScale(9),
//     marginBottom: 8,
//     fontFamily: Fonts.InstrumentSansRegular,
//     color: Colors.black,
//     borderWidth: 1
//   },

//   metaRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     // borderWidth:1
//   },
//   subText: {
//     fontSize: moderateScale(8),
//     // marginBottom: 8,
//     fontFamily: Fonts.InstrumentSansMedium,
//     color: Colors.black
//   },

//   sectionTitle: {
//     borderWidth: 1,
//     borderColor: '#000',
//     padding: moderateScale(4),
//     alignItems: 'center',
//     // marginVertical:moderateScale(1)
//   },

//   sectionText: {
//     // fontWeight: 'bold',
//     fontSize: moderateScale(12),
//     fontFamily: Fonts.InstrumentSansBold,
//     color: Colors.black
//   },

//   question: {
//     marginVertical: 10,
//     // borderWidth: 1,

//   },

//   qNo: {
//     // fontWeight: 'bold',
//     fontSize: moderateScale(12),
//     fontFamily: Fonts.InstrumentSansBold,
//     color: Colors.black,
//     // borderWidth: 1,
//     width: moderateScale(20)
//   },
//   mathStyle: {
//     // borderWidth:1
//   },

//   option: {
//     flexDirection: 'row',
//     alignItems: "center",
//     marginTop: 4,
//     // borderWidth:1
//   },

//   optLabel: {
//     // width: 20,
//     // fontWeight: 'bold',
//     // borderWidth:1
//     fontSize: moderateScale(12),
//     fontFamily: Fonts.InstrumentSansBold,
//     color: Colors.black,
//     // borderWidth: 1,
//     width: moderateScale(20)
//   },

//   optText: {
//     flex: 1,
//   },

//   footer: {
//     textAlign: 'center',
//     marginTop: 24,
//   },

//   watermark: {
//     position: 'absolute',
//     top: '45%',
//     alignSelf: 'center',
//     opacity: 0.1,
//     fontSize: 32,
//     transform: [{ rotate: '-30deg' }],
//   },
// });



// import React, { useEffect, useState, useMemo } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   StatusBar,
// } from 'react-native';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import {
//   Gesture,
//   GestureDetector,
//   GestureHandlerRootView,
// } from 'react-native-gesture-handler';

// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withSpring,
// } from 'react-native-reanimated';

// import HeaderPaperModule from '../../component/headerpapermodule/Headerpapermodule';
// import { Colors } from '../../theme';
// import { moderateScale } from '../../utils/responsiveSize';
// import { localStorage, storageKeys } from '../../storage/storage';
// import QuestionListData from '../papermodule/questionModule/component/questionlist/QuestionListData';

// /* 🔥 IMPORT YOUR EXISTING LIST */
// // import QuestionListData from '../../component/QuestionListData';
// // import {  } from "../../component/QuestionListData";

// const PDFPreviewScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute<any>();
//   const { previewData } = route.params || {};

//   const [subName, setSubName] = useState('');

//   /* 🔥 QUESTIONS FROM REDUX */
//   const questions = useSelector(
//     (state: any) => state.pdfQuestions.questions || []
//   );

//   /* ---------------- PINCH ZOOM ---------------- */
//   const scale = useSharedValue(1);

//   const pinchGesture = Gesture.Pinch()
//     .onUpdate(e => {
//       scale.value = Math.min(Math.max(e.scale, 1), 2.5);
//     })
//     .onEnd(() => {
//       if (scale.value < 1) scale.value = withSpring(1);
//     });

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: scale.value }],
//   }));

//   /* ------------------------------------------- */

//   useEffect(() => {
//     const loadSubject = async () => {
//       const subject = await localStorage.getItem(storageKeys.selectedSubject);
//       setSubName(subject || '');
//     };
//     loadSubject();
//   }, []);

//   /* 🔥 REQUIRED STATES FOR QuestionListData */
//   const [selectedMap, setSelectedMap] = useState<Record<string, boolean>>({});
//   const [questionNumber, setQuestionNumber] = useState<Record<string, boolean>>(
//     {}
//   );

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <StatusBar backgroundColor={Colors.primaryColor} />

//       {/* HEADER */}
//       <SafeAreaView edges={['top']} style={{ backgroundColor: Colors.lightThemeBlue }}>
//         <HeaderPaperModule
//           title="Preview"
//           leftIconPress={() => navigation.goBack()}
//         />
//       </SafeAreaView>

//       <SafeAreaView style={styles.container} edges={['bottom']}>
//         <GestureDetector gesture={pinchGesture}>
//           <Animated.ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={styles.scrollContent}
//           >
//             <Animated.View style={[styles.paper, animatedStyle]}>
//               {/* ---------------- PAPER HEADER ---------------- */}
//               <View style={styles.paperHeader}>
//                 {previewData?.logoUri && (
//                   <Image
//                     source={{ uri: previewData.logoUri }}
//                     style={styles.logo}
//                     resizeMode="contain"
//                   />
//                 )}

//                 <Text style={styles.institute}>
//                   {previewData?.instituteName}
//                 </Text>

//                 <Text style={styles.test}>
//                   {previewData?.testName}
//                 </Text>

//                 <View style={styles.metaRow}>
//                   <Text style={styles.metaText}>
//                     Subject : {subName}
//                   </Text>
//                   <Text style={styles.metaText}>
//                     Date : {previewData?.date}
//                   </Text>
//                 </View>

//                 <View style={styles.metaRow}>
//                   <Text style={styles.metaText}>
//                     Total Marks : {previewData?.dropDownValue}
//                   </Text>
//                   <Text style={styles.metaText}>
//                     Time : 3 Hours
//                   </Text>
//                 </View>
//               </View>

//               {/* ---------------- QUESTIONS ---------------- */}
//               <QuestionListData
//                 selectCheck="Options"
//                 selectedMap={selectedMap}
//                 setSelectedMap={setSelectedMap}
//                 questionNumber={questionNumber}
//                 setQuestionNumber={setQuestionNumber}
//                 questionsData={questions}
//                 currentPage={1}
//                 limit={questions.length}
//                 hideContant={true}
//               />

//               {/* ---------------- FOOTER ---------------- */}
//               <Text style={styles.footer}>
//                 {previewData?.wishText || 'Wish you all the best!'}
//               </Text>

//               {/* ---------------- WATERMARK ---------------- */}
//               {previewData?.waterMarkType === '2' && (
//                 <Text style={styles.watermark}>
//                   {previewData?.instituteName}
//                 </Text>
//               )}
//             </Animated.View>
//           </Animated.ScrollView>
//         </GestureDetector>
//       </SafeAreaView>
//     </GestureHandlerRootView>
//   );
// };

// export default PDFPreviewScreen;

// /* ---------------- STYLES ---------------- */

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.lightThemeBlue,
//   },
//   scrollContent: {
//     padding: moderateScale(16),
//   },
//   paper: {
//     backgroundColor: Colors.white,
//     borderRadius: moderateScale(6),
//     paddingBottom: moderateScale(20),
//   },
//   paperHeader: {
//     alignItems: 'center',
//     marginBottom: moderateScale(12),
//   },
//   logo: {
//     width: moderateScale(240),
//     height: moderateScale(80),
//     marginBottom: moderateScale(8),
//   },
//   institute: {
//     fontSize: moderateScale(16),
//     fontWeight: '700',
//     color: Colors.black,
//   },
//   test: {
//     fontSize: moderateScale(14),
//     marginTop: moderateScale(2),
//     color: Colors.black,
//   },
//   metaRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginTop: moderateScale(6),
//     paddingHorizontal: moderateScale(8),
//   },
//   metaText: {
//     fontSize: moderateScale(12),
//     color: Colors.black,
//   },
//   footer: {
//     textAlign: 'center',
//     marginTop: moderateScale(20),
//     fontSize: moderateScale(12),
//     color: Colors.black,
//   },
//   watermark: {
//     position: 'absolute',
//     opacity: 0.08,
//     fontSize: moderateScale(40),
//     transform: [{ rotate: '-30deg' }],
//     top: '40%',
//     alignSelf: 'center',
//     color: Colors.black,
//   },
// });

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import HeaderPaperModule from '../../component/headerpapermodule/Headerpapermodule';
import { Colors } from '../../theme';
import { moderateScale } from '../../utils/responsiveSize';
import { localStorage, storageKeys } from '../../storage/storage';
import QuestionListData from '../papermodule/questionModule/component/questionlist/QuestionListData';
const PDFPreviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { previewData } = route.params || {};

  const [subName, setSubName] = useState('');

  const questions = useSelector(
    (state: any) => state.pdfQuestions.questions || []
  );

  /* ---------------- PINCH ZOOM ---------------- */
  const scale = useSharedValue(1);

  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => {
      scale.value = Math.min(Math.max(e.scale, 1), 2.5);
    })
    .onEnd(() => {
      if (scale.value < 1) {
        scale.value = withSpring(1);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  /* ------------------------------------------- */

  useEffect(() => {
    const loadSubject = async () => {
      const subject = await localStorage.getItem(storageKeys.selectedSubject);
      setSubName(subject || '');
    };
    loadSubject();
  }, []);

  const [selectedMap, setSelectedMap] = useState<Record<string, boolean>>({});
  const [questionNumber, setQuestionNumber] = useState<Record<string, boolean>>(
    {}
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.primaryColor} />

      {/* HEADER */}
      <SafeAreaView
        edges={['top']}
        style={{ backgroundColor: Colors.lightThemeBlue }}
      >
        <HeaderPaperModule
          title="Preview"
          leftIconPress={() => navigation.goBack()}
        />
      </SafeAreaView>

      <SafeAreaView style={styles.container} edges={['bottom']}>
        <GestureDetector gesture={pinchGesture}>
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Animated.View style={[styles.paper, animatedStyle]}>

              {/* ---------------- PAPER HEADER ---------------- */}
              <View style={styles.paperHeader}>
                {previewData?.logoUri && (
                  <Image
                    source={{ uri: previewData.logoUri }}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                )}

                <Text style={styles.institute}>
                  {previewData?.instituteName}
                </Text>

                <Text style={styles.test}>
                  {previewData?.testName}
                </Text>

                <View style={styles.metaRow}>
                  <Text style={styles.metaText}>
                    Subject : {subName}
                  </Text>
                  <Text style={styles.metaText}>
                    Date : {previewData?.date}
                  </Text>
                </View>

                <View style={styles.metaRow}>
                  <Text style={styles.metaText}>
                    Total Marks : {previewData?.dropDownValue}
                  </Text>
                  <Text style={styles.metaText}>
                    Time : 3 Hours
                  </Text>
                </View>
              </View>

              {/* ---------------- QUESTIONS ---------------- */}
              <QuestionListData
                selectCheck="Options"
                selectedMap={selectedMap}
                setSelectedMap={setSelectedMap}
                questionNumber={questionNumber}
                setQuestionNumber={setQuestionNumber}
                questionsData={questions}
                currentPage={1}
                limit={questions.length}
                hideContant={true}
              />

              {/* ---------------- FOOTER ---------------- */}
              <Text style={styles.footer}>
                {previewData?.wishText || 'Wish you all the best!'}
              </Text>

              {/* ---------------- WATERMARK LOGO ---------------- */}
              {previewData?.waterMarkType === '1' &&
                previewData?.waterMarkLogo && (
                  <Image
                    source={{ uri: previewData.waterMarkLogo }}
                    style={[
                      styles.watermarkLogo,
                      previewData?.waterMarkPosition === '2'
                        ? styles.watermarkBack
                        : styles.watermarkCenter,
                    ]}
                    resizeMode="contain"
                  />
                )}

              {/* ---------------- WATERMARK TEXT ---------------- */}
              {previewData?.waterMarkType === '2' &&
                previewData?.instituteName && (
                  <Text style={styles.watermarkText}>
                    {previewData.instituteName}
                  </Text>
                )}

            </Animated.View>
          </Animated.ScrollView>
        </GestureDetector>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default PDFPreviewScreen;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightThemeBlue,
  },
  scrollContent: {
    padding: moderateScale(16),
  },
  paper: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(6),
    paddingBottom: moderateScale(20),
  },
  paperHeader: {
    alignItems: 'center',
    marginBottom: moderateScale(12),
  },
  logo: {
    width: moderateScale(240),
    height: moderateScale(80),
    marginBottom: moderateScale(8),
  },
  institute: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: Colors.black,
  },
  test: {
    fontSize: moderateScale(14),
    marginTop: moderateScale(2),
    color: Colors.black,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: moderateScale(6),
    paddingHorizontal: moderateScale(8),
  },
  metaText: {
    fontSize: moderateScale(12),
    color: Colors.black,
  },
  footer: {
    textAlign: 'center',
    marginTop: moderateScale(20),
    fontSize: moderateScale(12),
    color: Colors.black,
  },

  /* -------- WATERMARK STYLES -------- */

  watermarkLogo: {
    position: 'absolute',
    width: moderateScale(220),
    height: moderateScale(220),
    opacity: 0.2,
  },
  watermarkCenter: {
    top: '35%',
    left: '20%',
  },
  watermarkBack: {
    bottom: '15%',
    right: '15%',
  },
  watermarkText: {
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
    fontSize: moderateScale(40),
    fontWeight: '700',
    color: Colors.black,
    opacity: 0.08,
    transform: [{ rotate: '-30deg' }],
  },
});
