import React, { useState } from "react";
import { View, Text, Image, TextInput, Pressable, StatusBar, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../../component/header/AppHeader";
import AppButton from "../../../component/button/AppButton";
import PhoneInput from "react-native-international-phone-number";
import { Icons } from "../../../assets/icons";
import { moderateScale } from "../../../utlis/responsiveSize";
import { Colors, Fonts } from "../../../theme";

const LoginScreen = ({navigation}) => {
    // const [phone, setPhone] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [phoneInput, setPhoneInput] = useState<string>("");

    const handlePhoneChange = (text: string) => {
        const digitsOnly = text.replace(/\D/g, '');

        let formatted = digitsOnly;
        if (digitsOnly.length > 5) {
            formatted = `${digitsOnly.slice(0, 5)}-${digitsOnly.slice(5, 10)}`;
        }
        setPhoneInput(formatted);
    };
    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.primaryColor} />
            <AppHeader title="Paper Fast" discriptionText='Paper Generate In Minute' />

            <View style={styles.innerMainContainer}>
                <View style={styles.innerSecondMainContainer}>
                    <Text style={styles.loginText}>Login with Mobile Number</Text>
                    <Text style={styles.subHeading}>We’ll send an OTP to verify your number.</Text>

                    {/* <AppPhoneInput
                        value={phone}
                        onChange={setPhone}
                    /> */}

                    <View style={styles.phoneInputBox}>
                        <Image source={Icons.country} style={styles.countryImgStyle} />
                        <View style={{ marginLeft: moderateScale(10), alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <View style={{ height: moderateScale(18), width: moderateScale(2), backgroundColor: 'rgba(0, 140, 227, 0.31)', }} />
                            <Text style={styles.prefix}>{'  '}+91</Text>
                            <TextInput style={styles.phoneInput} maxLength={11} keyboardType="phone-pad" onChangeText={handlePhoneChange} value={phoneInput} />
                        </View>
                    </View>

                    {/* // button */}
                    <AppButton title="Send Verification OTP"  onPress={() => navigation.navigate('OtpRequestScreen')} style={{paddingHorizontal:moderateScale(82)}}/>

                    <View style={styles.privacyBox}>
                        <Text style={styles.byRegisterText}>By registering, you agree to the
                            <Text style={[styles.byRegisterText, { fontFamily: Fonts.InterSemiBold }]}>Terms of Service,{`\n`}
                                Privacy Policy </Text> and <Text style={[styles.byRegisterText, { fontFamily: Fonts.InterSemiBold }]}>Cookie Policy.</Text></Text>
                    </View>
                    <View style={styles.mainMaskView}>
                        <Image source={Icons.MaskGroup} style={styles.maskGroupImag} />

                        <View style={{}}>
                            <View style={[styles.supportBox, { marginHorizontal: moderateScale(0) }]}>
                                <View style={styles.scrachLine} />
                                <View style={[styles.supportBox, { flexDirection: 'column', alignItems: 'flex-start' }]}>
                                    <Text style={styles.supportText}>Support</Text>
                                    <View style={styles.numberTextBox} >
                                        <Image source={Icons.plus} style={styles.plusImg} />
                                        <Text style={styles.supportNumberText}>91{phoneInput}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.versionText}>Version 1.0</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    innerMainContainer: {
        flex: 1,
        backgroundColor: Colors.frameBgColor,
        borderTopLeftRadius: moderateScale(30),
        borderTopRightRadius: moderateScale(30),
        marginTop: moderateScale(-28),
    },
    innerSecondMainContainer: {
        flex: 1,
        borderTopLeftRadius: moderateScale(30),
        borderTopRightRadius: moderateScale(30),
        backgroundColor: Colors.white,
        marginTop: moderateScale(20),
        // marginHorizontal:moderateScale(10)
        // paddingHorizontal:moderateScale(10)
    },
    // loginNumberText: {
    //     color: Colors.white,
    //     fontSize: wp('5%')
    // },

    // headerUpperBox: {
    //     width: wp("100"),
    //     height: hp("30"),
    //     backgroundColor: "rgba(11, 182, 199, 0.17)",
    // },

    loginText: {
        fontSize: moderateScale(20),
        color: Colors.black,
        marginTop: moderateScale(40),
        fontFamily: Fonts.InstrumentSansSemiBold,
        marginLeft: moderateScale(20),
    },
    subHeading: {
        fontSize: moderateScale(14),
        color: Colors.ParagraphAndShortTexts,
        fontFamily: Fonts.InterRegular,
        marginLeft: moderateScale(20),
        marginTop: moderateScale(8),
    },
    byRegisterText: {
        fontSize: moderateScale(10),
        fontFamily: Fonts.InterRegular,
        color: Colors.ParagraphAndShortTexts,
        textAlign: 'center',
        marginTop: moderateScale(20),
    },

    // phoneInput static 
    phoneInput: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InterMedium,
        color: Colors.InputText,
        flex: 1,
        textAlignVertical: 'center',
    },

    prefix: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InterMedium,
        color: Colors.InputText,
        // marginLeft: moderateScale(10)
    },
    phoneInputBox: {
        height: moderateScale(52),
        borderWidth: 1,
        borderColor: Colors.InputStroke,
        borderRadius: moderateScale(8),
        backgroundColor: Colors.white,
        width: "90%",
        alignSelf: 'center',
        paddingLeft: moderateScale(10),
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: moderateScale(30),
    }
    ,
    countryImgStyle: {
        width: moderateScale(30),
        aspectRatio: 1.5,
        resizeMode: 'contain',
    },
    maskGroupImag: {
        width: moderateScale(60),
        aspectRatio: 1.5,
        resizeMode: 'contain'

    },
    privacyBox: {
        marginTop: moderateScale(18),
    },
    scrachLine: {
        width: moderateScale(1),
        height: moderateScale(35),
        backgroundColor: "rgba(12, 64, 111, 0.24)",
        marginVertical: moderateScale(10),
    },
    supportText: {
        fontSize: moderateScale(14),
        color: "#969696",
        fontFamily: Fonts.InstrumentSansSemiBold,
        alignSelf: 'flex-start'
    },
    supportNumberText: {
        fontSize: moderateScale(22),
        color: "#3B3B3B",
        fontFamily: Fonts.InterSemiBold,
        // alignSelf: 'flex-start'
    },
    plusImg: {
        height: moderateScale(25),
        width: moderateScale(25),
        resizeMode: 'contain',
        marginLeft: moderateScale(-6)
    },
    mainMaskView: {
        backgroundColor: "rgba(12, 64, 111, 0.07)",
        paddingVertical: moderateScale(10),
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: moderateScale(50),
        marginTop: 'auto'
    },
    havingText: {
        color: Colors.ParagraphAndShortTexts,
        fontFamily: Fonts.InterRegular,
    }
    ,
    supportBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: moderateScale(14),
    },
    numberTextBox: {
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth:1,
        // alignSelf: 'flex-start'
    },
    versionText: {
        fontSize: moderateScale(14),
        color: "#454545",
        fontFamily: Fonts.InterRegular,
        alignSelf: 'center',
        // marginBottom: 'auto'
        marginVertical: moderateScale(30)
    }
}
)

// <Text style={styles.subHeading}>We’ll send an OTP to verify your number.</Text>
// <TextInput style={styles.phoneInput} maxLength={10} keyboardType="number-pad" onChangeText={setPhoneInput} value={phoneInput} />
// <Text style={styles.prefix}>+91</Text>
// <Text style={styles.supportText}>Support</Text>
// <Text style={styles.supportNumberText}>91{phoneInput}</Text>

