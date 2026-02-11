import React, { useCallback, useEffect, useState } from "react";
import { View, StatusBar, TouchableOpacity, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../theme";
import HeaderPaperModule from "../../../component/headerpapermodule/Headerpapermodule";
import Paperselectcontent from "./component/paperselectcontent/Paperselectcontent";
import { styles } from "./styles";
import { moderateScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { localStorage, storageKeys } from "../../../storage/storage";
import { showToast } from "../../../utils/toast";
import { GET, POST_FORM } from "../../../api/request";
import { ApiEndPoint } from "../../../api/endPoints";
import Loader from "../../../component/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearPDFQuestions } from "../../../redux/slices/pdfQuestionsSlice";

type SelectedSummary = {
    chapterId: number;
    questionId: string;
    questionMarks: string;
    selectedQuestions: number[];
};
type Book = {
    book_id: string,
    book_name: string
}
const PaperSelect = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const route = useRoute();
    const [loading, setLoading] = useState<boolean>(false);
    const [book, setBook] = useState<Book[]>([]);
    const [chapterData, setChapterData] = useState<any>([]);
    const [subjectName, setSubjectName] = useState<string | null>('')
    const chapter = useSelector((state: any) => state?.pdfQuestions?.allQuestions); 
          const hasQuestions = chapter?.length > 0;
    const selectedSummary = route.params?.selectedSummary as
        | SelectedSummary
        | undefined;
    const [activeChapterId, setActiveChapterId] = useState<number | null>(
        selectedSummary?.chapterId ?? null
    );

    // const handleBack = async () => {
    //     await localStorage.removeItem(storageKeys?.selectedPaperType)
    //     // navigation.goBack();
    //   hasQuestions &&  Alert.alert(
    //         'Clear',
    //         'Are you sure you want to Clear Data?',
    //         [
    //             {
    //                 text: 'Cancel',
    //                 style: 'cancel',
    //             },
    //             {
    //                 text: 'Clear',
    //                 style: 'destructive',
    //                 onPress: async () => {
    //                     try {
    //                         await dispatch(clearPDFQuestions());
    //                         navigation.navigate('PaperTypeScreen')
    //                     } catch (error) {
    //                         console.log('Clear error:', error);
    //                     }
    //                 },
    //             },
    //         ],
    //         { cancelable: true }
    //     )
    // }
    const handleBack = () => {
    localStorage.removeItem(storageKeys?.selectedPaperType);
    if (hasQuestions) {
        Alert.alert(
            'Clear',
            'Are you sure you want to Clear Data?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => navigation.goBack() // Add this if you want to go back on cancel
                },
                {
                    text: 'Clear',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await dispatch(clearPDFQuestions());
                            navigation.navigate('PaperTypeScreen');
                        } catch (error) {
                            console.log('Clear error:', error);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    } else {
        navigation.goBack(); // or navigation.navigate('PaperTypeScreen')
    }
};
    type PaperType = 'NCERT' | 'EXEMPLAR' | 'RD_SHARMA';

    const [selectedPaper, setSelectedPaper] = useState<PaperType>('NCERT');
    console.log('selectedPaper', selectedPaper);
    const [paperHeader, setPaperHeader] = useState<PaperType>('Regular Paper');

    const handleSelectPaper = (id: string) => {
        setSelectedPaper(id)
    }
    const handleQuestionSelect = (payload) => {
        navigation.navigate('QuestionScreen', {
            ...payload,
        });
    }
    const handleSelectedPaper = (id: PaperType) => {
        setSelectedPaper(id)
    }

    // bookFetch
    const handleFetchBook = async () => {
        setLoading(true);
        try {
            const response = await GET(ApiEndPoint?.bookFetch);
            // console.log('resssssssbook', response);
            if (response?.status === 200) {
                setBook(response?.result || []);
            } else {
                showToast('error', 'Error', response?.msg || 'Profile not found');
                setBook([]);
            }
        } catch (error) {
            if (error.offline) {
                return
            }
            showToast('error', 'Error', 'Something went wrong')
        } finally {
            setLoading(false);
        }
    };
    const selectBtn = [
        { id: 1, title: "NCERT", key: "NCERT" },
        { id: 2, title: "Exemplar", key: "EXEMPLAR" },
        { id: 3, title: "RD Sharma", key: "RD_SHARMA" },
    ];

    const PAPER_DATA = {
        NCERT: [
            {
                id: 1,
                title: "Number System",
                chapterName: "Chap 01",
                questions: [
                    { id: "A", label: "M.C.Q (1 Marks)", questionMarks: '1' },
                    { id: "B", label: "Very short answer type  (2 Marks)", questionMarks: '2' },
                    { id: "C", label: "Ques-Ans (Each of 3 Mark)", questionMarks: '3' },
                    { id: "D", label: "Ques-Ans (Each of 4 Mark)", questionMarks: '4' },
                ],
            },
            {
                id: 2,
                title: "Polynomials",
                chapterName: "Chap 02",
                questions: [
                    { id: "A", label: "M.C.Q (1 Marks)", questionMarks: '1' },
                    { id: "B", label: "Very short answer type  (2 Marks)", questionMarks: '2' },
                    { id: "C", label: "Ques-Ans (Each of 3 Mark)", questionMarks: '3' },
                    { id: "D", label: "Ques-Ans (Each of 4 Mark)", questionMarks: '4' },
                ],
            },
            {
                id: 3,
                title: "Trigonomatery ",
                chapterName: "Chap 03",
                questions: [
                    { id: "A", label: "M.C.Q (1 Marks)", questionMarks: '1' },
                    { id: "B", label: "Very short answer type  (2 Marks)", questionMarks: '2' },
                    { id: "C", label: "Ques-Ans (Each of 3 Mark)", questionMarks: '3' },
                    { id: "D", label: "Ques-Ans (Each of 4 Mark)", questionMarks: '4' },
                ],
            },
            {
                id: 4,
                title: "Probability",
                chapterName: "Chap 04",
                questions: [
                    { id: "A", label: "M.C.Q (1 Marks)", questionMarks: '1' },
                    { id: "B", label: "Very short answer type  (2 Marks)", questionMarks: '2' },
                    { id: "C", label: "Ques-Ans (Each of 3 Mark)", questionMarks: '3' },
                    { id: "D", label: "Ques-Ans (Each of 4 Mark)", questionMarks: '4' },
                ],
            },
        ],
        EXEMPLAR: [
            {
                id: 1,
                title: "Number System (Exemplar)",
                chapterName: "Unit 01",
                questions: [
                    { id: "A", label: "Objective Questions ( 3 Mark)" },
                    { id: "B", label: "Short Answer" },
                    { id: "C", label: "Numerical Problems" },
                ],
            },
            {
                id: 2,
                title: "Polynomials (Exemplar)",
                chapterName: "Unit 02",
                questions: [
                    { id: "A", label: "Objective Questions ( 3 Mark)" },
                    { id: "B", label: "Short Answer" },
                    { id: "C", label: "Numerical Problems" },
                ],
            },
        ],
        RD_SHARMA: [
            {
                id: 1,
                title: "Number System",
                chapterName: "Chapter 1",
                questions: [
                    { id: "A", label: "Exercise 1A ( 3 Mark)" },
                    { id: "B", label: "Exercise 1B" },
                    { id: "C", label: "MCQ" },
                    { id: "D", label: "Practice Set" },
                ],
            },
            {
                id: 2,
                title: "Coordinate Geometry",
                chapterName: "Chapter 3",
                questions: [
                    { id: "A", label: "Graphs" },
                    { id: "B", label: "Distance Formula" },
                    { id: "C", label: "Practice Problems" },
                ],
            },
        ],
    };


    // Clear when going back
    //   const handleBack = () => {
    //     // CLEAR: Remove all data
    //     dispatch(clearPDFQuestions());
    //     navigation.goBack();
    //   };

    // Also clear when component unmounts
    React.useEffect(() => {
        return () => {
            dispatch(clearPDFQuestions());
        };
    }, [dispatch]);

    const handleChapterFetch = async (data) => {
        setLoading(true)
        try {
            const params = {
                'board_id': data?.boardId,
                'medium_id': data?.mediumId,
                // 'class_id': data?.standardId,
                'subject_id': data?.subjectId,
            }
            // console.log('paramssssssssss', params);
            const response = await POST_FORM(ApiEndPoint?.questionChapter, params);
            // console.log('wwwwwwwwwwwwwww', response)
            if (response?.status === 200) {
                setChapterData(response?.result || [])
            } else {
                showToast('error', 'Error', response.msg || "Chapter fetch faild")
                setChapterData([])
            }
        } catch (error) {
            if (error?.offline) {
                return;
            }
            showToast('error', 'Error', error.msg || 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }
     
console.log('chapter?.selectedQuestions?.length',chapter);

    useFocusEffect(
        useCallback(() => {
            navigation.getParent()?.setOptions({
                tabBarStyle: { display: 'none' },
            })

            return () => {
                navigation.getParent()?.setOptions({
                    tabBarStyle: { display: 'flex' },
                });
            };
        }, []))

    // useEffect(() => {
    //     const handlePaperType = async () => {
    //         const data = await localStorage.getItem(storageKeys.selectedPaperType);
    //         const boardId = await localStorage.getItem(storageKeys.boardId);
    //         const mediumId = await localStorage.getItem(storageKeys.selectedMediumId)
    //         const standardId = await localStorage.getItem(storageKeys.selectedStandardId)
    //         const subjectId = await localStorage.getItem(storageKeys.selectedSubject)
    //         setPaperHeader(data || '');
    //         await handleFetchBook();
    //         await handleChapterFetch({boardId, mediumId,standardId,subjectId})
    //     }
    //     handlePaperType()
    // }, [])
    useEffect(() => {
        let isMounted = true; // To prevent state updates on unmounted component

        const handlePaperType = async () => {
            try {
                const data = await localStorage.getItem(storageKeys.selectedPaperType);
                const boardId = await localStorage.getItem(storageKeys.boardId);
                const mediumId = await localStorage.getItem(storageKeys.selectedMediumId);
                const standardId = await localStorage.getItem(storageKeys.selectedStandardId);
                const subjectId = await localStorage.getItem(storageKeys.selectedSubId);
                const subjectName = await localStorage.getItem(storageKeys.selectedSubject);
                setSubjectName(subjectName)
                if (isMounted) {
                    setPaperHeader(data || '');
                }

                await handleFetchBook();
                await handleChapterFetch({
                    boardId: boardId || '',
                    mediumId: mediumId || '',
                    standardId: standardId || '',
                    subjectId: subjectId || ''
                });

            } catch (error) {
                console.error('Error in handlePaperType:', error);
            }
        };

        handlePaperType();
        return () => {
            isMounted = false; // Cleanup on unmount
        };
    }, []); // Add dependencies if needed
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar
                backgroundColor={Colors.lightThemeBlue}
                barStyle="dark-content" />

            {/* HEADER + STATUS BAR SAME BACKGROUND */}
            <SafeAreaView edges={["top"]} style={{ backgroundColor: Colors.lightThemeBlue }}>
                <HeaderPaperModule titleStyle={{ fontSize: moderateScale(14) }} title={`${paperHeader}`} subjectName={`${subjectName}`} rightPress={() => { navigation.navigate('DraftPaperScreen') }} leftIconPress={handleBack} />
            </SafeAreaView>
            {/* MAIN CONTENT */}
            <SafeAreaView
                style={{ flex: 1, backgroundColor: Colors.white }}
                edges={["left", "right", "bottom"]}>
                <Loader visible={loading} />
                {/* <View style={styles.rowContainer}>
                    {book?.map(item => {
                        const isActive = selectedPaper === item?.book_name;
                        return (
                            <TouchableOpacity
                                key={item?.book_id}
                                style={[
                                    styles.selectBtnBox,
                                    {
                                        backgroundColor: isActive ? Colors.primaryColor : Colors.white,
                                        borderColor: isActive ? Colors.primaryColor : "#AFAFAF",
                                    },
                                ]}
                                onPress={() => handleSelectedPaper(item?.book_name as PaperType)}>
                                <Text
                                    style={[
                                        styles.selectBtnText,
                                        { color: isActive ? Colors.white : "#AFAFAF" },
                                    ]}>
                                    {item?.book_name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View> */}
                {/* <Paperselectcontent data={PAPER_DATA[selectedPaper]} handleNavigate={handleQuestionSelect} activeChapterId={activeChapterId} selectedSummary={selectedSummary} /> */}
                {/* <View style={{marginTop:moderateScale(20)}}> */}
                <Paperselectcontent data={chapterData} handleNavigate={handleQuestionSelect} activeChapterId={activeChapterId} selectedSummary={selectedSummary} />
                {/* </View> */}
                <View style={styles.totalWrapper}>
                    <View style={styles.topShadow} />
                    <View style={styles.totalMainBox}>
                        <View>
                            <Text style={styles.marksTotel}>11 Marks Total</Text>
                            <Text style={[styles.marksTotel, { fontSize: moderateScale(12) }]}>
                                1=3,2=0,3=0,4=2,5=0
                            </Text>
                        </View>
                        {/* {hasQuestions} */}
                        {/* <TouchableOpacity 
  style={styles.exportBox} 
  onPress={() => {
    
    if (hasQuestions) {
      navigation.navigate('QuestionScreen');
    } else {
      // Navigate to the MyPDF tab first, then to PDFDetailsScreen
      navigation.navigate('MyPDF', {
        screen: 'PDFDetailsScreen',
        params: {
          chapterId: chapter?.chapterId,
          questionTypeId: chapter?.questionTypeId,
          // ... other params
        }
      });
    }
  }}
></TouchableOpacity> */}
                     { hasQuestions && <TouchableOpacity style={styles.exportBox} onPress={() => {
                       navigation.navigate('MyPDF', {screen:'PDFDetailsScreen'});
                       }}>
                            <Text style={styles.exportText}>Export PDF</Text>
                            <Icon name='arrow-right-long' size={moderateScale(16)} color={Colors.white} />
                        </TouchableOpacity>}
                    </View>
                </View>
            </SafeAreaView>

        </View>
    );
};

export default PaperSelect;

// PaperSelect.tsx
// import React, { useCallback, useEffect, useState } from "react";
// import { View, StatusBar, TouchableOpacity, Text, Alert } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Colors } from "../../../theme";
// import HeaderPaperModule from "../../../component/headerpapermodule/Headerpapermodule";
// import Paperselectcontent from "./component/paperselectcontent/Paperselectcontent";
// import { styles } from "./styles";
// import { moderateScale } from "react-native-size-matters";
// import Icon from "react-native-vector-icons/FontAwesome6";
// import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
// import { localStorage, storageKeys } from "../../../storage/storage";
// import { showToast } from "../../../utils/toast";
// import { GET, POST_FORM } from "../../../api/request";
// import { ApiEndPoint } from "../../../api/endPoints";
// import Loader from "../../../component/loader/Loader";
// import { useDispatch, useSelector } from "react-redux";
// import { clearPDFQuestions } from "../../../redux/slices/pdfQuestionsSlice";

// type SelectedSummary = {
//     chapterId: number;
//     questionId: string;
//     questionMarks: string;
//     label: string;
//     selectedQuestions: number[];
//     chapterTitle?: string;
// };

// type Book = {
//     book_id: string,
//     book_name: string
// }

// const PaperSelect = () => {
//     const navigation = useNavigation()
//     const dispatch = useDispatch();
//     const route = useRoute();
    
//     // Get all selected questions from Redux
//     const { chapters, allQuestions } = useSelector((state: any) => state.pdfQuestions || { chapters: [], allQuestions: [] });
    
//     const [loading, setLoading] = useState<boolean>(false);
//     const [book, setBook] = useState<Book[]>([]);
//     const [chapterData, setChapterData] = useState<any>([]);
//     const [subjectName, setSubjectName] = useState<string | null>('')
    
//     const selectedSummary = route.params?.selectedSummary as SelectedSummary | undefined;
//     const [activeChapterId, setActiveChapterId] = useState<number | null>(
//         selectedSummary?.chapterId ?? null
//     );

//     // Calculate total marks
//     const calculateTotalMarks = () => {
//         let total = 0;
//         chapters.forEach(chapter => {
//             chapter.selectedQuestions.forEach(question => {
//                 total += question.question_marks || parseInt(chapter.questionMarks) || 0;
//             });
//         });
//         return total;
//     };

//     // Generate summary text
//     const generateSummaryText = () => {
//         const marksByType: Record<string, number> = {};
        
//         chapters.forEach(chapter => {
//             const key = chapter.questionMarks;
//             if (key) {
//                 marksByType[key] = (marksByType[key] || 0) + chapter.selectedQuestions.length;
//             }
//         });
        
//         return Object.entries(marksByType)
//             .map(([marks, count]) => `${marks}=${count}`)
//             .join(', ');
//     };

//     const handleBack = async () => {
//         Alert.alert(
//             'Clear',
//             'Are you sure you want to Clear Data?',
//             [
//                 {
//                     text: 'Cancel',
//                     style: 'cancel',
//                 },
//                 {
//                     text: 'Clear',
//                     style: 'destructive',
//                     onPress: async () => {
//                         try {
//                             await dispatch(clearPDFQuestions());
//                             navigation.navigate('PaperTypeScreen')
//                         } catch (error) {
//                             console.log('Clear error:', error);
//                         }
//                     },
//                 },
//             ],
//             { cancelable: true }
//         )
//     };

//     // ... other functions remain the same .

//     // const handleBack = async () => {
//     //     await localStorage.removeItem(storageKeys?.selectedPaperType)
//     //     // navigation.goBack();
//     //     Alert.alert(
//     //         'Clear',
//     //         'Are you sure you want to Clear Data?',
//     //         [
//     //             {
//     //                 text: 'Cancel',
//     //                 style: 'cancel',
//     //             },
//     //             {
//     //                 text: 'Clear',
//     //                 style: 'destructive',
//     //                 onPress: async () => {
//     //                     try {
//     //                         await dispatch(clearPDFQuestions());
//     //                         navigation.navigate('PaperTypeScreen')
//     //                     } catch (error) {
//     //                         console.log('Clear error:', error);
//     //                     }
//     //                 },
//     //             },
//     //         ],
//     //         { cancelable: true }
//     //     )
//     // }
//     type PaperType = 'NCERT' | 'EXEMPLAR' | 'RD_SHARMA';

//     const [selectedPaper, setSelectedPaper] = useState<PaperType>('NCERT');
//     console.log('selectedPaper', selectedPaper);
//     const [paperHeader, setPaperHeader] = useState<PaperType>('Regular Paper');

//     const handleSelectPaper = (id: string) => {
//         setSelectedPaper(id)
//     }
//     const handleQuestionSelect = (payload) => {
//         navigation.navigate('QuestionScreen', {
//             ...payload,
//         });
//     }
//     const handleSelectedPaper = (id: PaperType) => {
//         setSelectedPaper(id)
//     }

//     // bookFetch
//     const handleFetchBook = async () => {
//         setLoading(true);
//         try {
//             const response = await GET(ApiEndPoint?.bookFetch);
//             // console.log('resssssssbook', response);
//             if (response?.status === 200) {
//                 setBook(response?.result || []);
//             } else {
//                 showToast('error', 'Error', response?.msg || 'Profile not found');
//                 setBook([]);
//             }
//         } catch (error) {
//             if (error.offline) {
//                 return
//             }
//             showToast('error', 'Error', 'Something went wrong')
//         } finally {
//             setLoading(false);
//         }
//     };
//     // const selectBtn = [
//     //     { id: 1, title: "NCERT", key: "NCERT" },
//     //     { id: 2, title: "Exemplar", key: "EXEMPLAR" },
//     //     { id: 3, title: "RD Sharma", key: "RD_SHARMA" },
//     // ];

//     // const PAPER_DATA = {
//     //     NCERT: [
//     //         {
//     //             id: 1,
//     //             title: "Number System",
//     //             chapterName: "Chap 01",
//     //             questions: [
//     //                 { id: "A", label: "M.C.Q (1 Marks)", questionMarks: '1' },
//     //                 { id: "B", label: "Very short answer type  (2 Marks)", questionMarks: '2' },
//     //                 { id: "C", label: "Ques-Ans (Each of 3 Mark)", questionMarks: '3' },
//     //                 { id: "D", label: "Ques-Ans (Each of 4 Mark)", questionMarks: '4' },
//     //             ],
//     //         },
//     //         {
//     //             id: 2,
//     //             title: "Polynomials",
//     //             chapterName: "Chap 02",
//     //             questions: [
//     //                 { id: "A", label: "M.C.Q (1 Marks)", questionMarks: '1' },
//     //                 { id: "B", label: "Very short answer type  (2 Marks)", questionMarks: '2' },
//     //                 { id: "C", label: "Ques-Ans (Each of 3 Mark)", questionMarks: '3' },
//     //                 { id: "D", label: "Ques-Ans (Each of 4 Mark)", questionMarks: '4' },
//     //             ],
//     //         },
//     //         {
//     //             id: 3,
//     //             title: "Trigonomatery ",
//     //             chapterName: "Chap 03",
//     //             questions: [
//     //                 { id: "A", label: "M.C.Q (1 Marks)", questionMarks: '1' },
//     //                 { id: "B", label: "Very short answer type  (2 Marks)", questionMarks: '2' },
//     //                 { id: "C", label: "Ques-Ans (Each of 3 Mark)", questionMarks: '3' },
//     //                 { id: "D", label: "Ques-Ans (Each of 4 Mark)", questionMarks: '4' },
//     //             ],
//     //         },
//     //         {
//     //             id: 4,
//     //             title: "Probability",
//     //             chapterName: "Chap 04",
//     //             questions: [
//     //                 { id: "A", label: "M.C.Q (1 Marks)", questionMarks: '1' },
//     //                 { id: "B", label: "Very short answer type  (2 Marks)", questionMarks: '2' },
//     //                 { id: "C", label: "Ques-Ans (Each of 3 Mark)", questionMarks: '3' },
//     //                 { id: "D", label: "Ques-Ans (Each of 4 Mark)", questionMarks: '4' },
//     //             ],
//     //         },
//     //     ],
//     //     EXEMPLAR: [
//     //         {
//     //             id: 1,
//     //             title: "Number System (Exemplar)",
//     //             chapterName: "Unit 01",
//     //             questions: [
//     //                 { id: "A", label: "Objective Questions ( 3 Mark)" },
//     //                 { id: "B", label: "Short Answer" },
//     //                 { id: "C", label: "Numerical Problems" },
//     //             ],
//     //         },
//     //         {
//     //             id: 2,
//     //             title: "Polynomials (Exemplar)",
//     //             chapterName: "Unit 02",
//     //             questions: [
//     //                 { id: "A", label: "Objective Questions ( 3 Mark)" },
//     //                 { id: "B", label: "Short Answer" },
//     //                 { id: "C", label: "Numerical Problems" },
//     //             ],
//     //         },
//     //     ],
//     //     RD_SHARMA: [
//     //         {
//     //             id: 1,
//     //             title: "Number System",
//     //             chapterName: "Chapter 1",
//     //             questions: [
//     //                 { id: "A", label: "Exercise 1A ( 3 Mark)" },
//     //                 { id: "B", label: "Exercise 1B" },
//     //                 { id: "C", label: "MCQ" },
//     //                 { id: "D", label: "Practice Set" },
//     //             ],
//     //         },
//     //         {
//     //             id: 2,
//     //             title: "Coordinate Geometry",
//     //             chapterName: "Chapter 3",
//     //             questions: [
//     //                 { id: "A", label: "Graphs" },
//     //                 { id: "B", label: "Distance Formula" },
//     //                 { id: "C", label: "Practice Problems" },
//     //             ],
//     //         },
//     //     ],
//     // };


//     // Clear when going back
//     //   const handleBack = () => {
//     //     // CLEAR: Remove all data
//     //     dispatch(clearPDFQuestions());
//     //     navigation.goBack();
//     //   };

//     // Also clear when component unmounts
//     React.useEffect(() => {
//         return () => {
//             dispatch(clearPDFQuestions());
//         };
//     }, [dispatch]);

//     const handleChapterFetch = async (data) => {
//         setLoading(true)
//         try {
//             const params = {
//                 'board_id': data?.boardId,
//                 'medium_id': data?.mediumId,
//                 // 'class_id': data?.standardId,
//                 'subject_id': data?.subjectId,
//             }
//             // console.log('paramssssssssss', params);
//             const response = await POST_FORM(ApiEndPoint?.questionChapter, params);
//             // console.log('wwwwwwwwwwwwwww', response)
//             if (response?.status === 200) {
//                 setChapterData(response?.result || [])
//             } else {
//                 showToast('error', 'Error', response.msg || "Chapter fetch faild")
//                 setChapterData([])
//             }
//         } catch (error) {
//             if (error?.offline) {
//                 return;
//             }
//             showToast('error', 'Error', error.msg || 'Something went wrong. Please try again.')
//         } finally {
//             setLoading(false)
//         }
//     }

//     useFocusEffect(
//         useCallback(() => {
//             navigation.getParent()?.setOptions({
//                 tabBarStyle: { display: 'none' },
//             })

//             return () => {
//                 navigation.getParent()?.setOptions({
//                     tabBarStyle: { display: 'flex' },
//                 });
//             };
//         }, []))

//     // useEffect(() => {
//     //     const handlePaperType = async () => {
//     //         const data = await localStorage.getItem(storageKeys.selectedPaperType);
//     //         const boardId = await localStorage.getItem(storageKeys.boardId);
//     //         const mediumId = await localStorage.getItem(storageKeys.selectedMediumId)
//     //         const standardId = await localStorage.getItem(storageKeys.selectedStandardId)
//     //         const subjectId = await localStorage.getItem(storageKeys.selectedSubject)
//     //         setPaperHeader(data || '');
//     //         await handleFetchBook();
//     //         await handleChapterFetch({boardId, mediumId,standardId,subjectId})
//     //     }
//     //     handlePaperType()
//     // }, [])
//     useEffect(() => {
//         let isMounted = true; // To prevent state updates on unmounted component

//         const handlePaperType = async () => {
//             try {
//                 const data = await localStorage.getItem(storageKeys.selectedPaperType);
//                 const boardId = await localStorage.getItem(storageKeys.boardId);
//                 const mediumId = await localStorage.getItem(storageKeys.selectedMediumId);
//                 const standardId = await localStorage.getItem(storageKeys.selectedStandardId);
//                 const subjectId = await localStorage.getItem(storageKeys.selectedSubId);
//                 const subjectName = await localStorage.getItem(storageKeys.selectedSubject);
//                 setSubjectName(subjectName)
//                 if (isMounted) {
//                     setPaperHeader(data || '');
//                 }

//                 await handleFetchBook();
//                 await handleChapterFetch({
//                     boardId: boardId || '',
//                     mediumId: mediumId || '',
//                     standardId: standardId || '',
//                     subjectId: subjectId || ''
//                 });

//             } catch (error) {
//                 console.error('Error in handlePaperType:', error);
//             }
//         };

//         handlePaperType();
//         return () => {
//             isMounted = false; // Cleanup on unmount
//         };
//     }, []); // Add dependencies if needed

//     return (
//         <View style={{ flex: 1, backgroundColor: Colors.white }}>
//             <StatusBar
//                 backgroundColor={Colors.lightThemeBlue}
//                 barStyle="dark-content" />

//             <SafeAreaView edges={["top"]} style={{ backgroundColor: Colors.lightThemeBlue }}>
//                 <HeaderPaperModule 
//                     titleStyle={{ fontSize: moderateScale(14) }} 
//                     title={`${paperHeader}`} 
//                     subjectName={`${subjectName}`} 
//                     rightPress={() => { navigation.navigate('DraftPaperScreen') }} 
//                     leftIconPress={handleBack} 
//                 />
//             </SafeAreaView>

//             <SafeAreaView
//                 style={{ flex: 1, backgroundColor: Colors.white }}
//                 edges={["left", "right", "bottom"]}>
//                 <Loader visible={loading} />
                
//                 <Paperselectcontent 
//                     data={chapterData} 
//                     handleNavigate={handleQuestionSelect} 
//                     activeChapterId={activeChapterId} 
//                     selectedSummary={selectedSummary}
//                     chaptersSummary={chapters} // Pass Redux chapters data
//                 />
                
//                 <View style={styles.totalWrapper}>
//                     <View style={styles.topShadow} />
//                     <View style={styles.totalMainBox}>
//                         <View>
//                             <Text style={styles.marksTotel}>
//                                 {calculateTotalMarks()} Marks Total
//                             </Text>
//                             <Text style={[styles.marksTotel, { fontSize: moderateScale(12) }]}>
//                                 {generateSummaryText()}
//                             </Text>
//                         </View>
//                         <TouchableOpacity 
//                             style={styles.exportBox} 
//                             onPress={() => navigation.navigate('MyPdfScreen')}
//                         >
//                             <Text style={styles.exportText}>Export PDF</Text>
//                             <Icon name='arrow-right-long' size={moderateScale(16)} color={Colors.white} />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </SafeAreaView>
//         </View>
//     );
// };

// export default PaperSelect;