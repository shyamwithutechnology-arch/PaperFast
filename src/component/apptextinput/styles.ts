import { StyleSheet } from "react-native"
import { Colors, Fonts } from "../../theme"
import { moderateScale } from "../../utils/responsiveSize";

 export const styles = StyleSheet.create({
  wrapper: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.InputStroke,
    borderRadius: moderateScale(8),
    backgroundColor: Colors.white,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(14),
  },
  iconLeft: {
    marginRight: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRight: {
    marginLeft: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontSize: moderateScale(14),
    fontFamily: Fonts.InterRegular,
    color: Colors.InputText,
    padding: 0,               // remove default padding so wrapper controls spacing
    textAlignVertical: 'center',
  },
});
