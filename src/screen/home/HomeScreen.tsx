import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, SectionList } from 'react-native';
import { styles } from './styles';
import AppHeader from '../../component/header/AppHeader';
import { Icons } from '../../assets/icons/index'
import SubjectItem from './component/SubjectItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from '../../utils/responsiveSize';
import HomeBannerSlider from './component/homebanner/HomeBannerSlider';
import AppModal from '../../component/modal/AppModal';
import AppButton from '../../component/button/AppButton';
import { useNavigation } from '@react-navigation/native';
import { localStorage, storageKeys } from '../../storage/storage';
import { showSnackbar } from '../../utils/snackbar';
import Loader from '../../component/loader/Loader';
import { GET, POST_FORM } from '../../api/request';
import { ApiEndPoint } from '../../api/endPoints';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors, Fonts } from '../../theme';

const HomeScreen = () => {
    const [selectedSubject, setSelectedSubject] = useState<null | string>(null)
    console.log('selectedSubject', selectedSubject);

    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState<null | string>(null)
    const [visibleMedium, setVisibleMedium] = useState(false);
    const [selectMedium, setSelectMedium] = useState<null | string>(null);
    const [visibleStandard, setVisibleStandard] = useState(false);
    const [selectStandard, setSelectStandard] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [boardData, setBoardData] = useState([]);
    const [medium, setMedium] = useState([]);
    const [standard, setStandard] = useState([]);
    const [banners, setBanners] = useState([]);
    console.log('boardData', boardData);

    // board
    const handleBordOpenModal = async () => {
        if (handleBoardDataGet) {
            await handleBoardDataGet();
            setVisible(true);
        }
    }
    const handleBordCloseModal = () => {
        // if (selectedBoard === null) {
        //     showSnackbar('Please Select Board', 'error')
        //     return false
        // }
        // if (selectedBoard !== null) {
        setVisible(false)
        // }
    }
    const handleSelectedBoard = async (item: string) => {
        setSelectedBoard(item);
        await localStorage.setItem(storageKeys.selectedBoard, item);
        //   setVisible(false);
    };

    //     const filteredData = () => {
    //         boardData?.filter(item => {
    //             return (
    //             if(item?.exam_type_name === "Engineering") {
    //                 return item?.boards
    //             }
    //             if(item?.exam_type_name === 'Medical') {
    //                 return item?.boards
    //             }
    //             if(item?.exam_type_name === 'Board') {
    //                 return item?.boards
    //             }
    //             )
    //     })
    // }

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
        //     showSnackbar('Please Select Medium', 'error')
        //     return false
        // }
        // if (selectMedium !== null) {
        setVisibleMedium(false)
        // }
    }
    const handleSelectMedium = async (item: string) => {
        setSelectMedium(item)
        await localStorage.setItem(storageKeys.selectedMedium, item)
    }

    const handleStandardOpenModal = async () => {
        if (selectedBoard === null) {
            showSnackbar('Please Select Board', 'error')
            return false
        }
        if (selectMedium === null) {
            showSnackbar('Please Select Medium', 'error')
            return false
        }
        if (selectedBoard !== null && selectMedium !== null) {
            setVisible(false)
            setVisibleMedium(false)
            await handleStandardFetch()
            setVisibleStandard(true)
        }
    }
    const handleStandardCloseModal = () => {
        // if (selectStandard === null) {
        //     showSnackbar('Please Select Standard', 'error');
        //     return false
        // }
        // if (selectStandard !== null) {
        setVisibleStandard(false)
        // }
    }
    const handleSelectStandard = async (item: string) => {
        setSelectStandard(item)
        await localStorage.setItem(storageKeys.selectedStandard, item)
    }

    const SUBJECTS = [
        { id: 'math', label: 'Math' },
        { id: 'science', label: 'Science' },
        { id: 'english', label: 'English' },
        { id: 'hindi', label: 'Hindi' },
        { id: 'sanskrit', label: 'Sanskrit' },
        { id: 'social science', label: 'Social Science' },
    ];

    const Notification = [
        { id: '1', label: 'NeetPractice papers available for Classes 1–12 – Start solving now.' },
        { id: '2', label: 'NEET Biology mock test is live – Improve your accuracy now!' },
        { id: '3', label: 'New competitive exam model papers uploaded – Try now.' },
        { id: '4', label: 'JEE Mains level Physics & Chemistry question bank updated.' },
    ]

    const handleRefreshBanners = async () => {
        await fetchBanners();
    };

    // const handleSelect = (id: string) => {
    //     setSelectedSubject(id),
    //         navigation.navigate('PaperTypeScreen');
    // }
    const handleSelect = async (id: string) => {
        setSelectedSubject(id);

        // Save to localStorage
        await localStorage.setItem(storageKeys.selectedSubject, id);

        navigation.navigate('PaperTypeScreen');
    }

    // const handleBoardDataGet = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await fetch('https://www.papers.withupartners.in/api/boards')
    //         console.log('Response status:rr', response);

    //         const newRes = await response.json();
    //         console.log('newRes:', newRes);

    //         if (response.ok) {
    //             if (newRes.status === '1') {
    //                 // setProfileData(new)
    //                 // console.log('newRes.statusss', newRes.result)
    //                 setBoardData(newRes.result)
    //             } else {
    //                 showSnackbar(newRes?.msg || 'OTP Failed', 'error');
    //             }
    //         }
    //     } catch (error) {
    //         console.error('API Error:', error);
    //         if (error.message?.includes('Network')) {
    //             showSnackbar('No internet connection', 'error');
    //         } else {
    //             showSnackbar(error.message, 'error');
    //         }

    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleBoardDataGet = async () => {
        setLoading(true);
        try {
            const response = await GET(ApiEndPoint.Board);
            if (response && response.status === '1') {
                setBoardData(response?.result)
            } else {
                const errorMessage = response?.message ||
                    'Data not fetch. Please try again.';
                showSnackbar(errorMessage, 'error');
                setBoardData([])
            }

        } catch (error: any) {
            if (error?.offline) {
                showSnackbar('No internet connection', 'error');
                return;
            }
            const errorMessage = error?.response?.data?.message ||
                error?.message ||
                'Something went wrong. Please try again.';
            showSnackbar(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    // const handleMediumDataFetch = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await fetch('https://www.papers.withupartners.in/api/medium')
    //         console.log('Response status:rr', response);
    //         const newRes = await response.json();
    //         console.log('newRes:', newRes);

    //         if (response.ok) {
    //             if (newRes.status === '1') {
    //                 // setProfileData(new)
    //                 // console.log('newRes.statusss', newRes.result)
    //                 setMedium(newRes.result)
    //             } else {
    //                 showSnackbar(newRes?.msg || 'OTP Failed', 'error');
    //             }
    //         }
    //     } catch (error) {
    //         console.error('API Error:', error);
    //         if (error.message?.includes('Network')) {
    //             showSnackbar('No internet connection', 'error');
    //         } else {
    //             showSnackbar(error.message, 'error');
    //         }

    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleMediumDataFetch = async () => {
        setLoading(true);
        try {
            const response = await GET(ApiEndPoint.Medium);
            if (response && response.status === '1') {
                setMedium(response?.result)
            } else {
                const errorMessage = response?.message ||
                    'Data not fetch. Please try again.';
                showSnackbar(errorMessage, 'error');
                setMedium([])
            }
        } catch (error: any) {
            if (error?.offline) {
                showSnackbar('No internet connection', 'error');
                return;
            }
            const errorMessage = error?.response?.data?.message ||
                error?.message ||
                'Something went wrong. Please try again.';
            showSnackbar(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    // const handleStandardFetch = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await fetch('https://www.papers.withupartners.in/api/classes')
    //         console.log('Response status:rr', response);
    //         const newRes = await response.json();
    //         console.log('newRes:', newRes);

    //         if (response.ok) {
    //             if (newRes.status === '1') {
    //                 // setProfileData(new)
    //                 // console.log('newRes.statusss', newRes.result)
    //                 setStandard(newRes.result)
    //             } else {
    //                 showSnackbar(newRes?.msg || 'OTP Failed', 'error');
    //             }
    //         }
    //     } catch (error) {
    //         console.error('API Error:', error);
    //         if (error.message?.includes('Network')) {
    //             showSnackbar('No internet connection', 'error');
    //         } else {
    //             showSnackbar(error.message, 'error');
    //         }

    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleStandardFetch = async () => {
        setLoading(true);
        try {
            const response = await GET(ApiEndPoint.Classes);
            if (response && response.status === '1') {
                setStandard(response?.result)
            } else {
                const errorMessage = response?.message ||
                    'Data not fetch. Please try again.';
                showSnackbar(errorMessage, 'error');
                setStandard([])
            }

        } catch (error: any) {
            if (error?.offline) {
                showSnackbar('No internet connection', 'error');
                return;
            }
            const errorMessage = error?.response?.data?.message ||
                error?.message ||
                'Something went wrong. Please try again.';
            showSnackbar(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    // const fetchBanners = async () => {
    //     setLoading(true)
    //     try {
    //         const response = await fetch('https://www.papers.withupartners.in/api/banner');
    //         const newRes = await response.json();

    //         if (newRes?.status === 200) {
    //             console.log('responseassssss', response);
    //             setBanners(newRes?.result || []);
    //         } else {
    //             showSnackbar(newRes?.msg || 'Failed to load banners', 'error');
    //             // Fallback to local images if API fails
    //             setBanners([]);
    //         }
    //     } catch (error) {
    //         console.error('Banner fetch error:', error);
    //         showSnackbar('Network error', 'error');
    //         // Fallback to local images
    //         setBanners([]);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const fetchBanners = async () => {
        setLoading(true);
        try {
            const response = await GET(ApiEndPoint.Banner);
            if (response && response.status === 200) {
                setBanners(response?.result)
            } else {
                const errorMessage = response?.message ||
                    'Data not fetch. Please try again.';
                showSnackbar(errorMessage, 'error');
                setBanners([]);

            }

        } catch (error: any) {
            if (error?.offline) {
                showSnackbar('No internet connection', 'error');
                return;
            }
            const errorMessage = error?.response?.data?.message ||
                error?.message ||
                'Something went wrong. Please try again.';
            showSnackbar(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };
    const renderItem = useCallback(({ item, index }) => {
        return (
            // <SubjectItem
            //     item={item}
            //     selected={selectedSubject === item.id}
            //     onPress={handleSelect} />
            <SubjectItem
                item={item}
                index={index}   // ✅ REQUIRED
                selected={selectedSubject === item.id}
                onPress={handleSelect}
            />
            // onPress={setSelectedSubject} />
        )
    }, [selectedSubject])

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
    }, []);

    useEffect(() => {
        const restoreSelectedSubject = async () => {
            const savedSubject = await localStorage.getItem(storageKeys.selectedSubject);
            if (savedSubject) {
                setSelectedSubject(savedSubject);
            }
        };

        restoreSelectedSubject();
    }, []);

    return (
        <SafeAreaView
            style={styles.mainContainer}
            edges={['left', 'right', 'bottom']}>
            <Loader visible={loading} />
            <AppHeader title="Paper Fast" leftIcon={Icons.drawer} onBackPress={() => navigation.openDrawer()} discriptionText='(For Teacher)' rightIcon={Icons.notification} />
            <View style={styles.innerMainContainer}>
                <FlatList
                    data={SUBJECTS}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    extraData={selectedSubject}
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
                                        <Image source={Icons.boardImg} style={styles.bordIcon} resizeMode='contain'/>
                                        <Text style={styles.boardText}>Board</Text>
                                        <View style={styles.rajasthanBox}>
                                            <Text style={styles.boardTextStyl} numberOfLines={1}>{selectedBoard}</Text>
                                            <Image source={Icons.downArrow} style={styles.downIcon} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.boardBox} onPress={handleMediumOpenModal}>
                                        <Image source={Icons.mediumImg} style={styles.bordIcon}resizeMode='contain' />
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
                                <Text style={styles.allSubText} onPress={() => navigation.navigate('ChemistryData')}>All Subjects</Text>
                            </View>
                        )
                    }}
                    ListFooterComponent={() => {
                        return (
                            <View>
                                <View style={styles.notificationBox}>
                                    <View style={styles.notificationInnerBox}>
                                        <Image source={Icons.megaphone} style={styles.notificationIcon} resizeMode='contain'/>
                                        <Text style={[styles.allSubText, {
                                            marginTop: moderateScale(0), marginBottom: moderateScale(0), fontFamily:Fonts.InstrumentSansSemiBold, fontSize:moderateScale(14), marginLeft:moderateScale(15)
                                        }]}>Latest News</Text>
                                    </View>
                                    {Notification.map((item, index) => {
                                        const lastItem = index === Notification?.length - 1
                                        return (
                                            <View style={[styles.boxNotification, { borderBottomWidth: lastItem ? 0 : 1 }]} key={item?.id}>
                                                {/* <Image source={Icons.notificationSpace} style={styles.notificationIcon} /> */}
                                                <Text style={styles.notificationdec}>{item?.label}</Text>
                                                <View style={{backgroundColor:'#D9534F', paddingHorizontal:moderateScale(4),borderRadius:moderateScale(2),alignItems:"center",justifyContent:"center"}}>
                                                    <Text style={{fontFamily:Fonts.InstrumentSansRegular, fontSize:moderateScale(8),color:Colors.white, }}>New</Text>
                                                </View>
                                            </View>
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
                <AppModal visible={visible} onClose={handleBordCloseModal} >
                    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white}} showsVerticalScrollIndicator={false}>
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

                        {/* <Text style={styles.selectModal}>Select Board</Text> */}

                        {/* <FlatList
                            data={getSectionedData()}
                            numColumns={2}
                            keyExtractor={(item) => item?.board_name?.toString()}
                            showsVerticalScrollIndicator={false}
                            columnWrapperStyle={styles.row}
                            contentContainerStyle={styles.listContainer}
                            renderItem={({ item }) => (
                                <View>
                                    <Text>{item?.exam_type_name}</Text>
                                    <TouchableOpacity
                                        style={[styles.boardItem, {
                                            backgroundColor: selectedBoard == item?.board_name ? 'rgba(12, 64, 111, 0.1)' : 'rgba(12, 64, 111, 0.05)',
                                            borderColor: selectedBoard === item?.board_name ? 'rgba(12, 64, 111, 1)' : 'rgba(12, 64, 111, 0.19)'
                                        }]}
                                        onPress={() => handleSelectedBoard(item?.board_name)}
                                        key={item?.board_name}
                                    >
                                        <Text style={styles.boardModalText}>{item?.board_name}</Text>
                                    </TouchableOpacity>
                                </View>
                            )

                            }
                        /> */}

                        {getSectionedData().map((section) => (
                            <View key={section.title} style={styles.sectionContainer}>
                                <Text style={styles.sectionTitle}>{section?.title}</Text>
                                <View style={styles.bottomLine} />
                                <FlatList
                                    data={section.data}
                                    numColumns={2}
                                    scrollEnabled={false} // Important: disable scroll when nested
                                    keyExtractor={(item) => item.board_id?.toString()}
                                    columnWrapperStyle={styles.row}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={styles.listContainer}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={[
                                                styles.boardItem,
                                                {
                                                    backgroundColor: selectedBoard === item?.board_name
                                                        ? 'rgba(12, 64, 111, 0.1)'
                                                        : 'rgba(12, 64, 111, 0.05)',
                                                    borderColor: selectedBoard === item?.board_name
                                                        ? 'rgba(12, 64, 111, 1)'
                                                        : 'rgba(12, 64, 111, 0.19)'
                                                }
                                            ]}
                                            onPress={() => handleSelectedBoard(item?.board_name)}
                                        >
                                            <Image source={{ uri: item?.board_image }} style={styles.logoImg} resizeMode='contain' />
                                            <Text style={styles.boardModalText}>{item?.board_name}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        ))}

                        <AppButton title='Submit' onPress={handleMediumOpenModal} style={{
                            width: "96%",
                            marginTop: moderateScale(15),
                            marginBottom: moderateScale(40)
                        }} />
                    </ScrollView>
                </AppModal>

                {/*  medium */}
                <AppModal visible={visibleMedium} onClose={handleMediumCloseModal}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white }} showsVerticalScrollIndicator={false}>
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
                        {/* <TouchableOpacity style={[styles.englishMediumBox, { backgroundColor: selectMedium === 'English' ? 'rgba(12, 64, 111, 0.1)' : 'rgba(12, 64, 111, 0.05)', borderColor: selectedBoard === 'English' ? 'rgba(12, 64, 111, 1)' : 'rgba(12, 64, 111, 0.19)' }]} onPress={() => handleSelectMedium('English')} >
                        <Text style={[styles.englishText, { color: selectMedium === 'English' ? Colors.primaryColor : Colors.InputText }]}>{selectedBoard} - English Medium</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.englishMediumBox, { backgroundColor: selectMedium === 'Hindi' ? 'rgba(12, 64, 111, 0.1)' : 'rgba(12, 64, 111, 0.05)', borderColor: selectedBoard === 'Hindi' ? 'rgba(12, 64, 111, 1)' : 'rgba(12, 64, 111, 0.19)' }]} onPress={() => handleSelectMedium('Hindi')}>
                        <Text style={[styles.englishText, { color: selectMedium === 'Hindi' ? Colors.primaryColor : Colors.InputText }]}>{selectedBoard} - हिंदी माध्यम</Text>
                    </TouchableOpacity> */}
                        <FlatList
                            data={medium}
                            numColumns={2}
                            keyExtractor={(item) => item?.medium_name?.toString()}
                            showsVerticalScrollIndicator={false}
                            // columnWrapperStyle={styles.row}
                            contentContainerStyle={styles.listContainer}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={[styles.boardItem,
                                {
                                    backgroundColor: selectMedium == item?.medium_name ? 'rgba(12, 64, 111, 0.1)' : 'rgba(12, 64, 111, 0.05)',
                                    borderColor: selectMedium === item?.medium_name ? 'rgba(12, 64, 111, 1)' : 'rgba(12, 64, 111, 0.19)',
                                    marginBottom: moderateScale(15)
                                }]}
                                    // onPress={() => handleSelectedBoard(item?.board_name)} 
                                    onPress={() => handleSelectMedium(item?.medium_name)}
                                    key={item?.medium_name}>
                                    <Text style={styles.boardModalText}>{selectedBoard}-{item?.medium_name}</Text>
                                </TouchableOpacity>
                            )}
                        />

                        <AppButton title='Submit' onPress={handleStandardOpenModal} style={{
                            width: "100%",
                            marginTop: moderateScale(25),
                            marginBottom: moderateScale(20),
                            // borderRadius:0,
                            // marginTop:moderateScale(-40)
                        }} />
                    </ScrollView>
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
                                    resizeMode="contain"
                                />
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
                                        borderColor: selectStandard === item?.class_name ? 'rgba(12, 64, 111, 1)' : 'rgba(12, 64, 111, 0.19)'
                                    }]} onPress={() => handleSelectStandard(item?.class_name)}>
                                    <Text style={styles.boardModalText}>{item?.class_name}</Text>
                                </TouchableOpacity>
                            )}
                        />

                        <AppButton title='Submit' onPress={handleStandardCloseModal} style={{
                            width: "96%",
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