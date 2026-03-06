
// import React, { useMemo } from 'react';
// import { useWindowDimensions } from 'react-native';
// import WebView from 'react-native-webview';

// const MathRenderer = ({ content }: { content: string }) => {
//   const { width, height } = useWindowDimensions();

//   const html = useMemo(() => `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8"/>
//   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes"/>
//   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"/>
//   <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
//   <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>

//   <style>
//  body { 
//       font-size: 16px; 
//       padding: 12px; /* Slightly reduced padding */
//       background: #f9fafb; 
//       line-height: 1.6; 
//       color: #000; 
//       font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//       margin: 0;
//       /* CRITICAL: Prevent the whole body from stretching */
//       width: 100vw;
//       overflow-x: hidden;
//       box-sizing: border-box;
//     }

//     // .card { 
//     //   background: #fff; 
//     //   padding: 20px; 
//     //   border-radius: 12px; 
//     //   margin-bottom: 16px;
//     //   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//     // }
//     .card {
//       background: #fff; 
//       border: 1px solid #e5e7eb;
//       padding: 16px;
//       border-radius: 8px;
//       margin-bottom: 16px;
//       /* CRITICAL: Ensure card stays within screen bounds */
//       max-width: calc(100vw - 24px); 
//       overflow: hidden;
//       box-sizing: border-box;
//     }
//     .question { 
//       margin-bottom: 16px;
//       font-weight: 500;
//       font-size: 16px;
//       word-wrap: break-word; /* Ensure text doesn't push width */
//     }
//     .options { 
//       margin: 16px 0;
//     }

//     .option { 
//       padding: 8px 0;
//       margin: 4px 0;
//       font-size: 15px;
//     }

//     .solution { 
//       margin-top: 20px;
//       padding-top: 20px;
//       border-top: 2px solid #e5e7eb;
//     }

//     .solution-header {
//       font-size: 16px;
//       margin-bottom: 12px;
//       color: #2563eb;
//     }

//     .solution-content {
//       margin: 12px 0;
//     }

//     .answer {
//       margin-top: 16px;
//       padding: 10px 14px;
//       background: #f3f4f6;
//       border-radius: 6px;
//       font-weight: 500;
//       font-size: 15px;
//       border-left: 4px solid #2563eb;
//     }
//     /* Ensure table cells have padding and borders like the screenshot */
// .katex .matrix-cell, .katex .array td {
//   padding: 8px 12px !important;
//   border: 0.5px solid #000 !important; /* Forces the grid lines */
// }

//     /* Line breaks */
//     br {
//       display: block;
//       margin: 8px 0;
//       content: "";
//     }

//     /* Math expressions in line */
//     .katex {
//       font-size: 1.1em;
//     }

//     /* Hide KaTeX errors - they show as red text */
//     .katex-error, .katex .katex-error {
//       color: inherit !important;
//       background: transparent !important;
//       border: none !important;
//     }

//     /* Regular text formatting */
//     .math-text {
//       color: #000;
//       font-family: inherit;
//     }

//     /* Ensure arrays display properly */
//     .math-display {
//       margin: 16px 0;
//       overflow-x: auto;
//     }

//     /* Fix for array environment */
//     // .katex-html {
//     //   white-space: normal;
//     // }


//     /* CRITICAL: This allows ONLY the math/tables to scroll horizontally */
//     .katex-display { 
//       text-align: left !important; 
//       margin: 12px 0 !important; 
//       padding: 8px 0;
//       display: block;
//       overflow-x: auto !important;
//       overflow-y: hidden;
//       width: 100%;
//       -webkit-overflow-scrolling: touch;
//     }

//     /* Ensure tables inside cards don't break the card width */
//     .katex .array {
//       border-collapse: collapse;
//       /* Allows table to maintain its internal width while the parent scrolls */
//       display: table !important; 
//     }

//     .katex .matrix-cell, .katex .array td {
//       padding: 8px 12px !important;
//       border: 1px solid #000 !important;
//     }

//     img { 
//       max-width: 100%; 
//       height: auto; 
//       display: block; 
//       margin: 15px auto; 
//       border-radius: 4px;
//     }

//     .katex-html {
//       white-space: nowrap; /* Keep math on one line so it triggers the scrollbar */
//     }

//     /* Optional: Custom scrollbar appearance for a cleaner look */
//     .katex-display::-webkit-scrollbar {
//       height: 4px;
//     }
//     .katex-display::-webkit-scrollbar-thumb {
//       background: #e5e7eb;
//       border-radius: 10px;
//     }

//     // ??????????
//     /* Force table borders like the "Match the List" screenshot */
//   .katex .array {
//     border-collapse: collapse;
//   }
//   .katex .array td {
//     border: 1px solid #000 !important; /* Visual grid lines */
//     padding: 8px 12px !important;
//   }

//   /* Left-align display math (Equations) */
//   .katex-display { 
//     text-align: left !important; 
//     margin: 12px 0 !important; 
//     overflow-x: auto; 
//     padding: 5px 0;
//   }


//   /* Ensure long equations wrap on small screens */
//   .katex-html {
//     white-space: normal;
//   }
//   </style>
// </head>
// <body>
//   <div id="render-area">${content}</div>

//   <script>
//    function renderMath() {
//   try {
//     if (window.renderMathInElement) {
//       renderMathInElement(document.getElementById('render-area'), {
//         delimiters: [
//           {left: '$$', right: '$$', display: true},
//           {left: '\\\\[', right: '\\\\]', display: true},
//           {left: '\\\\\\(', right: '\\\\\\)', display: false},
//           {left: '\\\\(', right: '\\\\)', display: false},
//           {left: '$', right: '$', display: false}
//         ],
//         throwOnError: false,
//         strict: false, // Prevents errors on non-standard LaTeX
//         macros: {
//           "\\vec": "\\mathbf{#1}",
//           // REMOVED: "\\begin{array}": "\\begin{aligned}" 
//           // Keeping array allows the table borders to work.
//         }
//       });
//     }
//   } catch (e) {
//     console.log('KaTeX rendering error');
//   }
// }

//     // Run when page loads
//     window.onload = function() {
//       renderMath();
//     };

//     // Run again after a short delay
//     setTimeout(renderMath, 300);
//     setTimeout(renderMath, 1000);
//   </script>
// </body>
// </html>
//   `, [content]);

//   return (
//     <WebView
//       originWhitelist={['*']}
//       source={{ html }}
//       style={{ width, height, backgroundColor: '#f9fafb' }}
//       javaScriptEnabled={true}
//       domStorageEnabled={true}
//       scrollEnabled={true}
//       androidLayerType="hardware"
//       overScrollMode="never"
//       nestedScrollEnabled={true}
//       cacheEnabled={true}
//       mixedContentMode="always"
//       showsVerticalScrollIndicator={false}
//       showsHorizontalScrollIndicator={false}
//     />
//   );
// };

// export default MathRenderer;


// ?????????????
// import React, { useMemo } from 'react';
// import { useWindowDimensions, View } from 'react-native';
// import WebView from 'react-native-webview';

// const MathRenderer = ({ content }: { content: string }) => {
//   const { width, height } = useWindowDimensions();

// //   const html = useMemo(() => `
// // <!DOCTYPE html>
// // <html>
// // <head>
// //   <meta charset="utf-8"/>
// //   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes"/>
// //   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"/>
// //   <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
// //   <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>

// //   <style>
// //     body { 
// //       font-size: 16px; 
// //       padding: 4px; 
// //       background: #f9fafb; 
// //       line-height: 1.5; 
// //       color: #000; 
// //       font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
// //       margin: 0;
// //     }

// //     // .card { 
// //     //   background: #fff; 
// //     //   padding: 20px; 
// //     //   border-radius: 12px; 
// //     //   margin-bottom: 16px;
// //     //   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
// //     // }
// //     .card {
// //   background:  #fff; 
// //   border: 1px solid #e5e7eb;
// //   padding: 16px;
// //   border-radius: 5px;

// //   /* Center the card and set its width */
// //     width: 95%; /* Centers card with slight margin on sides */
// //     max-width: 600px; /* Optional: limits width on tablets/large screens */
// //     box-shadow: 0 1px 3px rgba(0,0,0,0.1);
// //     box-sizing: border-box;
// //     overflow: hidden; /* Contains internal scrolling math */

// // }
// //     .question { 
// //       margin-bottom: 16px;
// //       font-weight: 500;
// //       font-size: 16px;
// //     }

// //     .options { 
// //       margin: 16px 0;
// //     }

// //     .option { 
// //       padding: 8px 0;
// //       margin: 4px 0;
// //       font-size: 15px;
// //     }

// //     .solution { 
// //       margin-top: 20px;
// //       padding-top: 20px;
// //       border-top: 2px solid #e5e7eb;
// //     }

// //     .solution-header {
// //       font-size: 16px;
// //       margin-bottom: 12px;
// //       color: #2563eb;
// //     }

// //     .solution-content {
// //       margin: 12px 0;
// //     }

// //     .answer {
// //       margin-top: 16px;
// //       padding: 10px 14px;
// //       background: #f3f4f6;
// //       border-radius: 6px;
// //       font-weight: 500;
// //       font-size: 15px;
// //       border-left: 4px solid #2563eb;
// //     }

// //     // img { 
// //     //   max-width: 100%; 
// //     //   height: auto; 
// //     //   display: block; 
// //     //   // margin: 16px 0;
// //     //   border-radius: 6px;
// //     //  margin: 10px auto;
// //     // }

// //     /* KaTeX Display Math */
// //     // .katex-display { 
// //     //   text-align: left; 
// //     //   // margin: 16px 0; 
// //     //   overflow-x: auto; 
// //     //   overflow-y: hidden;
// //     //   padding: 8px 0;
// //     //   font-size: 1.1em;
// //     //   margin: 10px 0;
// //     // }

// //     /* Array/Matrix styling */
// //     // .katex .array {
// //     //   border-collapse: collapse;
// //     //   margin: 0 auto;
// //     //  line-height: 1.2;
// //     // }

// //     // .katex .array td {
// //     //   padding: 0.2em 0.5em;
// //     //   text-align: center;
// //     // }

// //     /* Ensure table cells have padding and borders like the screenshot */
// // .katex .matrix-cell, .katex .array td {
// //   padding: 8px 12px !important;
// //   border: 0.5px solid #000 !important; /* Forces the grid lines */
// // }

// //     /* Line breaks */
// //     br {
// //       display: block;
// //       margin: 8px 0;
// //       content: "";
// //     }

// //     /* Math expressions in line */
// //     .katex {
// //       font-size: 1.1em;
// //     }

// //     /* Hide KaTeX errors - they show as red text */
// //     .katex-error, .katex .katex-error {
// //       color: inherit !important;
// //       background: transparent !important;
// //       border: none !important;
// //     }

// //     /* Regular text formatting */
// //     .math-text {
// //       color: #000;
// //       font-family: inherit;
// //     }

// //     /* Ensure arrays display properly */
// //     .math-display {
// //       margin: 16px 0;
// //       overflow-x: auto;
// //     }

// //     /* Fix for array environment */
// //     // .katex-html {
// //     //   white-space: normal;
// //     // }


// //     // ??????????
// //     /* Force table borders like the "Match the List" screenshot */
// //   .katex .array {
// //     border-collapse: collapse;
// //   }
// //   .katex .array td {
// //     border: 1px solid #000 !important; /* Visual grid lines */
// //     padding: 8px 12px !important;
// //   }

// //   /* Left-align display math (Equations) */
// //   .katex-display { 
// //     text-align: left !important; 
// //     margin: 12px 0 !important; 
// //     overflow-x: auto; 
// //     padding: 5px 0;
// //   }

// //   /* Fix for Base64 Images */
// //   img { 
// //     max-width: 100%; 
// //     height: auto; 
// //     display: block; 
// //     margin: 15px auto; 
// //     border-radius: 4px;
// //   }

// //   /* Ensure long equations wrap on small screens */
// //   .katex-html {
// //     white-space: normal;
// //   }
// //   </style>
// // </head>
// // <body>
// //   <div id="render-area">${content}</div>

// //   <script>
// //    function renderMath() {
// //   try {
// //     if (window.renderMathInElement) {
// //       renderMathInElement(document.getElementById('render-area'), {
// //         delimiters: [
// //           {left: '$$', right: '$$', display: true},
// //           {left: '\\\\[', right: '\\\\]', display: true},
// //           {left: '\\\\\\(', right: '\\\\\\)', display: false},
// //           {left: '\\\\(', right: '\\\\)', display: false},
// //           {left: '$', right: '$', display: false}
// //         ],
// //         throwOnError: false,
// //         strict: false, // Prevents errors on non-standard LaTeX
// //         macros: {
// //           "\\vec": "\\mathbf{#1}",
// //           // REMOVED: "\\begin{array}": "\\begin{aligned}" 
// //           // Keeping array allows the table borders to work.
// //         }
// //       });
// //     }
// //   } catch (e) {
// //     console.log('KaTeX rendering error');
// //   }
// // }

// //     // Run when page loads
// //     window.onload = function() {
// //       renderMath();
// //     };

// //     // Run again after a short delay
// //     setTimeout(renderMath, 300);
// //     setTimeout(renderMath, 1000);
// //   </script>
// // </body>
// // </html>
// //   `, [content]);

// const html = useMemo(() => `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8"/>
//   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
//   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"/>
//   <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
//   <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>

//   <style>
//     /* 1. Reset and Lock Viewport */
//     html, body { 
//       margin: 0;
//       padding: 0;
//       width: 100%;
//       background: #f9fafb; 
//       font-family: -apple-system, sans-serif;
//       /* Prevent the whole page from ever moving left/right */
//       overflow-x: hidden !important; 
//     }

//     body {
//       display: flex;
//       flex-direction: column;
//       align-items: center; /* Centers the cards */
//       padding: 10px 0;
//     }

//     /* 2. Card Layout */
//     .card {
//       background: #fff; 
//       border: 1px solid #e5e7eb;
//       padding: 16px;
//       border-radius: 8px;
//       margin-bottom: 16px;
//       width: 94vw; /* Uses viewport width to ensure centering */
//       box-sizing: border-box;
//       /* Keeps the card background static while content inside scrolls */
//       overflow: hidden; 
//     }

//     /* 3. The Scroll Container (Crucial Fix) */
//     .katex-display { 
//       text-align: left !important; 
//       margin: 12px 0 !important; 
//       padding: 10px 0;

//       /* Forces this specific element to scroll if it's too wide */
//       display: block !important;
//       width: 100% !important;
//       overflow-x: auto !important; 
//       overflow-y: hidden;
//       -webkit-overflow-scrolling: touch;
//     }

//     /* Keep tables from collapsing or disappearing */
//     .katex .array {
//       display: table !important; 
//       border-collapse: collapse;
//       min-width: 100%; /* Ensures it fills card but expands if needed */
//     }

//     .katex .array td {
//       border: 1px solid #000 !important;
//       padding: 8px 12px !important;
//     }

//     /* 4. Formatting */
//     .question { margin-bottom: 12px; font-weight: 500; font-size: 16px; color: #111; word-wrap: break-word; }
//     .option { padding: 8px 0; font-size: 15px; color: #374151; }
//     .solution { margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee; }
//     .solution-header { font-weight: bold; color: #2563eb; margin-bottom: 8px; }
//     .answer { margin-top: 12px; padding: 12px; background: #eff6ff; border-radius: 6px; border-left: 4px solid #2563eb; }

//     img { max-width: 100%; height: auto; display: block; margin: 15px auto; }

//     /* Fix for horizontal scrollbar visibility */
//     .katex-display::-webkit-scrollbar { height: 4px; }
//     .katex-display::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
//   </style>
// </head>
// <body>
//   <div id="render-area">${content}</div>

//   <script>
//     function renderMath() {
//       try {
//         if (window.renderMathInElement) {
//           renderMathInElement(document.getElementById('render-area'), {
//             delimiters: [
//               {left: '$$', right: '$$', display: true},
//               {left: '\\\\[', right: '\\\\]', display: true},
//               {left: '\\\\(', right: '\\\\)', display: false},
//               {left: '$', right: '$', display: false}
//             ],
//             throwOnError: false,
//             strict: false
//           });
//         }
//       } catch (e) { console.error(e); }
//     }
//     window.onload = renderMath;
//     // Fast re-render checks
//     setTimeout(renderMath, 100);
//     setTimeout(renderMath, 500);
//   </script>
// </body>
// </html>
//   `, [content]);
//   return (
//     // <WebView
//     //   originWhitelist={['*']}
//     //   source={{ html }}
//     //   style={{ width, height, backgroundColor: '#f9fafb' }}
//     //   javaScriptEnabled={true}
//     //   domStorageEnabled={true}
//     //   scrollEnabled={true}
//     //   androidLayerType="hardware"
//     //   overScrollMode="never"
//     //   nestedScrollEnabled={true}
//     //   cacheEnabled={true}
//     //   mixedContentMode="always"
//     //   showsVerticalScrollIndicator={false}
//     //   showsHorizontalScrollIndicator={false}
//     // />
//    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
//       <WebView
//         originWhitelist={['*']}
//         source={{ html }}
//         style={{ width: width, height: height }}
//         javaScriptEnabled={true}
//         domStorageEnabled={true}
//         scrollEnabled={true}
//         overScrollMode="never"
//         showsHorizontalScrollIndicator={false}
//         // Ensure content doesn't get cut by Android layer rendering
//         androidLayerType="hardware"
//       />
//     </View>
//   );
// };

// export default MathRenderer;

// import React, { useMemo } from 'react';
// import { useWindowDimensions, View } from 'react-native';
// import WebView from 'react-native-webview';
// import { Colors } from '../../../../../theme'; // Ensure this path is correct

// const MathRenderer = ({ content }: { content: string }) => {
//   const { width, height } = useWindowDimensions();

//   // Use the hex code for your primary color (e.g., #2563eb)
//   const primaryColor = Colors.primaryColor || '#2563eb';

//   const html = useMemo(() => `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8"/>
//   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
//   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"/>
//   <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
//   <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>

//   <style>
//     html, body { 
//       margin: 0;
//       padding: 0;
//       width: 100%;
//       background: #f9fafb; 
//       font-family: -apple-system, sans-serif;
//       overflow-x: hidden !important; 
//     }

//     body {
//       display: flex;
//       flex-direction: column;
//       align-items: center; 
//       padding: 10px 0;
//     }

//     .card {
//       background: #fff; 
//       border: 1px solid #e5e7eb;
//       padding: 16px;
//       border-radius: 8px;
//       margin-bottom: 16px;
//       width: 94vw; 
//       box-sizing: border-box;
//       overflow: hidden; /* Contains the scroll within the card */
//       display: flex;
//       flex-direction: column;
//     }

//     /* Target KaTeX display blocks and the solution content for horizontal scrolling */
//     .katex-display, .math-display, .solution-content { 
//       text-align: left !important; 
//       margin: 12px 0 !important; 
//       padding-bottom: 8px;
//       display: block !important;
//       width: 100% !important;
//       overflow-x: auto !important; 
//       overflow-y: hidden;
//       -webkit-overflow-scrolling: touch;
//     }

//     /* Force tables/arrays to maintain their width to trigger scrolling */
//     .katex .array {
//       display: table !important; 
//       border-collapse: collapse;
//       min-width: 100%; 
//     }

//     .katex .array td {
//       border: 1px solid #000 !important;
//       padding: 8px 12px !important;
//     }

//     .question { margin-bottom: 12px; font-weight: 500; font-size: 16px; color: #111; word-wrap: break-word; }
//     .option { padding: 8px 0; font-size: 15px; color: #374151; }
//     .solution { margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee; width: 100%; }
//     .solution-header { font-weight: bold; color: ${primaryColor}; margin-bottom: 8px; }
//     .answer { margin-top: 12px; padding: 12px; background: #eff6ff; border-radius: 6px; border-left: 4px solid ${primaryColor}; }

//     img { max-width: 100%; height: auto; display: block; margin: 15px auto; }

//     /* Custom Scrollbar using Primary Color */
//     ::-webkit-scrollbar {
//       height: 6px;
//     }
//     ::-webkit-scrollbar-track {
//       background: #f1f1f1;
//       border-radius: 10px;
//     }
//     ::-webkit-scrollbar-thumb {
//       background: ${primaryColor}; 
//       border-radius: 10px;
//     }
//     ::-webkit-scrollbar-thumb:hover {
//       background: #555;
//     }
//   </style>
// </head>
// <body>
//   <div id="render-area">${content}</div>

//   <script>
//     function renderMath() {
//       try {
//         if (window.renderMathInElement) {
//           renderMathInElement(document.getElementById('render-area'), {
//             delimiters: [
//               {left: '$$', right: '$$', display: true},
//               {left: '\\\\[', right: '\\\\]', display: true},
//               {left: '\\\\(', right: '\\\\)', display: false},
//               {left: '$', right: '$', display: false}
//             ],
//             throwOnError: false,
//             strict: false
//           });
//         }
//       } catch (e) { console.error(e); }
//     }
//     window.onload = renderMath;
//     setTimeout(renderMath, 100);
//     setTimeout(renderMath, 500);
//   </script>
// </body>
// </html>
//   `, [content, primaryColor]);

//   return (
//     <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
//       <WebView
//         originWhitelist={['*']}
//         source={{ html }}
//         style={{ width: width, height: height }}
//         javaScriptEnabled={true}
//         domStorageEnabled={true}
//         scrollEnabled={true}
//         overScrollMode="never"
//         showsHorizontalScrollIndicator={true}
//         androidLayerType="hardware"
//       />
//     </View>
//   );
// };

// export default MathRenderer;



// // scroll
// import React, { useMemo } from 'react';
// import { useWindowDimensions, View } from 'react-native';
// import WebView from 'react-native-webview';
// import { Colors } from '../../../../../theme';

// const MathRenderer = ({ content }: { content: string }) => {
//   const { width, height } = useWindowDimensions();
//   const primaryColor = Colors.primaryColor || '#2563eb';

//   const html = useMemo(() => `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8"/>
//   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
//   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"/>
//   <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
//   <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>

//   <style>
//     html, body { 
//       margin: 0; padding: 0; width: 100%; 
//       background: #f9fafb; font-family: -apple-system, sans-serif;
//       overflow-x: hidden !important; 
//     }
//     body { display: flex; flex-direction: column; align-items: center; padding: 5px 0; }

//     .card {
//       background: #fff; 
//       border: 1px solid #e5e7eb;
//       border-radius: 8px;
//       margin-bottom: 8px;
//       width: 96vw; 
//       box-sizing: border-box;
//       overflow: hidden;
//       display: flex;
//       flex-direction: column;
//     }

//     /* Condition: Green line for static cards */
//     .card.no-scroll {
//       border-bottom: 3px solid #0fe120 !important;
//     }

//     .card-scroll-wrapper {
//       padding: 16px;
//       overflow-x: auto !important;
//       overflow-y: hidden;
//       display: block;
//       width: 100%;
//       box-sizing: border-box;
//       -webkit-overflow-scrolling: touch;
//     }

//     .scroll-content { min-width: 100%; width: max-content; }

//     .question { margin-bottom: 12px; font-weight: 500; font-size: 16px; color: #111; }
//     .option { padding: 4px 0; font-size: 15px; color: #374151; white-space: nowrap; }
//     .solution { margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee; }
//     .solution-header { font-weight: bold; color: ${primaryColor}; margin-bottom: 8px; }

//     .katex-display { margin: 10px 0 !important; display: inline-block !important; }
//     .answer { 
//       margin-top: 12px; padding: 10px; background: #eff6ff; 
//       border-radius: 6px; border-left: 4px solid ${primaryColor};
//       width: fit-content;
//     }

//     /* Scrollbar Styling */
//     .card-scroll-wrapper::-webkit-scrollbar { height: 6px; }
//     .card-scroll-wrapper::-webkit-scrollbar-track { background: #f1f1f1; }
//     .card-scroll-wrapper::-webkit-scrollbar-thumb { 
//       background: ${primaryColor}; 
//       border-radius: 10px; 
//     }
//   </style>
// </head>
// <body>
//   <div id="render-area">${content}</div>

//   <script>
//     function updateLayout() {
//       // 1. Render Math
//       if (window.renderMathInElement) {
//         renderMathInElement(document.getElementById('render-area'), {
//           delimiters: [
//             {left: '$$', right: '$$', display: true},
//             {left: '\\\\[', right: '\\\\]', display: true},
//             {left: '\\\\(', right: '\\\\)', display: false},
//             {left: '$', right: '$', display: false}
//           ],
//           throwOnError: false
//         });
//       }

//       // 2. Green Line logic (Dynamic)
//       setTimeout(() => {
//         const wrappers = document.querySelectorAll('.card-scroll-wrapper');
//         wrappers.forEach(wrapper => {
//           const card = wrapper.closest('.card');
//           // If content is smaller or equal to visible width, it's not scrolling
//           if (wrapper.scrollWidth <= wrapper.offsetWidth + 2) {
//             card.classList.add('no-scroll');
//           } else {
//             card.classList.remove('no-scroll');
//           }
//         });
//       }, 100);
//     }

//     window.onload = updateLayout;
//     window.addEventListener('resize', updateLayout);
//   </script>
// </body>
// </html>
//   `, [content, primaryColor]);

//   return (
//     <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
//       <WebView
//         originWhitelist={['*']}
//         source={{ html }}
//         style={{ width, height }}
//         javaScriptEnabled={true}
//         domStorageEnabled={true}
//         androidLayerType="hardware"
//       />
//     </View>
//   );
// };

// export default MathRenderer;




// previous day
// import React, { useMemo } from 'react';
// import { useWindowDimensions } from 'react-native';
// import WebView from 'react-native-webview';

// const MathRenderer = ({ content }: { content: string }) => {
//   const { width, height } = useWindowDimensions();

//   const html = useMemo(() => `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8"/>
//   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes"/>
//   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"/>
//   <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
//   <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>

//  <style>
//   body { 
//     font-size: 16px; 
//     padding: 8px; 
//     background: #f9fafb; 
//     line-height: 1.6; 
//     color: #000; 
//     font-family: -apple-system, sans-serif;
//     margin: 0;
//   }

//   /* Each question is in a card */
//   .card {
//     background: #fff; 
//     padding: 16px;
//     /* Auto horizontal scroll: only shows if content is wider than screen */
//     overflow-x: auto; 
//     -webkit-overflow-scrolling: touch;
//   }

//   /* The green separator line between cards */
//   .card:not(:last-child) {
//     border-bottom: 2px solid #22c55e; /* Green line like the screenshot */
//     margin-bottom: 0; /* Remove space so green line is the only gap */
//   }

//   .question { 
//     margin-bottom: 12px;
//     font-weight: 500;
//   }

//   .options { 
//     margin: 12px 0;
//   }

//   /* Grid/Table styling for "Match the List" */
//   .katex .array {
//     border-collapse: collapse;
//   }
//   .katex .array td {
//     border: 0.5px solid #000 !important; 
//     padding: 6px 10px !important;
//   }

//   /* Ensure the determinant bars are full height */
//   .katex .mord.vcenter {
//     height: 1.5em;
//   }

//   /* Left-align all display math */
//   .katex-display { 
//     text-align: left !important; 
//     margin: 8px 0 !important;
//     padding: 4px 0;
//   }

//   img { 
//     max-width: 100%; 
//     height: auto; 
//     display: block; 
//     margin: 10px auto; 
//   }

//   /* Scrollbar styling for a cleaner look */
//   .card::-webkit-scrollbar {
//     height: 4px;
//   }
//   .card::-webkit-scrollbar-thumb {
//     background: #e5e7eb;
//     border-radius: 10px;
//   }
// </style>
// </head>
// <body>
//   <div id="render-area">${content}</div>

//   <script>
//    function renderMath() {
//   try {
//     if (window.renderMathInElement) {
//       renderMathInElement(document.getElementById('render-area'), {
//         delimiters: [
//           {left: '$$', right: '$$', display: true},
//           {left: '\\\\[', right: '\\\\]', display: true},
//           {left: '\\\\\\(', right: '\\\\\\)', display: false},
//           {left: '\\\\(', right: '\\\\)', display: false},
//           {left: '$', right: '$', display: false}
//         ],
//         throwOnError: false,
//         strict: false, // Prevents errors on non-standard LaTeX
//         macros: {
//           "\\vec": "\\mathbf{#1}",
//           // REMOVED: "\\begin{array}": "\\begin{aligned}" 
//           // Keeping array allows the table borders to work.
//         }
//       });
//     }
//   } catch (e) {
//     console.log('KaTeX rendering error');
//   }
// }

//     // Run when page loads
//     window.onload = function() {
//       renderMath();
//     };

//     // Run again after a short delay
//     setTimeout(renderMath, 300);
//     setTimeout(renderMath, 1000);
//   </script>
// </body>
// </html>
//   `, [content]);

//   return (
//     <WebView
//       originWhitelist={['*']}
//       source={{ html }}
//       style={{ width, height, backgroundColor: '#f9fafb' }}
//       javaScriptEnabled={true}
//       domStorageEnabled={true}
//       scrollEnabled={true}
//       androidLayerType="hardware"
//       overScrollMode="never"
//       nestedScrollEnabled={true}
//       cacheEnabled={true}
//       mixedContentMode="always"
//       showsVerticalScrollIndicator={false}
//       showsHorizontalScrollIndicator={false}
//     />
//   );
// };

// export default MathRenderer;



// / perfect this code 
// import React, { useMemo } from 'react';
// import { useWindowDimensions } from 'react-native';
// import WebView from 'react-native-webview';
// import { Colors } from '../../../../../theme'; // Importing your theme colors

// const MathRenderer = ({ content }: { content: string }) => {
//   const { width, height } = useWindowDimensions();

//   const html = useMemo(() => `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8"/>
//   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes"/>
//   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"/>
//   <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
//   <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>

//   <style>
//     body { 
//       font-size: 16px; 
//       padding: 0; 
//       background: #f9fafb; 
//       color: #000; 
//       font-family: -apple-system, sans-serif;
//       margin: 0;
//     }
//    .card {
//       background: #fff; 
//       padding: 16px;
//       overflow-x: auto;
//       position: relative;
//       margin: 2px 2px; /* Added margin so the shadow isn't cut off */
//       border-radius: 0px;

//       /* ADD THIS FOR THE SHADOW */
//       box-shadow: 0 4px 12px rgba(0, 140, 227, 0.15); 

//       /* Optional: keep your green or blue separator if needed */
//       // border-bottom: 2px solid #22c55e; 
//     }
//     .checkbox:{
//     height:10,
//     boderwidth:1,
//     bordercolor:'green'
//     }
//     /* REMOVE GREEN LINE if the card is scrolling */
//     .card.is-scrolling {
//       border-bottom: 2px solid transparent !important;
//     }

//     /* CUSTOM SCROLLBAR COLOR */
//     .card::-webkit-scrollbar {
//       height: 4px;
//     }
//     .card::-webkit-scrollbar-thumb {
//       background-color: ${Colors.primaryColor}; /* Your Primary Color */
//       border-radius: 10px;
//     }
//     .card::-webkit-scrollbar-track {
//       background: #f1f1f1;
//     }

//     .question { margin-bottom: 12px; font-weight: 500; }
//     .options { margin: 12px 0; }

//     /* Physics Matrix/Table Borders */
//     .katex .array { border-collapse: collapse; }
//     .katex .array td {
//       border: 0.5px solid #000 !important; 
//       padding: 6px 10px !important;
//     }

//     .katex-display { 
//       text-align: left !important; 
//       margin: 12px 0 !important; 
//     }

//     img { max-width: 100%; height: auto; display: block; margin: 10px auto; }
//   </style>
// </head>
// <body>
//   <div id="render-area">${content}</div>

//   <script>
//     function updateLayout() {
//       // 1. Render Math
//       renderMathInElement(document.getElementById('render-area'), {
//         delimiters: [
//           {left: '$$', right: '$$', display: true},
//           {left: '\\\\[', right: '\\\\]', display: true},
//           {left: '\\\\\\(', right: '\\\\\\)', display: false},
//           {left: '\\\\(', right: '\\\\)', display: false},
//           {left: '$', right: '$', display: false}
//         ],
//         throwOnError: false
//       });

//       // 2. Logic: Hide green line if content overflows (scroll bar appears)
//       const cards = document.querySelectorAll('.card');
//       cards.forEach(card => {
//         if (card.scrollWidth > card.clientWidth) {
//           card.classList.add('is-scrolling');
//         } else {
//           card.classList.remove('is-scrolling');
//         }
//       });
//     }

//     window.onload = updateLayout;
//     // Check again after a delay to ensure KaTeX finished resizing everything
//     setTimeout(updateLayout, 500); 
//   </script>
// </body>
// </html>
//   `, [content]);

//   return (
//     <WebView
//       originWhitelist={['*']}
//       source={{ html }}
//       style={{ width, height, backgroundColor: '#f9fafb' }}
//       javaScriptEnabled={true}
//       domStorageEnabled={true}
//       androidLayerType="hardware"
//       showsHorizontalScrollIndicator={true}
//     />
//   );
// };

// export default MathRenderer;
// import React, { forwardRef, useMemo } from 'react';
// import { useWindowDimensions } from 'react-native';
// import WebView from 'react-native-webview';
// import { Colors } from '../../../../../theme'; // Importing your theme colors

// const MathRenderer = forwardRef({ content ,onToggleSelection}:  any, ref: any) => {
//   const { width, height } = useWindowDimensions();
//   const html = useMemo(() => `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8"/>
//   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes"/>
//   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"/>
//   <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
//   <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>

//   <style>
//     body { 
//       font-size: 16px; 
//       padding: 0; 
//       background: #f9fafb; 
//       color: #000; 
//       font-family: -apple-system, sans-serif;
//       margin: 0;
//     }
//    .card {
//       background: #fff; 
//       padding: 16px;
//       overflow-x: auto;
//             display: flex; 
//                   flex-direction: row;

//       position: relative;
//       margin: 4px 2px;
//         box-shadow: 0 4px 12px rgba(0, 140, 227, 0.15);
//       transition: background-color 0.2s;
//       /* ADD THIS FOR THE SHADOW */
//       box-shadow: 0 4px 12px rgba(0, 140, 227, 0.15); 

//       /* Optional: keep your green or blue separator if needed */
//       // border-bottom: 2px solid #22c55e; 
//     }
//       /* Selection Highlight */
//     .card.selected { background-color: #e3f2fd !important; }

//     .checkbox-container {
//       margin-right: 12px;
//       display: flex;
//       align-items: flex-start;
//       padding-top: 4px;
//     }

//     .custom-checkbox {
//       width: 20px;
//       height: 20px;
//       border: 2px solid #cbd5e1;
//       border-radius: 4px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       background: white;
//     }


//         .selected .custom-checkbox {
//           background-color: ${Colors.primaryColor};
//           border-color: ${Colors.primaryColor};
//         }

//         .selected .custom-checkbox::after {
//           content: '✓';
//           color: white;
//           font-size: 14px;
//         }

//         .content-container { flex: 1; overflow-x: auto; }

//     .checkbox:{
//     height:10,
//     boderwidth:1,
//     bordercolor:'green'
//     }
//     /* REMOVE GREEN LINE if the card is scrolling */
//     .card.is-scrolling {
//       border-bottom: 2px solid transparent !important;
//     }

//     /* CUSTOM SCROLLBAR COLOR */
//     .card::-webkit-scrollbar {
//       height: 4px;
//     }
//     .card::-webkit-scrollbar-thumb {
//       background-color: ${Colors.primaryColor}; /* Your Primary Color */
//       border-radius: 10px;
//     }
//     .card::-webkit-scrollbar-track {
//       background: #f1f1f1;
//     }

//     .question { margin-bottom: 12px; font-weight: 500; }
//     .options { margin: 12px 0; }

//     /* Physics Matrix/Table Borders */
//     .katex .array { border-collapse: collapse; }
//     .katex .array td {
//       border: 0.5px solid #000 !important; 
//       padding: 6px 10px !important;
//     }

//     .katex-display { 
//       text-align: left !important; 
//       margin: 12px 0 !important; 
//     }

//     img { max-width: 100%; height: auto; display: block; margin: 10px auto; }
//   </style>
// </head>
// <body>
//   <div id="render-area">${content}</div>

//   <script>
//     function updateLayout() {
//       // 1. Render Math
//       renderMathInElement(document.getElementById('render-area'), {
//         delimiters: [
//           {left: '$$', right: '$$', display: true},
//           {left: '\\\\[', right: '\\\\]', display: true},
//           {left: '\\\\\\(', right: '\\\\\\)', display: false},
//           {left: '\\\\(', right: '\\\\)', display: false},
//           {left: '$', right: '$', display: false}
//         ],
//         throwOnError: false
//       });

//       // 2. Logic: Hide green line if content overflows (scroll bar appears)
//       const cards = document.querySelectorAll('.card');
//       cards.forEach(card => {
//         if (card.scrollWidth > card.clientWidth) {
//           card.classList.add('is-scrolling');
//         } else {
//           card.classList.remove('is-scrolling');
//         }
//       });
//     }

//     window.onload = updateLayout;
//     // Check again after a delay to ensure KaTeX finished resizing everything
//     setTimeout(updateLayout, 500); 
//   </script>
// </body>
// </html>
//   `, [content]);

//   return (
//     <WebView
//           ref={ref}
//       originWhitelist={['*']}
//       source={{ html }}
//       style={{ width, height, backgroundColor: '#f9fafb' }}
//             onMessage={(event) => onToggleSelection(event.nativeEvent.data)}
//       javaScriptEnabled={true}
//       domStorageEnabled={true}
//       androidLayerType="hardware"
//       showsHorizontalScrollIndicator={true}
//     />
//   );
// };

// export default MathRenderer;

import React, { forwardRef, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, useWindowDimensions, View } from 'react-native';
import WebView from 'react-native-webview';
import { Colors, Fonts } from '../../../theme';
import { moderateScale } from '../../../utils/responsiveSize';
import IconIonicons from 'react-native-vector-icons/Ionicons';

// Fixed the Ref signature and types
interface MathRendererProps {
  content: string;
  onToggleSelection: (id: string, questionNum: number) => void;
  onInfoPress?: () => void;
  webViewRef: any;
  isLoading: boolean;
  onEndReached: () => void;
  onScrollDirection?: (direction: "up" | "down") => void;

  answerStatus?: 'correct' | 'incorrect' | 'unanswered';
}

const MathRenderer = forwardRef<WebView, MathRendererProps>((props, ref) => {
  const { content, onToggleSelection, isLoading, webViewRef, onEndReached, onScrollDirection, answerStatus } = props;
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
      background-color: #fff !important;; 
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

      .checkbox-container {
        margin-right: 4px; display: flex; align-items: center; padding-top: 4px;
     flex-direction: column;
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
  background-color:#6c798e
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


/* Inside MathRenderer's <style> block */

.card {
  display: flex;
  flex-direction: row;
  align-items: flex-start; /* Ensures top alignment */
  padding: 12px;
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 10px;
}

.checkbox-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 12px;
  min-width: 30px;
}

.status-icon-badge {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6px;
  color: white;
  font-size: 11px;
  font-weight: bold;
}

.correct-bg { background-color: #4CAF50 !important; }
.incorrect-bg { background-color: #F44336 !important; }

.questionnptext {
  font-size: 15px;
  color: #000;
}

.qs-text {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
}

/*above*/
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
    <View style={{ flex: 1 }}>
      <WebView
        ref={ref}
        originWhitelist={['*']}
        source={{ html }}
        style={{ flex: 1, backgroundColor: Colors.white }}
        // onMessage={(event) => onToggleSelection(event.nativeEvent.data)}
        //     onMessage={(event) => {
        //   const data = event.nativeEvent.data;

        //   // Check if it's the toggle message or the picker message
        //   if (data.startsWith('toggle_')) {
        //     const id = data.replace('toggle_', '');
        //     props.onToggleSelection(id);
        //   } else if (data === 'openMediaPicker') {
        //     // Create a new prop called 'onInfoPress' in MathRenderer
        //     if (props.onInfoPress) {
        //       props.onInfoPress();
        //     }
        //   }
        // }}

        // onMessage={(event) => {
        //   const data = event.nativeEvent.data;
        //   if (data.startsWith('toggle_')) {
        //     const id = data.replace('toggle_', '');
        //     props.onToggleSelection(id); // This will now work!
        //   } else if (data === 'openMediaPicker') {
        //     props.onInfoPress?.();
        //   }
        // }}
        /// this is current 
        // onMessage={(event) => {
        //   try {

        //     if (event.nativeEvent.data === "END_REACHED") {
        //       if (onEndReached && !isLoading) {
        //         onEndReached();
        //       }
        //     }

        //     const data = JSON.parse(event.nativeEvent.data);
        //     if (data === "END_REACHED") {
        //       props.onEndReached?.();
        //       return;
        //     }

        //     if (data === "SCROLL_DOWN") {
        //       props.onScrollDirection?.("down");
        //       return;
        //     }

        //     if (data === "SCROLL_UP") {
        //       props.onScrollDirection?.("up");
        //       return;
        //     }
        //     if (data.type === 'toggle') {
        //       props.onToggleSelection(data.id, data.questionNum);
        //       return;
        //     }
        //   } catch (e) {
        //     // Not JSON → handle old messages
        //     const raw = event.nativeEvent.data;

        //     if (raw === 'openMediaPicker') {
        //       props.onInfoPress?.();
        //     }
        //   }
        // }}

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
        // onMessage={(event) => {
        //   const message = event.nativeEvent.data;

        //   // Handle END_REACHED first
        //   if (message === "END_REACHED") {
        //     if (onEndReached && !isLoading) {
        //       onEndReached();
        //     }
        //     return;
        //   }

        //   // Try parsing JSON
        //   try {
        //     const data = JSON.parse(message);

        //     if (data.type === 'toggle') {
        //       props.onToggleSelection(data.id, data.questionNum);
        //     }
        //   } catch (e) {
        //     if (message === 'openMediaPicker') {
        //       props.onInfoPress?.();
        //     }
        //   }
        // }}
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

export default MathRenderer;

const styles = StyleSheet.create({
  statusIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(2),
  },
  correctIcon: {
    backgroundColor: '#4CAF50',
  },
  incorrectIcon: {
    backgroundColor: '#F44336',
  },
})
//  function toggleCard(id) {
//       window.ReactNativeWebView.postMessage(id);
//     }

//  window.onload = updateLayout;
//     setTimeout(updateLayout, 500);

/* <script>
    // Essential for the "No Jump" selection
    window.updateCardUI = function(id, isSelected) {
      const el = document.getElementById('card-' + id);
      if (el) {
        if (isSelected) el.classList.add('selected');
        else el.classList.remove('selected');
      }
    };



    // Updated to match your new onMessage logic
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
      /* scroll end api call */
//   window.onscroll = function () {
//     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
//       window.ReactNativeWebView.postMessage("END_REACHED");
//     }
//   };
//   /* scroll end api call */
//   window.onload = updateLayout;
//   setTimeout(updateLayout, 500);
//   </script > */
// }