import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    Pressable,
    Image,
    TextInput,
    StyleSheet,
    Alert,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import {
    launchCamera,
    launchImageLibrary,
} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CloseIcon from 'react-native-vector-icons/EvilIcons';
import { Colors, Fonts } from '../../../../theme';
import { moderateScale } from 'react-native-size-matters';
import { scale } from '../../../../utils/responsiveSize';
import { showToast } from '../../../../utils/toast';
const UploadErrorModal = ({ visible, onClose }: any) => {
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [description, setDescription] = useState('');
    const [showPickerOptions, setShowPickerOptions] = useState(false);

    // const onCamera = () => {
    //     setOpenPicker(false);
    //     launchCamera({ mediaType: 'photo' }, handleResponse);
    // };

     // Check camera permission
    const checkCameraPermission = async () => {
        if (Platform.OS !== 'android') return true;

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'App needs camera access to take photos',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    };
      // Handle camera
    const handleCamera = async () => {
        // First close the picker modal
        setShowPickerOptions(false);
        
        // Wait a bit for modal to close
        setTimeout(async () => {
            const hasPermission = await checkCameraPermission();
            if (!hasPermission) {
                // Alert.alert('Permission Denied', 'Camera permission is required');
                showToast('error','Error','Camera permission is required')
                return;
            }

            try {
                const result = await launchCamera({
                    mediaType: 'photo',
                    cameraType: 'back',
                    quality: 0.8,
                    maxWidth: 1024,
                    maxHeight: 1024,
                    saveToPhotos: true,
                });

                if (result.didCancel) {
                    console.log('User cancelled camera');
                    return;
                }
                
                if (result.errorCode) {
                    console.log('Camera Error:', result.errorMessage);
                    Alert.alert('Error', 'Failed to open camera');
                    return;
                }

                if (result.assets && result.assets[0]) {
                    setSelectedImage(result.assets[0]);
                }
            } catch (error) {
                console.error('Camera Error:', error);
                Alert.alert('Error', 'Failed to open camera');
            }
        }, 300); // Small delay for modal animation
    };


    // const onGallery = () => {
    //     setOpenPicker(false);
    //     launchImageLibrary({ mediaType: 'photo' }, handleResponse);
    // };

    // const handleResponse = (response: any) => {
    //     if (response.didCancel) return;
    //     if (response.errorCode) {
    //         console.log(response.errorMessage);
    //         return;
    //     }
    //     setSelectedImage(response.assets?.[0]);
    // };

     // Handle gallery
    const handleGallery = async () => {
        setShowPickerOptions(false);
        
        setTimeout(async () => {
            try {
                const result = await launchImageLibrary({
                    mediaType: 'photo',
                    quality: 0.8,
                    maxWidth: 1024,
                    maxHeight: 1024,
                    selectionLimit: 1,
                });

                if (result.didCancel) {
                    console.log('User cancelled gallery');
                    return;
                }
                
                if (result.errorCode) {
                    console.log('Gallery Error:', result.errorMessage);
                    Alert.alert('Error', 'Failed to open gallery');
                    return;
                }

                if (result.assets && result.assets[0]) {
                    setSelectedImage(result.assets[0]);
                }
            } catch (error) {
                console.error('Gallery Error:', error);
                Alert.alert('Error', 'Failed to open gallery');
            }
        }, 300);
    };

    // Handle submit
    const handleSubmit = () => {
        if (!description.trim()) {
            // Alert.alert('Required', 'Please enter error description');
           showToast('error','Error','Please enter error description')
            return;
        }

        // Here you would send the data to your backend
        console.log('Submitting:', { description, image: selectedImage });
        
        // Reset and close
        setDescription('');
        setSelectedImage(null);
        onClose();
    };
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>

                    {/* HEADER */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Send question error</Text>
                        <Pressable onPress={onClose}>
                            <CloseIcon name="close" size={26} color="#555" />
                        </Pressable>
                    </View>

                    <View style={styles.divider} />

                    {/* DESCRIPTION */}
                    <Text style={styles.label}>Error description</Text>
                    <TextInput
                        placeholder="Enter description"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        style={styles.input}
                    />

                    {/* UPLOAD */}
                    <Text style={[styles.label, { marginTop: moderateScale(16) }]}>
                        Upload photo
                    </Text>

                    <Pressable
                        style={styles.uploadBox}
                        onPress={() => setShowPickerOptions(true)}
                        onLongPress={() => setSelectedImage(null)}
                    >
                        {selectedImage ? (
                            <Image
                                source={{ uri: selectedImage.uri }}
                                style={styles.previewImage}
                            />
                        ) : (
                            <View style={styles.addIconBox}>
                                <Icon name="add" size={24} color="#fff" />
                            </View>
                        )}
                    </Pressable>

                    {/* SUBMIT */}
                    <Pressable style={styles.submitBtn} onPress={handleSubmit}>
                        <Text style={styles.submitText}>Submit</Text>
                    </Pressable>
                </View>
            </View>

            {/* CAMERA / GALLERY PICKER */}
            <Modal transparent visible={showPickerOptions} animationType="slide">
                <Pressable style={styles.pickerOverlay} onPress={() => setShowPickerOptions(false)}>
                    <View style={styles.pickerBox}>
                        <Pressable style={styles.pickerItem} onPress={handleCamera}>
                            <Icon name="photo-camera" size={22} />
                            <Text style={styles.pickerText}>Cameracc</Text>
                        </Pressable>

                        <Pressable style={styles.pickerItem} onPress={handleGallery}>
                            <Icon name="photo-library" size={22} />
                            <Text style={styles.pickerText}>Gallery</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
        </Modal>
    );
};

export default UploadErrorModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '94%',
        backgroundColor: Colors.white,
        borderRadius: moderateScale(12),
        padding: moderateScale(16),
        // marginHorizontal:moderateScale(30)
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: moderateScale(18),
        color: Colors.black,
        fontFamily: Fonts.InterRegular
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 12,
    },
    label: {
        fontSize: moderateScale(14),
        color: Colors.black,
        fontFamily: Fonts.InterRegular,
        marginBottom: moderateScale(10)
    },
    input: {
        minHeight: scale(80),
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: moderateScale(10),
        textAlignVertical: 'top',
    },
    uploadBox: {
        height: scale(100),
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#bbb',
        borderRadius: moderateScale(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    addIconBox: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#1E88E5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    submitBtn: {
        backgroundColor: Colors.primaryColor,
        marginTop: moderateScale(20),
        paddingVertical: moderateScale(12),
        borderRadius: 8,
        alignItems: 'center',
        width: '75%',
        alignSelf: "center"
    },
    submitText: {
        // color: '#fff',
        // fontWeight: '600',
        // fontSize: 15,
        fontSize: moderateScale(15),
        color: Colors.white,
        fontFamily: Fonts.InterMedium
    },

    /* PICKER */
    pickerOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    pickerBox: {
        backgroundColor: Colors.white,
        padding: moderateScale(16),
        borderTopLeftRadius: moderateScale(16),
        borderTopRightRadius: moderateScale(16),
    },
    pickerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    pickerText: {
        marginLeft: moderateScale(10),
        fontSize: moderateScale(15),
        color: Colors.black,
        fontFamily: Fonts.InterRegular
    },
});


// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     Modal,
//     Pressable,
//     Image,
//     TextInput,
//     StyleSheet,
//     Platform,
//     PermissionsAndroid,
//     Alert,
// } from 'react-native';
// import {
//     launchCamera,
//     launchImageLibrary,
// } from 'react-native-image-picker';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import CloseIcon from 'react-native-vector-icons/EvilIcons';
// import { Colors, Fonts } from '../../../../theme';
// import { moderateScale } from 'react-native-size-matters';
// import { scale } from '../../../../utils/responsiveSize';

// const UploadErrorModal = ({ visible, onClose }: any) => {
    // const [selectedImage, setSelectedImage] = useState<any>(null);
    // const [description, setDescription] = useState('');
    // const [showPickerOptions, setShowPickerOptions] = useState(false);

    // // Check camera permission
    // const checkCameraPermission = async () => {
    //     if (Platform.OS !== 'android') return true;

    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.CAMERA,
    //             {
    //                 title: 'Camera Permission',
    //                 message: 'App needs camera access to take photos',
    //                 buttonNeutral: 'Ask Me Later',
    //                 buttonNegative: 'Cancel',
    //                 buttonPositive: 'OK',
    //             }
    //         );
    //         return granted === PermissionsAndroid.RESULTS.GRANTED;
    //     } catch (err) {
    //         console.warn(err);
    //         return false;
    //     }
    // };

//     // Handle camera
//     const handleCamera = async () => {
//         // First close the picker modal
//         setShowPickerOptions(false);
        
//         // Wait a bit for modal to close
//         setTimeout(async () => {
//             const hasPermission = await checkCameraPermission();
//             if (!hasPermission) {
//                 Alert.alert('Permission Denied', 'Camera permission is required');
//                 return;
//             }

//             try {
//                 const result = await launchCamera({
//                     mediaType: 'photo',
//                     cameraType: 'back',
//                     quality: 0.8,
//                     maxWidth: 1024,
//                     maxHeight: 1024,
//                     saveToPhotos: true,
//                 });

//                 if (result.didCancel) {
//                     console.log('User cancelled camera');
//                     return;
//                 }
                
//                 if (result.errorCode) {
//                     console.log('Camera Error:', result.errorMessage);
//                     Alert.alert('Error', 'Failed to open camera');
//                     return;
//                 }

//                 if (result.assets && result.assets[0]) {
//                     setSelectedImage(result.assets[0]);
//                 }
//             } catch (error) {
//                 console.error('Camera Error:', error);
//                 Alert.alert('Error', 'Failed to open camera');
//             }
//         }, 300); // Small delay for modal animation
//     };

    // // Handle gallery
    // const handleGallery = async () => {
    //     setShowPickerOptions(false);
        
    //     setTimeout(async () => {
    //         try {
    //             const result = await launchImageLibrary({
    //                 mediaType: 'photo',
    //                 quality: 0.8,
    //                 maxWidth: 1024,
    //                 maxHeight: 1024,
    //                 selectionLimit: 1,
    //             });

    //             if (result.didCancel) {
    //                 console.log('User cancelled gallery');
    //                 return;
    //             }
                
    //             if (result.errorCode) {
    //                 console.log('Gallery Error:', result.errorMessage);
    //                 Alert.alert('Error', 'Failed to open gallery');
    //                 return;
    //             }

    //             if (result.assets && result.assets[0]) {
    //                 setSelectedImage(result.assets[0]);
    //             }
    //         } catch (error) {
    //             console.error('Gallery Error:', error);
    //             Alert.alert('Error', 'Failed to open gallery');
    //         }
    //     }, 300);
    // };

    // // Handle submit
    // const handleSubmit = () => {
    //     if (!description.trim()) {
    //         Alert.alert('Required', 'Please enter error description');
    //         return;
    //     }

    //     // Here you would send the data to your backend
    //     console.log('Submitting:', { description, image: selectedImage });
        
    //     // Reset and close
    //     setDescription('');
    //     setSelectedImage(null);
    //     onClose();
    // };

//     return (
//         <Modal
//             visible={visible}
//             transparent
//             animationType="fade"
//             onRequestClose={onClose}
//         >
//             <View style={styles.overlay}>
//                 <View style={styles.container}>
//                     {/* HEADER */}
//                     <View style={styles.header}>
//                         <Text style={styles.title}>Report Question Error</Text>
//                         <Pressable onPress={onClose} hitSlop={10}>
//                             <CloseIcon name="close" size={26} color="#555" />
//                         </Pressable>
//                     </View>

//                     <View style={styles.divider} />

//                     {/* DESCRIPTION */}
//                     <Text style={styles.label}>Error Description</Text>
//                     <TextInput
//                         placeholder="Describe the issue..."
//                         placeholderTextColor="#999"
//                         value={description}
//                         onChangeText={setDescription}
//                         multiline
//                         style={styles.input}
//                     />

//                     {/* UPLOAD */}
//                     <Text style={[styles.label, { marginTop: moderateScale(16) }]}>
//                         Upload Photo
//                     </Text>

//                     <Pressable
//                         style={styles.uploadBox}
//                         onPress={() => setShowPickerOptions(true)}
//                         onLongPress={() => {
//                             if (selectedImage) {
//                                 setSelectedImage(null);
//                             }
//                         }}
//                     >
//                         {selectedImage ? (
//                             <Image
//                                 source={{ uri: selectedImage.uri }}
//                                 style={styles.previewImage}
//                             />
//                         ) : (
//                             <View style={styles.addIconBox}>
//                                 <Icon name="add-a-photo" size={28} color="#fff" />
//                             </View>
//                         )}
//                     </Pressable>

//                     {/* SUBMIT */}
//                     <Pressable 
//                         style={styles.submitBtn} 
//                         onPress={handleSubmit}
//                     >
//                         <Text style={styles.submitText}>Submit</Text>
//                     </Pressable>
//                 </View>
//             </View>

//             {/* PICKER OPTIONS - SEPARATE MODAL */}
//             <Modal
//                 visible={showPickerOptions}
//                 transparent
//                 animationType="slide"
//                 onRequestClose={() => setShowPickerOptions(false)}
//             >
//                 <Pressable 
//                     style={styles.pickerOverlay}
//                     onPress={() => setShowPickerOptions(false)}
//                 >
//                     <View style={styles.pickerContainer}>
//                         <View style={styles.pickerBox}>
//                             <Pressable 
//                                 style={styles.pickerItem}
//                                 onPress={handleCamera}
//                             >
//                                 <Icon name="photo-camera" size={24} color={Colors.primaryColor} />
//                                 <Text style={styles.pickerText}>Take Photo</Text>
//                             </Pressable>

//                             <View style={styles.pickerDivider} />

//                             <Pressable 
//                                 style={styles.pickerItem}
//                                 onPress={handleGallery}
//                             >
//                                 <Icon name="photo-library" size={24} color={Colors.primaryColor} />
//                                 <Text style={styles.pickerText}>Choose from Gallery</Text>
//                             </Pressable>

//                             <View style={styles.pickerDivider} />

//                             <Pressable 
//                                 style={[styles.pickerItem, styles.cancelItem]}
//                                 onPress={() => setShowPickerOptions(false)}
//                             >
//                                 <Text style={styles.cancelText}>Cancel</Text>
//                             </Pressable>
//                         </View>
//                     </View>
//                 </Pressable>
//             </Modal>
//         </Modal>
//     );
// };

// const styles = StyleSheet.create({
//     overlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0,0,0,0.5)',
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: moderateScale(20),
//     },
//     container: {
//         width: '100%',
//         maxWidth: 400,
//         backgroundColor: Colors.white,
//         borderRadius: moderateScale(12),
//         padding: moderateScale(16),
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: moderateScale(10),
//     },
//     title: {
//         fontSize: moderateScale(18),
//         color: Colors.black,
//         fontFamily: Fonts.InterRegular
//     },
//     divider: {
//         height: 1,
//         backgroundColor: '#eee',
//         marginVertical: moderateScale(12),
//     },
//     label: {
//         fontSize: moderateScale(14),
//         color: Colors.black,
//         fontFamily: Fonts.InterRegular,
//         marginBottom: moderateScale(10)
//     },
//     input: {
//         minHeight: scale(80),
//         borderWidth: 1,
//         borderColor: '#ddd',
//         borderRadius: 8,
//         padding: moderateScale(10),
//         textAlignVertical: 'top',
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InterRegular,
//     },
//     uploadBox: {
//         height: scale(120),
//         borderWidth: 2,
//         borderStyle: 'dashed',
//         borderColor: '#bbb',
//         borderRadius: moderateScale(8),
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f9f9f9',
//         overflow: 'hidden',
//     },
//     addIconBox: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         backgroundColor: Colors.primaryColor,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     previewImage: {
//         width: '100%',
//         height: '100%',
//         resizeMode: 'cover',
//     },
//     submitBtn: {
//         backgroundColor: Colors.primaryColor,
//         marginTop: moderateScale(20),
//         paddingVertical: moderateScale(14),
//         borderRadius: 8,
//         alignItems: 'center',
//         width: '75%',
//         alignSelf: "center"
//     },
//     submitText: {
//         fontSize: moderateScale(16),
//         color: Colors.white,
//         fontFamily: Fonts.InterMedium
//     },

//     // PICKER STYLES
//     pickerOverlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0,0,0,0.5)',
//         justifyContent: 'flex-end',
//     },
//     pickerContainer: {
//         width: '100%',
//         padding: moderateScale(20),
//     },
//     pickerBox: {
//         backgroundColor: Colors.white,
//         borderRadius: moderateScale(16),
//         overflow: 'hidden',
//     },
//     pickerItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: moderateScale(18),
//         backgroundColor: Colors.white,
//     },
//     pickerText: {
//         marginLeft: moderateScale(15),
//         fontSize: moderateScale(16),
//         color: Colors.black,
//         fontFamily: Fonts.InterRegular,
//         flex: 1,
//     },
//     pickerDivider: {
//         height: 1,
//         backgroundColor: '#f0f0f0',
//         marginHorizontal: moderateScale(18),
//     },
//     cancelItem: {
//         justifyContent: 'center',
//     },
//     cancelText: {
//         fontSize: moderateScale(16),
//         color: Colors.primaryColor,
//         fontFamily: Fonts.InterSemiBold,
//         textAlign: 'center',
//         flex: 1,
//     },
// });

// export default UploadErrorModal;
