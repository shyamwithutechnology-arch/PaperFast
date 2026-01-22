import React from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  ViewStyle,
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
  placeHolderText:string
}
const AppTextInput: React.FC<AppTextInputProps> = ({
  containerStyle,
  leftIcon,
  rightIcon,
  style,
  value,
  placeHolderText,
  onChangeText,
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
      />

      {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
    </View>
  );
};

export default AppTextInput;
