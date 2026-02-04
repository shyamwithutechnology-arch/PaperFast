import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { Colors, Fonts } from '../../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderPaperModule from '../../../component/headerpapermodule/Headerpapermodule';
import { moderateScale } from '../../../utils/responsiveSize';

export type OpenQuestionScreenProps = {
}
const OpenQuestionScreen = (props: OpenQuestionScreenProps) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor={Colors.lightThemeBlue} />
            <SafeAreaView style={{ backgroundColor: Colors.lightThemeBlue }} edges={['top']}>
                <HeaderPaperModule />
            </SafeAreaView>
            <SafeAreaView style={styles.homeContainer} edges={['left', 'right', 'bottom']}>
                <Text style={styles.qsText}>Ques .1</Text>
            </SafeAreaView>
        </View>
    )
}

export default OpenQuestionScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    homeContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    qsText: {
        fontSize: moderateScale(12),
        color: Colors.primaryColor,
        fontFamily: Fonts.InstrumentSansMedium,
        marginLeft:moderateScale(16),
        marginTop:moderateScale(16)
    }
})