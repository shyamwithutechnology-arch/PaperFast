import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import HomeDetails from '../../screens/home/HomeDetails';
import HomeScreen from '../../screen/home/HomeScreen';
import PaperTypeScreen from '../../screen/papermodule/papertype/PaperTypeScreen';
import PaperSelect from '../../screen/papermodule/paperselect/PaperSelect';
import QuestionScreen from '../../screen/papermodule/questionModule/QuestionScreen';
import DraftPaperScreen from '../../screen/papermodule/draftpaper/DraftPaperScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="PaperTypeScreen" component={PaperTypeScreen} />
            <Stack.Screen name="PaperSelect" component={PaperSelect} />
            <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
            <Stack.Screen name="DraftPaperScreen" component={DraftPaperScreen} />

            {/* <Stack.Screen name="HomeDetails" component={HomeDetails} /> */}
        </Stack.Navigator>
    );
}

export default HomeStack