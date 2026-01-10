import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import { styles } from './styles';

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

  const handleChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= length) {
      onChange(cleaned);
    }
  };

  return (
    <Pressable onPress={() => inputRef.current?.focus()}>
      <View style={styles.container}>
        {Array.from({ length }).map((_, index) => {
          const isActive = value.length === index;
          return (
            <View
              key={index}
              style={[
                styles.box,
                isActive && styles.activeBox,
              ]}
            >
              <Text style={styles.text}>
                {value[index] || ''}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Hidden Input */}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        maxLength={length}
        autoFocus
        style={styles.hiddenInput}
      />
    </Pressable>
  );
};

export default OtpInput;
