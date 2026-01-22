import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Colors, Fonts } from "../../theme";
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
        color:'#414141',
        fontFamily:Fonts.InterRegular,
        marginLeft:moderateScale(15),
        marginTop:moderateScale(20)
    }
})