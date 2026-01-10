// import React from "react";
// import { Pressable, Text, ActivityIndicator, StyleSheet } from "react-native";
// import { Colors } from "../../theme/color";
// import { styles } from "./styles";

// interface AppButtonProps {
// title: string;
// onPress: () => void;
// disabled?: boolean;
// loading?: boolean;
// style?: object;
// textStyle?: object;
// }
// const AppButton : React.FC<AppButtonProps> = ({
//   title,
//   onPress,
//   disabled = false,
//   loading = false,
//   style,
//   textStyle,
// }) => {
//   return (
//     <Pressable
//       onPress={onPress}
//       disabled={disabled || loading}
//       style={[
//         styles.button,
//         disabled && styles.disabled,
//         style,
//       ]}
//     >
//       {loading ? (
//         <ActivityIndicator color={Colors.white} />
//       ) : (
//         <Text style={[styles.text, textStyle]}>{title}</Text>
//       )}
//     </Pressable>
//   );
// };

// export default AppButton;



import React from "react";
import { Pressable, Text, ActivityIndicator } from "react-native";
import { Colors } from "../../theme/color";
import { styles } from "./styles";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: object;
  textStyle?: object;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={Colors.white} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </Pressable>
  );
};

export default AppButton;
