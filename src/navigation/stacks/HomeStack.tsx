import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import HomeDetails from '../../screens/home/HomeDetails';
import HomeScreen from '../../screen/home/HomeScreen';
import PaperTypeScreen from '../../screen/papermodule/papertype/PaperTypeScreen';
import PaperSelect from '../../screen/papermodule/paperselect/PaperSelect';
import QuestionScreen from '../../screen/papermodule/questionModule/QuestionScreen';
import DraftPaperScreen from '../../screen/papermodule/draftpaper/DraftPaperScreen';
import ChemistryData from '../../screen/papermodule/ChemistryData';
import MyPdfScreen from '../../screen/mypdf/MyPdfScreen';
import NotificationScreen from '../../screen/notification/NotificationScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="PaperTypeScreen" component={PaperTypeScreen} />
            <Stack.Screen name="PaperSelect" component={PaperSelect} />
            <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
            <Stack.Screen name="DraftPaperScreen" component={DraftPaperScreen} />
            <Stack.Screen name="ChemistryData" component={ChemistryData} />
            <Stack.Screen name="MyPdfScreen" component={MyPdfScreen} />
            <Stack.Screen name="NotificationScreen" component={NotificationScreen} />

            {/* <Stack.Screen name="HomeDetails" component={HomeDetails} /> */}
        </Stack.Navigator>
    );
}

export default HomeStack