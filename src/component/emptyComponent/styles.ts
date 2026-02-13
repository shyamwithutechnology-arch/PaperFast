import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../theme";
import { moderateScale } from "../../utils/responsiveSize";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.white,
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontSize:moderateScale(14),
        color:Colors.black,
        fontFamily:Fonts.InterMedium
    }
})