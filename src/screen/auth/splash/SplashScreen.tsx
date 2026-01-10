import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { styles } from './styles';
import { Images } from '../../../assets/images';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const SplashScreen = () => {
  // Swipe from left & right
  //   const topAnim = useRef(new Animated.Value(-width)).current;
  //   const bottomAnim = useRef(new Animated.Value(width)).current;

  const SWIPE_OFFSET = 120; // 👈 yahan control karo size

  const topAnim = useRef(new Animated.Value(-SWIPE_OFFSET)).current;
  const bottomAnim = useRef(new Animated.Value(SWIPE_OFFSET)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(topAnim, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(bottomAnim, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      {/* Background */}
      <Image
        source={Images.BgSplashImg}
        style={styles.background}
      />

      {/* Top Layer – swipe from LEFT */}
      <Animated.Image
        source={Images.topLayer}
        style={[
          styles.topLayer,
          {
            transform: [{ translateX: topAnim }],
          },
        ]}
      />

      {/* Bottom Layer – swipe from RIGHT */}
      <Animated.Image
        source={Images.bottomLayer}
        style={[
          styles.bottomLayer,
          {
            transform: [{ translateX: bottomAnim }],
          },
        ]}
      />

      {/* Logo (static) */}
      <Image
        source={Images.logo}
        style={styles.logo}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;
