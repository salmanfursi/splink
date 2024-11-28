import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from '../redux/store';
import {setInitialAuthState} from '../redux/auth/authSlice';
import BottomTabNavigator from './BottomTabNavigator';
import LoginScreen from '../features/auth/screen/LoginScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    const checkAuth = async () => {
      // Retrieve token and user from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      console.log('token', token, 'user', user);
      if (token && user) {
        // Set initial state if token is valid
        dispatch(
          setInitialAuthState({
            token,
            user: JSON.parse(user),
            isLoggedIn: true,
          }),
        );
      }
      setLoading(false);
    };

    checkAuth();
  }, [dispatch]);

  if (loading) {
    return null;  
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
         {/* {!isLoggedIn ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (  */}
          <Stack.Screen name="Main" component={BottomTabNavigator} />
         {/* )}  */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;






