
import { StyleSheet } from "react-native"
import { Colors, Fonts } from "../../../../theme";
import { moderateScale } from "../../../../utils/responsiveSize";
export const styles = StyleSheet.create({
  mainBox: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: moderateScale(15)
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(10),
    // padding: moderateScale(16),
    width: moderateScale(162),
    paddingHorizontal: moderateScale(8),
    marginHorizontal: moderateScale(5),
    paddingVertical: moderateScale(20),
    height: moderateScale(150),
    shadowColor: '#1E90FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    // borderWidth:1

  },

  icon: {
    width: moderateScale(50),
    height: moderateScale(50),
    marginBottom: moderateScale(10),
  },

  title: {
    fontSize: moderateScale(15),
    fontFamily: Fonts.InstrumentSansMedium,
    color: Colors.black,
  },

  subtitle: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.InterRegular,
    color: Colors.ParagraphAndShortTexts,
    marginTop: moderateScale(4),
  },

  arrowButton: {
    position: 'absolute',
    alignSelf: "flex-end",
    bottom: moderateScale(10),
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(18),
    backgroundColor: Colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(5)
  },

  arrowIcon: {
    width: moderateScale(13),
    height: moderateScale(13),
    tintColor: Colors.white,
  },
});
