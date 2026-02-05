import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';

type Props = {
  visible: boolean;
  onClose: () => void;
  onCameraPress: () => void;
  onGalleryPress: () => void;
};

const MediaPickerModal = ({
  visible,
  onClose,
  onCameraPress,
  onGalleryPress,
}: Props) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Overlay */}
      <Pressable style={styles.overlay} onPress={onClose} />

      {/* Bottom Sheet */}
      <View style={styles.container}>
        <View style={styles.handle} />

        <TouchableOpacity style={styles.option} onPress={onCameraPress}>
          <Icon name="photo-camera" size={24} color="#000" />
          <Text style={styles.text}>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={onGalleryPress}>
          <Icon name="photo-library" size={24} color="#000" />
          <Text style={styles.text}>Media picker</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default MediaPickerModal;

// import React from 'react';
// import { Modal, View, Text, Pressable } from 'react-native';

// export type MediaPickerModalProps = {
//   visible: boolean;
//   onClose: () => void;
//   onCameraPress: () => void;
//   onGalleryPress: () => void;
// };

// const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
//   visible,
//   onClose,
//   onCameraPress,
//   onGalleryPress,
// }) => {
//   return (
//     <Modal
//       visible={visible}
//       transparent
//       animationType="slide"
//       onRequestClose={onClose}
//     >
//       <View>
//         <Pressable onPress={onCameraPress}>
//           <Text>Camera</Text>
//         </Pressable>

//         <Pressable onPress={onGalleryPress}>
//           <Text>Gallery</Text>
//         </Pressable>

//         <Pressable onPress={onClose}>
//           <Text>Cancel</Text>
//         </Pressable>
//       </View>
//     </Modal>
//   );
// };

// export default MediaPickerModal;

