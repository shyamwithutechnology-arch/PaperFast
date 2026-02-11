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
    selectedQuestions:any[];
  }) => void;
  activeChapterId: number | null;
  selectedSummary?: SelectedSummary;
}

/* ===== COMPONENT ===== */
const Paperselectcontent: React.FC<Props> = ({ data, handleNavigate, activeChapterId, selectedSummary }) => {
  const chapterData = useSelector((state: any) => state?.pdfQuestions); 
  // console.log('cah',chapterData);
  
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
    <ScrollView style={{ flex: 1, backgroundColor: Colors.white, marginTop:moderateScale(15) }}>
      {data.map((item, chapterIndex) => {
        const isOpen = activeId === chapterIndex;
        return (
          <View key={chapterIndex} style={styles.wrapper}>
            {/* TITLE */}
            {/* <View style={{borderWidth:1, paddingVertical:moderateScale(1)}}> */}
            <TouchableOpacity
              style={styles.titleBox}
              activeOpacity={0.8}
              onPress={() => toggle(chapterIndex)}
             >
              <View>
                <Text style={styles.title}>{item?.question_chapter}</Text>
                <Text style={styles.chaptName}>Chap 0{chapterIndex + 1}</Text>
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
            {isOpen && (
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
                          {question?.questioncount}
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
          console.log('selectedSummary',chap?.questionNumbers)

        return (
          <View style={styles.mcqBox} key={`${chapterIndex}-${question?.id}`}>
            {/* {(chap?.questionNumbers || selectedSummary?.selectedQuestions)?.map((item, idx) => ( */}
            {(chap?.questionNumbers )?.map((item, idx) => (
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


// Paperselectcontent.tsx
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   LayoutAnimation,
//   Platform,
//   UIManager,
//   Image,
//   ScrollView,
// } from "react-native";
// import { styles } from "./styles";
// import { Icons } from "../../../../../assets/icons";
// import { moderateScale } from "../../../../../utils/responsiveSize";
// import { Colors } from "../../../../../theme";
// import SupPower from "../../../../../component/SupPower";

// if (Platform.OS === "android") {
//   UIManager.setLayoutAnimationEnabledExperimental?.(true);
// }

// interface ChapterSummary {
//   chapterId: number;
//   questionTypeId: string;
//   questionMarks: string;
//   label: string;
//   selectedQuestions: any[];
//   questionNumbers: number[];
//   chapterTitle: string;
// }

// interface Props {
//   data: any[];
//   handleNavigate: (payload: {
//     chapterId: number;
//     questionId: string;
//     questionMarks: string;
//     label: string;
//     chapterTitle: string;
//   }) => void;
//   activeChapterId: number | null;
//   selectedSummary?: SelectedSummarys;
//   chaptersSummary: ChapterSummary[]; // From Redux
// }

// const Paperselectcontent: React.FC<Props> = ({ 
//   data, 
//   handleNavigate, 
//   activeChapterId, 
//   selectedSummary,
//   chaptersSummary 
// }) => {
//   const [activeId, setActiveId] = useState<number | null>(activeChapterId);

//   useEffect(() => {
//     setActiveId(activeChapterId);
//   }, [activeChapterId]);

//   const toggle = (id: number) => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setActiveId(prev => (prev === id ? null : id));
//   };

//   // Get summary for a specific chapter and question type
//   const getChapterSummary = (chapterIndex: number, questionId: string) => {
//     return chaptersSummary.find(
//       chap => chap.chapterId === chapterIndex && chap.questionTypeId === questionId
//     );
//   };

//   if (!data?.length) {
//     return <Text style={{ textAlign: "center", fontSize: moderateScale(14), color: Colors.black }}>No Data</Text>;
//   }

//   return (
//     <ScrollView style={{ flex: 1, backgroundColor: Colors.white, marginTop: moderateScale(15) }}>
//       {data.map((item, chapterIndex) => {
//         const isOpen = activeId === chapterIndex;
        
//         return (
//           <View key={chapterIndex} style={styles.wrapper}>
//             {/* TITLE */}
//             <TouchableOpacity
//               style={styles.titleBox}
//               activeOpacity={0.8}
//               onPress={() => toggle(chapterIndex)}
//             >
//               <View>
//                 <Text style={styles.title}>{item?.question_chapter}</Text>
//                 <Text style={styles.chaptName}>Chap 0{chapterIndex + 1}</Text>
//               </View>

//               <Image
//                 source={Icons.downArrow}
//                 style={[
//                   styles.arrow,
//                   { transform: [{ rotate: isOpen ? "180deg" : "272deg" }] },
//                 ]}
//               />
//             </TouchableOpacity>

//             {/* CONTENT */}
//             {isOpen && (
//               <View style={styles.contentBox}>
//                 {item?.questions?.map((question, qIndex) => {
//                   const isLast = qIndex === item?.questions?.length - 1;
//                   const chapterSummary = getChapterSummary(chapterIndex, question?.id)
//                   return (
//                     <View key={question?.id}>
//                       <TouchableOpacity
//                         style={{
//                           flexDirection: "row",
//                           justifyContent: "space-between",
//                           alignItems: "center",
//                         }}
//                         onPress={() =>
//                           handleNavigate({
//                             chapterId: chapterIndex,
//                             questionId: question?.id,
//                             questionMarks: question?.questioncount,
//                             label: question?.label,
//                             chapterTitle: item?.question_chapter || `Chapter ${chapterIndex + 1}`,
//                           })
//                         }
//                       >
//                         <Text style={styles.itemText}>
//                           {question?.id}. {question?.label}
//                         </Text>
//                         <Text style={styles.questionSelectText}>
//                           {chapterSummary ? chapterSummary.selectedQuestions.length : 0}
//                         </Text>
//                       </TouchableOpacity>

//                       {/* Show selected questions for this chapter and question type */}
//                       {chapterSummary && chapterSummary.selectedQuestions.length > 0 && (
//                         <View style={styles.mcqBox}>
//                           {chapterSummary.questionNumbers.map((num, index) => (
//                             <View key={`${num}-${index}`} style={styles.powerRow}>
//                               <Text style={styles.baseText}>{num}</Text>
//                               <SupPower>
//                                 {chapterSummary.questionMarks || '1'}
//                               </SupPower>
//                             </View>
//                           ))}
//                         </View>
//                       )}

//                       {/* Also show if coming from selectedSummary (immediate selection) */}
//                       {selectedSummary && 
//                        selectedSummary.chapterId === chapterIndex && 
//                        selectedSummary.questionId === question?.id && 
//                        selectedSummary.selectedQuestions.map((num, index) => (
//                          <View key={`temp-${num}-${index}`} style={styles.mcqBox}>
//                            <View style={styles.powerRow}>
//                              <Text style={styles.baseText}>{num}</Text>
//                              <SupPower>
//                                {selectedSummary.questionMarks || '1'}
//                              </SupPower>
//                            </View>
//                          </View>
//                        ))}

//                       {!isLast && (
//                         <View
//                           style={{
//                             height: moderateScale(1),
//                             backgroundColor: "rgba(0,140,227,0.12)",
//                           }}
//                         />
//                       )}
//                     </View>
//                   );
//                 })}
//               </View>
//             )}
//           </View>
//         );
//       })}
//     </ScrollView>
//   );
// };

// export default Paperselectcontent;
