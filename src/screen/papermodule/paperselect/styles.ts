import { StyleSheet } from "react-native";
import { moderateScale } from "../../../utlis/responsiveSize";
import { Colors, Fonts } from "../../../theme";
import { scale } from "react-native-size-matters";

export const styles = StyleSheet.create({
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
    selectBtnText:{
        fontFamily:Fonts.InstrumentSansMedium,
        fontSize:moderateScale(12),
            color:'#000'
    },
    selectBtnBox:{
        width:moderateScale(80),
        borderWidth:1,
        height:moderateScale(35),
        alignItems:'center',
        justifyContent:"center",
        borderRadius:moderateScale(6),
        // flexDirection:"row"
    }
})