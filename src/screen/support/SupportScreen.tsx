// import React, { useState } from "react";
// import { View, Text, Image, TextInput, Platform, KeyboardAvoidingView, ScrollView, TouchableOpacity } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import AppHeader from "../../component/header/AppHeader";
// import { Icons } from "../../assets/icons";
// import { moderateScale } from "react-native-size-matters";
// import AppButton from "../../component/button/AppButton";
// import { Colors } from "../../theme";
// import Loader from "../../component/loader/Loader";
// import { useNavigation } from '@react-navigation/native';
// import { POST_FORM } from "../../api/request";
// import { ApiEndPoint } from "../../api/endPoints";
// import { styles } from "./styles";
// import { showToast } from '../../utils/toast';
// const SupportScreen = () => {
//     const navigation = useNavigation();
//     const [loading, setLoading] = useState<boolean>(false);
//     const [errors, setErrors] = useState({});
//     const [input, setInput] = useState({
//         subject: '',
//         comment: '',
//     });

//     // Validation function
//     const validateForm = () => {
//         let newErrors = {};

//         // Validate subject
//         if (!input.subject.trim()) {
//             newErrors.subject = 'Subject is required';
//         } else if (input.subject.trim().length < 5) {
//             newErrors.subject = 'Subject must be at least 5 characters';
//         }

//         // Validate comment
//         if (!input.comment.trim()) {
//             newErrors.comment = 'Please provide details for your ticket';
//         } else if (input.comment.trim().length < 10) {
//             newErrors.comment = 'Please provide at least 10 characters';
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubjectChange = (text: string) => {
//         setInput(prev => ({ ...prev, subject: text }));
//         if (errors.subject) {
//             setErrors(prev => ({ ...prev, subject: '' }));
//         }
//     };

//     const handleCommentChange = (text: string) => {
//         setInput(prev => ({ ...prev, comment: text }));
//         if (errors.comment) {
//             setErrors(prev => ({ ...prev, comment: '' }));
//         }
//     };

//     // API call for creating ticket
//     // const handleCreateTicket = async () => {
//     //     // Validate form first
//     //     if (!validateForm()) {
//     //         return;
//     //     }

//     //     setLoading(true);
//     //     try {
//     //         let params = {
//     //             subject: input.subject,
//     //             message: input.comment,
//     //         };

//     //         const response = await POST_FORM(ApiEndPoint.CreateTicket, params);

//     //         if (response && response.status === 200) {
//     //             showToast('success', 'Success', 'Ticket created successfully')
//     //                 navigation.goBack();
//     //             // Clear form
//     //             setInput({
//     //                 subject: '',
//     //                 comment: '',
//     //             });

//     //             // Navigate back after 2 seconds
//     //             setTimeout(() => {
//     //                 navigation.goBack();
//     //             }, 2000);

//     //         } else {
//     //             const errorMessage = response?.msg || 'Failed to create ticket. Please try again.';
//     //             showToast('error', 'Error', errorMessage);
//     //         }

//     //     } catch (error: any) {
//     //         if (error?.offline) {
//     //             return;
//     //         }
//     //         const errorMessage = error?.response?.data?.msg ||
//     //             error?.msg ||
//     //             'Something went wrong. Please try again.';
//     //         showToast('error', 'Error', errorMessage);
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };

//     // For demo/static purposes
//     const handleStaticCreateTicket = () => {
//         if (!validateForm()) {
//             return;
//         }

//         setLoading(true);

//         let time = setTimeout(() => {
//             setLoading(false);
//             showToast('success', 'Success', 'Ticket created successfully');
//             setInput({
//                 subject: '',
//                 comment: '',
//             });

//             setTimeout(() => {
//                 navigation.goBack();
//             }, 2000);

//         }, 1500);
//         return () => clearTimeout(time)
//     };


//     return (
//         <SafeAreaView
//             style={styles.mainContainer}
//             edges={['left', 'right', 'bottom']}>
//             <Loader visible={loading} />
//             <AppHeader
//                 title="Create Ticket"
//                 leftIcon={Icons.arrowLeft}
//                 onBackPress={() => navigation.goBack()}
//                 leftIconStyle={{
//                     width: moderateScale(20),
//                     height: moderateScale(20)
//                 }}
//             />

//             <View style={styles.innerMainContainer}>
//                 <View style={styles.innerSecondMainContainer}>
//                     <KeyboardAvoidingView
//                         style={{ flex: 1 }}
//                         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//                         keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 40}
//                     >
//                         <ScrollView
//                             style={styles.innerSecondMainContainer}
//                             contentContainerStyle={{
//                                 flexGrow: 1,
//                                 paddingBottom: 30
//                             }}
//                             keyboardShouldPersistTaps="handled"
//                             showsVerticalScrollIndicator={true}
//                         >
//                             <Text style={[styles.loginText]}>Create Ticket</Text>
//                             <Text style={styles.subHeading}>Submit your query and we'll get back to you</Text>

//                             <View style={{ marginTop: moderateScale(4) }}>
//                                 {/* Subject Input */}
//                                 <View style={{ marginBottom: moderateScale(3) }}>
//                                     <View style={styles.inputBox}>
//                                         <TextInput
//                                             style={styles.textInput}
//                                             placeholder="Subject"
//                                             placeholderTextColor={Colors.ParagraphAndShortTexts}
//                                             value={input.subject}
//                                             onChangeText={handleSubjectChange}
//                                         />
//                                     </View>
//                                     {errors?.subject && (
//                                         <Text style={styles.errorText}>{errors?.subject}</Text>
//                                     )}
//                                 </View>

//                                 {/* Comment Input - Multiline */}
//                                 <View style={{ marginVertical: moderateScale(14) }}>
//                                     <View style={[styles.inputBox, { height: moderateScale(120) }]}>
//                                         <TextInput
//                                             style={[styles.textInput, {
//                                                 textAlignVertical: 'top',
//                                                 height: moderateScale(110),
//                                             }]}
//                                             placeholder="Comment"
//                                             placeholderTextColor={Colors.ParagraphAndShortTexts}
//                                             value={input.comment}
//                                             onChangeText={handleCommentChange}
//                                             multiline={true}
//                                             numberOfLines={5}
//                                         />
//                                     </View>
//                                     {errors?.comment && (
//                                         <Text style={styles.errorText}>{errors?.comment}</Text>
//                                     )}
//                                 </View>
//                             </View>

//                             <AppButton
//                                 title="Submit"
//                                 style={styles.submitButton}
//                                 onPress={handleStaticCreateTicket}
//                             />

//                             {/* Support Information - Bottom Section */}
//                             {/* <View style={styles.supportContainer}>
//                                 <View style={styles.scrachLine} />

//                                 <View style={styles.supportBox}>
//                                     <Image source={Icons.support} style={styles.supportIcon} />
//                                     <View style={styles.numberTextBox}>
//                                         <Text style={styles.supportText}>Support </Text>
//                                         <Text style={styles.supportNumberText}>+91-87099-52350</Text>
//                                     </View>
//                                 </View>

//                                 Bottom Navigation Icons
//                                 <View style={styles.bottomNavContainer}>
//                                     <View style={styles.mainMaskView}>
//                                         <TouchableOpacity style={styles.navItem}>
//                                             <Image source={Icons.home} style={styles.navIcon} />
//                                             <Text style={styles.navText}>Home</Text>
//                                         </TouchableOpacity>

//                                         <TouchableOpacity style={styles.navItem}>
//                                             <Image source={Icons.profile} style={styles.navIcon} />
//                                             <Text style={styles.navText}>Profile</Text>
//                                         </TouchableOpacity>

//                                         <TouchableOpacity style={styles.navItem}>
//                                             <Image source={Icons.order} style={styles.navIcon} />
//                                             <Text style={styles.navText}>Order</Text>
//                                         </TouchableOpacity>

//                                         <TouchableOpacity style={styles.navItem}>
//                                             <Image source={Icons.notification} style={styles.navIcon} />
//                                             <Text style={styles.navText}>Notification</Text>
//                                         </TouchableOpacity>
//                                     </View>
//                                 </View>
//                             </View> */}
//                             <View style={styles.mainMaskView}>
//                                 <Image source={Icons.MaskGroup} style={styles.maskGroupImag} />

//                                 <View style={{}}>
//                                     <View style={[styles.supportBox, { marginHorizontal: moderateScale(0) }]}>
//                                         <View style={styles.scrachLine} />
//                                         <View style={[styles.supportBox, { flexDirection: 'column', alignItems: 'flex-start' }]}>
//                                             <Text style={styles.supportText}>Support</Text>
//                                             <View style={styles.numberTextBox} >
//                                                 <Image source={Icons.plus} style={styles.plusImg} />
//                                                 <Text style={styles.supportNumberText}>91 9510779200</Text>
//                                             </View>
//                                         </View>
//                                     </View>
//                                 </View>
//                             </View>
//                         </ScrollView>
//                     </KeyboardAvoidingView>
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// };

// export default SupportScreen;


import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, StatusBar, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { Colors } from '../../theme';
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
    const [dropDownValue, setDropDownValue] = useState<string | null>(null);
    console.log('dropDownValue', dropDownValue);

    const handleCommentChange = (text) => {
        setComment(text);
        // if (errors.comment) {
        //     setErrors(prev => ({ ...prev, comment: '' }));
        // }
    };
    const handleBack = () => {
        navigation.goBack()
    }
    const data = [
        { label: 'Order Related Issue', value: 'Order Related Issue' },
        { label: 'Order Related Issue', value: 'Order Related Issue' },
        { label: 'Order Related Issue', value: 'Order Related Issue' },
        { label: 'Order Related Issue', value: 'Order Related Issue' },
        { label: 'Order Related Issue', value: 'Order Related Issue' },
        { label: 'Order Related Issue', value: 'Order Related Issue' },
    ]


    const handleSupport = async () => {
        try {

            if (!dropDownValue?.trim()) {
                showToast('error', 'Error', 'Please select subject')
                return
            }
            const params = {
                'usr_id': userId,
                'usr_subject': dropDownValue,
                'usr_comment': comment
            }
            console.log('praaaaaaaaa', params);
            
            setLoading(true)
            const response = await POST_FORM(ApiEndPoint.support, params)
            if (response.status === 200 || '1') {
                showToast('success', 'Success', response?.msg || 'Your delete request submitted successfully')
            } else {
                showToast('error', 'Error', 'Your delete request faild')
            }

        } catch (error) {      
            console.log('errrrrrrrr', error);
                  
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
            <SafeAreaView style={{ backgroundColor: Colors.lightThemeBlue}} edges={['top']}>
                <HeaderPaperModule title={'Create Ticket'} leftIconPress={handleBack} />
            </SafeAreaView>
            <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
                <Loader visible={loading} />
                <View style={{ marginBottom: moderateScale(0) }}>
                    <AppDropDown data={data} value={dropDownValue} setValue={setDropDownValue} placeHolderText={'Subject'} />
                </View>

                <View style={{ borderWidth: 1, height: moderateScale(100), marginHorizontal: moderateScale(18), marginVertical: moderateScale(4), paddingLeft: moderateScale(8), borderRadius: moderateScale(4), borderColor: Colors.InputStroke }}>
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

                <AppButton title='Submit' style={{ paddingHorizontal: moderateScale(30), width: '90%', marginTop: moderateScale(30) }} onPress={handleSupport} />
            </SafeAreaView>

        </View>
    )
}

export default SupportScreen
