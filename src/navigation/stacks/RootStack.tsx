import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../../screen/auth/splash/SplashScreen';
import AuthStack from '../AuthStack';
import AppDrawer from '../AppDrawer';
import { useEffect, useState } from 'react';


const Stack = createNativeStackNavigator();

const RootStack = () => {
    // const isLoggedIn = false; // redux / context / asyncStorage

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 🔑 change later via token

  useEffect(() => {
    const timer = setTimeout(() => {
      // 🔹 simulate login check
      // later: AsyncStorage / SecureStore / API
      setIsLoggedIn(true); // true = AppNavigator
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isLoggedIn ? (
                <Stack.Screen name="AuthStack" component={AuthStack} />
            ) : (
                <Stack.Screen name="AppDrawer" component={AppDrawer} />
            )}
        </Stack.Navigator>
    );
}

export default RootStack

