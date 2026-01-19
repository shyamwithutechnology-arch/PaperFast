import React, { use, useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StatusBar, Image, FlatList, TouchableOpacity, Platform, BackHandler, } from 'react-native';
import { styles } from './styles';
import AppHeader from '../../component/header/AppHeader';
import { Icons } from '../../assets/icons/index'
import SubjectItem from './component/SubjectItem';
import { Colors } from '../../theme';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale } from '../../utlis/responsiveSize';
import HomeBannerSlider from './component/homebanner/HomeBannerSlider';
import AppModal from '../../component/modal/AppModal';
import AppButton from '../../component/button/AppButton';
import { BoardModal } from './component/boardmodal/BoardModal';
import { useNavigation } from '@react-navigation/native';
import { localStorage, reduxStorage, storage, storageKey, storageKeys } from '../../storage';

const HomeScreen = () => {
    const [otp, setOtp] = useState('');
    const [firstName, setFirstName] = useState('')
    const [selectedSubject, setSelectedSubject] = useState<null | string>(null)
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState<null | string>(null)
    const [visibleMedium, setVisibleMedium] = useState(false);
    const [selectMedium, setSelectMedium] = useState<null | string>(null);
    const [visibleStandard, setVisibleStandard] = useState(false);
    const [selectStandard, setSelectStandard] = useState<null | string>(null);

    // board
    const handleBordOpenModal = () => {
        setVisible(true)
    }
    const handleBordCloseModal = () => {
        setVisible(false)
    }
    const handleSelectedBoard = async (item: string) => {
        setSelectedBoard(item);
        await localStorage.setItem(storageKeys.selectedBoard, item);
        //   setVisible(false);
    };


    // medium 
    const handleMediumOpenModal = () => {
        setVisible(false)
        setVisibleMedium(true)
    }
    const handleMediumCloseModal = () => {
        setVisibleMedium(false)
    }
    const handleSelectMedium = async (item: string) => {
        setSelectMedium(item)
        await localStorage.setItem(storageKeys.selectedMedium, item)
    }

    const handleStandardOpenModal = () => {
        setVisible(false)
        setVisibleMedium(false)
        setVisibleStandard(true)
    }
    const handleStandardCloseModal = () => {
        setVisibleStandard(false)
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

    const BordsData = [
        { id: 1, board: 'Rajasthan Board' },
        { id: 2, board: 'CBSE Board' },
        { id: 3, board: 'JEE/NEET' },
        { id: 4, board: 'Bihar Board' },
        { id: 5, board: 'UP Board' },
        { id: 6, board: 'Haryana Board' },
        { id: 7, board: 'Chattisgarh Board' },
        { id: 8, board: 'ICSE Board' },
        { id: 9, board: 'Jharkhand Board' },
        { id: 10, board: 'Maharashtra Board' },
    ]

    const Standard = [
        { id: 1, standard: 'STD 6' },
        { id: 2, standard: 'STD 7' },
        { id: 3, standard: 'STD 8' },
        { id: 4, standard: 'STD 9' },
        { id: 5, standard: 'STD 10' },
        { id: 6, standard: 'STD 11 Science' },
        { id: 7, standard: 'STD 11 Commerce' },
        { id: 8, standard: 'STD 11 Arts' },
        { id: 9, standard: 'STD 12 Science' },
        { id: 10, standard: 'STD 12 Commerce' },
        { id: 11, standard: 'STD 12 Arts' },
    ]

    const handleSelect = (id: string) => {
        setSelectedSubject(id),
            navigation.navigate('PaperTypeScreen');
    }
    const renderItem = useCallback(({ item }) => {
        return (
            <SubjectItem
                item={item}
                selected={selectedSubject === item.id}
                onPress={handleSelect} />
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
                setVisible(true);
            }
        };
        loadBoard();
    }, []);

    return (
        // <View style={styles.mainContainer}>

        <SafeAreaView
            style={styles.mainContainer}
            edges={['left', 'right', 'bottom']}
        >
            <AppHeader title="Paper Fast" leftIcon={Icons.drawer} onBackPress={() => navigation.openDrawer()} discriptionText='(For Teacher)' rightIcon={Icons.notification} />
            <View style={styles.innerMainContainer}>

                <FlatList
                    data={SUBJECTS}
                    keyExtractor={(item) => item.id}
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
                                <View style={styles.cardMainBox}>
                                    <TouchableOpacity style={styles.boardBox} onPress={handleBordOpenModal}>
                                        <Image source={Icons.board} style={styles.bordIcon} />
                                        <Text style={styles.boardText}>Board</Text>
                                        <View style={styles.rajasthanBox}>
                                            <Text style={styles.boardTextStyl}>{selectedBoard}</Text>
                                            <Image source={Icons.downArrow} style={styles.downIcon} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.boardBox} onPress={handleMediumOpenModal}>
                                        <Image source={Icons.board} style={styles.bordIcon} />
                                        <Text style={styles.boardText}>Medium</Text>
                                        <View style={styles.rajasthanBox}>
                                            <Text style={styles.boardTextStyl}>{selectMedium}</Text>
                                            <Image source={Icons.downArrow} style={styles.downIcon} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.boardBox} onPress={handleStandardOpenModal}>
                                        <Image source={Icons.board} style={styles.bordIcon} />
                                        <Text style={styles.boardText}>Standard</Text>
                                        <View style={styles.rajasthanBox}>
                                            <Text style={styles.boardTextStyl}>{selectStandard}</Text>
                                            <Image source={Icons.downArrow} style={styles.downIcon} />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.allSubText}>All Subjects</Text>
                            </View>
                        )
                    }}
                    ListFooterComponent={() => {
                        return (
                            <View>
                                <View style={styles.notificationBox}>
                                    <View style={styles.notificationInnerBox}>
                                        <Image source={Icons.NotificationDashBord} style={styles.notificationIcon} />
                                        <Text style={[styles.allSubText, {
                                            marginTop: moderateScale(0), marginBottom: moderateScale(0)
                                        }]}>Notifications</Text>
                                    </View>
                                    {Notification.map(item => {
                                        return (
                                            <View style={styles.boxNotification} key={item?.id}>
                                                <Image source={Icons.notificationSpace} style={styles.notificationIcon} />
                                                <Text style={styles.notificationdec}> {item?.label}</Text>
                                            </View>
                                        )
                                    })}
                                </View>
                                <HomeBannerSlider />
                            </View>
                        )
                    }}
                />

                {/* board */}
                <AppModal visible={visible} onClose={handleBordCloseModal}>
                    {/* <View style={styles.lineMainBox}>
                            <View style={styles.lineBox}/>
                            <TouchableOpacity style={styles.cancleBox}>
                                <Image source={Icons.cancel} style={styles.cancleIcon} resizeMode='contain' />
                            </TouchableOpacity>
                        </View> */}
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

                    <Text style={styles.selectModal}>Select Board</Text>

                    <FlatList
                        data={BordsData}
                        numColumns={2}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        columnWrapperStyle={styles.row}
                        contentContainerStyle={styles.listContainer}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={[styles.boardItem,
                            {
                                backgroundColor: selectedBoard == item?.board ? 'rgba(12, 64, 111, 0.1)' : 'rgba(12, 64, 111, 0.05)',
                                borderColor: selectedBoard === item?.board ? 'rgba(12, 64, 111, 1)' : 'rgba(12, 64, 111, 0.19)'
                            }]}
                                onPress={() => handleSelectedBoard(item?.board)}>
                                <Text style={styles.boardModalText}>{item.board}</Text>
                            </TouchableOpacity>
                        )}
                    />

                    <AppButton title='Submit' onPress={handleMediumOpenModal} style={{
                        width: "96%",
                        marginTop: moderateScale(15),
                        marginBottom: moderateScale(40)
                    }} />
                </AppModal>


                {/*  medium */}
                <AppModal visible={visibleMedium} onClose={handleMediumCloseModal}>
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

                    <Text style={styles.selectModal}>Select Medium</Text>
                    <TouchableOpacity style={[styles.englishMediumBox, { backgroundColor: selectMedium === 'English' ? 'rgba(12, 64, 111, 0.1)' : 'rgba(12, 64, 111, 0.05)', borderColor: selectedBoard === 'English' ? 'rgba(12, 64, 111, 1)' : 'rgba(12, 64, 111, 0.19)' }]} onPress={() => handleSelectMedium('English')} >
                        <Text style={[styles.englishText, { color: selectMedium === 'English' ? Colors.primaryColor : Colors.InputText }]}>{selectedBoard} - English Medium</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.englishMediumBox, { backgroundColor: selectMedium === 'Hindi' ? 'rgba(12, 64, 111, 0.1)' : 'rgba(12, 64, 111, 0.05)', borderColor: selectedBoard === 'Hindi' ? 'rgba(12, 64, 111, 1)' : 'rgba(12, 64, 111, 0.19)' }]} onPress={() => handleSelectMedium('Hindi')}>
                        <Text style={[styles.englishText, { color: selectMedium === 'Hindi' ? Colors.primaryColor : Colors.InputText }]}>{selectedBoard} - हिंदी माध्यम</Text>
                    </TouchableOpacity>

                    <AppButton title='Submit' onPress={handleStandardOpenModal} style={{
                        width: "100%",
                        marginTop: moderateScale(15),
                        marginBottom: moderateScale(40),
                        // borderRadius:0,
                        // marginTop:moderateScale(-40)
                    }} />
                </AppModal>


                {/* standard */}
                <AppModal visible={visibleStandard} onClose={handleStandardCloseModal}>
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
                        data={Standard}
                        numColumns={2}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        columnWrapperStyle={styles.row}
                        contentContainerStyle={styles.listContainer}
                        renderItem={({ item }) => (

                            <TouchableOpacity
                                style={[styles.boardItem, {
                                    backgroundColor: selectStandard === item?.standard ? 'rgba(12, 64, 111, 0.1)' : 'rgba(12, 64, 111, 0.05)',
                                    borderColor: selectStandard === item?.standard ? 'rgba(12, 64, 111, 1)' : 'rgba(12, 64, 111, 0.19)'
                                }]} onPress={() => handleSelectStandard(item?.standard)}>
                                <Text style={styles.boardModalText}>{item.standard}</Text>
                            </TouchableOpacity>
                        )}
                    />

                    <AppButton title='Submit' onPress={handleStandardCloseModal} style={{
                        width: "96%",
                        marginTop: moderateScale(15),
                        marginBottom: moderateScale(40)
                    }} />
                </AppModal>
            </View>


            {/* </View> */}

        </SafeAreaView>
    )
}
export default HomeScreen


{/* <StatusBar backgroundColor="transparent"
                barStyle={'light-content'} /> */}
{/* <View style={{ paddingTop: insets.top, backgroundColor: Colors.primaryColor }}>
 <StatusBar barStyle={'light-content'} backgroundColor="transparent" />
<AppHeader title="Paper Fast" leftIcon={Icons.drawer} onBackPress={() => navigation.openDrawer()} discriptionText='(For Teacher)' rightIcon={Icons.notification} />  </View>
<View style={styles.ContantantRaper}> */}