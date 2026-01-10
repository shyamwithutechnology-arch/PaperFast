import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { moderateScale } from "../../utlis/responsiveSize";
import { Colors } from "../../theme/color";
import { Fonts } from "../../theme/fonts";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    height: moderateScale(52),
    borderWidth: 1,
    borderColor: Colors.InputStroke,
    borderRadius: moderateScale(10),
    backgroundColor: Colors.white,
    width: "90%",
    alignSelf: 'center',
    // overflow: 'hidden', 
    paddingHorizontal: moderateScale(10), // instead of negative margin

  },
  flagContainer: {
    // marginLeft: moderateScale(8),
    backgroundColor: Colors.white,
    // width: moderateScale(120),
    width: moderateScale(110), // adjust for your flag + code
    justifyContent: 'center',
    alignItems: 'center',
  },
  callingCode: {
    color: Colors.InputText,
    fontSize: moderateScale(14),
    fontFamily: Fonts.InterMedium,
  },
  input: {
    // color: Colors.InputText,
    // fontSize: moderateScale(14),
    // fontFamily: Fonts.InterMedium,
    // backgroundColor: Colors.white,
    // marginLeft: moderateScale(-12),

    color: Colors.InputText,
    fontSize: moderateScale(14),
    fontFamily: Fonts.InterMedium,
    flex: 1, // takes remaining space
  },
  modalContainer:{
    flex:1
  }
});
