
import React, { forwardRef, useMemo } from 'react';
import { ActivityIndicator, useWindowDimensions, View } from 'react-native';
import WebView from 'react-native-webview';
import { Colors, Fonts } from '../../../theme';
import { moderateScale } from '../../../utils/responsiveSize';

// Fixed the Ref signature and types
interface MathRendererForQsDetialsProps {
  content: string;
  onToggleSelection: (id: string, questionNum: number) => void;
  onInfoPress?: () => void;
  webViewRef: any;
  isLoading: boolean;
  onEndReached: () => void;
  onScrollDirection?: (direction: "up" | "down") => void;
  bgColor: string;
  onMessage: () => void
}

const MathRendererForQsDetials = forwardRef<WebView, MathRendererForQsDetialsProps>((props, ref) => {
  const { content, onToggleSelection, isLoading, webViewRef, onEndReached, onScrollDirection, bgColor } = props;
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
        background-color: ${bgColor} !important;
        color: white; 
        font-family: 'Inter', sans-serif;
    margin: 0;
  padding: 6.5px 0;   /* small vertical space */
      }
    .card {
background-color: ${bgColor} !important;   
   padding: 5px; 
      display: flex; 
      flex-direction: row;
      position: relative; margin: 4px 2px;
      box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.1);
      transition: background-color 0.2s;
      margin: 8px 8px !important;
      border-radius:${moderateScale(15)}px
    }
  
    /* check box functionality */
.questionnptext {
 font-family: 'Inter';
    font-size: 15px;
font-weight: 600;
color:#000
}    
    /* Selection Highlight */
    .card.selected { background-color: #e3f2fd !important; }

      .checkbox-container {
        margin-right: 4px; display: flex; align-items: center; padding-top: 4px;
     flex-direction: column;
      }
      
    .custom-checkbox {
      width: 15px; height: 15px; border: 2px solid #cbd5e1; border-radius: 4px;
      display: flex; align-items: center; justify-content: center; background: white;
    }

    .selected .custom-checkbox {
      background-color: ${Colors.primaryColor};
      border-color: ${Colors.primaryColor};
    }

    .selected .custom-checkbox::after {
      content: '✓'; color: white; font-size: 14px;
    }

    .content-container { flex: 1; overflow-x: auto; }

    /* Custom Scrollbar */
    .content-container::-webkit-scrollbar { height: 4px; }
    .content-container::-webkit-scrollbar-thumb {
      background-color: ${Colors.primaryColor};
       border-radius: 10px;
    }

    .question { 
     margin-bottom:${moderateScale(10)}px
     }
// .qs-text,
// .qs-text .katex,
// .qs-text .katex * {
  // font-size: ${moderateScale(15)}px;
  // font-family: 'Inter' !important;
  // font-weight: 500 !important;
  // line-height: 10px !important;
// }
.qs-text {
  font-size: ${moderateScale(14)}px;
  font-family: 'Inter' !important;
  font-weight: 400 !important;
  color:#000;
  /* Line-height should usually be 1.2x to 1.5x the font size */
  line-height: ${moderateScale(20)}px !important; 
  text-align: justify;
}
     .option-inner {
  display: flex;
  flex-direction: row;
  align-items: center;
   gap: ${moderateScale(10)}px;  /* BEST way for equal space */
  margin-bottom: ${moderateScale(10)}px;
  padding-top : ${moderateScale(6)}px;
    padding-bottom : ${moderateScale(6)}px;
       background-color:${Colors.blackGray} ;
       border-radius: ${moderateScale(5)}px;
       border : 1px solid #d9dadb;
       padding-left:${moderateScale(10)}px;
       margin-right: ${moderateScale(10)}px
}
   .option-text-container {
  height: ${moderateScale(25)}px;
  width: ${moderateScale(25)}px;
  min-width: ${moderateScale(25)}px; /* VERY IMPORTANT */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  boder : 1px;
  background-color:${Colors.blackThird}
}
.option-text {
  font-size: ${moderateScale(13)}px;
  font-weight: 400;
  color: ${Colors.black};
}
.qs-option-text,
.qs-option-text .katex,
.qs-option-text .katex * {
  font-size: ${moderateScale(13)}px;
  font-family: 'Inter' !important;
  font-weight: 400 !important;
  color: ${Colors.black} !important;
  align-self: 'flex-start',
}
.option-number-test,
.option-number-test.katex,
.option-number-test.katex * {
   font-size:${moderateScale(12)}px;
     font-weight: 800;
     font-family:'Inter';
     color:${Colors.white};
}
.qs-option-test * {
   font-size: inherit !important;
   font-weight: inherit !important;
   font-family: inherit !important;
   color: inherit !important; /* This ensures your red/green logic works */
}
    
    .options { margin: 1px 0; }
    .answer-key {
    font-size:${moderateScale(13)}px;
    color:${Colors.green};
    font-family: '${Fonts.InterRegular}', sans-serif;
    }
    .lebal-test {
    font-size :${moderateScale(13)}px;
    font-weight:500;
  font-family:'Inter';
  color: #5f5f5f !important;
    }
  /* When the status is 'correct' */
.qs-option-text[style*="color"] * {
    color: inherit !important;
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
    .answer-key {
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
  align-items: center; 
  padding:0px;
  margin:0px;
}

.answer-content {
  flex: 1; /* Allows text to take up remaining space */
  font-size: ${moderateScale(13)}px;
  font-family: '${Fonts.InterSemiBold}', sans-serif;
  color: #1f2937;
}

.answer-text {
 font-size: ${moderateScale(14)}px;
  font-family: ${Fonts.InstrumentSansBold};
  color: ${Colors.green};
  font-weight:400;
  font-family:'Inter'
}
.info-icon {
  width: ${moderateScale(18)}px;
  height: ${moderateScale(18)}px;
  /* Space to the left of the image */
  margin-right: ${moderateScale(16)}px; 
  margin-top:0px;
  margin-bottom:0px 
}

/* --- Solution Section Styling --- */
.solution {
  margin-top: ${moderateScale(16)}px;
  margin-bottom: ${moderateScale(1)}px;
}

.solution-header {
  margin-bottom: ${moderateScale(1)}px;
}

.solution-label {
 font-size: ${moderateScale(14)}px;
font-family: '${Fonts.InterSemiBold}', sans-serif;
 color: ${Colors.primaryColor || '#008ce3'};
 letter-spacing: 0.5px;
 font-weight: 700;
 border-bottom:1px solid ${Colors.primaryColor}
}
.solution-content {
  font-size: ${moderateScale(13)}px;
  line-height: ${moderateScale(14)}px;
  color: #334155;
  font-family: 'Inter' !important;
 font-weight:400;
 margin-top:${moderateScale(10)}px;
 background-color: #e8e8e8;
 border-radius:${moderateScale(10)}px;
 padding:${moderateScale(10)}px;
 margin-right:${moderateScale(10)}px;
}

/* --- Adjusted Answer Key (Footer) --- */
.answer-key {
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
  align-items: center; 
  padding-top: ${moderateScale(6)}px;
}
    /* KaTeX styling */
    .katex .array td { border: 0.5px solid #000 !important; padding: 6px 10px !important; }
    .katex-display { text-align: left !important; margin: 12px 0 !important; }
    img { max-width: 100%; height: auto; display: block; margin: 10px auto; } // this add manually
  </style>
</head>
<body>
  <div id="render-area">${content}</div>

  <script>
  window.updateCardUI = function(id, isSelected) {
    const el = document.getElementById('card-' + id);
    if (el) {
      if (isSelected) el.classList.add('selected');
      else el.classList.remove('selected');
    }
  };

  function toggleCard(id, questionNum) { 
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: 'toggle',
        id: id,
        questionNum: questionNum
      })
    );
  }

  function updateLayout() {
    renderMathInElement(document.getElementById('render-area'), {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '\\\\[', right: '\\\\]', display: true},
        {left: '\\\\\\(', right: '\\\\\\)', display: false},
        {left: '\\\\(', right: '\\\\)', display: false},
        {left: '$', right: '$', display: false}
      ],
      throwOnError: false
    });
  }

  /* ✅ Single Scroll Listener */
  let lastScrollY = 0;

window.addEventListener("scroll", function () {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY) {
    window.ReactNativeWebView.postMessage("SCROLL_DOWN");
  } else {
    window.ReactNativeWebView.postMessage("SCROLL_UP");
  }

  lastScrollY = currentScrollY;

  if ((window.innerHeight + currentScrollY) >= document.body.offsetHeight - 10) {
    window.ReactNativeWebView.postMessage("END_REACHED");
  }
});
  window.onload = updateLayout;
  setTimeout(updateLayout, 500);
</script>
</body>
</html>
  `, [content]);

  return (
    <View style={{
      flex: 1, backgroundColor: bgColor

    }}>
      <WebView
        ref={ref}
        originWhitelist={['*']}
        source={{ html }}
        opaque={false}      // Add this for Android
        style={{ flex: 1, backgroundColor: bgColor }}
        containerStyle={{ backgroundColor: bgColor }}


        onMessage={(event) => {
          const message = event.nativeEvent.data;

          // 🔹 Scroll Direction
          if (message === "SCROLL_DOWN") {
            props.onScrollDirection?.("down");
            return;
          }

          if (message === "SCROLL_UP") {
            props.onScrollDirection?.("up");
            return;
          }

          // 🔹 Pagination
          if (message === "END_REACHED") {
            props.onEndReached?.();
            return;
          }

          // 🔹 Info button
          if (message === "openMediaPicker") {
            props.onInfoPress?.();
            return;
          }

          // 🔹 Toggle selection (JSON message)
          try {
            const data = JSON.parse(message);
            if (data?.type === "toggle") {
              props.onToggleSelection?.(data.id, data.questionNum);
            }
          } catch (e) {
            // ignore invalid JSON
          }
        }}

        javaScriptEnabled
        domStorageEnabled
        androidLayerType="hardware"
        showsVerticalScrollIndicator={false}
      />
      {isLoading && (
        <ActivityIndicator
          size="large"
          style={{ position: "absolute", bottom: 20, alignSelf: "center" }}
        />
      )}
    </View>
  );
});

export default MathRendererForQsDetials;