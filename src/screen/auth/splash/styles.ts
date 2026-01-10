import {
  View,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { Colors } from '../../../theme';

const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white, // fallback
  },
  background: {
    position: 'absolute',
    width,
    height,
    resizeMode: 'cover',
  },
  topLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.30,
    height: width * 0.30,
    // width: width * 0.55,
    // height: width * 0.55,
    resizeMode: 'contain',
  },
  bottomLayer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: width * 0.3,
    height: width * 0.3,
    // width: width * 0.6,
    // height: width * 0.6,
    resizeMode: 'contain',
  },
  logo: {
    width: width * 0.68,
    height: width * 0.42,
    // width: width * 0.55,
    // height: width * 0.35,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: height * 0.35,
  },
});
