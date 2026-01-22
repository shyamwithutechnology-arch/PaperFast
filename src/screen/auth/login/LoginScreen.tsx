import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, Pressable, StatusBar, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../../component/header/AppHeader";
import AppButton from "../../../component/button/AppButton";
import PhoneInput from "react-native-international-phone-number";
import { Icons } from "../../../assets/icons";
import { moderateScale } from "../../../utils/responsiveSize";
import { Colors, Fonts } from "../../../theme";
import api from "../../../api/axios";
import { ApiEndPoint } from "../../../api/endPoints";
import Loader from "../../../component/loader/Loader";
import { showSnackbar } from "../../../utils/snackbar";
import { localStorage, reduxStorage, storageKeys } from "../../../storage/storage";
import { useNavigation } from "@react-navigation/native";
import { POST_FORM } from "../../../api/request";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux/slices/authSlice";

const LoginScreen = () => {
    const dispatch = useDispatch()
    // const [phone, setPhone] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [phoneInput, setPhoneInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState({});
    const navigation = useNavigation()
    console.log('errors', errors);

    const handlePhoneChange = (text: string) => {
        const digitsOnly = text.replace(/\D/g, '');

        // let formatted = digitsOnly;
        // if (digitsOnly.length > 5) {
        //     formatted = `${digitsOnly.slice(0, 5)}-${digitsOnly.slice(5, 10)}`;
        // }
        setPhoneInput(digitsOnly);

        // Clear phone error when user starts typing
        if (errors.phone) {
            setErrors(prev => ({ ...prev, phone: '' }));
        }
    };

    // const handleOtpRequest = async () => {
    //     setLoading(false)
    //     try {
    //         const data = {
    //             usr_phone: phoneInput
    //         }
    //         const res = await api.post(ApiEndPoint.LoGIN, data)
    //         console.log('ressssssss', res)
    //         showSnackbar('success')
    //     } catch (error) {
    //         console.log('errrrrrr', error)
    //     }
    //     navigation.navigate('OtpRequestScreen', { phoneNumber: phoneInput });
    // }

    // const handleOtpRequest = async () => {
    //     console.log('Phone input for validation:', phoneInput);

    //     // Direct validation without regex replace since phoneInput already has digits only
    //     const validatePhone = (phone) => {
    //         console.log('phoneee', phone);

    //         const errors = {};

    //         // Check if empty
    //         if (phone.trim() === '') {
    //             errors.phone = 'Phone number is required';
    //             console.log('phoneee1', phone);
    //         }
    //         // Check if not exactly 10 digits
    //         else if (phone.length !== 10) {
    //             errors.phone = 'Please enter a valid 10-digit phone number';
    //             console.log('phoneee2', phone);
    //         }

    //         console.log('Validation result:', errors);
    //         return errors;
    //     };

    //     const validationErrors = validatePhone(phoneInput);
    //     setErrors(validationErrors);

    //     if (Object.keys(validationErrors).length > 0) {
    //         // showSnackbar('Please check your phone number');
    //         return;
    //     }

    //     setLoading(true);

    //     try {

    //         const payload = {
    //             usr_phone: phoneInput,
    //         };

    //         const res = await api.post(ApiEndPoint.LoGIN, payload)
    //         console.log('reeeeeeeee', res)
    //         console.log('res?.data.status === 200', res?.data.status === 200)
    //         console.log('res?.data.staturesult', res?.data.result)

    //         // ✅ API success check (depends on backend)
    //         if (res && res?.data.status === 200) {
    //             console.log('ressssssdata', res?.data)
    //                     setLoading(true);
    //               showSnackbar('Otp send Successfully')
    //             //   navigation.navigate('OtpRequestScreen', {
    //             //     phoneNumber: phoneInput,
    //             //   });
    //             await localStorage.setItem(storageKeys.user_exist, res?.data?.user_exist)
    //         } else {
    //             showSnackbar(res?.message || 'Something went wrong');
    //         }

    //     } catch (error: any) {
    //         console.log('errorddd', error);
    //         // ✅ Offline handled by interceptor
    //         if (error?.offline) return;
    //         // ✅ API error
    //         const message =
    //             error?.response?.data?.message ||
    //             error?.message ||
    //             'Login failed';

    //         showSnackbar(message);
    //         console.log('errorddd', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    // const handleOtpRequest = async () => {
    // console.log('Phone input for validation:', phoneInput);

    // // Clear previous errors
    // setErrors({});

    // // Validate phone number
    // const validatePhone = (phone) => {
    //     const errors = {};

    //     if (!phone || phone.trim() === '') {
    //         errors.phone = 'Phone number is required';
    //     } else if (phone.length !== 10) {
    //         errors.phone = 'Please enter a valid 10-digit phone number';
    //     } else if (!/^\d+$/.test(phone)) {
    //         errors.phone = 'Phone number should contain only digits';
    //     }

    //     return errors;
    // };

    // const validationErrors = validatePhone(phoneInput);

    // if (Object.keys(validationErrors).length > 0) {
    //     setErrors(validationErrors);
    //     showSnackbar('Please check your phone number', 'error',);
    //     return;
    // }
    // // navigation.navigate('OtpRequestScreen', { 'otpResult': '1234', 'phoneNumber': '9358692040' })

    // setLoading(true);

    //     try {
    //         const payload = {
    //             usr_phone: phoneInput,
    //         };

    //         const res = await api.post(ApiEndPoint.LoGIN, payload);
    //         console.log('API Response:', res);
    //         console.log('Response data:', res?.data);
    //         console.log('Response status:', res.data.status);

    //         // ✅ API success check
    //         if (res && res.data && res.data.status === 200) {
    //             console.log('Success:', res.data);

    //             // Store user_exist in local storage
    //             if (res.data.user_exist !== undefined) {
    //                 await localStorage.setItem(storageKeys.user_exist, res.data.user_exist.toString());
    //             }

    //             // Show success message
    // showSnackbar('OTP sent successfully', 'success');
    // navigation.navigate('OtpRequestScreen', { 'otpResult': res?.data.result, 'phoneNumber': phoneInput })
    // Navigate to OTP screen (uncomment when ready)
    // navigation.navigate('OtpRequestScreen', {
    //     phoneNumber: phoneInput,
    // });

    //         } else {
    //             // Show error from API response
    //             const errorMessage = res?.data?.message ||
    //                 res?.message ||
    //                 'Failed to send OTP. Please try again.';
    //             showSnackbar(errorMessage, 'error');
    //         }

    //     } catch (error: any) {
    //         console.log('API Error:', error);

    //         // Handle offline errors
    //         if (error?.offline) {
    //             showSnackbar('No internet connection. Please check your network.', 'error');
    //             return;
    //         }

    //         // Handle API errors
    //         const errorMessage = error?.response?.data?.message ||
    //             error?.message ||
    //             'Something went wrong. Please try again.';

    //         showSnackbar(errorMessage, 'error');

    //     } finally {
    //         // Always stop loading
    //         setLoading(false);
    //     }
    // };


    const handleLoginVerify = async () => {
        setLoading(true);

        try {
            // Create FormData exactly like Postman
            const formData = new FormData();

            formData.append('usr_phone', phoneInput);

            const response = await fetch('https://www.papers.withupartners.in/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    // 'Cookie': 'ci_session=ee5f5e885a10559417733c3aae4ec3e9cb3587e6'
                },
                body: formData
            });
            // Get response text first to see what's returned
            const newRes = await response.json();
            // console.log('newRes:', newRes);
            if (response.ok) {
                if (newRes.status === 200) {
                    await localStorage.setItem(storageKeys.userId, String(newRes?.result?.usr_id))
                } else {
                    showSnackbar(newRes?.msg || 'Registration failed', 'error');
                }
            }

        } catch (error) {
            console.error('API Error:', error);
            // if (error.message?.includes('Network')) {
            //     showSnackbar('No internet connection', 'error');
            // } else {
            //     showSnackbar(error.message, 'error');
            // }

        } finally {
            setLoading(false);
        }
    };
    const handleOtpRequest = async () => {

        setErrors({});

        // Validate phone number
        const validatePhone = (phone) => {
            const errors = {};

            if (!phone || phone.trim() === '') {
                errors.phone = 'Phone number is required';
            } else if (phone.length !== 10) {
                errors.phone = 'Please enter a valid 10-digit phone number';
            } else if (!/^\d+$/.test(phone)) {
                errors.phone = 'Phone number should contain only digits';
            }

            return errors;
        };

        const validationErrors = validatePhone(phoneInput);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            showSnackbar('Please check your phone number', 'error',);
            return;
        }
        setErrors({});

        setLoading(true);

        try {
            // Create FormData exactly like Postman
            const formData = new FormData();

            formData.append('usr_phone', phoneInput);
            const response = await fetch('https://www.papers.withupartners.in/api/login-otp', {
                method: 'POST',
                // headers: {
                //     'Accept': 'application/json',
                //     'Cookie': 'ci_session=ee5f5e885a10559417733c3aae4ec3e9cb3587e6'
                // },
                body: formData
            });

            console.log('Response status:rr', response);

            // Get response text first to see what's returned
            const newRes = await response.json();
            console.log('newRes:', newRes);

            // // Try to parse as JSON
            // let responseData;
            // try {
            //     responseData = JSON.parse(responseText);
            // } catch (e) {
            //     console.log('Response is not JSON:', responseText);
            //     throw new Error('Invalid response format');
            // }

            // console.log('Parsed response:', responseData);

            if (response.ok) {
                //     // Check your API's success condition
                //     if (newRes.status === 200 || responseData.success) {
                //         showSnackbar('Registration successful!', 'success');
                //     } else {
                //         showSnackbar(responseData.message || 'Registration failed', 'error');
                //     }
                // } else {
                //     throw new Error(`HTTP ${response.status}: ${responseData.message || 'Request failed'}`);

                if (newRes.status === 200) {
                    console.log('newRes?.user_exist d', newRes?.user_exist === 0)
                    // showSnackbar(newRes?.msg || 'Registration successful!', 'success');
                    // reduxStorage.setItem('token', '123456')
                    // dispatch(loginSuccess('123456'));

                    if (newRes?.user_exist === 1) {
                        showSnackbar('Login Successfully', 'success');
                        const token = '1234';
                        reduxStorage.setItem('token', '123456')
                        handleLoginVerify();
                        dispatch(loginSuccess(token));
                    } else {
                        showSnackbar(newRes?.msg, 'success');
                        await localStorage.setItem(storageKeys.mobileNumber, phoneInput)
                        navigation.navigate('OtpRequestScreen', { 'otpResult': String(newRes?.result), 'phoneNumber': phoneInput })
                    }
                } else {
                    showSnackbar(newRes?.msg || 'OTP Failed', 'error');
                }
            }

        } catch (error) {
            // console.error('API Error:', error);
            if (error.message?.includes('Network')) {
                showSnackbar('No internet connection', 'error');
            } else {
                showSnackbar(error.message, 'error');
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView
            style={styles.mainContainer}
            edges={['left', 'right', 'bottom']}>
                <Loader visible={loading}/>
            {/* <StatusBar barStyle="dark-content" backgroundColor={Colors.primaryColor} /> */}
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
                            <TextInput style={styles.phoneInput} maxLength={10} keyboardType="phone-pad" onChangeText={handlePhoneChange} value={phoneInput} />
                        </View>
                    </View>
                    {errors?.phone && <Text style={{ fontSize: moderateScale(12), color: Colors.red, fontFamily: Fonts.InterMedium, marginLeft: moderateScale(20) }}>{errors?.phone}</Text>}

                    {/* // button */}
                    <AppButton title="Send Verification OTP" onPress={handleOtpRequest} style={{ paddingHorizontal: moderateScale(82), marginTop: moderateScale(20) }} />

                    <View style={styles.privacyBox}>
                        <Text style={styles.byRegisterText}>By registering, you agree to the
                            <Text style={[styles.byRegisterText, { fontFamily: Fonts.InterSemiBold }]}>Terms of Service,{`\n`}
                                <Text style={[styles.byRegisterText, { fontFamily: Fonts.InterSemiBold }]} onPress={() => { console.log('this for those') }}>
                                    Privacy Policy </Text>
                            </Text> and <Text style={[styles.byRegisterText, { fontFamily: Fonts.InterSemiBold }]}>Cookie Policy.</Text></Text>
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
                                        <Text style={styles.supportNumberText}>91 7685785976</Text>
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
        fontSize: moderateScale(15),
        fontFamily: Fonts.InterMedium,
        color: Colors.InputText,
        flex: 1,
        textAlignVertical: 'center',
    },

    prefix: {
        fontSize: moderateScale(15),
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
        marginTop: moderateScale(24)
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
        marginVertical: moderateScale(10)
    }
}
)

// <Text style={styles.subHeading}>We’ll send an OTP to verify your number.</Text>
// <TextInput style={styles.phoneInput} maxLength={10} keyboardType="number-pad" onChangeText={setPhoneInput} value={phoneInput} />
// <Text style={styles.prefix}>+91</Text>
// <Text style={styles.supportText}>Support</Text>
// <Text style={styles.supportNumberText}>91{phoneInput}</Text>

