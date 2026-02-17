import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../theme";
import { moderateScale } from "../../utils/responsiveSize";

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
        marginTop: moderateScale(4),
        marginBottom: moderateScale(16)
    },
    inputBox: {
        height: moderateScale(52),
        borderWidth: 1,
        borderColor: Colors.InputStroke,
        borderRadius: moderateScale(8),
        backgroundColor: Colors.white,
        width: "90%",
        alignSelf: 'center',
        paddingHorizontal: moderateScale(12),
        justifyContent: 'center',
    },
    textInput: {
        fontSize: moderateScale(15),
        fontFamily: Fonts.InterMedium,
        color: Colors.InputText,
        flex: 1,
    },
    errorText: {
        fontSize: moderateScale(12),
        color: Colors.red,
        marginLeft: moderateScale(20),
        marginTop: moderateScale(2)
    },
    submitButton: {
        paddingHorizontal: moderateScale(133),
        marginTop: moderateScale(20),
        alignSelf: 'center',
        width: '90%',
    },
    supportContainer: {
        marginTop: 'auto',
        paddingTop: moderateScale(30),
    },
    scrachLine: {
        width: moderateScale(1),
        height: moderateScale(35),
        backgroundColor: "rgba(12, 64, 111, 0.24)",
        alignSelf: 'center',
        marginVertical: moderateScale(10),
    },
    supportBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: moderateScale(14),
        marginBottom: moderateScale(15),
    },
    supportIcon: {
        width: moderateScale(25),
        height: moderateScale(25),
        resizeMode: 'contain',
        marginRight: moderateScale(8),
    },
    // numberTextBox: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     flexWrap: 'wrap',
    //     },
    plusImg: {
        height: moderateScale(25),
        width: moderateScale(25),
        resizeMode: 'contain',
        marginLeft: moderateScale(-6)
    },
    supportText: {
        fontSize: moderateScale(14),
        color: "#969696",
        fontFamily: Fonts.InstrumentSansSemiBold,
    },
    supportNumberText: {
        fontSize: moderateScale(18),
        color: "#3B3B3B",
        fontFamily: Fonts.InterSemiBold,
    },
    bottomNavContainer: {
        width: '100%',
    },
    mainMaskView: {
        backgroundColor: "rgba(12, 64, 111, 0.07)",
        paddingVertical: moderateScale(10),
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: moderateScale(50),
        marginTop: 'auto'
    },
    havingText: {
        color: Colors.ParagraphAndShortTexts,
        fontFamily: Fonts.InterRegular,
    },
    supportBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: moderateScale(14),
        // borderWidth:1
    },
    numberTextBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    versionText: {
        fontSize: moderateScale(14),
        color: "#454545",
        fontFamily: Fonts.InterRegular,
        alignSelf: 'center',
        marginVertical: moderateScale(10)
    },

    // ???????????????? bottom
  maskGroupImag: {
    width: moderateScale(60),
    aspectRatio: 1.5,
    resizeMode: 'contain'
  }
});