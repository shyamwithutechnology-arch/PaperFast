import { StyleSheet } from "react-native";
import { Colors } from "../../theme";
import { moderateScale, scale, verticalScale } from "../../utlis/responsiveSize";


export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(16),
  },
});
