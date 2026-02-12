import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Modal,
    Pressable,
    Image,
    TextInput,
    StyleSheet,
    Alert,
    Platform,
    PermissionsAndroid,
    TouchableOpacity,
} from 'react-native';
import CloseIcon from 'react-native-vector-icons/EvilIcons';
import { Colors, Fonts } from '../../../../theme';
import { moderateScale } from 'react-native-size-matters';
import { scale, verticalScale } from '../../../../utils/responsiveSize';
import { showToast } from '../../../../utils/toast';
import AppTextInput from '../../../../component/apptextinput/AppTextInput';
import { POST_FORM } from '../../../../api/request';
import { ApiEndPoint } from '../../../../api/endPoints';
import { localStorage, storageKeys } from '../../../../storage/storage';
import { useDispatch, useSelector } from 'react-redux';


export type DraftModalProps = {
    activeDraft: boolean,
    onClose: () => void
    questionId: object
}
const DraftModal = ({ activeDraft, onClose, questionId }: DraftModalProps) => {
    console.log('activeDraft, onClose ,questionId', activeDraft, onClose, questionId);
    const [userId, setUserId] = useState<string | null>('')
    const [title, setTitle] = useState<string | null>('')
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const userRole = useSelector((state: any) => state.userRole?.role);
    console.log('userRoleeee', userRole);

    const handleDraftSet = async () => {
        try {

            if (title?.trim() === '' || !title?.trim()) {
                showToast('error', 'Please enter title')
                return
            }
            const params = {
                user_id: userId,
                title: title,
                question_id: questionId || [],
                role: userRole
            }
            console.log('para', params);
            
            const response = await POST_FORM(ApiEndPoint.draftAdd, params)
            if (response.status === 200) {
                showToast('success', response?.msg)
                console.log('rsssssssssssssss', response)
                onClose()
            }
        } catch (error) {
            console.log('errwwwwwwwwww', error)
            if (error?.offline) {
                return;
            }
            const errorMessage = error?.response?.data?.message ||
                error?.message ||
                'Something went wrong. Please try again.';
            showToast('error', 'Error', errorMessage);
        } finally {
            setLoading(false)
        }
    }
    const [description, setDescription] = useState('');
    const handleSubmit = () => {
    };

    useEffect(() => {
        const getId = async () => {
            let userId = await localStorage.getItem(storageKeys.userId)
            setUserId(userId)
        }
        getId()
    })
    return (
        <Modal visible={activeDraft} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>

                    {/* HEADER */}
                    <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                        <CloseIcon name="close" size={26} color="#555" />
                    </TouchableOpacity>
                    <Text style={styles.enterDraftText}>Enter Draft Name</Text>
                    <AppTextInput placeHolderText='Enter Draft name' style={{ with: '100%', }} value={title} onChangeText={setTitle} containerStyle={{ paddingVertical: moderateScale(11) }} />

                    <View style={styles.mainBtnBox} >
                        <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                            <Text style={styles.cancelText}>Cancel </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.cancelBtn, { backgroundColor: Colors.primaryColor }]} onPress={handleDraftSet}>
                            <Text style={[styles.cancelText, { color: Colors.white }]}>Yes </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </Modal>
    );
};

export default DraftModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '94%',
        backgroundColor: Colors.white,
        borderRadius: moderateScale(12),
        // padding: moderateScale(16),
        paddingVertical: moderateScale(16)
        // marginHorizontal:moderateScale(30)
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: moderateScale(18),
        color: Colors.black,
        fontFamily: Fonts.InterRegular
    },

    closeBtn: {
        // borderWidth: 1,
        alignSelf: "flex-end",
        marginRight: moderateScale(15)
    },
    enterDraftText: {
        fontSize: moderateScale(14),
        color: Colors.black,
        fontFamily: Fonts.InterSemiBold,
        alignSelf: 'center',
        marginBottom: moderateScale(10)
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 12,
    },
    label: {
        fontSize: moderateScale(14),
        color: Colors.black,
        fontFamily: Fonts.InterRegular,
        marginBottom: moderateScale(10)
    },
    input: {
        minHeight: scale(80),
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: moderateScale(10),
        textAlignVertical: 'top',
    },
    uploadBox: {
        height: scale(100),
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#bbb',
        borderRadius: moderateScale(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    addIconBox: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#1E88E5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    submitBtn: {
        backgroundColor: Colors.primaryColor,
        marginTop: moderateScale(20),
        paddingVertical: moderateScale(12),
        borderRadius: 8,
        alignItems: 'center',
        width: '75%',
        alignSelf: "center"
    },
    submitText: {
        // color: '#fff',
        // fontWeight: '600',
        // fontSize: 15,
        fontSize: moderateScale(15),
        color: Colors.white,
        fontFamily: Fonts.InterMedium
    },
    cancelBtn: {
        width: scale(90),
        height: verticalScale(42),
        // padding: moderateScale(/16),
        // borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(4),
        backgroundColor: 'rgba(0,0,0,.1)'

    },
    mainBtnBox: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginHorizontal: moderateScale(60),
        marginTop: moderateScale(25)
    },
    cancelText: {
        fontSize: moderateScale(13),
        color: 'rgba(0,0,0,0.4)',
        fontFamily: Fonts.InstrumentSansMedium
    },
    /* PICKER */
    pickerOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    pickerBox: {
        backgroundColor: Colors.white,
        padding: moderateScale(16),
        borderTopLeftRadius: moderateScale(16),
        borderTopRightRadius: moderateScale(16),
    },
    pickerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    pickerText: {
        marginLeft: moderateScale(10),
        fontSize: moderateScale(15),
        color: Colors.black,
        fontFamily: Fonts.InterRegular
    },
});

