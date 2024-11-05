import React, { useEffect } from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';
import RootNavigator from './navigations/RootNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getSocket } from './hooks/getSocket';

const App = () => {
  useEffect(() => {
    getSocket(); // Connect to socket on app start
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView className="flex-1">
        <RootNavigator />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
