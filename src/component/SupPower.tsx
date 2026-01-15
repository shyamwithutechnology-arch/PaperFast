// src/components/common/SupPower.tsx
import React from "react";
import { Text } from "react-native";

const SupPower = ({ children }) => {
  return (
    <Text
      style={{
        fontSize: 8,
        lineHeight: 14,
        marginTop: -4,
      }}
    >
      {children}
    </Text>
  );
};

export default SupPower;
