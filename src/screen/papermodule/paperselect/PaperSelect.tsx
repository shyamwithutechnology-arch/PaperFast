import React from "react";
import { View, StatusBar, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../theme";
import CustomPaperCard from "../component/CustomPaperCard/CustomPaperCard";
import HeaderPaperModule from "../../../component/headerpapermodule/Headerpapermodule";
import Paperselectcontent from "./component/paperselectcontent/Paperselectcontent";
import { styles } from "./styles";

const PaperSelect = () => {
    const selectBtn = [
        {
            id: 1,
            title: "NCERT",
        },
        {
            id: 2,
            title: "Exempler",
            content: ["Chapter 1", "Chapter 2"],
        },
        {
            id: 3,
            title: "RD Sharma",
        },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>

            {/* STATUS BAR */}
            <StatusBar
                translucent
                backgroundColor={Colors.lightThemeBlue}
                barStyle="dark-content"
            />

            {/* HEADER + STATUS BAR SAME BACKGROUND */}
            <View style={{ backgroundColor: Colors.primaryColor }}>
                <SafeAreaView edges={["top"]}>
                    <HeaderPaperModule title="Regular Paper" />
                </SafeAreaView>
            </View>

            {/* MAIN CONTENT */}
            <SafeAreaView
                style={{ flex: 1, backgroundColor: Colors.white }}
                edges={["left", "right", "bottom"]}
            >

                {
                    selectBtn.map(item => {
                        return (
                            // <View style={{}}>
                            <TouchableOpacity style={styles.selectBtnBox}>
                                <Text style={styles.selectBtnText}>Ncert</Text>
                            </TouchableOpacity>
                            // </View>
                        )
                    })
                }
                {/* <CustomPaperCard /> */}
                <Paperselectcontent />
            </SafeAreaView>

        </View>
    );
};

export default PaperSelect;
