
import React, { forwardRef, useMemo, useState } from 'react';
import { ActivityIndicator, useWindowDimensions, View } from 'react-native';
import WebView from 'react-native-webview';
import { moderateScale } from '../../../../utils/responsiveSize';
import { Colors, Fonts } from '../../../../theme';

// Fixed the Ref signature and types
interface MathRendererProps {
  content: string;
  onInfoPress?: () => void;
  webViewRef: any;
  isLoading: boolean;
}

const MathRenderer = forwardRef<WebView, MathRendererProps>((props, ref) => {
  const { content, isLoading, webViewRef, } = props;
  const { width, height } = useWindowDimensions();
  const html = useMemo(() => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes"/>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"/>
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>

  <style>
@font-face {
  font-family: 'Inter';
  src: url('file:///android_asset/fonts/Inter_28pt-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal
  }
@font-face {
  font-family: 'Inter';
  src: url('file:///android_asset/fonts/Inter_18pt-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal
  }
@font-face {
  font-family: 'Inter';
  src: url('file:///android_asset/fonts/Inter_18pt-SemiBold.ttf') format('truetype');
  font-weight: 600;
  font-style: normal
  }
@font-face {
  font-family: 'Inter';
  src: url('file:///android_asset/fonts/Inter_24pt-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal
  }
@font-face {
  font-family: 'Inter';
  src: url('file:///android_asset/fonts/Inter_18pt-ExtraBold.ttf') format('truetype');
  font-weight: 800;
  font-style: normal
  }

/* ================= Instrument Sans Condensed ================= */

@font-face {
  font-family: 'InstrumentSans';
  src: url('file:///android_asset/fonts/InstrumentSans_Condensed-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'InstrumentSans';
  src: url('file:///android_asset/fonts/InstrumentSans_Condensed-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'InstrumentSans';
  src: url('file:///android_asset/fonts/InstrumentSans_Condensed-SemiBold.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: 'InstrumentSans';
  src: url('file:///android_asset/fonts/InstrumentSans_Condensed-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'InstrumentSans';
  src: url('file:///android_asset/fonts/InstrumentSans_Condensed-ExtraBold.ttf') format('truetype');
  font-weight: 800;
  font-style: normal;
}

body { 
        background-color: #ffffff ; 
        color: white; 
        font-family: 'Inter', sans-serif;
        margin: 0;
    padding: 0;
      }
    .card {
      background-color: #ffffff !important;
    }
      .institute-name {
      color:${Colors.black};
      font-size:${moderateScale(16)}px;
      font-weight: '700';
      }

      .subject-test{
         flex-direction: 'row';
    justify-content: 'space-between';
    width: '100%';
    color:${Colors.black};
    margin: 0px ${moderateScale(2)}px
      }
    .section-subject-test {
      font-size: ${moderateScale(14)}px;
      color: #000;
      /* Use a generic fallback if the font doesn't load in WebView */
      font-family: sans-serif; 
      font-weight: bold;
      text-align: center;
      border-bottom: 1.2px solid #000;
      margin-bottom: ${moderateScale(4)}px;
      display: inline-block; /* Required for the border-bottom to fit the text width */
    }
/* Ensure the label has consistent spacing */
.lebal-test {
    margin-right: 5px;
    font-family: 'Inter';
}
/* When the status is 'incorrect' */
.qs-option-text[data-status="incorrect"] {
  color: #e74c3c !important; /* Red */
}
    /* KaTeX styling */
    .katex .array td { border: 0.5px solid #000 !important; padding: 6px 10px !important; }
    .katex-display { text-align: left !important; margin: 12px 0 !important; }
    img { max-width: 100%; height: auto; display: block; margin: 10px auto; } // this add manually
  </style>
</head>
<body>

<div id="render-area">
${content}
</div>

<script>

function toggleCard(id, questionNum){
  window.ReactNativeWebView.postMessage(
    JSON.stringify({
      type:"toggle",
      id:id,
      questionNum:questionNum
    })
  );
}

document.addEventListener("DOMContentLoaded", function () {

  renderMathInElement(document.body, {
    delimiters: [
      {left: "\\\\(", right: "\\\\)", display: false},
      {left: "\\\\[", right: "\\\\]", display: true}
    ],
    throwOnError: false
  });

});

</script>

</body>

</html>
  `, [content]);

  console.log('aaaaaaaaahtml', html);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={ref}
        originWhitelist={['*']}
        source={{ html }}
        style={{ flex: 1, backgroundColor: Colors.white }}
        javaScriptEnabled
        domStorageEnabled
        androidLayerType="hardware"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
});

export default MathRenderer;
