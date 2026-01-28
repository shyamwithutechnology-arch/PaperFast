import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Fonts } from '../../theme';
import { moderateScale, verticalScale } from '../../utils/responsiveSize';
import { Icons } from '../../assets/icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderPaperModule from '../../component/headerpapermodule/Headerpapermodule';
import Loader from '../../component/loader/Loader';
import AppTextInput from '../../component/apptextinput/AppTextInput';
import ClockIcon from "react-native-vector-icons/FontAwesome6";
import AppButton from '../../component/button/AppButton';

const MyPdfScreen = () => {
    const navigation = useNavigation();
    const [loader, setLoader] = useState(false)
    const [logo, setLogo] = useState('1')
    const handleSelectWaterMark = (text) => {
        setLogo(text)
    }
    const handleBack = () => {
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={Colors.primaryColor}
                barStyle="dark-content" />
            <SafeAreaView style={{ backgroundColor: Colors.lightThemeBlue }} edges={['top']}>
                <HeaderPaperModule title='Generate Pdf' leftIconPress={handleBack} />
            </SafeAreaView>
            <SafeAreaView style={styles.content} edges={['left', 'right', 'bottom']}>
                <ScrollView style={{ flexGrow: 1, backgroundColor: Colors.white }}>
                    <Loader visible={loader} />
                    <Text style={styles.title}>Institue Header (Size : 320x 50mm)</Text>
                    <TouchableOpacity style={styles.dragBox} >
                        <Image source={Icons?.fileUpload} style={styles.fileUploadImg} resizeMode='contain' />
                    </TouchableOpacity>

                    <View style={{marginVertical:moderateScale(15)}}>
                        <AppTextInput placeHolderText='Insitute Name' />
                    </View>
                    <AppTextInput placeHolderText='Enter Test Name' />
                    <View style={styles.mainDateBox}>
                        <View style={{
                            marginHorizontal: moderateScale(10),
                        }}>
                            <Text style={styles.dateText}>Date</Text>
                            <TouchableOpacity style={styles.dateBox}>
                                <Text style={styles.TimeText}>DD/MM/YY</Text>
                                <Image source={Icons.date} style={styles.dateImg} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            marginHorizontal: moderateScale(10),
                        }}>
                            <Text style={styles.dateText}>Time</Text>
                            <TouchableOpacity style={styles.dateBox}>
                                <Text style={styles.TimeText}>2 Hours</Text>
                                <ClockIcon name='clock-rotate-left' size={moderateScale(20)} color='#BEBEBE' />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.hideBox}>
                        <TouchableOpacity style={styles.checkBox} />
                        <Text style={[styles.TimeText, { fontSize: moderateScale(13), marginLeft: moderateScale(10) }]}>Hide Date & Time</Text>
                    </View>
                    <Text style={[styles.TimeText, styles.waterMark]}>Water Mark</Text>


                    <View style={styles.parentLogo}>
                        <TouchableOpacity style={styles.logoMainBox} onPress={() => handleSelectWaterMark('1')}>
                            <View style={styles.radioButton}>
                                {logo === '1' && <View style={styles.innerView} />}
                            </View>

                            <Text style={[styles.TimeText, styles.logoText]}>Logo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.logoMainBox} onPress={() => handleSelectWaterMark('2')}>
                            <View style={styles.radioButton} >
                                {logo === '2' && <View style={styles.innerView} />}
                            </View>

                            <Text style={[styles.TimeText, styles.logoText]}>Text</Text>
                        </TouchableOpacity>
                    </View>


                    <TouchableOpacity style={[styles.dragBox, { marginTop: moderateScale(14) }]} >
                        <Image source={Icons?.fileUpload} style={styles.fileUploadImg} resizeMode='contain' />
                    </TouchableOpacity>

                    <Text style={[styles.TimeText, styles.waterMark]}>Border</Text>
                    <View style={[styles.parentLogo]}>
                        <TouchableOpacity style={styles.logoMainBox} onPress={() => handleSelectWaterMark('1')}>
                            <View style={styles.radioButton}>
                                {logo === '1' && <View style={styles.innerView} />}
                            </View>

                            <Text style={[styles.TimeText, styles.logoText]}>With Border</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.logoMainBox} onPress={() => handleSelectWaterMark('2')}>
                            <View style={styles.radioButton} >
                                {logo === '2' && <View style={styles.innerView} />}
                            </View>

                            <Text style={[styles.TimeText, styles.logoText]}>Without border</Text>
                        </TouchableOpacity>
                    </View>


                    <TouchableOpacity style={[styles.dragBox, { marginTop: moderateScale(14) }]} >
                        <Image source={Icons?.fileUpload} style={styles.fileUploadImg} resizeMode='contain' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.wishYouBox}>
                        <Text style={styles.withText}>Wish you all the best</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', marginHorizontal: moderateScale(16), marginTop: moderateScale(10) }}>
                        <AppButton title='Pdf Preview' style={{ paddingHorizontal: moderateScale(35) }} />
                        <AppButton title='Cancel' style={{ paddingHorizontal: moderateScale(53) }} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    content: {
        flex: 1,
        backgroundColor: Colors.white
    },
    iconContainer: {
        width: moderateScale(120),
        height: moderateScale(120),
        borderRadius: moderateScale(60),
        backgroundColor: Colors.lightThemeBlue + '20',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: moderateScale(32),
    },
    icon: {
        width: moderateScale(60),
        height: moderateScale(60),
        tintColor: Colors.primaryColor,
    },
    title: {
        fontSize: moderateScale(13),
        fontFamily: Fonts.InstrumentSansRegular,
        color: Colors.black,
        marginLeft: moderateScale(16),
        marginVertical: moderateScale(10)
        // textAlign: 'center',
        // marginBottom: moderateScale(16),
    },
    message: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InterRegular,
        color: Colors.ParagraphAndShortTexts,
        textAlign: 'center',
        lineHeight: moderateScale(24),
        marginBottom: moderateScale(40),
    },
    backButton: {
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: moderateScale(25),
        paddingVertical: moderateScale(10),
        borderRadius: moderateScale(8),
    },
    backButtonText: {
        fontSize: moderateScale(16),
        fontFamily: Fonts.InterSemiBold,
        color: Colors.white,
    },

    dragBox: {
        paddingVertical: verticalScale(14),
        paddingHorizontal: moderateScale(5),
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: moderateScale(16),
        borderColor: Colors.InputStroke,
        borderRadius: moderateScale(5)
    },
    fileUploadImg: {
        height: moderateScale(50),
        width: moderateScale(50),
        resizeMode: 'contain'
    },
    dateText: {
        fontSize: moderateScale(13),
        color: Colors.black,
        fontFamily: Fonts.InstrumentSansRegular,
        marginBottom: moderateScale(8),
        marginTop: moderateScale(5)
    },
    TimeText: {
        fontSize: moderateScale(14),
        color: Colors.InputText,
        fontFamily: Fonts.InstrumentSansRegular
    },
    dateBox: {
        borderWidth: 1,
        width: moderateScale(156),
        height: moderateScale(46),
        paddingHorizontal: moderateScale(10),
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        borderRadius: moderateScale(2),
        borderColor: Colors.InputStroke
    },

    mainDateBox: {
        flexDirection: 'row',
        alignSelf: "center",
        marginTop: moderateScale(10),
        // marginTop:moderateScale(-40)

    },
    dateImg: {
        height: moderateScale(20),
        width: moderateScale(20)
    },
    checkBox: {
        height: moderateScale(17.5),
        width: moderateScale(17.5),
        borderWidth: 1,
        borderRadius: moderateScale(2),
        borderColor: Colors.InputStroke,
        // marginTop:moderateScale(-40)
    },
    hideBox: {
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: moderateScale(18),
        marginTop: moderateScale(10)
    },
    waterMark: {
        fontSize: moderateScale(13),
        marginLeft: moderateScale(16),
        marginTop: moderateScale(15),
        color: Colors.black
    },
    radioButton: {
        height: moderateScale(14),
        width: moderateScale(14),
        borderRadius: moderateScale(10),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
    innerView: {
        height: moderateScale(10),
        width: moderateScale(10),
        borderRadius: moderateScale(10),
        borderWidth: 1,
        backgroundColor: Colors.primaryColor
    },
    logoText: {
        color: Colors.black,
        fontSize: moderateScale(12),
        marginLeft: moderateScale(8)
    },
    logoMainBox: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: moderateScale(16)
    },
    parentLogo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(4)
    },
    wishYouBox: {
        paddingHorizontal: moderateScale(30),
        paddingVertical: moderateScale(15),
        borderWidth: 1,
        marginHorizontal: moderateScale(16),
        borderRadius: moderateScale(2),
        borderColor: Colors.InputStroke,
        marginTop: moderateScale(15)
    },
    withText: {
        fontSize: moderateScale(14),
        color: Colors.InputText,
        fontFamily: Fonts.InterRegular
    }
});

export default MyPdfScreen;