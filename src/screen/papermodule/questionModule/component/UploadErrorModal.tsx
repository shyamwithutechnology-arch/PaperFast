import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    Pressable,
    Image,
    TextInput,
    StyleSheet,
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
const UploadErrorModal = ({ visible, onClose }: any) => {
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [description, setDescription] = useState('');
    const [openPicker, setOpenPicker] = useState(false);

    const onCamera = () => {
        setOpenPicker(false);
        launchCamera({ mediaType: 'photo' }, handleResponse);
    };

    const onGallery = () => {
        setOpenPicker(false);
        launchImageLibrary({ mediaType: 'photo' }, handleResponse);
    };

    const handleResponse = (response: any) => {
        if (response.didCancel) return;
        if (response.errorCode) {
            console.log(response.errorMessage);
            return;
        }
        setSelectedImage(response.assets?.[0]);
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
                        onPress={() => setOpenPicker(true)}
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
                    <Pressable style={styles.submitBtn} onPress={onClose}>
                        <Text style={styles.submitText}>Submit</Text>
                    </Pressable>
                </View>
            </View>

            {/* CAMERA / GALLERY PICKER */}
            <Modal transparent visible={openPicker} animationType="slide">
                <Pressable style={styles.pickerOverlay} onPress={() => setOpenPicker(false)}>
                    <View style={styles.pickerBox}>
                        <Pressable style={styles.pickerItem} onPress={onCamera}>
                            <Icon name="photo-camera" size={22} />
                            <Text style={styles.pickerText}>Camera</Text>
                        </Pressable>

                        <Pressable style={styles.pickerItem} onPress={onGallery}>
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
