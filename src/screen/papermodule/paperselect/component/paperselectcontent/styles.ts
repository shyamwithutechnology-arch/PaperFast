import { StyleSheet } from "react-native";
import { moderateScale } from "../../../../../utils/responsiveSize";
import { Colors, Fonts } from "../../../../../theme";
export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: moderateScale(9),
  },

  titleBox: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(6),
    paddingHorizontal:moderateScale(13),
    paddingVertical:moderateScale(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // elevation: 1,
    marginHorizontal: moderateScale(14),
    // borderColor: 'rgba(0, 140, 227, 0.11)',
    // shadowColor: ''

    // iOS Shadow
    shadowColor: 'rgba(0, 140, 227, .9)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(300),

    // Android Shadow
    elevation: 30,
    borderWidth: .7,
    borderColor: Colors?.InputStroke,
    borderTopWidth: .5,
  },

  title: {
    fontFamily: Fonts.InstrumentSansBold,
    fontSize: moderateScale(13),
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
    marginHorizontal: moderateScale(14),

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
    // width: moderateScale(28),
    // height: moderateScale(28),
    // borderRadius: moderateScale(3),
    // // borderWidth:1, 
    // backgroundColor: 'rgba(0, 140, 227, 0.1)',
    // alignItems: 'center',
    // justifyContent: "center",
    // marginBottom:moderateScale(10),
    flexDirection: 'row',
    flexWrap: 'wrap',           // ✅ makes row responsive
    // alignItems: 'center',
    marginTop: moderateScale(6),
    gap: moderateScale(8),
    // paddingHorizontal:moderateScale(10),
    // borderWidth:1
  },

  questionText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.InterRegular,
    color: Colors.black
  },
  powerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    //    flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: '#EBF6FF',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(4),
    // width: moderateScale(28),
    // height: moderateScale(28),
    // borderWidth:1,
    elevation: 1

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
