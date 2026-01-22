import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../../theme";
import { moderateScale } from "../../../../utils/responsiveSize";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: moderateScale(12),
    marginHorizontal: moderateScale(40),
    marginVertical: moderateScale(30)
  },

  box: {
    width: moderateScale(52),
    height: moderateScale(52),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: Colors.InputStroke,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },

  activeBox: {
    borderColor: Colors.primaryColor,
  },

  text: {
    fontSize: moderateScale(22),
    fontFamily: Fonts.InterSemiBold,
    color: Colors.black,
  },

  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    fontSize: 1,
    borderWidth:1,
    borderColor:'red'
  },
});
