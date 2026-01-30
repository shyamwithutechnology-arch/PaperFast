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


import React, { useState } from "react";
import { View, StatusBar, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Fonts } from "../../../theme";
import CustomPaperCard from "../component/CustomPaperCard/CustomPaperCard";
import HeaderPaperModule from "../../../component/headerpapermodule/Headerpapermodule";
import { styles } from "./styles";
import { Icons } from "../../../assets/icons";
import { moderateScale } from "../../../utils/responsiveSize";
import { useNavigation } from "@react-navigation/native";
import Loader from "../../../component/loader/Loader";

const PaperTypeScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation()
  const handleSelectPaperType = (payload) => {
    navigation.navigate('PaperSelect', { 'paperType': payload })
  }
  const handleBack = () => {
    navigation.navigate('HomeScreen')
  }
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>

      {/* STATUS BAR */}
      <StatusBar
        // translucent
        backgroundColor={Colors.lightThemeBlue}
        barStyle="dark-content"
      />

      {/* HEADER + STATUS BAR SHARE SAME BACKGROUND */}
      <View style={{ backgroundColor: Colors.lightThemeBlue }}>
        <SafeAreaView edges={["top"]}>
          <HeaderPaperModule title='Create Exam Paper - Maths' leftIconPress={handleBack} />
        </SafeAreaView>
      </View>

      {/* SCREEN CONTENT */}
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
        <Loader visible={loading} />
        <CustomPaperCard onPress={handleSelectPaperType} />
        <View style={styles.mainMaskView}>
          <Image source={Icons.MaskGroup} style={styles.maskGroupImag} />

          <View style={{}}>
            <View style={[styles.supportBox, { marginHorizontal: moderateScale(0) }]}>
              <View style={styles.scrachLine} />
              <View style={[styles.supportBox, { flexDirection: 'column', alignItems: 'flex-start' }]}>
                <Text style={styles.supportText}>Support</Text>
                <View style={styles.numberTextBox}>
                  <Image source={Icons.plus} style={styles.plusImg} />
                  <Text style={styles.supportNumberText}>91 8709952350</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>

    </View>
  );
};

export default PaperTypeScreen;
