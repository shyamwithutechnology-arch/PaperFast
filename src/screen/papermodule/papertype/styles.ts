import { StyleSheet } from "react-native";
import { moderateScale } from "../../../utils/responsiveSize";
import { Colors, Fonts } from "../../../theme";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.white
    },
    draftBox: {
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(10),
        paddingLeft:moderateScale(15),
        backgroundColor:Colors.white,
        marginHorizontal:moderateScale(18),
        elevation:10,
        marginTop:moderateScale(30)
    },
    draftText:{
        fontSize:moderateScale(15),
        color:Colors.black,
        fontFamily:Fonts.InstrumentSansMedium,
        marginLeft:moderateScale(15)
    },
    
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
        marginTop: moderateScale(20)
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
    },
    byRegisterText: {
        fontSize: moderateScale(10),
        fontFamily: Fonts.InterRegular,
        color: Colors.ParagraphAndShortTexts,
        textAlign: 'center',
        marginTop: moderateScale(20),
    },
    phoneInput: {
        fontSize: moderateScale(15),
        fontFamily: Fonts.InterMedium,
        color: Colors.InputText,
        flex: 1,
        textAlignVertical: 'center',
    },
    prefix: {
        fontSize: moderateScale(15),
        fontFamily: Fonts.InterMedium,
        color: Colors.InputText,
    },
    phoneInputBox: {
        height: moderateScale(52),
        borderWidth: 1,
        borderColor: Colors.InputStroke,
        borderRadius: moderateScale(8),
        backgroundColor: Colors.white,
        width: "90%",
        alignSelf: 'center',
        paddingLeft: moderateScale(10),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(24)
    },
    countryImgStyle: {
        width: moderateScale(30),
        aspectRatio: 1.5,
        resizeMode: 'contain',
    },
    maskGroupImag: {
        width: moderateScale(60),
        aspectRatio: 1.5,
        resizeMode: 'contain'
    },
    privacyBox: {
        marginTop: moderateScale(18),
    },
    scrachLine: {
        width: moderateScale(1),
        height: moderateScale(35),
        backgroundColor: "rgba(12, 64, 111, 0.24)",
        marginVertical: moderateScale(10),
    },
    supportText: {
        fontSize: moderateScale(14),
        color: "#969696",
        fontFamily: Fonts.InstrumentSansSemiBold,
        alignSelf: 'flex-start'
    },
    supportNumberText: {
        fontSize: moderateScale(22),
        color: "#3B3B3B",
        fontFamily: Fonts.InterSemiBold,
    },
    plusImg: {
        height: moderateScale(25),
        width: moderateScale(25),
        resizeMode: 'contain',
        marginLeft: moderateScale(-6)
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
    }
})