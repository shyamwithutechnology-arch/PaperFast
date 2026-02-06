// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
//   Platform,
// } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import RNFS from 'react-native-fs';
// import Share from 'react-native-share';
// import { Colors, Fonts } from '../../theme';
// import { moderateScale } from '../../utils/responsiveSize';
// import HeaderPaperModule from '../../component/headerpapermodule/Headerpapermodule';
// import AppButton from '../../component/button/AppButton';


// interface QuestionItem {
//   question_id: string;
//   question_text: string;
//   solution_text: string;
//   answer_key: string;
//   difficulty: string;
//   created_at: string;
// }

// interface PdfPreviewScreenProps {
//   instituteName: string;
//   testName: string;
//   date: string;
//   time: string;
//   hideDateTime: boolean;
//   waterMarkType: string;
//   borderType: string;
//   waterMarkLogo: string | null;
//   borderImage: string | null;
//   logoUri: string;
//   selectedQuestions: QuestionItem[];
//   dropDownValue: string | null;
// }

// const PdfPreviewScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const [generating, setGenerating] = useState(false);
//   const [pdfPath, setPdfPath] = useState<string | null>(null);
//   const [pdfGenerated, setPdfGenerated] = useState(false);

//   // Extract all params
//   const {
//     instituteName = '',
//     testName = '',
//     date = '',
//     time = '',
//     hideDateTime = false,
//     waterMarkType = '1',
//     borderType = '1',
//     waterMarkLogo = null,
//     borderImage = null,
//     logoUri = null,
//     selectedQuestions = [],
//     dropDownValue = null,
//   } = route.params as PdfPreviewScreenProps;

//   const generateHTMLContent = () => {
//     let html = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8">
//         <title>${testName || 'Test Paper'}</title>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             margin: 0;
//             padding: 40px;
//             color: #333;
//             line-height: 1.6;
//           }
//           .header {
//             text-align: center;
//             margin-bottom: 40px;
//             padding-bottom: 20px;
//             border-bottom: 2px solid #3498db;
//           }
//           .institute-name {
//             font-size: 28px;
//             font-weight: bold;
//             color: #2c3e50;
//             margin: 20px 0 10px;
//           }
//           .test-name {
//             font-size: 22px;
//             color: #3498db;
//             margin-bottom: 15px;
//           }
//           .date-time {
//             font-size: 16px;
//             color: #7f8c8d;
//             margin-bottom: 20px;
//           }
//           .question-container {
//             margin: 30px 0;
//           }
//           .question-item {
//             margin-bottom: 40px;
//             padding-bottom: 20px;
//             border-bottom: 1px solid #ecf0f1;
//           }
//           .question-number {
//             font-size: 18px;
//             font-weight: bold;
//             color: #2c3e50;
//             margin-bottom: 10px;
//           }
//           .question-text {
//             font-size: 16px;
//             margin-bottom: 15px;
//             text-align: justify;
//           }
//           .solution-section, .answer-section {
//             margin-top: 15px;
//           }
//           .section-title {
//             font-weight: bold;
//             color: #27ae60;
//             margin-bottom: 8px;
//           }
//           .section-content {
//             font-size: 15px;
//             background: #f8f9fa;
//             padding: 12px;
//             border-radius: 6px;
//             border-left: 4px solid #3498db;
//           }
//           .footer {
//             margin-top: 60px;
//             text-align: center;
//             padding-top: 20px;
//             border-top: 1px solid #ddd;
//             color: #7f8c8d;
//             font-size: 14px;
//           }
//           .watermark {
//             position: fixed;
//             opacity: 0.1;
//             z-index: -1;
//             width: 300px;
//             height: 300px;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//           }
//           @media print {
//             body { padding: 20px; }
//             .footer { page-break-inside: avoid; }
//             .question-item { page-break-inside: avoid; }
//           }
//         </style>
//       </head>
//       <body>
//     `;

//     // Header with logo
//     html += `<div class="header">`;
//     if (logoUri) {
//       html += `<img src="${logoUri}" style="max-height: 120px; margin-bottom: 20px;" />`;
//     }
    
//     if (instituteName) {
//       html += `<div class="institute-name">${instituteName}</div>`;
//     }
    
//     if (testName) {
//       html += `<div class="test-name">${testName}</div>`;
//     }
    
//     if (!hideDateTime) {
//       html += `<div class="date-time">Date: ${date} | Time: ${time}</div>`;
//     }
//     html += `</div>`;

//     // Questions
//     html += `<div class="question-container">`;
//     selectedQuestions.forEach((q, index) => {
//       html += `
//         <div class="question-item">
//           <div class="question-number">Question ${index + 1}</div>
//           <div class="question-text">${q.question_text || 'N/A'}</div>
          
//           <div class="solution-section">
//             <div class="section-title">Solution:</div>
//             <div class="section-content">${q.solution_text || 'N/A'}</div>
//           </div>
          
//           <div class="answer-section">
//             <div class="section-title">Answer:</div>
//             <div class="section-content">${q.answer_key || 'N/A'}</div>
//           </div>
//         </div>
//       `;
//     });
//     html += `</div>`;

//     // Footer
//     html += `
//       <div class="footer">
//         <div style="font-style: italic; margin-bottom: 10px; color: #27ae60;">
//           <strong>Wish you all the best!</strong>
//         </div>
//         <div>Total Questions: ${selectedQuestions.length}</div>
//         <div>Generated on: ${new Date().toLocaleDateString()}</div>
//         <div>PDF will expire after 30 Days</div>
//       </div>
//     `;

//     // Watermark
//     if (waterMarkType === '1' && waterMarkLogo) {
//       html += `<img src="${waterMarkLogo}" class="watermark" />`;
//     } else if (waterMarkType === '2' && dropDownValue) {
//       html += `<div class="watermark" style="font-size: 80px; color: #ccc;">${dropDownValue}</div>`;
//     }

//     html += `</body></html>`;
//     return html;
//   };

//   const generatePDF = async () => {
//     try {
//       setGenerating(true);
      
//       const htmlContent = generateHTMLContent();
      
//       const options = {
//         html: htmlContent,
//         fileName: `TestPaper_${Date.now()}`,
//         directory: 'Documents',
//         base64: false,
//       };

//       const file = await RNHTMLtoPDF.convert(options);
      
//       if (!file.filePath) {
//         throw new Error('PDF generation failed');
//       }
      
//       setPdfPath(file.filePath);
//       setPdfGenerated(true);
      
//       Alert.alert(
//         '✅ PDF Generated',
//         'PDF has been created successfully!',
//         [{ text: 'OK' }]
//       );
      
//     } catch (error) {
//       console.error('PDF Generation Error:', error);
//       Alert.alert('Error', 'Failed to generate PDF');
//     } finally {
//       setGenerating(false);
//     }
//   };

//   const downloadPDF = async () => {
//     if (!pdfPath) {
//       Alert.alert('No PDF', 'Please generate PDF first');
//       return;
//     }

//     try {
//       // For Android - copy to Downloads
//       if (Platform.OS === 'android') {
//         const downloadsPath = `${RNFS.DownloadDirectoryPath}/TestPaper_${Date.now()}.pdf`;
//         await RNFS.copyFile(pdfPath, downloadsPath);
        
//         Alert.alert(
//           '✅ Downloaded',
//           'PDF saved to Downloads folder',
//           [{ text: 'OK' }]
//         );
//       } else {
//         // For iOS - use share sheet to save
//         await Share.open({
//           url: `file://${pdfPath}`,
//           saveToFiles: true,
//           type: 'application/pdf',
//         });
//       }
//     } catch (error) {
//       if (error.message !== 'User did not share') {
//         Alert.alert('Error', 'Failed to download PDF');
//       }
//     }
//   };

//   const sharePDF = async () => {
//     if (!pdfPath) return;
    
//     try {
//       await Share.open({
//         url: `file://${pdfPath}`,
//         title: 'Test Paper',
//         message: 'Check out this test paper',
//         type: 'application/pdf',
//       });
//     } catch (error) {
//       if (error.message !== 'User did not share') {
//         Alert.alert('Error', 'Failed to share PDF');
//       }
//     }
//   };

//   const handleBack = () => {
//     navigation.goBack();
//   };

//   // Auto-generate on mount
//   useEffect(() => {
//     if (selectedQuestions.length > 0 && !pdfGenerated) {
//       generatePDF();
//     }
//   }, []);

//   return (
//     <View style={styles.container}>
//       <HeaderPaperModule title="PDF Ready" leftIconPress={handleBack} />
      
//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* Success Message */}
//         <View style={styles.successCard}>
//           <Text style={styles.successTitle}>✅ PDF Ready</Text>
//           <Text style={styles.successText}>
//             Your PDF has been generated successfully. You can...
//           </Text>
//         </View>

//         {/* PDF Info */}
//         <View style={styles.pdfInfoCard}>
//           <Text style={styles.pdfTitle}>My PDF</Text>
//           <Text style={styles.expiryText}>PDF will expire after 30 Days</Text>
          
//           {/* Questions List */}
//           {selectedQuestions.map((q, index) => (
//             <View key={index} style={styles.questionPreview}>
//               <Text style={styles.questionMeta}>
//                 Question {index + 1}
//               </Text>
//               <View style={styles.tagsRow}>
//                 <Text style={styles.tag}>[Question]</Text>
//                 <Text style={styles.tag}>[Solution]</Text>
//                 <Text style={styles.tag}>[Answer]</Text>
//               </View>
//               {index < selectedQuestions.length - 1 && <View style={styles.divider} />}
//             </View>
//           ))}
//         </View>

//         {/* Status */}
//         {generating ? (
//           <View style={styles.statusContainer}>
//             <ActivityIndicator size="large" color={Colors.primaryColor} />
//             <Text style={styles.statusText}>Generating PDF...</Text>
//           </View>
//         ) : pdfGenerated ? (
//           <View style={styles.successStatus}>
//             <Text style={styles.successStatusText}>✅ PDF Generated Successfully</Text>
//           </View>
//         ) : null}

//         {/* Action Buttons */}
//         <View style={styles.buttonContainer}>
//           {pdfGenerated ? (
//             <>
//               <AppButton
//                 title="📥 Download PDF"
//                 onPress={downloadPDF}
//                 style={styles.downloadButton}
//               />
              
//               <AppButton
//                 title="📤 Share PDF"
//                 onPress={sharePDF}
//                 style={styles.shareButton}
//               />
//             </>
//           ) : (
//             <AppButton
//               title="Generate PDF"
//               onPress={generatePDF}
//               disabled={generating}
//               style={styles.generateButton}
//             />
//           )}
          
//           <AppButton
//             title="Regenerate PDF"
//             onPress={generatePDF}
//             disabled={generating}
//             style={styles.regenerateButton}
//           />
//         </View>

//         {/* PDF Details */}
//         <View style={styles.detailsCard}>
//           <Text style={styles.detailsTitle}>PDF Details:</Text>
//           <Text style={styles.detailItem}>• Institute: {instituteName || 'N/A'}</Text>
//           <Text style={styles.detailItem}>• Test: {testName || 'N/A'}</Text>
//           <Text style={styles.detailItem}>• Questions: {selectedQuestions.length}</Text>
//           <Text style={styles.detailItem}>• Date: {hideDateTime ? 'Hidden' : date}</Text>
//           <Text style={styles.detailItem}>• Generated: {new Date().toLocaleString()}</Text>
//         </View>
//       </ScrollView>

//       {/* Bottom Navigation */}
//       <View style={styles.bottomNav}>
//         <TouchableOpacity 
//           style={styles.navItem} 
//           onPress={() => navigation.navigate('Home')}
//         >
//           <Text style={styles.navText}>Home</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={styles.navItem}
//           onPress={() => navigation.navigate('MyPdfScreen')}
//         >
//           <Text style={[styles.navText, styles.activeNav]}>My Pdf</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={styles.navItem}
//           onPress={() => navigation.navigate('MyDraft')}
//         >
//           <Text style={styles.navText}>My Draft</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={styles.navItem}
//           onPress={() => navigation.navigate('Profile')}
//         >
//           <Text style={styles.navText}>Profile</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.white,
//   },
//   content: {
//     flex: 1,
//     padding: moderateScale(16),
//   },
//   successCard: {
//     backgroundColor: '#E8F5E9',
//     padding: moderateScale(20),
//     borderRadius: moderateScale(12),
//     alignItems: 'center',
//     marginBottom: moderateScale(20),
//   },
//   successTitle: {
//     fontSize: moderateScale(24),
//     fontFamily: Fonts.InterSemiBold,
//     color: Colors.success,
//     marginBottom: moderateScale(8),
//   },
//   successText: {
//     fontSize: moderateScale(14),
//     fontFamily: Fonts.InstrumentSansRegular,
//     color: Colors.gray,
//     textAlign: 'center',
//   },
//   pdfInfoCard: {
//     backgroundColor: Colors.white,
//     borderRadius: moderateScale(12),
//     padding: moderateScale(16),
//     marginBottom: moderateScale(20),
//     borderWidth: 1,
//     borderColor: Colors.InputStroke,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   pdfTitle: {
//     fontSize: moderateScale(20),
//     fontFamily: Fonts.InterSemiBold,
//     color: Colors.black,
//     marginBottom: moderateScale(8),
//   },
//   expiryText: {
//     fontSize: moderateScale(12),
//     fontFamily: Fonts.InstrumentSansRegular,
//     color: Colors.gray,
//     marginBottom: moderateScale(16),
//   },
//   questionPreview: {
//     marginBottom: moderateScale(12),
//   },
//   questionMeta: {
//     fontSize: moderateScale(14),
//     fontFamily: Fonts.InterSemiBold,
//     color: Colors.black,
//     marginBottom: moderateScale(8),
//   },
//   tagsRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   tag: {
//     fontSize: moderateScale(11),
//     fontFamily: Fonts.InstrumentSansRegular,
//     color: Colors.primaryColor,
//     backgroundColor: Colors.lightThemeBlue + '40',
//     paddingHorizontal: moderateScale(8),
//     paddingVertical: moderateScale(4),
//     borderRadius: moderateScale(4),
//     marginRight: moderateScale(8),
//     marginBottom: moderateScale(4),
//   },
//   divider: {
//     height: 1,
//     backgroundColor: Colors.InputStroke,
//     marginVertical: moderateScale(12),
//   },
//   statusContainer: {
//     alignItems: 'center',
//     padding: moderateScale(20),
//     marginVertical: moderateScale(10),
//   },
//   statusText: {
//     fontSize: moderateScale(16),
//     fontFamily: Fonts.InstrumentSansRegular,
//     color: Colors.gray,
//     marginTop: moderateScale(12),
//   },
//   successStatus: {
//     backgroundColor: '#E8F5E9',
//     padding: moderateScale(16),
//     borderRadius: moderateScale(8),
//     marginVertical: moderateScale(10),
//     alignItems: 'center',
//   },
//   successStatusText: {
//     fontSize: moderateScale(16),
//     fontFamily: Fonts.InterSemiBold,
//     color: Colors.success,
//   },
//   buttonContainer: {
//     gap: moderateScale(12),
//     marginVertical: moderateScale(20),
//   },
//   downloadButton: {
//     backgroundColor: Colors.success,
//     paddingVertical: moderateScale(16),
//   },
//   shareButton: {
//     backgroundColor: Colors.secondaryColor,
//     paddingVertical: moderateScale(16),
//   },
//   generateButton: {
//     backgroundColor: Colors.primaryColor,
//     paddingVertical: moderateScale(16),
//   },
//   regenerateButton: {
//     backgroundColor: Colors.warning,
//     paddingVertical: moderateScale(16),
//   },
//   detailsCard: {
//     backgroundColor: Colors.white,
//     borderRadius: moderateScale(12),
//     padding: moderateScale(16),
//     borderWidth: 1,
//     borderColor: Colors.InputStroke,
//     marginBottom: moderateScale(20),
//   },
//   detailsTitle: {
//     fontSize: moderateScale(16),
//     fontFamily: Fonts.InterSemiBold,
//     color: Colors.black,
//     marginBottom: moderateScale(12),
//   },
//   detailItem: {
//     fontSize: moderateScale(14),
//     fontFamily: Fonts.InstrumentSansRegular,
//     color: Colors.gray,
//     marginBottom: moderateScale(6),
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     borderTopWidth: 1,
//     borderTopColor: Colors.InputStroke,
//     backgroundColor: Colors.white,
//   },
//   navItem: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: moderateScale(12),
//   },
//   navText: {
//     fontSize: moderateScale(12),
//     fontFamily: Fonts.InstrumentSansRegular,
//     color: Colors.gray,
//   },
//   activeNav: {
//     color: Colors.primaryColor,
//     fontFamily: Fonts.InterSemiBold,
//   },
// });

// export default PdfPreviewScreen;
// ***********************************************************

// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
//   Platform,
// } from 'react-native';
// import { WebView } from 'react-native-webview';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import RNFS from 'react-native-fs';
// import Share from 'react-native-share';
// import { Colors, Fonts } from '../../theme';
// import { moderateScale, verticalScale } from '../../utils/responsiveSize';
// import HeaderPaperModule from '../../component/headerpapermodule/Headerpapermodule';
// import AppButton from '../../component/button/AppButton';

// interface QuestionItem {
//   question_id: string;
//   question_text: string;
//   solution_text: string;
//   answer_key: string;
//   difficulty: string;
//   created_at: string;
// }

// interface PdfPreviewScreenProps {
//   instituteName: string;
//   testName: string;
//   date: string;
//   time: string;
//   hideDateTime: boolean;
//   waterMarkType: string;
//   borderType: string;
//   waterMarkLogo: string | null;
//   borderImage: string | null;
//   logoUri: string;
//   selectedQuestions: QuestionItem[];
//   dropDownValue: string | null;
// }

// const PdfPreviewScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const [generating, setGenerating] = useState(false);
//   const [pdfPath, setPdfPath] = useState<string | null>(null);
//   const [pdfGenerated, setPdfGenerated] = useState(false);
//   const webViewRef = useRef(null);

//   // Extract all params
//   const {
//     instituteName = '',
//     testName = '',
//     date = '',
//     time = '',
//     hideDateTime = false,
//     waterMarkType = '1',
//     borderType = '1',
//     waterMarkLogo = null,
//     borderImage = null,
//     logoUri = null,
//     selectedQuestions = [],
//     dropDownValue = null,
//   } = route.params as PdfPreviewScreenProps;

//   const generateHTMLContent = () => {
//     let html = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8">
//         <title>${testName || 'Test Paper'}</title>
//         <style>
//           @media print {
//             @page {
//               margin: 20mm;
//               size: A4;
//             }
//             body {
//               font-family: 'Arial', sans-serif;
//               margin: 0;
//               padding: 0;
//               font-size: 12pt;
//               line-height: 1.6;
//             }
//           }
          
//           body {
//             font-family: 'Arial', sans-serif;
//             margin: 20px;
//             padding: 0;
//             font-size: 14px;
//             line-height: 1.6;
//             color: #333;
//           }
          
//           .header {
//             text-align: center;
//             margin-bottom: 40px;
//             padding-bottom: 20px;
//             border-bottom: 2px solid #3498db;
//           }
          
//           .institute-name {
//             font-size: 24px;
//             font-weight: bold;
//             color: #2c3e50;
//             margin: 10px 0;
//           }
          
//           .test-name {
//             font-size: 20px;
//             color: #3498db;
//             margin-bottom: 10px;
//           }
          
//           .date-time {
//             font-size: 14px;
//             color: #7f8c8d;
//           }
          
//           .question-container {
//             margin: 30px 0;
//           }
          
//           .question-item {
//             margin-bottom: 30px;
//             padding-bottom: 20px;
//             border-bottom: 1px solid #eee;
//             page-break-inside: avoid;
//           }
          
//           .question-number {
//             font-weight: bold;
//             color: #2c3e50;
//             margin-bottom: 10px;
//             font-size: 16px;
//           }
          
//           .question-text {
//             margin-bottom: 15px;
//           }
          
//           .solution-section, .answer-section {
//             margin-top: 10px;
//           }
          
//           .section-title {
//             font-weight: bold;
//             color: #27ae60;
//             margin-bottom: 5px;
//           }
          
//           .section-content {
//             background: #f8f9fa;
//             padding: 10px;
//             border-radius: 5px;
//             border-left: 4px solid #3498db;
//           }
          
//           .footer {
//             margin-top: 50px;
//             text-align: center;
//             padding-top: 20px;
//             border-top: 1px solid #ddd;
//             color: #7f8c8d;
//             font-size: 12px;
//           }
          
//           .watermark {
//             position: fixed;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//             opacity: 0.1;
//             font-size: 80px;
//             color: #ccc;
//             z-index: -1;
//           }
//         </style>
//         <script>
//           function printPDF() {
//             window.print();
//             return "PDF ready for printing";
//           }
//         </script>
//       </head>
//       <body>
//     `;

//     // Header
//     html += `<div class="header">`;
//     if (instituteName) {
//       html += `<div class="institute-name">${instituteName}</div>`;
//     }
//     if (testName) {
//       html += `<div class="test-name">${testName}</div>`;
//     }
//     if (!hideDateTime) {
//       html += `<div class="date-time">Date: ${date} | Time: ${time}</div>`;
//     }
//     html += `</div>`;

//     // Questions
//     html += `<div class="question-container">`;
//     selectedQuestions.forEach((q, index) => {
//       html += `
//         <div class="question-item">
//           <div class="question-number">Question ${index + 1}</div>
//           <div class="question-text">${q.question_text || 'N/A'}</div>
          
//           <div class="solution-section">
//             <div class="section-title">Solution:</div>
//             <div class="section-content">${q.solution_text || 'N/A'}</div>
//           </div>
          
//           <div class="answer-section">
//             <div class="section-title">Answer:</div>
//             <div class="section-content">${q.answer_key || 'N/A'}</div>
//           </div>
//         </div>
//       `;
//     });
//     html += `</div>`;

//     // Footer
//     html += `
//       <div class="footer">
//         <div style="font-style: italic; color: #27ae60; margin-bottom: 10px;">
//           <strong>Wish you all the best!</strong>
//         </div>
//         <div>Total Questions: ${selectedQuestions.length}</div>
//         <div>Generated on: ${new Date().toLocaleDateString()}</div>
//         <div>PDF will expire after 30 Days</div>
//       </div>
//     `;

//     // Watermark
//     if (waterMarkType === '2' && dropDownValue) {
//       html += `<div class="watermark">${dropDownValue}</div>`;
//     }

//     html += `</body></html>`;
//     return html;
//   };

//   const printPDF = async () => {
//     try {
//       setGenerating(true);
      
//       // Trigger print from WebView
//       if (webViewRef.current) {
//         webViewRef.current.injectJavaScript(`
//           window.print();
//           true;
//         `);
        
//         // Simulate PDF generation
//         setTimeout(() => {
//           setPdfGenerated(true);
//           setGenerating(false);
//           Alert.alert(
//             '✅ PDF Ready',
//             'PDF has been prepared. You can now download or share it.',
//             [{ text: 'OK' }]
//           );
//         }, 2000);
//       }
//     } catch (error) {
//       console.error('Print error:', error);
//       setGenerating(false);
//     }
//   };

//   const downloadPDF = async () => {
//     try {
//       // Create HTML file
//       const htmlContent = generateHTMLContent();
//       const fileName = `TestPaper_${Date.now()}.html`;
//       const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      
//       await RNFS.writeFile(filePath, htmlContent, 'utf8');
      
//       // For Android - copy to Downloads
//       if (Platform.OS === 'android') {
//         const downloadsPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
//         await RNFS.copyFile(filePath, downloadsPath);
        
//         Alert.alert(
//           '✅ Downloaded',
//           'File saved to Downloads folder',
//           [{ text: 'OK' }]
//         );
//       } else {
//         // For iOS - share as HTML
//         await Share.open({
//           url: `file://${filePath}`,
//           type: 'text/html',
//           filename: `TestPaper_${Date.now()}.html`,
//         });
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to save file');
//     }
//   };

//   const sharePDF = async () => {
//     try {
//       const htmlContent = generateHTMLContent();
//       const fileName = `TestPaper_${Date.now()}.html`;
//       const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      
//       await RNFS.writeFile(filePath, htmlContent, 'utf8');
      
//       await Share.open({
//         url: `file://${filePath}`,
//         title: 'Test Paper',
//         message: 'Check out this test paper',
//         type: 'text/html',
//         filename: `TestPaper_${Date.now()}.html`,
//       });
//     } catch (error) {
//       if (error.message !== 'User did not share') {
//         Alert.alert('Error', 'Failed to share file');
//       }
//     }
//   };

//   const handleBack = () => {
//     navigation.goBack();
//   };

//   const htmlContent = generateHTMLContent();

//   return (
//     <View style={styles.container}>
//       <HeaderPaperModule title="PDF Preview" leftIconPress={handleBack} />
      
//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* Success Message */}
//         <View style={styles.successCard}>
//           <Text style={styles.successTitle}>📄 PDF Preview</Text>
//           <Text style={styles.successText}>
//             Preview your test paper below. You can print, download, or share it.
//           </Text>
//         </View>

//         {/* WebView Preview */}
//         <View style={styles.webViewContainer}>
//           <WebView
//             ref={webViewRef}
//             originWhitelist={['*']}
//             source={{ html: htmlContent }}
//             style={styles.webView}
//             javaScriptEnabled={true}
//             domStorageEnabled={true}
//             startInLoadingState={true}
//             containerStyle={{ flex: 1 , paddingHorizontal:moderateScale(1)}}
//             renderLoading={() => (
//               <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color={Colors.primaryColor} />
//               </View>
//             )}
//           />
//         </View>

//         {/* Action Buttons */}
//         <View style={styles.buttonContainer}>
//           <AppButton
//             title={generating ? "Preparing..." : "🖨️ Generate & Print PDF"}
//             onPress={printPDF}
//             disabled={generating}
//             style={styles.generateButton}
//           />
          
//           <AppButton
//             title="💾 Download as HTML"
//             onPress={downloadPDF}
//             style={styles.downloadButton}
//           />
          
//           <AppButton
//             title="📤 Share"
//             onPress={sharePDF}
//             style={styles.shareButton}
//           />
//         </View>

//         {/* Instructions */}
//         <View style={styles.instructionsCard}>
//           <Text style={styles.instructionsTitle}>Instructions:</Text>
//           <Text style={styles.instructionItem}>1. Click "Generate & Print PDF" to create printable version</Text>
//           <Text style={styles.instructionItem}>2. Use browser's print dialog to save as PDF</Text>
//           <Text style={styles.instructionItem}>3. Or download as HTML file</Text>
//           <Text style={styles.instructionItem}>4. Share via email or other apps</Text>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.black,
//   },
//   content: {
//     flex: 1,
//   },
//   successCard: {
//     backgroundColor: Colors.lightThemeBlue + '20',
//     padding: moderateScale(20),
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.InputStroke,
//   },
//   successTitle: {
//     fontSize: moderateScale(22),
//     fontFamily: Fonts.InterSemiBold,
//     color: Colors.primaryColor,
//     marginBottom: moderateScale(8),
//   },
//   successText: {
//     fontSize: moderateScale(14),
//     fontFamily: Fonts.InstrumentSansRegular,
//     color: Colors.gray,
//     textAlign: 'center',
//   },
//   webViewContainer: {
//     height: verticalScale(400),
//     margin: moderateScale(10),
//     borderRadius: moderateScale(8),
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: Colors.InputStroke,
//     // paddingHorizontal:moderateScale(10),
//     // width:'100%'
//   },
//   webView: {
//     flex: 1,
//     padding: moderateScale(10),
//     marginHorizontal: moderateScale(10),
//     // paddingHorizontal:moderateScale(10),
//     // backgroundColor:'res'
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: Colors.white,
//   },
//   buttonContainer: {
//     padding: moderateScale(16),
//     gap: moderateScale(12),
//   },
//   generateButton: {
//     backgroundColor: Colors.primaryColor,
//     paddingVertical: moderateScale(16),
//   },
//   downloadButton: {
//     backgroundColor: Colors.success,
//     paddingVertical: moderateScale(16),
//   },
//   shareButton: {
//     backgroundColor: Colors.secondaryColor,
//     paddingVertical: moderateScale(16),
//   },
//   instructionsCard: {
//     backgroundColor: Colors.white,
//     padding: moderateScale(16),
//     margin: moderateScale(16),
//     borderRadius: moderateScale(8),
//     borderWidth: 1,
//     borderColor: Colors.InputStroke,
//   },
//   instructionsTitle: {
//     fontSize: moderateScale(16),
//     fontFamily: Fonts.InterSemiBold,
//     color: Colors.black,
//     marginBottom: moderateScale(12),
//   },
//   instructionItem: {
//     fontSize: moderateScale(13),
//     fontFamily: Fonts.InstrumentSansRegular,
//     color: Colors.gray,
//     marginBottom: moderateScale(6),
//     marginLeft: moderateScale(10),
//   },
// });

// export default PdfPreviewScreen;







// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
//   Platform,
// } from 'react-native';
// import { WebView } from 'react-native-webview';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import RNFS from 'react-native-fs';
// import Share from 'react-native-share';
// import { Colors, Fonts } from '../../theme';
// import { moderateScale, verticalScale } from '../../utils/responsiveSize';
// import HeaderPaperModule from '../../component/headerpapermodule/Headerpapermodule';
// import AppButton from '../../component/button/AppButton';

// interface QuestionItem {
//   question_id: string;
//   question_text: string;
//   solution_text: string;
//   answer_key: string;
//   difficulty: string;
//   created_at: string;
//   option_a?: string;
//   option_b?: string;
//   option_c?: string;
//   option_d?: string;
//   correct_option?: string;
//   explanation?: string;
// }

// interface PdfPreviewScreenProps {
//   instituteName: string;
//   testName: string;
//   date: string;
//   time: string;
//   hideDateTime: boolean;
//   waterMarkType: string;
//   borderType: string;
//   waterMarkLogo: string | null;
//   borderImage: string | null;
//   logoUri: string;
//   selectedQuestions: QuestionItem[];
//   dropDownValue: string | null;
// }

// // Helper function to clean HTML content for PDF
// const cleanHtmlForPDF = (html: string): string => {
//   if (!html) return '';
  
//   let cleaned = html;
  
//   // Handle base64 images - replace with placeholders
//   cleaned = cleaned.replace(/<img[^>]+src="data:image\/[^;]+;base64,[^"]+"[^>]*>/gi, '[Image Content]');
  
//   // Clean MathJax expressions
//   cleaned = cleaned
//     .replace(/\\\(/g, '(')
//     .replace(/\\\)/g, ')')
//     .replace(/\\\[/g, '[')
//     .replace(/\\\]/g, ']')
//     .replace(/\$\$(.*?)\$\$/gs, '\\[ $1 \\]') // Convert display math
//     .replace(/\$(.*?)\$/gs, '\\( $1 \\)'); // Convert inline math
  
//   // Remove HTML tags but preserve line breaks and basic formatting
//   cleaned = cleaned
//     .replace(/<br\s*\/?>/gi, '\n')
//     .replace(/<p>/gi, '\n')
//     .replace(/<\/p>/gi, '\n')
//     .replace(/<div>/gi, '\n')
//     .replace(/<\/div>/gi, '\n')
//     .replace(/<strong>/gi, '**')
//     .replace(/<\/strong>/gi, '**')
//     .replace(/<b>/gi, '**')
//     .replace(/<\/b>/gi, '**')
//     .replace(/<i>/gi, '*')
//     .replace(/<\/i>/gi, '*')
//     .replace(/<em>/gi, '*')
//     .replace(/<\/em>/gi, '*')
//     .replace(/&lt;/g, '<')
//     .replace(/&gt;/g, '>')
//     .replace(/&amp;/g, '&')
//     .replace(/&nbsp;/g, ' ')
//     .replace(/&quot;/g, '"')
//     .replace(/<[^>]*>/g, '') // Remove any remaining HTML tags
//     .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove multiple empty lines
//     .trim();
  
//   return cleaned;
// };

// // Helper to extract text preview (for display in list)
// const getPreviewText = (html: string, maxLength: number = 100): string => {
//   if (!html) return 'No content';
  
//   let text = html;
  
//   // Remove images
//   text = text.replace(/<img[^>]*>/gi, '[Image]');
  
//   // Clean HTML
//   text = text
//     .replace(/<[^>]*>/g, '')
//     .replace(/&lt;/g, '<')
//     .replace(/&gt;/g, '>')
//     .replace(/&amp;/g, '&')
//     .replace(/&nbsp;/g, ' ')
//     .trim();
  
//   if (text.length > maxLength) {
//     return text.substring(0, maxLength) + '...';
//   }
  
//   return text || 'No text content';
// };

// const PdfPreviewScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const [generating, setGenerating] = useState(false);
//   const [pdfGenerated, setPdfGenerated] = useState(false);
//   const webViewRef = useRef(null);
//   const [webViewHeight, setWebViewHeight] = useState(600);

//   // Extract all params
//   const {
//     instituteName = '',
//     testName = '',
//     date = '',
//     time = '',
//     hideDateTime = false,
//     waterMarkType = '1',
//     borderType = '1',
//     waterMarkLogo = null,
//     borderImage = null,
//     logoUri = null,
//     selectedQuestions = [],
//     dropDownValue = null,
//   } = route.params as PdfPreviewScreenProps;

//   const generateHTMLContent = () => {
//     let html = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>${testName || 'Test Paper'}</title>
//         <style>
//           @media print {
//             @page {
//               margin: 20mm;
//               size: A4;
//             }
//             body {
//               font-family: 'Arial', 'Helvetica', sans-serif;
//               margin: 0;
//               padding: 0;
//               font-size: 12pt;
//               line-height: 1.6;
//               color: #000;
//             }
//             .question-item {
//               page-break-inside: avoid;
//             }
//           }
          
//           body {
//             font-family: 'Arial', 'Helvetica', sans-serif;
//             margin: 20px;
//             padding: 0;
//             font-size: 14px;
//             line-height: 1.6;
//             color: #333;
//             background: white;
//           }
          
//           .header {
//             text-align: center;
//             margin-bottom: 40px;
//             padding-bottom: 20px;
//             border-bottom: 2px solid #3498db;
//           }
          
//           .institute-name {
//             font-size: 24px;
//             font-weight: bold;
//             color: #2c3e50;
//             margin: 10px 0;
//           }
          
//           .test-name {
//             font-size: 20px;
//             color: #3498db;
//             margin-bottom: 10px;
//           }
          
//           .date-time {
//             font-size: 14px;
//             color: #7f8c8d;
//             margin-bottom: 5px;
//           }
          
//           .question-container {
//             margin: 30px 0;
//           }
          
//           .question-item {
//             margin-bottom: 40px;
//             padding-bottom: 20px;
//             border-bottom: 1px solid #eee;
//             page-break-inside: avoid;
//           }
          
//           .question-number {
//             font-weight: bold;
//             color: #2c3e50;
//             margin-bottom: 15px;
//             font-size: 16px;
//             background: #f0f7ff;
//             padding: 8px 15px;
//             border-radius: 4px;
//             display: inline-block;
//           }
          
//           .question-content {
//             margin: 15px 0;
//             font-size: 14px;
//             line-height: 1.8;
//           }
          
//           .options-container {
//             margin: 20px 0 0 20px;
//           }
          
//           .option-item {
//             margin-bottom: 10px;
//             padding: 8px 12px;
//             border-left: 3px solid #ddd;
//             background: #f9f9f9;
//             border-radius: 4px;
//           }
          
//           .option-label {
//             font-weight: bold;
//             color: #2c3e50;
//             margin-right: 8px;
//           }
          
//           .correct-option {
//             border-left-color: #4caf50;
//             background: #e8f5e9;
//           }
          
//           .solution-container {
//             margin-top: 20px;
//             padding: 15px;
//             background: #fff8e1;
//             border-radius: 6px;
//             border-left: 4px solid #ff9800;
//           }
          
//           .solution-title {
//             font-weight: bold;
//             color: #ff9800;
//             margin-bottom: 8px;
//             font-size: 15px;
//           }
          
//           .solution-content {
//             font-size: 14px;
//             line-height: 1.7;
//           }
          
//           .answer-container {
//             margin-top: 15px;
//             padding: 12px;
//             background: #e3f2fd;
//             border-radius: 5px;
//             border-left: 4px solid #2196f3;
//           }
          
//           .answer-title {
//             font-weight: bold;
//             color: #2196f3;
//             margin-bottom: 5px;
//           }
          
//           .answer-content {
//             font-weight: bold;
//             font-size: 15px;
//           }
          
//           .footer {
//             margin-top: 60px;
//             text-align: center;
//             padding-top: 25px;
//             border-top: 2px solid #ddd;
//             color: #7f8c8d;
//             font-size: 13px;
//             line-height: 1.8;
//           }
          
//           .watermark {
//             position: fixed;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//             opacity: 0.1;
//             font-size: 80px;
//             color: #ccc;
//             z-index: -1;
//             pointer-events: none;
//             font-weight: bold;
//           }
          
//           .image-notice {
//             display: inline-block;
//             background: #f5f5f5;
//             border: 1px dashed #ccc;
//             padding: 5px 10px;
//             border-radius: 4px;
//             font-style: italic;
//             color: #666;
//             margin: 5px 0;
//             font-size: 12px;
//           }
          
//           .math-expression {
//             font-family: 'Times New Roman', serif;
//             font-style: italic;
//           }
//         </style>
//         <script>
//           function adjustHeight() {
//             const height = document.body.scrollHeight;
//             window.ReactNativeWebView.postMessage(JSON.stringify({
//               type: 'height',
//               height: height
//             }));
//           }
          
//           window.onload = adjustHeight;
//           setTimeout(adjustHeight, 1000);
          
//           function printPDF() {
//             window.print();
//           }
//         </script>
//       </head>
//       <body>
//     `;

//     // Header
//     html += `<div class="header">`;
//     if (instituteName) {
//       html += `<div class="institute-name">${instituteName}</div>`;
//     }
//     if (testName) {
//       html += `<div class="test-name">${testName}</div>`;
//     }
//     if (!hideDateTime) {
//       html += `<div class="date-time">Date: ${date} | Time: ${time}</div>`;
//     }
//     html += `</div>`;

//     // Questions
//     html += `<div class="question-container">`;
//     selectedQuestions.forEach((q, index) => {
//       const questionNumber = index + 1;
//       const questionText = cleanHtmlForPDF(q.question_text || 'No question text available');
//       const solutionText = cleanHtmlForPDF(q.explanation || q.solution_text || 'No solution provided');
//       const answerText = q.answer_key || q.correct_option || 'Not provided';
      
//       html += `
//         <div class="question-item">
//           <div class="question-number">Question ${questionNumber}</div>
//           <div class="question-content">
//             ${questionText}
//           </div>
//       `;

//       // Add options if available
//       const options = [
//         { id: 'A', text: q.option_a },
//         { id: 'B', text: q.option_b },
//         { id: 'C', text: q.option_c },
//         { id: 'D', text: q.option_d }
//       ].filter(opt => opt.text && opt.text.trim().length > 0);

//       if (options.length > 0) {
//         html += `<div class="options-container">`;
//         options.forEach(option => {
//           const optionText = cleanHtmlForPDF(option.text || '');
//           const isCorrect = option.id === (q.correct_option || q.answer_key);
//           const optionClass = isCorrect ? 'correct-option' : '';
          
//           html += `
//             <div class="option-item ${optionClass}">
//               <span class="option-label">${option.id}.</span>
//               ${optionText}
//             </div>
//           `;
//         });
//         html += `</div>`;
//       }

//       // Add solution
//       if (solutionText !== 'No solution provided' && solutionText.trim().length > 0) {
//         html += `
//           <div class="solution-container">
//             <div class="solution-title">Solution:</div>
//             <div class="solution-content">${solutionText}</div>
//           </div>
//         `;
//       }

//       // Add answer
//       html += `
//         <div class="answer-container">
//           <div class="answer-title">Correct Answer:</div>
//           <div class="answer-content">${answerText}</div>
//         </div>
//       `;

//       html += `</div>`; // Close question-item
//     });
//     html += `</div>`; // Close question-container

//     // Footer
//     html += `
//       <div class="footer">
//         <div style="font-style: italic; color: #27ae60; margin-bottom: 15px; font-size: 16px; font-weight: bold;">
//           Wish you all the best!
//         </div>
//         <div style="margin-bottom: 8px;"><strong>Total Questions:</strong> ${selectedQuestions.length}</div>
//         <div style="margin-bottom: 8px;"><strong>Generated on:</strong> ${new Date().toLocaleString('en-IN', {
//           day: '2-digit',
//           month: 'short',
//           year: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit'
//         })}</div>
//         <div style="color: #ff6b6b; font-style: italic;">
//           <strong>Note:</strong> This PDF will expire after 30 days
//         </div>
//       </div>
//     `;

//     // Watermark
//     if (waterMarkType === '2' && dropDownValue) {
//       html += `<div class="watermark">${dropDownValue}</div>`;
//     }

//     html += `
//         <script>
//           setTimeout(() => {
//             adjustHeight();
//           }, 500);
//         </script>
//       </body>
//       </html>
//     `;
    
//     return html;
//   };

//   // Handle WebView messages
//   const handleWebViewMessage = (event: any) => {
//     try {
//       const data = JSON.parse(event.nativeEvent.data);
//       if (data.type === 'height') {
//         setWebViewHeight(Math.min(data.height, 1200)); // Limit max height
//       }
//     } catch (error) {
//       console.log('WebView message error:', error);
//     }
//   };

//   const printPDF = async () => {
//     try {
//       setGenerating(true);
      
//       if (webViewRef.current) {
//         webViewRef.current.injectJavaScript(`
//           window.print();
//           true;
//         `);
        
//         setTimeout(() => {
//           setPdfGenerated(true);
//           setGenerating(false);
//           Alert.alert(
//             '✅ PDF Ready for Printing',
//             'Use the print dialog to save as PDF. On mobile, choose "Save as PDF" or "Print to PDF" option.',
//             [
//               {
//                 text: 'OK',
//                 onPress: () => console.log('OK Pressed')
//               }
//             ]
//           );
//         }, 1500);
//       }
//     } catch (error) {
//       console.error('Print error:', error);
//       setGenerating(false);
//       Alert.alert('Error', 'Failed to prepare PDF for printing');
//     }
//   };

//   const downloadAsHTML = async () => {
//     try {
//       setGenerating(true);
      
//       const htmlContent = generateHTMLContent();
//       const timestamp = new Date().getTime();
//       const fileName = `TestPaper_${timestamp}.html`;
//       const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      
//       await RNFS.writeFile(filePath, htmlContent, 'utf8');
      
//       if (Platform.OS === 'android') {
//         // Try to save to Downloads
//         const downloadsPath = `${RNFS.DownloadDirectoryPath}/TestPaper_${timestamp}.html`;
//         try {
//           await RNFS.copyFile(filePath, downloadsPath);
//           Alert.alert(
//             '✅ File Downloaded',
//             'Test paper saved to Downloads folder',
//             [
//               {
//                 text: 'Open File',
//                 onPress: () => {
//                   // You could open the file in a WebView
//                   navigation.navigate('HtmlViewer', { 
//                     filePath: downloadsPath,
//                     fileName: `TestPaper_${timestamp}.html`
//                   });
//                 }
//               },
//               { text: 'OK' }
//             ]
//           );
//         } catch (copyError) {
//           // If copy fails, just share the file
//           await Share.open({
//             url: `file://${filePath}`,
//             title: 'Test Paper',
//             message: 'Your test paper is ready',
//             type: 'text/html',
//             filename: fileName,
//           });
//         }
//       } else {
//         // For iOS, use share sheet
//         await Share.open({
//           url: `file://${filePath}`,
//           title: 'Test Paper',
//           message: 'Your test paper is ready',
//           type: 'text/html',
//           filename: fileName,
//           saveToFiles: true,
//         });
//       }
//     } catch (error: any) {
//       console.error('Download error:', error);
//       if (error.message !== 'User did not share') {
//         Alert.alert('Error', 'Failed to save file');
//       }
//     } finally {
//       setGenerating(false);
//     }
//   };

//   const shareFile = async () => {
//     try {
//       setGenerating(true);
      
//       const htmlContent = generateHTMLContent();
//       const fileName = `TestPaper_${new Date().getTime()}.html`;
//       const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      
//       await RNFS.writeFile(filePath, htmlContent, 'utf8');
      
//       await Share.open({
//         url: `file://${filePath}`,
//         title: testName || 'Test Paper',
//         message: 'Check out this test paper I created!',
//         type: 'text/html',
//         filename: fileName,
//       });
//     } catch (error: any) {
//       if (error.message !== 'User did not share') {
//         Alert.alert('Error', 'Failed to share file');
//       }
//     } finally {
//       setGenerating(false);
//     }
//   };

//   const handleBack = () => {
//     navigation.goBack();
//   };

//   const htmlContent = generateHTMLContent();

//   return (
//     <View style={styles.container}>
//       <HeaderPaperModule title="PDF Preview" leftIconPress={handleBack} />
      
//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* Success Message */}
//         <View style={styles.successCard}>
//           <Text style={styles.successTitle}>📄 PDF Preview</Text>
//           <Text style={styles.successText}>
//             Your test paper is ready! Preview below and choose an option.
//           </Text>
//           <Text style={styles.questionCount}>
//             Total Questions: {selectedQuestions.length}
//           </Text>
//         </View>

//         {/* PDF Preview */}
//         <View style={styles.previewSection}>
//           <Text style={styles.previewTitle}>Live Preview:</Text>
//           <View style={[styles.webViewContainer, { height: webViewHeight }]}>
//             <WebView
//               ref={webViewRef}
//               originWhitelist={['*']}
//               source={{ html: htmlContent }}
//               style={styles.webView}
//               javaScriptEnabled={true}
//               domStorageEnabled={true}
//               startInLoadingState={true}
//               onMessage={handleWebViewMessage}
//               renderLoading={() => (
//                 <View style={styles.loadingContainer}>
//                   <ActivityIndicator size="large" color={Colors.primaryColor} />
//                   <Text style={styles.loadingText}>Loading preview...</Text>
//                 </View>
//               )}
//             />
//           </View>
//         </View>

//         {/* Action Buttons */}
//         <View style={styles.buttonContainer}>
//           <AppButton
//             title={generating ? "Processing..." : "🖨️ Print/Save as PDF"}
//             onPress={printPDF}
//             disabled={generating}
//             style={styles.generateButton}
//             textStyle={styles.buttonText}
//           />
          
//           <AppButton
//             title="💾 Download HTML File"
//             onPress={downloadAsHTML}
//             disabled={generating}
//             style={styles.downloadButton}
//             textStyle={styles.buttonText}
//           />
          
//           <AppButton
//             title="📤 Share"
//             onPress={shareFile}
//             disabled={generating}
//             style={styles.shareButton}
//             textStyle={styles.buttonText}
//           />
//         </View>

//         {/* Questions List Preview */}
//         <View style={styles.questionsList}>
//           <Text style={styles.questionsTitle}>Selected Questions ({selectedQuestions.length})</Text>
//           {selectedQuestions.map((q, index) => (
//             <View key={index} style={styles.questionPreviewItem}>
//               <Text style={styles.questionPreviewNumber}>Q{index + 1}</Text>
//               <Text style={styles.questionPreviewText} numberOfLines={2}>
//                 {getPreviewText(q.question_text, 60)}
//               </Text>
//             </View>
//           ))}
//         </View>

//         {/* Instructions */}
//         <View style={styles.instructionsCard}>
//           <Text style={styles.instructionsTitle}>How to get your PDF:</Text>
//           <View style={styles.instructionItem}>
//             <Text style={styles.instructionBullet}>1.</Text>
//             <Text style={styles.instructionText}>
//               <Text style={styles.instructionHighlight}>Print/Save as PDF</Text>: Click the print button, then choose "Save as PDF" in the print dialog
//             </Text>
//           </View>
//           <View style={styles.instructionItem}>
//             <Text style={styles.instructionBullet}>2.</Text>
//             <Text style={styles.instructionText}>
//               <Text style={styles.instructionHighlight}>Download HTML</Text>: Get an HTML file that can be opened in any browser
//             </Text>
//           </View>
//           <View style={styles.instructionItem}>
//             <Text style={styles.instructionBullet}>3.</Text>
//             <Text style={styles.instructionText}>
//               <Text style={styles.instructionHighlight}>Share</Text>: Send directly via email, WhatsApp, etc.
//             </Text>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.white,
//   },
//   content: {
//     flex: 1,
//   },
//   successCard: {
//     backgroundColor: Colors.lightThemeBlue + '15',
//     padding: moderateScale(20),
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.InputStroke,
//   },
//   successTitle: {
//     fontSize: moderateScale(24),
//     fontFamily: Fonts.InterSemiBold,
//     color: Colors.primaryColor,
//     marginBottom: moderateScale(8),
//   },
//   successText: {
//     fontSize: moderateScale(14),
//     fontFamily: Fonts.InstrumentSansRegular,
//     color: Colors.gray,
//     textAlign: 'center',
//     marginBottom: moderateScale(8),
//   },
//   questionCount: {
//     fontSize: moderateScale(14),
//     fontFamily: Fonts.InterSemiBold,
//     color: Colors.primaryColor,
//     backgroundColor: Colors.lightThemeBlue + '30',
//     paddingHorizontal: moderateScale(12),
//     paddingVertical: moderateScale(4),
//     borderRadius: moderateScale(20),
//   },
//   previewSection: {
//     padding: moderateScale(16),
//   },
//   previewTitle: {
//     fontSize: moderateScale(16),
//     fontFamily: Fonts.InterSemiBold,
//     color: Colors.black,
//     marginBottom: moderateScale(12),
//   },
//   webViewContainer: {
//     borderRadius: moderateScale(8),
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: Colors.InputStroke,
//     backgroundColor: Colors.white,
//   },
//   webView: {
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: Colors.white,
//     padding: moderateScale(40),
//   },
//   loadingText: {
//     fontSize: moderateScale(14),
//     fontFamily: Fonts.InstrumentSansRegular,
//     color: Colors.gray,
//     marginTop: moderateScale(12),
//   },
//   buttonContainer: {
//     padding: moderateScale(16),
//     gap: moderateScale(12),
//   },
//   generateButton: {
//     backgroundColor: Colors.primaryColor,
//     paddingVertical: moderateScale(16),
//     borderRadius: moderateScale(8),
//   },
//   downloadButton: {
//     backgroundColor: Colors.success,
//     paddingVertical: moderateScale(16),
//     borderRadius: moderateScale(8),
//   },
//   shareButton: {
//     backgroundColor: Colors.secondaryColor,
//     paddingVertical: moderateScale(16),
//     borderRadius: moderateScale(8),
//   },
//   buttonText: {
//     fontSize: moderateScale(15),
//     fontFamily: Fonts.InterSemiBold,
//   },
//   questionsList: {
//     padding: moderateScale(16),
//     backgroundColor: Colors.white,
//     marginHorizontal: moderateScale(16),
//     borderRadius: moderateScale(8),
//     borderWidth: 1,
//     borderColor: Colors.InputStroke,
//   },
//   questionsTitle: {
//     fontSize: moderateScale(16),
//     fontFamily: Fonts.InterSemiBold,
//     color: Colors.black,
//     marginBottom: moderateScale(12),
//   },
//   questionPreviewItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: moderateScale(8),
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.InputStroke + '30',
//   },
//   questionPreviewNumber: {
//     fontSize: moderateScale(12),
//     fontFamily: Fonts.InterSemiBold,
//     color: Colors.primaryColor,
//     backgroundColor: Colors.lightThemeBlue + '20',
//     paddingHorizontal: moderateScale(8),
//     paddingVertical: moderateScale(4),
//     borderRadius: moderateScale(4),
//     marginRight: moderateScale(12),
//     minWidth: moderateScale(30),
//     textAlign: 'center',
//   },
//   questionPreviewText: {
//     flex: 1,
//     fontSize: moderateScale(13),
//     fontFamily: Fonts.InstrumentSansRegular,
//     color: Colors.gray,
//     lineHeight: moderateScale(18),
//   },
//   instructionsCard: {
//     backgroundColor: Colors.white,
//     padding: moderateScale(20),
//     margin: moderateScale(16),
//     borderRadius: moderateScale(12),
//     borderWidth: 1,
//     borderColor: Colors.InputStroke,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   instructionsTitle: {
//     fontSize: moderateScale(16),
//     fontFamily: Fonts.InterSemiBold,
//     color: Colors.black,
//     marginBottom: moderateScale(16),
//   },
//   instructionItem: {
//     flexDirection: 'row',
//     marginBottom: moderateScale(12),
//     alignItems: 'flex-start',
//   },
//   instructionBullet: {
//     fontSize: moderateScale(14),
//     fontFamily: Fonts.InterSemiBold,
//     color: Colors.primaryColor,
//     marginRight: moderateScale(8),
//     marginTop: moderateScale(1),
//   },
//   instructionText: {
//     flex: 1,
//     fontSize: moderateScale(13),
//     fontFamily: Fonts.InstrumentSansRegular,
//     color: Colors.gray,
//     lineHeight: moderateScale(18),
//   },
//   instructionHighlight: {
//     fontFamily: Fonts.InterSemiBold,
//     color: Colors.black,
//   },
// });

// export default PdfPreviewScreen;








import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { Colors, Fonts } from '../../theme';
import { moderateScale, verticalScale } from '../../utils/responsiveSize';
import HeaderPaperModule from '../../component/headerpapermodule/Headerpapermodule';
import AppButton from '../../component/button/AppButton';

interface QuestionItem {
  question_id: string;
  question_text: string;
  solution_text: string;
  answer_key: string;
  difficulty: string;
  created_at: string;
  option_a?: string;
  option_b?: string;
  option_c?: string;
  option_d?: string;
  correct_option?: string;
  explanation?: string;
}

interface PdfPreviewScreenProps {
  instituteName: string;
  testName: string;
  date: string;
  time: string;
  hideDateTime: boolean;
  waterMarkType: string;
  borderType: string;
  waterMarkLogo: string | null;
  borderImage: string | null;
  logoUri: string;
  selectedQuestions: QuestionItem[];
  dropDownValue: string | null;
}

// Request storage permission for Android
const requestStoragePermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') return true;

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to storage to save files',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
      }
    );
    
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    console.error('Permission error:', error);
    return false;
  }
};

// Clean HTML for PDF
const cleanHtmlForPDF = (html: string): string => {
  if (!html) return '';
  
  let cleaned = html;
  
  // Replace base64 images
  cleaned = cleaned.replace(/<img[^>]+src="data:image\/[^;]+;base64,[^"]+"[^>]*>/gi, 
    '<span style="color: #666; font-style: italic;">[Image]</span>');
  
  // Clean MathJax
  cleaned = cleaned
    .replace(/\\\(/g, '(')
    .replace(/\\\)/g, ')')
    .replace(/\\\[/g, '[')
    .replace(/\\\]/g, ']')
    .replace(/\$\$(.*?)\$\$/gs, '\\[ $1 \\]')
    .replace(/\$(.*?)\$/gs, '\\( $1 \\)');
  
  // Remove HTML tags
  cleaned = cleaned
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<p>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<div>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<strong>/gi, '**')
    .replace(/<\/strong>/gi, '**')
    .replace(/<b>/gi, '**')
    .replace(/<\/b>/gi, '**')
    .replace(/<i>/gi, '*')
    .replace(/<\/i>/gi, '*')
    .replace(/<em>/gi, '*')
    .replace(/<\/em>/gi, '*')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
  
  return cleaned;
};

const PdfPreviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [generating, setGenerating] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const webViewRef = useRef(null);
  const [webViewHeight, setWebViewHeight] = useState(600);

  // Extract all params
  const {
    instituteName = '',
    testName = '',
    date = '',
    time = '',
    hideDateTime = false,
    waterMarkType = '1',
    borderType = '1',
    waterMarkLogo = null,
    borderImage = null,
    logoUri = null,
    selectedQuestions = [],
    dropDownValue = null,
  } = route.params as PdfPreviewScreenProps;

  const generateHTMLContent = () => {
    let html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${testName || 'Test Paper'}</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 30px;
            padding: 0;
            font-size: 14px;
            line-height: 1.6;
            color: #333;
            background: white;
          }
          
          .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #3498db;
          }
          
          .institute-name {
            font-size: 24px;
            font-weight: bold;
            color: #2c3e50;
            margin: 10px 0;
          }
          
          .test-name {
            font-size: 20px;
            color: #3498db;
            margin-bottom: 10px;
          }
          
          .date-time {
            font-size: 14px;
            color: #7f8c8d;
          }
          
          .question-container {
            margin: 30px 0;
          }
          
          .question-item {
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          
          .question-number {
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 16px;
            background: #f0f7ff;
            padding: 8px 15px;
            border-radius: 4px;
            display: inline-block;
          }
          
          .question-content {
            margin: 15px 0;
            font-size: 14px;
            line-height: 1.8;
          }
          
          .options-container {
            margin: 20px 0 0 20px;
          }
          
          .option-item {
            margin-bottom: 10px;
            padding: 8px 12px;
            border-left: 3px solid #ddd;
            background: #f9f9f9;
            border-radius: 4px;
          }
          
          .correct-option {
            border-left-color: #4caf50;
            background: #e8f5e9;
          }
          
          .solution-container {
            margin-top: 20px;
            padding: 15px;
            background: #fff8e1;
            border-radius: 6px;
            border-left: 4px solid #ff9800;
          }
          
          .solution-title {
            font-weight: bold;
            color: #ff9800;
            margin-bottom: 8px;
          }
          
          .answer-container {
            margin-top: 15px;
            padding: 12px;
            background: #e3f2fd;
            border-radius: 5px;
            border-left: 4px solid #2196f3;
          }
          
          .answer-title {
            font-weight: bold;
            color: #2196f3;
            margin-bottom: 5px;
          }
          
          .footer {
            margin-top: 60px;
            text-align: center;
            padding-top: 25px;
            border-top: 2px solid #ddd;
            color: #7f8c8d;
            font-size: 13px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          ${instituteName ? `<div class="institute-name">${instituteName}</div>` : ''}
          ${testName ? `<div class="test-name">${testName}</div>` : ''}
          ${!hideDateTime ? `<div class="date-time">Date: ${date} | Time: ${time}</div>` : ''}
        </div>
        
        <div class="question-container">
    `;

    selectedQuestions.forEach((q, index) => {
      const questionNumber = index + 1;
      const questionText = cleanHtmlForPDF(q.question_text || 'No question text');
      const solutionText = cleanHtmlForPDF(q.explanation || q.solution_text || '');
      const answerText = q.answer_key || q.correct_option || 'Not provided';
      
      html += `
        <div class="question-item">
          <div class="question-number">Question ${questionNumber}</div>
          <div class="question-content">${questionText}</div>
      `;

      // Options
      const options = [
        { id: 'A', text: q.option_a },
        { id: 'B', text: q.option_b },
        { id: 'C', text: q.option_c },
        { id: 'D', text: q.option_d }
      ].filter(opt => opt.text && opt.text.trim().length > 0);

      if (options.length > 0) {
        html += `<div class="options-container">`;
        options.forEach(option => {
          const optionText = cleanHtmlForPDF(option.text || '');
          const isCorrect = option.id === (q.correct_option || q.answer_key);
          const optionClass = isCorrect ? 'correct-option' : '';
          
          html += `
            <div class="option-item ${optionClass}">
              <strong>${option.id}.</strong> ${optionText}
            </div>
          `;
        });
        html += `</div>`;
      }

      // Solution
      if (solutionText.trim().length > 0) {
        html += `
          <div class="solution-container">
            <div class="solution-title">Solution:</div>
            <div>${solutionText}</div>
          </div>
        `;
      }

      // Answer
      html += `
        <div class="answer-container">
          <div class="answer-title">Correct Answer:</div>
          <div><strong>${answerText}</strong></div>
        </div>
      </div>`;
    });

    html += `
        </div>
        
        <div class="footer">
          <div style="font-style: italic; color: #27ae60; margin-bottom: 15px; font-size: 16px; font-weight: bold;">
            Wish you all the best!
          </div>
          <div><strong>Total Questions:</strong> ${selectedQuestions.length}</div>
          <div><strong>Generated on:</strong> ${new Date().toLocaleString()}</div>
          <div style="color: #ff6b6b; font-style: italic;">
            <strong>Note:</strong> PDF will expire after 30 days
          </div>
        </div>
      </body>
      </html>
    `;
    
    return html;
  };

  // 🎯 WORKING DOWNLOAD FUNCTION
  const downloadPDF = async () => {
    try {
      setDownloading(true);
      
      // Request permission for Android
      if (Platform.OS === 'android') {
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) {
          Alert.alert('Permission Required', 'Storage permission is needed to save the file');
          setDownloading(false);
          return;
        }
      }

      const htmlContent = generateHTMLContent();
      const timestamp = new Date().getTime();
      const fileName = `TestPaper_${timestamp}.html`;
      
      if (Platform.OS === 'android') {
        // For Android: Save to Downloads folder
        const downloadsPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
        
        await RNFS.writeFile(downloadsPath, htmlContent, 'utf8');
        
        Alert.alert(
          '✅ File Saved!',
          `Test paper saved to Downloads folder\n\nFile: ${fileName}`,
          [
            {
              text: 'Open File',
              onPress: () => {
                // Open file with available app
                Share.open({
                  url: `file://${downloadsPath}`,
                  type: 'text/html',
                });
              }
            },
            {
              text: 'Open Downloads',
              onPress: () => {
                // Open Downloads folder
                Linking.openURL('content://com.android.externalstorage.documents/document/primary%3ADownload');
              }
            },
            { text: 'OK' }
          ]
        );
      } else {
        // For iOS: Save to Documents and share
        const documentsPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
        await RNFS.writeFile(documentsPath, htmlContent, 'utf8');
        
        await Share.open({
          url: `file://${documentsPath}`,
          title: 'Save Test Paper',
          message: 'Save your test paper file',
          type: 'text/html',
          filename: fileName,
          saveToFiles: true,
        });
      }
      
    } catch (error: any) {
      console.error('Download error:', error);
      Alert.alert('Download Failed', error.message || 'Could not save file');
    } finally {
      setDownloading(false);
    }
  };

  // 🎯 WORKING SHARE FUNCTION
  const sharePDF = async () => {
    try {
      setSharing(true);
      
      const htmlContent = generateHTMLContent();
      const timestamp = new Date().getTime();
      const fileName = `TestPaper_${timestamp}.html`;
      const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      
      await RNFS.writeFile(filePath, htmlContent, 'utf8');
      
      await Share.open({
        url: `file://${filePath}`,
        title: testName || 'Test Paper',
        message: 'Check out this test paper!',
        type: 'text/html',
        filename: fileName,
      });
      
    } catch (error: any) {
      if (error.message !== 'User did not share') {
        Alert.alert('Share Failed', 'Could not share file');
      }
    } finally {
      setSharing(false);
    }
  };

  // 🎯 WORKING PRINT FUNCTION
  const printPDF = async () => {
    try {
      setGenerating(true);
      
      if (webViewRef.current) {
        webViewRef.current.injectJavaScript(`
          window.print();
          true;
        `);
        
        setTimeout(() => {
          setGenerating(false);
          Alert.alert(
            'Print Ready',
            'Use the print dialog to save as PDF:\n\n' +
            '1. Click "Print"\n' +
            '2. Choose "Save as PDF"\n' +
            '3. Select location and save',
            [{ text: 'OK' }]
          );
        }, 1000);
      }
    } catch (error) {
      setGenerating(false);
      Alert.alert('Print Error', 'Could not open print dialog');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const htmlContent = generateHTMLContent();

  return (
    <View style={styles.container}>
      <HeaderPaperModule title="PDF Ready" leftIconPress={handleBack} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Success Header */}
        <View style={styles.successHeader}>
          <Text style={styles.successTitle}>✅ PDF Ready</Text>
          <Text style={styles.successText}>
            Your PDF has been generated successfully. You can...
          </Text>
        </View>

        {/* PDF Preview */}
        <View style={styles.previewSection}>
          <Text style={styles.sectionTitle}>📄 PDF Preview</Text>
          <View style={[styles.webViewContainer, { height: 400 }]}>
            <WebView
              ref={webViewRef}
              originWhitelist={['*']}
              source={{ html: htmlContent }}
              style={styles.webView}
              javaScriptEnabled={true}
              startInLoadingState={true}
              renderLoading={() => (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={Colors.primaryColor} />
                </View>
              )}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <AppButton
            title={generating ? "Opening Print..." : "🖨️ Print/Save as PDF"}
            onPress={printPDF}
            disabled={generating}
            style={styles.printButton}
          />
          
          <AppButton
            title={downloading ? "Downloading..." : "💾 Download File"}
            onPress={downloadPDF}
            disabled={downloading}
            style={styles.downloadButton}
          />
          
          <AppButton
            title={sharing ? "Sharing..." : "📤 Share File"}
            onPress={sharePDF}
            disabled={sharing}
            style={styles.shareButton}
          />
        </View>

        {/* Questions List */}
        <View style={styles.questionsSection}>
          <Text style={styles.sectionTitle}>📝 Selected Questions</Text>
          <Text style={styles.expiryText}>PDF will expire after 30 Days</Text>
          
          {selectedQuestions.map((q, index) => (
            <View key={index} style={styles.questionItem}>
              <Text style={styles.questionMeta}>
                Question {index + 1} | {q.difficulty || 'N/A'}
              </Text>
              <View style={styles.tagsRow}>
                <Text style={styles.tag}>[Question]</Text>
                <Text style={styles.tag}>[Solution]</Text>
                <Text style={styles.tag}>[Answer]</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Instructions */}
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>Instructions:</Text>
          
          <View style={styles.instructionRow}>
            <Text style={styles.instructionBullet}>•</Text>
            <Text style={styles.instructionText}>
              <Text style={styles.instructionHighlight}>Print/Save as PDF</Text>: Opens print dialog. Choose "Save as PDF" as printer
            </Text>
          </View>
          
          <View style={styles.instructionRow}>
            <Text style={styles.instructionBullet}>•</Text>
            <Text style={styles.instructionText}>
              <Text style={styles.instructionHighlight}>Download File</Text>: Saves HTML file to Downloads (Android) or Files (iOS)
            </Text>
          </View>
          
          <View style={styles.instructionRow}>
            <Text style={styles.instructionBullet}>•</Text>
            <Text style={styles.instructionText}>
              <Text style={styles.instructionHighlight}>Share File</Text>: Share via email, WhatsApp, etc.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={[styles.navText, styles.activeNav]}>My Pdf</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>My Draft</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
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
  },
  successHeader: {
    backgroundColor: '#E8F5E9',
    padding: moderateScale(20),
    alignItems: 'center',
  },
  successTitle: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.InterSemiBold,
    color: Colors.success,
    marginBottom: moderateScale(8),
  },
  successText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.InstrumentSansRegular,
    color: Colors.gray,
    textAlign: 'center',
  },
  previewSection: {
    padding: moderateScale(16),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontFamily: Fonts.InterSemiBold,
    color: Colors.black,
    marginBottom: moderateScale(12),
  },
  webViewContainer: {
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.InputStroke,
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  buttonContainer: {
    padding: moderateScale(16),
    gap: moderateScale(12),
  },
  printButton: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: moderateScale(16),
    borderRadius: moderateScale(8),
  },
  downloadButton: {
    backgroundColor: Colors.success,
    paddingVertical: moderateScale(16),
    borderRadius: moderateScale(8),
  },
  shareButton: {
    backgroundColor: Colors.secondaryColor,
    paddingVertical: moderateScale(16),
    borderRadius: moderateScale(8),
  },
  questionsSection: {
    backgroundColor: Colors.white,
    padding: moderateScale(16),
    margin: moderateScale(16),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: Colors.InputStroke,
  },
  expiryText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.InstrumentSansRegular,
    color: Colors.gray,
    marginBottom: moderateScale(16),
  },
  questionItem: {
    marginBottom: moderateScale(12),
    paddingBottom: moderateScale(12),
    borderBottomWidth: 1,
    borderBottomColor: Colors.InputStroke + '30',
  },
  questionMeta: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.InstrumentSansRegular,
    color: Colors.black,
    marginBottom: moderateScale(8),
  },
  tagsRow: {
    flexDirection: 'row',
  },
  tag: {
    fontSize: moderateScale(11),
    fontFamily: Fonts.InstrumentSansRegular,
    color: Colors.primaryColor,
    backgroundColor: Colors.lightThemeBlue + '30',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(4),
    marginRight: moderateScale(8),
  },
  instructionsCard: {
    backgroundColor: Colors.white,
    padding: moderateScale(16),
    margin: moderateScale(16),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: Colors.InputStroke,
  },
  instructionsTitle: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.InterSemiBold,
    color: Colors.black,
    marginBottom: moderateScale(12),
  },
  instructionRow: {
    flexDirection: 'row',
    marginBottom: moderateScale(8),
    alignItems: 'flex-start',
  },
  instructionBullet: {
    fontSize: moderateScale(16),
    color: Colors.primaryColor,
    marginRight: moderateScale(8),
    marginTop: moderateScale(2),
  },
  instructionText: {
    flex: 1,
    fontSize: moderateScale(13),
    fontFamily: Fonts.InstrumentSansRegular,
    color: Colors.gray,
    lineHeight: moderateScale(18),
  },
  instructionHighlight: {
    fontFamily: Fonts.InterSemiBold,
    color: Colors.black,
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.InputStroke,
    backgroundColor: Colors.white,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: moderateScale(12),
  },
  navText: {
    fontSize: moderateScale(12),
    fontFamily: Fonts.InstrumentSansRegular,
    color: Colors.gray,
  },
  activeNav: {
    color: Colors.primaryColor,
    fontFamily: Fonts.InterSemiBold,
  },
});

export default PdfPreviewScreen;



