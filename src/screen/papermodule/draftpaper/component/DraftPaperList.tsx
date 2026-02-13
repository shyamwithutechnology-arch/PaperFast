import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from '../../../../utils/responsiveSize';
import { Colors, Fonts } from '../../../../theme';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { localStorage, storageKeys } from '../../../../storage/storage';
import { GET, POST_FORM } from '../../../../api/request';
import { ApiEndPoint } from '../../../../api/endPoints';
import { showToast } from '../../../../utils/toast';
import Loader from '../../../../component/loader/Loader';
import DeleteDractModal from './DeleteDractModal';

export type DraftPaperListProps = {
}
export type DraftItem = {
    id: string;
    title: string;
    subject: string;
    marks: string;
    lastUpdated: string;
    status?: 'draft' | 'published' | 'archived';
    difficulty?: 'easy' | 'medium' | 'hard';
};
const DraftPaperList = (props: DraftPaperListProps) => {
    const [userId, setUserId] = useState<string | null>('')
    const [draftList, setDraftList] = useState<[]>([])
    const [openDraft, setOpenDraft] = useState<boolean>(false)
    const [dratId, setDratId] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const handleFetchDraftData = async (id: string) => {
        setLoading(true)
        try {
            const params = {
                user_id: id ?? userId,
            }
            setLoading(true)
            const response = await POST_FORM(ApiEndPoint.draftList, params);
            if (response?.status === 200) {
                setDraftList(response?.result || [])
            }
        } catch (error) {
            if (error.offline) {
                return
            }
            const errorMessage = error.msg || 'Something went wrong. Please try again'
            showToast('error', 'Error', errorMessage);
        } finally {
            setLoading(false)
        }
    }


    const handleRemoveDraft = async (id: string) => {
        setLoading(true)
        try {
            const params = {
                user_id: id ?? userId,
            }
            setLoading(true)
            const response = await POST_FORM(ApiEndPoint.draftDelete, params);
            if (response?.status === 200) {
                setDraftList(response?.result || [])
            }
        } catch (error) {
            if (error.offline) {
                return
            }
            const errorMessage = error.msg || 'Something went wrong. Please try again'
            showToast('error', 'Error', errorMessage);
        } finally {
            setLoading(false)
        }
    }
    const handleOpenDraft = (id:string) => {
        setOpenDraft(true)
        setDratId(id)
    }
    const handleCloseDraft = () => {
        setOpenDraft(false)
    }

    const handleRendamItem = ({ item }) => {
        // console.log('rrrrsssss',item );
        return (
            <View style={styles.draftContent}>
                <View>
                    <Text style={styles.myDraftText}>Mydraft</Text>
                    <Text style={styles.myDraftSecText}>{item?.drf_title}</Text>
                    <Text style={styles.decText}>3.0 Marks</Text>
                    <Text style={styles.decText}>Last Updates {item?.drf_created}</Text>
                </View>
                <TouchableOpacity style={styles.deleteBox} onPress={() => handleOpenDraft(item?.drf_id)} >
                    <MaterialIcons name='delete-outline' size={moderateScale(25)} color={'#EA5858'} />
                </TouchableOpacity>
                <DeleteDractModal activeDraft={openDraft} onClose={handleCloseDraft} dratId={dratId}/>
            </View>
        )
    }

    useEffect(() => {
        const getId = async () => {
            let userId = await localStorage.getItem(storageKeys.userId)
            setUserId(userId)
            if (userId) {
                handleFetchDraftData(userId)
            }
        }
        getId()
    }, [])
    console.log('draftList', draftList);

    return (
        <View>
            <Loader visible={loading} />
            <FlatList data={draftList} renderItem={handleRendamItem}
                windowSize={10}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                removeClippedSubviews={true}
                updateCellsBatchingPeriod={50} 
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default DraftPaperList

const styles = StyleSheet.create({
    draftContent: {
        // height:moderateScale()
        paddingVertical: moderateScale(15),
        paddingHorizontal: moderateScale(15),
        borderWidth: 1,
        marginHorizontal: moderateScale(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: Colors.InputStroke,
        marginTop: moderateScale(15),
        borderRadius: moderateScale(4)
    },
    myDraftText: {
        fontSize: moderateScale(12),
        color: Colors.black,
        fontFamily: Fonts.InstrumentSansMedium
    },
    myDraftSecText: {
        fontSize: moderateScale(11),
        color: '#323232',
        fontFamily: Fonts.InterMedium
    },
    decText: {
        fontSize: moderateScale(10),
        color: '#8D8D8D',
        fontFamily: Fonts.InterRegular
    },
    deleteBox: {
        height: moderateScale(35),
        width: moderateScale(35),
        borderRadius: moderateScale(4),
        backgroundColor: '#FFE0E0',
        alignItems: 'center',
        justifyContent: "center"
    }
})