import React from 'react';
import { View, Text, Pressable } from 'react-native';
import useOtpTimer from '../../../../hooks/useOtpTimer';
import { moderateScale } from '../../../../utils/responsiveSize';
import { Colors, Fonts } from '../../../../theme';
import Loader from '../../../../component/loader/Loader';


interface OtpTimerProps {
  onResendOtp?: () => void;
  isLoading?: boolean;
}
// { onResendOtp, isLoading = false }
const OtpTimer = ({ onResendOtp, isLoading = false }) => {
  const { formatTime, isExpired, resetTimer } = useOtpTimer(20);

  const handleResend = () => {
    if (!isExpired || isLoading) return;
    resetTimer();
    if (onResendOtp) {
      onResendOtp()
    }
  }
  return (
    <View style={{ marginTop: moderateScale(7), alignItems: 'center' }}>
      <Loader visible={isLoading}/>
      {!isExpired ? (
        <Text style={{
          fontSize: moderateScale(14),
          color: Colors.primary70,
          fontFamily: Fonts.InterSemiBold
        }}>
          {formatTime()}
        </Text>
      ) : (
        // <Pressable onPress={resetTimer}>
        <Pressable onPress={handleResend} disabled={isLoading}>
          <Text style={{
            fontSize: moderateScale(14),
            color: Colors.primary70,
            fontFamily: Fonts.InterSemiBold
          }}>
            {isLoading ? 'Sending...' : 'Resend OTP'}
            {/* Resend OTP */}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default OtpTimer;

{/* // <Pressable onPress={resetTimer}> */ }