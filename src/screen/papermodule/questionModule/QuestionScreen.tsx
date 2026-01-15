import React, { useState } from "react";
import { View, StatusBar, TouchableOpacity, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../theme";
import CustomPaperCard from "../component/CustomPaperCard/CustomPaperCard";
import HeaderPaperModule from "../../../component/headerpapermodule/Headerpapermodule";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/Feather";
import { moderateScale } from "../../../utlis/responsiveSize";
import { Icons } from "../../../assets/icons";
import QuestionListData from "./component/questionlist/QuestionListData";


const QuestionScreen = () => {
    const [selectCheck, setSelectedCheck] = useState('Options')
    const handleCheck = (item: string) => {
        setSelectedCheck(item)
    }

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
                    <HeaderPaperModule title="Numer System" rightPress={() => { }} />
                </SafeAreaView>
            </View>

            {/* MAIN CONTENT */}
            <SafeAreaView
                style={{ flex: 1, backgroundColor: Colors.white }}
                edges={["left", "right", "bottom"]}
            >
                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', marginHorizontal: moderateScale(16), marginTop: moderateScale(10), marginBottom: moderateScale(15) }}>
                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => handleCheck('Options')}>
                            <TouchableOpacity style={[styles.chackBox, { backgroundColor: selectCheck === 'Options' ? '#4292FA' : Colors.white }]} onPress={() => handleCheck('Solutions')}>
                                <Icon name="check" size={moderateScale(16)} color={Colors.white} />
                            </TouchableOpacity>
                            <Text style={styles.optionsText}>Options</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginLeft: moderateScale(15) }} onPress={() => handleCheck('Solutions')}>
                            <TouchableOpacity style={[styles.chackBox, { backgroundColor: selectCheck === 'Solutions' ? '#4292FA' : Colors.white }]} onPress={() => handleCheck('Solutions')}>
                                <Icon name="check" size={moderateScale(16)} color={Colors.white} />
                            </TouchableOpacity>
                            <Text style={styles.optionsText}>Solutions</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }} >
                        <Text style={styles.questionSelected}>3 Ques Selected</Text>
                        <TouchableOpacity style={{ backgroundColor: Colors.lightThemeBlue, borderRadius: moderateScale(4), height: moderateScale(30), width: moderateScale(30), alignItems: "center", justifyContent: 'center' }}>
                            <Image source={Icons.filter} style={{ height: moderateScale(20), width: moderateScale(20) }} />
                        </TouchableOpacity>
                    </View>
                </View>

                <QuestionListData />
            </SafeAreaView>

        </View>
    );
};

export default QuestionScreen;
