import { StyleSheet } from "react-native";
import { moderateScale } from "../../../../../utlis/responsiveSize";
import { Colors, Fonts } from "../../../../../theme";
export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: moderateScale(16),
  },

  /* TITLE CARD */
  titleBox: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(6),
    padding: moderateScale(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
    marginHorizontal:moderateScale(14)
  },

  title: {
    fontFamily: Fonts.InstrumentSansSemiBold,
    fontSize: moderateScale(16),
    color: Colors.black,
  },

  chaptName: {
    fontFamily: Fonts.InterRegular,
    fontSize: moderateScale(13),
    color: Colors.ParagraphAndShortTexts,
  },

  arrow: {
    height: moderateScale(18),
    width: moderateScale(18),
    tintColor: Colors.primaryColor,
  },

  /* CONTENT CARD */
  contentBox: {
    marginTop: moderateScale(12), // 🔥 space between title & content
    backgroundColor: Colors.white,
    borderRadius: moderateScale(7),
    padding: moderateScale(16),
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(0, 140, 227, 0.11)",
    marginHorizontal:moderateScale(10)
  },

  itemText: {
    fontFamily: Fonts.InterRegular,
    fontSize: moderateScale(14),
    color: Colors.ParagraphAndShortTexts,
    marginTop: moderateScale(8),
  },
});
