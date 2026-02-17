    import { createNativeStackNavigator } from '@react-navigation/native-stack';

    // import HomeDetails from '../../screens/home/HomeDetails';
    import HomeScreen from '../../screen/home/HomeScreen';
    import PaperTypeScreen from '../../screen/papermodule/papertype/PaperTypeScreen';
    import PaperSelect from '../../screen/papermodule/paperselect/PaperSelect';
    import QuestionScreen from '../../screen/papermodule/questionModule/QuestionScreen';
    import DraftPaperScreen from '../../screen/papermodule/draftpaper/DraftPaperScreen';
    import ChemistryData from '../../screen/papermodule/ChemistryData';
    import MyPdfScreen from '../../screen/mypdf/mypdf/MyPdfScreen';
    import NotificationScreen from '../../screen/notification/NotificationScreen';
    import PaperListScreen from '../../screen/studentModule/QuestionListScreen';
    import QuestionListScreen from '../../screen/studentModule/QuestionListScreen';
    import BookMarkScreen from '../../screen/studentModule/bookmark/BookMarkScreen';
import OpenQuestionScreen from '../../screen/studentModule/openquestion/OpenQuestionScreen';
import ScoreCardScreen from '../../screen/scrollcard/ScoreCardScreen';
    // import PdfPreviewScreen from '../../screen/mypdf/PDFPreviewScreen';
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
                {/* <Stack.Screen name="MyPdfScreen" component={MyPdfScreen} /> */}
                {/* <Stack.Screen name="PdfPreviewScreen" component={PdfPreviewScreen} /> */}
                {/* <Stack.Screen
                    name="PDFViewerScreen"
                    component={PDFViewerScreen}
                    options={{ title: 'PDF Viewer' }}
                />             */}
                <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
                <Stack.Screen name="ScoreCardScreen" component={ScoreCardScreen} />
                <Stack.Screen name="QuestionListScreen" component={QuestionListScreen} />
                <Stack.Screen name="OpenQuestionScreen" component={OpenQuestionScreen} />
                <Stack.Screen name="BookMarkScreen" component={BookMarkScreen} />
                {/* <Stack.Screen name="HomeDetails" component={HomeDetails} /> */}
            </Stack.Navigator>
        );
    }

    export default HomeStack