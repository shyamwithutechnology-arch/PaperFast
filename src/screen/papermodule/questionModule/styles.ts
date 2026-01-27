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
  questionSelected: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.InstrumentSansMedium,
    color: Colors.primaryColor,
    borderBottomWidth: 1,
    marginRight: moderateScale(10)
  },
  paginationBox: {
    paddingVertical: moderateScale(2),
    paddingHorizontal: moderateScale(2),
    borderWidth: 1,
    width: moderateScale(30),
    alignItems: 'center',
    justifyContent: "center",
    borderRadius:moderateScale(1)
  },
  paginationText: {
    fontSize: moderateScale(12),
    color: Colors.black,
    fontFamily: Fonts.InstrumentSansMedium
  }

})