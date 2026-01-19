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
    elevation: 1,
    marginHorizontal: moderateScale(14),
    borderColor:'rgba(0, 140, 227, 0.11)',
    borderWidth:1,
    shadowColor:''
  },

  title: {
    fontFamily: Fonts.InstrumentSansMedium,
    fontSize: moderateScale(15),
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
    padding: moderateScale(10),
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(0, 140, 227, 0.11)",
    marginHorizontal: moderateScale(10)
  },

  itemText: {
    fontFamily: Fonts.InterRegular,
    fontSize: moderateScale(12),
    color: '#2A2A2A',
    // marginTop: moderateScale(8),
    marginVertical: moderateScale(13),
    // borderWidth:1
  },
  questionSelectText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.InterSemiBold,
    color: '#2A2A2A'
  },
  mcqBox: {
    width: moderateScale(28),
    height: moderateScale(28),
    borderRadius: moderateScale(3),
    // borderWidth:1, 
    backgroundColor: 'rgba(0, 140, 227, 0.1)',
    alignItems: 'center',
    justifyContent: "center",
    marginBottom:moderateScale(10)
  },
  questionText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.InterRegular,
    color: Colors.black
  },
  powerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  baseText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.InterRegular,
    color: Colors.black,
    // lineHeight: moderateScale(14),
  },

  supText: {
    fontSize: moderateScale(10),
    fontFamily: Fonts.InterRegular,
    color: Colors.black,
    marginTop: moderateScale(-4),
  },
});
