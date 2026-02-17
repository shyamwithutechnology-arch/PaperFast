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
import { useDispatch, useSelector } from "react-redux";
import { addChapterQuestions, addPDFQuestions, SelectedQuestion } from "../../../redux/slices/pdfQuestionsSlice";
import DraftModal from "../draftpaper/component/DraftModal";
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
        chapterTitle,
        selectedQuestions
    } = route.params as {
        chapterId: number;
        questionId: string;
        questionMarks: string;
        label: string;
        chapterTitle: string;
        selectedQuestions: any[]
    };
    const selectedSubjectId = useSelector((state) => state?.selectedSubId?.selectedSubId)
    const [activeTab, setActiveTab] = useState('all');
    const [selectCheck, setSelectedCheck] = useState('Options')
    const [selectedMap, setSelectedMap] = useState({});
    const [questionNumber, setQuestionNumber] = useState<Record<string, boolean>>({});
    const [visibleDraft, setVisibleDraft] = useState<boolean>(false);
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
        limit: 50,
        page: 1,
        pages: 1,
        total: 0,
    });
console.log('paperType', paperType);

    const questionLenght = Object.keys(selectedMap)?.length
    const dispatch = useDispatch();
    const handleCheck = (item: string) => {
        setSelectedCheck(item)
    }
    const handleLabelStatus = async () => {
        setLoading(true)
        await handleFilterModal()
        await handleQuestionType()
        await handleBookFetch()
        setLabelStatus(true)
    }
    //   const handleLabelStatus = async () => {
    //     setLabelStatus(true); // Show modal immediately
    //     setLoading(true); // Show loading indicator
        
    //     try {
    //         // Fetch all data in parallel for better performance
    //         await Promise.all([
    //             handleFilterModal(),
    //             handleQuestionType(),
    //             handleBookFetch()
    //         ]);
    //     } catch (error) {
    //         console.log('Error fetching filter data:', error);
    //         showToast('error', 'Error', 'Failed to load filter options');
    //     } finally {
    //         setLoading(false);
    //     }
    // }

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
        setLoading(true)
        await fetchQuestions(pagination.page, pagination?.limit);
        setLabelStatus(false)
    }
    const handleClearFilter = async () => {
        setLabelCheck(null),
            setQuestionTypeSelect(null),
            await fetchQuestions(pagination.page, pagination?.limit);
        setLabelStatus(false)
    }
    const handleCloseDraftModal = () => {
        setVisibleDraft(false)
    }
    const handleOpenDraftModal = () => {
        setVisibleDraft(true)
    }
    // const handleBack = async () => {
    //     const selectedQuestions = questionsData?.result?.filter(
    //         q => selectedMap[q.question_id]
    //     ) || [];

    //     await dispatch(addPDFQuestions(selectedQuestions));
    //     navigation.navigate('PaperSelect', {
    //         selectedSummary: {
    //             chapterId,
    //             questionId,
    //             questionMarks,
    //             selectedQuestions: Object.keys(questionNumber)
    //         },
    //     });
    // };
    const handleBack = async () => {
        // Get selected questions from this chapter and question type
        const selectedQuestions = questionsData?.result?.filter(
            q => selectedMap[q.question_id]
        ) || [];

        // Get question numbers for selected questions
        const selectedQuestionNumbers = Object.keys(questionNumber)
            .map(key => parseInt(key))
            .filter(num => questionNumber[num.toString()]);

        if (selectedQuestions.length > 0) {
            // Store in Redux with chapter information
            dispatch(addChapterQuestions({
                chapterTitle: chapterTitle || `Chapter ${chapterId + 1}`,
                chapterId,
                questionTypeId: questionId,
                questionMarks,
                label,
                questions: selectedQuestions || [],
                questionNumbers: selectedQuestionNumbers
            }));
        }

        // Navigate back with summary
        navigation.navigate('PaperSelect', {
            selectedSummary: {
                chapterId,
                questionId,
                questionMarks,
                label,
                selectedQuestions: selectedQuestionNumbers,
                chapterTitle: chapterTitle || `Chapter ${chapterId + 1}`
            },
        });
    };

    const openGallery = () => {
        launchImageLibrary(
            { mediaType: 'photo', selectionLimit: 1 },
            (response) => {
                if (response.didCancel) return;
                if (response.errorCode) return;
                // console.log('rrrrrrrrrrrrr', response.assets?.[0]);
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

    const handlePDFPress = () => {
        // Get selected questions
        const selectedQuestions = questionsData?.result?.filter(
            q => selectedMap[q.question_id]
        ) || [];


        if (!selectedQuestions.length) {
            // Alert.alert('No Selection', 'Please select at least one question');
            showToast('error', 'Please select at least one question')
            return;
        }
        // SET: Store in Redux
        dispatch(addPDFQuestions(selectedQuestions));
        // Navigate
        navigation.navigate('MyPDF', {
            screen: 'PDFDetailsScreen',
            params: {
                showSolutions: selectCheck === 'Solutions',
                questionType: questionId
            }
        });
    };
    const fetchQuestions = async (page: number = 1, limit: number = pagination?.limit, subject?: string | null) => {
        setLoading(true)
        try {
            let params = {
                'subject_id': subject ?? selectedSubjectId,
                'difficulty': lebelCheck || '3',
                // 'easy': '3',
                'page': page?.toString(),
                'limit': limit?.toString()
            }
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

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.pages) {
            fetchQuestions(newPage);
        }
    };

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
            const paperType = await localStorage.getItem(storageKeys?.selectedPaperType)
            // const subjectId = await localStorage.getItem(storageKeys.selectedSubId);
            // setSubId(subjectId)
            setPaperType(paperType || '')
            if (selectedSubjectId) {
                console.log('subjectId', selectedSubjectId);
                await fetchQuestions(pagination.page, pagination?.limit, selectedSubjectId);
            }
        }
        init()
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar
                backgroundColor={Colors.lightThemeBlue}
                barStyle="dark-content" />
            <SafeAreaView edges={["top"]} style={{ backgroundColor: Colors.lightThemeBlue }}>
                <HeaderPaperModule
                    title={paperType || ''}
                    rightPress={handleOpenDraftModal}
                    rightPressDisable={questionLenght <= 0 && true}
                    // rightPress2={() => navigation?.navigate('MyPdfScreen')}
                    rightPress2={handlePDFPress}
                    leftIconPress={handleBack}
                />
            </SafeAreaView>

            {/* MAIN CONTENT */}
            <SafeAreaView
                style={{ flex: 1, backgroundColor: Colors.white }}
                edges={["left", "right", "bottom"]}>
                {/* <Loader visible={loading} /> */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'all' && styles.activeTab]}
                        onPress={() => setActiveTab('all')}>
                        <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
                            All Questions
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'topic' && styles.activeTab]}
                        onPress={() => setActiveTab('topic')}>
                        <Text style={[styles.tabText, activeTab === 'topic' && styles.activeTabText]}>
                            Topic Wise
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }}>
                    {activeTab === 'all' ? (
                        <>
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
                                selectedQuestions={selectedQuestions}
                                getAllRute={route?.params}
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
                                                        {lebelCheck === item?.dlevel_id && (
                                                            <IconEntypo name='check' size={moderateScale(14)} color={Colors.white} />
                                                        )}
                                                    </View>
                                                    <Text style={styles.easyText}>{item?.dlevel_name}</Text>
                                                </Pressable>
                                            ))}
                                        </View>
                                    </View>

                                    <Text style={[styles.diffecultyText, { marginTop: moderateScale(20) }]}>Question Type</Text>
                                    {questionType?.map(item => (
                                        <Pressable key={item?.qp_id} style={[styles.checkBoxMain, { justifyContent: "flex-start" }]} onPress={() => handleQuestionTypeSelect(item?.qp_id)}>
                                            <View style={[styles.checkBox, questionTypeSelect === item?.qp_id && { backgroundColor: Colors.primaryColor, borderWidth: 0 }]}>
                                                {questionTypeSelect === item?.qp_id && (
                                                    <IconEntypo name='check' size={moderateScale(14)} color={Colors.white} />
                                                )}
                                            </View>
                                            <Text style={styles.easyText}>{item?.qp_name}</Text>
                                        </Pressable>
                                    ))}

                                    <Text style={[styles.diffecultyText, { marginTop: moderateScale(20) }]}>Books</Text>
                                    {book?.map(item => (
                                        <Pressable key={item?.book_id} style={[styles.checkBoxMain, { justifyContent: "flex-start" }]} onPress={() => handleBookSelect(item?.book_id)}>
                                            <View style={[styles.checkBox, bookSelect === item?.book_id && { backgroundColor: Colors.primaryColor, borderWidth: 0 }]}>
                                                {bookSelect === item?.book_id && (
                                                    <IconEntypo name='check' size={moderateScale(14)} color={Colors.white} />
                                                )}
                                            </View>
                                            <Text style={styles.easyText}>{item?.book_name}</Text>
                                        </Pressable>
                                    ))}
                                </ScrollView>

                                <View style={styles.lineBox} />

                                <View style={[styles.easyBox, styles.btnMain]}>
                                    <AppButton title="Cancel" style={styles.cancelBtn} textStyle={styles.cancelText} onPress={handleFilterClose} />
                                    <AppButton title="Apply Filter" style={styles.applyFilterBox} textStyle={styles.applyText} onPress={handleApplyFilter} />
                                </View>
                            </AppModal>
                             
                            <AppModal visible={remarkVisibleModal} onClose={hanldeRemarkCloseModal}>
                                <Pressable onPress={openGallery}>
                                    <Text>Upload photo</Text>
                                </Pressable>
                            </AppModal>
                            <DraftModal activeDraft={visibleDraft} onClose={handleCloseDraftModal} questionId={Object.keys(selectedMap)} />
                        </>
                    ) : (
                        <>
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
                                selectedQuestions={selectedQuestions}
                                getAllRute={route?.params}
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
                                        <Pressable key={item?.qp_id} style={[styles.checkBoxMain, { justifyContent: "flex-start" }]} onPress={() => handleQuestionTypeSelect(item?.qp_id)}>
                                            <View style={[styles.checkBox, questionTypeSelect === item?.qp_id && { backgroundColor: Colors.primaryColor, borderWidth: 0 }]}>
                                                {questionTypeSelect === item?.qp_id && <IconEntypo name='check' size={moderateScale(14.5)} color={Colors.white} />}                                </View>
                                            <Text style={styles.easyText}>{item?.qp_name}</Text>
                                        </Pressable>
                                    ))}

                                    <Text style={[styles.diffecultyText, { marginTop: moderateScale(20) }]}>Books</Text>
                                    {book?.map(item => (
                                        <Pressable key={item?.book_id} style={[styles.checkBoxMain, { justifyContent: "flex-start" }]} onPress={() => handleBookSelect(item?.book_id)}>
                                            <View style={[styles.checkBox, bookSelect === item?.book_id && { backgroundColor: Colors.primaryColor, borderWidth: 0 }]}>
                                                {bookSelect === item?.book_id && <IconEntypo name='check' size={moderateScale(14.5)} color={Colors.white} />}                                </View>
                                            <Text style={styles.easyText}>{item?.book_name}</Text>
                                        </Pressable>
                                    ))}
                                </ScrollView>
                                <View style={[styles.lineBox]} />
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
                        </>
                    )}
                </View>

            </SafeAreaView>
        </View>
    );
};
export default QuestionScreen;


// // <***********************************
// import React, { useCallback, useEffect, useState } from "react";
// import { View, StatusBar, TouchableOpacity, Text, Image, Pressable, Alert } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Colors, Fonts } from "../../../theme";
// import HeaderPaperModule from "../../../component/headerpapermodule/Headerpapermodule";
// import { styles } from "./styles";
// import Icon from "react-native-vector-icons/Feather";
// import { moderateScale } from "../../../utils/responsiveSize";
// import { Icons } from "../../../assets/icons";
// import QuestionListData, { Question } from './component/questionlist/QuestionListData';
// import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
// import { GET, POST_FORM } from "../../../api/request";
// import Loader from "../../../component/loader/Loader";
// import Pagination from "./component/Pagination";
// import AppModal from "../../../component/modal/AppModal";
// import { showToast } from "../../../utils/toast";
// import { localStorage, storageKeys } from "../../../storage/storage";
// import IconEntypo from "react-native-vector-icons/FontAwesome5";
// import AppButton from "../../../component/button/AppButton";
// import { ApiEndPoint } from "../../../api/endPoints";
// import { ScrollView } from "react-native-gesture-handler";
// import { launchImageLibrary } from "react-native-image-picker";
// import { useDispatch, useSelector } from "react-redux";
// import { addChapterQuestions, addPDFQuestions, SelectedQuestion } from "../../../redux/slices/pdfQuestionsSlice";
// import DraftModal from "../draftpaper/component/DraftModal";
// // import { buildPDFHtml } from "../../mypdf/component/buildPDFHtml";

// interface Difficulty {
//     dlevel_id: string,
//     dlevel_name: string
// }

// interface QuestionType {
//     qp_id: string,
//     qp_name: string
// }
// interface Book {
//     book_id: string,
//     book_name: string
// }

// const QuestionScreen = () => {
//     const navigation = useNavigation()
//     const route = useRoute();
//     const {
//         chapterId,
//         questionId,
//         questionMarks,
//         label,
//         chapterTitle,
//         selectedQuestions
//     } = route.params as {
//         chapterId: number;
//         questionId: string;
//         questionMarks: string;
//         label: string;
//         chapterTitle: string;
//         selectedQuestions: any[]
//     };

//     const selectedSubjectId = useSelector((state: any) => state?.selectedSubId?.selectedSubId)
//     const [activeTab, setActiveTab] = useState('all');
//     const [selectCheck, setSelectedCheck] = useState('Options')
//     const [selectedMap, setSelectedMap] = useState<Record<string, boolean>>({});
//     const [questionNumber, setQuestionNumber] = useState<Record<string, boolean>>({});
//     const [visibleDraft, setVisibleDraft] = useState<boolean>(false);
//     const [questionsData, setQuestionsData] = useState<any>({});
//     const [loading, setLoading] = useState<boolean>(false);
//     const [labelStatus, setLabelStatus] = useState(false);
//     const [paperType, setPaperType] = useState<string | null>('');
//     const [lebelCheck, setLabelCheck] = useState<string | null>(null);
//     const [subjectName, setSubjectName] = useState<string | null>(null);
//     const [questionTypeSelect, setQuestionTypeSelect] = useState<string | null>(null);
//     const [bookSelect, setBookSelect] = useState<string | null>(null);
//     const [difficultyLabel, setDifficultyLabel] = useState<Difficulty[]>([]);
//     const [questionType, setQuestionType] = useState<QuestionType[]>([]);
//     const [book, setBook] = useState<Book[]>([]);
//     const [subId, setSubId] = useState<string | null>('');
//     const [remarkVisibleModal, setRemarkVisibleModal] = useState<boolean>(false);

//     // load more
//     const [isLoadingMore, setIsLoadingMore] = useState(false);
//     const [hasMoreData, setHasMoreData] = useState(true);

//     const [pagination, setPagination] = useState({
//         limit: 10,
//         page: 1,
//         pages: 1,
//         total: 0,
//     });

//     console.log('paperType', paperType);

//     const questionLenght = Object.keys(selectedMap)?.length
//     const dispatch = useDispatch();

//     // Add handleLoadMore function
//     const handleLoadMore = useCallback(() => {
//         if (pagination.page < pagination.pages && !isLoadingMore) {
//             fetchQuestions(pagination.page + 1, pagination.limit, selectedSubjectId, true);
//         }
//     }, [pagination.page, pagination.pages, pagination.limit, selectedSubjectId, isLoadingMore]);

//     const handleCheck = (item: string) => {
//         setSelectedCheck(item)
//     }

//     const handleLabelStatus = async () => {
//         await handleFilterModal()
//         await handleQuestionType()
//         await handleBookFetch()
//         setLabelStatus(true)
//     }

//     const handleLabelClose = () => {
//         setLabelStatus(false)
//     }

//     const handleCheckStatus = (item: string) => {
//         setLabelCheck(item)
//     }

//     const handleQuestionTypeSelect = (item: string) => {
//         setQuestionTypeSelect(item)
//     }

//     const handleBookSelect = (item: string) => {
//         setBookSelect(item)
//     }

//     const handleFilterClose = async () => {
//         setLabelStatus(false)
//     }

//     // const handleApplyFilter = async () => {
//     //     await fetchQuestions(pagination.page, pagination?.limit);
//     //     setLabelStatus(false)
//     // }

//     const handleApplyFilter = async () => {
//     setQuestionsData({}); // Reset data
//     setPagination(prev => ({ ...prev, page: 1 })); // Reset to page 1
//     await fetchQuestions(1, pagination?.limit);
//     setLabelStatus(false)
// }

//     // Add this new function
//     const handleTabChange = (tab: string) => {
//         setActiveTab(tab);
//         setQuestionsData({}); // Reset data when switching tabs
//         setSelectedMap({}); // Optional: clear selected questions when switching tabs
//         setQuestionNumber({}); // Optional: clear question numbers
//         setPagination(prev => ({ ...prev, page: 1 })); // Reset to page 1
//         fetchQuestions(1, pagination?.limit); // Fetch new data for the selected tab
//     };

//     const handleClearFilter = async () => {
//         setLabelCheck(null),
//             setQuestionTypeSelect(null),
//             await fetchQuestions(pagination.page, pagination?.limit);
//         setLabelStatus(false)
//     }

//     const handleCloseDraftModal = () => {
//         setVisibleDraft(false)
//     }

//     const handleOpenDraftModal = () => {
//         setVisibleDraft(true)
//     }

//     // Handle page change
//     const handlePageChange = (newPage: number) => {
//         if (newPage >= 1 && newPage <= pagination.pages) {
//             fetchQuestions(newPage);
//         }
//     };

//     // Handle limit change
//     const handleLimitChange = (newLimit: number) => {
//         setPagination(prev => ({
//             ...prev,
//             limit: newLimit,
//             page: 1
//         }));
//         fetchQuestions(1, newLimit);
//     };

//     const handleBack = async () => {
//         // Get selected questions from this chapter and question type
//         const selectedQuestions = questionsData?.result?.filter(
//             (q: any) => selectedMap[q.question_id]
//         ) || [];

//         // Get question numbers for selected questions
//         const selectedQuestionNumbers = Object.keys(questionNumber)
//             .map(key => parseInt(key))
//             .filter(num => questionNumber[num.toString()]);

//         if (selectedQuestions.length > 0) {
//             // Store in Redux with chapter information
//             dispatch(addChapterQuestions({
//                 chapterTitle: chapterTitle || `Chapter ${chapterId + 1}`,
//                 chapterId,
//                 questionTypeId: questionId,
//                 questionMarks,
//                 label,
//                 questions: selectedQuestions || [],
//                 questionNumbers: selectedQuestionNumbers
//             }));
//         }

//         // Navigate back with summary
//         navigation.navigate('PaperSelect', {
//             selectedSummary: {
//                 chapterId,
//                 questionId,
//                 questionMarks,
//                 label,
//                 selectedQuestions: selectedQuestionNumbers,
//                 chapterTitle: chapterTitle || `Chapter ${chapterId + 1}`
//             },
//         });
//     };

//     const openGallery = () => {
//         launchImageLibrary(
//             { mediaType: 'photo', selectionLimit: 1 },
//             (response) => {
//                 if (response.didCancel) return;
//                 if (response.errorCode) return;

//                 console.log('rrrrrrrrrrrrr', response.assets?.[0]);
//                 if (response.assets?.length) {
//                     console.log('eeeeeeeeeeeeeee', response.assets[0].uri);
//                 }
//             }
//         );
//     };

//     const handleRemarkOpenModal = () => {
//         setRemarkVisibleModal(true)
//     }

//     const hanldeRemarkCloseModal = () => {
//         setRemarkVisibleModal(false)
//     }

//     // difficulty type
//     const handleFilterModal = async () => {
//         setLoading(true)
//         try {
//             const response = await GET(ApiEndPoint.difficultyLabel)
//             if (response?.status === 200) {
//                 setDifficultyLabel(response?.result || []);
//             }
//         } catch (error: any) {
//             if (error?.offline) {
//                 return;
//             }
//             const errorMessage = error?.response?.data?.message ||
//                 error?.message ||
//                 'Something went wrong. Please try again.';
//             showToast('error', 'Error', errorMessage);
//         } finally {
//             setLoading(false)
//         }
//     };

//     // question type
//     const handleQuestionType = async () => {
//         setLoading(true)
//         try {
//             const response = await GET(ApiEndPoint.queationtype)
//             if (response?.status === 200) {
//                 setQuestionType(response?.result || []);
//             }
//         } catch (error: any) {
//             if (error?.offline) {
//                 return;
//             }
//             const errorMessage = error?.response?.data?.message ||
//                 error?.message ||
//                 'Something went wrong. Please try again.';
//             showToast('error', 'Error', errorMessage);
//         } finally {
//             setLoading(false)
//         }
//     };

//     // bookFetch
//     const handleBookFetch = async () => {
//         setLoading(true);
//         try {
//             const response = await GET(ApiEndPoint?.bookFetch);
//             if (response?.status === 200) {
//                 setBook(response?.result || []);
//             } else {
//                 showToast('error', 'Error', response?.msg || 'Book not found');
//                 setBook([]);
//             }
//         } catch (error: any) {
//             if (error.offline) {
//                 return
//             }
//             showToast('error', 'Error', 'Something went wrong')
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handlePDFPress = () => {
//         // Get selected questions
//         const selectedQuestions = questionsData?.result?.filter(
//             (q: any) => selectedMap[q.question_id]
//         ) || [];

//         if (!selectedQuestions.length) {
//             showToast('error', 'Please select at least one question')
//             return;
//         }
//         // SET: Store in Redux
//         dispatch(addPDFQuestions(selectedQuestions));
//         // Navigate
//         navigation.navigate('MyPDF', {
//             screen: 'PDFDetailsScreen',
//             params: {
//                 showSolutions: selectCheck === 'Solutions',
//                 questionType: questionId
//             }
//         });
//     };

//   // In QuestionScreen.tsx - Simplified fix for the fetchQuestions function
// // const fetchQuestions = async (
// //     page: number = 1,
// //     limit: number = pagination?.limit,
// //     subject?: string | null,
// //     isLoadMore: boolean = false
// // ) => {
// //     if (isLoadMore) {
// //         setIsLoadingMore(true);
// //     } else {
// //         setLoading(true);
// //     }
    
// //     try {
// //         let params = {
// //             'subject_id': subject ?? selectedSubjectId,
// //             'difficulty': lebelCheck || '3',
// //             'page': page?.toString(),
// //             'limit': limit?.toString()
// //         }

// //         console.log('paramssssss', params);
        
// //         const response = await POST_FORM('question', params)
        
// //         if (response?.status === 200) {
// //             // if (isLoadMore) {
// //             //     // IMPORTANT: Use a Set to ensure unique question IDs
// //             //     setQuestionsData((prev: any) => {
// //             //         const existingQuestions = prev?.result || [];
// //             //         const newQuestions = response?.result || [];
                    
// //             //         // Create a Set of existing IDs for quick lookup
// //             //         const existingIds = new Set(existingQuestions.map((q: any) => q.question_id));
                    
// //             //         // Only add questions that don't already exist
// //             //         const uniqueNewQuestions = newQuestions.filter(
// //             //             (q: any) => !existingIds.has(q.question_id)
// //             //         );
                    
// //             //         console.log(`Adding ${uniqueNewQuestions.length} new unique questions`);
                    
// //             //         return {
// //             //             ...response,
// //             //             result: [...existingQuestions, ...uniqueNewQuestions]
// //             //         };
// //             //     });
// //             // } else {
// //             //     setQuestionsData(response || {});
// //             // }
// //              if (isLoadMore) {
// //                     setQuestionsData((prev: any) => {
// //                         const existingQuestions = prev?.result || [];
// //                         const newQuestions = response?.result || [];
                        
// //                         // Better duplicate checking - check by multiple fields
// //                         const existingIds = new Set(existingQuestions.map((q: any) => q.question_id));
// //                         const existingTexts = new Set(existingQuestions.map((q: any) => q.question_text));
                        
// //                         // Filter out duplicates based on both ID and text
// //                         const uniqueNewQuestions = newQuestions.filter((q: any) => {
// //                             const isDuplicateId = existingIds.has(q.question_id);
// //                             const isDuplicateText = existingTexts.has(q.question_text);
                            
// //                             if (isDuplicateId || isDuplicateText) {
// //                                 console.log('Duplicate found:', q.question_id, q.question_text.substring(0, 30));
// //                                 return false;
// //                             }
// //                             return true;
// //                         });
                        
// //                         console.log(`Existing: ${existingQuestions.length}, New: ${newQuestions.length}, Unique: ${uniqueNewQuestions.length}`);
                        
// //                         // If no unique questions found, we might have reached the end
// //                         if (uniqueNewQuestions.length === 0) {
// //                             setHasMoreData(false);
// //                             return prev;
// //                         }
                        
// //                         return {
// //                             ...response,
// //                             result: [...existingQuestions, ...uniqueNewQuestions]
// //                         };
// //                     });
// //                 } else {
// //                     setQuestionsData(response || {});
// //                 }

// //             if (response?.pagination) {
// //                 setPagination({
// //                     limit: response.pagination.limit,
// //                     page: response.pagination.page,
// //                     pages: response.pagination.pages,
// //                     total: response.pagination.total,
// //                 });
// //                 setHasMoreData(response.pagination.page < response.pagination.pages);
// //             }
// //         }
// //     } catch (error: any) {
// //         console.log('Error:', error);
// //         showToast('error', 'Error', errorMessage);
// //     } finally {
// //         if (isLoadMore) {
// //             setIsLoadingMore(false);
// //         } else {
// //             setLoading(false);
// //         }
// //     }
// // };

// const fetchQuestions = async (
//     page: number = 1,
//     limit: number = pagination?.limit,
//     subject?: string | null,
//     isLoadMore: boolean = false
// ) => {
//     if (isLoadMore) {
//         setIsLoadingMore(true);
//     } else {
//         setLoading(true);
//     }
    
//     try {
//         let params = {
//             'subject_id': subject ?? selectedSubjectId,
//             'difficulty': lebelCheck || '3',
//             'page': page?.toString(),
//             'limit': limit?.toString()
//         }

//         console.log('paramssssss', params);
        
//         const response = await POST_FORM('question', params)
        
//         if (response?.status === 200) {
//             if (isLoadMore) {
//                 setQuestionsData((prev: any) => {
//                     const existingQuestions = prev?.result || [];
//                     const newQuestions = response?.result || [];
                    
//                     // Create a Map using question_id as key to ensure uniqueness
//                     const questionMap = new Map();
                    
//                     // Add existing questions to map
//                     existingQuestions.forEach((q: any) => {
//                         questionMap.set(q.question_id, q);
//                     });
                    
//                     // Add new questions to map (this will automatically overwrite duplicates)
//                     newQuestions.forEach((q: any) => {
//                         questionMap.set(q.question_id, q);
//                     });
                    
//                     // Convert map back to array
//                     const uniqueQuestions = Array.from(questionMap.values());
                    
//                     console.log(`Existing: ${existingQuestions.length}, New: ${newQuestions.length}, Unique: ${uniqueQuestions.length}`);
                    
//                     // Check if we got any new unique questions
//                     if (uniqueQuestions.length === existingQuestions.length) {
//                         setHasMoreData(false);
//                         return prev;
//                     }
                    
//                     return {
//                         ...response,
//                         result: uniqueQuestions
//                     };
//                 });
//             } else {
//                 setQuestionsData(response || {});
//             }

//             if (response?.pagination) {
//                 setPagination({
//                     limit: response.pagination.limit,
//                     page: response.pagination.page,
//                     pages: response.pagination.pages,
//                     total: response.pagination.total,
//                 });
//                 setHasMoreData(response.pagination.page < response.pagination.pages);
//             }
//         }
//     } catch (error: any) {
//         console.log('Error:', error);
//         const errorMessage = error?.response?.data?.message || error?.message || 'Something went wrong';
//         showToast('error', 'Error', errorMessage);
//     } finally {
//         if (isLoadMore) {
//             setIsLoadingMore(false);
//         } else {
//             setLoading(false);
//         }
//     }
// };
//     const generatePDF = async () => {
//         // try {
//         //     const selectedQuestions = questionsData?.result?.filter(
//         //         (q: any) => selectedMap[q.question_id]
//         //     );

//         //     if (!selectedQuestions?.length) {
//         //         Alert.alert('No questions selected');
//         //         return;
//         //     }

//         //     const html = buildPDFHtml(selectedQuestions, selectCheck);

//         //     const file = await RNHTMLtoPDF.convert({
//         //         html,
//         //         fileName: 'Question_Paper',
//         //         directory: 'Documents',
//         //     });

//         //     if (!file?.filePath) {
//         //         throw new Error('PDF generation failed');
//         //     }

//         //     console.log('PDF saved at:', file);
//         //     Alert.alert('PDF Created', file.filePath);

//         // } catch (error) {
//         //     console.log('PDF ERROR:', error);
//         //     Alert.alert('Error', 'Failed to generate PDF');
//         // }
//     };

//     useFocusEffect(
//         useCallback(() => {
//             navigation.getParent()?.setOptions({
//                 tabBarStyle: { display: 'none' },
//             });
//             return () => {
//                 navigation.getParent()?.setOptions({
//                     tabBarStyle: { display: 'flex' },
//                 });
//             };
//         }, [navigation])
//     );

//     useEffect(() => {
//         const init = async () => {
//             const paperType = await localStorage.getItem(storageKeys?.selectedPaperType)
//             const subjectName = await localStorage.getItem(storageKeys.selectedSubject)
//             setPaperType(paperType || '')
//             if (selectedSubjectId) {
//                 setSubjectName(subjectName)
//                 await fetchQuestions(pagination.page, pagination?.limit, selectedSubjectId);
//             }
//         }
//         init()
//     }, [selectedSubjectId]); // Add selectedSubjectId as dependency

//     return (
//         <View style={{ flex: 1, backgroundColor: Colors.white }}>
//             <StatusBar
//                 backgroundColor={Colors.primaryColor}
//                 barStyle="dark-content" />
//             <SafeAreaView edges={["top"]} style={{ backgroundColor: Colors.lightThemeBlue }}>
//                 <HeaderPaperModule
//                     title={paperType || ''}
//                     rightPress={handleOpenDraftModal}
//                     rightPressDisable={questionLenght <= 0 && true}
//                     rightPress2={handlePDFPress}
//                     leftIconPress={handleBack}
//                     subjectName={`${subjectName}`} />
//             </SafeAreaView>

//             {/* MAIN CONTENT */}
//             <SafeAreaView
//                 style={{ flex: 1, backgroundColor: Colors.white }}
//                 edges={["left", "right", "bottom"]}>

//                 <View style={styles.tabContainer}>
//                     <TouchableOpacity
//                         style={[styles.tab, activeTab === 'all' && styles.activeTab]}
//                         // onPress={() => setActiveTab('all')}>
//                             onPress={() => handleTabChange('all')}> 
//                         <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
//                             All Questions
//                         </Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         style={[styles.tab, activeTab === 'topic' && styles.activeTab]}
//                         // onPress={() => setActiveTab('topic')}>
//                             onPress={() => handleTabChange('topic')}>
//                         <Text style={[styles.tabText, activeTab === 'topic' && styles.activeTabText]}>
//                             Topic Wise
//                         </Text>
//                     </TouchableOpacity>
//                 </View>

//                 <View style={{ flex: 1 }}>
//                     {activeTab === 'all' ? (
//                         <>
//                             <View style={styles.optionsSectBox}>
//                                 <View style={{
//                                     flexDirection: 'row', alignItems: 'center'
//                                 }}>
//                                     <TouchableOpacity
//                                         style={{ flexDirection: 'row', alignItems: 'center' }}
//                                         onPress={() => handleCheck('Options')}
//                                         activeOpacity={0.7}>
//                                         <View
//                                             style={[
//                                                 styles.chackBox,
//                                                 {
//                                                     backgroundColor:
//                                                         selectCheck === 'Options' ? '#4292FA' : Colors.white
//                                                 }]}>
//                                             {selectCheck === 'Options' && (
//                                                 <Icon name="check" size={moderateScale(14)} color={Colors.white} />
//                                             )}
//                                         </View>
//                                         <Text style={styles.optionsText}>Options</Text>
//                                     </TouchableOpacity>

//                                     <TouchableOpacity
//                                         style={styles.solutionMainBox}
//                                         onPress={() => handleCheck('Solutions')}
//                                         activeOpacity={0.7}>
//                                         <View
//                                             style={[
//                                                 styles.chackBox,
//                                                 {
//                                                     backgroundColor:
//                                                         selectCheck === 'Solutions' ? '#4292FA' : Colors.white
//                                                 }]}>
//                                             {selectCheck === 'Solutions' && (
//                                                 <Icon name="check" size={moderateScale(14)} color={Colors.white} />
//                                             )}
//                                         </View>
//                                         <Text style={styles.optionsText}>Solutions</Text>
//                                     </TouchableOpacity>
//                                 </View>

//                                 <View style={styles.filteMain} >
//                                     <Text style={styles.questionSelected} onPress={() => { }}>
//                                         {Object.keys(selectedMap).length ?? 0} Ques Selected
//                                     </Text>
//                                     <TouchableOpacity style={styles.filterBtn} onPress={handleLabelStatus}>
//                                         <Image source={Icons.filter} resizeMode="contain" style={styles.filteImg} />
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>

//                             {/* Pagination*/}
//                             {pagination.pages > 1 && (
//                                 <Pagination
//                                     paginationData={pagination}
//                                     onPageChange={handlePageChange}
//                                     onLimitChange={handleLimitChange}
//                                 />)}

//                             <QuestionListData
//                                 selectCheck={selectCheck}
//                                 selectedMap={selectedMap}
//                                 setSelectedMap={setSelectedMap}
//                                 questionsData={questionsData?.result ?? []}
//                                 currentPage={pagination?.page}
//                                 limit={pagination.limit}
//                                 questionNumber={questionNumber}
//                                 setQuestionNumber={setQuestionNumber}
//                                 isLoading={loading}
//                                 selectedQuestions={selectedQuestions}
//                                 getAllRute={route?.params}
//                                 // Add these new props
//                                 onLoadMore={handleLoadMore}
//                                 hasMoreData={hasMoreData}
//                                 isLoadingMore={isLoadingMore}
//                             />

//                             <AppModal visible={labelStatus} onClose={handleLabelClose}>
//                                 <View style={styles.applyBox}>
//                                     <Text style={styles.diffeicultText}>Apply Filter</Text>
//                                     <TouchableOpacity onPress={handleClearFilter} style={{ padding: moderateScale(1) }}>
//                                         <Text style={styles.clearAllText}>Clear all filters</Text>
//                                     </TouchableOpacity>
//                                 </View>

//                                 <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
//                                     <View style={styles.lineBox} />

//                                     <Text style={styles.diffecultyText}>Difficulty level</Text>
//                                     <View style={styles.easyBox}>
//                                         <View style={styles.difficultMainBox}>
//                                             {difficultyLabel?.map(item => (
//                                                 <Pressable key={item?.dlevel_id} style={styles.checkBoxMain} onPress={() => handleCheckStatus(item?.dlevel_id)}>
//                                                     <View style={[styles.checkBox, lebelCheck === item?.dlevel_id && { backgroundColor: Colors.primaryColor, borderWidth: 0 }]}>
//                                                         {lebelCheck === item?.dlevel_id && (
//                                                             <IconEntypo name='check' size={moderateScale(14.5)} color={Colors.white} />
//                                                         )}
//                                                     </View>
//                                                     <Text style={styles.easyText}>{item?.dlevel_name}</Text>
//                                                 </Pressable>
//                                             ))}
//                                         </View>
//                                     </View>

//                                     <Text style={[styles.diffecultyText, { marginTop: moderateScale(20) }]}>Question Type</Text>
//                                     {questionType?.map(item => (
//                                         <Pressable key={item?.qp_id} style={[styles.checkBoxMain, { justifyContent: "flex-start" }]} onPress={() => handleQuestionTypeSelect(item?.qp_id)}>
//                                             <View style={[styles.checkBox, questionTypeSelect === item?.qp_id && { backgroundColor: Colors.primaryColor, borderWidth: 0 }]}>
//                                                 {questionTypeSelect === item?.qp_id && (
//                                                     <IconEntypo name='check' size={moderateScale(14.5)} color={Colors.white} />
//                                                 )}
//                                             </View>
//                                             <Text style={styles.easyText}>{item?.qp_name}</Text>
//                                         </Pressable>
//                                     ))}

//                                     <Text style={[styles.diffecultyText, { marginTop: moderateScale(20) }]}>Books</Text>
//                                     {book?.map(item => (
//                                         <Pressable key={item?.book_id} style={[styles.checkBoxMain, { justifyContent: "flex-start" }]} onPress={() => handleBookSelect(item?.book_id)}>
//                                             <View style={[styles.checkBox, bookSelect === item?.book_id && { backgroundColor: Colors.primaryColor, borderWidth: 0 }]}>
//                                                 {bookSelect === item?.book_id && (
//                                                     <IconEntypo name='check' size={moderateScale(14.5)} color={Colors.white} />
//                                                 )}
//                                             </View>
//                                             <Text style={styles.easyText}>{item?.book_name}</Text>
//                                         </Pressable>
//                                     ))}
//                                 </ScrollView>

//                                 <View style={styles.lineBox} />

//                                 <View style={[styles.easyBox, styles.btnMain]}>
//                                     <AppButton title="Cancel" style={styles.cancelBtn} textStyle={styles.cancelText} onPress={handleFilterClose} />
//                                     <AppButton title="Apply Filter" style={styles.applyFilterBox} textStyle={styles.applyText} onPress={handleApplyFilter} />
//                                 </View>
//                             </AppModal>

//                             <AppModal visible={remarkVisibleModal} onClose={hanldeRemarkCloseModal}>
//                                 <Pressable onPress={openGallery}>
//                                     <Text>Upload photo</Text>
//                                 </Pressable>
//                             </AppModal>

//                             <DraftModal activeDraft={visibleDraft} onClose={handleCloseDraftModal} questionId={Object.keys(selectedMap)} />
//                         </>
//                     ) : (
//                         <>
//                             <View style={styles.optionsSectBox}>
//                                 <View style={{
//                                     flexDirection: 'row', alignItems: 'center'
//                                 }}>
//                                     <TouchableOpacity
//                                         style={{ flexDirection: 'row', alignItems: 'center' }}
//                                         onPress={() => handleCheck('Options')}
//                                         activeOpacity={0.7}>
//                                         <View
//                                             style={[
//                                                 styles.chackBox,
//                                                 {
//                                                     backgroundColor:
//                                                         selectCheck === 'Options' ? '#4292FA' : Colors.white
//                                                 }]}>
//                                             {selectCheck === 'Options' && (
//                                                 <Icon name="check" size={moderateScale(14)} color={Colors.white} />
//                                             )}
//                                         </View>
//                                         <Text style={styles.optionsText}>Options</Text>
//                                     </TouchableOpacity>

//                                     <TouchableOpacity
//                                         style={styles.solutionMainBox}
//                                         onPress={() => handleCheck('Solutions')}
//                                         activeOpacity={0.7}>
//                                         <View
//                                             style={[
//                                                 styles.chackBox,
//                                                 {
//                                                     backgroundColor:
//                                                         selectCheck === 'Solutions' ? '#4292FA' : Colors.white
//                                                 }]}>
//                                             {selectCheck === 'Solutions' && (
//                                                 <Icon name="check" size={moderateScale(14)} color={Colors.white} />
//                                             )}
//                                         </View>
//                                         <Text style={styles.optionsText}>Solutions</Text>
//                                     </TouchableOpacity>
//                                 </View>

//                                 <View style={styles.filteMain} >
//                                     <Text style={styles.questionSelected} onPress={() => { }}>
//                                         {Object.keys(selectedMap).length ?? 0} Ques Selected
//                                     </Text>
//                                     <TouchableOpacity style={styles.filterBtn} onPress={handleLabelStatus}>
//                                         <Image source={Icons.filter} resizeMode="contain" style={styles.filteImg} />
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>

//                             {/* Pagination*/}
//                             {pagination.pages > 1 && (
//                                 <Pagination
//                                     paginationData={pagination}
//                                     onPageChange={handlePageChange}
//                                     onLimitChange={handleLimitChange}
//                                 />)}

//                             <QuestionListData
//                                 selectCheck={selectCheck}
//                                 selectedMap={selectedMap}
//                                 setSelectedMap={setSelectedMap}
//                                 questionsData={questionsData?.result ?? []}
//                                 currentPage={pagination?.page}
//                                 limit={pagination.limit}
//                                 questionNumber={questionNumber}
//                                 setQuestionNumber={setQuestionNumber}
//                                 isLoading={loading}
//                                 selectedQuestions={selectedQuestions}
//                                 getAllRute={route?.params}
//                                 // Add these new props
//                                 onLoadMore={handleLoadMore}
//                                 hasMoreData={hasMoreData}
//                                 isLoadingMore={isLoadingMore}
//                             />

//                             <AppModal visible={labelStatus} onClose={handleLabelClose}>
//                                 <View style={styles.applyBox}>
//                                     <Text style={styles.diffeicultText}>Apply Filter</Text>
//                                     <TouchableOpacity onPress={handleClearFilter} style={{ padding: moderateScale(1) }}>
//                                         <Text style={styles.clearAllText}>Clear all filters</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                                 <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
//                                     <View style={styles.lineBox} />
//                                     <Text style={styles.diffecultyText}>Difficulty level</Text>
//                                     <View style={styles.easyBox}>
//                                         <View style={styles.difficultMainBox}>
//                                             {difficultyLabel?.map(item => (
//                                                 <Pressable key={item?.dlevel_id} style={styles.checkBoxMain} onPress={() => handleCheckStatus(item?.dlevel_id)}>
//                                                     <View style={[styles.checkBox, lebelCheck === item?.dlevel_id && { backgroundColor: Colors.primaryColor, borderWidth: 0 }]}>
//                                                         {lebelCheck === item?.dlevel_id && <IconEntypo name='check' size={moderateScale(14.5)} color={Colors.white} />
//                                                         }
//                                                     </View>
//                                                     <Text style={styles.easyText}>{item?.dlevel_name}</Text>
//                                                 </Pressable>))}
//                                         </View>
//                                     </View>
//                                     <Text style={[styles.diffecultyText, { marginTop: moderateScale(20) }]}>Question Type</Text>
//                                     {questionType?.map(item => (
//                                         <Pressable key={item?.qp_id} style={[styles.checkBoxMain, { justifyContent: "flex-start" }]} onPress={() => handleQuestionTypeSelect(item?.qp_id)}>
//                                             <View style={[styles.checkBox, questionTypeSelect === item?.qp_id && { backgroundColor: Colors.primaryColor, borderWidth: 0 }]}>
//                                                 {questionTypeSelect === item?.qp_id && <IconEntypo name='check' size={moderateScale(14.5)} color={Colors.white} />}
//                                             </View>
//                                             <Text style={styles.easyText}>{item?.qp_name}</Text>
//                                         </Pressable>
//                                     ))}

//                                     <Text style={[styles.diffecultyText, { marginTop: moderateScale(20) }]}>Books</Text>
//                                     {book?.map(item => (
//                                         <Pressable key={item?.book_id} style={[styles.checkBoxMain, { justifyContent: "flex-start" }]} onPress={() => handleBookSelect(item?.book_id)}>
//                                             <View style={[styles.checkBox, bookSelect === item?.book_id && { backgroundColor: Colors.primaryColor, borderWidth: 0 }]}>
//                                                 {bookSelect === item?.book_id && <IconEntypo name='check' size={moderateScale(14.5)} color={Colors.white} />}
//                                             </View>
//                                             <Text style={styles.easyText}>{item?.book_name}</Text>
//                                         </Pressable>
//                                     ))}
//                                 </ScrollView>
//                                 <View style={[styles.lineBox]} />
//                                 <View style={[styles.easyBox, styles.btnMain]}>
//                                     <AppButton title="Cancel" style={styles.cancelBtn} textStyle={styles.cancelText} onPress={handleFilterClose} />
//                                     <AppButton title="Apply Filter" style={styles.applyFilterBox}
//                                         textStyle={styles.applyText} onPress={handleApplyFilter} />
//                                 </View>
//                             </AppModal>

//                             <AppModal visible={remarkVisibleModal} onClose={hanldeRemarkCloseModal}>
//                                 <Pressable onPress={openGallery}>
//                                     <Text>Upload photo</Text>
//                                 </Pressable>
//                             </AppModal>
//                         </>
//                     )}
//                 </View>
//             </SafeAreaView>
//         </View>
//     );
// };

// export default QuestionScreen;
// *************************************