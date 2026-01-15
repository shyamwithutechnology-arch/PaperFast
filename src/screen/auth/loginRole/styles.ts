import { StyleSheet } from "react-native"
import { Colors, Fonts } from "../../../theme"
import { moderateScale, verticalScale } from "../../../utlis/responsiveSize"

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
         backgroundColor: Colors.white
    },
    innerMainContainer: {
        flex: 1,
        backgroundColor: Colors.frameBgColor,
        borderTopLeftRadius: moderateScale(30),
        borderTopRightRadius: moderateScale(30),
        marginTop: moderateScale(-28),
    },
    innerSecondMainContainer: {
        flex: 1,
        borderTopLeftRadius: moderateScale(30),
        borderTopRightRadius: moderateScale(30),
        backgroundColor: Colors.white,
        marginTop: moderateScale(20),
    },

    loginText: {
        fontSize: moderateScale(20),
        color: Colors.black,
        marginTop: moderateScale(40),
        fontFamily: Fonts.InstrumentSansSemiBold,
        marginLeft: moderateScale(20),
    },
    subHeading: {
        fontSize: moderateScale(14),
        color: Colors.ParagraphAndShortTexts,
        fontFamily: Fonts.InterRegular,
        marginLeft: moderateScale(20),
        marginTop: moderateScale(8),
        marginBottom:moderateScale(10)
    },

    didNoteText: {
        fontSize: moderateScale(12),
        color: Colors.black,
        fontFamily: Fonts.InterRegular,
        textAlign: 'center',
        marginVertical: moderateScale(4)
    },
    buttonBox: {
        marginTop: verticalScale(40)
    },
    versionText: {
        fontSize: moderateScale(14),
        color: "#454545",
        fontFamily: Fonts.InterRegular,
        alignSelf: 'center',
        marginTop: 'auto',
        paddingVertical: moderateScale(30)
    },
    forText: {
        fontSize: moderateScale(16),
        fontFamily: Fonts.InterSemiBold,
        color: Colors.black,
        marginLeft: moderateScale(20),
        marginTop: moderateScale(10)
    },
    maleImg: {
        width: moderateScale(70),
        height: moderateScale(70),
        resizeMode: 'contain',
        // marginLeft: moderateScale(20)
    },
    selectionBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: moderateScale(20),
        marginTop: moderateScale(20),
        marginBottom: moderateScale(22)
    },
    studentText: {
        fontFamily: Fonts.InterRegular,
        fontSize: moderateScale(14),
        color: Colors.InputText,
    },
    studentBox: {
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: "center",
        // borderWidth: 1
    },
    studentImgBox:{
        borderWidth:.1,
        borderRadius:moderateScale(60),
        borderColor:Colors.InputStroke
    }
})