import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../theme";
import { moderateScale } from "../../utils/responsiveSize";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    yourPerformanceText: {
        fontSize: moderateScale(15),
        fontFamily: Fonts.InstrumentSansMedium,
        color: Colors.black,
        marginLeft: moderateScale(18),
        marginTop: moderateScale(16)
    },
    yourPerformanceText1: {
        fontSize: moderateScale(13),
        fontFamily: Fonts.InterRegular,
        color: '#6E6E6E',
        marginLeft: moderateScale(18),
        marginBottom: moderateScale(13),
        marginTop: moderateScale(2)
        // borderWidth:1
    },
    mainBox: {
        flexDirection: 'row',
        alignItems: "center",
        // flex:1,
        // justifyContent:"space-between",
        // borderWidth:1,
        // alignSelf:'center'
        marginHorizontal: moderateScale(10),
        marginTop: moderateScale(10)
    },
    attemptBox: {
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(18),
        borderRadius: moderateScale(10),
        width: '94%',
        // borderWidth: 1,
        backgroundColor: '#FBF0FF',
        flexDirection: 'row',
        marginHorizontal: moderateScale(10),
        // borderWidth: 1,
        alignItems: 'center',
        justifyContent: "space-between",
        // elevation: 1,
        shadowRadius: moderateScale(20),
        shadowColor: Colors.white,
        // borderWidth:1,
        marginBottom: moderateScale(13)
    },
    attemptImg: {
        height: moderateScale(20),
        width: moderateScale(20)
    },
    imgTextBox: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
        // paddingVertical:moderateScale(1)
        height: moderateScale(18),
        // width: moderateScale(18)
    },
    attemptImgBox: {
        height: moderateScale(40),
        width: moderateScale(40),
        borderRadius: moderateScale(40),
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: "center",
        marginRight: moderateScale(10),
        elevation: 1
    },
    attemptText: {
        fontSize: moderateScale(15),
        fontFamily: Fonts.InstrumentSansRegular,
        color: Colors?.black,
        // lineHeight:moderateScale(20)
        // verticalAlign:'middle'
    },
    attemptText1: {
        fontSize: moderateScale(20),
        fontFamily: Fonts.InstrumentSansSemiBold,
        color: '#353535',
    },



    ///////////////////////
    // Add these styles to your existing styles object

    totalTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(12),
        backgroundColor: '#F5F5F5',
        marginHorizontal: moderateScale(16),
        marginTop: moderateScale(16),
        borderRadius: moderateScale(8),
    },

    totalTimeLabel: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InstrumentSansMedium,
        color: '#666',
    },

    totalTimeValue: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InstrumentSansSemiBold,
        color: Colors.primaryColor,
    },
})