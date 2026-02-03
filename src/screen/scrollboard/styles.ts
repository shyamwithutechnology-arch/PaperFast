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
        marginTop:moderateScale(16)
    },
    yourPerformanceText1: {
        fontSize: moderateScale(13),
        fontFamily: Fonts.InterRegular,
        color: '#6E6E6E',
        marginLeft: moderateScale(18),
        marginBottom: moderateScale(5),
        marginTop:moderateScale(2)
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
        // paddingHorizontal: moderateScale(10),
        paddingVertical: moderateScale(15),
        borderRadius: moderateScale(5),
        width: '46.5%',
        // borderWidth: 1,
        backgroundColor: '#FBF0FF',
        flexDirection: 'row',
        marginHorizontal: moderateScale(6),

    },
    attemptImg: {
        height: moderateScale(20),
        width: moderateScale(20)
    },
    attemptImgBox: {
        height: moderateScale(48),
        width: moderateScale(48),
        borderRadius: moderateScale(40),
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: "center",
        borderColor: '#000',
        borderWidth: 1
        , marginHorizontal: moderateScale(10)
    },
    attemptText: {
        fontSize: moderateScale(11),
        fontFamily: Fonts.InstrumentSansRegular,
        color: Colors?.black,
    },
    attemptText1: {
        fontSize: moderateScale(24),
        fontFamily: Fonts.InstrumentSansSemiBold,
        color: Colors?.black,
    }
})