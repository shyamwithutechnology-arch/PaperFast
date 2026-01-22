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
    const route = useRoute()
    const { phoneNumber, otpResult } = route.params
    console.log('phoneNumber', phoneNumber);

    // console.log('route.paramsssss', route.params)
    const [otp, setOtp] = useState('');

    const maskPhoneNumber = (phone) => {
        if (!phone) return;
        const phoneStr = phone.toString();
        const last3 = phoneStr?.slice(-3);
        return `+91-*******${last3}`
    }
    const handleOtp = () => {
        console.log('opttttt ', otp);
        let otpResultToString = otpResult.toString()
        if (otp?.trim() === '') {
            showSnackbar('Please fill the Otp', 'errro',)
        } else if (otp?.trim() !== otpResultToString) {
            showSnackbar('Otp Does not match', 'errro',)
        } else if (otp.trim() === otpResultToString.trim()) {
            navigation.navigate('LoginScreenRole', { 'phoneNumber': phoneNumber });
            showSnackbar('Otp Verify Successfully', 'success',)
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            if (otpResult && otpResult !== '') {
                const timer = setTimeout(() => {
                    Alert.alert('OTP', `Your OTP is: ${otpResult}`);
                }, 300);

                return () => clearTimeout(timer);
            }
        }, [otpResult])
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
                    <OtpTimer />

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
