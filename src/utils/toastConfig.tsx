
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { moderateScale } from './responsiveSize';
import { Colors, Fonts } from '../theme';
import CheckIcon from "react-native-vector-icons/AntDesign";
import ErrorIcon from "react-native-vector-icons/MaterialIcons";
interface ToastProps {
  text1?: string;
  text2?: string;
}

export const toastConfig = {
  success: ({ text1, text2 }: ToastProps) => (
    <View style={[styles.toast, styles.success]}>
      <CheckIcon name="check" size={moderateScale(22)} color={Colors.white} />
      <View style={styles.successRightBox}>
        <Text style={styles.text1}>{text1}</Text>
        {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
      </View>
    </View>
  ),
  error: ({ text1, text2 }: ToastProps) => (
    <View style={[styles.toast, styles.error]}>
      <ErrorIcon name="error-outline" size={moderateScale(22)} color={Colors.white} />
            <View style={styles.successRightBox}>
      <Text style={styles.text1}>{text1}</Text>
      {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
    </View>
    </View>
  ),
  info: ({ text1, text2 }: ToastProps) => (
    <View style={[styles.toast, styles.info]}>
      <Text style={styles.text1}>{text1}</Text>
      {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
    </View>
  ),
};

const styles = StyleSheet.create({
  toast: {
    width: '92%',
    // padding: moderateScale(12),
    paddingHorizontal:moderateScale(12),
    paddingVertical:moderateScale(16),
    borderRadius: moderateScale(16),
    marginHorizontal: moderateScale(10),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  success: { backgroundColor: '#4BB543', flexDirection:'row', alignItems:'center' },
  successRightBox:{marginLeft:moderateScale(13)},
  error: { backgroundColor: '#FF4444' ,flexDirection:'row', alignItems:'center' },
  info: { backgroundColor: '#3498DB' },
  text1: { fontFamily: Fonts.InterBold, color: '#fff', fontSize: moderateScale(16),marginBottom:moderateScale(2) },
  text2: { color: '#fff', fontSize: moderateScale(14), marginTop: moderateScale(2) },
});
