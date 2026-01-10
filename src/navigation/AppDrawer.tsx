import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabs from './MainTabs';
import CustomDrawer from '../component/drawer/CustomDrawer';
import { Dimensions } from 'react-native';

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
    </Drawer.Navigator>
  );
}
export default AppDrawer
