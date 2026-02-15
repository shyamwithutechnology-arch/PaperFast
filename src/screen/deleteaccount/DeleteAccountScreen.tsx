import React, { useState } from "react";
import { View, Text, Image, TextInput, Platform, KeyboardAvoidingView, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import AppHeader from "../../component/header/AppHeader";
import { Icons } from "../../assets/icons";
import { moderateScale } from "react-native-size-matters";
import AppButton from "../../component/button/AppButton";
import { Colors } from "../../theme";
import AppTextInput from "../../component/apptextinput/AppTextInput";
import Loader from "../../component/loader/Loader";
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message'; // Import toast
import { POST_FORM } from "../../api/request";
import { ApiEndPoint } from "../../api/endPoints";
import { showToast } from "../../utils/toast";

const DeleteAccountScreen = () => {
    const navigation = useNavigation()
    const [phone, setPhone] = useState<string>("");
    const [profileData, setProfileData] = useState({})
    const [comment, setComment] = useState("")
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState({
        name: '',
        lastName: '',
        phoneInput: '',
        dob: "",
        email: ''
    })
    console.log('profileData', profileData);

    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState({});
    const [userProfileId, setUserProfileId] = useState('');

    // Validation function
    const validateForm = () => {
        let newErrors = {};

        // Validate name
        if (!input.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (input.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        // Validate phone
        if (!input.phoneInput.trim()) {
            newErrors.phoneInput = 'Phone number is required';
        } else if (input.phoneInput.length !== 10) {
            newErrors.phoneInput = 'Phone number must be 10 digits';
        } else if (!/^[0-9]{10}$/.test(input.phoneInput)) {
            newErrors.phoneInput = 'Please enter a valid phone number';
        }

        // Validate comment
        if (!comment.trim()) {
            newErrors.comment = 'Please provide a reason for deleting your account';
        } else if (comment.trim().length < 10) {
            newErrors.comment = 'Please provide at least 10 characters for the reason';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePhoneChange = (text: string) => {
        const digitsOnly = text.replace(/\D/g, '');
        setInput(prev => ({ ...prev, phoneInput: digitsOnly }));
        if (errors.phoneInput) {
            setErrors(prev => ({ ...prev, phoneInput: '' }));
        }
    };

    const handleFirstNameChange = (text) => {
        setInput(prev => ({ ...prev, name: text }));
        if (errors.name) {
            setErrors(prev => ({ ...prev, name: '' }));
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

    // Handle comment change
    const handleCommentChange = (text) => {
        setComment(text);
        if (errors.comment) {
            setErrors(prev => ({ ...prev, comment: '' }));
        }
    };

    // API call for deleting account
    // const handleDeleteAccount = async () => {
    //     // Validate form first
    //     if (!validateForm()) {
    //         return;
    //     }

    //     setLoading(true);
    //     try {
    //         let params = {
    //             name: input.name,
    //             phone: input.phoneInput,
    //             reason: comment,
    //             // Add any other parameters your API requires
    //         };

    //         // Make the API call to delete account endpoint
    //         const response = await POST_FORM(ApiEndPoint.DeleteAccount, params); // Make sure you have this endpoint

    //         if (response && response.status === 200) {
    //             // Show success toast message
    //             // Toast.show({
    //             //     type: 'success',
    //             //     text1: 'Success',
    //             //     text2: 'Your account has been deleted successfully',
    //             //     position: 'top',
    //             //     visibilityTime: 4000,
    //             // });
    //             showToast('success', 'Success', 'Your account has been deleted successfully')
    //             setTimeout(() => {
    //                 navigation.goBack();
    //             }, 2000);

    //             // Clear form
    //             setInput({
    //                 name: '',
    //                 lastName: '',
    //                 phoneInput: '',
    //                 dob: "",
    //                 email: ''
    //             });
    //             setComment('');

    //             // Navigate to login or home screen after 2 seconds
    //             // setTimeout(() => {
    //             //     navigation.navigate('Login'); // or whatever your login screen is named
    //             // }, 2000);

    //         } else {
    //             // Show error toast
    //             const errorMessage = response?.msg || 'Failed to delete account. Please try again.';
    //             // Toast.show({
    //             //     type: 'error',
    //             //     text1: 'Error',
    //             //     text2: errorMessage,
    //             //     position: 'top',
    //             //     visibilityTime: 4000,
    //             // });
    //             showToast('error', 'Error', errorMessage)
    //             setTimeout(() => {
    //                 navigation.goBack();
    //             }, 2000);
    //         }

    //     } catch (error: any) {
    //         if (error?.offline) {
    //             return;
    //         }

    //         const errorMessage = error?.response?.data?.msg ||
    //             error?.msg ||
    //             'Something went wrong. Please try again.';
    //         showToast('error', 'Error', errorMessage)

    //         // Toast.show({
    //         //     type: 'error',
    //         //     text1: 'Error',
    //         //     text2: errorMessage,
    //         //     position: 'top',
    //         //     visibilityTime: 4000,
    //         // });
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // For demo/static purposes - use this if you want static response without actual API
    const handleStaticDeleteAccount = () => {
        // Validate form first
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        // Simulate API call
        let timer = setTimeout(() => {
            setLoading(false);

            // Show success toast message
            // Toast.show({
            //     type: 'success',
            //     text1: 'Success',
            //     text2: 'Your account has been deleted successfully',
            //     position: 'top',
            //     visibilityTime: 4000,
            // });
            showToast('success', 'Success', 'Your account has been deleted successfully',)

            // Clear form
            setInput({
                name: '',
                lastName: '',
                phoneInput: '',
                dob: "",
                email: ''
            });
            setComment('');

            // Navigate to login screen after 2 seconds
            setTimeout(() => {
                navigation.goBack()
            }, 2000);

        }, 1500); // Simulate network delay

        return () => clearTimeout(timer)
    };

    return (
        <SafeAreaView
            style={styles.mainContainer}
            edges={['left', 'right', 'bottom']}
        >
            <Loader visible={loading} />
            <AppHeader title="Paper Fast" discriptionText='Paper Generate In Minute' leftIcon={Icons.arrowLeft} onBackPress={() => navigation.goBack()} leftIconStyle={{
                width: moderateScale(20),
                height: moderateScale(20)
            }} />
            <View style={styles.innerMainContainer}>
                <View style={styles.innerSecondMainContainer}>
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 40}
                    >
                        <ScrollView
                            style={styles.innerSecondMainContainer}
                            contentContainerStyle={{
                                flexGrow: 1,
                                paddingBottom: 30
                            }}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={true}
                        >
                            <Text style={styles.loginText}>Delete Your Account</Text>
                            <Text style={styles.subHeading}>Select your role to continue quickly and securely</Text>

                            <View style={{ marginTop: moderateScale(4) }}>
                                <View style={{ marginBottom: moderateScale(3) }}>
                                    <AppTextInput
                                        placeHolderText={'Enter Name'}
                                        value={input?.name}
                                        onChangeText={handleFirstNameChange}
                                        containerStyle={{}}
                                    />
                                    {errors?.name && <Text style={{ fontSize: moderateScale(12), color: Colors.red, marginLeft: moderateScale(20), marginTop: moderateScale(2) }}>{errors?.name}</Text>}
                                </View>

                                <View style={{
                                    marginVertical: moderateScale(14),
                                }}>
                                    <View style={styles.phoneInputBox}>
                                        <Image source={Icons.country} style={styles.countryImgStyle} />
                                        <View style={{ marginLeft: moderateScale(10), alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                            <View style={{ height: moderateScale(18), width: moderateScale(2), backgroundColor: 'rgba(0, 140, 227, 0.31)', }} />
                                            <Text style={styles.prefix}>{'  '}+91</Text>
                                            <TextInput
                                                style={styles.phoneInput}
                                                maxLength={10}
                                                keyboardType="phone-pad"
                                                onChangeText={handlePhoneChange}
                                                value={input?.phoneInput}
                                                placeholder="Enter phone number"
                                            />
                                        </View>
                                    </View>
                                    {errors?.phoneInput && <Text style={{ fontSize: moderateScale(12), color: Colors.red, marginLeft: moderateScale(20), marginTop: moderateScale(2) }}>{errors?.phoneInput}</Text>}
                                </View>
                                <View style={{ borderWidth: 1, height: moderateScale(100), marginHorizontal: moderateScale(18), marginVertical: moderateScale(4), paddingLeft: moderateScale(8), borderRadius: moderateScale(4), borderColor: Colors.InputStroke }}>
                                    <TextInput
                                        style={[styles.phoneInput, {
                                            textAlignVertical: 'top',
                                        }]}
                                        placeholder="Please provide reason for deleting your account"
                                        placeholderTextColor={Colors.ParagraphAndShortTexts}
                                        value={comment}
                                        onChangeText={handleCommentChange}
                                        multiline={true}
                                    />
                                </View>
                                {errors?.comment && <Text style={{ fontSize: moderateScale(12), color: Colors.red, marginLeft: moderateScale(20), marginTop: moderateScale(2) }}>{errors?.comment}</Text>}
                            </View>

                            <AppButton
                                title="Submit"
                                style={{ paddingHorizontal: moderateScale(133), marginTop: moderateScale(20) }}
                                onPress={handleStaticDeleteAccount} // Use handleDeleteAccount for actual API
                            />

                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default DeleteAccountScreen;