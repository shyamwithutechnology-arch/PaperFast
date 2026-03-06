import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, Image, Pressable, Animated } from 'react-native';
import { Colors, Fonts } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from '../../utils/responsiveSize';
import { showToast } from '../../utils/toast';
import { GET, POST_FORM } from '../../api/request';
import { useFocusEffect, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import Pagination from './component/Pagination';
import { useSelector } from 'react-redux';
import { Icons } from '../../assets/icons';
import { ApiEndPoint } from '../../api/endPoints';
import AppModal from '../../component/modal/AppModal';
import { ScrollView } from 'react-native-gesture-handler';
import IconEntypo from "react-native-vector-icons/FontAwesome5";
import AppButton from '../../component/button/AppButton';
import BookMark from "react-native-vector-icons/Ionicons";
import TextTicker from "react-native-text-ticker";
import { localStorage, storageKeys } from '../../storage/storage';
import QuestionListData from '../../screen/studentModule/questionlist/QuestionListData';

export type QuestionListScreenProps = {

}
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
const QuestionListScreen = () => {
    // Use hooks instead of props
    const navigation = useNavigation();
    const route = useRoute();    // const { chapterName  ?? ''} = route?.params
    //     const { chapterName === '' ? '' : chapterName
    // } = route?.params || {};
    // const { chapterName } = route?.params || {};
    const {
        chapterId,
        questionId,
        questionMarks,
        label,
        chapterTitle,
        question_type,
        selectedQuestions,
        question_chapter,
        chapterName
    } = route.params as {
        chapterId: number;
        questionId: string;
        question_type: string;
        questionMarks: string;
        label: string;
        chapterTitle: string;
        question_chapter: string,
        selectedQuestions: any[],
        chapterName: string
    };
    const isFocus = useIsFocused()
    const finalChapterName = chapterName === undefined ? 'Numeric' : chapterName;
    const [activeTab, setActiveTab] = useState('all');
    const selectedSubjectId = useSelector((state) => state?.selectedSubId?.selectedSubId)
    const [selectCheck, setSelectedCheck] = useState('Options')
    const [selectedMap, setSelectedMap] = useState<Record<string, boolean>>({});
    const [boardId, setBoardId] = useState<string>('');
    const [standardId, setStandardId] = useState<string>('');
    const [paperType, setPaperType] = useState<string | null>('');
    const [bucketSelect, setBucketSelect] = useState<string | null>(null);
    const [bucketData, setBucketData] = useState<any>([]);
    const [questionNumber, setQuestionNumber] = useState<Record<string, boolean>>({});
    const [questionsData, setQuestionsData] = useState<any>({});
    const [questionTypeSelect, setQuestionTypeSelect] = useState<string | null>(null);
    const [bookSelect, setBookSelect] = useState<string | null>(null);
    const [difficultyLabel, setDifficultyLabel] = useState<Difficulty[]>([]);
    const [questionType, setQuestionType] = useState<QuestionType[]>([]);
    const [book, setBook] = useState<Book[]>([]);
    const [labelStatus, setLabelStatus] = useState(false);
    const [lebelCheck, setLabelCheck] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [answerStats, setAnswerStats] = useState({
        correct: [] as string[],
        incorrect: [] as string[]
    });

    console.log('answerStats.correct', answerStats.correct);


    const [headerHeight, setHeaderHeight] = useState(0);
    const headerAnim = useRef(new Animated.Value(0)).current;
    const headerVisible = useRef(true);
    // pagination 

    // animation 

    const hideHeader = () => {
        if (!headerVisible.current) return;
        headerVisible.current = false;

        Animated.timing(headerAnim, {
            toValue: -headerHeight,
            duration: 250,
            useNativeDriver: true,
        }).start();
    };

    const showHeader = () => {
        if (headerVisible.current) return;
        headerVisible.current = true;
        Animated.timing(headerAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
        }).start();
    };

    const loadAnswerStats = async () => {
        try {
            const saved = await localStorage.getItem('answerStats');
            if (saved) {
                setAnswerStats(JSON.parse(saved));
            }
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    };
    const [pagination, setPagination] = useState({
        limit: 50,
        page: 1,
        pages: 1,
        total: 0,
    });
    const handleBack = () => {
        navigation?.goBack()
    }
    // Handle page change
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.pages) {
            fetchQuestions(
                boardId || '',
                standardId || '',
                newPage,
                pagination.limit,
                selectedSubjectId
            );
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

        fetchQuestions(
            boardId || '',
            standardId || '',
            1,
            newLimit,
            selectedSubjectId
        );
    };
    // const fetchQuestions = async (page: number = 1, limit: number = pagination?.limit, subject?: string | null) => {
    //     setLoading(true)
    //     try {
    //         let params = {
    //             'subject_id': subject ?? selectedSubjectId,
    //             'difficulty': lebelCheck || '3',
    //             // 'easy': '3',
    //             'page': page?.toString(),
    //             'limit': limit?.toString()
    //             // 'subject_id': selectedSubjectId || 6,
    //             // 'difficulty': '3',
    //             // // 'easy': '3',
    //             // 'page': page?.toString(),
    //             // 'limit': limit?.toString()
    //         }
    //         const response = await POST_FORM('question', params)
    //         if (response?.status === 200) {
    //             setQuestionsData(response || {});
    //             if (response?.pagination) {
    //                 setPagination({
    //                     limit: response.pagination.limit,
    //                     page: response.pagination.page,
    //                     pages: response.pagination.pages,
    //                     total: response.pagination.total,
    //                 });
    //             }
    //         }
    //     } catch (error: any) {
    //         if (error?.offline) {
    //             return;
    //         }
    //         const errorMessage = error?.response?.data?.message ||
    //             error?.message ||
    //             'Something went wrong. Please try again.';
    //         showToast('error', 'Error', errorMessage);
    //     } finally {
    //         setLoading(false)
    //     }
    // };
    // difficulty type

    const fetchQuestions = async (
        board_Id: string,
        standard_Id: string,
        page: number = 1,
        limit: number = pagination?.limit,
        subject?: string | null
    ) => {
        setLoading(true);
        try {

            let params = {
                'subject_id': subject ?? selectedSubjectId,
                'difficulty': lebelCheck,
                'question_type': questionTypeSelect === null ? question_type : questionTypeSelect,
                'board_id': board_Id ?? boardId,
                'question_chapter': question_chapter,
                'class_id': standard_Id ?? standardId,
                'page': page?.toString(),
                'limit': limit?.toString(),
                'question_bucket': bucketSelect,
                'book_id': bookSelect
            };

            console.log('Fetch params:latest', params);
            const response = await POST_FORM(ApiEndPoint.question, params);
            // console.log('ressssssssssss', response);

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
            setLoading(false);
        }
    };
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

    // const handleLabelStatus = async () => {
    //     await handleFilterModal()
    //     await handleQuestionType()
    //     await handleBookFetch()
    //     setLabelStatus(true)
    // }
    const handleLabelStatus = async () => {
        // setLoading(true)
        await handleFilterModal()
        await handleQuestionType()
        await handleBookFetch(),
            await handleBucket()
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

    // ??????????
    const handleBucketSelect = (item: string) => {
        setBucketSelect(item)
    }
    const handleApplyFilter = async () => {
        setLoading(true)
        await fetchQuestions(boardId, standardId, pagination.page, pagination?.limit, selectedSubjectId);
        setLabelStatus(false)
    }
    const handleClearFilter = async () => {
        setLabelCheck(null);
        setQuestionTypeSelect(null);
        setBookSelect(null);
        setBucketSelect(null);
        setPagination(prev => ({ ...prev, page: 1 }));

        await fetchQuestions(
            boardId || '',
            standardId || '',
            1,
            pagination.limit,
            selectedSubjectId
        );
        setLabelStatus(false);
    };
    // ??????????

    const handleBucket = async () => {
        setLoading(true)
        try {
            const response = await GET(ApiEndPoint.questionBucket)
            if (response?.status === 200) {
                setBucketData(response?.result || []);
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
    // const handleApplyFilter = async () => {
    //     await fetchQuestions(pagination.page, pagination?.limit);
    //     setLabelStatus(false)
    // }
    // const handleClearFilter = async () => {
    //     setLabelCheck(null),
    //         setQuestionTypeSelect(null),
    //         await fetchQuestions(pagination.page, pagination?.limit);
    //     setLabelStatus(false)
    // }
    useFocusEffect(
        useCallback(() => {
            loadAnswerStats();
        }, [])
    );
    // useEffect(() => {
    //     fetchQuestions(pagination.page, pagination?.limit);
    // }, []);


    useEffect(() => {
        const init = async () => {
            const paperType = await localStorage.getItem(storageKeys?.selectedPaperType);
            const board_Id = await localStorage.getItem(storageKeys.boardId);
            const standard_Id = await localStorage.getItem(storageKeys.selectedStandardId);

            setBoardId(board_Id);
            setStandardId(standard_Id);
            setPaperType(paperType || '');

            if (selectedSubjectId && board_Id && standard_Id) {
                // console.log('Initial fetch with:', { board_Id, standard_Id, selectedSubjectId });
                await fetchQuestions(
                    board_Id,
                    standard_Id,
                    pagination.page,
                    pagination.limit,
                    selectedSubjectId
                );
            }
        };
        init();
    }, [selectedSubjectId]);
    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor={Colors.lightThemeBlue} />
            <SafeAreaView style={[styles.headerSafe, { zIndex: 1000 }]} edges={['top']} >
                <View style={styles.qsBox}>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <TouchableOpacity onPress={handleBack} style={styles.arrowBox}>
                            <Image source={Icons?.back} style={styles.backImg} resizeMode="contain" />
                        </TouchableOpacity>
                        <TextTicker style={styles.title}
                            duration={8000}
                            loop
                            bounce
                            repeatSpacer={50}
                            marqueeDelay={1500}>
                            {`${finalChapterName}`}
                        </TextTicker>

                    </View>
                    <Pressable style={{ borderWidth: 0 }} onPress={() => navigation.navigate('BookMarkScreen')}>
                        <BookMark name='bookmark-outline' size={moderateScale(22)} color={Colors.primaryColor} />
                    </Pressable>
                </View>
            </SafeAreaView>
            <SafeAreaView style={styles.homeContainer} edges={['left', 'right', 'bottom']}>
                <Animated.View
                    onLayout={(e) => {
                        const h = e.nativeEvent.layout.height;
                        setHeaderHeight(h);
                    }}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                        backgroundColor: Colors.white,
                        transform: [{ translateY: headerAnim }],
                    }}
                >
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

                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        {/* Pagination*/}
                        {pagination.pages > 1 && (
                            <Pagination
                                paginationData={pagination}
                                onPageChange={handlePageChange}
                                onLimitChange={handleLimitChange}
                            />)}

                        {!loading && <TouchableOpacity style={styles.filterBtn} onPress={handleLabelStatus}>
                            <Image source={Icons.filter} resizeMode="contain" style={styles.filteImg} />
                        </TouchableOpacity>}
                    </View>
                </Animated.View>
                <Animated.View
                    style={{
                        flex: 1,
                        transform: [
                            {
                                translateY: headerAnim.interpolate({
                                    inputRange: [-headerHeight, 0],
                                    outputRange: [0, headerHeight],
                                    extrapolate: "clamp",
                                }),
                            },
                        ],
                    }}
                >
                    {activeTab === 'all' ? (
                        <>
                            {/* <QuestionListComponent
                                selectCheck={selectCheck}
                                selectedMap={selectedMap}
                                setSelectedMap={setSelectedMap}
                                questionsData={questionsData?.result ?? []}
                                currentPage={pagination?.page}
                                limit={pagination.limit}
                                correctAnswers={answerStats.correct}
                                incorrectAnswers={answerStats.incorrect}
                                isLoading={loading}
                            /> */}
                            <QuestionListData
                                selectCheck={'Options'}
                                selectedMap={selectedMap}
                                setSelectedMap={setSelectedMap}
                                questionsData={questionsData?.result ?? []}
                                currentPage={pagination?.page}
                                limit={pagination.limit}
                                questionNumber={questionNumber}
                                setQuestionNumber={setQuestionNumber}
                                isLoading={loading}
                                selectedQuestions={selectedQuestions}
                                getAllRute={route?.params} 
                                onEndReached={() => {
                                    if (pagination.page < pagination.pages) { 
                                        fetchQuestions(
                                            boardId,
                                            standardId,
                                            pagination.page + 1,
                                            pagination.limit,
                                            selectedSubjectId
                                        );
                                    }
                                }}

                                onScrollDirection={(dir) => {
                                    if (dir === "down") hideHeader();
                                    else showHeader();
                                }}

                                correctAnswers={answerStats.correct}
                                incorrectAnswers={answerStats.incorrect}
                            />
                        </>
                    ) : (
                        <>
                            {/* <QuestionListComponent
                                selectCheck={selectCheck}
                                selectedMap={selectedMap}
                                setSelectedMap={setSelectedMap}
                                questionsData={questionsData?.result ?? []}
                                currentPage={pagination?.page}
                                limit={pagination.limit}
                                correctAnswers={answerStats.correct}
                                incorrectAnswers={answerStats.incorrect}
                                isLoading={loading}
                            /> */}
                            <QuestionListData
                                selectCheck={'Options'}
                                selectedMap={selectedMap}
                                setSelectedMap={setSelectedMap}
                                questionsData={questionsData?.result ?? []}
                                currentPage={pagination?.page}
                                limit={pagination.limit}
                                questionNumber={questionNumber}
                                setQuestionNumber={setQuestionNumber}
                                isLoading={loading}
                                selectedQuestions={selectedQuestions}
                                getAllRute={route?.params}
                                onEndReached={() => {
                                    if (pagination.page < pagination.pages) {
                                        fetchQuestions(
                                            boardId,
                                            standardId,
                                            pagination.page + 1,
                                            pagination.limit,
                                            selectedSubjectId
                                        );
                                    }
                                }}

                                onScrollDirection={(dir) => {
                                    if (dir === "down") hideHeader();
                                    else showHeader();
                                }}

                                correctAnswers={answerStats.correct}
                                incorrectAnswers={answerStats.incorrect}
                            />
                        </>
                    )}
                </Animated.View>
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

                        <Text style={[styles.diffecultyText, { marginTop: moderateScale(20) }]}>Bucket</Text>
                        {bucketData?.map(item => (
                            <Pressable key={item?.bt_id} style={[styles.checkBoxMain, { justifyContent: "flex-start" }]} onPress={() => handleBucketSelect(item?.bt_id)}>
                                <View style={[styles.checkBox, bucketSelect === item?.bt_id && { backgroundColor: Colors.primaryColor, borderWidth: 0 }]}>
                                    {bucketSelect === item?.bt_id && (
                                        <IconEntypo name='check' size={moderateScale(14)} color={Colors.white} />
                                    )}
                                </View>
                                <Text style={styles.easyText}>{item?.bt_name}</Text>
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
            </SafeAreaView>
        </View>
    )
}

export default QuestionListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    homeContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    paperText: {
        fontSize: moderateScale(14)
    },
    filterBtn: {
        backgroundColor: Colors.lightThemeBlue,
        borderRadius: moderateScale(4),
        height: moderateScale(30),
        width: moderateScale(30),
        alignItems: "center",
        justifyContent: 'center',
        marginLeft: moderateScale(15)
    },
    filteImg: {
        height: moderateScale(20),
        width: moderateScale(20)
    },
    diffeicultText: {
        fontSize: moderateScale(20),
        color: Colors.primaryColor,
        fontFamily: Fonts.InstrumentSansSemiBold
    },
    clearAllText: {
        fontSize: moderateScale(16),
        color: Colors.red,
        fontFamily: Fonts.InstrumentSansRegular
    },
    headerSafe: {
        backgroundColor: Colors.lightThemeBlue,
        paddingHorizontal: moderateScale(16),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: moderateScale(10),
        paddingTop: moderateScale(10),
    },
    arrowBox: {
        paddingLeft: moderateScale(1),
        width: moderateScale(28),
    },
    qsBox: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1
    },
    applyBox: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: moderateScale(16)
    },
    lineBox: {
        height: .6,
        backgroundColor: Colors?.InputStroke,
        width: '100%',
        marginVertical: moderateScale(16)
    },
    diffecultyText: {
        fontSize: moderateScale(15),
        color: Colors.primaryColor,
        fontFamily: Fonts.InstrumentSansMedium,
        marginLeft: moderateScale(16)
    },
    checkBox: {
        height: moderateScale(16.5),
        width: moderateScale(16.5),
        borderWidth: 1,
        borderRadius: moderateScale(3),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white
    },
    easyText: {
        fontSize: moderateScale(13),
        color: Colors.black,
        fontFamily: Fonts.InstrumentSansMedium,
        marginLeft: moderateScale(11)
    },
    easyBox: {
        flexDirection: 'row',
        alignItems: "center"
    },
    checkBoxMain: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        marginHorizontal: moderateScale(17),
        marginTop: moderateScale(8)
    },
    difficultMainBox: {
        flexDirection: "row",
        justifyContent: "center",
    },
    cancelText: {
        color: Colors?.InputText,
        fontFamily: Fonts?.InterRegular,
        fontSize: moderateScale(15)
    },
    applyText: {
        fontFamily: Fonts?.InterRegular,
        fontSize: moderateScale(15)
    },
    cancelBtn: {
        width: '46%',
        backgroundColor: 'rgba(0,0,0,.2)',
        paddingVertical: moderateScale(10)
    },
    applyFilterBox: {
        width: '46%',
        paddingVertical: moderateScale(10)

    },
    btnMain: {
        justifyContent: "space-between",
        marginHorizontal: moderateScale(16.8),
    },
    backImg: {
        width: moderateScale(20),
        height: moderateScale(20),
    },
    title: {
        fontSize: moderateScale(15),
        color: Colors.black,
        fontFamily: Fonts.InstrumentSansMedium,
        // flex: 1,
        textAlign: 'left',
        width: moderateScale(270),
        // borderWidth:1,
        marginLeft: moderateScale(2)
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightThemeBlue,
    },
    tab: {
        flex: 1,
        paddingVertical: moderateScale(12),
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 1.2,
        borderBottomColor: Colors.primaryColor,
    },
    tabText: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InterMedium,
        color: Colors.primaryColor,
    },
    activeTabText: {
        color: Colors.primaryColor,
        fontFamily: Fonts.InterSemiBold,
    },

})
