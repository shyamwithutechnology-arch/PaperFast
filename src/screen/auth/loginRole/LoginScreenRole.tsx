import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { Colors, Fonts } from '../../../theme';
import AppHeader from '../../../component/header/AppHeader';
import AppButton from '../../../component/button/AppButton';
import AppTextInput from '../../../component/apptextinput/AppTextInput';
import { moderateScale } from '../../../utils/responsiveSize';
import { Icons } from '../../../assets/icons'
import { useDispatch } from "react-redux";
import { loginSuccess } from '../../../redux/slices/authSlice';
import { localStorage, reduxStorage, storageKeys } from '../../../storage/storage';
import Loader from '../../../component/loader/Loader'
import { POST_FORM } from '../../../api/request';
import { ApiEndPoint } from '../../../api/endPoints';
import { showToast } from '../../../utils/toast';

type NameFormData = {
    firstName: string;
    lastName: string
}
type NameFormErrors = Partial<Record<keyof NameFormData, string>>;

const LoginScreenRole = () => {
    const dispatch = useDispatch()
    const [mobileNumber, setMobileNumber] = useState<string | number>('')
    const [input, setInput] = useState<NameFormData>({
        firstName: '',
        lastName: ''
    });
    const [selectedRole, setSelectedRole] = useState('')
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<NameFormErrors>({});

    const handleRoleSelect = (status) => {
        if (status === 'male') {
            setSelectedRole(status)
        } else if (status === 'female') {
            setSelectedRole(status)
        }
    }
    // LoginScreen.tsx
    // const handleLoggedIn = () => {
    //     const token = '1234';
    //     reduxStorage.setItem('token', '123456')
    //     dispatch(loginSuccess(token));
    // };

    const handleLoginVerify = async () => {
        setErrors({});
        const NAME_REGEX = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
        const validateForm = (formData: NameFormData) => {
            const errors: Partial<Record<keyof NameFormData, string>> = {};
            // First Name
            if (!formData?.firstName?.trim()) {
                errors.firstName = 'First name is required';
            } else if (formData.firstName.trim().length < 2) {
                errors.firstName = 'First name must be at least 2 characters';
            } else if (formData.firstName.trim().length > 40) {
                errors.firstName = 'First name must be less than 40 characters';
            } else if (!NAME_REGEX.test(formData.firstName.trim())) {
                errors.firstName = 'First name can contain only letters';
            }

            // Last Name
            if (!formData?.lastName?.trim()) {
                errors.lastName = 'Last name is required';
            } else if (formData.lastName.trim().length < 2) {
                errors.lastName = 'Last name must be at least 2 characters';
            } else if (formData.lastName.trim().length > 40) {
                errors.lastName = 'Last name must be less than 40 characters';
            } else if (!NAME_REGEX.test(formData.lastName.trim())) {
                errors.lastName = 'Last name can contain only letters';
            }
            return errors;
        };

        const validationErrors = validateForm(input);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            showToast('error', 'Error', 'Please fill all required fields.');
            return;
        }

        if (!selectedRole) {
            showToast('error', 'Error', 'Please Select Your Role');
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
                showToast('success', 'Success', 'Registration Successful');
                await localStorage.setItem(storageKeys.userId, String(response?.result?.usr_id))
                await reduxStorage.setItem('token', '1234')
                dispatch(loginSuccess('1234'));
            } else {
                const errorMessage = response?.msg ||
                    'Registration failed. Please try again.';
                showToast('error', 'Error', errorMessage);
            }

        } catch (error: any) {
            if (error?.offline) {
                return;
            }
            const errorMessage = error?.response?.data?.message ||
                error?.message ||
                'Something went wrong. Please try again.';
            showToast('error', 'Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };


    const handleFirstNameChange = (text: string) => {
        setInput(prev => ({ ...prev, firstName: text }));
        if (errors.firstName) {
            setErrors(prev => ({ ...prev, firstName: '' }));
        }
    };

    const handleLastNameChange = (text: string) => {
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