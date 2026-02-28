
import React, { useMemo, forwardRef } from 'react';
import { useWindowDimensions } from 'react-native';
import WebView from 'react-native-webview';
import { Colors } from '../../../../../theme';

const MathRenderer = forwardRef(({ content, onToggleSelection }: any, ref: any) => {
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
    body { font-size: 16px; padding: 0; background: #f9fafb; color: #000; font-family: -apple-system, sans-serif; margin: 0; }
    
    .card {
      background: #fff; 
      padding: 16px;
      display: flex; 
      flex-direction: row;
      margin: 4px 2px;
      box-shadow: 0 4px 12px rgba(0, 140, 227, 0.15);
      transition: background-color 0.2s;
    }

    /* Selection Highlight */
    .card.selected { background-color: #e3f2fd !important; }

    .checkbox-container {
      margin-right: 12px;
      display: flex;
      align-items: flex-start;
      padding-top: 4px;
    }

    .custom-checkbox {
      width: 20px;
      height: 20px;
      border: 2px solid #cbd5e1;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
    }

    .selected .custom-checkbox {
      background-color: ${Colors.primaryColor};
      border-color: ${Colors.primaryColor};
    }

    .selected .custom-checkbox::after {
      content: '✓';
      color: white;
      font-size: 14px;
    }

    .content-container { flex: 1; overflow-x: auto; }
    
    /* Scrollbar */
    .content-container::-webkit-scrollbar { height: 4px; }
    .content-container::-webkit-scrollbar-thumb {
      background-color: ${Colors.primaryColor};
      border-radius: 10px;
    }

    .question { margin-bottom: 12px; font-weight: 500; }
    .options { margin: 12px 0; }
    .katex .array td { border: 0.5px solid #000 !important; padding: 6px 10px !important; }
    .katex-display { text-align: left !important; margin: 12px 0 !important; }
    img { max-width: 100%; height: auto; display: block; margin: 10px auto; }
  </style>
</head>
<body>
  <div id="render-area">${content}</div>

  <script>
    // Updates only the clicked card's UI to prevent jumping
    window.updateCardUI = function(id, isSelected) {
      const el = document.getElementById('card-' + id);
      if (el) {
        if (isSelected) el.classList.add('selected');
        else el.classList.remove('selected');
      }
    };

    function handleCardClick(id) {
      window.ReactNativeWebView.postMessage(id);
    }

    function updateLayout() {
      renderMathInElement(document.getElementById('render-area'), {
        delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '\\\\[', right: '\\\\]', display: true},
          {left: '$', right: '$', display: false}
        ],
        throwOnError: false
      });
    }

    window.onload = updateLayout;
    setTimeout(updateLayout, 500);
  </script>
</body>
</html>
  `, [content]);

  return (
    <WebView
      ref={ref}
      originWhitelist={['*']}
      source={{ html }}
      style={{ width, height, backgroundColor: '#f9fafb' }}
      onMessage={(event) => onToggleSelection(event.nativeEvent.data)}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      androidLayerType="hardware"
    />
  );
});

export default MathRenderer;
