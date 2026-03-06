
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
import MathRenderer from './MathRenderer';
//
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { Colors, Fonts } from '../../../theme';
import { Icons } from '../../../assets/icons';
import { moderateScale } from '../../../utils/responsiveSize';
import UploadErrorModal from '../../papermodule/questionModule/component/UploadErrorModal';
import AppModal from '../../../component/modal/AppModal';
import { removePDFQuestions } from '../../../redux/slices/pdfQuestionsSlice';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

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
  correctAnswers: any[]
  incorrectAnswers: any[]
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


  correctAnswers = [],  // Add with default
  incorrectAnswers = [], // Add with default

}) => {
  console.log('questionsData', questionsData);
  const navigation = useNavigation()
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



  // const toggleSelection = useCallback((id: string, questionNum: number) => {
  //   navigation.navigate('OpenQuestionScreen')
  // }, [selectedQuestions, setSelectedMap, setQuestionNumber, dispatch]);
  const toggleSelection = useCallback((id: string) => {
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
      chapterName: 'Questions',
    });
  }, [setSelectedMap, navigation, questionsData]);

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

//   const combinedHTML = useMemo(() => {
//       // Determine status for each question
//       const getQuestionStatus = useCallback((questionId: string) => {
//         if (correctAnswers.includes(questionId)) return 'correct';
//         if (incorrectAnswers.includes(questionId)) return 'incorrect';
//         return 'unanswered';
//       }, [correctAnswers, incorrectAnswers]);
//     return questionsData.map((item, index) => {
//       // 1. Get the status from your helper function
//     const status = getQuestionStatus(item?.question_id); // 'correct' | 'incorrect' | 'unanswered'
    
//     // 2. Map the status to a CSS class name
//     const statusClass = status === 'correct' ? 'status-correct' : 
//                         status === 'incorrect' ? 'status-incorrect' : 
//                         'status-unanswered';
//       // const status = renderStatusIconHTML(item?.question_id);
//       const questionNumber = (currentPage - 1) * limit + index + 1;
//       const isSelected = !!selectedMap[item.question_id] ||
//         selectedQuestions?.some((q: any) => q?.question_id === item.question_id);
//       const labelColorStatus = (level) => {
//         if (level === 'Easy') return Colors.primaryColor;
//         if (level === 'Hard') return Colors.red;
//         if (level === 'Medium') return Colors.green;
//         return Colors.black;
//       };
//       const getOptionTextStyle = (optionLetter: string, correctOption: string): string => {
//         const isCorrect = optionLetter === correctOption;
//         const color = isCorrect ? Colors.green : '#444444';
//         const fontWeight = isCorrect ? '500' : '400';

//         // Add font-family here
//         return `color: ${color} !important; font-weight: ${fontWeight} !important; font-size : ${moderateScale(13)}px !important; font-family: 'Inter' !important;`;
//       };

//       const getOptionContainerBg = (optionLetter: string, correctOption: string): string => {
//         if (optionLetter === correctOption) {
//           return '#dceedc';
//         }
//         return `${Colors.blackGray}`;
//       };

//       // Render status icon based on answer status
//       const renderStatusIcon = () => {
//         if (status === 'correct') {
//           return (
//             <View style={[styles.statusIcon, styles.correctIcon]}>
//               <IconIonicons name="checkmark" size={moderateScale(12)} color={Colors.white} />
//             </View>
//           );
//         } else if (status === 'incorrect') {
//           return (
//             <View style={[styles.statusIcon, styles.incorrectIcon]}>
//               <IconIonicons name="close" size={moderateScale(12)} color={Colors.white} />
//             </View>
//           );
//         }
//         return null;
//       };
//       // Change this function inside your useMemo
// const renderStatusIconHTML = (status) => {
//   if (status === 'correct') {
//     return `
//       <div class="status-icon-html correct-bg">
//         <span>✓</span>
//       </div>
//     `;
//   } else if (status === 'incorrect') {
//     return `
//       <div class="status-icon-html incorrect-bg">
//         <span>✕</span>
//       </div>
//     `;
//   }
//   return ''; // Return empty string for 'unanswered'
// };
//      return `
//   <div id="card-${item.question_id}" class="card ${isSelected ? 'selected' : ''}"
//     onclick="toggleCard('${item.question_id}', ${questionNumber})">
    
//     <div class="checkbox-container">
//       <strong class="questionnptext">${questionNumber}.</strong> 
//       ${renderStatusIconHTML(status)}
//     </div>

//     <div class="content-container">
//       <div class="question">
//         <span class="qs-text">
//           ${cleanLatex(item.question_text)}
//         </span>
//       </div>
//     </div>
//   </div>  
// `;
//     }).join('');
//   }, [questionsData, selectCheck, currentPage, limit]); // Removed selectedIds to prevent jumping
  // --- REPLACE YOUR LOADER WITH THIS ---

  const combinedHTML = useMemo(() => {
  // 1. Move helper functions to the top of useMemo
  const getQuestionStatus = (questionId: string) => {
    if (correctAnswers.includes(questionId)) return 'correct';
    if (incorrectAnswers.includes(questionId)) return 'incorrect';
    return 'unanswered';
  };

  const renderStatusIconHTML = (status: string) => {
    if (status === 'correct') {
      return `
        <div class="status-icon-badge correct-bg">
          <span>✓</span>
        </div>`;
    } else if (status === 'incorrect') {
      return `
        <div class="status-icon-badge incorrect-bg">
          <span>✕</span>
        </div>`;
    }
    return ''; 
  };

  // 2. Map the data
  return questionsData.map((item, index) => {
    const status = getQuestionStatus(item?.question_id);
    const qNum = (currentPage - 1) * limit + index + 1;
    const isSelected = !!selectedMap[item.question_id] ||
      selectedQuestions?.some((q: any) => q?.question_id === item.question_id);

    return `
      <div id="card-${item.question_id}" class="card ${isSelected ? 'selected' : ''}"
        onclick="toggleCard('${item.question_id}', ${qNum})">
        
        <div class="checkbox-container">
          <strong class="questionnptext">${qNum}.</strong> 
          ${renderStatusIconHTML(status)}
        </div>

        <div class="content-container">
          <div class="question">
            <span class="qs-text">
              ${cleanLatex(item.question_text)}
            </span>
          </div>
        </div>
      </div>`;
  }).join('');
}, [questionsData, currentPage, limit, correctAnswers, incorrectAnswers, selectedMap, selectedQuestions]);
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
export default memo(QuestionListData);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  shimmerCard: {
    backgroundColor: '#ffffff',
    padding: moderateScale(16),
    marginBottom: moderateScale(8),
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
  },

  correctIcon: {
    backgroundColor: '#4CAF50',
  },
  incorrectIcon: {
    backgroundColor: '#F44336',
  },
  statusIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(2),
  },
});

