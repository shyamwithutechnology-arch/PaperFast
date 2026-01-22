// import { Platform, StatusBar, StyleSheet } from 'react-native';
// import { moderateScale } from '../../utlis/responsiveSize';
// import { Colors } from '../../theme/color';
// import { Fonts } from '../../theme/fonts';


// const STATUS_BAR_HEIGHT =
//     Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;

// export const styles = StyleSheet.create({
//     // container: {
//     //     width: '100%',
//     //     height: moderateScale(130), 
//     // },
//     headerImg: {
//         width: "100%",
//         height: moderateScale(160),
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: moderateScale(16),
//         backgroundColor: Colors.primaryColor,
//         elevation: 4,
//         paddingBottom: moderateScale(30),
//     },
//     overlay: {
//         flex: 1,
//         backgroundColor: Colors.primaryColor ,
//         // CC = opacity (80%)
//     },
//     side: {
//         width: moderateScale(40),
//     },
//     title: {
//         textAlign: 'center',
//         fontSize: moderateScale(22),
//         fontFamily: Fonts.InstrumentSansBold,
//         color: Colors.white,
//     },
//     subHeaderText: {
//         textAlign: 'center',
//         fontSize: moderateScale(13),
//         fontFamily: Fonts.InterMedium,
//         color: Colors.secondaryColor,
//     },
//     centeBox: {
//         flex: 1,
//         // flexDirection: 'column',
//         alignItems: 'center',
//     },
//     sideText: {
//         fontSize: moderateScale(28),
//         color: '#2563EB',
//     },
//     rightText: {
//         fontSize: moderateScale(14),
//         color: '#2563EB',
//         fontWeight: '500',
//     },
// });

import { StyleSheet } from 'react-native'
import { moderateScale } from '../../utils/responsiveSize'
import { Colors } from '../../theme'
import { Fonts } from '../../theme/fonts'

export const styles = StyleSheet.create({
  headerImg: {
    width: '100%',
    height: moderateScale(160),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScale(20),
    backgroundColor: Colors.primaryColor,
  },

  side: {
    width: moderateScale(40),
  },

  centerBox: {
    flex: 1,
    alignItems: 'center',
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
  },
  leftImg:{
     width: moderateScale(40),
      height: moderateScale(40)
  }
})

