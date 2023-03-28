import React, {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import crashlytics from '@react-native-firebase/crashlytics';

import Login from './screens/Login';
import AuthProvider from './auth/AuthProvider';
import Router from './Router';
// import './i18n';
import {theme} from './theme';
// import logger from '../service/logger';
// import consoleTransport from '../service/logger/transports/consoleTransport';
// import crashlyticsTransport from '../service/logger/transports/crashlyticsTransport';

// if (__DEV__) {
//   logger.setTransports([consoleTransport]);
// } else {
//   logger.setTransports([crashlyticsTransport]);
// }

const App: React.FC = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  // Handle user state changes
  function onAuthStateChanged(userCb: FirebaseAuthTypes.User | null) {
    setUser(userCb);

    if (user) {
      crashlytics().setUserId(user.uid);
    }

    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (initializing) {
    // TODO: spash screen
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {user ? (
          <AuthProvider user={user}>
            <Router />
          </AuthProvider>
        ) : (
          <Login />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
