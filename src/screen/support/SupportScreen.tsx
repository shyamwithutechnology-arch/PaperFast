// import React from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     StatusBar,
//     TouchableOpacity,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Colors, Fonts } from '../../theme';
// import { moderateScale } from '../../utils/responsiveSize';
// import { Icons } from '../../assets/icons';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AppHeader from '../../component/header/AppHeader';
// import HeaderPaperModule from '../../component/headerpapermodule/Headerpapermodule';

// const SupportScreen = () => {
//     const navigation = useNavigation();

//     return (
//         <SafeAreaView style={styles.container}>
//             {/* <AppHeader/> */}
//             <StatusBar barStyle={'dark-content'} backgroundColor={Colors.lightThemeBlue} />

//             {/* <SafeAreaView style={{ backgroundColor: Colors.lightThemeBlue }} edges={['top']}>
//                 <HeaderPaperModule title='Draft Papers' />
//             </SafeAreaView> */}
//             <View style={styles.content}>
//                 {/* Icon */}
//                 {/* <View style={styles.iconContainer}>
//           <Image
//             source={Icons.clockIcon}
//             style={styles.icon}
//             resizeMode="contain"
//           />
//         </View> */}

//                 {/* Title */}
//                 <Text style={styles.title}>Coming Soon!</Text>

//                 {/* Message */}
//                 <Text style={styles.message}>
//                     This feature is currently under development.{'\n'}
//                     We're working hard to bring it to you soon.
//                 </Text>

//                 {/* Back Button */}
//                 <TouchableOpacity
//                     style={styles.backButton}
//                     onPress={() => navigation.goBack()}
//                 >
//                     <Text style={styles.backButtonText}>Go Back</Text>
//                 </TouchableOpacity>
//             </View>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: Colors.white,
//     },
//     content: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingHorizontal: moderateScale(24),
//     },
//     iconContainer: {
//         width: moderateScale(120),
//         height: moderateScale(120),
//         borderRadius: moderateScale(60),
//         backgroundColor: Colors.lightThemeBlue + '20', // 20 = 12% opacity
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: moderateScale(32),
//     },
//     icon: {
//         width: moderateScale(60),
//         height: moderateScale(60),
//         tintColor: Colors.primaryColor,
//     },
//     title: {
//         fontSize: moderateScale(25),
//         fontFamily: Fonts.InterBold,
//         color: Colors.black,
//         textAlign: 'center',
//         marginBottom: moderateScale(16),
//     },
//     message: {
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InterRegular,
//         color: Colors.ParagraphAndShortTexts,
//         textAlign: 'center',
//         lineHeight: moderateScale(24),
//         marginBottom: moderateScale(40),
//     },
//     backButton: {
//         backgroundColor: Colors.primaryColor,
//         paddingHorizontal: moderateScale(25),
//         paddingVertical: moderateScale(10),
//         borderRadius: moderateScale(8),
//     },
//     backButtonText: {
//         fontSize: moderateScale(16),
//         fontFamily: Fonts.InterSemiBold,
//         color: Colors.white,
//     },
// });

// export default SupportScreen;

import React, { useState } from "react";
import { View, Text, Image, TextInput, Platform, KeyboardAvoidingView, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../component/header/AppHeader";
import { Icons } from "../../assets/icons";
import { moderateScale } from "react-native-size-matters";
import AppButton from "../../component/button/AppButton";
import { Colors } from "../../theme";
import Loader from "../../component/loader/Loader";
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { POST_FORM } from "../../api/request";
import { ApiEndPoint } from "../../api/endPoints";
import { styles } from "./styles";
import { showToast } from "../../utils/toast";
const SupportScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        subject: '',
        comment: '',
    });

    // Validation function
    const validateForm = () => {
        let newErrors = {};

        // Validate subject
        if (!input.subject.trim()) {
            newErrors.subject = 'Subject is required';
        } else if (input.subject.trim().length < 5) {
            newErrors.subject = 'Subject must be at least 5 characters';
        }

        // Validate comment
        if (!input.comment.trim()) {
            newErrors.comment = 'Please provide details for your ticket';
        } else if (input.comment.trim().length < 10) {
            newErrors.comment = 'Please provide at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubjectChange = (text: string) => {
        setInput(prev => ({ ...prev, subject: text }));
        if (errors.subject) {
            setErrors(prev => ({ ...prev, subject: '' }));
        }
    };

    const handleCommentChange = (text: string) => {
        setInput(prev => ({ ...prev, comment: text }));
        if (errors.comment) {
            setErrors(prev => ({ ...prev, comment: '' }));
        }
    };

    // API call for creating ticket
    const handleCreateTicket = async () => {
        // Validate form first
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            let params = {
                subject: input.subject,
                message: input.comment,
            };

            const response = await POST_FORM(ApiEndPoint.CreateTicket, params);

            if (response && response.status === 200) {
                showToast('success', 'Success', 'Ticket created successfully')
                    navigation.goBack();
                // Clear form
                setInput({
                    subject: '',
                    comment: '',
                });

                // Navigate back after 2 seconds
                setTimeout(() => {
                    navigation.goBack();
                }, 2000);

            } else {
                const errorMessage = response?.msg || 'Failed to create ticket. Please try again.';
                showToast('error', 'Error', errorMessage);
            }

        } catch (error: any) {
            if (error?.offline) {
                return;
            }
            const errorMessage = error?.response?.data?.msg ||
                error?.msg ||
                'Something went wrong. Please try again.';
            showToast('error', 'Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // For demo/static purposes
    const handleStaticCreateTicket = () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            showToast('success', 'Success', 'Ticket created successfully');

            setInput({
                subject: '',
                comment: '',
            });

            setTimeout(() => {
                navigation.goBack();
            }, 2000);

        }, 1500);
    };

    return (
        <SafeAreaView
            style={styles.mainContainer}
            edges={['left', 'right', 'bottom']}
        >
            <Loader visible={loading} />
            <AppHeader
                title="Create Ticket"
                leftIcon={Icons.arrowLeft}
                onBackPress={() => navigation.goBack()}
                leftIconStyle={{
                    width: moderateScale(20),
                    height: moderateScale(20)
                }}
            />

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
                            <Text style={[styles.loginText]}>Create Ticket</Text>
                            <Text style={styles.subHeading}>Submit your query and we'll get back to you</Text>

                            <View style={{ marginTop: moderateScale(4) }}>
                                {/* Subject Input */}
                                <View style={{ marginBottom: moderateScale(3) }}>
                                    <View style={styles.inputBox}>
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="Subject"
                                            placeholderTextColor={Colors.ParagraphAndShortTexts}
                                            value={input.subject}
                                            onChangeText={handleSubjectChange}
                                        />
                                    </View>
                                    {errors?.subject && (
                                        <Text style={styles.errorText}>{errors?.subject}</Text>
                                    )}
                                </View>

                                {/* Comment Input - Multiline */}
                                <View style={{ marginVertical: moderateScale(14) }}>
                                    <View style={[styles.inputBox, { height: moderateScale(120) }]}>
                                        <TextInput
                                            style={[styles.textInput, {
                                                textAlignVertical: 'top',
                                                height: moderateScale(110),
                                            }]}
                                            placeholder="Comment"
                                            placeholderTextColor={Colors.ParagraphAndShortTexts}
                                            value={input.comment}
                                            onChangeText={handleCommentChange}
                                            multiline={true}
                                            numberOfLines={5}
                                        />
                                    </View>
                                    {errors?.comment && (
                                        <Text style={styles.errorText}>{errors?.comment}</Text>
                                    )}
                                </View>
                            </View>

                            <AppButton
                                title="Submit"
                                style={styles.submitButton}
                                onPress={handleStaticCreateTicket}
                            />

                            {/* Support Information - Bottom Section */}
                            {/* <View style={styles.supportContainer}>
                                <View style={styles.scrachLine} />
                                
                                <View style={styles.supportBox}>
                                    <Image source={Icons.support} style={styles.supportIcon} />
                                    <View style={styles.numberTextBox}>
                                        <Text style={styles.supportText}>Support </Text>
                                        <Text style={styles.supportNumberText}>+91-87099-52350</Text>
                                    </View>
                                </View>

                                Bottom Navigation Icons
                                <View style={styles.bottomNavContainer}>
                                    <View style={styles.mainMaskView}>
                                        <TouchableOpacity style={styles.navItem}>
                                            <Image source={Icons.home} style={styles.navIcon} />
                                            <Text style={styles.navText}>Home</Text>
                                        </TouchableOpacity>
                                        
                                        <TouchableOpacity style={styles.navItem}>
                                            <Image source={Icons.profile} style={styles.navIcon} />
                                            <Text style={styles.navText}>Profile</Text>
                                        </TouchableOpacity>
                                        
                                        <TouchableOpacity style={styles.navItem}>
                                            <Image source={Icons.order} style={styles.navIcon} />
                                            <Text style={styles.navText}>Order</Text>
                                        </TouchableOpacity>
                                        
                                        <TouchableOpacity style={styles.navItem}>
                                            <Image source={Icons.notification} style={styles.navIcon} />
                                            <Text style={styles.navText}>Notification</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View> */}
                            <View style={styles.mainMaskView}>
                                <Image source={Icons.MaskGroup} style={styles.maskGroupImag} />

                                <View style={{}}>
                                    <View style={[styles.supportBox, { marginHorizontal: moderateScale(0) }]}>
                                        <View style={styles.scrachLine} />
                                        <View style={[styles.supportBox, { flexDirection: 'column', alignItems: 'flex-start' }]}>
                                            <Text style={styles.supportText}>Support</Text>
                                            <View style={styles.numberTextBox} >
                                                <Image source={Icons.plus} style={styles.plusImg} />
                                                <Text style={styles.supportNumberText}>913445764523</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </View>
            <Toast />
        </SafeAreaView>
    );
};

export default SupportScreen;