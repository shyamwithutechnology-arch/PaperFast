import { StyleSheet } from "react-native";
import { moderateScale } from "../../utils/responsiveSize";
import { Colors, Fonts } from "../../theme";

export const styles = StyleSheet.create({
    headerContainer: {
        paddingVertical: moderateScale(16),
        paddingHorizontal: moderateScale(16),
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: Colors.lightThemeBlue,
        justifyContent:"space-between",
        
    },
    title: {
        fontSize: moderateScale(15),
        color: Colors.black,
        fontFamily: Fonts.InstrumentSansMedium,
        marginLeft: moderateScale(15)
        // paddingRight:moderateScale(8)
    },
    saveDraftText:{
        fontFamily:Fonts.InstrumentSansMedium,
        color:Colors.white,
        fontSize:moderateScale(12)
    },
    saveDraftBox:{
        paddingVertical:moderateScale(6),
        paddingHorizontal:moderateScale(8),
        // borderWidth:1,
        borderRadius:moderateScale(5),
        backgroundColor:Colors.primaryColor
    }
})