// import { StyleSheet } from "react-native";
// import { Colors } from "../../theme/color";
// import { moderateScale } from "../../utlis/responsiveSize";
// import { Fonts } from "../../theme/fonts";

// export const styles = StyleSheet.create({
//   button: {
//     width: "90%",
//     backgroundColor: Colors.primaryColor, 
//     paddingVertical: moderateScale(14),
//     borderRadius: moderateScale(50),
//     alignItems: "center",
//     justifyContent: "center",
//     elevation: 4, 
//     alignSelf:'center',
//   },
//   text: {
//     color: Colors.white,
//     fontSize: moderateScale(16),
//     fontFamily: Fonts.InterSemiBold,
//   },
//   disabled: {
//     opacity: 0.6,
//   },
// });


import { StyleSheet } from "react-native";
import { Colors } from "../../theme/color";
import { moderateScale } from "../../utils/responsiveSize";
import { Fonts } from "../../theme/fonts";

export const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(24),
    borderRadius: moderateScale(50),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  
    // marginTop:moderateScale(-250)
  },
  text: {
    color: Colors.white,
    fontSize: moderateScale(16),
    fontFamily: Fonts.InterSemiBold,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
});
