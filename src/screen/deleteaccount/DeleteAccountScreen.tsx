import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, Platform, KeyboardAvoidingView, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import AppHeader from "../../component/header/AppHeader";
import { Icons } from "../../assets/icons";
import { moderateScale } from "react-native-size-matters";
import AppButton from "../../component/button/AppButton";
import { Colors, Fonts } from "../../theme";
import AppTextInput from "../../component/apptextinput/AppTextInput";
import Loader from "../../component/loader/Loader";
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message'; // Import toast
import { POST_FORM } from "../../api/request";
import { ApiEndPoint } from "../../api/endPoints";
import { showToast } from "../../utils/toast";
import { localStorage, storageKeys } from "../../storage/storage";

const DeleteAccountScreen = () => {
    const navigation = useNavigation()
    const [comment, setComment] = useState("")
    const [authData, setAuthData] = useState({ name: '', mobileNumber: '', userId: '' })
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState({
        comment: ''
    })

    const handleCommentChange = (text) => {
        setComment(text);
        if (errors.comment) {
            setErrors(prev => ({ ...prev, comment: '' }));
        }
    };

    const handleBack = () => {
        navigation.goBack()
    }

    const validateForm = () => {
        const error: Record<string, string> = {}
        if (!comment.trim()) {
            error.comment = "Please enter a message"
        }
        return error
    }
    const handleStaticDeleteAccount = async () => {
        try {

            const validationErrors = validateForm();
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
            const params = {
                'usr_id': authData?.userId,
                'usr_name': authData?.name.trim(),
                'usr_phone': authData?.mobileNumber,
                'usr_comment': comment
            }

            setLoading(true)
            const response = await POST_FORM(ApiEndPoint.deleteAccount, params)
            if (response.status === 200 || '1') {
                showToast('success', 'Success', response?.msg || 'Your delete request submitted successfully')
            } else {
                showToast('error', 'Error', 'Your delete request faild')
            }

        } catch (error) {
            console.log('errrrrrrr', error);

            if (error.offline) {
                return true
            }
            const errorMessage = error?.response.data.msg || error.msg || 'Something went wrong. Please try again.';
            showToast('error', 'Error', errorMessage)
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        let authDetils = async () => {
            let name = await localStorage.getItem(storageKeys.userName);
            let mobNumber = await localStorage.getItem(storageKeys.mobileNumber);
            let userId = await localStorage.getItem(storageKeys.userId);
            setAuthData({ name: name ?? '', mobileNumber: mobNumber ?? '', userId: userId ?? '' })
        }
        authDetils()
    }, [])

    return (
        <SafeAreaView
            style={styles.mainContainer}
            edges={['left', 'right', 'bottom']}
        >
            <Loader visible={loading} />
            <AppHeader title="Paper Fast" discriptionText='Paper Generate In Minute' leftIcon={Icons.arrowLeft} onBackPress={handleBack} leftIconStyle={{
                width: moderateScale(20),
                height: moderateScale(20)
            }}
                headerStyle={{
                    marginTop: moderateScale(7.5),
                    borderColor: '#000',
                    // borderWidth: 1
                }}
            />
            <View style={styles.innerMainContainer}>
                <View style={styles.innerSecondMainContainer}>
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 40}>
                        <ScrollView
                            style={styles.innerSecondMainContainer}
                            contentContainerStyle={{
                                flexGrow: 1,
                                paddingBottom: 30
                            }}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={true}>
                            <Text style={styles.loginText}>Delete Your Account</Text>
                            <Text style={styles.subHeading}>Select your role to continue quickly and securely</Text>

                            <View style={{ marginTop: moderateScale(4) }}>
                                <View style={{ marginBottom: moderateScale(3) }}>
                                    <AppTextInput
                                        placeHolderText={'Enter Name'}
                                        value={authData?.name}
                                        editable={false}
                                    />
                                </View>

                                <View style={{
                                    marginVertical: moderateScale(12),
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
                                                onChangeText={() => { }}
                                                value={authData?.mobileNumber}
                                                placeholder="Enter phone number"
                                                editable={false}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={{ borderWidth: 1, height: moderateScale(100), marginHorizontal: moderateScale(18), marginVertical: moderateScale(2.5), paddingLeft: moderateScale(8), borderRadius: moderateScale(4), borderColor: Colors.InputStroke }}>
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
                                {/* {errors?.comment && <Text style={{ fontSize: moderateScale(12), color: Colors.red, marginLeft: moderateScale(20), marginTop: moderateScale(2) }}>{errors?.comment}</Text>} */}
                            </View>
                            {errors?.comment && (
                                <Text style={{
                                    fontSize: moderateScale(12),
                                    color: Colors.red,
                                    fontFamily: Fonts.InterMedium,
                                    marginLeft: moderateScale(17),
                                    marginTop: moderateScale(-3),
                                    marginBottom: moderateScale(8)
                                }}>
                                    {errors?.comment}
                                </Text>
                            )}

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