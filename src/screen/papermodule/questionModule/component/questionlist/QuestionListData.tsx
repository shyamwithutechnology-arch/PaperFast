
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
  onEndReached: () => void
  onScrollDirection?: (direction: 'up' | 'down') => void;  // ✅ ADD THIS

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
  selectedQuestions,
  onEndReached,
  onScrollDirection,  // ✅ ADD THIS

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

      // const getOptionStatus = (optionLetter: string, correctOption: string): string => {
      //   if (optionLetter === correctOption) {
      //     console.log('Correct option color:', Colors.green); // Debug line
      //     return Colors.green; // correct color
      //   }
      //   console.log('Incorrect option color: red'); // Debug line
      //   return '#444444'; // default background
      // };
      const getOptionTextStyle = (optionLetter: string, correctOption: string): string => {
        const isCorrect = optionLetter === correctOption;
        const color = isCorrect ? Colors.green : '#444444';
        const fontWeight = isCorrect ? '500' : '400';

        // Add font-family here
        return `color: ${color} !important; font-weight: ${fontWeight} !important; font-size : ${moderateScale(13)}px !important; font-family: 'Inter' !important;`;
      };

      const getOptionContainerBg = (optionLetter: string, correctOption: string): string => {
        if (optionLetter === correctOption) {
          return '#dceedc'; // correct color
        }
        return `${Colors.blackGray}`; // default background
      };
      // ${selectCheck === 'Solutions' ? `style="color: ${item?.correct_option === 'A' ? Colors.white : Colors.white}"` : ''}
      // ${selectCheck === 'Solutions' ? `style="color: ${item?.correct_option === 'B' ? Colors.white : Colors.white}"` : ''}
      //  ${selectCheck === 'Solutions' ? `style="color: ${item?.correct_option === 'C' ? Colors.white : Colors.white}"` : ''} 
      // ${selectCheck === 'Solutions' ? `style="color: ${item?.correct_option === 'D' ? Colors.white : Colors.white}"` : ''}
      // Inside your .map() function

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
            <div class="option-inner"  ${selectCheck === 'Solutions' ? `style="background-color:${getOptionContainerBg('A', item.correct_option)}"` : ''}>
     <div class="option-text-container"  >
     <strong class="option-number-test">A</strong>            </div> 
<span class="qs-option-test" style="${selectCheck === 'Solutions' ?
          getOptionTextStyle('A', item.correct_option)
          : `color: #444444 !important; font-size : ${moderateScale(13)}px !important; font-family: 'Inter' !important;`}"> 
 ${cleanLatex(item.option_a)}
</span>
            </div>
            <div class="option-inner"  ${selectCheck === 'Solutions' ? `style="background-color:${getOptionContainerBg('B', item.correct_option)}"` : ''}>
          <div class="option-text-container" >
            <strong class="option-number-test" >B</strong></div> 
<span class="qs-option-test" style="${selectCheck === 'Solutions' ? getOptionTextStyle('B', item.correct_option) : `color: #444444 !important; font-size : ${moderateScale(13)}px !important; font-family: 'Inter' !important;`}"> 
  ${cleanLatex(item.option_b)}
</span>
            </div>
            <div class="option-inner"  ${selectCheck === 'Solutions' ? `style="background-color:${getOptionContainerBg('C', item.correct_option)}"` : ''}>
            <div class="option-text-container">
            <strong class="option-number-test" >C</strong></div> 
<span class="qs-option-test" style="${selectCheck === 'Solutions'
          ? getOptionTextStyle('C', item.correct_option)
          : `color: #444444 !important; font-size : ${moderateScale(13)}px !important; font-family: 'Inter' !important;`}"> 
  ${cleanLatex(item.option_c)}
</span>
</div>
            <div class="option-inner"  ${selectCheck === 'Solutions' ? `style="background-color:${getOptionContainerBg('D', item.correct_option)}"` : ''}>
              <div class="option-text-container" >
            <strong class="option-number-test" >D</strong></div> 
<span class="qs-option-test" style="${selectCheck === 'Solutions' ? getOptionTextStyle('D', item.correct_option) : `color: #444444 !important; font-size : ${moderateScale(13)}px !important; font-family: 'Inter' !important;`}">  
  ${cleanLatex(item.option_d)}
</span>
            </div>
           
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
      </div> `;
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
        isLoading={isLoading}
        onEndReached={onEndReached}
        onScrollDirection={onScrollDirection}
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

// import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   ActivityIndicator,
//   Image,
//   Text,
//   TouchableOpacity,
// } from 'react-native';
// import { moderateScale } from '../../../../../utils/responsiveSize';
// import { Colors, Fonts } from '../../../../../theme';
// import MathRenderer from './MathRenderer';
// import { Icons } from '../../../../../assets/icons';
// import UploadErrorModal from '../UploadErrorModal';
// import WebView from 'react-native-webview';

// interface Props {
//   questionsData: any[];
//   currentPage: number;
//   limit: number;
//   isLoading: boolean;
//   onEndReached?: () => void;
// }

// const QuestionListData = ({
//   questionsData,
//   currentPage,
//   limit,
//   isLoading,
//   onEndReached,
// }: Props) => {

//   const webViewRef = useRef<any>(null);

//   const combinedHTML = useMemo(() => {
//     const questionsHTML = questionsData
//       ?.map((item, index) => {
//         const questionNumber = (currentPage - 1) * limit + index + 1;

//         return `
//           <div class="question">
//             <div class="q-number">Q${questionNumber}.</div>
//             <div class="q-text">${item?.question ?? ""}</div>
//           </div>
//         `;
//       })
//       .join("");

//     return `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <link rel="stylesheet"
//             href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
//           <script defer
//             src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js">
//           </script>
//           <script defer
//             src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
//             onload="renderMathInElement(document.body);">
//           </script>

//           <style>
//             body {
//               font-family: Arial;
//               padding: 10px;
//               font-size: 16px;
//             }

//             .question {
//               margin-bottom: 25px;
//               border-bottom: 1px solid #ddd;
//               padding-bottom: 10px;
//             }

//             .q-number {
//               font-weight: bold;
//               margin-bottom: 5px;
//             }
//           </style>
//         </head>

//         <body>
//           ${questionsHTML}

//           <script>
// window.onscroll = function() {
//   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
//     window.ReactNativeWebView.postMessage("END_REACHED");
//   }
// };
//           </script>
//         </body>
//       </html>s
//     `;
//   }, [questionsData, currentPage, limit]);

//   const handleMessage = (event: any) => {
//     if (event.nativeEvent.data === "END_REACHED") {
//       if (onEndReached && !isLoading) {
//         onEndReached();
//       }
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <WebView
//         ref={webViewRef}
//         originWhitelist={["*"]}
//         source={{ html: combinedHTML }}
//         javaScriptEnabled
//         domStorageEnabled
//         onMessage={handleMessage}
//         showsVerticalScrollIndicator={false}
//       />

//       {isLoading && (
//         <ActivityIndicator
//           size="large"
//           style={{ position: "absolute", bottom: 20, alignSelf: "center" }}
//         />
//       )}
//     </View>
//   );
// };
export default memo(QuestionListData);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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