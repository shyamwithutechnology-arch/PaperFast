import React, { useCallback, useEffect, useState } from "react";
import { View, StatusBar, TouchableOpacity, Text } from "react-native";
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
    const route = useRoute();
    const [loading, setLoading] = useState<boolean>(false);
    const [book, setBook] = useState<Book[]>([]);
    const [chapterData, setChapterData] = useState<any>([]);
    console.log('chapterData', chapterData);

    const selectedSummary = route.params?.selectedSummary as
        | SelectedSummary
        | undefined;


    const [activeChapterId, setActiveChapterId] = useState<number | null>(
        selectedSummary?.chapterId ?? null
    );

    const handleBack = async () => {
        await localStorage.removeItem(storageKeys?.selectedPaperType)
        navigation.navigate('PaperTypeScreen')
    }
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


    const handleChapterFetch = async (data) => {
        setLoading(true)
        try {
            const params = {
                'board_id': data?.boardId,
                'medium_id': data?.mediumId,
                // 'class_id': data?.standardId,
                'subject_id': data?.subjectId,
            }
            console.log('paramssssssssss', params);

            const response = await POST_FORM(ApiEndPoint?.questionChapter, params);
            console.log('wwwwwwwwwwwwwww', response)
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
                const subjectId = await localStorage.getItem(storageKeys.selectedSubject);

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
                <HeaderPaperModule title={paperHeader} rightPress={() => { navigation.navigate('DraftPaperScreen') }} leftIconPress={handleBack} />
            </SafeAreaView>
            {/* MAIN CONTENT */}
            <SafeAreaView
                style={{ flex: 1, backgroundColor: Colors.white }}
                edges={["left", "right", "bottom"]}>
                <Loader visible={loading} />
                <View style={styles.rowContainer}>
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
                </View>
                {/* <Paperselectcontent data={PAPER_DATA[selectedPaper]} handleNavigate={handleQuestionSelect} activeChapterId={activeChapterId} selectedSummary={selectedSummary} /> */}
                <Paperselectcontent data={PAPER_DATA[selectedPaper]} handleNavigate={handleQuestionSelect} activeChapterId={activeChapterId} selectedSummary={selectedSummary} />
                <View style={styles.totalWrapper}>
                    <View style={styles.topShadow} />
                    <View style={styles.totalMainBox}>
                        <View>
                            <Text style={styles.marksTotel}>11 Marks Total</Text>
                            <Text style={[styles.marksTotel, { fontSize: moderateScale(12) }]}>
                                1=3,2=0,3=0,4=2,5=0ddd
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.exportBox} onPress={() => navigation.navigate('MyPdfScreen')}>
                            <Text style={styles.exportText}>Export PDF</Text>
                            <Icon name='arrow-right-long' size={moderateScale(16)} color={Colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

        </View>
    );
};

export default PaperSelect;