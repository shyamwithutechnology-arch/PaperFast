import { StyleSheet } from "react-native";
import { moderateScale } from "../../../../../utlis/responsiveSize";
import { Colors, Fonts } from "../../../../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  card: {
    backgroundColor:Colors.white,
    // marginHorizontal: 14,
    // marginVertical: 8,
    padding:moderateScale(15),
    // borderRadius: 6,
    borderBottomWidth:1,
    borderColor:'rgba(12, 64, 111, 0.12)'

  },

  cardSelected: {
    backgroundColor: '#EBF6FF',
  },

  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(8),
  },

  questionText: {
    fontSize: moderateScale(12),
    color:Colors.black,
    fontFamily:Fonts.InstrumentSansMedium,
  },
  chackBox:{
    height:moderateScale(16),
    width:moderateScale(16),
    borderWidth:1,
    borderColor:'#BFBFBF',
    borderRadius:moderateScale(2),  
    alignItems:'center',
    justifyContent:'center'
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth:1,
    alignItems:'center',
    paddingRight:moderateScale(20)
  },

  optionText: {
    fontSize: moderateScale(11),
    color:Colors.black,
    fontFamily:Fonts.InstrumentSansMedium,
    // borderWidth:1,
    // marginTop:moderateScale(-10)
    // marginLeft:moderateScale(-10)
  },
});
