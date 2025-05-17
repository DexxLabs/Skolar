import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import fonts from './data/fonts';

const App = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#141414',
        paddingTop: StatusBar.currentHeight + 12,
        paddingHorizontal: 12,
      }}>
      <Text style={{color: '#fff', fontFamily: fonts.xli, fontSize: 16}}>
        AppDev
      </Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
