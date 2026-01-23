// import React, { useEffect, useRef, useState } from "react";
// import { View, Text, Image, TextInput, Pressable, StatusBar, StyleSheet, Platform, TouchableOpacity, Keyboard, KeyboardAvoidingView, ScrollView } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { styles } from "./styles";
// import AppHeader from "../../component/header/AppHeader";
// import { Icons } from "../../assets/icons";
// import { moderateScale } from "react-native-size-matters";
// import AppButton from "../../component/button/AppButton";
// import { Colors, Fonts } from "../../theme";
// import AppTextInput from "../../component/apptextinput/AppTextInput";
// import { showSnackbar } from "../../utils/snackbar";
// import Loader from "../../component/loader/Loader";
// import { localStorage, storageKeys } from "../../storage/storage";
// // import { useNavigation } from "@react-navigation/native";
// import { useNavigation, useRoute } from '@react-navigation/native';
// import DatePicker from 'react-native-date-picker'


// const ProfileScreen = () => {
//     const navigation = useNavigation()

//     // const [phone, setPhone] = useState<string>("");
//     const [phone, setPhone] = useState<string>("");
//     // const [name, setName] = useState('Rohit')
//     // const [lastName, setLastName] = useState('Saini')
//     // const [phoneInput, setPhoneInput] = useState<string>("");
//     // const [dob, setDob] = useState('20/10/2004')
//     // const [email, setEmail] = useState('rahit@gmail.com')
//     const [profileData, setProfileData] = useState({})
//     const [date, setDate] = useState(new Date())
//     const [open, setOpen] = useState(false)
//     const [input, setInput] = useState({
//         firstName: '',
//         lastName: '',
//         phoneInput: '',
//         dob: "",
//         email: ''
//     })
//     console.log('profileData', profileData);

//     const [loading, setLoading] = useState<boolean>(false);
//     const [errors, setErrors] = useState({});
//     const [userProfileId, setUserProfileId] = useState('');
//     const timeoutRef = useRef(null); // Create a ref for timeout


//     const handlePhoneChange = (text: string) => {
//         const digitsOnly = text.replace(/\D/g, '');

//         // let formatted = digitsOnly;
//         // if (digitsOnly.length > 5) {
//         //     formatted = `${digitsOnly.slice(0, 5)}-${digitsOnly.slice(5, 10)}`;
//         // }
//         // setInput((...pre,{ input: digitsOnly}));
//         setInput(prev => ({ ...prev, phoneInput: digitsOnly }));
//         if (errors.phoneInput) {
//             setErrors(prev => ({ ...prev, phoneInput: '' }));
//         }
//     };

//     // const handleOtpRequest = () => {
//     //     navigation.navigate('OtpRequestScreen', { phoneNumber: phoneInput });
//     // }
//     const formatDateToDDMMYY = (date) => {
//         if (!date) return 'Select Date';
//         const day = String(date.getDate()).padStart(2, '0');
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const year = String(date.getFullYear()).slice(-2);
//         return `${day}/${month}/${year}`;
//     };

//     // const handleProfileRequest = async () => {
//     // setErrors({});

//     // Validate phone number
//     // const validateForm = (name) => {
//     //     // console.log('eeeeeeeeeeeeee', name?.firstName)
//     //     const errors = {};

//     //     if (!name?.firstName || name?.firstName.trim() === '') {
//     //         errors.firstName = 'Pease Enter Fist Name';
//     //     } else if (!name?.lastName || name?.lastName.trim() === '') {
//     //         errors.lastName = 'Please Enter Last Name';
//     //     } else if (name?.phoneInput.trim() === '') {
//     //         errors.phoneInput = 'Please Enter Phone Name';
//     //     } else if (name?.phoneInput.length > 10) {
//     //         errors.phoneInput = 'Please Enter 10 digit number';
//     //     }
//     //     return errors;
//     // };

//     // const validationErrors = validateForm(input);

//     // if (Object.keys(validationErrors).length > 0) {
//     //     setErrors(validationErrors);
//     //     showSnackbar('Please fill all required fields', 'error');
//     //     return;
//     // }
//     //     // if (!selectedRole) {
//     //     //     showSnackbar('Please Select Your Role', 'error');
//     //     //     return;
//     //     // }

//     //     setLoading(true);

//     //     try {
//     //         // Create FormData exactly like Postman
//     //         const formData = new FormData();

//     //         formData.append('usr_id', userProfileId);
//     //         formData.append('usr_first_name', input?.name !== '' ? input?.name : profileData?.usr_first_name);
//     //         formData.append('usr_last_name', input?.lastName !== '' ? input?.lastName : profileData?.usr_last_name);
//     //         formData.append('usr_role', profileData?.usr_role);
//     //         formData.append('usr_gender', profileData?.usr_gender);
//     //         formData.append('usr_dob', profileData?.usr_device_token);

//     //         const response = await fetch('https://www.papers.withupartners.in/api/update-profile', {
//     //             method: 'POST',
//     //             // headers: {
//     //             //     'Accept': 'application/json',
//     //             //     'Cookie': 'ci_session=ee5f5e885a10559417733c3aae4ec3e9cb3587e6'
//     //             // },
//     //             body: formData
//     //         });

//     //         console.log('Response status:rr', response);



//     //         // // Try to parse as JSON
//     //         // let responseData;
//     //         // try {
//     //         //     responseData = JSON.parse(responseText);
//     //         // } catch (e) {
//     //         //     console.log('Response is not JSON:', responseText);
//     //         //     throw new Error('Invalid response format');
//     //         // }

//     //         // console.log('Parsed response:', responseData);

//     //         if (response.ok) {
//     //             // Get response text first to see what's returned
//     //             const newRes = await response.json();
//     //             console.log('newRes:dddddd', newRes);
//     //             //     // Check your API's success condition
//     //             //     if (newRes.status === 200 || responseData.success) {
//     //             //         showSnackbar('Registration successful!', 'success');
//     //             //     } else {
//     //             //         showSnackbar(responseData.message || 'Registration failed', 'error');
//     //             //     }
//     //             // } else {
//     //             //     throw new Error(`HTTP ${response.status}: ${responseData.message || 'Request failed'}`);

//     //             // showSnackbar(newRes?.msg, 'success');
//     //             if (newRes.status === '1') {
//     //                 // console.log('newRes?.msggg', newRes?.msg)
//     //                 showSnackbar(newRes?.msg, 'success');
//     //                 // console.log('newRes.statussss', newRes?.result)
//     //                 // setLoading(false)
//     //                 // reduxStorage.setItem('token', '123456')
//     //                 // dispatch(loginSuccess('123456'));
//     //                 // navigation.navigate('OtpRequestScreen', { 'otpResult': newRes?.result, 'phoneNumber': phoneInput })
//     //             } else {
//     //                 showSnackbar(newRes?.msg || 'OTP Failed', 'error');
//     //             }
//     //         }

//     //     } catch (error) {
//     //         // console.error('API Error:', error);
//     //         if (error.message?.includes('Network')) {
//     //             showSnackbar('No internet connection', 'error');
//     //         } else {
//     //             showSnackbar(error.message, 'error');
//     //         }

//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };

//     const handleProfileRequest = async () => {

//         setErrors({});

//         const validateForm = (name) => {
//             const errors = {};
//             const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//             // First Name validation
//             if (!name?.firstName || name?.firstName.trim() === '') {
//                 errors.firstName = 'Please Enter First Name';
//             } else if (name?.firstName.trim().length < 2) {
//                 errors.firstName = 'First Name must be at least 2 characters';
//             } else if (name?.firstName.trim().length > 50) {
//                 errors.firstName = 'First Name cannot exceed 50 characters';
//             }

//             // Last Name validation
//             if (!name?.lastName || name?.lastName.trim() === '') {
//                 errors.lastName = 'Please Enter Last Name';
//             } else if (name?.lastName.trim().length < 2) {
//                 errors.lastName = 'Last Name must be at least 2 characters';
//             } else if (name?.lastName.trim().length > 50) {
//                 errors.lastName = 'Last Name cannot exceed 50 characters';
//             }

//             // Email validation
//             if (!name?.email || name?.email.trim() === '') {
//                 errors.email = 'Please Enter Email';
//             } else if (!emailRegex.test(name?.email.trim())) {
//                 errors.email = 'Please Enter a Valid Email Address';
//             } else if (name?.email.trim().length > 100) {
//                 errors.email = 'Email cannot exceed 100 characters';
//             }

//             // Optional: Phone validation (if you have phone field)
//             // if (name?.phoneInput) {
//             //     const phone = name.phoneInput.trim();
//             //     if (phone && phone.length !== 10) {
//             //         errors.phoneInput = 'Please Enter a Valid 10-digit Phone Number';
//             //     } else if (phone && !/^\d+$/.test(phone)) {
//             //         errors.phoneInput = 'Phone number must contain only digits';
//             //     }
//             // }

//             return errors;
//         };
//         const validationErrors = validateForm(input);

//         if (Object.keys(validationErrors).length > 0) {
//             setErrors(validationErrors);
//             showSnackbar('Please fill all required fields', 'error');
//             return;
//         }
//         setLoading(true);

//         try {
//             const formData = new FormData();
//             formData.append('usr_id', userProfileId);
//             formData.append('usr_first_name', input?.firstName);
//             formData.append('usr_last_name', input?.lastName);
//             formData.append('usr_role', profileData?.usr_role);
//             formData.append('usr_gender', profileData?.usr_gender);
//             formData.append('usr_dob', profileData?.usr_device_token);
//             formData.append('usr_email', input?.email);

//             const response = await fetch('https://www.papers.withupartners.in/api/update-profile', {
//                 method: 'POST',
//                 body: formData
//             });

//             console.log('Response status:', response.status);

//             // Check if response is OK
//             if (!response.ok) {
//                 throw new Error(`HTTP ${response.status}: Request failed`);
//             }

//             const responseText = await response.text();
//             console.log('Raw response:', responseText);

//             let newRes;
//             try {
//                 newRes = JSON.parse(responseText);
//             } catch (parseError) {
//                 console.error('JSON parse error:', parseError);
//                 showSnackbar('Invalid server response', 'error');
//                 return;
//             }

//             console.log('Parsed response:ddd', newRes);

//             // Show snackbar based on status
//             if (newRes.status === 200) {
//                 console.log('✅ SUCCESS - Showing snackbar');
//                 if (timeoutRef.current) {
//                     clearTimeout(timeoutRef.current);
//                 }

//                 setLoading(false); // Hide loader first

//                 // Set a new timeout for snackbar
//                 timeoutRef.current = setTimeout(() => {
//                     showSnackbar(newRes?.msg, 'success');
//                     timeoutRef.current = null; // Clear the ref after execution
//                 }, 1000); // Small delay
//                 // Optional: Update your state with new data
//                 if (newRes.result) {
//                     console.log('ssssssssssssssss', newRes.result);
//                     setProfileData(newRes.result);
//                 }
//             } else {
//                 setLoading(false);
//                 console.log('❌ ERROR - Showing snackbar');
//                 showSnackbar(newRes?.msg || 'Update failed', 'error');
//             }

//         } catch (error) {
//             setLoading(false);
//             console.error('Catch block error:', error);
//             showSnackbar(
//                 error.message?.includes('Network')
//                     ? 'No internet connection'
//                     : 'Something went wrong',
//                 'error'
//             );
//         } finally {
//             setLoading(false);
//         }
//     };
    
//     const handleGetProfile = async (userId) => {
//         setLoading(true);
//         try {
//             const formData = new FormData();
//             formData.append('usr_id', userId);
//             const response = await fetch('https://www.papers.withupartners.in/api/get-profile', {
//                 method: 'POST',
//                 // headers: {
//                 //     'Accept': 'application/json',
//                 //     'Cookie': 'ci_session=ee5f5e885a10559417733c3aae4ec3e9cb3587e6'
//                 // },
//                 body: formData
//             });

//             console.log('Response status:rr', response);

//             // Get response text first to see what's returned
//             const newRes = await response.json();
//             console.log('newRes:', newRes);

//             // // Try to parse as JSON
//             // let responseData;
//             // try {
//             //     responseData = JSON.parse(responseText);
//             // } catch (e) {
//             //     console.log('Response is not JSON:', responseText);
//             //     throw new Error('Invalid response format');
//             // }

//             // console.log('Parsed response:', responseData);

//             if (response.ok) {
//                 //     // Check your API's success condition
//                 //     if (newRes.status === 200 || responseData.success) {
//                 //         showSnackbar('Registration successful!', 'success');
//                 //     } else {
//                 //         showSnackbar(responseData.message || 'Registration failed', 'error');
//                 //     }
//                 // } else {
//                 //     throw new Error(`HTTP ${response.status}: ${responseData.message || 'Request failed'}`);

//                 if (newRes.status === 200) {
//                     // setProfileData(new)
//                     console.log('newRes.statusss', newRes.result)
//                     setProfileData(newRes.result)
//                     // showSnackbar(newRes?.msg || 'Registration successful!', 'success');
//                     // reduxStorage.setItem('token', '123456')
//                     // dispatch(loginSuccess('123456'));
//                     // showSnackbar(newRes?.msg, 'success');
//                     // navigation.navigate('OtpRequestScreen', { 'otpResult': newRes?.result, 'phoneNumber': phoneInput })
//                 } else {
//                     showSnackbar(newRes?.msg || 'OTP Failed', 'error');
//                 }
//             }

//         } catch (error) {
//             // console.error('API Error:', error);
//             if (error.message?.includes('Network')) {
//                 showSnackbar('No internet connection', 'error');
//             } else {
//                 showSnackbar(error.message, 'error');
//             }

//         } finally {
//             setLoading(false);
//         }
//     };


//     const handleFirstNameChange = (text) => {
//         setInput(prev => ({ ...prev, firstName: text }));
//         if (errors.firstName) {
//             setErrors(prev => ({ ...prev, firstName: '' }));
//         }

//     };

//     const handleLastNameChange = (text) => {
//         setInput(prev => ({ ...prev, lastName: text }));
//         if (errors.lastName) {
//             setErrors(prev => ({ ...prev, lastName: '' }));
//         }
//     };

//     // const handleDobChange = (text) => {
//     //     setInput(prev => ({ ...prev, dob: text }));
//     //     if (errors.dob) {
//     //         setErrors(prev => ({ ...prev, dob: '' }));
//     //     }
//     // };

//     const handleEmailChange = (text) => {
//         setInput(prev => ({ ...prev, email: text }));
//         if (errors.email) {
//             setErrors(prev => ({ ...prev, email: '' }));
//         }
//     };

//     useEffect(() => {
//         const getData = async () => {
//             let getUserId = await localStorage.getItem(storageKeys.userId)
//             console.log('dsf', getUserId);
//             setUserProfileId(getUserId)
//         }
//         getData()
//     }, [])

//     useEffect(() => {
//         const getData = async () => {
//             if (userProfileId !== '') {
//                 await handleGetProfile(userProfileId)
//             }
//         }
//         getData()
//     }, [userProfileId])

//     console.log('userProfileId', userProfileId);

//     // Initialize input when profileData is loaded
//     useEffect(() => {
//         if (profileData && Object.keys(profileData).length > 0) {
//             setInput({
//                 firstName: profileData?.usr_first_name || '',
//                 lastName: profileData?.usr_last_name || '',
//                 phoneInput: profileData?.usr_phone || '',
//                 dob: profileData?.usr_join_date || '',
//                 email: profileData?.usr_email || ''
//             });
//         }
//     }, [profileData]); // This runs whenever profileData changes
//     // userId
//     console.log('profileDataaaa', profileData);

//     useEffect(() => {
//         return () => {
//             if (timeoutRef.current) {
//                 clearTimeout(timeoutRef.current);
//             }
//         };
//     }, []);

//     return (
//         <SafeAreaView
//             style={styles.mainContainer}
//             edges={['left', 'right', 'bottom']} // 🔥 IMPORTANT
//         >
//             {/* <> */}
//             <Loader visible={loading} />
//             {/* <StatusBar barStyle="dark-content" backgroundColor={Colors.primaryColor} /> */}
//             <AppHeader title="Paper Fast" discriptionText='Paper Generate In Minute' leftIcon={Icons.arrowLeft} onBackPress={() => navigation.goBack()} leftIconStyle={{   width: moderateScale(20),
//                   height: moderateScale(20)}}/>
//             <View style={styles.innerMainContainer}>
//                 <View style={styles.innerSecondMainContainer}>
//                     <KeyboardAvoidingView
//                         style={{ flex: 1 }}
//                         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//                         keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 130}
//                     >
//                         <ScrollView
//                             style={styles.innerSecondMainContainer}
//                             contentContainerStyle={{
//                                 flexGrow: 1,
//                                 paddingBottom: 30 // Add padding at bottom for better scrolling
//                             }}
//                             keyboardShouldPersistTaps="handled"
//                             showsVerticalScrollIndicator={true}>
//                             <Text style={styles.loginText}>My Profile</Text>
//                             <Text style={styles.subHeading}>Update your personal details</Text>
//                             <View style={{ marginTop: moderateScale(4) }}>
//                                 <View style={{ marginBottom: moderateScale(15) }}>
//                                     <AppTextInput placeHolderText={'Enter Name'} value={input?.firstName} onChangeText={handleFirstNameChange} containerStyle={{}} />
//                                     {errors?.firstName && <Text style={{ fontSize: moderateScale(12), color: Colors.red, fontFamily: Fonts.InterMedium, marginLeft: moderateScale(20) }}>{errors?.firstName}</Text>}
//                                 </View>
//                                 <View>
//                                     <AppTextInput placeHolderText={'Enter Last'} value={input?.lastName} onChangeText={handleLastNameChange} />
//                                     {errors?.lastName && <Text style={{ fontSize: moderateScale(12), color: Colors.red, fontFamily: Fonts.InterMedium, marginLeft: moderateScale(20) }}>{errors?.lastName}</Text>}
//                                 </View>
//                                 <View style={styles.phoneInputBox}>
//                                     <Image source={Icons.country} style={styles.countryImgStyle} />
//                                     <View style={{ marginLeft: moderateScale(10), alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
//                                         <View style={{ height: moderateScale(18), width: moderateScale(2), backgroundColor: 'rgba(0, 140, 227, 0.31)', }} />
//                                         <Text style={styles.prefix}>{'  '}+91</Text>
//                                         <TextInput style={styles.phoneInput} editable={false} maxLength={10} keyboardType="phone-pad" onChangeText={handlePhoneChange} value={input?.phoneInput} />
//                                     </View>
//                                 </View>

//                                 {/* <AppTextInput placeHolderText={'DD/MM/YY'} value={input?.dob} onChangeText={handleDobChange} containerStyle={{ marginBottom: moderateScale(15) }} /> */}
//                                 <TouchableOpacity
//                                     style={{
//                                         paddingHorizontal: moderateScale(12),
//                                         paddingVertical: moderateScale(15),
//                                         borderWidth: 1,
//                                         marginHorizontal: moderateScale(17),
//                                         borderRadius: moderateScale(4),
//                                         borderColor: Colors.InputStroke,
//                                         marginTop: moderateScale(2),
//                                         marginBottom: moderateScale(15)
//                                     }}
//                                     onPress={() => setOpen(true)}
//                                 >
//                                     <Text>{formatDateToDDMMYY(date)}</Text>
//                                 </TouchableOpacity>
//                                 <View style={{ marginBottom: moderateScale(15) }}>
//                                     <AppTextInput placeHolderText={'Enter Email'} keyboardTypeText={'email-address'} value={input?.email} onChangeText={handleEmailChange} containerStyle={{}} />
//                                     {errors?.email && <Text style={{ fontSize: moderateScale(12), color: Colors.red, fontFamily: Fonts.InterMedium, marginLeft: moderateScale(20) }}>{errors?.email}</Text>}
//                                 </View>
//                             </View>
//                             <AppButton title="Submit" style={{ paddingHorizontal: moderateScale(133), marginTop: moderateScale(14), }} onPress={handleProfileRequest} />

//                             {/* <DatePicker
//                             modal
//                             open={open}
//                             date={date}
//                             onConfirm={(date) => {
//                                 setOpen(false)
//                                 setDate(date)
//                             }}
//                             onCancel={() => {
//                                 setOpen(false)
//                             }}
//                             style={{}}
//                             maximumDate={}
//                         /> */}

//                             <DatePicker
//                                 modal
//                                 open={open}
//                                 date={date}
//                                 mode="date" // Ensure it shows only date (not time)
//                                 onConfirm={(selectedDate) => {
//                                     setOpen(false);
//                                     setDate(selectedDate);
//                                 }}
//                                 onCancel={() => {
//                                     setOpen(false);
//                                 }}
//                                 maximumDate={new Date()} // Only dates up to today
//                                 theme="light" // or "dark" for dark mode

//                                 // Custom colors for all elements
//                                 // theme={{
//                                 //     // Background colors
//                                 //     backgroundColor: '#FFFFFF', // Modal background

//                                 //     // Header colors
//                                 //     headerColor: '#FF6B6B', // Your custom header color
//                                 //     headerTextColor: '#FFFFFF', // Header text color

//                                 //     // Text colors
//                                 //     textColor: '#333333', // Date numbers color
//                                 //     textSecondaryColor: '#999999', // Disabled dates color

//                                 //     // Button colors
//                                 //     buttonTextColor: '#FF6B6B', // Confirm/Cancel button text color
//                                 //     buttonBackgroundColor: '#F5F5F5', // Button background (if supported)

//                                 //     // Border colors
//                                 //     borderColor: '#E0E0E0',

//                                 //     // Android specific
//                                 //     androidButtonColor: '#FF6B6B',
//                                 //     androidButtonTextColor: '#FFFFFF',
//                                 // }}

//                                 // Alternative prop-based coloring (if theme doesn't work)
//                                 textColor="#333333" // Date numbers
//                                 buttonTextColor="#FF6B6B" // Button text
//                                 confirmText="Confirm"
//                                 cancelText="Cancel"

//                                 // Modal styling
//                                 modalProps={{
//                                     overlayStyle: {
//                                         backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay background
//                                     }
//                                 }}
//                             />
//                         </ScrollView>
//                     </KeyboardAvoidingView>
//                 </View>
//             </View>
//             {/* </> */}
//             {/* <Text>dsfasff</Text> */}
//         </SafeAreaView>
//     )
// }

// export default ProfileScreen

import React from 'react';
import { Text, View } from 'react-native';

export type ProfileScreenProps = {
    
    }


const ProfileScreen = (props: ProfileScreenProps) => {
    return (
        <View>
            <Text>ProfileScreen component</Text>
        </View>
    )
}

export default ProfileScreen