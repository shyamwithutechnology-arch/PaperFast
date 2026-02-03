// import React, { useRef, useState } from 'react';
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     StyleSheet,
//     Modal,
// } from 'react-native';
// import {
//     Camera,
//     useCameraDevice,
//     useCameraPermission,
// } from 'react-native-vision-camera';
// import FlipCamera from "react-native-vector-icons/MaterialIcons";
// import CrossIcon from "react-native-vector-icons/Entypo";
// import { moderateScale } from '../../utils/responsiveSize';
// import { Colors } from '../../theme';

// interface Props {
//     visible: boolean;
//     onClose: () => void;
//     onCapture: (uri: string) => void;
// }

// const AppCamera = ({ visible, onClose, onCapture }: Props) => {
//     const camera = useRef<Camera>(null);
//     const [position, setPosition] = useState<'back' | 'front'>('back');

//     const device = useCameraDevice(position);
//     const { hasPermission, requestPermission } = useCameraPermission();

//     if (!hasPermission) {
//         requestPermission();
//         return null;
//     }

//     if (!device) return null;

//     const takePhoto = async () => {
//         if (!camera.current) return;

//         const photo = await camera.current.takePhoto();
//         onCapture('file://' + photo.path);
//         onClose();
//     };

//     return (
//         <Modal visible={visible} animationType="slide">
//             <View style={{ flex: 1, backgroundColor: 'black' }}>
//                 <Camera
//                     ref={camera}
//                     style={StyleSheet.absoluteFill}
//                     device={device}
//                     isActive={visible}
//                     photo
//                 />

//                 {/* CLOSE */}
//                 <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
//                     {/* <Text style={styles.text}>✕</Text> */}
//                     <CrossIcon name="cross" size={moderateScale(22)} color={Colors?.white} />
//                 </TouchableOpacity>


//                 {/* <View style={{ borderWidth: 1,  borderColor: "#fff" }}> */}
//                 {/* CAPTURE */}
//                 <TouchableOpacity style={styles.capture} onPress={takePhoto} />

//                 {/* SWITCH */}
//                 <TouchableOpacity
//                     style={styles.switchBtn}
//                     onPress={() =>
//                         setPosition(prev => (prev === 'back' ? 'front' : 'back'))}>
//                     {/* <Text style={styles.text}>↻</Text> */}
//                     <FlipCamera name="flip-camera-ios" size={moderateScale(25)} color={Colors.white} />
//                 </TouchableOpacity>
//                 {/* </View> */}
//             </View>
//         </Modal>
//     );
// };

// export default AppCamera;

// const styles = StyleSheet.create({
//     closeBtn: {
//         position: 'absolute',
//         top: 40,
//         right: 20,
//         backgroundColor: '#00000080',
//         padding: 10,
//         borderRadius: moderateScale(100),
//         // borderWidth: 1,
//         alignItems:'center',
//         justifyContent:"center"
//     },
//     switchBtn: {
//         position: 'absolute',
//         bottom: 51.5,
//         right: 45,
//         // left:158,
//         backgroundColor: '#00000080',
//         padding: 10,
//         borderRadius: moderateScale(100),
//     },
//     capture: {
//         position: 'absolute',
//         bottom: 40,
//         alignSelf: 'center',
//         width: moderateScale(70),
//         height: moderateScale(70),
//         borderRadius: 35,
//         borderWidth: 6,
//         borderColor: '#fff',
//     },
//     text: {
//         color: '#fff',
//         fontSize: 18,
//     },
// });
