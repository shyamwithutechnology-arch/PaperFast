import React, { useCallback, useEffect, useState } from "react";
import { View, StatusBar, TouchableOpacity, Text, Image, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Fonts } from "../../../theme";
import HeaderPaperModule from "../../../component/headerpapermodule/Headerpapermodule";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/Feather";
import { moderateScale } from "../../../utils/responsiveSize";
import { Icons } from "../../../assets/icons";
import QuestionListData, { Question } from './component/questionlist/QuestionListData';
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { GET, POST_FORM } from "../../../api/request";
import Loader from "../../../component/loader/Loader";
import Pagination from "./component/Pagination";
import AppModal from "../../../component/modal/AppModal";
import { showToast } from "../../../utils/toast";
import { localStorage, storageKeys } from "../../../storage/storage";
import IconEntypo from "react-native-vector-icons/FontAwesome5";
import AppButton from "../../../component/button/AppButton";
import { ApiEndPoint } from "../../../api/endPoints";
import { ScrollView } from "react-native-gesture-handler";
import { launchImageLibrary } from "react-native-image-picker";
import { useDispatch } from "react-redux";
import { setPDFQuestions } from "../../../redux/slices/pdfQuestionsSlice";
// import { buildPDFHtml } from "../../mypdf/component/buildPDFHtml";
interface Difficulty {
    dlevel_id: string,
    dlevel_name: string
}

interface QuestionType {
    qp_id: string,
    qp_name: string
}
interface Book {
    book_id: string,
    book_name: string
}
const QuestionScreen = () => {
    const navigation = useNavigation()
    const route = useRoute();
    const {
        chapterId,
        questionId,
        questionMarks,
        label,
    } = route.params as {
        chapterId: number;
        questionId: string;
        questionMarks: string;
        label: string;
    };
    const [selectCheck, setSelectedCheck] = useState('Options')
    const [selectedMap, setSelectedMap] = useState<Record<string, boolean>>({});
    const [questionNumber, setQuestionNumber] = useState<Record<string, boolean>>({});
    const [questionsData, setQuestionsData] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [labelStatus, setLabelStatus] = useState(false);
    const [paperType, setPaperType] = useState<string | null>('');
    const [lebelCheck, setLabelCheck] = useState<string | null>(null);
    const [questionTypeSelect, setQuestionTypeSelect] = useState<string | null>(null);
    const [bookSelect, setBookSelect] = useState<string | null>(null);
    const [difficultyLabel, setDifficultyLabel] = useState<Difficulty[]>([]);
    const [questionType, setQuestionType] = useState<QuestionType[]>([]);
    const [book, setBook] = useState<Book[]>([]);
    const [subId, setSubId] = useState<string | null>('');
    const [remarkVisibleModal, setRemarkVisibleModal] = useState<boolean>(false);
    const [pagination, setPagination] = useState({
        limit: 10,
        page: 1,
        pages: 1,
        total: 0,
    });

    const dispatch = useDispatch();
    const handleCheck = (item: string) => {
        // console.log('eeeeeee', item);
        setSelectedCheck(item)
    }
    const handleLabelStatus = async () => {
        await handleFilterModal()
        await handleQuestionType()
        await handleBookFetch()
        setLabelStatus(true)
    }
    const handleLabelClose = () => {
        setLabelStatus(false)
    }
    const handleCheckStatus = (item: string) => {
        setLabelCheck(item)
    }
    const handleQuestionTypeSelect = (item: string) => {
        setQuestionTypeSelect(item)
    }
    const handleBookSelect = (item: string) => {
        setBookSelect(item)
    }
    const handleFilterClose = async () => {
        setLabelStatus(false)
    }
    const handleApplyFilter = async () => {
        await fetchQuestions(pagination.page, pagination?.limit);
        setLabelStatus(false)
    }
    const handleClearFilter = async () => {
        setLabelCheck(null),
            setQuestionTypeSelect(null),
            await fetchQuestions(pagination.page, pagination?.limit);
        setLabelStatus(false)
    }
    const handleBack = () => {
        navigation.navigate('PaperSelect', {
            selectedSummary: {
                chapterId,
                questionId,
                questionMarks,
                selectedQuestions: Object.keys(questionNumber)
            },
        });
    };

    const openGallery = () => {
        launchImageLibrary(
            { mediaType: 'photo', selectionLimit: 1 },
            (response) => {
                if (response.didCancel) return;
                if (response.errorCode) return;

                console.log('rrrrrrrrrrrrr', response.assets?.[0]);
                if (response.assets?.length) {
                    console.log('eeeeeeeeeeeeeee', response.assets[0].uri);
                }
            }
        );
    };

    const handleRemarkOpenModal = () => {
        setRemarkVisibleModal(true)
    }
    const hanldeRemarkCloseModal = () => {
        setRemarkVisibleModal(false)
    }

    // difficulty type
    const handleFilterModal = async () => {
        setLoading(true)
        try {
            const response = await GET(ApiEndPoint.difficultyLabel)
            if (response?.status === 200) {
                setDifficultyLabel(response?.result || []);
            }
        } catch (error: any) {
            if (error?.offline) {
                return;
            }
            const errorMessage = error?.response?.data?.message ||
                error?.message ||
                'Something went wrong. Please try again.';
            showToast('error', 'Error', errorMessage);
        } finally {
            setLoading(false)
        }
    };
    // question type
    const handleQuestionType = async () => {
        setLoading(true)
        try {
            const response = await GET(ApiEndPoint.queationtype)
            if (response?.status === 200) {
                setQuestionType(response?.result || []);
            }
        } catch (error: any) {
            if (error?.offline) {
                return;
            }
            const errorMessage = error?.response?.data?.message ||
                error?.message ||
                'Something went wrong. Please try again.';
            showToast('error', 'Error', errorMessage);
        } finally {
            setLoading(false)
        }
    };

    // bookFetch
    const handleBookFetch = async () => {
        setLoading(true);
        try {
            const response = await GET(ApiEndPoint?.bookFetch);
            // console.log('resssssssbook', response);

            if (response?.status === 200) {
                setBook(response?.result || []);
            } else {
                showToast('error', 'Error', response?.msg || 'Book not found');
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
    // In QuestionScreen.tsx
    // const handlePDFPress = () => {
    //   const selectedQuestions = questionsData?.result?.filter(
    //     q => selectedMap[q.question_id]
    //   );

    //   if (!selectedQuestions?.length) {
    //     Alert.alert('No Selection', 'Please select at least one question');
    //     return;
    //   }

    //   navigation.navigate('MyPdfScreen', {
    //     selectedQuestions,
    //     questionCount: selectedQuestions.length,
    //     showSolutions: selectCheck === 'Solutions',
    //     onGenerate: async (pdfSettings: PDFSettings) => {
    //       // Optional: Handle PDF generation from here
    //       setLoading(true);
    //       try {
    //         const result = await generateQuestionPaperPDF(
    //           selectedQuestions,
    //           selectCheck === 'Solutions',
    //           pdfSettings
    //         );

    //         Alert.alert('Success', `PDF generated: ${result.fileName}`, [
    //           { 
    //             text: 'View', 
    //             onPress: () => navigation.navigate('PDFViewer', { filePath: result.filePath }) 
    //           },
    //           { text: 'OK' },
    //         ]);
    //       } catch (error: any) {
    //         Alert.alert('Error', error.message);
    //       } finally {
    //         setLoading(false);
    //       }
    //     }
    //   });
    // };

    // const handlePDFPress = () => {
    //     const selectedQuestions = questionsData?.result?.filter(
    //         q => selectedMap[q.question_id]
    //     );

    //     console.log('selectedQuestions for PDF:', selectedQuestions);

    //     if (!selectedQuestions?.length) {
    //         Alert.alert('No Selection', 'Please select at least one question');
    //         return;
    //     }

    //     // Navigate to PDF customization screen
    //     navigation.navigate('PDFDetailsScreen', {
    //         selectedQuestions,
    //         questionCount: selectedQuestions.length,
    //         showSolutions: selectCheck === 'Solutions',
    //     });
    // };
    // const handlePDFPress = () => {
    //     const selectedQuestions = questionsData?.result?.filter(
    //         q => selectedMap[q.question_id]
    //     );
    //     dispatch(setPDFQuestions(selectedQuestions))

    //     console.log('selectedQuestions for PDF:', selectedQuestions);

    //     if (!selectedQuestions?.length) {
    //         Alert.alert('No Selection', 'Please select at least one question');
    //         return;
    //     }

    //     // Navigate to PDF customization screen
    //     navigation.navigate('MyPDF', {
    //         screen: 'PDFDetailsScreen',
    //         selectedQuestions: JSON.parse(JSON.stringify(selectedQuestions)), // Deep copy to avoid reference issues
    //         questionCount: selectedQuestions.length,
    //         showSolutions: selectCheck === 'Solutions',
    //     })
    // }
    const handlePDFPress = () => {
        // Get selected questions
        const selectedQuestions = questionsData?.result?.filter(
            q => selectedMap[q.question_id]
        ) || [];

        if (!selectedQuestions.length) {
            Alert.alert('No Selection', 'Please select at least one question');
            return;
        }

        // SET: Store in Redux
        dispatch(setPDFQuestions(selectedQuestions));

        // Navigate
        navigation.navigate('MyPDF', {
            screen: 'PDFDetailsScreen',
            params: {
                showSolutions: selectCheck === 'Solutions',
            }
        });
    };
    const fetchQuestions = async (page: number = 1, limit: number = pagination?.limit, subject?: string | null) => {
        setLoading(true)
        try {
            let params = {
                'subject_id': subject ?? subId,
                'difficulty': lebelCheck || '3',
                // 'easy': '3',
                'page': page?.toString(),
                'limit': limit?.toString()
            }
            // console.log('ppppppppp', params);

            const response = await POST_FORM('question', params)
            if (response?.status === 200) {
                setQuestionsData(response || {});
                if (response?.pagination) {
                    setPagination({
                        limit: response.pagination.limit,
                        page: response.pagination.page,
                        pages: response.pagination.pages,
                        total: response.pagination.total,
                    });
                }
            }
        } catch (error: any) {
            if (error?.offline) {
                return;
            }
            const errorMessage = error?.response?.data?.message ||
                error?.message ||
                'Something went wrong. Please try again.';
            showToast('error', 'Error', errorMessage);
        } finally {
            setLoading(false)
        }
    };

    // Handle page change
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.pages) {
            fetchQuestions(newPage);
            // Optional: Scroll to top when page changes
            // scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        }
    };

    // Handle limit change
    const handleLimitChange = (newLimit: number) => {
        setPagination(prev => ({
            ...prev,
            limit: newLimit,
            page: 1 // Reset to first page
        }));

        // Fetch data with new limit
        fetchQuestions(1, newLimit);
    };

    const generatePDF = async () => {
        // try {
        //     const selectedQuestions = questionsData?.result?.filter(
        //         q => selectedMap[q.question_id]
        //     );

        //     if (!selectedQuestions?.length) {
        //         Alert.alert('No questions selected');
        //         return;
        //     }

        //     const html = buildPDFHtml(selectedQuestions, selectCheck);

        //     const file = await RNHTMLtoPDF.convert({
        //         html,
        //         fileName: 'Question_Paper',
        //         directory: 'Documents',
        //     });

        //     if (!file?.filePath) {
        //         throw new Error('PDF generation failed');
        //     }

        //     console.log('PDF saved at:', file);
        //     Alert.alert('PDF Created', file.filePath);

        // } catch (error) {
        //     console.log('PDF ERROR:', error);
        //     Alert.alert('Error', 'Failed to generate PDF');
        // }
    };


    useFocusEffect(
        useCallback(() => {
            navigation.getParent()?.setOptions({
                tabBarStyle: { display: 'none' },
            });
            return () => {
                navigation.getParent()?.setOptions({
                    tabBarStyle: { display: 'flex' },
                });
            };
        }, []))

    useEffect(() => {
        // if()
        const init = async () => {
            const paperType = await localStorage.getItem(storageKeys.selectedPaperType)
            const subjectId = await localStorage.getItem(storageKeys.selectedSubId);
            setSubId(subjectId)
            setPaperType(paperType)
            if (subjectId) {
                console.log('subjectId', subjectId);
                await fetchQuestions(pagination.page, pagination?.limit, subjectId);
            }
        }
        init()
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar
                backgroundColor={Colors.primaryColor}
                barStyle="dark-content" />
            <SafeAreaView edges={["top"]} style={{ backgroundColor: Colors.lightThemeBlue }}>
                <HeaderPaperModule
                    title={paperType}
                    rightPress={() => navigation?.navigate('DraftPaperScreen')}
                    // rightPress2={() => navigation?.navigate('MyPdfScreen')}
                    rightPress2={handlePDFPress}
                    leftIconPress={handleBack}
                />
            </SafeAreaView>

            {/* MAIN CONTENT */}
            <SafeAreaView
                style={{ flex: 1, backgroundColor: Colors.white }}
                edges={["left", "right", "bottom"]}>
                <Loader visible={loading} />

                <View style={styles.optionsSectBox}>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center'
                    }}>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => handleCheck('Options')}
                            activeOpacity={0.7}>
                            <View
                                style={[
                                    styles.chackBox,
                                    {
                                        backgroundColor:
                                            selectCheck === 'Options' ? '#4292FA' : Colors.white
                                    }]}>
                                {selectCheck === 'Options' && (
                                    <Icon name="check" size={moderateScale(14)} color={Colors.white} />
                                )}
                            </View>
                            <Text style={styles.optionsText}>Options</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.solutionMainBox}
                            onPress={() => handleCheck('Solutions')}
                            activeOpacity={0.7}>
                            <View
                                style={[
                                    styles.chackBox,
                                    {
                                        backgroundColor:
                                            selectCheck === 'Solutions' ? '#4292FA' : Colors.white
                                    }]}>
                                {selectCheck === 'Solutions' && (
                                    <Icon name="check" size={moderateScale(14)} color={Colors.white} />
                                )}
                            </View>
                            <Text style={styles.optionsText}>Solutions</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.filteMain} >
                        <Text style={styles.questionSelected} onPress={() => { }}>
                            {Object.keys(selectedMap).map(Number).length ?? 0} Ques Selected
                        </Text>
                        <TouchableOpacity style={styles.filterBtn} onPress={handleLabelStatus}>
                            <Image source={Icons.filter} resizeMode="contain" style={styles.filteImg} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Pagination*/}
                {pagination.pages > 1 && (
                    <Pagination
                        paginationData={pagination}
                        onPageChange={handlePageChange}
                        onLimitChange={handleLimitChange}
                    />)}

                {/* Question list */}
                <QuestionListData
                    selectCheck={selectCheck}
                    selectedMap={selectedMap}
                    setSelectedMap={setSelectedMap}
                    questionsData={questionsData?.result ?? []}
                    currentPage={pagination?.page}
                    limit={pagination.limit}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    isLoading={loading} // ✅ Pass loading state
                />
                <AppModal visible={labelStatus} onClose={handleLabelClose}>
                    <View style={styles.applyBox}>
                        <Text style={styles.diffeicultText}>Apply Filter</Text>
                        <TouchableOpacity onPress={handleClearFilter} style={{ padding: moderateScale(1) }}>
                            <Text style={styles.clearAllText}>Clear all filters</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                        <View style={styles.lineBox} />
                        <Text style={styles.diffecultyText}>Difficulty level</Text>
                        <View style={styles.easyBox}>
                            <View style={styles.difficultMainBox}>
                                {difficultyLabel?.map(item => (
                                    <Pressable key={item?.dlevel_id} style={styles.checkBoxMain} onPress={() => handleCheckStatus(item?.dlevel_id)}>
                                        <View style={[styles.checkBox, lebelCheck === item?.dlevel_id && { backgroundColor: Colors.primaryColor, borderWidth: 0 }]}>
                                            {lebelCheck === item?.dlevel_id && <IconEntypo name='check' size={moderateScale(14.5)} color={Colors.white} />
                                            }
                                        </View>
                                        <Text style={styles.easyText}>{item?.dlevel_name}</Text>
                                    </Pressable>))}
                            </View>
                        </View>
                        <Text style={[styles.diffecultyText, { marginTop: moderateScale(20) }]}>Question Type</Text>
                        {questionType?.map(item => (
                            <Pressable style={[styles.checkBoxMain, { justifyContent: "flex-start" }]} onPress={() => handleQuestionTypeSelect(item?.qp_id)}>
                                <View style={[styles.checkBox, questionTypeSelect === item?.qp_id && { backgroundColor: Colors.primaryColor, borderWidth: 0 }]}>
                                    {questionTypeSelect === item?.qp_id && <IconEntypo name='check' size={moderateScale(14.5)} color={Colors.white} />}                                </View>
                                <Text style={styles.easyText}>{item?.qp_name}</Text>
                            </Pressable>
                        ))}

                        <Text style={[styles.diffecultyText, { marginTop: moderateScale(20) }]}>Books</Text>
                        {book?.map(item => (
                            <Pressable style={[styles.checkBoxMain, { justifyContent: "flex-start" }]} onPress={() => handleBookSelect(item?.book_id)}>
                                <View style={[styles.checkBox, bookSelect === item?.book_id && { backgroundColor: Colors.primaryColor, borderWidth: 0 }]}>
                                    {bookSelect === item?.book_id && <IconEntypo name='check' size={moderateScale(14.5)} color={Colors.white} />}                                </View>
                                <Text style={styles.easyText}>{item?.book_name}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                    <View style={[styles.lineBox, {}]} />
                    <View style={[styles.easyBox, styles.btnMain]}>
                        <AppButton title="Cancel" style={styles.cancelBtn} textStyle={styles.cancelText} onPress={handleFilterClose} />
                        <AppButton title="Apply Filter" style={styles.applyFilterBox}
                            textStyle={styles.applyText} onPress={handleApplyFilter} />
                    </View>
                </AppModal>
                <AppModal visible={remarkVisibleModal} onClose={hanldeRemarkCloseModal}>
                    <Pressable onPress={openGallery}>
                        <Text>Upload photo</Text>
                    </Pressable>
                </AppModal>
            </SafeAreaView>
        </View>
    );
};
export default QuestionScreen;
