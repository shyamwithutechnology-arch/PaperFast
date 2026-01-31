import { StyleSheet } from "react-native";
import { moderateScale } from "../../../utils/responsiveSize";
import { Colors, Fonts } from "../../../theme";
import { scale } from "react-native-size-matters";

export const styles = StyleSheet.create({
    draftBox: {
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(10),
        paddingLeft: moderateScale(15),
        backgroundColor: Colors.white,
        marginHorizontal: moderateScale(18),
        elevation: 10,
        marginTop: moderateScale(30)
    },
    draftText: {
        fontSize: moderateScale(15),
        color: Colors.black,
        fontFamily: Fonts.InstrumentSansMedium,
        marginLeft: moderateScale(15)
    },
    // selectBtnText:{
    //     fontFamily:Fonts.InstrumentSansMedium,
    //     fontSize:moderateScale(12),
    //         color:'#000'
    // },
    // selectBtnBox:{
    //     width:moderateScale(80),
    //     borderWidth:1,
    //     height:moderateScale(35),
    //     alignItems:'center',
    //     justifyContent:"center",
    //     borderRadius:moderateScale(6),
    //     flexDirection:"row",
    //     // borderEndWidth:1
    // },
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',          // 🔥 moves to next line if space ends
        gap: moderateScale(10),    // RN 0.71+ supported
        marginLeft: moderateScale(15),
        marginVertical: moderateScale(20)
    },

    selectBtnBox: {
        paddingVertical: moderateScale(4),
        paddingHorizontal: moderateScale(10),
        borderRadius: moderateScale(5),
        backgroundColor: Colors.primaryColor,
        borderWidth: 1,
    },

    selectBtnText: {
        fontSize: moderateScale(14),
        color: Colors.white,
        fontFamily: Fonts.InterMedium,
    },
    marksTotel: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InterSemiBold,
        color: Colors.InputText
    },
    // exportBox:{
    //     paddingHorizontal:moderateScale(13),
    //     paddingVertical:moderateScale(5),
    //     borderWidth:1
    // },
    // exportText:{
    // fontSize:moderateScale(12),
    // fontFamily:Fonts.InstrumentSansMedium,
    // color:Colors.white
    // },
    // totalMainBox:{
    //     flexDirection:'row',
    //     justifyContent:'space-between',
    //     alignItems:'center',
    //     // marginHorizontal:moderateScale(15),
    //     // borderWidth:1,
    //     paddingVertical:moderateScale(10),
    //     paddingHorizontal:moderateScale(15),
    //     backgroundColor:'#FBFBFB',
    //     elevation:1
    // },

    // top shadow add
    totalWrapper: {
        backgroundColor: "#FBFBFB",
    },

    topShadow: {
        height: 3,
        backgroundColor: Colors.InputText,
        opacity: 0.08,
    },

    totalMainBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(15),
        backgroundColor: "#FBFBFB",

        // iOS smooth shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
        
    },

    exportBox: {
        paddingHorizontal: moderateScale(8),
        paddingVertical: moderateScale(7),
        backgroundColor: Colors.primaryColor,
        borderRadius: moderateScale(6),
        flexDirection: "row",
        alignItems: "center",
    },

    exportText: {
        fontSize: moderateScale(12),
        fontFamily: Fonts.InstrumentSansMedium,
        color: Colors.white,
        marginRight:moderateScale(10)
    },


})