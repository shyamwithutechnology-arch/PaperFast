
import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { moderateScale } from './responsiveSize';
import { Colors, Fonts } from '../theme';
import CheckIcon from "react-native-vector-icons/FontAwesome6";
import ErrorIcon from "react-native-vector-icons/MaterialIcons";
import CrossIcon from "react-native-vector-icons/Entypo";
interface ToastProps {
  text1?: string;
  text2?: string;
}

export const toastConfig = {
  success: ({ text1, text2 }: ToastProps) => (
    <View style={[styles.toast, styles.success]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.checkIconBox}>
          <CheckIcon name="check" size={moderateScale(14.5)} color={Colors.white} />
        </View>
        <View style={styles.successRightBox}>
          <Text style={styles.text1}>{text1}</Text>
          {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
        </View>
      </View>
      <Pressable style={styles.crossBox}>
        <CrossIcon name='cross' color={Colors.black} size={moderateScale(20)} />
      </Pressable>
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
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(16),
    marginHorizontal: moderateScale(10),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 4,
    // elevation: ,
    justifyContent: "space-between"
  },
  checkIconBox: {
    backgroundColor: '#49DF70',
    borderRadius: moderateScale(40),
    height: moderateScale(25),
    width: moderateScale(25),
    alignItems: 'center',
    justifyContent: "center"
  },
  success: { backgroundColor: '#EFF9F5', flexDirection: 'row', alignItems: 'center', borderColor: '#C0DFC7', borderWidth: 2 },
  successRightBox: { marginLeft: moderateScale(13) },
  error: { backgroundColor: '#FF4444', flexDirection: 'row', alignItems: 'center' },
  info: { backgroundColor: '#3498DB' },
  // text1: { fontFamily: Fonts.InterBold, color: '#5A5F5C', fontSize: moderateScale(16), marginBottom: moderateScale(2) },
  text1: { fontFamily: Fonts.InterBold, color: '#000', fontSize: moderateScale(16), marginBottom: moderateScale(2) },
  text2: { color: '#B0B5B2', fontSize: moderateScale(13), marginTop: moderateScale(2), fontFamily: Fonts.InterMedium },
  crossBox: {
    height: moderateScale(26),
    width: moderateScale(26),
    backgroundColor: Colors.white,
    // borderWidth: 1,
    borderRadius: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowRadius: moderateScale(4),
    shadowColor: Colors.white
  }
});
