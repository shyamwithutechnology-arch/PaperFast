import React, { useCallback, useState } from "react";
import { View, StatusBar, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../theme";
import HeaderPaperModule from "../../../component/headerpapermodule/Headerpapermodule";
import Paperselectcontent from "./component/paperselectcontent/Paperselectcontent";
import { styles } from "./styles";
import { moderateScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";

type SelectedSummary = {
    chapterId: number;
    questionId: string;
    questionMarks: string;
    selectedQuestions: number[];
};
const PaperSelect = () => {
    const navigation = useNavigation()
    const route = useRoute();
    console.log('routewwwww', route);

    const selectedSummary = route.params?.selectedSummary as
        | SelectedSummary
        | undefined;


    const [activeChapterId, setActiveChapterId] = useState<number | null>(
        selectedSummary?.chapterId ?? null
    );

    const handleBack = () => {
        navigation.navigate('PaperTypeScreen')
    }
    type PaperType = 'NCERT' | 'EXEMPLAR' | 'RD_SHARMA';

    const [selectedPaper, setSelectedPaper] = useState<PaperType>('NCERT');

    const handleSelectPaper = (id: string) => {
        setSelectedPaper(id)
    }
    const handleQuestionSelect = (payload) => {
        navigation.navigate('QuestionScreen', {
            ...payload,
        });
    }
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

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar
                backgroundColor={Colors.primaryColor}
                barStyle="dark-content" />

            {/* HEADER + STATUS BAR SAME BACKGROUND */}
            <SafeAreaView edges={["top"]} style={{ backgroundColor: Colors.lightThemeBlue }}>
                <HeaderPaperModule title={route?.params?.paperType} rightPress={() => { navigation.navigate('DraftPaperScreen') }} leftIconPress={handleBack} />
            </SafeAreaView>
            {/* MAIN CONTENT */}
            <SafeAreaView
                style={{ flex: 1, backgroundColor: Colors.white }}
                edges={["left", "right", "bottom"]}>
                <View style={styles.rowContainer}>
                    {selectBtn.map(item => {
                        const isActive = selectedPaper === item.key;
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.selectBtnBox,
                                    {
                                        backgroundColor: isActive ? Colors.primaryColor : Colors.white,
                                        borderColor: isActive ? Colors.primaryColor : "#AFAFAF",
                                    },
                                ]}
                                onPress={() => setSelectedPaper(item.key as PaperType)}>
                                <Text
                                    style={[
                                        styles.selectBtnText,
                                        { color: isActive ? Colors.white : "#AFAFAF" },
                                    ]}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
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
                        <TouchableOpacity style={styles.exportBox}>
                            <Text style={styles.exportText}>Export Pdf</Text>
                            <Icon name='arrow-right-long' size={moderateScale(18)} color={Colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

        </View>
    );
};

export default PaperSelect;