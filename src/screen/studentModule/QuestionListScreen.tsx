import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, Image, Pressable } from 'react-native';
import { Colors, Fonts } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderPaperModule from '../../component/headerpapermodule/Headerpapermodule';
import { moderateScale } from '../../utils/responsiveSize';
import QuestionListComponent from './component/questionlist/QuestionListComponent';
import Loader from '../../component/loader/Loader';
import { showToast } from '../../utils/toast';
import { GET, POST_FORM } from '../../api/request';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import Pagination from './component/Pagination';
import { useSelector } from 'react-redux';
import { Icons } from '../../assets/icons';
import { ApiEndPoint } from '../../api/endPoints';
import AppModal from '../../component/modal/AppModal';
import { ScrollView } from 'react-native-gesture-handler';
import IconEntypo from "react-native-vector-icons/FontAwesome5";
import AppButton from '../../component/button/AppButton';

// import Pagination from '../papermodule/questionModule/component/Pagination';

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
const QuestionListScreen = (props: QuestionListScreenProps) => {
    const navigation = useNavigation()
    const route = useRoute();
    // const { chapterName  ?? ''} = route?.params
//     const { chapterName === '' ? '' : chapterName
// } = route?.params || {};
const { chapterName } = route?.params || {};
const finalChapterName = chapterName === undefined ? 'Numeric' : chapterName;

const selectedSubjectId = useSelector((state) => state?.selectedSubId?.selectedSubId)
const [selectCheck, setSelectedCheck] = useState('Options')
const [selectedMap, setSelectedMap] = useState<Record<string, boolean>>({});
const [questionsData, setQuestionsData] = useState<any>({});
const [questionTypeSelect, setQuestionTypeSelect] = useState<string | null>(null);
const [bookSelect, setBookSelect] = useState<string | null>(null);
const [difficultyLabel, setDifficultyLabel] = useState<Difficulty[]>([]);
const [questionType, setQuestionType] = useState<QuestionType[]>([]);
const [book, setBook] = useState<Book[]>([]);
const [labelStatus, setLabelStatus] = useState(false);
const [lebelCheck, setLabelCheck] = useState<string | null>(null);
const [loading, setLoading] = useState(false);

const [pagination, setPagination] = useState({
    limit: 10,
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
const fetchQuestions = async (page: number = 1, limit: number = pagination?.limit, subject?: string | null) => {
    setLoading(true)
    try {
        let params = {
            'subject_id': subject ?? selectedSubjectId,
            'difficulty': lebelCheck || '3',
            // 'easy': '3',
            'page': page?.toString(),
            'limit': limit?.toString()
            // 'subject_id': selectedSubjectId || 6,
            // 'difficulty': '3',
            // // 'easy': '3',
            // 'page': page?.toString(),
            // 'limit': limit?.toString()
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
    fetchQuestions(pagination.page, pagination?.limit);
}, []);

return (
    <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={Colors.lightThemeBlue} />
        <SafeAreaView style={{ backgroundColor: Colors.lightThemeBlue }} edges={['top']}>
            <HeaderPaperModule title={`${finalChapterName}`} leftIconPress={handleBack}  />
        </SafeAreaView>

        <SafeAreaView style={styles.homeContainer} edges={['left', 'right', 'bottom']}>
            <Loader visible={loading} />
            <View style={{ borderColor: '#000', marginVertical: moderateScale(20), flexDirection: 'row', alignItems: "center" }}>
                {pagination.pages > 1 && (
                    <Pagination
                        paginationData={pagination}
                        onPageChange={handlePageChange}
                        onLimitChange={handleLimitChange}
                    />
                )}
                {loading === false && <TouchableOpacity style={styles.filterBtn} onPress={handleLabelStatus}>
                    <Image source={Icons.filter} resizeMode="contain" style={styles.filteImg} />
                </TouchableOpacity>}
            </View>

            {/* <Text style={styles.paperText}>PaperListScreen component</Text> */}
            <QuestionListComponent
                selectCheck={selectCheck}
                selectedMap={selectedMap}
                setSelectedMap={setSelectedMap}
                questionsData={questionsData?.result ?? []}
                currentPage={pagination?.page}
                limit={pagination.limit}
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
        // marginHorizontal:moderateScale(16)
    },
    diffecultyText: {
        fontSize: moderateScale(16),
        color: Colors.black,
        fontFamily: Fonts.InstrumentSansRegular,
        marginLeft: moderateScale(16)
    },
    checkBox: {
        height: moderateScale(18),
        width: moderateScale(18),
        borderWidth: 1,
        borderRadius: moderateScale(3),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white
    },
    // innerBox: {
    //   height: moderateScale(),
    //   width: moderateScale(),
    //   borderWidth: 1,
    //   borderRadius: moderateScale(3)
    // },
    easyText: {
        fontSize: moderateScale(14),
        color: Colors.black,
        fontFamily: Fonts.InstrumentSansMedium,
        marginLeft: moderateScale(11)
    },
    easyBox: {
        flexDirection: 'row',
        // justifyContent:'center',
        alignItems: "center"
    },
    checkBoxMain: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        marginHorizontal: moderateScale(17),
        // borderWidth:1,
        marginTop: moderateScale(8)
    },
    difficultMainBox: {
        flexDirection: "row",
        justifyContent: "center",
        // alignItems: "center"
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
        paddingVertical: moderateScale(12.2)
    },
    applyFilterBox: {
        width: '46%',
        paddingVertical: moderateScale(12.2)

    },
    btnMain: {
        justifyContent: "space-between",
        marginHorizontal: moderateScale(16.8),
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

})