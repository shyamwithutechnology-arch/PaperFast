// import React, { useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Pressable,
//   StyleSheet,
// } from 'react-native';
// import { styles } from './styles';

// interface Props {
//   value: string;
//   length?: number;
//   onChange: (otp: string) => void;
// }

// export const OtpInput: React.FC<Props> = ({
//   value,
//   length = 4,
//   onChange,
// }) => {
// const inputRef = useRef<TextInput>(null);

// const handleChange = (text: string) => {
//   const cleaned = text.replace(/\D/g, '');
//   if (cleaned.length <= length) {
//     onChange(cleaned);
//   }
// };

//   return (
//     <View style={{ position: 'relative', borderWidth:1 }}>
//       <Pressable onPress={() => inputRef.current?.focus()}>
//         <View style={styles.container}>
//           {Array.from({ length }).map((_, index) => {
//             const isActive = value.length === index;
//             return (
//               <View
//                 key={index}
//                 style={[
//                   styles.box,
//                   isActive && styles.activeBox,
//                 ]}
//               >
//                 <Text style={styles.text}>
//                   {value[index] || ''}
//                 </Text>
//               </View>
//             );
//           })}
//         </View>

//         {/* Hidden Input */}
// <TextInput
//   ref={inputRef}
//   value={value}
//   onChangeText={handleChange}
//   keyboardType="number-pad"
//   maxLength={length}
//   autoFocus
//   style={styles.hiddenInput}
// />
//       </Pressable>
//     </View>
//   );
// };

// export default OtpInput;




import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import { moderateScale } from '../../../../utils/responsiveSize';
import { Colors, Fonts } from '../../../../theme';

interface Props {
  value: string;
  length?: number;
  onChange: (otp: string) => void;
}

export const OtpInput: React.FC<Props> = ({
  value,
  length = 4,
  onChange,
}) => {
  const inputRef = useRef<TextInput>(null);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  // Auto-focus when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Handle text input changes
  const handleChange = (text: string) => {
    const cleaned = text.replace(/\D/g, ''); // Remove non-digits

    if (cleaned.length <= length) {
      onChange(cleaned);
      // Move cursor to end of input
      setCursorPosition(cleaned.length);
    }
  };

  // Handle box press - move cursor to that position
  const handleBoxPress = (index: number) => {
    // Allow clicking on any box up to current length
    const targetIndex = Math.min(index, value.length);
    setCursorPosition(targetIndex);

    // Small delay to ensure focus works properly
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  // Handle backspace with cursor positioning
  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Backspace' && cursorPosition > 0) {
      // Remove character at cursorPosition - 1
      const newValue =
        value.substring(0, cursorPosition - 1) +
        value.substring(cursorPosition);
      onChange(newValue);
      setCursorPosition(cursorPosition - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* OTP Boxes Container */}
      <View style={styles.boxesContainer} pointerEvents="box-none">
        {Array.from({ length }).map((_, index) => {
          const digit = value[index] || '';
          const isCursorHere = index === cursorPosition && isFocused;
          const isFilled = digit !== '';

          return (
            <Pressable
              key={index}
              onPress={() => handleBoxPress(index)}
              hitSlop={{ top: 10, bottom: 10, left: 5, right: 5 }} // Easier to tap
              style={({ pressed }) => [
                styles.boxWrapper,
                pressed && styles.pressedBox,
              ]}
            >
              <View style={[
                styles.box,
                isFilled && styles.filledBox,
                isCursorHere && styles.activeBox,
              ]}>
                <Text style={styles.digitText}>{digit}</Text>

                {/* Blinking cursor */}
                {isCursorHere && (
                  <View style={styles.cursor} />
                )}
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* Hidden TextInput for keyboard */}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        keyboardType="number-pad"
        maxLength={length}
        autoFocus={true}
        // caretHidden={true}
        style={styles.hiddenInput}
        // selection={{ start: cursorPosition, end: cursorPosition }}
        onSelectionChange={({ nativeEvent }) => {
          setCursorPosition(nativeEvent.selection.start);
        }}
        // FIX: Ensure TextInput is touchable
        pointerEvents="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: moderateScale(70),
    marginVertical: moderateScale(20),
  },
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(12),
    // borderWidth: 1
  },
  boxWrapper: {
    // Wrapper for pressable feedback
  },
  pressedBox: {
    transform: [{ scale: 0.95 }],
  },
  box: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(12),
    borderWidth: 1.5,
    borderColor: Colors.InputStroke,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  activeBox: {
    borderColor: '#008CE3',
    borderWidth: 1,
    shadowColor: Colors.primaryColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  filledBox: {
    backgroundColor: Colors.white,
    borderWidth: 1
  },
  digitText: {
    fontSize: moderateScale(20),
    fontFamily: Fonts.InterSemiBold,
    color: Colors.black,
    lineHeight: moderateScale(25),
  },
  cursor: {
    position: 'absolute',
    width: 1.5,
    height: moderateScale(28),
    backgroundColor: '#008CE3',
    borderRadius: 1,
  },
  hiddenInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    fontSize: 1,
    // borderWidth:1
  },
});

export default OtpInput;