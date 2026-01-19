// import React, { useState } from "react";
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     LayoutAnimation,
//     Platform,
//     UIManager,
//     Image,
//     ScrollView,
// } from "react-native";
// import { styles } from "./styles";
// import { Icons } from "../../../../../assets/icons";
// import { moderateScale } from "../../../../../utlis/responsiveSize";
// import { Colors } from "../../../../../theme";
// import SupPower from "../../../../../component/SupPower";
// // import SupPower from "../../component";
// if (Platform.OS === "android") {
//     UIManager.setLayoutAnimationEnabledExperimental?.(true);
// }

// // const Paperselectcontent = () => {
// //   const [activeId, setActiveId] = useState<number | null>(null);

// //   const toggle = (id: number) => {
// //     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
// //     setActiveId(activeId === id ? null : id);
// //   };
// // const DATA = [
// //   {
// //     id: 1,
// //     title: "NCERT",
// //     content: ["Chapter 1", "Chapter 2", "Chapter 3"],
// //   },
// //   {
// //     id: 2,
// //     title: "Exemplar",
// //     content: ["Chapter 1", "Chapter 2"],
// //   },
// //   {
// //     id: 3,
// //     title: "RD Sharma",
// //     content: ["Exercise 1", "Exercise 2", "Exercise 3"],
// //   },
// // ];

// //   return (
// //     <View>
// //       {DATA.map(item => {
// //         const isOpen = activeId === item.id;

// //         return (
// //           <View key={item.id} style={styles.card}>
// //             {/* HEADER BUTTON */}
// //             <TouchableOpacity
// //               style={styles.header}
// //               activeOpacity={0.8}
// //               onPress={() => toggle(item.id)}
// //             >
// //               <Text style={styles.title}>{item.title}</Text>

// //               <Image
// //                 source={Icons.downArrow}
// //                 style={[
// //                   styles.arrow,
// //                   { transform: [{ rotate: isOpen ? "180deg" : "0deg" }] },
// //                 ]}
// //               />
// //             </TouchableOpacity>

// //             {/* EXPAND CONTENT */}
// //             {isOpen && (
// //               <View style={styles.content}>
// //                 {item.content.map((text, index) => (
// //                     <View style={styles.innerContent}>
// //                   <Text key={index} style={styles.itemText}>
// //                     • {text}
// //                   </Text>
// //                   </View>
// //                 ))}
// //               </View>
// //             )}
// //           </View>
// //         );
// //       })}
// //     </View>
// //   );
// // };
// export interface ListItem {
//   id: number;
//   title: string;
//   chapterName?: string;
// }

// const Paperselectcontent = ({DATA}) => {
//     console.log('daaaaaa', DATA);

//     const [activeId, setActiveId] = useState<number | null>(null);

//     const toggle = (id: number) => {
//         LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//         setActiveId(activeId === id ? null : id);
//     };
//     // const DATA = [
//     //     {
//     //         id: 1,
//     //         title: "Number System",
//     //         chapterName: 'Chap 01',
//     //         content: ["Chapter 1", "Chapter 2", "Chapter 3"],
//     //         contentt: [{ id: 1, questionTitle: 'A . M.C.Q' }, { id: 2, questionTitle: 'B. Very short answer type question ' }, { id: 3, questionTitle: 'C. Ques-Ans (Each of 2 Mark)' }, { id: 4, questionTitle: 'D. Ques-Ans (Each of 3 Mark)' }]
//     //     },
//     //     {
//     //         id: 2,
//     //         title: "Polynomials",
//     //         content: ["Chapter 1", "Chapter 2"],
//     //         chapterName: 'Chap 02',
//     //         contentt: [{ id: 1, questionTitle: 'A . M.C.Q' }, { id: 2, questionTitle: 'B. Very short answer type question ' }, { id: 3, questionTitle: 'C. Ques-Ans (Each of 2 Mark)' }, { id: 4, questionTitle: 'D. Ques-Ans (Each of 3 Mark)' }]

//     //     },
//     //     {
//     //         id: 3,
//     //         title: "Coordinate Geometry",
//     //         content: ["Exercise 1", "Exercise 2", "Exercise 3"],
//     //         chapterName: 'Chap 03',
//     //         contentt: [{ id: 1, questionTitle: 'A . M.C.Q' }, { id: 2, questionTitle: 'B. Very short answer type question ' }, { id: 3, questionTitle: 'C. Ques-Ans (Each of 2 Mark)' }, { id: 4, questionTitle: 'D. Ques-Ans (Each of 3 Mark)' }]
//     //     },
//     //     {
//     //         id: 4,
//     //         title: "Linear Equations in Two Variables",
//     //         content: ["Exercise 1", "Exercise 2", "Exercise 3"],
//     //         chapterName: 'Chap 04',
//     //         contentt: [{ id: 1, questionTitle: 'A . M.C.Q' }, { id: 2, questionTitle: 'B. Very short answer type question ' }, { id: 3, questionTitle: 'C. Ques-Ans (Each of 2 Mark)' }, { id: 4, questionTitle: 'D. Ques-Ans (Each of 3 Mark)' }]

//     //     },
//     //     {
//     //         id: 5,
//     //         title: "Introduction to Eucklid Geometry",
//     //         content: ["Exercise 1", "Exercise 2", "Exercise 3"],
//     //         chapterName: 'Chap 04',
//     //         contentt: [{ id: 1, questionTitle: 'A . M.C.Q' }, { id: 2, questionTitle: 'B. Very short answer type question ' }, { id: 3, questionTitle: 'C. Ques-Ans (Each of 2 Mark)' }, { id: 4, questionTitle: 'D. Ques-Ans (Each of 3 Mark)' }]
//     //     },
//     //     {
//     //         id: 6,
//     //         title: "Linear Equations in Two Variables",
//     //         content: ["Exercise 1", "Exercise 2", "Exercise 3"],
//     //         chapterName: 'Chap 04',
//     //         contentt: [{ id: 1, questionTitle: 'A . M.C.Q' }, { id: 2, questionTitle: 'B. Very short answer type question ' }, { id: 3, questionTitle: 'C. Ques-Ans (Each of 2 Mark)' }, { id: 4, questionTitle: 'D. Ques-Ans (Each of 3 Mark)' }]

//     //     },
//     //     {
//     //         id: 7,
//     //         title: "Introduction to Eucklid Geometry",
//     //         content: ["Exercise 1", "Exercise 2", "Exercise 3"],
//     //         chapterName: 'Chap 04',
//     //         contentt: [{ id: 1, questionTitle: 'A . M.C.Q' }, { id: 2, questionTitle: 'B. Very short answer type question ' }, { id: 3, questionTitle: 'C. Ques-Ans (Each of 2 Mark)' }, { id: 4, questionTitle: 'D. Ques-Ans (Each of 3 Mark)' }]
//     //     },
//     // ];




//     const headerButton = [
//         {
//             id: 1,
//             title: "NCERT",
//         },
//         {
//             id: 2,
//             title: "Exemplar",
//         },
//         {
//             id: 3,
//             title: "RD Sharma",
//         },
//     ];
//     return (
//         <ScrollView style={{ flex: 1, backgroundColor: Colors.white }}>
//             {DATA?.map(item => {
//                 const isOpen = activeId === item.id;
//                 return (
//                     <View key={item.id} style={styles.wrapper}>
//                         {/* TITLE BOX */}
//                         <TouchableOpacity
//                             style={styles.titleBox}
//                             activeOpacity={0.8}
//                             onPress={() => toggle(item.id)}>
//                             <View>
//                                 <Text style={styles.title}>{item.title}</Text>
//                                 <Text style={styles.chaptName}>{item.chapterName}</Text>
//                             </View>
//                             <Image
//                                 source={Icons.downArrow}
//                                 style={[
//                                     styles.arrow,
//                                     { transform: [{ rotate: isOpen ? "180deg" : "0deg" }] },
//                                 ]}
//                             />
//                         </TouchableOpacity>

//                         {/* CONTENT BOX */}
//                         {isOpen && (
//                             <View style={styles.contentBox}>
//                                 {item.questions.map((question, index) => {
//                                     let lastItem = questions?.length
//                                     console.log('logggg');

//                                     return (
//                                         <View>
//                                             <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
//                                                 <Text key={question.id} style={styles.itemText}>
//                                                     {/* •  */}
//                                                     {question?.questionTitle}
//                                                 </Text>
//                                                 <Text style={styles.questionSelectText}>2</Text>
//                                             </TouchableOpacity>
//                                             <View style={styles.mcqBox}>
//                                                 <View style={styles.powerRow}>
//                                                     <Text style={styles.baseText}>2</Text>
//                                                     <SupPower>4</SupPower>
//                                                 </View>

//                                             </View>
//                                             {<View style={{ height: moderateScale(1.2), backgroundColor: 'rgba(0, 140, 227, 0.12)' }} />
//                                             }
//                                         </View>
//                                     )
//                                 })}
//                             </View>
//                         )}

//                     </View>
//                 );
//             })}
//         </ScrollView>
//     );
// };

// export default Paperselectcontent;


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
import { moderateScale } from "../../../../../utlis/responsiveSize";
import { Colors } from "../../../../../theme";
import SupPower from "../../../../../component/SupPower";

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
  }) => void;
  activeChapterId: number | null;
  selectedSummary?: SelectedSummary;
}

/* ===== COMPONENT ===== */
const Paperselectcontent: React.FC<Props> = ({ data, handleNavigate, activeChapterId, selectedSummary }) => {

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

  console.log('selectedSummary', selectedSummary)
  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.white }}>
      {data.map(item => {
        const isOpen = activeId === item.id;
        return (
          <View key={item.id} style={styles.wrapper}>
            {/* TITLE */}
            <TouchableOpacity
              style={styles.titleBox}
              activeOpacity={0.8}
              onPress={() => toggle(item.id)}
            >
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.chaptName}>{item.chapterName}</Text>
              </View>

              <Image
                source={Icons.downArrow}
                style={[
                  styles.arrow,
                  { transform: [{ rotate: isOpen ? "180deg" : "0deg" }] },
                ]}
              />
            </TouchableOpacity>

            {/* CONTENT */}
            {isOpen && (
              <View style={styles.contentBox}>
                {item.questions.map((question, index) => {
                  const isLast = index === item.questions.length - 1;
                  // console.log('maaaaaaaaa', question)

                  return (
                    <View key={question.id}>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                        // onPress={handleNavigate}
                        onPress={() =>
                          handleNavigate({
                            chapterId: item.id,
                            questionId: question.id,
                            questionMarks: question.questionMarks,
                            label: question.label,
                          })
                        }
                      >
                        <Text style={styles.itemText}>
                          {question?.id}. {question.label}
                        </Text>
                        {/* {question.id === selectedSummary.questionId ? } */}
                        <Text style={styles.questionSelectText}>{selectedSummary && selectedSummary?.chapterId === item.id && question.id === selectedSummary.questionId ? selectedSummary?.selectedQuestions?.length ?? 0 : 0}
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
                      {question.id === selectedSummary?.questionId && selectedSummary?.chapterId === item.id && (
                        <View style={styles.mcqBox}>
                          {selectedSummary?.selectedQuestions?.map(item => (
                            <View key={item} style={styles.powerRow}>
                              <Text style={styles.baseText}>{item}</Text>
                              <SupPower>{selectedSummary.questionMarks}</SupPower>
                            </View>
                          ))}
                        </View>
                      )}

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
