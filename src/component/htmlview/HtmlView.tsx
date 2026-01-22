import React from 'react';
import {
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  Platform,
  View,
  ActivityIndicator,
  Text,
  Linking,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import { moderateScale } from '../../utils/responsiveSize';
import Loader from '../loader/Loader';
import { Colors, Fonts } from '../../theme';

/**
 * Simple Responsive HTML Viewer
 * Just pass HTML content and it will render perfectly on all devices
 */
const HtmlView = ({
  htmlContent,
  isLoading = false,
  baseFontSize = 16,
  padding = 10,
}) => {
  const { width } = useWindowDimensions();
  
  // Calculate content width with padding
  const contentWidth = width - (moderateScale(padding) * 2);
  
  // Responsive font size
  const responsiveFontSize = moderateScale(baseFontSize);
  
  // Base styles
  const baseStyle = {
    // fontSize: responsiveFontSize,
    fontSize: moderateScale(15),
    lineHeight: moderateScale(baseFontSize * 1.5),
    color: '#414141',
    fontFamily: Platform.OS === 'ios' ? 'System' : Fonts.InterRegular,
    
  };
  
  // Simple tag styles
  const tagsStyles = {
    p: {
      ...baseStyle,
      marginBottom: moderateScale(12),
    },
    h1: {
      fontSize: moderateScale(baseFontSize * 2),
      fontWeight: 'bold',
      marginBottom: moderateScale(16),
      color: '#000',
    },
    h2: {
      fontSize: moderateScale(baseFontSize * 1.75),
      fontWeight: '600',
      marginBottom: moderateScale(12),
      color: '#111',
    },
    h3: {
      fontSize: moderateScale(baseFontSize * 1.5),
      fontWeight: '600',
      marginBottom: moderateScale(10),
      color: '#222',
    },
    strong: {
      fontWeight: 'bold',
    },
    em: {
      fontStyle: 'italic',
    },
    a: {
      color: '#007AFF',
      textDecorationLine: 'underline',
    },
    ul: {
      marginBottom: moderateScale(12),
      paddingLeft: moderateScale(20),
    },
    ol: {
      marginBottom: moderateScale(12),
      paddingLeft: moderateScale(20),
    },
    li: {
      marginBottom: moderateScale(6),
    },
  };
  
  if (isLoading) {
    return (
      // <View style={styles.center}>
      //   <ActivityIndicator size="large" color="#007AFF" />
      // </View>
      <Loader visible={isLoading}/>
    );
  }
  
  if (!htmlContent || htmlContent.trim() === '') {
    return (
      <View style={styles.center}>
        <Text style={{ color: '#999', fontSize: moderateScale(14) }}>
          No content available
        </Text>
      </View>
    );
  }
  
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        padding: moderateScale(padding),
      }}
      showsVerticalScrollIndicator={true}
    >
      <RenderHtml
        contentWidth={contentWidth}
        source={{ html: htmlContent }}
        tagsStyles={tagsStyles}
        baseStyle={baseStyle}
        defaultTextProps={{ allowFontScaling: false }}
        onLinkPress={(event, href) => {
          Linking.openURL(href).catch(err => 
            console.warn('Failed to open URL:', err)
          );
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
    // borderWidth:1,
    // borderColor:'red'
  },
});

export default HtmlView;