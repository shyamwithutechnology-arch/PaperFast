import React, { useState } from "react";
import { View, Text, Image, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../../component/header/AppHeader";
import AppButton from "../../../component/button/AppButton";
import PhoneInput from "react-native-international-phone-number";
import { Icons } from "../../../assets/icons";
import { moderateScale } from "../../../utils/responsiveSize";
import { Colors, Fonts } from "../../../theme";
import { ApiEndPoint } from "../../../api/endPoints";
import Loader from "../../../component/loader/Loader";
import { localStorage, reduxStorage, storageKeys } from "../../../storage/storage";
import { useNavigation } from "@react-navigation/native";
import { POST_FORM } from "../../../api/request";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slices/authSlice";
import { showToast } from "../../../utils/toast";
import { styles } from "./styles";
import { setRole } from "../../../redux/slices/userRole";

const LoginScreen = () => {
    const dispatch = useDispatch()
    // const [phone, setPhone] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [phoneInput, setPhoneInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState({});
    const navigation = useNavigation()
    // Get role from userRole slice
    const userRole = useSelector((state: any) => state.userRole?.role);
    // OR get the entire userRole slice
    const roleState = useSelector((state: any) => state);

    console.log('User role:', userRole);
    console.log('Role state:', roleState);

    const handlePhoneChange = (text: string) => {
        const digitsOnly = text.replace(/\D/g, '');
        // let formatted = digitsOnly;
        // if (digitsOnly.length > 5) {
        //     formatted = `${digitsOnly.slice(0, 5)}-${digitsOnly.slice(5, 10)}`;
        // }
        setPhoneInput(digitsOnly);
        if (errors.phone) {
            setErrors(prev => ({ ...prev, phone: '' }));
        }
    };

    const handleLoginVerify = async () => {
        setLoading(true);
        try {
            const params = {
                'usr_phone': phoneInput
            }
            const response = await POST_FORM(ApiEndPoint.LoGINROlE, params)
            console.log('responserrrrrrrr', response);
            if (response.status === 200) {
                // console.log('response?.result?.usr_id',response?.result?.usr_id);
                showToast('success', 'Success', 'Logged in successfully')
                dispatch(setRole(response?.result?.usr_role))
                await localStorage.setItem(storageKeys.userId, String(response?.result?.usr_id))
                await reduxStorage.setItem('token', '1234')
                await dispatch(loginSuccess('1234'));
            } else {
                showToast('error', 'Error', response?.msg || 'Registration failed');
            }
        } catch (error) {
            if (error?.offline) {
                return;
            }
            showToast('error', 'Error', error.msg || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    };

    const handleLogin = async () => {
        setErrors({})
        const validatePhone = (phone) => {
            const errors = {};
            if (!phone || phone.trim() === '') {
                errors.phone = 'Phone number is required';
            } else if (phone.length !== 10) {
                errors.phone = 'Please enter a valid 10-digit phone number';
            } else if (!/^\d{10}$/.test(phone)) {
                errors.phone = 'Phone number should contain only digits';
            }
            return errors;
        };

        const validationErrors = validatePhone(phoneInput);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            showToast('error', 'Error', 'Please check your phone number')
            return;
        }

        setErrors({})
        setLoading(true)
        try {
            const params = {
                'usr_phone': phoneInput
            }

            const response = await POST_FORM(ApiEndPoint?.LoGIN, params);
            if (response?.status === 200) {
                if (response?.user_exist === 1) {
                    await handleLoginVerify();
                } else {
                    showToast('success', 'Success', response?.msg)
                    await localStorage.setItem(storageKeys.mobileNumber, phoneInput)
                    navigation.navigate('OtpRequestScreen', { 'otpResult': String(response?.result), 'phoneNumber': phoneInput })
                }
            } else {
                showToast('error', 'Error', response.msg || "OTP faild")
            }
        } catch (error) {
            if (error?.offline) {
                return;
            }
            showToast('error', 'Error', error.msg || 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView
            style={styles.mainContainer}
            edges={['left', 'right', 'bottom']}>
            <Loader visible={loading} />
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
                            <Text style={styles.prefix}>  +91</Text>
                            <TextInput style={styles.phoneInput} maxLength={10} keyboardType="phone-pad" onChangeText={handlePhoneChange} value={phoneInput} />
                        </View>
                    </View>
                    {errors?.phone && <Text style={{ fontSize: moderateScale(12), color: Colors.red, fontFamily: Fonts.InterMedium, marginLeft: moderateScale(20) }}>{errors?.phone}</Text>}
                    {/* // button */}
                    <AppButton title="Send Verification OTP" onPress={handleLogin} style={{ paddingHorizontal: moderateScale(82), marginTop: moderateScale(20), }} />

                    {/* <View style={styles.privacyBox}>
                        <Text style={styles.byRegisterText}>By registering, you agree to the
                            <Text style={[styles.byRegisterText, { fontFamily: Fonts.InterSemiBold }]} onPress={() => navigation.navigate('TermandconditionScreen')}>Terms of Service,{`\n`}
                                <Text style={[styles.byRegisterText, { fontFamily: Fonts.InterSemiBold }]} onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
                                    Privacy Policy </Text>
                            </Text> and <Text style={[styles.byRegisterText, { fontFamily: Fonts.InterSemiBold }]}>Cookie Policy.</Text></Text>  </View> */}
                    <View style={styles.privacyBox}>
                        <Text style={styles.byRegisterText}>
                            By registering, you agree to the{' '}
                            <Text style={[styles.byRegisterText, { fontFamily: Fonts.InterSemiBold }]} onPress={() => navigation.navigate('TermandconditionScreen')}>
                                Terms of Service,
                            </Text>
                            {'\n'}
                            <Text style={[styles.byRegisterText, { fontFamily: Fonts.InterSemiBold }]} onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
                                Privacy Policy{' '}
                            </Text>
                            and{' '}
                            <Text style={[styles.byRegisterText, { fontFamily: Fonts.InterSemiBold }]} onPress={() => navigation.navigate('CookiePolicyScreen')}>
                                Cookie Policy.
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.mainMaskView}>
                        <Image source={Icons.MaskGroup} style={styles.maskGroupImag} />
                        <View style={{}}>
                            <View style={[styles.supportBox, { marginHorizontal: moderateScale(0) }]}>
                                <View style={styles.scrachLine} />
                                <View style={[styles.supportBox, { flexDirection: 'column', alignItems: 'flex-start' }]}>
                                    <Text style={styles.supportText}>Support</Text>
                                    <View style={styles.numberTextBox}>
                                        <Image source={Icons.plus} style={styles.plusImg} />
                                        <Text style={styles.supportNumberText}>91 9510779200</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.versionText}>Version 1.0</Text>
                </View>

            </View>
        </SafeAreaView >
    )
}

export default LoginScreen

