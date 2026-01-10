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
};

const AppModal = ({ visible, onClose, children }: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.container}>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default AppModal;
