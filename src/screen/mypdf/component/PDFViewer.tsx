// // PDFViewer.tsx
// import React, { useState, useRef } from 'react';
// import {
//   View,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   TouchableOpacity,
//   Text,
//   Dimensions,
//   ActivityIndicator,
//   Alert,
//   Modal,
// } from 'react-native';
// import Pdf from 'react-native-pdf';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import IconEntypo from 'react-native-vector-icons/Entypo';
// import Share from 'react-native-share';
// import { moderateScale } from '../../../utils/responsiveSize';
// import { Colors, Fonts } from '../../../theme';

// const PDFViewer = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { filePath, fileName } = route.params as { filePath: string; fileName?: string };
  
//   const pdfRef = useRef(null);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [scale, setScale] = useState(1);
//   const [showControls, setShowControls] = useState(true);
//   const [zoomModalVisible, setZoomModalVisible] = useState(false);

//   const source = {
//     uri: `file://${filePath}`,
//     cache: true,
//   };

//   const handleShare = async () => {
//     try {
//       const shareOptions = {
//         title: 'Share PDF',
//         message: 'Question Paper PDF',
//         url: `file://${filePath}`,
//         type: 'application/pdf',
//       };
//       await Share.open(shareOptions);
//     } catch (error) {
//       console.log('Share error:', error);
//     }
//   };

//   const handleZoomIn = () => {
//     if (scale < 3) {
//       setScale(prev => prev + 0.5);
//     }
//   };

//   const handleZoomOut = () => {
//     if (scale > 0.5) {
//       setScale(prev => prev - 0.5);
//     }
//   };

//   const handleZoomReset = () => {
//     setScale(1);
//   };

//   const handleGoToPage = (pageNumber: number) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//       // Note: react-native-pdf doesn't have direct page navigation API
//       // You might need to implement custom navigation or use horizontal scrolling
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor={Colors.primaryColor} barStyle="dark-content" />
      
//       {/* Header - Visible when controls are shown */}
//       {showControls && (
//         <SafeAreaView style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//             <Icon name="arrow-back" size={24} color={Colors.white} />
//           </TouchableOpacity>
          
//           <View style={styles.titleContainer}>
//             <Text style={styles.title} numberOfLines={1}>
//               {fileName || 'PDF Preview'}
//             </Text>
//             <Text style={styles.pageInfo}>
//               {currentPage} / {totalPages}
//             </Text>
//           </View>
          
//           <TouchableOpacity onPress={handleShare} style={styles.iconButton}>
//             <Icon name="share" size={22} color={Colors.white} />
//           </TouchableOpacity>
//         </SafeAreaView>
//       )}
      
//       {/* PDF Viewer */}
//       <TouchableOpacity 
//         style={styles.pdfContainer}
//         activeOpacity={1}
//         onPress={() => setShowControls(!showControls)}
//       >
//         {loading && (
//           <View style={styles.loader}>
//             <ActivityIndicator size="large" color={Colors.primaryColor} />
//             <Text style={styles.loadingText}>Loading PDF...</Text>
//           </View>
//         )}
        
//         <Pdf
//           ref={pdfRef}
//           source={source}
//           onLoadComplete={(numberOfPages) => {
//             setTotalPages(numberOfPages);
//             setLoading(false);
//           }}
//           onPageChanged={(page) => {
//             setCurrentPage(page);
//           }}
//           onError={(error) => {
//             console.error('PDF Error:', error);
//             setLoading(false);
//             Alert.alert('Error', 'Failed to load PDF file');
//           }}
//           style={[styles.pdf, { transform: [{ scale }] }]}
//           enablePaging={true}
//           fitPolicy={0}
//           minScale={0.5}
//           maxScale={3}
//           scale={scale}
//           spacing={10}
//           enableAnnotationRendering={true}
//           horizontal={true}
//           trustAllCerts={false}
//         />
//       </TouchableOpacity>
      
//       {/* Floating Controls - Visible when controls are shown */}
//       {showControls && (
//         <View style={styles.floatingControls}>
//           <TouchableOpacity 
//             style={styles.controlButton}
//             onPress={handleZoomOut}
//             disabled={scale <= 0.5}
//           >
//             <Icon name="zoom-out" size={24} color={scale <= 0.5 ? Colors.gray : Colors.white} />
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             style={styles.controlButton}
//             onPress={() => setZoomModalVisible(true)}
//           >
//             <Text style={styles.zoomText}>{Math.round(scale * 100)}%</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             style={styles.controlButton}
//             onPress={handleZoomIn}
//             disabled={scale >= 3}
//           >
//             <Icon name="zoom-in" size={24} color={scale >= 3 ? Colors.gray : Colors.white} />
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             style={styles.controlButton}
//             onPress={handleZoomReset}
//           >
//             <IconEntypo name="resize-full-screen" size={22} color={Colors.white} />
//           </TouchableOpacity>
//         </View>
//       )}
      
//       {/* Bottom Navigation - Visible when controls are shown */}
//       {showControls && (
//         <View style={styles.bottomNav}>
//           <TouchableOpacity 
//             style={[styles.navButton, currentPage <= 1 && styles.disabledButton]}
//             disabled={currentPage <= 1}
//             onPress={() => handleGoToPage(currentPage - 1)}
//           >
//             <Icon name="chevron-left" size={28} color={currentPage <= 1 ? Colors.gray : Colors.primaryColor} />
//             <Text style={[styles.navText, currentPage <= 1 && styles.disabledText]}>Prev</Text>
//           </TouchableOpacity>
          
//           <View style={styles.pageInputContainer}>
//             <TextInput
//               style={styles.pageInput}
//               value={currentPage.toString()}
//               keyboardType="numeric"
//               onChangeText={(text) => {
//                 const page = parseInt(text);
//                 if (!isNaN(page)) {
//                   handleGoToPage(page);
//                 }
//               }}
//             />
//             <Text style={styles.pageTotal}> / {totalPages}</Text>
//           </View>
          
//           <TouchableOpacity 
//             style={[styles.navButton, currentPage >= totalPages && styles.disabledButton]}
//             disabled={currentPage >= totalPages}
//             onPress={() => handleGoToPage(currentPage + 1)}
//           >
//             <Text style={[styles.navText, currentPage >= totalPages && styles.disabledText]}>Next</Text>
//             <Icon name="chevron-right" size={28} color={currentPage >= totalPages ? Colors.gray : Colors.primaryColor} />
//           </TouchableOpacity>
//         </View>
//       )}
      
//       {/* Zoom Modal */}
//       <Modal
//         visible={zoomModalVisible}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setZoomModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Zoom Level</Text>
//             <View style={styles.zoomLevels}>
//               {[0.5, 0.75, 1, 1.5, 2, 3].map(level => (
//                 <TouchableOpacity
//                   key={level}
//                   style={[styles.zoomOption, scale === level && styles.zoomOptionSelected]}
//                   onPress={() => {
//                     setScale(level);
//                     setZoomModalVisible(false);
//                   }}
//                 >
//                   <Text style={[styles.zoomOptionText, scale === level && styles.zoomOptionTextSelected]}>
//                     {Math.round(level * 100)}%
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//             <TouchableOpacity 
//               style={styles.modalCloseButton}
//               onPress={() => setZoomModalVisible(false)}
//             >
//               <Text style={styles.modalCloseText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: Colors.primaryColor,
//     paddingHorizontal: moderateScale(16),
//     paddingVertical: moderateScale(12),
//   },
//   backButton: {
//     padding: moderateScale(4),
//   },
//   titleContainer: {
//     flex: 1,
//     marginLeft: moderateScale(12),
//   },
//   title: {
//     fontSize: moderateScale(16),
//     fontFamily: Fonts.InterSemiBold,
//     color: Colors.white,
//   },
//   pageInfo: {
//     fontSize: moderateScale(12),
//     color: Colors.white,
//     opacity: 0.8,
//     marginTop: 2,
//   },
//   iconButton: {
//     padding: moderateScale(8),
//   },
//   pdfContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loader: {
//     position: 'absolute',
//     zIndex: 10,
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: moderateScale(10),
//     fontSize: moderateScale(14),
//     color: Colors.white,
//   },
//   pdf: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
//   floatingControls: {
//     position: 'absolute',
//     right: moderateScale(20),
//     top: '50%',
//     transform: [{ translateY: -100 }],
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     borderRadius: moderateScale(25),
//     padding: moderateScale(8),
//   },
//   controlButton: {
//     padding: moderateScale(12),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   zoomText: {
//     color: Colors.white,
//     fontSize: moderateScale(14),
//     fontFamily: Fonts.InterMedium,
//   },
//   bottomNav: {
//     position: 'absolute',
//     bottom: moderateScale(20),
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: moderateScale(20),
//   },
//   navButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: Colors.white,
//     paddingHorizontal: moderateScale(20),
//     paddingVertical: moderateScale(10),
//     borderRadius: moderateScale(25),
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   disabledButton: {
//     opacity: 0.5,
//   },
//   navText: {
//     fontSize: moderateScale(14),
//     color: Colors.primaryColor,
//     fontFamily: Fonts.InterMedium,
//     marginHorizontal: moderateScale(8),
//   },
//   disabledText: {
//     color: Colors.gray,
//   },
//   pageInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: Colors.white,
//     borderRadius: moderateScale(20),
//     paddingHorizontal: moderateScale(15),
//     paddingVertical: moderateScale(8),
//   },
//   pageInput: {
//     fontSize: moderateScale(16),
//     color: Colors.primaryColor,
//     fontFamily: Fonts.InterSemiBold,
//     width: moderateScale(40),
//     textAlign: 'center',
//   },
//   pageTotal: {
//     fontSize: moderateScale(14),
//     color: Colors.gray,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'flex-end',
//   },
//   modalContent: {
//     backgroundColor: Colors.white,
//     borderTopLeftRadius: moderateScale(20),
//     borderTopRightRadius: moderateScale(20),
//     padding: moderateScale(20),
//   },
//   modalTitle: {
//     fontSize: moderateScale(18),
//     fontFamily: Fonts.InterSemiBold,
//     color: Colors.black,
//     marginBottom: moderateScale(20),
//     textAlign: 'center',
//   },
//   zoomLevels: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     marginBottom: moderateScale(20),
//   },
//   zoomOption: {
//     width: moderateScale(70),
//     padding: moderateScale(12),
//     margin: moderateScale(5),
//     borderRadius: moderateScale(10),
//     backgroundColor: '#f5f5f5',
//     alignItems: 'center',
//   },
//   zoomOptionSelected: {
//     backgroundColor: Colors.primaryColor,
//   },
//   zoomOptionText: {
//     fontSize: moderateScale(14),
//     color: Colors.black,
//   },
//   zoomOptionTextSelected: {
//     color: Colors.white,
//     fontFamily: Fonts.InterSemiBold,
//   },
//   modalCloseButton: {
//     padding: moderateScale(15),
//     alignItems: 'center',
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//   },
//   modalCloseText: {
//     fontSize: moderateScale(16),
//     color: Colors.primaryColor,
//     fontFamily: Fonts.InterMedium,
//   },
// });

// export default PDFViewer;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
  Linking,
} from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const PdfPreviewScreen = () => {
  const [generating, setGenerating] = useState(false);
  const [pdfPath, setPdfPath] = useState<string>('');

  // Generate PDF
  const generatePDF = async () => {
    try {
      setGenerating(true);
      
      const htmlContent = `
        <html>
          <body>
            <h1>Test Paper</h1>
            <!-- Your content here -->
          </body>
        </html>
      `;

      const options = {
        html: htmlContent,
        fileName: `Test_${Date.now()}`,
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      setPdfPath(file.filePath);
      
    } catch (error) {
      Alert.alert('Error', 'Failed to generate PDF');
    } finally {
      setGenerating(false);
    }
  };

  // Option 1: Save to Device
  const saveToDevice = async () => {
    if (!pdfPath) {
      Alert.alert('No PDF', 'Generate PDF first');
      return;
    }

    try {
      if (Platform.OS === 'android') {
        // For Android - copy to Downloads
        const downloadsPath = `${RNFS.DownloadDirectoryPath}/test_${Date.now()}.pdf`;
        await RNFS.copyFile(pdfPath, downloadsPath);
        Alert.alert('✅ Saved', 'PDF saved to Downloads');
      } else {
        // For iOS - use Share sheet
        await Share.open({
          url: `file://${pdfPath}`,
          saveToFiles: true,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Save failed');
    }
  };

  // Option 2: Share PDF
  const sharePDF = async () => {
    if (!pdfPath) return;
    
    try {
      await Share.open({
        url: `file://${pdfPath}`,
        title: 'Share PDF',
        type: 'application/pdf',
      });
    } catch (error) {
      if (error.message !== 'User did not share') {
        Alert.alert('Error', 'Share failed');
      }
    }
  };

  // Option 3: Open PDF (View)
  const openPDF = async () => {
    if (!pdfPath) return;
    
    try {
      await Linking.openURL(`file://${pdfPath}`);
    } catch (error) {
      Alert.alert('Error', 'Cannot open PDF');
    }
  };

  return (
    <View style={styles.container}>
      {generating ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={generatePDF}>
            <Text>Generate PDF</Text>
          </TouchableOpacity>
          
          {pdfPath && (
            <>
              <TouchableOpacity style={styles.button} onPress={openPDF}>
                <Text>📄 Open PDF</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.button} onPress={saveToDevice}>
                <Text>💾 Save PDF</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.button} onPress={sharePDF}>
                <Text>📤 Share PDF</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </View>
  );
};