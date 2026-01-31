
import { StyleSheet } from "react-native"
import { Colors, Fonts } from "../../../../theme";
import { moderateScale, scale, verticalScale } from "../../../../utils/responsiveSize";
export const styles = StyleSheet.create({
  mainBox: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: moderateScale(16.5),
    // borderWidth:1
  },
  card: {
    backgroundColor: '#D4EEFF',
    borderRadius: moderateScale(10),
    // padding: moderateScale(16),
    width: moderateScale(162),
    paddingHorizontal: moderateScale(12),
    marginHorizontal: moderateScale(4.8),
    paddingVertical: moderateScale(12),
    height: moderateScale(150),
    shadowColor: '#1E90FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
    // borderWidth:1

  },

  icon: {
    width: moderateScale(31),
    height: moderateScale(31),
    // marginBottom: moderateScale(10),
  },

  title: {
    fontSize: moderateScale(15),
    fontFamily: Fonts.InstrumentSansMedium,
    color: Colors.black,
    marginTop:moderateScale(10)
  },

  subtitle: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.InterRegular,
    color: '#797979',
    marginTop: moderateScale(4),
  },

  arrowButton: {
    position: 'absolute',
    alignSelf: "flex-end",
    bottom: moderateScale(10),
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(18),
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(5)
  },

  arrowIcon: {
    width: moderateScale(13),
    height: moderateScale(13),
    tintColor: Colors.white,
  },
  imgeCurcel:{
    height:moderateScale(55),
    width:moderateScale(55),
    // borderWidth:1,
    borderRadius:moderateScale(50),
    alignItems:"center",
    justifyContent:'center',
    backgroundColor:Colors?.white
  },
  paperBannerImg:{
    height:verticalScale(150),
    width:'100%',
    resizeMode:"contain",
    alignSelf:'center'
  },
  bannerBox:{
    height:verticalScale(151),
    // borderWidth:1,
    marginHorizontal:moderateScale(16),
    marginTop:moderateScale(15)
    // alignSelf:"center"
  }
});
