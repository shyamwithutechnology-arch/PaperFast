// // // import React from "react";
// // // import { View, Text, Image, StatusBar } from "react-native";
// // // import { SafeAreaView } from "react-native-safe-area-context";
// // // import { Colors } from "../../../theme";
// // // import CustomPaperCard from "../component/CustomPaperCard/CustomPaperCard";
// // // import HeaderPaperModule from "../../../component/headerpapermodule/Headerpapermodule";

// // // const PaperTypeScreen = () => {
// // //     return (
// // //         <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
// // //             <StatusBar barStyle={'light-content'} backgroundColor={Colors.primaryColor}/>
// // //             <HeaderPaperModule/>
// // //             <CustomPaperCard />
// // //         </SafeAreaView>
// // //     )
// // // }
// // // export default PaperTypeScreen


// // import React from "react";
// // import { View, StatusBar, Platform } from "react-native";
// // import { SafeAreaView } from "react-native-safe-area-context";
// // import { Colors } from "../../../theme";
// // import CustomPaperCard from "../component/CustomPaperCard/CustomPaperCard";
// // import HeaderPaperModule from "../../../component/headerpapermodule/Headerpapermodule";

// // const PaperTypeScreen = () => {
// //   return (
// //     <View style={{ flex: 1, backgroundColor: Colors.white }}>
// //       {/* STATUS BAR */}
// //       <StatusBar
// //         translucent
// //         backgroundColor={Colors.lightThemeBlue}
// //         barStyle="dark-content"
// //       />

// //       {/* HEADER BACKGROUND FOR STATUS BAR */}
// //       {/* <View
// //         style={{
// //           height: Platform.OS === "android" ? StatusBar.currentHeight : 0,
// //           backgroundColor: Colors.primaryColor,
// //         }}
// //       /> */}

// //     <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
// //         <HeaderPaperModule />
// //         <CustomPaperCard />
// //       </SafeAreaView>
// //     </View>
// //   );
// // };

// // export default PaperTypeScreen;


// import React, { useState } from "react";
// import { View, StatusBar, Text, Image } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// // import { Colors, Fonts } from "../../../theme";
// // import CustomPaperCard from "../component/CustomPaperCard/CustomPaperCard";
// // import HeaderPaperModule from "../../../component/headerpapermodule/Headerpapermodule";
// // import { styles } from "./styles";
// // import { Icons } from "../../../assets/icons";
// // import { moderateScale } from "../../../utils/responsiveSize";
// import { useNavigation } from "@react-navigation/native";
// import { Colors } from "../../theme";
// import HeaderPaperModule from "../../component/headerpapermodule/Headerpapermodule";
// import { styles } from "./styles";
// import { showSnackbar } from "../../utils/snackbar";

// const PrivacyPolicyScreen = () => {
//   const navigation = useNavigation()
//   const [loading, setLoading] = useState<boolean>(false);

//   // const handleSelectPaperType = (payload) => {
//   //   navigation.navigate('PaperSelect', { 'paperType': payload })
//   // }
//   const handleBack = () => {
//     navigation.goBack()
//   }



//   // const handlePrivacyRequest = async () => {
//   //   setLoading(true);
//   //   try {

//   //     const response = await fetch('https://www.papers.withupartners.in/api/privacy-policy', {
//   //       method: 'GET',
//   //     });

//   //     console.log('Response status:rr', response);

//   //     // Get response text first to see what's returned
//   //     const newRes = await response.json();
//   //     console.log('newRes:', newRes);

//   //     // // Try to parse as JSON
//   //     // let responseData;
//   //     // try {
//   //     //     responseData = JSON.parse(responseText);
//   //     // } catch (e) {
//   //     //     console.log('Response is not JSON:', responseText);
//   //     //     throw new Error('Invalid response format');
//   //     // }

//   //     // console.log('Parsed response:', responseData);

//   //     if (response.ok) {
//   //       //     // Check your API's success condition
//   //       //     if (newRes.status === 200 || responseData.success) {
//   //       //         showSnackbar('Registration successful!', 'success');
//   //       //     } else {
//   //       //         showSnackbar(responseData.message || 'Registration failed', 'error');
//   //       //     }
//   //       // } else {
//   //       //     throw new Error(`HTTP ${response.status}: ${responseData.message || 'Request failed'}`);

//   //       if (newRes.status === 200) {
//   //         console.log('newRes?.user_existd', newRes?.user_exist === 0)
//   //         // if (newRes?.user_exist === 1) {
           
//   //         // } 
//   //       } else {
//   //         showSnackbar(newRes?.msg || 'OTP Failed', 'error');
//   //       }
//   //     }

//   //   } catch (error) {
//   //     // console.error('API Error:', error);
//   //     if (error.message?.includes('Network')) {
//   //       showSnackbar('No internet connection', 'error');
//   //     } else {
//   //       showSnackbar(error.message, 'error');
//   //     }

//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   return (
//     <View style={{ flex: 1, backgroundColor: Colors.white }}>

//       {/* STATUS BAR */}
//       <StatusBar
//         // translucent
//         backgroundColor={Colors.lightThemeBlue}
//         barStyle="dark-content"
//       />

//       {/* HEADER + STATUS BAR SHARE SAME BACKGROUND */}
//       <View style={{ backgroundColor: Colors.lightThemeBlue }}>
//         <SafeAreaView edges={["top"]}>
//           <HeaderPaperModule title='Privacy Policy' leftIconPress={handleBack} />
//         </SafeAreaView>
//       </View>

//       {/* SCREEN CONTENT */}
//       <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
//         {/* <CustomPaperCard onPress={handleSelectPaperType} /> */}

//         <Text style={styles.draftText}>Paper Fast respects your privacy.
//           This app is designed to generate question papers for Classes 6–12 and competitive exams. We only collect basic information necessary to improve user experience, such as usage data and preferences. Personal details like name, email, or contact information are collected only when you voluntarily provide them for account creation or support purposes.
//           We do not share, sell, or disclose your personal data to any third party, except when required for app functionality or by law. All user-generated papers and data remain secure and confidential. By using Paper Fast, you agree to the collection and use of information in accordance with this policy.
//           For any queries, contact our support team within the app.



//           We do not sell, share, or disclose personal information to third parties.
//           Data may be shared only when required for app functionality or if legally necessary.
//           All user-generated papers, data, and activity remain secure and confidential.
//           By using the app, you agree to our data collection and usage policy.
//           For support or queries, users can directly contact the in-app support team.
//         </Text>
//         {/* <View style={styles.draftBox}>

//           <View style={{ alignSelf: 'center', marginTop: moderateScale(30) }}>
//             <Image source={Icons.paperFile} resizeMode="contain" style={{ height: moderateScale(30), width: moderateScale(30), alignSelf: "center" }} />
//             <Text style={{ fontSize: moderateScale(13), fontFamily: Fonts.InstrumentSansRegular, color: Colors.ParagraphAndShortTexts, marginTop: moderateScale(10) }}>No Draft Paper Avaliable</Text>
//           </View>
//         </View> */}
//       </SafeAreaView>

//     </View>
//   );
// };

// export default PrivacyPolicyScreen;


import React, { useState, useEffect } from "react";
import { View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../theme";
import HeaderPaperModule from "../../component/headerpapermodule/Headerpapermodule";
// import SimpleHtmlView from "../../components/SimpleHtmlView";
import HtmlView from "../../component/htmlview/HtmlView";
import { showSnackbar } from "../../utils/snackbar";
import Loader from "../../component/loader/Loader"; // If you have a Loader component

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
console.log('content',content);

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePrivacyRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://www.papers.withupartners.in/api/term-condition', {
        method: 'GET',
      });

      console.log('Response status:', response.status);

      // Check if response is OK
      // if (!response.ok) {
      //   throw new Error(`HTTP ${response.status}: Request failed`);
      // }

      const newRes = await response.json();
      console.log('API Response:', newRes);

      // Handle response based on your API structure
      if (newRes.status === '1' || newRes.success) {
        // Check where the content is in the response
        // It might be in newRes.data, newRes.result, newRes.content, etc.
        if (newRes.result[0]?.page_description) {
          setContent(newRes.result[0]?.page_description);
        } else {
          // If response doesn't have expected structure, use the whole response
          setContent(JSON.stringify(newRes, null, 2));
        }
      } else {
        showSnackbar(newRes?.msg || 'Failed to load privacy policy', 'error');
      }

    } catch (error) {
      console.error('API Error:', error);
      if (error.message?.includes('Network')) {
        showSnackbar('No internet connection', 'error');
      } else {
        showSnackbar(error.message || 'Something went wrong', 'error');
      }
      // Fallback content
      setContent(`
        <h1>Privacy Policy</h1>
        <p>Unable to load privacy policy at the moment. Please check your internet connection and try again.</p>
        <p>Paper Fast respects your privacy and ensures all your data is secure.</p>
      `);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlePrivacyRequest();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      {/* Loader */}
      <Loader visible={loading} />
      
      <StatusBar 
        backgroundColor={Colors.lightThemeBlue} 
        barStyle="dark-content" 
      />
      
      {/* Header Section */}
      <View style={{ backgroundColor: Colors.lightThemeBlue }}>
        <SafeAreaView edges={["top"]}>
          <HeaderPaperModule 
            title="Terms & Conditions" 
            leftIconPress={handleBack} 
          />
        </SafeAreaView>
      </View>

      {/* Content Section */}
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
        <HtmlView
          htmlContent={content}
          isLoading={loading}
          baseFontSize={16}
          padding={16}
        />
      </SafeAreaView>
    </View>
  );
};

export default PrivacyPolicyScreen;
