import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FC } from 'react';
import ConversationList from '../screens/ConversationList';
import ChatPage from '../screens/ChatPage';
import CallsScreen from '../screens/CallsScreen';

// Import your screens
// import ConversationList from '../screens/ConversationList';
// import ChatPage from '../screens/ChatPage';
// import CallsScreen from '../screens/CallsScreen';

// Define the type for TabParamList to ensure type safety
type TabParamList = {
  Conversations: undefined;
  Chat: undefined;
  Calls: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const BottomTabNavigator: FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Conversations" component={ConversationList} />
        <Tab.Screen name="Chat" component={ChatPage} />
        <Tab.Screen name="Calls" component={CallsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabNavigator;
