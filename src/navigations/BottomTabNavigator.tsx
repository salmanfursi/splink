
// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import CallsScreen from '../tab-screens/CallsScreen';
// import MessagingStack from '../features/messaging/navigations/MessagingStack';
// import Meeting from '../tab-screens/Meeting';

// const Tab = createBottomTabNavigator();

// const BottomTabNavigator = () => {
 
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = focused ? 'home' : 'home';
//           } else if (route.name === 'Profile') {
//             iconName = focused ? 'person' : 'person-outline';
//           } else if (route.name === 'Settings') {
//             iconName = focused ? 'settings' : 'settings-outline';
//           }

//           // Return the icon component
//           return <Icon name={iconName} size={size || 24} color={color} />;
//         },
//         headerShown: false,
//         tabBarActiveTintColor: '#000000',
//         tabBarInactiveTintColor: '#666666',
//         tabBarStyle: {
//           paddingVertical: 5,
//           borderTopLeftRadius: 15,
//           borderTopRightRadius: 15,
//           backgroundColor: 'white',
//           height: 60,
//         },
//         tabBarLabelStyle: {
//           paddingBottom: 7,
//         },
//       }}
//     >
//       <Tab.Screen name="Chat" component={MessagingStack} />
//       <Tab.Screen name="Calls"   component={CallsScreen} />
//       <Tab.Screen name="meeting" component={Meeting} />
//     </Tab.Navigator>
//   );
// };

// export default BottomTabNavigator;









import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MessagingStack from '../features/messaging/navigations/MessagingStack';
import CallsScreen from '../tab-screens/CallsScreen';
import Meeting from '../tab-screens/Meeting';
import { Text } from 'react-native';



const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
       <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size }) => {
            let iconName;

            if (route.name === 'chat') {
              iconName = 'home';
            } else if (route.name === 'Calls') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'meeting') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // Return the icon component
            return<Text className=' text-black'><Icon name={iconName} size={size || 24} color='#8888' className='border' /></Text>
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { paddingBottom: 5, height: 60 },
        })}
      >
       <Tab.Screen name="Chat" component={MessagingStack} />
       <Tab.Screen name="Calls"   component={CallsScreen} />
       <Tab.Screen name="meeting" component={Meeting} />
      </Tab.Navigator>
   );
};

export default BottomTabNavigator;
