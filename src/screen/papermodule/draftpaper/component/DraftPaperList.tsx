import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from '../../../../utils/responsiveSize';
import { Colors, Fonts } from '../../../../theme';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { localStorage, storageKeys } from '../../../../storage/storage';
import { GET, POST_FORM } from '../../../../api/request';
import { ApiEndPoint } from '../../../../api/endPoints';
import { showToast } from '../../../../utils/toast';
import Loader from '../../../../component/loader/Loader';
import DeleteDractModal from './DeleteDractModal';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import EmptyComponent from "../../../../component/emptyComponent";
import { Icons } from '../../../../assets/icons';

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
    const isFocused = useIsFocused()
    const navigation = useNavigation()
    const handleFetchDraftData = async (id: string) => {
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

    const handleDraftDelete = async () => {
        try {
            const params = {
                drf_id: dratId,
            }
            setLoading(true)
            const response = await POST_FORM(ApiEndPoint.draftDelete, params)
            if (response.status === 200) {
                showToast('success', response?.msg)
                handleFetchDraftData(userId)
                setOpenDraft(false)
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

    // const handleRemoveDraft = async (id: string) => {
    //     setLoading(true)
    //     try {
    //         const params = {
    //             user_id: id ?? userId,
    //         }
    //         setLoading(true)
    //         const response = await POST_FORM(ApiEndPoint.draftDelete, params);
    //         if (response?.status === 200) {
    //             setDraftList(response?.result || [])
    //         }
    //     } catch (error) {
    //         if (error.offline) {
    //             return
    //         }
    //         const errorMessage = error.msg || 'Something went wrong. Please try again'
    //         showToast('error', 'Error', errorMessage);
    //     } finally {
    //         setLoading(false)
    //     }
    // }
    const handleOpenDraft = (id: string) => {
        setOpenDraft(true)
        setDratId(id)
    }
    const handleCloseDraft = () => {
        setOpenDraft(false)
    }

    const handleRendamItem = ({ item }) => {
        return (
            <Pressable style={styles.draftContent} onPress={() =>
                navigation.navigate('HomeTab', {
                    screen: 'QuestionScreen',
                    params: {  // ⚠️ IMPORTANT: Wrap screen params in 'params' object
                        chapterId: 0,
                        questionId: 'A',
                        questionMarks: 859,
                        label: "M.C.Q",
                        selectedQuestions: item?.drf_question_id.map(id => ({
                            question_id: id.toString()
                        }))
                        // chapterTitle: item?.drf_title || 'Draft',
                    }
                })
            }>
                <View>
                    <Text style={styles.myDraftSecText}>{item?.drf_title}</Text>
                    <Text style={styles.decText}>Last Updates {item?.drf_created}</Text>
                </View>
                {/* <TouchableOpacity style={styles.deleteBox} onPress={() => handleOpenDraft(item?.drf_id)} >
                    <MaterialIcons name='delete-outline' size={moderateScale(25)} color={'#EA5858'} />
                </TouchableOpacity> */}

                <TouchableOpacity style={styles.cancleBox} onPress={() => handleOpenDraft(item?.drf_id)}>
                    <Image
                        source={Icons.cancel}
                        style={styles.cancleIcon}
                        resizeMode="contain"
                        tintColor={'#EA5858'}
                    />
                </TouchableOpacity>
            </Pressable>
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
    }, [isFocused])

    return (
        <View style={{
            flex: 1,
        }}>
            <Loader visible={loading} />
            <FlatList data={draftList} renderItem={handleRendamItem}
                windowSize={5}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                removeClippedSubviews={true}
                updateCellsBatchingPeriod={50}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.containerStyle}
                ListEmptyComponent={EmptyComponent}
            />
            <DeleteDractModal
                activeDraft={openDraft}
                onClose={handleCloseDraft}
                deleteFn={handleDraftDelete} />
        </View>
    )
}

export default DraftPaperList

const styles = StyleSheet.create({
    draftContent: {
        // height:moderateScale()
        // paddingVertical: moderateScale(15),
        // paddingHorizontal: moderateScale(15),
        // borderWidth: 1,
        // marginHorizontal: moderateScale(16),
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // borderColor: Colors.InputStroke,
        // marginTop: moderateScale(15),
        // borderRadius: moderateScale(4),
        // elevation: 40,
        // shadowColor: 'rgba(0, 140, 227, .9)',
        // height:moderateScale()
        paddingVertical: moderateScale(15),
        paddingHorizontal: moderateScale(15),
        // borderWidth: 1,
        marginHorizontal: moderateScale(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderColor: Colors.InputStroke,
        marginTop: moderateScale(15),
        borderRadius: moderateScale(4),
        backgroundColor: Colors.white,
        // elevation: 30,
        shadowColor: 'rgba(0, 140, 227, .9)',
        // Android Shadow
        elevation: 30,
        borderWidth: 1,
        borderColor: 'rgba(0, 140, 227, 0.11)',
        borderTopWidth: .5,
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
    },
    containerStyle: {
        paddingBottom: moderateScale(5),
        paddingHorizontal: moderateScale(0),
    },
    cancleBox: {
        width: moderateScale(30),
        height: moderateScale(30),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: moderateScale(4),
        backgroundColor: '#FFE0E0'
        // borderWidth:1,
        // marginLeft:moderateScale(-40)
        // marginRight:moderateScale(10)
    },

    cancleIcon: {
        width: moderateScale(12),
        height: moderateScale(12),
    },
})