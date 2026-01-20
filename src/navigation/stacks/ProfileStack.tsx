import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import HomeDetails from '../../screens/home/HomeDetails';
import HomeScreen from '../../screen/home/HomeScreen';
import ProfileScreen from '../../screen/profile/ProfileScreen';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            {/* <Stack.Screen name="HomeDetails" component={HomeDetails} /> */}
        </Stack.Navigator>
    );
}

export default ProfileStack