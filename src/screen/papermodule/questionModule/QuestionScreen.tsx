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
    const [questionsData, setQuestionsData] = useState<Question[]>([]);
    const [loader, setLoader] = useState(false)
    const handleCheck = (item: string) => {
        setSelectedCheck(item)
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
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        setLoader(true)
        try {
            let params = {
                'subject_id': '6',
                'difficulty': '3',
                // 'board_id':'10'
                // 'class_id':
                'page': '1',
                'limit': '10'
            }
            const response = await POST_FORM('question', params)
            if (response?.status === 200) {
                // showSnackbar('')
                setQuestionsData(response?.result)
                console.log('responsedddddd', response);
                // setQuestionsData(response.result); // Assuming your API returns { result: [...] }
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            setLoader(false)
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            {/* STATUS BAR */}
            <StatusBar
                backgroundColor={Colors.primaryColor}
                barStyle="dark-content" />
            {/* HEADER + STATUS BAR SAME BACKGROUND */}
            <View style={{ backgroundColor: Colors.lightThemeBlue }}>
                <SafeAreaView edges={["top"]}>
                    <HeaderPaperModule title="Numer System" rightPress={() => navigation?.navigate('DraftPaperScreen')} leftIconPress={handleBack} />
                </SafeAreaView>
            </View>

            {/* MAIN CONTENT */}
            <SafeAreaView
                style={{ flex: 1, backgroundColor: Colors.white }}
                edges={["left", "right", "bottom"]}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', marginHorizontal: moderateScale(16), marginTop: moderateScale(10), marginBottom: moderateScale(15) }}>
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
                                            selectCheck === 'Solutions' ? '#4292FA' : Colors.white,
                                    },
                                ]}
                            >
                                {selectCheck === 'Solutions' && (
                                    <Icon name="check" size={moderateScale(14)} color={Colors.white} />
                                )}
                            </View>
                            <Text style={styles.optionsText}>Solutions</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }} >
                        <Text style={styles.questionSelected}>{Object.keys(selectedMap).map(Number).length ?? 0} Ques Selected</Text>
                        <TouchableOpacity style={{ backgroundColor: Colors.lightThemeBlue, borderRadius: moderateScale(4), height: moderateScale(30), width: moderateScale(30), alignItems: "center", justifyContent: 'center' }}>
                            <Image source={Icons.filter} style={{ height: moderateScale(20), width: moderateScale(20) }} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/*  question list */}
                {/* <QuestionListData selectCheck={selectCheck} selectedMap={selectedMap}
                    setSelectedMap={setSelectedMap} /> */}
                {/* // Render the component */}
                <QuestionListData
                    selectCheck={selectCheck}
                    selectedMap={selectedMap}
                    setSelectedMap={setSelectedMap}
                    questionsData={questionsData}
                />
            </SafeAreaView>

        </View>
    );
};

export default QuestionScreen;
