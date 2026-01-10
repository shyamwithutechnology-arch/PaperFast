import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "../../../../utlis/responsiveSize";
import { Colors, Fonts } from "../../../../theme";

export const styles = StyleSheet.create({
      lineMainBox: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: moderateScale(12),
    },

    lineCenterWrapper: {
        flex: 1,
        alignItems: "center",
    },

    lineBox: {
        height: moderateScale(4),
        width: "50%",
        backgroundColor: Colors.ParagraphAndShortTexts,
        borderRadius: moderateScale(10),
    },

    cancleBox: {
        width: moderateScale(30),
        height: moderateScale(30),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: moderateScale(20),
        // borderWidth:1
    },

    cancleIcon: {
        width: moderateScale(13),
        height: moderateScale(13),
    },
    selectModal: {
        fontSize: moderateScale(18),
        fontFamily: Fonts.InstrumentSansMedium,
        color: Colors.black,
        marginTop:moderateScale(10)
    },
    selectStanBox: {
        paddingHorizontal: scale(14),
        paddingVertical: verticalScale(10),
        borderWidth:1,
        alignItems:"center",
        justifyContent:"center"
    },
    bordItemBox:{
        flexDirection:'row',
        alignItems:'center',
        borderWidth:1,
        justifyContent:'space-between'
    },
    boardItemText:{
        fontSize:moderateScale(15),
        fontFamily:Fonts.InstrumentSansRegular,
        color:Colors.InputText
    }
})