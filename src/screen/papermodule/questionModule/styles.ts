import { StyleSheet } from "react-native";
import { moderateScale } from "../../../utils/responsiveSize";
import { Colors, Fonts } from "../../../theme";
import { scale } from "react-native-size-matters";

export const styles = StyleSheet.create({
  chackBox: {
    height: moderateScale(20),
    width: moderateScale(20),
    borderWidth: 1,
    borderColor: '#BFBFBF',
    borderRadius: moderateScale(4),
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionsText: {
    fontSize: moderateScale(12),
    color: Colors.black,
    fontFamily: Fonts.InstrumentSansMedium,
    marginLeft: moderateScale(7)
  },
  optionsSectBox: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginHorizontal: moderateScale(16),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(15),
    // borderWidth:1
  }, solutionMainBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: moderateScale(15)
  },
  filterBtn: {
    backgroundColor: Colors.lightThemeBlue,
    borderRadius: moderateScale(4),
    height: moderateScale(30),
    width: moderateScale(30),
    alignItems: "center",
    justifyContent: 'center'
  },
  filteImg: {
    height: moderateScale(20),
    width: moderateScale(20)
  },
  questionSelected: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.InstrumentSansMedium,
    color: Colors.primaryColor,
    borderBottomWidth: 1,
    marginRight: moderateScale(10)
  },
  filteMain: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center'
  },
  paginationBox: {
    paddingVertical: moderateScale(2),
    paddingHorizontal: moderateScale(2),
    borderWidth: 1,
    width: moderateScale(30),
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: moderateScale(1)
  },
  paginationText: {
    fontSize: moderateScale(12),
    color: Colors.black,
    fontFamily: Fonts.InstrumentSansMedium
  },
  diffeicultText: {
    fontSize: moderateScale(20),
    color: Colors.primaryColor,
    fontFamily: Fonts.InstrumentSansSemiBold
  },
  clearAllText: {
    fontSize: moderateScale(16),
    color: Colors.red,
    fontFamily: Fonts.InstrumentSansRegular
  },
  applyBox: {
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(16)
  },
  lineBox: {
    height: .6,
    backgroundColor: Colors?.InputStroke,
    width: '100%',
    marginVertical: moderateScale(16)
    // marginHorizontal:moderateScale(16)
  },
  diffecultyText: {
    fontSize: moderateScale(16),
    color: Colors.black,
    fontFamily: Fonts.InstrumentSansRegular,
    marginLeft: moderateScale(16)
  },
  checkBox: {
    height: moderateScale(18),
    width: moderateScale(18),
    borderWidth: 1,
    borderRadius: moderateScale(3),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white
  },
  // innerBox: {
  //   height: moderateScale(),
  //   width: moderateScale(),
  //   borderWidth: 1,
  //   borderRadius: moderateScale(3)
  // },
  easyText: {
    fontSize: moderateScale(14),
    color: Colors.black,
    fontFamily: Fonts.InstrumentSansMedium,
    marginLeft: moderateScale(11)
  },
  easyBox: {
    flexDirection: 'row',
    // justifyContent:'center',
    alignItems: "center"
  },
  checkBoxMain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    marginHorizontal: moderateScale(17),
    // borderWidth:1,
    marginTop: moderateScale(8)
  },
  difficultMainBox: {
    flexDirection: "row",
    justifyContent: "center",
    // alignItems: "center"
  },
  cancelText: {
    color: Colors?.InputText,
    fontFamily: Fonts?.InterRegular,
    fontSize: moderateScale(15)
  },
  applyText: {
    fontFamily: Fonts?.InterRegular,
    fontSize: moderateScale(15)
  },
  cancelBtn: {
    width: '46%',
    backgroundColor: 'rgba(0,0,0,.2)',
    paddingVertical: moderateScale(12.2)
  },
  applyFilterBox: {
    width: '46%',
    paddingVertical: moderateScale(12.2)

  },
  btnMain: {
    justifyContent: "space-between",
    marginHorizontal: moderateScale(16.8),
  }
})