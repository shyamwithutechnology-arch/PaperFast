import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "./src/screen/auth/login/LoginScreen";
import OtpRequestScreen from "./src/screen/auth/otp/OtpRequestScreen";
import LoginScreenRole from "./src/screen/auth/loginRole/LoginScreenRole";
import SplashScreen from "./src/screen/auth/splash/SplashScreen";
import RootNavigator from "./src/navigation/RootNavigator";
import PaperTypeScreen from "./src/screen/papermodule/papertype/PaperTypeScreen";
import PaperSelect from "./src/screen/papermodule/paperselect/PaperSelect";

const App = () => {
  return (
    <SafeAreaProvider style={styles.mainBox}>
     {/* <RootNavigator/> */}
     <PaperSelect/>
    </SafeAreaProvider>)
}

export default App
const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    backgroundColor: "white",
  }
})

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import { NewAppScreen } from '@react-native/new-app-screen';
// import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
// import {
//   SafeAreaProvider,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <SafeAreaProvider>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <AppContent />
//     </SafeAreaProvider>
//   );
// }

// function AppContent() {
//   const safeAreaInsets = useSafeAreaInsets();

//   return (
//     <View style={styles.container}>
//       <NewAppScreen
//         templateFileName="App.tsx"
//         safeAreaInsets={safeAreaInsets}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;
