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
                style={[styles.leftImg, leftIconStyle]} 
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
