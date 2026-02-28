export const Colors = {
    white: '#FFFFFF',
    black: '#000000',
    blackSecond:'#262626',
    blackGray :'#f0eded',
    blackThird:'#4A4A4A',
    primaryColor: '#124682',
    primary70: '#1668E3',
    secondaryColor: '#0BC7D3',
    Headings: '#000000',
    ParagraphAndShortTexts: '#888888',
    BluePrimaryColor: '#124682',
    InputText: '#606060',
    InputStroke: '#BEBEBE',
    backgroundCOlor: '#3F6B9B',
    frameBgColor: "#3F6B9B",
    red: 'red',
    green: 'green',
    warnig: '#ff5f15',
    yellow: 'yellow',
    homeCardBgColor: 'rgba(12, 64, 111, 0.05)',
    homeCardBoxStoke: 'rgba(12, 64, 111, 0.19)',
    homeNotificationInnerBgColor:'#F3F5F8',
    gray:'rgba(1, 54, 105, 0.13)',
    lightThemeBlue:'#E3F2FF',
    questionSelect:'#08AA26'
}




//           <div class="options">
//             <div class="option-inner">
//             <div class="option-text-container">
//             <strong class="option-number-test" >A</strong></div> 
//   <span class="qs-option-text">
//   ${cleanLatex(item.option_a)}
// </span>
//             </div>
//             <div class="option-inner">
//             <div class="option-text-container">
//             <strong class="option-number-test">B</strong></div> 
//            <span class="qs-option-text">
//   ${cleanLatex(item.option_b)}
// </span>
//             </div>
//             <div class="option-inner">
//             <div class="option-text-container"  ${selectCheck === 'Solutions' ? `style="background-color:${getOptionBg('C', item.correct_option)}"` : ''}>
//             <strong class="option-number-test" ${selectCheck === 'Solutions' ? `style="color: ${item?.correct_option === 'C' ? Colors.white : Colors.black}"` : '' }>C</strong></div> 
//           <span class="qs-option-text">
//   ${cleanLatex(item.option_c)}
// </span></div>
//             <div class="option-inner">
//             <div class="option-text-container">
//             <strong class="option-number-test">D</strong></div> 
//             <span class="qs-option-text">
//   ${cleanLatex(item.option_d)}
// </span></div>
           
//           </div>

//           <span class="lebal-test">Lebel:</span>
// <strong style="color:${labelColorStatus(item?.dlevel_name)};font-size:${moderateScale(13)}px; font-family:'Inter'">
//   ${item?.dlevel_name}
// </strong>
//       ${selectCheck === 'Solutions' ? `
//     <div class="solution">
//     <div class="solution-header"> 
//      <span class="solution-label">Solution:</span>
// </div>
//    <div class="solution-content">
//     ${item.explanation
//             ? cleanLatex(item.explanation)
//             : `<span class="solution-label">Solution:</span> No explanation available.`
//           }
//   </div>
