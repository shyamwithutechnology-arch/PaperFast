// // components/Loader.js
// import React from 'react';
// import {
//   View,
//   ActivityIndicator,
//   StyleSheet,
//   Modal,
//   Text,
//   Platform, // Added Platform import
// } from 'react-native';

// const Loader = ({visible = false, message = 'Loading...', color = '#FF6347'}) => {
//   console.log('messagesss',message);
  
//   return (
//     <Modal transparent visible={visible} animationType="fade" >
//       <View style={styles.container}>
//         <View style={styles.loaderBox}>
//           {/* <ActivityIndicator size="large" color={color} /> */}

//           {message && <Text style={styles.message}>{message}</Text>}
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loaderBox: {
//     backgroundColor: 'white',
//     padding: 30,
//     borderRadius: 15,
//     alignItems: 'center',
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: {width: 0, height: 2},
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
//   message: {
//     marginTop: 15,
//     fontSize: 16,
//     color: '#333',
//     fontWeight: '500',
//   },
// });

// export default Loader;

// components/Loader.js
import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Platform,
  Image,
  Animated,
  Easing,
} from 'react-native';
import {Images} from "../../assets/images";
import { moderateScale } from '../../utils/responsiveSize';

const Loader = ({ visible = false, message = 'Loading...' }) => {

  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 900, // speed of rotation
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    if (visible) {
      spin.start();
    }

    return () => spin.stop();
  }, [visible]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.container}>
          <Animated.Image
            source={Images?.loader} 
            style={{
              width: moderateScale(50),
              height: moderateScale(50),
              transform: [{ rotate }],
            }}
            resizeMode="contain"
          />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.50)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBox: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  message: {
    marginTop: 15,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default Loader;
