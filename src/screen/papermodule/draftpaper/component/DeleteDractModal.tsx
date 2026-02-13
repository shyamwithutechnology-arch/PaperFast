import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import CloseIcon from 'react-native-vector-icons/EvilIcons';
import { Colors, Fonts } from '../../../../theme';
import { moderateScale } from 'react-native-size-matters';
import { scale, verticalScale } from '../../../../utils/responsiveSize';
import { useSelector } from 'react-redux';

export type DeleteDractModalProps = {
    activeDraft: boolean,
    onClose: () => void
    deleteFn: () => void
}

const DeleteDractModal = ({ activeDraft, onClose, deleteFn }: DeleteDractModalProps) => {
    console.log('activeDraft, onClose ,questionId', activeDraft, onClose, deleteFn);
    const [loading, setLoading] = useState(false)
    const userRole = useSelector((state: any) => state.userRole?.role);
    console.log('userRoleeee', userRole);

    return (
        <Modal visible={activeDraft} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {/* HEADER */}
                    <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                        <CloseIcon name="close" size={26} color="#555" />
                    </TouchableOpacity>
                    <Text style={styles.enterDraftText}>Delete Draft</Text>
                    <View style={styles.lineBox}/>
                    <Text style={[styles.enterDraftText,{color:'rgba(0,0,0,.4)',marginTop:moderateScale(10)}]}>Do you want to delete this {'\n'} Draft Paper?</Text>
                    <View style={styles.mainBtnBox}>
                        <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.cancelBtn, { backgroundColor: Colors.primaryColor }]} 
                            onPress={deleteFn}>
                            <Text style={[styles.cancelText, { color: Colors.white }]}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default DeleteDractModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.2)',
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
        color: 'rgba(0,0,0,.6)',
        fontFamily: Fonts.InterSemiBold,
        alignSelf: 'center',
        marginBottom: moderateScale(10),
        textAlign:'center'
    },
    cancelBtn: {
        width: scale(120),
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
        marginHorizontal: moderateScale(30),
        marginTop: moderateScale(25)
    },
    cancelText: {
        fontSize: moderateScale(13),
        color: 'rgba(0,0,0,0.4)',
        fontFamily: Fonts.InstrumentSansMedium
    },
    lineBox:{
    height:1.5,
    backgroundColor:'rgba(0,0,0,.1)',
    width:'100%'
    }
});