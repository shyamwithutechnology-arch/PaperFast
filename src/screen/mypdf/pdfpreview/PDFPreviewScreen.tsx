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
import QuestionListData from '../../papermodule/questionModule/component/questionlist/QuestionListData';
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
      <GestureDetector gesture={pinchGesture}>

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
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* All paper content */}
            {/* ---------------- PAPER HEADER ---------------- */}
            <View style={{ borderWidth: previewData?.borderType === '1' ? 1 : 0, borderColor: '#000' }}>
              <View style={styles.paperHeader}>
                {previewData?.logoUri && (
                  <View style={{width:moderateScale(332),height:moderateScale(85)}}>
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
              {/* <QuestionListData
                selectCheck="Options"
                selectedMap={selectedMap}
                setSelectedMap={setSelectedMap}
                questionNumber={questionNumber}
                setQuestionNumber={setQuestionNumber}
                questionsData={questions}
                currentPage={1}
                limit={questions.length}
                hideContant={true}
              /> */}

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
        </Animated.View>
      </GestureDetector>

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

/* ---------------- STYLES ---------------- */

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
//     fontSize: moderateScale(10),
//     marginTop: moderateScale(2),
//     color: Colors.black,
//     fontFamily:Fonts.InterRegular
//   },
//   metaRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginTop: moderateScale(6),
//     paddingHorizontal: moderateScale(8),
//   },
//   metaText: {
//     fontSize: moderateScale(10),
//     color: Colors.black,
//     fontFamily:Fonts.InterRegular
//   },
//   lineBox:{
//     height:2,
//     backgroundColor:'#000',
//     width:'100%'
//   },
//   subText:{
//     fontSize:moderateScale(14),
//     color:'#000',
//     fontFamily:Fonts.InterBold,
//     borderWidth:1,
//     width:moderateScale(200),
//     paddingHorizontal:moderateScale(10),
//     alignSelf:"center",
//     marginVertical:moderateScale(4)
//   },
//   footer: {
//     textAlign: 'center',
//     marginTop: moderateScale(20),
//     fontSize: moderateScale(12),
//     color: Colors.black,
//   },

//   /* -------- WATERMARK STYLES -------- */

//   watermarkLogo: {
//     position: 'absolute',
//     width: moderateScale(220),
//     height: moderateScale(220),
//     opacity: 0.2,
//   },
//   watermarkCenter: {
//     top: '35%',
//     left: '20%',
//   },
//   watermarkBack: {
//     bottom: '15%',
//     right: '15%',
//   },
//   watermarkText: {
//     position: 'absolute',
//     top: '40%',
//     alignSelf: 'center',
//     fontSize: moderateScale(40),
//     fontWeight: '700',
//     color: Colors.black,
//     opacity: 0.08,
//     transform: [{ rotate: '-30deg' }],
//   },
// });


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

