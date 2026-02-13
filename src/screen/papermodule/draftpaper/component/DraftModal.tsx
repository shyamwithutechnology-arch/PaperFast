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
import Snackbar from 'react-native-snackbar';
import { showSnackbar } from '../../../../utils/showsnack';


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
    console.log('questionId', questionId);

    const handleDraftSet = async () => {
        try {

            if (title?.trim() === '' || !title?.trim()) {
                showSnackbar('Please enter title', 'error')
                return
            }
            if (title?.trim().length < 4) {
                showSnackbar('Please lenght then this text to 4 charactors or more', 'error')
                return
            }

            const params = {
                user_id: userId,
                title: title,
                question_id: JSON.stringify(questionId) || [],
                role: userRole
            }
            console.log('para3333', params);

            const response = await POST_FORM(ApiEndPoint.draftAdd, params)
            if (response.status === 200) {
                showToast('success', response?.msg)
                setTitle('')
                onClose()
            }
        } catch (error) {
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
        paddingVertical: moderateScale(16)
    },
    closeBtn: {
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
    cancelBtn: {
        width: scale(90),
        height: verticalScale(42),
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
    }
});