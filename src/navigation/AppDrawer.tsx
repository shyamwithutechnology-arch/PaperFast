import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabs from './MainTabs';
import CustomDrawer from '../component/drawer/CustomDrawer';
import { Dimensions } from 'react-native';
import ProfileScreen from '../screen/profile/ProfileScreen';
import DeleteAccountScreen from '../screen/deleteaccount/DeleteAccountScreen';
import PrivacyPolicyScreen from '../screen/privacy/PrivacyPolicyScreen';
import TermandconditionScreen from '../screen/termandcondition/TermandconditionScreen';
import AboutUsScreen from '../screen/aboutus/AboutUsScreen';
import DraftPaperScreen from '../screen/papermodule/draftpaper/DraftPaperScreen';
import MyPdfScreen from '../screen/mypdf/mypdf/MyPdfScreen';
import SubscriptionScreen from '../screen/subscription/SubscriptionScreen';
import SupportScreen from '../screen/support/SupportScreen';

const Drawer = createDrawerNavigator();
const { width } = Dimensions.get('window');

const AppDrawer = () => {
  return (
    <Drawer.Navigator  screenOptions={{
        headerShown: false,
        drawerType: 'front',              // 👈 drawer comes over screen
        drawerStyle: {
          width: width,                  // 👈 FULL SCREEN
        },
        overlayColor: 'rgba(0,0,0,0.5)',  // 👈 background dim
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="MainTabs" component={MainTabs} />
      <Drawer.Screen name='ProfileScreen' component={ProfileScreen}/>
      <Drawer.Screen name='DeleteAccountScreen' component={DeleteAccountScreen}/>
      <Drawer.Screen name='PrivacyPolicyScreen' component={PrivacyPolicyScreen}/>
      <Drawer.Screen name='TermandconditionScreen' component={TermandconditionScreen}/>
      <Drawer.Screen name='AboutUsScreen' component={AboutUsScreen}/>
      <Drawer.Screen name='DraftPaperScreen' component={DraftPaperScreen}/>
      <Drawer.Screen name='MyPdfScreen' component={MyPdfScreen}/>
      <Drawer.Screen name='SubscriptionScreen' component={SubscriptionScreen}/>
      <Drawer.Screen name='SupportScreen' component={SupportScreen}/>
    </Drawer.Navigator>
  );
}
export default AppDrawer