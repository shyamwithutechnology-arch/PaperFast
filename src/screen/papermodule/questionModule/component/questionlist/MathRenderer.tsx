import React, { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import WebView from 'react-native-webview';

const MathRenderer = ({ content }: { content: string }) => {
    const { width, height } = useWindowDimensions();

//     const html = useMemo(() => `
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <meta charset="utf-8"/>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>

//         <link rel="stylesheet"
//           href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"/>

//         <script defer
//           src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js">
//         </script>

//         <script defer
//           src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js">
//         </script>

//         <style>
//           body {
//             font-size: 16px;
//             margin: 0;
//             padding: 12px;
//             color: #000;
//             background: #f9fafb;
//             line-height: 1.6;
//           }

//           .card {
//             margin-bottom: 20px;
//             padding: 10px;
//             background: #fff;
//             border-radius: 6px;
//           }

//           .solution {
//             margin-top: 12px;
//             padding: 10px;
//             background: #eef6ff;
//             border-radius: 6px;
//           }
//         </style>
//        <script>
//         document.addEventListener("DOMContentLoaded", function () {
//        try {
//        renderMathInElement(document.body,{
//       delimiters: [
//         {left: '\\\\(', right: '\\\\)', display: false},
//         {left: '\\\\[', right: '\\\\]', display: true}
//       ],
//       throwOnError: false,
//       strict: false
//     });
//   } catch(e) {
//     console.log("KaTeX error ignored");
//   }
// });
// </script>
//       </head>

//       <body>
//         ${content}
//       </body>
//     </html>
//   `, [content]);
// const html = useMemo(() => `
// <!DOCTYPE html>
// <html>
//   <head>
//     <meta charset="utf-8"/>
//     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
//     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"/>
//     <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
//     <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>

//     <style>
//   body {
//     font-size: 16px;
//     padding: 12px;
//     background: #f9fafb;
//     line-height: 1.5;
//   }
//   /* This ensures the array environment takes up full width like the screenshot */
//   .katex-display {
//     margin: 1em 0;
//     overflow-x: auto;
//     overflow-y: hidden;
//     text-align: left; /* Align left to match your card style */
//   }
//   .card {
//     background: #fff;
//     padding: 15px;
//     border-radius: 8px;
//     margin-bottom: 15px;
//   }
// </style>
//   </head>
//   <body>
//     ${content}
//     <script>
//   function render() {
//     renderMathInElement(document.body, {
//       delimiters: [
//         {left: '$$', right: '$$', display: true},
//         {left: '\\\\(', right: '\\\\)', display: false},
//         {left: '\\\\[', right: '\\\\]', display: true},
//         {left: '$', right: '$', display: false}
//       ],
//       throwOnError: false,
//       trust: true, // Crucial for complex array layouts
//       strict: false
//     });
//   }
//   window.onload = render;
// </script>
//     <script>
//       function renderMath() {
//         renderMathInElement(document.body, {
//           delimiters: [
//             {left: "$$", right: "$$", display: true},
//             {left: "\\\\(", right: "\\\\)", display: false},
//             {left: "\\\\[", right: "\\\\]", display: true},
//             {left: "$", right: "$", display: false}
//           ],
//           throwOnError: false,
//           trust: true,
//           strict: false
//         });
//       }
//       // Run once immediately
//       window.onload = renderMath;
//       // Backup run for dynamic content
//       document.addEventListener("DOMContentLoaded", renderMath);
//     </script>
//   </body>
// </html>
// `, [content]);
const html = useMemo(() => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"/>
    <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>

    <style>
      body { 
        font-size: 16px; 
        padding: 12px; 
        background: #f9fafb; 
        line-height: 1.6; 
        color: #000; 
        font-family: -apple-system, sans-serif;
      }
      .card { background: #fff; padding: 15px; border-radius: 8px; margin-bottom: 15px; }
      img { max-width: 100%; height: auto; display: block; margin: 15px 0; }
      .katex-display { text-align: left; margin: 10px 0; overflow-x: auto; }
      .katex-error { color: inherit !important; background: transparent !important; }
    </style>
  </head>
  <body>
    <div id="render-area">${content}</div>
    <script>
      function runMath() {
        renderMathInElement(document.getElementById('render-area'), {
          delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "\\\\[", right: "\\\\]", display: true},
            {left: "\\\\(", right: "\\\\)", display: false},
            {left: "$", right: "$", display: false}
          ],
          throwOnError: false,
          trust: true
        });
      }
      window.onload = runMath;
      // Re-run in case of late image loads
      setTimeout(runMath, 200);
    </script>
  </body>
</html>
`, [content]);
    return (
        <WebView
            originWhitelist={['*']}
            source={{ html }}
            style={{ width, height }}
            javaScriptEnabled
            scrollEnabled={true}
            androidLayerType="hardware"
            overScrollMode="never"
            nestedScrollEnabled
            cacheEnabled
        />
    );
};

export default MathRenderer;



// {/* <script>
//           document.addEventListener("DOMContentLoaded", function () {
//             renderMathInElement(document.body,{
//               delimiters: [
//                 {left: '\\\\(', right: '\\\\)', display: false},
//                 {left: '\\\\[', right: '\\\\]', display: true}
//               ],
//               throwOnError: false
//             });
//           });
//         </script> */}




    // <style>
    //   body { font-size: 16px; margin: 0; padding: 12px; color: #000; background: #f9fafb; line-height: 1.6; }
    //   .card { margin-bottom: 20px; padding: 10px; background: #fff; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    //   .option { margin: 4px 0; }
    //   .solution { margin-top: 12px; padding: 10px; background: #eef6ff; border-radius: 6px; }
    //   /* Prevent horizontal overflow of large equations */
    //   .katex-display { overflow-x: auto; overflow-y: hidden; }
    // </style>