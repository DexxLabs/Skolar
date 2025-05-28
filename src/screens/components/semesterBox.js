import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color, padding, width} from '../../data/variables';
import fonts from '../../data/fonts';

const SemesterBox = ({year, focused}) => {
  return (
    <View
      style={{
        borderColor: color.secondary,
        borderWidth: focused ? 0 : 1,
        backgroundColor: focused ? color.primary : color.background,
        borderRadius: 12,
        padding: 12,
        flex:1,
        width: (width/2)-(padding*1.2)
      }}>
      <Text style={{fontFamily: fonts.m, color: color.text,textAlign:'center',fontSize:13}}>{year}</Text>
    </View>
  );
};

export default SemesterBox;

const styles = StyleSheet.create({});