import { StyleSheet } from "react-native"
import { Colors, Fonts } from "../../theme"
import { moderateScale } from "../../utils/responsiveSize"
import { scale, verticalScale } from "react-native-size-matters"

export const styles = StyleSheet.create({
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
        fontSize: moderateScale(15),
        fontFamily: Fonts.InstrumentSansMedium,
        color: Colors.black,
        marginTop: moderateScale(16),
        marginLeft: moderateScale(7),
        marginBottom: moderateScale(8),
    },
    boardBox: {
        height: verticalScale(78),
        width: scale(102),
        borderWidth: 1,
        marginHorizontal: moderateScale(5.5),
        backgroundColor: 'rgba(12, 64, 111, 0.05)',
        borderColor: Colors.homeCardBoxStoke,
        borderRadius: moderateScale(5),
    },
    cardMainBox: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: "center",
        marginTop: moderateScale(15),
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
        marginTop: moderateScale(10),
        marginLeft: moderateScale(8)
    },
    boardTextStyl: {
        fontSize: moderateScale(12),
        fontFamily: Fonts.InterRegular,
        color: Colors.black,
        // borderWidth:1,
        width: moderateScale(72)
    },
    rajasthanBox: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: moderateScale(8)
    },
    notificationBox: {
        width: '96%',
        paddingBottom: moderateScale(.5),
        borderWidth: 1.5,
        borderColor: 'rgba(12, 64, 111, 0.19)',
        // borderTopLeftRadius: moderateScale(10),
        // borderTopRightRadius: moderateScale(10), //
        alignSelf: 'center',
        marginTop: moderateScale(10),
        backgroundColor: "rgba(243, 245, 248, 1)",
        borderRadius: moderateScale(6)
    },
    notificationInnerBox: {
        paddingVertical: moderateScale(4),
        backgroundColor: Colors.homeNotificationInnerBgColor,
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth: 1,
        borderBottomWidth:1,
        borderColor: 'rgba(12, 64, 111, 0.19)',
        borderTopLeftRadius: moderateScale(5),
        borderTopRightRadius: moderateScale(5),
        paddingLeft: moderateScale(10)
    },
    notificationIcon: {
        width: moderateScale(25),
        height: moderateScale(25),
        resizeMode: 'contain'
    },
    boxNotification: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: moderateScale(10),
        // marginVertical: moderateScale(3),
        borderColor: 'rgba(12, 64, 111, 0.1)',
        // backgroundColor:'red'
        flex: 1,
        flexWrap: 'wrap',
        paddingVertical:moderateScale(5)
    },
    notificationdec: {
        fontSize: moderateScale(10),
        color: Colors.black,
        fontFamily: Fonts.InstrumentSansRegular,
        // width:moderateScale(300),
        paddingRight: moderateScale(10),
        // borderWidth: 1,
        flexWrap: 'wrap',
        paddingVertical: moderateScale(4)
    },
    lineMainBox: {
        flexDirection: "row",
        alignItems: "center",
        // marginTop: moderateScale(10),
        // borderWidth:1,
        marginHorizontal:moderateScale(2),
        marginBottom:moderateScale(20)
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
        marginLeft: moderateScale(9),
        marginBottom: moderateScale(10),
        // borderWidth:1
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
        // borderWidth:1
    },
    sectionTitle: {
        fontSize: moderateScale(18),
        fontFamily: Fonts.InstrumentSansMedium,
        color: Colors.black,
        marginLeft: moderateScale(9),
        // borderWidth:1,
        marginTop: moderateScale(8), // -28
        marginBottom: moderateScale(3)
    },
    sectionContainer:{
        // borderWidth:1,
        // marginBottom:moderateScale(-39)
    },
    bottomLine: {
        height: 1,
        width: '94%',
        marginHorizontal: moderateScale(10),
        backgroundColor: '#DFDFDF',
        marginVertical: moderateScale(6),
        // marginTop:moderateScale(-40)
        // marginRight:moderateScale(40)
    },
    boardItem: {
        flex: 1,
        marginHorizontal: scale(9.5),
        minHeight: verticalScale(40),
        borderRadius: moderateScale(8),
        borderWidth: 1,
        borderColor: Colors.InputStroke,
        alignItems: "center",
        // justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: scale(8),
        width: moderateScale(160),
        // marginVertical:moderateScale(0)
        marginBottom:moderateScale(-2)
    },
    mediumBox: {
        flex: 1,
        marginHorizontal: scale(6),
        minHeight: verticalScale(44),
        borderRadius: moderateScale(8),
        borderWidth: 1,
        borderColor: Colors.InputStroke,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: scale(12),
        marginBottom: moderateScale(15),
    },
    boardModalText: {
        fontSize: moderateScale(13),
        // textAlign: "center",
        fontFamily: Fonts.InstrumentSansRegular,
        color: Colors.primaryColor,
        // marginLeft:moderateScale(10),
        // borderWidth:1,
        width: moderateScale(110),
    },
     mediumModalText: {
        fontSize: moderateScale(15),
        // textAlign: "center",
        fontFamily: Fonts.InstrumentSansRegular,
        color: Colors.primaryColor
    },
    logoImg: {
        height: moderateScale(22),
        width: moderateScale(22),
        marginRight: moderateScale(10)
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
    }
})