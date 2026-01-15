import React, { useState } from "react";
import { View, StatusBar, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../theme";
import CustomPaperCard from "../component/CustomPaperCard/CustomPaperCard";
import HeaderPaperModule from "../../../component/headerpapermodule/Headerpapermodule";
import Paperselectcontent from "./component/paperselectcontent/Paperselectcontent";
import { styles } from "./styles";
import { moderateScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/FontAwesome6";

const PaperSelect = () => {
    type PaperType = 'NCERT' | 'EXEMPLAR' | 'RD_SHARMA';

    const [selectedPaper, setSelectedPaper] = useState<PaperType>('NCERT');
    const handleSelectPaper = (id: string) => {
        setSelectedPaper(id);

    }
    // const selectBtn = [
    //     {
    //         id: 1,
    //         title: "NCERT",
    //     },
    //     {
    //         id: 2,
    //         title: "Exempler",
    //         content: ["Chapter 1", "Chapter 2"],
    //     },
    //     {
    //         id: 3,
    //         title: "RD Sharma",
    //     },
    // ];
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
                    { id: "A", label: "M.C.Q" },
                    { id: "B", label: "Very short answer type" },
                    { id: "C", label: "Ques-Ans (Each of 2 Mark)" },
                    { id: "D", label: "Ques-Ans (Each of 3 Mark)" },
                ],
            },
            {
                id: 2,
                title: "Polynomials",
                chapterName: "Chap 02",
                questions: [
                    { id: "A", label: "M.C.Q" },
                    { id: "B", label: "Very short answer type" },
                    { id: "C", label: "Ques-Ans (Each of 2 Mark)" },
                    { id: "D", label: "Ques-Ans (Each of 3 Mark)" },
                ],
            },
        ],

        EXEMPLAR: [
            {
                id: 1,
                title: "Number System (Exemplar)",
                chapterName: "Unit 01",
                questions: [
                    { id: "A", label: "Objective Questions" },
                    { id: "B", label: "Short Answer" },
                    { id: "C", label: "Numerical Problems" },
                ],
            },
            {
                id: 2,
                title: "Polynomials (Exemplar)",
                chapterName: "Unit 02",
                questions: [
                    { id: "A", label: "Objective Questions" },
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
                    { id: "A", label: "Exercise 1A" },
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



    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            {/* STATUS BAR */}
            <StatusBar
                backgroundColor={'red'}
                barStyle="dark-content"
            />

            {/* HEADER + STATUS BAR SAME BACKGROUND */}
            <View style={{ backgroundColor: Colors.lightThemeBlue }}>
                <SafeAreaView edges={["top"]}>
                    <HeaderPaperModule title="Regular Paper" rightPress={() => {}} />
                </SafeAreaView>
            </View>

            {/* MAIN CONTENT */}
            <SafeAreaView
                style={{ flex: 1, backgroundColor: Colors.white }}
                edges={["left", "right", "bottom"]}
            >
                {/* <View style={styles.rowContainer}>
                    {selectBtn.map((item, index) => (
                        <TouchableOpacity key={item.id} style={[styles.selectBtnBox, { backgroundColor: selectedPaper === item?.title ? Colors.primaryColor : Colors.white, borderColor: selectedPaper === item?.title ? Colors.primaryColor : '#AFAFAF' }]} onPress={() => handleSelectPaper(item?.title)}>
                            <Text style={[styles.selectBtnText, { color: selectedPaper === item?.title ? Colors.white : '#AFAFAF' }]}>{item.title}</Text>\
                        </TouchableOpacity>
                    ))}
                </View> */}
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
                                onPress={() => setSelectedPaper(item.key as PaperType)}
                            >
                                <Text
                                    style={[
                                        styles.selectBtnText,
                                        { color: isActive ? Colors.white : "#AFAFAF" },
                                    ]}
                                >
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* question list topic wise */}
                <Paperselectcontent data={PAPER_DATA[selectedPaper]} />

                <View style={styles.totalWrapper}>
                    {/* TOP SHADOW */}
                    <View style={styles.topShadow} />

                    {/* CONTENT */}
                    <View style={styles.totalMainBox}>
                        <View>
                            <Text style={styles.marksTotel}>11 Marks Total</Text>
                            <Text style={[styles.marksTotel, { fontSize: moderateScale(12) }]}>
                                1=3,2=0,3=0,4=2,5=0
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
