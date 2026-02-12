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

import HeaderPaperModule from '../../../component/headerpapermodule/Headerpapermodule';
import { Colors, Fonts } from '../../../theme';
import { moderateScale } from '../../../utils/responsiveSize';
import { localStorage, storageKeys } from '../../../storage/storage';
import PDFPreviewListComponent from './component/PDFPreviewListComponent';

const PDFPreviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { previewData } = route.params || {};
  console.log('ffffffff', previewData);

  const [subName, setSubName] = useState('');

  // const questions = useSelector(
  //   (state: any) => state. || []
  // );
  const questions = useSelector((state: any) => state.pdfQuestions?.allQuestions
  );
  const questionsee = useSelector((state: any) => state.pdfQuestions
  );

  console.log('qqqwwwwwwwwwwchapterData', questionsee);

  /* ---------------- PINCH ZOOM ---------------- */
  // const scale = useSharedValue(1);

  // const pinchGesture = Gesture.Pinch()
  //   .onUpdate(e => {
  //     scale.value = Math.min(Math.max(e.scale, 1), 2.5);
  //   })
  //   .onEnd(() => {
  //     if (scale.value < 1) {
  //       scale.value = withSpring(1);
  //     }
  //   });

  // const animatedStyle = useAnimatedStyle(() => ({
  //   transform: [{ scale: scale.value }],
  // }));

  const scale = useSharedValue(1);
const savedScale = useSharedValue(1);

const pinchGesture = Gesture.Pinch()
  .onUpdate((e) => {
    scale.value = Math.min(Math.max(savedScale.value * e.scale, 1), 3);
  })
  .onEnd(() => {
    savedScale.value = scale.value;
  });

const animatedStyle = useAnimatedStyle(() => {
  return {
    transform: [{ scale: scale.value }],
  };
});


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
    <SafeAreaView style={styles.container} edges={['bottom']}>

        <Animated.View style={[styles.paper, animatedStyle]}>
          <StatusBar backgroundColor={Colors.primaryColor} />

          {/* HEADER */}
          <SafeAreaView
            edges={['top']}
            style={{ backgroundColor: Colors.lightThemeBlue }}
          >

            <HeaderPaperModule
              title="Preview"
              leftIconPress={() => navigation.goBack()}
              rightPress2={() => navigation.navigate('MyPdfScreen')}
            />
          </SafeAreaView>
                <GestureDetector gesture={pinchGesture}>

          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* All paper content */}
            {/* ---------------- PAPER HEADER ---------------- */}
            <View style={{ borderWidth: previewData?.borderType === '1' ? 1 : 0, borderColor: '#000' , flex:1, marginHorizontal:moderateScale(14)}}>
              <View style={styles.paperHeader}>
                {previewData?.logoUri && (
                  <View style={{width:moderateScale(300),height:moderateScale(85)}}>
                  <Image  
                    source={{ uri: previewData.logoUri }}
                    style={styles.logo}
                    resizeMode="cover"
                  />
                  </View>
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

                <View style={[styles.metaRow, { marginBottom: moderateScale(5) }]}>
                  <Text style={styles.metaText}>
                    Total Marks : {previewData?.dropDownValue}
                  </Text>
                  <Text style={styles.metaText}>
                    Time : 3 Hours
                  </Text>
                </View>
                {/* <View style={{ marginVertical: moderateScale(0) }}> */}
                <View style={styles.lineBox} />
                <View style={{ borderWidth: 1, backgroundColor: Colors.white, marginVertical: moderateScale(4), paddingHorizontal: moderateScale(10) }}>
                  <Text style={styles.subText}>{subName} - Section {previewData?.questionType} (MCQ)</Text>
                </View>
                <View style={[styles.lineBox, { marginBottom: moderateScale(5) }]} />
              </View>
              {/* </View> */}

              {/* ---------------- QUESTIONS ---------------- */}
              <PDFPreviewListComponent
                selectCheck="Options"
                selectedMap={selectedMap}
                setSelectedMap={setSelectedMap}
                questionNumber={questionNumber}
                setQuestionNumber={setQuestionNumber}
                questionsData={questions}
                currentPage={1}
                limit={questions?.length}
                hideContant={true}
                questionType={previewData?.questionType}
              />
              {/* ---------------- FOOTER ---------------- */}
              <Text style={styles.footer}>
                {previewData?.wishText || 'Wish you all the best!'}
              </Text>
            </View>

          </Animated.ScrollView>

          {/* ---------------- WATERMARK LOGO ---------------- */}
          {/* {previewData?.waterMarkType === '1' &&
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
                )} */}

          {/* ---------------- WATERMARK TEXT ---------------- */}
          {/* {previewData?.waterMarkType === '2' &&
                previewData?.instituteName && (
                  <Text style={styles.watermarkText}>
                    {previewData.instituteName}
                  </Text>
                  )} */}
                  </GestureDetector>
        </Animated.View>

      {/* Watermark overlay (fixed to screen, not scrollable) */}
      {previewData?.waterMarkType === '1' &&
        previewData?.waterMarkLogo && (
          <Image
            source={{ uri: previewData.waterMarkLogo }}
            style={[
              styles.watermarkOverlay,
              previewData?.waterMarkPosition === '2'
                ? styles.watermarkBack
                : styles.watermarkCenter,
            ]}
            resizeMode="contain"
          />
        )}

      {previewData?.waterMarkType === '2' &&
        previewData?.waterMarkText && (
          <Text style={styles.watermarkOverlayText}>
            {previewData?.waterMarkText}
          </Text>
        )}
    </SafeAreaView>
  );

};

export default PDFPreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightThemeBlue,

  },
  watermarkOverlay: {
    position: 'absolute',
    width: moderateScale(220),
    height: moderateScale(220),
    opacity: 0.2,
    pointerEvents: 'none', // Allows scrolling through the watermark
  },
  watermarkOverlayText: {
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
    fontSize: moderateScale(50),
    fontFamily:Fonts.InterBold,
    color: Colors.black,
    opacity: 0.08,
    transform: [{ rotate: '-30deg' }],
    pointerEvents: 'none', // Allows scrolling through the watermark
  },
  scrollContent: {
    padding: moderateScale(16),

  },
  paper: {
    backgroundColor: 'rgba(0,0,0,.1)',
    borderRadius: moderateScale(6),
    paddingBottom: moderateScale(20),
    // IMPORTANT: Make paper container relative for absolute positioning of watermark
    position: 'relative',
    minHeight: 800, // Minimum paper height

  },
  paperHeader: {
    alignItems: 'center',
    // marginBottom: moderateScale(12),
    backgroundColor: Colors.white,
    // marginHorizontal:moderateScale(14)

  },
  logo: {
    // width: moderateScale(240),
    // height: moderateScale(80),
    marginBottom: moderateScale(8),
    width:'100%',
    height:'100%'
  },
  institute: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: Colors.black,
  },
  test: {
    fontSize: moderateScale(10),
    marginTop: moderateScale(2),
    color: Colors.black,
    fontFamily: Fonts.InterRegular
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    // marginTop: moderateScale(),
    paddingHorizontal: moderateScale(8),
  },
  metaText: {
    fontSize: moderateScale(10),
    color: Colors.black,
    fontFamily: Fonts.InterRegular
  },
  lineBox: {
    height: 1.5,
    backgroundColor: '#000',
    width: '100%'
  },
  subText: {
    fontSize: moderateScale(14),
    color: '#000',
    fontFamily: Fonts.InterBold,
    // paddingHorizontal:moderateScale(10),
    // borderWidth: 1,
    alignSelf: "center",
    // marginVertical: moderateScale(4),
    textAlign: 'center',
    borderBottomWidth: 1.5,
    marginBottom: moderateScale(4)
  },
  questionContainer: {
    // Container for questions to ensure proper layout
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
    // Center it horizontally and vertically
  },
  watermarkCenter: {
    top: '50%',
    left: '50%',
    transform: [{ translateX: -110 }, { translateY: -110 }], // Center the logo
  },
  watermarkBack: {
    bottom: '10%',
    right: '10%',
  },
  watermarkText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -50 }, // Adjust based on text width
      { translateY: -25 }, // Adjust based on text height
      { rotate: '-30deg' }
    ],
    fontSize: moderateScale(40),
    fontWeight: '700',
    color: Colors.black,
    opacity: 0.08,
    // Make text width flexible
    width: '100%',
    textAlign: 'center',
  },
});


// // **********************************&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// import React, { useEffect, useState } from 'react';
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
//   runOnJS,
// } from 'react-native-reanimated';

// import HeaderPaperModule from '../../../component/headerpapermodule/Headerpapermodule';
// import { Colors, Fonts } from '../../../theme';
// import { moderateScale } from '../../../utils/responsiveSize';
// import { localStorage, storageKeys } from '../../../storage/storage';
// import PDFPreviewListComponent from './component/PDFPreviewListComponent';

// const PDFPreviewScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute<any>();
//   const { previewData } = route.params || {};
//   console.log('ffffffff', previewData);

//   const [subName, setSubName] = useState('');

//   const questions = useSelector((state: any) => state.pdfQuestions?.allQuestions);
//   const questionsee = useSelector((state: any) => state.pdfQuestions);

//   console.log('qqqwwwwwwwwwwchapterData', questionsee);

//   /* ---------------- PINCH ZOOM & PAN LOGIC ---------------- */
//   const scale = useSharedValue(1);
//   const savedScale = useSharedValue(1);
//   const translateX = useSharedValue(0);
//   const translateY = useSharedValue(0);
//   const savedTranslateX = useSharedValue(0);
//   const savedTranslateY = useSharedValue(0);

//   // Pinch gesture for zooming
//   const pinchGesture = Gesture.Pinch()
//     .onUpdate((e) => {
//       scale.value = Math.min(Math.max(savedScale.value * e.scale, 1), 3);
//     })
//     .onEnd(() => {
//       savedScale.value = scale.value;
      
//       // Reset position when zoomed out to 1x
//       if (scale.value === 1) {
//         translateX.value = withSpring(0);
//         translateY.value = withSpring(0);
//         savedTranslateX.value = 0;
//         savedTranslateY.value = 0;
//       }
//     });

//   // Pan gesture for moving the content when zoomed
//   const panGesture = Gesture.Pan()
//     .onUpdate((e) => {
//       if (scale.value > 1) {
//         translateX.value = savedTranslateX.value + e.translationX;
//         translateY.value = savedTranslateY.value + e.translationY;
//       }
//     })
//     .onEnd(() => {
//       if (scale.value > 1) {
//         savedTranslateX.value = translateX.value;
//         savedTranslateY.value = translateY.value;
//       }
//     });

//   // Double tap to reset zoom
//   const doubleTapGesture = Gesture.Tap()
//     .numberOfTaps(2)
//     .onEnd(() => {
//       scale.value = withSpring(1);
//       savedScale.value = 1;
//       translateX.value = withSpring(0);
//       translateY.value = withSpring(0);
//       savedTranslateX.value = 0;
//       savedTranslateY.value = 0;
//     });

//   // Combine gestures
//   const composedGestures = Gesture.Simultaneous(
//     Gesture.Race(doubleTapGesture, panGesture),
//     pinchGesture
//   );

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         { scale: scale.value },
//         { translateX: translateX.value },
//         { translateY: translateY.value },
//       ],
//     };
//   });
//   /* ------------------------------------------- */

//   useEffect(() => {
//     const loadSubject = async () => {
//       const subject = await localStorage.getItem(storageKeys.selectedSubject);
//       setSubName(subject || '');
//     };
//     loadSubject();
//   }, []);

//   const [selectedMap, setSelectedMap] = useState<Record<string, boolean>>({});
//   const [questionNumber, setQuestionNumber] = useState<Record<string, boolean>>(
//     {}
//   );

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaView style={styles.container} edges={['bottom']}>
//         <GestureDetector gesture={composedGestures}>
//           <Animated.View style={[styles.paper, animatedStyle]}>
//             <StatusBar backgroundColor={Colors.primaryColor} />

//             {/* HEADER */}
//             <SafeAreaView
//               edges={['top']}
//               style={{ backgroundColor: Colors.lightThemeBlue }}
//             >
//               <HeaderPaperModule
//                 title="Preview"
//                 leftIconPress={() => navigation.goBack()}
//                 rightPress2={() => navigation.navigate('MyPdfScreen')}
//               />
//             </SafeAreaView>

//             <Animated.ScrollView
//               showsVerticalScrollIndicator={false}
//               contentContainerStyle={styles.scrollContent}
//               scrollEnabled={scale.value === 1}
//             >
//               {/* All paper content */}
//               <View style={{ 
//                 borderWidth: previewData?.borderType === '1' ? 1 : 0, 
//                 borderColor: '#000', 
//                 flex: 1, 
//                 marginHorizontal: moderateScale(14)
//               }}>
//                 <View style={styles.paperHeader}>
//                   {previewData?.logoUri && (
//                     <View style={{ width: moderateScale(300), height: moderateScale(85) }}>
//                       <Image
//                         source={{ uri: previewData.logoUri }}
//                         style={styles.logo}
//                         resizeMode="cover"
//                       />
//                     </View>
//                   )}

//                   <Text style={styles.institute}>
//                     {previewData?.instituteName}
//                   </Text>

//                   <Text style={styles.test}>
//                     {previewData?.testName}
//                   </Text>

//                   <View style={styles.metaRow}>
//                     <Text style={styles.metaText}>
//                       Subject : {subName}
//                     </Text>
//                     <Text style={styles.metaText}>
//                       Date : {previewData?.date}
//                     </Text>
//                   </View>

//                   <View style={[styles.metaRow, { marginBottom: moderateScale(5) }]}>
//                     <Text style={styles.metaText}>
//                       Total Marks : {previewData?.dropDownValue}
//                     </Text>
//                     <Text style={styles.metaText}>
//                       Time : 3 Hours
//                     </Text>
//                   </View>
//                   <View style={styles.lineBox} />
//                   <View style={{ borderWidth: 1, backgroundColor: Colors.white, marginVertical: moderateScale(4), paddingHorizontal: moderateScale(10) }}>
//                     <Text style={styles.subText}>{subName} - Section {previewData?.questionType} (MCQ)</Text>
//                   </View>
//                   <View style={[styles.lineBox, { marginBottom: moderateScale(5) }]} />
//                 </View>

//                 {/* QUESTIONS */}
//                 <PDFPreviewListComponent
//                   selectCheck="Options"
//                   selectedMap={selectedMap}
//                   setSelectedMap={setSelectedMap}
//                   questionNumber={questionNumber}
//                   setQuestionNumber={setQuestionNumber}
//                   questionsData={questions}
//                   currentPage={1}
//                   limit={questions?.length}
//                   hideContant={true}
//                   questionType={previewData?.questionType}
//                 />
                
//                 {/* FOOTER */}
//                 <Text style={styles.footer}>
//                   {previewData?.wishText || 'Wish you all the best!'}
//                 </Text>
//               </View>
//             </Animated.ScrollView>
//           </Animated.View>
//         </GestureDetector>

//         {/* Watermark overlay (fixed to screen, not scrollable) */}
//         {previewData?.waterMarkType === '1' &&
//           previewData?.waterMarkLogo && (
//             <Image
//               source={{ uri: previewData.waterMarkLogo }}
//               style={[
//                 styles.watermarkOverlay,
//                 previewData?.waterMarkPosition === '2'
//                   ? styles.watermarkBack
//                   : styles.watermarkCenter,
//               ]}
//               resizeMode="contain"
//               pointerEvents="none"
//             />
//           )}

//         {previewData?.waterMarkType === '2' &&
//           previewData?.waterMarkText && (
//             <Text style={styles.watermarkOverlayText} pointerEvents="none">
//               {previewData?.waterMarkText}
//             </Text>
//           )}
//       </SafeAreaView>
//     </GestureHandlerRootView>
//   );
// };

// export default PDFPreviewScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.lightThemeBlue,
//   },
//   watermarkOverlay: {
//     position: 'absolute',
//     width: moderateScale(220),
//     height: moderateScale(220),
//     opacity: 0.2,
//     pointerEvents: 'none',
//   },
//   watermarkOverlayText: {
//     position: 'absolute',
//     top: '50%',
//     alignSelf: 'center',
//     fontSize: moderateScale(50),
//     fontFamily: Fonts.InterBold,
//     color: Colors.black,
//     opacity: 0.08,
//     transform: [{ rotate: '-30deg' }],
//     pointerEvents: 'none',
//   },
//   scrollContent: {
//     padding: moderateScale(16),
//   },
//   paper: {
//     backgroundColor: 'rgba(0,0,0,.1)',
//     borderRadius: moderateScale(6),
//     paddingBottom: moderateScale(20),
//     position: 'relative',
//     minHeight: 800,
//   },
//   paperHeader: {
//     alignItems: 'center',
//     backgroundColor: Colors.white,
//   },
//   logo: {
//     marginBottom: moderateScale(8),
//     width: '100%',
//     height: '100%',
//   },
//   institute: {
//     fontSize: moderateScale(16),
//     fontWeight: '700',
//     color: Colors.black,
//   },
//   test: {
//     fontSize: moderateScale(10),
//     marginTop: moderateScale(2),
//     color: Colors.black,
//     fontFamily: Fonts.InterRegular,
//   },
//   metaRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     paddingHorizontal: moderateScale(8),
//   },
//   metaText: {
//     fontSize: moderateScale(10),
//     color: Colors.black,
//     fontFamily: Fonts.InterRegular,
//   },
//   lineBox: {
//     height: 1.5,
//     backgroundColor: '#000',
//     width: '100%',
//   },
//   subText: {
//     fontSize: moderateScale(14),
//     color: '#000',
//     fontFamily: Fonts.InterBold,
//     alignSelf: 'center',
//     textAlign: 'center',
//     borderBottomWidth: 1.5,
//     marginBottom: moderateScale(4),
//   },
//   footer: {
//     textAlign: 'center',
//     marginTop: moderateScale(20),
//     fontSize: moderateScale(12),
//     color: Colors.black,
//   },
//   watermarkLogo: {
//     position: 'absolute',
//     width: moderateScale(220),
//     height: moderateScale(220),
//     opacity: 0.2,
//   },
//   watermarkCenter: {
//     top: '50%',
//     left: '50%',
//     transform: [{ translateX: -110 }, { translateY: -110 }],
//   },
//   watermarkBack: {
//     bottom: '10%',
//     right: '10%',
//   },
//   watermarkText: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: [
//       { translateX: -50 },
//       { translateY: -25 },
//       { rotate: '-30deg' },
//     ],
//     fontSize: moderateScale(40),
//     fontWeight: '700',
//     color: Colors.black,
//     opacity: 0.08,
//     width: '100%',
//     textAlign: 'center',
//   },
// });

// ???? zoom properly
// import React, { useEffect, useState } from 'react';
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

// import HeaderPaperModule from '../../../component/headerpapermodule/Headerpapermodule';
// import { Colors, Fonts } from '../../../theme';
// import { moderateScale } from '../../../utils/responsiveSize';
// import { localStorage, storageKeys } from '../../../storage/storage';
// import PDFPreviewListComponent from './component/PDFPreviewListComponent';

// const PDFPreviewScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute<any>();
//   const { previewData } = route.params || {};
//   console.log('ffffffff', previewData);

//   const [subName, setSubName] = useState('');

//   const questions = useSelector((state: any) => state.pdfQuestions?.allQuestions);
//   const questionsee = useSelector((state: any) => state.pdfQuestions);

//   console.log('qqqwwwwwwwwwwchapterData', questionsee);

//   /* ---------------- PINCH ZOOM & PAN LOGIC ---------------- */
//   const scale = useSharedValue(1);
//   const savedScale = useSharedValue(1);
//   const translateX = useSharedValue(0);
//   const translateY = useSharedValue(0);
//   const savedTranslateX = useSharedValue(0);
//   const savedTranslateY = useSharedValue(0);

//   // Pinch gesture for zooming
//   const pinchGesture = Gesture.Pinch()
//     .onUpdate((e) => {
//       scale.value = Math.min(Math.max(savedScale.value * e.scale, 1), 3);
//     })
//     .onEnd(() => {
//       savedScale.value = scale.value;
      
//       // Reset position when zoomed out to 1x
//       if (scale.value === 1) {
//         translateX.value = withSpring(0);
//         translateY.value = withSpring(0);
//         savedTranslateX.value = 0;
//         savedTranslateY.value = 0;
//       }
//     });

//   // Pan gesture for moving the content when zoomed
//   const panGesture = Gesture.Pan()
//     .onUpdate((e) => {
//       if (scale.value > 1) {
//         translateX.value = savedTranslateX.value + e.translationX;
//         translateY.value = savedTranslateY.value + e.translationY;
//       }
//     })
//     .onEnd(() => {
//       if (scale.value > 1) {
//         savedTranslateX.value = translateX.value;
//         savedTranslateY.value = translateY.value;
//       }
//     });

//   // Double tap to reset zoom
//   const doubleTapGesture = Gesture.Tap()
//     .numberOfTaps(2)
//     .onEnd(() => {
//       scale.value = withSpring(1);
//       savedScale.value = 1;
//       translateX.value = withSpring(0);
//       translateY.value = withSpring(0);
//       savedTranslateX.value = 0;
//       savedTranslateY.value = 0;
//     });

//   // Combine gestures
//   const composedGestures = Gesture.Simultaneous(
//     Gesture.Race(doubleTapGesture, panGesture),
//     pinchGesture
//   );

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         { scale: scale.value },
//         { translateX: translateX.value },
//         { translateY: translateY.value },
//       ],
//     };
//   });
//   /* ------------------------------------------- */

//   useEffect(() => {
//     const loadSubject = async () => {
//       const subject = await localStorage.getItem(storageKeys.selectedSubject);
//       setSubName(subject || '');
//     };
//     loadSubject();
//   }, []);

//   const [selectedMap, setSelectedMap] = useState<Record<string, boolean>>({});
//   const [questionNumber, setQuestionNumber] = useState<Record<string, boolean>>(
//     {}
//   );

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaView style={styles.container} edges={['bottom']}>
//         <StatusBar backgroundColor={Colors.primaryColor} />

//         {/* HEADER - Outside gesture detector */}
//         <SafeAreaView
//           edges={['top']}
//           style={{ backgroundColor: Colors.lightThemeBlue }}
//         >
//           <HeaderPaperModule
//             title="Preview"
//             leftIconPress={() => navigation.goBack()}
//             rightPress2={() => navigation.navigate('MyPdfScreen')}
//           />
//         </SafeAreaView>

//         {/* Regular ScrollView - No gesture detector wrapper */}
//         <Animated.ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//           scrollEventThrottle={16}
//           bounces={true}
//           decelerationRate="normal"
//         >
//           {/* Gesture detector only around the paper content, not the ScrollView */}
//           <GestureDetector gesture={composedGestures}>
//             <Animated.View style={[styles.paper, animatedStyle]}>
//               {/* All paper content */}
//               <View style={{ 
//                 borderWidth: previewData?.borderType === '1' ? 1 : 0, 
//                 borderColor: '#000', 
//                 flex: 1, 
//                 marginHorizontal: moderateScale(14),
//                 backgroundColor: Colors.white,
//               }}>
//                 <View style={styles.paperHeader}>
//                   {previewData?.logoUri && (
//                     <View style={{ width: moderateScale(300), height: moderateScale(85) }}>
//                       <Image
//                         source={{ uri: previewData.logoUri }}
//                         style={styles.logo}
//                         resizeMode="cover"
//                       />
//                     </View>
//                   )}

//                   <Text style={styles.institute}>
//                     {previewData?.instituteName}
//                   </Text>

//                   <Text style={styles.test}>
//                     {previewData?.testName}
//                   </Text>

//                   <View style={styles.metaRow}>
//                     <Text style={styles.metaText}>
//                       Subject : {subName}
//                     </Text>
//                     <Text style={styles.metaText}>
//                       Date : {previewData?.date}
//                     </Text>
//                   </View>

//                   <View style={[styles.metaRow, { marginBottom: moderateScale(5) }]}>
//                     <Text style={styles.metaText}>
//                       Total Marks : {previewData?.dropDownValue}
//                     </Text>
//                     <Text style={styles.metaText}>
//                       Time : 3 Hours
//                     </Text>
//                   </View>
//                   <View style={styles.lineBox} />
//                   <View style={{ borderWidth: 1, backgroundColor: Colors.white, marginVertical: moderateScale(4), paddingHorizontal: moderateScale(10) }}>
//                     <Text style={styles.subText}>{subName} - Section {previewData?.questionType} (MCQ)</Text>
//                   </View>
//                   <View style={[styles.lineBox, { marginBottom: moderateScale(5) }]} />
//                 </View>

//                 {/* QUESTIONS */}
//                 <PDFPreviewListComponent
//                   selectCheck="Options"
//                   selectedMap={selectedMap}
//                   setSelectedMap={setSelectedMap}
//                   questionNumber={questionNumber}
//                   setQuestionNumber={setQuestionNumber}
//                   questionsData={questions}
//                   currentPage={1}
//                   limit={questions?.length}
//                   hideContant={true}
//                   questionType={previewData?.questionType}
//                 />
                
//                 {/* FOOTER */}
//                 <Text style={styles.footer}>
//                   {previewData?.wishText || 'Wish you all the best!'}
//                 </Text>
//               </View>
//             </Animated.View>
//           </GestureDetector>
//         </Animated.ScrollView>

//         {/* Watermark overlay (fixed to screen, not scrollable) */}
//         {previewData?.waterMarkType === '1' &&
//           previewData?.waterMarkLogo && (
//             <Image
//               source={{ uri: previewData.waterMarkLogo }}
//               style={[
//                 styles.watermarkOverlay,
//                 previewData?.waterMarkPosition === '2'
//                   ? styles.watermarkBack
//                   : styles.watermarkCenter,
//               ]}
//               resizeMode="contain"
//               pointerEvents="none"
//             />
//           )}

//         {previewData?.waterMarkType === '2' &&
//           previewData?.waterMarkText && (
//             <Text style={styles.watermarkOverlayText} pointerEvents="none">
//               {previewData?.waterMarkText}
//             </Text>
//           )}
//       </SafeAreaView>
//     </GestureHandlerRootView>
//   );
// };

// export default PDFPreviewScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.lightThemeBlue,
//   },
//   watermarkOverlay: {
//     position: 'absolute',
//     width: moderateScale(220),
//     height: moderateScale(220),
//     opacity: 0.2,
//     pointerEvents: 'none',
//   },
//   watermarkOverlayText: {
//     position: 'absolute',
//     top: '50%',
//     alignSelf: 'center',
//     fontSize: moderateScale(50),
//     fontFamily: Fonts.InterBold,
//     color: Colors.black,
//     opacity: 0.08,
//     transform: [{ rotate: '-30deg' }],
//     pointerEvents: 'none',
//   },
//   scrollContent: {
//     padding: moderateScale(16),
//     paddingTop: moderateScale(8),
//   },
//   paper: {
//     backgroundColor: Colors.white,
//     borderRadius: moderateScale(6),
//     paddingBottom: moderateScale(20),
//     position: 'relative',
//     minHeight: 800,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   paperHeader: {
//     alignItems: 'center',
//     backgroundColor: Colors.white,
//   },
//   logo: {
//     marginBottom: moderateScale(8),
//     width: '100%',
//     height: '100%',
//   },
//   institute: {
//     fontSize: moderateScale(16),
//     fontWeight: '700',
//     color: Colors.black,
//   },
//   test: {
//     fontSize: moderateScale(10),
//     marginTop: moderateScale(2),
//     color: Colors.black,
//     fontFamily: Fonts.InterRegular,
//   },
//   metaRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     paddingHorizontal: moderateScale(8),
//   },
//   metaText: {
//     fontSize: moderateScale(10),
//     color: Colors.black,
//     fontFamily: Fonts.InterRegular,
//   },
//   lineBox: {
//     height: 1.5,
//     backgroundColor: '#000',
//     width: '100%',
//   },
//   subText: {
//     fontSize: moderateScale(14),
//     color: '#000',
//     fontFamily: Fonts.InterBold,
//     alignSelf: 'center',
//     textAlign: 'center',
//     borderBottomWidth: 1.5,
//     marginBottom: moderateScale(4),
//   },
//   footer: {
//     textAlign: 'center',
//     marginTop: moderateScale(20),
//     marginBottom: moderateScale(20),
//     fontSize: moderateScale(12),
//     color: Colors.black,
//   },
//   watermarkLogo: {
//     position: 'absolute',
//     width: moderateScale(220),
//     height: moderateScale(220),
//     opacity: 0.2,
//   },
//   watermarkCenter: {
//     top: '50%',
//     left: '50%',
//     transform: [{ translateX: -110 }, { translateY: -110 }],
//   },
//   watermarkBack: {
//     bottom: '10%',
//     right: '10%',
//   },
//   watermarkText: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: [
//       { translateX: -50 },
//       { translateY: -25 },
//       { rotate: '-30deg' },
//     ],
//     fontSize: moderateScale(40),
//     fontWeight: '700',
//     color: Colors.black,
//     opacity: 0.08,
//     width: '100%',
//     textAlign: 'center',
//   },
// });


// vertical scroll
// import React, { useEffect, useState } from 'react';
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
//   useDerivedValue,
// } from 'react-native-reanimated';

// import HeaderPaperModule from '../../../component/headerpapermodule/Headerpapermodule';
// import { Colors, Fonts } from '../../../theme';
// import { moderateScale } from '../../../utils/responsiveSize';
// import { localStorage, storageKeys } from '../../../storage/storage';
// import PDFPreviewListComponent from './component/PDFPreviewListComponent';

// const PDFPreviewScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute<any>();
//   const { previewData } = route.params || {};

//   const [subName, setSubName] = useState('');
//   const questions = useSelector((state: any) => state.pdfQuestions?.allQuestions);

//   /* ---------------- PINCH ZOOM & PAN LOGIC ---------------- */
//   const scale = useSharedValue(1);
//   const savedScale = useSharedValue(1);
//   const translateX = useSharedValue(0);
//   const translateY = useSharedValue(0);
//   const savedTranslateX = useSharedValue(0);
//   const savedTranslateY = useSharedValue(0);

//   // This fixes the smooth vertical scroll by disabling the Pan when not needed
//   const isZoomedIn = useDerivedValue(() => {
//     return scale.value > 1;
//   });

//   const pinchGesture = Gesture.Pinch()
//     .onUpdate((e) => {
//       scale.value = Math.min(Math.max(savedScale.value * e.scale, 1), 3);
//     })
//     .onEnd(() => {
//       savedScale.value = scale.value;
//       if (scale.value <= 1.05) {
//         scale.value = withSpring(1);
//         translateX.value = withSpring(0);
//         translateY.value = withSpring(0);
//         savedScale.value = 1;
//         savedTranslateX.value = 0;
//         savedTranslateY.value = 0;
//       }
//     });

//   const panGesture = Gesture.Pan()
//     .enabled(isZoomedIn.value) // FIXED: Enable scroll by disabling pan at 1x scale
//     .onUpdate((e) => {
//       translateX.value = savedTranslateX.value + e.translationX;
//       translateY.value = savedTranslateY.value + e.translationY;
//     })
//     .onEnd(() => {
//       savedTranslateX.value = translateX.value;
//       savedTranslateY.value = translateY.value;
//     });

//   const doubleTapGesture = Gesture.Tap()
//     .numberOfTaps(2)
//     .onEnd(() => {
//       if (scale.value > 1) {
//         scale.value = withSpring(1);
//         translateX.value = withSpring(0);
//         translateY.value = withSpring(0);
//         savedScale.value = 1;
//         savedTranslateX.value = 0;
//         savedTranslateY.value = 0;
//       } else {
//         scale.value = withSpring(2);
//         savedScale.value = 2;
//       }
//     });

//   const composedGestures = Gesture.Simultaneous(
//     pinchGesture,
//     Gesture.Race(doubleTapGesture, panGesture)
//   );

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         { scale: scale.value }, // Scale first (Matches your 2nd code)
//         { translateX: translateX.value },
//         { translateY: translateY.value },
//       ],
//     };
//   });

//   useEffect(() => {
//     const loadSubject = async () => {
//       const subject = await localStorage.getItem(storageKeys.selectedSubject);
//       setSubName(subject || '');
//     };
//     loadSubject();
//   }, []);

//   const [selectedMap, setSelectedMap] = useState<Record<string, boolean>>({});
//   const [questionNumber, setQuestionNumber] = useState<Record<string, boolean>>({});

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaView style={styles.container} edges={['bottom']}>
//         <StatusBar backgroundColor={Colors.primaryColor} />

//         <SafeAreaView edges={['top']} style={{ backgroundColor: Colors.lightThemeBlue }}>
//           <HeaderPaperModule
//             title="Preview"
//             leftIconPress={() => navigation.goBack()}
//             rightPress2={() => navigation.navigate('MyPdfScreen')}
//           />
//         </SafeAreaView>

//         <Animated.ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//           bounces={true}
//           overScrollMode="never"
//         >
//           <GestureDetector gesture={composedGestures}>
//             <Animated.View style={[styles.paper, animatedStyle]}>
//               <View style={styles.innerPaperContent}>
//                 <View style={styles.paperHeader}>
//                   {previewData?.logoUri && (
//                     <View style={styles.logoContainer}>
//                       <Image
//                         source={{ uri: previewData.logoUri }}
//                         style={styles.logo}
//                         resizeMode="cover"
//                       />
//                     </View>
//                   )}

//                   <Text style={styles.institute}>{previewData?.instituteName}</Text>
//                   <Text style={styles.test}>{previewData?.testName}</Text>

//                   <View style={styles.metaRow}>
//                     <Text style={styles.metaText}>Subject : {subName}</Text>
//                     <Text style={styles.metaText}>Date : {previewData?.date}</Text>
//                   </View>

//                   <View style={[styles.metaRow, { marginBottom: moderateScale(5) }]}>
//                     <Text style={styles.metaText}>Total Marks : {previewData?.dropDownValue}</Text>
//                     <Text style={styles.metaText}>Time : 3 Hours</Text>
//                   </View>
                  
//                   <View style={styles.lineBox} />
//                   <View style={styles.sectionHeader}>
//                     <Text style={styles.subText}>{subName} - Section {previewData?.questionType} (MCQ)</Text>
//                   </View>
//                   <View style={[styles.lineBox, { marginBottom: moderateScale(5) }]} />
//                 </View>

//                 <PDFPreviewListComponent
//                   selectCheck="Options"
//                   selectedMap={selectedMap}
//                   setSelectedMap={setSelectedMap}
//                   questionNumber={questionNumber}
//                   setQuestionNumber={setQuestionNumber}
//                   questionsData={questions}
//                   currentPage={1}
//                   limit={questions?.length}
//                   hideContant={true}
//                   questionType={previewData?.questionType}
//                 />
                
//                 <Text style={styles.footer}>
//                   {previewData?.wishText || 'Wish you all the best!'}
//                 </Text>
//               </View>
//             </Animated.View>
//           </GestureDetector>
//         </Animated.ScrollView>

//         {previewData?.waterMarkType === '1' && previewData?.waterMarkLogo && (
//           <Image
//             source={{ uri: previewData.waterMarkLogo }}
//             style={[
//               styles.watermarkOverlay,
//               previewData?.waterMarkPosition === '2' ? styles.watermarkBack : styles.watermarkCenter,
//             ]}
//             resizeMode="contain"
//             pointerEvents="none"
//           />
//         )}

//         {previewData?.waterMarkType === '2' && previewData?.waterMarkText && (
//           <Text style={styles.watermarkOverlayText} pointerEvents="none">
//             {previewData?.waterMarkText}
//           </Text>
//         )}
//       </SafeAreaView>
//     </GestureHandlerRootView>
//   );
// };

// export default PDFPreviewScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: Colors.lightThemeBlue },
//   innerPaperContent: { 
//     borderWidth: 1, 
//     borderColor: '#000', 
//     flex: 1, 
//     marginHorizontal: moderateScale(14),
//     backgroundColor: Colors.white,
//   },
//   watermarkOverlay: { position: 'absolute', width: moderateScale(220), height: moderateScale(220), opacity: 0.2, pointerEvents: 'none' },
//   watermarkOverlayText: { position: 'absolute', top: '50%', alignSelf: 'center', fontSize: moderateScale(50), fontFamily: Fonts.InterBold, color: Colors.black, opacity: 0.08, transform: [{ rotate: '-30deg' }], pointerEvents: 'none' },
//   scrollContent: { padding: moderateScale(16), paddingTop: moderateScale(8) },
//   paper: { backgroundColor: Colors.white, borderRadius: moderateScale(6), paddingBottom: moderateScale(20), position: 'relative', minHeight: 800, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 2 },
//   paperHeader: { alignItems: 'center', backgroundColor: Colors.white },
//   logoContainer: { width: moderateScale(300), height: moderateScale(85) },
//   logo: { marginBottom: moderateScale(8), width: '100%', height: '100%' },
//   institute: { fontSize: moderateScale(16), fontWeight: '700', color: Colors.black },
//   test: { fontSize: moderateScale(10), marginTop: moderateScale(2), color: Colors.black, fontFamily: Fonts.InterRegular },
//   metaRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: moderateScale(8) },
//   metaText: { fontSize: moderateScale(10), color: Colors.black, fontFamily: Fonts.InterRegular },
//   lineBox: { height: 1.5, backgroundColor: '#000', width: '100%' },
//   sectionHeader: { borderWidth: 1, backgroundColor: Colors.white, marginVertical: moderateScale(4), paddingHorizontal: moderateScale(10) },
//   subText: { fontSize: moderateScale(14), color: '#000', fontFamily: Fonts.InterBold, alignSelf: 'center', textAlign: 'center', borderBottomWidth: 1.5, marginBottom: moderateScale(4) },
//   footer: { textAlign: 'center', marginTop: moderateScale(20), marginBottom: moderateScale(20), fontSize: moderateScale(12), color: Colors.black },
//   watermarkCenter: { top: '50%', left: '50%', transform: [{ translateX: -110 }, { translateY: -110 }] },
//   watermarkBack: { bottom: '10%', right: '10%' },
// });



// &&&&&&&&&&merge code =/
// import React, { useEffect, useState } from 'react';
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
//   useDerivedValue, // Added for smooth scroll logic
// } from 'react-native-reanimated';

// import HeaderPaperModule from '../../../component/headerpapermodule/Headerpapermodule';
// import { Colors, Fonts } from '../../../theme';
// import { moderateScale } from '../../../utils/responsiveSize';
// import { localStorage, storageKeys } from '../../../storage/storage';
// import PDFPreviewListComponent from './component/PDFPreviewListComponent';

// const PDFPreviewScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute<any>();
//   const { previewData } = route.params || {};

//   const [subName, setSubName] = useState('');
//   const questions = useSelector((state: any) => state.pdfQuestions?.allQuestions);

//   /* ---------------- PINCH ZOOM & PAN LOGIC ---------------- */
//   const scale = useSharedValue(1);
//   const savedScale = useSharedValue(1);
//   const translateX = useSharedValue(0);
//   const translateY = useSharedValue(0);
//   const savedTranslateX = useSharedValue(0);
//   const savedTranslateY = useSharedValue(0);

//   // KEY ADDITION: Check if we are zoomed in to toggle gesture priority
//   const isZoomedIn = useDerivedValue(() => {
//     return scale.value > 1;
//   });

//   const pinchGesture = Gesture.Pinch()
//     .onUpdate((e) => {
//       scale.value = Math.min(Math.max(savedScale.value * e.scale, 1), 3);
//     })
//     .onEnd(() => {
//       savedScale.value = scale.value;
//       if (scale.value <= 1.05) { // Reset if user pinches back to normal size
//         scale.value = withSpring(1);
//         translateX.value = withSpring(0);
//         translateY.value = withSpring(0);
//         savedScale.value = 1;
//         savedTranslateX.value = 0;
//         savedTranslateY.value = 0;
//       }
//     });

//   const panGesture = Gesture.Pan()
//     .enabled(isZoomedIn.value) // KEY ADDITION: Disables pan so ScrollView can work at 1x
//     .onUpdate((e) => {
//       translateX.value = savedTranslateX.value + e.translationX;
//       translateY.value = savedTranslateY.value + e.translationY;
//     })
//     .onEnd(() => {
//       savedTranslateX.value = translateX.value;
//       savedTranslateY.value = translateY.value;
//     });

//   const doubleTapGesture = Gesture.Tap()
//     .numberOfTaps(2)
//     .onEnd(() => {
//       if (scale.value > 1) {
//         scale.value = withSpring(1);
//         translateX.value = withSpring(0);
//         translateY.value = withSpring(0);
//         savedScale.value = 1;
//         savedTranslateX.value = 0;
//         savedTranslateY.value = 0;
//       } else {
//         scale.value = withSpring(2);
//         savedScale.value = 2;
//       }
//     });

//   const composedGestures = Gesture.Simultaneous(
//     pinchGesture,
//     Gesture.Race(doubleTapGesture, panGesture)
//   );

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         { scale: scale.value },       // 1. Scale first (Matches your Zoom preference)
//         { translateX: translateX.value }, // 2. Then Translate
//         { translateY: translateY.value },
//       ],
//     };
//   });

//   /* ------------------------------------------- */

//   useEffect(() => {
//     const loadSubject = async () => {
//       const subject = await localStorage.getItem(storageKeys.selectedSubject);
//       setSubName(subject || '');
//     };
//     loadSubject();
//   }, []);

//   const [selectedMap, setSelectedMap] = useState<Record<string, boolean>>({});
//   const [questionNumber, setQuestionNumber] = useState<Record<string, boolean>>({});

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaView style={styles.container} edges={['bottom']}>
//         <StatusBar backgroundColor={Colors.primaryColor} />

//         <SafeAreaView edges={['top']} style={{ backgroundColor: Colors.lightThemeBlue }}>
//           <HeaderPaperModule
//             title="Preview"
//             leftIconPress={() => navigation.goBack()}
//             rightPress2={() => navigation.navigate('MyPdfScreen')}
//           />
//         </SafeAreaView>

//         <Animated.ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//           bounces={true}
//           overScrollMode="never" // Better for Android scroll performance
//           scrollEventThrottle={16}
//         >
//           <GestureDetector gesture={composedGestures}>
//             <Animated.View style={[styles.paper, animatedStyle]}>
//               <View style={{ 
//                 borderWidth: previewData?.borderType === '1' ? 1 : 0, 
//                 borderColor: '#000', 
//                 flex: 1, 
//                 marginHorizontal: moderateScale(14),
//                 backgroundColor: Colors.white,
//               }}>
//                 <View style={styles.paperHeader}>
//                   {previewData?.logoUri && (
//                     <View style={styles.logoContainer}>
//                       <Image
//                         source={{ uri: previewData.logoUri }}
//                         style={styles.logo}
//                         resizeMode="cover"
//                       />
//                     </View>
//                   )}

//                   <Text style={styles.institute}>{previewData?.instituteName}</Text>
//                   <Text style={styles.test}>{previewData?.testName}</Text>

//                   <View style={styles.metaRow}>
//                     <Text style={styles.metaText}>Subject : {subName}</Text>
//                     <Text style={styles.metaText}>Date : {previewData?.date}</Text>
//                   </View>

//                   <View style={[styles.metaRow, { marginBottom: moderateScale(5) }]}>
//                     <Text style={styles.metaText}>Total Marks : {previewData?.dropDownValue}</Text>
//                     <Text style={styles.metaText}>Time : 3 Hours</Text>
//                   </View>
                  
//                   <View style={styles.lineBox} />
//                   <View style={styles.sectionHeader}>
//                     <Text style={styles.subText}>{subName} - Section {previewData?.questionType} (MCQ)</Text>
//                   </View>
//                   <View style={[styles.lineBox, { marginBottom: moderateScale(5) }]} />
//                 </View>

//                 <PDFPreviewListComponent
//                   selectCheck="Options"
//                   selectedMap={selectedMap}
//                   setSelectedMap={setSelectedMap}
//                   questionNumber={questionNumber}
//                   setQuestionNumber={setQuestionNumber}
//                   questionsData={questions}
//                   currentPage={1}
//                   limit={questions?.length}
//                   hideContant={true}
//                   questionType={previewData?.questionType}
//                 />
                
//                 <Text style={styles.footer}>
//                   {previewData?.wishText || 'Wish you all the best!'}
//                 </Text>
//               </View>
//             </Animated.View>
//           </GestureDetector>
//         </Animated.ScrollView>

//         {/* Watermark layers remain fixed to the screen */}
//         {previewData?.waterMarkType === '1' && previewData?.waterMarkLogo && (
//           <Image
//             source={{ uri: previewData.waterMarkLogo }}
//             style={[
//               styles.watermarkOverlay,
//               previewData?.waterMarkPosition === '2' ? styles.watermarkBack : styles.watermarkCenter,
//             ]}
//             resizeMode="contain"
//             pointerEvents="none"
//           />
//         )}

//         {previewData?.waterMarkType === '2' && previewData?.waterMarkText && (
//           <Text style={styles.watermarkOverlayText} pointerEvents="none">
//             {previewData?.waterMarkText}
//           </Text>
//         )}
//       </SafeAreaView>
//     </GestureHandlerRootView>
//   );
// };

// export default PDFPreviewScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: Colors.lightThemeBlue },
//   watermarkOverlay: { position: 'absolute', width: moderateScale(220), height: moderateScale(220), opacity: 0.2, pointerEvents: 'none' },
//   watermarkOverlayText: { position: 'absolute', top: '50%', alignSelf: 'center', fontSize: moderateScale(50), fontFamily: Fonts.InterBold, color: Colors.black, opacity: 0.08, transform: [{ rotate: '-30deg' }], pointerEvents: 'none' },
//   scrollContent: { padding: moderateScale(16), paddingTop: moderateScale(8) },
//   paper: { backgroundColor: Colors.white, borderRadius: moderateScale(6), paddingBottom: moderateScale(20), position: 'relative', minHeight: 800, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 2 },
//   paperHeader: { alignItems: 'center', backgroundColor: Colors.white },
//   logoContainer: { width: moderateScale(300), height: moderateScale(85) },
//   logo: { marginBottom: moderateScale(8), width: '100%', height: '100%' },
//   institute: { fontSize: moderateScale(16), fontWeight: '700', color: Colors.black },
//   test: { fontSize: moderateScale(10), marginTop: moderateScale(2), color: Colors.black, fontFamily: Fonts.InterRegular },
//   metaRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: moderateScale(8) },
//   metaText: { fontSize: moderateScale(10), color: Colors.black, fontFamily: Fonts.InterRegular },
//   lineBox: { height: 1.5, backgroundColor: '#000', width: '100%' },
//   sectionHeader: { borderWidth: 1, backgroundColor: Colors.white, marginVertical: moderateScale(4), paddingHorizontal: moderateScale(10) },
//   subText: { fontSize: moderateScale(14), color: '#000', fontFamily: Fonts.InterBold, alignSelf: 'center', textAlign: 'center', borderBottomWidth: 1.5, marginBottom: moderateScale(4) },
//   footer: { textAlign: 'center', marginTop: moderateScale(20), marginBottom: moderateScale(20), fontSize: moderateScale(12), color: Colors.black },
//   watermarkCenter: { top: '50%', left: '50%', transform: [{ translateX: -110 }, { translateY: -110 }] },
//   watermarkBack: { bottom: '10%', right: '10%' },
// });