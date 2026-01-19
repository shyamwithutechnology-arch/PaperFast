import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, View } from 'react-native';
import HomeStack from './stacks/HomeStack';
import { Colors } from '../theme/color';
import { Icons } from '../assets/icons';
import { moderateScale } from '../utlis/responsiveSize';
import { Fonts } from '../theme';

const Tab = createBottomTabNavigator();

const TabIcon = ({ focused, icon, label }) => {
  return (
    <View style={{ alignItems: 'center',marginTop:moderateScale(10)}}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: moderateScale(25),
          height: moderateScale(25),
          tintColor: focused ? Colors.primaryColor : '#CCCCCC',

        }}
      />
      <Text
        style={{
          fontSize: moderateScale(10),
          marginTop: moderateScale(4),
          width:moderateScale(50),
          color: focused ? Colors.primaryColor : '#CCCCCC',
          alignSelf:"center",
          textAlign:'center',
          fontFamily:Fonts.InterMedium
        }}
        numberOfLines={1}
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
          height: moderateScale(80), // 80
          backgroundColor: Colors.white,
          paddingTop:moderateScale(6),
          elevation:10
          // borderTopWidth: 1,
          // borderColor:"#000",
          // alignSelf:"center"
          // borderTopColor: '#E5E5E5',
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

