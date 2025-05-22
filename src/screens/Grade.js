import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { color, padding } from '../data/variables';

const Grade = () => {
  return (
     <View
              style={{
                flex: 1,
                backgroundColor: color.background,
                paddingTop: StatusBar.currentHeight + padding,
                paddingHorizontal: padding,
                
              }}>

              </View>
  );
};

export default Grade;

const styles = StyleSheet.create({});
