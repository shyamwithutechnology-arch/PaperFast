import React, { useState, useEffect } from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import { showToast } from '../../../utils/toast';
import { moderateScale, scale } from '../../../utils/responsiveSize';
import { Colors, Fonts } from '../../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderPaperModule from '../../../component/headerpapermodule/Headerpapermodule';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Loader from '../../../component/loader/Loader';
import { Icons } from "../../../assets/icons";
import AppTextInput from '../../../component/apptextinput/AppTextInput';
import AppDropDown from '../../../component/dropdown/AppDropDown';
import AppButton from '../../../component/button/AppButton';
import ClockIcon from "react-native-vector-icons/FontAwesome6";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer/rootReducer';
import { clearPDFQuestions } from '../../../redux/slices/pdfQuestionsSlice';

export type DropDownItem = {
    label: string,
    value: string
}

const PDFDetails = () => {
    const navigation = useNavigation();
    const [loader, setLoader] = useState(false);
    const route = useRoute();
    const dispatch = useDispatch();
    // GET: Read questions from Redux
    const pdfQuestions = useSelector((state: any) => state?.pdfQuestions?.questions || []);
    const showSolutions = route.params?.showSolutions || false;
    console.log('reeeeeeeeeeselectedQuestionDatapdfQuestions', pdfQuestions);
    console.log('showSolutions', pdfQuestions);

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
    const [waterMarkPosition, setWaterMarkPosition] = useState('1');
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


    // const data: DropDownItem[] = [
    //     { label: 'Item 1', value: '10' },
    //     { label: 'Item 2', value: '20' },
    //     { label: 'Item 3', value: '3' },
    //     { label: 'Item 4', value: '4' },
    //     { label: 'Item 5', value: '5' },
    //     { label: 'Item 6', value: '6' },
    //     { label: 'Item 7', value: '7' },
    //     { label: 'Item 8', value: '8' },
    // ];
    const data: DropDownItem[] = Array.from({ length: 120 }, (_, index) => ({
        label: `${index + 1}`,
        value: `${index + 1}`,
    }));

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
        // CLEAR: Remove all data
        // dispatch(clearPDFQuestions());
        navigation.goBack();
    };
    // const handleBack = () => {
    //     navigation.goBack();
    // };

    // const handlePreviewPdf = () => {
    //     if (!logoUri) {
    //         Alert.alert('Missing Logo', 'Please upload institute logo first');
    //         return;
    //     }

    //     setLoader(true);
    //     // Your PDF generation logic here
    //     setTimeout(() => {
    //         setLoader(false);
    //         Alert.alert('Success', 'PDF generated!');
    //         navigation.navigate('PDFPreviewScreen')
    //     }, 1500);
    // };
    // In PDFDetails.tsx - Update handlePreviewPdf function
    const handlePreviewPdf = () => {
        if (!logoUri) {
            Alert.alert('Missing Logo', 'Please upload institute logo first');
            return;
        }

        if (pdfQuestions.length === 0) {
            Alert.alert('No Questions', 'Please select questions first');
            return;
        }

        // Prepare preview data
        const previewData = {
            logoUri,
            instituteName,
            testName,
            date: formatDate(date),
            time,
            hideDateTime,
            waterMarkType,
            waterMarkPosition,
            waterMarkLogo,
            borderType,
            borderImage,
            showSolutions,
            dropDownValue,
            wishText: 'Wish you all the best',
        };

        // Navigate to Preview
        navigation.navigate('PDFPreviewScreen', {
            previewData,
        });
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

//   const selectedQuestoin = useSelector((state: any) => state?.pdfQuestions);
//   console.log('selectedQuestoinselectedQuestoinwww', selectedQuestoin);
    // useEffect(() => {
    //     // Alert.alert('sdaffffffffffffff', 'dfffffffffff')  
    //     console.log('=== QuestionListData Debug ===');
    //     const selectedQuestoin = useSelector((state: any) => state?.pdfQuestions);
    //     console.log('selectedQuestoinselectedQuestoineee', selectedQuestoin);
    //     console.log('Redux selected questions:', selectedQuestoin);
    //     console.log('Redux questions count:', selectedQuestoin.length);
    //     //   console.log('Local selectedMap count:', Object.keys(selectedMap).length);
    // }, [])
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
                            <>
                                <TouchableOpacity
                                    style={[styles.uploadAreaSmall,]} onPress={selectWatermark}>
                                    {waterMarkLogo ? (
                                        <Image source={{ uri: waterMarkLogo }} style={styles.smallImage} resizeMode='stretch' />
                                    ) : (
                                        <>
                                            <Image source={Icons?.fileUpload} style={styles.smallIcon} resizeMode='cover' />
                                            {/* <Text style={styles.uploadTextSmall}>Upload Watermark</Text> */}
                                        </>
                                    )}
                                </TouchableOpacity>
                                <View style={[styles.optionRow, { marginTop: moderateScale(6) }]}>
                                    <TouchableOpacity
                                        style={[styles.optionItem, { marginLeft: moderateScale(41) }]}
                                        onPress={() => setWaterMarkPosition('1')}>
                                        <View style={styles.radio}>
                                            {waterMarkPosition === '1' && <View style={styles.radioSelected} />}
                                        </View>
                                        <Text style={styles.optionText}>Front</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.optionItem}
                                        onPress={() => setWaterMarkPosition('2')}>
                                        <View style={styles.radio}>
                                            {waterMarkPosition === '2' && <View style={styles.radioSelected} />}
                                        </View>
                                        <Text style={styles.optionText}>Back</Text>
                                    </TouchableOpacity>

                                </View>
                            </>
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

                        {/* {borderType === '1' && (
                            <TouchableOpacity
                                style={styles.uploadAreaSmall}
                                onPress={selectBorder}ssssss
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
                        )} */}
                    </View>

                    {/* Wish You Section */}
                    <View style={styles.section}>
                        <TouchableOpacity style={styles.wishBox}>
                            <Text style={styles.wishText}>Wish you all the best</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: moderateScale(0) }}>
                        <AppDropDown data={data} value={dropDownValue} setValue={setDropDownValue} placeHolderText={'Select a number'} />
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
        width: moderateScale(15),
        height: moderateScale(15),
        borderRadius: moderateScale(9),
        borderWidth: 2,
        borderColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioSelected: {
        width: moderateScale(8),
        height: moderateScale(8),
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
        height: moderateScale(100),
        width: scale(300),
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: '#f8f9fa',
        alignSelf: "flex-end"
        // 
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

export default PDFDetails;


// screens/PDFDetails.tsx

// import React, { useState, useEffect } from 'react';
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
//     TextInput,
// } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import ImageResizer from '@bam.tech/react-native-image-resizer';
// import { showToast } from '../../../utils/toast';
// import { moderateScale } from '../../../utils/responsiveSize';
// import { Colors, Fonts } from '../../../theme';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import HeaderPaperModule from '../../../component/headerpapermodule/Headerpapermodule';
// import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
// import Loader from '../../../component/loader/Loader';
// import { Icons } from "../../../assets/icons";
// import AppTextInput from '../../../component/apptextinput/AppTextInput';
// import AppDropDown from '../../../component/dropdown/AppDropDown';
// import AppButton from '../../../component/button/AppButton';
// import ClockIcon from "react-native-vector-icons/FontAwesome6";

// export type DropDownItem = {
//     label: string,
//     value: string
// }

// interface QuestionItem {
//     question_id: string;
//     question_text: string;
//     solution_text: string;
//     answer_key: string;
//     difficulty: string;
//     created_at: string;
// }

// const PDFDetailsScreen = () => {
//     const navigation = useNavigation();
//     const route = useRoute();
//     const [loader, setLoader] = useState(false);

//     // Get selected questions from navigation params
//     const selectedQuestionsFromRoute = route.params?.selectedQuestions as QuestionItem[] || [];

//     // Logo upload states
//     const [loading, setLoading] = useState(false);
//     const [logoUri, setLogoUri] = useState<string | null>(null);
//     const [logoFileName, setLogoFileName] = useState<string>('');
//     // Form states
//     const [instituteName, setInstituteName] = useState('');
//     const [testName, setTestName] = useState('');
//     const [timeMinutes, setTimeMinutes] = useState('');
//     const [hideDateTime, setHideDateTime] = useState(false);
//     const [waterMarkType, setWaterMarkType] = useState('1');
//     const [borderType, setBorderType] = useState('1');
//     const [waterMarkLogo, setWaterMarkLogo] = useState<string | null>(null);
//     const [borderImage, setBorderImage] = useState<string | null>(null);
//     const [dropDownValue, setDropDownValue] = useState<string | null>(null);

//     // date picker
//     const [date, setDate] = useState(new Date());
//     const [mode, setMode] = useState('date');
//     const [show, setShow] = useState(false);

//     const onChange = (event, selectedDate) => {
//         const currentDate = selectedDate;
//         setShow(false);
//         setDate(currentDate);
//     };

//     const formatDate = (date) => {
//         const dd = String(date.getDate()).padStart(2, '0');
//         const mm = String(date.getMonth() + 1).padStart(2, '0');
//         const yy = String(date.getFullYear()).slice(-2);

//         return `${dd}/${mm}/${yy}`;
//     };

//     const showMode = (currentMode) => {
//         setShow(true);
//         setMode(currentMode);
//     };

//     const showDatepicker = () => {
//         showMode('date');
//     };

//     const handleHideDateTime = () => {
//         setHideDateTime(!hideDateTime)
//     }

//     const data: DropDownItem[] = [
//         { label: '1', value: '1' },
//         { label: '2', value: '2' },
//         { label: '3', value: '3' },
//         { label: '4', value: '4' },
//         { label: '5', value: '5' },
//         { label: '6', value: '6' },
//         { label: '7', value: '7' },
//         { label: '8', value: '8' },
//     ];

//     // Logo selection
//     const selectAndResizeLogo = async () => {
//         try {
//             const result = await launchImageLibrary({
//                 mediaType: 'photo',
//                 maxWidth: 1024,
//                 maxHeight: 1024,
//                 quality: 1,
//                 includeBase64: false,
//             });

//             if (result.didCancel) {
//                 console.log('User cancelled image picker');
//                 return;
//             }

//             if (result.errorCode) {
//                 Alert.alert('Error', result.errorMessage || 'Image picker error');
//                 return;
//             }

//             if (result.assets && result.assets[0]?.uri) {
//                 const asset = result.assets[0];
//                 await processInstituteLogo(
//                     asset.uri,
//                     asset.fileName || 'logo.jpg'
//                 );
//             }
//         } catch (error) {
//             Alert.alert('Error', 'Failed to open image picker');
//             console.error(error);
//         }
//     };

//     // Process logo
//     const processInstituteLogo = async (uri: string, fileName: string) => {
//         try {
//             setLoading(true);

//             const resizedImage = await ImageResizer.createResizedImage(
//                 uri,
//                 320,
//                 320,
//                 'JPEG',
//                 85,
//                 0,
//                 null,
//                 false,
//                 {
//                     mode: 'contain',
//                     onlyScaleDown: true,
//                 }
//             );

//             const fileSize = await getFileSize(resizedImage.uri);
//             let finalUri = resizedImage.uri;

//             if (fileSize > 50 * 1024) {
//                 for (let quality = 70; quality >= 40; quality -= 10) {
//                     try {
//                         const compressed = await ImageResizer.createResizedImage(
//                             uri,
//                             320,
//                             320,
//                             'JPEG',
//                             quality,
//                             0,
//                             null,
//                             false
//                         );

//                         const compressedSize = await getFileSize(compressed.uri);
//                         if (compressedSize <= 50 * 1024) {
//                             finalUri = compressed.uri;
//                             break;
//                         }
//                     } catch (err) {
//                         console.warn(`Compression at ${quality}% failed:`, err);
//                     }
//                 }
//             }

//             const finalSize = await getFileSize(finalUri);

//             if (finalSize > 50 * 1024) {
//                 Alert.alert(
//                     'File Too Large',
//                     'Please select a smaller image',
//                     [{ text: 'OK' }]
//                 );
//                 setLoading(false);
//                 return;
//             }

//             setLogoUri(finalUri);
//             setLogoFileName(fileName);
//             setLoading(false);

//             showToast('success', 'Success', 'Logo uploaded successfully')

//         } catch (error) {
//             setLoading(false);
//             Alert.alert('Error', 'Failed to process image');
//             console.error(error);
//         }
//     };

//     const getFileSize = async (uri: string): Promise<number> => {
//         try {
//             const response = await fetch(uri);
//             const blob = await response.blob();
//             return blob.size;
//         } catch {
//             return 0;
//         }
//     };

//     // Select watermark
//     const selectWatermark = async () => {
//         try {
//             const result = await launchImageLibrary({
//                 mediaType: 'photo',
//                 maxWidth: 512,
//                 maxHeight: 512,
//                 quality: 0.8,
//             });

//             if (result.didCancel) return;
//             if (result.errorCode) {
//                 Alert.alert('Error', result.errorMessage || 'Error');
//                 return;
//             }

//             if (result.assets && result.assets[0]?.uri) {
//                 const asset = result.assets[0];
//                 const resized = await ImageResizer.createResizedImage(
//                     asset.uri,
//                     150,
//                     150,
//                     'PNG',
//                     80,
//                     0,
//                     null,
//                     true
//                 );

//                 setWaterMarkLogo(resized.uri);
//                 showToast('success', 'Success', 'Watermark added');
//             }
//         } catch (error) {
//             Alert.alert('Error', 'Failed to select watermark');
//         }
//     };

//     // Select border
//     const selectBorder = async () => {
//         try {
//             const result = await launchImageLibrary({
//                 mediaType: 'photo',
//                 maxWidth: 1024,
//                 maxHeight: 1024,
//                 quality: 0.9,
//             });

//             if (result.didCancel) return;
//             if (result.errorCode) {
//                 Alert.alert('Error', result.errorMessage || 'Error');
//                 return;
//             }

//             if (result.assets && result.assets[0]?.uri) {
//                 const asset = result.assets[0];
//                 const resized = await ImageResizer.createResizedImage(
//                     asset.uri,
//                     800,
//                     800,
//                     'JPEG',
//                     90,
//                     0,
//                     null,
//                     false
//                 );

//                 setBorderImage(resized.uri);
//                 showToast('success', 'Success', 'Border image added');
//             }
//         } catch (error) {
//             Alert.alert('Error', 'Failed to select border');
//         }
//     };

//     const handleBack = () => {
//         navigation.goBack();
//     };

//     const handlePreviewPdf = () => {
//         // Validate required fields
//         if (!logoUri) {
//             Alert.alert('Missing Logo', 'Please upload institute logo first');
//             return;
//         }

//         if (selectedQuestionsFromRoute.length === 0) {
//             Alert.alert('No Questions', 'No questions selected for PDF generation');
//             return;
//         }

//         // Navigate to PDF Preview Screen
//         navigation.navigate('PDFDetailsScreen', {
//             // Form data
//             instituteName,
//             testName,
//             date: formatDate(date),
//             time: timeMinutes ? `${timeMinutes} Minutes` : '',
//             hideDateTime,
//             waterMarkType,
//             borderType,
//             waterMarkLogo,
//             borderImage,
//             logoUri,
//             dropDownValue,

//             // Questions data
//             selectedQuestions: selectedQuestionsFromRoute,
//         });
//     };

//     const handleCancel = () => {
//         Alert.alert(
//             'Cancel',
//             'Are you sure you want to cancel?',
//             [
//                 { text: 'No', style: 'cancel' },
//                 { text: 'Yes', onPress: () => navigation.goBack() }
//             ]
//         );
//     };

//     // Show selected questions count
//     useEffect(() => {
//         if (selectedQuestionsFromRoute.length > 0) {
//             showToast('info', 'Questions Loaded', `${selectedQuestionsFromRoute.length} questions selected`);
//         }
//     }, []);

//     return (
//         <View style={styles.container}>
//             <StatusBar backgroundColor={Colors.primaryColor} barStyle="dark-content" />

//             <SafeAreaView style={{ backgroundColor: Colors.lightThemeBlue }} edges={['top']}>
//                 <HeaderPaperModule title='Generate PDF' leftIconPress={handleBack} />
//             </SafeAreaView>

//             <SafeAreaView style={styles.content} edges={['left', 'right', 'bottom']}>
//                 <Loader visible={loader || loading} />

//                 <ScrollView showsVerticalScrollIndicator={false}>
//                     {/* Selected Questions Info */}
//                     {selectedQuestionsFromRoute.length > 0 && (
//                         <View style={styles.selectedQuestionsCard}>
//                             <Text style={styles.selectedQuestionsTitle}>
//                                 📝 Selected Questions: {selectedQuestionsFromRoute.length}
//                             </Text>
//                             <Text style={styles.selectedQuestionsHint}>
//                                 Questions are ready for PDF generation
//                             </Text>
//                         </View>
//                     )}

//                     {/* Institute Header Section */}
//                     <View style={styles.section}>
//                         <Text style={styles.title}>Institute Header (Size: 320x320px)</Text>

//                         {logoUri ? (
//                             <TouchableOpacity style={styles.logoContainer} onPress={selectAndResizeLogo}>
//                                 <Image source={{ uri: logoUri }} style={styles.logoImage} resizeMode='contain' />
//                             </TouchableOpacity>
//                         ) : (
//                             <TouchableOpacity
//                                 style={styles.uploadArea}
//                                 onPress={selectAndResizeLogo}
//                                 disabled={loading}
//                             >
//                                 {loading ? (
//                                     <ActivityIndicator size="large" color={Colors.primaryColor} />
//                                 ) : (
//                                     <>
//                                         <Image
//                                             source={Icons?.fileUpload}
//                                             style={styles.uploadIcon}
//                                             resizeMode='contain'
//                                         />
//                                         <Text style={styles.uploadHint}>Upload Institute Logo</Text>
//                                     </>
//                                 )}
//                             </TouchableOpacity>
//                         )}
//                     </View>

//                     {/* Form Fields */}
//                     <View style={styles.insBox}>
//                         <AppTextInput
//                             containerStyle={{ width: '91.5%' }}
//                             placeHolderText={'Institute Name'}
//                             value={instituteName}
//                             onChangeText={setInstituteName}
//                         />
//                     </View>

//                     <AppTextInput
//                         placeHolderText={'Enter Test Name'}
//                         value={testName}
//                         onChangeText={setTestName}
//                         containerStyle={{ width: '91.5%' }}
//                     />

//                     {/* Date/Time Section */}
//                     {!hideDateTime && (
//                         <View style={styles.dateTimeRow}>
//                             <View style={styles.dateTimeItem}>
//                                 <Text style={styles.label}>Date</Text>
//                                 <TouchableOpacity style={styles.dateBox} onPress={showDatepicker}>
//                                     <Text style={styles.dateText}>{formatDate(date)}</Text>
//                                     <Image source={Icons.date} style={styles.dateIcon} resizeMode='contain' />
//                                 </TouchableOpacity>
//                             </View>

//                             <View style={styles.dateTimeItem}>
//                                 <Text style={styles.label}>Time (Minutes)</Text>
//                                 <View style={styles.timeInputContainer}>
//                                     <TextInput
//                                         placeholder='Enter minutes'
//                                         inputMode='numeric'
//                                         style={styles.timeInput}
//                                         value={timeMinutes}
//                                         onChangeText={setTimeMinutes}
//                                     />
//                                     <ClockIcon name="clock-rotate-left" size={17} color="#999" />
//                                 </View>
//                             </View>
//                         </View>
//                     )}

//                     {show && (
//                         <DateTimePicker
//                             maximumDate={new Date()}
//                             value={date}
//                             mode={mode}
//                             onChange={onChange}
//                         />
//                     )}

//                     <TouchableOpacity
//                         style={styles.checkboxRow}
//                         onPress={handleHideDateTime}>
//                         <View style={styles.checkbox}>
//                             {hideDateTime && <View style={styles.checkboxInner} />}
//                         </View>
//                         <Text style={styles.checkboxLabel}>Hide Date & Time</Text>
//                     </TouchableOpacity>

//                     {/* Watermark Section */}
//                     <View style={styles.section}>
//                         <Text style={styles.title}>Water Mark</Text>
//                         <View style={styles.optionRow}>
//                             <TouchableOpacity
//                                 style={styles.optionItem}
//                                 onPress={() => setWaterMarkType('1')}>
//                                 <View style={styles.radio}>
//                                     {waterMarkType === '1' && <View style={styles.radioSelected} />}
//                                 </View>
//                                 <Text style={styles.optionText}>Logo</Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity
//                                 style={styles.optionItem}
//                                 onPress={() => setWaterMarkType('2')}>
//                                 <View style={styles.radio}>
//                                     {waterMarkType === '2' && <View style={styles.radioSelected} />}
//                                 </View>
//                                 <Text style={styles.optionText}>Text</Text>
//                             </TouchableOpacity>
//                         </View>

//                         {waterMarkType === '1' ? (
//                             <TouchableOpacity
//                                 style={styles.uploadAreaSmall} onPress={selectWatermark}>
//                                 {waterMarkLogo ? (
//                                     <Image source={{ uri: waterMarkLogo }} style={styles.smallImage} resizeMode='contain' />
//                                 ) : (
//                                     <>
//                                         <Image source={Icons?.fileUpload} style={styles.smallIcon} resizeMode='cover' />
//                                         <Text style={styles.uploadHintSmall}>Upload Watermark Logo</Text>
//                                     </>
//                                 )}
//                             </TouchableOpacity>
//                         ) : (
//                             <AppDropDown
//                                 data={data}
//                                 value={dropDownValue}
//                                 setValue={setDropDownValue}
//                                 placeHolderText={'Select Watermark Number'}
//                             />
//                         )}
//                     </View>

//                     {/* Border Section */}
//                     <View style={styles.section}>
//                         <Text style={styles.title}>Border</Text>

//                         <View style={styles.optionRow}>
//                             <TouchableOpacity
//                                 style={styles.optionItem}
//                                 onPress={() => setBorderType('1')}>
//                                 <View style={styles.radio}>
//                                     {borderType === '1' && <View style={styles.radioSelected} />}
//                                 </View>
//                                 <Text style={styles.optionText}>With Border</Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity
//                                 style={styles.optionItem}
//                                 onPress={() => setBorderType('2')}>
//                                 <View style={styles.radio}>
//                                     {borderType === '2' && <View style={styles.radioSelected} />}
//                                 </View>
//                                 <Text style={styles.optionText}>Without Border</Text>
//                             </TouchableOpacity>
//                         </View>

//                         {borderType === '1' && (
//                             <TouchableOpacity
//                                 style={styles.uploadAreaSmall}
//                                 onPress={selectBorder}>
//                                 {borderImage ? (
//                                     <Image source={{ uri: borderImage }} style={styles.smallImage} resizeMode='contain' />
//                                 ) : (
//                                     <>
//                                         <Image source={Icons?.fileUpload} style={styles.smallIcon} resizeMode='cover' />
//                                         <Text style={styles.uploadHintSmall}>Upload Border Image</Text>
//                                     </>
//                                 )}
//                             </TouchableOpacity>
//                         )}
//                     </View>

//                     {/* Wish You Section */}
//                     <View style={styles.section}>
//                         <TouchableOpacity style={styles.wishBox}>
//                             <Text style={styles.wishText}>Wish you all the best</Text>
//                         </TouchableOpacity>
//                     </View>

//                     {/* Action Buttons */}
//                     <View style={styles.buttonRow}>
//                         <AppButton
//                             title="Generate PDF"
//                             onPress={handlePreviewPdf}
//                             style={styles.previewButton}
//                             disabled={!logoUri || selectedQuestionsFromRoute.length === 0}
//                         />
//                         <AppButton
//                             title="Cancel"
//                             onPress={handleCancel}
//                             style={styles.cancelButton}
//                         />
//                     </View>
//                 </ScrollView>
//             </SafeAreaView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: Colors.white,
//     },
//     content: {
//         flex: 1,
//         backgroundColor: Colors.white,
//     },
//     selectedQuestionsCard: {
//         backgroundColor: Colors.lightThemeBlue + '20',
//         marginHorizontal: moderateScale(16),
//         marginTop: moderateScale(10),
//         padding: moderateScale(12),
//         borderRadius: moderateScale(8),
//         borderWidth: 1,
//         borderColor: Colors.primaryColor + '40',
//     },
//     selectedQuestionsTitle: {
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InterSemiBold,
//         color: Colors.primaryColor,
//         marginBottom: moderateScale(4),
//     },
//     selectedQuestionsHint: {
//         fontSize: moderateScale(12),
//         fontFamily: Fonts.InstrumentSansRegular,
//         color: Colors.gray,
//     },
//     section: {
//         marginHorizontal: moderateScale(16),
//         marginTop: moderateScale(10),
//     },
//     title: {
//         fontSize: moderateScale(14),
//         fontFamily: Fonts.InstrumentSansRegular,
//         color: Colors.black,
//         marginBottom: moderateScale(10),
//     },
//     uploadArea: {
//         borderWidth: 1,
//         borderColor: Colors.InputStroke,
//         borderStyle: 'dashed',
//         borderRadius: moderateScale(8),
//         padding: moderateScale(30),
//         alignItems: 'center',
//         backgroundColor: '#f8f9fa',
//     },
//     uploadIcon: {
//         width: moderateScale(50),
//         height: moderateScale(50),
//         tintColor: Colors.primaryColor,
//         marginBottom: moderateScale(10),
//     },
//     uploadHint: {
//         fontSize: moderateScale(12),
//         color: Colors.gray,
//         textAlign: 'center',
//     },
//     logoContainer: {
//         backgroundColor: '#f8f9fa',
//         borderRadius: moderateScale(8),
//         borderWidth: 1,
//         borderColor: Colors.InputStroke,
//         height: moderateScale(120),
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     logoImage: {
//         width: '100%',
//         height: '100%',
//         borderRadius: moderateScale(4),
//     },
//     dateTimeRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginHorizontal: moderateScale(6),
//         marginTop: moderateScale(12)
//     },
//     dateTimeItem: {
//         flex: 1,
//         marginHorizontal: moderateScale(10),
//     },
//     label: {
//         fontSize: moderateScale(13),
//         color: Colors.black,
//         marginBottom: moderateScale(5),
//         fontFamily: Fonts.InstrumentSansRegular
//     },
//     dateBox: {
//         borderWidth: 1,
//         borderColor: Colors.InputStroke,
//         borderRadius: moderateScale(4),
//         height: moderateScale(46),
//         paddingHorizontal: moderateScale(10),
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//     },
//     dateText: {
//         fontSize: moderateScale(14),
//         color: Colors.InputText,
//     },
//     dateIcon: {
//         width: moderateScale(20),
//         height: moderateScale(20),
//     },
//     timeInputContainer: {
//         flexDirection: 'row',
//         alignItems: "center",
//         justifyContent: 'space-between',
//         borderWidth: 1,
//         paddingHorizontal: moderateScale(10),
//         borderRadius: moderateScale(4),
//         borderColor: Colors.InputStroke,
//         paddingVertical: moderateScale(12),
//     },
//     timeInput: {
//         width: moderateScale(110),
//         fontSize: moderateScale(14),
//         color: Colors.InputText,
//     },
//     checkboxRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: moderateScale(15),
//         marginHorizontal: moderateScale(16.5)
//     },
//     checkbox: {
//         width: moderateScale(18),
//         height: moderateScale(18),
//         borderWidth: 1,
//         borderColor: Colors.InputStroke,
//         borderRadius: moderateScale(3),
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     checkboxInner: {
//         width: moderateScale(10),
//         height: moderateScale(10),
//         backgroundColor: Colors.primaryColor,
//         borderRadius: moderateScale(2),
//     },
//     checkboxLabel: {
//         fontSize: moderateScale(13),
//         color: Colors.black,
//         marginLeft: moderateScale(10),
//         fontFamily: Fonts.InstrumentSansRegular
//     },
//     optionRow: {
//         flexDirection: 'row',
//         marginBottom: moderateScale(15),
//     },
//     optionItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginRight: moderateScale(25),
//     },
//     radio: {
//         width: moderateScale(18),
//         height: moderateScale(18),
//         borderRadius: moderateScale(9),
//         borderWidth: 2,
//         borderColor: Colors.primaryColor,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     radioSelected: {
//         width: moderateScale(10),
//         height: moderateScale(10),
//         borderRadius: moderateScale(5),
//         backgroundColor: Colors.primaryColor,
//     },
//     optionText: {
//         fontSize: moderateScale(12),
//         color: Colors.black,
//         marginLeft: moderateScale(8),
//         fontFamily: Fonts.InstrumentSansRegular
//     },
//     uploadAreaSmall: {
//         borderWidth: 1,
//         borderColor: Colors.InputStroke,
//         borderStyle: 'dashed',
//         borderRadius: moderateScale(8),
//         height: moderateScale(104),
//         alignItems: 'center',
//         justifyContent: "center",
//         backgroundColor: '#f8f9fa',
//     },
//     smallIcon: {
//         width: moderateScale(40),
//         height: moderateScale(40),
//         tintColor: Colors.primaryColor,
//         marginBottom: moderateScale(8),
//     },
//     smallImage: {
//         width: '100%',
//         height: '100%',
//         borderRadius: moderateScale(4),
//     },
//     uploadHintSmall: {
//         fontSize: moderateScale(12),
//         color: Colors.gray,
//         textAlign: 'center',
//     },
//     wishBox: {
//         borderWidth: 1,
//         borderColor: Colors.InputStroke,
//         borderRadius: moderateScale(4),
//         paddingVertical: moderateScale(15),
//         backgroundColor: '#f8f9fa',
//     },
//     wishText: {
//         fontSize: moderateScale(14),
//         color: Colors.ParagraphAndShortTexts,
//         fontFamily: Fonts.InstrumentSansRegular,
//         textAlign: 'center',
//     },
//     buttonRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginHorizontal: moderateScale(16),
//         marginTop: moderateScale(25),
//         marginBottom: moderateScale(30),
//     },
//     previewButton: {
//         flex: 1,
//         marginRight: moderateScale(8),
//     },
//     cancelButton: {
//         flex: 1,
//         marginLeft: moderateScale(8),
//         backgroundColor: Colors.white,
//         borderWidth: 1,
//         borderColor: Colors.primaryColor,
//     },
//     insBox: {
//         marginVertical: moderateScale(15)
//     }
// });

// export default PDFDetailsScreen;