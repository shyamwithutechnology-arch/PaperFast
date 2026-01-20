import React, { useState } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { Colors, Fonts } from '../../../theme';
import AppHeader from '../../../component/header/AppHeader';
import { OtpInput, OtpTimer } from '../../auth/otp/component';
import AppButton from '../../../component/button/AppButton';
import AppTextInput from '../../../component/apptextinput/AppTextInput';
import { moderateScale } from '../../../utlis/responsiveSize';
import { Icons } from '../../../assets/icons'
import { useDispatch } from "react-redux";
import { loginSuccess } from '../../../redux/slices/authSlice';
import { reduxStorage } from '../../../storage/storage';

const LoginScreenRole = () => {
    const dispatch = useDispatch()
    const [otp, setOtp] = useState('');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [selectedRole, setSelectedRole] = useState('')

    const handleRoleSelect = (status) => {
        if (status === 'male') {
            setSelectedRole(status)
        } else if (status === 'female') {
            setSelectedRole(status)
        }
    }
    // LoginScreen.tsx
    const handleLoggedIn = () => {
        const token = '1234';
        reduxStorage.setItem('token', '123456')
        dispatch(loginSuccess(token));

        // ✅ Don't navigate here - let RootStack handle it automatically
        // The auth state change will trigger RootStack to re-render
    };

    return (
        <SafeAreaView
            style={styles.mainContainer}
            edges={['left', 'right', 'bottom']}
        >
            <AppHeader title="Paper Fast" discriptionText='Paper Generate In Minute' />
            <View style={styles.innerMainContainer}>
                <View style={styles.innerSecondMainContainer}>
                    <Text style={styles.loginText}>Login your Account As</Text>
                    <Text style={styles.subHeading}>Select your role to continue quickly and securely</Text>

                    <AppTextInput placeholder="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                        containerStyle={{ marginTop: moderateScale(20) }}
                    />
                    <AppTextInput placeholder="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                        containerStyle={{ marginVertical: moderateScale(20) }}
                    />

                    <Text style={styles.forText}>For</Text>

                    <View style={styles.selectionBox}>
                        <TouchableOpacity style={styles.studentBox} onPress={() => handleRoleSelect('male')}>
                            <View style={[styles.studentImgBox, { borderWidth: selectedRole === 'male' ? 1 : 0.1 }]}>
                                <Image source={Icons.male} style={styles.maleImg} />
                            </View>
                            <Text style={[styles.studentText, { fontFamily: selectedRole === 'male' ? Fonts.InstrumentSansBold : Fonts.InstrumentSansRegular }]}>Student</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.studentBox, { marginLeft: moderateScale(30) }]} onPress={() => handleRoleSelect('female')}>
                            <View style={[styles.studentImgBox, { borderWidth: selectedRole === 'female' ? 1 : 0.1 }]}>
                                <Image source={Icons.female} style={styles.maleImg} />
                            </View>
                            <Text style={[styles.studentText, { fontFamily: selectedRole === 'female' ? Fonts.InstrumentSansBold : Fonts.InstrumentSansRegular }]}>Teacher</Text>
                        </TouchableOpacity>
                    </View>

                    <AppButton title='Agree and Continue' style={{ paddingHorizontal: moderateScale(89) }} onPress={handleLoggedIn} />

                    <Text style={styles.versionText}>Version 1.0</Text>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreenRole