import React, { useState, useEffect } from "react";
import { View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../theme";
import HeaderPaperModule from "../../component/headerpapermodule/Headerpapermodule";
// import SimpleHtmlView from "../../components/SimpleHtmlView";
import HtmlView from "../../component/htmlview/HtmlView";
import { showSnackbar } from "../../utils/toastConfig";
import Loader from "../../component/loader/Loader"; // If you have a Loader component
import { GET } from "../../api/request";
import { ApiEndPoint } from "../../api/endPoints";
import { showToast } from "../../utils/toast";

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  console.log('content', content);

  const handleBack = () => {
    navigation.goBack();
  };

  // const handlePrivacyRequest = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch('https://www.papers.withupartners.in/api/privacy-policy', {
  //       method: 'GET',
  //     });

  //     const newRes = await response.json();
  //     if (newRes.status === '1' || newRes.success) {
  //       if (newRes.result[0]?.page_description) {
  //         setContent(newRes.result[0]?.page_description);
  //       } else {
  //         // If response doesn't have expected structure, use the whole response
  //         setContent(JSON.stringify(newRes, null, 2));
  //       }
  //     } else {
  //       showSnackbar(newRes?.msg || 'Failed to load privacy policy', 'error');
  //     }

  //   } catch (error) {
  //     console.error('API Error:', error);
  //     if (error.message?.includes('Network')) {
  //       showSnackbar('No internet connection', 'error');
  //     } else {
  //       showSnackbar(error.message || 'Something went wrong', 'error');
  //     }
  //     // Fallback content
  //     setContent(`
  //       <h1>Privacy Policy</h1>
  //       <p>Unable to load privacy policy at the moment. Please check your internet connection and try again.</p>
  //       <p>Paper Fast respects your privacy and ensures all your data is secure.</p>
  //     `);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handlePrivacyRequest = async () => {
    setLoading(true)
    try {
      const response = await GET(ApiEndPoint.privacyPolicy);
      if (response?.status === '1' || 200) {
        setContent(response?.result[0]?.page_description);
      }
    } catch (error: any) {
      if (error?.offline) {
        return;
      }
      const errorMessage = error?.response?.data?.message ||
        error?.message ||
        'Something went wrong. Please try again.';
      showToast('error', 'Error', errorMessage);
    } finally {
      setLoading(false)
    }

  }

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
            title="Privacy Policy"
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
