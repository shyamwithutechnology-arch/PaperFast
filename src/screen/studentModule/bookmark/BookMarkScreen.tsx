import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, StatusBar, Alert, Pressable, TouchableOpacity, Image, FlatList } from 'react-native';
import { Colors, Fonts } from '../../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderPaperModule from '../../../component/headerpapermodule/Headerpapermodule';
import { moderateScale } from '../../../utils/responsiveSize';
import { useIsFocused, useNavigation, NavigationProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { POST_FORM } from '../../../api/request';
import { ApiEndPoint } from '../../../api/endPoints';
import { showToast } from '../../../utils/toast';
import { localStorage, storageKeys } from '../../../storage/storage';
import Loader from '../../../component/loader/Loader';
import { Icons } from '../../../assets/icons';
import EmptyComponent from "../../../component/emptyComponent";


export type BookMarkScreenProps = {
}

type RootStackParamList = {
    HomeTab: {
        screen: 'QuestionScreen';
        params: {
            currentIndex: number;
            questions: string;
            // questionMarks: number;
            chapterName: string;
            // selectedQuestions: any[];
        };
    };
};

const BookMarkScreen = (props: BookMarkScreenProps) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const [userId, setUserId] = useState<string | null>('')
    const [draftList, setDraftList] = useState<[]>([])
    console.log('draftList', draftList);

    const [dratId, setDratId] = useState<string | null>(null)
    const handleBack = () => {
        navigation?.goBack()
    }
    const [loading, setLoading] = useState<boolean>(false)
    const isFocused = useIsFocused()
    const userRole = useSelector((state: any) => state.userRole?.role);

    const handleFetchDraftData = async (id: string) => {
        try {
            const params = {
                user_id: id ?? userId,
                role: userRole
            }
            console.log('params', params);

            setLoading(true)
            const response = await POST_FORM(ApiEndPoint.draftList, params);
            // console.log('wwwwwwwwwwwwwwwrr', response);
            if (response?.status === 200) {
                setDraftList(response?.result || [])
            }
        } catch (error) {
            // console.log('weeeeeeeeeeeee', error);
            if (error.offline) {
                return
            }
            const errorMessage = error.msg || 'Something went wrong. Please try again'
            showToast('error', 'Error', errorMessage);
        } finally {
            setLoading(false)
        }
    }
    const handleOpenDraft = (id: string) => {
        setDratId(id)
    }
    const handleRendamItem = ({ item }) => {
        return (
            <Pressable style={styles.draftContent} onPress={() =>
                navigation.navigate('HomeTab', {
                    screen: 'OpenQuestionScreen',
                    params: {
                        questions: item?.drf_question_id || [], 
                        currentIndex: 0,                         
                        chapterName: item?.drf_title || 'Bookmarked Questions'  
                    }
                })
            }>
                <View>
                    <Text style={styles.myDraftSecText}>{item?.drf_title}</Text>
                    <Text style={styles.decText}>Last Updates {item?.drf_created}</Text>
                </View>

                {/* <TouchableOpacity style={styles.cancleBox} onPress={() => handleOpenDraft(item?.drf_id)}>
                    <Image
                        source={Icons.cancel}
                        style={styles.cancleIcon}
                        resizeMode="contain"
                        tintColor={'#EA5858'}
                    />
                </TouchableOpacity> */}
            </Pressable>
        )
    }
    useEffect(() => {
        const getId = async () => {
            let userId = await localStorage?.getItem(storageKeys.userId)
            setUserId(userId)

            if (userId) {
                handleFetchDraftData(userId)
            }
        }
        getId()
    }, [isFocused])
    return (
        <View style={styles.container}>
            <Loader visible={loading} />
            <StatusBar barStyle={'dark-content'} backgroundColor={Colors.lightThemeBlue} />
            <SafeAreaView style={{ backgroundColor: Colors.lightThemeBlue }} edges={['top']}>
                <HeaderPaperModule title="Bookmarks" leftIconPress={handleBack} />
            </SafeAreaView>
            <SafeAreaView style={styles.homeContainer} edges={['left', 'right', 'bottom']}>
                {/* <View style={styles.qsNumberBox}>
                    <Text style={styles.qsNumber}>1.</Text>
                    <Text style={styles.qsText}>A rope of length 18 m is cut into 6 equal pieces.
                        Find the length of each piece. If one piece is used, how much rope remains?</Text>
                </View> */}
                <FlatList data={draftList} renderItem={handleRendamItem}
                    windowSize={5}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    removeClippedSubviews={true}
                    updateCellsBatchingPeriod={50}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.containerStyle}
                    ListEmptyComponent={() => EmptyComponent({ title: 'No draft found' })}
                />
            </SafeAreaView>
        </View>
    )
}
export default BookMarkScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    homeContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    qsNumber: {
        fontSize: moderateScale(12),
        color: Colors.primaryColor,
        fontFamily: Fonts.InstrumentSansMedium,
        marginLeft: moderateScale(16),
    },
    qsText: {
        fontSize: moderateScale(12),
        color: Colors.black,
        fontFamily: Fonts.InstrumentSansMedium,
        borderWidth: 1,
        // width:'80%'
    },
    qsNumberBox: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    containerStyle: {
        paddingBottom: moderateScale(5),
        paddingHorizontal: moderateScale(0),
        flexGrow: 1,
        marginTop: moderateScale(20)
    },
    draftContent: {
        paddingVertical: moderateScale(15),
        paddingHorizontal: moderateScale(15),
        marginHorizontal: moderateScale(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
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
})