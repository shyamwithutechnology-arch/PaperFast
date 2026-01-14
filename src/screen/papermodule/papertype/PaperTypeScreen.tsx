// // import React from "react";
// // import { View, Text, Image, StatusBar } from "react-native";
// // import { SafeAreaView } from "react-native-safe-area-context";
// // import { Colors } from "../../../theme";
// // import CustomPaperCard from "../component/CustomPaperCard/CustomPaperCard";
// // import HeaderPaperModule from "../../../component/headerpapermodule/Headerpapermodule";

// // const PaperTypeScreen = () => {
// //     return (
// //         <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
// //             <StatusBar barStyle={'light-content'} backgroundColor={Colors.primaryColor}/>
// //             <HeaderPaperModule/>
// //             <CustomPaperCard />
// //         </SafeAreaView>
// //     )
// // }
// // export default PaperTypeScreen


// import React from "react";
// import { View, StatusBar, Platform } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Colors } from "../../../theme";
// import CustomPaperCard from "../component/CustomPaperCard/CustomPaperCard";
// import HeaderPaperModule from "../../../component/headerpapermodule/Headerpapermodule";

// const PaperTypeScreen = () => {
//   return (
//     <View style={{ flex: 1, backgroundColor: Colors.white }}>
//       {/* STATUS BAR */}
//       <StatusBar
//         translucent
//         backgroundColor={Colors.lightThemeBlue}
//         barStyle="dark-content"
//       />

//       {/* HEADER BACKGROUND FOR STATUS BAR */}
//       {/* <View
//         style={{
//           height: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//           backgroundColor: Colors.primaryColor,
//         }}
//       /> */}

//     <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
//         <HeaderPaperModule />
//         <CustomPaperCard />
//       </SafeAreaView>
//     </View>
//   );
// };

// export default PaperTypeScreen;


import React from "react";
import { View, StatusBar, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Fonts } from "../../../theme";
import CustomPaperCard from "../component/CustomPaperCard/CustomPaperCard";
import HeaderPaperModule from "../../../component/headerpapermodule/Headerpapermodule";
import { styles } from "./styles";
import { Icons } from "../../../assets/icons";
import { moderateScale } from "../../../utlis/responsiveSize";

const PaperTypeScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>

      {/* STATUS BAR */}
      <StatusBar
        translucent
        backgroundColor={Colors.lightThemeBlue}
        barStyle="dark-content"
      />

      {/* HEADER + STATUS BAR SHARE SAME BACKGROUND */}
      <View style={{ backgroundColor: Colors.primaryColor }}>
        <SafeAreaView edges={["top"]}>
          <HeaderPaperModule  title='Create Exam Paper - Maths'/>
        </SafeAreaView>
      </View>

      {/* SCREEN CONTENT */}
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
        <CustomPaperCard />

        <View style={styles.draftBox}>
          <Text style={styles.draftText}>Draft  Paper</Text>

          <View style={{ alignSelf: 'center', marginTop:moderateScale(30)}}>
            <Image source={Icons.paperFile} resizeMode="contain" style={{ height: moderateScale(30), width: moderateScale(30) , alignSelf:"center"}} />
            <Text style={{ fontSize: moderateScale(13), fontFamily: Fonts.InstrumentSansRegular, color: Colors.ParagraphAndShortTexts, marginTop:moderateScale(10) }}>No Draft Paper Avaliable</Text>
          </View>
        </View>
      </SafeAreaView>

    </View>
  );
};

export default PaperTypeScreen;
