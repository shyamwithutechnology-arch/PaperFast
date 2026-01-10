import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screen/auth/login/LoginScreen';
import OtpRequestScreen from '../screen/auth/otp/OtpRequestScreen';
import SplashScreen from '../screen/auth/splash/SplashScreen';
import LoginScreenRole from '../screen/auth/loginRole/LoginScreenRole';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="OtpRequestScreen" component={OtpRequestScreen} />
            <Stack.Screen name="LoginScreenRole" component={LoginScreenRole} />
        </Stack.Navigator>
    )
}

export default AuthStack