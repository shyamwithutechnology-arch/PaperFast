import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, View } from 'react-native';
import HomeStack from './stacks/HomeStack';
import { Colors } from '../theme/color';
import { Icons } from '../assets/icons';
import { moderateScale } from '../utils/responsiveSize';
import { Fonts } from '../theme';
import ProfileStack from './stacks/ProfileStack';
import MyPdfScreen from '../screen/mypdf/mypdf/MyPdfScreen';
import DraftPaperScreen from '../screen/papermodule/draftpaper/DraftPaperScreen';
import PdfStack from './stacks/PdfStack';

const Tab = createBottomTabNavigator();

const TabIcon = ({ focused, icon, label }) => {
  return (
    <View style={{ alignItems: 'center', marginTop: moderateScale(10) }}>
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
          width: moderateScale(50),
          color: focused ? Colors.primaryColor : '#CCCCCC',
          alignSelf: "center",
          textAlign: 'center',
          fontFamily: Fonts.InterMedium
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
          height: moderateScale(85), // 80
          backgroundColor: Colors.white,
          paddingTop: moderateScale(6),
          elevation: 10,
          overflow:'hidden',
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
        name="MyPDF"
        component={PdfStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={Icons.pdfFooter} label="My pdf" />
          ),
        }}
      />

      <Tab.Screen
        name="DraftTab"
        component={DraftPaperScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={Icons.draftFooter} label="My Draft" />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
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

