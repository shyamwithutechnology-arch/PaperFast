import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
  ScrollView,
} from "react-native";
import { styles } from "./styles";
import { Icons } from "../../../../../assets/icons";
import { moderateScale } from "../../../../../utils/responsiveSize";
import { Colors } from "../../../../../theme";
import SupPower from "../../../../../component/SupPower";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

/* ===== TYPES ===== */
interface Question {
  id: string;
  label: string;
}

interface Chapter {
  id: number;
  title: string;
  chapterName: string;
  questions: Question[];
}

type SelectedSummary = {
  chapterId: number;
  questionId: string;
  questionMarks: string;
  selectedQuestions: number[];
};

interface Props {
  data: Chapter[];
  // handleNavigate: () => void
  handleNavigate: (payload: {
    chapterId: number;
    questionId: string;
    questionMarks: string;
    label: string;
    selectedQuestions: any[];
  }) => void;
  activeChapterId: number | null;
  selectedSummary?: SelectedSummary;
}

/* ===== COMPONENT ===== */
const Paperselectcontent: React.FC<Props> = ({ data, handleNavigate, activeChapterId, selectedSummary }) => {
  const chapterData = useSelector((state: any) => state?.pdfQuestions);
  const userRole = useSelector((state: any) => state?.userRole?.role);
  const navigation = useNavigation()
  // const [activeId, setActiveId] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<number | null>(activeChapterId);

  useEffect(() => {
    setActiveId(activeChapterId);
  }, [activeChapterId]);

  const toggle = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveId(prev => (prev === id ? null : id));
  };

  if (!data?.length) {
    return <Text style={{ textAlign: "center", fontSize: moderateScale(14), color: Colors.black }}>No Data</Text>;
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.white, marginTop: moderateScale(15) }}>
      {data?.map((item, chapterIndex) => {
        const isOpen = activeId === chapterIndex;
        console.log('itemfffffff', item);

        return (
          <View key={chapterIndex} style={styles.wrapper}>
            {/* TITLE */}
            {/* <View style={{borderWidth:1, paddingVertical:moderateScale(1)}}> */}
            <TouchableOpacity
              style={styles.titleBox}
              activeOpacity={0.8}
              // onPress={() => {(
              //  userRole === 'tutor' && toggle(chapterIndex)
              //   userRole === 'student' &&  navigation.navigate('QuestionListScreen'))}
              //   }>
              onPress={() => {
                if (userRole === 'tutor') {
                  toggle(chapterIndex)
                } else if (userRole === 'student') {
                  navigation.navigate('QuestionListScreen', {chapterName:item?.question_chapter})
                }
              }}
            >
              <View>
                <Text style={styles.title}>{item?.question_chapter}</Text>
                {userRole === 'tutor' && <Text style={styles.chaptName}>
                  Chap 0{chapterIndex + 1}
                </Text>}
                {userRole === 'student' && <Text style={[styles.chaptName, { color: Colors.black }]}>
                 Q - {item?.question_count}
                </Text>}
              </View>
              {/* {
  chapterData?.map((item, index) => (
    <Text key={index} style={{color: '#000'}}>
      {item?.questionNumbers?.length || 0}
    </Text>
  ))
} */}
              <Image
                source={Icons.downArrow}
                style={[
                  styles.arrow,
                  { transform: [{ rotate: isOpen ? "180deg" : "272deg" }] },
                ]}
              />
            </TouchableOpacity>
            {/* </View> */}

            {/* CONTENT */}
            {userRole === 'tutor' && isOpen && (
              <View style={styles.contentBox}>
                {item?.questions?.map((question, qIndex) => {
                  const isLast = qIndex === item?.questions?.length - 1;
                  // console.log('maaaaaaaaa', question)

                  return (
                    <View key={question?.id}>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        onPress={() => {
                          // Find matching chapter
                          const matchingChapter = chapterData?.chapters?.find(
                            (chap: any) => chap?.chapterId === chapterIndex && chap?.questionTypeId === question?.id
                          );
                          handleNavigate({
                            chapterId: chapterIndex,
                            questionId: question?.id,
                            questionMarks: question?.questioncount,
                            label: question?.label,
                            selectedQuestions: matchingChapter?.selectedQuestions || []
                          });
                        }}>
                        <Text style={styles.itemText}>
                          {question?.id}. {question?.label}
                        </Text>
                        {/* {question.id === selectedSummary.questionId ? } */}
                        <Text style={styles.questionSelectText}>
                          Q - {question?.questioncount}
                          {/* {selectedSummary && selectedSummary?.chapterId === chapterIndex && question?.id === selectedSummary?.questionId ? selectedSummary?.selectedQuestions?.length ?? 0 : 0} */}
                        </Text>
                      </TouchableOpacity>
                      {/* 
                      <View style={{flexDirection:"row", borderWidth:1}}>
                      {question.id === selectedSummary.questionId && 
                      <View style={styles.mcqBox}>
                        {selectedSummary?.selectedQuestions.map(item => {
                          return (
                            <View style={styles.powerRow} key={item}>
                              <Text style={styles.baseText}>{item}</Text>
                              <SupPower>{selectedSummary?.questionMarks}</SupPower>
                            </View>
                          )
                        })}
                      </View>
                      }</View> */}

                      {/* {
                        chapterData?.chapters?.map((chap: any) => {
                          (chap.chapterId === chapterIndex) && (
                            <View style={styles.mcqBox}>
                          {selectedSummary?.selectedQuestions?.map(item => (
                            <View key={item} style={styles.powerRow}>
                              <Text style={styles.baseText}>{item}</Text>
                              <SupPower>
                                {selectedSummary?.questionMarks}
                                1
                              </SupPower>
                            </View>
                          ))}
                        </View>
                          )
                        }} */}

                      {/* {
            chapterData?.chapters?.map((chap: any) => {
    // Check if this chapter matches the current chapterIndex
    if (chap?.chapterId === chapterIndex) {
      // Find if there's a matching question type in this chapter
      // const matchingQuestionType = chap?.selectedQuestions?.find(
      //   (q: any) => q.id === selectedSummary?.questionId
      // );
      // console.log('dddddd', matchingQuestionType );
      (chap?.questionTypeId === question?.id) && (
      // if (matchingQuestionType && selectedSummary?.selectedQuestions?.length > 0) {
        return (
          // <View style={styles.mcqBox} key={`${chapterIndex}-${selectedSummary.questionId}`}>
          <View style={styles.mcqBox} key={`${chapterIndex}`}>
            {selectedSummary?.selectedQuestions.map((item, idx) => (
              <View key={`${item}-${idx}`} style={styles.powerRow}>
                <Text style={styles.baseText}>{item}</Text>
                <SupPower>
                  {selectedSummary?.questionMarks || '1'}
                </SupPower>
              </View>
            ))}
          </View>
        )
      )
      // }
    }
    return null; // Don't return anything if condition not met
  })
} */}

                      {
                        chapterData?.chapters?.map((chap: any) => {
                          // Check if this chapter matches the current chapterIndex
                          if (chap?.chapterId === chapterIndex) {
                            // Check if this chapter has the matching question type
                            if (chap?.questionTypeId === question?.id) {
                              console.log('selectedSummary', chap?.questionNumbers)

                              return (
                                <View style={styles.mcqBox} key={`${chapterIndex}-${question?.id}`}>
                                  {/* {(chap?.questionNumbers || selectedSummary?.selectedQuestions)?.map((item, idx) => ( */}
                                  {(chap?.questionNumbers)?.map((item, idx) => (
                                    <View key={`${item}-${idx}`} style={styles.powerRow}>
                                      <Text style={styles.baseText}>{item}</Text>
                                      {/* <SupPower>
                  {selectedSummary?.questionMarks || '1'}
                </SupPower> */}
                                    </View>
                                  ))}
                                </View>
                              );
                            }
                          }
                          return null;
                        })
                      }
                      {/* {question?.id === selectedSummary?.questionId && selectedSummary?.chapterId === chapterIndex && (
                        <View style={styles.mcqBox}>
                          {selectedSummary?.selectedQuestions?.map(item => (
                            <View key={item} style={styles.powerRow}>
                              <Text style={styles.baseText}>{item}</Text>
                              <SupPower>
                                {selectedSummary?.questionMarks}
                                1
                              </SupPower>
                            </View>
                          ))}
                        </View>
                      )} */}

                      {!isLast && (
                        <View
                          style={{
                            height: moderateScale(1),
                            backgroundColor: "rgba(0,140,227,0.12)",
                          }}
                        />
                      )}
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Paperselectcontent;