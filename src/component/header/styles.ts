import { StyleSheet } from 'react-native'
import { moderateScale } from '../../utils/responsiveSize'
import { Colors } from '../../theme'
import { Fonts } from '../../theme/fonts'

export const styles = StyleSheet.create({
  headerImg: {
    width: '100%',
    height: moderateScale(130),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScale(13.5),
    backgroundColor: Colors.primaryColor,
  },

  side: {
    width: moderateScale(40),
  },

  centerBox: {
    flex: 1,
    alignItems: 'center',
    // borderWidth:1
  },

  title: {
    fontSize: moderateScale(22),
    fontFamily: Fonts.InstrumentSansBold,
    color: Colors.white,
  },

  subHeaderText: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.InterMedium,
    color: Colors.secondaryColor,
    textTransform: 'capitalize'
  },
  leftImg: {
    width: moderateScale(40),
    height: moderateScale(40)
  }
})

