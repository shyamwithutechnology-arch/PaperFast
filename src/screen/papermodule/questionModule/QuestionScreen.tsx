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
import { View, StatusBar, TouchableOpacity, Text, Image } from "react-native";
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
import { showSnackbar } from "../../../utils/snackbar";

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
    const [questionsData, setQuestionsData] = useState<any>({});
    const [loader, setLoader] = useState(false);
    const [labelStatus, setLabelStatus] = useState(false);

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
    const handleBack = () => {
        navigation.navigate('PaperSelect', {
            selectedSummary: {
                chapterId,
                questionId,
                questionMarks,
                selectedQuestions: Object.keys(selectedMap).map(Number),
            },
        });
    };

    const fetchQuestions = async (page: number = 1, limit: number = pagination?.limit) => {
        setLoader(true)
        try {
            let params = {
                'subject_id': '6',
                // 'difficulty': '3',
                'easy': '3',
                'page': page?.toString(),
                'limit': limit?.toString()
            }
            const response = await POST_FORM('question', params)
            console.log('responsewwwwwwww', response);

            if (response?.status === 200) {
                // console.log('API Response:', response);
                setQuestionsData(response || {});

                // Update pagination state from API response
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
                showSnackbar('No internet connection', 'error');
                return;
            }
            const errorMessage = error?.response?.data?.message ||
                error?.message ||
                'Something went wrong. Please try again.';
            showSnackbar(errorMessage, 'error');
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
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            {/* STATUS BAR */}
            <StatusBar
                backgroundColor={Colors.primaryColor}
                barStyle="dark-content" />
            {/* HEADER + STATUS BAR SAME BACKGROUND */}
            <View style={{ backgroundColor: Colors.lightThemeBlue }}>
                <SafeAreaView edges={["top"]}>
                    <HeaderPaperModule
                        title="Number System"
                        rightPress={() => navigation?.navigate('DraftPaperScreen')}
                        leftIconPress={handleBack}
                    />
                </SafeAreaView>
            </View>

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
                    marginBottom: moderateScale(15)
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* OPTIONS */}
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => handleCheck('Options')}
                            activeOpacity={0.7}
                        >
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
                    />
                )}

                {/* Question list */}
                <QuestionListData
                    selectCheck={selectCheck}
                    selectedMap={selectedMap}
                    setSelectedMap={setSelectedMap}
                    questionsData={questionsData?.result ?? []} />

                <AppModal visible={labelStatus} onClose={handleLabelClose} />
            </SafeAreaView>
        </View>
    );
};

export default QuestionScreen;
