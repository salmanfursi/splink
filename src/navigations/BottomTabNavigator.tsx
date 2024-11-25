
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CallsScreen from '../tab-screens/CallsScreen';
import MessagingStack from '../features/messaging/navigations/MessagingStack';
import Meeting from '../tab-screens/Meeting';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          paddingVertical: 5,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          backgroundColor: 'white',
          height: 60,
        },
        tabBarLabelStyle: {
          paddingBottom: 7,
        },
      }}
    >
      <Tab.Screen name="Chat" component={MessagingStack} />
      <Tab.Screen name="Calls" component={CallsScreen} />
      <Tab.Screen name="meeting" component={Meeting} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;