import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, SectionList, Alert } from 'react-native';
import { styles } from './styles';
import AppHeader from '../../component/header/AppHeader';
import { Icons } from '../../assets/icons/index'
import SubjectItem, { payload } from './component/SubjectItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from '../../utils/responsiveSize';
import HomeBannerSlider from './component/homebanner/HomeBannerSlider';
import AppModal from '../../component/modal/AppModal';
import AppButton from '../../component/button/AppButton';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { localStorage, storageKeys } from '../../storage/storage';
import Loader from '../../component/loader/Loader';
import { GET, POST_FORM } from '../../api/request';
import { ApiEndPoint } from '../../api/endPoints';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors, Fonts } from '../../theme';
import { showToast } from '../../utils/toast';
import { showSnackbar } from '../../utils/showsnack';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSubId } from '../../redux/slices/selectedSubSlice';

const HomeScreen = () => {
    // const [selectedSubjectId, setSelectedSubjectId] = useState<null | string>(null)
    // console.log('seleeeeeeeeeee', selectedSubject);
    const dispatch = useDispatch()
    const IsFocus = useIsFocused()
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState<null | string>(null)
    const [boardId, setBoardId] = useState<null | string>(null)
    const [visibleMedium, setVisibleMedium] = useState(false);
    const [selectMedium, setSelectMedium] = useState<null | string>(null);
    const [visibleStandard, setVisibleStandard] = useState(false);
    const [selectStandard, setSelectStandard] = useState<null | string>(null);
    const [boardData, setBoardData] = useState([]);
    const [medium, setMedium] = useState([]);
    const [standard, setStandard] = useState([]);
    const [subData, setSubData] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [banners, setBanners] = useState([]);
    const selectedSubjectId = useSelector((state) => state?.selectedSubId?.selectedSubId)
    const userRole = useSelector((state) => state?.userRole?.role)

    // board
    const handleBordOpenModal = async () => {
        if (handleBoardDataGet) {
            await handleBoardDataGet();
            setVisible(true);
        }
    }
    const handleBordCloseModal = () => {
        if (selectedBoard === null) {
            showSnackbar('Please Select Board', 'error')
            return false
        }
        if (selectedBoard !== null) {
            setVisible(false)
        }
    }
    const handleSelectedBoard = async (board_name, borardIdMain, board_id) => {
        await localStorage.setItem(storageKeys.boardIdMain, borardIdMain);
        await localStorage.setItem(storageKeys.boardId, board_id);
        await localStorage.setItem(storageKeys.selectedBoard, board_name);
        setSelectedBoard(board_name);

        // if (selectedBoard !== null) {
        setVisible(false);
        if (borardIdMain) {
            await handleSubFetch(borardIdMain);
        }
        await handleMediumDataFetch();
        setVisibleMedium(true)
        // }
    };

    const getSectionedData = () => {
        if (!boardData) return [];

        const sections = ['Engineering', 'Medical', 'Board']
            .map(type => {
                const examData = boardData.find(item => item?.exam_type_name === type);
                return {
                    title: type,
                    data: examData?.boards || [],
                    exam_type_id: examData?.exam_type_id
                };
            })
            .filter(section => section.data.length > 0);

        return sections;
    };

    // medium 
    const handleMediumOpenModal = async () => {
        if (selectedBoard === null) {
            showSnackbar('Please Select Board', 'error')
            return false
        }
        if (selectedBoard !== null) {
            setVisible(false);

            await handleMediumDataFetch();
            setVisibleMedium(true)
        }
    }
    const handleMediumCloseModal = () => {
        // if (selectMedium === null) {
        //     showToast('Please Select Medium', 'error')
        //     return false
        // }
        // if (selectMedium !== null) {
        setVisibleMedium(false)
        // }
    }
    const handleSelectMedium = async (item: string) => {
        setSelectMedium(item?.medium_name)
        await localStorage.setItem(storageKeys.selectedMedium, item?.medium_name)
        await localStorage.setItem(storageKeys.selectedMediumId, item?.medium_id)
    }

    const handleStandardOpenModal = async () => {
        if (selectedBoard === null) {
            showToast('error', 'Error', 'Please Select Board')
            return false
        }
        if (selectMedium === null) {
            showToast('error', 'Error', 'Please Select Medium')
            return false
        }
        if (selectedBoard !== null && selectMedium !== null) {
            setVisible(false)
            setVisibleMedium(false)
            const boardId = await localStorage.getItem(storageKeys.boardIdMain)
            await handleStandardFetch(boardId)
            setVisibleStandard(true)
        }
    }
    const handleStandardCloseModal = () => {
        // if (selectStandard === null) {
        //     showToast('Please Select Standard', 'error');
        //     return false
        // }
        // if (selectStandard !== null) {
        setVisibleStandard(false)
        // }
    }
    const handleSelectStandard = async (item) => {
        setSelectStandard(item?.class_name)
        await localStorage.setItem(storageKeys.selectedStandard, item?.class_name)
        await localStorage.setItem(storageKeys.selectedStandardId, item?.class_id)
    }

    const Notification = [
        { id: '1', label: 'NeetPractice papers available for Classes 1–12 – Start solving now.' },
        { id: '2', label: 'NEET Biology mock test is live – Improve your accuracy now!' },
        { id: '3', label: 'New competitive exam model papers uploaded – Try now.' },
        { id: '4', label: 'JEE Mains level Physics & Chemistry question bank updated.' },
    ]

    const handleRefreshBanners = async () => {
        await fetchBanners();
    };

    const handleSelect = async ({ subId, subName }: payload) => {
        // setSelectedSubjectId(subId);

        // Save to localStorage
        // await localStorage.setItem(storageKeys.selectedSubId, subId);
        dispatch(setSelectedSubId(subId))
        await localStorage.setItem(storageKeys.selectedSubject, subName);
        navigation.navigate('PaperTypeScreen')
    }

    const handleBoardDataGet = async () => {
        setLoading(true);
        try {
            const response = await GET(ApiEndPoint.Board);
            if (response && response.status === '1') {
                setBoardData(response?.result || []);
                const boardId = await localStorage.getItem(storageKeys?.boardIdMain)
                if (boardId) {
                    await handleSubFetch(boardId);
                }
            } else {
                const errorMessage = response?.msg ||
                    'Data not fetch. Please try again.';
                showToast('error', "Error", errorMessage);
                setBoardData([])
            }

        } catch (error: any) {
            console.log('resss board', error);
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

    const handleMediumDataFetch = async () => {
        setLoading(true);
        try {
            const response = await GET(ApiEndPoint.Medium);

            if (response && response.status === 200) {
                setMedium(response?.result)
            } else {
                const errorMessage = response?.msg ||
                    'Data not fetch. Please try again.';
                showToast('error', "Error", errorMessage);
                setMedium([])
            }
        } catch (error: any) {
            console.log('resssmedum', error);

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

    const handleSubFetch = async (id) => {
        setLoading(true);
        try {
            let params = {
                et_id: id
            }

            const response = await POST_FORM(ApiEndPoint.Subject, params);

            if (response && response.status === 200) {
                setSubData(response?.result)
            } else {
                const errorMessage = response?.msg ||
                    'Data not fetch. Please try again.';
                showToast('error', "Error", errorMessage);
                setSubData([])
            }

        } catch (error: any) {
            console.log('ressssubject', error);
            if (error?.offline) {
                return; 
            }
            const errorMessage = error?.response?.data?.message ||
                error?.message ||
                'Something went wrong. Please try again.';
            showToast('error', "Error", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleStandardFetch = async (id: string) => {
        setLoading(true);
        try {
            let params = {
                et_id: id
            }
            const response = await POST_FORM(ApiEndPoint.Classes, params);
            if (response && response.status === 200) {
                setStandard(response?.result)
            } else {
                const errorMessage = response?.msg ||
                    'Data not fetch. Please try again.';
                showToast('error', "Error", errorMessage);
                setStandard([])
            }

        } catch (error: any) {
            console.log('ressssssssssstand', error);

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

    const fetchBanners = async () => {
        setLoading(true);
        try {
            const response = await GET(ApiEndPoint.Banner);
            if (response && response.status === 200) {
                setBanners(response?.result || [])
            } else {
                const errorMessage = response?.msg ||
                    'Data not fetch. Please try again.';
                showToast('error', "Error", errorMessage);
                setBanners([]);

            }

        } catch (error: any) {
            console.log('resss', error);

            if (error?.offline) {
                return;
            }
            const errorMessage = error?.response?.data?.msg ||
                error?.msg ||
                'Something went wrong. Please try again.';
            showToast('error', 'Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = useCallback(({ item, index }) => {
        return (
            <SubjectItem
                item={item}
                index={index}
                selected={selectedSubjectId === item.subject_id}
                onPress={handleSelect}
            />
        )
    }, [selectedSubjectId])

    useEffect(() => {
        const loadBoard = async () => {
            const savedBoard = await localStorage.getItem(storageKeys.selectedBoard);
            const savedMedium = await localStorage.getItem(storageKeys.selectedMedium);
            const savedStandard = await localStorage.getItem(storageKeys.selectedStandard);
            if (savedBoard || savedMedium || savedStandard) {
                setSelectedBoard(savedBoard);
                setSelectMedium(savedMedium);
                setSelectStandard(savedStandard);
            } else {
                if (handleBoardDataGet) {
                    await handleBoardDataGet();
                    setVisible(true);
                }
            }
        };
        loadBoard();
    }, []);

    useEffect(() => {
        fetchBanners();
        const subId = async () => {
            const boardId = await localStorage.getItem(storageKeys.boardIdMain)
            if (boardId) {
                await handleSubFetch(boardId);
            }
        }
        subId()
    }, []);

    useEffect(() => {
        const restoreSelectedSubject = async () => {
            // const savedSubject = await localStorage.getItem(storageKeys.selectedSubId);
            // if (!savedSubject) {
            //     setSelectedSubjectId(null);
            // } else {
            //     setSelectedSubjectId(savedSubject);
            // }
            // const saveSubSubject = useSelector((state) => state.selectedSubId)
            // console.log('saveSubSubject',saveSubSubject);

        };
        restoreSelectedSubject();
    }, [IsFocus]);

    // useFocusEffect(
    //     useCallback(() => {
    //         const restoreSelectedSubject = async () => {
    //             const savedSubject = await localStorage.getItem(storageKeys.selectedSubId);
    //             // console.log('ressss', savedSubject);
    //             if (!savedSubject) {
    //                 setSelectedSubjectId(null);
    //             } else {
    //                 setSelectedSubjectId(savedSubject);
    //             }
    //         };
    //         restoreSelectedSubject();
    //     }, [])
    // )
    return (
        <SafeAreaView
            style={styles.mainContainer}
            edges={['left', 'right', 'bottom']}>
            <Loader visible={loading} />
            {/* rightIcon={Icons.notification} onRightPress={() => navigation.navigate('NotificationScreen')} */}
            <AppHeader title="Paper Fast" leftIcon={Icons.drawer} onBackPress={() => navigation?.openDrawer()} discriptionText={`(${userRole || 'User'})`} rightIcon={Icons.notification} onRightPress={() => navigation.navigate('NotificationScreen')}
            />
            <View style={styles.innerMainContainer}>
                <FlatList
                    data={subData}
                    keyExtractor={(item) => item?.subject_id.toString()}
                    renderItem={renderItem}
                    extraData={selectedSubjectId}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews
                    initialNumToRender={6}
                    windowSize={5}
                    numColumns={2}
                    ListHeaderComponent={() => {
                        return (
                            <View>
                                {/* card box */}
                                <View style={styles.cardMainBox}>
                                    <TouchableOpacity style={styles.boardBox} onPress={handleBordOpenModal}>
                                        <Image source={Icons.boardImg} style={styles.bordIcon} resizeMode='contain' />
                                        <Text style={styles.boardText}>Board</Text>
                                        <View style={styles.rajasthanBox}>
                                            <Text style={styles.boardTextStyl} numberOfLines={1}>{selectedBoard}</Text>
                                            <Image source={Icons.downArrow} style={styles.downIcon} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.boardBox} onPress={handleMediumOpenModal}>
                                        <Image source={Icons.mediumImg} style={styles.bordIcon} resizeMode='contain' />
                                        <Text style={styles.boardText}>Medium</Text>
                                        <View style={styles.rajasthanBox}>
                                            <Text style={styles.boardTextStyl} numberOfLines={1}>{selectMedium}</Text>
                                            <Image source={Icons.downArrow} style={styles.downIcon} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.boardBox} onPress={handleStandardOpenModal}>
                                        <Image source={Icons.standardImg} style={styles.bordIcon} resizeMode='contain' />
                                        <Text style={styles.boardText}>Standard</Text>
                                        <View style={styles.rajasthanBox}>
                                            <Text style={styles.boardTextStyl} numberOfLines={1}>{selectStandard}</Text>
                                            <Image source={Icons.downArrow} style={styles.downIcon} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.allSubText} onPress={() => showToast('success', 'Success', 'Logged in successfully')}>All Subjects</Text>
                            </View>
                        )
                    }}
                    ListFooterComponent={() => {
                        return (
                            <View>
                                <View style={styles.notificationBox}>
                                    <View style={styles.notificationInnerBox}>
                                        <Image source={Icons.megaphone} style={styles.notificationIcon} resizeMode='contain' />
                                        <Text style={[styles.allSubText, {
                                            marginTop: moderateScale(0), marginBottom: moderateScale(0), fontFamily: Fonts.InstrumentSansSemiBold, fontSize: moderateScale(14), marginLeft: moderateScale(15)
                                        }]}>Latest News</Text>
                                    </View>
                                    {Notification.map((item, index) => {
                                        const lastItem = index === Notification?.length - 1
                                        return (
                                            <>
                                                <View style={[styles.boxNotification]} key={item?.id}>
                                                    {/* <Image source={Icons.notificationSpace} style={styles.notificationIcon} /> */}
                                                    {/* { borderBottomWidth: lastItem ? 0 : 1 } */}
                                                    <Text style={styles.notificationdec}>{item?.label}</Text>
                                                    <View style={{ backgroundColor: '#D9534F', paddingHorizontal: moderateScale(4), borderRadius: moderateScale(2), alignItems: "center", justifyContent: "center" }}>
                                                        <Text style={{ fontFamily: Fonts.InstrumentSansRegular, fontSize: moderateScale(8), color: Colors.white, }}>New</Text>
                                                    </View>
                                                </View>
                                                {!lastItem && <View style={{ height: 1, width: '100%', backgroundColor: Colors?.InputStroke, marginTop: moderateScale(0) }} />}
                                            </>
                                        )
                                    })}
                                </View>
                                <HomeBannerSlider
                                    banners={banners}
                                    loading={loading}
                                    onRefresh={handleRefreshBanners}
                                />
                            </View>
                        )
                    }}
                />
                {/* board */}
                <AppModal visible={visible} onClose={handleBordCloseModal} containerStyle={{ marginTop: moderateScale(40) }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white }} showsVerticalScrollIndicator={false}>
                        <View style={styles.lineMainBox}>
                            <View style={styles.lineCenterWrapper}>
                                <View style={styles.lineBox} />
                            </View>

                            <TouchableOpacity style={styles.cancleBox} onPress={handleBordCloseModal}>
                                <Image
                                    source={Icons.cancel}
                                    style={styles.cancleIcon}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>
                        {getSectionedData().map((section) => {
                            return (
                                <View key={section.title} style={styles.sectionContainer}>
                                    <Text style={styles.sectionTitle}>{section?.title}</Text>
                                    <View style={styles.bottomLine} />
                                    <FlatList
                                        data={section.data}
                                        numColumns={2}
                                        scrollEnabled={false}
                                        keyExtractor={(item) => item.board_id?.toString()}
                                        columnWrapperStyle={styles.row}
                                        showsVerticalScrollIndicator={false}
                                        contentContainerStyle={styles.listContainer}
                                        renderItem={({ item }) => {
                                            return (
                                                <TouchableOpacity
                                                    style={[
                                                        styles.boardItem,
                                                        {
                                                            backgroundColor: selectedBoard === item?.board_name
                                                                ? 'rgba(12, 64, 111, 0.1)'
                                                                : 'rgba(12, 64, 111, 0.05)',
                                                            borderColor: selectedBoard === item?.board_name
                                                                ? Colors.primaryColor
                                                                : 'rgba(12, 64, 111, 0.19)'
                                                        }
                                                    ]}
                                                    onPress={() => handleSelectedBoard(item?.board_name, section?.exam_type_id, item?.board_id)} key={item.board_id}>
                                                    <Image source={{ uri: item?.board_image }} style={styles.logoImg} resizeMode='contain' />
                                                    <Text style={styles.boardModalText}>{item?.board_name}</Text>
                                                </TouchableOpacity>
                                            )
                                        }}
                                    />
                                </View>
                            )
                        }

                        )}

                        <AppButton title='Submit' onPress={handleMediumOpenModal} style={{
                            width: "94%",
                            marginTop: moderateScale(15),
                            marginBottom: moderateScale(40)
                        }} />
                    </ScrollView>
                </AppModal>

                {/*  medium */}
                <AppModal visible={visibleMedium} onClose={handleMediumCloseModal}>
                    <FlatList
                        data={medium}
                        keyExtractor={(item) => item?.medium_id?.toString()}
                        showsVerticalScrollIndicator={false}
                        // columnWrapperStyle={styles.row}
                        contentContainerStyle={styles.listContainer}
                        ListFooterComponentStyle={{
                            paddingBottom: moderateScale(10)
                        }}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={5}
                        ListHeaderComponent={<>
                            <View style={styles.lineMainBox}>
                                <View style={styles.lineCenterWrapper}>
                                    <View style={styles.lineBox} />
                                </View>

                                <TouchableOpacity style={styles.cancleBox} onPress={handleMediumCloseModal}>
                                    <Image
                                        source={Icons.cancel}
                                        style={styles.cancleIcon}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.selectModal, { marginBottom: moderateScale(20) }]}>Select Medium</Text>
                        </>}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={[styles.mediumBox,
                            {
                                backgroundColor: selectMedium == item?.medium_name ? 'rgba(12, 64, 111, 0.1)' : 'rgba(12, 64, 111, 0.05)',
                                borderColor: selectMedium === item?.medium_name ? Colors?.primaryColor : 'rgba(12, 64, 111, 0.19)',
                            }]}
                                onPress={() => handleSelectMedium(item)}
                                key={item?.medium_id}>
                                <Text style={styles.mediumModalText}>{selectedBoard}-{item?.medium_name}</Text>
                            </TouchableOpacity>
                        )}

                        ListFooterComponent={<AppButton title='Submit' onPress={handleStandardOpenModal} style={{
                            width: "96%",
                            marginTop: moderateScale(25),
                            marginBottom: moderateScale(20),
                        }} />}
                    />

                </AppModal>
                {/* standard */}
                <AppModal visible={visibleStandard} onClose={handleStandardCloseModal}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white }} showsVerticalScrollIndicator={false}>
                        <View style={styles.lineMainBox}>
                            <View style={styles.lineCenterWrapper}>
                                <View style={styles.lineBox} />
                            </View>

                            <TouchableOpacity style={styles.cancleBox} onPress={handleStandardCloseModal}>
                                <Image
                                    source={Icons.cancel}
                                    style={styles.cancleIcon}
                                    resizeMode="contain" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.selectModal}>Select Standard</Text>
                        <FlatList
                            data={standard}
                            numColumns={2}
                            keyExtractor={(item) => item?.class_name?.toString()}
                            showsVerticalScrollIndicator={false}
                            columnWrapperStyle={styles.row}
                            contentContainerStyle={styles.listContainer}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[styles.boardItem, {
                                        backgroundColor: selectStandard === item?.class_name ? 'rgba(12, 64, 111, 0.1)' : 'rgba(12, 64, 111, 0.05)',
                                        borderColor: selectStandard === item?.class_name ? 'rgba(12, 64, 111, 1)' : 'rgba(12, 64, 111, 0.19)',
                                        minHeight: moderateScale(45)
                                    }]} onPress={() => handleSelectStandard(item)}>
                                    <Text style={styles.boardModalText}>{item?.class_name}</Text>
                                </TouchableOpacity>
                            )}
                        />

                        <AppButton title='Submit' onPress={handleStandardCloseModal} style={{
                            width: "94%",
                            marginTop: moderateScale(15),
                            marginBottom: moderateScale(40)
                        }} />
                    </ScrollView>
                </AppModal>
            </View>

        </SafeAreaView>
    )
}
export default HomeScreen