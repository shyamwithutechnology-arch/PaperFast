// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SplashScreen from '../../screen/auth/splash/SplashScreen';
// import AuthStack from '../AuthStack';
// import AppDrawer from '../AppDrawer';
// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';


// const Stack = createNativeStackNavigator();

// const RootStack = () => {
//     // const isLoggedIn = false; // redux / context / asyncStorage

//   const [isLoading, setIsLoading] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // 🔑 change later via token
// const isloggedInStatus = useSelector(state => state.auth)
// console.log('isloggedInStatus', isloggedInStatus);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       // 🔹 simulate login check
//       // later: AsyncStorage / SecureStore / API
//       setIsLoggedIn(false); // true = AppNavigator
//       setIsLoading(false);
//     }, 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (isLoading) {
//     return <SplashScreen />;
//   }

//     return (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//             {!isLoggedIn ? (
//                 <Stack.Screen name="AuthStack" component={AuthStack} />
//             ) : (
//                 <Stack.Screen name="AppDrawer" component={AppDrawer} />
//             )}
//         </Stack.Navigator>
//     );
// }

// export default RootStack


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import SplashScreen from '../../screen/auth/splash/SplashScreen';
import AuthStack from '../AuthStack';
import AppDrawer from '../AppDrawer';

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
    </Stack.Navigator>
  );
};

export default RootStack;

// src/navigation/stacks/RootStack.tsx
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import SplashScreen from '../../screen/auth/splash/SplashScreen';
// import AuthStack from '../AuthStack';
// import AppDrawer from '../AppDrawer';
// import { reduxStorage } from '../../storage';

// const Stack = createNativeStackNavigator();

// const RootStack = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAppReady, setIsAppReady] = useState(false);

//   // Get auth state - using shallow comparison
//   // const isLogin = useSelector((state: any) => state.auth.isLogin);

//   useEffect(() => {
//     // Minimal splash screen time
//     const splashTimer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);

//     // Wait for redux-persist to rehydrate
//     const rehydrateTimer = setTimeout(() => {
//       setIsAppReady(true);
//     }, 100);

//     return () => {
//       clearTimeout(splashTimer);
//       clearTimeout(rehydrateTimer);
//     };
//   }, []);

//   // Still showing splash or waiting for rehydration
//   if (isLoading || !isAppReady) {
//     return <SplashScreen />;
//   }

//   const getToken = reduxStorage.getItem('token')
//   // Render the correct stack based on auth state
//   return (
//     <Stack.Navigator 
//       screenOptions={{ 
//         headerShown: false,
//         animation: 'none' // Prevent animation-related re-renders
//       }}
//     >
//       {getToken ? (
//         <Stack.Screen 
//           name="AppDrawer" 
//           component={AppDrawer}
//           options={{ gestureEnabled: false }}
//         />
//       ) : (
//         <Stack.Screen 
//           name="AuthStack" 
//           component={AuthStack}
//           options={{ gestureEnabled: false }}
//         />
//       )}
//     </Stack.Navigator>
//   );
// };

// export default React.memo(RootStack);

// import React, { useEffect, useState } from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SplashScreen from '../../screen/auth/splash/SplashScreen';
// import AuthStack from '../AuthStack';
// import AppDrawer from '../AppDrawer';

// const Stack = createNativeStackNavigator();

// const RootStack = () => {
//   const [loading, setLoading] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = getToken(); // ✅ SYNC
//     setIsLoggedIn(!!token);

//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1500);

//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return <SplashScreen />;
//   }

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {isLoggedIn ? (
//         <Stack.Screen name="AppDrawer" component={AppDrawer} />
//       ) : (
//         <Stack.Screen name="AuthStack" component={AuthStack} />
//       )}
//     </Stack.Navigator>
//   );
// };

// export default RootStack;
