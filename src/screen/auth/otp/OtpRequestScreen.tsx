import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { Colors } from '../../../theme';
import AppHeader from '../../../component/header/AppHeader';
import { OtpInput, OtpTimer } from '../../auth/otp/component';
import AppButton from '../../../component/button/AppButton';
import { moderateScale } from '../../../utils/responsiveSize';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { showSnackbar } from '../../../utils/snackbar';


const OtpRequestScreen = ({ navigation }) => {
    // const route = useRoute()
    // const { phoneNumber, otpResult } = route.params
    // console.log('phoneNumber', phoneNumber);

    // // console.log('route.paramsssss', route.params)
    // const [otp, setOtp] = useState('');
    // const [loading, setLoading] = useState<boolean>(false);


    // const maskPhoneNumber = (phone) => {
    //     if (!phone) return;
    //     const phoneStr = phone.toString();
    //     const last3 = phoneStr?.slice(-3);
    //     return `+91-*******${last3}`
    // }
    // const handleOtp = () => {
    //     console.log('opttttt ', otp);
    //     let otpResultToString = otpResult.toString()
    //     if (otp?.trim() === '') {
    //         showSnackbar('Please fill the Otp', 'errro',)
    //     } else if (otp?.trim() !== otpResultToString) {
    //         showSnackbar('Otp Does not match', 'errro',)
    //     } else if (otp.trim() === otpResultToString.trim()) {
    //         navigation.navigate('LoginScreenRole', { 'phoneNumber': phoneNumber });
    //         showSnackbar('Otp Verify Successfully', 'success',)
    //     }
    // }

    // const handleOtpRequest = async () => {
    //     setLoading(true);
    //     try {
    //         // Create FormData exactly like Postman
    //         const formData = new FormData();

    //         formData.append('usr_phone', phoneNumber);
    //         const response = await fetch('https://www.papers.withupartners.in/api/login-otp', {
    //             method: 'POST',
    //             // headers: {
    //             //     'Accept': 'application/json',
    //             //     'Cookie': 'ci_session=ee5f5e885a10559417733c3aae4ec3e9cb3587e6'
    //             // },
    //             body: formData
    //         });

    //         console.log('Response status:rr', response);

    //         // Get response text first to see what's returned
    //         const newRes = await response.json();
    //         console.log('newRes:', newRes);
    //         if (response.ok) {
    //             if (newRes.status === 200) {
    //                      showSnackbar(newRes?.msg, 'success');

    //                 // if (newRes?.user_exist === 1) {
    //                 //     showSnackbar('Login Successfully', 'success');
    //                 //     const token = '1234';
    //                 //     reduxStorage.setItem('token', '123456')
    //                 //     handleLoginVerify();
    //                 //     dispatch(loginSuccess(token));
    //                 // } else {
    //                 //     showSnackbar(newRes?.msg, 'success');
    //                 //     await localStorage.setItem(storageKeys.mobileNumber, phoneInput)
    //                 //     navigation.navigate('OtpRequestScreen', { 'otpResult': String(newRes?.result), 'phoneNumber': phoneInput })
    //                 // }
    //             } else {
    //                 showSnackbar(newRes?.msg || 'OTP Failed', 'error');
    //             }
    //         }

    //     } catch (error) {
    //         // console.error('API Error:', error);
    //         if (error.message?.includes('Network')) {
    //             showSnackbar('No internet connection', 'error');
    //         } else {
    //             showSnackbar(error.message, 'error');
    //         }

    //     } finally {
    //         setLoading(false);
    //     }
    // };
    // useFocusEffect(
    //     React.useCallback(() => {
    //         if (otpResult && otpResult !== '') {
    //             const timer = setTimeout(() => {
    //                 Alert.alert('OTP', `Your OTP is: ${otpResult}`);
    //             }, 300);

    //             return () => clearTimeout(timer);
    //         }
    //     }, [otpResult])
    // );

    const route = useRoute();
    const { phoneNumber, otpResult } = route.params;
    console.log('Initial OTP from Login:', otpResult);

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [currentOtpResult, setCurrentOtpResult] = useState(otpResult);

    const maskPhoneNumber = (phone) => {
        if (!phone) return '';
        const phoneStr = phone.toString();
        const last3 = phoneStr?.slice(-3);
        return `+91-*******${last3}`;
    };

    const handleOtp = () => {
        console.log('Entered OTP:', otp);
        console.log('Current OTP Result:', currentOtpResult);

        let otpResultToString = currentOtpResult.toString();

        if (otp?.trim() === '') {
            showSnackbar('Please fill the OTP', 'error');
        } else if (otp?.trim() !== otpResultToString) {
            showSnackbar('OTP does not match', 'error');
        } else if (otp.trim() === otpResultToString.trim()) {
            navigation.navigate('LoginScreenRole', { 'phoneNumber': phoneNumber });
            showSnackbar('OTP Verified Successfully', 'success');
        }
    };

    // Function to resend OTP - Calls the SAME API as Login Screen
    const handleResendOtp = async () => {
        setResendLoading(true);
        try {
            const formData = new FormData();
            formData.append('usr_phone', phoneNumber);

            console.log('Resending OTP to:', phoneNumber);

            // This is the SAME API endpoint used in LoginScreen
            const response = await fetch('https://www.papers.withupartners.in/api/login-otp', {
                method: 'POST',
                body: formData
            });

            const newRes = await response.json();
            console.log('Resend OTP API Response:', newRes);

            if (response.ok && newRes.status === 200) {
                // Get the new OTP from response (same structure as login screen)
                const newOtp = String(newRes?.result);

                // Update ONLY the otpResult - this is the key change
                setCurrentOtpResult(newOtp);

                // Clear current OTP input field
                setOtp('');

                // Show success message
                showSnackbar('OTP resent successfully', 'success');

                // For testing/debugging, show the new OTP in alert
                Alert.alert(
                    'New OTP Sent',
                    `Your new OTP is: ${newOtp}`,
                    [
                        {
                            text: 'Auto-fill',
                            onPress: () => setOtp(newOtp), // Auto-fill OTP
                            style: 'default'
                        },
                        {
                            text: 'OK',
                            style: 'cancel'
                        }
                    ]
                );

                console.log('Updated OTP Result:', newOtp);
            } else {
                showSnackbar(newRes?.msg || 'Failed to resend OTP', 'error');
            }
        } catch (error) {
            console.error('Resend OTP Error:', error);
            if (error.message?.includes('Network')) {
                showSnackbar('No internet connection', 'error');
            } else {
                showSnackbar('Failed to resend OTP. Please try again.', 'error');
            }
        } finally {
            setResendLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            if (currentOtpResult && currentOtpResult !== '') {
                const timer = setTimeout(() => {
                    Alert.alert('OTP', `Your OTP is: ${currentOtpResult}`);
                }, 300);

                return () => clearTimeout(timer);
            }
        }, [currentOtpResult])
    );

    return (
        <SafeAreaView
            style={styles.mainContainer}
            edges={['left', 'right', 'bottom']} // 🔥 IMPORTANT
        >
            <AppHeader title="Paper Fast" discriptionText='Paper Generate In Minute' />
            <View style={styles.innerMainContainer}>
                <View style={styles.innerSecondMainContainer}>
                    <Text style={styles.loginText}>OTP Request</Text>
                    <Text style={styles.subHeading}>We’ll sent an OTP to your {maskPhoneNumber(phoneNumber)} number.</Text>

                    <OtpInput
                        value={otp}
                        length={4}
                        onChange={setOtp}
                    />

                    <Text style={styles.didNoteText}>Didn’t receive code?</Text>
                    <Text style={styles.didNoteText}>You can resend code in</Text>
                    <OtpTimer onResendOtp={handleResendOtp}
                        isLoading={resendLoading} />

                    <View style={styles.buttonBox}>
                        <AppButton title='Verification' onPress={handleOtp} style={{ paddingHorizontal: moderateScale(123) }} />
                    </View>
                    <Text style={styles.versionText}>Version 1.0</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default OtpRequestScreen
