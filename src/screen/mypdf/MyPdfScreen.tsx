// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     StatusBar,
//     TouchableOpacity,
//     ScrollView,
//     Alert,
//     ActivityIndicator,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Colors, Fonts } from '../../theme';
// import { moderateScale, verticalScale } from '../../utils/responsiveSize';
// import { Icons } from '../../assets/icons';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import HeaderPaperModule from '../../component/headerpapermodule/Headerpapermodule';
// import Loader from '../../component/loader/Loader';
// import AppTextInput from '../../component/apptextinput/AppTextInput';
// import ClockIcon from "react-native-vector-icons/FontAwesome6";
// import AppButton from '../../component/button/AppButton';

// import ImagePicker from 'react-native-image-picker';
// import ImageResizer from '@bam.tech/react-native-image-resizer';
// const MyPdfScreen = () => {
//     const navigation = useNavigation();
//     const [loader, setLoader] = useState(false)
//     const [logo, setLogo] = useState('1')

//     // """"
//     // const [activeCamera, setActiveCamera] = useState(false)
//     // const device = useCameraDevice('back')
//     // const { hasPermission } = useCameraPermission()

//     // if (!hasPermission) return <PermissionsPage />
//     // if (device == null) return <NoCameraDeviceError /> 
//     // const handleOpenCamera = () => {
//     //     setActiveCamera(false)
//     // }
//     // const [openCamera, setOpenCamera] = useState(false);
//     // const [photoUri, setPhotoUri] = useState<string | null>(null);

//     // const handleOpenCamera = () => {
//     //     setOpenCamera(true);
//     // };

//     // const handleCapture = (uri: string) => {
//     //     setPhotoUri(uri);
//     // };


//     const [loading, setLoading] = useState(false);
//     const [logoUri, setLogoUri] = useState<string | null>(null);

//     const selectAndResizeLogo = () => {
//         const options = {
//             title: 'Select Logo',
//             mediaType: 'photo' as const,
//             maxWidth: 1024,
//             maxHeight: 1024,
//             quality: 1,
//             storageOptions: {
//                 skipBackup: true,
//                 path: 'logos',
//             },
//             noData: true,
//         };

//         ImagePicker.showImagePicker(options, async (response) => {
//             if (response.didCancel) {
//                 console.log('User cancelled');
//             } else if (response.error) {
//                 Alert.alert('Error', response.error);
//             } else if (response.uri) {
//                 await processImage(response.uri, response.fileName || 'logo.jpg');
//             }
//         });
//     };

//     const processImage = async (uri: string, fileName: string) => {
//         try {
//             setLoading(true);

//             // Step 1: First resize to 320x320
//             const resizedImage = await ImageResizer.createResizedImage(
//                 uri,
//                 320,
//                 320,
//                 'JPEG',
//                 85, // Start with 85% quality
//                 0,
//                 null,
//                 false,
//                 {
//                     mode: 'contain',
//                     onlyScaleDown: true,
//                 }
//             );

//             // Step 2: Check file size (optional - use react-native-fs if needed)
//             // If > 50KB, compress further
//             let finalUri = resizedImage.uri;
//             let quality = 85;

//             // Simple quality reduction loop (no react-native-fs needed)
//             while (quality > 30) {
//                 const testImage = await ImageResizer.createResizedImage(
//                     uri,
//                     320,
//                     320,
//                     'JPEG',
//                     quality,
//                     0,
//                     null,
//                     false
//                 );

//                 // Get file size using fetch (no extra library)
//                 const fileSize = await getFileSize(testImage.uri);

//                 if (fileSize <= 50 * 1024) { // 50KB in bytes
//                     finalUri = testImage.uri;
//                     break;
//                 }

//                 quality -= 15; // Reduce quality
//             }

//             setLogoUri(finalUri);
//             setLoading(false);

//             Alert.alert(
//                 'Logo Ready',
//                 '320×320px, ready for upload',
//                 [{ text: 'OK' }]
//             );

//             // Upload to your backend
//             uploadToBackend(finalUri, fileName);

//         } catch (error) {
//             setLoading(false);
//             Alert.alert('Error', 'Failed to process image');
//         }
//     };

//     const getFileSize = async (uri: string): Promise<number> => {
//         try {
//             const response = await fetch(uri);
//             const blob = await response.blob();
//             return blob.size;
//         } catch {
//             return 100 * 1024; // Default to 100KB if can't determine
//         }
//     };

//       const uploadToBackend = async (uri: string, fileName: string) => {
//     //     // Your upload logic here
//         const formData = new FormData();
//         formData.append('logo', {
//           uri,
//           type: 'image/jpeg',
//           name: fileName,
//         });

//         try {
//           const response = await fetch('YOUR_UPLOAD_URL', {
//             method: 'POST',
//             body: formData,
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           });

//           console.log('Upload successful:', response);
//         } catch (error) {
//           console.error('Upload failed:', error);
//         }
//       };


//     const handleSelectWaterMark = (text) => {
//         setLogo(text)
//     }
//     const handleBack = () => {
//         navigation.goBack()
//     }
//     return (
//         <View style={styles.container}>
//             <StatusBar
//                 backgroundColor={Colors.primaryColor}
//                 barStyle="dark-content" />
//             <SafeAreaView style={{ backgroundColor: Colors.lightThemeBlue }} edges={['top']}>
//                 <HeaderPaperModule title='Generate Pdf' leftIconPress={handleBack} />
//             </SafeAreaView>
//             <SafeAreaView style={styles.content} edges={['left', 'right', 'bottom']}>
//                 <ScrollView style={{ flexGrow: 1, backgroundColor: Colors.white }}>
//                     <Loader visible={loader} />
//                     <Text style={styles.title}>Institue Header (Size : 320x 50mm)</Text>
//                     {/* <TouchableOpacity style={styles.dragBox} onPress={handleOpenCamera} >
//                         <Image source={Icons?.fileUpload} style={styles.fileUploadImg} resizeMode='contain' />
//                     </TouchableOpacity> */}

//                     {/* <Camera
//                         style={StyleSheet.absoluteFill}
//                         device={device}
//                         isActive={activeCamera}
//                     /> */}
//                     {/* <TouchableOpacity style={styles.dragBox} onPress={handleOpenCamera}>
//                         {photoUri ? (
//                             <View style={styles.logoImgBox}>
//                             <Image source={{ uri: photoUri }} style={{ width:moderateScale(100),height:moderateScale(80) }} resizeMode='cover' />
//                             </View>
//                         ) : (
//                             <Image source={Icons.fileUpload} style={styles.fileUploadImg} resizeMode='cover' />
//                         )}
//                     </TouchableOpacity> */}
//                     {logoUri ? (
//                         <View style={styles.logoContainer}>
//                             <Image source={{ uri: logoUri }} style={styles.logoImage} />
//                             <TouchableOpacity
//                                 style={styles.changeButton}
//                                 onPress={selectAndResizeLogo}
//                             >
//                                 <Text style={styles.changeText}>Change Logo</Text>
//                             </TouchableOpacity>
//                         </View>
//                     ) : (
//                         <TouchableOpacity
//                             style={styles.uploadButton}
//                             onPress={selectAndResizeLogo}
//                             disabled={loading}
//                         >
//                             {loading ? (
//                                 <ActivityIndicator color={Colors.white} />
//                             ) : (
//                                 <>
//                                     <Text style={styles.uploadText}>📁 Upload Logo</Text>
//                                     <Text style={styles.uploadHint}>320×320px • Max 50KB</Text>
//                                 </>
//                             )}
//                         </TouchableOpacity>
//                     )}

//                     <View style={{ marginVertical: moderateScale(15) }}>
//                         <AppTextInput placeHolderText='Insitute Name' />
//                     </View>
//                     <AppTextInput placeHolderText='Enter Test Name' />
//                     <View style={styles.mainDateBox}>
//                         <View style={{
//                             marginHorizontal: moderateScale(10),
//                         }}>
//                             <Text style={styles.dateText}>Date</Text>
//                             <TouchableOpacity style={styles.dateBox}>
//                                 <Text style={styles.TimeText}>DD/MM/YY</Text>
//                                 <Image source={Icons.date} style={styles.dateImg} />
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{
//                             marginHorizontal: moderateScale(10),
//                         }}>
//                             <Text style={styles.dateText}>Time</Text>
//                             <TouchableOpacity style={styles.dateBox}>
//                                 <Text style={styles.TimeText}>2 Hours</Text>
//                                 <ClockIcon name='clock-rotate-left' size={moderateScale(20)} color='#BEBEBE' />
//                             </TouchableOpacity>
//                         </View>
//                     </View>

//                     <View style={styles.hideBox}>
//                         <TouchableOpacity style={styles.checkBox} />
//                         <Text style={[styles.TimeText, { fontSize: moderateScale(13), marginLeft: moderateScale(10) }]}>Hide Date & Time</Text>
//                     </View>
//                     <Text style={[styles.TimeText, styles.waterMark]}>Water Mark</Text>

//                     <View style={styles.parentLogo}>
//                         <TouchableOpacity style={styles.logoMainBox} onPress={() => handleSelectWaterMark('1')}>
//                             <View style={styles.radioButton}>
//                                 {logo === '1' && <View style={styles.innerView} />}
//                             </View>

//                             <Text style={[styles.TimeText, styles.logoText]}>Logo</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.logoMainBox} onPress={() => handleSelectWaterMark('2')}>
//                             <View style={styles.radioButton} >
//                                 {logo === '2' && <View style={styles.innerView} />}
//                             </View>
//                             <Text style={[styles.TimeText, styles.logoText]}>Text</Text>
//                         </TouchableOpacity>
//                     </View>

//                     <TouchableOpacity style={[styles.dragBox, { marginTop: moderateScale(14) }]} >
//                         <Image source={Icons?.fileUpload} style={styles.fileUploadImg} resizeMode='contain' />
//                     </TouchableOpacity>

//                     <Text style={[styles.TimeText, styles.waterMark]}>Border</Text>
//                     <View style={[styles.parentLogo]}>
//                         <TouchableOpacity style={styles.logoMainBox} onPress={() => handleSelectWaterMark('1')}>
//                             <View style={styles.radioButton}>
//                                 {logo === '1' && <View style={styles.innerView} />}
//                             </View>

//                             <Text style={[styles.TimeText, styles.logoText]}>With Border</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.logoMainBox} onPress={() => handleSelectWaterMark('2')}>
//                             <View style={styles.radioButton} >
//                                 {logo === '2' && <View style={styles.innerView} />}
//                             </View>

//                             <Text style={[styles.TimeText, styles.logoText]}>Without border</Text>
//                         </TouchableOpacity>
//                     </View>

//                     <TouchableOpacity style={[styles.dragBox, { marginTop: moderateScale(14) }]} >
//                         <Image source={Icons?.fileUpload} style={styles.fileUploadImg} resizeMode='contain' />
//                     </TouchableOpacity>

//                     <TouchableOpacity style={styles.wishYouBox}>
//                         <Text style={styles.withText}>Wish you all the best</Text>
//                     </TouchableOpacity>

//                     <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', marginHorizontal: moderateScale(16), marginTop: moderateScale(10) }}>
//                         <AppButton title='PDF Preview' style={{ paddingHorizontal: moderateScale(35), paddingVertical: moderateScale(10) }} />
//                         <AppButton title='Cancel' style={{ paddingHorizontal: moderateScale(53), paddingVertical: moderateScale(10) }} />
//                     </View>

//                     {/* <AppCamera
//                         visible={openCamera}
//                         onClose={() => setOpenCamera(false)}
//                         onCapture={handleCapture}
//                     /> */}

//                 </ScrollView>
//             </SafeAreaView>
//         </View>
//     );
// };
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: Colors.white
//     },
//     content: {
//         flex: 1,
//         backgroundColor: Colors.white
//     },
//     iconContainer: {
//         width: moderateScale(120),
//         height: moderateScale(120),
//         borderRadius: moderateScale(60),
//         backgroundColor: Colors.lightThemeBlue + '20',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: moderateScale(32),
//     },
//     icon: {
//         width: moderateScale(60),
//         height: moderateScale(60),
//         tintColor: Colors.primaryColor,
//     },
//     title: {
//         fontSize: moderateScale(13),
//         fontFamily: Fonts.InstrumentSansRegular,
//         color: Colors.black,
//         marginLeft: moderateScale(16),
//         marginVertical: moderateScale(10)
//     },
//     message: {
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InterRegular,
//         color: Colors.ParagraphAndShortTexts,
//         textAlign: 'center',
//         lineHeight: moderateScale(24),
//         marginBottom: moderateScale(40),
//     },
//     backButton: {
//         backgroundColor: Colors.primaryColor,
//         paddingHorizontal: moderateScale(25),
//         paddingVertical: moderateScale(10),
//         borderRadius: moderateScale(8),
//     },
//     backButtonText: {
//         fontSize: moderateScale(16),
//         fontFamily: Fonts.InterSemiBold,
//         color: Colors.white,
//     },

//     dragBox: {
//         paddingVertical: verticalScale(14),
//         paddingHorizontal: moderateScale(5),
//         borderWidth: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         marginHorizontal: moderateScale(16),
//         borderColor: Colors.InputStroke,
//         borderRadius: moderateScale(5)
//     },
//     fileUploadImg: {
//         height: moderateScale(50),
//         width: moderateScale(50),
//         resizeMode: 'contain'
//     },
//     logoImgBox: {
//         flex: 1,
//     },
//     dateText: {
//         fontSize: moderateScale(13),
//         color: Colors.black,
//         fontFamily: Fonts.InstrumentSansRegular,
//         marginBottom: moderateScale(8),
//         marginTop: moderateScale(5)
//     },
//     TimeText: {
//         fontSize: moderateScale(14),
//         color: Colors.InputText,
//         fontFamily: Fonts.InstrumentSansRegular
//     },
//     dateBox: {
//         borderWidth: 1,
//         width: moderateScale(156),
//         height: moderateScale(46),
//         paddingHorizontal: moderateScale(10),
//         flexDirection: 'row',
//         justifyContent: "space-between",
//         alignItems: 'center',
//         borderRadius: moderateScale(2),
//         borderColor: Colors.InputStroke
//     },

//     mainDateBox: {
//         flexDirection: 'row',
//         alignSelf: "center",
//         marginTop: moderateScale(10),
//     },
//     dateImg: {
//         height: moderateScale(20),
//         width: moderateScale(20)
//     },
//     checkBox: {
//         height: moderateScale(17.5),
//         width: moderateScale(17.5),
//         borderWidth: 1,
//         borderRadius: moderateScale(2),
//         borderColor: Colors.InputStroke
//     },
//     hideBox: {
//         alignItems: 'center',
//         flexDirection: 'row',
//         marginLeft: moderateScale(18),
//         marginTop: moderateScale(10)
//     },
//     waterMark: {
//         fontSize: moderateScale(13),
//         marginLeft: moderateScale(16),
//         marginTop: moderateScale(15),
//         color: Colors.black
//     },
//     radioButton: {
//         height: moderateScale(14),
//         width: moderateScale(14),
//         borderRadius: moderateScale(10),
//         borderWidth: 1,
//         alignItems: 'center',
//         justifyContent: "center"
//     },
//     innerView: {
//         height: moderateScale(10),
//         width: moderateScale(10),
//         borderRadius: moderateScale(10),
//         borderWidth: 1,
//         backgroundColor: Colors.primaryColor
//     },
//     logoText: {
//         color: Colors.black,
//         fontSize: moderateScale(12),
//         marginLeft: moderateScale(8)
//     },
//     logoMainBox: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginLeft: moderateScale(16)
//     },
//     parentLogo: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: moderateScale(4)
//     },
//     wishYouBox: {
//         paddingHorizontal: moderateScale(30),
//         paddingVertical: moderateScale(15),
//         borderWidth: 1,
//         marginHorizontal: moderateScale(16),
//         borderRadius: moderateScale(2),
//         borderColor: Colors.InputStroke,
//         marginTop: moderateScale(15)
//     },
//     withText: {
//         fontSize: moderateScale(14),
//         color: Colors.InputText,
//         fontFamily: Fonts.InterRegular
//     },



//     // ?????????????????????????????
//     uploadButton: {
//         backgroundColor: Colors.primary || '#007AFF',
//         borderRadius: moderateScale(12),
//         padding: moderateScale(20),
//         alignItems: 'center',
//     },
//     uploadText: {
//         color: Colors.white,
//         fontSize: moderateScale(16),
//         fontWeight: '600',
//         marginBottom: moderateScale(4),
//     },
//     uploadHint: {
//         color: 'rgba(255,255,255,0.8)',
//         fontSize: moderateScale(12),
//     },
//     logoContainer: {
//         alignItems: 'center',
//     },
//     logoImage: {
//         width: moderateScale(120),
//         height: moderateScale(120),
//         borderRadius: moderateScale(8),
//         marginBottom: moderateScale(12),
//     },
//     changeButton: {
//         paddingVertical: moderateScale(8),
//         paddingHorizontal: moderateScale(16),
//     },
//     changeText: {
//         color: Colors.primary || '#007AFF',
//         fontSize: moderateScale(14),
//     },
// });

// export default MyPdfScreen;

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
    TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker'; // ✅ CORRECT IMPORT
import ImageResizer from '@bam.tech/react-native-image-resizer';
import { Colors, Fonts } from '../../theme';
import { moderateScale } from '../../utils/responsiveSize';
import { Icons } from '../../assets/icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import HeaderPaperModule from '../../component/headerpapermodule/Headerpapermodule';
import Loader from '../../component/loader/Loader';
import AppTextInput from '../../component/apptextinput/AppTextInput';
import ClockIcon from "react-native-vector-icons/FontAwesome6";
import AppButton from '../../component/button/AppButton';
import { showToast } from '../../utils/toast';
import AppDropDown from '../../component/dropdown/AppDropDown';

export type DropDownItem = {
    label: string,
    value: string
}

const MyPdfScreen = () => {
    const navigation = useNavigation();
    const [loader, setLoader] = useState(false);

    // Logo upload states
    const [loading, setLoading] = useState(false);
    const [logoUri, setLogoUri] = useState<string | null>(null);
    const [logoFileName, setLogoFileName] = useState<string>('');
    // Form states
    const [instituteName, setInstituteName] = useState('');
    const [testName, setTestName] = useState('');
    const [time, setTime] = useState('2 Hours');
    const [hideDateTime, setHideDateTime] = useState(false);
    const [waterMarkType, setWaterMarkType] = useState('1');
    const [borderType, setBorderType] = useState('1');
    const [waterMarkLogo, setWaterMarkLogo] = useState<string | null>(null);
    const [borderImage, setBorderImage] = useState<string | null>(null);
    const [dropDownValue, setDropDownValue] = useState<string | null>(null);

    // date picker
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const formatDate = (date) => {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yy = String(date.getFullYear()).slice(-2);

        return `${dd}/${mm}/${yy}`;
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const handleHideDateTime = () => {
        setHideDateTime(!hideDateTime)
    }


    const data:DropDownItem[]  = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];

    // ✅ CORRECT: Select institute logo
    const selectAndResizeLogo = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'mixed',
                maxWidth: 1024,
                maxHeight: 1024,
                quality: 1,
                includeBase64: false,
            });

            if (result.didCancel) {
                console.log('User cancelled image picker');
                return;
            }

            if (result.errorCode) {
                Alert.alert('Error', result.errorMessage || 'Image picker error');
                return;
            }

            if (result.assets && result.assets[0]?.uri) {
                const asset = result.assets[0];
                await processInstituteLogo(
                    asset.uri,
                    asset.fileName || 'logo.jpg'
                );
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to open image picker');
            console.error(error);
        }
    };

    // ✅ Process logo to 320x320px, ≤50KB
    const processInstituteLogo = async (uri: string, fileName: string) => {
        try {
            setLoading(true);

            // First resize to 320x320
            const resizedImage = await ImageResizer.createResizedImage(
                uri,
                320,
                320,
                'JPEG',
                85,
                0,
                null,
                false,
                {
                    mode: 'contain',
                    onlyScaleDown: true,
                }
            );

            // Check file size
            const fileSize = await getFileSize(resizedImage.uri);
            let finalUri = resizedImage.uri;

            // Compress if > 50KB
            if (fileSize > 50 * 1024) {
                Alert.alert(
                    'Compressing',
                    'Optimizing image size...'
                );

                for (let quality = 70; quality >= 40; quality -= 10) {
                    try {
                        const compressed = await ImageResizer.createResizedImage(
                            uri,
                            320,
                            320,
                            'JPEG',
                            quality,
                            0,
                            null,
                            false
                        );

                        const compressedSize = await getFileSize(compressed.uri);
                        if (compressedSize <= 50 * 1024) {
                            finalUri = compressed.uri;
                            break;
                        }
                    } catch (err) {
                        console.warn(`Compression at ${quality}% failed:`, err);
                    }
                }
            }

            // Final size check
            const finalSize = await getFileSize(finalUri);

            if (finalSize > 50 * 1024) {
                Alert.alert(
                    'File Too Large',
                    'Please select a smaller image',
                    [{ text: 'OK' }]
                );
                setLoading(false);
                return;
            }

            setLogoUri(finalUri);
            setLogoFileName(fileName);
            setLoading(false);

            // Alert.alert(
            //     'Success',
            //     `Logo ready!\nSize: ${Math.round(finalSize / 1024)}KB`,
            //     [{ text: 'OK' }]
            // );
            showToast('success', 'Success', 'File upload successfully')

        } catch (error) {
            setLoading(false);
            Alert.alert('Error', 'Failed to process image');
            console.error(error);
        }
    };

    // ✅ Get file size without react-native-fs
    const getFileSize = async (uri: string): Promise<number> => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            return blob.size;
        } catch {
            return 0;
        }
    };

    // ✅ Select watermark
    const selectWatermark = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                maxWidth: 512,
                maxHeight: 512,
                quality: 0.8,
            });

            if (result.didCancel) return;
            if (result.errorCode) {
                Alert.alert('Error', result.errorMessage || 'Error');
                return;
            }

            if (result.assets && result.assets[0]?.uri) {
                const asset = result.assets[0];
                const resized = await ImageResizer.createResizedImage(
                    asset.uri,
                    150,
                    150,
                    'PNG',
                    80,
                    0,
                    null,
                    true
                );

                setWaterMarkLogo(resized.uri);
                Alert.alert('Success', 'Watermark added');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to select watermark');
        }
    };

    // ✅ Select border
    const selectBorder = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                maxWidth: 1024,
                maxHeight: 1024,
                quality: 0.9,
            });

            if (result.didCancel) return;
            if (result.errorCode) {
                Alert.alert('Error', result.errorMessage || 'Error');
                return;
            }

            if (result.assets && result.assets[0]?.uri) {
                const asset = result.assets[0];
                const resized = await ImageResizer.createResizedImage(
                    asset.uri,
                    800,
                    800,
                    'JPEG',
                    90,
                    0,
                    null,
                    false
                );

                setBorderImage(resized.uri);
                Alert.alert('Success', 'Border image added');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to select border');
        }
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const handlePreviewPdf = () => {
        if (!logoUri) {
            Alert.alert('Missing Logo', 'Please upload institute logo first');
            return;
        }

        setLoader(true);
        // Your PDF generation logic here
        setTimeout(() => {
            setLoader(false);
            Alert.alert('Success', 'PDF generated!');
        }, 1500);
    };

    const handleCancel = () => {
        Alert.alert(
            'Cancel',
            'Are you sure?',
            [
                { text: 'No', style: 'cancel' },
                { text: 'Yes', onPress: () => navigation.goBack() }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Colors.primaryColor} barStyle="dark-content" />

            <SafeAreaView style={{ backgroundColor: Colors.lightThemeBlue }} edges={['top']}>
                <HeaderPaperModule title='Generate PDF' leftIconPress={handleBack} />
            </SafeAreaView>

            <SafeAreaView style={styles.content} edges={['left', 'right', 'bottom']}>
                <Loader visible={loader || loading} />

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Institute Header Section */}
                    <View style={styles.section}>
                        <Text style={styles.title}>Institute Header (Size: 320x320px)</Text>

                        {logoUri ? (
                            <TouchableOpacity style={styles.logoContainer} onPress={selectAndResizeLogo}>
                                <Image source={{ uri: logoUri }} style={styles.logoImage} resizeMode='stretch'
                                />
                                {/* <Text style={styles.fileName}>{logoFileName}</Text> */}
                                {/* <TouchableOpacity 
                                    style={styles.changeButton}
                                    onPress={selectAndResizeLogo}
                                >
                                    <Text style={styles.changeText}>Change Logo</Text>
                                </TouchableOpacity> */}
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.uploadArea}
                                onPress={selectAndResizeLogo}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator size="large" color={Colors.primaryColor} />
                                ) : (
                                    <>
                                        <Image
                                            source={Icons?.fileUpload}
                                            style={styles.uploadIcon}
                                            resizeMode='contain'
                                        />
                                        {/* <Text style={styles.uploadText}>Upload Logo</Text>
                                        <Text style={styles.uploadHint}>Max 50KB • 320×320px</Text> */}
                                    </>
                                )}
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Form Fields */}
                    <View style={styles.insBox}>
                        <AppTextInput
                            containerStyle={{ width: '91.5%' }}
                            placeHolderText={'Institute Name'}
                            value={instituteName}
                            onChangeText={setInstituteName}
                        />
                    </View>
                    <AppTextInput
                        placeHolderText={'Enter Test Name'}
                        value={testName}
                        onChangeText={setTestName}
                        containerStyle={{ width: '91.5%' }}

                    // style={{ marginTop: moderateScale(15) }}
                    />

                    {/* Date/Time Section */}
                    {!hideDateTime &&
                        <View style={styles.dateTimeRow}>
                            <View style={styles.dateTimeItem}>
                                <Text style={styles.label}>Date</Text>
                                <TouchableOpacity style={styles.dateBox} onPress={showDatepicker}>
                                    <Text style={styles.dateText}>{formatDate(date)}</Text>
                                    <Image source={Icons.date} style={styles.dateIcon} resizeMode='contain' />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.dateTimeItem}>
                                <Text style={styles.label}>Time</Text>
                                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', borderWidth: 1, paddingHorizontal: moderateScale(10), borderRadius: moderateScale(4), borderColor: Colors.InputStroke, paddingVertical: moderateScale(1.5) }}>
                                    <TextInput placeholder='Minute' inputMode='numeric' style={{ width: moderateScale(110) }} />
                                    <ClockIcon name="clock-rotate-left" size={17} color="#999" />

                                </View>

                            </View>
                        </View>}
                    {show && (
                        <DateTimePicker
                            maximumDate={new Date()}
                            // testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            // is24Hour={true}
                            onChange={onChange}
                        />
                    )}
                    <TouchableOpacity
                        style={styles.checkboxRow}
                        onPress={handleHideDateTime}  >
                        <View style={styles.checkbox}>
                            {hideDateTime && <View style={styles.checkboxInner} />}
                        </View>
                        <Text style={styles.checkboxLabel}>Hide Date & Time</Text>
                    </TouchableOpacity>
                    {/* </View> */}

                    {/* Watermark Section */}
                    <View style={styles.section}>
                        <Text style={styles.title}>Water Mark</Text>
                        <View style={styles.optionRow}>
                            <TouchableOpacity
                                style={styles.optionItem}
                                onPress={() => setWaterMarkType('1')}>
                                <View style={styles.radio}>
                                    {waterMarkType === '1' && <View style={styles.radioSelected} />}
                                </View>
                                <Text style={styles.optionText}>Logo</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.optionItem}
                                onPress={() => setWaterMarkType('2')}>
                                <View style={styles.radio}>
                                    {waterMarkType === '2' && <View style={styles.radioSelected} />}
                                </View>
                                <Text style={styles.optionText}>Text</Text>
                            </TouchableOpacity>
                        </View>

                        {waterMarkType === '1' ? (
                            <TouchableOpacity
                                style={styles.uploadAreaSmall} onPress={selectWatermark}>
                                {waterMarkLogo ? (
                                    <Image source={{ uri: waterMarkLogo }} style={styles.smallImage} resizeMode='stretch' />
                                ) : (
                                    <>
                                        <Image source={Icons?.fileUpload} style={styles.smallIcon} resizeMode='cover' />
                                        {/* <Text style={styles.uploadTextSmall}>Upload Watermark</Text> */}
                                    </>
                                )}
                            </TouchableOpacity>
                        ) : (
                            <AppTextInput placeholder="Watermark text" />
                        )}
                    </View>

                    {/* Border Section */}
                    <View style={styles.section}>
                        <Text style={styles.title}>Border</Text>

                        <View style={styles.optionRow}>
                            <TouchableOpacity
                                style={styles.optionItem}
                                onPress={() => setBorderType('1')}
                            >
                                <View style={styles.radio}>
                                    {borderType === '1' && <View style={styles.radioSelected} />}
                                </View>
                                <Text style={styles.optionText}>With Border</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.optionItem}
                                onPress={() => setBorderType('2')}
                            >
                                <View style={styles.radio}>
                                    {borderType === '2' && <View style={styles.radioSelected} />}
                                </View>
                                <Text style={styles.optionText}>Without Border</Text>
                            </TouchableOpacity>
                        </View>

                        {borderType === '1' && (
                            <TouchableOpacity
                                style={styles.uploadAreaSmall}
                                onPress={selectBorder}
                            >
                                {borderImage ? (
                                    <Image source={{ uri: borderImage }} style={styles.smallImage} />
                                ) : (
                                    <>
                                        <Image source={Icons?.fileUpload} style={styles.smallIcon} />
                                        <Text style={styles.uploadTextSmall}>Upload Border</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Wish You Section */}
                    <View style={styles.section}>
                        <TouchableOpacity style={styles.wishBox}>
                            <Text style={styles.wishText}>Wish you all the best</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: moderateScale(0) }}>
                        <AppDropDown data={data} value={dropDownValue} setValue={setDropDownValue} placeHolderText={'Select A Number'}/>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.buttonRow}>
                        <AppButton
                            title="PDF Preview"
                            onPress={handlePreviewPdf}
                            style={styles.previewButton}
                        />
                        <AppButton
                            title="Cancel"
                            onPress={handleCancel}
                            style={styles.cancelButton}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    content: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    section: {
        marginHorizontal: moderateScale(16),
        marginTop: moderateScale(10),
        // borderWidth: 1
    },
    title: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.InstrumentSansRegular,
        color: Colors.black,
        marginBottom: moderateScale(10),
    },
    uploadArea: {
        borderWidth: 1,
        borderColor: Colors.InputStroke,
        borderStyle: 'solid',
        borderRadius: moderateScale(8),
        padding: moderateScale(22),
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    uploadIcon: {
        width: moderateScale(50),
        height: moderateScale(50),
        tintColor: Colors.primaryColor,
        // marginBottom: moderateScale(10),
    },
    uploadText: {
        fontSize: moderateScale(16),
        fontFamily: Fonts.InterSemiBold,
        color: Colors.primaryColor,
        marginBottom: moderateScale(4),
    },
    uploadHint: {
        fontSize: moderateScale(12),
        color: Colors.gray,
    },
    logoContainer: {
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: moderateScale(8),
        borderWidth: 1,
        borderColor: '#000',
        // padding: moderateScale(2),
        //  width: moderateScale(120),
        // height: moderateScale(100),
        // flex: 1,
        height: moderateScale(120)
        // flexWrap:"wrap"
    },
    logoImage: {
        // width: moderateScale(120),
        // height: moderateScale(120),
        height: '100%',
        width: '100%',
        borderRadius: moderateScale(4),
        // marginBottom: moderateScale(10),
        alignSelf: "center"
    },
    fileName: {
        fontSize: moderateScale(12),
        color: Colors.gray,
        // marginBottom: moderateScale(15),
    },
    changeButton: {
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(10),
        borderRadius: moderateScale(6),
    },
    changeText: {
        color: Colors.white,
        fontSize: moderateScale(14),
        fontFamily: Fonts.InterSemiBold,
    },
    dateTimeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',

        // marginTop: moderateScale(-120),
        marginHorizontal: moderateScale(6),
        marginTop: moderateScale(12)
    },
    dateTimeItem: {
        flex: 1,
        marginHorizontal: moderateScale(10),
        // borderWidth: 1
    },
    label: {
        fontSize: moderateScale(13),
        color: Colors.black,
        marginBottom: moderateScale(5),
        fontFamily: Fonts.InstrumentSansRegular
    },
    dateBox: {
        borderWidth: 1,
        borderColor: Colors.InputStroke,
        borderRadius: moderateScale(4),
        height: moderateScale(46),
        paddingHorizontal: moderateScale(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // width: '40%'

    },
    dateText: {
        fontSize: moderateScale(14),
        color: Colors.InputText,
    },
    dateIcon: {
        width: moderateScale(20),
        height: moderateScale(20),
        // tintColor: Colors.black,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(15),
        marginHorizontal: moderateScale(16.5)
    },
    checkbox: {
        width: moderateScale(18),
        height: moderateScale(18),
        borderWidth: 1,
        borderColor: Colors.InputStroke,
        borderRadius: moderateScale(3),
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxInner: {
        width: moderateScale(10),
        height: moderateScale(10),
        backgroundColor: Colors.primaryColor,
        borderRadius: moderateScale(2),
    },
    checkboxLabel: {
        fontSize: moderateScale(13),
        color: Colors.black,
        marginLeft: moderateScale(10),
        fontFamily: Fonts.InstrumentSansRegular
    },
    optionRow: {
        flexDirection: 'row',
        marginBottom: moderateScale(15),
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: moderateScale(25),
    },
    radio: {
        width: moderateScale(18),
        height: moderateScale(18),
        borderRadius: moderateScale(9),
        borderWidth: 2,
        borderColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioSelected: {
        width: moderateScale(10),
        height: moderateScale(10),
        borderRadius: moderateScale(5),
        backgroundColor: Colors.primaryColor,
    },
    optionText: {
        fontSize: moderateScale(12),
        color: Colors.black,
        marginLeft: moderateScale(8),
        fontFamily: Fonts.InstrumentSansRegular
    },
    uploadAreaSmall: {
        borderWidth: 1,
        borderColor: Colors.InputStroke,
        borderStyle: 'solid',
        borderRadius: moderateScale(8),
        // padding: moderateScale(20),
        // padding: moderateScale(22),
        // paddingVertical: moderateScale(10),
        // paddingHorizontal: moderateScale(22),
        height: moderateScale(104),
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#f8f9fa',
    },
    smallIcon: {
        width: moderateScale(48),
        height: moderateScale(48),
        tintColor: Colors.primaryColor,
        marginBottom: moderateScale(8),
    },
    smallImage: {
        // width: moderateScale(80),
        // height: moderateScale(80),
        width: '100%',
        height: '100%',
        borderRadius: moderateScale(4),
    },
    uploadTextSmall: {
        fontSize: moderateScale(14),
        color: Colors.primaryColor,
    },
    wishBox: {
        borderWidth: 1,
        borderColor: Colors.InputStroke,
        borderRadius: moderateScale(4),
        paddingVertical: moderateScale(15),
        // alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    wishText: {
        fontSize: moderateScale(14),
        color: Colors.ParagraphAndShortTexts,
        fontFamily: Fonts.InstrumentSansRegular,
        marginLeft: moderateScale(10)
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: moderateScale(16),
        marginTop: moderateScale(25),
        marginBottom: moderateScale(30),
    },
    previewButton: {
        flex: 1,
        marginRight: moderateScale(8),
        // borderRadius:0,
        // marginTop:moderateScale(-80)

    },
    cancelButton: {
        flex: 1,
        marginLeft: moderateScale(8),
        backgroundColor: Colors.primaryColor,
        borderWidth: 1,
        borderColor: Colors.primaryColor
    },
    insBox: {
        marginVertical: moderateScale(15)
    }
});

export default MyPdfScreen;