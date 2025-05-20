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

const RootStack = () => {
    const checkRegno = useAuthStore(state => state.checkRegno);
  return (
    <Stack.Navigator
      initialRouteName={checkRegno?'TabNavigator':'RegNo'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen component={RegNo} name="RegNo" />
      <Stack.Screen component={TabNavigator} name="TabNavigator" />
      <Stack.Screen component={Grade} name="Grade" />
    </Stack.Navigator>
  );
};
const App = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const checkAuth = useAuthStore(state => state.checkAuth);
  const checkRegno = useAuthStore(state => state.checkRegno);

  useEffect(() => {
    const init = async () => {
      await checkAuth();
      await checkRegno();
      await BootSplash.hide({fade: true});
    };
    init();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: color.background}}>
      <NavigationContainer>
        {isLoggedIn ? <RootStack /> : <LoginStack />}
      </NavigationContainer>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
