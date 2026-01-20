import React from 'react';
import { View, Text, Pressable } from 'react-native';
import useOtpTimer from '../../../../hooks/useOtpTimer';
import { moderateScale } from '../../../../utils/responsiveSize';
import { Colors, Fonts } from '../../../../theme';
const OtpTimer = () => {
  const { formatTime, isExpired, resetTimer } = useOtpTimer(120);

  return (
    <View style={{ marginTop: moderateScale(7), alignItems: 'center' }}>
      {!isExpired ? (
        <Text style={{
          fontSize: moderateScale(14),
          color: Colors.primary70,
          fontFamily: Fonts.InterSemiBold
        }}>
          {formatTime()}
        </Text>
      ) : (
        <Pressable onPress={resetTimer}>
          <Text style={{
            fontSize: moderateScale(14),
            color: Colors.primary70,
            fontFamily: Fonts.InterSemiBold
          }}>
            Resend OTP
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default OtpTimer;
