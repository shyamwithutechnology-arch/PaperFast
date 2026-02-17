import React, { lazy, useCallback, useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    Platform,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Pressable
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from "./styles";
import AppHeader from "../../component/header/AppHeader";
import { Icons } from "../../assets/icons";
import { moderateScale } from "react-native-size-matters";
import AppButton from "../../component/button/AppButton";
import { Colors, Fonts } from "../../theme";
import AppTextInput from "../../component/apptextinput/AppTextInput";
import Loader from "../../component/loader/Loader";
import { localStorage, storageKeys } from "../../storage/storage";
import { useFocusEffect, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { showToast } from "../../utils/toast";
import { POST_FORM } from "../../api/request";
import { ApiEndPoint } from "../../api/endPoints";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../../redux/slices/userRole";
import { removeSelectedSubId } from "../../redux/slices/selectedSubSlice";

const ProfileScreen = () => {
    const navigation = useNavigation()
    const [phone, setPhone] = useState<string>("");
    const [profileData, setProfileData] = useState({})
    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const dispatch = useDispatch()
    const userRole = useSelector((state: any) => state.userRole?.role);
    const [selectRole, setSelectRole] = React.useState<'Teacher' | 'Student'>(userRole === 'tutor' ? 'Teacher' : 'Student');
    const [userId, setUserId] = useState<number | string>('');
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        phoneInput: '',
        dob: "",
        email: ''
    })

    console.log('profileData', profileData);

    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState({});
    const [userProfileId, setUserProfileId] = useState('');
    const timeoutRef = useRef(null);
    const isfocus = useIsFocused()

    const handlePhoneChange = (text: string) => {
        const digitsOnly = text.replace(/\D/g, '');
        setInput(prev => ({ ...prev, phoneInput: digitsOnly }));
        if (errors.phoneInput) {
            setErrors(prev => ({ ...prev, phoneInput: '' }));
        }
    };

    // Format date for display
    const formatDateToDDMMYY = (date) => {
        if (!date) return 'Select Date';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
    };

    // Format date for API (YYYY-MM-DD)
    const formatDateForAPI = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Handle date change from DateTimePicker
    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false); // Hide picker on both platforms

        if (selectedDate) {
            setDate(selectedDate);
            // Update input.dob with formatted date for display
            setInput(prev => ({
                ...prev,
                dob: formatDateToDDMMYY(selectedDate)
            }));

            // Also update profileData if needed
            if (profileData) {
                setProfileData(prev => ({
                    ...prev,
                    usr_dob: formatDateForAPI(selectedDate)
                }));
            }
        }
    };

    const handleProfileRequest = async () => {
        setErrors({});

        const validateForm = (name) => {
            const errors = {};
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // First Name validation
            if (!name?.firstName || name?.firstName.trim() === '') {
                errors.firstName = 'Please Enter First Name';
            } else if (name?.firstName.trim().length < 2) {
                errors.firstName = 'First Name must be at least 2 characters';
            } else if (name?.firstName.trim().length > 50) {
                errors.firstName = 'First Name cannot exceed 50 characters';
            }

            // Last Name validation
            if (!name?.lastName || name?.lastName.trim() === '') {
                errors.lastName = 'Please Enter Last Name';
            } else if (name?.lastName.trim().length < 2) {
                errors.lastName = 'Last Name must be at least 2 characters';
            } else if (name?.lastName.trim().length > 50) {
                errors.lastName = 'Last Name cannot exceed 50 characters';
            }

            // Email validation
            if (!name?.email || name?.email.trim() === '') {
                errors.email = 'Please Enter Email';
            } else if (!emailRegex.test(name?.email.trim())) {
                errors.email = 'Please Enter a Valid Email Address';
            } else if (name?.email.trim().length > 100) {
                errors.email = 'Email cannot exceed 100 characters';
            }

            return errors;
        };

        const validationErrors = validateForm(input);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            showToast('error', 'Error', 'Please fill all required fields');
            return;
        }
        setLoading(true);

        try {
            const params = {
                'usr_id': userProfileId,
                'usr_first_name': input?.firstName,
                'usr_last_name': input?.lastName,
                'usr_role': profileData?.usr_role,
                'usr_gender': profileData?.usr_gender,
                'usr_dob': formatDateForAPI(date),
                'usr_email': input?.email
            }

            const response = await POST_FORM(ApiEndPoint?.UpdateProfile, params);
            if (response?.status === 200) {
                showToast('success', 'Success', response?.msg || 'Profile Update Successfully')
                setProfileData(response.result);
            } else {
                showToast('error', 'Error', response?.msg || 'Profile Update faild')
                setProfileData([]);
            }
        } catch (error) {
            if (error.offline) {
                return
            }
            showToast('error', 'Error', error?.msg || 'Something went wrong')
        } finally {
            setLoading(false);
        }
    };

    const handleGetProfile = async (userId) => {
        setLoading(true);
        try {
            const params = {
                'usr_id': userId
            }
            const response = await POST_FORM(ApiEndPoint?.GetProfile, params);
            if (response?.status === 200) {
                setProfileData(response.result);
                if (response.result?.usr_dob) {
                    const dateFromApi = new Date(response?.result?.usr_dob);
                    if (!isNaN(dateFromApi.getTime())) {
                        setDate(dateFromApi);
                    }
                }
            } else {
                showToast('error', 'Error', response?.msg || 'Profile not found');
            }

        } catch (error) {
            if (error.offline) {
                return
            }
            showToast('error', 'Error', 'Something went wrong')
        } finally {
            setLoading(false);
        }
    };

    const handleChangeRole = async (role: string) => {
        setLoading(true);
        try {
            let params = {
                usr_id: userProfileId,
                usr_role: role === 'Student' ? 'student' : 'tutor'
            }
            const response = await POST_FORM(ApiEndPoint.updateRole, params);
            if (response && response.status === 200) {
                showToast('success', 'Success', response?.msg || 'Role Update Successfully')
                await localStorage.setItem(storageKeys.userId, String(response?.result?.usr_id))
                await localStorage.setItem(storageKeys.selectedSubId, '')
                dispatch(setRole(response?.result?.usr_role))
                dispatch(removeSelectedSubId())
            } else {
                const errorMessage = response?.msg;
                showToast('error', "Error", errorMessage);
            }
        } catch (error: any) {
            if (error?.offline) {
                return;
            }
            const errorMessage = error?.response?.data?.msg ||
                error?.msg ||
                'Something went wrong. Please try again.';
            showToast('error', "Error", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const changeRole = async (role: string) => {
        await handleChangeRole(role)
        setSelectRole(role)
    }

    const handleFirstNameChange = (text) => {
        setInput(prev => ({ ...prev, firstName: text }));
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

    const handleEmailChange = (text) => {
        setInput(prev => ({ ...prev, email: text }));
        if (errors.email) {
            setErrors(prev => ({ ...prev, email: '' }));
        }
    };

    // const handleRoleChange = (role) => {
    //     setSelectRole(role)
    // }
    // Platform-specific date picker styles
    const getDatePickerDisplay = () => {
        if (Platform.OS === 'ios') {
            return 'spinner';
        } else if (Platform.OS === 'android') {
            return 'default';
        }
        return 'default';
    };

    useEffect(() => {
        const getData = async () => {
            let getUserId = await localStorage.getItem(storageKeys.userId)
            console.log('dsf', getUserId);
            setUserProfileId(getUserId)
        }
        getData()
    }, [])


    useFocusEffect(
        useCallback(() => {
            if (userProfileId) {
                handleGetProfile(userProfileId);
            }
        }, [userProfileId])
    );


    // Initialize input when profileData is loaded
    useEffect(() => {
        if (profileData && Object.keys(profileData).length > 0) {
            setInput({
                firstName: profileData?.usr_first_name || '',
                lastName: profileData?.usr_last_name || '',
                phoneInput: profileData?.usr_phone || '',
                dob: profileData?.usr_dob ? formatDateToDDMMYY(new Date(profileData.usr_dob)) : '',
                email: profileData?.usr_email || ''
            });
        }
    }, [profileData]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <SafeAreaView
            style={styles.mainContainer}
            edges={['left', 'right', 'bottom']}>
            <Loader visible={loading} />
            <AppHeader
                title="Paper Fast"
                discriptionText='Paper Generate In Minute'
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
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 130}
                    >
                        <ScrollView
                            style={styles.innerSecondMainContainer}
                            contentContainerStyle={{
                                flexGrow: 1,
                                paddingBottom: 30
                            }}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={true}>
                            <Text style={styles.loginText}>My Profile</Text>
                            <Text style={styles.subHeading}>Update your personal details</Text>
                            <View style={{ marginTop: moderateScale(4) }}>
                                <View style={{ marginBottom: moderateScale(15) }}>
                                    <AppTextInput
                                        placeHolderText={'Enter Name'}
                                        value={input?.firstName}
                                        onChangeText={handleFirstNameChange}
                                        containerStyle={{}} />
                                    {errors?.firstName && (
                                        <Text style={{
                                            fontSize: moderateScale(12),
                                            color: Colors.red,
                                            fontFamily: Fonts.InterMedium,
                                            marginLeft: moderateScale(20)
                                        }}>
                                            {errors?.firstName}
                                        </Text>
                                    )}
                                </View>

                                <View>
                                    <AppTextInput
                                        placeHolderText={'Enter Last'}
                                        value={input?.lastName}
                                        onChangeText={handleLastNameChange}
                                    />
                                    {errors?.lastName && (
                                        <Text style={{
                                            fontSize: moderateScale(12),
                                            color: Colors.red,
                                            fontFamily: Fonts.InterMedium,
                                            marginLeft: moderateScale(20)
                                        }}>
                                            {errors?.lastName}
                                        </Text>
                                    )}
                                </View>

                                <View style={styles.phoneInputBox}>
                                    <Image source={Icons.country} style={styles.countryImgStyle} />
                                    <View style={{
                                        marginLeft: moderateScale(10),
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'row'
                                    }}>
                                        <View style={{
                                            height: moderateScale(18),
                                            width: moderateScale(2),
                                            backgroundColor: 'rgba(0, 140, 227, 0.31)'
                                        }} />
                                        <Text style={styles.prefix}>{'  '}+91</Text>
                                        <TextInput
                                            style={styles.phoneInput}
                                            editable={false}
                                            maxLength={10}
                                            keyboardType="phone-pad"
                                            onChangeText={handlePhoneChange}
                                            value={input?.phoneInput}
                                        />
                                    </View>
                                </View>

                                {/* Date Picker Touchable */}
                                <TouchableOpacity
                                    style={{
                                        paddingHorizontal: moderateScale(12),
                                        paddingVertical: moderateScale(15),
                                        borderWidth: 1,
                                        marginHorizontal: moderateScale(17),
                                        borderRadius: moderateScale(4),
                                        borderColor: Colors.InputStroke,
                                        marginTop: moderateScale(2),
                                        marginBottom: moderateScale(15)
                                    }}
                                    onPress={() => setShowDatePicker(true)}
                                >
                                    <Text>{formatDateToDDMMYY(date)}</Text>
                                </TouchableOpacity>

                                {/* Date Picker Component */}
                                {showDatePicker && (
                                    <DateTimePicker
                                        value={date}
                                        mode="date"
                                        display={getDatePickerDisplay()}
                                        onChange={handleDateChange}
                                        maximumDate={new Date()}
                                        style={Platform.OS === 'ios' ? {
                                            backgroundColor: '#FFFFFF',
                                            height: 200
                                        } : {}}
                                        // Android specific props
                                        textColor="#333333"
                                        accentColor="#FF6B6B"
                                        // iOS specific props
                                        themeVariant="light"
                                    />
                                )}

                                <View style={{ marginBottom: moderateScale(15) }}>
                                    <AppTextInput
                                        placeHolderText={'Enter Email'}
                                        keyboardTypeText={'email-address'}
                                        value={input?.email}
                                        onChangeText={handleEmailChange}
                                        containerStyle={{}}
                                    />
                                    {errors?.email && (
                                        <Text style={{
                                            fontSize: moderateScale(12),
                                            color: Colors.red,
                                            fontFamily: Fonts.InterMedium,
                                            marginLeft: moderateScale(20)
                                        }}>
                                            {errors?.email}
                                        </Text>
                                    )}
                                </View>

                                <Text style={styles.selectRoleText}>Select Role</Text>
                                <View style={styles.mainRoleBox}>
                                    <Pressable style={styles.teacherBox} onPress={() => changeRole('Teacher')}>
                                        <View style={styles.redioBtn}>
                                            {selectRole === 'Teacher' &&
                                                <View style={styles.innerBox} />
                                            }
                                        </View>
                                        <Text style={styles.teacherText}>Teacher{selectRole === 'Teacher' && ` (You)`}</Text>
                                    </Pressable>
                                    <Pressable style={styles.teacherBox} onPress={() => changeRole('Student')}>
                                        <View style={styles.redioBtn}>
                                            {selectRole === 'Student' &&
                                                <View style={styles.innerBox} />
                                            }
                                        </View>
                                        <Text style={styles.teacherText}>Student{selectRole === 'Student' && ` (You)`}</Text>
                                    </Pressable>
                                </View>
                            </View>
                            <AppButton
                                title="Submit"
                                style={{
                                    paddingHorizontal: moderateScale(133),
                                    marginTop:moderateScale(40)
                                }}
                                onPress={handleProfileRequest}
                            />
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen
