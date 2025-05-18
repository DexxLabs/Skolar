import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import fonts from './data/fonts';
import {color} from './data/color';
import BootSplash from "react-native-bootsplash";

const App = () => {
  useEffect(() => {
    const init = async () => {
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.background,
        paddingTop: StatusBar.currentHeight + 12,
        paddingHorizontal: 12,
        alignItems:'center'
      }}>
      <Text style={{color: '#fff', fontFamily: fonts.xli, fontSize: 16}}>
        AppDev
      </Text>
      <View
        style={{
          marginTop:10,
          height: 50,
          width:200,
          backgroundColor: color.secondary,
          borderRadius: 15,
        }}></View>
        <View
        style={{
          marginTop:10,
          height: 50,
          width:200,
          backgroundColor: color.primary,
          borderRadius: 15,
        }}></View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
