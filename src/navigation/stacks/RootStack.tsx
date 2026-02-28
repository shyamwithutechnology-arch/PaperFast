import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SplashScreen from '../../screen/auth/splash/SplashScreen';
import AuthStack from '../AuthStack';
import AppDrawer from '../AppDrawer';
import PrivacyPolicyScreen from '../../screen/privacy/PrivacyPolicyScreen';
import TermandconditionScreen from '../../screen/termandcondition/TermandconditionScreen';
import ScoreCardScreen from '../../screen/scrollcard/ScoreCardScreen';
import QuestionListScreen from '../../screen/studentModule/QuestionListScreen';
import OpenQuestionScreen from '../../screen/studentModule/openquestion/OpenQuestionScreen';
import QuestionScreen from '../../screen/papermodule/questionModule/QuestionScreen';
import PaperSelect from '../../screen/papermodule/paperselect/PaperSelect';
import PaperTypeScreen from '../../screen/papermodule/papertype/PaperTypeScreen';
import DraftPaperScreen from '../../screen/papermodule/draftpaper/DraftPaperScreen';
import PDFDetailsScreen from '../../screen/mypdf/pdfdetails/PDFDetailsScreen';
import PDFPreviewScreen from '../../screen/mypdf/pdfpreview/PDFPreviewScreen';
import BookMarkScreen from '../../screen/studentModule/bookmark/BookMarkScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Redux auth state
  const { isLogin } = useSelector((state: any) => state.auth);
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

  // return (
  //   <Stack.Navigator screenOptions={{ headerShown: false }}>
  //     {isLogin ? (
  //       <Stack.Screen name="AppDrawer" component={AppDrawer} />
  //     ) : (
  //       <Stack.Screen name="AuthStack" component={AuthStack} />
  //     )}

  //     <Stack.Screen name="PaperTypeScreen" component={PaperTypeScreen} />
  //     <Stack.Screen name="PaperSelect" component={PaperSelect} />
  //     <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
  //     <Stack.Screen name="DraftPaperScreen" component={DraftPaperScreen} />


  //     <Stack.Screen name="ScoreCardScreen" component={ScoreCardScreen} />
  //     <Stack.Screen name="QuestionListScreen" component={QuestionListScreen} />
  //     <Stack.Screen name="OpenQuestionScreen" component={OpenQuestionScreen} />
  //     <Stack.Screen name="PDFDetailsScreen" component={PDFDetailsScreen} />
  //     <Stack.Screen name="PDFPreviewScreen" component={PDFPreviewScreen} />
  //     <Stack.Screen name="BookMarkScreen" component={BookMarkScreen} />

  //     <Stack.Screen name='PrivacyPolicyScreen' component={PrivacyPolicyScreen} />
  //     <Stack.Screen name='TermandconditionScreen' component={TermandconditionScreen} />


  //   </Stack.Navigator>
  // );
// RootStack.tsx
return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLogin ? (
        // Logged in - show AppDrawer and all app screens
        <>
          <Stack.Screen name="AppDrawer" component={AppDrawer} />
          <Stack.Screen name="PaperTypeScreen" component={PaperTypeScreen} />
          <Stack.Screen name="PaperSelect" component={PaperSelect} />
          <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
          <Stack.Screen name="DraftPaperScreen" component={DraftPaperScreen} />
          <Stack.Screen name="ScoreCardScreen" component={ScoreCardScreen} />
          <Stack.Screen name="QuestionListScreen" component={QuestionListScreen} />
          <Stack.Screen name="OpenQuestionScreen" component={OpenQuestionScreen} />
          <Stack.Screen name="PDFDetailsScreen" component={PDFDetailsScreen} />
          <Stack.Screen name="PDFPreviewScreen" component={PDFPreviewScreen} />
          <Stack.Screen name="BookMarkScreen" component={BookMarkScreen} />
        </>
      ) : (
        // Not logged in - show AuthStack only
        <>
          <Stack.Screen name="AuthStack" component={AuthStack} />
          {/* Don't include any app screens here */}
        </>
      )}

      {/* Public screens - always available */}
      <Stack.Screen name='PrivacyPolicyScreen' component={PrivacyPolicyScreen} />
      <Stack.Screen name='TermandconditionScreen' component={TermandconditionScreen} />
    </Stack.Navigator>
);
};

export default RootStack;