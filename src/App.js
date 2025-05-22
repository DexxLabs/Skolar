import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import fonts from './data/fonts';
import {color} from './data/variables';
import BootSplash from 'react-native-bootsplash';
import Home from './screens/Home';
import LetsGo from './screens/LetsGo';
import Login from './screens/Login';
import {useAuthStore} from './data/authStore';
import RegNo from './screens/RegNo';
import TabNavigator from './screens/TabNavigator';
import Grade from './screens/Grade';

const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="LetsGo"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="LetsGo" component={LetsGo} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

const RootStack = ({prop}) => {
  console.log(prop)
  return (
    <Stack.Navigator
      initialRouteName={prop?'TabNavigator':'RegNo'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen component={RegNo} name="RegNo" />
      <Stack.Screen component={TabNavigator} name="TabNavigator" />
      <Stack.Screen component={Grade} name="Grade" />
    </Stack.Navigator>
  );
};
const App = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const hydrate = useAuthStore(state => state.hydrate);
  const isRegno = useAuthStore(state => state.isRegno);

  const [isAppReady, setIsAppReady] = useState(false); 

  useEffect(() => {
    const init = async () => {
      await hydrate();
      setIsAppReady(true);
    };
    init();
  }, []);

  // hide splash only AFTER ready
  useEffect(() => {
    if (isAppReady) {
      setTimeout(() => BootSplash.hide({ fade: true }), 100); // slight delay helps transition
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: color.background }}>
      <NavigationContainer>
        {isLoggedIn ? <RootStack prop={isRegno} /> : <LoginStack />}
      </NavigationContainer>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
