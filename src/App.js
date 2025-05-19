import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import fonts from './data/fonts';
import {color} from './data/color';
import BootSplash from 'react-native-bootsplash';
import Home from './screens/Home';
import LetsGo from './screens/LetsGo';
import Login from './screens/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from './data/authStore';

const Stack = createNativeStackNavigator()


const LoginStack = () => {
  return(
    <Stack.Navigator initialRouteName='LetsGo' screenOptions={{headerShown:false}}>
      <Stack.Screen name='LetsGo' component={LetsGo} />
      <Stack.Screen name='Login' component={Login} />
    </Stack.Navigator>
  )
}

const RootStack = () => {
  return(
    <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
        <Stack.Screen component={Home} name='Home'/>
    </Stack.Navigator>
  )
}
const App = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const checkAuth = useAuthStore(state => state.checkAuth);

  useEffect(() => {
    const init = async () => {
      await checkAuth();
      await BootSplash.hide({ fade: true });
    };
    init();
  }, []);

  return (
    <View style={{flex:1,backgroundColor:color.background}}>
      <NavigationContainer>
        {isLoggedIn?<RootStack/>:<LoginStack/>}
      </NavigationContainer>
    </View>
      
  );
};

export default App;

const styles = StyleSheet.create({});
