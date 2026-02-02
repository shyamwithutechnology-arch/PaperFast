import React, { useState } from "react";
import { View, Text, Image, TextInput, Platform, KeyboardAvoidingView, ScrollView } from "react-native";
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
    const formatDateToDDMMYY = (date) => {
        if (!date) return 'Select Date';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
    };

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
    return (
        <SafeAreaView
            style={styles.mainContainer}
            edges={['left', 'right', 'bottom']} // 🔥 IMPORTANT
        >
            {/* <> */}
            <Loader visible={loading} />
            {/* <StatusBar barStyle="dark-content" backgroundColor={Colors.primaryColor} /> */}
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
                                paddingBottom: 30 // Add padding at bottom for better scrolling
                            }}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={true}
                        >
                            <Text style={styles.loginText}>Delete Your Account</Text>
                            <Text style={styles.subHeading}>Select your role to continue quickly and securely</Text>

                            <View style={{ marginTop: moderateScale(4) }}>
                                <View style={{ marginBottom: moderateScale(3) }}>
                                    <AppTextInput placeHolderText={'Enter Name'} value={input?.name} onChangeText={handleFirstNameChange} containerStyle={{}} />
                                    {/* {errors?.firstName && <Text style={{ fontSize: moderateScale(12), color: Colors.red, fontFamily: Fonts.InterMedium, marginLeft: moderateScale(20) }}>{errors?.firstName}</Text>} */}
                                </View>

                                <View style={styles.phoneInputBox}>
                                    <Image source={Icons.country} style={styles.countryImgStyle} />
                                    <View style={{ marginLeft: moderateScale(10), alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                        <View style={{ height: moderateScale(18), width: moderateScale(2), backgroundColor: 'rgba(0, 140, 227, 0.31)', }} />
                                        <Text style={styles.prefix}>{'  '}+91</Text>
                                        <TextInput style={styles.phoneInput} maxLength={10} keyboardType="phone-pad" onChangeText={handlePhoneChange} value={input?.phoneInput} />
                                    </View>
                                </View>
                                <View style={{ borderWidth: 1, height: moderateScale(100), marginHorizontal: moderateScale(18), marginVertical: moderateScale(4), paddingLeft: moderateScale(8), borderRadius: moderateScale(4), borderColor: Colors.InputStroke }}>
                                    <TextInput style={[styles.phoneInput, {
                                        textAlignVertical: 'top',
                                    }]} placeholder="Comment" value={input?.phoneInput} placeholderTextColor={Colors.ParagraphAndShortTexts}
                                        value={comment}
                                        onChangeText={setComment}
                                        multiline={true}
                                    />
                                </View>
                            </View>
                            <AppButton title="Submit" style={{ paddingHorizontal: moderateScale(133), marginTop: moderateScale(20), }} />

                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </View>
            {/* </> */}
            {/* <Text>dsfasff</Text> */}
        </SafeAreaView>
    )
}

export default DeleteAccountScreen
