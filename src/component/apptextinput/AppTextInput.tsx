import React from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  ViewStyle,
  Image,
} from 'react-native';
import { moderateScale } from '../../utils/responsiveSize';
import { Colors, Fonts } from '../../theme';
import { styles } from './styles'

interface AppTextInputProps {
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  value?: string,
  onChangeText: () => void;
  style: object,
  placeHolderText: string
  keyboardTypeText: string
}
const AppTextInput: React.FC<AppTextInputProps> = ({
  containerStyle,
  leftIcon,
  rightIcon,
  style,
  value,
  placeHolderText,
  onChangeText,
  keyboardTypeText,
  ...rest

}) => {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={Colors.InputText || '#999'}
        {...rest}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeHolderText}
        keyboardType={keyboardTypeText}
      // keyboardType='email-address'
      />

      {rightIcon && <View style={styles.iconRight}>
        <Image source={rightIcon} style={{ width: moderateScale(23), height: moderateScale(23) }} resizeMode='contain' />
      </View>}
    </View>
  );
};

export default AppTextInput;
