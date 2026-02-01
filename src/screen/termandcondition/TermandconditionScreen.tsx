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

const TermandconditionScreen = () => {
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

export default TermandconditionScreen;
