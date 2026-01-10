
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeStack from './stacks/HomeStack';
// const Tab = createBottomTabNavigator();

// const MainTabs = () => {
//     return (
//         <Tab.Navigator screenOptions={{ headerShown: false }}>
//             <Tab.Screen name="HomeTab" component={HomeStack} />
//             {/* <Tab.Screen name="OrdersTab" component={OrdersStack} />
//             <Tab.Screen name="ProfileTab" component={ProfileStack} /> */}
//         </Tab.Navigator>
//     );
// }

// export default MainTabs

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, View } from 'react-native';
import HomeStack from './stacks/HomeStack';
import { Colors } from '../theme/color';
import { Icons } from '../assets/icons';
import { moderateScale } from '../utlis/responsiveSize';

const Tab = createBottomTabNavigator();

const TabIcon = ({ focused, icon, label }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: moderateScale(22),
          height: moderateScale(22),
          tintColor: focused ? Colors.primaryColor : '#BDBDBD',
        }}
      />
      <Text
        style={{
          fontSize: moderateScale(11),
          marginTop: moderateScale(4),
          color: focused ? Colors.primaryColor : '#BDBDBD',
        }}
      >
        {label}
      </Text>
    </View>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: moderateScale(64),
          backgroundColor: Colors.white,
          borderTopWidth: 0.5,
          borderTopColor: '#E5E5E5',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={Icons.home_fill} label="Home" />
          ),
        }}
      />

      <Tab.Screen
        name="PdfTab"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={Icons.pdfFooter} label="My pdf" />
          ),
        }}
      />

      <Tab.Screen
        name="DraftTab"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={Icons.draftFooter} label="My Draft" />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={Icons.profileFooter} label="Profile" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;

