import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { color, height, width } from '../../data/variables';
import fonts from '../../data/fonts';

const YearBox = ({ year, focused }) => {
  return (
    <View
      style={{
        borderColor: color.secondary,
        borderWidth: focused ? 0 : 1,
        backgroundColor: focused ? color.primary : color.background,
        borderRadius: 12,
        flex: 1,
        padding:12,
        justifyContent:'center',
        alignItems:'center'
      }}>
      <Text
        style={{
          fontFamily: fonts.m,
          color: color.text,
          
        }}>
        {year}
      </Text>
    </View>
  );
};

export default YearBox;

const styles = StyleSheet.create({});
