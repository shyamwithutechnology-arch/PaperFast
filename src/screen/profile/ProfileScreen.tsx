import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, Pressable, StatusBar, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import AppHeader from "../../component/header/AppHeader";
import { Icons } from "../../assets/icons";
import { moderateScale } from "react-native-size-matters";
import AppButton from "../../component/button/AppButton";
import { Fonts } from "../../theme";
import AppTextInput from "../../component/apptextinput/AppTextInput";
import { showSnackbar } from "../../utils/snackbar";
import Loader from "../../component/loader/Loader";
import { localStorage, storageKeys } from "../../storage/storage";
// import { useNavigation } from "@react-navigation/native";
import { useNavigation, useRoute } from '@react-navigation/native';

const ProfileScreen = () => {
    const navigation = useNavigation()

    // const [phone, setPhone] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    // const [name, setName] = useState('Rohit')
    // const [lastName, setLastName] = useState('Saini')
    // const [phoneInput, setPhoneInput] = useState<string>("");
    // const [dob, setDob] = useState('20/10/2004')
    // const [email, setEmail] = useState('rahit@gmail.com')
    const [profileData, setProfileData] = useState({})
    const [input, setInput] = useState({
        name: '',
        lastName: '',
        phoneInput: '',
        dob: "",
        email: ''
    })

    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState({});
    const [userProfileId, setUserProfileId] = useState('');


    const handlePhoneChange = (text: string) => {
        const digitsOnly = text.replace(/\D/g, '');

        // let formatted = digitsOnly;
        // if (digitsOnly.length > 5) {
        //     formatted = `${digitsOnly.slice(0, 5)}-${digitsOnly.slice(5, 10)}`;
        // }
        // setInput((...pre,{ input: digitsOnly}));
        setInput(prev => ({ ...prev, phoneInput: digitsOnly }));
        if (errors.phoneInput) {
            setErrors(prev => ({ ...prev, phoneInput: '' }));
        }
    };

    // const handleOtpRequest = () => {
    //     navigation.navigate('OtpRequestScreen', { phoneNumber: phoneInput });
    // }


    const handleFirstNameChange = (text) => {
        setInput(prev => ({ ...prev, name: text }));
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

    const handleDobChange = (text) => {
        setInput(prev => ({ ...prev, dob: text }));
        if (errors.dob) {
            setErrors(prev => ({ ...prev, dob: '' }));
        }
    };

    const handleEmailChange = (text) => {
        setInput(prev => ({ ...prev, email: text }));
        if (errors.email) {
            setErrors(prev => ({ ...prev, email: '' }));
        }
    };
    // const handleOtpRequest = async () => {
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
    //     // if (!selectedRole) {
    //     //     showSnackbar('Please Select Your Role', 'error');
    //     //     return;
    //     // }

    //     setLoading(true);

    //     try {
    //         // Create FormData exactly like Postman
    //            const formData = new FormData();

    //         formData.append('usr_first_name', 'Nidhi');
    //         formData.append('usr_last_name', 'Sharma');
    //         formData.append('usr_phone', '9414359663');
    //         formData.append('usr_role', 'tutor');
    //         formData.append('usr_device_token', 'abc123xyz');

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
    //             console.log('newRes.status', newRes.status === '1')

    //             if (newRes.status === 200) {
    //                 // showSnackbar(newRes?.msg || 'Registration successful!', 'success');
    //                 // reduxStorage.setItem('token', '123456')
    //                 // dispatch(loginSuccess('123456'));
    //                 showSnackbar(newRes?.msg, 'success');
    //                 navigation.navigate('OtpRequestScreen', { 'otpResult': newRes?.result, 'phoneNumber': phoneInput })
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


    const handleGetProfile = async (userId) => {
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('usr_id', userId);
            const response = await fetch('https://www.papers.withupartners.in/api/get-profile', {
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

                if (newRes.status == '1') {
                    // setProfileData(new)
                    console.log('newRes.statusss', newRes.result)
                    setProfileData(newRes.result)
                    // showSnackbar(newRes?.msg || 'Registration successful!', 'success');
                    // reduxStorage.setItem('token', '123456')
                    // dispatch(loginSuccess('123456'));
                    // showSnackbar(newRes?.msg, 'success');
                    // navigation.navigate('OtpRequestScreen', { 'otpResult': newRes?.result, 'phoneNumber': phoneInput })
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


    useEffect(() => {
        const getData = async () => {
            let getUserId = await localStorage.getItem(storageKeys.userId)
            console.log('dsf', getUserId);
            setUserProfileId(getUserId)
        }
        getData()
    }, [])

    useEffect(() => {
        const getData = async () => {
            if (userProfileId !== '') {
                await handleGetProfile(userProfileId)
            }
        }
        getData()
    }, [userProfileId])

    // Initialize input when profileData is loaded
    useEffect(() => {
        if (profileData && Object.keys(profileData).length > 0) {
            setInput({
                name: profileData?.usr_first_name || '',
                lastName: profileData?.usr_last_name || '',
                phoneInput: profileData?.usr_phone || '',
                dob: profileData?.usr_join_date || '',
                email: profileData?.usr_email || ''
            });
        }
    }, [profileData]); // This runs whenever profileData changes
    // userId

    return (
        <SafeAreaView
            style={styles.mainContainer}
            edges={['left', 'right', 'bottom']} // 🔥 IMPORTANT
        >
            <>
                <Loader visible={loading} />
                {/* <StatusBar barStyle="dark-content" backgroundColor={Colors.primaryColor} /> */}
                <AppHeader title="Paper Fast" discriptionText='Paper Generate In Minute' />
                <View style={styles.innerMainContainer}>
                    <View style={styles.innerSecondMainContainer}>
                        <Text style={styles.loginText}>My Profile</Text>
                        <Text style={styles.subHeading}>Update your personal details</Text>

                        <View style={{ marginTop: moderateScale(4) }}>
                            <AppTextInput placeHolderText={'Enter Name'} value={input?.name} onChangeText={handleFirstNameChange} containerStyle={{ marginBottom: moderateScale(15) }} />
                            <AppTextInput placeHolderText={'Enter Last'} value={input?.lastName} onChangeText={handleLastNameChange} />

                            <View style={styles.phoneInputBox}>
                                <Image source={Icons.country} style={styles.countryImgStyle} />
                                <View style={{ marginLeft: moderateScale(10), alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                    <View style={{ height: moderateScale(18), width: moderateScale(2), backgroundColor: 'rgba(0, 140, 227, 0.31)', }} />
                                    <Text style={styles.prefix}>{'  '}+91</Text>
                                    <TextInput style={styles.phoneInput} maxLength={11} keyboardType="phone-pad" onChangeText={handlePhoneChange} value={input?.phoneInput} />
                                </View>
                            </View>

                            <AppTextInput placeHolderText={'DD/MM/YY'} value={input?.dob} onChangeText={handleDobChange} containerStyle={{ marginBottom: moderateScale(15) }} />
                            <AppTextInput placeHolderText={'Enter Email'} value={input?.email} onChangeText={handleEmailChange} containerStyle={{ marginBottom: moderateScale(15) }} />
                        </View>
                        <AppButton title="Submit" style={{ paddingHorizontal: moderateScale(133), marginTop: moderateScale(14), }} />
                    </View>
                </View>

            </>
            {/* <Text>dsfasff</Text> */}
        </SafeAreaView>
    )
}

export default ProfileScreen


// <Text style={styles.subHeading}>We’ll send an OTP to verify your number.</Text>
// <TextInput style={styles.phoneInput} maxLength={10} keyboardType="number-pad" onChangeText={setPhoneInput} value={phoneInput} />
// <Text style={styles.prefix}>+91</Text>
// <Text style={styles.supportText}>Support</Text>
// <Text style={styles.supportNumberText}>91{phoneInput}</Text>

