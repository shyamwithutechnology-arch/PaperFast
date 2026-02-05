// import React, { useCallback, useEffect, useState } from "react";
// import { View, StatusBar, TouchableOpacity, Text, Image } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Colors } from "../../../theme";
// import HeaderPaperModule from "../../../component/headerpapermodule/Headerpapermodule";
// import { styles } from "./styles";
// import Icon from "react-native-vector-icons/Feather";
// import { moderateScale } from "../../../utils/responsiveSize";
// import { Icons } from "../../../assets/icons";
// import QuestionListData, { Question } from './component/questionlist/QuestionListData';
// import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
// import { POST_FORM } from "../../../api/request";
// import Loader from "../../../component/loader/Loader";
// const QuestionScreen = () => {
//     const navigation = useNavigation()
//     const route = useRoute();
//     const {
//         chapterId,
//         questionId,
//         questionMarks,
//         label,
//     } = route.params as {
//         chapterId: number;
//         questionId: string;
//         questionMarks: string;
//         label: string;
//     };
//     const [selectCheck, setSelectedCheck] = useState('Options')
//     const [selectedMap, setSelectedMap] = useState<Record<string, boolean>>({});
//     const [questionsData, setQuestionsData] = useState<Question[]>([]);
//     console.log('questionsData', questionsData?.pagination);

//     const [loader, setLoader] = useState(false)
//     const handleCheck = (item: string) => {
//         setSelectedCheck(item)
//     }

//     const handleBack = () => {
//         navigation.navigate('PaperSelect', {
//             selectedSummary: {
//                 chapterId,
//                 questionId,
//                 questionMarks,
//                 selectedQuestions: Object.keys(selectedMap).map(Number),
//             },
//         });
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
//         }, []))

//     useEffect(() => {
//         fetchQuestions();
//     }, []);

//     const fetchQuestions = async () => {
//         setLoader(true)
//         try {
//             let params = {
//                 'subject_id': '6',
//                 'difficulty': '3',
//                 // 'board_id':'10'
//                 // 'class_id':
//                 'page': '1',
//                 'limit': '10'
//             }
//             const response = await POST_FORM('question', params)
//             if (response?.status === 200) {
//                 // showSnackbar('')
//                 // setTimeout(() => {
//                 // }, 2000)
//                 console.log('responsedddddd', response);
//                 setQuestionsData(response)
//                 // setQuestionsData(response.result); // Assuming your API returns { result: [...] }
//             }
//         } catch (error) {
//             console.error('Error fetching questions:', error);
//         } finally {
//             setLoader(false)
//         }
//     };

//     return (
//         <View style={{ flex: 1, backgroundColor: Colors.white }}>
//             {/* STATUS BAR */}
//             <StatusBar
//                 backgroundColor={Colors.primaryColor}
//                 barStyle="dark-content" />
//             {/* HEADER + STATUS BAR SAME BACKGROUND */}
//             <View style={{ backgroundColor: Colors.lightThemeBlue }}>
//                 <SafeAreaView edges={["top"]}>
//                     <HeaderPaperModule title="Numer System" rightPress={() => navigation?.navigate('DraftPaperScreen')} leftIconPress={handleBack} />
//                 </SafeAreaView>
//             </View>

//             {/* MAIN CONTENT */}
//             <SafeAreaView
//                 style={{ flex: 1, backgroundColor: Colors.white }}
//                 edges={["left", "right", "bottom"]}>
//                 <Loader visible={loader} />
//                 <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', marginHorizontal: moderateScale(16), marginTop: moderateScale(10), marginBottom: moderateScale(15) }}>
//                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                         {/* OPTIONS */}
//                         <TouchableOpacity
//                             style={{ flexDirection: 'row', alignItems: 'center', }}
//                             onPress={() => handleCheck('Options')}
//                             activeOpacity={0.7}
//                         >
//                             <View
//                                 style={[
//                                     styles.chackBox,
//                                     {
//                                         backgroundColor:
//                                             selectCheck === 'Options' ? '#4292FA' : Colors.white
//                                     }]}>
//                                 {selectCheck === 'Options' && (
//                                     <Icon name="check" size={moderateScale(14)} color={Colors.white} />
//                                 )}
//                             </View>
//                             <Text style={styles.optionsText}>Options</Text>
//                         </TouchableOpacity>

//                         {/* SOLUTIONS */}
//                         <TouchableOpacity
//                             style={{
//                                 flexDirection: 'row',
//                                 alignItems: 'center',
//                                 marginLeft: moderateScale(15),
//                             }}
//                             onPress={() => handleCheck('Solutions')}
//                             activeOpacity={0.7}>
//                             <View
//                                 style={[
//                                     styles.chackBox,
//                                     {
//                                         backgroundColor:
//                                             selectCheck === 'Solutions' ? '#4292FA' : Colors.white
//                                     }]}>
//                                 {selectCheck === 'Solutions' && (
//                                     <Icon name="check" size={moderateScale(14)} color={Colors.white} />
//                                 )}
//                             </View>
//                             <Text style={styles.optionsText}>Solutions</Text>
//                         </TouchableOpacity>
//                     </View>

//                     <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }} >
//                         <Text style={styles.questionSelected}>{Object.keys(selectedMap).map(Number).length ?? 0} Ques Selected</Text>
//                         <TouchableOpacity style={{ backgroundColor: Colors.lightThemeBlue, borderRadius: moderateScale(4), height: moderateScale(30), width: moderateScale(30), alignItems: "center", justifyContent: 'center' }}>
//                             <Image source={Icons.filter} style={{ height: moderateScale(20), width: moderateScale(20) }} />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//                 {questionsData?.pagination?.pages && <View style={styles.paginationBox}>
//                     <Text style={styles.paginationText}>2</Text>
//                 </View>}
//                 {/*  question list */}
//                 {/* <QuestionListData selectCheck={selectCheck} selectedMap={selectedMap}
//                         setSelectedMap={setSelectedMap} /> */}
//                 <QuestionListData
//                     selectCheck={selectCheck}
//                     selectedMap={selectedMap}
//                     setSelectedMap={setSelectedMap}
//                     questionsData={questionsData?.result ?? []}
//                 />
//             </SafeAreaView>

//         </View>
//     );
// };

// export default QuestionScreen;

import React, { useCallback, useEffect, useState } from "react";
import { View, StatusBar, TouchableOpacity, Text, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../theme";
import HeaderPaperModule from "../../../component/headerpapermodule/Headerpapermodule";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/Feather";
import { moderateScale } from "../../../utils/responsiveSize";
import { Icons } from "../../../assets/icons";
import QuestionListData, { Question } from './component/questionlist/QuestionListData';
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { POST_FORM } from "../../../api/request";
import Loader from "../../../component/loader/Loader";
import Pagination from "./component/Pagination";
import AppModal from "../../../component/modal/AppModal";
import { showToast } from "../../../utils/toast";
import { localStorage, storageKeys } from "../../../storage/storage";
import IconEntypo from "react-native-vector-icons/FontAwesome5";
import AppButton from "../../../component/button/AppButton";

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
    // console.log('questionNumbereeeeeeeeeeeedddd', Object.keys(questionNumber));

    const [questionsData, setQuestionsData] = useState<any>({});
    const [loader, setLoader] = useState(false);
    const [labelStatus, setLabelStatus] = useState(false);
    const [paperType, setPaperType] = useState<string | null>('');
    const [lebelCheck, setLabelCheck] = useState<string | null>(null);
    const [questionType, setQuestionType] = useState<boolean>(false);

    const [pagination, setPagination] = useState({
        limit: 10,
        page: 1,
        pages: 1,
        total: 0,
    });

    const handleCheck = (item: string) => {
        setSelectedCheck(item)
    }
    const handleLabelStatus = () => {
        setLabelStatus(true)
    }
    const handleLabelClose = () => {
        setLabelStatus(false)
    }
    const handleCheckStatus = (item: string) => {
        setLabelCheck(item)
    }
    const handleQuestionType = () => {
        setQuestionType(!questionType)
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

    const fetchQuestions = async (page: number = 1, limit: number = pagination?.limit) => {
        setLoader(true)
        try {
            let params = {
                'subject_id': '6',
                'difficulty': '3',
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
            setLoader(false)
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
        // if()

        const type = async () => {
            const paperType = await localStorage.getItem(storageKeys.selectedPaperType)
            setPaperType(paperType)
        }
        type()
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
                    rightPress2={() => navigation?.navigate('MyPdfScreen')}
                    leftIconPress={handleBack}
                />
            </SafeAreaView>

            {/* MAIN CONTENT */}
            <SafeAreaView
                style={{ flex: 1, backgroundColor: Colors.white }}
                edges={["left", "right", "bottom"]}>
                <Loader visible={loader} />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    alignItems: 'center',
                    marginHorizontal: moderateScale(16),
                    marginTop: moderateScale(10),
                    marginBottom: moderateScale(15),
                    // borderWidth:1
                }}>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                        // marginTop:moderateScale(-106)s
                    }}>
                        {/* OPTIONS */}
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

                        {/* SOLUTIONS */}
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft: moderateScale(15),
                            }}
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

                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }} >
                        <Text style={styles.questionSelected}>
                            {Object.keys(selectedMap).map(Number).length ?? 0} Ques Selected
                        </Text>
                        <TouchableOpacity style={{
                            backgroundColor: Colors.lightThemeBlue,
                            borderRadius: moderateScale(4),
                            height: moderateScale(30),
                            width: moderateScale(30),
                            alignItems: "center",
                            justifyContent: 'center'
                        }} onPress={handleLabelStatus}>
                            <Image source={Icons.filter} style={{
                                height: moderateScale(20),
                                width: moderateScale(20)
                            }} />
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
                />
                <AppModal visible={labelStatus} onClose={handleLabelClose} >
                    <View style={styles.applyBox}>
                        <Text style={styles.diffeicultText}>Apply Filter</Text>
                        <TouchableOpacity>
                            <Text style={styles.clearAllText}>Clear all filters</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lineBox} />
                    <Text style={styles.diffecultyText}>Difficulty level</Text>
                    <View style={styles.easyBox}>
                        <View style={styles.difficultMainBox}>
                            <Pressable style={styles.checkBoxMain} onPress={() => handleCheckStatus('1')}>
                                <View style={[styles.checkBox, lebelCheck === '1' && { backgroundColor: Colors.primaryColor, borderWidth: 0 }]}>
                                    {lebelCheck === '1' && <IconEntypo name='check' size={moderateScale(14.5)} color={Colors.white} />
                                    }
                                </View>
                                <Text style={styles.easyText}>Easy</Text>
                            </Pressable>
                            <Pressable style={[styles.checkBoxMain, { marginLeft: moderateScale(30) }]} onPress={() => handleCheckStatus('2')}>
                                <View style={[styles.checkBox, lebelCheck === '2' && { backgroundColor: Colors.primaryColor, borderWidth: 0 }]} >
                                    {lebelCheck === '2' && <IconEntypo name='check' size={moderateScale(14.5)} color={Colors.white} />
                                    }                                </View>
                                <Text style={styles.easyText}>Medium</Text>
                            </Pressable>
                            <Pressable style={[styles.checkBoxMain, { marginLeft: moderateScale(30) }]} onPress={() => handleCheckStatus('3')}>
                                <View style={[styles.checkBox, lebelCheck === '3' && { backgroundColor: Colors.primaryColor, borderWidth: 0 }]}>
                                    {lebelCheck === '3' && <IconEntypo name='check' size={moderateScale(14.5)} color={Colors.white} />
                                    }                                </View>
                                <Text style={styles.easyText}>Hard</Text>
                            </Pressable>
                        </View>
                    </View>
                    <Text style={[styles.diffecultyText, { marginTop: moderateScale(20) }]}>Question Type</Text>
                    <Pressable style={[styles.checkBoxMain, { justifyContent: "flex-start" }]} onPress={handleQuestionType}>
                        <View style={[styles.checkBox, questionType && { backgroundColor: Colors.primaryColor, borderWidth: 0 }]}>
                            {questionType && <IconEntypo name='check' size={moderateScale(14.5)} color={Colors.white} />}                                </View>
                        <Text style={styles.easyText}>Numeric</Text>
                    </Pressable>

                    <Text style={[styles.diffecultyText, { marginTop: moderateScale(20) }]}>Books</Text>
                   <View style={[styles.easyBox,{justifyContent:"space-between", marginHorizontal:moderateScale(16.8),marginTop:moderateScale(50)}]}>
                     <AppButton title="Cancel" style={{width:'46%'}}/>
                    <AppButton title="Apply Filter"  style={{width:'46%'}}/>
                   </View>
                </AppModal>
            </SafeAreaView>
        </View>
    );
};
export default QuestionScreen;
