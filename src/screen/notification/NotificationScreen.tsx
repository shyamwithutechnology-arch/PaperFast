import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { localStorage, storageKeys } from '../../storage/storage';
import HeaderPaperModule from '../../component/headerpapermodule/Headerpapermodule';
import { Icons } from '../../assets/icons';
import { Colors, Fonts } from '../../theme';
import DraftPaperList from '../papermodule/draftpaper/component/DraftPaperList';

export type NotificationScreenProps = {
}
const NotificationScreen = (props: NotificationScreenProps) => {
    const navigation = useNavigation();
    const [selectedSubject, setSelectedSubject] = useState<null | string>(null)
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

    const handleGoBack = () => {
        navigation.goBack()
    }

    const [drafts, setDrafts] = useState<DraftItem[]>([
        {
            id: '1',
            title: 'Mydraft',
            subject: 'STD 6 Maths',
            marks: '3.0 Marks',
            lastUpdated: '23-12-2025',
            status: 'draft',
            difficulty: 'medium',
        },
        {
            id: '2',
            title: 'Final Draft',
            subject: 'STD 7 Science',
            marks: '5.0 Marks',
            lastUpdated: '24-12-2025',
            status: 'published',
            difficulty: 'hard',
        },
        {
            id: '3',
            title: 'Mid Term',
            subject: 'STD 8 Physics',
            marks: '4.0 Marks',
            lastUpdated: '25-12-2025',
            status: 'archived',
            difficulty: 'easy',
        },
    ]);

    const handleRendamItem = () => {
        return (
            <View style={styles.draftContent}>
                <View>
                    <Text style={styles.myDraftText}>Fresh questions & solutions....</Text>
                    <Text style={styles.myDraftSecText}>View detailed answers for your selected questions.</Text>
                    <Text style={styles.decText}>Yesterday 4:35pm</Text>
                    {/* <Text style={styles.decText}>Last Updates 23-12-2025</Text> */}
                </View>
                <TouchableOpacity style={styles.deleteBox}>
                    {/* <MaterialIcons name='delete-outline' size={moderateScale(25)} color={'#EA5858'} /> */}
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor={Colors.lightThemeBlue} />
            <SafeAreaView style={{ backgroundColor: Colors.lightThemeBlue }} edges={['top']}>
                <HeaderPaperModule title='Notification' leftIconPress={handleGoBack} />
            </SafeAreaView>
            <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
                {/* <FlatList data={}/> */}
                {/* <DraftPaperList /> */}
                <FlatList data={drafts} renderItem={handleRendamItem}
                    windowSize={4}
                    initialNumToRender={10} />
            </SafeAreaView>
        </View>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },

    mainContainer: {
        flex: 1,
        backgroundColor: Colors.white
    },
    innerMainContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        borderTopLeftRadius: moderateScale(20),
        borderTopRightRadius: moderateScale(20),
        paddingHorizontal: moderateScale(6)
        // borderWidth: 1,
    },
    ContantantRaper: {
        flex: 1,
        marginTop: moderateScale(-28),
    },
    allSubText: {
        fontSize: moderateScale(17),
        fontFamily: Fonts.InstrumentSansMedium,
        color: Colors.black,
        marginTop: moderateScale(16),
        marginLeft: moderateScale(12),
        marginBottom: moderateScale(4)
    },
    boardBox: {
        height: verticalScale(95),
        width: scale(102),
        borderWidth: 1,
        marginHorizontal: moderateScale(5.5),
        backgroundColor: Colors.homeCardBgColor,
        borderColor: Colors.homeCardBoxStoke,
        borderRadius: moderateScale(5),
    },
    cardMainBox: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: "center",
        marginTop: moderateScale(15),
        marginBottom: moderateScale(5)
    },
    bordIcon: {
        width: moderateScale(30),
        height: moderateScale(30),
        resizeMode: 'contain',
        marginLeft: moderateScale(8),
        marginTop: moderateScale(5)
    },
    downIcon: {
        width: moderateScale(20),
        height: moderateScale(20),
        // aspectRatio:1,
        resizeMode: 'contain'
    },
    boardText: {
        fontSize: moderateScale(15),
        fontFamily: Fonts.InstrumentSansMedium,
        color: Colors.black,
        marginTop: moderateScale(15),
        marginLeft: moderateScale(8)
    },
    boardTextStyl: {
        fontSize: moderateScale(12),
        fontFamily: Fonts.InterRegular,
        color: Colors.black,
        // borderWidth: 1,
        width: moderateScale(72)
    },
    rajasthanBox: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: moderateScale(8),
        // borderWidth: 1
    },
    notificationBox: {
        width: '96%',
        paddingBottom: moderateScale(20),
        borderWidth: 1,
        borderColor: 'rgba(12, 64, 111, 0.19)',
        // borderRadius:moderateScale(10)
        borderTopLeftRadius: moderateScale(10),
        borderTopRightRadius: moderateScale(10),
        alignSelf: 'center',
        marginBottom: moderateScale(10),
        // marginVertical:moderateScale(14)
        marginTop: moderateScale(10)

    },
    notificationInnerBox: {
        paddingVertical: moderateScale(8),
        backgroundColor: Colors.homeNotificationInnerBgColor,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent:"center",
        // textAlignVertical:'center',
        borderWidth: 1,
        borderColor: 'rgba(12, 64, 111, 0.19)',
        borderTopLeftRadius: moderateScale(10),
        borderTopRightRadius: moderateScale(10),
        paddingLeft: moderateScale(10)
    },
    notificationIcon: {
        width: moderateScale(34),
        height: moderateScale(34),
        resizeMode: 'contain'
    },
    boxNotification: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: moderateScale(10),
        marginVertical: moderateScale(3),
        borderBottomWidth: 1,
        borderColor: 'rgba(12, 64, 111, 0.1)'
    },
    notificationdec: {
        fontSize: moderateScale(11),
        color: Colors.blackSecond,
        fontFamily: Fonts.InstrumentSansRegular,
        //   lineHeight: 20,
        flex: 1,
        flexWrap: 'wrap',   // ⭐ REQUIRED
    },
    //     lineMainBox:{
    //         borderWidth:1,
    //         flexDirection:'row',
    //         // alignSelf:'center',
    //           position: "relative",      // IMPORTANT
    // justifyContent:'space-between',
    //         flex:1,
    //     },
    //     lineBox: {
    //         height: moderateScale(7),
    //         width: '50%',
    //         backgroundColor: Colors.ParagraphAndShortTexts,
    //         borderRadius: moderateScale(10),

    //   position: "absolute",
    // //   left: 0,
    // //   right: 0,
    // //   alignSelf: "center",
    //     },
    //     cancleIcon: {
    //         width: moderateScale(14),
    //         height: moderateScale(14)
    //     },
    //     cancleBox: {
    //         width: moderateScale(30),
    //         height: moderateScale(30),
    //         borderWidth:1,
    //         alignItems:'center',
    //         justifyContent:'center',
    //         borderRadius:moderateScale(20),
    //         alignSelf:"flex-end",
    //     }
    lineMainBox: {
        flexDirection: "row",
        alignItems: "center",
        // paddingHorizontal: moderateScale(),
        // borderWidth:1
    },

    lineCenterWrapper: {
        flex: 1,
        alignItems: "center",
    },

    lineBox: {
        height: moderateScale(4),
        width: "40%",
        backgroundColor: Colors.ParagraphAndShortTexts,
        borderRadius: moderateScale(10),
    },

    cancleBox: {
        width: moderateScale(30),
        height: moderateScale(30),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: moderateScale(20),
    },

    cancleIcon: {
        width: moderateScale(13),
        height: moderateScale(13),
    },
    selectModal: {
        fontSize: moderateScale(18),
        fontFamily: Fonts.InstrumentSansMedium,
        color: Colors.black,
        marginTop: moderateScale(10),
        marginLeft: moderateScale(8),
        marginBottom: moderateScale(10)
    },
    selectStanBox: {
        paddingHorizontal: scale(14),
        paddingVertical: verticalScale(10),
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    bordItemBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        justifyContent: 'space-between'
    },
    boardItemText: {
        fontSize: moderateScale(15),
        fontFamily: Fonts.InstrumentSansRegular,
        color: Colors.InputText
    },

    ////
    row: {
        justifyContent: "space-between",
        marginBottom: verticalScale(12),
    },

    listContainer: {
        paddingTop: verticalScale(8),
    },

    boardItem: {
        flex: 1,
        marginHorizontal: scale(6),
        minHeight: verticalScale(44),
        borderRadius: moderateScale(8),
        borderWidth: 1,
        borderColor: Colors.InputStroke,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: scale(12),
    },

    boardModalText: {
        fontSize: moderateScale(15),
        textAlign: "center",
        fontFamily: Fonts.InstrumentSansRegular,
        color: Colors.primaryColor
    },
    englishMediumBox: {
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(15),
        borderRadius: moderateScale(10),
        borderWidth: 1,
        backgroundColor: 'rgba(12, 64, 111, 0.19)',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: moderateScale(8)
    },
    englishText: {
        fontFamily: Fonts.InstrumentSansRegular,
        fontSize: moderateScale(15),
        color: Colors.InputText
    },


    // ?????????????????????????????
    draftContent: {
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
        borderWidth: .7,
        borderColor: Colors?.InputStroke,
        borderTopWidth: .5,
    },
    myDraftText: {
        fontSize: moderateScale(15),
        color: Colors.black,
        fontFamily: Fonts.InstrumentSansMedium
    },
    myDraftSecText: {
        fontSize: moderateScale(13),
        color: Colors.ParagraphAndShortTexts,
        fontFamily: Fonts.InterRegular
    },
    decText: {
        fontSize: moderateScale(10),
        color: '#A0A0A0',
        fontFamily: Fonts.InterRegular
    },
    deleteBox: {
        height: moderateScale(10),
        width: moderateScale(10),
        borderRadius: moderateScale(40),
        backgroundColor: '#EE5D41',
        alignItems: 'center',
        justifyContent: "center"
    }

})