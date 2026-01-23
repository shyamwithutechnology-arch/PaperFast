import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { Colors, Fonts } from '../../../theme';
import AppHeader from '../../../component/header/AppHeader';
import { OtpInput, OtpTimer } from '../../auth/otp/component';
import AppButton from '../../../component/button/AppButton';
import AppTextInput from '../../../component/apptextinput/AppTextInput';
import { moderateScale } from '../../../utils/responsiveSize';
import { Icons } from '../../../assets/icons'
import { useDispatch } from "react-redux";
import { loginSuccess } from '../../../redux/slices/authSlice';
import { localStorage, reduxStorage, storageKeys } from '../../../storage/storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { showSnackbar } from '../../../utils/snackbar';
import Loader from '../../../component/loader/Loader'
import {POST_FORM } from '../../../api/request';
import { ApiEndPoint } from '../../../api/endPoints';
const LoginScreenRole = () => {
    const route = useRoute()
    // const { phoneNumber } = route.params
    // console.log('phoneNumberphoneNumber', phoneNumber);

    const dispatch = useDispatch()
    const [otp, setOtp] = useState('');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [mobileNumber, setMobileNumber] = useState<string | number>('')
    const [input, setInput] = useState({
        firstName: '',
        lastName: ''
    });
    const [selectedRole, setSelectedRole] = useState('')

    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState({});
    const navigation = useNavigation()


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

    const handleLoginVerify = async () => {
        setErrors({});
        // Validate form
        const validateForm = (formData) => {
            const errors = {};
            if (!formData?.firstName?.trim()) {
                errors.firstName = 'Please enter first name';
            }

            if (!formData?.lastName?.trim()) {
                errors.lastName = 'Please enter last name';
            }
            return errors;
        };

        const validationErrors = validateForm(input);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            showSnackbar('Please fill all required fields', 'error');
            return;
        }

        if (!selectedRole) {
            showSnackbar('Please Select Your Role', 'error');
            return;
        }
        setErrors({});
        setLoading(true);
        try {
            const payload = {
                usr_first_name: input?.firstName,
                usr_last_name: input?.lastName,
                usr_phone: mobileNumber,
                usr_role: selectedRole === 'male' ? 'student' : 'tutor',
                usr_device_token: 'fdsaagdfhghjk'
            };
            const response = await POST_FORM(ApiEndPoint.LoGINROlE, payload);
            if (response && response.status === 200) {
                showSnackbar('Registration Successful', 'success');
                await localStorage.setItem(storageKeys.userId, String(response?.result?.usr_id))
                await reduxStorage.setItem('token', '123456')
                dispatch(loginSuccess('123456'));
            } else {
                const errorMessage = response?.message ||
                    'Registration failed. Please try again.';
                showSnackbar(errorMessage, 'error');
            }

        } catch (error: any) {
            if (error?.offline) {
                showSnackbar('No internet connection', 'error');
                return;
            }
            const errorMessage = error?.response?.data?.message ||
                error?.message ||
                'Something went wrong. Please try again.';
            showSnackbar(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    // run with fetch
    // const handleLoginVerify = async() => {

    //     // Clear previous errors
    //     setErrors({});

    //     // Validate phone number
    //     const validateForm = (name) => {
    //         console.log('eeeeeeeeeeeeee', name?.firstName)
    //         const errors = {};

    //         if (!name?.firstName || name?.firstName.trim() === '') {
    //             errors.firstName = 'Pease Enter Fist Name';
    //         } else if (!name?.lastName || name?.lastName.trim() === '') {
    //             errors.lastName = 'Please Enter Last Name';
    //         }
    //         return errors;
    //     };

    //     const validationErrors = validateForm(input);

    //     if (Object.keys(validationErrors).length > 0) {
    //         setErrors(validationErrors);
    //         showSnackbar('Please fill all required fields', 'error');
    //         return;
    //     }
    //     if (!selectedRole) {
    //         showSnackbar('Please Select Your Role', 'error');
    //         return;
    //     }
    //     setErrors({});

    //     setLoading(true);

    //     try {
    //         // Create FormData exactly like Postman
    //         const formData = new FormData();

    // formData.append('usr_first_name', input?.firstName);
    // formData.append('usr_last_name', input?.lastName);
    // formData.append('usr_phone', mobileNumber);
    // formData.append('usr_role', selectedRole === 'Male' ? 'Student' : 'tutor');
    // formData.append('usr_device_token', 'abc123xyz');

    //         // formData.append('usr_first_name', 'Nidhi');
    //         // formData.append('usr_last_name','Sharma' );
    //         // formData.append('usr_phone', '9414359663');
    //         // formData.append('usr_role', 'tutor');
    //         // formData.append('usr_device_token', 'abc123xyz');

    //         // console.log('Sending FormData exactly like Postman:');
    //         // console.log('usr_first_name: Nidhi');
    //         // console.log('usr_last_name: Sharma');
    //         // console.log('usr_phone: 9414359663');
    //         // console.log('usr_role: tutor');
    //         // console.log('udddd',formData);

    //         const response = await fetch('https://www.papers.withupartners.in/api/login', {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 // 'Cookie': 'ci_session=ee5f5e885a10559417733c3aae4ec3e9cb3587e6'
    //             },
    //             body: formData
    //         });

    //         console.log('Response status:rr', response);

    //         // Get response text first to see what's returned
    //         const newRes = await response.json();
    //         console.log('newRes:', newRes);

    //         // // Try to parse as JSON
    //         // let responseData;
    //         // try {
    //         //     responseData = JSON.parse(responseText);
    //         // } catch (e) {
    //         //     console.log('Response is not JSON:', responseText);
    //         //     throw new Error('Invalid response format');
    //         // }

    //         // console.log('Parsed response:', responseData);

    //         if (response.ok) {
    //             //     // Check your API's success condition
    //             //     if (newRes.status === 200 || responseData.success) {
    //             //         showSnackbar('Registration successful!', 'success');
    //             //     } else {
    //             //         showSnackbar(responseData.message || 'Registration failed', 'error');
    //             //     }
    //             // } else {
    //             //     throw new Error(`HTTP ${response.status}: ${responseData.message || 'Request failed'}`);
    //             console.log('newRes.status',newRes.status == '1')

    //             if (newRes.status === 200) {                    
    //                 showSnackbar(newRes?.msg || 'Registration successful!', 'success');
    //                 console.log(' newRes?.result?.usr_id', newRes?.result?.usr_id);

    //                 await localStorage.setItem(storageKeys.userId, String(newRes?.result?.usr_id))
    //                 await reduxStorage.setItem('token', '123456')
    //                 dispatch(loginSuccess('123456'));
    //             } else {
    //                 showSnackbar(newRes?.msg || 'Registration failed', 'error');
    //             }
    //         }
    //     } catch (error) {
    //         console.error('API Error:', error);
    //         // if (error.message?.includes('Network')) {
    //         //     showSnackbar('No internet connection', 'error');
    //         // } else {
    //         //     showSnackbar(error.message, 'error');
    //         // }
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleFirstNameChange = (text) => {
        setInput(prev => ({ ...prev, firstName: text }));
        if (errors.firstName) {
            setErrors(prev => ({ ...prev, firstName: '' }));
        }
    };

    const handleLastNameChange = (text) => {
        setInput(prev => ({ ...prev, lastName: text }));
        if (errors.lastName) {
            setErrors(prev => ({ ...prev, lastName: '' }));
        }
    };

    useEffect(() => {
        const getData = async () => {
            let mobile = await localStorage.getItem(storageKeys.mobileNumber)
            setMobileNumber(mobile)
        }
        getData()
    }, [])
    return (
        <SafeAreaView
            style={styles.mainContainer}
            edges={['left', 'right', 'bottom']}
        >
            <Loader visible={loading} />
            <>
                <AppHeader title="Paper Fast" discriptionText='Paper Generate In Minute' />
                <View style={styles.innerMainContainer}>
                    <View style={styles.innerSecondMainContainer}>
                        <Text style={styles.loginText}>Login your Account As</Text>
                        <Text style={styles.subHeading}>Select your role to continue quickly and securely</Text>

                        <AppTextInput placeHolderText="First Name"
                            value={input?.firstName}
                            onChangeText={handleFirstNameChange}
                            containerStyle={{ marginTop: moderateScale(20) }}
                        />
                        {errors?.firstName && <Text style={{ fontSize: moderateScale(12), color: Colors.red, fontFamily: Fonts.InterMedium, marginLeft: moderateScale(20) }}>{errors?.firstName}</Text>
                        }
                        <View style={{ marginVertical: moderateScale(20) }}>
                            <AppTextInput placeHolderText="Last Name"
                                value={input?.lastName}
                                onChangeText={handleLastNameChange}
                                containerStyle={{}}
                            />
                            {errors?.lastName && <Text style={{ fontSize: moderateScale(12), color: Colors.red, fontFamily: Fonts.InterMedium, marginLeft: moderateScale(20) }}>{errors?.lastName}</Text>}</View>

                        <Text style={styles.forText}>For</Text>

                        <View style={styles.selectionBox}>
                            <TouchableOpacity style={[styles.studentBox,]} onPress={() => handleRoleSelect('male')}>
                                <View style={[styles.studentImgBox, { borderWidth: selectedRole === 'male' ? 1 : 0.1, backgroundColor: selectedRole === 'male' ? '#EBF6FD' : '#F3F3F3', borderColor: selectedRole === 'male' ? 'rgba(18, 70, 130, 0.47)' : Colors.InputStroke }]}>
                                    <Image source={Icons.male} style={[styles.maleImg, { tintColor: selectedRole === 'male' ? Colors?.primaryColor : 'rgba(169, 169, 169, 0.56)' }]} />
                                </View>
                                <Text style={[styles.studentText, { fontFamily: selectedRole === 'male' ? Fonts.InstrumentSansBold : Fonts.InstrumentSansRegular, color: selectedRole === 'male' ? Colors?.primaryColor : Colors?.InputText }]}>Student</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.studentBox, { marginLeft: moderateScale(30) }]} onPress={() => handleRoleSelect('female')}>
                                <View style={[styles.studentImgBox, { borderWidth: selectedRole === 'female' ? 1 : 0.1, backgroundColor: selectedRole === 'female' ? '#EBF6FD' : '#F3F3F3', borderColor: selectedRole === 'female' ? 'rgba(18, 70, 130, 0.47)' : Colors.InputStroke }]}>
                                    <Image source={Icons.female} style={[styles.maleImg, { tintColor: selectedRole === 'female' ? Colors?.primaryColor : 'rgba(169, 169, 169, 0.56)' }]} />
                                </View>
                                <Text style={[styles.studentText, { fontFamily: selectedRole === 'female' ? Fonts.InstrumentSansBold : Fonts.InstrumentSansRegular, color: selectedRole === 'female' ? Colors?.primaryColor : Colors?.InputText }]}>Teacher</Text>
                            </TouchableOpacity>
                        </View>

                        <AppButton title='Agree and Continue' style={{ paddingHorizontal: moderateScale(89) }} onPress={handleLoginVerify} />

                        <Text style={styles.versionText}>Version 1.0</Text>

                    </View>
                </View>

            </>
        </SafeAreaView>
    )
}

export default LoginScreenRole