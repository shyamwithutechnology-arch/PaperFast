import React from "react";
import {
  Modal,
  View,
  Pressable,
  StyleSheet,
} from "react-native";
import { styles } from "./styles";

type Props = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  // animation: string,
  overlayStyle: object,
  containerStyle: object,
  animationType?: 'none' | 'slide' | 'fade';
};

const AppModal = ({ visible, onClose, children, animationType = 'slide', overlayStyle, containerStyle }: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      // animationType={'fade'}
      animationType={animationType} 
      statusBarTranslucent
    >
      <Pressable style={[styles.overlay, overlayStyle]} onPress={onClose}>
        <Pressable style={[styles.container, containerStyle]}>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default AppModal;
