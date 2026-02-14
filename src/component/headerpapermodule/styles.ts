import { StyleSheet } from "react-native";
import { moderateScale } from "../../utils/responsiveSize";
import { Colors, Fonts } from "../../theme";

export const styles = StyleSheet.create({
    headerContainer: {
        paddingVertical: moderateScale(16),
        paddingHorizontal: moderateScale(12),
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: Colors.lightThemeBlue,
        justifyContent:"space-between",
        // borderWidth:1
    },
    title: {
        fontSize: moderateScale(15),
        color: Colors.black,
        fontFamily: Fonts.InstrumentSansMedium,
        // borderWidth:1,
        // width:moderateScale(300)
        // marginLeft: moderateScale(5)
        // paddingRight:moderateScale(8)
    },

    saveDraftText:{
        fontFamily:Fonts.InstrumentSansMedium,
        color:Colors.white,
        fontSize:moderateScale(11)
    },
    saveDraftBox:{
        paddingVertical:moderateScale(5),
        paddingHorizontal:moderateScale(8),
        borderWidth:1,
        borderRadius:moderateScale(5),
        borderColor:Colors.primaryColor
    },
    generatePdftBox:{
        paddingVertical:moderateScale(6),
        paddingHorizontal:moderateScale(8),
        // borderWidth:1,
        borderRadius:moderateScale(5),
        backgroundColor:Colors.primaryColor
    },
    backImg:{
        width:moderateScale(20),
        height:moderateScale(20),
    },
})