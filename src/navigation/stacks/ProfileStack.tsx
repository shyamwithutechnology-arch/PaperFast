import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import HomeDetails from '../../screens/home/HomeDetails';
import HomeScreen from '../../screen/home/HomeScreen';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            {/* <Stack.Screen name="HomeDetails" component={HomeDetails} /> */}
        </Stack.Navigator>
    );
}

export default ProfileStack