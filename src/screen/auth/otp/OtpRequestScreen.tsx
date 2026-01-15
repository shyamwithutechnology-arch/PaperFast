import React, { useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { Colors } from '../../../theme';
import AppHeader from '../../../component/header/AppHeader';
import { OtpInput, OtpTimer } from '../../auth/otp/component';
import AppButton from '../../../component/button/AppButton';
import { moderateScale } from '../../../utlis/responsiveSize';


const OtpRequestScreen = ({navigation}) => {
    const [otp, setOtp] = useState('');
    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.primaryColor} />
            <AppHeader title="Paper Fast" discriptionText='Paper Generate In Minute' />

            <View style={styles.innerMainContainer}>
                <View style={styles.innerSecondMainContainer}>
                    <Text style={styles.loginText}>OTP Request</Text>
                    <Text style={styles.subHeading}>We’ll sent an OTP to your +91-*****-**350 number.</Text>

                    <OtpInput
                        value={otp}
                        length={4}
                        onChange={setOtp}
                    />

                    <Text style={styles.didNoteText}>Didn’t receive code?</Text>
                    <Text style={styles.didNoteText}>You can resend code in</Text>
                    <OtpTimer />

                    <View style={styles.buttonBox}>
                        <AppButton title='Verification' onPress={() => navigation.navigate('LoginScreenRole')} style={{paddingHorizontal:moderateScale(123)}}/>
                    </View>
                    <Text style={styles.versionText}>Version 1.0</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default OtpRequestScreen
