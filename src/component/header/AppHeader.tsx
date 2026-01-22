// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, Platform, StatusBar } from 'react-native';
// import { styles } from "../header/styles";
// import { moderateScale } from "../../utlis/responsiveSize";
// import { Colors } from '../../theme';

// interface AppHeaderProps {
//     title: string;
//     onBackPress?: () => void;
//     rightText?: string;
//     onRightPress?: () => void;
//     leftIcon: React.ReactNode;
//     rightIcon: React.ReactNode;
//     discriptionText: string

// }

// const AppHeader: React.FC<AppHeaderProps> = ({
//     title,
//     onBackPress,
//     rightText,
//     rightIcon,
//     onRightPress,
//     leftIcon,
//     discriptionText
// }) => {
//     return (
//         <ImageBackground source={require('../../assets/images/headerBg.png')} style={styles.headerImg} >
//             {/* <View style={styles.overlay}> */}
//             <StatusBar barStyle={'dark-content'} backgroundColor={Colors.primaryColor}  />
//             {/* Left */}
//             <View style={styles.side}>
//                 {onBackPress && (
//                     <TouchableOpacity onPress={onBackPress}>
//                         <Image source={leftIcon} style={{ height: moderateScale(40), width: moderateScale(40) }} />
//                     </TouchableOpacity>
//                 )}
//             </View>

//             {/* Center */}
//             <View style={styles.centeBox}>
//                 <Text style={styles.title}>{title}</Text>
//                 {/* <Text style={styles.subHeaderText}>Paper Generate In Minute</Text> */}
//                 <Text style={styles.subHeaderText}>{discriptionText}</Text>
//             </View>

//             {/* Right */}
//             <View style={styles.side}>
//                 {rightText && (
//                     <TouchableOpacity onPress={onRightPress}>
//                         <Text style={styles.rightText}>{rightText}</Text>
//                     </TouchableOpacity>
//                 )}
//                 {
//                     rightIcon && (
//                         <TouchableOpacity onPress={onRightPress}>
//                             <Image source={rightIcon} style={{ height: moderateScale(40), width: moderateScale(40) }} />
//                         </TouchableOpacity>
//                     )
//                 }
//             </View>
//             {/* </View> */}
//         </ImageBackground>
//     );
// };

// export default AppHeader;


// //// <View style={styles.side}>
// //   {onBackPress && (
// //     <TouchableOpacity onPress={onBackPress}>
// //       {leftIcon}
// //     </TouchableOpacity>
// //   )}
// // </View>


import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StatusBar,
  Platform,
} from 'react-native'
import { styles } from './styles'
import { moderateScale } from '../../utils/responsiveSize'
import { Colors } from '../../theme'

interface AppHeaderProps {
  title: string
  discriptionText: string
  onBackPress?: () => void
  leftIcon?: any
  rightIcon?: any
  onRightPress?: () => void,
  leftIconStyle: Object
}

const STATUS_BAR_HEIGHT =
  Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  discriptionText,
  onBackPress,
  leftIcon,
  rightIcon,
  onRightPress,
  leftIconStyle,
}) => {
  return (
    <>
      {/* STATUS BAR */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* HEADER */}
      <ImageBackground
        source={require('../../assets/images/headerBg.png')}
        style={[styles.headerImg, { paddingTop: STATUS_BAR_HEIGHT }]}
        resizeMode="cover"
      >
        {/* LEFT */}
        <View style={styles.side}>
          {onBackPress && leftIcon && (
            <TouchableOpacity onPress={onBackPress}>
              <Image
                source={leftIcon}
                style={[styles.leftImg, leftIconStyle]} // If leftIconStyle is array
              />
            </TouchableOpacity>
          )}
        </View>

        {/* CENTER */}
        <View style={styles.centerBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subHeaderText}>{discriptionText}</Text>
        </View>

        {/* RIGHT */}
        <View style={styles.side}>
          {rightIcon && (
            <TouchableOpacity onPress={onRightPress}>
              <Image
                source={rightIcon}
                style={{ width: moderateScale(40), height: moderateScale(40) }}
              />
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </>
  )
}

export default AppHeader
