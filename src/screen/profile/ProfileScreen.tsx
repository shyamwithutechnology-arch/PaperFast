import React, { useState } from "react";
import { View, Text, Image, TextInput, Pressable, StatusBar, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import AppHeader from "../../component/header/AppHeader";
import { Icons } from "../../assets/icons";
import { moderateScale } from "react-native-size-matters";
import AppButton from "../../component/button/AppButton";
import { Fonts } from "../../theme";
import AppTextInput from "../../component/apptextinput/AppTextInput";

const ProfileScreen = ({ navigation }) => {
    // const [phone, setPhone] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [phoneInput, setPhoneInput] = useState<string>("");
    const [name, setName] = useState('Rohit')
    const [lastName, setLastName] = useState('Saini')
    const [dob, setDob] = useState('20/10/2004')
    const [email, setEmail] = useState('rahit@gmail.com')

    const handlePhoneChange = (text: string) => {
        const digitsOnly = text.replace(/\D/g, '');

        let formatted = digitsOnly;
        if (digitsOnly.length > 5) {
            formatted = `${digitsOnly.slice(0, 5)}-${digitsOnly.slice(5, 10)}`;
        }
        setPhoneInput(formatted);
    };

    // const handleOtpRequest = () => {
    //     navigation.navigate('OtpRequestScreen', { phoneNumber: phoneInput });
    // }
    return (
        <SafeAreaView
            style={styles.mainContainer}
            edges={['left', 'right', 'bottom']} // 🔥 IMPORTANT
        >
            {/* <StatusBar barStyle="dark-content" backgroundColor={Colors.primaryColor} /> */}
            <AppHeader title="Paper Fast" discriptionText='Paper Generate In Minute' />
            <View style={styles.innerMainContainer}>
                <View style={styles.innerSecondMainContainer}>
                    <Text style={styles.loginText}>My Profile</Text>
                    <Text style={styles.subHeading}>Update your personal details</Text>

                    <View style={{ marginTop: moderateScale(4) }}>
                        <AppTextInput placeHolderText={'Enter Name'} value={name} onChangeText={setName} containerStyle={{ marginBottom: moderateScale(15) }} />
                        <AppTextInput placeHolderText={'Enter Last'} value={lastName} onChangeText={setLastName} />

                        <View style={styles.phoneInputBox}>
                            <Image source={Icons.country} style={styles.countryImgStyle} />
                            <View style={{ marginLeft: moderateScale(10), alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <View style={{ height: moderateScale(18), width: moderateScale(2), backgroundColor: 'rgba(0, 140, 227, 0.31)', }} />
                                <Text style={styles.prefix}>{'  '}+91</Text>
                                <TextInput style={styles.phoneInput} maxLength={11} keyboardType="phone-pad" onChangeText={handlePhoneChange} value={phoneInput} />
                            </View>
                        </View>

                        <AppTextInput placeHolderText={'DD/MM/YY'} value={dob} onChangeText={setDob} containerStyle={{ marginBottom: moderateScale(15) }} />
                        <AppTextInput placeHolderText={'Enter Name'} value={email} onChangeText={setEmail} containerStyle={{ marginBottom: moderateScale(15) }} />
                    </View>
                    <AppButton title="Submit" style={{ paddingHorizontal: moderateScale(133), marginTop: moderateScale(14), }} />
                </View>
            </View>
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

