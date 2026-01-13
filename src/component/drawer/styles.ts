import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../theme";
import { moderateScale } from "../../utlis/responsiveSize";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // marginBottom: 'auto'
  },
  menuScrollContent: {
    paddingBottom: moderateScale(20), // allows last item fully visible
    marginTop:moderateScale(-32),
    // borderWidth:1/
  },
  profileBox: {
    alignItems: 'center',
    backgroundColor: Colors.lightThemeBlue,
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(18),
    width: '100%',
    // marginTop: moderateScale(20),
    paddingVertical: moderateScale(4)
  },

  menuContainer: {
    flex: 1, // fills middle space
  },
  avatar: {
    width: moderateScale(160),
    height: moderateScale(100),
    // marginBottom: moderateScale(10),
  },
  name: {
    fontFamily: Fonts.InterBold,
    fontSize: moderateScale(16),
    color: Colors.primaryColor,
  },
  role: {
    fontFamily: Fonts.InterRegular,
    fontSize: moderateScale(14),
    color: Colors.gray,
  },

  menuItem: {
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(20),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: moderateScale(3),
    // backgroundColor:'#000',
    // borderWidth:1
  },

  menuText: {
    fontFamily: Fonts.InstrumentSansMedium,
    fontSize: moderateScale(15),
    color: Colors.blackThird,
    marginLeft: moderateScale(20)
  },

  footer: {
    // padding: moderateScale(20),
    // borderTopWidth: 0.5,
    // borderColor: '#ddd',
    paddingVertical: moderateScale(20),

  },

  supportText: {
    fontFamily: Fonts.InterSemiBold,
    fontSize: moderateScale(14),
    color: Colors.primaryColor,
  },

  phone: {
    fontFamily: Fonts.InterRegular,
    fontSize: moderateScale(13),
    marginTop: moderateScale(5),
  },
  iconBox: {
    height: moderateScale(40),
    width: moderateScale(40),
    // borderWidth:1,
    borderRadius: moderateScale(50),
    backgroundColor: 'rgba(1, 54, 105, 0.13)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSty: {
    height: moderateScale(22),
    width: moderateScale(22),
    borderRadius: moderateScale(30)
  },
  nextSty: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  cancelButton: {
    height: moderateScale(31),
    width: moderateScale(31),
    backgroundColor: Colors.primaryColor,
    borderRadius: moderateScale(30),
    alignItems: 'center',
    justifyContent: "center",
    marginTop: moderateScale(-40)
  },
  logoutSty: {
    height: moderateScale(50),
    width: moderateScale(50),
    marginLeft: moderateScale(31),
    // marginTop:moderateScale(-30)
  },
  logoutText: {
    fontSize: moderateScale(15),
    fontFamily: Fonts.InstrumentSansMedium,
    color: '#272727',
    marginLeft: moderateScale(18)
  },
  logOutMainBox: {
    flexDirection: 'row',
    alignItems: "center",
    marginTop: moderateScale(14),
    // borderWidth:1
  },

  ///////
  mainMaskView: {
    backgroundColor: "rgba(12, 64, 111, 0.07)",
    paddingVertical: moderateScale(10),
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: moderateScale(18),
    marginBottom: moderateScale(30),
    // marginBottom:'auto',
    // borderWidth: 1
  },
  havingText: {
    color: Colors.ParagraphAndShortTexts,
    fontFamily: Fonts.InterRegular,
  }
  ,
  supportBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: moderateScale(14),
  },
  numberTextBox: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth:1,
    // alignSelf: 'flex-start'
  },
  maskGroupImag: {
    width: moderateScale(60),
    aspectRatio: 1.5,
    resizeMode: 'contain'

  },

  plusImg: {
    height: moderateScale(25),
    width: moderateScale(25),
    resizeMode: 'contain',
    marginLeft: moderateScale(-6)
  },
  supportNumberText: {
    fontSize: moderateScale(22),
    color: "#3B3B3B",
    fontFamily: Fonts.InterSemiBold,
    // alignSelf: 'flex-start'
  },
  scrachLine: {
    width: moderateScale(1),
    height: moderateScale(35),
    backgroundColor: "rgba(12, 64, 111, 0.24)",
    marginVertical: moderateScale(10),
  },



  ////
  roleSwitch: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: moderateScale(20),
    alignItems:'center',
    // padding: moderateScale(3),
    borderWidth:1
  },

  roleItem: {
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(16),
    backgroundColor: '#EEEDED'
  },

  roleActive: {
    backgroundColor: Colors.primaryColor,
  },

  roleText: {
    fontFamily: Fonts.InterMedium,
    fontSize: moderateScale(12),
    color: "#9A9A9A",
  },

  roleTextActive: {
    color: Colors.white,
    fontFamily: Fonts.InstrumentSansRegular,
    fontSize: moderateScale(13)

  },

  ///////
   container1: {
    flexDirection: 'row',
    backgroundColor: '#EEF1F5', // light grey background
    borderRadius: moderateScale(20),
    // padding: moderateScale(3),
    // borderWidth:1
  },

  button: {
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(13),
    borderRadius: moderateScale(16),
    // borderWidth:1
  },

  active: {
    backgroundColor: '#124682', // primary blue
  },

  text: {
    fontSize: moderateScale(13),
    color: '#9A9A9A',
    fontWeight: '500',
  },

  activeText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
