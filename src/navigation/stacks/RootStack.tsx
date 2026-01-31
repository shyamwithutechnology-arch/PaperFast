import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import SplashScreen from '../../screen/auth/splash/SplashScreen';
import AuthStack from '../AuthStack';
import AppDrawer from '../AppDrawer';
import PrivacyPolicyScreen from '../../screen/privacy/PrivacyPolicyScreen';
import TermandconditionScreen from '../../screen/termandcondition/TermandconditionScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Redux auth state
  const { isLogin } = useSelector((state: any) => state.auth);
  console.log('isLogin', isLogin)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // splash end
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // ✅ Splash screen
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLogin ? (
        <Stack.Screen name="AppDrawer" component={AppDrawer} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}

      <Stack.Screen name='PrivacyPolicyScreen' component={PrivacyPolicyScreen}/>
      <Stack.Screen name='TermandconditionScreen' component={TermandconditionScreen}/>
    </Stack.Navigator>
  );
};

export default RootStack;