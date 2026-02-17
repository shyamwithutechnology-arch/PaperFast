import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  Platform,
  PermissionsAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MathJax from 'react-native-mathjax';
import { moderateScale, verticalScale, scale } from '../../../../../utils/responsiveSize';
import { Colors, Fonts } from '../../../../../theme';
import { Icons } from '../../../../../assets/icons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import UploadErrorModal from '../UploadErrorModal';
import { useDispatch, useSelector } from 'react-redux';
import {  removePDFQuestions } from '../../../../../redux/slices/pdfQuestionsSlice';

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

type TogglePayload = {
  id: string;
  questionNum: number;
};

type Props = {
  selectCheck: 'Options' | 'Solutions';
  selectedMap: Record<string, boolean>;
  setSelectedMap: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  questionNumber: Record<string, boolean>;
  setQuestionNumber: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  questionsData: Question[];
  currentPage: number,
  limit: number;
  hideContant: boolean;
  isLoading: boolean;
  selectedQuestions: any[];
  getAllRute: any,

  // Add these props for infinite scrolling
  onLoadMore?: () => void;
  hasMoreData?: boolean;
  isLoadingMore?: boolean; // Add this for showing footer loader
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

  // First extract all images
  while ((match = imgRegex.exec(html)) !== null) {
    images.push(match[1]);
    // Remove the img tag from text
    text = text.replace(match[0], '');
  }

  // Clean HTML tags - IMPORTANT: Handle <br> tags properly
  text = text
    .replace(/<br\s*\/?>\s*<br\s*\/?>/gi, '\n\n') // Convert double <br> to double newline
    .replace(/<br\s*\/?>/gi, ' ') // Convert single <br> to space
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]*>/g, '') // Remove all remaining HTML tags
    .trim();

  return { text, images };
};


// Memoized Option Component with image support
const OptionItem = memo(({
  id,
  label,
  isSelected,
  isCorrect, // Add isCorrect as prop
  selectCheck
}: {
  id: string;
  label: string;
  isSelected: boolean;
  isCorrect: boolean;
  selectCheck: 'Solutions' | 'Options'
}) => {
  // Extract images and text from option label
  const { text: optionText, images: optionImages } = useMemo(() =>
    extractImagesFromHtml(label || ''),
    [label]
  );


  const formattedOptionText = useMemo(() => {
    return `
    <div style="
      font-size: 11px;
      line-height: 20px;
      border: 0px solid #000;
      paddingVertical:4px 0,
    ">
      ${optionText}
    </div>
  `;
  }, [optionText]);

  const hasMath = containsMath(optionText);
  const hasText = optionText.trim().length > 0;
  const hasImages = optionImages.length > 0;
  const selectOption = selectCheck === 'Solutions'
  return (
    <View style={[
      styles.optionContainer,
      // hasText  ? styles.correctOptionContainer : styles.imageStyle/
    ]}>
      {/* Option Content */}
      {hasImages &&
        <View
          style={[
            styles.optionContent,
            hasImages && styles.optionWithImages,
            selectOption && isCorrect && { borderColor: Colors.questionSelect },
          ]}
        >
          {/* LEFT: Option ID */}
          <View
            style={[
              styles.optionLabelContainer,
              selectOption && isCorrect && styles.correctOptionBgColor,
            ]}
          >
            <Text
              style={[
                styles.optionLabel,
                selectOption && isCorrect && styles.correctOptionText,
              ]}
            >
              {id}
            </Text>
          </View>

          {/* RIGHT: Images */}
          <View style={styles.optionImagesContainer}>
            {optionImages.map((base64, index) => (
              <Image
                key={`option-img-${id}-${index}`}
                source={{ uri: `data:image/png;base64,${base64}` }}
                style={styles.optionImage}
                resizeMode="contain"
              />
            ))}
          </View>
        </View>
      }


      {hasText &&
        // <View style={[{
        //   borderWidth: 1, borderColor: 'green', flexDirection: "row", justifyContent: "center", alignItems: 'center', paddingVertical: moderateScale(6),
        // }]}>
        <View style={[styles.optionContent, { paddingVertical: moderateScale(0) }]}>
          {/* hasText && {  borderColor: selectOption && isCorrect ? Colors.questionSelect : '#fff'} */}
          <View style={[
            styles.optionLabelContainer, { marginLeft: moderateScale(0) },
            selectOption && isCorrect && styles.correctOptionBgColor
          ]}>
            <Text style={[
              styles.optionLabel,
              (selectOption && isCorrect && styles.correctOptionText
              )]}>
              {id}
            </Text>
          </View>

          {hasText && (
            <>
              {
                hasMath ? (
                  <View style={[
                    styles.optionTextContainer,
                    hasImages && styles.optionTextWithImages, {
                      paddingVertical: moderateScale(1.5)
                    }
                  ]}>
                    <MathJax
                      mathJaxOptions={mathJaxOptions}
                      html={formattedOptionText}
                      style={[
                        styles.optionMathJax,
                        (selectOption && isCorrect && styles.correctOptionText)
                      ]}
                    />
                  </View>
                ) : (
                  <View style={[
                    styles.optionTextContainer, { paddingVertical: moderateScale(11), marginLeft: moderateScale(10) },
                    hasImages && styles.optionTextWithImages
                  ]}>
                    <Text style={[
                      styles.optionText,
                      (selectOption && isCorrect && styles.correctOptionText)
                    ]}>
                      {optionText}
                    </Text>
                  </View>
                )
              }
            </>
          )}

        </View>
      }

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
  // const cleanText = useMemo(() => {
  //   return (text || '')
  // .replace(/<br\s*\/?>/gi, '\n')
  // .replace(/&lt;/g, '<')
  // .replace(/&gt;/g, '>')
  // .replace(/&amp;/g, '&')
  // .replace(/&nbsp;/g, ' ')
  // .replace(/<[^>]*>/g, '');
  // }, [text]);
  const cleanText = useMemo(() => {
    return (text || '')
      // .replace(/<br\s*\/?>/gi, '\n')
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
      {/* Question Text */}
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

      {/* Question Images */}
      {hasImages && (
        <View style={[
          styles.imagesContainer,
          hasText && styles.imagesWithText,
          isSelected && { backgroundColor: '#EBF6FF' },
          {
            // borderWidth: 1,
            // borderColor: "red"
          }

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

const SolutionView = memo(({
  explanation,
  correctOption,
  isSelected
}: {
  explanation: string;
  correctOption: string;
  isSelected: boolean;
}) => {
  // 1. Extract images
  const images = useMemo(() => {
    const imgRegex = /<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/g;
    const matches: string[] = [];
    let match;
    while ((match = imgRegex.exec(explanation || '')) !== null) {
      matches.push(match[1]);
    }
    return matches;
  }, [explanation]);


  // 2. Remove image tags to get clean text
  const cleanText = useMemo(() => {
    let text = explanation || '';

    // Remove image tags
    text = text.replace(/<img[^>]*>/g, '');

    // Clean HTML
    text = text
      // .replace(/<br\s*\/?>/gi, ' ') // Convert <br> to space
      // .replace(/<br\s*\/?>/gi, '<br/>')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&nbsp;/g, ' ')
      // .replace(/<[^>]*>/g, '') // Remove any remaining HTML
      .trim();

    return text;
  }, [explanation]);


  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>

@font-face {
  font-family: 'InstrumentSansBold';
  src: url('file:///android_asset/fonts/InstrumentSans_SemiCondensed-Regular.ttf');
  font-weight: normal;
}

body {
  margin:0 !important;
  padding:0 !important;
  font-size:14px;
  color:#000;
  font-family:'InstrumentSansBold', Arial, sans-serif;
  line-height:20px;
}

p, div {
  margin:0 !important;
  padding:0 !important;
}

.MathJax_Display {
  margin:0 !important;
}

</style>
</head>

<body>
${cleanText}
</body>
</html>
`;

  const hasMath = containsMath(htmlContent);
  const hasText = htmlContent.length > 0;
  const hasImages = images.length > 0;

  return (
    <View style={[styles.solutionBox, isSelected && styles.cardSelected]}>
      <Text style={styles.solutionTitle}>Solution :</Text>

      {/* Text Content */}
      {hasText && (
        <View style={styles.textContainer}>
          {hasMath ? (
            <MathJax
              mathJaxOptions={mathJaxOptions}
              html={htmlContent}
              style={[styles.solutionMathJax, isSelected && styles.selectedText]}
            />
          ) : (
            <Text style={[styles.solutionText, isSelected && styles.selectedText]}>
              {htmlContent}
            </Text>
          )}
        </View>
      )}

      {/* Images (after text) */}
      {hasImages && (
        <View style={styles.imagesContainer}>
          {images.map((base64, index) => (
            <Image
              key={`img-${index}`}
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
  onInfoPress,
  hideContant
}: {
  item: Question;
  index: number;
  isSelected: boolean;
  selectCheck: 'Options' | 'Solutions';
  // onToggle: (id: string) => void;
  onToggle: (payload: TogglePayload) => void;
  extractImages: (html: string) => string[];
  listottomLineHide: any,
  currentPage: number,
  limit: number,
  onInfoPress: () => void,
  hideContant: boolean
}) => {
  // console.log('itemdddddddhideContant', item)
  const images = extractImages(item.question_text);
  const questionTextWithoutImages = (item.question_text || '').replace(/<img[^>]*>/g, '');

  const options = [
    { id: 'A', label: item.option_a || '' },
    { id: 'B', label: item.option_b || '' },
    { id: 'C', label: item.option_c || '' },
    { id: 'D', label: item.option_d || '' },
  ];
  const questionNumber = (currentPage - 1) * limit + index + 1;
  const textSty = () => {
    console.log('item?.dlevel_name', item?.dlevel_name);

    if (item?.dlevel_name === 'Easy') {
      return { color: Colors.primaryColor }
    } else if (item?.dlevel_name === 'Hard') {
      return { color: Colors.red }
    } else {
      return { color: Colors.green }
    }
  }
  return (
    <Pressable
      style={[!hideContant && styles.cardMainBox, isSelected && styles.cardSelected,
      { flexDirection: "row", paddingLeft: moderateScale(3) }]}
      // onPress={() => onToggle({ id: item?.question_id, qsNumber: questionNumber })}
      onPress={() =>
        !hideContant && onToggle({
          id: item?.question_id,
          questionNum: questionNumber,
        })
      }
    >
      <View style={[styles.questionNumberContainer, {}]}>
        <Text style={styles.questionNumber}> {questionNumber}</Text>
        {!hideContant && <View style={[
          styles.checkBox,
          isSelected ? styles.checkBoxSelected : styles.checkBoxDefault
        ]}>
          {isSelected && (
            <Icon
              name="check"
              size={moderateScale(12)}
              color={Colors.white}
            />
          )}
        </View>}
      </View>
      <View style={[styles.card, isSelected && styles.cardSelected,]}>
        <QuestionContent
          text={questionTextWithoutImages}
          images={images}
          isSelected={isSelected}
        />
        {/* Options Grid */}
        <View style={styles.optionsGrid}>
          {options.map((option) => (
            <OptionItem
              key={option.id}
              id={option.id}
              label={option.label}
              isSelected={isSelected}
              isCorrect={item.correct_option === option.id} // Pass correct option check
              selectCheck={selectCheck} // Pass it here
            />)
          )}
        </View>
        {!hideContant && <View style={styles.mainLevelBox}>
          <Text style={styles.lebalText}>Level : <Text style={[styles.lebalText, textSty(), { fontFamily: Fonts.InterBold }]}>
            {item?.dlevel_name}
          </Text></Text>
          <Pressable style={{ borderWidth: 0 }} onPress={onInfoPress}>
            <Image source={Icons.danger} style={styles.infoImg} resizeMode='contain' />
          </Pressable>
        </View>}


        {/* Solution View */}
        {selectCheck === 'Solutions' && (
          <View style={styles.solutionWrapper}>
            <SolutionView
              explanation={item.explanation || ''}
              correctOption={item.correct_option || ''}
              isSelected={isSelected}
            />
          </View>
        )}
      </View>
    </Pressable>
  );
});

// Main Component

const QuestionListData: React.FC<Props> = ({
  selectCheck,
  selectedMap,
  setSelectedMap,
  questionsData,
  currentPage,
  limit,
  questionNumber,
  setQuestionNumber,
  hideContant,
  isLoading,
  selectedQuestions,
  getAllRute,

  onLoadMore,
  hasMoreData = true,
  isLoadingMore = false, // Default to false
}) => {
  // const selectedQuestions = useSelector((state: any) => state?.pdfQuestions || []);
  console.log('wwwwwwwwww', selectedQuestions);

  const [openPicker, setOpenPicker] = useState<boolean>(false);
  const handleCloseModal = () => {
    setOpenPicker(false)
  }
  // console.log('selectCheck',selectCheck);
  const extractBase64Images = useCallback((html: string): string[] => {
    const imgRegex = /<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/g;
    const images: string[] = [];
    let match;
    while ((match = imgRegex.exec(html || '')) !== null) {
      images.push(match[1]);
    }
    return images;
  }, []);



  // Add footer loader component
  const  renderFooter = () => {
    if (!isLoadingMore) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
        <Text style={styles.footerText}>Loading more questions...</Text>
      </View>
    );
  };

  // Add empty footer when no more data
  const renderEmptyFooter = () => {
    if (questionsData.length === 0 || isLoading) return null;

    if (!hasMoreData && questionsData.length > 0) {
      return (
        <View style={styles.endOfListContainer}>
          <Text style={styles.endOfListText}>No more questions to load</Text>
        </View>
      );
    }
    return null;
  };

  // Handle end reached
  const handleEndReached = useCallback(() => {
    if (!isLoadingMore && hasMoreData && onLoadMore) {
      onLoadMore();
    }
  }, [isLoadingMore, hasMoreData, onLoadMore]);


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

  const openMediaPicker = useCallback(() => {
    setOpenPicker(true);
  }, []);

  const dispatch = useDispatch();

  // ✅ Correct Redux state access
  const questiondd = useSelector((state: any) => state?.pdfQuestions?.chapters || []);
  useEffect(() => {
    if (selectedQuestions && selectedQuestions.length > 0) {
      const initialMap: Record<string, boolean> = {};
      selectedQuestions.forEach((question: any) => {
        if (question?.question_id) {
          initialMap[question.question_id] = true;
        }
      });
      setSelectedMap(initialMap);
    } else {
      // If selectedQuestions is empty, clear the map
      setSelectedMap({});
      setQuestionNumber({});
    }
  }, [selectedQuestions]); // This will run when selectedQuestions changes

  const toggleSelect = useCallback(
    ({ id, questionNum }: TogglePayload) => {
      // console.log('🔄 Toggling question ID:', id);

      // Check if this question is pre-saved in Redux
      const isPreSaved = selectedQuestions?.some((q: any) => q?.question_id === id);

      // Check if currently selected
      const isCurrentlySelected = !!selectedMap[id];

      // If trying to REMOVE a pre-saved question, show confirmation
      if (isPreSaved && isCurrentlySelected) {
        Alert.alert(
          'Remove Question',
          'This question was previously saved. Are you sure you want to remove it?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Remove',
              style: 'destructive',
              onPress: () => {
                // FIRST: Remove from Redux to trigger re-render
                dispatch(removePDFQuestions([id]));

                // THEN: Remove from local state
                setSelectedMap(prev => {
                  const newMap = { ...prev };
                  delete newMap[id];
                  return newMap;
                });

                // Remove from question numbers
                if (Number.isFinite(questionNum)) {
                  setQuestionNumber(prev => {
                    const newNumber = { ...prev };
                    delete newNumber[questionNum];
                    return newNumber;
                  });
                }

                console.log('🗑️ Removed pre-saved question');
              }
            }
          ]
        );
        return;
      }

      // If trying to ADD a pre-saved question (but it's not currently selected)
      // This happens when component hasn't updated from Redux yet
      if (isPreSaved && !isCurrentlySelected) {
        setSelectedMap(prev => ({ ...prev, [id]: true }));

        if (Number.isFinite(questionNum)) {
          setQuestionNumber(prev => ({ ...prev, [questionNum]: true }));
        }
        console.log('✅ Re-added pre-saved question');
        return;
      }

      // Normal toggle for non-pre-saved questions
      setSelectedMap(prev => {
        const newMap = { ...prev };
        if (newMap[id]) {
          delete newMap[id];
          console.log('🗑️ Removed from selection');
        } else {
          newMap[id] = true;
          console.log('➕ Added to selection');
        }
        return newMap;
      });

      if (Number.isFinite(questionNum)) {
        setQuestionNumber(prev => {
          const newNumber = { ...prev };
          if (newNumber[questionNum]) {
            delete newNumber[questionNum];
          } else {
            newNumber[questionNum] = true;
          }
          return newNumber;
        });
      }
    },
    [selectedQuestions, selectedMap, setSelectedMap, setQuestionNumber, dispatch]
  );
  const renderItem = useCallback(({ item, index }: { item: Question; index: number }) => {
    const currentChapter = questiondd?.find((chapter: any) =>
      chapter?.chapterId === getAllRute?.chapterId &&
      chapter?.questionTypeId === getAllRute?.questionId
    );
    // Check if the question is in the current chapter's selectedQuestions
    const isInRedux = currentChapter?.selectedQuestions?.some((q: any) =>
      q?.question_id === item?.question_id
    );

    const isLocallySelected = !!selectedMap[item?.question_id];
    const isSelected = isLocallySelected || isInRedux;
    const langthList = index === questionsData?.length - 1;
    return (
      <QuestionItem
        item={item}
        index={index}
        isSelected={isSelected}
        selectCheck={selectCheck}
        onToggle={toggleSelect}
        extractImages={extractBase64Images}
        listottomLineHide={langthList}
        currentPage={currentPage}
        limit={limit}
        onInfoPress={openMediaPicker}
        hideContant={hideContant}
      />
    );
  }, [selectedMap, selectCheck, toggleSelect, extractBase64Images, currentPage, limit, openMediaPicker, hideContant, questionsData]);
  const keyExtractor = useCallback((item: Question) => item.question_id, []);
  const extraData = useMemo(() => ({
    selectedMap,
    selectCheck,
    length: questionsData.length,
  }), [selectedMap, selectCheck, questionsData.length]);



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



        // Add these props for infinite scrolling
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3} // Trigger when 30% from bottom
        ListFooterComponent={renderFooter}
        ListFooterComponentStyle={styles.footerContainer}

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
  const cameraOptions = {
    mediaType: 'photo',
    cameraType: 'back', // or 'front'
    saveToPhotos: true,
    quality: 0.8,
  };

  const galleryOptions = {
    mediaType: 'photo',
    selectionLimit: 1, // single image
  };
  // const openCamera = async () => {
  //   setOpenPicker(false);

  //   const result = await launchCamera(cameraOptions);

  //   if (result.didCancel) return;
  //   if (result.errorCode) {
  //     console.log('Camera Error:', result.errorMessage);
  //     return;
  //   }

  //   const photo = result.assets?.[0];
  //   console.log('Camera image:', photo);

  //   // 👉 Use photo.uri for preview / upload
  // };
  // const requestCameraPermission = async () => {
  //   if (Platform.OS !== 'android') return true;

  //   const granted = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.CAMERA,
  //     {
  //       title: 'Camera Permission',
  //       message: 'App needs camera access to take photos',
  //       buttonPositive: 'OK',
  //       buttonNegative: 'Cancel',
  //     }
  //   );

  //   return granted === PermissionsAndroid.RESULTS.GRANTED;
  // };
  const requestCameraPermission = async () => {
    if (Platform.OS !== 'android') return true;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs camera access to take photos',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
      }
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const openCamera = async () => {
    setOpenPicker(false);

    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      console.log('Camera permission denied');
      return;
    }
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: true,
      quality: 0.8,
    });

    if (result.didCancel) return;
    if (result.errorCode) {
      console.log('Camera Error:', result.errorCode, result.errorMessage);
      return;
    }

    const photo = result.assets?.[0];
    console.log('Camera image:', photo);
  };

  const openGallery = async () => {
    setOpenPicker(false);

    const result = await launchImageLibrary(galleryOptions);

    if (result.didCancel) return;
    if (result.errorCode) {
      console.log('Gallery Error:', result.errorMessage);
      return;
    }
    const image = result.assets?.[0];
    console.log('Gallery image:', image);
    // 👉 Use image.uri for preview / upload
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={questionsData}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        extraData={extraData}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50} // Slows down the frequency of renders
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
      <UploadErrorModal
        visible={openPicker}
        onClose={() => setOpenPicker(false)}
      />

    </View>
  );
};
export default memo(QuestionListData);

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
    // backgroundColor: 'red',
    backgroundColor: '#f9fafb',
    // marginHorizontal: 0,
    flex: 1,
    paddingBottom: moderateScale(6),
    paddingTop: moderateScale(6),
    paddingHorizontal: moderateScale(12),
    // paddingVertical: moderateScale(10)
  },
  cardSelected: {
    backgroundColor: '#EBF6FF'
  },
  questionRow: {
    flexDirection: 'row',
    marginBottom: moderateScale(10),

  },
  questionNumber: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.InstrumentSansMedium,
    color: Colors.black,
    // textAlignVertical: 'top'
  },
  questionContent: {
    flex: 1,
    marginBottom: moderateScale(10),
    // borderWidth: 1
  },
  mathJaxWrapper: {
    // flex: 1,
    // marginTop: moderateScale(6),
    // borderWidth: 1,
    paddingVertical: moderateScale(1),
    marginBottom: moderateScale(8)
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
    width: '100%',
    minHeight: moderateScale(20),
  },
  selectedText: {
    backgroundColor: 'transparent',
  },
  imagesWithText: {

  },
  questionImage: {
    width: '100%',
    height: moderateScale(98),
    maxHeight: verticalScale(250),
    borderRadius: moderateScale(2),
    backgroundColor: Colors?.white,
    alignSelf: 'center',
    resizeMode: "contain",
  },
  optionsGrid: {
    // Your options grid styles
  },
  optionContainer: {
    marginBottom: moderateScale(8),
    backgroundColor: Colors.white,
    borderRadius: moderateScale(4),
    paddingVertical: moderateScale(.2)
  },
  correctOptionContainer: {
    borderWidth: 1,
    borderColor: 'rgba(12, 64, 111, 0.12)',
    flexDirection: 'row'
  },
  imageStyle: {
    flexDirection: 'column'
  },
  correctOptionLabel: {
    borderColor: '#1E88E5',
    borderWidth: 1.4
  },
  optionLabel: {
    fontSize: moderateScale(11),
    fontFamily: Fonts.InstrumentSansMedium,
    color: Colors.black,
  },
  correctOptionText: {
    color: Colors?.white,
    fontFamily: Fonts.InstrumentSansSemiBold,
  },
  correctOptionBgColor: {
    backgroundColor: Colors?.questionSelect,
  },
  optionTextContainer: {
    flex: 1,
    marginLeft: moderateScale(3),
    justifyContent: 'center', 
  },
  optionTextWithImages: {
    marginTop: moderateScale(4),
  },
  optionText: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.InstrumentSansMedium,
    color: Colors.black,
    lineHeight: moderateScale(16),
  },
  optionMathJax: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.InstrumentSansMedium,
    color: Colors.black,
    borderWidth: 1
  },
  checkBox: {
    width: moderateScale(17),
    height: moderateScale(17),
    borderRadius: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(3),
  },
  checkBoxDefault: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors?.InputStroke,
    marginRight: moderateScale(3),
  },
  checkBoxSelected: {
    backgroundColor: '#1E88E5',
    borderWidth: 0,
  },
  solutionWrapper: {
    marginTop: moderateScale(6),
    overflow: 'visible',
  },
  questionNumberContainer: {
    alignItems: 'flex-start',
    flexDirection: "column",
    height: moderateScale(50),
    marginTop: moderateScale(6),
    paddingLeft: moderateScale(4)
  },
  cardMainBox: {
    elevation: 30,
    marginVertical: moderateScale(1),
    shadowColor: 'rgba(0, 140, 227, 1)',
    backgroundColor: '#f9fafb'
  },
  solutionBox: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(6),
  },
  solutionTitle: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.InstrumentSansBold,
    color: Colors.primaryColor,
    marginTop: moderateScale(5)
  },
  textContainer: {
    marginLeft: 0
  },
  solutionText: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.InstrumentSansRegular,
    color: Colors.black,
    lineHeight: moderateScale(20),
    marginLeft: 0
  },
  solutionMathJax: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.InstrumentSansRegular,
    color: Colors.black,
    marginLeft: 0
  },
  imagesContainer: {
  },

  solutionImage: {
    width: '100%',
    height: moderateScale(150),
    maxHeight: moderateScale(200),
    borderRadius: moderateScale(4),
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginTop: moderateScale(4),
    resizeMode: "contain"
  },
  answerText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.InstrumentSansSemiBold,
    color: Colors.black,
    marginTop: moderateScale(5)
  },
  answerLabel: {
    fontFamily: Fonts.InstrumentSansBold,
    fontSize: moderateScale(14),
    color: Colors.green
  },
  noSolutionText: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.InstrumentSansRegular,
    color: Colors.gray,
    fontStyle: 'italic',
    marginBottom: moderateScale(12),
  },

  // ?????????????????????
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(4),
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(1),
  },

  optionWithImages: {
    // borderWidth: 1,
  },

  /* LEFT ID BOX */
  optionLabelContainer: {
    width: moderateScale(26),
    height: moderateScale(26),
    borderRadius: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors?.lightThemeBlue
  },

  /* RIGHT IMAGE WRAPPER */
  optionImagesContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',        // 🔥 allows multiple images
    marginLeft: moderateScale(10),
  },

  /* SINGLE IMAGE */
  optionImage: {
    width: moderateScale(130),   // dynamic base size
    height: moderateScale(90),
    borderRadius: moderateScale(6),
  },
  mainLevelBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  lebalText: {
    fontSize: moderateScale(13),
    color: Colors.InputText,
    fontFamily: Fonts?.InstrumentSansMedium
  },
  infoImg: {
    width: moderateScale(18),
    height: moderateScale(18),
  },

  // ????????????????????mode
  sendQuesetionText: {
    fontSize: moderateScale(18),
    color: Colors.black,
    fontFamily: Fonts.InterRegular
  },
  uploadBox: {
    height: scale(100),
    borderWidth: 1,
    borderColor: Colors.InputStroke,
    borderRadius: moderateScale(8),
    marginTop: moderateScale(8),
    paddingHorizontal: moderateScale(8),
    marginHorizontal: moderateScale(1.6)
  },
  addBox: {
    height: moderateScale(30),
    width: moderateScale(30),
    borderRadius: moderateScale(40),
    borderWidth: 1,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: "center"
  },
  submitBtn: {
    width: '90%',
    borderWidth: 1,
    backgroundColor: Colors.primaryColor
  },
  enterDecInput: {
    fontSize: moderateScale(16),
    color: Colors.InputText,
    fontFamily: Fonts.InterRegular,
    verticalAlign: 'top',
    flex: 1,
    flexWrap: 'wrap',
    // width:'90%'
  },
  mainInputBox: {
    borderWidth: 1,
    // paddingVertical: moderateScale(.1),
    // minHeight:moderateScale(10),
    height: moderateScale(110),
    borderColor: Colors.InputStroke,
    borderRadius: moderateScale(6),
    marginTop: moderateScale(10),
    paddingHorizontal: moderateScale(5)
    // marginHorizontal:moderateScale(1.6)
  },
  lineBox: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.InputStroke,
    marginVertical: moderateScale(24)
  },
  sendMainBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    marginHorizontal: moderateScale(4)
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


  // ********************************* load more
  footerLoader: {
    paddingVertical: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.InstrumentSansMedium,
    color: Colors.gray,
    marginTop: moderateScale(8),
  },
  footerContainer: {
    paddingBottom: moderateScale(20),
  },
  endOfListContainer: {
    paddingVertical: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  endOfListText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.InstrumentSansMedium,
    color: Colors.gray,
  },
});

// ***********************************
// import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Image,
//   Dimensions,
//   Pressable,
//   Modal,
//   Platform,
//   PermissionsAndroid,
//   TextInput,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import MathJax from 'react-native-mathjax';
// import { moderateScale, verticalScale, scale } from '../../../../../utils/responsiveSize';
// import { Colors, Fonts } from '../../../../../theme';
// import { Icons } from '../../../../../assets/icons';
// import MediaPickerModal from '../../../../../component/mediapickermodal/MediaPickerModal';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import AppModal from '../../../../../component/modal/AppModal';
// import CloseIcon from "react-native-vector-icons/EvilIcons";
// import AddIcon from "react-native-vector-icons/MaterialIcons";
// import AppButton from '../../../../../component/button/AppButton';
// import UploadErrorModal from '../UploadErrorModal';
// import { useDispatch, useSelector } from 'react-redux';
// import { removeChapterQuestions, removePDFQuestions } from '../../../../../redux/slices/pdfQuestionsSlice';
// import { showToast } from '../../../../../utils/toast';

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

// type TogglePayload = {
//   id: string;
//   questionNum: number;
// };

// type Props = {
//   selectCheck: 'Options' | 'Solutions';
//   selectedMap: Record<string, boolean>;
//   setSelectedMap: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
//   questionNumber: Record<string, boolean>;
//   setQuestionNumber: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
//   questionsData: Question[];
//   currentPage: number,
//   limit: number;
//   hideContant?: boolean;
//   isLoading: boolean;
//   selectedQuestions: any[];
//   getAllRute: any,
//   // Add these props for infinite scrolling
//   onLoadMore?: () => void;
//   hasMoreData?: boolean;
//   isLoadingMore?: boolean;
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
//     // .replace(/<br\s*\/?>\s*<br\s*\/?>/gi, '\n\n')
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

// // Memoized Option Component with image support
// const OptionItem = memo(({
//   id,
//   label,
//   isSelected,
//   isCorrect,
//   selectCheck
// }: {
//   id: string;
//   label: string;
//   isSelected: boolean;
//   isCorrect: boolean;
//   selectCheck: 'Solutions' | 'Options'
// }) => {
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
//   const selectOption = selectCheck === 'Solutions';

//   return (
//     <View style={[styles.optionContainer]}>
//       {hasImages && (
//         <View
//           style={[
//             styles.optionContent,
//             hasImages && styles.optionWithImages,
//             selectOption && isCorrect && { borderColor: Colors.questionSelect },
//           ]}
//         >
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
//               ]}
//             >
//               {id}
//             </Text>
//           </View>

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
//         </View>
//       )}

//       {hasText && (
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
//               {hasMath ? (
//                 <View style={[
//                   styles.optionTextContainer,
//                   hasImages && styles.optionTextWithImages, {
//                     paddingVertical: moderateScale(1.5)
//                   }
//                 ]}>
//                   <MathJax
//                     mathJaxOptions={mathJaxOptions}
//                     html={formattedOptionText}
//                     style={[
//                       styles.optionMathJax,
//                       (selectOption && isCorrect && styles.correctOptionText)
//                     ]}
//                   />
//                 </View>
//               ) : (
//                 <View style={[
//                   styles.optionTextContainer, { paddingVertical: moderateScale(11), marginLeft: moderateScale(10) },
//                   hasImages && styles.optionTextWithImages
//                 ]}>
//                   <Text style={[
//                     styles.optionText,
//                     (selectOption && isCorrect && styles.correctOptionText)
//                   ]}>
//                     {optionText}
//                   </Text>
//                 </View>
//               )}
//             </>
//           )}
//         </View>
//       )}
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
//           isSelected && { backgroundColor: '#EBF6FF' },
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

// const SolutionView = memo(({
//   explanation,
//   correctOption,
//   isSelected
// }: {
//   explanation: string;
//   correctOption: string;
//   isSelected: boolean;
// }) => {
//   const images = useMemo(() => {
//     const imgRegex = /<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/g;
//     const matches: string[] = [];
//     let match;
//     while ((match = imgRegex.exec(explanation || '')) !== null) {
//       matches.push(match[1]);
//     }
//     return matches;
//   }, [explanation]);

//   const cleanText = useMemo(() => {
//     let text = explanation || '';
//     text = text.replace(/<img[^>]*>/g, '');
//     text = text
//       .replace(/&lt;/g, '<')
//       .replace(/&gt;/g, '>')
//       .replace(/&amp;/g, '&')
//       .replace(/&nbsp;/g, ' ')
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
//   onInfoPress,
//   hideContant
// }: {
//   item: Question;
//   index: number;
//   isSelected: boolean;
//   selectCheck: 'Options' | 'Solutions';
//   onToggle: (payload: TogglePayload) => void;
//   extractImages: (html: string) => string[];
//   listottomLineHide: any,
//   currentPage: number,
//   limit: number,
//   onInfoPress: () => void,
//   hideContant?: boolean
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

//   const textSty = () => {
//     if (item?.dlevel_name === 'Easy') {
//       return { color: Colors.primaryColor }
//     } else if (item?.dlevel_name === 'Hard') {
//       return { color: Colors.red }
//     } else {
//       return { color: Colors.green }
//     }
//   }

//   return (
//     <Pressable
//       style={[!hideContant && styles.cardMainBox, isSelected && styles.cardSelected,
//       { flexDirection: "row", paddingLeft: moderateScale(3) }]}
//       onPress={() =>
//         !hideContant && onToggle({
//           id: item?.question_id,
//           questionNum: questionNumber,
//         })
//       }
//     >
//       <View style={[styles.questionNumberContainer, {}]}>
//         <Text style={styles.questionNumber}> {questionNumber}</Text>
//         {!hideContant && <View style={[
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
//         </View>}
//       </View>
//       <View style={[styles.card, isSelected && styles.cardSelected,]}>
//         <QuestionContent
//           text={questionTextWithoutImages}
//           images={images}
//           isSelected={isSelected}
//         />
//         <View style={styles.optionsGrid}>
//           {options.map((option) => (
//             <OptionItem
//               key={option.id}
//               id={option.id}
//               label={option.label}
//               isSelected={isSelected}
//               isCorrect={item.correct_option === option.id}
//               selectCheck={selectCheck}
//             />
//           ))}
//         </View>
//         {!hideContant && <View style={styles.mainLevelBox}>
//           <Text style={styles.lebalText}>Level : <Text style={[styles.lebalText, textSty(), { fontFamily: Fonts.InterBold }]}>
//             {item?.dlevel_name}
//           </Text></Text>
//           <Pressable style={{ borderWidth: 0 }} onPress={onInfoPress}>
//             <Image source={Icons.danger} style={styles.infoImg} resizeMode='contain' />
//           </Pressable>
//         </View>}

//         {selectCheck === 'Solutions' && (
//           <View style={styles.solutionWrapper}>
//             <SolutionView
//               explanation={item.explanation || ''}
//               correctOption={item.correct_option || ''}
//               isSelected={isSelected}
//             />
//           </View>
//         )}
//       </View>
//     </Pressable>
//   );
// });

// // Main Component
// const QuestionListData: React.FC<Props> = ({
//   selectCheck,
//   selectedMap,
//   setSelectedMap,
//   questionsData,
//   currentPage,
//   limit,
//   questionNumber,
//   setQuestionNumber,
//   hideContant,
//   isLoading,
//   selectedQuestions,
//   getAllRute,
//   onLoadMore,
//   hasMoreData = true,
//   isLoadingMore = false,
// }) => {
//   const [openPicker, setOpenPicker] = useState<boolean>(false);

//   const handleCloseModal = () => {
//     setOpenPicker(false)
//   }

//   const extractBase64Images = useCallback((html: string): string[] => {
//     const imgRegex = /<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"[^>]*>/g;
//     const images: string[] = [];
//     let match;
//     while ((match = imgRegex.exec(html || '')) !== null) {
//       images.push(match[1]);
//     }
//     return images;
//   }, []);

//   // Add footer loader component
//   const renderFooter = () => {
//     if (!isLoadingMore) return null;

//     return (
//       <View style={styles.footerLoader}>
//         <ActivityIndicator size="large" color={Colors.primaryColor} />
//         <Text style={styles.footerText}>Loading more questions...</Text>
//       </View>
//     );
//   };

//   // Add empty footer when no more data
//   const renderEmptyFooter = () => {
//     if (questionsData.length === 0 || isLoading) return null;

//     if (!hasMoreData && questionsData.length > 0) {
//       return (
//         <View style={styles.endOfListContainer}>
//           <Text style={styles.endOfListText}>No more questions to load</Text>
//         </View>
//       );
//     }
//     return null;
//   };

//   // Handle end reached
//   const handleEndReached = useCallback(() => {
//     if (!isLoadingMore && hasMoreData && onLoadMore) {
//       onLoadMore();
//     }
//   }, [isLoadingMore, hasMoreData, onLoadMore]);

//   // Render shimmer items when loading
//   const renderShimmerItem = useCallback(() => (
//     <View style={styles.shimmerContainer}>
//       <View style={styles.shimmerRow}>
//         <View style={styles.shimmerNumber} />
//         <View style={styles.shimmerContent}>
//           <View style={styles.shimmerQuestionText} />
//           <View style={styles.shimmerQuestionTextShort} />
//         </View>
//       </View>

//       <View style={styles.shimmerOptionsGrid}>
//         {[1, 2, 3, 4].map((_, index) => (
//           <View key={`shimmer-opt-${index}`} style={styles.shimmerOptionContainer}>
//             <View style={styles.shimmerOptionLabel} />
//             <View style={styles.shimmerOptionText} />
//           </View>
//         ))}
//       </View>

//       {!hideContant && (
//         <View style={styles.shimmerLevelContainer}>
//           <View style={styles.shimmerLevelText} />
//         </View>
//       )}
//     </View>
//   ), [hideContant]);

//   const openMediaPicker = useCallback(() => {
//     setOpenPicker(true);
//   }, []);

//   const dispatch = useDispatch();

//   const questiondd = useSelector((state: any) => state?.pdfQuestions?.chapters || []);

//   useEffect(() => {
//     if (selectedQuestions && selectedQuestions.length > 0) {
//       const initialMap: Record<string, boolean> = {};
//       selectedQuestions.forEach((question: any) => {
//         if (question?.question_id) {
//           initialMap[question.question_id] = true;
//         }
//       });
//       setSelectedMap(initialMap);
//     } else {
//       setSelectedMap({});
//       setQuestionNumber({});
//     }
//   }, [selectedQuestions]);

//   const toggleSelect = useCallback(
//     ({ id, questionNum }: TogglePayload) => {
//       const isPreSaved = selectedQuestions?.some((q: any) => q?.question_id === id);
//       const isCurrentlySelected = !!selectedMap[id];

//       if (isPreSaved && isCurrentlySelected) {
//         Alert.alert(
//           'Remove Question',
//           'This question was previously saved. Are you sure you want to remove it?',
//           [
//             { text: 'Cancel', style: 'cancel' },
//             {
//               text: 'Remove',
//               style: 'destructive',
//               onPress: () => {
//                 dispatch(removePDFQuestions([id]));
//                 setSelectedMap(prev => {
//                   const newMap = { ...prev };
//                   delete newMap[id];
//                   return newMap;
//                 });
//                 if (Number.isFinite(questionNum)) {
//                   setQuestionNumber(prev => {
//                     const newNumber = { ...prev };
//                     delete newNumber[questionNum];
//                     return newNumber;
//                   });
//                 }
//               }
//             }
//           ]
//         );
//         return;
//       }

//       if (isPreSaved && !isCurrentlySelected) {
//         setSelectedMap(prev => ({ ...prev, [id]: true }));
//         if (Number.isFinite(questionNum)) {
//           setQuestionNumber(prev => ({ ...prev, [questionNum]: true }));
//         }
//         return;
//       }

//       setSelectedMap(prev => {
//         const newMap = { ...prev };
//         if (newMap[id]) {
//           delete newMap[id];
//         } else {
//           newMap[id] = true;
//         }
//         return newMap;
//       });

//       if (Number.isFinite(questionNum)) {
//         setQuestionNumber(prev => {
//           const newNumber = { ...prev };
//           if (newNumber[questionNum]) {
//             delete newNumber[questionNum];
//           } else {
//             newNumber[questionNum] = true;
//           }
//           return newNumber;
//         });
//       }
//     },
//     [selectedQuestions, selectedMap, setSelectedMap, setQuestionNumber, dispatch]
//   );

//   const renderItem = useCallback(({ item, index }: { item: Question; index: number }) => {
//     const currentChapter = questiondd?.find((chapter: any) =>
//       chapter?.chapterId === getAllRute?.chapterId &&
//       chapter?.questionTypeId === getAllRute?.questionId
//     );

//     const isInRedux = currentChapter?.selectedQuestions?.some((q: any) =>
//       q?.question_id === item?.question_id
//     );

//     const isLocallySelected = !!selectedMap[item?.question_id];
//     const isSelected = isLocallySelected || isInRedux;
//     const langthList = index === questionsData?.length - 1;

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
//         onInfoPress={openMediaPicker}
//         hideContant={hideContant}
//       />
//     );
//   }, [selectedMap, selectCheck, toggleSelect, extractBase64Images, currentPage, limit, openMediaPicker, hideContant, questionsData, questiondd, getAllRute]);

//   // const keyExtractor = useCallback((item: Question) => item.question_id, []);

//   // const extraData = useMemo(() => ({
//   //   selectedMap,
//   //   selectCheck,
//   //   length: questionsData.length,
//   // }), [selectedMap, selectCheck, questionsData.length]);
//   const keyExtractor = useCallback((item: Question) => {
//     // Ensure unique key by combining with timestamp or index if needed
//     return `question-${item.question_id}-${item.question_text?.substring(0, 10)}`;
//   }, []);

//   const extraData = useMemo(() => ({
//     selectedMap,
//     selectCheck,
//     questionsDataLength: questionsData.length,
//   }), [selectedMap, selectCheck, questionsData.length]);

//   const shimmerKeyExtractor = useCallback((_: any, index: number) => `shimmer-${index}`, []);

//   // Camera and gallery functions
//   const requestCameraPermission = async () => {
//     if (Platform.OS !== 'android') return true;
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       {
//         title: 'Camera Permission',
//         message: 'App needs camera access to take photos',
//         buttonPositive: 'OK',
//         buttonNegative: 'Cancel',
//       }
//     );
//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   };

//   const openCamera = async () => {
//     setOpenPicker(false);
//     const hasPermission = await requestCameraPermission();
//     if (!hasPermission) {
//       console.log('Camera permission denied');
//       return;
//     }
//     const result = await launchCamera({
//       mediaType: 'photo',
//       cameraType: 'back',
//       saveToPhotos: true,
//       quality: 0.8,
//     });
//     if (result.didCancel) return;
//     if (result.errorCode) {
//       console.log('Camera Error:', result.errorCode, result.errorMessage);
//       return;
//     }
//     const photo = result.assets?.[0];
//     console.log('Camera image:', photo);
//   };

//   const openGallery = async () => {
//     setOpenPicker(false);
//     const result = await launchImageLibrary({
//       mediaType: 'photo',
//       selectionLimit: 1,
//     });
//     if (result.didCancel) return;
//     if (result.errorCode) {
//       console.log('Gallery Error:', result.errorMessage);
//       return;
//     }
//     const image = result.assets?.[0];
//     console.log('Gallery image:', image);
//   };

//   if (isLoading) {
//     return (
//       <View style={styles.container}>
//         <FlatList
//           data={Array(5).fill({})}
//           keyExtractor={shimmerKeyExtractor}
//           renderItem={renderShimmerItem}
//           initialNumToRender={3}
//           maxToRenderPerBatch={5}
//           windowSize={21}
//           removeClippedSubviews={false}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.listContent}
//         />
//       </View>
//     );
//   }

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
//         initialNumToRender={10}
//         maxToRenderPerBatch={10}
//         windowSize={10}
//         removeClippedSubviews={true}
//         updateCellsBatchingPeriod={50}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.listContent}
//         // Add infinite scrolling props
//         onEndReached={handleEndReached}
//         onEndReachedThreshold={0.3}
//         ListFooterComponent={renderFooter}
//         ListFooterComponentStyle={styles.footerContainer}
//         ListEmptyComponent={
//           !isLoading && questionsData.length === 0 ? (
//             <View style={styles.emptyContainer}>
//               <Text style={styles.emptyText}>No questions available</Text>
//             </View>
//           ) : null
//         }
//       />

//       <UploadErrorModal
//         visible={openPicker}
//         onClose={() => setOpenPicker(false)}
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
//   questionRow: {
//     flexDirection: 'row',
//     marginBottom: moderateScale(10),
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
//     width: '100%',
//     minHeight: moderateScale(20),
//   },
//   selectedText: {
//     backgroundColor: 'transparent',
//   },
//   imagesWithText: {
//     // marginTop: moderateScale(12),
//   },
//   questionImage: {
//     width: '100%',
//     height: moderateScale(98),
//     maxHeight: verticalScale(250),
//     borderRadius: moderateScale(2),
//     backgroundColor: Colors?.white,
//     alignSelf: 'center',
//     resizeMode: "contain",
//   },
//   optionsGrid: {
//     // Your options grid styles
//   },
//   optionContainer: {
//     marginBottom: moderateScale(8),
//     backgroundColor: Colors.white,
//     borderRadius: moderateScale(4),
//     paddingVertical: moderateScale(.2),
//   },
//   correctOptionContainer: {
//     borderWidth: 1,
//     borderColor: 'rgba(12, 64, 111, 0.12)',
//     flexDirection: 'row'
//   },
//   imageStyle: {
//     flexDirection: 'column'
//   },
//   correctOptionLabel: {
//     borderColor: '#1E88E5',
//     borderWidth: 1.4
//   },
//   optionLabel: {
//     fontSize: moderateScale(11),
//     fontFamily: Fonts.InstrumentSansMedium,
//     color: Colors.black,
//   },
//   correctOptionText: {
//     color: Colors?.white,
//     fontFamily: Fonts.InstrumentSansSemiBold,
//   },
//   correctOptionBgColor: {
//     backgroundColor: Colors?.questionSelect,
//   },
//   optionTextContainer: {
//     flex: 1,
//     marginLeft: moderateScale(3),
//     justifyContent: 'center',
//   },
//   optionTextWithImages: {
//     marginTop: moderateScale(4),
//   },
//   optionText: {
//     fontSize: moderateScale(13),
//     fontFamily: Fonts.InstrumentSansMedium,
//     color: Colors.black,
//     lineHeight: moderateScale(16),
//   },
//   optionMathJax: {
//     fontSize: moderateScale(13),
//     fontFamily: Fonts.InstrumentSansMedium,
//     color: Colors.black,
//   },
//   checkBox: {
//     width: moderateScale(17),
//     height: moderateScale(17),
//     borderRadius: moderateScale(5),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: moderateScale(3),
//   },
//   checkBoxDefault: {
//     backgroundColor: Colors.white,
//     borderWidth: 1.5,
//     borderColor: Colors?.InputStroke,
//     marginRight: moderateScale(3),
//   },
//   checkBoxSelected: {
//     backgroundColor: '#1E88E5',
//     borderWidth: 0,
//   },
//   solutionWrapper: {
//     marginTop: moderateScale(6),
//     overflow: 'visible',
//   },
//   questionNumberContainer: {
//     alignItems: 'flex-start',
//     flexDirection: "column",
//     height: moderateScale(50),
//     marginTop: moderateScale(6),
//     paddingLeft: moderateScale(4)
//   },
//   cardMainBox: {
//     elevation: 30,
//     marginVertical: moderateScale(1),
//     shadowColor: 'rgba(0, 140, 227, 1)',
//     backgroundColor: '#f9fafb'
//   },
//   solutionBox: {
//     backgroundColor: Colors.white,
//     borderRadius: moderateScale(6),
//   },
//   solutionTitle: {
//     fontSize: moderateScale(13),
//     fontFamily: Fonts.InstrumentSansBold,
//     color: Colors.primaryColor,
//     marginTop: moderateScale(5)
//   },
//   textContainer: {
//     marginLeft: 0
//   },
//   solutionText: {
//     fontSize: moderateScale(13),
//     fontFamily: Fonts.InstrumentSansRegular,
//     color: Colors.black,
//     lineHeight: moderateScale(20),
//     marginLeft: 0
//   },
//   solutionMathJax: {
//     fontSize: moderateScale(13),
//     fontFamily: Fonts.InstrumentSansRegular,
//     color: Colors.black,
//     marginLeft: 0
//   },
//   imagesContainer: {
//     // Images appear right after text
//   },
//   solutionImage: {
//     width: '100%',
//     height: moderateScale(150),
//     maxHeight: moderateScale(200),
//     borderRadius: moderateScale(4),
//     backgroundColor: 'transparent',
//     alignSelf: 'center',
//     marginTop: moderateScale(4),
//     resizeMode: "contain"
//   },
//   answerText: {
//     fontSize: moderateScale(12),
//     fontFamily: Fonts.InstrumentSansSemiBold,
//     color: Colors.black,
//     marginTop: moderateScale(5)
//   },
//   answerLabel: {
//     fontFamily: Fonts.InstrumentSansBold,
//     fontSize: moderateScale(14),
//     color: Colors.green
//   },
//   noSolutionText: {
//     fontSize: moderateScale(13),
//     fontFamily: Fonts.InstrumentSansRegular,
//     color: Colors.gray,
//     fontStyle: 'italic',
//     marginBottom: moderateScale(12),
//   },
//   optionContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: moderateScale(4),
//     paddingHorizontal: moderateScale(8),
//     paddingVertical: moderateScale(1),
//   },
//   optionWithImages: {
//     // borderWidth: 1,
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
//   mainLevelBox: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center"
//   },
//   lebalText: {
//     fontSize: moderateScale(13),
//     color: Colors.InputText,
//     fontFamily: Fonts?.InstrumentSansMedium
//   },
//   infoImg: {
//     width: moderateScale(18),
//     height: moderateScale(18),
//   },
//   // Shimmer Styles
//   shimmerContainer: {
//     backgroundColor: '#f9fafb',
//     marginVertical: moderateScale(8),
//     padding: moderateScale(12),
//     borderRadius: moderateScale(4),
//   },
//   shimmerRow: {
//     flexDirection: 'row',
//     marginBottom: moderateScale(10),
//   },
//   shimmerNumber: {
//     width: moderateScale(30),
//     height: moderateScale(30),
//     backgroundColor: '#e0e0e0',
//     borderRadius: moderateScale(20),
//     marginRight: moderateScale(3),
//   },
//   shimmerContent: {
//     flex: 1,
//   },
//   shimmerQuestionText: {
//     height: moderateScale(16),
//     backgroundColor: '#e0e0e0',
//     borderRadius: moderateScale(2),
//     marginBottom: moderateScale(8),
//     width: '94%',
//   },
//   shimmerQuestionTextShort: {
//     height: moderateScale(16),
//     backgroundColor: '#e0e0e0',
//     borderRadius: moderateScale(2),
//     width: '60%',
//   },
//   shimmerOptionsGrid: {
//     marginBottom: moderateScale(12),
//   },
//   shimmerOptionContainer: {
//     flexDirection: 'row',
//     marginBottom: moderateScale(8),
//     alignItems: 'center',
//   },
//   shimmerOptionLabel: {
//     width: moderateScale(24),
//     height: moderateScale(24),
//     backgroundColor: '#e0e0e0',
//     borderRadius: moderateScale(12),
//     marginRight: moderateScale(8),
//   },
//   shimmerOptionText: {
//     height: moderateScale(30),
//     backgroundColor: '#e0e0e0',
//     borderRadius: moderateScale(2),
//     flex: 1,
//   },
//   shimmerLevelContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   shimmerLevelText: {
//     height: moderateScale(12),
//     width: moderateScale(80),
//     backgroundColor: '#e0e0e0',
//     borderRadius: moderateScale(2),
//   },
//   // Footer Styles
//   footerLoader: {
//     paddingVertical: moderateScale(20),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   footerText: {
//     fontSize: moderateScale(14),
//     fontFamily: Fonts.InstrumentSansMedium,
//     color: Colors.primaryColor,
//     marginTop: moderateScale(4),
//   },
//   footerContainer: {
//     paddingBottom: moderateScale(20),
//   },
//   endOfListContainer: {
//     paddingVertical: moderateScale(20),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   endOfListText: {
//     fontSize: moderateScale(14),
//     fontFamily: Fonts.InstrumentSansMedium,
//     color: Colors.gray,
//   },
// });

// export default memo(QuestionListData);
// *****************************************
