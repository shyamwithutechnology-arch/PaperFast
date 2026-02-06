import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import HomeDetails from '../../screens/home/HomeDetails';
import HomeScreen from '../../screen/home/HomeScreen';
import PaperTypeScreen from '../../screen/papermodule/papertype/PaperTypeScreen';
import PaperSelect from '../../screen/papermodule/paperselect/PaperSelect';
import QuestionScreen from '../../screen/papermodule/questionModule/QuestionScreen';
import PDFDetailsScreen from '../../screen/mypdf/pdfdetails/PDFDetailsScreen';
import MyPdfScreen from '../../screen/mypdf/mypdf/MyPdfScreen';

const Stack = createNativeStackNavigator();

const PdfStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MyPdfScreen" component={MyPdfScreen} />
            <Stack.Screen name="PDFDetailsScreen" component={PDFDetailsScreen} />
            {/* <Stack.Screen name="PaperTypeScreen" component={PaperTypeScreen} />
            <Stack.Screen name="PaperSelect" component={PaperSelect} />
            <Stack.Screen name="QuestionScreen" component={QuestionScreen} /> */}
        </Stack.Navigator>
    );
}

export default PdfStack