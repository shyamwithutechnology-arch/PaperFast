import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { Colors, Fonts } from '../../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderPaperModule from '../../../component/headerpapermodule/Headerpapermodule';
import { moderateScale } from '../../../utils/responsiveSize';
import { useNavigation } from '@react-navigation/native';

export type BookMarkScreenProps = {
}
const BookMarkScreen = (props: BookMarkScreenProps) => {
    const navigation = useNavigation()
    const handleBack = () => {
        navigation?.goBack()
    }
    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor={Colors.lightThemeBlue} />
            <SafeAreaView style={{ backgroundColor: Colors.lightThemeBlue }} edges={['top']}>
                <HeaderPaperModule title="Bookmarks" leftIconPress={handleBack} />
            </SafeAreaView>
            <SafeAreaView style={styles.homeContainer} edges={['left', 'right', 'bottom']}>
                <View style={styles.qsNumberBox}>
                <Text style={styles.qsNumber}>1.</Text>
                <Text style={styles.qsText}>A rope of length 18 m is cut into 6 equal pieces.
                    Find the length of each piece. If one piece is used, how much rope remains?</Text>
                    </View>
            </SafeAreaView>
        </View>
    )
}
export default BookMarkScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    homeContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    qsNumber: {
        fontSize: moderateScale(12),
        color: Colors.primaryColor,
        fontFamily: Fonts.InstrumentSansMedium,
        marginLeft: moderateScale(16),
    },
    qsText: {
        fontSize: moderateScale(12),
        color: Colors.black,
        fontFamily: Fonts.InstrumentSansMedium,
        borderWidth:1,
        // width:'80%'
    },
    qsNumberBox:{
        flexDirection:'row',
        justifyContent:"space-between"
    }
})