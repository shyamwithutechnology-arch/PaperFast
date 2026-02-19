
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
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={[styles.checkIconBox, { backgroundColor: '#FB5758' }]}>
          {/* <ErrorIcon name="error-outline" size={moderateScale(16)} color={Colors.white} /> */}
          <CrossIcon name='cross' color={Colors.white} size={moderateScale(20)} />
        </View>
        <View style={styles.successRightBox}>
          <Text style={[styles.text1, { color: Colors.red }]}>{text1}</Text>
          {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
        </View>
      </View>
      <Pressable style={styles.crossBox}>
        <CrossIcon name='cross' color={Colors.black} size={moderateScale(20)} />
      </Pressable>
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
    backgroundColor: '#4FDD6B',
    borderRadius: moderateScale(100),
    height: moderateScale(30),
    width: moderateScale(30),
    alignItems: 'center',
    justifyContent: "center"
  },
  success: { backgroundColor: '#F1F9F4', flexDirection: 'row', alignItems: 'center', borderColor: '#53CA75', borderWidth: 1.8 },
  successRightBox: { marginLeft: moderateScale(13)},
  // error: { backgroundColor: '#FF4444', flexDirection: 'row', alignItems: 'center' },
  error: { backgroundColor: '#FCEFEA', flexDirection: 'row', alignItems: 'center', borderColor: '#E84C55', borderWidth: 1.5 },
  info: { backgroundColor: '#EBBC3F' },
  // text1: { fontFamily: Fonts.InterBold, color: '#5A5F5C', fontSize: moderateScale(16), marginBottom: moderateScale(2) },
  text1: { fontFamily: Fonts.InterBold, color: Colors.green, fontSize: moderateScale(16), marginBottom: moderateScale(2) },
  // text1: { fontFamily: Fonts.InterBold, color: '#000', fontSize: moderateScale(16), marginBottom: moderateScale(2) },
  text2: { color: '#68625D', fontSize: moderateScale(13), marginTop: moderateScale(2), fontFamily: Fonts.InterMedium },
  crossBox: {
    height: moderateScale(26),
    width: moderateScale(26),
    backgroundColor: Colors.white,
    // borderWidth: 1,
    borderRadius: moderateScale(4),
    alignItems: 'center',
    justifyContent: 'center',
    // elevation: 10,
    shadowRadius: moderateScale(4),
    shadowColor: Colors.white
  }
});
