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

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLogin ? (
        <Stack.Screen name="AppDrawer" component={AppDrawer} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}

      <Stack.Screen name='PrivacyPolicyScreen' component={PrivacyPolicyScreen} />
      <Stack.Screen name='TermandconditionScreen' component={TermandconditionScreen} />

      {/*  these screen not show bottom */}
      <Stack.Screen name="PaperTypeScreen" component={PaperTypeScreen} />
      <Stack.Screen name="PaperSelect" component={PaperSelect} />
      <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
      <Stack.Screen name="DraftPaperScreen" component={DraftPaperScreen} />


      <Stack.Screen name="ScoreCardScreen" component={ScoreCardScreen} />
      <Stack.Screen name="QuestionListScreen" component={QuestionListScreen} />
      <Stack.Screen name="OpenQuestionScreen" component={OpenQuestionScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;