import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/navigation/stacks/RootStack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { toastConfig } from "./src/utils/toastConfig";
const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer> 
            <RootStack/>
            <Toast config={toastConfig}/> 
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;