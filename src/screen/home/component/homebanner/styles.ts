import { StyleSheet } from "react-native";
import { moderateScale } from "../../../../utils/responsiveSize";

export const styles = StyleSheet.create({
  container: {
        marginTop: moderateScale(15),
  },
  imageWrapper: {
    flex: 1,
    overflow: 'hidden', 
    marginHorizontal:moderateScale(2)
  },
  image: {
    width: '100%',
    height: '100%',
  },
//   dot: {
//     backgroundColor: '#D0D5DD',
//   },
//   activeDot: {
//     backgroundColor: '#0C406F',
//   },
});
