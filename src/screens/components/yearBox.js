import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color, height, padding, width} from '../../data/variables';
import fonts from '../../data/fonts';

const YearBox = ({year, focused}) => {
  return (
    <View
      style={{
        borderColor: color.secondary,
        borderWidth: focused ? 0 : 1,
        backgroundColor: focused ? color.primary : color.background,
        borderRadius: 12,
        padding: width/30,
        marginRight: 6,
        flex:1,
        width: (width/4),

      }}>
      <Text style={{fontFamily: fonts.m, color: color.text,textAlign:'center'}}>{year}</Text>
    </View>
  );
};

export default YearBox;

const styles = StyleSheet.create({});