import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, StatusBar, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { Colors, Fonts } from '../../theme';
import HeaderPaperModule from '../../component/headerpapermodule/Headerpapermodule';
import AppDropDown from '../../component/dropdown/AppDropDown';
import { DropDownItem } from '../mypdf/pdfdetails/PDFDetailsScreen';
import { moderateScale } from 'react-native-size-matters';
import AppButton from '../../component/button/AppButton';
import { showToast } from '../../utils/toast';
import { POST_FORM } from '../../api/request';
import { ApiEndPoint } from '../../api/endPoints';
import { localStorage, storageKeys } from '../../storage/storage';
import Loader from '../../component/loader/Loader';
import { useNavigation } from '@react-navigation/native';

export type SupportScreenProps = {

}
// let array = data

const SupportScreen = (props: SupportScreenProps) => {
    const navigation = useNavigation()
    const [comment, setComment] = useState("")
    const [userId, setUserId] = useState("")
    const [loading, setLoading] = useState<boolean>(false);
    const [dropDownValue, setDropDownValue] = useState<string | null>('');
    const [errors, setErrors] = useState({
        dropDownValue: '',
        comment: ''
    })
    console.log('errorsssssssssss', errors);


    const handleCommentChange = (text) => {
        setComment(text);
        if (errors.comment) {
            setErrors(prev => ({ ...prev, comment: '' }));
        }
    };
    const handleBack = () => {
        navigation.goBack()
    }
    const data = [
        { label: 'Order Related Issue', value: 'Order Related Issue' },
        { label: 'Payment Related Issue', value: 'Payment Related Issue' },
        { label: 'Account Related Issue', value: 'Account Related Issue' },
        { label: 'Profile Related Issue', value: 'Profile update Issue' },
    ]

    const handleDropdownChange = (value: string | null) => {
        setDropDownValue(value),
            setErrors(pre => ({ ...pre, dropDownValue: '' }))
    }
    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!dropDownValue?.trim()) {
            newErrors.dropDownValue = 'Please select issue type';
        }
        if (!comment.trim()) {
            newErrors.comment = 'Please enter a message';
        }
        return newErrors
    }
    const handleSupport = async () => {
        try {
            const validationErrors = validateForm();
            // if (Object.keys(validationErrors).length > 0) {
            //     setErrors(validationErrors)
            //     return;
            // }
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
            // if (!validationForm) {
            //     return
            // }

            const params = {
                'usr_id': userId,
                'usr_subject': dropDownValue,
                'usr_comment': comment
            }

            setLoading(true)
            const response = await POST_FORM(ApiEndPoint.support, params)
            console.log('response', response);

            if (response.status === 200 || '1') {
                showToast('success', 'Success', response?.msg || 'Your delete request submitted successfully')
            } else {
                showToast('error', 'Error', 'Your delete request faild')
            }

        } catch (error) {
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
            // let name = await localStorage.getItem(storageKeys.userName);
            // let mobNumber = await localStorage.getItem(storageKeys.mobileNumber);
            // setAuthData({ name: name ?? '', mobileNumber: mobNumber ?? '', userId: userId ?? '' })
            let userId = await localStorage.getItem(storageKeys.userId);
            setUserId(userId ?? '')
        }
        authDetils()
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar backgroundColor={Colors.lightThemeBlue} barStyle={'dark-content'} />
            <SafeAreaView style={{ backgroundColor: Colors.lightThemeBlue }} edges={['top']}>
                <HeaderPaperModule title={'Create Ticket'} leftIconPress={handleBack} />
            </SafeAreaView>
            <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
                <Loader visible={loading} />
                <View style={{ marginBottom: moderateScale(0) }}>
                    <AppDropDown data={data} value={dropDownValue} setValue={handleDropdownChange} placeHolderText={'Subject'} />
                    {errors?.dropDownValue && (
                        <Text style={{
                            fontSize: moderateScale(12),
                            color: Colors.red,
                            fontFamily: Fonts.InterMedium,
                            marginLeft: moderateScale(17),
                            marginTop: moderateScale(-14),
                            marginBottom: moderateScale(8)
                        }}>
                            {errors?.dropDownValue}
                        </Text>
                    )}
                </View>

                <View style={{ borderWidth: 1, height: moderateScale(100), marginHorizontal: moderateScale(15.5), marginVertical: moderateScale(4), paddingLeft: moderateScale(8), borderRadius: moderateScale(4), borderColor: Colors.InputStroke }}>
                    <TextInput
                        style={[styles.phoneInput, {
                            textAlignVertical: 'top',
                        }]}
                        placeholder="Comment"
                        placeholderTextColor={Colors.ParagraphAndShortTexts}
                        value={comment}
                        onChangeText={handleCommentChange}
                        multiline={true}
                    />
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

                <AppButton title='Submit' style={{ paddingHorizontal: moderateScale(30), width: '90%', marginTop: moderateScale(30) }} onPress={handleSupport} />
            </SafeAreaView>

        </View>
    )
}

export default SupportScreen
